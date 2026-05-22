import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Analytics } from "@/components/analytics";
import { PageTracker } from "@/components/page-tracker";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { AiAgentGreeter } from "@/components/ai-agent-greeter";
import { PwaRegister } from "@/components/pwa-register";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MetaPixel } from "@/components/tracking/meta-pixel";
import { GoogleAds } from "@/components/tracking/google-ads";
import { UtmCapture } from "@/components/tracking/utm-capture";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: "#ade94f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "MindID — AI Content Studio SaaS | Video, Görsel & Avatar",
    template: "%s | MindID",
  },
  description:
    "MindID, markalar için self-service AI içerik üretim platformudur. Reels, görsel ve dijital avatarları kredi bazlı planlarla anında üret. Ücretsiz başla, 50 kredi hediye.",
  keywords: [
    "ai içerik üretim platformu",
    "ai content saas",
    "ai video üretim",
    "ai görsel platformu",
    "ai avatar saas",
    "self-service ai studio",
    "ai content platform",
    "kredi tabanlı ai",
    "ai template platform",
  ],
  authors: [{ name: "MindID Lab Technology" }],
  creator: "MindID",
  publisher: "MindID Lab Technology",
  metadataBase: new URL("https://mindid.shop"),
  alternates: {
    canonical: "https://mindid.shop",
    languages: {
      "tr-TR": "https://mindid.shop",
      "en-US": "https://mindid.shop/en",
      "es-ES": "https://mindid.shop/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "es_ES"],
    url: "https://mindid.shop",
    siteName: "MindID",
    title: "MindID — AI Content Studio SaaS",
    description:
      "Self-service AI içerik üretim platformu. Reels, görsel, avatar — kredi bazlı planlarla anında.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "MindID — Self-service AI Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "MindID — AI Content Studio SaaS",
    description:
      "Self-service AI içerik platformu. Reels, görsel, avatar — kredi bazlı.",
    images: ["/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "MLXSwSijfsaWlpYKCPsoqwo66ZVBY0HsJBxqhCI9b6k",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "MindID",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

// Schema.org Structured Data — SoftwareApplication
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MindID",
  url: "https://mindid.shop",
  logo: "https://mindid.shop/logo.png",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  description:
    "Self-service AI content platform for brands. Generate reels, product images and digital avatars with credit-based plans.",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "TRY",
      description: "50 credits/month, watermarked output",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "299",
      priceCurrency: "TRY",
      description: "500 credits/month, HD quality, commercial use",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "799",
      priceCurrency: "TRY",
      description: "2000 credits/month, Full HD, priority queue",
    },
    {
      "@type": "Offer",
      name: "Scale",
      price: "1999",
      priceCurrency: "TRY",
      description: "6000 credits/month, 4K, API access",
    },
  ],
  inLanguage: ["tr", "en", "es"],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Skip link for accessibility */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600;700&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&subset=latin,latin-ext&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to main content — Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lime)] focus:text-[var(--dark-blue)] focus:font-bold focus:rounded-md focus:text-sm focus:outline-2 focus:outline-[var(--dark-blue)]"
        >
          İçeriğe Atla
        </a>
        <Analytics />
        <MetaPixel />
        <GoogleAds />
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <PageTracker />
        <PwaRegister />
        <Providers>
          {children}
          <LanguageSwitcher />
          <PwaInstallPrompt />
          <AiAgentGreeter />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout