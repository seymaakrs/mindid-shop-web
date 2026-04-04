import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AIGorselPage } from "@/components/content-pages/ai-gorsel-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Ürün Görseli — Stüdyo Olmadan E-ticaret Fotoğrafçılığı",
  description:
    "Trendyol, Hepsiburada, Amazon için AI ürün görseli. Manken ve stüdyo masrafı olmadan %70 daha ucuz, 3-5 iş günü teslim. 1.490₺'den başlayan fiyatlar.",
  keywords: [
    "ai ürün görseli",
    "yapay zeka ürün fotoğrafı",
    "e-ticaret ürün fotoğrafı ai",
    "manken olmadan ürün fotoğrafı",
    "trendyol ürün görseli",
    "hepsiburada ai ürün fotoğrafı",
    "shopify ai product photography",
    "stüdyo olmadan ürün görseli",
    "AI product photography Turkey",
  ],
  alternates: {
    canonical: "https://mindid.shop/ai-gorsel",
    languages: {
      "tr-TR": "https://mindid.shop/ai-gorsel",
      "en-US": "https://mindid.shop/ai-gorsel",
    },
  },
  openGraph: {
    title: "AI Ürün Görseli — MindID",
    description: "Stüdyo olmadan, manken olmadan AI ürün görseli. %70 maliyet tasarrufu, 3-5 gün teslimat.",
    url: "https://mindid.shop/ai-gorsel",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID AI Ürün Görseli" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    title: "AI Ürün Görseli | MindID",
    description: "Stüdyo olmadan AI ürün fotoğrafçılığı. %70 tasarruf.",
    images: ["/og-image.jpeg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "AI Ürün Görseli", item: "https://mindid.shop/ai-gorsel" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Ürün Görseli",
  description:
    "Yapay zeka ile e-ticaret ürün görseli üretimi. Manken ve stüdyo masrafı olmadan %70 daha ucuz, platform uyumlu boyutlarda stüdyo kalitesinde görseller.",
  category: "AI Product Photography",
  provider: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  areaServed: "Worldwide",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "1490",
    highPrice: "7900",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
  url: "https://mindid.shop/ai-gorsel",
};

const AIGorselRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <AIGorselPage />
      </main>
      <Footer />
    </>
  );
};

export default AIGorselRoute;
