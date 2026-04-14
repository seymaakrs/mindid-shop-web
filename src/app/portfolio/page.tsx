import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PortfolioPage } from "@/components/portfolio-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { getPortfolioItems } from "@/lib/portfolio-server";

export const metadata: Metadata = {
  title: "AI Reklam Portföyü — Film, Avatar & E-ticaret Görselleri",
  description:
    "slowdays AI prodüksiyon örnekleri. Yapay zeka ile üretilen reklam filmleri, dijital avatarlar ve e-ticaret ürün görselleri. Gerçek AI prodüksiyon kalitesini inceleyin.",
  alternates: {
    canonical: "https://mindid.shop/portfolio",
    languages: {
      "tr-TR": "https://mindid.shop/portfolio",
      "en-US": "https://mindid.shop/en/portfolio",
    },
  },
  openGraph: {
    title: "AI Ad Portfolio — Films, Avatars & E-commerce Visuals | slowdays",
    description:
      "See our AI-generated ad films, digital avatars, and e-commerce product visuals. Real examples of AI production quality.",
    url: "https://mindid.shop/portfolio",
    type: "website",
    images: [{ url: "https://mindid.shop/og-image.jpeg", width: 1200, height: 630, alt: "slowdays AI Prodüksiyon Portföyü" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "AI Reklam Portföyü | slowdays",
    description:
      "Yapay zeka ile üretilen reklam filmleri, dijital avatarlar ve ürün görselleri.",
  },
};

const PortfolioRoute = async () => {
  // Fetch portfolio items server-side for JSON-LD
  const items = await getPortfolioItems();

  // Breadcrumb Schema
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "slowdays",
        item: "https://mindid.shop",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://mindid.shop/portfolio",
      },
    ],
  };

  // ItemList Schema — helps Google show portfolio as a collection
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "slowdays AI Prodüksiyon Portföyü",
    description:
      "Yapay zeka ile üretilen reklam filmleri, dijital avatarlar ve e-ticaret ürün görselleri koleksiyonu.",
    numberOfItems: items.length,
    itemListElement: items.slice(0, 20).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.slug
        ? `https://mindid.shop/portfolio/${item.slug}`
        : "https://mindid.shop/portfolio",
      image: item.thumbnailUrl || undefined,
    })),
  };

  // CollectionPage Schema — GEO friendly
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Reklam Portföyü — slowdays",
    description:
      "slowdays tarafından yapay zeka ile üretilen reklam filmleri, avatarlar ve ürün görselleri. Türkiye'nin AI reklam prodüksiyon stüdyosu.",
    url: "https://mindid.shop/portfolio",
    isPartOf: {
      "@type": "WebSite",
      name: "slowdays",
      url: "https://mindid.shop",
    },
    author: {
      "@type": "Organization",
      name: "slowdays",
      url: "https://mindid.shop",
    },
    inLanguage: ["tr", "en"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumb, itemListSchema, collectionSchema]),
        }}
      />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
};

export default PortfolioRoute;
