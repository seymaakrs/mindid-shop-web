"use client";

import { useI18n } from "@/lib/i18n";
import { useTeam } from "@/lib/hooks/use-firestore";
import { ArrowLeft, Clapperboard, Brain, Palette, Volume2, BarChart3, Users, Camera, Code, Megaphone, Lightbulb } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

// Icon mapping for Firestore data
const iconMap: Record<string, ReactNode> = {
  Brain: <Brain size={20} />,
  Palette: <Palette size={20} />,
  Volume2: <Volume2 size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Camera: <Camera size={20} />,
  Code: <Code size={20} />,
  Megaphone: <Megaphone size={20} />,
  Lightbulb: <Lightbulb size={20} />,
};

// Hardcoded fallback
const fallbackTeam = [
  { role: "AI & Teknoloji", icon: <Brain size={20} />, desc: "Yapay zeka modelleri ve teknik altyapi" },
  { role: "Yaratici Yonetim", icon: <Palette size={20} />, desc: "Gorsel dil, hikaye ve marka stratejisi" },
  { role: "Ses & Muzik", icon: <Volume2 size={20} />, desc: "Ses tasarimi, muzik produksiyon ve mix" },
  { role: "Dijital Pazarlama", icon: <BarChart3 size={20} />, desc: "Performans analizi ve kampanya optimizasyonu" },
];

export const AboutPage = () => {
  const { t, lang } = useI18n();
  const { data: firestoreTeam } = useTeam();

  const useFirestore = firestoreTeam.length > 0;

  const teamMembers = useFirestore
    ? firestoreTeam.map((m) => ({
        role: lang === "en" ? m.roleEn || m.role : m.role,
        icon: iconMap[m.iconName] ?? <Brain size={20} />,
        desc: lang === "en" ? m.descriptionEn || m.description : m.description,
      }))
    : fallbackTeam;

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] hover:underline mb-6 text-sm font-bold">
          <ArrowLeft size={16} /> Ana Sayfa
        </Link>

        {/* Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-md bg-[var(--lime)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] flex items-center justify-center">
            <Clapperboard size={28} className="text-[var(--dark-blue)]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[var(--cream)]">
              Mind<span className="text-[var(--lime)]">ID</span>{" "}
              <span className="text-[var(--lime)]">Ne Yapar?</span>
            </h1>
            <p className="text-sm text-[var(--gray)]">{t("about.subtitle")}</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 rounded-lg bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 mb-10 animate-kinetic-slide">
          <p className="text-[var(--cream)]/90 leading-relaxed">
            {t("about.desc")}
          </p>
        </div>

        {/* What we do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { title: "AI Video Uretimi", desc: "Senaryo yaziminda son montaja kadar tum surecte yapay zeka destekli profesyonel video produksiyon." },
            { title: "Marka Hikayeleri", desc: "Markanizin DNA'sina uygun, duygusal bag kuran sinematik icerikler uretiyoruz." },
            { title: "Dijital Reklam", desc: "Tum platformlara optimize edilmis, donusum odakli reklam videolari." },
            { title: "AI Avatar", desc: "Dijital temsilcinizi olusturuyor, surekli icerik uretimini mumkun kiliyoruz." },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-md bg-[var(--dark-blue)] border-3 border-[var(--lime)]/20 hover:border-[var(--lime)] transition-colors animate-shimmer">
              <h3 className="font-black text-[var(--lime)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--cream)]/70">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-2xl font-black text-[var(--lime)] mb-6 flex items-center gap-2">
          <Users size={24} /> {t("about.team")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {teamMembers.map((member, i) => (
            <div key={i} className="p-4 rounded-md bg-[var(--card)] border-3 border-[var(--electric-blue)]/20 flex items-start gap-3 hover:border-[var(--lime)]/40 transition-colors">
              <div className="w-10 h-10 rounded-md bg-[var(--lime)]/10 flex items-center justify-center text-[var(--lime)] shrink-0">
                {member.icon}
              </div>
              <div>
                <h4 className="font-bold text-[var(--cream)] text-sm">{member.role}</h4>
                <p className="text-xs text-[var(--gray)] mt-0.5">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#services"
            className="inline-flex px-8 py-4 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] border-3 border-[var(--dark-blue)] shadow-[4px_4px_0px_var(--dark-blue)] font-black hover:shadow-[2px_2px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Hizmetleri Incele &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
