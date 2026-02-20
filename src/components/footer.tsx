"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t-3 border-[var(--lime)] bg-[var(--dark-blue)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="MindID -Lab Technology"
              width={120}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-[var(--gray)]">
            &copy; {new Date().getFullYear()} MindID -Lab Technology. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
