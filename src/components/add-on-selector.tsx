"use client";

import { Plus, Minus } from "lucide-react";
import type { AddOnService } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = {
  addOns: AddOnService[];
  selected: AddOnService[];
  onToggle: (addOn: AddOnService) => void;
  formatPrice: (price: number) => string;
};

export const AddOnSelector = ({ addOns, selected, onToggle, formatPrice }: Props) => {
  if (addOns.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-5 rounded-full bg-[var(--electric-blue)]" />
        <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wider">
          Paketini Zenginle&#351;tir
        </h2>
        <span className="text-[10px] text-[var(--gray)]">— opsiyonel ek hizmetler</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addOns.map((addOn) => {
          const isSelected = selected.some((s) => s.id === addOn.id);
          return (
            <button
              key={addOn.id}
              onClick={() => onToggle(addOn)}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left cursor-pointer",
                isSelected
                  ? "border-[var(--lime)] bg-[var(--lime)]/5 shadow-[2px_2px_0px_var(--lime)]"
                  : "border-[var(--electric-blue)]/15 hover:border-[var(--lime)]/30 bg-[var(--card)]",
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--foreground)] truncate">{addOn.name}</p>
                <p className="text-[10px] text-[var(--gray)] mt-0.5">{addOn.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-none">
                <span className="text-xs font-black text-[var(--foreground)]">+{formatPrice(addOn.price)}</span>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                  isSelected
                    ? "bg-[var(--lime)] text-[var(--dark-blue)]"
                    : "bg-[var(--electric-blue)]/10 text-[var(--gray)]",
                )}>
                  {isSelected ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
