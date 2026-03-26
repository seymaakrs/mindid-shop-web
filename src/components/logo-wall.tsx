"use client";

import { useI18n } from "@/lib/i18n";

// Müşteri logoları — Seyma buraya gerçek logo dosyalarını ekleyecek
// Şimdilik placeholder metin logoları kullanıyoruz
const CLIENT_LOGOS = [
  { name: "Marka 1", src: "" },
  { name: "Marka 2", src: "" },
  { name: "Marka 3", src: "" },
  { name: "Marka 4", src: "" },
  { name: "Marka 5", src: "" },
  { name: "Marka 6", src: "" },
  { name: "Marka 7", src: "" },
  { name: "Marka 8", src: "" },
];

export const LogoWall = () => {
  const { t } = useI18n();

  // Sonsuz kayan efekt için logoları çoğalt
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="relative py-12 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-bold text-[var(--gray)]/60 uppercase tracking-widest">
          {t("logowall.title")}
        </p>
      </div>

      {/* Kayan logo bandı */}
      <div className="relative">
        {/* Sol/sağ fade efekti */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--dark-blue)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--dark-blue)] to-transparent z-10" />

        {/* Kayan container */}
        <div className="flex animate-scroll-x gap-12 items-center">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 h-10 px-6 flex items-center justify-center rounded-md border-2 border-[var(--electric-blue)]/15 bg-[var(--dark-blue)] opacity-50 hover:opacity-100 transition-opacity"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="text-xs font-bold text-[var(--gray)]/50 whitespace-nowrap tracking-wider uppercase">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS animasyon — sonsuz kayan efekt */}
      <style jsx>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
