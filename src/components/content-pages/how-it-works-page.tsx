"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, Film, UserCircle, Camera, Clapperboard, MessageSquare, Send, Sparkles, CheckCircle2 } from "lucide-react";

type Step = {
  icon: typeof Film;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
};

const commonSteps: Step[] = [
  {
    icon: Clapperboard,
    title: { tr: "1. Hizmetinizi Seçin", en: "1. Choose Your Service" },
    desc: {
      tr: "AI reklam filmi, dijital avatar oluşturma veya e-ticaret ürün görseli — ihtiyacınıza uygun hizmeti seçin.",
      en: "AI ad film, digital avatar creation, or e-commerce product visuals — choose the service that fits your needs.",
    },
  },
  {
    icon: Sparkles,
    title: { tr: "2. Yapılandırın & Fiyatı Görün", en: "2. Configure & See Price" },
    desc: {
      tr: "Online konfigüratör ile süre, stil, senaryo gibi seçenekleri belirleyin. Fiyatınızı anında görün — sürpriz yok.",
      en: "Use our online configurator to set duration, style, scenario options. See your price instantly — no surprises.",
    },
  },
  {
    icon: Send,
    title: { tr: "3. Siparişinizi Gönderin", en: "3. Submit Your Order" },
    desc: {
      tr: "Bilgilerinizi doldurun, referans dosyalarınızı yükleyin ve siparişi gönderin. Hiçbir ön ödeme istenmez.",
      en: "Fill in your details, upload reference files, and submit. No upfront payment required.",
    },
  },
  {
    icon: MessageSquare,
    title: { tr: "4. Brief Görüşmesi", en: "4. Brief Meeting" },
    desc: {
      tr: "24 saat içinde sizinle iletişime geçeriz. Markanızı, hedef kitlenizi ve beklentilerinizi detaylıca anlıyoruz.",
      en: "We contact you within 24 hours. We thoroughly understand your brand, target audience, and expectations.",
    },
  },
  {
    icon: Sparkles,
    title: { tr: "5. AI Prodüksiyon", en: "5. AI Production" },
    desc: {
      tr: "En ileri yapay zeka araçlarıyla içeriğinizi üretiyoruz. Senaryo, görsel üretim, ses, müzik, kurgu — hepsi dahil.",
      en: "We produce your content with cutting-edge AI tools. Scenario, visual generation, audio, music, editing — all included.",
    },
  },
  {
    icon: CheckCircle2,
    title: { tr: "6. Teslimat & Revizyon", en: "6. Delivery & Revisions" },
    desc: {
      tr: "İçeriğinizi teslim alırsınız. 2 ücretsiz revizyon hakkınız dahildir — %100 memnuniyet hedefliyoruz.",
      en: "Receive your content. 2 free revision rounds included — we aim for 100% satisfaction.",
    },
  },
];

type ProcessDetail = {
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  icon: typeof Film;
  steps: { tr: string; en: string }[];
  cta: { href: string; label: { tr: string; en: string } };
};

