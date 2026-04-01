# MindID Ana Sayfa Düzeni & Hizmet Bazlı Portfolyo — Mühendislik Analizi

**Tarih:** 29 Mart 2026
**Hazırlayan:** Claude (Web Tasarım & Frontend Mühendisliği perspektifi)
**Kapsam:** Ana sayfa bölüm düzeni değişikliği + her hizmet için ayrı portfolyo örnekleri

---

## 1. Mevcut Durum Analizi

### 1.1 Ana Sayfa Bölüm Sırası (Şu An)

| # | Bölüm | Görev | Sorun |
|---|-------|-------|-------|
| 1 | ParallaxGrid | Dekoratif arka plan | — |
| 2 | Header | Navigasyon | — |
| 3 | **Hero** | İlk 5 portfolyo slider | Kategorisiz, karışık içerik |
| 4 | **ServiceCards** | Yatay kaydırılabilir hizmet kartları | Portfolyo bağlantısı yok |
| 5 | HowItWorks | 3 adımlı süreç açıklaması | — |
| 6 | BudgetSlider | Bütçeye göre hizmet önerisi | — |
| 7 | TestimonialsSection | Müşteri yorumları | — |
| 8 | **FAQSection** | 21 soru alt alta | ✅ Düzeltildi → 3 sütun grid |
| 9 | FinalCTA | Son çağrı butonu | — |
| 10 | SocialProof | İstatistikler + güven rozetleri | — |
| 11 | LogoWall | Müşteri logoları | — |
| 12 | AIManager | Sohbet botu | — |
| 13 | Footer | Alt bilgi | — |

### 1.2 Kritik Sorunlar

**Sorun 1: Hizmet kartları ile portfolyo arasında bağlantı yok.**
Kullanıcı "AI Reels" kartını görüyor ama o hizmetin gerçek çıktısını görmeden "/configure/reels" sayfasına yönlendiriliyor. Dönüşüm oranını düşüren en büyük UX eksikliği bu.

**Sorun 2: Hero slider kategorisiz.**
İlk 5 portfolyo öğesi karışık gösteriliyor. Ziyaretçi hangi hizmetin sonucu olduğunu anlayamıyor.

**Sorun 3: Sayfa akışında "kanıt" çok geç geliyor.**
Testimonials (7. sırada) ve SocialProof (10. sırada) çok aşağıda. Kullanıcı güven sinyallerini görmeden hizmet seçimine yönlendiriliyor.

**Sorun 4: ServiceCards → FinalCTA arası çok uzun.**
6 bölüm sonra tekrar CTA'ya ulaşılıyor. Mobilde bu 15-20 scroll demek.

---

## 2. Önerilen Yeni Sayfa Düzeni

### 2.1 Yeni Bölüm Sırası

| # | Bölüm | Değişiklik | Neden |
|---|-------|-----------|-------|
| 1 | ParallaxGrid | Aynı | — |
| 2 | Header | Aynı | — |
| 3 | **Hero** | **Hizmet bazlı slider** | Her hizmetin en iyi örneği gösterilsin |
| 4 | **SocialProof** | ↑ **Yukarı taşındı** | Güven sinyali hemen hero altında |
| 5 | **ServiceShowcase** | 🆕 **YENİ BİLEŞEN** | Her hizmet kartı + altında 3 portfolyo örneği |
| 6 | HowItWorks | Aynı | — |
| 7 | TestimonialsSection | ↑ Yukarı taşındı | Sosyal kanıt → süreç → yorum akışı |
| 8 | BudgetSlider | Aynı | — |
| 9 | FAQSection | ✅ 3 sütun grid (yapıldı) | — |
| 10 | FinalCTA | Aynı | — |
| 11 | LogoWall | Aynı | — |
| 12 | AIManager | Aynı | — |
| 13 | Footer | Aynı | — |

### 2.2 Akış Mantığı

```
Dikkat Çek (Hero) → Güven Ver (SocialProof) → Kanıtla (ServiceShowcase + Portfolyo)
→ Süreç Anlat (HowItWorks) → Doğrula (Testimonials) → Fiyatla (BudgetSlider)
→ Soruları Çöz (FAQ) → Harekete Geçir (CTA)
```

