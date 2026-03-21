import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { AIManager } from "@/components/ai-manager";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI video production and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI video production is an innovative method where professional video content is created using artificial intelligence technologies. Instead of traditional production's filming crew, camera equipment, studio rental, and location costs, advanced AI models (image generation, voice synthesis, video composition) are used. The process reduces weeks-long traditional production timelines to days and significantly lowers costs.",
      },
    },
    {
      "@type": "Question",
      name: "How much do I save compared to traditional production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With MindID AI, the same professional quality is produced at 60-70% less than traditional costs. A traditional 30-second video requires $2,200 to $5,600 minimum. Corporate intro films can cost $8,400 to $21,000 traditionally. With MindID AI, these are done at 60-70% less cost. This is a strategic competitive advantage for your business.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI replace mannequins for e-commerce product photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MindID produces studio-quality e-commerce product images without mannequins or studios at 70% less cost. We serve Shopify, Amazon, Trendyol, and Hepsiburada sellers with AI-generated product photography starting from ₺399.",
      },
    },
    {
      "@type": "Question",
      name: "How to create AI avatars for marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MindID creates realistic AI digital avatars for brand spokespersons, digital presenters, and influencer avatars. You can use your AI avatar to produce content in multiple languages without ever being on camera. AI avatar creation starts from ₺5,999.",
      },
    },
    {
      "@type": "Question",
      name: "What is the delivery time for AI ad films?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Short format content (8-16 seconds) is delivered within 3 to 5 business days. Medium format (24-60 seconds) takes 5 to 10 business days. Long format content like brand films and corporate introductions takes 20 to 30 business days. Expedited delivery options are available for urgent projects.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms do you produce content for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We produce content for all platforms: Instagram Reels and Stories, TikTok, YouTube, LinkedIn, Facebook, X (Twitter), websites, e-commerce platforms, digital signage, TV commercials, and corporate presentations. Delivery includes optimized aspect ratios (9:16, 16:9, 1:1, 4:5) and resolutions (HD, Full HD, 4K).",
      },
    },
    {
      "@type": "Question",
      name: "What's needed to start a project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply use the configurator on mindid.shop to define your needs and fill out the form. Within 24 hours, we'll call you for a detailed brief meeting. After brief approval, the project officially starts with production beginning immediately.",
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
      <main>
        <Hero />
        <ServiceCards />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <AIManager />
    </>
  );
};

export default HomePage;
