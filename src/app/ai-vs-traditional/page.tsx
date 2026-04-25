import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AiVsTraditionalPage } from "@/components/content-pages/ai-vs-traditional-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI vs Geleneksel Prodüksiyon — Maliyet, Süre & Kalite Karşılaştırması",
  description:
    "AI reklam filmi, avatar ve ürün görseli üretimi ile geleneksel prodüksiyonun maliyet, süre ve kalite karşılaştırması. Gerçek rakamlarla %70 tasarruf analizi.",
  alternates: {
    canonical: "https://mindid.shop/ai-vs-traditional",
  },
  keywords: [
    "ai vs geleneksel prodüksiyon",
    "yapay zeka reklam filmi maliyeti",
    "ai ürün fotoğrafı maliyet karşılaştırma",
    "AI vs traditional production cost",
    "AI advertising cost comparison",
  ],
  openGraph: {
    title: "AI vs Traditional Production — Cost, Speed & Quality Comparison",
    description:
      "Compare AI ad films, avatar creation, and product photography with traditional production. Real numbers showing 70% cost savings.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "AI vs Geleneksel", item: "https://mindid.shop/ai-vs-traditional" },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI vs Traditional Production: Cost, Speed & Quality Comparison",
  description:
    "Comprehensive comparison of AI-powered production vs traditional methods for ad films, digital avatars, and e-commerce product photography.",
  author: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  publisher: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  mainEntityOfPage: "https://mindid.shop/ai-vs-traditional",
};

const AiVsTraditionalRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <AiVsTraditionalPage />
      </main>
      <Footer />
    </>
  );
};

export default AiVsTraditionalRoute;
