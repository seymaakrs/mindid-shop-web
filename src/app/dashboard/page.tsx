"use client";

import { useAuth } from "@/lib/auth-context";
import { useCustomerGenerations } from "@/lib/hooks/use-customer";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Coins,
  ArrowRight,
  Plus,
  Wand2,
  Video,
  Camera,
  User as UserIcon,
  LayoutGrid,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/plans-data";

const STATUS_MAP: Record<string, { label: string; color: string; pulse?: boolean }> = {
  queued: { label: "Kuyrukta", color: "text-blue-400 bg-blue-500/10" },
  running: { label: "Üretiliyor", color: "text-purple-400 bg-purple-500/10", pulse: true },
  completed: { label: "Tamamlandı", color: "text-green-400 bg-green-500/10" },
  failed: { label: "Başarısız", color: "text-red-400 bg-red-500/10" },
};

const KIND_EMOJI: Record<string, string> = {
  video: "🎬",
  image: "📸",
  avatar: "🧑‍🎤",
  social: "📱",
};

const KIND_LABEL: Record<string, string> = {
  video: "AI Video",
  image: "AI Görsel",
  avatar: "Avatar",
  social: "Sosyal İçerik",
};

const QUICK_ACTIONS = [
  {
    title: "AI Video",
    desc: "Reels, reklam, tanıtım",
    href: "/ai-reklam-filmi",
    Icon: Video,
    gradient: "from-pink-500/20 via-purple-500/15 to-transparent",
    iconColor: "text-pink-400",
  },
  {
    title: "AI Görsel",
    desc: "Ürün, kampanya, banner",
    href: "/ai-gorsel",
    Icon: Camera,
    gradient: "from-blue-500/20 via-cyan-500/15 to-transparent",
    iconColor: "text-cyan-400",
  },
  {
    title: "Dijital Avatar",
    desc: "Kameraya çıkmadan üret",
    href: "/avatar",
    Icon: UserIcon,
    gradient: "from-orange-500/20 via-yellow-500/15 to-transparent",
    iconColor: "text-orange-400",
  },
  {
    title: "Şablonlar",
    desc: "Hazır kalıplarla başla",
    href: "/templates",
    Icon: LayoutGrid,
    gradient: "from-green-500/20 via-emerald-500/15 to-transparent",
    iconColor: "text-green-400",
  },
];

const DashboardPage = () => {
  const { customerData } = useAuth();
  const { generations, loading } = useCustomerGenerations(customerData?.email);

  const running = generations.filter((g) => g.status === "running" || g.status === "queued");
  const completed = generations.filter((g) => g.status === "completed");

  const credits = customerData?.credits ?? 0;
  const planId = customerData?.plan ?? "free";
  const plan = PLANS.find((p) => p.id === planId);
  const monthlyAllowance = plan?.monthlyCredits ?? 50;
  const used = Math.max(0, monthlyAllowance - credits);
  const usedPct = Math.min(100, Math.round((used / monthlyAllowance) * 100));

  const stats = [
    { label: "Aktif Üretim", value: running.length, icon: Clock, color: "text-purple-400" },
    { label: "Tamamlanan", value: completed.length, icon: CheckCircle2, color: "text-green-400" },
    { label: "Toplam Üretim", value: generations.length, icon: Sparkles, color: "text-blue-400" },
    { label: "Mevcut Kredi", value: credits, icon: Coins, color: "text-[var(--lime)]" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hoşgeldin + Kredi göstergesi */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--lime)]/10 via-white/5 to-transparent border border-[var(--lime)]/20 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hoş geldin, {customerData?.name?.split(" ")[0] || "Kullanıcı"} 👋
            </h1>
            <p className="text-sm text-gray-400 mt-1">İşte hesabının özeti</p>
            <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-[var(--lime)]/20 text-[var(--lime)] text-[10px] font-black uppercase tracking-widest">
              <Zap size={10} />
              {plan?.id.toUpperCase() ?? "FREE"} PLAN
            </span>
          </div>

          {/* Credit gauge */}
          <div className="md:w-72 w-full">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-300 font-bold flex items-center gap-1.5">
                <Coins size={14} className="text-[var(--lime)]" />
                {credits} / {monthlyAllowance} kredi
              </span>
              <span className="text-gray-500">{100 - usedPct}% kaldı</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--lime)] to-[var(--electric-blue)] transition-all duration-700 ease-out"
                style={{ width: `${100 - usedPct}%` }}
              />
            </div>
            <Link
              href="/dashboard/credits"
              className="inline-flex items-center gap-1 text-[11px] text-[var(--lime)] hover:underline mt-2"
            >
              Kredi yükle <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white">{loading ? "..." : stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.Icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`group relative overflow-hidden bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[var(--lime)]/30 transition-all duration-300 hover:-translate-y-0.5`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${action.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[var(--lime)] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-[var(--lime)] font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                  Başla <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent generations */}
      <div className="bg-white/5 border border-white/5 rounded-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Wand2 size={16} className="text-[var(--lime)]" /> Son Üretimler
          </h2>
          <Link href="/dashboard/files" className="text-xs text-[var(--lime)] hover:underline flex items-center gap-1">
            Tümünü Gör <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="divide-y divide-white/5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-white/5 rounded" />
                    <div className="h-2 w-20 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-5 w-16 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        ) : generations.length === 0 ? (
          <div className="p-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--lime)]/30 to-[var(--electric-blue)]/30 blur-xl" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--lime)]/20 to-[var(--electric-blue)]/10 border border-[var(--lime)]/20 flex items-center justify-center">
                <Sparkles size={32} className="text-[var(--lime)]" />
              </div>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Henüz üretimin yok</h3>
            <p className="text-gray-500 text-sm mb-5">İlk şablonu seç, AI saniyeler içinde üretsin.</p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 hover:scale-[1.02] transition-all"
            >
              <Plus size={14} /> İlk Üretimini Başlat
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {generations.slice(0, 5).map((job) => {
              const status = STATUS_MAP[job.status] || STATUS_MAP["queued"];
              return (
                <div key={job.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center text-[var(--lime)] text-lg">
                      {KIND_EMOJI[job.kind] ?? "✨"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{KIND_LABEL[job.kind] ?? "Üretim"}</p>
                      <p className="text-[10px] text-gray-500">
                        {job.createdAt && typeof job.createdAt === "object" && "toDate" in job.createdAt
                          ? (job.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status.color} ${status.pulse ? "animate-pulse" : ""}`}>
                      {status.label}
                    </span>
                    <span className="text-sm font-bold text-[var(--lime)] flex items-center gap-1">
                      <Coins size={12} /> {job.creditsUsed}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
