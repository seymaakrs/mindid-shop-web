# MindID.shop — SEO & GEO Odaklı Geliştirme Planı v2.0

> Son Güncelleme: 21 Mart 2026 | Hazırlayan: Claude (Cowork) + Seyma
> Strateji: Global Pazar | Tüm AI Motorları | Blog + Portföy Aktif

---

## Vizyon

MindID.shop, yapay zeka ile **reklam filmleri**, **AI avatar oluşturma** ve **ürün görseli üretimi** yapan bir dijital prodüksiyon ajansıdır.

**3 Ana Hizmet Alanı:**
1. **AI Reklam Filmleri** — Reels, ürün reklamı, kampanya filmi, kurumsal tanıtım
2. **AI Avatar Oluşturma** — Dijital sunucu, marka yüzü, influencer avatar
3. **AI Ürün Görseli** — E-ticaret siteleri için manken ve stüdyo masrafı olmadan, %70 daha az maliyetle stüdyo kalitesinde ürün fotoğrafları

**Hedef:** Google'da ve tüm AI arama motorlarında (ChatGPT, Perplexity, Gemini, Google AI Overview, Copilot) bu hizmetleri arayan global müşterilere ulaşmak.

**İş Modeli:** Müşteri → Hizmeti seçer → Fiyatı görür → Formu doldurur → Ön sipariş tamamlar → Seyma'ya mail gider → İletişim başlar.

---

## Stratejik Kararlar (Onaylandı)

| Karar | Seçim |
|---|---|
| Hedef Pazar | Global (EN öncelikli + TR) |
| Sektör | Karma — tüm sektörlere açık |
| Sipariş Akışı | Fiyat gör + Form doldur (mevcut sistem) |
| GEO Kapsamı | Tüm AI motorları (SGE, ChatGPT, Perplexity, Gemini, Copilot) |
| Fiyatlandırma | Mevcut 6 hizmet + fiyatlar korunacak |
| Blog | Evet — organik trafik ve GEO alıntılama için |
| Portföy | Mevcut çalışmalar yüklenecek |
| Tasarım | Neo-Brutalist stil korunacak |

---

## Mevcut Durum Özeti

| Alan | Durum | Not |
|---|---|---|
| Ana sayfa (Hero, Hizmetler, Yorumlar, SSS) | ✅ Var | Çalışıyor |
| Konfigüratör (configure/[serviceId]) | ✅ Var | 6 hizmet, fiyat hesaplama aktif |
| Müşteri formu + dosya yükleme | ✅ Var | 50MB'a kadar |
| Sipariş → Firestore kayıt | ✅ Var | Çalışıyor |
| Admin paneli | ✅ Var | Sipariş, fiyat, portfolyo, SSS |
| Portföy sayfası | ✅ Var | İçerik yüklenecek |
| i18n (TR/EN) | ⚠️ Kısmen | Çeviri var, EN routing bozuk |
| **E-posta bildirimi** | ❌ **EKSİK** | En kritik eksik — sipariş kaçırılıyor |
| **SEO meta (sayfa bazlı)** | ❌ Eksik | Sadece genel metadata |
| **Schema.org structured data** | ❌ Eksik | GEO için şart |
| **Sitemap.xml / Robots.txt** | ❌ Eksik | Arama motorları tarayamıyor |
| **Blog sistemi** | ❌ Yok | SEO + GEO için en güçlü silah |
| **llms.txt** | ❌ Yok | AI botlar için site açıklaması |
| **OG / Twitter kartları** | ❌ Eksik | Sosyal paylaşım önizlemesi yok |
| **Git merge conflict** | ❌ Bekliyor | firestore-types.ts, use-firestore.ts |

---

## FAZ 0 — Teknik Borç Temizliği (Gün 1)

> Hiçbir şey başlamadan önce yapılacak.

