"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/hooks/use-firestore";
import { TrendingDown, Play, Sparkles } from "lucide-react";
import { VideoPlayerModal } from "./video-player-modal";

export const Hero = () => {
  const { t } = useI18n();
  const { data: settings } = useSettings();
  const [showVideo, setShowVideo] = useState(false);

  const heroVideoUrl = settings?.heroVideoUrl ?? "";

  return (
    <section className="relative py-12 md:py-20 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30 mb-6 animate-kinetic-slide">
              <Sparkles size={14} className="text-[var(--lime)]" />
              <span className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
              <span className="block animate-kinetic-expand" style={{ animationDelay: "0.1s" }}>
                <span className="text-[var(--cream)]">Yeni Nesil</span>
              </span>
              <span className="block animate-kinetic-expand" style={{ animationDelay: "0.3s" }}>
                <span className="bg-gradient-to-r from-[var(--lime)] to-[var(--electric-blue)] bg-clip-text text-transparent">
                  {t("hero.title2")}
                </span>
              </span>
            </h1>

            <div className="animate-kinetic-slide" style={{ animationDelay: "0.5s" }}>
              <p className="text-sm md:text-base text-[var(--cream)]/80 leading-relaxed mb-6">
                {t("hero.desc")}
              </p>

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] savings-badge">
                <TrendingDown size={20} className="text-[var(--dark-blue)]" />
                <div>
                  <div className="text-[10px] font-bold text-[var(--dark-blue)]/60 uppercase tracking-wider">Yapay Zeka ile</div>
                  <div className="text-lg font-black text-[var(--dark-blue)]">%60&apos;a Varan Tasarruf</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Video area */}
          <div className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--lime)]/20 via-[var(--electric-blue)]/10 to-transparent rounded-xl blur-xl animate-glow" />
              <div
                className="relative aspect-video rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[8px_8px_0px_var(--electric-blue)] overflow-hidden cursor-pointer"
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
