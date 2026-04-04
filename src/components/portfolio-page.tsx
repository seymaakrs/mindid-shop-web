"use client";

import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { usePortfolio } from "@/lib/hooks/use-firestore";
import {
  motion,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { ShoppingBag, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayerModal } from "./video-player-modal";
import type { PortfolioItem } from "@/lib/firestore-types";

/* ── Hizmetler ── */
const SERVICES = [
  {
    id: "reels",
    nameTr: "AI Reels",
    nameEn: "AI Reels",
    tagTr: "Sosyal Medya Video",
    tagEn: "Social Media Video",
    price: "1.990",
    portfolioCategory: "reels",
    gradient: "linear-gradient(135deg, #2d1060 0%, #6b21a8 50%, #c084fc 100%)",
    configureId: "reels",
  },
  {
    id: "product-photo",
    nameTr: "AI Studio Görsel",
    nameEn: "AI Studio Visual",
    tagTr: "E-Ticaret Fotoğrafı",
    tagEn: "E-Commerce Photo",
    price: "1.490",
    portfolioCategory: "product-photo",
    gradient: "linear-gradient(135deg, #042a60 0%, #1e60a8 50%, #60a5fa 100%)",
    configureId: "product-photo",
  },
  {
    id: "product",
    nameTr: "AI Ürün Filmi",
    nameEn: "AI Product Film",
    tagTr: "Ürün Reklamı",
    tagEn: "Product Ad",
    price: "1.990",
    portfolioCategory: "product",
    gradient: "linear-gradient(135deg, #3c2a00 0%, #a16207 50%, #fbbf24 100%)",
    configureId: "product",
  },
  {
    id: "campaign",
    nameTr: "AI Kampanya",
    nameEn: "AI Campaign",
    tagTr: "Reklam Kampanyası",
    tagEn: "Ad Campaign",
    price: "1.990",
    portfolioCategory: "campaign",
    gradient: "linear-gradient(135deg, #3c0035 0%, #be185d 50%, #f472b6 100%)",
    configureId: "campaign",
  },
  {
    id: "corporate",
    nameTr: "AI Kurumsal",
    nameEn: "AI Corporate",
    tagTr: "Kurumsal Tanıtım",
    tagEn: "Corporate Film",
    price: "1.990",
    portfolioCategory: "corporate",
    gradient: "linear-gradient(135deg, #003c2a 0%, #059669 50%, #34d399 100%)",
    configureId: "corporate",
  },
  {
    id: "avatar",
    nameTr: "AI Avatar",
    nameEn: "AI Avatar",
    tagTr: "Dijital Temsilci",
    tagEn: "Digital Ambassador",
    price: "6.900",
    portfolioCategory: "avatar",
    gradient: "linear-gradient(135deg, #1a3a00 0%, #65a30d 50%, #ade94f 100%)",
    configureId: "avatar",
  },
  {
    id: "social-media",
    nameTr: "Sosyal Medya",
    nameEn: "Social Media",
    tagTr: "Yönetim & Büyüme",
    tagEn: "Management & Growth",
    price: "4.900",
    portfolioCategory: "reels",
    gradient: "linear-gradient(135deg, #3c1500 0%, #c2410c 50%, #fb923c 100%)",
    configureId: "social-media",
  },
];

/* ── Responsive breakpoint hook ── */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
};

/* ── Fan card transform — responsive ── */
const getCardTransform = (index: number, active: number, total: number, mobile: boolean) => {
  const offset = index - active;
  const absOffset = Math.abs(offset);
  const spread = mobile ? 50 : 72;
  const rot = mobile ? 6 : 5;

  return {
    x: offset * spread,
    rotate: offset * rot,
    scale: Math.max(0.7, 1 - absOffset * (mobile ? 0.08 : 0.07)),
    zIndex: total - absOffset,
    opacity: absOffset > (mobile ? 2 : 3) ? 0 : Math.max(0.25, 1 - absOffset * 0.22),
  };
};