Bu akış klasik **AIDA (Attention → Interest → Desire → Action)** pazarlama hunisine uyumludur.

---

## 3. Hizmet Bazlı Portfolyo Sistemi — Teknik Tasarım

### 3.1 Mevcut Altyapı (Avantajlar)

Firestore'daki portfolyo öğelerinde `category` alanı zaten hizmet ID'leri ile **birebir eşleşiyor**:

| Hizmet ID | Portfolyo Kategorisi | Eşleşme |
|-----------|---------------------|---------|
| `reels` | `reels` | ✅ |
| `product-photo` | `product-photo` | ✅ |
| `product` | `product` | ✅ |
| `campaign` | `campaign` | ✅ |
| `corporate` | `corporate` | ✅ |
| `avatar` | `avatar` | ✅ |

Bu, yeni bir veri yapısı oluşturmadan doğrudan filtreleme yapılabileceği anlamına gelir.

### 3.2 Yeni Bileşen: `ServiceShowcase`

Mevcut `ServiceCards` bileşeninin yerine geçecek. Her hizmet için:

```
┌─────────────────────────────────────────────────────────┐
│  [Hizmet İkonu] AI Reels               399₺'den başlayan│
│  Kısa açıklama metni                                     │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Örnek 1  │  │ Örnek 2  │  │ Örnek 3  │  [Tümünü Gör] │
│  │ (video)  │  │ (video)  │  │ (video)  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                                                           │
│  [Yapılandır →]                          [WhatsApp →]    │
└─────────────────────────────────────────────────────────┘
```

**Her hizmet bloğu şunları içerir:**
1. Hizmet adı, ikonu, fiyat
2. Kısa açıklama
3. O kategorideki ilk 3 portfolyo örneği (thumbnail + play)
4. "Tümünü Gör" linki → `/portfolio?category=reels`
5. CTA butonları (Yapılandır + WhatsApp)

### 3.3 Veri Akışı

```
usePortfolio() hook
    │
    ▼
Tüm portfolyo öğeleri (visible: true, ordered)
    │
    ▼
category alanına göre grupla
    │
    ▼
Her hizmet kartı → kendi kategorisindeki ilk 3 öğeyi gösterir
```

**Kod taslağı:**

```typescript
// portfolyo öğelerini kategoriye göre grupla
const groupedPortfolio = useMemo(() => {
  const groups: Record<string, PortfolioItem[]> = {};
  portfolioItems.forEach(item => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });
  return groups;
}, [portfolioItems]);

// Her hizmet kartında:
const examples = groupedPortfolio[service.id]?.slice(0, 3) || [];
```

### 3.4 Portfolyo Sayfası Güncelleme

`/portfolio` sayfasına URL parametresi desteği eklenmeli:

```
/portfolio?category=reels    → Sayfa açıldığında "AI Reels" filtresi aktif
/portfolio?category=campaign → Sayfa açıldığında "Kampanya" filtresi aktif
/portfolio                   → Tümü gösterilir (mevcut davranış)
```

Bu, hizmet kartlarındaki "Tümünü Gör" linklerinin doğru çalışması için gereklidir.

### 3.5 Hero Güncellemesi

Mevcut hero ilk 5 öğeyi gösteriyor. İki seçenek:

**Seçenek A: Her kategoriden 1 örnek (Önerilen)**
Her hizmet kategorisinden en iyi 1 örnek seçilir, slider 6 öğe gösterir. Ziyaretçi tüm hizmet çeşitliliğini anında görür.

```typescript
// Her kategoriden ilk öğeyi al
const heroItems = CATEGORIES
  .filter(cat => cat !== "all")
  .map(cat => groupedPortfolio[cat]?.[0])
  .filter(Boolean)
  .slice(0, 6);
```

**Seçenek B: En popüler/yeni öğeler**
Firestore'dan `featured: true` alanı ile işaretlenen öğeler gösterilir. Admin panelden kontrol edilebilir.

---

## 4. Mobil Deneyim Tasarımı

### 4.1 ServiceShowcase Mobil Davranışı

