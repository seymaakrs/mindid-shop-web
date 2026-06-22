"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  Coins,
  CreditCard,
  Settings,
  Bell,
  FolderOpen,
  BarChart3,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Genel", icon: LayoutDashboard, exact: true },
  { href: "/templates", label: "Yeni", icon: Wand2 },
  { href: "/dashboard/files", label: "Dosyalar", icon: FolderOpen },
  { href: "/dashboard/credits", label: "Krediler", icon: Coins },
  { href: "/dashboard/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Fatura", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Bildirim", icon: Bell },
  { href: "/dashboard/settings", label: "Ayarlar", icon: Settings },
];

export const DashboardMobileNav = () => {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Dashboard bölümleri"
      className="md:hidden -mx-4 mb-4 overflow-x-auto"
    >
      <div className="flex gap-2 px-4 pb-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                isActive
                  ? "bg-[var(--lime)] text-[#100a2c]"
                  : "bg-white/5 text-gray-300 border border-white/10"
              }`}
            >
              <Icon size={13} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
