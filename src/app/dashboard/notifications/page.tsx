"use client";

import { useAuth } from "@/lib/auth-context";
import { useCustomerNotifications } from "@/lib/hooks/use-customer";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell, Check, ShoppingBag, CreditCard, Megaphone, Info } from "lucide-react";

const ICON_MAP: Record<string, typeof Bell> = {
  order_update: ShoppingBag,
  payment: CreditCard,
  promo: Megaphone,
  system: Info,
};

const NotificationsPage = () => {
  const { customerData } = useAuth();
  const { notifications, unreadCount } = useCustomerNotifications(customerData?.uid);

  const markAsRead = async (notifId: string) => {
    try {
      await updateDoc(doc(db, "mindid_notifications", notifId), { read: true });
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Bell size={24} className="text-[var(--lime)]" /> Bildirimler
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[var(--lime)] text-[#100a2c] text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </h1>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <Bell size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">Henüz bildirim yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = ICON_MAP[notif.type] || Bell;
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? "bg-white/[0.02] border-white/5"
                    : "bg-[var(--lime)]/5 border-[var(--lime)]/10"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.read ? "bg-white/5" : "bg-[var(--lime)]/10"
                }`}>
                  <Icon size={18} className={notif.read ? "text-gray-500" : "text-[var(--lime)]"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${notif.read ? "text-gray-400" : "text-white"}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                  <p className="text-[10px] text-gray-600 mt-1">
                    {notif.createdAt && typeof notif.createdAt === "object" && "toDate" in notif.createdAt
                      ? (notif.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
                      : "—"}
                  </p>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => notif.id && markAsRead(notif.id)}
                    className="shrink-0 p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-[var(--lime)] transition-colors"
                    title="Okundu olarak işaretle"
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
