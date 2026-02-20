"use client";

import { Clock } from "lucide-react";
import { DURATION_OPTIONS } from "@/lib/pricing-data";
import { formatPrice } from "@/lib/pricing-data";
import type { DurationOption } from "@/lib/types";
import { cn } from "@/lib/cn";

type DurationSelectorProps = {
  selected: DurationOption | null;
  onSelect: (option: DurationOption) => void;
};

export const DurationSelector = ({
  selected,
  onSelect,
}: DurationSelectorProps) => {
  return (
    <section>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Video Suresi
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Reklam videonuzun suresini secin
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {DURATION_OPTIONS.map((option) => {
          const isSelected = selected?.id === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
                "hover:border-[var(--primary)]/50 hover:bg-[var(--card-hover)]",
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  : "border-[var(--border)] bg-[var(--card)]"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[var(--primary)]" />
              )}
              <div className="text-2xl font-bold text-[var(--foreground)] mb-1">
                {option.label}
              </div>
              <div className="text-xs text-[var(--muted)] mb-3">
                {option.description}
              </div>
              <div className="text-sm font-semibold text-[var(--primary)]">
                {formatPrice(option.basePrice)}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
