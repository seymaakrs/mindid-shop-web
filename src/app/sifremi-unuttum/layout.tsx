import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Şifremi Unuttum | MindID",
  description: "MindID hesabınızın şifresini sıfırlamak için e-posta adresinizi girin.",
  robots: { index: false, follow: false },
};

const Layout = ({ children }: { children: ReactNode }) => children;
export default Layout;
