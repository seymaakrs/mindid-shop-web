"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useNewOrderCount } from "@/lib/hooks/use-firestore";
import {
  LayoutDashboard,
  ClipboardList,
  Film,
  DollarSign,
  HelpCircle,
  MonitorPlay,
  Users,
  Bot,
  FileText,
  Settings,
  LogOut,
  Clapperboard,
  BarChart3,
  Share2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Ziyaretçi Analizi", icon: BarChart3 },
  { href: "/admin/orders", label: "Siparişler", icon: ClipboardList, badge: true },
  { href: "/admin/customers", label: "Müşteriler", icon: Users },
  { href: "/admin/portfolio", label: "Portfolio", icon: Film },
  { href: "/admin/pricing", label: "Fiyatlandırma", icon: DollarSign },
  { href: "/admin/faq", label: "SSS", icon: HelpCircle },
  { href: "/admin/hero", label: "Hero / Video", icon: MonitorPlay },
  { href: "/admin/about", label: "Hakkımızda", icon: Users },
  { href: "/admin/avatar", label: "Avatar Örnekleri", icon: Bot },
  { href: "/admin/sosyal-medya", label: "Sosyal Medya", icon: Share2 },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const newOrderCount = useNewOrderCount();

  return (
    <aside className="w-64 min-h-screen bg-[var(--dark-blue)] border-r-3 border-[var(--electric-blue)]/20 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b-3 border-[var(--electric-blue)]/20">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--lime)] flex items-center justify-center">
            <Clapperboard size={18} className="text-[var(--lime)]" />
          </div>
          <span className="font-black text-[var(--cream)]">
            Mind<span className="text-[var(--electric-blue)]">ID</span>{" "}
            <span className="text-xs font-bold text-[var(--lime)]">Admin</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const showBadge = "badge" in item && item.badge && newOrderCount > 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-all ${
                isActive
                  ? "bg-[var(--lime)] text-[var(--dark-blue)] shadow-[3px_3px_0px_var(--electric-blue)]"
                  : "text-[var(--gray)] hover:text-[var(--cream)] hover:bg-[var(--electric-blue)]/10"
              }`}
            >
              <Icon size={18} />
              {item.label}
              {showBadge && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none min-w-[18px] text-center">
                  {newOrderCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t-3 border-[var(--electric-blue)]/20">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold text-red-400 hover:bg-red-500/10 w-full transition-all cursor-pointer"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};
