"use client";

import { useState, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import type { OrderCustomer } from "@/lib/firestore-types";
import { Upload, User, Mail, Phone, Building, Target, MessageSquare, Briefcase, Loader2, X } from "lucide-react";

type CustomerFormProps = {
  onSubmit: (customer: OrderCustomer, files: File[]) => void;
  loading?: boolean;
  error?: string | null;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const CustomerForm = ({ onSubmit, loading, error }: CustomerFormProps) => {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFileError(null);

    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`Dosya çok büyük: ${file.name} (max 50 MB)`);
        return;
      }
    }

    setFiles((prev) => [...prev, ...selected]);
    // Reset input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const customer: OrderCustomer = {
      name,
      email,
      phone,
      company,
      sector,
      targetAudience,
      message,
    };
    onSubmit(customer, files);
  };

  const inputClass =
    "w-full p-3 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden">
      <div className="p-4 bg-[var(--lime)] text-[var(--dark-blue)]">
        <h3 className="font-black text-lg">
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
            <input type="text" required placeholder="Mehmet Yilmaz" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Mail size={12} /> {t("form.email")}
            </label>
            <input type="email" required placeholder="info@sirket.com" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
        </div>

        {/* Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Phone size={12} /> {t("form.phone")}
            </label>
            <input type="tel" required placeholder="+90 5XX XXX XX XX" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Building size={12} /> {t("form.company")}
            </label>
            <input type="text" required placeholder="Marka adi" className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} disabled={loading} />
          </div>
        </div>

        {/* Sector & Target */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Briefcase size={12} /> {t("form.sector")}
            </label>
            <input type="text" placeholder="Teknoloji, E-ticaret, Saglik..." className={inputClass} value={sector} onChange={(e) => setSector(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
              <Target size={12} /> {t("form.target")}
            </label>
            <input type="text" placeholder="18-35 yas, girisimciler..." className={inputClass} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} disabled={loading} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
            <MessageSquare size={12} /> {t("form.message")}
          </label>
          <textarea rows={3} placeholder="Projeniz hakkinda ek bilgiler..." className={inputClass} value={message} onChange={(e) => setMessage(e.target.value)} disabled={loading} />
        </div>

        {/* File upload */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--gray)] uppercase tracking-wider mb-2">
            <Upload size={12} /> {t("form.upload")}
          </label>
          <div
            className="border-3 border-dashed border-[var(--electric-blue)]/30 rounded-md p-6 text-center hover:border-[var(--lime)]/50 transition-colors cursor-pointer"
            onClick={() => !loading && fileInputRef.current?.click()}
          >
            <Upload size={24} className="mx-auto text-[var(--gray)] mb-2" />
            <p className="text-xs text-[var(--gray)]">
              Gorsel, senaryo, referans video veya diger dosyalari surukleyin
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[var(--cream)] bg-[var(--card)] rounded-md px-3 py-2">
                  <span className="flex-1 truncate">{file.name}</span>
                  <span className="text-[var(--gray)]">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300 cursor-pointer" disabled={loading}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {fileError && (
            <p className="mt-2 text-xs text-red-400">{fileError}</p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border-2 border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-md border-3 font-black text-base transition-all ${
            loading
              ? "bg-[var(--gray)]/30 text-[var(--gray)] border-[var(--gray)]/30 cursor-not-allowed"
              : "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Gönderiliyor...
            </span>
          ) : (
            <>{t("checkout.send")} →</>
          )}
        </button>
      </div>
    </form>
  );
};
