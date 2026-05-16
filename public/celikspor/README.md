# Çelik Spor Kulübü Bandırma — Resmi Web Sitesi

Kadın Voleybol Takımı resmi web sitesi.

## Yapı

- `index.html` — Ana sayfa (hero slider, takım vurgusu, son haberler, sponsorlar)
- `hakkimizda.html` — Kulüp tarihi, değerler, teknik kadro
- `takim.html` — Kadro (filtrelenebilir)
- `fikstur.html` — Fikstür, sonuçlar, puan durumu
- `haberler.html` — Haberler ızgarası
- `sponsorlar.html` — Sponsorlar ve paydaşlar
- `iletisim.html` — İletişim
- `assets/` — CSS, JS, fotoğraflar, logolar
- `vercel.json` — Vercel deploy ayarları

## Yerelde çalıştırma

Statik bir site — bir HTTP sunucusu yeterli:

```bash
python3 -m http.server 8000
# veya
npx serve .
```

Sonra http://localhost:8000 aç.

## Deploy

Vercel'e bağlı: `main` branch'e push edildiğinde otomatik yayınlanır.

## Marka

- **Renkler**: #0D1B53 Lacivert, #D4AF37 Altın, #FFFFFF Beyaz, #CB102E Kırmızı, #6B7280 Gri
- **Fontlar**: Montserrat (başlık + gövde) + Caveat (el yazısı vurgu)
- **Slogan**: Yeni Sezon, Yeni Mücadele · Güçlü geçmiş, yeni gelecek
