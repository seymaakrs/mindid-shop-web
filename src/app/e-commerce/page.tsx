import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { FeaturePage } from "@/components/content-pages/feature-page";
import { GENERATION_COSTS } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "E-ticaret için AI Görsel — Kataloğunu Saatler İçinde Üret",
  description:
    "MindID ile e-ticaret kataloğunu AI ile üret. Ürün görseli, kampanya banneri, varyasyon setleri — anında, ücretsiz başla.",
  alternates: {
    canonical: "https://mindid.shop/e-commerce",
  },
  openGraph: {
    title: "E-ticaret için AI Görsel — MindID",
    description: "Kataloğunu AI ile dakikalar içinde üret. Self-service, kredi tabanlı.",
    url: "https://mindid.shop/e-commerce",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID E-ticaret AI" }],
  },
};

const useCases = [
  {
    icon: "shopping" as const,
    titleTr: "Katalog Görselleri",
    titleEn: "Catalog Images",
    descTr: "Pazaryeri uyumlu boyut ve formatlarda görseller.",
    descEn: "Marketplace-ready sizes and formats.",
  },
  {
    icon: "package" as const,
    titleTr: "Renk Varyasyonları",
    titleEn: "Color Variations",
    descTr: "Tek üründen onlarca renk seçeneği üret.",
    descEn: "Generate dozens of color options from one product.",
  },
  {
    icon: "layers" as const,
    titleTr: "Kampanya Banner",
    titleEn: "Campaign Banners",
    descTr: "Sezonluk indirim ve kampanyalar için banner.",
    descEn: "Banners for seasonal sales and campaigns.",
  },
  {
    icon: "image" as const,
    titleTr: "Lifestyle Çekim",
    titleEn: "Lifestyle Shots",
    descTr: "Ürünü kullanım bağlamında gösteren sahneler.",
    descEn: "Scenes showing your product in use.",
  },
];

const benefits = [
  {
    icon: "zap" as const,
    titleTr: "Saatler içinde katalog",
    titleEn: "Catalog in hours",
    descTr: "Yüzlerce ürünü tek seferde üret, beklemeden.",
    descEn: "Generate hundreds of products at once. No wait.",
  },
  {
    icon: "wand" as const,
    titleTr: "Tek tık varyasyon",
    titleEn: "One-click variants",
    descTr: "Renk, açı, arka plan değişikliği saniyeler içinde.",
    descEn: "Color, angle, background changes in seconds.",
  },
  {
    icon: "trending" as const,
    titleTr: "Dönüşüm odaklı",
    titleEn: "Conversion-focused",
    descTr: "A/B test için sınırsız versiyon, kazanan görseli kullan.",
    descEn: "Unlimited versions for A/B testing — ship the winner.",
  },
];

const EcommerceFeatureRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <FeaturePage
          badgeTr="E-ticaret"
          badgeEn="E-commerce"
          headlineTr="E-ticaret kataloğun. AI hızında."
          headlineEn="Your e-commerce catalog. At AI speed."
          subTr="Yüzlerce ürün görseli, renk varyasyonu ve kampanya banner'ı — tek panelden, kredi başına."
          subEn="Hundreds of product images, color variants and campaign banners — one panel, pay-as-you-generate."
          estimatedCredits={GENERATION_COSTS.imageHD}
          useCases={useCases}
          benefits={benefits}
        />
      </main>
      <Footer />
    </>
  );
};

export default EcommerceFeatureRoute;