```
Masaüstü (lg+):
┌────────────────────────────────────────────┐
│ [Hizmet bilgisi]  │  [3 portfolyo thumbnail] │
└────────────────────────────────────────────┘

Tablet (md):
┌────────────────────────────┐
│ [Hizmet bilgisi]           │
│ [2 portfolyo thumbnail]    │
└────────────────────────────┘

Mobil (sm):
┌──────────────────┐
│ [Hizmet bilgisi] │
│ [Yatay scroll    │
│  portfolyo]      │
└──────────────────┘
```

Mobilde portfolyo örnekleri yatay scroll ile gösterilir (snap scroll). Bu pattern Instagram/TikTok kullanıcılarının alışık olduğu bir kalıptır.

---

## 5. Uygulama Planı (Adım Adım)

### Faz 1: Veri Katmanı (30 dk)
- [ ] `usePortfolio` hook'una kategori gruplama fonksiyonu ekle
- [ ] Portfolyo sayfasına URL query parameter desteği ekle (`?category=`)

### Faz 2: ServiceShowcase Bileşeni (1-2 saat)
- [ ] Yeni `service-showcase.tsx` bileşeni oluştur
- [ ] Her hizmet için portfolyo örnekleri + CTA butonları
- [ ] Responsive tasarım (3 sütun → 2 → yatay scroll)
- [ ] Portfolyo öğesi yoksa placeholder göster

### Faz 3: Sayfa Sıralama (15 dk)
- [ ] `page.tsx`'de bölüm sırasını güncelle
- [ ] SocialProof'u hero altına taşı
- [ ] Testimonials'ı HowItWorks altına taşı
- [ ] Eski ServiceCards'ı yeni ServiceShowcase ile değiştir

### Faz 4: Hero Güncelleme (30 dk)
- [ ] Her kategoriden 1 örnek gösteren slider mantığı
- [ ] Kategori badge'lerini belirginleştir

### Faz 5: Test & İyileştirme (30 dk)
- [ ] Tüm hizmetlerde portfolyo örneği var mı kontrol et
- [ ] Boş kategori durumu (fallback UI)
- [ ] Mobil scroll davranışı test
- [ ] Lazy loading doğrulama

**Toplam tahmini süre: 3-4 saat**

---

## 6. Performans Etkileri

| Değişiklik | Etki | Çözüm |
|-----------|------|-------|
| Daha fazla portfolyo thumbnail | +Bant genişliği | Lazy loading (mevcut) + WebP format |
| ServiceShowcase daha büyük bileşen | +JS bundle | Dynamic import ile lazy load |
| SocialProof yukarı taşıma | +İlk yükleme | Zaten hafif bileşen, sorun değil |
| URL query parameter | Minimal | Client-side filtreleme, ekstra istek yok |

---

## 7. Firestore Gereksinimleri

**Mevcut veri yeterli.** Ek alan veya koleksiyon gerekmiyor. Sadece:

1. Her kategoride en az 3 portfolyo öğesi olduğundan emin ol
2. `order` alanını doğru ayarla (en iyiler üstte)
3. Eksik kategori varsa → admin panelden eklenmeli

**Mevcut portfolyo durumu kontrol listesi:**

| Kategori | Minimum 3 öğe? | Aksiyon |
|----------|----------------|---------|
| reels | ? | Admin panelden kontrol et |
| product-photo | ? | Admin panelden kontrol et |
| product | ? | Admin panelden kontrol et |
| campaign | ? | Admin panelden kontrol et |
| corporate | ? | Admin panelden kontrol et |
| avatar | ? | Admin panelden kontrol et |

---

## 8. Sonuç & Öneri

Bu değişiklik ile:

1. **Dönüşüm oranı artışı beklenir** — Kullanıcı hizmeti seçmeden önce gerçek çıktıları görür
2. **Sayfa başı süre artar** — Her hizmet bloğu etkileşim alanı oluşturur
3. **SEO iyileşmesi** — Daha fazla iç link, daha iyi sayfa yapısı
4. **Güven faktörü güçlenir** — SocialProof + Testimonials daha yukarıda

**Bir sonraki adım olarak:** Bu analizi onaylarsan, Faz 1'den başlayarak uygulamaya geçebiliriz. Portfolyo kategorilerindeki mevcut içerik durumunu admin panelden kontrol etmeni öneririm.
