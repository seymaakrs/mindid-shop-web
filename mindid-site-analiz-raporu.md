# MindID Site Teknik Analiz Raporu

**Tarih:** 28 Mart 2026
**Site:** https://mindid.shop
**Hazırlayan:** Claude (Cowork Mode)

---

## 1. GENEL YAPI

MindID sitesi **Next.js 16 (App Router)** üzerine kurulu, **TypeScript** ile yazılmış, **React 19** kullanan modern bir web uygulaması. Tailwind CSS 4 ile stillendirilmiş, Radix UI bileşenleri ile desteklenmiş.

**Teknoloji Özeti:**

- Framework: Next.js 16 (App Router)
- Dil: TypeScript (strict mode)
- CSS: Tailwind CSS 4 + CSS Custom Properties (değişkenler)
- UI Kütüphanesi: Radix UI (Accordion, Select, Slider, Tooltip, Toggle Group)
- İkon Seti: Lucide React
- Backend: Firebase (Auth, Firestore, Storage, Functions)
- Deploy: Netlify
- Analytics: Google Analytics (GA4)
- Font: Inter (Google Fonts)

---

## 2. HTML YAPISI VE SAYFA DÜZENİ

### 2.1 Sayfa Haritası (Routing)

Site App Router yapısında toplam **17 sayfa** barındırıyor:

| Sayfa | Yol | Tür |
|-------|-----|-----|
| Ana Sayfa | `/` | Statik + Dinamik |
| Hakkımızda | `/about` | Statik |
| Blog Listesi | `/blog` | Dinamik (Firestore) |
| Blog Yazısı | `/blog/[slug]` | Dinamik |
| Portfolyo | `/portfolio` | Dinamik (REST API) |
| Portfolyo Detay | `/portfolio/[slug]` | Dinamik |
| Konfiguratör | `/configure/[serviceId]` | Dinamik |
| Avatar | `/avatar` | Statik + Dinamik |
| AI vs Geleneksel | `/ai-vs-traditional` | İçerik |
| Nasıl Çalışır | `/how-it-works` | İçerik |
| E-Ticaret | `/e-commerce` | İçerik |
| KVKK | `/kvkk` | Statik/Yasal |
| Gizlilik | `/gizlilik` | Statik/Yasal |
| Kullanım Koşulları | `/kullanim-kosullari` | Statik/Yasal |
| Admin Panel | `/admin/*` | Korumalı (Auth) |
| Admin Giriş | `/admin/login` | Form |

### 2.2 Ana Sayfa Bileşen Sıralaması

```
ParallaxGrid (arka plan — fixed, z-0)
Header (sticky, z-50)
  └── ServiceCards
  └── HowItWorks
  └── BudgetSlider (lazy loaded)
  └── TestimonialsSection (lazy loaded)
  └── FAQSection (lazy loaded)
  └── FinalCTA (lazy loaded)
  └── SocialProof
  └── LogoWall (lazy loaded)
Footer
AIManager (lazy loaded)
WhatsAppButton (global)
LanguageSwitcher (global)
```

**Not:** Hero bileşeni şu anda "tadilat nedeniyle" devre dışı bırakılmış (`{/* <Hero /> */}`).

### 2.3 Layout Yapısı

- **Root Layout:** `html lang="tr"` — Providers (Auth + i18n) ile sarılmış
- **Admin Layout:** Ayrı layout, sidebar + AdminGuard ile korunuyor
- **Max genişlik:** `max-w-7xl` (1280px) — tüm sayfalarda tutarlı
- **Padding:** `px-4 sm:px-6 lg:px-8` — responsive padding

---

## 3. CSS VE STİL ANALİZİ

### 3.1 Renk Paleti

Site **neo-brutalist** tasarım dilini benimsiyor. Renk sistemi CSS Custom Properties ile yönetiliyor:

