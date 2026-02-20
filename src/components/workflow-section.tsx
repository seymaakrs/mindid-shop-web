import {
  FileText,
  Palette,
  Film,
  Wand2,
  Send,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: <FileText size={20} />,
    title: "On Hazirlik",
    description: "Brief & hedef belirleme, senaryo onay sureci",
    color: "var(--primary)",
  },
  {
    icon: <Palette size={20} />,
    title: "Gorsel & Ses Uretimi",
    description: "AI ile sahne tasarimi, ses klonlama & diyalog",
    color: "var(--accent)",
  },
  {
    icon: <Film size={20} />,
    title: "Video Uretimi",
    description: "Gorselden videoya donusum, dudak senkronu",
    color: "var(--primary)",
  },
  {
    icon: <Wand2 size={20} />,
    title: "Post-Produksiyon",
    description: "Kurgu, VFX, renk duzenleme & atmosfer",
    color: "var(--accent)",
  },
  {
    icon: <Send size={20} />,
    title: "Teslim & Revizyon",
    description: "Taslak sunum, geri bildirim ve revizyonlar",
    color: "var(--primary)",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Nihai Teslimat",
    description: "Son film teslimati, tum formatlarda cikti",
    color: "var(--success)",
  },
];

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3 text-[var(--foreground)]">
            AI Film Uretim Is Akisi
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Brief&apos;ten nihai teslimata kadar profesyonel AI destekli
            produksiyon sureci
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/30 transition-colors group"
            >
              <div className="absolute -top-3 -left-1 text-xs font-mono text-[var(--muted)] bg-[var(--background)] px-2">
                0{i + 1}
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ backgroundColor: `color-mix(in srgb, ${step.color} 15%, transparent)`, color: step.color }}
              >
                {step.icon}
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
