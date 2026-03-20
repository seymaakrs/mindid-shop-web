"use client";

import { AlertTriangle } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  open,
  title = "Silme Onayı",
  message = "Bu öğeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--card)] border-3 border-red-500/50 rounded-lg p-6 max-w-sm w-full mx-4 shadow-[6px_6px_0px_rgba(239,68,68,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <h3 className="font-black text-[var(--cream)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--gray)] mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm font-bold hover:border-[var(--cream)]/50 transition-all cursor-pointer"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 border-2 border-red-600 text-white text-sm font-bold hover:bg-red-600 transition-all cursor-pointer"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};
