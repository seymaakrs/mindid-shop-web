import { Header } from "@/components/header";
import { PortfolioPage } from "@/components/portfolio-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

const PortfolioRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
};

export default PortfolioRoute;
