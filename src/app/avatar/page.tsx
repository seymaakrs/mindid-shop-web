import { Header } from "@/components/header";
import { AvatarPage } from "@/components/avatar-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";

const AvatarRoute = () => {
  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <AvatarPage />
      </main>
      <Footer />
    </>
  );
};

export default AvatarRoute;
