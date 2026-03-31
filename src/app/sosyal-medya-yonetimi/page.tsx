import type { Metadata } from "next";
import { Header } from "@/components/header";
import { SosyalMedyaPage } from "@/components/content-pages/sosyal-medya-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "Sosyal Medya Yonetimi — AI Destekli Dijital Pazarlama | MindID",
  description:
    "Yapay zeka destekli sosyal medya yonetimi. Drone cekimi, video produksiyon, carousel, reels ve story. Vibe marketing ile markanizi buyutun. \u20BA9,999'dan baslayan paketler.",
  keywords: [
    "sosyal medya yonetimi",
    "sosyal medya ajansi",
    "dijital pazarlama",
    "instagram yonetimi",
    "tiktok yonetimi",
    "social media management Turkey",
    "AI social media",
    "sosyal medya paketleri fiyat",
  ],
  alternates: {
    canonical: "https://mindid.shop/sosyal-medya-yonetimi",
    languages: {
      "tr-TR": "https://mindid.shop/sosyal-medya-yonetimi",
      "en-US": "https://mindid.shop/sosyal-medya-yonetimi",
    },
  },
  openGraph: {
    title: "Sosyal Medya Yonetimi — AI Destekli | MindID",
    description:
      "AI destekli sosyal medya yonetimi. Icerik uretimi, reklam optimizasyonu, veri odakli strateji. Vibe marketing ile markanizi buyutun.",
    url: "https://mindid.shop/sosyal-medya-yonetimi",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "MindID Sosyal Medya Yonetimi" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    title: "Sosyal Medya Yonetimi | MindID",
    description: "AI destekli sosyal medya yonetimi. Vibe marketing ile markanizi buyutun.",
    images: ["/og-image.jpeg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Sosyal Medya Yonetimi",
      item: "https://mindid.shop/sosyal-medya-yonetimi",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Destekli Sosyal Medya Yonetimi",
  description:
    "Yapay zeka destekli sosyal medya yonetimi. Icerik uretimi, reklam yonetimi, analiz, raporlama ve dijital strateji hizmetleri.",
  category: "Social Media Management",
  provider: { "@type": "Organization", name: "MindID", url: "https://mindid.shop" },
  areaServed: "TR",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "9999",
    highPrice: "37999",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
  url: "https://mindid.shop/sosyal-medya-yonetimi",
};

const SosyalMedyaRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <SosyalMedyaPage />
      </main>
      <Footer />
    </>
  );
};

export default SosyalMedyaRoute;
