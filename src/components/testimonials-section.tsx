"use client";

import { useI18n } from "@/lib/i18n";
import { Star, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const TESTIMONIAL_KEYS = [
  { nameKey: "testimonial.1.name", roleKey: "testimonial.1.role", textKey: "testimonial.1.text", serviceKey: "testimonial.1.service", stars: 5 },
  { nameKey: "testimonial.2.name", roleKey: "testimonial.2.role", textKey: "testimonial.2.text", serviceKey: "testimonial.2.service", stars: 5 },
  { nameKey: "testimonial.3.name", roleKey: "testimonial.3.role", textKey: "testimonial.3.text", serviceKey: "testimonial.3.service", stars: 5 },
  { nameKey: "testimonial.4.name", roleKey: "testimonial.4.role", textKey: "testimonial.4.text", serviceKey: "testimonial.4.service", stars: 5 },
  { nameKey: "testimonial.5.name", roleKey: "testimonial.5.role", textKey: "testimonial.5.text", serviceKey: "testimonial.5.service", stars: 5 },
  { nameKey: "testimonial.6.name", roleKey: "testimonial.6.role", textKey: "testimonial.6.text", serviceKey: "testimonial.6.service", stars: 5 },
  { nameKey: "testimonial.7.name", roleKey: "testimonial.7.role", textKey: "testimonial.7.text", serviceKey: "testimonial.7.service", stars: 4 },
  { nameKey: "testimonial.8.name", roleKey: "testimonial.8.role", textKey: "testimonial.8.text", serviceKey: "testimonial.8.service", stars: 5 },
];

export const TestimonialsSection = () => {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    const cardWidth = 360;
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
            {t("testimonials.title")}
          </h2>
          <p className="text-[var(--gray)] text-sm md:text-base max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
          <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
        </div>

        {/* Scroll container */}
        <div className="relative">
          {/* Left fade + arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 flex items-center">
              <button
                onClick={() => scroll("left")}
                aria-label="Önceki yorumlar"
                className="w-10 h-10 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center ml-1 cursor-pointer hover:scale-110 transition-transform shadow-lg"
              >
                <ArrowRight size={18} className="text-[var(--dark-blue)] rotate-180" />
              </button>
            </div>
          )}

          {/* Right fade + arrow */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 flex items-center justify-end">
              <button
                onClick={() => scroll("right")}
                aria-label="Sonraki yorumlar"
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
            {TESTIMONIAL_KEYS.map((item, i) => {
              const service = t(item.serviceKey);
              const isVideo = service.toLowerCase().includes("video");

              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[300px] md:w-[340px] snap-start p-5 rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 shadow-[5px_5px_0px_var(--electric-blue)] hover:border-[var(--lime)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={14}
                        className={si < item.stars ? "text-[var(--lime)] fill-[var(--lime)]" : "text-[var(--muted)]/30"}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[var(--foreground)]/90 leading-relaxed mb-5 italic min-h-[80px]">
                    &ldquo;{t(item.textKey)}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t-2 border-dashed border-[var(--electric-blue)]/20">
                    <div>
                      <div className="font-bold text-sm text-[var(--foreground)]">
                        {t(item.nameKey)}
                      </div>
                      <div className="text-[10px] text-[var(--gray)] leading-tight mt-0.5">
                        {t(item.roleKey)}
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        isVideo
                          ? "bg-[var(--electric-blue)]/10 text-[var(--foreground)] border border-[var(--electric-blue)]/30"
                          : "bg-[var(--lime)]/20 text-[var(--foreground)] border border-[var(--lime)]/30"
                      }`}
                    >
                      {service}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {TESTIMONIAL_KEYS.map((_, i) => (
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
