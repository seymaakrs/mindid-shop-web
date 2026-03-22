"use client";

import { useI18n } from "@/lib/i18n";
import { usePricing } from "@/lib/hooks/use-firestore";
import { SERVICE_TYPES } from "@/lib/pricing-data";
import { FolderOpen, Images, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export const ServiceCards = () => {
  const { t, formatPrice } = useI18n();
  const { data: pricingConfig } = usePricing();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use Firestore services if available, otherwise fallback
  const services = pricingConfig?.services ?? SERVICE_TYPES.map((s) => ({ ...s }));

  // Sort services by price ascending (excluding avatar, adding it at the end)
  const sortedServices = [...services]
    .filter((s) => s.id !== "avatar")
    .sort((a, b) => a.basePrice - b.basePrice);
  const avatarService = services.find((s) => s.id === "avatar");

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320;
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  // All items: sorted services + avatar + portfolio
  const allItems = [
    ...sortedServices.map((s) => ({ type: "service" as const, service: s })),
    ...(avatarService ? [{ type: "service" as const, service: avatarService }] : []),
    { type: "portfolio" as const, service: null },
  ];

  return (
    <section id="services" className="relative py-20 z-10 leopard-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-3">
            {t("services.headline")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Scroll container */}
        <div className="relative">
          {/* Left fade + arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--dark-blue)] to-transparent z-10 flex items-center">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center ml-1 cursor-pointer hover:scale-110 transition-transform shadow-lg"
              >
                <ArrowRight size={18} className="text-[var(--dark-blue)] rotate-180" />
              </button>
            </div>
          )}

          {/* Right fade + arrow */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--dark-blue)] to-transparent z-10 flex items-center justify-end">
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center mr-1 cursor-pointer hover:scale-110 transition-transform shadow-lg"
              >
                <ArrowRight size={18} className="text-[var(--dark-blue)]" />
              </button>
            </div>
          )}

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {allItems.map((item, i) => {
              if (item.type === "portfolio") {
                return (
                  <Link
                    key="portfolio"
                    href="/portfolio"
                    className="flex-shrink-0 w-[280px] md:w-[300px] snap-start group relative p-5 rounded-lg bg-[var(--electric-blue)]/20 border-3 border-[var(--electric-blue)] shadow-[5px_5px_0px_var(--electric-blue)] cursor-pointer block hover:shadow-[3px_3px_0px_var(--lime)] hover:border-[var(--lime)] transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="absolute -top-3 left-4 px-3 py-0.5 bg-[var(--electric-blue)] border-3 border-[var(--dark-blue)] border-b-0 rounded-t-md">
                      <Images size={16} className="text-[var(--lime)]" />
                    </div>

                    <div className="flex items-center gap-2 mt-2 mb-3">
                      <FolderOpen size={18} className="text-[var(--lime)]" />
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--gray)]">
                        MindID
                      </span>
                    </div>

                    <h3 className="font-black text-[var(--cream)] text-sm leading-tight mb-2 group-hover:text-[var(--lime)] transition-colors">
                      {t("service.portfolio")}
                    </h3>

                    <p className="text-xs text-[var(--gray)] mb-4 leading-relaxed">
                      {t("service.portfolio.desc")}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--lime)] text-xs font-bold">
                      <span>48 Video</span>
                      <ArrowRight size={14} />
                    </div>

                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-md bg-[var(--electric-blue)] text-[var(--lime)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">
                      &rarr;
                    </div>
                  </Link>
                );
              }

              const service = item.service!;
              const isAvatar = service.id === "avatar";
              const href = isAvatar ? "/avatar" : `/configure/${service.id}`;

              return (
                <Link
                  key={service.id}
                  href={href}
                  className="flex-shrink-0 w-[280px] md:w-[300px] snap-start group relative p-5 rounded-lg bg-[var(--cream)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] cursor-pointer block hover:shadow-[3px_3px_0px_var(--lime)] hover:border-[var(--lime)] transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="absolute -top-3 left-4 px-3 py-0.5 bg-[var(--lime)] border-3 border-[var(--dark-blue)] border-b-0 rounded-t-md">
                    <span className="text-lg">{service.icon}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 mb-3">
                    <FolderOpen size={18} className="text-[var(--electric-blue)]" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--gray)]">
                      MindID
                    </span>
                    {i === 0 && (
                      <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark-blue)] font-bold uppercase">
                        En Uygun
                      </span>
                    )}
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

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {allItems.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[var(--electric-blue)]/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
