"use client";

import { useI18n } from "@/lib/i18n";

const CLIENT_REFS = [
  { name: "TRVAİnşaat", sector: { tr: "İnşaat", en: "Construction" }, initial: "T" },
  { name: "SY Parfüm", sector: { tr: "Parfüm", en: "Perfume" }, initial: "S" },
  { name: "Çelik Kozmetik", sector: { tr: "Kozmetik", en: "Cosmetics" }, initial: "Ç" },
  { name: "Demir Mobilya", sector: { tr: "Mobilya", en: "Furniture" }, initial: "D" },
  { name: "Aras Gıda", sector: { tr: "Gıda", en: "Food" }, initial: "A" },
];

export const LogoWall = () => {
  const { t, lang } = useI18n();

  const allItems = [...CLIENT_REFS, ...CLIENT_REFS];

  return (
    <section
      className="relative z-10 overflow-hidden"
      aria-label="Müşteri referansları"
      style={{ background: "linear-gradient(180deg, #1c1242 0%, #100a2c 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {t("logowall.title")}
          </p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, #1c1242, transparent)" }} aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, #100a2c, transparent)" }} aria-hidden="true" />

          <div className="flex animate-scroll-x gap-8 items-center">
            {allItems.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 h-16 px-7 flex items-center gap-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: 0.65,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#ade94f30";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.65";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(173,233,79,0.1)",
                    border: "1.5px solid rgba(173,233,79,0.3)",
                  }}
                >
                  <span className="text-sm font-black" style={{ color: "#ade94f" }}>
                    {client.initial}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {lang === "en" ? client.sector.en : client.sector.tr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark → cream geçiş */}
      <div className="h-24 sm:h-32" style={{ background: "linear-gradient(180deg, #100a2c 0%, var(--background) 100%)" }} />
    </section>
  );
};
