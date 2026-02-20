import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "MindID | AI Reklam Produksiyon Ajansi",
  description:
    "Yapay zeka destekli reklam video uretim platformu. 8 saniyeden 6 dakikaya kadar profesyonel AI reklam videolari. %60 maliyet tasarrufu.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
