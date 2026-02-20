"use client";

import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/pricing-data";
import type { ReactNode } from "react";

type OptionItem = {
  id: string;
  label: string;
  description: string;
  price: number;
};

type OptionCardGroupProps<T extends OptionItem> = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  options: T[];
  selected: T | null;
  onSelect: (option: T) => void;
  columns?: 2 | 4;
};

export const OptionCardGroup = <T extends OptionItem>({
  title,
  subtitle,
  icon,
  options,
  selected,
  onSelect,
  columns = 2,
}: OptionCardGroupProps<T>) => {
  return (
    <section>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {title}
            </h2>
            <p className="text-sm text-[var(--muted)]">{subtitle}</p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-3",
          columns === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
        )}
      >
        {options.map((option) => {
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
              <div className="font-semibold text-[var(--foreground)] mb-1">
                {option.label}
              </div>
              <div className="text-xs text-[var(--muted)] mb-3">
                {option.description}
              </div>
              <div className="text-sm font-semibold text-[var(--primary)]">
                {option.price === 0 ? "Ucretsiz" : `+${formatPrice(option.price)}`}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
