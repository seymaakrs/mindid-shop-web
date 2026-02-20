"use client";

import { DURATION_OPTIONS } from "@/lib/pricing-data";
import { useI18n } from "@/lib/i18n";
import type { DurationOption } from "@/lib/types";
import { Clock } from "lucide-react";

type DurationSelectorProps = {
  selected: DurationOption | null;
  onSelect: (option: DurationOption) => void;
};

export const DurationSelector = ({ selected, onSelect }: DurationSelectorProps) => {
  const { t, formatPrice } = useI18n();

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-md bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center">
          <Clock size={20} className="text-[var(--dark-blue)]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--cream)]">
            {t("duration.title")}
          </h2>
          <p className="text-xs text-[var(--gray)]">{t("duration.subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {DURATION_OPTIONS.map((opt) => {
          const isSelected = selected?.id === opt.id;
          const secs = opt.seconds;
          const label = secs >= 60 ? `${secs / 60} ${t("duration.min")}` : `${secs} ${t("duration.sec")}`;

          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt)}
              className={`relative p-3 rounded-md border-3 text-center transition-all cursor-pointer ${
                isSelected
                  ? "border-[var(--lime)] bg-[var(--lime)]/10 shadow-[4px_4px_0px_var(--lime)]"
                  : "border-[var(--electric-blue)]/30 bg-[var(--card)] hover:border-[var(--lime)]/50"
              }`}
            >
              <div className={`text-2xl font-black ${isSelected ? "text-[var(--lime)]" : "text-[var(--cream)]"}`}>
                {opt.label}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--gray)] mt-0.5">
                {label}
              </div>
              <div className={`text-xs font-bold mt-2 ${isSelected ? "text-[var(--lime)]" : "text-[var(--electric-blue)]"}`}>
                {opt.basePrice === 0 ? "Dahil" : `+${formatPrice(opt.basePrice)}`}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
