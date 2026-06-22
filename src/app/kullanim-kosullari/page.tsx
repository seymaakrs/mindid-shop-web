import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | MindID",
  description: "MindID self-service AI içerik üretim platformu kullanım koşulları, abonelik, kredi ve ticari kullanım hakları.",
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
          <p className="text-sm text-[var(--gray)] mb-8">Son güncelleme: Haziran 2026</p>

          <div className="space-y-6 text-sm text-[var(--cream)]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">1. Genel Hükümler</h2>
              <p>
                Bu web sitesine (mindid.shop) ve MindID platformuna kayıt olarak, içerik üreterek
                veya hizmetlerden yararlanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
                MindID, bu koşulları önceden bildirimde bulunmaksızın güncelleme hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">2. Hizmet Tanımı</h2>
              <p>
                MindID; markaların ve içerik üreticilerin AI video, AI görsel, dijital avatar ve
                sosyal medya içeriklerini self-service olarak tarayıcıdan üretebilmelerini sağlayan
                bir SaaS platformudur. Kullanıcılar üyelik açar, kredi paketi veya aylık plan
                satın alır ve şablonlardan ya da prompt&apos;tan içerik üretir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">3. Hesap ve Üyelik</h2>
              <p>
                Hizmetlerimizden yararlanabilmek için 18 yaşını doldurmuş olmanız ve doğru bilgilerle
                hesap açmanız gerekir. Hesap güvenliğinden (şifre, oturum) kullanıcı sorumludur.
                MindID, ihlal halinde hesabı askıya alabilir veya kapatabilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">4. Planlar, Krediler ve Ödeme</h2>
              <p>
                MindID; Ücretsiz, Başlangıç, Büyüme ve Ölçek olmak üzere dört plan sunar.
                Her plan aylık kredi tahsisi içerir; her AI üretimi çıktının türüne göre kredi
                tüketir. Aylık ve yıllık ödeme seçenekleri mevcuttur; yıllık planda iki ay
                hediye edilir. Ek kredi paketleri istenildiği zaman satın alınabilir ve süresizdir.
                Ödemeler banka havalesi/EFT ve kredi kartı (Iyzico) ile yapılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">5. İptal ve İade</h2>
              <p>
                Aboneliğini hesap paneli üzerinden istediğin zaman iptal edebilirsin. İptal
                sonrasında fatura döneminin sonuna kadar plan ayrıcalıkların devam eder, yeni bir
                ücret tahsil edilmez. Tüketilmiş kredilerin ve yayına çıkmış üretimlerin parası
                iade edilmez. Yıllık planda 14 gün cayma hakkın vardır (henüz kredi
                kullanılmamış olması koşuluyla).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">6. Fikri Mülkiyet ve Ticari Kullanım</h2>
              <p>
                Ücretli planlarda (Başlangıç ve üstü) ürettiğin tüm içeriklerin ticari kullanım
                hakkı sana aittir; reklam, sosyal medya, e-ticaret, kurumsal sunum dahil tüm
                amaçlarla sınırsız kullanabilirsin. Ücretsiz planda üretilen çıktılar watermark
                içerir ve yalnızca test amaçlıdır. MindID şablonları, marka kimliği ve platform
                yazılımı MindID&apos;in fikri mülkiyetidir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">7. Kabul Edilebilir Kullanım</h2>
              <p>
                MindID&apos;i; yasa dışı içerik, telifli karakterlerin izinsiz kullanımı, başkasının
                yüzü ve sesiyle aldatıcı materyal (deepfake), nefret söylemi, çocuklara zararlı
                içerik veya cinsel içerik üretmek için kullanamazsın. Bu kuralları ihlal eden
                hesaplar uyarı yapılmadan askıya alınır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">8. Yapay Zeka İçerik Bildirimi</h2>
              <p>
                MindID çıktıları yapay zeka teknolojileri ile üretilmektedir. AI ile üretilen
                içeriklerin reklamcılıkta kullanımına dair mevzuat ülkelere göre değişebilir;
                yayın yapılan platformun şartlarına uyum (etiketleme, ifşa) kullanıcının
                sorumluluğundadır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">9. Sorumluluk Sınırı</h2>
              <p>
                MindID platformunun kesintisiz çalışacağı garanti edilmez. Plan değişiklikleri,
                kuyruk gecikmeleri veya geçici servis durmaları olabilir. MindID&apos;in
                kullanıcıya karşı toplam sorumluluğu, son 12 ayda alınan plan/kredi bedelini
                aşamaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">10. Uygulanacak Hukuk</h2>
              <p>
                Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda
                İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--lime)] mb-3">11. İletişim</h2>
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
