import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  increment,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "mindid_analytics";

/* ─── Günlük ziyaretçi kaydı ─── */
/**
 * Her sayfa görüntülemede çağrılır.
 * Firestore'da günlük bir doküman oluşturur/günceller:
 *   mindid_analytics/{YYYY-MM-DD}
 *   { date, pageViews, uniqueVisitors: Set<fingerprint>, pages: { "/": count, "/portfolio": count } }
 */
export const logPageView = async (path: string) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // "2026-04-01"
    const docRef = doc(db, COLLECTION, today);

    // Basit fingerprint — IP yerine tarayıcı+ekran+dil kombinasyonu
    const fp =
      typeof window !== "undefined"
        ? btoa(
            `${navigator.userAgent.slice(0, 40)}|${screen.width}x${screen.height}|${navigator.language}`
          ).slice(0, 20)
        : "ssr";

    await setDoc(
      docRef,
      {
        date: today,
        pageViews: increment(1),
        [`pages.${path.replace(/\//g, "_") || "_root"}`]: increment(1),
        [`visitors.${fp}`]: true,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  } catch {
    // Analytics hatası siteyi bozmamalı
  }
};

/* ─── Admin: son N günün verisini çek ─── */
export type DailyAnalytics = {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  pages: Record<string, number>;
};

export const getAnalytics = async (days = 30): Promise<DailyAnalytics[]> => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startStr = startDate.toISOString().split("T")[0];

  const q = query(
    collection(db, COLLECTION),
    where("date", ">=", startStr),
    orderBy("date", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    // visitors alanındaki unique key sayısı = unique visitor
    const visitors = data.visitors
      ? Object.keys(data.visitors).length
      : 0;
    // pages alanındaki sayıları topla
    const pages: Record<string, number> = {};
    if (data.pages) {
      for (const [key, val] of Object.entries(data.pages)) {
        pages[key === "_root" ? "/" : key.replace(/_/g, "/")] = val as number;
      }
    }
    return {
      date: data.date,
      pageViews: data.pageViews || 0,
      uniqueVisitors: visitors,
      pages,
    };
  });
};
