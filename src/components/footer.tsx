"use client";

import { useI18n } from "@/lib/i18n";
import { Clapperboard } from "lucide-react";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t-3 border-[var(--lime)] bg-[var(--dark-blue)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[var(--lime)]">
              <Clapperboard size={16} className="text-[var(--dark-blue)]" />
            </div>
            <span className="font-bold text-[var(--cream)]">
              Mind<span className="text-[var(--lime)]">ID</span>
            </span>
          </div>
          <p className="text-sm text-[var(--gray)]">
            &copy; {new Date().getFullYear()} MindID. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
