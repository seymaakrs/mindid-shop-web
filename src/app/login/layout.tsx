import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Giriş Yap | MindID",
  description: "MindID hesabınıza giriş yaparak panelinize ve siparişlerinize erişin.",
  robots: { index: false, follow: false },
};

const Layout = ({ children }: { children: ReactNode }) => children;
export default Layout;
