import { Header } from "@/components/header";
import { ConfiguratorPage } from "@/components/configurator-page";
import { Footer } from "@/components/footer";
import { ParallaxGrid } from "@/components/parallax-grid";
import { AIManager } from "@/components/ai-manager";

type Props = {
  params: Promise<{ serviceId: string }>;
};

const ConfigureServicePage = async ({ params }: Props) => {
  const { serviceId } = await params;

  return (
    <>
      <ParallaxGrid />
      <Header />
      <main>
        <ConfiguratorPage serviceId={serviceId} />
      </main>
      <Footer />
      <AIManager />
    </>
  );
};

export default ConfigureServicePage;
