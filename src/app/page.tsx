import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { BudgetSlider } from "@/components/ui/budget-slider";
import { SocialProof } from "@/components/social-proof";
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
    {
      "@type": "Question",
      name: "Do AI avatars look realistic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MindID's AI avatar technology produces highly realistic results. Facial expressions, lip-sync, eye contact, and natural body language are precisely generated. Your avatar can speak in multiple languages with automatic lip synchronization. Many viewers cannot distinguish between an AI avatar and a real person.",
      },
    },
    {
      "@type": "Question",
      name: "Which e-commerce platforms are AI product images compatible with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MindID prepares AI product images for all major platforms: Trendyol, Hepsiburada, Shopify, Amazon, N11, Etsy, eBay, AliExpress, and WooCommerce. Each platform's specific size, format, and background requirements are met. Starting from ₺399 per product.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a bulk order discount for AI product photography?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Up to 15% discount for 50+ product images, up to 25% for 200+ products. Special catalog shooting packages available — even a 350-product catalog shoot can be completed in days. Color variations are produced at minimal additional cost.",
      },
    },
  ],
};

// Schema.org AggregateRating + Review — müşteri yorumları için
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MindID",
  url: "https://mindid.shop",
  image: "https://mindid.shop/og-image.png",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Istanbul",
    addressCountry: "TR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "8",
    reviewCount: "8",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mehmet Yılmaz" },
      datePublished: "2025-12-15",
      reviewBody: "AI video prodüksiyon ile kampanya filmimizi geleneksel yöntemin yarı maliyetine çıkardık. Kalite beklentimizin çok üzerindeydi.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ayşe Kaya" },
      datePublished: "2025-11-20",
      reviewBody: "350 ürünlük katalog çekimimizi AI ile 1 haftada tamamladık. Stüdyo çekimine göre %70 tasarruf ettik.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Burak Demir" },
      datePublished: "2025-11-05",
      reviewBody: "Kurumsal tanıtım filmimizi 3 günde aldık. Eskiden bunun için haftalarca bekliyorduk. MindID ile çalışmak büyük avantaj.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Elif Çelik" },
      datePublished: "2025-10-18",
      reviewBody: "Ürün görsellerimizi farklı arka planlarda ve renklerde AI ile oluşturduk. E-ticaret dönüşüm oranımız %40 arttı.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ahmet Özkan" },
      datePublished: "2025-10-02",
      reviewBody: "Instagram Reels içeriklerimizi AI ile üretmeye başladık. Takipçi etkileşimimiz 3 katına çıktı, bütçemiz ise aynı kaldı.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Zeynep Aras" },
      datePublished: "2025-09-14",
      reviewBody: "Yeni ürün serimizin 120 çeşit görseli 5 farklı arka planla hazırlandı. Geleneksel çekimle aylar sürecek iş günler içinde bitti.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Emre Şahin" },
      datePublished: "2025-08-22",
      reviewBody: "Kampanya reklam filmimiz için 5 farklı versiyon ürettik. A/B test yapıp en iyi performans gösteren videoyu belirledik.",
      reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Selin Toprak" },
      datePublished: "2025-08-05",
      reviewBody: "Takı koleksiyonumuzun 360° görsellerini AI ile oluşturduk. Müşterilerimiz ürünleri döndürerek inceleyebiliyor, satışlarımız arttı.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
};

const HomePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, reviewSchema]) }}
      />
      <ParallaxGrid />
      <Header />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <ServiceCards />
        <BudgetSlider />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <AIManager />
    </>
  );
};

export default HomePage;
