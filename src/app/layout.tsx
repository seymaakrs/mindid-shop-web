import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindID | AI Reklam Produksiyon",
  description:
    "Yapay zeka destekli reklam video uretim platformu. 8 saniyeden 5 dakikaya kadar profesyonel AI reklam videolari.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
