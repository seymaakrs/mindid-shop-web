"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, getDocFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PricingConfig } from "@/lib/firestore-types";
import {
  SERVICE_TYPES,
  DURATION_OPTIONS,
  SCENARIO_OPTIONS,
  VOICE_OPTIONS,
  MUSIC_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  POST_PRODUCTION_OPTIONS,
  REVISION_PACKAGES,
  PRODUCT_COUNT_OPTIONS,
  COLOR_COUNT_UNIT_PRICE,
  PHOTO_VISUAL_STYLE_OPTIONS,
  BACKGROUND_OPTIONS,
} from "@/lib/pricing-data";
import { Save, Check, ChevronDown, ChevronUp } from "lucide-react";

// Deep clone to ensure mutable plain objects (SERVICE_TYPES is `as const`)
const defaultConfig: PricingConfig = JSON.parse(JSON.stringify({
  services: SERVICE_TYPES,
  durations: DURATION_OPTIONS,
  scenarios: SCENARIO_OPTIONS,
  voices: VOICE_OPTIONS,
  music: MUSIC_OPTIONS,
  visualStyles: VISUAL_STYLE_OPTIONS,
  postProduction: POST_PRODUCTION_OPTIONS,
  revisions: REVISION_PACKAGES,
  productCounts: PRODUCT_COUNT_OPTIONS,
  colorCountUnitPrice: COLOR_COUNT_UNIT_PRICE,
  photoVisualStyles: PHOTO_VISUAL_STYLE_OPTIONS,
  backgrounds: BACKGROUND_OPTIONS,
}));

type SectionKey = keyof PricingConfig;

const arraySectionLabels: Record<string, string> = {
  services: "Hizmetler",
  durations: "Süre Seçenekleri",
  scenarios: "Senaryo",
  voices: "Seslendirme",
  music: "Müzik",
  visualStyles: "Görsel Stil",
  postProduction: "Post-Prodüksiyon",
  revisions: "Revizyon",
  productCounts: "Ürün Sayısı (AI Ürün Görseli)",
  photoVisualStyles: "Görsel Stili (AI Ürün Görseli)",
  backgrounds: "Arka Plan (AI Ürün Görseli)",
};

const sectionLabels = arraySectionLabels as Record<SectionKey, string>;

