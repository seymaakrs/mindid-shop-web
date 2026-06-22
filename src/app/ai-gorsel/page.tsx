import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { FeaturePage } from "@/components/content-pages/feature-page";
import { GENERATION_COSTS } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "AI Görsel Stüdyosu — Ürün, Kampanya & Banner Görselleri",
  description:
    "MindID AI görsel stüdyosu. Ürün fotoğrafı, kampanya görseli, banner ve sosyal post görsellerini anında üret. Ücretsiz başla.",
  alternates: {
    canonical: "https://mindid.shop/ai-gorsel",
  },
  openGraph: {
    title: "AI Görsel Stüdyosu — MindID",
    description: "Self-service AI görsel üretim platformu. Stüdyo kalitesi, anında çıktı.",
    url: "https://mindid.shop/ai-gorsel",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID AI Görsel" }],
  },
};

const useCases = [
  {
    icon: "shopping" as const,
    titleTr: "E-ticaret Ürünü",
    titleEn: "E-commerce Product",
    descTr: "Pazaryeri uyumlu, temiz zeminli ürün görselleri.",
    descEn: "Marketplace-ready product shots on clean backgrounds.",
  },
  {
    icon: "palette" as const,
    titleTr: "Lifestyle Sahne",
    titleEn: "Lifestyle Scene",
    descTr: "Ürünü bağlamında gösteren atmosferik görseller.",
    descEn: "Atmospheric scenes showing your product in context.",
  },
  {
    icon: "layers" as const,
    titleTr: "Kampanya Banner",
    titleEn: "Campaign Banner",
    descTr: "Reklam ve sosyal medya için yüksek dönüşümlü görseller.",
    descEn: "High-converting visuals for ads and social media.",
  },
  {
    icon: "image" as const,
    titleTr: "Varyasyon Setleri",
    titleEn: "Variation Sets",
    descTr: "Tek üründen renk, açı, stil varyasyonları.",
    descEn: "Color, angle and style variations from a single product.",
  },
];

const benefits = [
  {
    icon: "camera" as const,
    titleTr: "Stüdyo gerekmez",
    titleEn: "No studio needed",
    descTr: "Mekan, ışık, manken sıfır. Tek tıkla üret.",
    descEn: "Zero location, lighting, model cost. Generate with one click.",
  },
  {
    icon: "zap" as const,
    titleTr: "Saniyeler içinde",
    titleEn: "In seconds",
    descTr: "Brief, çekim, retouch süreci yok.",
    descEn: "No briefs, shoots or retouching workflow.",
  },
  {
    icon: "wand" as const,
    titleTr: "Sonsuz iterasyon",
    titleEn: "Endless iteration",
    descTr: "Beğenmediğin görseli tek kredi ile yeniden üret.",
    descEn: "Don't like the output? Regenerate with one credit.",
  },
];

const ImageFeatureRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <FeaturePage
          badgeTr="AI Image Studio"
          badgeEn="AI Image Studio"
          headlineTr="Stüdyo kalitesinde görsel. Stüdyosuz."
          headlineEn="Studio-grade images. Without a studio."
          subTr="Ürün, kampanya ve sosyal medya görsellerini AI ile üret. Pazaryeri uyumlu, sınırsız varyasyon."
          subEn="Generate product, campaign and social images with AI. Marketplace-ready, endless variations."
          estimatedCredits={GENERATION_COSTS.imageHD}
          useCases={useCases}
          benefits={benefits}
        />
      </main>
      <Footer />
    </>
  );
};

export default ImageFeatureRoute;
