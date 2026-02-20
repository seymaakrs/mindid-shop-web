import { Clapperboard } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
            <Clapperboard size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Mind<span className="text-[var(--primary)]">ID</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#configurator" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Konfigurator
          </a>
          <a href="#workflow" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Is Akisi
          </a>
          <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Hakkimizda
          </a>
        </nav>
        <a
          href="#configurator"
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          Hemen Basla
        </a>
      </div>
    </header>
  );
};
