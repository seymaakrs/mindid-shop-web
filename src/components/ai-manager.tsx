"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Bot, X } from "lucide-react";

const MESSAGES_TR = [
  "Hosgeldiniz! Size nasil yardimci olabilirim? 👋",
  "Bir hizmet secin baslayalim! 🚀",
  "Harika bir secim! 🎯",
  "Neredeyse bitti! Son adim. ✨",
];

const MESSAGES_EN = [
  "Welcome! How can I help you? 👋",
  "Select a service and let's begin! 🚀",
  "Great choice! 🎯",
  "Almost done! Final step. ✨",
];

export const AIManager = () => {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const messages = lang === "tr" ? MESSAGES_TR : MESSAGES_EN;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setShowBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setShowBubble(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [showBubble, messages.length]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Speech bubble */}
      {showBubble && (
        <div className="max-w-[240px] p-3 rounded-lg bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] animate-kinetic-slide">
          <p className="text-xs font-bold text-[var(--dark-blue)]">
            {messages[messageIndex]}
          </p>
          {/* Triangle */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[var(--lime)] border-r-3 border-b-3 border-[var(--dark-blue)] rotate-45" />
        </div>
      )}

      {/* Avatar */}
      <div className="relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--dark-blue)] border-2 border-[var(--lime)] flex items-center justify-center cursor-pointer z-10"
        >
          <X size={10} className="text-[var(--lime)]" />
        </button>
        <div className="w-16 h-16 rounded-full bg-[var(--electric-blue)] border-3 border-[var(--lime)] shadow-[4px_4px_0px_var(--lime)] flex items-center justify-center animate-float cursor-pointer animate-pulse-lime">
          <Bot size={28} className="text-[var(--lime)]" />
        </div>
      </div>
    </div>
  );
};
