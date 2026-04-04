"use client";

import { Check, X } from "lucide-react";
import type { ServicePackage } from "@/lib/types";
import { cn } from "@/lib/cn";

const BADGE_STYLES: Record<string, string> = {
  popular: "bg-[var(--lime)] text-[var(--dark-blue)]",
  value: "bg-[var(--electric-blue)] text-white",
  anchor: "bg-[var(--dark-blue)] text-[var(--lime)] border border-[var(--lime)]/40",
  new: "bg-orange-500 text-white",
};

type Props = {
  packages: ServicePackage[];
  selected: ServicePackage | null;
  onSelect: (pkg: ServicePackage) => void;
  onClear: () => void;
  formatPrice: (price: number) => string;
};

export const PackageTierSelector = ({ packages, selected, onSelect, onClear, formatPrice }: Props) => {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-[var(--lime)]" />
          <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wider">
            Hazır Paket Seçin
          </h2>
          <span className="hidden sm:inline text-[10px] text-[var(--gray)]">— veya aşağıdan tek tek özelleştirin</span>
        </div>
        {selected && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[10px] text-[var(--gray)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <X size={10} />
            Paketi kaldır
          </button>
        )}
      </div>

      {/* Tier Cards */}
      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-1 px-1">
        {packages.map((pkg) => {
          const isSelected = selected?.id === pkg.id;
          const badgeStyle = pkg.badgeVariant ? BADGE_STYLES[pkg.badgeVariant] : null;

          return (
            <div
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className={cn(
                "snap-start flex-none w-52 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 select-none",
                "hover:-translate-y-1 hover:shadow-lg",
                pkg.highlighted
                  ? "border-2 border-[var(--lime)] shadow-[3px_3px_0px_var(--lime)]"
                  : "border-2 border-[var(--electric-blue)]/15 hover:border-[var(--lime)]/40",
                isSelected && "ring-2 ring-[var(--lime)] ring-offset-2 ring-offset-[var(--background)] -translate-y-1",
              )}
            >
              {/* Badge row */}
              {badgeStyle ? (
                <div className={cn("px-3 py-1.5 text-[9px] font-black text-center tracking-widest", badgeStyle)}>
                  {pkg.badge}
                </div>
              ) : (
                <div className="h-6 bg-[var(--card)] border-b border-[var(--electric-blue)]/10" />
              )}

              {/* Card body */}
              <div className="p-4 bg-[var(--card)] flex flex-col h-full">
                {/* Name + tagline */}
                <div className="mb-3">
                  <p className="text-xs font-black text-[var(--foreground)] uppercase tracking-wide mb-1">{pkg.name}</p>
                  <p className="text-[10px] text-[var(--gray)] leading-relaxed">{pkg.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-xl font-black text-[var(--foreground)]">{formatPrice(pkg.price)}</p>
                </div>

                {/* Feature list */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[10px] text-[var(--foreground)]/75 leading-relaxed">
                      <Check size={9} className="text-[var(--lime)] mt-0.5 flex-none" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={cn(
                    "w-full py-2 rounded-lg text-xs font-black border-2 transition-all cursor-pointer",
                    isSelected
                      ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[1px_1px_0px_var(--dark-blue)]"
                      : pkg.highlighted
                        ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[2px_2px_0px_var(--dark-blue)] hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[1px] hover:translate-y-[1px]"
                        : "bg-transparent text-[var(--foreground)] border-[var(--electric-blue)]/25 hover:border-[var(--lime)]/50 hover:text-[var(--lime)]",
                  )}
                >
                  {isSelected ? "✓ Seçildi" : "Paketi Seç"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected banner */}
      {selected && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-[var(--lime)]/10 border border-[var(--lime)]/30 flex items-center justify-between">
          <span className="text-[10px] text-[var(--foreground)] font-bold">
            <span className="text-[var(--lime)]">✓</span> {selected.name} paketi seçili — aşağıdan isteğe göre düzenleyebilirsiniz
          </span>
          <span className="text-xs font-black text-[var(--lime)]">{formatPrice(selected.price)}</span>
        </div>
      )}
    </div>
  );
};
