import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AvatarPage } from "@/components/avatar-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Avatar Oluşturma — Dijital Sunucu & Marka Yüzü",
  description:
    "Yapay zeka ile dijital avatar oluşturun. Marka yüzü, sunucu, influencer avatar — gerçekçi ve profesyonel. 5.999₺'den başlayan fiyatlar.",
  keywords: ["ai avatar oluşturma", "yapay zeka avatar", "dijital sunucu", "AI avatar creator", "digital presenter"],
  openGraph: {
    title: "AI Avatar Creation — Digital Presenter & Brand Face",
    description:
      "Create realistic AI avatars for your brand. Digital presenter, spokesperson, influencer avatar. From ₺5,999.",
  },
};

const AvatarRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <AvatarPage />
      </main>
      <Footer />
    </>
  );
};

export default AvatarRoute;
