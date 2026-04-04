"use client";

import { useI18n } from "@/lib/i18n";

// Gerçek müşteri referansları — testimoniallerden ve portfolyodan
const CLIENT_REFS = [
  { name: "Tekno Elektronik", sector: { tr: "Elektronik", en: "Electronics" } },
  { name: "Moda Atölyesi", sector: { tr: "Moda", en: "Fashion" } },
  { name: "Demir Mobilya", sector: { tr: "Mobilya", en: "Furniture" } },
  { name: "Çelik Kozmetik", sector: { tr: "Kozmetik", en: "Cosmetics" } },
  { name: "Özkan İnşaat", sector: { tr: "İnşaat", en: "Construction" } },
  { name: "Aras Gıda", sector: { tr: "Gıda", en: "Food" } },
  { name: "TRVAİnşaat", sector: { tr: "İnşaat", en: "Construction" } },
  { name: "SY Parfüm", sector: { tr: "Parfüm", en: "Perfume" } },
];

export const LogoWall = () => {
  const { t, lang } = useI18n();

  const allItems = [...CLIENT_REFS, ...CLIENT_REFS];

  return (
    <section className="relative py-10 z-10 overflow-hidden" aria-label="Müşteri referansları">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-xs font-bold text-[var(--gray)]/60 uppercase tracking-widest">
          {t("logowall.title")}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" aria-hidden="true" />

        <div className="flex animate-scroll-x gap-6 items-center">
          {allItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 h-14 px-6 flex items-center gap-3 rounded-lg border border-[var(--electric-blue)]/10 bg-[var(--card)] opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center">
                <span className="text-xs font-black text-[var(--electric-blue)]">
                  {client.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[var(--foreground)] whitespace-nowrap">
                  {client.name}
                </span>
                <span className="text-[9px] text-[var(--gray)] whitespace-nowrap">
                  {lang === "en" ? client.sector.en : client.sector.tr}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