### 0.1 Git Merge Conflict Çözümü
- `src/lib/firestore-types.ts` — HEAD vs 023be1b çakışması
- `src/lib/hooks/use-firestore.ts` — HEAD vs 023be1b çakışması
- Merge commit atılacak, remote ile senkronize edilecek

---

## FAZ 1 — Kritik Altyapı (Hafta 1-2)

> Site ziyaretçi alıyor ama sipariş maili gelmiyor. Önce bunu çözüyoruz.

### 1.1 E-posta Bildirimi (Firebase Functions + Resend)

**Problem:** Müşteri sipariş bırakıyor, Seyma'ya hiç mail gelmiyor.

**Akış:**
```
Müşteri formu gönderir
  → Firestore'a order yazılır
  → Firebase Functions tetiklenir (onDocumentCreated)
  → Resend API ile seymaakrs@gmail.com'a detaylı sipariş maili gider
  → Müşteriye onay maili gider: "Siparişinizi aldık, 24 saat içinde dönüyoruz"
```

**Seyma'ya Gidecek Mail İçeriği:**
- Müşteri adı, e-posta, telefon
- Seçilen hizmet + konfigürasyon detayları
- Toplam fiyat (TRY + USD)
- Varsa yüklenen dosya linkleri
- Tek tıkla WhatsApp butonu

**Yapılacaklar:**
- [ ] Resend.com hesap aç (100 mail/gün ücretsiz)
- [ ] `functions/src/index.ts` → mail trigger yaz
- [ ] Admin maili + müşteri onay maili HTML şablonları
- [ ] `.env` → RESEND_API_KEY ekle

---

### 1.2 Sitemap.xml + Robots.txt

**Neden:** Google ve AI botlar siteyi tarayamıyor → indekslenemez → bulunamaz.

