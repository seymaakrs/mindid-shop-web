import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TemplateGallery } from "@/components/template-gallery";

export const metadata: Metadata = {
  title: "Şablon Galerisi | MindID",
  description:
    "Profesyonel AI içerik üretmek için 100+ hazır şablon. Reels, ürün fotoğrafı, sosyal medya — saniyeler içinde özelleştir.",
  alternates: {
    canonical: "https://mindid.shop/templates",
  },
  openGraph: {
    title: "Şablon Galerisi | MindID",
    description:
      "100+ hazır AI şablon. Reels, ürün fotoğrafı, kampanya, kurumsal, sosyal medya, avatar — tek tıkla özelleştir.",
    url: "https://mindid.shop/templates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Şablon Galerisi | MindID",
    description:
      "100+ hazır AI şablon. Saniyeler içinde profesyonel içerik üret.",
  },
};

const TemplatesPage = () => {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[var(--background)]">
        <TemplateGallery />
      </main>
      <Footer />
    </>
  );
};

export default TemplatesPage;
