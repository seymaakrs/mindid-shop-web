"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const Analytics = () => {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
};

// Conversion tracking helper — call when order form is submitted
export const trackOrderSubmission = (serviceId: string, totalPrice: number) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID && (window as unknown as Record<string, unknown>).gtag) {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    gtag("event", "generate_lead", {
      event_category: "order",
      event_label: serviceId,
      value: totalPrice,
      currency: "TRY",
    });
    gtag("event", "conversion", {
      send_to: GA_MEASUREMENT_ID,
      event_category: "order_submitted",
      event_label: serviceId,
      value: totalPrice,
    });
  }
};

// Track page views for SPA navigation
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID && (window as unknown as Record<string, unknown>).gtag) {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
};
