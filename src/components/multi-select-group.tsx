"use client";

import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/pricing-data";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type MultiItem = {
  id: string;
  label: string;
  description: string;
  price: number;
};

type MultiSelectGroupProps<T extends MultiItem> = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  options: T[];
  selected: T[];
  onToggle: (option: T) => void;
};

export const MultiSelectGroup = <T extends MultiItem>({
  title,
  subtitle,
  icon,
  options,
  selected,
  onToggle,
}: MultiSelectGroupProps<T>) => {
  const isSelected = (id: string) => selected.some((s) => s.id === id);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => {
          const active = isSelected(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option)}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
                "hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)]",
                active
                  ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "border-[var(--border)] bg-[var(--card)]"
              )}
            >
              {active && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="font-semibold text-[var(--foreground)] mb-1">
                {option.label}
              </div>
              <div className="text-xs text-[var(--muted)] mb-3">
                {option.description}
              </div>
              <div className="text-sm font-semibold text-[var(--accent)]">
                +{formatPrice(option.price)}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
