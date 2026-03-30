"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Layers,
  Palette,
  Zap,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Star,
  Package,
  Image as ImageIcon,
  RotateCcw,
  Users,
} from "lucide-react";
import {
  PRODUCT_COUNT_OPTIONS,
  PHOTO_ANGLE_OPTIONS,
  PHOTO_MODEL_OPTIONS,
  COLOR_PACKAGE_OPTIONS,
  PHOTO_VISUAL_STYLE_OPTIONS,
  BACKGROUND_OPTIONS,
  PHOTO_RETOUCH_OPTIONS,
} from "@/lib/pricing-data";

/* ── Örnek çalışmalar (görselsiz temsili kartlar) ── */
const EXAMPLES = [
  {
    category: { tr: "Giyim & Aksesuar", en: "Apparel & Accessories" },
    title: { tr: "Çanta Koleksiyonu — Beyaz Zemin", en: "Bag Collection — White Background" },
    style: { tr: "Stüdyo / E-ticaret", en: "Studio / E-commerce" },
    saving: 72,
    bg: "from-[var(--lime)]/20 to-[var(--cream)]",
    icon: ShoppingBag,
  },
  {
    category: { tr: "Kozmetik", en: "Cosmetics" },
    title: { tr: "Parfüm Serisi — Lüks Sahne", en: "Perfume Series — Luxury Scene" },
    style: { tr: "Lifestyle / Premium", en: "Lifestyle / Premium" },
    saving: 68,
    bg: "from-[var(--electric-blue)]/10 to-[var(--cream)]",
    icon: Palette,
  },
  {
    category: { tr: "Elektronik", en: "Electronics" },
    title: { tr: "Telefon Kılıfı — 4 Açı", en: "Phone Case — 4 Angles" },
    style: { tr: "Çok Açılı / Minimalist", en: "Multi-angle / Minimalist" },
    saving: 75,
    bg: "from-[var(--lime)]/10 to-[var(--cream)]",
    icon: Zap,
  },
  {
    category: { tr: "Takı & Mücevher", en: "Jewelry" },
    title: { tr: "Yüzük Koleksiyonu — Marble Zemin", en: "Ring Collection — Marble Background" },
    style: { tr: "Flat Lay / Artistik", en: "Flat Lay / Artistic" },
    saving: 70,
    bg: "from-[var(--dark-blue)]/5 to-[var(--cream)]",
    icon: Star,
  },
  {
    category: { tr: "Ev & Mutfak", en: "Home & Kitchen" },
    title: { tr: "Mutfak Seti — Lifestyle Ortam", en: "Kitchen Set — Lifestyle Scene" },
    style: { tr: "Lifestyle / Ev Ortamı", en: "Lifestyle / Home Environment" },
    saving: 65,
    bg: "from-[var(--lime)]/15 to-[var(--cream)]",
    icon: Package,
  },
  {
    category: { tr: "Sağlık & Takviye", en: "Health & Supplements" },
    title: { tr: "Vitamin Serisi — 360° Görünüm", en: "Vitamin Series — 360° View" },
    style: { tr: "360° / Premium", en: "360° / Premium" },
    saving: 71,
    bg: "from-[var(--electric-blue)]/8 to-[var(--cream)]",
    icon: RotateCcw,
  },
];

/* ── Platform uyumluluğu ── */
const PLATFORMS = [
  { name: "Trendyol", specs: "1000×1000px, beyaz zemin" },
  { name: "Hepsiburada", specs: "1000×1000px, JPG/PNG" },
  { name: "Shopify", specs: "2048×2048px" },
  { name: "Amazon", specs: "1600px+, beyaz zorunlu" },
  { name: "N11", specs: "800×800px, JPG" },
  { name: "Etsy", specs: "2000×2000px, lifestyle" },
  { name: "eBay", specs: "500×500px+" },
  { name: "AliExpress", specs: "800×800px, JPG" },
];

/* ── Fiyat parametreleri bölüm grupları ── */
type ParamGroup = {
  id: string;
  icon: typeof Camera;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  options: { id: string; label: string; description: string; price: number }[];
};

