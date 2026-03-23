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
  logo: "https://mindid.shop/leopard-icon.svg",
  description:
    "Türkiye merkezli yapay zeka reklam prodüksiyon ajansı. AI ile reklam filmi, dijital avatar ve e-ticaret ürün görseli üretimi.",
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
    email: "seymaakrs@gmail.com",
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
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
};

export default AboutRoute;
