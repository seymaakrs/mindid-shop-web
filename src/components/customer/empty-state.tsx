import type { ComponentType, ReactNode } from "react";

type Props = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description?: string;
  action?: ReactNode;
};

export const EmptyState = ({ icon: Icon, title, description, action }: Props) => (
  <div className="text-center py-12 md:py-16">
    <div className="relative w-20 h-20 mx-auto mb-5">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--lime)]/30 to-[var(--electric-blue)]/30 blur-xl" />
      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--lime)]/20 to-[var(--electric-blue)]/10 border border-[var(--lime)]/20 flex items-center justify-center">
        <Icon size={32} className="text-[var(--lime)]" />
      </div>
    </div>
    <h3 className="text-base font-bold text-white mb-1">{title}</h3>
    {description && <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">{description}</p>}
    {action}
  </div>
);

type SkeletonProps = {
  rows?: number;
  variant?: "row" | "card";
};

export const SkeletonList = ({ rows = 3, variant = "row" }: SkeletonProps) => {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-2 w-16 bg-white/5 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/5 rounded" />
              <div className="h-2 w-2/3 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl p-4 animate-pulse">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="h-3 w-32 bg-white/5 rounded" />
              <div className="h-2 w-20 bg-white/5 rounded" />
            </div>
          </div>
          <div className="h-5 w-16 bg-white/5 rounded-full" />
        </div>
      ))}
    </div>
  );
};
