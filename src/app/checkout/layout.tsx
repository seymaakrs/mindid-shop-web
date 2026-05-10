import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ödeme | MindID",
  description: "Siparişinizi tamamlamak için güvenli ödeme adımı.",
  robots: { index: false, follow: false },
};

const Layout = ({ children }: { children: ReactNode }) => children;
export default Layout;
