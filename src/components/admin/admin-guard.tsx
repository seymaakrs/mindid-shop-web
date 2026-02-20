"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { LoadingSpinner } from "./loading-spinner";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user || !isAdmin) return null;

  return <>{children}</>;
};
