import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "MindID -Lab Technology | AI Reklam Prodüksiyon Ajansı",
  description:
    "Yapay zeka destekli reklam video üretim platformu. Bütçenize göre AI reklam filminizi oluşturun. 8 saniyeden 6 dakikaya kadar profesyonel AI reklam videoları. %60 maliyet tasarrufu.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&subset=latin,latin-ext&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