```typescript
// src/app/sitemap.ts
export default function sitemap() {
  const baseUrl = 'https://mindid.shop'
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/configure/reels`, priority: 0.9 },
    { url: `${baseUrl}/configure/product-photo`, priority: 0.9 },
    { url: `${baseUrl}/configure/product`, priority: 0.9 },
    { url: `${baseUrl}/configure/campaign`, priority: 0.9 },
    { url: `${baseUrl}/configure/corporate`, priority: 0.9 },
    { url: `${baseUrl}/configure/avatar`, priority: 0.9 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    // Blog yazıları dinamik olarak eklenecek
  ]
}
```

- [ ] `src/app/sitemap.ts` oluştur
- [ ] `src/app/robots.ts` oluştur (AI botlara izin ver: GPTBot, Bingbot, PerplexityBot)
- [ ] Google Search Console'a sitemap gönder

---

### 1.3 OG / Twitter Meta Tagları

**Sorun:** Sosyal medyada paylaşılınca önizleme görünmüyor.

- [ ] `layout.tsx` → OpenGraph ve Twitter Card meta ekle
- [ ] 1200x630px OG görseli tasarla (MindID markası + slogan)
- [ ] Her hizmet sayfası için özel OG açıklaması

---

### 1.4 EN Dil Routing Düzeltmesi

**Sorun:** Global hedef var ama `/en` 404 veriyor.

**Strateji:** Next.js App Router `[lang]` segmenti ile TR/EN routing.

**Yapılacaklar:**
- [ ] `src/app/[lang]/` klasör yapısına geçiş
- [ ] Varsayılan dil: `en` (global pazar), `tr` ikincil
- [ ] `hreflang` tagları ekle
- [ ] Dil seçici header'a ekle (bayrak ikonları)
- [ ] Mevcut i18n çeviri dosyasını genişlet

**URL Yapısı:**
```
mindid.shop/          → İngilizce (varsayılan)
mindid.shop/tr/       → Türkçe
mindid.shop/portfolio → EN
mindid.shop/tr/portfolio → TR
```

---

## FAZ 2 — SEO Güçlendirme (Hafta 3-4)

### 2.1 Sayfa Bazlı Metadata

> Anahtar kelimeler title ve description içine doğal şekilde yerleştirilecek.

| Sayfa | EN Title | TR Title |
|---|---|---|
| Ana Sayfa | MindID — AI Ad Films, Avatar & Product Visuals | MindID — Yapay Zeka Reklam Filmleri, Avatar & Ürün Görselleri |
| Portfolio | AI Ad Portfolio — Films, Avatars & E-commerce Visuals | AI Reklam Portföyü — Film, Avatar & E-ticaret Görselleri |
| Reels | AI Instagram Reels Production — From ₺999 | AI Instagram Reels Yapımı — 999₺'den |
| Product Photo | AI Product Photography for E-commerce — 70% Less Cost | E-ticaret İçin AI Ürün Fotoğrafçılığı — %70 Daha Az Maliyet |
| Product Video | AI Product Ad Film — MindID | AI Ürün Reklam Filmi — MindID |
| Campaign | AI Campaign Film Production — MindID | AI Kampanya Filmi Yapımı — MindID |
| Corporate | AI Corporate Film Production — MindID | AI Kurumsal Tanıtım Filmi — MindID |
| Avatar | AI Avatar Creation — Digital Presenter & Brand Face | AI Avatar Oluşturma — Dijital Sunucu & Marka Yüzü |
| About | About MindID — AI Ad Film & Visual Production Agency | MindID Hakkında — AI Reklam Filmi & Görsel Üretim Ajansı |
| Blog | AI Advertising Blog — Films, Avatars & Visual Trends | AI Reklam Blogu — Film, Avatar & Görsel Trendleri |

**Her hizmet sayfası için açıklama (meta description) örnekleri:**

| Sayfa | TR Description |
|---|---|
| Product Photo | E-ticaret ürünleriniz için manken ve stüdyo masrafı olmadan, AI ile %70 daha ucuz stüdyo kalitesinde ürün görselleri. 399₺'den başlayan fiyatlar. |
| Avatar | Yapay zeka ile dijital avatar oluşturun. Marka yüzü, sunucu, influencer avatar — gerçekçi ve profesyonel. |
| Product Video | AI ile ürün reklam filmi. Geleneksel prodüksiyonun %70 altında maliyetle sinema kalitesinde reklam videoları. |
| Reels | AI ile Instagram Reels ve TikTok videoları. 999₺'den başlayan fiyatlarla profesyonel kısa video üretimi. |

---

### 2.2 Schema.org Structured Data (GEO İçin Kritik)

AI arama motorları yapılandırılmış veriyi okuyarak alıntı yapıyor. Bu, GEO'nun temel taşı.

**A. Organization Schema (layout.tsx — global)**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MindID",
  "url": "https://mindid.shop",
  "description": "AI-powered ad film production, avatar creation, and e-commerce product visual studio. 70% cheaper than traditional production.",
  "priceRange": "$$",
  "areaServed": "Worldwide",
  "serviceType": ["AI Ad Film Production", "AI Avatar Creation", "AI Product Photography", "AI E-commerce Visuals", "AI Advertising"],
  "knowsLanguage": ["Turkish", "English"]
}
```

**B. Service Schema (her hizmet sayfası için)**
```json
{
  "@type": "Service",
  "name": "AI Product Advertising Video",
  "provider": { "@type": "Organization", "name": "MindID" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "9999",
    "highPrice": "29999",
    "priceCurrency": "TRY"
  },
  "description": "Professional AI-generated product advertising videos with custom scenarios"
}
```

**C. FAQPage Schema (SSS bölümü)**
**D. BreadcrumbList (tüm iç sayfalar)**
**E. BlogPosting Schema (blog yazıları)**
**F. VideoObject Schema (portföy videoları)**

---

### 2.3 Anahtar Kelime Stratejisi

> 3 ana hizmet alanı etrafında kümelenmiş anahtar kelime stratejisi.

