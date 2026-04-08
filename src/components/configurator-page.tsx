"use client";

import { useState, useEffect } from "react";
import type { ServicePackage, AddOnService } from "@/lib/types";
import { SERVICE_TYPES, SERVICE_PACKAGES, ADD_ON_SERVICES } from "@/lib/pricing-data";
import type { ServiceType } from "@/lib/pricing-data";
import { PackageTierSelector } from "./package-tier-selector";
import { AddOnSelector } from "./add-on-selector";
import { CrossSell } from "./cross-sell";
import { DirectorDesk } from "./director-desk";
import { CongratsPage } from "./congrats-page";
import { useI18n } from "@/lib/i18n";
import { ArrowLeft, Package, Shield, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PricingPackageItem } from "@/lib/firestore-types";

type ConfiguratorPageProps = {
  serviceId: string;
};

type Step = "configure" | "checkout" | "congrats";

// Map serviceId to add-on category
const SERVICE_ADDON_CATEGORY: Record<string, "video" | "photo" | "social"> = {
  reels: "video",
  product: "video",
  campaign: "video",
  corporate: "video",
  "product-photo": "photo",
  "social-media": "social",
  avatar: "social",
};

// Map serviceId to which Firestore package key to use
const SERVICE_PACKAGE_KEY: Record<string, "videoPackages" | "photoPackages" | "socialPackages"> = {
  reels: "videoPackages",
  product: "videoPackages",
  campaign: "videoPackages",
  corporate: "videoPackages",
  "product-photo": "photoPackages",
  "social-media": "socialPackages",
  avatar: "socialPackages",
};

// Merge static presetIds into Firestore packages (Firestore only stores editable fields)
const mergePresets = (firestorePkgs: PricingPackageItem[], staticPkgs: ServicePackage[]): ServicePackage[] => {
  return firestorePkgs.map((fp) => {
    const staticPkg = staticPkgs.find((s) => s.id === fp.id);
    return {
      ...staticPkg,
      ...fp,
      presetIds: staticPkg?.presetIds ?? {},
    } as ServicePackage;
  });
};

