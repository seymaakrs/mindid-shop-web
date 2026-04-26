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
    default: "MindID — Yapay Zeka Reklam Filmleri, Avatar & Ürün Görselleri",
    template: "%s | MindID",
  },
  description:
    "AI ile reklam filmi, dijital avatar oluşturma ve e-ticaret ürün görseli üretimi. Manken ve stüdyo masrafı olmadan %70 daha az maliyetle stüdyo kalitesinde sonuçlar. 1.490₺'den başlayan fiyatlar.",
  keywords: [
    "yapay zeka reklam filmi",
    "ai reklam videosu",
    "ai avatar oluşturma",
    "yapay zeka ürün görseli",
    "e-ticaret ürün fotoğrafı ai",
    "AI ad film production",
    "AI avatar creator",
    "AI product photography",
    "dijital avatar",
    "manken olmadan ürün fotoğrafı",
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
    title: "MindID — AI Reklam Filmleri, Avatar & Ürün Görselleri",
    description:
      "Yapay zeka ile reklam filmi, avatar oluşturma ve ürün görseli üretimi. %70 maliyet tasarrufu. 1.490₺'den başlayan fiyatlar.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "MindID — AI Reklam Prodüksiyon Stüdyosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "MindID — AI Reklam Filmleri & Ürün Görselleri",
    description:
      "AI ile reklam filmi ve ürün görseli üretimi. Stüdyo kalitesinde, %70 daha az maliyet.",
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

// Schema.org Structured Data — Site geneli (tüm sayfalarda yüklenir)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MindID",
  url: "https://mindid.shop",
  logo: "https://mindid.shop/logo.png",
  description:
    "AI-powered ad film production, avatar creation, and e-commerce product visual studio. 70% cheaper than traditional production.",
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: [
    "AI Ad Film Production",
    "AI Avatar Creation",
    "AI Product Photography",
    "AI E-commerce Visuals",
  ],
  knowsLanguage: ["Turkish", "English", "Spanish"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Production Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Reels (Instagram/TikTok)",
          description: "AI-generated short-form video ads for social media",
        },
        price: "1990",
        priceCurrency: "TRY",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Product Photography",
          description:
            "Studio-quality product images without mannequins or studios. 70% cheaper than traditional shoots.",
        },
        price: "1490",
        priceCurrency: "TRY",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Product Ad Film",
          description: "Professional AI-generated product advertising films",
        },
        price: "1990",
        priceCurrency: "TRY",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Campaign Film",
          description: "Full AI campaign film production",
        },
        price: "1990",
        priceCurrency: "TRY",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Corporate Film",
          description: "AI corporate brand and promotional films",
        },
        price: "1990",
        priceCurrency: "TRY",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Digital Avatar",
          description:
            "Create realistic AI avatars for brand spokesperson, digital presenter, or influencer",
        },
        price: "6900",
        priceCurrency: "TRY",
      },
    ],
  },
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