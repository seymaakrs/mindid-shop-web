"use client";

import { BarChart3, TrendingUp, Clock } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <BarChart3 size={24} className="text-[var(--lime)]" /> Analitik
      </h1>

      <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--lime)]/10 flex items-center justify-center mx-auto mb-4">
          <TrendingUp size={32} className="text-[var(--lime)]" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Analitik Paneli Yakında!</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-4">
          İçerik performansı, sosyal medya metrikleri ve ROI takibi tek panelden.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--lime)]">
          <Clock size={14} /> Growth ve Agency planlarında kullanılabilir
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
