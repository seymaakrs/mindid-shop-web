"use client";

import { useI18n } from "@/lib/i18n";
import { MessageSquareText, Clapperboard, RefreshCw, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquareText,
    titleKey: "hiw.step1.title",
    descKey: "hiw.step1.desc",
    accent: "#ade94f",
  },
  {
    icon: Clapperboard,
    titleKey: "hiw.step2.title",
    descKey: "hiw.step2.desc",
    accent: "#ade94f",
  },
  {
    icon: RefreshCw,
    titleKey: "hiw.step3.title",
    descKey: "hiw.step3.desc",
    accent: "#ade94f",
  },
  {
    icon: Rocket,
    titleKey: "hiw.step4.title",
    descKey: "hiw.step4.desc",
    accent: "#ade94f",
  },
];

export const HowItWorks = () => {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="relative z-10">
      {/* Cream → dark geçiş */}
      <div className="h-24 sm:h-32" style={{ background: "linear-gradient(180deg, var(--background) 0%, #100a2c 100%)" }} />

      {/* Dark gradient arka plan */}
      <div style={{ background: "linear-gradient(180deg, #100a2c 0%, #1c1242 100%)" }}>
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          {/* Başlık */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              {t("hiw.title")}
            </h2>
            <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("hiw.subtitle")}
            </p>
            <div className="w-20 h-1 mx-auto mt-5 rounded-full" style={{ background: "#ade94f" }} />
          </div>

          {/* 4 Adım Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative group">
                  {/* Bağlantı çizgisi */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-12 left-[calc(50%+48px)] h-[2px]"
                      style={{
                        width: "calc(100% - 48px)",
                        background: "linear-gradient(90deg, #ade94f40 0%, #1c124260 100%)",
                      }}
                    />
                  )}

                  <div
                    className="relative p-7 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#ade94f40";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.3), 0 0 20px #ade94f10";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
                    }}
                  >
                    {/* Adım numarası */}
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                      style={{
                        background: "#ade94f",
                        color: "#100a2c",
                        boxShadow: "0 4px 12px #ade94f40",
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* İkon */}
                    <div
                      className="w-16 h-16 rounded-xl mx-auto mt-3 mb-5 flex items-center justify-center"
                      style={{
                        background: "rgba(173,233,79,0.08)",
                        border: "1.5px solid rgba(173,233,79,0.25)",
                      }}
                    >
                      <Icon size={28} style={{ color: "#ade94f" }} />
                    </div>

                    {/* Başlık */}
                    <h3 className="text-base font-black text-white mb-2">
                      {t(step.titleKey)}
                    </h3>

                    {/* Açıklama */}
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
