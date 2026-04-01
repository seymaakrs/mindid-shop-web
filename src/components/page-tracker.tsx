"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { logPageView } from "@/lib/analytics-service";
import { trackPageView } from "@/components/analytics";

export const PageTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Admin sayfalarını izleme
    if (pathname.startsWith("/admin")) return;

    // Firestore'a kaydet
    logPageView(pathname);

    // GA4'e de gönder
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
};
