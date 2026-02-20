"use client";

import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth-context";
import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <I18nProvider>{children}</I18nProvider>
    </AuthProvider>
  );
};
