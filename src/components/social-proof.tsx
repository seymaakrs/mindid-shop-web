"use client";

import { useI18n } from "@/lib/i18n";
import { Shield, Clock, Award, Globe } from "lucide-react";

const stats = [
  {
    value: "48+",
    label: { tr: "Tamamlanan Proje", en: "Completed Projects" },
    icon: Award,
  },
  {
    value: "70%",
    label: { tr: "Maliyet Tasarrufu", en: "Cost Savings" },
    icon: Shield,
  },
  {
    value: "3-5",
    label: { tr: "Gün Teslimat", en: "Day Delivery" },
    icon: Clock,
  },
  {
    value: "10+",
    label: { tr: "Ülkede Müşteri", en: "Countries Served" },
    icon: Globe,
  },
];

const trustBadges = [
  { tr: "Güvenli Ödeme", en: "Secure Payment" },
  { tr: "Teslimat Garantisi", en: "Delivery Guarantee" },
  { tr: "2 Ücretsiz Revizyon", en: "2 Free Revisions" },
  { tr: "7/24 Online Destek", en: "24/7 Online Support" },
];

export const SocialProof = () => {
  const { lang } = useI18n();

  return (
    <section className="relative z-10 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/15 p-4 text-center hover:border-[var(--lime)]/30 transition-all"
            >
              <stat.icon size={20} className="text-[var(--foreground)] mx-auto mb-2" />
              <div className="text-2xl font-black text-[var(--foreground)]">{stat.value}</div>
              <div className="text-[10px] text-[var(--foreground)]/60 font-bold uppercase tracking-wider">
                {lang === "en" ? stat.label.en : stat.label.tr}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--electric-blue)]/8 border border-[var(--electric-blue)]/15"
            >
              <Shield size={12} className="text-[var(--foreground)]" />
              <span className="text-[10px] font-bold text-[var(--foreground)]/70">
                {lang === "en" ? badge.en : badge.tr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
