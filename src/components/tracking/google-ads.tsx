"use client";

import Script from "next/script";

export const GoogleAds = () => {
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!conversionId) return null;

  return (
    <Script id="google-ads" strategy="afterInteractive">
      {`
        if (typeof gtag === 'function') {
          gtag('config', '${conversionId}');
        }
      `}
    </Script>
  );
};

export const trackGoogleAdsConversion = (
  conversionLabel: string,
  value?: number,
  currency = "TRY",
) => {
  if (typeof window === "undefined" || !window.gtag) return;
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!conversionId) return;

  window.gtag("event", "conversion", {
    send_to: `${conversionId}/${conversionLabel}`,
    value,
    currency,
  });
};
