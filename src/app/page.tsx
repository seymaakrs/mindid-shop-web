import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { SocialProof } from "@/components/social-proof";
import { ParallaxGrid } from "@/components/parallax-grid";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "MindID — AI Content Studio | Reels, Görsel & Avatar SaaS",
  description:
    "MindID, markaların self-service AI içerik üretim platformudur. Reels, ürün görseli ve dijital avatarları kredi bazlı planlarla anında üret. Ücretsiz başla, 50 kredi hediye.",
  alternates: {
    canonical: "https://mindid.shop",
  },
  openGraph: {
    title: "MindID — AI Content Studio SaaS",
    description:
      "Self-service AI içerik üretim platformu. Reels, görsel, avatar — kredi bazlı, ücretsiz başla.",
    url: "https://mindid.shop",
  },
};

const AIStudioShowcase = dynamic(() => import("@/components/ai-studio-showcase").then((m) => ({ default: m.AIStudioShowcase })));
const FeaturedTemplates = dynamic(() => import("@/components/featured-templates").then((m) => ({ default: m.FeaturedTemplates })));
const PricingSection = dynamic(() => import("@/components/pricing-section").then((m) => ({ default: m.PricingSection })));
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })));
const FAQSection = dynamic(() => import("@/components/faq-section").then((m) => ({ default: m.FAQSection })));
const FinalCTA = dynamic(() => import("@/components/final-cta").then((m) => ({ default: m.FinalCTA })));
const LogoWall = dynamic(() => import("@/components/logo-wall").then((m) => ({ default: m.LogoWall })));
const AIManager = dynamic(() => import("@/components/ai-manager").then((m) => ({ default: m.AIManager })));
const ExitIntentPopup = dynamic(() => import("@/components/exit-intent-popup").then((m) => ({ default: m.ExitIntentPopup })));
const SocialProofToast = dynamic(() => import("@/components/social-proof-toast").then((m) => ({ default: m.SocialProofToast })));
const StickyCTABar = dynamic(() => import("@/components/sticky-cta-bar").then((m) => ({ default: m.StickyCTABar })));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MindID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MindID is a self-service AI content studio that lets brands generate reels, product images and digital avatars directly in the browser. You sign up, get free credits, pick a template and AI produces studio-quality output in seconds.",
      },
    },
    {
      "@type": "Question",
      name: "How does the credit system work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every plan comes with monthly credits. Each AI generation costs a small number of credits depending on output type — images from 2 credits, short videos from 15 credits, avatars from 25 credits. New accounts get 50 free credits.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need creative or technical skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. MindID is template-first. Pick a template, drop in your brand details (logo, product photo, copy) and AI handles the rest. Pro users can write custom prompts.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the outputs commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paid plans (Starter and above) include full commercial usage rights with no watermark. The Free plan adds a watermark and is intended for testing.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Scale plan includes API access and webhooks so you can integrate MindID into your existing workflow or product.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can cancel your subscription anytime from your dashboard. You keep access until the end of your billing period, and any unused credit packs do not expire.",
      },
    },
  ],
};

const HomePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <Hero />
        <ServiceCards />
        <FeaturedTemplates />
        <AIStudioShowcase />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
        <SocialProof />
        <LogoWall />
      </main>
      <Footer />
      <AIManager />
      <ExitIntentPopup />
      <SocialProofToast />
      <StickyCTABar />
    </>
  );
};

export default HomePage;
