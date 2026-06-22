import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AboutPage } from "@/components/about-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "MindID Hakkında — Self-Service AI İçerik Platformu",
  description:
    "MindID; markaların AI video, görsel ve dijital avatarlarını kredi bazlı planlarla saniyeler içinde üretebildiği self-service SaaS platformudur. Stüdyo, brief ve bekleme yok.",
  alternates: {
    canonical: "https://mindid.shop/about",
    languages: { "tr-TR": "https://mindid.shop/about", "en-US": "https://mindid.shop/en/about" },
  },
  openGraph: {
    title: "About MindID — Self-Service AI Content Platform",
    description:
      "MindID is a self-service AI content SaaS for brands. Generate reels, product images and digital avatars in seconds with credit-based plans.",
    url: "https://mindid.shop/about",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "MindID Hakkında — AI İçerik SaaS",
    description: "Markalar için self-service AI içerik üretim platformu. Tarayıcıdan üret, kredi ile öde.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "MindID", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "About MindID", item: "https://mindid.shop/about" },
  ],
};

// Organization Schema — GEO: Author Authority
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MindID",
  alternateName: "MindID Lab Technology",
  url: "https://mindid.shop",
  logo: "https://mindid.shop/leopard-icon.png",
  description:
    "Türkiye merkezli self-service AI içerik üretim SaaS platformu. Markalar tarayıcıdan reels, ürün görseli ve dijital avatar üretir.",
  foundingDate: "2024",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 41.0082, longitude: 28.9784 },
    geoRadius: "5000000",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "seyma@mindid.shop",
    telephone: "+905419315550",
    availableLanguage: ["Turkish", "English"],
  },
  sameAs: ["https://instagram.com/mindid.shop"],
  knowsAbout: [
    "AI Ad Film Production",
    "AI Avatar Creation",
    "AI Product Photography",
    "Generative AI",
    "E-commerce Visual Production",
    "Yapay Zeka Reklam Prodüksiyonu",
  ],
};

// Founder Schema — GEO: Person authority signals
const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Seyma Akırsöz",
  jobTitle: "Founder & Creative Director",
  worksFor: {
    "@type": "Organization",
    name: "MindID",
    url: "https://mindid.shop",
  },
  knowsAbout: [
    "AI Production",
    "Digital Marketing",
    "Creative Direction",
    "Generative AI",
  ],
};

const AboutRoute = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumb, organizationSchema, founderSchema]),
        }}
      />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
};

export default AboutRoute;
