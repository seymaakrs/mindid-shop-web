import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AboutPage } from "@/components/about-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "MindID Hakkında — AI Reklam Filmi & Görsel Üretim Ajansı",
  description:
    "MindID, yapay zeka ile reklam filmi, dijital avatar ve e-ticaret ürün görseli üreten bir prodüksiyon ajansıdır. Geleneksel prodüksiyona göre %70 maliyet tasarrufu.",
  openGraph: {
    title: "About MindID — AI Ad Film & Visual Production Agency",
    description:
      "AI-powered ad film production, avatar creation, and e-commerce product visuals. 70% cheaper than traditional production.",
  },
};

const AboutRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
};

export default AboutRoute;
