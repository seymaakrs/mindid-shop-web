"use client";

import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, Film, X, Info } from "lucide-react";

type SizeGuide = {
  label: string;
  size: string;
  tip?: string;
};

const DEFAULT_GUIDES: SizeGuide[] = [
  { label: "Portfolio Video (Dikey)", size: "1080×1920 px — 9:16", tip: "MP4, maks 500 MB" },
  { label: "Portfolio Video (Yatay)", size: "1920×1080 px — 16:9", tip: "MP4, maks 500 MB" },
  { label: "Portfolio Video (Kare)", size: "1080×1080 px — 1:1", tip: "MP4, maks 500 MB" },
];

type VideoUploadProps = {
  storagePath: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
  sizeGuides?: SizeGuide[];
};

export const VideoUpload = ({
  storagePath,
  currentUrl,
  onUpload,
  label = "Video Yükle",
  sizeGuides,
}: VideoUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const guides = sizeGuides ?? DEFAULT_GUIDES;

  const handleUpload = (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError("Sadece video dosyaları yüklenebilir.");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, storagePath);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      () => {
        setError("Yükleme başarısız oldu.");
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onUpload(url);
        setUploading(false);
        setProgress(0);
      }
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="block text-xs font-bold text-[var(--gray)]">{label}</label>
        <button
          type="button"
          onClick={() => setShowGuide((v) => !v)}
          className="text-[var(--lime)] hover:opacity-70 transition-opacity"
          title="Boyut Rehberi"
        >
          <Info size={13} />
        </button>
      </div>

      {/* Boyut Rehberi */}
      {showGuide && (
        <div className="mb-2 p-2.5 rounded-md bg-[var(--lime)]/8 border border-[var(--lime)]/25 space-y-1">
          <p className="text-[10px] font-black text-[var(--lime)] uppercase tracking-wider mb-1.5">
            🎬 Önerilen Video Boyutları
          </p>
          {guides.map((g, i) => (
            <div key={i} className="flex items-start justify-between gap-2">
              <span className="text-[10px] text-[var(--cream)]/70">{g.label}</span>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[var(--cream)]">{g.size}</span>
                {g.tip && (
                  <p className="text-[9px] text-[var(--gray)]">{g.tip}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {currentUrl && !uploading && (
        <div className="mb-2 p-2 rounded-md bg-[var(--dark-blue)] border border-[var(--electric-blue)]/30 flex items-center gap-2">
          <Film size={14} className="text-[var(--lime)] shrink-0" />
          <span className="text-xs text-[var(--cream)] truncate flex-1">{currentUrl}</span>
          <button onClick={() => onUpload("")} className="text-red-400 hover:text-red-300 cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

      {uploading && (
        <div className="mb-2">
          <div className="h-2 rounded-full bg-[var(--electric-blue)]/20 overflow-hidden">
            <div
              className="h-full bg-[var(--lime)] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-[var(--gray)] mt-1 block">%{progress} yüklendi</span>
        </div>
      )}

      {error && (
        <div className="mb-2 text-xs text-red-400 font-bold">{error}</div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--electric-blue)]/20 border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-xs font-bold hover:border-[var(--lime)] transition-all cursor-pointer disabled:opacity-50"
      >
        <Upload size={14} />
        {uploading ? "Yükleniyor..." : label}
      </button>
    </div>
  );
};
