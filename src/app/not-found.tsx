import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center leopard-pattern">
        <div className="text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black text-[var(--lime)] mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--cream)] mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-[var(--gray)] mb-8 max-w-md mx-auto">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--lime)] text-[var(--dark-blue)] font-bold rounded-full hover:brightness-110 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
