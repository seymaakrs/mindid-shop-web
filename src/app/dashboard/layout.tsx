"use client";

import { CustomerGuard } from "@/components/customer/customer-guard";
import { DashboardSidebar } from "@/components/customer/dashboard-sidebar";
import { DashboardMobileNav } from "@/components/customer/dashboard-mobile-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerGuard>
      <div className="flex min-h-screen bg-[#0d0825]">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <DashboardMobileNav />
          {children}
        </main>
      </div>
    </CustomerGuard>
  );
};

export default DashboardLayout;