**KÜME 1: AI Reklam Filmleri (Türkçe)**
- `yapay zeka reklam filmi` / `ai reklam filmi`
- `yapay zeka reklam videosu` / `ai reklam videosu fiyat`
- `ai ile reklam filmi çekmek` / `yapay zeka ile reklam yapımı`
- `ucuz reklam filmi` / `düşük bütçe reklam filmi`
- `ai kampanya filmi` / `yapay zeka kurumsal tanıtım filmi`
- `ai instagram reels yapımı` / `yapay zeka tiktok video`

**KÜME 2: AI Avatar Oluşturma (Türkçe)**
- `ai avatar oluşturma` / `yapay zeka avatar`
- `dijital avatar yapımı` / `ai dijital sunucu`
- `yapay zeka marka yüzü` / `ai influencer avatar`
- `ai avatar fiyat` / `dijital insan oluşturma`
- `yapay zeka ile avatar nasıl yapılır`

**KÜME 3: AI Ürün Görseli / E-ticaret (Türkçe)**
- `ai ürün görseli` / `yapay zeka ürün fotoğrafı`
- `e-ticaret ürün fotoğrafı ai` / `ai ürün çekimi`
- `manken olmadan ürün fotoğrafı` / `stüdyo olmadan ürün görseli`
- `ai ile ürün fotoğrafı çekmek` / `ucuz ürün fotoğrafçılığı`
- `trendyol ürün görseli ai` / `hepsiburada ürün fotoğrafı yapay zeka`

**İngilizce — Global (3 Küme):**

*Ad Films:*
- `AI ad film production` / `AI commercial maker`
- `AI product video production` / `AI advertising video`
- `affordable AI ad production` / `AI campaign film`

*Avatar:*
- `AI avatar creator` / `AI digital presenter`
- `create AI avatar for brand` / `AI spokesperson generator`
- `AI avatar for marketing` / `digital human creation`

*E-commerce Visuals:*
- `AI product photography e-commerce` / `AI product images`
- `AI model photography no mannequin` / `AI studio product photos`
- `AI product photo 70% cheaper` / `AI generated product visuals`
- `Shopify AI product images` / `Amazon product photography AI`

**GEO Sorguları (AI arama motorlarında sorulacak):**
- "What is the best AI ad film production service?"
- "How to create AI avatars for marketing?"
- "AI product photography vs traditional studio — cost comparison"
- "Can AI replace mannequins for e-commerce product photos?"
- "How much does an AI advertising film cost?"
- "Yapay zeka ile reklam filmi nasıl yapılır?"
- "AI avatar oluşturma nasıl çalışır?"
- "E-ticaret ürün fotoğrafı için yapay zeka kullanılır mı?"
- "Manken yerine AI ile ürün görseli nasıl hazırlanır?"

---

## FAZ 3 — GEO (AI Arama) Optimizasyonu (Hafta 5-6)

> GEO = Generative Engine Optimization. ChatGPT, Perplexity, Google AI Overview ve Gemini aramalarında alıntılanmak.

### 3.1 llms.txt Dosyası

**Neden:** AI botlara siteyi tanıtan yeni standart. Perplexity ve diğerleri bu dosyayı okuyor.

```
# MindID — AI Ad Films, Avatar Creation & Product Visuals

## About
MindID is an AI-powered production studio specializing in three core areas:
advertising films, digital avatar creation, and e-commerce product visuals.
Based in Istanbul, Turkey — serving clients worldwide.
We replace expensive mannequins, studios, and traditional film crews with AI,
delivering studio-quality results at 70% less cost.

## Services

### AI Ad Films
- AI Reels (Instagram/TikTok) — from ₺999
- AI Product Ad Film — from ₺9,999
- AI Campaign Film — from ₺19,999
- AI Corporate Film — from ₺29,999

### AI Avatar Creation
- AI Digital Avatar — from ₺5,999
- Use cases: brand spokesperson, digital presenter, influencer avatar

### AI Product Visuals (E-commerce)
- AI Product Photography — from ₺399
- No mannequin or studio needed — 70% cheaper than traditional shoots
- Studio-quality product images for Shopify, Amazon, Trendyol, Hepsiburada

## How it works
1. Choose your service (ad film, avatar, or product visuals)
2. Configure options and see the price instantly
3. Submit your order with requirements and files
4. We produce using cutting-edge AI tools
5. Deliver within agreed timeline

## Key differentiator
Traditional product shoot: ₺150,000+ (studio, models, crew, post-production)
MindID AI production: from ₺399 — same quality, 70% less cost

## Contact
Website: https://mindid.shop
Email: seymaakrs@gmail.com
```

