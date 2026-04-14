import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | slowdays",
  description: "slowdays web sitesi ve hizmetlerinin kullanım koşulları, sorumluluklar ve yasal bilgilendirme.",
  alternates: {
    canonical: "https://mindid.shop/kullanim-kosullari",
  },
};

const KullanimKosullariPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 leopard-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-2">
            Kullanım Koşulları
          </h1>
          <p className="text-sm text-[var(--gray)] mb-8">Son güncelleme: Mart 2026</p>

          <div className="space-y-6 text-sm text-[var(--cream)]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">1. Genel Hükümler</h2>
              <p>
                Bu web sitesini (mindid.shop) kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
                slowdays, bu koşulları önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">2. Hizmet Tanımı</h2>
              <p>
                slowdays, yapay zeka teknolojileri kullanarak reklam filmi prodüksiyonu, dijital avatar
                oluşturma ve e-ticaret ürün görseli üretimi hizmetleri sunmaktadır. Web sitemiz
                bu hizmetler hakkında bilgi sağlar ve sipariş talebi almak amacıyla kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">3. Fiyatlandırma ve Ödeme</h2>
              <p>
                Web sitesinde gösterilen fiyatlar KDV hariç olup başlangıç fiyatlarıdır.
                Nihai fiyat, brief görüşmesi sonrası proje kapsamına göre belirlenir.
                Ödeme koşulları: Brief onayından sonra %50 ön ödeme, teslimat sonrası kalan %50.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">4. Fikri Mülkiyet</h2>
              <p>
                slowdays tarafından üretilen tüm içerikler (video, görsel, avatar) teslim ve tam
                ödeme sonrası müşteriye ait olur. Müşteri, teslim edilen içerikleri ticari
                amaçlarla sınırsız kullanabilir. slowdays, portfolyo ve referans amacıyla
                içerikleri kullanma hakkını saklı tutar (aksi sözleşmede belirtilmedikçe).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">5. Revizyon ve Teslimat</h2>
              <p>
                Her projede 2 adet ücretsiz revizyon hakkı dahildir. Ek revizyonlar ayrıca
                ücretlendirilir. Revizyonlar, ilk taslak tesliminden itibaren 14 gün içinde
                kullanılmalıdır. Teslimat süreleri proje kapsamına göre 3-30 iş günü arasında değişir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">6. İptal ve İade</h2>
              <p>
                Proje başlamadan önce yapılan iptallerde ön ödeme iade edilir. Prodüksiyon
                sürecine başlandıktan sonra yapılan iptallerde, tamamlanan iş oranında ücret
                hesaplanır. Teslim edilen ve onaylanan projelerde iade yapılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">7. Yapay Zeka İçerik Bildirimi</h2>
              <p>
                slowdays hizmetleri yapay zeka teknolojileri kullanılarak üretilmektedir.
                AI ile üretilen içerikler konusundaki telif hakkı mevzuatı gelişmekte olup,
                slowdays bu konuda güncel yasal gelişmeleri takip etmektedir. Detaylar için
                SSS bölümümüzü inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">8. Sorumluluk Sınırı</h2>
              <p>
                slowdays, web sitesinin kesintisiz çalışacağını garanti etmez. Hizmet
                kalitesi ve sonuçları konusunda makul düzeyde profesyonel özen gösterilir.
                slowdays&apos;nin sorumluluğu, alınan hizmet bedelini aşamaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">9. Uygulanacak Hukuk</h2>
              <p>
                Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda
                İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">10. İletişim</h2>
              <p>
                Kullanım koşulları hakkında sorularınız için: <strong>info@mindid.shop</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KullanimKosullariPage;
