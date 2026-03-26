# Yardimci Dosyalar Klasoru (src/lib)

Bu klasor sitenin "arka mutfagi" — sayfalar buradaki aracları kullanarak calisir.

## Dosya Rehberi (Ne nerede?)
- `firebase.ts` → Firebase baglantisi. Tum veritabani islemleri buradan baslar.
- `i18n.tsx` → Ceviri sistemi. Sitedeki Turkce/Ingilizce metinler burada.
- `types.ts` → Konfigurator seceneklerinin tanimlari (sure, senaryo, ses vs.)
- `firestore-types.ts` → Veritabanindaki veri yapilari (portfolyo, blog, siparis vs.)
- `pricing-data.ts` → Fiyat tablosu. Tum hizmet fiyatlari ve secenekleri burada.
- `portfolio-server.ts` → Portfolyo verilerini ceken sistem.
- `order-service.ts` → Musteri siparis gonderme sistemi.
- `cn.ts` → Goruntuyu birlestirme araci (teknik, dokunma).
- `auth-context.tsx` → Kullanici giris kontrolu.

## Onemli Kural
Fiyat degisikligi yapacaksan: `pricing-data.ts` dosyasini duzenle.
Yeni ceviri ekleyeceksen: `i18n.tsx` dosyasina ekle.
Veritabanina yeni alan ekleyeceksen: `firestore-types.ts` dosyasini guncelle.

## hooks/ Alt Klasoru
- `use-firestore.ts` → Veritabanindan veri cekme araci. Sayfalar bunu kullanir.
