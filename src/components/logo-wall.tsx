"use client";

import { useI18n } from "@/lib/i18n";

// Temsili marka isimleri — simülasyon amaçlı
const CLIENT_LOGOS = [
  { name: "Coca-Cola", style: "italic" as const },
  { name: "H&M", style: "normal" as const },
  { name: "ZARA", style: "normal" as const },
  { name: "Samsung", style: "normal" as const },
  { name: "L'Oréal", style: "italic" as const },
  { name: "NIKE", style: "normal" as const },
  { name: "adidas", style: "normal" as const },
  { name: "PUMA", style: "normal" as const },
  { name: "Unilever", style: "normal" as const },
  { name: "Nestlé", style: "normal" as const },
];

export const LogoWall = () => {
  const { t } = useI18n();

  // Sonsuz kayan efekt için logoları çoğalt
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="relative py-12 z-10 overflow-hidden" aria-label="Müşteri markaları">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-bold text-[var(--gray)]/60 uppercase tracking-widest">
          {t("logowall.title")}
        </p>
      </div>

      {/* Kayan logo bandı */}
      <div className="relative">
        {/* Sol/sağ fade efekti */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" aria-hidden="true" />

        {/* Kayan container */}
        <div className="flex animate-scroll-x gap-10 items-center">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 h-12 px-8 flex items-center justify-center rounded-md border-2 border-[var(--electric-blue)]/15 bg-[var(--card)] opacity-40 hover:opacity-90 transition-opacity"
            >
              <span
                className="text-sm font-black text-[var(--foreground)] whitespace-nowrap tracking-wider"
                style={{ fontStyle: logo.style }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
