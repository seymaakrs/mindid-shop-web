"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/pricing-data";
import type { ConfigState } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import { Receipt, Sparkles, ChevronUp, ChevronDown } from "lucide-react";

type PriceSummaryProps = {
  config: ConfigState;
};

type LineItem = {
  label: string;
  price: number;
};

const getLineItems = (config: ConfigState): LineItem[] => {
  const items: LineItem[] = [];

  if (config.duration) {
    items.push({ label: `Video Suresi: ${config.duration.label}`, price: config.duration.basePrice });
  }
  if (config.scenario) {
    items.push({ label: `Senaryo: ${config.scenario.label}`, price: config.scenario.price });
  }
  if (config.voice) {
    items.push({ label: `Seslendirme: ${config.voice.label}`, price: config.voice.price });
  }
  if (config.music) {
    items.push({ label: `Muzik: ${config.music.label}`, price: config.music.price });
  }
  if (config.visualStyle) {
    items.push({ label: `Gorsel Stil: ${config.visualStyle.label}`, price: config.visualStyle.price });
  }
  for (const pp of config.postProduction) {
    items.push({ label: pp.label, price: pp.price });
  }
  if (config.revision && config.revision.price > 0) {
    items.push({ label: `Revizyon: ${config.revision.label}`, price: config.revision.price });
  }

  return items;
};

export const PriceSummary = ({ config }: PriceSummaryProps) => {
  const [expanded, setExpanded] = useState(false);
  const items = getLineItems(config);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const hasSelection = items.length > 0;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block sticky top-20">
        <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <div className="p-5 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)]">
                <Receipt size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Fiyat Ozeti
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Secimlerinize gore guncel fiyat
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {!hasSelection ? (
              <div className="text-center py-8">
                <div className="text-[var(--muted)] text-sm">
                  Fiyat hesaplamasi icin video suresini secin
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--muted)]">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {item.price === 0 ? "Ucretsiz" : formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4 h-px bg-[var(--border)]" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--foreground)]">
                    Toplam
                  </span>
                  <span className="text-2xl font-bold text-[var(--primary)]">
                    {formatPrice(total)}
                  </span>
                </div>

                <button className="mt-5 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                  <Sparkles size={16} />
                  Teklif Al
                </button>

                <p className="mt-3 text-xs text-[var(--muted)] text-center">
                  KDV dahil degildir. Nihai fiyat brief sonrasi netlesir.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: floating bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        {expanded && hasSelection && (
          <div className="bg-[var(--card)] border-t border-[var(--border)] px-4 pt-4 pb-2 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {item.price === 0 ? "Ucretsiz" : formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[var(--card)]/95 backdrop-blur-md border-t-2 border-[var(--primary)]/30 shadow-[0_-4px_30px_rgba(168,85,247,0.2)]">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)]">
                <Receipt size={16} />
              </div>
              <div className="text-left">
                <div className="text-xs text-[var(--muted)]">Toplam</div>
                <div className="text-lg font-bold text-[var(--primary)]">
                  {hasSelection ? formatPrice(total) : "₺0"}
                </div>
              </div>
              {hasSelection && (
                expanded
                  ? <ChevronDown size={16} className="text-[var(--muted)]" />
                  : <ChevronUp size={16} className="text-[var(--muted)]" />
              )}
            </button>

            <button className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
              <Sparkles size={14} />
              Teklif Al
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
