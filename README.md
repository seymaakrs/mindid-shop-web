# 🐯 03-mindid-shop

**Domain:** mindid.shop
**Vizyon:** AI Reklam Filmi + Avatar + Ürün Görseli SaaS · Kaplan gibi avlanır
**Stack:** Next.js 15 + Firebase (Firestore + Functions)
**Durum:** ✅ CANLI (brand isim düzeltmesi bekliyor)

## Hızlı Başlangıç

```bash
cd "03-mindid-shop"

# Bağımlılıkları kur
npm install

# Firebase login
firebase login

# Dev server
npm run dev

# Canlıda göz at
open https://mindid.shop
```

## Önemli Dosyalar

- [BRAND.md](BRAND.md) — Kaplan yeşili tema, vizyon, ürünler
- [CLAUDE.md](CLAUDE.md) — Proje kural kitabı
- [SITE-GECMIS-OZET.md](SITE-GECMIS-OZET.md) — Geçmiş özeti
- `firebase.json`, `firestore.rules` — Firebase config
- `functions/` — Cloud Functions (ödeme, email)
- `package.json`, `next.config.ts` — Next.js

## ⚠️ YARINKİ ACİL İŞ: Marka İsmi Düzeltmesi

Site içinde **"slowdays"** yazan yerler **"mindid"** olacak:
```bash
# Dosyaları tara
grep -rn "slowdays" app/ components/ --exclude-dir=node_modules

# Toplu değiştir (dikkatli — önce görüntüle, sonra uygula)
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's/slowdays/mindid/g' {} +
```

## Diğer Projeler (Ayrı!)

- 🚫 slowdaysai.com — farklı marka, ayrı proje
- 🚫 mindidai.com — AI Nöron Blog, ayrı proje
- Firebase: mindid-shop-prod (bu projeye özel)

Koordinasyon: `vizyoner-startup-web-sitesi/19-3-DOMAIN-EKOSISTEM-MASTER.md`
