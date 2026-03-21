"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { ConfigState } from "@/lib/types";
import type { ServiceType } from "@/lib/pricing-data";
import type { OrderCustomer } from "@/lib/firestore-types";
import { submitOrder } from "@/lib/order-service";
import { CustomerForm } from "./customer-form";
import { ArrowLeft, Clapperboard } from "lucide-react";

type DirectorDeskProps = {
  config: ConfigState;
  service: ServiceType;
  totalAI: number;
  totalTraditional: number;
  savings: number;
  basePrice: number;
  onBack: () => void;
  onSubmit: () => void;
};

export const DirectorDesk = ({
  config,
  service,
  totalAI,
  totalTraditional,
  savings,
  basePrice,
  onBack,
  onSubmit,
}: DirectorDeskProps) => {
  const { t, formatPrice } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (customer: OrderCustomer, files: File[]) => {
    setLoading(true);
    setError(null);
    try {
      await submitOrder({
        customer,
        serviceId: service.id,
        serviceName: t(service.nameKey),
        config,
        pricing: { basePrice, totalAI, totalTraditional, savings },
        files,
      });
      onSubmit();
    } catch (err) {
      console.error("Order submission error:", err);
      setError(err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  // Build trading cards from selections
  const cards: { label: string; value: string; color: string }[] = [];
  cards.push({ label: "Hizmet", value: t(service.nameKey), color: "var(--lime)" });
  if (config.duration) cards.push({ label: "Sure", value: `${config.duration.seconds}sn`, color: "var(--electric-blue)" });
  if (config.scenario) cards.push({ label: "Senaryo", value: config.scenario.label, color: "var(--lime)" });
  if (config.voice) cards.push({ label: "Ses", value: config.voice.label, color: "var(--electric-blue)" });
  if (config.music) cards.push({ label: "Muzik", value: config.music.label, color: "var(--lime)" });
  if (config.visualStyle) cards.push({ label: "Gorsel", value: config.visualStyle.label, color: "var(--electric-blue)" });
  config.postProduction.forEach((pp) => {
    cards.push({ label: "Post", value: pp.label, color: "var(--lime)" });
  });
  // Product photo fields
  if (config.productCount) cards.push({ label: "Urun Sayisi", value: config.productCount.label, color: "var(--lime)" });
  if (config.colorCount && config.colorCount > 0) cards.push({ label: "Renk", value: `${config.colorCount} renk`, color: "var(--electric-blue)" });
  if (config.photoVisualStyle) cards.push({ label: "Gorsel Stili", value: config.photoVisualStyle.label, color: "var(--lime)" });
  if (config.background) cards.push({ label: "Arka Plan", value: config.background.label, color: "var(--electric-blue)" });
  if (config.revision) cards.push({ label: "Revizyon", value: config.revision.label, color: "var(--electric-blue)" });

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button onClick={onBack} className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold cursor-pointer">
          <ArrowLeft size={16} />
          Geri Don
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] flex items-center justify-center">
            <Clapperboard size={24} className="text-[var(--dark-blue)]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[var(--cream)]">
              {t("checkout.title")}
            </h1>
            <p className="text-sm text-[var(--gray)]">{t("checkout.subtitle")}</p>
          </div>
        </div>

        {/* Trading cards scattered on desk */}
        <div className="p-6 rounded-lg bg-[var(--dark-blue)]/80 border-3 border-[var(--electric-blue)] mb-8">
          <div className="flex flex-wrap gap-3">
            {cards.map((card, i) => (
              <div
                key={i}
                className="trading-card p-3 rounded-md border-3 bg-[var(--cream)]"
                style={{
                  borderColor: card.color,
                  boxShadow: `4px 4px 0px ${card.color}`,
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)`,
                }}
              >
                <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: card.color === "var(--lime)" ? "var(--electric-blue)" : "var(--dark-blue)" }}>
                  {card.label}
                </div>
                <div className="text-sm font-bold text-[var(--dark-blue)] mt-0.5">{card.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Price summary bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--gray)]/30 text-center">
            <div className="text-xs text-[var(--gray)] uppercase tracking-wider font-bold">{t("checkout.traditional")}</div>
            <div className="text-xl font-black text-[var(--gray)] line-through mt-1">
              {formatPrice(totalTraditional)}
            </div>
          </div>
          <div className="p-4 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] text-center animate-glow-pulse">
            <div className="text-xs text-[var(--dark-blue)] uppercase tracking-wider font-bold">{t("checkout.ai")}</div>
            <div className="text-xl font-black text-[var(--dark-blue)] mt-1">
              {formatPrice(totalAI)}
            </div>
          </div>
          <div className="p-4 rounded-md bg-[var(--electric-blue)] border-3 border-[var(--lime)] text-center">
            <div className="text-xs text-[var(--lime)] uppercase tracking-wider font-bold">{t("checkout.saved")}</div>
            <div className="text-xl font-black text-[var(--lime)] mt-1">
              {formatPrice(savings)}
            </div>
            {savings > 0 && (
              <div className="mt-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--lime)]/20 text-[var(--lime)] text-[10px] font-bold">
                  %{Math.round((savings / totalTraditional) * 100)} TASARRUF
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Strategic comparison note */}
        <div className="p-4 rounded-md bg-[var(--card)] border-2 border-[var(--lime)]/20 mb-8">
          <p className="text-xs text-[var(--cream)]/80 leading-relaxed mb-2">
            {t("checkout.smart_move")}
          </p>
          <p className="text-[10px] text-[var(--gray)]/60 leading-relaxed">
            {t("checkout.comparison_note")}
          </p>
        </div>

        {/* Customer form */}
        <CustomerForm onSubmit={handleFormSubmit} loading={loading} error={error} />
      </div>
    </div>
  );
};
