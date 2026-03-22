"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { X, Sparkles, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "905419315550";

const quickMessages = [
  {
    label: {
      tr: "🎬 AI Reklam Filmi hakkında bilgi almak istiyorum",
      en: "🎬 I want info about AI Ad Films",
    },
    emoji: "🎬",
    service: "ad-film",
  },
  {
    label: {
      tr: "🧑‍💻 AI Avatar oluşturmak istiyorum",
      en: "🧑‍💻 I want to create an AI Avatar",
    },
    emoji: "🧑‍💻",
    service: "avatar",
  },
  {
    label: {
      tr: "📸 E-ticaret ürün görseli istiyorum",
      en: "📸 I need AI product photos for e-commerce",
    },
    emoji: "📸",
    service: "product-photo",
  },
  {
    label: {
      tr: "💰 Fiyat bilgisi almak istiyorum",
      en: "💰 I want pricing information",
    },
    emoji: "💰",
    service: "pricing",
  },
];

const greetings = {
  tr: [
    "Merhaba! Ben Zeki 👋",
    "Size nasıl yardımcı olabilirim?",
  ],
  en: [
    "Hi there! I'm Zeki 👋",
    "How can I help you?",
  ],
};

export const WhatsAppButton = () => {
  const { lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  // Otomatik karşılama — sayfa yüklendikten 3 saniye sonra
  useEffect(() => {
    if (greetingDismissed || isOpen) return;
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [greetingDismissed, isOpen]);

  // Karşılama 8 saniye sonra kaybolsun
  useEffect(() => {
    if (!showGreeting) return;
    const timer = setTimeout(() => {
      setShowGreeting(false);
      setGreetingDismissed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [showGreeting]);

  // Panel açıldığında yazma efekti
  useEffect(() => {
    if (!isOpen) {
      setTypedText("");
      setIsTyping(false);
      setShowMessages(false);
      return;
    }

    setIsTyping(true);
    const fullText = lang === "en"
      ? "Hi! I'm Zeki, your MindID assistant. How can I help you today? 🚀"
      : "Merhaba! Ben Zeki, MindID asistanınız. Size bugün nasıl yardımcı olabilirim? 🚀";

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setShowMessages(true), 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen, lang]);

  const handleQuickMessage = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  const handleDirectChat = () => {
    const msg = lang === "en" ? "Hello! I'd like to learn more about MindID services." : "Merhaba! MindID hizmetleri hakkında bilgi almak istiyorum.";
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Karşılama balonu */}
      {showGreeting && !isOpen && (
        <div
          className="absolute bottom-20 right-0 animate-in fade-in slide-in-from-bottom-2 duration-500"
          onClick={() => {
            setShowGreeting(false);
            setGreetingDismissed(true);
            setIsOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="relative bg-[var(--card)] border-2 border-[var(--lime)]/40 rounded-2xl rounded-br-sm p-4 shadow-[0_8px_32px_rgba(193,255,114,0.15)] max-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--lime)] to-[var(--electric-blue)] flex items-center justify-center text-sm font-black text-[var(--dark-blue)]">
                Z
              </div>
              <span className="text-xs font-bold text-[var(--lime)]">Zeki</span>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {lang === "en" ? "Online" : "Çevrimiçi"}
              </span>
            </div>
            {(lang === "en" ? greetings.en : greetings.tr).map((line, i) => (
              <p key={i} className="text-sm text-[var(--cream)]/90 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Ana sohbet paneli */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] rounded-2xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(193,255,114,0.1)] animate-in fade-in slide-in-from-bottom-4 duration-300 mb-2">
          {/* Header — Premium gradient */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                    <span className="text-lg font-black text-white">Z</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#128C7E]" />
                </div>
                <div>
                  <div className="text-base font-bold text-white tracking-tight">Zeki</div>
                  <div className="text-[11px] text-white/70 flex items-center gap-1">
                    <Sparkles size={10} />
                    MindID {lang === "en" ? "Assistant" : "Asistan"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Sohbet alanı */}
          <div className="bg-[#0a0a1e] p-4 min-h-[180px]">
            {/* Zeki'nin mesaj balonu */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--lime)] to-[#25D366] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-black text-[var(--dark-blue)]">Z</span>
              </div>
              <div className="flex-1">
                <div className="bg-[var(--card)] rounded-2xl rounded-tl-sm p-3.5 border border-white/5">
                  <p className="text-[13px] text-[var(--cream)]/90 leading-relaxed">
                    {typedText}
                    {isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-[var(--lime)] ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
                <span className="text-[10px] text-[var(--cream)]/30 mt-1 block">
                  {lang === "en" ? "just now" : "şimdi"}
                </span>
              </div>
            </div>

            {/* Hızlı mesaj seçenekleri */}
            {showMessages && (
              <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[11px] text-[var(--cream)]/40 uppercase tracking-wider font-medium mb-3">
                  {lang === "en" ? "Quick actions" : "Hızlı seçenekler"}
                </p>
                {quickMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickMessage(lang === "en" ? msg.label.en : msg.label.tr)}
                    className="group w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[var(--lime)]/10 text-[13px] text-[var(--cream)]/80 hover:text-[var(--lime)] transition-all duration-200 cursor-pointer border border-white/[0.04] hover:border-[var(--lime)]/20 flex items-center justify-between"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span>{lang === "en" ? msg.label.en : msg.label.tr}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--lime)]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Alt kısım — direkt mesaj */}
          <div className="bg-[#0d0d24] border-t border-white/5 p-3">
            <button
              onClick={handleDirectChat}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(37,211,102,0.3)]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {lang === "en" ? "Chat on WhatsApp" : "WhatsApp'tan yazın"}
            </button>
          </div>
        </div>
      )}

      {/* FAB Butonu — Premium tasarım */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGreeting(false);
          setGreetingDismissed(true);
        }}
        className="group relative w-[60px] h-[60px] rounded-full cursor-pointer"
        aria-label="Zeki - WhatsApp"
      >
        {/* Pulse efekti */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#25D366] to-[var(--lime)] opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
          </>
        )}

        {/* Ana buton */}
        <span className="relative w-full h-full rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] group-hover:shadow-[0_6px_32px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-all duration-300 border-2 border-white/20">
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};
