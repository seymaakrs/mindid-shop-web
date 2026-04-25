"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  FolderOpen,
  BarChart3,
  Share2,
  ChevronLeft,
  User,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Siparişlerim", icon: ShoppingBag },
  { href: "/dashboard/files", label: "Dosyalarım", icon: FolderOpen },
  { href: "/dashboard/social", label: "Sosyal Medya", icon: Share2 },
  { href: "/dashboard/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Fatura & Ödeme", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Bildirimler", icon: Bell },
  { href: "/dashboard/settings", label: "Ayarlar", icon: Settings },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { customerData, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-[#100a2c] border-r border-white/5 flex flex-col transition-all duration-200`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black text-white">
                Mind<span className="text-[var(--lime)]">ID</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>
      </div>

      {/* User info */}
      {!collapsed && customerData && (
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--lime)]/20 flex items-center justify-center">
              <User size={14} className="text-[var(--lime)]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{customerData.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{customerData.company || customerData.email}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[var(--lime)]/10 text-[var(--lime)] text-[10px] font-bold uppercase">
              {customerData.plan}
            </span>
            <span className="text-[10px] text-gray-500">{customerData.credits} kredi</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-2 space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-[var(--lime)]/10 text-[var(--lime)] font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={18} />
          {!collapsed && "Çıkış Yap"}
        </button>
      </div>
    </aside>
  );
};
