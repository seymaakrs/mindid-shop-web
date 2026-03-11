"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, orderBy, query, onSnapshot, where, type QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  PortfolioItem,
  SiteSettings,
  FAQItem,
  TeamMember,
  PricingConfig,
  AvatarSample,
  OrderSubmission,
  OrderStatus,
} from "@/lib/firestore-types";

function useFirestoreCollection<T>(
  collectionName: string,
  orderField: string = "order",
  filterVisible: boolean = true,
): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, `mindid_${collectionName}`), orderBy(orderField, "asc"));
        const snap = await getDocs(q);
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
        setData(filterVisible ? all.filter((item) => (item as Record<string, unknown>).visible === true) : all);
      } catch (err) {
        console.error(`Firestore read error (${collectionName}):`, err);
      }
      setLoading(false);
    };
    fetch();
  }, [collectionName, orderField, filterVisible]);

  return { data, loading };
}

export const usePortfolio = () => {
  return useFirestoreCollection<PortfolioItem>("portfolio");
};

export const useSettings = () => {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "mindid_settings", "general"));
        if (snap.exists()) {
          setData(snap.data() as SiteSettings);
        }
      } catch {
        // empty
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading };
};

export const useFAQ = () => {
  return useFirestoreCollection<FAQItem>("faq");
};

export const useTeam = () => {
  return useFirestoreCollection<TeamMember>("team");
};

export const usePricing = () => {
  const [data, setData] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "mindid_pricing", "config"));
        if (snap.exists()) {
          setData(snap.data() as PricingConfig);
        }
      } catch {
        // empty
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading };
};

export const useAvatarSamples = () => {
  return useFirestoreCollection<AvatarSample>("avatarSamples");
};

export const useOrders = (statusFilter?: OrderStatus) => {
  const [data, setData] = useState<OrderSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (statusFilter) {
      constraints.unshift(where("status", "==", statusFilter));
    }
    const q = query(collection(db, "mindid_orders"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderSubmission)));
        setLoading(false);
      },
      (err) => {
        console.error("Orders listen error:", err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [statusFilter]);

  return { data, loading };
};

export const useNewOrderCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "mindid_orders"),
      where("status", "==", "new"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => setCount(snap.size),
      () => setCount(0),
    );

    return unsubscribe;
  }, []);

  return count;
};
