"use client";

import { X } from "lucide-react";

type VideoPlayerModalProps = {
  open: boolean;
  videoUrl: string;
  title?: string;
  onClose: () => void;
};

export const VideoPlayerModal = ({ open, videoUrl, title, onClose }: VideoPlayerModalProps) => {
  if (!open || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[var(--lime)] transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>
        {title && (
          <h3 className="text-sm font-bold text-[var(--cream)] mb-2">{title}</h3>
        )}
        <div className="rounded-lg overflow-hidden border-3 border-[var(--lime)] shadow-[6px_6px_0px_var(--lime)]">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
