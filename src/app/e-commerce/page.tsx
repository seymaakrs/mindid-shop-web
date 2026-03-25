import type { Metadata } from "next";
import { Header } from "@/components/header";
import { EcommercePage } from "@/components/content-pages/e-commerce-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "E-ticaret İçin AI Ürün Görseli — Manken ve Stüdyo Masrafına Son",
  description:
    "Trendyol, Hepsiburada, Shopify, Amazon satıcıları için AI ürün fotoğrafçılığı. Manken ve stüdyo masrafı olmadan %70 daha ucuz, stüdyo kalitesinde ürün görselleri. 399₺'den.",
  keywords: [
    "e-ticaret ürün fotoğrafı ai",
    "ai ürün görseli",
    "manken olmadan ürün fotoğrafı",
    "trendyol ürün görseli yapay zeka",
    "hepsiburada ürün fotoğrafı ai",
    "shopify ai product photography",
    "AI product images e-commerce",
    "stüdyo olmadan ürün görseli",
    "ucuz ürün fotoğrafçılığı",
  ],
  alternates: {
    canonical: "https://mindid.shop/e-commerce",
    languages: { "tr-TR": "https://mindid.shop/e-commerce", "en-US": "https://mindid.shop/en/e-commerce" },
  },
  openGraph: {
    title: "AI Product Photography for E-commerce — No Mannequin, No Studio",
    description:
      "Studio-quality product images for Shopify, Amazon, Trendyol, Hepsiburada. 70% cheaper without mannequins or studios. From ₺399.",
    url: "https://mindid.shop/e-commerce",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "E-ticaret AI Ürün Görseli | MindID",
    description: "AI ürün fotoğrafçılığı — manken ve stüdyo masrafı olmadan %70 tasarruf.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "E-commerce AI", item: "https://mindid.shop/e-commerce" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Product Photography for E-commerce",
  description:
    "Studio-quality AI-generated product images without mannequins or studio costs. 70% cheaper than traditional product photography. Perfect for Shopify, Amazon, Trendyol, Hepsiburada sellers.",
  category: "AI Product Photography",
  provider: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  areaServed: "Worldwide",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "399",
    highPrice: "9999",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
  url: "https://mindid.shop/e-commerce",
};

const EcommerceRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <EcommercePage />
      </main>
      <Footer />
    </>
  );
};

export default EcommerceRoute;
