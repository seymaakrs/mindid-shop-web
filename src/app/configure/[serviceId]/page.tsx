import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ConfiguratorPage } from "@/components/configurator-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { AIManager } from "@/components/ai-manager";

type Props = {
  params: Promise<{ serviceId: string }>;
};

const serviceMetadata: Record<string, { title: string; titleEn: string; desc: string; descEn: string; keywords: string[] }> = {
  reels: {
    title: "AI Instagram Reels Yapımı — 999₺'den",
    titleEn: "AI Instagram Reels Production — From ₺999",
    desc: "AI ile Instagram Reels ve TikTok videoları. 999₺'den başlayan fiyatlarla profesyonel kısa video üretimi.",
    descEn: "AI-generated Instagram Reels and TikTok videos. Professional short-form video production from ₺999.",
    keywords: ["ai instagram reels", "yapay zeka tiktok video", "ai reels yapımı", "AI short video maker"],
  },
  "product-photo": {
    title: "E-ticaret İçin AI Ürün Fotoğrafçılığı — %70 Daha Az Maliyet",
    titleEn: "AI Product Photography for E-commerce — 70% Less Cost",
    desc: "E-ticaret ürünleriniz için manken ve stüdyo masrafı olmadan, AI ile %70 daha ucuz stüdyo kalitesinde ürün görselleri. 399₺'den başlayan fiyatlar.",
    descEn: "Studio-quality product images without mannequins or studios. 70% cheaper than traditional shoots. From ₺399.",
    keywords: ["ai ürün görseli", "e-ticaret ürün fotoğrafı ai", "manken olmadan ürün fotoğrafı", "AI product photography"],
  },
  product: {
    title: "AI Ürün Reklam Filmi — MindID",
    titleEn: "AI Product Ad Film — MindID",
    desc: "AI ile ürün reklam filmi. Geleneksel prodüksiyonun %70 altında maliyetle sinema kalitesinde reklam videoları. 9.999₺'den.",
    descEn: "AI product advertising films. Cinema-quality ad videos at 70% less cost. From ₺9,999.",
    keywords: ["ai ürün reklam filmi", "yapay zeka reklam videosu", "AI product ad film", "AI commercial maker"],
  },
  campaign: {
    title: "AI Kampanya Filmi Yapımı — MindID",
    titleEn: "AI Campaign Film Production — MindID",
    desc: "Yapay zeka ile kampanya filmi prodüksiyonu. Profesyonel AI reklam filmi 19.999₺'den.",
    descEn: "AI-powered campaign film production. Professional AI ad films from ₺19,999.",
    keywords: ["ai kampanya filmi", "yapay zeka reklam filmi", "AI campaign film", "affordable AI ad production"],
  },
  corporate: {
    title: "AI Kurumsal Tanıtım Filmi — MindID",
    titleEn: "AI Corporate Film Production — MindID",
    desc: "Yapay zeka ile kurumsal tanıtım filmi. Markanızı profesyonelce tanıtın. 29.999₺'den.",
    descEn: "AI corporate and brand films. Professionally present your brand. From ₺29,999.",
    keywords: ["ai kurumsal tanıtım filmi", "yapay zeka kurumsal film", "AI corporate video", "AI brand film"],
  },
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { serviceId } = await params;
  const meta = serviceMetadata[serviceId];

  if (!meta) {
    return {
      title: "Hizmet Yapılandırıcı — MindID",
      description: "AI reklam hizmetinizi yapılandırın ve fiyatınızı anında görün.",
    };
  }

  return {
    title: meta.title,
    description: meta.desc,
    keywords: meta.keywords,
    openGraph: {
      title: meta.titleEn,
      description: meta.descEn,
    },
  };
};

const ConfigureServicePage = async ({ params }: Props) => {
  const { serviceId } = await params;

  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <ConfiguratorPage serviceId={serviceId} />
      </main>
      <Footer />
      <AIManager />
    </>
  );
};

export default ConfigureServicePage;