| Değişken | Renk Kodu | Kullanım |
|----------|-----------|----------|
| `--lime` | `#61ff00` | Ana vurgu rengi, CTA'lar, hover efektleri |
| `--cream` | `#f1eee2` | Kart arka planı, açık metin |
| `--gray` | `#6b6b6b` | İkincil metin, açıklamalar |
| `--dark-blue` | `#280137` | Ana metin, kenarlıklar, koyu arka plan |
| `--deep-blue` | `#2E1A47` | Accent, footer arka plan |
| `--background` | `#E5E5E0` | Sayfa arka planı (sıcak gri) |
| `--foreground` | `#280137` | Varsayılan metin rengi |
| `--card` | `#f1eee2` | Kart arka planları |
| `--primary` | `#61ff00` | Birincil buton rengi |
| `--muted` | `#9a9a9a` | Soluk metin |

**Renk Kombinasyonu Değerlendirmesi:**

- **Güçlü yönler:** Neon yeşil (`#61ff00`) + koyu mor (`#280137`) kombinasyonu çok dikkat çekici ve marka kimliği güçlü. Neo-brutalist tarz ile uyumlu.
- **Dikkat edilecekler:** `--lime` (`#61ff00`) açık arka plan üzerinde (`--background: #E5E5E0`) kontrast oranı düşük olabilir (WCAG AA standardı için kontrol edilmeli). Koyu arka plan üzerinde neon yeşil ise gayet okunabilir.

### 3.2 Tipografi

- **Font:** Inter (Google Fonts) — 400, 500, 600, 700, 800, 900 ağırlıkları yükleniyor
- **Başlıklar:** `font-weight: 800` (extra-bold)
- **Body:** `font-family: 'Inter', system-ui, -apple-system, sans-serif`
- **Metin seçimi:** Lime yeşil arka plan + koyu mor metin

### 3.3 Animasyon Sistemi

Site zengin bir animasyon kütüphanesi barındırıyor:

| Animasyon | Süre | Kullanım |
|-----------|------|----------|
| `kinetic-slide` | 0.8s | Sayfa içi geçişler, içerik girişleri |
| `kinetic-expand` | 1s | Harf aralığı animasyonu |
| `float` | 3s (infinite) | Yüzen elemanlar |
| `pulse-lime` | 2s (infinite) | Neon parlama efekti |
| `ticker` | 30s (infinite) | Logo duvarı kaydırma |
| `stagger-fade-up` | 0.6s | Sıralı kart girişleri (6 kademe) |
| `shimmer` | 3s (infinite) | Parlak süpürme efekti |
| `rotate-slow` | 20s (infinite) | Yavaş dönen dekoratif elemanlar |
| `scale-in` | 0.5s | Ölçeklendirme girişi |

### 3.4 Özel CSS Sınıfları

- **`.neo-border`**: 3px kenarlık + 6px gölge (neo-brutalist imza)
- **`.neo-border-lime`**: Lime vurgulu versiyon
- **`.trading-card`**: Hover'da -8px yukarı + -1deg döndürme + lime gölge
- **`.glass`**: Glassmorphism efekti (blur + yarı saydam beyaz)
- **`.savings-badge`**: Shimmer efekti ile dikkat çekici rozet
- **`.leopard-pattern`**: Dekoratif arka plan (şu an desensiz bırakılmış)

---

## 4. JAVASCRIPT VE SAYFA DİNAMİKLERİ

### 4.1 Client-Side Dinamikler

| Bileşen | Dinamik Davranış |
|---------|------------------|
| **Header** | Scroll dinleyici (sticky, yükseklik azalma), mobil menü aç/kapa, body scroll kilidi |
| **Hero (devre dışı)** | Otomatik slayt (4sn aralık), dot navigasyon, ok butonları, Firestore'dan portfolyo çekme |
| **ServiceCards** | Yatay scroll, scroll pozisyon algılama, fade gradyanları, ok butonları |
| **FAQSection** | Radix Accordion (tek açılır), Firestore fallback sistemi |
| **ParallaxGrid** | Scroll parallax efekti (`translateY * 0.3`) |
| **BudgetSlider** | Lazy loaded, bütçe hesaplayıcı |
| **LanguageSwitcher** | Dil değiştirme (cookie tabanlı) |
| **WhatsAppButton** | Sabit konumlu iletişim butonu |
| **Configurator** | Çok adımlı form (configure → checkout → congrats) |

