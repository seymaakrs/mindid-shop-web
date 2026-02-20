import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Configurator } from "@/components/configurator";
import { WorkflowSection } from "@/components/workflow-section";
import { Footer } from "@/components/footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Configurator />
        <WorkflowSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