export const ConfiguratorPage = ({ serviceId }: ConfiguratorPageProps) => {
  const { t, formatPrice } = useI18n();
  const [step, setStep] = useState<Step>("configure");
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnService[]>([]);
  const [dynamicPackages, setDynamicPackages] = useState<ServicePackage[] | null>(null);

  useEffect(() => {
    const pkgKey = SERVICE_PACKAGE_KEY[serviceId];
    if (!pkgKey) return;
    getDoc(doc(db, "mindid_pricing", "config")).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const pkgs = data[pkgKey] as PricingPackageItem[] | undefined;
        if (pkgs && pkgs.length > 0) {
          setDynamicPackages(mergePresets(pkgs, SERVICE_PACKAGES[serviceId] ?? []));
        }
      }
    }).catch(() => {});
  }, [serviceId]);

  const service = SERVICE_TYPES.find((s) => s.id === serviceId) as ServiceType | undefined;
  if (!service) return null;

  const packages = dynamicPackages ?? SERVICE_PACKAGES[serviceId] ?? [];
  const addonCategory = SERVICE_ADDON_CATEGORY[serviceId] ?? "video";
  const availableAddOns = ADD_ON_SERVICES.filter((a) => a.category === addonCategory);

  // Filter out add-ons that are already included in the selected package
  const filteredAddOns = selectedPackage
    ? availableAddOns.filter((addOn) => {
        const presetIds = selectedPackage.presetIds;
        // Don't show VFX addon if package has VFX
        if (addOn.id === "addon-vfx" && presetIds.postProduction?.includes("vfx")) return false;
        if (addOn.id === "addon-ses-klonlama" && presetIds.voice === "ai-clone") return false;
        if (addOn.id === "addon-dudak-senkron" && presetIds.postProduction?.includes("lip-sync")) return false;
        if (addOn.id === "addon-ozel-beste" && presetIds.music === "custom") return false;
        if (addOn.id === "addon-sinir-revizyon" && presetIds.revision === "unlimited") return false;
        if (addOn.id === "addon-ai-model" && (presetIds.photoModel === "ai-model" || presetIds.photoModel === "ai-model-custom")) return false;
        if (addOn.id === "addon-sinir-renk" && presetIds.colorPackage === "unlimited-color") return false;
        if (addOn.id === "addon-premium-rotus" && presetIds.photoRetouch === "premium-retouch") return false;
        return true;
      })
    : availableAddOns;

  const toggleAddOn = (addOn: AddOnService) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addOn.id);
      return exists ? prev.filter((a) => a.id !== addOn.id) : [...prev, addOn];
    });
  };

  const handlePackageSelect = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setSelectedAddOns([]);
  };

  const handlePackageClear = () => {
    setSelectedPackage(null);
    setSelectedAddOns([]);
  };

  // Price calculations
  const packagePrice = selectedPackage?.price ?? 0;
  const addOnsPrice = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalAI = packagePrice + addOnsPrice;
  const totalTraditional = Math.round(totalAI * (service.traditionalMultiplier || 3));
  const savings = totalTraditional - totalAI;
  const canProceed = selectedPackage !== null;

  // Pass simplified config to DirectorDesk (backward compatible)
  const dummyConfig = {
    duration: null, scenario: null, voice: null, music: null,
    visualStyle: null, postProduction: [] as never[], revision: null,
    productCount: null, photoAngle: null, photoModel: null,
    colorPackage: null, photoVisualStyle: null, background: null, photoRetouch: null,
  };

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
        config={dummyConfig}
        service={service}
        totalAI={totalAI}
        totalTraditional={totalTraditional}
        savings={savings}
        basePrice={packagePrice}
        onBack={() => setStep("configure")}
        onSubmit={() => setStep("congrats")}
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
      />
    );
  }

  const steps = [
    { key: "configure" as Step, label: t("config.step.configure") || "Paket Seçin", number: 1 },
    { key: "checkout" as Step, label: t("config.step.checkout") || "Bilgiler", number: 2 },
    { key: "congrats" as Step, label: t("config.step.done") || "Tamam", number: 3 },
  ];

  return (
    <div className="min-h-screen relative z-10 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/#services" className="inline-flex items-center gap-2 text-[var(--foreground)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} />
          {t("nav.services")}
        </Link>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                step === s.key
                  ? "bg-[var(--lime)] text-[var(--dark-blue)]"
                  : steps.findIndex((x) => x.key === step) > i
                    ? "bg-[var(--lime)]/20 text-[var(--foreground)]"
                    : "bg-[var(--cream)]/5 text-[var(--gray)]"
              }`}>
                <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                  {steps.findIndex((x) => x.key === step) > i ? "\u2713" : s.number}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-0.5 ${steps.findIndex((x) => x.key === step) > i ? "bg-[var(--lime)]" : "bg-[var(--gray)]/20"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Service title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{service.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)]">
              {t(service.nameKey)}
            </h1>
            <p className="text-sm text-[var(--gray)]">
              Size en uygun paketi seçin
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left: Package selector + Add-ons */}
          <div>
            {/* Package Selector */}
            <PackageTierSelector
              packages={packages}
              selected={selectedPackage}
              onSelect={handlePackageSelect}
              onClear={handlePackageClear}
              formatPrice={formatPrice}
            />

            {/* Add-ons (only show when package selected) */}
            {selectedPackage && filteredAddOns.length > 0 && (
              <AddOnSelector
                addOns={filteredAddOns}
                selected={selectedAddOns}
                onToggle={toggleAddOn}
                formatPrice={formatPrice}
              />
            )}

            {/* Cross-sell — çapraz satış önerileri */}
            {selectedPackage && (
              <CrossSell serviceId={serviceId} />
            )}

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-[var(--card)] border border-[var(--electric-blue)]/10 text-center">
                <Shield size={16} className="text-[var(--lime)]" />
                <span className="text-[10px] font-bold text-[var(--foreground)]">Memnuniyet Garantisi</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-[var(--card)] border border-[var(--electric-blue)]/10 text-center">
                <Clock size={16} className="text-[var(--lime)]" />
                <span className="text-[10px] font-bold text-[var(--foreground)]">Hızlı Teslim</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-[var(--card)] border border-[var(--electric-blue)]/10 text-center">
                <Sparkles size={16} className="text-[var(--lime)]" />
                <span className="text-[10px] font-bold text-[var(--foreground)]">AI Destekli</span>
              </div>
            </div>
          </div>

          {/* Right: Receipt panel (sticky) */}
          <div className="lg:block">
            <div className="sticky top-20">
              <div className="rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden">
                <div className="p-4 bg-[var(--lime)] text-[var(--dark-blue)]">
                  <h3 className="font-black text-lg">
                    {t("config.total")}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {selectedPackage ? (
                    <>
                      {/* Package */}
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--foreground)] font-bold">{selectedPackage.name}</span>
                        <span className="text-[var(--foreground)] font-bold">{formatPrice(selectedPackage.price)}</span>
                      </div>
                      <p className="text-[10px] text-[var(--gray)]">{selectedPackage.tagline}</p>

                      {/* Add-ons */}
                      {selectedAddOns.length > 0 && (
                        <>
                          <div className="border-t border-dashed border-[var(--electric-blue)]/20 my-2" />
                          <p className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-wider">Ek Hizmetler</p>
                          {selectedAddOns.map((addOn) => (
                            <div key={addOn.id} className="flex justify-between text-sm">
                              <span className="text-[var(--gray)]">{addOn.name}</span>
                              <span className="text-[var(--foreground)] font-bold">+{formatPrice(addOn.price)}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <Package size={24} className="mx-auto text-[var(--gray)]/30 mb-2" />
                      <p className="text-xs text-[var(--gray)]">Fiyatı görmek için paket seçin</p>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="border-t-2 border-dashed border-[var(--electric-blue)] my-3" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--foreground)] font-bold">{t("config.total")}</span>
                    <span className="text-2xl font-black text-[var(--foreground)] animate-glow-pulse">
                      {totalAI > 0 ? formatPrice(totalAI) : "\u2014"}
                    </span>
                  </div>

                  {/* Traditional comparison */}
                  {totalTraditional > 0 && totalAI > 0 && (
                    <div className="p-3 rounded-md bg-[var(--electric-blue)]/20 mt-3 animate-shimmer">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--gray)]">{t("checkout.traditional")}</span>
                        <span className="text-[var(--gray)] line-through">{formatPrice(totalTraditional)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-[var(--foreground)] font-bold">{t("checkout.saved")}</span>
                        <span className="text-[var(--foreground)] font-bold">{formatPrice(savings)}</span>
                      </div>
                      {savings > 0 && (
                        <div className="mt-2 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--lime)]/20 text-[var(--foreground)] text-[10px] font-bold animate-glow-pulse">
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

                  <p className="text-[9px] text-[var(--gray)]/50 mt-3 leading-relaxed text-center">
                    {t("config.price_note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-[var(--card)] border-t-3 border-[var(--lime)] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <div className="text-[10px] text-[var(--gray)]">{t("config.total")}</div>
            <div className="text-xl font-black text-[var(--foreground)]">{totalAI > 0 ? formatPrice(totalAI) : "\u2014"}</div>
            {savings > 0 && (
              <div className="text-[10px] text-[var(--foreground)]/70">
                %{Math.round((savings / totalTraditional) * 100)} {t("checkout.saved") || "tasarruf"}
              </div>
            )}
          </div>
          <button
            onClick={() => canProceed && setStep("checkout")}
            disabled={!canProceed}
            className={`px-6 py-2.5 rounded-md border-3 text-sm font-black transition-all ${
              canProceed
                ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)]"
                : "bg-[var(--gray)]/20 text-[var(--gray)] border-[var(--gray)]/30 cursor-not-allowed"
            }`}
          >
            {t("checkout.send")} →
          </button>
        </div>
      </div>
    </div>
  );
};
