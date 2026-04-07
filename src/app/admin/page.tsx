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
  UserPlus,
  Search,
  BarChart3,
  Globe,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

type CollectionCount = {
  portfolio: number;
  faq: number;
  team: number;
  avatarSamples: number;
  ordersTotal: number;
  ordersNew: number;
  leadsNew: number;
};

const quickLinks = [
  { href: "/admin/orders", label: "Siparişler", icon: ClipboardList, color: "var(--lime)" },
  { href: "/admin/leads", label: "Potansiyel Müşteriler", icon: UserPlus, color: "var(--lime)" },
  { href: "/admin/portfolio", label: "Portfolio Yönet", icon: Film, color: "var(--electric-blue)" },
  { href: "/admin/pricing", label: "Fiyatları Düzenle", icon: DollarSign, color: "var(--lime)" },
  { href: "/admin/faq", label: "SSS Düzenle", icon: HelpCircle, color: "var(--electric-blue)" },
  { href: "/admin/about", label: "Takım Düzenle", icon: Users, color: "var(--lime)" },
  { href: "/admin/avatar", label: "Avatar Örnekleri", icon: Bot, color: "var(--electric-blue)" },
];

/* ─── SEO Durum Kartı ─── */
const SEOCard = () => {
  const pages = [
    { name: "Ana Sayfa", path: "/", status: "ok" },
    { name: "Blog", path: "/blog", status: "ok" },
    { name: "Portfolyo", path: "/portfolio", status: "ok" },
    { name: "Hakkımızda", path: "/about", status: "ok" },
    { name: "Avatar", path: "/avatar", status: "ok" },
    { name: "E-ticaret", path: "/e-commerce", status: "ok" },
  ];

  return (
    <div className="rounded-xl border border-[var(--electric-blue)]/20 bg-[var(--card)] p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center">
          <Search size={18} className="text-[var(--lime)]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--cream)]">SEO Durumu</h3>
          <p className="text-[11px] text-[var(--gray)]">Sayfa meta bilgileri</p>
        </div>
      </div>
      <div className="space-y-2">
        {pages.map((p) => (
          <div key={p.path} className="flex items-center justify-between py-1.5 border-b border-[var(--electric-blue)]/10 last:border-0">
            <span className="text-xs text-[var(--cream)]/80">{p.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-bold">
              Meta OK
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[var(--gray)] mt-3">
        Schema.org: FAQPage, LocalBusiness, Service, ProfessionalService aktif
      </p>
    </div>
  );
};

/* ─── Analytics Özet Kartı ─── */
const AnalyticsCard = () => {
  return (
    <div className="rounded-xl border border-[var(--electric-blue)]/20 bg-[var(--card)] p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-lg bg-[var(--lime)]/10 flex items-center justify-center">
          <BarChart3 size={18} className="text-[var(--lime)]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[var(--cream)]">Analytics Özeti</h3>
          <p className="text-[11px] text-[var(--gray)]">Google Analytics (GA4)</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[var(--dark-blue)] p-3 border border-[var(--electric-blue)]/15">
          <Globe size={14} className="text-[var(--lime)] mb-1.5" />
          <p className="text-lg font-black text-[var(--cream)]">—</p>
          <p className="text-[10px] text-[var(--gray)]">Aylık Ziyaretçi</p>
        </div>
        <div className="rounded-lg bg-[var(--dark-blue)] p-3 border border-[var(--electric-blue)]/15">
          <TrendingUp size={14} className="text-[var(--lime)] mb-1.5" />
          <p className="text-lg font-black text-[var(--cream)]">—</p>
          <p className="text-[10px] text-[var(--gray)]">Dönüşüm Oranı</p>
        </div>
      </div>
      <p className="text-[10px] text-[var(--gray)] mt-3">
        GA4 verileri entegre edildikten sonra burada görünecek.
      </p>
    </div>
  );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CollectionCount>({
    portfolio: 0,
    faq: 0,
    team: 0,
    avatarSamples: 0,
    ordersTotal: 0,
    ordersNew: 0,
    leadsNew: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [portfolio, faq, team, avatarSamples, orders, leads] = await Promise.all([
          getDocs(collection(db, "mindid_portfolio")),
          getDocs(collection(db, "mindid_faq")),
          getDocs(collection(db, "mindid_team")),
          getDocs(collection(db, "mindid_avatarSamples")),
          getDocs(collection(db, "mindid_orders")),
          getDocs(collection(db, "mindid_leads")),
        ]);
        const ordersNew = orders.docs.filter((d) => d.data().status === "new").length;
        const leadsNew = leads.docs.filter((d) => d.data().status === "new").length;
        setCounts({
          portfolio: portfolio.size,
          faq: faq.size,
          team: team.size,
          avatarSamples: avatarSamples.size,
          ordersTotal: orders.size,
          ordersNew,
          leadsNew,
        });
      } catch {
        // Firestore not configured yet — counts stay 0
      }
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: "Yeni Siparişler", count: counts.ordersNew, icon: ClipboardList, highlight: true },
    { label: "Yeni Lead'ler", count: counts.leadsNew, icon: UserPlus, highlight: true },
    { label: "Toplam Sipariş", count: counts.ordersTotal, icon: ClipboardList, highlight: false },
    { label: "Portfolio", count: counts.portfolio, icon: Film, highlight: false },
    { label: "SSS", count: counts.faq, icon: HelpCircle, highlight: false },
    { label: "Takım", count: counts.team, icon: Users, highlight: false },
    { label: "Avatar Örnekleri", count: counts.avatarSamples, icon: Bot, highlight: false },
  ];

  return (
    <div className="space-y-8">
      {/* Karşılama */}
      <div>
        <h1 className="text-2xl font-black text-[var(--cream)]">Dashboard</h1>
        <p className="text-sm text-[var(--gray)] mt-1">
          Hoş geldin, {user?.email}
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-4 border transition-all duration-200 hover:scale-[1.02] ${
              stat.highlight
                ? "bg-[var(--lime)]/10 border-[var(--lime)]/30"
                : "bg-[var(--card)] border-[var(--electric-blue)]/15"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon
                size={16}
                className={stat.highlight ? "text-[var(--lime)]" : "text-[var(--gray)]"}
              />
              <span className="text-[11px] font-bold text-[var(--gray)] uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <span className="text-3xl font-black text-[var(--cream)]">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* SEO + Analytics Yan Yana */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SEOCard />
        <AnalyticsCard />
      </div>

      {/* Hızlı Erişim */}
      <div>
        <h2 className="text-lg font-bold text-[var(--cream)] mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card)] border border-[var(--electric-blue)]/15 hover:border-[var(--lime)] hover:bg-[var(--lime)]/5 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--dark-blue)] flex items-center justify-center">
                <link.icon size={18} style={{ color: link.color }} />
              </div>
              <span className="text-sm font-bold text-[var(--cream)] flex-1">
                {link.label}
              </span>
              <ArrowRight
                size={16}
                className="text-[var(--gray)] group-hover:text-[var(--lime)] group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
