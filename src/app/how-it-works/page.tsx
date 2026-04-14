import type { Metadata } from "next";
import { Header } from "@/components/header";
import { HowItWorksPage } from "@/components/content-pages/how-it-works-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? — AI Reklam Filmi, Avatar & Ürün Görseli Süreci",
  description:
    "slowdays'de AI reklam filmi, avatar oluşturma ve e-ticaret ürün görseli nasıl üretilir? Adım adım süreç rehberi. Manken ve stüdyo masrafı olmadan profesyonel sonuçlar.",
  keywords: [
    "ai reklam filmi nasıl yapılır",
    "yapay zeka ile reklam yapımı",
    "ai avatar nasıl oluşturulur",
    "ai ürün fotoğrafı nasıl çekilir",
    "how AI ad film production works",
  ],
  alternates: {
    canonical: "https://mindid.shop/how-it-works",
    languages: { "tr-TR": "https://mindid.shop/how-it-works", "en-US": "https://mindid.shop/en/how-it-works" },
  },
  openGraph: {
    title: "How It Works — AI Ad Film, Avatar & Product Visual Process",
    description:
      "Step-by-step guide: How slowdays produces AI ad films, creates digital avatars, and generates e-commerce product visuals.",
    url: "https://mindid.shop/how-it-works",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mindidshop",
    creator: "@mindidshop",
    title: "AI Reklam Nasıl Yapılır? | slowdays",
    description: "slowdays'de AI reklam filmi, avatar ve ürün görseli üretim süreci.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "slowdays", item: "https://mindid.shop" },
    { "@type": "ListItem", position: 2, name: "Nasıl Çalışır?", item: "https://mindid.shop/how-it-works" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Order AI Production Services from slowdays",
  description: "Step-by-step guide to ordering AI ad films, digital avatars, and e-commerce product visuals from slowdays.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Choose Your Service", text: "Select from AI ad films, avatar creation, or product photography." },
    { "@type": "HowToStep", position: 2, name: "Configure & See Price", text: "Use our configurator to customize options and see the price instantly." },
    { "@type": "HowToStep", position: 3, name: "Submit Your Order", text: "Fill in your details and submit your order with requirements and reference files." },
    { "@type": "HowToStep", position: 4, name: "Brief Meeting", text: "We contact you within 24 hours for a detailed brief meeting." },
    { "@type": "HowToStep", position: 5, name: "AI Production", text: "Our team produces your content using cutting-edge AI tools." },
    { "@type": "HowToStep", position: 6, name: "Delivery & Revisions", text: "Receive your content with 2 free revision rounds included." },
  ],
};

const HowItWorksRoute = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <HowItWorksPage />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksRoute;
