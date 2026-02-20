import { Play, Zap, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-8">
          <Zap size={14} className="text-[var(--primary)]" />
          <span className="text-sm text-[var(--primary-light)]">
            AI Destekli Video Produksiyon
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Yapay Zeka ile{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Reklam Filmi
          </span>{" "}
          Uretimi
        </h1>

        <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10">
          8 saniyeden 5 dakikaya kadar, profesyonel AI reklam videolari.
          Suresini secin, parametreleri belirleyin, aninda fiyat alin.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Play size={16} className="text-[var(--primary)]" />
            8sn - 5dk video sureleri
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Zap size={16} className="text-[var(--accent)]" />
            AI gorsel & ses uretimi
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Shield size={16} className="text-[var(--success)]" />
            Profesyonel post-produksiyon
          </div>
        </div>

        <a
          href="#configurator"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Play size={18} />
          Videonuzu Yapilandirin
        </a>
      </div>
    </section>
  );
};
