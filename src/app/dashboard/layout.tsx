"use client";

import { CustomerGuard } from "@/components/customer/customer-guard";
import { DashboardSidebar } from "@/components/customer/dashboard-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerGuard>
      <div className="flex min-h-screen bg-[#0d0825]">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </CustomerGuard>
  );
};

export default DashboardLayout;
