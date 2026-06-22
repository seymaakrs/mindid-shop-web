# Yardimci Dosyalar Klasoru (src/lib)

Bu klasor sitenin "arka mutfagi" — sayfalar buradaki araclari kullanarak calisir.

## Dosya Rehberi (Ne nerede?)
- `firebase.ts` → Firebase baglantisi. Tum veritabani islemleri buradan baslar.
- `i18n.tsx` → Ceviri sistemi. Sitedeki Turkce/Ingilizce/Ispanyolca metinler burada.
- `firestore-types.ts` → Veritabanindaki veri yapilari (musteri, uretim, blog vs.)
- `plans-data.ts` → SaaS planlari (Free/Starter/Growth/Scale), kredi paketleri, jenerasyon maliyetleri.
- `credits.ts` → Kredi tahsis, harcama, geri ode islemleri.
- `payment.ts` ve `payments/` → Provider-agnostik odeme altyapisi (Iyzico/Stripe).
- `template-data.ts` → Hazir AI uretim sablonlari.
- `auth-context.tsx` → Kullanici giris kontrolu (Firebase Auth).
- `cn.ts` → Tailwind class birlestirme araci (teknik, dokunma).
- `tracking.ts`, `analytics-service.ts` → Olcumleme.
- `blog-server.ts` → Blog yazilarini ceken sistem.

## Onemli Kural
- Plan/fiyat degisikligi: `plans-data.ts` dosyasini duzenle.
- Yeni ceviri: `i18n.tsx` dosyasina ekle.
- Veritabanina yeni alan: `firestore-types.ts` dosyasini guncelle.

## hooks/ Alt Klasoru
- `use-firestore.ts` → Public veri (faq, team, blog, generations) cekme araclari.
- `use-customer.ts` → Giris yapan kullanicinin uretimleri, bildirimleri, odemeleri.
