"use client";

import { useI18n } from "@/lib/i18n";
import { Search, Video, ShoppingBag, User, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
}

/* ─── Tek Kart Bileşeni (hover efektli) ─── */
const HeroCard = ({
  card,
  index,
  mounted,
}: {
  card: ServiceCard;
  index: number;
  mounted: boolean;
}) => {
  return (
    <div
      className={`group/card rounded-2xl p-5 shadow-md border border-[var(--dark-blue)]/8 backdrop-blur-sm w-[240px] transition-all duration-700 hover:scale-105 hover:-rotate-1 hover:shadow-xl ${card.color}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
        transitionDelay: `${0.2 + index * 0.15}s`,
        transitionTimingFunction: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      }}
    >
      <span
        className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 ${card.labelBg}`}
      >
        {card.label}
      </span>

      <h3 className="text-base font-bold text-[var(--dark-blue)] leading-snug">
        {card.title}
      </h3>

      <p className="text-xs text-[var(--dark-blue)]/70 mt-1 leading-relaxed">
        {card.description}
      </p>

      {card.stat ? (
        <div className="mt-2.5">
          <span className="text-[10px] font-bold text-[var(--dark-blue)]/50 bg-[var(--dark-blue)]/5 px-2 py-0.5 rounded">
            {card.stat}
          </span>
        </div>
      ) : (
        <div className="mt-2.5 text-[var(--dark-blue)]/30 transition-transform duration-300 group-hover/card:scale-125 group-hover/card:text-[var(--lime)]">
          {card.icon}
        </div>
      )}
    </div>
  );
};

/* ─── Mobil Kart (toplanma animasyonu) ─── */
const MobileCard = ({
  card,
  index,
  mounted,
}: {
  card: ServiceCard;
  index: number;
  mounted: boolean;
}) => {
  // Her kart farklı yönden gelir
  const directions = [
    { x: -60, y: 40 },  // sol alttan
    { x: 60, y: 40 },   // sağ alttan
    { x: -60, y: -40 },  // sol üstten
    { x: 60, y: -40 },   // sağ üstten
  ];
  const dir = directions[index] || { x: 0, y: 40 };

  return (
    <div
      className={`rounded-xl p-4 shadow-md border border-[var(--dark-blue)]/8 backdrop-blur-sm ${card.color}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translate(0, 0) scale(1) rotate(0deg)"
          : `translate(${dir.x}px, ${dir.y}px) scale(0.8) rotate(${index % 2 === 0 ? -8 : 8}deg)`,
        transition: `all 0.8s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + index * 0.12}s`,
      }}
    >
      <span
        className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-2 ${card.labelBg}`}
      >
        {card.label}
      </span>
      <h3 className="text-sm font-bold text-[var(--dark-blue)] leading-snug">
        {card.title}
      </h3>
      <p className="text-[11px] text-[var(--dark-blue)]/60 mt-0.5 leading-relaxed">
        {card.description}
      </p>
      {card.stat && (
        <span className="inline-block mt-1.5 text-[9px] font-bold text-[var(--dark-blue)]/40 bg-[var(--dark-blue)]/5 px-1.5 py-0.5 rounded">
          {card.stat}
        </span>
      )}
    </div>
  );
};

