"use client";

import { useAuth } from "@/lib/auth-context";
import { FolderOpen, Download, FileVideo, FileImage, File } from "lucide-react";
import { useCustomerOrders } from "@/lib/hooks/use-customer";

const FilesPage = () => {
  const { customerData } = useAuth();
  const { orders, loading } = useCustomerOrders(customerData?.email);

  const completedOrders = orders.filter((o) => o.status === "completed" && o.fileUrls?.length > 0);

  const getFileIcon = (url: string) => {
    if (url.includes("video") || url.includes(".mp4") || url.includes(".mov")) return FileVideo;
    if (url.includes("image") || url.includes(".jpg") || url.includes(".png")) return FileImage;
    return File;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <FolderOpen size={24} className="text-[var(--lime)]" /> Dosyalarım
      </h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
      ) : completedOrders.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500 mb-2">Henüz teslim edilmiş dosya yok.</p>
          <p className="text-xs text-gray-600">Tamamlanan siparişlerinizin dosyaları burada görünecek.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">{order.serviceName}</h3>
                <span className="text-[10px] text-gray-500">
                  {order.createdAt && typeof order.createdAt === "object" && "toDate" in order.createdAt
                    ? (order.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("tr-TR")
                    : "—"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {order.fileUrls.map((url, i) => {
                  const Icon = getFileIcon(url);
                  const fileName = url.split("/").pop()?.split("?")[0] || `dosya-${i + 1}`;
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <Icon size={18} className="text-[var(--lime)] shrink-0" />
                      <span className="text-xs text-gray-300 truncate flex-1">{decodeURIComponent(fileName)}</span>
                      <Download size={14} className="text-gray-500 group-hover:text-[var(--lime)] shrink-0 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesPage;
