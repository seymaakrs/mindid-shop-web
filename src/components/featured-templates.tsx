"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown, Sparkles, TrendingUp } from "lucide-react";
import { getFeaturedTemplates } from "@/lib/template-data";
import { useAuth } from "@/lib/auth-context";
import type { Template } from "@/lib/firestore-types";

const FEATURED = getFeaturedTemplates(8);

export const FeaturedTemplates = () => {
  return (
    <section className="py-16 sm:py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--lime)]/15 text-[var(--dark-blue)] text-xs font-bold mb-3">
              <Sparkles size={14} />
              ŞABLONLAR
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--dark-blue)] tracking-tight">
              🔥 Trend Şablonlar
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[var(--dark-blue)]/60">
              Saniyeler içinde profesyonel içerik üret.
            </p>
          </div>
          <Link
            href="/templates"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-black text-[var(--dark-blue)] hover:text-[var(--electric-blue)] transition-colors whitespace-nowrap group"
          >
            Tüm şablonları gör
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Horizontal scroll */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4 snap-x snap-mandatory">
            {FEATURED.map((tpl) => (
              <FeaturedCard key={tpl.id} template={tpl} />
            ))}
            <Link
              href="/templates"
              className="snap-start shrink-0 w-[180px] sm:w-[220px] aspect-[3/4] rounded-2xl bg-[var(--dark-blue)] text-[var(--lime)] flex flex-col items-center justify-center gap-3 p-6 text-center hover:bg-[var(--electric-blue)] hover:text-white transition-colors group"
            >
              <ArrowRight
                size={32}
                className="transition-transform group-hover:translate-x-1"
              />
              <span className="text-sm font-black">Tüm şablonları gör →</span>
            </Link>
          </div>
        </div>

        {/* Mobile CTA */}
        <Link
          href="/templates"
          className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--dark-blue)]"
        >
          Tüm şablonları gör →
        </Link>
      </div>
    </section>
  );
};

const FeaturedCard = ({ template }: { template: Template }) => {
  const { customerData } = useAuth();
  const credits = customerData?.credits ?? 0;
  const needsCredits = !!template.isPro && (template.creditCost ?? 0) > credits;

  const href = needsCredits
    ? "/dashboard?tab=credits"
    : `/configure/${template.serviceId}?template=${template.id}`;

  return (
    <Link
      href={href}
      className="snap-start shrink-0 w-[180px] sm:w-[220px] group relative block overflow-hidden rounded-2xl bg-white border-2 border-[var(--dark-blue)]/5 hover:border-[var(--lime)]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--dark-blue)]/5">
        <Image
          src={template.previewUrl}
          alt={template.title}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1">
            {template.isNew && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-white text-[var(--dark-blue)] text-[9px] font-black tracking-wide shadow-md">
                NEW
              </span>
            )}
            {template.isPro && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] text-[9px] font-black tracking-wide shadow-md">
                <Crown size={9} />
                PRO
              </span>
            )}
          </div>
          {template.popularity >= 85 && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--dark-blue)]/80 backdrop-blur-sm text-[var(--lime)] text-[9px] font-black tracking-wide">
              <TrendingUp size={9} />
              TREND
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[var(--dark-blue)] via-[var(--dark-blue)]/80 to-transparent">
          <h3 className="text-white font-black text-sm leading-tight line-clamp-2">
            {template.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