---

### 3.2 İçerik Sayfaları (AI Alıntılama İçin)

**A. "AI vs Geleneksel Prodüksiyon" Karşılaştırma Sayfası** → `/ai-vs-traditional`
- 3 bölüm: Reklam Filmi, Avatar, Ürün Görseli karşılaştırması
- Tablo formatında: maliyet, süre, revizyon, kalite
- Gerçek rakamlar:
  - Geleneksel ürün reklamı: 150.000₺+ → MindID AI: 9.999₺
  - Geleneksel ürün çekimi (manken + stüdyo): 15.000₺+ → MindID AI: 399₺ (%70 tasarruf)
  - Geleneksel sunucu/model: saatlik 5.000₺+ → AI Avatar: 5.999₺ (sınırsız kullanım)
- Bu sayfa AI motorlarının en çok alıntıladığı format

**B. "Nasıl Çalışır?" Sayfası** → `/how-it-works`
- 3 ayrı bölüm: Reklam Filmi Süreci / Avatar Oluşturma Süreci / Ürün Görseli Süreci
- Adım adım süreç açıklaması + görsel
- "Manken ve stüdyo masrafı olmadan nasıl?" sorusunun cevabı

**C. E-ticaret Özel Landing Page** → `/e-commerce`
- "Trendyol, Hepsiburada, Shopify satıcıları için AI ürün görseli"
- %70 maliyet avantajı vurgusu
- Before/After örnekleri (geleneksel stüdyo vs AI)
- Sektör bazlı örnekler: giyim, kozmetik, elektronik, gıda
- CTA: "İlk 5 ürün görseli ücretsiz dene" (lead magnet)

**D. SSS Genişletmesi**
- Mevcut 6-7 sorudan → 25+ soruya çıkar (3 küme halinde)
- Reklam Filmi SSS: "AI reklam filmi ne kadar sürer?" "Senaryo kim yazar?"
- Avatar SSS: "AI avatar gerçekçi mi?" "Avatarımı farklı dillerde konuşturabilir miyim?"
- Ürün Görseli SSS: "Mankene gerek yok mu?" "Hangi e-ticaret platformlarına uygun?"
- Schema.org FAQPage işaretlemesi

---

### 3.3 Blog Sistemi

**Yapı:** `/blog` ana sayfa + `/blog/[slug]` yazı sayfaları

**İçerik Firestore'dan çekilir:** `mindid_blog` koleksiyonu
- title, slug, content (Markdown), excerpt, coverImage, tags, publishedAt, lang

**İlk 8 Blog Yazısı Önerileri (3 küme halinde):**