const PARAM_GROUPS: ParamGroup[] = [
  {
    id: "product-count",
    icon: Package,
    title: { tr: "Ürün Adedi", en: "Product Count" },
    desc: { tr: "Kaç ürün için görsel üretilecek?", en: "How many products need visuals?" },
    options: PRODUCT_COUNT_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "angle",
    icon: Camera,
    title: { tr: "Çekim Açısı", en: "Shooting Angle" },
    desc: { tr: "Her ürün kaç açıdan gösterilsin?", en: "How many angles per product?" },
    options: PHOTO_ANGLE_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "model",
    icon: Users,
    title: { tr: "Model Tipi", en: "Model Type" },
    desc: { tr: "Modelsiz mi yoksa AI model mi?", en: "Without model or with AI model?" },
    options: PHOTO_MODEL_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "color",
    icon: Palette,
    title: { tr: "Renk Paketi", en: "Color Package" },
    desc: { tr: "Kaç renk varyasyonu gerekiyor?", en: "How many color variations needed?" },
    options: COLOR_PACKAGE_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "visual-style",
    icon: ImageIcon,
    title: { tr: "Görsel Stil", en: "Visual Style" },
    desc: { tr: "Fotoğraf hangi stilde olsun?", en: "What style should the photo be?" },
    options: PHOTO_VISUAL_STYLE_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "background",
    icon: Layers,
    title: { tr: "Arka Plan", en: "Background" },
    desc: { tr: "Hangi arka plan seçeneği?", en: "Which background option?" },
    options: BACKGROUND_OPTIONS.map((o) => ({ ...o })),
  },
  {
    id: "retouch",
    icon: Star,
    title: { tr: "Rötuş & İşlem", en: "Retouching" },
    desc: { tr: "Hangi seviyede rötuş?", en: "What level of retouching?" },
    options: PHOTO_RETOUCH_OPTIONS.map((o) => ({ ...o })),
  },
];

/* ── Neden MindID? ── */
const WHY_ITEMS = [
  {
    icon: Zap,
    title: { tr: "%70 Maliyet Tasarrufu", en: "70% Cost Savings" },
    desc: { tr: "Geleneksel stüdyo çekimine kıyasla dramatik fiyat avantajı", en: "Dramatic price advantage compared to traditional studio shoots" },
  },
  {
    icon: RotateCcw,
    title: { tr: "3-5 İş Günü Teslimat", en: "3-5 Business Day Delivery" },
    desc: { tr: "Geleneksel çekimin haftalar sürdüğü işi günler içinde teslim", en: "Delivering in days what traditional shoots take weeks for" },
  },
  {
    icon: CheckCircle2,
    title: { tr: "Sınırsız Varyasyon", en: "Unlimited Variations" },
    desc: { tr: "Aynı ürün için farklı arka plan, renk ve açılar ekstra maliyet olmadan", en: "Different backgrounds, colors and angles for the same product at no extra cost" },
  },
  {
    icon: ShoppingBag,
    title: { tr: "Platform Uyumlu", en: "Platform Ready" },
    desc: { tr: "Trendyol, Amazon, Shopify — tüm platform gereksinimlerine uygun boyutlar", en: "Trendyol, Amazon, Shopify — sizes matching all platform requirements" },
  },
];

