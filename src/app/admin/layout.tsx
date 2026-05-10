import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminLayoutClient from "./admin-layout-client";

export const metadata: Metadata = {
  title: { default: "Admin Panel | MindID", template: "%s | MindID Admin" },
  description: "MindID yönetim paneli.",
  robots: { index: false, follow: false, nocache: true },
};

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <AdminLayoutClient>{children}</AdminLayoutClient>
);

export default AdminLayout;