| # | Küme | Başlık (TR) | Başlık (EN) | SEO Hedefi |
|---|---|---|---|---|
| 1 | Film | AI Reklam Filmi Nedir? 2026 Eksiksiz Rehber | What is AI Ad Film Production? Complete Guide | Bilgi sorguları |
| 2 | Film | AI vs Geleneksel: Reklam Filmi Maliyet Karşılaştırması | AI vs Traditional Ad Film: Cost Comparison | Karşılaştırma |
| 3 | Avatar | Yapay Zeka Avatar Oluşturma Rehberi — Marka Yüzünüzü Dijitalleştirin | AI Avatar Creation Guide — Digitize Your Brand Face | Avatar sorguları |
| 4 | Avatar | AI Avatar ile Pazarlama: 5 Yaratıcı Kullanım Alanı | Marketing with AI Avatars: 5 Creative Use Cases | Kullanım alanı |
| 5 | Görsel | E-ticaret İçin AI Ürün Görseli: Manken ve Stüdyo Masrafına Son | AI Product Photos for E-commerce: No Mannequin Needed | E-ticaret hedefi |
| 6 | Görsel | Trendyol/Hepsiburada Satıcıları İçin AI Ürün Fotoğrafı | AI Product Photography for Marketplace Sellers | Marketplace hedefi |
| 7 | Film | AI ile Instagram Reels Nasıl Yapılır? | How to Create Instagram Reels with AI | Sosyal medya |
| 8 | Genel | Reklamcılıkta AI'ın Geleceği: 2026 Trendleri | The Future of AI in Advertising: 2026 Trends | Trend sorguları |

**Admin paneline blog editörü eklenmeli:**
- Markdown editör (rich text)
- Görsel yükleme
- Yayın/taslak durumu
- TR/EN dil seçimi

---

## FAZ 4 — UX & Dönüşüm Optimizasyonu (Hafta 7-8)

### 4.1 Bütçe Bazlı Hizmet Seçici

Kullanıcı deneyimi: "Bütçem 2.000₺, ne yapabilirim?" → Otomatik paket önerisi.

- [ ] Ana sayfaya bütçe slider'ı ekle
- [ ] Bütçeye göre uygun hizmetleri highlight et
- [ ] "Bu bütçeyle şunları yapabilirsiniz" kartları

---

### 4.2 WhatsApp Hızlı İletişim

- [ ] Sabit WhatsApp butonu (sağ alt köşe, floating)
- [ ] Otomatik mesaj: "Hi, I'm interested in [service name]"
- [ ] Configure sayfasında "WhatsApp ile sor" seçeneği

---

### 4.3 Portföy İyileştirmesi

- [ ] Gerçek AI video/görsel örnekleri yükle
- [ ] Sektöre göre filtre: E-Commerce / Food / Cosmetics / Tech
- [ ] Her örnekte "Order This Service" CTA butonu
- [ ] Video lightbox (tıkla → büyüsün, siteden çıkmasın)
- [ ] Before/After karşılaştırma slider'ı (geleneksel vs AI)

---

### 4.4 Sosyal Kanıt

- [ ] Müşteri logoları banner'ı (izinle)
- [ ] Canlı sipariş sayacı: "X+ projects completed"
- [ ] Video testimonial'lar
- [ ] Trust badge'leri (ödeme güvenliği, teslimat garantisi)

---

### 4.5 Performans & Core Web Vitals

- [ ] Image optimization (next/image, WebP/AVIF)
- [ ] Lazy loading (portföy ve blog görselleri)
- [ ] Font optimization (next/font)
- [ ] Bundle size analizi
- [ ] Lighthouse skoru > 90 hedefi

---

## FAZ 5 — Büyüme & Otomasyon (Hafta 9+)

### 5.1 Google Search Console & Analytics
- [ ] Google Search Console doğrulama
- [ ] Google Analytics 4 (GA4) entegrasyonu
- [ ] Conversion tracking (sipariş formu gönderildiğinde)
- [ ] UTM parameter desteği

### 5.2 E-posta Pazarlama
- [ ] Sipariş sonrası follow-up mail serisi
- [ ] Blog abone formu
- [ ] Aylık newsletter (yeni hizmetler, örnek çalışmalar)

### 5.3 Çoklu Para Birimi
- [ ] USD/EUR/GBP fiyat gösterimi (IP bazlı otomatik)
- [ ] Firestore'daki kur verisini genişlet

---

## Teknik Mimari Özet