export const PricingEditor = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set(["services"]));

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "mindid_pricing", "config"));
        if (snap.exists()) {
          setConfig({ ...defaultConfig, ...snap.data() } as PricingConfig);
        }
      } catch {
        // empty
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const data = JSON.parse(JSON.stringify(config));
      console.log("Saving pricing config...", data);
      const docRef = doc(db, "mindid_pricing", "config");
      await setDoc(docRef, data);
      // Verify by reading from server (not cache)
      const verify = await getDocFromServer(docRef);
      if (verify.exists()) {
        console.log("Verified! Server data:", verify.data());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError("Kayıt sunucuya ulaşmadı. Firestore rules'u kontrol edin.");
      }
    } catch (err) {
      console.error("Pricing save error:", err);
      setError(err instanceof Error ? err.message : "Kayıt başarısız oldu.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const updateServiceField = (index: number, field: string, value: string | number) => {
    setConfig((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  };

  const updateArrayItem = <K extends Exclude<SectionKey, "services">>(
    section: K,
    index: number,
    field: string,
    value: string | number,
  ) => {
    setConfig((prev) => {
      const arr = [...(prev[section] as Record<string, unknown>[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[var(--cream)]">Fiyatlandırma</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? "Kaydediliyor..." : saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-500/10 border-2 border-red-500/30 text-red-400 text-xs font-bold">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {/* Services section */}
        <div className="rounded-md border-3 border-[var(--electric-blue)]/20 overflow-hidden">
          <button
            onClick={() => toggleSection("services")}
            className="w-full flex items-center justify-between p-4 bg-[var(--electric-blue)]/10 cursor-pointer"
          >
            <span className="font-bold text-[var(--cream)] text-sm">Hizmetler ({config.services.length})</span>
            {openSections.has("services") ? <ChevronUp size={16} className="text-[var(--gray)]" /> : <ChevronDown size={16} className="text-[var(--gray)]" />}
          </button>
          {openSections.has("services") && (
            <div className="p-4 space-y-3">
              {config.services.map((service, i) => (
                <div key={service.id} className="grid grid-cols-4 gap-2 items-center p-2 rounded bg-[var(--dark-blue)]/50">
                  <span className="text-xs text-[var(--cream)] font-bold">{service.id}</span>
                  <div>
                    <input
                      type="number"
                      value={service.basePrice}
                      onChange={(e) => updateServiceField(i, "basePrice", Number(e.target.value))}
                      className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                    />
                    <span className="text-[10px] text-[var(--gray)]">Fiyat (TRY)</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      value={service.traditionalMultiplier}
                      onChange={(e) => updateServiceField(i, "traditionalMultiplier", Number(e.target.value))}
                      className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                    />
                    <span className="text-[10px] text-[var(--gray)]">Çarpan</span>
                  </div>
                  <div>
                    <input
                      value={service.icon}
                      onChange={(e) => updateServiceField(i, "icon", e.target.value)}
                      className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                    />
                    <span className="text-[10px] text-[var(--gray)]">İkon</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Color count unit price */}
        <div className="rounded-md border-3 border-[var(--electric-blue)]/20 overflow-hidden">
          <button
            onClick={() => toggleSection("colorCountUnitPrice" as SectionKey)}
            className="w-full flex items-center justify-between p-4 bg-[var(--electric-blue)]/10 cursor-pointer"
          >
            <span className="font-bold text-[var(--cream)] text-sm">Renk Birim Fiyatı (AI Ürün Görseli)</span>
            {openSections.has("colorCountUnitPrice" as SectionKey) ? <ChevronUp size={16} className="text-[var(--gray)]" /> : <ChevronDown size={16} className="text-[var(--gray)]" />}
          </button>
          {openSections.has("colorCountUnitPrice" as SectionKey) && (
            <div className="p-4">
              <div className="flex items-center gap-3 p-2 rounded bg-[var(--dark-blue)]/50">
                <span className="text-xs text-[var(--cream)] font-bold">Birim Fiyat:</span>
                <input
                  type="number"
                  value={config.colorCountUnitPrice ?? COLOR_COUNT_UNIT_PRICE}
                  onChange={(e) => setConfig((prev) => ({ ...prev, colorCountUnitPrice: Number(e.target.value) }))}
                  className="w-32 p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                />
                <span className="text-[10px] text-[var(--gray)]">TL / renk</span>
              </div>
            </div>
          )}
        </div>

        {/* Other sections */}
        {(Object.keys(sectionLabels) as SectionKey[])
          .filter((k) => k !== "services" && k !== "colorCountUnitPrice")
          .map((sectionKey) => {
            const items = config[sectionKey] as Record<string, unknown>[];
            return (
              <div key={sectionKey} className="rounded-md border-3 border-[var(--electric-blue)]/20 overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between p-4 bg-[var(--electric-blue)]/10 cursor-pointer"
                >
                  <span className="font-bold text-[var(--cream)] text-sm">{sectionLabels[sectionKey]} ({items.length})</span>
                  {openSections.has(sectionKey) ? <ChevronUp size={16} className="text-[var(--gray)]" /> : <ChevronDown size={16} className="text-[var(--gray)]" />}
                </button>
                {openSections.has(sectionKey) && (
                  <div className="p-4 space-y-2">
                    {items.map((item, i) => (
                      <div key={String(item.id)} className="grid grid-cols-4 gap-2 items-center p-2 rounded bg-[var(--dark-blue)]/50">
                        <span className="text-xs text-[var(--cream)] font-bold truncate">{String(item.label)}</span>
                        <div>
                          <input
                            value={String(item.label ?? "")}
                            onChange={(e) => updateArrayItem(sectionKey as Exclude<SectionKey, "services">, i, "label", e.target.value)}
                            className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                          />
                          <span className="text-[10px] text-[var(--gray)]">Etiket</span>
                        </div>
                        <div>
                          <input
                            type="number"
                            value={Number(item.price ?? item.basePrice ?? 0)}
                            onChange={(e) => {
                              const field = "price" in item ? "price" : "basePrice";
                              updateArrayItem(sectionKey as Exclude<SectionKey, "services">, i, field, Number(e.target.value));
                            }}
                            className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                          />
                          <span className="text-[10px] text-[var(--gray)]">Fiyat</span>
                        </div>
                        <div>
                          <input
                            value={String(item.description ?? "")}
                            onChange={(e) => updateArrayItem(sectionKey as Exclude<SectionKey, "services">, i, "description", e.target.value)}
                            className="w-full p-1.5 rounded bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs focus:border-[var(--lime)] focus:outline-none"
                          />
                          <span className="text-[10px] text-[var(--gray)]">Açıklama</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
