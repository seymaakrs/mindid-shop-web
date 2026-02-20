"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, orderBy, query, where, type QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  PortfolioItem,
  SiteSettings,
  FAQItem,
  TeamMember,
  PricingConfig,
  AvatarSample,
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
        const constraints: QueryConstraint[] = [orderBy(orderField, "asc")];
        if (filterVisible) {
          constraints.unshift(where("visible", "==", true));
        }
        const q = query(collection(db, `mindid_${collectionName}`), ...constraints);
        const snap = await getDocs(q);
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T)));
      } catch {
        // Firestore unavailable — keep empty array, fallback will be used
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
