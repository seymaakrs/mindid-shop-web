"use client";

import { useState } from "react";
import type { ConfigState, PostProductionOption } from "@/lib/types";
import {
  SCENARIO_OPTIONS,
  VOICE_OPTIONS,
  MUSIC_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  POST_PRODUCTION_OPTIONS,
  REVISION_PACKAGES,
  SERVICE_TYPES,
  PRODUCT_COUNT_OPTIONS,
  PHOTO_ANGLE_OPTIONS,
  PHOTO_MODEL_OPTIONS,
  COLOR_PACKAGE_OPTIONS,
  PHOTO_VISUAL_STYLE_OPTIONS,
  BACKGROUND_OPTIONS,
  PHOTO_RETOUCH_OPTIONS,
} from "@/lib/pricing-data";
import type { ServiceType } from "@/lib/pricing-data";
import { usePricing } from "@/lib/hooks/use-firestore";
import { DurationSelector } from "./duration-selector";
import { OptionCardGroup } from "./option-card-group";
import { NumberInput } from "./number-input";
import { DirectorDesk } from "./director-desk";
import { CongratsPage } from "./congrats-page";
import { useI18n } from "@/lib/i18n";
import {
  FileText,
  Mic,
  Music,
  Eye,
  Wand2,
  RotateCcw,
  ArrowLeft,
  Package,
  ShoppingBag,
  Palette,
  Camera,
  ImageIcon,
  ScanEye,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type ConfiguratorPageProps = {
  serviceId: string;
};

type Step = "configure" | "checkout" | "congrats";

const initialConfig: ConfigState = {
  // Video fields
  duration: null,
  scenario: null,
  voice: null,
  music: null,
  visualStyle: null,
  postProduction: [],
  revision: null,
  // Product photo fields
  productCount: null,
  photoAngle: null,
  photoModel: null,
  colorPackage: null,
  photoVisualStyle: null,
  background: null,
  photoRetouch: null,
};

export const ConfiguratorPage = ({ serviceId }: ConfiguratorPageProps) => {
  const { t, formatPrice } = useI18n();
  const { data: pricingConfig } = usePricing();
  const [config, setConfig] = useState<ConfigState>(initialConfig);
  const [step, setStep] = useState<Step>("configure");

  const isProductPhoto = serviceId === "product-photo";

  // Use Firestore pricing if available, otherwise fallback to hardcoded
  const services = pricingConfig?.services ?? SERVICE_TYPES.map((s) => ({ ...s }));

  // Video options
  const scenarioOptions = pricingConfig?.scenarios ?? SCENARIO_OPTIONS;
  const voiceOptions = pricingConfig?.voices ?? VOICE_OPTIONS;
  const musicOptions = pricingConfig?.music ?? MUSIC_OPTIONS;
  const visualStyleOptions = pricingConfig?.visualStyles ?? VISUAL_STYLE_OPTIONS;
  const postProductionOptions = pricingConfig?.postProduction ?? POST_PRODUCTION_OPTIONS;
  const revisionPackages = pricingConfig?.revisions ?? REVISION_PACKAGES;

  // Product photo options
  const productCountOptions = pricingConfig?.productCounts ?? PRODUCT_COUNT_OPTIONS;
  const photoAngleOptions = PHOTO_ANGLE_OPTIONS;
  const photoModelOptions = PHOTO_MODEL_OPTIONS;
  const colorPackageOptions = COLOR_PACKAGE_OPTIONS;
  const photoVisualStyleOptions = pricingConfig?.photoVisualStyles ?? PHOTO_VISUAL_STYLE_OPTIONS;
  const backgroundOptions = pricingConfig?.backgrounds ?? BACKGROUND_OPTIONS;
  const photoRetouchOptions = PHOTO_RETOUCH_OPTIONS;

  const service = services.find((s) => s.id === serviceId) as ServiceType | undefined;
  if (!service) return null;

  const togglePostProd = (option: PostProductionOption) => {
    setConfig((prev) => {
      const exists = prev.postProduction.some((p) => p.id === option.id);
      return {
        ...prev,
        postProduction: exists
          ? prev.postProduction.filter((p) => p.id !== option.id)
          : [...prev.postProduction, option],
      };
    });
  };

  // Calculate totals
  const basePrice = service.basePrice;
  const revisionPrice = config.revision?.price ?? 0;

  let totalAI: number;
  if (isProductPhoto) {
    const productCountPrice = config.productCount?.price ?? 0;
    const anglePrice = config.photoAngle?.price ?? 0;
    const modelPrice = config.photoModel?.price ?? 0;
    const colorPkgPrice = config.colorPackage?.price ?? 0;
    const photoVisualPrice = config.photoVisualStyle?.price ?? 0;
    const bgPrice = config.background?.price ?? 0;
    const retouchPrice = config.photoRetouch?.price ?? 0;
    totalAI = basePrice + productCountPrice + anglePrice + modelPrice + colorPkgPrice + photoVisualPrice + bgPrice + retouchPrice + revisionPrice;
  } else {
    const durationPrice = config.duration?.basePrice ?? 0;
    const scenarioPrice = config.scenario?.price ?? 0;
    const voicePrice = config.voice?.price ?? 0;
    const musicPrice = config.music?.price ?? 0;
    const visualPrice = config.visualStyle?.price ?? 0;
    const postProdPrice = config.postProduction.reduce((sum, p) => sum + p.price, 0);
    totalAI = basePrice + durationPrice + scenarioPrice + voicePrice + musicPrice + visualPrice + postProdPrice + revisionPrice;
  }

  const totalTraditional = Math.round(totalAI * service.traditionalMultiplier);
  const savings = totalTraditional - totalAI;

  const canProceed = isProductPhoto ? !!config.productCount : !!config.duration;

  if (step === "congrats") {
    return (
      <CongratsPage
        totalAI={totalAI}
        totalTraditional={totalTraditional}
        savings={savings}
        serviceName={t(service.nameKey)}
      />
    );
  }

  if (step === "checkout") {
    return (
      <DirectorDesk
        config={config}
        service={service}
        totalAI={totalAI}
        totalTraditional={totalTraditional}
        savings={savings}
        basePrice={basePrice}
        onBack={() => setStep("configure")}
        onSubmit={() => setStep("congrats")}
      />
    );
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/#services" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} />
          {t("nav.services")}
        </Link>

        {/* Service title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{service.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[var(--cream)]">
              {t(service.nameKey)}
            </h1>
            <p className="text-sm text-[var(--gray)]">
              {isProductPhoto ? t("config.product-photo.title") : t("config.title")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left: Configurator playground */}
          <div className="space-y-8">
            {/* Base package info */}
            <div className="p-4 rounded-md bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-[var(--lime)]" />
                <span className="font-bold text-[var(--lime)] text-sm">{t("config.base")}</span>
              </div>
              <p className="text-xs text-[var(--gray)]">
                {isProductPhoto ? t("config.product-photo.base.desc") : t("config.base.desc")}
              </p>
            </div>

            {isProductPhoto ? (
              <>
                {/* Product Count */}
                <OptionCardGroup
                  title={t("config.productCount")}
                  icon={<ShoppingBag size={16} />}
                  options={productCountOptions}
                  selected={config.productCount}
                  onSelect={(pc) => setConfig((prev) => ({ ...prev, productCount: pc }))}
                />

                {config.productCount && (
                  <>
                    {/* Angle Count — YENİ */}
                    <OptionCardGroup
                      title={t("config.photoAngle")}
                      icon={<ScanEye size={16} />}
                      options={photoAngleOptions}
                      selected={config.photoAngle}
                      onSelect={(a) => setConfig((prev) => ({ ...prev, photoAngle: a }))}
                    />

                    {/* Model Type — YENİ */}
                    <OptionCardGroup
                      title={t("config.photoModel")}
                      icon={<User size={16} />}
                      options={photoModelOptions}
                      selected={config.photoModel}
                      onSelect={(m) => setConfig((prev) => ({ ...prev, photoModel: m }))}
                    />

                    {/* Color Package — YENİ (birim fiyat yerine paket) */}
                    <OptionCardGroup
                      title={t("config.colorPackage")}
                      icon={<Palette size={16} />}
                      options={colorPackageOptions}
                      selected={config.colorPackage}
                      onSelect={(c) => setConfig((prev) => ({ ...prev, colorPackage: c }))}
                    />

                    {/* Photo Visual Style */}
                    <OptionCardGroup
                      title={t("config.photoVisualStyle")}
                      icon={<Camera size={16} />}
                      options={photoVisualStyleOptions}
                      selected={config.photoVisualStyle}
                      onSelect={(s) => setConfig((prev) => ({ ...prev, photoVisualStyle: s }))}
                    />

                    {/* Background */}
                    <OptionCardGroup
                      title={t("config.background")}
                      icon={<ImageIcon size={16} />}
                      options={backgroundOptions}
                      selected={config.background}
                      onSelect={(bg) => setConfig((prev) => ({ ...prev, background: bg }))}
                    />

                    {/* Retouch — YENİ */}
                    <OptionCardGroup
                      title={t("config.photoRetouch")}
                      icon={<Sparkles size={16} />}
                      options={photoRetouchOptions}
                      selected={config.photoRetouch}
                      onSelect={(r) => setConfig((prev) => ({ ...prev, photoRetouch: r }))}
                    />

                    {/* Revision (reused) */}
                    <OptionCardGroup
                      title={t("config.revision")}
                      icon={<RotateCcw size={16} />}
                      options={revisionPackages.map((r) => ({
                        ...r,
                        description: `${r.count >= 99 ? "Sınırsız" : r.count} revizyon hakkı`,
                      }))}
                      selected={
                        config.revision
                          ? { ...config.revision, description: `${config.revision.count >= 99 ? "Sınırsız" : config.revision.count} revizyon hakkı` }
                          : null
                      }
                      onSelect={(r) => setConfig((prev) => ({
                        ...prev,
                        revision: revisionPackages.find((rp) => rp.id === r.id)!,
                      }))}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {/* Duration */}
                <DurationSelector
                  selected={config.duration}
                  onSelect={(d) => setConfig((prev) => ({ ...prev, duration: d }))}
                />

                {config.duration && (
                  <>
                    {/* Scenario */}
                    <OptionCardGroup
                      title={t("config.scenario")}
                      icon={<FileText size={16} />}
                      options={scenarioOptions}
                      selected={config.scenario}
                      onSelect={(s) => setConfig((prev) => ({ ...prev, scenario: s }))}
                    />

                    {/* Voice */}
                    <OptionCardGroup
                      title={t("config.voice")}
                      icon={<Mic size={16} />}
                      options={voiceOptions}
                      selected={config.voice}
                      onSelect={(v) => setConfig((prev) => ({ ...prev, voice: v }))}
                    />

                    {/* Music */}
                    <OptionCardGroup
                      title={t("config.music")}
                      icon={<Music size={16} />}
                      options={musicOptions}
                      selected={config.music}
                      onSelect={(m) => setConfig((prev) => ({ ...prev, music: m }))}
                    />

                    {/* Visual */}
                    <OptionCardGroup
                      title={t("config.visual")}
                      icon={<Eye size={16} />}
                      options={visualStyleOptions}
                      selected={config.visualStyle}
                      onSelect={(vs) => setConfig((prev) => ({ ...prev, visualStyle: vs }))}
                    />

                    {/* Post production (multi) */}
                    <OptionCardGroup
                      title={t("config.postprod")}
                      icon={<Wand2 size={16} />}
                      options={postProductionOptions}
                      selected={null}
                      onSelect={() => {}}
                      multiSelect
                      selectedMulti={config.postProduction}
                      onToggle={togglePostProd}
                    />

                    {/* Revision */}
                    <OptionCardGroup
                      title={t("config.revision")}
                      icon={<RotateCcw size={16} />}
                      options={revisionPackages.map((r) => ({
                        ...r,
                        description: `${r.count >= 99 ? "Sınırsız" : r.count} revizyon hakkı`,
                      }))}
                      selected={
                        config.revision
                          ? { ...config.revision, description: `${config.revision.count} revizyon hakki` }
                          : null
                      }
                      onSelect={(r) => setConfig((prev) => ({
                        ...prev,
                        revision: revisionPackages.find((rp) => rp.id === r.id)!,
                      }))}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Right: Receipt panel (sticky) */}
          <div className="lg:block">
            <div className="sticky top-20">
              <div className="rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden">
                <div className="p-4 bg-[var(--lime)] text-[var(--dark-blue)]">
                  <h3 className="font-black text-lg">
                    {t("config.total")}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {/* Base */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gray)]">{t(service.nameKey)}</span>
                    <span className="text-[var(--cream)] font-bold">{formatPrice(basePrice)}</span>
                  </div>

                  {isProductPhoto ? (
                    <>
                      {config.productCount && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.productCount.label}</span>
                          <span className="text-[var(--cream)] font-bold">
                            {config.productCount.price === 0 ? "Dahil" : `+${formatPrice(config.productCount.price)}`}
                          </span>
                        </div>
                      )}
                      {config.photoAngle && config.photoAngle.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.photoAngle.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.photoAngle.price)}</span>
                        </div>
                      )}
                      {config.photoModel && config.photoModel.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.photoModel.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.photoModel.price)}</span>
                        </div>
                      )}
                      {config.colorPackage && config.colorPackage.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.colorPackage.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.colorPackage.price)}</span>
                        </div>
                      )}
                      {config.photoVisualStyle && config.photoVisualStyle.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.photoVisualStyle.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.photoVisualStyle.price)}</span>
                        </div>
                      )}
                      {config.background && config.background.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.background.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.background.price)}</span>
                        </div>
                      )}
                      {config.photoRetouch && config.photoRetouch.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.photoRetouch.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.photoRetouch.price)}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {config.duration && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.duration.seconds}sn</span>
                          <span className="text-[var(--cream)] font-bold">
                            {config.duration.basePrice === 0 ? "Dahil" : `+${formatPrice(config.duration.basePrice)}`}
                          </span>
                        </div>
                      )}
                      {config.scenario && config.scenario.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.scenario.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.scenario.price)}</span>
                        </div>
                      )}
                      {config.voice && config.voice.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.voice.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.voice.price)}</span>
                        </div>
                      )}
                      {config.music && config.music.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.music.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.music.price)}</span>
                        </div>
                      )}
                      {config.visualStyle && config.visualStyle.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{config.visualStyle.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(config.visualStyle.price)}</span>
                        </div>
                      )}
                      {config.postProduction.map((pp) => (
                        <div key={pp.id} className="flex justify-between text-sm">
                          <span className="text-[var(--gray)]">{pp.label}</span>
                          <span className="text-[var(--cream)] font-bold">+{formatPrice(pp.price)}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Revision (shared) */}
                  {config.revision && config.revision.price > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--gray)]">{config.revision.label}</span>
                      <span className="text-[var(--cream)] font-bold">+{formatPrice(config.revision.price)}</span>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="border-t-2 border-dashed border-[var(--electric-blue)] my-3" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--cream)] font-bold">{t("config.total")}</span>
                    <span className="text-2xl font-black text-[var(--lime)] animate-glow-pulse">
                      {formatPrice(totalAI)}
                    </span>
                  </div>

                  {/* Traditional comparison - psychological pricing */}
                  {totalTraditional > 0 && (
                    <div className="p-3 rounded-md bg-[var(--electric-blue)]/20 mt-3 animate-shimmer">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--gray)]">{t("checkout.traditional")}</span>
                        <span className="text-[var(--gray)] line-through">{formatPrice(totalTraditional)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-[var(--lime)] font-bold">{t("checkout.saved")}</span>
                        <span className="text-[var(--lime)] font-bold">{formatPrice(savings)}</span>
                      </div>
                      {savings > 0 && (
                        <div className="mt-2 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--lime)]/20 text-[var(--lime)] text-[10px] font-bold animate-glow-pulse">
                            %{Math.round((savings / totalTraditional) * 100)} TASARRUF
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Smart move text */}
                  {totalAI > 0 && (
                    <p className="text-[10px] text-[var(--gray)]/70 mt-2 leading-relaxed italic">
                      {t("checkout.smart_move")}
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => canProceed && setStep("checkout")}
                    disabled={!canProceed}
                    className={`mt-4 w-full py-3 rounded-md border-3 text-sm font-black transition-all cursor-pointer ${
                      canProceed
                        ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px]"
                        : "bg-[var(--gray)]/20 text-[var(--gray)] border-[var(--gray)]/30 cursor-not-allowed"
                    }`}
                  >
                    {t("checkout.send")} →
                  </button>

                  {/* Price note */}
                  <p className="text-[9px] text-[var(--gray)]/50 mt-3 leading-relaxed text-center">
                    {t("config.price_note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
