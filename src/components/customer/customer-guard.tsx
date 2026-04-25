"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

export const CustomerGuard = ({ children }: { children: ReactNode }) => {
  const { user, isCustomer, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isCustomer)) {
      router.replace("/login");
    }
  }, [user, isCustomer, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--dark-blue)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--lime)]" />
          <p className="text-sm text-[var(--gray)]">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user || !isCustomer) return null;

  return <>{children}</>;
};
