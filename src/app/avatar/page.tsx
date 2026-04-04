import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AvatarPage } from "@/components/avatar-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Avatar Oluşturma — Dijital Sunucu & Marka Yüzü",
  description:
    "Yapay zeka ile dijital avatar oluşturun. Marka yüzü, sunucu, influencer avatar — gerçekçi ve profesyonel. 6.900₺'den başlayan fiyatlar.",
  keywords: ["ai avatar oluşturma", "yapay zeka avatar", "dijital sunucu", "AI avatar creator", "digital presenter"],
  alternates: {
    canonical: "https://mindid.shop/avatar",
    languages: { "tr-TR": "https://mindid.shop/avatar", "en-US": "https://mindid.shop/en/avatar" },
  },
  openGraph: {
    title: "AI Avatar Creation — Digital Presenter & Brand Face",
    description:
      "Create realistic AI avatars for your brand. Digital presenter, spokesperson, influencer avatar. From ₺6,900.",
    url: "https://mindid.shop/avatar",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "AI Avatar Oluşturma | MindID",
    description: "Yapay zeka ile dijital avatar — marka yüzü, sunucu, influencer avatar.",
  },
};

const avatarServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Avatar Creation",
  description: "Create realistic AI digital avatars for brand spokespersons, digital presenters, and influencer avatars. Produce video content in multiple languages without being on camera.",
  category: "AI Avatar Creation",
  provider: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  areaServed: "Worldwide",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "5999",
    highPrice: "14999",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
  url: "https://mindid.shop/avatar",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "AI Avatar Creation", item: "https://mindid.shop/avatar" },
  ],
};

const AvatarRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(avatarServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <AvatarPage />
      </main>
      <Footer />
    </>
  );
};

export default AvatarRoute;
