"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { useSettings, usePortfolio } from "@/lib/hooks/use-firestore";
import { Play, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { VideoPlayerModal } from "./video-player-modal";
import Link from "next/link";

export const Hero = () => {
  const { t } = useI18n();
  const { data: settings } = useSettings();
  const { data: portfolioItems } = usePortfolio();
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroVideoUrl = settings?.heroVideoUrl ?? "";

  // İlk 5 portfolyo projesini al
  const showcaseItems = (portfolioItems ?? []).slice(0, 5);

  // Otomatik slayt geçişi
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (showcaseItems.length > 0 ? (prev + 1) % showcaseItems.length : 0));
    }, 4000);
  }, [showcaseItems.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay]);

  // Slayt değiştiğinde scroll pozisyonunu güncelle
  useEffect(() => {
    if (sliderRef.current && showcaseItems.length > 0) {
      const cardWidth = sliderRef.current.scrollWidth / showcaseItems.length;
      sliderRef.current.scrollTo({ left: cardWidth * currentSlide, behavior: "smooth" });
    }
  }, [currentSlide, showcaseItems.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoPlay(); // Reset timer
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % Math.max(showcaseItems.length, 1));
  const prevSlide = () => goToSlide((currentSlide - 1 + Math.max(showcaseItems.length, 1)) % Math.max(showcaseItems.length, 1));

  return (
    <section className="relative py-8 md:py-16 z-10 leopard-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Sol: Prodüksiyon Galerisi Slider */}
          <div className="animate-kinetic-slide">
            {/* Başlık */}
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-black text-[var(--cream)] mb-1">
                {t("nav.gallery")}
              </h2>
              <div className="w-12 h-1 bg-[var(--lime)] rounded-full" />
            </div>

            {/* Slider */}
            <div className="relative group">
              {/* Slider Container */}
              <div
                ref={sliderRef}
                className="flex gap-3 overflow-x-hidden scroll-smooth snap-x snap-mandatory rounded-lg"
                style={{ scrollbarWidth: "none" }}
              >
                {showcaseItems.length > 0 ? (
                  showcaseItems.map((item, i) => (
                    <div
                      key={item.id ?? i}
                      className="flex-shrink-0 w-full snap-center relative rounded-lg overflow-hidden border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] bg-[var(--dark-blue)]"
                      style={{ aspectRatio: "4/5" }}
                    >
                      {/* Thumbnail / Video Preview */}
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title ?? `Proje ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--dark-blue)]">
                          <Play size={40} className="text-[var(--lime)]/40" />
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Proje bilgisi */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          {item.category && (
                            <span className="text-[9px] uppercase tracking-wider font-bold text-[var(--lime)] bg-[var(--dark-blue)]/60 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {item.title ?? `Proje ${i + 1}`}
                        </h3>
                      </div>

                      {/* Play icon */}
                      {item.videoUrl && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 rounded-full bg-[var(--lime)]/20 border-2 border-[var(--lime)] flex items-center justify-center backdrop-blur-sm hover:bg-[var(--lime)]/30 transition-all">
                            <Play size={20} className="text-[var(--lime)] ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Slide numarası */}
                      <div className="absolute top-3 right-3 bg-[var(--dark-blue)]/70 text-[var(--lime)] text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        {i + 1}/{showcaseItems.length}
                      </div>
                    </div>
                  ))
                ) : (
                  /* Placeholder — portfolyo yüklenene kadar */
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`ph-${i}`}
                      className="flex-shrink-0 w-full snap-center relative rounded-lg overflow-hidden border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] bg-[var(--dark-blue)]/50 animate-pulse"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={40} className="text-[var(--lime)]/20" />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Slider navigasyon okları */}
              {showcaseItems.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--dark-blue)]/80 border-2 border-[var(--lime)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[var(--dark-blue)] z-10"
                  >
                    <ArrowLeft size={14} className="text-[var(--lime)]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--dark-blue)]/80 border-2 border-[var(--lime)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[var(--dark-blue)] z-10"
                  >
                    <ArrowRight size={14} className="text-[var(--lime)]" />
                  </button>
                </>
              )}

              {/* Dot göstergeleri */}
              {showcaseItems.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3">
                  {showcaseItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentSlide
                          ? "w-6 bg-[var(--lime)]"
                          : "w-1.5 bg-[var(--gray)]/40 hover:bg-[var(--gray)]/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Tüm Galeriyi Gör butonu */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-sm font-bold hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {t("nav.viewAllGallery")}
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Sağ: Dikey Video (4:5 oranı) */}
          <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--lime)]/20 via-[var(--electric-blue)]/10 to-transparent rounded-xl blur-xl animate-glow" />
              <div
                className="relative rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[8px_8px_0px_var(--electric-blue)] overflow-hidden cursor-pointer mx-auto"
                style={{ aspectRatio: "4/5", maxWidth: "400px" }}
                onClick={() => heroVideoUrl && setShowVideo(true)}
              >
                {heroVideoUrl ? (
                  <>
                    <video
                      src={heroVideoUrl}
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 hover:bg-black/10 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-[var(--lime)]/20 border-3 border-[var(--lime)] flex items-center justify-center hover:bg-[var(--lime)]/30 transition-all hover:scale-110">
                        <Play size={28} className="text-[var(--lime)] ml-1" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{t("hero.video_title")}</span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[var(--lime)]/10 border-3 border-[var(--lime)] flex items-center justify-center cursor-pointer hover:bg-[var(--lime)]/20 transition-all hover:scale-110">
                      <Play size={28} className="text-[var(--lime)] ml-1" />
                    </div>
                    <span className="text-xs font-bold text-[var(--gray)] uppercase tracking-wider">{t("hero.video_title")}</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-bold uppercase tracking-wider">
                  MindID
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoPlayerModal
        open={showVideo}
        videoUrl={heroVideoUrl}
        title={t("hero.video_title")}
        onClose={() => setShowVideo(false)}
      />
    </section>
  );
};
