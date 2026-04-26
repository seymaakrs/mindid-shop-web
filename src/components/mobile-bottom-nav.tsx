"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Plus, Package, User } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
};

const items: NavItem[] = [
  {
    href: "/",
    label: "Ana Sayfa",
    icon: Home,
    match: (p) => p === "/",
  },
  {
    href: "/templates",
    label: "Şablonlar",
    icon: Sparkles,
    match: (p) => p.startsWith("/templates"),
  },
  {
    href: "/dashboard/orders",
    label: "Siparişler",
    icon: Package,
    match: (p) => p.startsWith("/dashboard/orders"),
  },
  {
    href: "/dashboard",
    label: "Profil",
    icon: User,
    match: (p) => p === "/dashboard" || (p.startsWith("/dashboard") && !p.startsWith("/dashboard/orders")),
  },
];

export const MobileBottomNav = () => {
  const pathname = usePathname() ?? "/";

  // Hide inside admin layout
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Alt navigasyon"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--card)]/95 backdrop-blur-xl border-t border-[var(--dark-blue)]/10 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-end h-16 max-w-md mx-auto px-2">
        {/* First two items */}
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                active
                  ? "text-[var(--lime)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}

        {/* Center prominent "New" button */}
        <div className="flex items-start justify-center -mt-5">
          <Link
            href="/#services"
            aria-label="Yeni sipariş"
            className="w-14 h-14 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] flex items-center justify-center shadow-[0_6px_18px_rgba(173,233,79,0.45)] border-4 border-[var(--card)] hover:scale-105 active:scale-95 transition-transform"
          >
            <Plus size={26} strokeWidth={3} />
          </Link>
        </div>

        {/* Last two items */}
        {items.slice(2).map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                active
                  ? "text-[var(--lime)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
