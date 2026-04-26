"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
] as const;

export const UtmCapture = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const utms: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = searchParams.get(k);
      if (v) utms[k] = v;
    });
    if (Object.keys(utms).length > 0) {
      utms.captured_at = new Date().toISOString();
      utms.landing_page = pathname;
      try {
        localStorage.setItem("mindid_utm", JSON.stringify(utms));
      } catch {
        // ignore storage errors (private mode, quota, etc.)
      }
    }
  }, [pathname, searchParams]);

  return null;
};
