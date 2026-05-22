"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useRunningGenerationCount } from "@/lib/hooks/use-firestore";
import {
  LayoutDashboard,
  Wand2,
  HelpCircle,
  MonitorPlay,
  Users,
  Bot,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  UserCog,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/admin/leads", label: "Lead'ler", icon: Users },
  { href: "/admin/customers", label: "Müşteriler", icon: UserCog },
  { href: "/admin/generations", label: "Üretimler", icon: Wand2, badge: true },
  { href: "/admin/faq", label: "SSS", icon: HelpCircle },
  { href: "/admin/hero", label: "Hero", icon: MonitorPlay },
  { href: "/admin/about", label: "Hakkımızda", icon: Users },
  { href: "/admin/avatar", label: "Avatar", icon: Bot },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export const AdminMobileNav = () => {
  const pathname = usePathname() ?? "";
  const { logout } = useAuth();
  const newOrderCount = useRunningGenerationCount();

  return (
    <div className="md:hidden sticky top-0 z-30 bg-[var(--dark-blue)] border-b-2 border-[var(--electric-blue)]/20">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/admin" className="font-black text-[var(--cream)] text-sm">
          Mind<span className="text-[var(--electric-blue)]">ID</span>{" "}
          <span className="text-xs text-[var(--lime)]">Admin</span>
        </Link>
        <button
          onClick={logout}
          aria-label="Çıkış"
          className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
      <nav aria-label="Admin bölümleri" className="overflow-x-auto">
        <div className="flex gap-2 px-4 pb-3">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const showBadge = "badge" in item && item.badge && newOrderCount > 0;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[var(--lime)] text-[var(--dark-blue)]"
                    : "bg-[var(--electric-blue)]/10 text-[var(--cream)] border border-[var(--electric-blue)]/20"
                }`}
              >
                <Icon size={13} />
                {item.label}
                {showBadge && (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold leading-none">
                    {newOrderCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
