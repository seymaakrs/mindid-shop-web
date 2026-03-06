import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { AIManager } from "@/components/ai-manager";

const HomePage = () => {
  return (
    <>
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
