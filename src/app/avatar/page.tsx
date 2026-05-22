import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { FeaturePage } from "@/components/content-pages/feature-page";
import { GENERATION_COSTS } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "AI Avatar — Marka Yüzü & Dijital Sunucu",
  description:
    "MindID AI avatar stüdyosu. Marka yüzünü, sunucunu veya influencer avatarını dakikalar içinde oluştur ve sınırsız sahne üret.",
  alternates: {
    canonical: "https://mindid.shop/avatar",
  },
  openGraph: {
    title: "AI Avatar — MindID",
    description: "Marka avatarını dakikalar içinde oluştur, sınırsız içerik üret.",
    url: "https://mindid.shop/avatar",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID AI Avatar" }],
  },
};

const useCases = [
  {
    icon: "user" as const,
    titleTr: "Marka Sözcüsü",
    titleEn: "Brand Spokesperson",
    descTr: "Tutarlı marka yüzü ile her video aynı kişiyle.",
    descEn: "A consistent brand face across every video.",
  },
  {
    icon: "mic" as const,
    titleTr: "Eğitim Sunucusu",
    titleEn: "Training Presenter",
    descTr: "Online kurs ve eğitim videolarında dijital eğitmen.",
    descEn: "Digital instructor for courses and training videos.",
  },
  {
    icon: "globe" as const,
    titleTr: "Çok Dilli İçerik",
    titleEn: "Multilingual Content",
    descTr: "Aynı avatardan onlarca dilde içerik üret.",
    descEn: "Produce content in dozens of languages from one avatar.",
  },
  {
    icon: "building" as const,
    titleTr: "Kurumsal Anonslar",
    titleEn: "Corporate Announcements",
    descTr: "İç iletişim, müşteri duyurusu, ürün lansmanı.",
    descEn: "Internal comms, customer announcements, launches.",
  },
];

const benefits = [
  {
    icon: "wand" as const,
    titleTr: "Kameraya çıkmadan",
    titleEn: "No camera required",
    descTr: "Çekim ekibi ve mekan yok. Tarayıcıdan üret.",
    descEn: "No crew or location. Generate from your browser.",
  },
  {
    icon: "zap" as const,
    titleTr: "Saniyeler içinde",
    titleEn: "In seconds",
    descTr: "Brief, kostüm değişimi, çekim günü yok.",
    descEn: "No briefs, wardrobe changes, or shoot days.",
  },
  {
    icon: "languages" as const,
    titleTr: "Dudak senkronu",
    titleEn: "Lip-sync ready",
    descTr: "Dudak hareketi, mimik ve göz teması doğal.",
    descEn: "Natural lip-sync, facial expressions and eye contact.",
  },
];

const AvatarFeatureRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <FeaturePage
          badgeTr="AI Avatar Studio"
          badgeEn="AI Avatar Studio"
          headlineTr="Marka avatarın. Sonsuz sahne."
          headlineEn="Your brand avatar. Endless scenes."
          subTr="Dijital marka yüzünü oluştur, dilediğin senaryoda sınırsız video üret."
          subEn="Build your digital brand face and produce unlimited videos in any scenario."
          estimatedCredits={GENERATION_COSTS.avatar}
          useCases={useCases}
          benefits={benefits}
        />
      </main>
      <Footer />
    </>
  );
};

export default AvatarFeatureRoute;
