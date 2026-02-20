"use client";

export const LoadingSpinner = ({ text = "Yükleniyor..." }: { text?: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-[var(--lime)]/30 border-t-[var(--lime)] rounded-full animate-spin" />
      <span className="text-sm text-[var(--gray)]">{text}</span>
    </div>
  );
};
