import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kayıt Ol | MindID",
  description: "Ücretsiz MindID hesabı oluşturun, projelerinizi yönetin ve siparişlerinizi takip edin.",
  robots: { index: false, follow: false },
};

const Layout = ({ children }: { children: ReactNode }) => children;
export default Layout;
