import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | MindID",
  description: "MindID gizlilik politikası — kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
};

const GizlilikPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 leopard-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-2">
            Gizlilik Politikası
          </h1>
          <p className="text-sm text-[var(--gray)] mb-8">Son güncelleme: Mart 2026</p>

          <div className="space-y-6 text-sm text-[var(--cream)]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">1. Genel Bakış</h2>
              <p>
                MindID olarak gizliliğinize önem veriyoruz. Bu politika, mindid.shop web sitesini
                ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda kişisel bilgilerinizin
                nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">2. Toplanan Bilgiler</h2>
              <p>
                <strong>Sizin sağladığınız bilgiler:</strong> Sipariş formu aracılığıyla ad, e-posta,
                telefon, şirket adı, sektör ve proje detayları.
              </p>
              <p>
                <strong>Otomatik toplanan bilgiler:</strong> Google Analytics (GA4) aracılığıyla sayfa
                görüntüleme, oturum süresi, cihaz bilgisi ve genel konum verisi. IP adresiniz anonimleştirilir.
              </p>
              <p>
                <strong>Çerezler:</strong> Dil tercihinizi (lang) saklamak için birinci taraf çerez,
                analiz için Google Analytics çerezleri kullanılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">3. Bilgilerin Kullanımı</h2>
              <p>
                Topladığımız bilgiler; hizmet taleplerinizi işlemek, sizinle iletişime geçmek,
                teklif hazırlamak, web sitesini iyileştirmek ve yasal yükümlülüklerimizi yerine
                getirmek amacıyla kullanılır. Bilgileriniz hiçbir koşulda üçüncü taraflara
                pazarlama amacıyla satılmaz veya kiralanmaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">4. Veri Güvenliği</h2>
              <p>
                Verileriniz Firebase (Google Cloud) altyapısında, endüstri standardı şifreleme
                (SSL/TLS) ile korunmaktadır. Erişim yetkileri sınırlandırılmış olup düzenli
                güvenlik denetimleri yapılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">5. Üçüncü Taraf Hizmetler</h2>
              <p>
                Web sitemiz aşağıdaki üçüncü taraf hizmetleri kullanmaktadır:
                Google Analytics (analiz), Firebase (veritabanı ve hosting),
                Netlify (web sitesi dağıtımı), WhatsApp Business (iletişim).
                Her biri kendi gizlilik politikasına tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">6. Haklarınız</h2>
              <p>
                Kişisel verilerinize erişim, düzeltme, silme veya işlenmesini kısıtlama
                talep edebilirsiniz. Talepleriniz için info@mindid.shop adresinden bize ulaşabilirsiniz.
                KVKK kapsamındaki detaylı haklarınız için KVKK Aydınlatma Metnimizi inceleyiniz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">7. Politika Değişiklikleri</h2>
              <p>
                Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada
                yayınlanır ve &quot;Son güncelleme&quot; tarihi güncellenir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">8. İletişim</h2>
              <p>
                Gizlilik politikamız hakkında sorularınız için: <strong>info@mindid.shop</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GizlilikPage;
