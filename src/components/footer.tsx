import { Clapperboard } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
              <Clapperboard size={14} className="text-white" />
            </div>
            <span className="font-bold">
              Mind<span className="text-[var(--primary)]">ID</span>
            </span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            &copy; {new Date().getFullYear()} MindID. Tum haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  );
};
