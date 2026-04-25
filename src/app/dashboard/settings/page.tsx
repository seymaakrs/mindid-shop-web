"use client";

import { useAuth } from "@/lib/auth-context";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { Settings, Save, User, Building2, Phone, Mail } from "lucide-react";

const SettingsPage = () => {
  const { user, customerData } = useAuth();
  const [form, setForm] = useState({ name: "", company: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (customerData) {
      setForm({
        name: customerData.name,
        company: customerData.company,
        phone: customerData.phone,
      });
    }
  }, [customerData]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "mindid_customers", user.uid), {
        name: form.name,
        company: form.company,
        phone: form.phone,
        updatedAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Settings save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Settings size={24} className="text-[var(--lime)]" /> Hesap Ayarları
      </h1>

      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1.5">
            <Mail size={14} /> E-posta
          </label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-sm cursor-not-allowed"
          />
          <p className="text-[10px] text-gray-600 mt-1">E-posta değiştirilemez</p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1.5">
            <User size={14} /> Ad Soyad
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--lime)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1.5">
            <Building2 size={14} /> Şirket
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--lime)] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1.5">
            <Phone size={14} /> Telefon
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--lime)] focus:outline-none transition-colors"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Kaydediliyor..." : saved ? "Kaydedildi ✓" : "Kaydet"}
        </button>
      </div>

      {/* Plan Info */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-3">Mevcut Plan</h2>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[var(--lime)]/10 text-[var(--lime)] text-sm font-bold uppercase">
            {customerData?.plan || "free"}
          </span>
          <span className="text-sm text-gray-400">{customerData?.credits || 0} kredi kaldı</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