/* ─── Ana Hero Bileşeni ─── */
export const Hero = () => {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cards: ServiceCard[] = [
    {
      label: lang === "en" ? "VIDEO" : "VİDEO",
      title: lang === "en" ? "AI Ad Film" : "AI Reklam Filmi",
      description:
        lang === "en"
          ? "Produce your brand film in days."
          : "Marka filminizi günler içinde üretin.",
      stat: lang === "en" ? "5-day delivery" : "5 günde teslimat",
      icon: <Video size={18} />,
      color: "bg-[var(--cream)]",
      labelBg: "bg-[var(--lime)] text-[var(--dark-blue)]",
      desktopStyle: { top: "14%", left: "2%" },
    },
    {
      label: lang === "en" ? "E-COMMERCE" : "E-TİCARET",
      title: lang === "en" ? "AI Product Visuals" : "AI Ürün Görseli",
      description:
        lang === "en"
          ? "Studio-quality product photography."
          : "Stüdyo kalitesinde ürün çekimi.",
      stat: lang === "en" ? "70% cost savings" : "%70 maliyet tasarrufu",
      icon: <ShoppingBag size={18} />,
      color: "bg-[var(--lime)]/15",
      labelBg: "bg-[var(--dark-blue)] text-[var(--lime)]",
      desktopStyle: { top: "12%", right: "2%" },
    },
    {
      label: "AVATAR",
      title: lang === "en" ? "Digital Avatar" : "Dijital Avatar",
      description:
        lang === "en"
          ? "Create content without a camera."
          : "Kamera olmadan içerik üretin.",
      icon: <User size={18} />,
      color: "bg-white/80",
      labelBg: "bg-[var(--dark-blue)]/10 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "16%", left: "4%" },
    },
    {
      label: "PLATFORM",
      title: lang === "en" ? "Social Media" : "Sosyal Medya",
      description:
        lang === "en"
          ? "One video, four platforms. Zero friction."
          : "Bir video, dört platform. Sıfır sürtünme.",
      stat: lang === "en" ? "48+ completed projects" : "48+ tamamlanan proje",
      icon: <Share2 size={18} />,
      color: "bg-[var(--lime)]/10",
      labelBg: "bg-[var(--lime)]/80 text-[var(--dark-blue)]",
      desktopStyle: { bottom: "14%", right: "3%" },
    },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      aria-label={lang === "en" ? "Hero section — AI creative agency" : "Ana bölüm — AI kreatif ajans"}
    >
      {/* ─── Arka Plan Video (mobilde gizli) ─── */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          poster="/kaplan-yatay.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--background)]/85" />
      </div>

      {/* ─── Desktop: Absolute Kartlar (hover efektli) ─── */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className="absolute pointer-events-auto"
            style={card.desktopStyle}
          >
            <HeroCard card={card} index={i} mounted={mounted} />
          </div>
        ))}
      </div>

      {/* ─── Merkez İçerik ─── */}
      <div className="relative z-20 text-center flex flex-col items-center gap-5 px-4 max-w-2xl mx-auto mb-48 md:mb-0">
        {/* Küçük üst yazı */}
        <p
          className="text-[var(--dark-blue)]/50 tracking-wide"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "1.15rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s",
          }}
        >
          {lang === "en" ? "your niche, amplified" : "nişini büyüt, farkını yarat"}
        </p>

        {/* Büyük El Yazısı Başlık (Caveat) */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--dark-blue)] leading-[1.05]"
          style={{
            fontFamily: "'Caveat', cursive",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) rotate(0deg)" : "translateY(50px) rotate(-2deg)",
            transition: "all 0.9s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s",
          }}
        >
          {lang === "en"
            ? "what's your brand's next move?"
            : "markanın bir sonraki adımı ne?"}
        </h1>

        {/* Arama Çubuğu Görünümlü CTA */}
        <Link
          href="/configure/reels"
          className="group flex items-center gap-3 w-full max-w-md px-5 py-3.5 rounded-full border-2 border-[var(--dark-blue)]/15 bg-white/70 backdrop-blur-sm hover:border-[var(--lime)] hover:shadow-lg hover:bg-white/90 transition-all duration-300"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s",
          }}
        >
          <Search
            size={18}
            className="text-[var(--dark-blue)]/40 group-hover:text-[var(--lime)] transition-colors shrink-0"
          />
          <span className="text-sm text-[var(--dark-blue)]/50 font-medium">
            {lang === "en"
              ? "Pick your need & calculate your price..."
              : "İhtiyacını seç ve fiyatını hesapla..."}
          </span>
        </Link>
      </div>

      {/* ─── Mobil Kartlar (toplanma animasyonu) ─── */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {cards.map((card, i) => (
            <MobileCard key={card.label} card={card} index={i} mounted={mounted} />
          ))}
        </div>
      </div>
    </section>
  );
};
