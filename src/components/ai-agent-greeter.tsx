"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, X, ArrowRight, Send, Wand2, Camera, Video, Smartphone, User, ChevronRight } from "lucide-react";

const STORAGE_KEY = "mindid_greeter_dismissed_at";
const COOLDOWN_HOURS = 24;
const SHOW_DELAY_MS = 6000;

type AgentStep = "greeting" | "suggesting";

type QuickAction = {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  gradient: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: "reels", icon: <Video size={18} />, label: "AI Reels", description: "Saniyeler içinde dikey video", href: "/configure/reels", gradient: "from-pink-500/20 to-purple-500/20" },
  { id: "product-photo", icon: <Camera size={18} />, label: "Ürün Fotoğrafı", description: "Stüdyo kalitesi, manken yok", href: "/configure/product-photo", gradient: "from-blue-500/20 to-cyan-500/20" },
  { id: "social", icon: <Smartphone size={18} />, label: "Sosyal Medya", description: "Aylık içerik + planlama", href: "/configure/social-media", gradient: "from-green-500/20 to-emerald-500/20" },
  { id: "avatar", icon: <User size={18} />, label: "AI Avatar", description: "Marka sözcüsü, sınırsız sahne", href: "/configure/avatar", gradient: "from-orange-500/20 to-yellow-500/20" },
];

const classifyIntent = (text: string): { actionId: string | null; response: string } => {
  const t = text.toLowerCase().trim();
  if (!t) return { actionId: null, response: "" };

  const patterns: Array<{ id: string; keywords: string[] }> = [
    { id: "reels", keywords: ["reels", "tiktok", "video", "kısa video", "dikey"] },
    { id: "product-photo", keywords: ["ürün foto", "fotoğraf", "ürün çekim", "katalog", "trendyol", "amazon"] },
    { id: "social", keywords: ["sosyal medya", "instagram", "post", "içerik plan"] },
    { id: "avatar", keywords: ["avatar", "konuşan", "sözcü", "spokesperson"] },
    { id: "templates", keywords: ["şablon", "hazır", "template"] },
    { id: "pricing", keywords: ["fiyat", "ücret", "kaç para", "ne kadar", "paket"] },
    { id: "free", keywords: ["bedava", "ücretsiz", "free", "dene"] },
  ];

  for (const p of patterns) {
    if (p.keywords.some((k) => t.includes(k))) {
      const responses: Record<string, string> = {
        reels: "Harika seçim! AI Reels paketlerine yönlendireyim 🎬",
        "product-photo": "E-ticaret için en sevilen seçim 📸",
        social: "Sosyal medyanı tek panelden yönetelim 📱",
        avatar: "AI sözcün hazır olsun 🎭",
        templates: "Hazır şablonlar tam senin için 🎨",
        pricing: "Fiyatlarımız çok şeffaf — hemen göstereyim 💰",
        free: "İlk 50 kredi bizden hediye 🎁",
      };
      return { actionId: p.id, response: responses[p.id] };
    }
  }

  return { actionId: null, response: "Tam emin olamadım — aşağıdan istediğini seç ya da daha detay ver." };
};

const DESTINATIONS: Record<string, string> = {
  reels: "/configure/reels",
  "product-photo": "/configure/product-photo",
  social: "/configure/social-media",
  avatar: "/configure/avatar",
  templates: "/templates",
  pricing: "/#pricing",
  free: "/register",
};

export const AiAgentGreeter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<AgentStep>("greeting");
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [thinking, setThinking] = useState(false);
  const [matchedAction, setMatchedAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const shouldHide = pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/checkout");

  useEffect(() => {
    if (typeof window === "undefined" || shouldHide) return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const hoursAgo = (Date.now() - parseInt(dismissed, 10)) / (1000 * 60 * 60);
      if (hoursAgo < COOLDOWN_HOURS) return;
    }
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [shouldHide]);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
    setShow(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setThinking(true);
    setStep("suggesting");
    await new Promise((r) => setTimeout(r, 400));
    const result = classifyIntent(input);
    setAiResponse(result.response);
    setMatchedAction(result.actionId);
    setThinking(false);
    if (result.actionId) {
      setTimeout(() => {
        router.push(DESTINATIONS[result.actionId!]);
        handleDismiss();
      }, 1800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (!show || shouldHide) return null;

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 group" aria-label="AI asistan">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--lime)] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative w-14 h-14 rounded-full bg-[var(--lime)] flex items-center justify-center shadow-2xl border-2 border-white/20">
            <Sparkles size={24} className="text-[var(--dark-blue)]" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[var(--card)] animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md animate-slide-up">
      <div className="bg-[var(--card)] border-2 border-[var(--lime)]/30 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--lime)]/10 to-[var(--lime)]/5 px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-[var(--lime)] flex items-center justify-center">
                <Sparkles size={18} className="text-[var(--dark-blue)]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--card)]" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">MindID Asistan</h4>
              <p className="text-[10px] text-gray-400">Ne yapmak istersin?</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors" aria-label="Küçült">
              <ChevronRight size={16} className="rotate-90" />
            </button>
            <button onClick={handleDismiss} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors" aria-label="Kapat">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {step === "greeting" && (
            <>
              <div className="flex items-start gap-3">
                <div className="text-2xl">👋</div>
                <div className="flex-1">
                  <p className="text-sm text-white leading-relaxed">Hoş geldin! Sana yer göstereyim.</p>
                  <p className="text-xs text-gray-400 mt-1">Hangi içeriği üretmek istersin?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <Link key={action.id} href={action.href} onClick={handleDismiss} className={`group bg-gradient-to-br ${action.gradient} border border-white/10 hover:border-[var(--lime)]/50 rounded-2xl p-3 transition-all hover:scale-[1.02]`}>
                    <div className="text-[var(--lime)] mb-2">{action.icon}</div>
                    <p className="text-xs font-bold text-white">{action.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{action.description}</p>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-bold">veya bana sor</p>
                <div className="flex gap-2">
                  <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="örn: Trendyol için ürün fotoğrafı..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-[var(--lime)] focus:outline-none" />
                  <button onClick={handleSend} disabled={!input.trim()} className="bg-[var(--lime)] text-[var(--dark-blue)] disabled:opacity-30 rounded-xl px-3 hover:bg-[var(--lime)]/90 transition-colors" aria-label="Gönder">
                    <Send size={14} />
                  </button>
                </div>
              </div>

              <Link href="/register" onClick={handleDismiss} className="flex items-center justify-between gap-2 bg-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-xl px-3 py-2.5 hover:bg-[var(--lime)]/15 transition-colors group">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎁</span>
                  <div>
                    <p className="text-xs font-bold text-white">Ücretsiz başla</p>
                    <p className="text-[10px] text-gray-400">50 kredi hediye, kart yok</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[var(--lime)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}

          {step === "suggesting" && (
            <div className="space-y-3 min-h-[180px]">
              {thinking ? (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Wand2 size={14} className="animate-pulse" />
                  <span>Düşünüyorum...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <div className="text-xl">🎯</div>
                    <p className="text-sm text-white">{aiResponse}</p>
                  </div>
                  {matchedAction && (
                    <div className="bg-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-2">Yönlendiriliyorsun...</p>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--lime)] animate-progress" />
                      </div>
                    </div>
                  )}
                  <button onClick={() => { setStep("greeting"); setInput(""); setMatchedAction(null); }} className="text-xs text-gray-400 hover:text-white">
                    ← Geri dön
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