/* ── Portfolio Page ── */
export const PortfolioPage = () => {
  const { lang } = useI18n();
  const { data: portfolio } = usePortfolio();
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const dragX = useMotionValue(0);
  const isMobile = useIsMobile();

  /* Responsive card dimensions */
  const cardW = isMobile ? 170 : 210;
  const cardH = isMobile ? 260 : 320;
  const containerH = isMobile ? 340 : 480;

  /* Thumbnail lookup */
  const thumbnailByCategory = useMemo(() => {
    const map: Record<string, PortfolioItem> = {};
    portfolio.forEach((item) => {
      if (item.thumbnailUrl && !map[item.category]) {
        map[item.category] = item;
      }
    });
    return map;
  }, [portfolio]);

  /* Background image */
  const bgImage = useMemo(() => {
    const item = portfolio.find((p) => p.thumbnailUrl);
    return item?.thumbnailUrl ?? null;
  }, [portfolio]);

  /* Nav */
  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(i, SERVICES.length - 1)));

  const activeService = SERVICES[activeIndex];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0a0714" }}>

      {/* ── Background ── */}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.12, filter: "blur(60px) saturate(1.5)" }}
            priority
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0, background: "radial-gradient(ellipse at 30% 40%, transparent 30%, #0a0714 75%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ zIndex: 0, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 sm:mb-10"
            style={{ background: "rgba(173,233,79,0.08)", border: "1px solid rgba(173,233,79,0.2)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={11} style={{ color: "#ade94f" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#ade94f" }}>
              {lang === "en" ? "Portfolio" : "Portfolyo"}
            </span>
          </motion.div>

          {/* ── Layout: Title + Cards ── */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">

            {/* ── LEFT: Title ── */}
            <div className="lg:w-[38%] lg:pr-4 lg:pt-8">
              <motion.p
                className="font-hand text-2xl sm:text-3xl lg:text-5xl italic mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
              >
                {lang === "en" ? "crafted for" : "markanız için"}
              </motion.p>
              <motion.h1
                className="font-black leading-[0.88] mb-4 sm:mb-6"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "#ffffff" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.05, 0.7, 0.1, 1] }}
              >
                {lang === "en" ? (
                  <>Best AI for<br /><span className="font-hand italic" style={{ color: "#ade94f" }}>your brand</span></>
                ) : (
                  <>En İyi AI<br /><span className="font-hand italic" style={{ color: "#ade94f" }}>hizmetler</span></>
                )}
              </motion.h1>
              <motion.p
                className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-8 max-w-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {lang === "en"
                  ? "Transform your brand with AI-crafted ads, visuals, and digital avatars. Swipe to explore."
                  : "Yapay zeka ile reklam filmi, görsel ve dijital avatar. Kaydırarak keşfedin."}
              </motion.p>

              {/* Desktop: active service info + CTA */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  className="mb-8 hidden lg:block"
                >
                  <p className="text-lg font-black text-white mb-1">
                    {lang === "en" ? activeService.nameEn : activeService.nameTr}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {lang === "en" ? activeService.tagEn : activeService.tagTr}
                  </p>
                  <p className="font-hand text-2xl mt-2" style={{ color: "#ade94f" }}>
                    {activeService.price}₺
                  </p>
                  <Link
                    href={`/configure/${activeService.configureId}`}
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full font-black text-sm transition-all hover:brightness-110 active:scale-95"
                    style={{ background: "#ade94f", color: "#0a0714" }}
                  >
                    <ShoppingBag size={15} />
                    {lang === "en" ? "Order Now" : "Sipariş Ver"}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Fan card carousel ── */}
            <div className="lg:w-[62%] flex flex-col items-center">

              {/* Card stack */}
              <div
                className="relative w-full"
                style={{ height: containerH, perspective: isMobile ? 800 : 1200 }}
              >
                {SERVICES.map((service, index) => {
                  const t = getCardTransform(index, activeIndex, SERVICES.length, isMobile);
                  const thumb = thumbnailByCategory[service.portfolioCategory];
                  const name = lang === "en" ? service.nameEn : service.nameTr;
                  const tag = lang === "en" ? service.tagEn : service.tagTr;

                  return (
                    <motion.div
                      key={service.id}
                      className="absolute left-1/2 top-1/2 origin-bottom"
                      style={{
                        width: cardW,
                        height: cardH,
                        marginLeft: -(cardW / 2),
                        marginTop: -(cardH / 2) - (isMobile ? 10 : 20),
                        zIndex: t.zIndex,
                        cursor: index === activeIndex ? "default" : "pointer",
                        pointerEvents: t.opacity < 0.35 ? "none" : "auto",
                      }}
                      animate={{
                        x: t.x,
                        rotate: t.rotate,
                        scale: t.scale,
                        opacity: t.opacity,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      onClick={() => index !== activeIndex && goTo(index)}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.x) > (isMobile ? 30 : 40)) {
                          goTo(activeIndex + (info.offset.x > 0 ? -1 : 1));
                        }
                      }}
                      whileHover={index === activeIndex ? { scale: 1.06, y: -8 } : { scale: t.scale + 0.03 }}
                    >
                      <div
                        className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden relative"
                        style={{
                          boxShadow: index === activeIndex
                            ? "0 30px 60px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.1)"
                            : "0 15px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                        }}
                      >
                        {/* Background */}
                        {thumb?.thumbnailUrl ? (
                          <>
                            <Image
                              src={thumb.thumbnailUrl}
                              alt={name}
                              fill
                              className="object-cover"
                              sizes={`${cardW}px`}
                              draggable={false}
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background: "linear-gradient(to top, rgba(10,7,20,0.85) 0%, rgba(10,7,20,0.2) 50%, rgba(10,7,20,0.3) 100%)",
                              }}
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0" style={{ background: service.gradient, opacity: 0.85 }} />
                        )}

                        {/* Warm light */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(160deg, rgba(251,191,36,0.06) 0%, transparent 60%)",
                            mixBlendMode: "screen",
                          }}
                        />

                        {/* Name badge */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                          <div
                            className="rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-2 sm:py-2.5"
                            style={{
                              background: "rgba(0,0,0,0.55)",
                              backdropFilter: "blur(16px)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <p className="font-black text-white text-xs sm:text-sm leading-tight">{name}</p>
                            <p className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{tag}</p>
                          </div>
                        </div>

                        {/* Active bar */}
                        {index === activeIndex && (
                          <motion.div
                            className="absolute top-0 left-3 right-3 sm:left-4 sm:right-4"
                            style={{ height: 3, borderRadius: 2, background: "#ade94f" }}
                            layoutId="activeBar"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0 sm:mt-2">
                {SERVICES.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full"
                    style={{ border: "none", cursor: "pointer" }}
                    animate={{
                      width: i === activeIndex ? (isMobile ? 22 : 28) : (isMobile ? 6 : 8),
                      height: isMobile ? 6 : 8,
                      background: i === activeIndex ? "#ade94f" : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    whileHover={{ background: i === activeIndex ? "#ade94f" : "rgba(255,255,255,0.35)" }}
                  />
                ))}
              </div>

              {/* Mobile CTA */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  className="lg:hidden mt-5 text-center w-full max-w-xs mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                >
                  <p className="text-sm sm:text-base font-black text-white">
                    {lang === "en" ? activeService.nameEn : activeService.nameTr}
                  </p>
                  <p className="text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {lang === "en" ? activeService.tagEn : activeService.tagTr}
                  </p>
                  <p className="font-hand text-lg sm:text-xl mt-1" style={{ color: "#ade94f" }}>
                    {activeService.price}₺
                  </p>
                  <Link
                    href={`/configure/${activeService.configureId}`}
                    className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full font-black text-sm active:scale-95 transition-transform"
                    style={{ background: "#ade94f", color: "#0a0714" }}
                  >
                    <ShoppingBag size={15} />
                    {lang === "en" ? "Order Now" : "Sipariş Ver"}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom: Thumbs */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4 mt-6 lg:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              whileHover={{ background: "rgba(173,233,79,0.1)", borderColor: "rgba(173,233,79,0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp size={isMobile ? 14 : 16} style={{ color: "#ade94f" }} />
              <span className="font-black text-white text-sm sm:text-base">107</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              whileHover={{ background: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsDown size={isMobile ? 14 : 16} style={{ color: "rgba(255,255,255,0.3)" }} />
            </motion.div>
            <p className="text-[10px] sm:text-xs font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
              {lang === "en" ? "Likes" : "Beğenme"}
            </p>
          </motion.div>

        </div>
      </div>

      <VideoPlayerModal
        open={!!selectedVideo}
        videoUrl={selectedVideo?.url ?? ""}
        title={selectedVideo?.title}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};