```
mindid.shop/
├── src/app/
│   ├── [lang]/                    ← TR/EN routing (YENİ)
│   │   ├── page.tsx               ← Ana sayfa
│   │   ├── portfolio/page.tsx     ← Portföy
│   │   ├── about/page.tsx         ← Hakkında
│   │   ├── configure/[serviceId]/ ← Hizmet konfigüratörü
│   │   ├── blog/                  ← Blog ana sayfa (YENİ)
│   │   ├── blog/[slug]/           ← Blog yazı sayfası (YENİ)
│   │   ├── ai-vs-traditional/     ← Karşılaştırma sayfası (YENİ)
│   │   ├── e-commerce/            ← E-ticaret özel landing page (YENİ)
│   │   └── how-it-works/          ← Nasıl çalışır (YENİ)
│   ├── admin/                     ← Admin paneli (mevcut)
│   ├── sitemap.ts                 ← Dinamik sitemap (YENİ)
│   ├── robots.ts                  ← Robots.txt (YENİ)
│   └── llms.txt/route.ts          ← AI bot bilgisi (YENİ)
├── src/components/
│   ├── blog/                      ← Blog bileşenleri (YENİ)
│   ├── seo/                       ← Schema.org bileşenleri (YENİ)
│   ├── ui/whatsapp-button.tsx     ← WhatsApp butonu (YENİ)
│   └── ui/budget-slider.tsx       ← Bütçe seçici (YENİ)
├── functions/src/
│   └── index.ts                   ← E-posta trigger (GÜNCELLENİR)
└── public/
    └── llms.txt                   ← AI bot dosyası (YENİ)
```

---

## Firestore Koleksiyonları (Güncel + Yeni)

| Koleksiyon | Durum | Açıklama |
|---|---|---|
| mindid_orders | ✅ Mevcut | Müşteri siparişleri |
| mindid_portfolio | ✅ Mevcut | Portföy öğeleri |
| mindid_faq | ✅ Mevcut | SSS |
| mindid_team | ✅ Mevcut | Takım üyeleri |
| mindid_pricing | ✅ Mevcut | Dinamik fiyatlandırma |
| mindid_settings | ✅ Mevcut | Site ayarları |
| mindid_avatarSamples | ✅ Mevcut | Avatar örnekleri |
| **mindid_blog** | 🆕 Yeni | Blog yazıları (title, slug, content, lang, tags) |
| **mindid_subscribers** | 🆕 Yeni | Blog/newsletter aboneleri |

---

## Öncelik Takvimi

```
FAZ 0 (Gün 1):      Git merge çakışma çözümü
FAZ 1 (Hafta 1-2):   E-posta bildirimi → Sitemap → OG tagları → EN routing
FAZ 2 (Hafta 3-4):   Metadata → Schema.org → Anahtar kelime yerleştirme
FAZ 3 (Hafta 5-6):   llms.txt → Blog sistemi → İçerik sayfaları → SSS genişletme
FAZ 4 (Hafta 7-8):   Bütçe seçici → WhatsApp → Portföy → Sosyal kanıt → Core Web Vitals
FAZ 5 (Hafta 9+):    Analytics → E-posta pazarlama → Çoklu para birimi
```

---

## Başarı Metrikleri

| Metrik | Hedef (3 ay) | Hedef (6 ay) |
|---|---|---|
| Google Search Console — Tıklama | 500/ay | 2.000/ay |
| AI arama motorlarında alıntılanma | İlk 5 sorgu | İlk 20 sorgu |
| Aylık sipariş formu gönderimi | 10+ | 50+ |
| Lighthouse Performance skoru | 85+ | 92+ |
| Blog yazısı sayısı | 5 | 20 |
| Portföy örnek sayısı | 10 | 30 |

---

*Bu doküman yaşayan bir belgedir. Her faz tamamlandıkça güncellenecektir.*
*Strateji soruları için: seymaakrs@gmail.com*
