"use client";

import { useAuth } from "@/lib/auth-context";
import { useCustomerOrders } from "@/lib/hooks/use-customer";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Yeni", color: "text-blue-400 bg-blue-500/10" },
  seen: { label: "Görüldü", color: "text-yellow-400 bg-yellow-500/10" },
  "in-progress": { label: "Üretiliyor", color: "text-purple-400 bg-purple-500/10" },
  completed: { label: "Tamamlandı", color: "text-green-400 bg-green-500/10" },
  cancelled: { label: "İptal", color: "text-red-400 bg-red-500/10" },
};

const DashboardPage = () => {
  const { customerData } = useAuth();
  const { orders, loading } = useCustomerOrders(customerData?.email);

  const activeOrders = orders.filter((o) => !["completed", "cancelled"].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === "completed");
  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.pricing?.totalAI || 0), 0);

  const stats = [
    { label: "Aktif Sipariş", value: activeOrders.length, icon: Clock, color: "text-purple-400" },
    { label: "Tamamlanan", value: completedOrders.length, icon: CheckCircle2, color: "text-green-400" },
    { label: "Toplam Sipariş", value: orders.length, icon: ShoppingBag, color: "text-blue-400" },
    { label: "Toplam Harcama", value: `₺${totalSpent.toLocaleString("tr-TR")}`, icon: CreditCard, color: "text-[var(--lime)]" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hoş geldin, {customerData?.name?.split(" ")[0] || "Kullanıcı"} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">İşte hesabının özeti</p>
        </div>
        <Link
          href="/configure/reels"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
        >
          <Plus size={16} /> Yeni Sipariş
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white">{loading ? "..." : stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "AI Video", desc: "Reels, reklam filmi, tanıtım", href: "/configure/reels", emoji: "🎬" },
          { title: "Ürün Fotoğrafı", desc: "E-ticaret görselleri", href: "/configure/product-photo", emoji: "📸" },
          { title: "Sosyal Medya", desc: "İçerik planla ve yönet", href: "/dashboard/social", emoji: "📱" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[var(--lime)]/30 transition-all"
          >
            <div className="text-2xl mb-3">{action.emoji}</div>
            <h3 className="text-sm font-bold text-white group-hover:text-[var(--lime)] transition-colors">
              {action.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-[var(--lime)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Başla <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white/5 border border-white/5 rounded-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--lime)]" /> Son Siparişler
          </h2>
          <Link href="/dashboard/orders" className="text-xs text-[var(--lime)] hover:underline flex items-center gap-1">
            Tümünü Gör <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Yükleniyor...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm mb-4">Henüz siparişin yok</p>
            <Link
              href="/configure/reels"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--lime)] text-[#100a2c] text-sm font-bold hover:brightness-110 transition-all"
            >
              <Plus size={14} /> İlk Siparişini Ver
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.slice(0, 5).map((order) => {
              const status = STATUS_MAP[order.status] || STATUS_MAP["new"];
              return (
                <div key={order.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center text-[var(--lime)] text-lg">
                      {order.serviceId === "product-photo" ? "📸" : "🎬"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{order.serviceName}</p>
                      <p className="text-[10px] text-gray-500">
                        {order.createdAt && typeof order.createdAt === "object" && "toDate" in order.createdAt
                          ? (order.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-sm font-bold text-white">
                      ₺{(order.pricing?.totalAI || 0).toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
