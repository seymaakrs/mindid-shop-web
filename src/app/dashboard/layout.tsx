import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardLayoutClient from "./dashboard-layout-client";

export const metadata: Metadata = {
  title: { default: "Panelim | MindID", template: "%s | MindID" },
  description: "MindID müşteri paneli — siparişlerinizi, kredilerinizi ve dosyalarınızı yönetin.",
  robots: { index: false, follow: false },
};

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <DashboardLayoutClient>{children}</DashboardLayoutClient>
);

export default DashboardLayout;
