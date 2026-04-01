"use client";

import { useI18n } from "@/lib/i18n";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ─── Sayı Sayma Hook'u ─── */
const useCountUp = (target: number, duration = 1.5, delay = 0) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return value;
};

/* ─── Stat Bileşeni ─── */
const StatItem = ({
  value,
  prefix = "",
  suffix = "",
  label,
  delay,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
}) => {
  const count = useCountUp(value, 1.5, delay);
  return (
    <div className="text-center">
      <div
        className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)]"
        style={{ fontFamily: "'Bebas Neue', cursive" }}
      >
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-[10px] md:text-xs text-[var(--gray)] font-bold uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
};

/* ─── Portfolio Scatter Grid ─── */
const portfolioItems = [
  { src: "/yuvarlak_-01.jpg", rotate: -4, x: "-12%", y: "8%" },
  { src: "/yuvarlak_-02.jpg", rotate: 3, x: "68%", y: "5%" },
  { src: "/yuvarlak_-03.jpg", rotate: -2, x: "-5%", y: "52%" },
  { src: "/yuvarlak_-04.jpg", rotate: 5, x: "75%", y: "48%" },
  { src: "/yuvarlak_-05.jpg", rotate: -3, x: "20%", y: "72%" },
  { src: "/yuvarlak_-06.jpg", rotate: 4, x: "55%", y: "70%" },
];

export const Hero = () => {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Kısa gecikme — hydration tamamlandıktan sonra animasyonları başlat
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      style={{ perspective: "800px" }}
    >
      {/* ─── Arka Plan Video (mobilde gizli — pil tasarrufu) ─── */}
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
        {/* Video üstüne overlay — okunabilirlik için */}
        <div className="absolute inset-0 bg-[var(--background)]/85" />
      </div>

      {/* ─── Arka Plan: Portfolio Scatter ─── */}
      <div className="absolute inset-0 pointer-events-none z-[1] hidden md:block">
        {portfolioItems.map((item, i) => (
          <div
            key={i}
            className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden shadow-lg transition-all duration-1000"
            style={{
              left: item.x,
              top: item.y,
              opacity: mounted ? 0.12 : 0,
              transform: mounted
                ? `rotate(${item.rotate}deg) scale(0.8)`
                : "rotate(0deg) scale(0.5)",
              transitionDelay: `${1.0 + i * 0.1}s`,
            }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
            />
          </div>
        ))}
      </div>

      {/* ─── Ana İçerik ─── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Büyük Başlık: REKLAM AJANSI */}
        <h1
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-[var(--foreground)] leading-none transition-all duration-700"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
            transitionDelay: "0.05s",
          }}
        >
          REKLAM AJANSI
        </h1>

        {/* VIBE MARKETING alt başlık */}
        <div
          className="mt-2 md:mt-4 transition-all duration-600"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "0.25s",
          }}
        >
          <span
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-wide"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              color: "var(--lime)",
              textShadow: "2px 2px 0px var(--dark-blue)",
            }}
          >
            VİBE MARKETİNG
          </span>
        </div>

        {/* ─── 3D Kaplan Görseli ─── */}
        <div
          className="relative z-10 mx-auto mt-4 md:mt-6 overflow-hidden transition-all duration-[1200ms]"
          style={{
            width: "clamp(200px, 55vw, 480px)",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "scale(1) rotateX(0deg)"
              : "scale(0.05) rotateX(30deg)",
            filter: mounted ? "blur(0px)" : "blur(20px)",
            transitionDelay: "0.4s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            className="relative"
            style={{
              /* Beyaz arka planı site arka planına çevir */
              backgroundColor: "var(--background)",
            }}
          >
            <Image
              src="/kaplan-kare.png"
              alt="MindID Kaplan Maskotu"
              width={1728}
              height={2304}
              className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
              priority
              sizes="(max-width: 768px) 260px, 42vw"
            />
          </div>
          {/* Kenarları site arka planına yumuşak eritme */}
          <div
            className="absolute inset-[-20%] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 55% at 50% 48%, transparent 40%, var(--background) 70%)`,
            }}
          />
        </div>

        {/* ─── Kısa Açıklama ─── */}
        <p
          className="text-base md:text-lg text-[var(--gray)] max-w-xl mx-auto mt-4 leading-relaxed transition-all duration-600"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1.2s",
          }}
        >
          {lang === "en"
            ? "AI-powered ad films, avatars & product visuals. Studio quality, 70% less cost."
            : "Yapay zeka ile reklam filmi, avatar ve ürün görseli. Stüdyo kalitesinde, %70 daha az maliyet."}
        </p>

        {/* ─── CTA Butonları ─── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-600"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1.5s",
          }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {lang === "en" ? "Select Your Need" : "İhtiyacını Seç"}
            <ArrowRight size={18} />
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-transparent border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 hover:border-[var(--lime)] transition-all"
          >
            <Play size={16} />
            {lang === "en" ? "Portfolio" : "Portföy"}
          </Link>
        </div>

        {/* ─── İstatistikler (Sayı Sayma) ─── */}
        <div
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto mt-8 sm:mt-10 transition-all duration-600"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1.8s",
          }}
        >
          <StatItem
            value={70}
            prefix="%"
            label={lang === "en" ? "Cost Savings" : "Maliyet Tasarrufu"}
            delay={1.8}
          />
          <div className="border-x-2 border-[var(--electric-blue)]/15 px-2">
            <StatItem
              value={5}
              suffix=" Gün"
              label={lang === "en" ? "Delivery" : "Teslimat"}
              delay={2.0}
            />
          </div>
          <StatItem
            value={48}
            suffix="+"
            label={lang === "en" ? "Projects" : "Proje"}
            delay={2.2}
          />
        </div>
      </div>
    </section>
  );
};