### 4.2 Lazy Loading Stratejisi

Ana sayfada "fold altı" bileşenler `next/dynamic` ile lazy yükleniyor:

```
Lazy: BudgetSlider, TestimonialsSection, FAQSection, FinalCTA, LogoWall, AIManager
Eager: Header, ServiceCards, HowItWorks, SocialProof, ParallaxGrid
```

Bu iyi bir performans optimizasyonu — ilk sayfa yüklemesi hızlanıyor.

### 4.3 State Yönetimi

- **Global state yok** (Redux/Zustand kullanılmıyor)
- Her bileşen kendi `useState` / `useEffect` ile çalışıyor
- **Context API:** `AuthProvider` (Firebase Auth) + `I18nProvider` (çeviri)
- **Custom Hooks:** `useFirestoreCollection`, `usePortfolio`, `useFAQ`, `useSettings`, `usePricing`, `useTeam`

### 4.4 i18n (Çoklu Dil) Sistemi

- Cookie tabanlı dil yönetimi (`lang` cookie)
- Varsayılan: Türkçe
- Desteklenen: Türkçe + İngilizce (+ İspanyolca metadata'da belirtilmiş)
- `useI18n()` hook'u ile `t()` fonksiyonu ve `formatPrice()` yardımcısı

---

## 5. BACKEND BAĞLANTILARI

### 5.1 Firebase Entegrasyonları

| Servis | Kullanım | Bağlantı Yöntemi |
|--------|----------|-------------------|
| **Firebase Auth** | Admin panel girişi, AdminGuard koruması | `getAuth()` — isAdmin kontrolü |
| **Firestore** | Portfolyo, FAQ, Blog, Sipariş, Ayarlar, Fiyatlandırma, Avatar, Takım | `getDocs()` / `onSnapshot()` |
| **Firebase Storage** | Sipariş dosya yükleme (max 50MB) | `uploadBytes()` / `getDownloadURL()` |
| **Cloud Functions** | Sipariş email bildirimi | Firestore trigger |

### 5.2 Firestore Koleksiyonları

Tüm koleksiyonlar `mindid_` öneki ile adlandırılmış:

- `mindid_portfolio` — Portfolyo projeleri
- `mindid_faq` — SSS içerikleri
- `mindid_blog` — Blog yazıları
- `mindid_orders` — Müşteri siparişleri
- `mindid_settings` — Site ayarları
- `mindid_team` — Takım üyeleri
- `mindid_pricing` — Fiyatlandırma konfigürasyonu
- `mindid_avatar` — Avatar örnekleri

### 5.3 Veri Akış Şeması

```
Kullanıcı Ziyareti
  │
  ├── Firestore → portfolyo, faq, pricing, blog, settings, avatar
  │   └── Fallback: i18n dosyasındaki statik veriler kullanılır
  │
  ├── Konfiguratör Formu
  │   ├── Fiyatlandırma hesaplama (client-side)
  │   ├── Dosya yükleme → Firebase Storage
  │   └── Sipariş kayıt → Firestore (mindid_orders)
  │       └── Cloud Function tetiklenir → Email bildirimi
  │
  └── Admin Panel (Auth gerekli)
      ├── CRUD: portfolyo, blog, faq, pricing, avatar, team, settings
      └── Sipariş yönetimi (orders-editor)
```

### 5.4 Analytics Entegrasyonu

- **Google Analytics GA4** — `afterInteractive` stratejisi ile yükleniyor
- **Olay takibi:**
  - `generate_lead` — sipariş formu gönderildiğinde
  - `conversion` — sipariş tamamlandığında
  - Sayfa görüntüleme (SPA navigasyonu)

---

## 6. SEO VE ERİŞİLEBİLİRLİK

### 6.1 SEO

- **Schema.org:** ProfessionalService, FAQPage, LocalBusiness, AggregateRating — zengin yapılandırılmış veri
- **Metadata:** Title template, description, keywords, OpenGraph, Twitter Card
- **Google Search Console:** Doğrulama kodu mevcut
- **Sitemap:** `robots.ts` ve `sitemap.ts` dosyaları var
- **Canonical URL:** Ayarlanmış
- **Hreflang:** TR, EN, ES alternatifleri belirtilmiş

### 6.2 Erişilebilirlik

- **Skip link:** "İçeriğe Atla" linki mevcut (sr-only + focus görünür)
- **ARIA:** Carousel bileşeninde `aria-label`, `aria-roledescription`
- **Buton etiketleri:** Mobil menü açma/kapama için `aria-label`
- **Sosyal medya ikonları:** `aria-label` ile etiketlenmiş
- **Resim alt metinleri:** Mevcut

---

## 7. GÜÇLÜ YÖNLER

1. **Modern mimari:** Next.js 16 App Router + TypeScript strict mode — endüstri standardı
2. **Performans optimizasyonu:** Lazy loading, font preconnect, image optimization
3. **Tutarlı tasarım dili:** Neo-brutalist tarz tüm bileşenlerde uygulanmış
4. **Zengin animasyonlar:** 10+ özel animasyon, geçişler akıcı
5. **Firestore fallback sistemi:** Backend erişilemezse i18n verileri kullanılıyor
6. **SEO derinliği:** Schema.org, FAQ Schema, Review Schema — Google için çok iyi hazırlanmış
7. **Sipariş sistemi:** Konfiguratör → dosya yükleme → Firestore → Cloud Functions zinciri tam çalışıyor
8. **Admin panel:** Blog, portfolyo, FAQ, fiyatlandırma, sipariş yönetimi — tam CMS

---

## 8. İYİLEŞTİRME ÖNERİLERİ

### Kritik

1. **Hero bölümü devre dışı** — Ana sayfada ilk izlenim bölümü yok. Bu, ziyaretçi dönüşümünü olumsuz etkileyebilir.
2. **`--lime` kontrast kontrolü** — `#61ff00` rengi açık arka plan (`#E5E5E0`) üzerinde WCAG AA kontrastını karşılamıyor olabilir. Özellikle küçük metinlerde okunabilirlik kontrolü yapılmalı.
3. **`--electric-blue` = `--deep-blue`** — İki farklı isimle aynı renk (`#2E1A47`) tanımlı. Bu karışıklık yaratabilir.

### Orta Öncelik

4. **Font ağırlığı optimizasyonu** — 6 ağırlık (400-900) yükleniyor ama çoğu bileşen sadece 700 ve 800 kullanıyor. Gereksiz ağırlıkları kaldırmak sayfa hızını artırır.
5. **Image component tutarsızlığı** — Header/Footer'da `next/image` kullanılırken, Hero'da doğrudan `<img>` kullanılıyor. Tutarlı olarak `next/image` tercih edilmeli.
6. **Scroll listener performansı** — Header ve ParallaxGrid'de scroll eventleri `requestAnimationFrame` ile optimize edilebilir.
7. **Leopard pattern boş** — CSS'te tanımlı ama içi boşaltılmış. Kullanılmıyorsa kaldırılabilir.

### Düşük Öncelik

8. **Dark mode desteği yok** — Şu an sadece light tema var. CSS değişkenleri zaten yapıda olduğu için dark mode eklemek kolay olur.
9. **Error boundary eksik** — Firebase bağlantı hatalarında kullanıcıya bilgi veren bir hata sınırı yok.
10. **Loading state göstergeleri** — Firestore verisi yüklenirken bazı bileşenlerde skeleton/placeholder eksik.

---

## 9. DOSYA İSTATİSTİKLERİ

| Kategori | Sayı |
|----------|------|
| Toplam TSX/TS dosyası | ~50+ |
| Sayfa (route) | 17 |
| Bileşen | ~35 |
| Custom Hook | 8+ |
| CSS animasyonu | 12 |
| Firebase koleksiyonu | 8 |
| npm bağımlılığı | 14 (prod) + 7 (dev) |

---

*Bu rapor, MindID sitesinin kaynak kodlarının statik analizi ile hazırlanmıştır.*
