import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AIReklamFilmiPage } from "@/components/content-pages/ai-reklam-filmi-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "AI Reklam Filmi — Yapay Zeka ile Profesyonel Video Prodüksiyon",
  description:
    "AI reklam filmi ile %70 maliyet tasarrufu, 3-5 gün teslimat. Yapay zeka video prodüksiyon: Instagram Reels, TikTok, ürün tanıtım filmi, kampanya filmi. 1.990₺'den başlayan fiyatlar.",
  keywords: [
    "ai reklam filmi",
    "yapay zeka reklam videosu",
    "ai video prodüksiyon",
    "dijital reklam filmi",
    "AI ad film production",
    "ai reklam filmi fiyat",
    "yapay zeka ile video çekimi",
  ],
  alternates: {
    canonical: "https://mindid.shop/ai-reklam-filmi",
    languages: {
      "tr-TR": "https://mindid.shop/ai-reklam-filmi",
      "en-US": "https://mindid.shop/ai-reklam-filmi",
    },
  },
  openGraph: {
    title: "AI Reklam Filmi — MindID",
    description:
      "Yapay zeka ile profesyonel reklam filmi üretimi. %70 maliyet tasarrufu, 3-5 gün teslimat.",
    url: "https://mindid.shop/ai-reklam-filmi",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "MindID AI Reklam Filmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    title: "AI Reklam Filmi | MindID",
    description:
      "Yapay zeka ile reklam filmi. %70 tasarruf, 3-5 gün teslimat.",
    images: ["/og-image.jpeg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "MindID",
      item: "https://mindid.shop",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Reklam Filmi",
      item: "https://mindid.shop/ai-reklam-filmi",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Reklam Filmi",
  description:
    "Yapay zeka ile profesyonel reklam filmi üretimi. Instagram Reels, TikTok, ürün tanıtım, kampanya ve kurumsal tanıtım filmleri. %70 maliyet tasarrufu.",
  category: "AI Video Production",
  provider: {
    "@type": "Organization",
    name: "MindID",
    url: "https://mindid.shop",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "1990",
    highPrice: "64900",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  },
  url: "https://mindid.shop/ai-reklam-filmi",
};

const AIReklamFilmiRoute = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <AIReklamFilmiPage />
      </main>
      <Footer />
    </>
  );
};

export default AIReklamFilmiRoute;
