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
} from "@/lib/pricing-data";
import { DurationSelector } from "./duration-selector";
import { OptionCardGroup } from "./option-card-group";
import { MultiSelectGroup } from "./multi-select-group";
import { PriceSummary } from "./price-summary";
import {
  FileText,
  Mic,
  Music,
  Eye,
  Wand2,
  RotateCcw,
} from "lucide-react";

const initialState: ConfigState = {
  duration: null,
  scenario: null,
  voice: null,
  music: null,
  visualStyle: null,
  postProduction: [],
  revision: null,
};

export const Configurator = () => {
  const [config, setConfig] = useState<ConfigState>(initialState);

  const togglePostProduction = useCallback(
    (option: PostProductionOption) => {
      setConfig((prev) => {
        const exists = prev.postProduction.some((p) => p.id === option.id);
        return {
          ...prev,
          postProduction: exists
            ? prev.postProduction.filter((p) => p.id !== option.id)
            : [...prev.postProduction, option],
        };
      });
    },
    []
  );

  return (
    <section id="configurator" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-[var(--foreground)]">
            Video Konfiguratoru
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Video suresini secin, parametreleri belirleyin. Fiyat aninda
            guncellenir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Configuration options */}
          <div className="lg:col-span-2 space-y-10">
            {/* Step 1: Duration */}
            <DurationSelector
              selected={config.duration}
              onSelect={(d) => setConfig((prev) => ({ ...prev, duration: d }))}
            />

            {/* Rest appears after duration is selected */}
            {config.duration && (
              <>
                {/* Step 2: Scenario */}
                <OptionCardGroup
                  title="Senaryo Tipi"
                  subtitle="Videonuzun anlati yapisini secin"
                  icon={<FileText size={20} />}
                  options={SCENARIO_OPTIONS}
                  selected={config.scenario}
                  onSelect={(s) =>
                    setConfig((prev) => ({ ...prev, scenario: s }))
                  }
                />

                {/* Step 3: Voice */}
                <OptionCardGroup
                  title="Seslendirme"
                  subtitle="AI ses teknolojisi ile profesyonel seslendirme"
                  icon={<Mic size={20} />}
                  options={VOICE_OPTIONS}
                  selected={config.voice}
                  onSelect={(v) =>
                    setConfig((prev) => ({ ...prev, voice: v }))
                  }
                />

                {/* Step 4: Music */}
                <OptionCardGroup
                  title="Muzik & Ses"
                  subtitle="Videonuzun muzik altyapisini secin"
                  icon={<Music size={20} />}
                  options={MUSIC_OPTIONS}
                  selected={config.music}
                  onSelect={(m) =>
                    setConfig((prev) => ({ ...prev, music: m }))
                  }
                />

                {/* Step 5: Visual Style */}
                <OptionCardGroup
                  title="Gorsel Stil"
                  subtitle="AI gorsel uretim tarzini belirleyin"
                  icon={<Eye size={20} />}
                  options={VISUAL_STYLE_OPTIONS}
                  selected={config.visualStyle}
                  onSelect={(vs) =>
                    setConfig((prev) => ({ ...prev, visualStyle: vs }))
                  }
                />

                {/* Step 6: Post Production */}
                <MultiSelectGroup
                  title="Post-Produksiyon"
                  subtitle="Ek hizmetlerden birden fazla secebilirsiniz"
                  icon={<Wand2 size={20} />}
                  options={POST_PRODUCTION_OPTIONS}
                  selected={config.postProduction}
                  onToggle={togglePostProduction}
                />

                {/* Step 7: Revisions */}
                <OptionCardGroup
                  title="Revizyon Paketi"
                  subtitle="Kac tur revizyon hakki istiyorsunuz?"
                  icon={<RotateCcw size={20} />}
                  options={REVISION_PACKAGES.map((r) => ({
                    ...r,
                    description: `${r.count} tur revizyon hakki`,
                  }))}
                  selected={
                    config.revision
                      ? {
                          ...config.revision,
                          description: `${config.revision.count} tur revizyon hakki`,
                        }
                      : null
                  }
                  onSelect={(r) =>
                    setConfig((prev) => ({
                      ...prev,
                      revision: REVISION_PACKAGES.find(
                        (rp) => rp.id === r.id
                      )!,
                    }))
                  }
                />
              </>
            )}
          </div>

          {/* Right: Price summary */}
          <div className="lg:col-span-1">
            <PriceSummary config={config} />
          </div>
        </div>
      </div>
    </section>
  );
};
