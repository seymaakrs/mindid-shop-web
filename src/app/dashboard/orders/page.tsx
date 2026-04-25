"use client";

import { useAuth } from "@/lib/auth-context";
import { useCustomerOrders } from "@/lib/hooks/use-customer";
import { ShoppingBag, Filter, Download } from "lucide-react";
import { useState } from "react";

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "Yeni", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  seen: { label: "Görüldü", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  "in-progress": { label: "Üretiliyor", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  completed: { label: "Tamamlandı", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  cancelled: { label: "İptal", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const OrdersPage = () => {
  const { customerData } = useAuth();
  const { orders, loading } = useCustomerOrders(customerData?.email);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <ShoppingBag size={24} className="text-[var(--lime)]" /> Siparişlerim
        </h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { key: "all", label: "Tümü" },
          { key: "new", label: "Yeni" },
          { key: "in-progress", label: "Üretiliyor" },
          { key: "completed", label: "Tamamlandı" },
          { key: "cancelled", label: "İptal" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? "bg-[var(--lime)] text-[#100a2c]"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {f.label} {f.key === "all" ? `(${orders.length})` : `(${orders.filter((o) => o.status === f.key).length})`}
          </button>
        ))}
      </div>

      {/* Order List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
          <p>Bu kategoride sipariş bulunamadı.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const status = STATUS_MAP[order.status] || STATUS_MAP["new"];
            return (
              <div
                key={order.id}
                className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-bold text-white">{order.serviceName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        Sipariş: {order.createdAt && typeof order.createdAt === "object" && "toDate" in order.createdAt
                          ? (order.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
                          : "—"}
                      </span>
                      <span>ID: {order.id?.slice(0, 8)}...</span>
                    </div>
                    {order.adminNotes && (
                      <p className="mt-2 text-xs text-gray-400 bg-white/5 rounded-lg p-2">{order.adminNotes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">₺{(order.pricing?.totalAI || 0).toLocaleString("tr-TR")}</p>
                    <p className="text-[10px] text-gray-500">{order.pricing?.currency || "TRY"}</p>
                    {order.status === "completed" && order.fileUrls?.length > 0 && (
                      <button className="mt-2 flex items-center gap-1 text-xs text-[var(--lime)] hover:underline ml-auto">
                        <Download size={12} /> Dosyaları İndir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
