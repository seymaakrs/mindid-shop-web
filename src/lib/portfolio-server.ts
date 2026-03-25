import type { PortfolioItem } from "./firestore-types";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mindid-75079";

/**
 * Firestore REST API base URL
 * More reliable than JS SDK in server/edge environments (Netlify, Vercel, etc.)
 */
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Cache to avoid re-fetching within the same request cycle
let cachedItems: PortfolioItem[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 60_000; // 1 minute

/**
 * Parse a Firestore REST document into a plain object
 */
const parseFirestoreDoc = (
  doc: Record<string, unknown>,
): Record<string, unknown> => {
  const fields = doc.fields as Record<string, Record<string, unknown>> | undefined;
  if (!fields) return {};

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if ("stringValue" in value) result[key] = value.stringValue;
    else if ("integerValue" in value) result[key] = Number(value.integerValue);
    else if ("doubleValue" in value) result[key] = Number(value.doubleValue);
    else if ("booleanValue" in value) result[key] = value.booleanValue;
    else if ("timestampValue" in value) result[key] = value.timestampValue;
    else if ("nullValue" in value) result[key] = null;
    else if ("arrayValue" in value) {
      const arr = value.arrayValue as { values?: Record<string, unknown>[] };
      result[key] = (arr.values || []).map((v) => {
        if ("stringValue" in v) return v.stringValue;
        if ("integerValue" in v) return Number(v.integerValue);
        if ("mapValue" in v) return parseFirestoreDoc(v.mapValue as Record<string, unknown>);
        return null;
      });
    } else if ("mapValue" in value) {
      result[key] = parseFirestoreDoc(value.mapValue as Record<string, unknown>);
    }
  }
  return result;
};

/**
 * Extract document ID from Firestore REST document name
 */
const getDocId = (doc: Record<string, unknown>): string => {
  const name = doc.name as string;
  return name.split("/").pop() || "";
};

/**
 * Fetch all visible portfolio items (server-side, using REST API)
 * Uses Firestore REST API for reliable server-side data fetching
 */
export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  // Check cache
  if (cachedItems && Date.now() - cacheTime < CACHE_TTL) {
    return cachedItems;
  }

  try {
    // Use Firestore REST API structured query
    const url = `${FIRESTORE_BASE}:runQuery`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "mindid_portfolio" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "visible" },
            op: "EQUAL",
            value: { booleanValue: true },
          },
        },
        orderBy: [
          {
            field: { fieldPath: "order" },
            direction: "ASCENDING",
          },
        ],
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error("Firestore REST API error:", response.status, await response.text());
      return [];
    }

    const results = (await response.json()) as Array<{
      document?: Record<string, unknown>;
    }>;

    const items = results
      .filter((r) => r.document)
      .map((r) => {
        const doc = r.document!;
        const data = parseFirestoreDoc(doc);
        return {
          id: getDocId(doc),
          ...data,
          createdAt: data.createdAt || null,
          completedAt: data.completedAt || null,
        } as unknown as PortfolioItem;
      });

    // Update cache
    cachedItems = items;
    cacheTime = Date.now();

    return items;
  } catch (err) {
    console.error("Failed to fetch portfolio items:", err);
    return [];
  }
};

/**
 * Fetch a single portfolio item by slug (server-side)
 */
export const getPortfolioItemBySlug = async (
  slug: string,
): Promise<PortfolioItem | null> => {
  try {
    const url = `${FIRESTORE_BASE}:runQuery`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "mindid_portfolio" }],
        where: {
          compositeFilter: {
            op: "AND",
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: "slug" },
                  op: "EQUAL",
                  value: { stringValue: slug },
                },
              },
              {
                fieldFilter: {
                  field: { fieldPath: "visible" },
                  op: "EQUAL",
                  value: { booleanValue: true },
                },
              },
            ],
          },
        },
        limit: 1,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const results = (await response.json()) as Array<{
      document?: Record<string, unknown>;
    }>;
    const found = results.find((r) => r.document);
    if (!found?.document) return null;

    const data = parseFirestoreDoc(found.document);
    return {
      id: getDocId(found.document),
      ...data,
      createdAt: data.createdAt || null,
      completedAt: data.completedAt || null,
    } as unknown as PortfolioItem;
  } catch (err) {
    console.error("Failed to fetch portfolio item by slug:", err);
    return null;
  }
};

/**
 * Get all portfolio slugs for generateStaticParams
 */
export const getPortfolioSlugs = async (): Promise<string[]> => {
  const items = await getPortfolioItems();
  return items
    .filter((item) => item.slug)
    .map((item) => item.slug!);
};

/**
 * Generate a slug from a Turkish title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
};
