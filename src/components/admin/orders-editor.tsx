"use client";

import { useState } from "react";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useOrders } from "@/lib/hooks/use-firestore";
import type { OrderSubmission, OrderStatus } from "@/lib/firestore-types";
import { notifyOrderStatusChange } from "@/lib/notifications";
import { ConfirmDialog } from "./confirm-dialog";
import {
  ClipboardList,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  X,
  Loader2,
  MessageSquare,
  Wallet,
} from "lucide-react";

const PAYMENT_STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  pending: { label: "Bekliyor", cls: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  awaiting_confirmation: {
    label: "Onay Bekliyor",
    cls: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  paid: { label: "Ödendi", cls: "bg-green-500/20 text-green-300 border-green-500/30" },
  failed: { label: "Başarısız", cls: "bg-red-500/20 text-red-300 border-red-500/30" },
  refunded: { label: "İade", cls: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  new: { label: "Yeni", color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/30" },
  seen: { label: "Görüldü", color: "text-yellow-400", bg: "bg-yellow-500/20 border-yellow-500/30" },
  "in-progress": { label: "Devam Ediyor", color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/30" },
  completed: { label: "Tamamlandı", color: "text-green-400", bg: "bg-green-500/20 border-green-500/30" },
  cancelled: { label: "İptal", color: "text-red-400", bg: "bg-red-500/20 border-red-500/30" },
};

const ALL_STATUSES: (OrderStatus | "all")[] = ["all", "new", "seen", "in-progress", "completed", "cancelled"];

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  );
};

const formatDate = (timestamp: { seconds: number }) => {
  if (!timestamp?.seconds) return "-";
  return new Date(timestamp.seconds * 1000).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(amount);
};

export const OrdersEditor = () => {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const { data: orders, loading } = useOrders(filter === "all" ? undefined : filter);
  const [selected, setSelected] = useState<OrderSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [cancelTarget, setCancelTarget] = useState<OrderSubmission | null>(null);

  const updateStatus = async (order: OrderSubmission, newStatus: OrderStatus) => {
    if (!order.id) return;
    const updates: Record<string, unknown> = { status: newStatus, updatedAt: Timestamp.now() };
    if (newStatus === "seen") updates.seenAt = Timestamp.now();
    await updateDoc(doc(db, "mindid_orders", order.id), updates);
    // Notify customer via in-app + email (non-blocking-ish: errors are swallowed inside).
    await notifyOrderStatusChange(order.customerUid, order.id, newStatus, {
      email: order.customer?.email,
      name: order.customer?.name,
    });
  };

  const saveNotes = async (order: OrderSubmission) => {
    if (!order.id) return;
    await updateDoc(doc(db, "mindid_orders", order.id), {
      adminNotes,
      updatedAt: Timestamp.now(),
    });
  };

  const confirmPayment = async (order: OrderSubmission) => {
    if (!order.id) return;
    const now = Timestamp.now();
    // Flip order to paid + in-progress so production can begin.
    await updateDoc(doc(db, "mindid_orders", order.id), {
      paymentStatus: "paid",
      paidAt: now,
      status: "in-progress",
      updatedAt: now,
    });
    // Mark the linked payment session as paid (best-effort).
    if (order.paymentSessionId) {
      try {
        await updateDoc(doc(db, "mindid_payment_sessions", order.paymentSessionId), {
          status: "paid",
          paidAt: now,
          updatedAt: now,
        });
      } catch {
        // session may have been deleted — safe to ignore
      }
    }
    // Notify customer via in-app notification + email.
    await notifyOrderStatusChange(order.customerUid, order.id, "in-progress", {
      email: order.customer?.email,
      name: order.customer?.name,
    });
    setSelected({
      ...order,
      paymentStatus: "paid",
      paidAt: now,
      status: "in-progress",
    });
  };

  const openDetail = async (order: OrderSubmission) => {
    setSelected(order);
    setAdminNotes(order.adminNotes || "");
    // Auto-mark as seen
    if (order.status === "new") {
      await updateStatus(order, "seen");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[var(--lime)]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ClipboardList size={24} className="text-[var(--lime)]" />
          <h1 className="text-2xl font-black text-[var(--cream)]">Siparişler</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold border-2 transition-all cursor-pointer ${
              filter === s
                ? "bg-[var(--lime)] text-[var(--dark-blue)] border-[var(--lime)]"
                : "bg-[var(--card)] text-[var(--gray)] border-[var(--electric-blue)]/20 hover:border-[var(--lime)]/50"
            }`}
          >
            {s === "all" ? "Tümü" : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="p-8 text-center text-[var(--gray)] bg-[var(--card)] rounded-md border-3 border-[var(--electric-blue)]/20">
          Sipariş bulunamadı.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-3 border-[var(--electric-blue)]/20">
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">Durum</th>
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">Müşteri</th>
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">Hizmet</th>
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">Fiyat</th>
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">Tarih</th>
                <th className="text-left p-3 text-xs font-bold text-[var(--gray)] uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[var(--electric-blue)]/10 hover:bg-[var(--electric-blue)]/5 transition-colors"
                >
                  <td className="p-3"><StatusBadge status={order.status} /></td>
                  <td className="p-3">
                    <div className="text-[var(--cream)] font-bold">{order.customer.name}</div>
                    <div className="text-[var(--gray)] text-xs">{order.customer.email}</div>
                  </td>
                  <td className="p-3 text-[var(--cream)]">{order.serviceName}</td>
                  <td className="p-3 text-[var(--lime)] font-bold">{formatPrice(order.pricing.totalAI)}</td>
                  <td className="p-3 text-[var(--gray)] text-xs">{formatDate(order.createdAt)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => openDetail(order)}
                      className="px-3 py-1.5 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs font-bold hover:border-[var(--lime)] transition-all cursor-pointer"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto py-8">
          <div className="bg-[var(--card)] border-3 border-[var(--electric-blue)] rounded-lg w-full max-w-2xl mx-4 shadow-[6px_6px_0px_var(--electric-blue)]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-3 border-[var(--electric-blue)]/20">
              <div className="flex items-center gap-3">
                <h2 className="font-black text-[var(--cream)]">Sipariş Detayı</h2>
                <StatusBadge status={selected.status} />
              </div>
              <button onClick={() => setSelected(null)} className="text-[var(--gray)] hover:text-[var(--cream)] cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Customer info */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Müşteri Bilgileri</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-[var(--gray)]">Ad:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.name}</span></div>
                  <div><span className="text-[var(--gray)]">E-posta:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.email}</span></div>
                  <div><span className="text-[var(--gray)]">Telefon:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.phone}</span></div>
                  <div><span className="text-[var(--gray)]">Şirket:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.company}</span></div>
                  {selected.customer.sector && (
                    <div><span className="text-[var(--gray)]">Sektör:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.sector}</span></div>
                  )}
                  {selected.customer.targetAudience && (
                    <div><span className="text-[var(--gray)]">Hedef Kitle:</span> <span className="text-[var(--cream)] font-bold ml-1">{selected.customer.targetAudience}</span></div>
                  )}
                </div>
                {selected.customer.message && (
                  <div className="mt-3 p-3 rounded-md bg-[var(--dark-blue)] text-sm text-[var(--cream)]">
                    <MessageSquare size={14} className="inline mr-1 text-[var(--gray)]" />
                    {selected.customer.message}
                  </div>
                )}
              </div>

              {/* Service & Config */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Hizmet & Konfigürasyon</h3>
                <div className="text-sm text-[var(--cream)] font-bold mb-2">{selected.serviceName}</div>
                <div className="space-y-1 text-sm">
                  {selected.config.duration && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Süre</span><span className="text-[var(--cream)]">{selected.config.duration.seconds}sn</span></div>
                  )}
                  {selected.config.scenario && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Senaryo</span><span className="text-[var(--cream)]">{selected.config.scenario.label}</span></div>
                  )}
                  {selected.config.voice && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Ses</span><span className="text-[var(--cream)]">{selected.config.voice.label}</span></div>
                  )}
                  {selected.config.music && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Müzik</span><span className="text-[var(--cream)]">{selected.config.music.label}</span></div>
                  )}
                  {selected.config.visualStyle && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Görsel Stil</span><span className="text-[var(--cream)]">{selected.config.visualStyle.label}</span></div>
                  )}
                  {selected.config.postProduction?.map((pp) => (
                    <div key={pp.id} className="flex justify-between"><span className="text-[var(--gray)]">Post-prodüksiyon</span><span className="text-[var(--cream)]">{pp.label}</span></div>
                  ))}
                  {selected.config.productCount && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Ürün Sayısı</span><span className="text-[var(--cream)]">{selected.config.productCount.label}</span></div>
                  )}
                  {selected.config.photoAngle && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Çekim Açısı</span><span className="text-[var(--cream)]">{selected.config.photoAngle.label}</span></div>
                  )}
                  {selected.config.photoModel && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Model</span><span className="text-[var(--cream)]">{selected.config.photoModel.label}</span></div>
                  )}
                  {selected.config.colorPackage && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Renk Paketi</span><span className="text-[var(--cream)]">{selected.config.colorPackage.label}</span></div>
                  )}
                  {selected.config.photoVisualStyle && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Fotoğraf Stili</span><span className="text-[var(--cream)]">{selected.config.photoVisualStyle.label}</span></div>
                  )}
                  {selected.config.background && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Arka Plan</span><span className="text-[var(--cream)]">{selected.config.background.label}</span></div>
                  )}
                  {selected.config.photoRetouch && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Rötuş</span><span className="text-[var(--cream)]">{selected.config.photoRetouch.label}</span></div>
                  )}
                  {selected.config.revision && (
                    <div className="flex justify-between"><span className="text-[var(--gray)]">Revizyon</span><span className="text-[var(--cream)]">{selected.config.revision.label}</span></div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Fiyatlandırma</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-md bg-[var(--dark-blue)] text-center">
                    <div className="text-xs text-[var(--gray)]">AI Fiyat</div>
                    <div className="text-lg font-black text-[var(--lime)]">{formatPrice(selected.pricing.totalAI)}</div>
                  </div>
                  <div className="p-3 rounded-md bg-[var(--dark-blue)] text-center">
                    <div className="text-xs text-[var(--gray)]">Geleneksel</div>
                    <div className="text-lg font-black text-[var(--gray)] line-through">{formatPrice(selected.pricing.totalTraditional)}</div>
                  </div>
                  <div className="p-3 rounded-md bg-[var(--dark-blue)] text-center">
                    <div className="text-xs text-[var(--gray)]">Tasarruf</div>
                    <div className="text-lg font-black text-[var(--electric-blue)]">{formatPrice(selected.pricing.savings)}</div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Wallet size={12} /> Ödeme
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <span className="text-[var(--gray)]">Yöntem:</span>{" "}
                    <span className="text-[var(--cream)] font-bold ml-1">
                      {selected.paymentMethod === "bank_transfer"
                        ? "Havale/EFT"
                        : selected.paymentMethod ?? "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--gray)]">Durum:</span>{" "}
                    {selected.paymentStatus ? (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ml-1 ${
                          PAYMENT_STATUS_LABEL[selected.paymentStatus]?.cls ??
                          "bg-gray-500/20 text-gray-300 border-gray-500/30"
                        }`}
                      >
                        {PAYMENT_STATUS_LABEL[selected.paymentStatus]?.label ??
                          selected.paymentStatus}
                      </span>
                    ) : (
                      <span className="text-[var(--gray)] ml-1">—</span>
                    )}
                  </div>
                  {selected.paymentReference && (
                    <div className="col-span-2">
                      <span className="text-[var(--gray)]">Referans:</span>{" "}
                      <span className="font-mono text-[var(--lime)] font-bold ml-1">
                        {selected.paymentReference}
                      </span>
                    </div>
                  )}
                  {selected.paidAt && (
                    <div className="col-span-2">
                      <span className="text-[var(--gray)]">Ödeme Tarihi:</span>{" "}
                      <span className="text-[var(--cream)] ml-1">
                        {formatDate(selected.paidAt)}
                      </span>
                    </div>
                  )}
                </div>
                {selected.paymentStatus !== "paid" &&
                  selected.paymentStatus !== "refunded" && (
                    <button
                      onClick={() => confirmPayment(selected)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-2 border-[var(--dark-blue)] text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                    >
                      <CheckCircle size={14} /> Ödemeyi Onayla
                    </button>
                  )}
              </div>

              {/* Files */}
              {selected.fileUrls.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Dosyalar ({selected.fileUrls.length})</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.fileUrls.map((url, i) => {
                      const isVideo = /\.(mp4|webm|mov|avi|mkv)/i.test(url);
                      const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)/i.test(url);
                      return (
                        <div key={i} className="rounded-md overflow-hidden border-2 border-[var(--electric-blue)]/20 bg-[var(--dark-blue)]">
                          {isVideo ? (
                            <video src={url} controls className="w-full max-h-48 object-contain bg-black" />
                          ) : isImage ? (
                            <img src={url} alt={`Dosya ${i + 1}`} className="w-full max-h-48 object-contain bg-black" />
                          ) : (
                            <div className="p-4 flex items-center justify-center h-24 text-[var(--gray)] text-sm">
                              Dosya {i + 1}
                            </div>
                          )}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 text-xs text-[var(--electric-blue)] hover:text-[var(--lime)] transition-colors border-t border-[var(--electric-blue)]/10"
                          >
                            <ExternalLink size={12} />
                            Yeni sekmede aç
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Admin notes */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Admin Notu</h3>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none transition-colors"
                  placeholder="Not ekle..."
                />
                <button
                  onClick={() => saveNotes(selected)}
                  className="mt-2 px-4 py-1.5 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs font-bold hover:border-[var(--lime)] transition-all cursor-pointer"
                >
                  Notu Kaydet
                </button>
              </div>

              {/* Dates */}
              <div className="text-xs text-[var(--gray)] space-y-1">
                <div>Oluşturulma: {formatDate(selected.createdAt)}</div>
                {selected.seenAt && <div>Görülme: {formatDate(selected.seenAt)}</div>}
                <div>Güncelleme: {formatDate(selected.updatedAt)}</div>
              </div>

              {/* Status actions */}
              <div>
                <h3 className="text-xs font-bold text-[var(--lime)] uppercase tracking-wider mb-3">Durum Güncelle</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.status !== "seen" && selected.status !== "new" ? null : (
                    <button
                      onClick={() => { updateStatus(selected, "in-progress"); setSelected({ ...selected, status: "in-progress" }); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/20 border-2 border-orange-500/30 text-orange-400 text-xs font-bold hover:border-orange-400 transition-all cursor-pointer"
                    >
                      <Clock size={14} /> Devam Ediyor
                    </button>
                  )}
                  {selected.status !== "completed" && (
                    <button
                      onClick={() => { updateStatus(selected, "completed"); setSelected({ ...selected, status: "completed" }); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/20 border-2 border-green-500/30 text-green-400 text-xs font-bold hover:border-green-400 transition-all cursor-pointer"
                    >
                      <CheckCircle size={14} /> Tamamlandı
                    </button>
                  )}
                  {selected.status !== "cancelled" && (
                    <button
                      onClick={() => setCancelTarget(selected)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/20 border-2 border-red-500/30 text-red-400 text-xs font-bold hover:border-red-400 transition-all cursor-pointer"
                    >
                      <XCircle size={14} /> İptal Et
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel confirmation */}
      <ConfirmDialog
        open={!!cancelTarget}
        title="Sipariş İptali"
        message="Bu siparişi iptal etmek istediğinize emin misiniz?"
        onConfirm={() => {
          if (cancelTarget) {
            updateStatus(cancelTarget, "cancelled");
            if (selected && selected.id === cancelTarget.id) {
              setSelected({ ...selected, status: "cancelled" } as OrderSubmission);
            }
          }
          setCancelTarget(null);
        }}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
};
