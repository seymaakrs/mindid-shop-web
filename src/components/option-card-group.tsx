"use client";

import { useI18n } from "@/lib/i18n";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type OptionItem = {
  id: string;
  label: string;
  description: string;
  price: number;
};

type OptionCardGroupProps<T extends OptionItem> = {
  title: string;
  icon: ReactNode;
  options: T[];
  selected: T | null;
  onSelect: (option: T) => void;
  multiSelect?: boolean;
  selectedMulti?: T[];
  onToggle?: (option: T) => void;
};

export const OptionCardGroup = <T extends OptionItem>({
  title,
  icon,
  options,
  selected,
  onSelect,
  multiSelect = false,
  selectedMulti = [],
  onToggle,
}: OptionCardGroupProps<T>) => {
  const { formatPrice } = useI18n();

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-[var(--electric-blue)] flex items-center justify-center text-[var(--lime)]">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-[var(--cream)]">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isActive = multiSelect
            ? selectedMulti.some((s) => s.id === opt.id)
            : selected?.id === opt.id;

          const handleClick = () => {
            if (multiSelect && onToggle) {
              onToggle(opt);
            } else {
              onSelect(opt);
            }
          };

          return (
            <button
              key={opt.id}
              onClick={handleClick}
              className={`relative p-4 rounded-md border-3 text-left transition-all cursor-pointer ${
                isActive
                  ? "border-[var(--lime)] bg-[var(--lime)]/5 shadow-[4px_4px_0px_var(--lime)]"
                  : "border-[var(--electric-blue)]/20 bg-[var(--card)] hover:border-[var(--lime)]/40"
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--lime)] flex items-center justify-center">
                  <Check size={14} className="text-[var(--dark-blue)]" />
                </div>
              )}
              <div className={`font-bold text-sm ${isActive ? "text-[var(--lime)]" : "text-[var(--cream)]"}`}>
                {opt.label}
              </div>
              <div className="text-xs text-[var(--gray)] mt-1">{opt.description}</div>
              <div className={`text-xs font-bold mt-2 ${opt.price === 0 ? "text-[var(--lime)]" : "text-[var(--electric-blue)]"}`}>
                {opt.price === 0 ? "✓ Dahil" : `+${formatPrice(opt.price)}`}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
