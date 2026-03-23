import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  type Firestore,
} from "firebase/firestore";
import type { PortfolioItem } from "./firestore-types";

// Server-side Firebase instance (no auth needed for public reads)
const getServerFirestore = (): Firestore => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  let app: FirebaseApp;
  const serverAppName = "server";
  const existing = getApps().find((a) => a.name === serverAppName);
  if (existing) {
    app = existing;
  } else {
    app = initializeApp(config, serverAppName);
  }
  return getFirestore(app);
};

/**
 * Fetch all visible portfolio items (server-side, for SSG/SSR)
 */
export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const db = getServerFirestore();
    const q = query(
      collection(db, "mindid_portfolio"),
      where("visible", "==", true),
      orderBy("order", "asc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        // Serialize Timestamps to plain objects for Next.js
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
        completedAt: data.completedAt?.toDate?.()?.toISOString?.() ?? null,
      } as unknown as PortfolioItem;
    });
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
    const db = getServerFirestore();
    const q = query(
      collection(db, "mindid_portfolio"),
      where("slug", "==", slug),
      where("visible", "==", true),
      limit(1),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
      completedAt: data.completedAt?.toDate?.()?.toISOString?.() ?? null,
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
