"use client";

import { useI18n } from "@/lib/i18n";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const videos = [
  { src: "/ai-studio/1.mp4", label: "AI Reklam #1" },
  { src: "/ai-studio/2.mp4", label: "AI Reklam #2" },
  { src: "/ai-studio/3.mp4", label: "AI Reklam #3" },
  { src: "/ai-studio/4.mp4", label: "AI Reklam #4" },
  { src: "/ai-studio/5.mp4", label: "AI Reklam #5" },
  { src: "/ai-studio/6.mp4", label: "AI Reklam #6" },
  { src: "/ai-studio/7.mp4", label: "AI Reklam #7" },
];

const VideoCard = ({ src, label }: { src: string; label: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggle = () => {
    if (!loaded) {
      setLoaded(true);
      // Video load ettikten sonra oynat
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
      className="group relative flex-shrink-0 w-52 md:w-64 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-[var(--dark-blue)]/10"
      style={{ background: "linear-gradient(135deg, var(--dark-blue) 0%, var(--accent) 100%)" }}
      onClick={toggle}
    >
      {/* Video — sadece tıklandığında yükle */}
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

      {/* Yer tutucu — video yüklenmeden önce */}
      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[var(--lime)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={28} className="text-[var(--dark-blue)] ml-1" />
          </div>
          <span className="text-white/80 text-sm font-bold">{label}</span>
        </div>
      )}

      {/* Oynatılırken — duraklat butonu */}
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

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)] text-center"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          {lang === "en" ? "AI STUDIO — OUR WORK" : "AI STÜDYO — ÇALIŞMALARIMIZ"}
        </h2>
        <p className="text-center text-[var(--gray)] mt-3 max-w-xl mx-auto">
          {lang === "en"
            ? "Real AI-generated ad films and product visuals produced by slowdays."
            : "slowdays tarafından üretilmiş gerçek AI reklam filmleri ve ürün görselleri."}
        </p>
      </div>

      {/* Yatay kaydırmalı video galerisi */}
      <div
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory"
        style={{ scrollbarColor: "var(--accent) var(--background)" }}
      >
        {/* Sol boşluk — masaüstünde ortalanmış görünsün */}
        <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />
        {videos.map((v) => (
          <div key={v.src} className="snap-center">
            <VideoCard src={v.src} label={v.label} />
          </div>
        ))}
        <div className="flex-shrink-0 w-[max(0px,calc((100vw-1152px)/2))]" />
      </div>

      {/* Kaydırma ipucu */}
      <p className="text-center text-[var(--muted)] text-xs mt-4">
        {lang === "en" ? "← Swipe to see more →" : "← Daha fazlasını görmek için kaydırın →"}
      </p>
    </section>
  );
};
