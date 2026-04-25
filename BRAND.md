# 🐯 mindid.shop — Marka Kimliği

**Domain:** mindid.shop
**Repo:** github.com/seymaakrs/mindid-shop-web (public)
**Durum:** ✅ CANLI (Next.js + Firebase)
**Son güncelleme:** 25.04.2026

---

## 🎯 VİZYON

> "Kaplan gibi avlanır, AI gibi üretir."
>
> **AI Reklam Filmi + Avatar + Ürün Görseli SaaS'ı.** Manken ve stüdyo masrafı olmadan %70 daha az maliyetle stüdyo kalitesinde sonuçlar. Müşteri bir sanal katalog önünde dolaşıyor, paket seçiyor, AI üretimini alıyor.

**Hedef kitle:** E-ticaret sahipleri, küçük işletmeler, bağımsız markalar (1.490₺'den başlayan fiyat)

---

## 🎨 RENK PALETİ (Kaplan Yeşili Tema)

```
Ana Arkaplan:    #100a2c  (deep space navy)
Koyu:            #0d0825  (night black)
Gece:            #1c1242  (shadow violet)
Orta:            #251860  (cosmic purple)

⭐ ACCENT (ana renk):
Kaplan Yeşili:   #ade94f  (LIME — parlak kaplan gözü)

Diğer tonlar:
Nebula Purple:   #1a1240
Deep Violet:     #2a1a5e
```

**Metafor:** Karanlık ormanda pusuya yatmış kaplan — gözlerde parlak yeşil. Agresif, hızlı, lüks.

## 🔤 TİPOGRAFI

- **Mevcut kurulum** (package.json'da kontrol edilecek)
- Tech stack: Next.js default fonts

## ⚙️ TEKNOLOJI STACK (Mevcut)

- **Framework:** Next.js 15
- **Host:** Netlify
- **Backend:** Firebase (Firestore + Auth + Cloud Functions)
- **Payment:** (TBD — iyzico/Stripe?)
- **Email:** Resend + Firebase Functions

## 📁 YAPI (Mevcut)

```
03-mindid-shop/
├── CLAUDE.md                        (proje kural kitabı)
├── SITE-GECMIS-OZET.md              (geçmiş özeti)
├── package.json / next.config.ts
├── firebase.json / firestore.rules  (Firebase config)
├── firestore.indexes.json
├── functions/                       (Cloud Functions)
├── gunluk-degisiklik-raporu-*.md    (11+ günlük rapor)
└── (Next.js proje dosyaları)
```

## ⚠️ MARKA ISIM DÜZELTMESI

**ŞU AN SİTE "slowdays" DİYOR AMA DOMAIN "mindid.shop"!**

Bu gece/yarın düzeltilecek:
- [ ] Site içindeki tüm "slowdays" → "mindid" değiştir
- [ ] Logo güncelle (kaplan temalı, lime accent'li)
- [ ] E-posta: hello@mindid.shop (veya shop@mindid.com?)
- [ ] Meta title/description güncelle

## 📦 ÜRÜNLER (Mevcut)

1. **AI Reklam Filmi** — 1.490₺'den
2. **Dijital Avatar** — (fiyat kontrol)
3. **E-ticaret Ürün Görseli** — (fiyat kontrol)

Her pakette: manken + stüdyo maliyeti yok, %70 tasarruf, stüdyo kalitesi.

## ✋ DOKUNULMAZ KURALLAR

1. **Kaplan yeşili** (#ade94f) ana marka rengi — değiştirilmez
2. **Agresif + hızlı** ton (kaplan gibi)
3. **Fiyat şeffaf** — gizleme, her paket net fiyat
4. **Next.js App Router** — mevcut yapı korunur
5. **Firebase veritabanı** — mindid-shop'a özel (ayrı proje)

## 🔗 BAĞLANTI AYRILIĞI

- ❌ Veri çekme YOK: slowdaysai.com veya mindidai.com'dan veri çekmez
- ❌ Database: mindid-shop-prod Firebase (AYRI proje)
- ❌ Auth: mindid.shop'un kendi kullanıcı havuzu
- ❌ Ürün catalog: bu repoya özel
- ✅ Outbound marketing linkler: sosyal medya, slowdaysai referansı (opsiyonel)

## ⏳ YOL HARİTASI

### Yakın (Bu Hafta)
- [ ] Site içindeki "slowdays" → "mindid" brand güncellemesi
- [ ] Kaplan logosu tasarla/ekle
- [ ] Firebase proje isolation doğrula
- [ ] README.md + environment dokümantasyonu

### Orta Vade
- [ ] Ödeme entegrasyonu (iyzico veya Stripe)
- [ ] Müşteri paneli (sipariş takibi)
- [ ] Kaplan mascot animasyonu (Framer Motion)
- [ ] Demo galerisi (önceki işler)

### Uzun Vade
- [ ] Blog (marka hikayesi)
- [ ] Etki studyosu (case studies)
- [ ] API (developer'lar için — ileride)
