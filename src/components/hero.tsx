"use client";

import { useI18n } from "@/lib/i18n";
import {
  Video,
  ShoppingBag,
  User,
  Share2,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Floating Animasyon CSS ─── */
const floatStyles = `
  @keyframes float-a {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-12px) rotate(var(--rot)); }
  }
  @keyframes float-b {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-18px) rotate(var(--rot)); }
  }
  @keyframes float-c {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-10px) rotate(var(--rot)); }
  }
  @keyframes float-d {
    0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
    50%       { transform: translateY(-15px) rotate(var(--rot)); }
  }
  .float-a { animation: float-a 5.2s ease-in-out infinite; }
  .float-b { animation: float-b 6.8s ease-in-out infinite; }
  .float-c { animation: float-c 4.9s ease-in-out infinite; }
  .float-d { animation: float-d 7.4s ease-in-out infinite; }

  @keyframes ambient-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%      { opacity: 0.85; transform: scale(1.08); }
  }
  .ambient-glow { animation: ambient-glow 6s ease-in-out infinite; }
`;

/* ─── Hizmet Kartı Tipi ─── */
interface ServiceCard {
  label: string;
  title: string;
  description: string;
  stat?: string;
  icon: React.ReactNode;
  color: string;
  labelBg: string;
  desktopStyle: React.CSSProperties;
  floatClass: string;
  rotation: string;
}

const HeroCard = ({
  card,
  index,
  visible,
  scatterOffset,
  enableFloat,
}: {
  card: ServiceCard;
  index: number;
  visible: boolean;
  scatterOffset: string;
  enableFloat: boolean;
}) => {
  return (
    <div
      className={`${enableFloat ? card.floatClass : ""} group/card rounded-2xl p-5 shadow-lg border border-[var(--dark-blue)]/10 backdrop-blur-sm w-[260px] cursor-pointer ${card.color}`}
      style={
        {
          "--rot": card.rotation,
          opacity: visible ? 1 : 0,
          transform: visible
            ? `translate(0, 0) scale(1) rotate(${card.rotation})`
            : `${scatterOffset} scale(0.3) rotate(${index % 2 === 0 ? "20deg" : "-20deg"})`,
          transition: `opacity 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, transform 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, box-shadow 0.3s ease`,
          animationDelay: enableFloat ? `${index * 0.9}s` : undefined,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        } as React.CSSProperties
      }
    >
      <span
        className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2.5 ${card.labelBg}`}
      >
        {card.label}
      </span>

      <h3 className="text-[16px] font-bold text-[var(--dark-blue)] leading-snug">
        {card.title}
      </h3>

      <p className="text-[12px] text-[var(--dark-blue)]/65 mt-1 leading-relaxed">
        {card.description}
      </p>

      {card.stat ? (
        <div className="mt-2.5">
          <span className="text-[11px] font-bold text-[var(--dark-blue)]/55 bg-[var(--dark-blue)]/8 px-2 py-0.5 rounded">
            {card.stat}
          </span>
        </div>
      ) : (
        <div className="mt-2.5 text-[var(--dark-blue)]/30 transition-all duration-300 group-hover/card:scale-125 group-hover/card:text-[var(--lime)]">
          {card.icon}
        </div>
      )}
    </div>
  );
};

/* ─── Ana Hero Bileşeni ─── */
export const Hero = () => {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [cardsOut, setCardsOut] = useState(false);
  const [floatActive, setFloatActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setCardsOut(true), 900);
    const t3 = setTimeout(() => setFloatActive(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const cards: ServiceCard[] = [
    {
      label: lang === "en" ? "VIDEO" : "VİDEO",
      title: lang === "en" ? "AI Ad Film" : "AI Reklam Filmi",
      description:
        lang === "en"
          ? "Brand films in days, not months."
          : "Marka filmin günlerde hazır.",
      stat: lang === "en" ? "5-day delivery" : "5 günde teslim",
      icon: <Video size={18} />,
      color: "bg-[var(--cream)]",
      labelBg: "bg-[var(--lime)] text-[var(--dark-blue)]",
      desktopStyle: { top: "8%", left: "2%" },
      floatClass: "float-a",
      rotation: "-3deg",
    },
    {
      label: lang === "en" ? "E-COMMERCE" : "E-TİCARET",
      title: lang === "en" ? "AI Product Visuals" : "AI Ürün Görseli",
      description:
        lang === "en"
          ? "Studio-quality product photos."
          : "Stüdyo kalitesinde ürün foto.",
      stat: lang === "en" ? "70% cheaper" : "%70 daha ucuz",
      icon: <ShoppingBag size={18} />,
      color: "bg-[var(--lime)]/15",
      labelBg: "bg-[var(--dark-blue)] text-[var(--lime)]",
      desktopStyle: { top: "6%", right: "2%" },
      floatClass: "float-b",
      rotation: "2.5deg",
    },
    {
      label: "AVATAR",
      title: lang === "en" ? "Digital Avatar" : "Dijital Avatar",
      description:
        lang === "en"
          ? "Content without a camera."
          : "Kamera olmadan içerik.",
      icon: <User size={18} />,
      color: "bg-white/85",
      labelBg: "bg-[var(--dark-blue)]/10 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "10%", left: "3%" },
      floatClass: "float-c",
      rotation: "1.8deg",
    },
    {
      label: lang === "en" ? "SOCIAL" : "SOSYAL",
      title: lang === "en" ? "Social Media" : "Sosyal Medya",
      description:
        lang === "en"
          ? "One video, every platform."
          : "Bir video, tüm platformlar.",
      stat: lang === "en" ? "80+ projects" : "80+ proje",
      icon: <Share2 size={18} />,
      color: "bg-[var(--lime)]/10",
      labelBg: "bg-[var(--lime)]/80 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "8%", right: "2%" },
      floatClass: "float-d",
      rotation: "-2deg",
    },
  ];

  const scatterOffsets = [
    "translate(32vw, 25vh)",
    "translate(-32vw, 25vh)",
    "translate(32vw, -22vh)",
    "translate(-32vw, -22vh)",
  ];

  /* ─── How it works steps ─── */
  const steps = lang === "en"
    ? [
        { icon: <Target size={18} />, title: "Pick a pack", emoji: "🎯" },
        { icon: <Zap size={18} />, title: "AI creates", emoji: "⚡" },
        { icon: <Download size={18} />, title: "Share & sell", emoji: "📥" },
      ]
    : [
        { icon: <Target size={18} />, title: "Paket seç", emoji: "🎯" },
        { icon: <Zap size={18} />, title: "AI üretsin", emoji: "⚡" },
        { icon: <Download size={18} />, title: "Paylaş, kazan", emoji: "📥" },
      ];

  return (
    <>
      <style>{floatStyles}</style>
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10 pt-20 md:pt-24 pb-8"
        aria-label={
          lang === "en"
            ? "Hero — AI content production platform for brands"
            : "Ana bölüm — Markalar için AI içerik üretim platformu"
        }
      >
        {/* ─── Arka Plan Video ─── */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            poster="/kaplan-yatay.png"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[var(--background)]/55" />
        </div>

        {/* ─── Ambient Lime Glow (decorative) ─── */}
        <div
          aria-hidden
          className="hidden md:block absolute z-0 ambient-glow pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            width: "600px",
            height: "400px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(173,233,79,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* ─── Desktop: Floating Kartlar (decorative, behind text on smaller screens) ─── */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="absolute pointer-events-auto"
              style={card.desktopStyle}
            >
              <HeroCard
                card={card}
                index={i}
                visible={cardsOut}
                scatterOffset={scatterOffsets[i]}
                enableFloat={floatActive}
              />
            </div>
          ))}
        </div>

        {/* ─── Merkez İçerik ─── */}
        <div className="relative z-20 flex flex-col items-center gap-5 md:gap-6 px-4 max-w-3xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40 backdrop-blur-sm"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s",
            }}
          >
            <Sparkles size={14} className="text-[var(--dark-blue)]" />
            <span className="text-[11px] md:text-xs font-bold tracking-wider uppercase text-[var(--dark-blue)]">
              {lang === "en"
                ? "Türkiye's AI content studio"
                : "Türkiye'nin AI içerik stüdyosu"}
            </span>
          </div>

          {/* Headline — Ruthless clarity */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[var(--dark-blue)] leading-[1.02] tracking-tight"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s",
            }}
          >
            {lang === "en" ? (
              <>
                No studio.<br />
                No models.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Just AI.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-[var(--lime)] -z-0 -skew-x-3"
                  />
                </span>
              </>
            ) : (
              <>
                Manken yok.<br />
                Stüdyo yok.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">AI var.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-[var(--lime)] -z-0 -skew-x-3"
                  />
                </span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p
            className="text-base md:text-lg text-[var(--dark-blue)]/75 max-w-xl leading-relaxed font-medium"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s",
            }}
          >
            {lang === "en"
              ? "Reels, product photos and social content in seconds. 70% lower cost."
              : "Reels, ürün fotoğrafı ve sosyal medya içeriklerini saniyeler içinde üret. %70 daha az maliyet."}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-1"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s",
            }}
          >
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] font-black text-sm md:text-base tracking-wide shadow-[0_8px_24px_rgba(173,233,79,0.45)] hover:shadow-[0_12px_32px_rgba(173,233,79,0.6)] hover:scale-[1.03] transition-all duration-300"
            >
              {lang === "en" ? "Try Free" : "Ücretsiz Dene"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent text-[var(--dark-blue)] font-bold text-sm md:text-base border-2 border-[var(--dark-blue)]/25 hover:border-[var(--dark-blue)] hover:bg-[var(--dark-blue)]/5 transition-all duration-300"
            >
              {lang === "en" ? "See Templates" : "Şablonları Gör"}
            </Link>
          </div>

          {/* Trust Strip */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] md:text-[13px] font-semibold text-[var(--dark-blue)]/65 mt-1"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.7s ease 0.8s",
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">🐯</span>
              {lang === "en" ? "80+ projects" : "80+ proje"}
            </span>
            <span className="text-[var(--dark-blue)]/20">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">⚡</span>
              {lang === "en" ? "Seconds to result" : "Saniyeler içinde sonuç"}
            </span>
            <span className="text-[var(--dark-blue)]/20">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base">⭐</span>
              {lang === "en" ? "98% satisfaction" : "%98 memnuniyet"}
            </span>
          </div>
        </div>

        {/* ─── How it works — 3 step strip ─── */}
        <div
          className="relative z-20 mt-8 md:mt-12 px-4 w-full max-w-2xl mx-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 1s",
          }}
        >
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-3 py-3 md:py-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[var(--dark-blue)]/10 shadow-sm hover:shadow-md hover:border-[var(--lime)]/50 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--lime)]/25 text-base md:text-lg shrink-0">
                  {step.emoji}
                </span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-[var(--dark-blue)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] md:text-sm font-bold text-[var(--dark-blue)] whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Tablet/Mobile cards strip (below all content) ─── */}
        <div className="relative z-20 mt-8 px-4 w-full max-w-4xl mx-auto lg:hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {cards.map((card, i) => (
              <div
                key={card.label}
                className={`rounded-xl p-3.5 shadow-md border border-[var(--dark-blue)]/8 backdrop-blur-sm ${card.color}`}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) ${1.2 + i * 0.1}s`,
                }}
              >
                <span
                  className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-1.5 ${card.labelBg}`}
                >
                  {card.label}
                </span>
                <h3 className="text-[13px] font-bold text-[var(--dark-blue)] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11px] text-[var(--dark-blue)]/60 mt-0.5 leading-relaxed">
                  {card.description}
                </p>
                {card.stat && (
                  <span className="inline-block mt-1.5 text-[9px] font-bold text-[var(--dark-blue)]/50 bg-[var(--dark-blue)]/8 px-1.5 py-0.5 rounded">
                    {card.stat}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
