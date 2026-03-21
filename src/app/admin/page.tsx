"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  Film,
  DollarSign,
  HelpCircle,
  Users,
  Bot,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type CollectionCount = {
  portfolio: number;
  faq: number;
  team: number;
  avatarSamples: number;
  ordersTotal: number;
  ordersNew: number;
};

const quickLinks = [
  { href: "/admin/orders", label: "Siparişler", icon: ClipboardList, color: "var(--lime)" },
  { href: "/admin/portfolio", label: "Portfolio Yönet", icon: Film, color: "var(--electric-blue)" },
  { href: "/admin/pricing", label: "Fiyatları Düzenle", icon: DollarSign, color: "var(--lime)" },
  { href: "/admin/faq", label: "SSS Düzenle", icon: HelpCircle, color: "var(--electric-blue)" },
  { href: "/admin/about", label: "Takım Düzenle", icon: Users, color: "var(--lime)" },
  { href: "/admin/avatar", label: "Avatar Örnekleri", icon: Bot, color: "var(--electric-blue)" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CollectionCount>({
    portfolio: 0,
    faq: 0,
    team: 0,
    avatarSamples: 0,
    ordersTotal: 0,
    ordersNew: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [portfolio, faq, team, avatarSamples, orders] = await Promise.all([
          getDocs(collection(db, "mindid_portfolio")),
          getDocs(collection(db, "mindid_faq")),
          getDocs(collection(db, "mindid_team")),
          getDocs(collection(db, "mindid_avatarSamples")),
          getDocs(collection(db, "mindid_orders")),
        ]);
        const ordersNew = orders.docs.filter((d) => d.data().status === "new").length;
        setCounts({
          portfolio: portfolio.size,
          faq: faq.size,
          team: team.size,
          avatarSamples: avatarSamples.size,
          ordersTotal: orders.size,
          ordersNew,
        });
      } catch {
        // Firestore not configured yet — counts stay 0
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[var(--cream)]">Dashboard</h1>
        <p className="text-sm text-[var(--gray)]">
          Hoş geldin, {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Yeni Siparişler", count: counts.ordersNew, icon: ClipboardList, highlight: true },
          { label: "Toplam Siparişler", count: counts.ordersTotal, icon: ClipboardList },
          { label: "Portfolio", count: counts.portfolio, icon: Film },
          { label: "SSS", count: counts.faq, icon: HelpCircle },
          { label: "Takım", count: counts.team, icon: Users },
          { label: "Avatar Örnekleri", count: counts.avatarSamples, icon: Bot },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-md border-3 ${"highlight" in stat && stat.highlight ? "bg-[var(--lime)]/10 border-[var(--lime)]/40" : "bg-[var(--card)] border-[var(--electric-blue)]/20"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} className="text-[var(--lime)]" />
              <span className="text-xs font-bold text-[var(--gray)]">{stat.label}</span>
            </div>
            <span className="text-2xl font-black text-[var(--cream)]">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-lg font-black text-[var(--cream)] mb-4">Hızlı Erişim</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 hover:border-[var(--lime)] transition-all group"
          >
            <link.icon size={20} style={{ color: link.color }} />
            <span className="text-sm font-bold text-[var(--cream)] flex-1">{link.label}</span>
            <ArrowRight size={16} className="text-[var(--gray)] group-hover:text-[var(--lime)] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
