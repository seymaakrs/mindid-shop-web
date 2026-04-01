"use client";

import { useEffect, useState } from "react";
import { getAnalytics, type DailyAnalytics } from "@/lib/analytics-service";
import {
  Eye,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Loader2,
} from "lucide-react";

const AdminAnalytics = () => {
  const [data, setData] = useState<DailyAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await getAnalytics(days);
        setData(result);
      } catch {
        // Firestore henüz veri yoksa boş döner
      }
      setLoading(false);
    };
    load();
  }, [days]);

  // Toplam hesapla
  const totalViews = data.reduce((s, d) => s + d.pageViews, 0);
  const totalVisitors = data.reduce((s, d) => s + d.uniqueVisitors, 0);
  const todayData = data.find(
    (d) => d.date === new Date().toISOString().split("T")[0]
  );

  // En çok ziyaret edilen sayfalar
  const pageMap: Record<string, number> = {};
  data.forEach((d) => {
    Object.entries(d.pages).forEach(([page, count]) => {
      pageMap[page] = (pageMap[page] || 0) + count;
    });
  });
  const topPages = Object.entries(pageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Son 7 gün ortalaması
  const last7 = data.slice(0, 7);
  const avgViews =
    last7.length > 0
      ? Math.round(last7.reduce((s, d) => s + d.pageViews, 0) / last7.length)
      : 0;
  const avgVisitors =
    last7.length > 0
      ? Math.round(
          last7.reduce((s, d) => s + d.uniqueVisitors, 0) / last7.length
        )
      : 0;

  // Basit bar chart — max değere göre oranla
  const maxViews = Math.max(...data.map((d) => d.pageViews), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[var(--cream)]">
            Ziyaretçi Analizi
          </h1>
          <p className="text-sm text-[var(--gray)]">
            Sitenize gelen ziyaretçileri ve sayfa görüntülemelerini takip edin
          </p>
        </div>
        {/* Dönem seçici */}
        <div className="flex gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                days === d
                  ? "bg-[var(--lime)] text-[var(--dark-blue)]"
                  : "bg-[var(--card)] text-[var(--gray)] hover:text-[var(--cream)]"
              }`}
            >
              {d} Gün
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-[var(--lime)] animate-spin" />
        </div>
      ) : (
        <>
          {/* Özet Kartları */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Eye}
              label="Bugün Görüntülenme"
              value={todayData?.pageViews || 0}
              highlight
            />
            <StatCard
              icon={Users}
              label="Bugün Ziyaretçi"
              value={todayData?.uniqueVisitors || 0}
              highlight
            />
            <StatCard
              icon={TrendingUp}
              label={`${days} Gün Toplam Görüntülenme`}
              value={totalViews}
            />
            <StatCard
              icon={Globe}
              label={`${days} Gün Toplam Ziyaretçi`}
              value={totalVisitors}
            />
          </div>

          {/* Ortalamalar */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20">
              <span className="text-xs font-bold text-[var(--gray)]">
                Günlük Ortalama Görüntülenme (7 gün)
              </span>
              <div className="text-2xl font-black text-[var(--cream)] mt-1">
                {avgViews}
              </div>
            </div>
            <div className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20">
              <span className="text-xs font-bold text-[var(--gray)]">
                Günlük Ortalama Ziyaretçi (7 gün)
              </span>
              <div className="text-2xl font-black text-[var(--cream)] mt-1">
                {avgVisitors}
              </div>
            </div>
          </div>

          {/* Günlük Grafik */}
          <div className="p-6 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 mb-8">
            <h2 className="text-sm font-black text-[var(--cream)] mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-[var(--lime)]" />
              Günlük Sayfa Görüntülenme
            </h2>
            {data.length === 0 ? (
              <p className="text-sm text-[var(--gray)] py-8 text-center">
                Henüz veri yok. Ziyaretçiler gelmeye başladığında burada
                görüntülenecek.
              </p>
            ) : (
              <div className="space-y-2">
                {data.map((d) => {
                  const pct = Math.max(
                    (d.pageViews / maxViews) * 100,
                    2
                  );
                  return (
                    <div key={d.date} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--gray)] w-20 shrink-0 font-mono">
                        {formatDate(d.date)}
                      </span>
                      <div className="flex-1 h-6 bg-[var(--dark-blue)]/30 rounded overflow-hidden">
                        <div
                          className="h-full bg-[var(--lime)] rounded transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[var(--cream)] w-12 text-right">
                        {d.pageViews}
                      </span>
                      <span className="text-xs text-[var(--gray)] w-16 text-right">
                        {d.uniqueVisitors} kişi
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* En Çok Ziyaret Edilen Sayfalar */}
          <div className="p-6 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20">
            <h2 className="text-sm font-black text-[var(--cream)] mb-4 flex items-center gap-2">
              <Globe size={16} className="text-[var(--lime)]" />
              En Çok Ziyaret Edilen Sayfalar
            </h2>
            {topPages.length === 0 ? (
              <p className="text-sm text-[var(--gray)] py-4 text-center">
                Henüz veri yok.
              </p>
            ) : (
              <div className="space-y-2">
                {topPages.map(([page, count], i) => (
                  <div
                    key={page}
                    className="flex items-center gap-3 py-2 border-b border-[var(--electric-blue)]/10 last:border-0"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--lime)]/20 text-[var(--lime)] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--cream)] font-mono flex-1">
                      {page}
                    </span>
                    <span className="text-sm font-bold text-[var(--cream)]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Yardımcı Bileşen ─── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  highlight?: boolean;
}) => (
  <div
    className={`p-4 rounded-md border-3 ${
      highlight
        ? "bg-[var(--lime)]/10 border-[var(--lime)]/40"
        : "bg-[var(--card)] border-[var(--electric-blue)]/20"
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className="text-[var(--lime)]" />
      <span className="text-xs font-bold text-[var(--gray)]">{label}</span>
    </div>
    <span className="text-2xl font-black text-[var(--cream)]">{value}</span>
  </div>
);

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
};

export default AdminAnalytics;
