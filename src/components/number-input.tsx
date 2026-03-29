"use client";

import { useI18n } from "@/lib/i18n";
import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";

type NumberInputProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  unitPrice: number;
  unitLabel?: string;
};

export const NumberInput = ({
  title,
  subtitle,
  icon,
  value,
  onChange,
  min = 0,
  max = 99,
  unitPrice,
  unitLabel,
}: NumberInputProps) => {
  const { formatPrice } = useI18n();
  const current = value ?? 0;

  const decrement = () => {
    const next = Math.max(min, current - 1);
    onChange(next === 0 ? null : next);
  };

  const increment = () => {
    onChange(Math.min(max, current + 1));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value) || 0;
    const clamped = Math.min(max, Math.max(min, v));
    onChange(clamped === 0 ? null : clamped);
  };

  const totalPrice = current * unitPrice;

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-[var(--electric-blue)] flex items-center justify-center text-[var(--lime)]">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[var(--gray)]">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="p-5 rounded-md border-3 border-[var(--electric-blue)]/20 bg-[var(--card)] hover:border-[var(--electric-blue)]/40 transition-colors">
        <div className="flex items-center justify-between gap-4">
          {/* Stepper controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={decrement}
              disabled={current <= min}
              className={`w-10 h-10 rounded-md border-3 flex items-center justify-center font-bold transition-all cursor-pointer ${
                current > min
                  ? "bg-[var(--electric-blue)] border-[var(--dark-blue)] text-[var(--lime)] hover:bg-[var(--lime)] hover:text-[var(--dark-blue)]"
                  : "bg-[var(--gray)]/10 border-[var(--gray)]/20 text-[var(--gray)]/30 cursor-not-allowed"
              }`}
            >
              <Minus size={16} />
            </button>

            <input
              type="number"
              value={current}
              onChange={handleInput}
              min={min}
              max={max}
              className="w-16 h-12 text-center text-2xl font-black text-[var(--foreground)] bg-transparent border-b-3 border-[var(--lime)] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={increment}
              disabled={current >= max}
              className={`w-10 h-10 rounded-md border-3 flex items-center justify-center font-bold transition-all cursor-pointer ${
                current < max
                  ? "bg-[var(--lime)] border-[var(--dark-blue)] text-[var(--dark-blue)] hover:shadow-[2px_2px_0px_var(--dark-blue)]"
                  : "bg-[var(--gray)]/10 border-[var(--gray)]/20 text-[var(--gray)]/30 cursor-not-allowed"
              }`}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Price display */}
          <div className="text-right">
            <div className="text-xs text-[var(--gray)]">
              {formatPrice(unitPrice)} / {unitLabel}
            </div>
            <div className="text-lg font-black text-[var(--foreground)]">
              {current === 0 ? "—" : `+${formatPrice(totalPrice)}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
