"use client";

import { useState, useEffect } from "react";
import { Smartphone, X, Download } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "mindid_pwa_dismissed_at";
const COOLDOWN_DAYS = 14;

export const PwaInstallPrompt = () => {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check cooldown
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const daysAgo =
        (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysAgo < COOLDOWN_DAYS) return;
    }

    // Already installed?
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // iOS detection (no beforeinstallprompt on iOS)
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !("standalone" in navigator);
    if (isIOSDevice) {
      setIsIOS(true);
      const t = setTimeout(() => setShow(true), 8000);
      return () => clearTimeout(t);
    }

    // Android / other
    let timer: ReturnType<typeof setTimeout> | null = null;
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      timer = setTimeout(() => setShow(true), 8000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShow(false);
  };

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      handleDismiss();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-[var(--card)] border-2 border-[var(--lime)]/30 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/15 flex items-center justify-center shrink-0">
            <Smartphone size={20} className="text-[var(--lime)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-[var(--foreground)] text-sm mb-1">
              MindID&apos;yi yükle
            </h4>
            {isIOS ? (
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Safari&apos;de paylaş tuşuna bas → &quot;Ana Ekrana Ekle&quot;.
                Uygulama gibi açılsın!
              </p>
            ) : (
              <p className="text-xs text-[var(--muted)]">
                Telefonuna kur, uygulama gibi aç. Bildirim alır, hızlı
                erişirsin.
              </p>
            )}
            {!isIOS && (
              <button
                onClick={handleInstall}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--lime)] text-[var(--dark-blue)] rounded-lg text-xs font-bold hover:bg-[var(--lime)]/90 transition-colors"
              >
                <Download size={14} /> Yükle
              </button>
            )}
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Kapat"
            className="text-[var(--muted)] hover:text-[var(--foreground)] shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
