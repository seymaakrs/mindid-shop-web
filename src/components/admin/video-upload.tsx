"use client";

import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, Film, X } from "lucide-react";

type VideoUploadProps = {
  storagePath: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
};

export const VideoUpload = ({ storagePath, currentUrl, onUpload, label = "Video Yükle" }: VideoUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      <label className="block text-xs font-bold text-[var(--gray)] mb-1.5">{label}</label>

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
