"use client";

import { Share2, Instagram, Clock } from "lucide-react";
import Link from "next/link";

const SocialPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Share2 size={24} className="text-[var(--lime)]" /> Sosyal Medya Yönetimi
      </h1>

      <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--lime)]/10 flex items-center justify-center mx-auto mb-4">
          <Instagram size={32} className="text-[var(--lime)]" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Yakında Aktif!</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-4">
          Sosyal medya hesaplarınızı bağlayın, içerik takvimi oluşturun, AI ile otomatik post üretin.
          Instagram, TikTok, LinkedIn ve Facebook desteği.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--lime)]">
          <Clock size={14} /> Growth ve Agency planlarında kullanılabilir
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "İçerik Takvimi", desc: "Haftalık/aylık post planı oluşturun", emoji: "📅" },
          { title: "AI Post Üretimi", desc: "Sektörünüze uygun içerik önerileri", emoji: "✨" },
          { title: "Analitik", desc: "Etkileşim ve büyüme takibi", emoji: "📊" },
        ].map((feature) => (
          <div key={feature.title} className="bg-white/5 border border-white/5 rounded-2xl p-5 opacity-50">
            <div className="text-2xl mb-3">{feature.emoji}</div>
            <h3 className="text-sm font-bold text-white">{feature.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialPage;
