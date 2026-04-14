import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | slowdays",
  description: "slowdays KVKK (6698 Sayılı Kişisel Verilerin Korunması Kanunu) kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  alternates: {
    canonical: "https://mindid.shop/kvkk",
  },
};

const KVKKPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 leopard-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black text-[var(--cream)] mb-2">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-sm text-[var(--gray)] mb-8">Son güncelleme: Mart 2026</p>

          <div className="prose-legal space-y-6 text-sm text-[var(--cream)]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">1. Veri Sorumlusu</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, slowdays (&quot;Şirket&quot;) olarak,
                veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında işlemekteyiz.
              </p>
              <p>
                <strong>Şirket Bilgileri:</strong> slowdays — İstanbul, Türkiye<br />
                <strong>İletişim:</strong> info@mindid.shop
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">2. İşlenen Kişisel Veriler</h2>
              <p>Web sitemiz ve hizmetlerimiz kapsamında aşağıdaki kişisel veriler işlenmektedir:</p>
              <p>
                <strong>Kimlik Bilgileri:</strong> Ad, soyad, şirket adı.
                <strong> İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.
                <strong> Hizmet Bilgileri:</strong> Seçilen hizmet türü, bütçe tercihi, proje detayları.
                <strong> Teknik Bilgiler:</strong> IP adresi, tarayıcı bilgisi, çerez verileri (Google Analytics).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">3. Verilerin İşlenme Amaçları</h2>
              <p>
                Kişisel verileriniz; hizmet talebinizin alınması ve işlenmesi, sizinle iletişime geçilmesi,
                teklif hazırlanması, sözleşme süreçlerinin yürütülmesi, yasal yükümlülüklerin yerine getirilmesi,
                hizmet kalitesinin artırılması ve web sitesi kullanım analizleri amacıyla işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">4. Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz; yasal zorunluluklar kapsamında yetkili kamu kurum ve kuruluşlarına,
                hizmet sağlayıcılarımıza (Firebase/Google Cloud, Netlify) ve iş ortaklarımıza aktarılabilir.
                Verileriniz yurt dışına aktarılması halinde KVKK&apos;nın 9. maddesi kapsamında gerekli tedbirler alınmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">5. Veri Saklama Süresi</h2>
              <p>
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri
                kapsamında muhafaza edilir. Amacın ortadan kalkması halinde veriler silinir, yok edilir veya anonim hale getirilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">6. Haklarınız (KVKK Madde 11)</h2>
              <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
              <p>
                Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme,
                işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
                yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
                eksik veya yanlış işlenmişse düzeltilmesini isteme,
                KVKK&apos;nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme,
                düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,
                münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme
                ve kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.
              </p>
              <p>
                Başvurularınızı <strong>info@mindid.shop</strong> adresine yazılı olarak iletebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KVKKPage;
