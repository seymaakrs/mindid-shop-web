"use client";

import { usePathname } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="admin-layout flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto bg-[#0d0a24]">{children}</main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
