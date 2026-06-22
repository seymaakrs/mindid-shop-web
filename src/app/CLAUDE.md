# Sayfalar Klasoru (src/app)

Bu klasor SaaS platformundaki tum SAYFALARI iceriyor. Her klasor = bir sayfa.

## Basit Rehber
- Yeni sayfa eklemek istiyorsan: Klasor olustur, icine `page.tsx` koy.
- Her sayfada baslik ve aciklama (metadata) tanimla — Google'da dogru gozukmesi icin onemli.
- Admin sayfalari ozel korunuyor — giris yapmadan erisemezsin.
- Dashboard sayfalari CustomerGuard ile korunuyor — sadece giris yapan kullanicilar gorebilir.

## Sayfa Listesi
- `/` → Anasayfa (hero, ozellikler, sablon vitrin, fiyatlar, yorumlar, SSS)
- `/about` → MindID Ne Yapar?
- `/blog` → Blog listesi
- `/blog/[slug]` → Blog yazisi detayi
- `/templates` → Sablon galerisi
- `/login`, `/register` → Giris / kayit
- `/sifremi-unuttum` → Sifre sifirlama

### Ozellik / Use-case sayfalari
- `/ai-reklam-filmi` → AI Video stüdyosu
- `/ai-gorsel` → AI Görsel stüdyosu
- `/avatar` → Dijital Avatar
- `/e-commerce` → E-ticaret kullanim senaryosu

### Kullanici paneli (dashboard)
- `/dashboard` → Hosgeldin + ozet + son uretimler
- `/dashboard/files` → Tamamlanan uretimlerin dosyalari
- `/dashboard/credits` → Kredi bakiyesi ve sat
- `/dashboard/billing` → Plan ve odeme
- `/dashboard/analytics` → Kullanim analitigi
- `/dashboard/notifications` → Bildirimler
- `/dashboard/settings` → Hesap ayarlari

### Admin paneli (sadece adminler)
- `/admin` → Dashboard
- `/admin/analytics` → Site analitigi
- `/admin/customers` → Musteriler
- `/admin/leads` → Lead'ler
- `/admin/blog` → Blog yonetimi
- `/admin/faq` → SSS yonetimi
- `/admin/hero` → Hero / video
- `/admin/about` → Hakkimizda
- `/admin/avatar` → Avatar ornekleri
- `/admin/settings` → Ayarlar

### Yasal
- `/gizlilik`, `/kvkk`, `/kullanim-kosullari`

## Dil Destegi
Site Turkce ve Ingilizce calisiyor. `/en/` ile baslayan adresler Ingilizce versiyonu gosterir.
Ceviri dosyasi: `src/lib/i18n.tsx` — yeni metin eklersen buraya da ekle.

## SaaS Plan Yapisi
Planlar: Free / Starter / Growth / Scale. Detaylar `src/lib/plans-data.ts` icinde.
Kredi sistemi: `src/lib/credits.ts` ile yonetilir.
