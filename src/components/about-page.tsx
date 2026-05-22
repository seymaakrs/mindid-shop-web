"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowLeft, Clapperboard, Brain, Palette, Volume2, BarChart3, Camera, Code, Megaphone, Lightbulb, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const pillars = [
  { icon: <Brain size={20} />, titleTr: "AI Modelleri", titleEn: "AI Models", descTr: "Video, görsel ve avatar üretimi için kurumsal sınıf modeller.", descEn: "Enterprise-grade models for video, image and avatar generation." },
  { icon: <Palette size={20} />, titleTr: "Yaratıcı Sistem", titleEn: "Creative System", descTr: "Şablon, marka kiti ve stil önayarlarıyla tutarlı çıktı.", descEn: "Templates, brand kits and style presets for consistent output." },
  { icon: <Volume2 size={20} />, titleTr: "Ses & Müzik", titleEn: "Voice & Music", descTr: "AI seslendirme ve lisanslı müzik kütüphanesi entegre.", descEn: "Integrated AI voice and licensed music library." },
  { icon: <BarChart3 size={20} />, titleTr: "Analitik", titleEn: "Analytics", descTr: "Üretim performansı, kredi kullanımı ve A/B testi izleme.", descEn: "Track generation performance, credit usage and A/B testing." },
];

const principles = [
  { icon: <Sparkles size={20} />, titleTr: "Self-service", titleEn: "Self-service", descTr: "Brief yok, satış görüşmesi yok. Tarayıcıdan üret, anında indir.", descEn: "No briefs, no sales calls. Generate in-browser, download instantly." },
  { icon: <Code size={20} />, titleTr: "API ve entegrasyon", titleEn: "API & integrations", descTr: "Scale planında API ve webhook. Akışına yerleştir.", descEn: "API and webhooks on Scale plan. Fits into your workflow." },
  { icon: <Camera size={20} />, titleTr: "Marka tutarlılığı", titleEn: "Brand consistency", descTr: "Marka kiti, renk paleti ve avatar ile her üretim tutarlı.", descEn: "Brand kit, palette and avatar keep every output on-brand." },
  { icon: <Megaphone size={20} />, titleTr: "Yayına hazır", titleEn: "Ship-ready", descTr: "Reels, banner, kampanya — platform boyutları otomatik.", descEn: "Reels, banners, campaigns — platform sizes handled automatically." },
];

export const AboutPage = () => {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--foreground)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} /> {lang === "en" ? "Home" : "Ana Sayfa"}
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] flex items-center justify-center">
            <Clapperboard size={28} className="text-[var(--dark-blue)]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)]">
              {lang === "en" ? "What MindID does" : "MindID Ne Yapar?"}
            </h1>
            <p className="text-sm text-[var(--gray)]">{t("about.subtitle")}</p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 mb-10 animate-kinetic-slide">
          <p className="text-[var(--foreground)]/90 leading-relaxed">
            {t("about.desc")}
          </p>
        </div>

        <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
          <Lightbulb size={24} /> {lang === "en" ? "Platform Pillars" : "Platform Sütunları"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {pillars.map((item, i) => (
            <div key={i} className="p-5 rounded-md bg-[var(--card)] border-3 border-[var(--lime)]/20 hover:border-[var(--lime)] transition-colors">
              <div className="w-10 h-10 rounded-md bg-[var(--lime)]/10 flex items-center justify-center text-[var(--foreground)] mb-3">
                {item.icon}
              </div>
              <h3 className="font-black text-[var(--foreground)] mb-1">{lang === "en" ? item.titleEn : item.titleTr}</h3>
              <p className="text-sm text-[var(--foreground)]/70">{lang === "en" ? item.descEn : item.descTr}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
          <Users size={24} /> {lang === "en" ? "How we think" : "Nasıl Düşünüyoruz"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {principles.map((p, i) => (
            <div key={i} className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex items-start gap-3 hover:border-[var(--lime)]/40 transition-colors">
              <div className="w-10 h-10 rounded-md bg-[var(--lime)]/10 flex items-center justify-center text-[var(--foreground)] shrink-0">
                {p.icon}
              </div>
              <div>
                <h4 className="font-bold text-[var(--foreground)] text-sm">{lang === "en" ? p.titleEn : p.titleTr}</h4>
                <p className="text-xs text-[var(--gray)] mt-0.5">{lang === "en" ? p.descEn : p.descTr}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="inline-flex px-8 py-4 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-black hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            {lang === "en" ? "Start Free →" : "Ücretsiz Başla →"}
          </Link>
        </div>
      </div>
    </div>
  );
};
