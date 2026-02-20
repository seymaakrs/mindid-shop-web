"use client";

import { useI18n } from "@/lib/i18n";
import { Upload, User, Mail, Phone, Building, Target, MessageSquare, Briefcase } from "lucide-react";

type CustomerFormProps = {
  onSubmit: () => void;
};

export const CustomerForm = ({ onSubmit }: CustomerFormProps) => {
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const inputClass =
    "w-full p-3 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden">
      <div className="p-4 bg-[var(--lime)] text-[var(--dark-blue)]">
        <h3 className="font-extrabold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
          {t("form.title")}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <User size={12} /> {t("form.name")}
            </label>
            <input type="text" required placeholder="Mehmet Yilmaz" className={inputClass} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Mail size={12} /> {t("form.email")}
            </label>
            <input type="email" required placeholder="info@sirket.com" className={inputClass} />
          </div>
        </div>

        {/* Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Phone size={12} /> {t("form.phone")}
            </label>
            <input type="tel" required placeholder="+90 5XX XXX XX XX" className={inputClass} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Building size={12} /> {t("form.company")}
            </label>
            <input type="text" required placeholder="Marka adi" className={inputClass} />
          </div>
        </div>

        {/* Sector & Target */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Briefcase size={12} /> {t("form.sector")}
            </label>
            <input type="text" placeholder="Teknoloji, E-ticaret, Saglik..." className={inputClass} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Target size={12} /> {t("form.target")}
            </label>
            <input type="text" placeholder="18-35 yas, girisimciler..." className={inputClass} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
            <MessageSquare size={12} /> {t("form.message")}
          </label>
          <textarea rows={3} placeholder="Projeniz hakkinda ek bilgiler..." className={inputClass} />
        </div>

        {/* File upload */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
            <Upload size={12} /> {t("form.upload")}
          </label>
          <div className="border-3 border-dashed border-[var(--electric-blue)]/30 rounded-md p-6 text-center hover:border-[var(--lime)]/50 transition-colors cursor-pointer">
            <Upload size={24} className="mx-auto text-[var(--gray)] mb-2" />
            <p className="text-xs text-[var(--gray)]">
              Gorsel, senaryo, referans video veya diger dosyalari surukleyin
            </p>
            <input type="file" multiple className="hidden" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-extrabold text-base hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {t("checkout.send")} →
        </button>
      </div>
    </form>
  );
};
