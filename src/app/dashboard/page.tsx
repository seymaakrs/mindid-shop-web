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
} from "lucide-react";
import Link from "next/link";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  queued: { label: "Kuyrukta", color: "text-blue-400 bg-blue-500/10" },
  running: { label: "Üretiliyor", color: "text-purple-400 bg-purple-500/10" },
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

const DashboardPage = () => {
  const { customerData } = useAuth();
  const { generations, loading } = useCustomerGenerations(customerData?.email);

  const running = generations.filter((g) => g.status === "running" || g.status === "queued");
  const completed = generations.filter((g) => g.status === "completed");
  const totalCreditsSpent = customerData?.totalCreditsSpent ?? 0;

  const stats = [
    { label: "Aktif Üretim", value: running.length, icon: Clock, color: "text-purple-400" },
    { label: "Tamamlanan", value: completed.length, icon: CheckCircle2, color: "text-green-400" },
    { label: "Toplam Üretim", value: generations.length, icon: Sparkles, color: "text-blue-400" },
    { label: "Mevcut Kredi", value: customerData?.credits ?? 0, icon: Coins, color: "text-[var(--lime)]" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hoş geldin, {customerData?.name?.split(" ")[0] || "Kullanıcı"} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">İşte hesabının özeti</p>
        </div>
        <Link
          href="/templates"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
        >
          <Plus size={16} /> Yeni Üretim
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white">{loading ? "..." : stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "AI Video", desc: "Reels, reklam, tanıtım", href: "/ai-reklam-filmi", emoji: "🎬" },
          { title: "AI Görsel", desc: "Ürün, kampanya, banner", href: "/ai-gorsel", emoji: "📸" },
          { title: "Dijital Avatar", desc: "Kameraya çıkmadan üret", href: "/avatar", emoji: "🧑‍🎤" },
          { title: "Şablonlar", desc: "Hazır kalıplarla başla", href: "/templates", emoji: "✨" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[var(--lime)]/30 transition-all"
          >
            <div className="text-2xl mb-3">{action.emoji}</div>
            <h3 className="text-sm font-bold text-white group-hover:text-[var(--lime)] transition-colors">
              {action.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-[var(--lime)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Başla <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

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
          <div className="p-8 text-center text-gray-500 text-sm">Yükleniyor...</div>
        ) : generations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm mb-4">Henüz üretimin yok</p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
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
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status.color}`}>
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
