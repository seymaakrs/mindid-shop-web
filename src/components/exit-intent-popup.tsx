"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Phone, Gift, CheckCircle } from "lucide-react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { LeadCapture } from "@/lib/firestore-types";

const STORAGE_KEY = "mindid_exit_popup_shown";
const COOLDOWN_DAYS = 7;

const saveLead = async (data: Omit<LeadCapture, "id" | "createdAt" | "updatedAt">) => {
  try {
    await addDoc(collection(db, "mindid_leads"), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch {
    // Lead kayıt hatası siteyi bozmamalı
  }
};

const shouldShow = () => {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return true;
  const ts = parseInt(raw, 10);
  const daysPassed = (Date.now() - ts) / (1000 * 60 * 60 * 24);
  return daysPassed > COOLDOWN_DAYS;
};

const markShown = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }
};

export const ExitIntentPopup = () => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const open = useCallback(() => {
    if (!shouldShow()) return;
    setVisible(true);
    markShown();
  }, []);

  useEffect(() => {
    // Desktop: imleç sayfanın üstüne çıkınca (tab/adres çubuğuna gidecek)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) open();
    };

    // Mobil/tablet: %75 scroll'dan sonra 20 sn bekleme
    let mobileTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.75 && !mobileTimer) {
        mobileTimer = setTimeout(open, 20_000);
      }
    };

    // İlk 10 saniye tetikleme — kullanıcının sayfayı görmesini bekle
    const initTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 10_000);

    return () => {
      clearTimeout(initTimer);
      if (mobileTimer) clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Lütfen adınızı ve telefon numaranızı girin.");
      return;
    }
    setError("");
    setLoading(true);

    await saveLead({
      name: name.trim(),
      phone: phone.trim(),
      source: "exit_intent",
      page: typeof window !== "undefined" ? window.location.pathname : "/",
      status: "new",
      notes: "",
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Ücretsiz Demo Görüşmesi"
    >
      {/* Arka plan overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Kart */}
      <div className="relative w-full max-w-md bg-white rounded-xl border-3 border-[var(--dark-blue)] shadow-[8px_8px_0px_var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Üst bant */}
        <div className="bg-[var(--dark-blue)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-[var(--lime)]" />
            <span className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider">
              Ücretsiz Demo Görüşmesi
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {submitted ? (
            /* Teşekkür ekranı */
            <div className="text-center py-4">
              <CheckCircle size={48} className="text-[var(--lime)] mx-auto mb-4" />
              <h3 className="text-xl font-black text-[var(--dark-blue)] mb-2">
                Harika! Sizi arayacağız.
              </h3>
              <p className="text-sm text-[var(--gray)] mb-4">
                24 saat içinde ekibimiz size ulaşacak. Ücretsiz demo görüşmesinde
                projeniz için en uygun paketi birlikte belirleyelim.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-md bg-[var(--lime)] border-2 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-sm font-black hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                Siteye Dön
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <h2 className="text-2xl font-black text-[var(--dark-blue)] mb-1 leading-tight">
                Ayrılmadan önce...
              </h2>
              <p className="text-sm text-[var(--gray)] mb-5">
                Ücretsiz 15 dakikalık demo görüşmesi ayarlayalım. Size markanız
                için en iyi AI çözümünü gösterelim — <strong>tamamen ücretsiz.</strong>
              </p>

              {/* Faydalar */}
              <ul className="space-y-1.5 mb-5">
                {[
                  "Projenize özel fiyat teklifi",
                  "AI ile üretilmiş örnek görseller",
                  "Geleneksele göre ne kadar tasarruf edersiniz?",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[var(--dark-blue)]">
                    <span className="w-4 h-4 rounded-sm bg-[var(--lime)] flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={10} className="text-[var(--dark-blue)]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full px-4 py-2.5 rounded-md border-2 border-[var(--dark-blue)]/20 focus:border-[var(--dark-blue)] outline-none text-sm text-[var(--dark-blue)] placeholder-[var(--gray)]/50 transition-colors"
                />
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gray)]/50" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon Numaranız"
                    className="w-full pl-9 pr-4 py-2.5 rounded-md border-2 border-[var(--dark-blue)]/20 focus:border-[var(--dark-blue)] outline-none text-sm text-[var(--dark-blue)] placeholder-[var(--gray)]/50 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-md bg-[var(--lime)] border-2 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] text-[var(--dark-blue)] text-sm font-black hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Kaydediliyor..." : "Ücretsiz Demo Talep Et →"}
                </button>

                <p className="text-[10px] text-center text-[var(--gray)]/50 uppercase tracking-wider">
                  Spam yok · İstediğiniz zaman iptal edin
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
