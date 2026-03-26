# Sayfalar Klasoru (src/app)

Bu klasor web sitesindeki tum SAYFALARI iceriyor. Her klasor = bir sayfa.

## Basit Rehber
- Yeni sayfa eklemek istiyorsan: Klasor olustur, icine `page.tsx` koy.
- Her sayfada baslik ve aciklama (metadata) tanimla — Google'da dogru gozukmesi icin onemli.
- Admin sayfalari ozel korunuyor — giris yapmadan erisemezsin.

## Sayfa Listesi
- `/` → Anasayfa (hero, hizmetler, referanslar, SSS)
- `/about` → Hakkimizda
- `/avatar` → Avatar olusturma
- `/blog` → Blog listesi
- `/blog/[slug]` → Blog yazisi detayi
- `/portfolio` → Portfolyo listesi
- `/portfolio/[slug]` → Portfolyo detayi
- `/configure/[serviceId]` → Hizmet yapilandirici (fiyat hesaplama)
- `/ai-vs-traditional` → AI vs Geleneksel karsilastirma
- `/e-commerce` → E-ticaret urun gorseli
- `/how-it-works` → Nasil calisir
- `/admin` → Yonetim paneli (giris gerekli)

## Dil Destegi
Site Turkce ve Ingilizce calisiyor. `/en/` ile baslayan adresler Ingilizce versiyonu gosterir.
Ceviri dosyasi: `src/lib/i18n.tsx` — yeni metin eklersen buraya da ekle.
