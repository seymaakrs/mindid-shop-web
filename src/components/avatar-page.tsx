"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useAvatarSamples } from "@/lib/hooks/use-firestore";
import { submitOrder } from "@/lib/order-service";
import { ArrowLeft, Play, Bot, Camera, RefreshCw, Globe2, Zap, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { VideoPlayerModal } from "./video-player-modal";

export const AvatarPage = () => {
  const { t, formatPrice } = useI18n();
  const { data: samples } = useAvatarSamples();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const whoItems = [
    { icon: <Camera size={18} />, text: t("avatar.who_1") },
    { icon: <RefreshCw size={18} />, text: t("avatar.who_2") },
    { icon: <Zap size={18} />, text: t("avatar.who_3") },
    { icon: <Globe2 size={18} />, text: t("avatar.who_4") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await submitOrder({
        customer: {
          name,
          email,
          phone,
          company,
          sector: "",
          targetAudience: "",
          message: "",
        },
        serviceId: "avatar",
        serviceName: "AI Avatar",
        config: {
          duration: null,
          scenario: null,
          voice: null,
          music: null,
          visualStyle: null,
          postProduction: [],
          revision: null,
          productCount: null,
          photoAngle: null,
          photoModel: null,
          colorPackage: null,
          photoVisualStyle: null,
          background: null,
          photoRetouch: null,
        },
        pricing: { basePrice: 5999, totalAI: 5999, totalTraditional: 5999, savings: 0 },
        files: [],
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Avatar order error:", err);
      setError(err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const hasSamples = samples.length > 0;

  if (submitted) {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] flex items-center justify-center mx-auto mb-6 animate-float">
            <Bot size={28} className="text-[var(--dark-blue)]" />
          </div>
          <h2 className="text-2xl font-black text-[var(--lime)] mb-3">{t("congrats.title")}</h2>
          <p className="text-sm text-[var(--cream)]/80 mb-6">
            AI Avatar talebiniz alindi. En kisa surede sizi arayacagiz.
          </p>
          <Link href="/" className="inline-flex px-6 py-3 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-bold">
            Ana Sayfa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} /> Ana Sayfa
        </Link>

        {/* Title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[6px_6px_0px_var(--dark-blue)] flex items-center justify-center mx-auto mb-4 animate-float">
            <Bot size={32} className="text-[var(--dark-blue)]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--lime)] mb-2">{t("avatar.title")}</h1>
          <p className="text-[var(--gray)] mb-2">{t("avatar.subtitle")}</p>
          <div className="inline-flex px-4 py-1.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] font-black text-lg border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)]">
            {formatPrice(5999)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Example videos */}
          <div>
            <h3 className="text-sm font-bold text-[var(--lime)] uppercase tracking-wider mb-4">
              {t("avatar.examples")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {hasSamples
                ? samples.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => sample.videoUrl && setSelectedVideo({ url: sample.videoUrl, title: sample.title })}
                      className="aspect-[9/16] rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-3 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group overflow-hidden relative"
                    >
                      {sample.thumbnailUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sample.thumbnailUrl} alt={sample.title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[var(--lime)]/20 border-2 border-[var(--lime)]/30 flex items-center justify-center group-hover:bg-[var(--lime)]/30 transition-colors">
                              <Play size={20} className="text-[var(--lime)] ml-0.5" />
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{sample.title}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                            <Play size={20} className="text-[var(--lime)] ml-0.5" />
                          </div>
                          <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">{sample.title}</span>
                        </>
                      )}
                    </div>
                  ))
                : [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-[9/16] rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex flex-col items-center justify-center gap-3 hover:border-[var(--lime)]/50 hover:shadow-[4px_4px_0px_var(--lime)] transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--lime)]/10 border-2 border-[var(--lime)]/30 flex items-center justify-center group-hover:bg-[var(--lime)]/20 transition-colors">
                        <Play size={20} className="text-[var(--lime)] ml-0.5" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--gray)] uppercase tracking-wider">
                        Ornek #{String(i).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Right: Info + CTA */}
          <div className="space-y-6">
            {/* Who is it for */}
            <div className="rounded-lg bg-[var(--dark-blue)] border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)] overflow-hidden">
              <div className="p-4 bg-[var(--lime)] text-[var(--dark-blue)]">
                <h3 className="font-black text-base">{t("avatar.who_title")}</h3>
              </div>
              <div className="p-5 space-y-4">
                {whoItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 animate-shimmer rounded-md p-2">
                    <div className="w-8 h-8 rounded-md bg-[var(--lime)]/10 flex items-center justify-center shrink-0 text-[var(--lime)]">
                      {item.icon}
                    </div>
                    <p className="text-sm text-[var(--cream)]/90 font-medium pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-4 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-black text-base hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer animate-pulse-lime"
              >
                {t("avatar.cta")} &rarr;
              </button>
            )}

            {/* Contact form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="rounded-lg bg-[var(--card)] border-3 border-[var(--lime)] p-5 space-y-3 animate-scale-in">
                <h4 className="font-bold text-[var(--lime)] text-sm mb-2">{t("form.title")}</h4>
                <input type="text" required placeholder={t("form.name")} value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none" />
                <input type="email" required placeholder={t("form.email")} value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none" />
                <input type="tel" required placeholder={t("form.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none" />
                <input type="text" placeholder={t("form.company")} value={company} onChange={(e) => setCompany(e.target.value)} disabled={loading} className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm placeholder:text-[var(--gray)] focus:border-[var(--lime)] focus:outline-none" />
                {error && (
                  <div className="p-2.5 rounded-md bg-red-500/10 border-2 border-red-500/30">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}
                <button type="submit" disabled={loading} className={`w-full py-3 rounded-md border-3 font-bold text-sm flex items-center justify-center gap-2 transition-all ${loading ? "bg-[var(--gray)]/30 text-[var(--gray)] border-[var(--gray)]/30 cursor-not-allowed" : "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px]"}`}>
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Gönderiliyor...</> : <><Send size={14} /> {t("form.submit")}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <VideoPlayerModal
        open={!!selectedVideo}
        videoUrl={selectedVideo?.url ?? ""}
        title={selectedVideo?.title}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};
