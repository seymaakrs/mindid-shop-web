import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PortfolioPage } from "@/components/portfolio-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Reklam Portföyü — Film, Avatar & E-ticaret Görselleri",
  description:
    "MindID AI prodüksiyon örnekleri. Yapay zeka ile üretilen reklam filmleri, dijital avatarlar ve e-ticaret ürün görselleri.",
  openGraph: {
    title: "AI Ad Portfolio — Films, Avatars & E-commerce Visuals",
    description:
      "See our AI-generated ad films, digital avatars, and e-commerce product visuals. Real examples of AI production quality.",
  },
};

const PortfolioRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
};

export default PortfolioRoute;
