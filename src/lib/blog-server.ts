import type { BlogPost } from "./firestore-types";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mindid-75079";
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

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
        return null;
      });
    }
  }
  return result;
};

const getDocId = (doc: Record<string, unknown>): string => {
  const name = doc.name as string;
  return name.split("/").pop() || "";
};

/**
 * Fetch a single blog post by slug (server-side, for metadata generation)
 */
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  try {
    const url = `${FIRESTORE_BASE}:runQuery`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "mindid_blog" }],
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
                  field: { fieldPath: "published" },
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
    } as unknown as BlogPost;
  } catch {
    return null;
  }
};

/**
 * Fetch all published blog posts (server-side, for sitemap generation)
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const url = `${FIRESTORE_BASE}:runQuery`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "mindid_blog" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "published" },
            op: "EQUAL",
            value: { booleanValue: true },
          },
        },
        orderBy: [{ field: { fieldPath: "publishedAt" }, direction: "DESCENDING" }],
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const results = (await response.json()) as Array<{
      document?: Record<string, unknown>;
    }>;

    return results
      .filter((r) => r.document)
      .map((r) => {
        const data = parseFirestoreDoc(r.document!);
        return {
          id: getDocId(r.document!),
          ...data,
        } as unknown as BlogPost;
      });
  } catch {
    return [];
  }
};