const processes: ProcessDetail[] = [
  {
    title: { tr: "🎬 AI Reklam Filmi Süreci", en: "🎬 AI Ad Film Process" },
    subtitle: {
      tr: "Yapay zeka ile reklam filmi nasıl üretilir?",
      en: "How are AI ad films produced?",
    },
    icon: Film,
    steps: [
      { tr: "Brief alınır — marka, mesaj, hedef kitle belirlenir", en: "Brief taken — brand, message, target audience defined" },
      { tr: "AI destekli senaryo yazılır", en: "AI-assisted scenario is written" },
      { tr: "Görsel sahneler yapay zeka ile üretilir", en: "Visual scenes generated with AI" },
      { tr: "Seslendirme ve müzik sentezlenir", en: "Voiceover and music synthesized" },
      { tr: "Profesyonel kurgu ve post-prodüksiyon yapılır", en: "Professional editing and post-production" },
      { tr: "Platform için optimize edilmiş formatta teslim", en: "Delivered in platform-optimized format" },
    ],
    cta: { href: "/configure/product", label: { tr: "Reklam Filmi Yapılandır", en: "Configure Ad Film" } },
  },
  {
    title: { tr: "🧑‍💻 AI Avatar Oluşturma Süreci", en: "🧑‍💻 AI Avatar Creation Process" },
    subtitle: {
      tr: "Yapay zeka avatar nasıl oluşturulur?",
      en: "How are AI avatars created?",
    },
    icon: UserCircle,
    steps: [
      { tr: "Fotoğraf veya referans görsel yüklenir", en: "Photo or reference image uploaded" },
      { tr: "AI modeli yüz ve mimikleri öğrenir", en: "AI model learns face and expressions" },
      { tr: "Dijital avatar oluşturulur — gerçekçi ve profesyonel", en: "Digital avatar created — realistic and professional" },
      { tr: "Metin veya ses ile konuşma eklenir", en: "Speech added via text or audio" },
      { tr: "İstediğiniz dilde içerik üretebilirsiniz", en: "Produce content in any language you want" },
      { tr: "Sınırsız kullanım hakkı ile teslim", en: "Delivered with unlimited usage rights" },
    ],
    cta: { href: "/avatar", label: { tr: "Avatar Oluştur", en: "Create Avatar" } },
  },
  {
    title: { tr: "📸 AI Ürün Görseli Süreci", en: "📸 AI Product Visual Process" },
    subtitle: {
      tr: "Manken ve stüdyo masrafı olmadan e-ticaret görseli nasıl hazırlanır?",
      en: "How to create e-commerce visuals without mannequin or studio costs?",
    },
    icon: Camera,
    steps: [
      { tr: "Ürün fotoğrafları veya 3D modeli yüklenir", en: "Product photos or 3D model uploaded" },
      { tr: "İstenen arka plan ve stil belirlenir", en: "Desired background and style specified" },
      { tr: "AI ile stüdyo kalitesinde görseller üretilir", en: "Studio-quality visuals generated with AI" },
      { tr: "Farklı renk ve varyasyonlar anında oluşturulur", en: "Different colors and variations instantly created" },
      { tr: "E-ticaret platformuna uygun boyut ve formatta teslim", en: "Delivered in e-commerce platform-ready size and format" },
      { tr: "Trendyol, Hepsiburada, Shopify, Amazon uyumlu", en: "Compatible with Shopify, Amazon, Trendyol, Hepsiburada" },
    ],
    cta: { href: "/configure/product-photo", label: { tr: "Ürün Görseli Yapılandır", en: "Configure Product Photo" } },
  },
];

export const HowItWorksPage = () => {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">
            {lang === "en" ? "How It Works" : "Nasıl Çalışır?"}
          </h1>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            {lang === "en"
              ? "From choosing your service to receiving your content — here's the complete slowdays production process, step by step."
              : "Hizmet seçiminden içerik teslimatına — slowdays üretim sürecinin tamamı, adım adım."}
          </p>
        </div>

        {/* Common Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {commonSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 p-5 hover:border-[var(--lime)] hover:shadow-[4px_4px_0px_var(--lime)] transition-all"
            >
              <step.icon size={24} className="text-[var(--foreground)] mb-3" />
              <h3 className="text-sm font-black text-[var(--foreground)] mb-2">
                {lang === "en" ? step.title.en : step.title.tr}
              </h3>
              <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                {lang === "en" ? step.desc.en : step.desc.tr}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Processes */}
        {processes.map((process, pi) => (
          <div key={pi} className="mb-12">
            <h2 className="text-xl md:text-2xl font-black text-[var(--electric-blue)] mb-2">
              {lang === "en" ? process.title.en : process.title.tr}
            </h2>
            <p className="text-sm text-[var(--foreground)]/60 mb-6">
              {lang === "en" ? process.subtitle.en : process.subtitle.tr}
            </p>

            <div className="space-y-3 mb-6">
              {process.steps.map((step, si) => (
                <div
                  key={si}
                  className="flex items-start gap-3 p-3 rounded-md bg-[var(--card)] border border-[var(--electric-blue)]/10"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--lime)]/15 text-[var(--foreground)] flex items-center justify-center text-xs font-black">
                    {si + 1}
                  </span>
                  <span className="text-sm text-[var(--foreground)]/80">
                    {lang === "en" ? step.en : step.tr}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={process.cta.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] font-bold text-sm hover:shadow-[3px_3px_0px_var(--electric-blue)] transition-all"
            >
              {lang === "en" ? process.cta.label.en : process.cta.label.tr}
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
