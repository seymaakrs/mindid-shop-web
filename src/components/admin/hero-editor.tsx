"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { VideoUpload } from "./video-upload";
import { Save, Check } from "lucide-react";

export const HeroEditor = () => {
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "mindid_settings", "general"));
        if (snap.exists()) {
          setHeroVideoUrl(snap.data().heroVideoUrl ?? "");
        }
      } catch {
        // empty
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    await setDoc(doc(db, "mindid_settings", "general"), { heroVideoUrl }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="text-[var(--gray)]">Yükleniyor...</div>;

  return (
    <div>
      <h2 className="text-xl font-black text-[var(--cream)] mb-6">Hero / Tanıtım Videosu</h2>

      <div className="max-w-lg space-y-4">
        <VideoUpload
          storagePath="mindid-site/hero/intro-video.mp4"
          currentUrl={heroVideoUrl}
          onUpload={setHeroVideoUrl}
          label="Tanıtım Videosu Yükle"
        />

        <div>
          <label className="block text-xs font-bold text-[var(--gray)] mb-1">Veya Video URL</label>
          <input
            value={heroVideoUrl}
            onChange={(e) => setHeroVideoUrl(e.target.value)}
            className="w-full p-2.5 rounded-md bg-[var(--dark-blue)] border-2 border-[var(--electric-blue)]/30 text-[var(--cream)] text-sm focus:border-[var(--lime)] focus:outline-none"
            placeholder="https://..."
          />
        </div>

        {heroVideoUrl && (
          <div className="rounded-md overflow-hidden border-3 border-[var(--electric-blue)]/20">
            <video src={heroVideoUrl} controls className="w-full" />
          </div>
        )}

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] font-bold text-sm cursor-pointer hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </div>
    </div>
  );
};
