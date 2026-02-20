"use client";

import { useI18n } from "@/lib/i18n";
import { SERVICE_TYPES } from "@/lib/pricing-data";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

export const ServiceCards = () => {
  const { t, formatPrice } = useI18n();

  return (
    <section id="services" className="relative py-16 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {SERVICE_TYPES.map((service) => {
            const isAvatar = service.id === "avatar";
            const href = isAvatar ? "/avatar" : `/configure/${service.id}`;

            return (
              <Link
                key={service.id}
                href={href}
                className="trading-card group relative p-5 rounded-lg bg-[var(--cream)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] cursor-pointer block"
              >
                <div className="absolute -top-3 left-4 px-3 py-0.5 bg-[var(--lime)] border-3 border-[var(--dark-blue)] border-b-0 rounded-t-md">
                  <span className="text-lg">{service.icon}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 mb-3">
                  <FolderOpen size={18} className="text-[var(--electric-blue)]" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--gray)]">
                    MindID
                  </span>
                </div>

                <h3 className="font-black text-[var(--dark-blue)] text-sm leading-tight mb-2 group-hover:text-[var(--electric-blue)] transition-colors">
                  {t(service.nameKey)}
                </h3>

                <p className="text-xs text-[var(--gray)] mb-4 leading-relaxed">
                  {t(service.descKey)}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--gray)]">
                    {t("service.from")}
                  </span>
                  <span className="text-lg font-black text-[var(--electric-blue)]">
                    {formatPrice(service.basePrice)}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-md bg-[var(--dark-blue)] text-[var(--lime)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">
                  &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
