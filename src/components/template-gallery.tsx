"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Sparkles, Crown, TrendingUp, ArrowRight } from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/template-data";
import type { Template, TemplateCategory } from "@/lib/firestore-types";
import { useAuth } from "@/lib/auth-context";
import { trackEvent } from "@/lib/tracking";

type SortMode = "popular" | "new" | "recommended";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "popular", label: "En Popüler" },
  { id: "new", label: "Yeni" },
  { id: "recommended", label: "Önerilen" },
];

export const TemplateGallery = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | TemplateCategory>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("popular");

  useEffect(() => {
    const q = search.trim();
    if (!q) return;
    const handle = setTimeout(() => {
      trackEvent("search", { searchQuery: q, contentCategory: "template" });
    }, 700);
    return () => clearTimeout(handle);
  }, [search]);

  const filtered = useMemo(() => {
    let list = TEMPLATES.slice();
    if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }
    if (sort === "popular") {
      list.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === "new") {
      list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.popularity - a.popularity);
    } else {
      // recommended: blend of popularity + new boost + pro penalty for free users
      list.sort((a, b) => {
        const score = (t: Template) =>
          t.popularity + (t.isNew ? 15 : 0) + (t.isPro ? -5 : 0);
        return score(b) - score(a);
      });
    }
    return list;
  }, [activeCategory, search, sort]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--lime)]/15 text-[var(--dark-blue)] text-xs font-bold mb-4">
          <Sparkles size={14} />
          ŞABLON GALERİSİ
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--dark-blue)] tracking-tight mb-3">
          Saniyeler içinde profesyonel içerik
        </h1>
        <p className="text-base sm:text-lg text-[var(--dark-blue)]/60 max-w-2xl">
          Reels, ürün fotoğrafı, kampanya, kurumsal — 100+ hazır şablonla başla, kendine göre özelleştir.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dark-blue)]/40"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Şablon ara: 'yaz', 'lansman', 'kurumsal'..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-[var(--dark-blue)]/10 bg-white text-sm font-medium text-[var(--dark-blue)] placeholder:text-[var(--dark-blue)]/40 focus:outline-none focus:border-[var(--lime)] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-2xl border-2 border-[var(--dark-blue)]/10 bg-white">
          <Filter size={16} className="ml-2 text-[var(--dark-blue)]/40 shrink-0" />
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSort(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                sort === opt.id
                  ? "bg-[var(--dark-blue)] text-[var(--lime)]"
                  : "text-[var(--dark-blue)]/60 hover:text-[var(--dark-blue)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TEMPLATE_CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                active
                  ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--lime)]"
                  : "bg-white text-[var(--dark-blue)] border-[var(--dark-blue)]/10 hover:border-[var(--lime)]/60"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--dark-blue)]/50 font-medium">
          Bu kriterlere uygun şablon bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-16 flex items-center justify-center gap-2 text-sm text-[var(--dark-blue)]/50">
        <TrendingUp size={16} />
        <span>Her hafta yeni şablonlar ekleniyor.</span>
      </div>
    </section>
  );
};

export const TemplateCard = ({ template }: { template: Template }) => {
  const { customerData } = useAuth();
  const credits = customerData?.credits ?? 0;
  const needsCredits = !!template.isPro && (template.creditCost ?? 0) > credits;

  const href = needsCredits
    ? "/dashboard?tab=credits"
    : `/configure/${template.serviceId}?template=${template.id}`;

  const onUse = () => {
    if (needsCredits) return;
    trackEvent("use_template", {
      contentId: template.id,
      contentName: template.title,
      contentCategory: template.serviceId,
    });
  };

  return (
    <Link
      href={href}
      onClick={onUse}
      className="group relative block overflow-hidden rounded-2xl bg-white border-2 border-[var(--dark-blue)]/5 hover:border-[var(--lime)]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Preview */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--dark-blue)]/5">
        <Image
          src={template.previewUrl}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {template.isNew && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white text-[var(--dark-blue)] text-[10px] font-black tracking-wide shadow-md">
                NEW
              </span>
            )}
            {template.isPro && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] text-[10px] font-black tracking-wide shadow-md">
                <Crown size={10} />
                PRO
              </span>
            )}
          </div>
          {template.popularity >= 85 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--dark-blue)]/80 backdrop-blur-sm text-[var(--lime)] text-[10px] font-black tracking-wide">
              <TrendingUp size={10} />
              TREND
            </span>
          )}
        </div>

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[var(--dark-blue)] via-[var(--dark-blue)]/80 to-transparent">
          <h3 className="text-white font-black text-sm sm:text-base leading-tight line-clamp-2">
            {template.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4">
        <div className="flex flex-wrap gap-1 mb-3 min-h-[22px]">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-[var(--dark-blue)]/50 uppercase tracking-wider"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          className={`inline-flex items-center gap-1.5 text-xs font-black w-full justify-between ${
            needsCredits ? "text-[var(--dark-blue)]/60" : "text-[var(--dark-blue)]"
          } group-hover:text-[var(--electric-blue)] transition-colors`}
        >
          <span>
            {needsCredits ? "Kredi al" : "Bu Şablonu Kullan"}
          </span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};
