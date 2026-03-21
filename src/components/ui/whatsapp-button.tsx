"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "905000000000"; // Seyma'nın numarası güncellenmeli

const quickMessages = [
  {
    label: { tr: "AI Reklam Filmi hakkında bilgi almak istiyorum", en: "I want info about AI Ad Films" },
    service: "ad-film",
  },
  {
    label: { tr: "AI Avatar oluşturmak istiyorum", en: "I want to create an AI Avatar" },
    service: "avatar",
  },
  {
    label: { tr: "E-ticaret ürün görseli istiyorum", en: "I need AI product photos for e-commerce" },
    service: "product-photo",
  },
  {
    label: { tr: "Fiyat bilgisi almak istiyorum", en: "I want pricing information" },
    service: "pricing",
  },
];

export const WhatsAppButton = () => {
  const { lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickMessage = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Quick Message Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-3">
          {/* Header */}
          <div className="bg-[#25D366] p-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-black text-white">MindID</div>
              <div className="text-[10px] text-white/80">
                {lang === "en" ? "Usually replies within minutes" : "Genellikle dakikalar içinde yanıt verir"}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message Options */}
          <div className="p-3 space-y-2">
            <p className="text-xs text-[var(--cream)]/60 mb-2">
              {lang === "en" ? "Quick message:" : "Hızlı mesaj:"}
            </p>
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleQuickMessage(lang === "en" ? msg.label.en : msg.label.tr)}
                className="w-full text-left p-2.5 rounded-md bg-[var(--electric-blue)]/10 hover:bg-[var(--lime)]/15 text-xs text-[var(--cream)]/80 hover:text-[var(--lime)] transition-all cursor-pointer border border-transparent hover:border-[var(--lime)]/30"
              >
                {lang === "en" ? msg.label.en : msg.label.tr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all cursor-pointer border-3 border-white/20"
        aria-label="WhatsApp"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>
    </div>
  );
};
