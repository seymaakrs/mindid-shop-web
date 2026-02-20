import { Header } from "@/components/header";
import { AboutPage } from "@/components/about-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

const AboutRoute = () => {
  return (
    <>
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
