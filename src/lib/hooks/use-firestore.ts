"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, orderBy, query, onSnapshot, where, type QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  SiteSettings,
  FAQItem,
  TeamMember,
  AvatarSample,
  BlogPost,
  GenerationJob,
  GenerationStatus,
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
        const constraints: QueryConstraint[] = [];
        if (filterVisible) {
          constraints.push(where("visible", "==", true));
        }
        const q = query(collection(db, `mindid_${collectionName}`), ...constraints);
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
        docs.sort((a, b) => {
          const av = ((a as Record<string, unknown>)[orderField] as number) ?? 999;
          const bv = ((b as Record<string, unknown>)[orderField] as number) ?? 999;
          return av - bv;
        });
        setData(docs);
      } catch {
        // Firestore unavailable — keep empty array, fallback will be used
      }
      setLoading(false);
    };
    fetch();
  }, [collectionName, orderField, filterVisible]);

  return { data, loading };
}

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

export const useAvatarSamples = () => {
  return useFirestoreCollection<AvatarSample>("avatarSamples");
};

export const useBlogPosts = (publishedOnly: boolean = true) => {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "mindid_blog"), orderBy("publishedAt", "desc"));
        const snap = await getDocs(q);
        let posts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
        if (publishedOnly) {
          posts = posts.filter((p) => p.published === true);
        }
        setData(posts);
      } catch {
        // ignore
      }
      setLoading(false);
    };
    fetch();
  }, [publishedOnly]);

  return { data, loading };
};

export const useBlogPost = (slug: string) => {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "mindid_blog"), where("slug", "==", slug));
        const snap = await getDocs(q);
        const doc = snap.docs.find((d) => d.data().published === true);
        if (doc) {
          setData({ id: doc.id, ...doc.data() } as BlogPost);
        }
      } catch {
        // ignore
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { data, loading };
};

// SaaS: AI generation jobs (admin görünümü)
export const useGenerationJobs = (statusFilter?: GenerationStatus) => {
  const [data, setData] = useState<GenerationJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (statusFilter) {
      constraints.unshift(where("status", "==", statusFilter));
    }
    const q = query(collection(db, "mindid_generations"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GenerationJob)));
        setLoading(false);
      },
      () => setLoading(false),
    );

    return unsubscribe;
  }, [statusFilter]);

  return { data, loading };
};

export const useRunningGenerationCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "mindid_generations"),
      where("status", "==", "running"),
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
