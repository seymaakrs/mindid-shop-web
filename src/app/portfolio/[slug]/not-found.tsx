import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const PortfolioNotFound = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-black text-[var(--lime)] mb-4">404</h1>
          <h2 className="text-xl font-bold text-[var(--cream)] mb-2">
            Proje Bulunamadı
          </h2>
          <p className="text-[var(--gray)] mb-6 max-w-md mx-auto">
            Aradığınız portfolyo projesi bulunamadı veya kaldırılmış olabilir.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/portfolio"
              className="px-5 py-2.5 rounded-md bg-[var(--lime)] text-[var(--dark-blue)] font-bold text-sm border-3 border-[var(--dark-blue)] shadow-[3px_3px_0px_var(--dark-blue)] hover:shadow-[1px_1px_0px_var(--dark-blue)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Portfolyoya Dön
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-md bg-transparent text-[var(--cream)] font-bold text-sm border-2 border-[var(--electric-blue)]/30 hover:border-[var(--lime)]/50 transition-colors"
            >
              Ana Sayfa
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PortfolioNotFound;
