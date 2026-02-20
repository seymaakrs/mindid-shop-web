"use client";

import { useState, useCallback } from "react";
import type { ConfigState, PostProductionOption } from "@/lib/types";
import {
  SCENARIO_OPTIONS,
  VOICE_OPTIONS,
  MUSIC_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  POST_PRODUCTION_OPTIONS,
  REVISION_PACKAGES,
  SERVICE_TYPES,
} from "@/lib/pricing-data";
import type { ServiceType } from "@/lib/pricing-data";
import { DurationSelector } from "./duration-selector";
import { OptionCardGroup } from "./option-card-group";
import { DirectorDesk } from "./director-desk";
import { CustomerForm } from "./customer-form";
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
} from "lucide-react";
import Link from "next/link";

type ConfiguratorPageProps = {
  serviceId: string;
};

type Step = "configure" | "checkout" | "congrats";

const initialConfig: ConfigState = {
  duration: null,
  scenario: null,
  voice: null,
  music: null,
  visualStyle: null,
  postProduction: [],
  revision: null,
};

export const ConfiguratorPage = ({ serviceId }: ConfiguratorPageProps) => {
  const { t, formatPrice } = useI18n();
  const [config, setConfig] = useState<ConfigState>(initialConfig);
  const [step, setStep] = useState<Step>("configure");

  const service = SERVICE_TYPES.find((s) => s.id === serviceId) as ServiceType | undefined;
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
  const durationPrice = config.duration?.basePrice ?? 0;
  const scenarioPrice = config.scenario?.price ?? 0;
  const voicePrice = config.voice?.price ?? 0;
  const musicPrice = config.music?.price ?? 0;
  const visualPrice = config.visualStyle?.price ?? 0;
  const postProdPrice = config.postProduction.reduce((sum, p) => sum + p.price, 0);
  const revisionPrice = config.revision?.price ?? 0;
  const totalAI = basePrice + durationPrice + scenarioPrice + voicePrice + musicPrice + visualPrice + postProdPrice + revisionPrice;
  const totalTraditional = Math.round(totalAI * service.traditionalMultiplier);
  const savings = totalTraditional - totalAI;

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
            <p className="text-sm text-[var(--gray)]">{t("config.title")}</p>
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
              <p className="text-xs text-[var(--gray)]">{t("config.base.desc")}</p>
            </div>

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
                  options={SCENARIO_OPTIONS}
                  selected={config.scenario}
                  onSelect={(s) => setConfig((prev) => ({ ...prev, scenario: s }))}
                />

                {/* Voice */}
                <OptionCardGroup
                  title={t("config.voice")}
                  icon={<Mic size={16} />}
                  options={VOICE_OPTIONS}
                  selected={config.voice}
                  onSelect={(v) => setConfig((prev) => ({ ...prev, voice: v }))}
                />

                {/* Music */}
                <OptionCardGroup
                  title={t("config.music")}
                  icon={<Music size={16} />}
                  options={MUSIC_OPTIONS}
                  selected={config.music}
                  onSelect={(m) => setConfig((prev) => ({ ...prev, music: m }))}
                />

                {/* Visual */}
                <OptionCardGroup
                  title={t("config.visual")}
                  icon={<Eye size={16} />}
                  options={VISUAL_STYLE_OPTIONS}
                  selected={config.visualStyle}
                  onSelect={(vs) => setConfig((prev) => ({ ...prev, visualStyle: vs }))}
                />

                {/* Post production (multi) */}
                <OptionCardGroup
                  title={t("config.postprod")}
                  icon={<Wand2 size={16} />}
                  options={POST_PRODUCTION_OPTIONS}
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
                  options={REVISION_PACKAGES.map((r) => ({
                    ...r,
                    description: `${r.count} revizyon hakki`,
                  }))}
                  selected={
                    config.revision
                      ? { ...config.revision, description: `${config.revision.count} revizyon hakki` }
                      : null
                  }
                  onSelect={(r) => setConfig((prev) => ({
                    ...prev,
                    revision: REVISION_PACKAGES.find((rp) => rp.id === r.id)!,
                  }))}
                />
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
                    onClick={() => config.duration && setStep("checkout")}
                    disabled={!config.duration}
                    className={`mt-4 w-full py-3 rounded-md border-3 text-sm font-black transition-all cursor-pointer ${
                      config.duration
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
