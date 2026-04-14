"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SiteSettings } from "@/lib/firestore-types";
import { Save, Check } from "lucide-react";

const defaultSettings: SiteSettings = {
  heroVideoUrl: "",
  contactEmail: "",
  contactPhone: "",
  companyName: "slowdays",
  usdRate: 0.028,
};

export const SettingsEditor = () => {
  const [form, setForm] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "mindid_settings", "general"));
        if (snap.exists()) {
          setForm({ ...defaultSettings, ...snap.data() } as SiteSettings);
        }
      } catch {
        // empty
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    await setDoc(doc(db, "mindid_settings", "general"), { ...form }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <h2 className="text-xl font-black text-[var(--cream)] mb-6">Site Ayarları</h2>

      <div className="max-w-lg space-y-4">
        <div>
          <label className="block text-xs font-bold text-[var(--gray)] mb-1">Firma Adı</label>
          <input
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--gray)] mb-1">İletişim E-posta</label>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
            placeholder="info@mindid.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--gray)] mb-1">İletişim Telefon</label>
          <input
            type="tel"
            value={form.contactPhone}
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
            placeholder="+90 xxx xxx xx xx"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--gray)] mb-1">USD Kuru (TRY → USD)</label>
          <input
            type="number"
            step="0.001"
            value={form.usdRate}
            onChange={(e) => setForm({ ...form, usdRate: Number(e.target.value) })}
            className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
          />
          <p className="text-xs text-[var(--gray)] mt-1">Örnek: 0.028 → 1 TRY = 0.028 USD</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </div>
    </div>
  );
};