export const AIGorselPage = () => {
  const { lang, formatPrice } = useI18n();
  const [openGroup, setOpenGroup] = useState<string | null>("product-count");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const t = (obj: { tr: string; en: string }) => (lang === "en" ? obj.en : obj.tr);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollExamples = (dir: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 mb-6">
            <Camera size={14} className="text-[var(--foreground)]" />
            <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
              {lang === "en" ? "AI Product Photography" : "AI Ürün Görseli"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] leading-tight mb-6">
            {lang === "en" ? "Studio-Quality Visuals" : "Stüdyo Kalitesinde Görseller"}
            <br />
            <span className="text-[var(--lime)] relative inline-block">
              {lang === "en" ? "Without Studio" : "Stüdyo Olmadan"}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M2 8c40-6 80-6 120-2s56 4 76 0" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base md:text-lg text-[var(--gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
            {lang === "en"
              ? "AI-generated product images for Trendyol, Amazon, Shopify at 70% less cost. No mannequin, no studio, no waiting."
              : "Trendyol, Amazon, Shopify için AI ürün görseli — %70 daha az maliyetle. Manken yok, stüdyo yok, bekleme yok."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configure/product-photo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Configure & Get Quote" : "Fiyat Hesapla"}
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/905419315550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 transition-all"
            >
              {lang === "en" ? "Ask on WhatsApp" : "WhatsApp'ta Sor"}
            </a>
          </div>

          {/* Hızlı istatistikler */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--foreground)]">%70</div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Cheaper" : "Daha Ucuz"}
              </div>
            </div>
            <div className="text-center border-x-2 border-[var(--electric-blue)]/15">
              <div className="text-3xl font-black text-[var(--foreground)]">3-5</div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Day Delivery" : "Gün Teslimat"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[var(--foreground)]">8+</div>
              <div className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">
                {lang === "en" ? "Platforms" : "Platform"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÖRNEK ÇALIŞMALAR ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Başlık + Portföy linki */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-2">
                {lang === "en" ? "Example Works" : "Örnek Çalışmalar"}
              </h2>
              <p className="text-[var(--gray)] text-sm max-w-xl">
                {lang === "en"
                  ? "Samples from different industries and styles"
                  : "Farklı sektörler ve stiller için örnekler"}
              </p>
              <div className="w-16 h-1 bg-[var(--lime)] mt-3 rounded-full" />
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--foreground)] border-b-2 border-[var(--lime)] pb-0.5 hover:text-[var(--electric-blue)] transition-colors shrink-0 ml-4"
            >
              {lang === "en" ? "View Full Portfolio" : "Tüm Portföyü Gör"}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Sol ok */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 flex items-center">
                <button
                  onClick={() => scrollExamples("left")}
                  aria-label="Önceki örnekler"
                  className="w-10 h-10 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center ml-1 cursor-pointer hover:scale-110 transition-transform shadow-lg"
                >
                  <ArrowRight size={18} className="text-[var(--dark-blue)] rotate-180" />
                </button>
              </div>
            )}

            {/* Sağ ok */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 flex items-center justify-end">
                <button
                  onClick={() => scrollExamples("right")}
                  aria-label="Sonraki örnekler"
                  className="w-10 h-10 rounded-full bg-[var(--lime)] border-2 border-[var(--dark-blue)] flex items-center justify-center mr-1 cursor-pointer hover:scale-110 transition-transform shadow-lg"
                >
                  <ArrowRight size={18} className="text-[var(--dark-blue)]" />
                </button>
              </div>
            )}

            {/* Kaydırılabilir kart listesi */}
            <div
              ref={sliderRef}
              role="region"
              aria-label="Örnek çalışmalar galerisi"
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {EXAMPLES.map((ex, i) => {
                const Icon = ex.icon;
                return (
                  <article
                    key={i}
                    className="flex-shrink-0 w-[280px] md:w-[300px] lg:w-[320px] snap-start group rounded-lg border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] overflow-hidden hover:shadow-[3px_3px_0px_var(--lime)] hover:border-[var(--lime)] transition-all duration-300 hover:-translate-y-1 bg-[var(--card)]"
                  >
                    {/* Görsel placeholder */}
                    <div className={`h-52 bg-gradient-to-br ${ex.bg} flex items-center justify-center border-b-3 border-[var(--dark-blue)] group-hover:border-[var(--lime)] transition-colors`}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-xl bg-[var(--lime)]/20 border-2 border-[var(--lime)]/40 flex items-center justify-center mx-auto mb-2">
                          <Icon size={28} className="text-[var(--dark-blue)]" />
                        </div>
                        <span className="text-xs font-bold text-[var(--gray)] uppercase tracking-wider">
                          {t(ex.category)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-black text-sm text-[var(--foreground)] mb-2 leading-tight">
                        {t(ex.title)}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[var(--gray)] font-medium">{t(ex.style)}</span>
                        <span className="text-[10px] font-black text-[var(--lime)] bg-[var(--dark-blue)] px-2 py-0.5 rounded">
                          %{ex.saving} {lang === "en" ? "saving" : "tasarruf"}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobil portföy linki */}
          <div className="text-center mt-6 sm:hidden">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--foreground)] border-b-2 border-[var(--lime)] pb-0.5"
            >
              {lang === "en" ? "View Full Portfolio" : "Tüm Portföyü Gör"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEDEN MİNDID? ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
              {lang === "en" ? "Why MindID AI?" : "Neden MindID AI?"}
            </h2>
            <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] hover:border-[var(--lime)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--lime)]/15 border-2 border-[var(--lime)]/30 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[var(--dark-blue)]" />
                  </div>
                  <h3 className="font-black text-sm text-[var(--foreground)] mb-1">{t(item.title)}</h3>
                  <p className="text-xs text-[var(--gray)] leading-relaxed">{t(item.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FİYATLANDIRMA PARAMETRELERİ ── */}
      <section id="fiyatlandirma" className="relative py-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-3">
              {lang === "en" ? "Pricing Parameters" : "Fiyatlandırma Parametreleri"}
            </h2>
            <p className="text-[var(--gray)] text-sm max-w-xl mx-auto">
              {lang === "en"
                ? "Customize every detail — the final price is calculated based on your selections"
                : "Her detayı özelleştirin — fiyat seçimlerinize göre hesaplanır"}
            </p>
            <div className="w-20 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-3">
            {PARAM_GROUPS.map((group) => {
              const Icon = group.icon;
              const isOpen = openGroup === group.id;
              return (
                <div
                  key={group.id}
                  className={`rounded-lg border-3 transition-all ${
                    isOpen
                      ? "border-[var(--lime)] shadow-[4px_4px_0px_var(--lime)]"
                      : "border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)]"
                  } bg-[var(--card)]`}
                >
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-4 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-colors ${isOpen ? "bg-[var(--lime)]/20 border-[var(--lime)]/40" : "bg-[var(--dark-blue)]/5 border-[var(--dark-blue)]/20"}`}>
                        <Icon size={18} className={isOpen ? "text-[var(--dark-blue)]" : "text-[var(--gray)]"} />
                      </div>
                      <div>
                        <span className="font-black text-sm text-[var(--foreground)]">{t(group.title)}</span>
                        <p className="text-[11px] text-[var(--gray)]">{t(group.desc)}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`text-[var(--gray)] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 border-t-2 border-[var(--lime)]/20 pt-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-start justify-between gap-2 p-3 rounded-md bg-[var(--background)] border-2 border-[var(--dark-blue)]/10 hover:border-[var(--lime)]/40 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-xs text-[var(--foreground)]">{opt.label}</div>
                              <div className="text-[10px] text-[var(--gray)] leading-snug mt-0.5">{opt.description}</div>
                            </div>
                            <span className={`flex-shrink-0 text-xs font-black rounded px-2 py-0.5 ${opt.price === 0 ? "bg-[var(--lime)]/20 text-[var(--dark-blue)]" : "bg-[var(--dark-blue)]/5 text-[var(--foreground)]"}`}>
                              {opt.price === 0 ? (lang === "en" ? "Included" : "Dahil") : `+${formatPrice(opt.price)}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[var(--gray)] mb-4">
              {lang === "en"
                ? "Base price starts at ₺499 · Final price calculated by the configurator"
                : "Taban fiyat 499₺'den başlar · Nihai fiyat yapılandırıcı ile hesaplanır"}
            </p>
            <Link
              href="/configure/product-photo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Open Configurator" : "Yapılandırıcıyı Aç"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PLATFORM UYUMLULUĞU ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
              {lang === "en" ? "Platform Compatibility" : "Platform Uyumluluğu"}
            </h2>
            <p className="text-[var(--gray)] text-sm">
              {lang === "en"
                ? "Optimized for all major e-commerce platforms"
                : "Tüm büyük e-ticaret platformları için optimize edilmiş boyutlar"}
            </p>
            <div className="w-16 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLATFORMS.map((p, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)]/20 text-center hover:border-[var(--lime)] hover:shadow-[3px_3px_0px_var(--lime)] transition-all"
              >
                <div className="font-black text-sm text-[var(--foreground)] mb-1">{p.name}</div>
                <div className="text-[10px] text-[var(--gray)]">{p.specs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SÜREÇ ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-2">
              {lang === "en" ? "How It Works" : "Nasıl Çalışır?"}
            </h2>
            <div className="w-16 h-1 bg-[var(--lime)] mx-auto mt-4 rounded-full" />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: 1, title: { tr: "Ürünü Gönderin", en: "Send Your Product" }, desc: { tr: "Ürün fotoğrafınızı veya dosyanızı WhatsApp veya form ile gönderin", en: "Send your product photo or file via WhatsApp or form" } },
              { step: 2, title: { tr: "Parametreleri Seçin", en: "Choose Parameters" }, desc: { tr: "Stil, arka plan, açı ve model tercihlerinizi belirleyin", en: "Set your style, background, angle and model preferences" } },
              { step: 3, title: { tr: "AI Üretir", en: "AI Produces" }, desc: { tr: "Yapay zekamız 3-5 iş günü içinde profesyonel görseller üretir", en: "Our AI produces professional visuals within 3-5 business days" } },
              { step: 4, title: { tr: "Teslim & Yayın", en: "Deliver & Publish" }, desc: { tr: "Platform boyutlarına hazır, hemen yayına alın", en: "Platform-ready, publish immediately" } },
            ].map((s) => (
              <li key={s.step} className="relative p-5 rounded-lg bg-[var(--card)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] flex items-center justify-center text-sm font-black text-[var(--dark-blue)]">
                  {s.step}
                </div>
                <h3 className="font-black text-sm text-[var(--foreground)] mb-2 mt-2">{lang === "en" ? s.title.en : s.title.tr}</h3>
                <p className="text-xs text-[var(--gray)] leading-relaxed">{lang === "en" ? s.desc.en : s.desc.tr}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-[var(--lime)] mx-auto mb-8 rounded-full" />
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
            {lang === "en" ? "Ready to Start?" : "Başlamaya Hazır mısınız?"}
          </h2>
          <p className="text-sm text-[var(--gray)] mb-8 max-w-xl mx-auto">
            {lang === "en"
              ? "Get your first AI product visual quote in minutes. No commitment required."
              : "İlk AI ürün görseli teklifinizi dakikalar içinde alın. Taahhüt gerekmez."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configure/product-photo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[5px_5px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-base font-black hover:shadow-[3px_3px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "en" ? "Configure & Quote" : "Teklif Al"}
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/905419315550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-3 border-[var(--dark-blue)] text-[var(--dark-blue)] text-base font-bold hover:bg-[var(--lime)]/10 hover:border-[var(--lime)] transition-all"
            >
              {lang === "en" ? "Chat on WhatsApp" : "WhatsApp'ta Yaz"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
