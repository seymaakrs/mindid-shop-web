"use client";

import { useI18n } from "@/lib/i18n";
import { useRef, useState } from "react";
import { Play, Pause, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const videos = [
  { src: "/ai-studio/1.mp4", labelTr: "Reels Şablonu", labelEn: "Reels Template", kind: "video" },
  { src: "/ai-studio/2.mp4", labelTr: "Ürün Tanıtım", labelEn: "Product Promo", kind: "video" },
  { src: "/ai-studio/3.mp4", labelTr: "Kampanya Filmi", labelEn: "Campaign Film", kind: "video" },
  { src: "/ai-studio/4.mp4", labelTr: "Marka Spotu", labelEn: "Brand Spot", kind: "video" },
  { src: "/ai-studio/5.mp4", labelTr: "Avatar Sahne", labelEn: "Avatar Scene", kind: "avatar" },
  { src: "/ai-studio/6.mp4", labelTr: "Sosyal Post", labelEn: "Social Post", kind: "social" },
  { src: "/ai-studio/7.mp4", labelTr: "Lifestyle Sahne", labelEn: "Lifestyle Scene", kind: "image" },
];

const KIND_BADGE: Record<string, { tr: string; en: string; bg: string }> = {
  video: { tr: "AI VİDEO", en: "AI VIDEO", bg: "bg-[var(--lime)]" },
  image: { tr: "AI GÖRSEL", en: "AI IMAGE", bg: "bg-white" },
  avatar: { tr: "AVATAR", en: "AVATAR", bg: "bg-[var(--electric-blue)] text-white" },
  social: { tr: "SOSYAL", en: "SOCIAL", bg: "bg-[var(--lime)]/80" },
};

const VideoCard = ({ src, label, kind, lang }: { src: string; label: string; kind: string; lang: "tr" | "en" | "es" }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const badge = KIND_BADGE[kind] ?? KIND_BADGE.video;
  const isEn = lang === "en";

  const toggle = () => {
    if (!loaded) {
      setLoaded(true);
      setTimeout(() => {
        ref.current?.play();
        setPlaying(true);
      }, 100);
      return;
    }
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="group relative flex-shrink-0 w-52 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-[var(--dark-blue)]/10 hover:border-[var(--lime)]/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ background: "linear-gradient(135deg, var(--dark-blue) 0%, var(--accent) 100%)" }}
      onClick={toggle}
    >
      {loaded && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Kind badge — sol üst */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-md text-[var(--dark-blue)] ${badge.bg}`}>
          {isEn ? badge.en : badge.tr}
        </span>
      </div>

      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[var(--lime)] flex items-center justify-center shadow-[0_6px_20px_rgba(173,233,79,0.4)] group-hover:scale-110 transition-transform">
            <Play size={28} className="text-[var(--dark-blue)] ml-1" />
          </div>
          <span className="text-white/85 text-sm font-bold">{label}</span>
        </div>
      )}

      {playing && (
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--lime)]/90 flex items-center justify-center">
              <Pause size={14} className="text-[var(--dark-blue)]" />
            </div>
            <span className="text-white text-xs font-bold">{label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const AIStudioShowcase = () => {
  const { lang } = useI18n();
  const isEn = lang === "en";

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--lime)]/15 border border-[var(--lime)]/30 text-[var(--dark-blue)] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            {isEn ? "Made with MindID" : "MindID ile üretildi"}
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)]"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            {isEn ? "FROM PROMPT TO PIXEL" : "PROMPT'TAN PİKSELE"}
          </h2>
          <p className="text-center text-[var(--gray)] mt-3 max-w-xl mx-auto text-sm md:text-base">
            {isEn
              ? "Real examples generated by MindID users — no studios, no shoot days, just credits."
              : "Gerçek MindID kullanıcılarının ürettikleri — stüdyo yok, çekim günü yok, sadece kredi."}
          </p>
        </div>
      </div>

      {/* Yatay kaydırmalı video galerisi */}
      <div
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarColor: "var(--accent) var(--background)" }}
      >
        <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />
        {videos.map((v) => (
          <div key={v.src} className="snap-center">
            <VideoCard
              src={v.src}
              label={isEn ? v.labelEn : v.labelTr}
              kind={v.kind}
              lang={lang}
            />
          </div>
        ))}
        <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />
      </div>

      {/* CTA + kaydırma ipucu */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[var(--muted)] text-xs">
          {isEn ? "← Swipe to see more →" : "← Daha fazlasını görmek için kaydırın →"}
        </p>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--dark-blue)] text-[var(--lime)] text-sm font-black hover:bg-[var(--electric-blue)] transition-colors"
        >
          {isEn ? "Browse all templates" : "Tüm şablonlara bak"}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

