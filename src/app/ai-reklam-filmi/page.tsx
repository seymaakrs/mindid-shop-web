import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { FeaturePage } from "@/components/content-pages/feature-page";
import {
  Smartphone,
  Film,
  Megaphone,
  Building2,
  Zap,
  Clock,
  Wand2,
} from "lucide-react";
import { GENERATION_COSTS } from "@/lib/plans-data";

export const metadata: Metadata = {
  title: "AI Video Studio — Saniyeler İçinde Reels, Reklam & Tanıtım Filmi",
  description:
    "MindID self-service AI video stüdyosu. Reels, reklam, ürün ve kurumsal tanıtım filmlerini dakikalar içinde üret. Ücretsiz başla, 50 kredi hediye.",
  keywords: [
    "ai video üretim",
    "ai reklam filmi",
    "ai video saas",
    "reels üretim",
    "ai video platform",
  ],
  alternates: {
    canonical: "https://mindid.shop/ai-reklam-filmi",
  },
  openGraph: {
    title: "AI Video Studio — MindID",
    description: "Self-service AI video üretim platformu. Saniyeler içinde stüdyo kalitesi.",
    url: "https://mindid.shop/ai-reklam-filmi",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID AI Video" }],
  },
};

const useCases = [
  {
    icon: Smartphone,
    titleTr: "Reels & TikTok",
    titleEn: "Reels & TikTok",
    descTr: "Dikey kısa formatta dikkat çekici sosyal videolar.",
    descEn: "Attention-grabbing short-form vertical videos.",
  },
  {
    icon: Film,
    titleTr: "Ürün Tanıtım",
    titleEn: "Product Promo",
    descTr: "Ürün özelliklerini öne çıkaran tanıtım videoları.",
    descEn: "Product showcase videos that convert.",
  },
  {
    icon: Megaphone,
    titleTr: "Kampanya Filmi",
    titleEn: "Campaign Film",
    descTr: "Sezonluk kampanya ve lansman için reklam filmleri.",
    descEn: "Ad films for seasonal campaigns and launches.",
  },
  {
    icon: Building2,
    titleTr: "Kurumsal Tanıtım",
    titleEn: "Corporate Intro",
    descTr: "Marka hikayeni anlatan premium tanıtım filmleri.",
    descEn: "Premium corporate intro films telling your story.",
  },
];

const benefits = [
  {
    icon: Zap,
    titleTr: "Stüdyo yok",
    titleEn: "No studio",
    descTr: "Ekip, mekan, ekipman maliyeti sıfır. Tarayıcıdan başla.",
    descEn: "Zero crew, location, equipment cost. Start from your browser.",
  },
  {
    icon: Clock,
    titleTr: "Saniyeler içinde",
    titleEn: "In seconds",
    descTr: "Brief ve teslimat süresi yok. AI üretir, sen indirir.",
    descEn: "No briefs or wait times. AI runs, you download.",
  },
  {
    icon: Wand2,
    titleTr: "Sınırsız varyasyon",
    titleEn: "Unlimited variations",
    descTr: "Aynı kredilerle birden fazla versiyon üret. A/B testini kolaylaştırır.",
    descEn: "Generate multiple versions with the same credits. Easy A/B testing.",
  },
];

const VideoFeatureRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <FeaturePage
          badgeTr="AI Video Studio"
          badgeEn="AI Video Studio"
          headlineTr="AI ile video. Studio gerekmez."
          headlineEn="Video with AI. No studio required."
          subTr="Tarayıcından reels, reklam, ürün ve kurumsal videoları üret. Kredi öde, anında indir."
          subEn="Generate reels, ads, product and corporate videos from your browser. Pay with credits, download instantly."
          estimatedCredits={GENERATION_COSTS.videoShort}
          useCases={useCases}
          benefits={benefits}
        />
      </main>
      <Footer />
    </>
  );
};

export default VideoFeatureRoute;
