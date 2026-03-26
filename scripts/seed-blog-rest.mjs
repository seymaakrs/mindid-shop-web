/**
 * Blog Seed Script — Firestore REST API
 * Firebase CLI tokenı kullanır (firebase login yapılmış olmalı)
 * Çalıştır: node scripts/seed-blog-rest.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";

// Firebase CLI token'ını oku
function getFirebaseToken() {
  const cfgPath = resolve(homedir(), ".config/configstore/firebase-tools.json");
  const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
  return cfg.tokens?.access_token;
}

// Refresh token ile yeni access token al
async function refreshAccessToken() {
  const cfgPath = resolve(homedir(), ".config/configstore/firebase-tools.json");
  const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
  const refreshToken = cfg.tokens?.refresh_token;
  if (!refreshToken) throw new Error("Firebase refresh token bulunamadı. firebase login yapın.");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
      client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Token alınamadı: " + JSON.stringify(data));
  return data.access_token;
}

const PROJECT_ID = "mindid-75079";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Firestore REST API için değer dönüştürücü
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "string") return { stringValue: val };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") return { integerValue: String(val) };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (val && typeof val === "object" && val._seconds !== undefined) {
    return { timestampValue: new Date(val._seconds * 1000).toISOString() };
  }
  return { nullValue: null };
}

function toFirestoreDoc(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    fields[key] = toFirestoreValue(val);
  }
  return { fields };
}

async function addDoc(colPath, data, token) {
  const url = `${BASE_URL}/${colPath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toFirestoreDoc(data)),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore hata (${res.status}): ${err}`);
  }

  const doc = await res.json();
  return doc.name.split("/").pop();
}

// Blog yazıları
const nowSeconds = Math.floor(Date.now() / 1000);
const now = { _seconds: nowSeconds };

const posts = [
  {
    title: "AI Reklam Filmi İçin En İyi Prompt Örnekleri (2026)",
    titleEn: "Best AI Ad Film Prompt Examples (2026)",
    slug: "ai-reklam-filmi-prompt-ornekleri-2026",
    excerpt:
      "AI ile reklam filmi üretirken doğru prompt yazmak sonucun kalitesini doğrudan etkiler. Bu rehberde sektör bazlı onlarca gerçek prompt örneği bulacaksınız.",
    excerptEn:
      "Writing the right prompt for AI ad film production directly impacts the quality of your output. In this guide, you'll find dozens of real prompt examples organized by industry.",
    category: "film",
    tags: ["AI Prompt", "Reklam Filmi", "Video Üretimi", "Yapay Zeka"],
    coverImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&q=80",
    published: true,
    publishedAt: now,
    updatedAt: now,
    content: `## AI Reklam Filmi Promptu Neden Bu Kadar Önemli?

Yapay zeka, aylarca süren reklam prodüksiyonunu saatler içinde tamamlayabilir. Ancak sonucun kalitesi büyük ölçüde **ne söylediğinize** bağlıdır. Kötü bir prompt → vasat bir video. İyi bir prompt → marka kimliğinizi yansıtan, izleyiciyi etkileyen bir reklam filmi.

Bu rehberde farklı sektörler için hazır prompt şablonları paylaşıyoruz.

## Etkili Bir Prompt'un Anatomisi

İyi bir AI video promptu şu unsurları içermelidir:

- **Sahne tanımı:** Nerede geçiyor? (şehir, ofis, doğa, stüdyo)
- **Atmosfer/duygu:** Enerjik mi, sakin mi, lüks mü, eğlenceli mi?
- **Ana karakter veya ürün:** Kim/ne odak noktası?
- **Işık ve renk:** Sıcak tonda, soğuk, sinematik, parlak gün ışığı
- **Kamera hareketi:** Drone çekimi, yakın plan, ağır çekim
- **Ses/müzik yönlendirmesi:** Upbeat elektronik, orkestral, ambient

## Sektör Bazlı Prompt Örnekleri

### Teknoloji & SaaS

\`\`\`
Minimalist bir ofis ortamında, sabah ışığında çalışan genç bir profesyonel.
Laptop ekranında verimlilik yazılımının arayüzü görünüyor.
Sinematik ağır çekim, soğuk-beyaz renk paleti, teknik ve modern his.
Arka planda yumuşak ambient müzik. Süre: 30 saniye.
\`\`\`

### Gıda & Restoran

\`\`\`
Ahşap bir masada taze malzemelerle hazırlanan gurme burger,
buhar tüten patatesler yanında. Sıcak sarı-turuncu ışıklandırma,
makro lens yakın plan, suyu akıyor.
Mutlu aile atmosferi, rahat ve iştah açıcı his. 15 saniye, döngü uyumlu.
\`\`\`

### Moda & Giyim

\`\`\`
Şehir ortamında yürüyen genç kadın, yeni sezon koleksiyon kıyafetleri giymiş.
Altın saat ışığı (golden hour), şık ve özgüvenli yürüyüş,
ağır çekim, sinematik renk gradyan.
Vogue estetiği, lüks marka hissi. 20 saniye.
\`\`\`

### Sağlık & Wellness

\`\`\`
Sabah yogası yapan kişi, açık havada, güneş doğarken.
Sakin ve huzurlu atmosfer, yeşil-altın doğal renkler, geniş açı çekim.
Nefes egzersizi, meditasyon, sağlıklı yaşam mesajı.
Yumuşak piyano müziği eşliğinde. 30 saniye.
\`\`\`

### E-ticaret & Ürün

\`\`\`
Saf beyaz arka planda dönen premium kulaklık ürünü,
360 derece detay gösterimi. Parlak stüdyo ışığı, metalik yansımalar,
ürün özelliklerini gösteren animasyonlu metin efektleri.
Teknoloji markası estetiği. 15 saniye loop.
\`\`\`

### Eğitim & Kurs Platformu

\`\`\`
Renkli ve enerjik bir sınıf ortamı, farklı yaşlardan insanlar laptop'larla çalışıyor.
Başarı anı — biri elini kaldırıyor, öğretmen gülümsüyor.
Parlak, pozitif renkler, hızlı kesim montaj, motivasyonel his.
Upbeat background müzik, 20 saniye.
\`\`\`

## Gelişmiş Prompt Teknikleri

### Referans Stil Belirtmek

\`\`\`
Apple iPhone reklam estetiğinde, minimalist beyaz arka plan,
ürün odaklı, dramatik ışık-gölge oyunu...
\`\`\`

### Duygu Üzerinden Yönlendirmek

\`\`\`
İzleyicide "Ben de bunu istiyorum" hissi uyandıran,
FOMO yaratan, heyecan verici bir ürün tanıtımı...
\`\`\`

### Hedef Kitleye Göre Uyarlamak

\`\`\`
25-35 yaş arası şehirli profesyonellere hitap eden,
iş-yaşam dengesi temalı, LinkedIn formatına uygun...
\`\`\`

## MindID ile Farkı

Bu promptları kendi başınıza yapay zeka araçlarına girebilirsiniz. Ancak sonucun **gerçek bir reklamda kullanılabilir kalitede** olması için deneyim gerekir. MindID, promptlama sürecini, model seçimini ve son rötuşları sizin için yönetir.

**Sonuç:** Siz fikrinizi anlatın, biz profesyonel reklam filminizi teslim edelim.`,

    contentEn: `## Why Does Your AI Ad Film Prompt Matter So Much?

Artificial intelligence can complete months-long ad production in hours. But the quality depends heavily on **what you say**. A bad prompt → mediocre video. A great prompt → an ad film that reflects your brand and moves audiences.

## Anatomy of an Effective Prompt

- **Scene description:** Where does it take place?
- **Atmosphere/emotion:** Energetic, calm, luxury, fun?
- **Light and color:** Warm, cool, cinematic
- **Camera movement:** Drone shot, close-up, slow motion

## Industry Prompt Examples

### Technology & SaaS
\`\`\`
Young professional working in minimalist office in morning light.
Productivity software visible on laptop. Cinematic slow motion.
Cool-white color palette. Soft ambient music. 30 seconds.
\`\`\`

### Food & Restaurant
\`\`\`
Gourmet burger prepared with fresh ingredients on wooden table.
Warm yellow-orange lighting, macro close-up, juices running.
Happy family atmosphere. 15 seconds, loop-compatible.
\`\`\`

## MindID Advantage

MindID manages the prompting process, model selection, and final touches for you. You share your idea, we deliver your professional ad film.`,
  },
  {
    title: "AI Avatar Oluşturmak İçin Profesyonel Prompt Rehberi",
    titleEn: "Professional Prompt Guide for Creating AI Avatars",
    slug: "ai-avatar-prompt-rehberi",
    excerpt:
      "Şirketinizi veya marka karakterini AI avatar olarak oluşturmak için hangi promptları kullanmalısınız? Yüz tutarlılığından karakter kişiliğine kadar eksiksiz rehber.",
    excerptEn:
      "What prompts should you use to create your brand as an AI avatar? Complete guide from facial consistency to character personality.",
    category: "avatar",
    tags: ["AI Avatar", "Karakter Tasarımı", "Prompt Yazımı", "Dijital Kimlik"],
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    published: true,
    publishedAt: now,
    updatedAt: now,
    content: `## AI Avatar Nedir ve Neden Kullanılır?

**AI avatar**, gerçek bir kişinin görüntüsünden veya sıfırdan üretilen, konuşan ve hareket eden dijital bir karakter temsilcisidir. Şirketler bunu şu amaçlarla kullanır:

- Satış videoları ve ürün tanıtımları
- Eğitim ve onboarding içerikleri
- Sosyal medya içerikleri (TikTok, LinkedIn, Instagram)
- Müşteri hizmetleri botları
- Marka elçisi karakteri

## Başarılı Bir Avatar Promptunun Elementleri

### 1. Fiziksel Tanım

\`\`\`
30'lu yaşlarda, profesyonel görünümlü Türk kadın.
Koyu kahverengi saçlar, omuz hizasında düzgün taranmış.
Açık tenli, doğal makyaj. Sıcak ve güvenilir ifade.
İş ortamına uygun giysi: lacivert blazer, beyaz gömlek.
\`\`\`

### 2. Karakter Kişiliği

\`\`\`
Güven veren, uzman ve samimi bir danışman havası.
Konuşurken doğal el hareketleri kullanıyor.
Hafif gülümsüyor, seyirciye doğrudan bakıyor.
Enerjik ama sakin, otoriter ama ulaşılabilir.
\`\`\`

### 3. Arka Plan ve Ortam

\`\`\`
Modern, açık ofis ortamı. Arka planda cam bölmeler ve bitki.
Sıcak, profesyonel ışıklandırma. Defocus arka plan (bokeh efekti).
Marka renkleri: navy blue ve beyaz vurgu.
\`\`\`

### 4. Ses ve Dil Tonu

\`\`\`
Türkçe, net ve anlaşılır konuşma.
Profesyonel ama sıcak ton. Teknik jargondan kaçın.
Konuşma hızı: orta (saniyede 2.5 kelime).
\`\`\`

## Sektöre Göre Avatar Örnekleri

### Fintech / Bankacılık

\`\`\`
40'lı yaşlarda, güven veren erkek finans danışmanı.
Koyu takım elbise, saat, şık ama abartısız görünüm.
Arka plan: modern banka ofisi veya sade mavi gradient.
Ton: güven, uzmanlık, sakinlik.
\`\`\`

### E-ticaret / Ürün Tanıtım

\`\`\`
Genç, enerjik, ürünü kullanan ve öneren biri.
Casual kıyafet (hoodie veya günlük giysi), doğal duruş.
Parlak, renkli arka plan. Elinde veya yanında ürün var.
Ton: heyecanlı, arkadaşça, "bunu kullandım, harika!" hissi.
\`\`\`

### Eğitim / Kurs

\`\`\`
Öğretmen/mentor tipinde, 35-50 yaş arası, bilge görünümlü kişi.
Akıllı günlük giysi, gözlük seçeneği.
Arka plan: beyaz tahta veya kitaplık.
Ton: sabırlı, açıklayıcı, motive edici.
\`\`\`

### Sağlık / Klinik

\`\`\`
Beyaz önlüklü, profesyonel doktor veya hemşire görünümü.
Steril, temiz ortam. Güven veren, sakin ifade.
Ton: net, sakin, güven verici.
\`\`\`

## Yüz Tutarlılığı: Kritik Nokta

AI avatar üretimindeki en büyük zorluk, farklı videolarda aynı yüzü korumaktır:

1. **Kaynak fotoğraf kalitesi** yüksek olmalı (min. 1080p, iyi ışık)
2. **Referans prompt** her videoda tutarlı olmalı
3. **Model fine-tuning** ile karakterinizi "öğretebilirsiniz"

## Marka Karakteri (Maskot)

Gerçek bir kişi istemiyorsanız, tamamen yapay bir maskot:

\`\`\`
Friendly ve modern bir robot maskot.
Şirket renkleri kullanılsın.
Büyük, ifadeli gözler. Dost canlısı gülümseme.
Hem 2D animasyon hem 3D render versiyonu.
\`\`\`

## Sonuç

AI avatar, markanızın dijital yüzüdür. MindID, avatar projeleri için uçtan uca hizmet sunar — siz sadece nasıl göründüğünüzü ve ne söylemek istediğinizi anlatın.`,

    contentEn: `## What is an AI Avatar?

An **AI avatar** is a digital character representative that speaks and moves, generated from a real person or from scratch. Use cases include sales videos, onboarding content, social media, customer service bots, and brand ambassadors.

## Key Prompt Elements

### Physical Description
\`\`\`
Professional-looking woman in her 30s.
Dark brown hair, neatly combed. Natural makeup.
Warm and trustworthy expression. Navy blazer, white shirt.
\`\`\`

### Character Personality
\`\`\`
Trustworthy, expert, sincere consultant vibe.
Natural hand gestures. Slight smile looking at viewer.
Energetic but calm, authoritative but approachable.
\`\`\`

## Conclusion

MindID provides end-to-end avatar services — just tell us how you want to look and what you want to say.`,
  },
  {
    title: "Ürün Görseli İçin AI Prompt Örnekleri: Daha Az Bütçe, Daha Fazla Satış",
    titleEn: "AI Product Photo Prompt Examples: Less Budget, More Sales",
    slug: "urun-gorseli-ai-prompt-ornekleri",
    excerpt:
      "Stüdyo fotoğraf çekimi yapmadan profesyonel ürün görselleri oluşturabilirsiniz. Kozmetik, gıda, elektronik ve moda sektörü için hazır AI prompt örnekleri.",
    excerptEn:
      "Create professional product visuals without a studio shoot. Ready-to-use AI prompt examples for cosmetics, food, electronics, and fashion.",
    category: "visual",
    tags: ["Ürün Fotoğrafı", "AI Görsel", "E-ticaret", "Prompt Örnekleri"],
    coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    published: true,
    publishedAt: now,
    updatedAt: now,
    content: `## Geleneksel Ürün Fotoğrafçılığının Maliyeti

Ortalama bir stüdyo ürün çekimi için şunları ödersiniz:

- Stüdyo kirası: 500–2.000 ₺/gün
- Fotoğrafçı ücreti: 1.500–5.000 ₺
- Retouching: 200–500 ₺/fotoğraf
- Sahne kurulumu, aksesuarlar: 500–2.000 ₺

**Toplam: 1 ürün için 3.000–10.000 ₺**

AI ile aynı kaliteyi çoğu durumda bunun onda biri maliyetle elde edebilirsiniz.

## Ürün Görseli Promptunun Temel Unsurları

1. **Ürün tanımı:** Ne ürün? Renk, malzeme, boyut
2. **Arka plan:** Beyaz, doğal materyal, lifestyle, gradient
3. **Işık:** Soft box, doğal gün ışığı, dramatik, flat lay
4. **Açı:** Önden, yandan, üstten (flat lay), 45 derece
5. **Atmosfer:** Lüks, minimal, doğal, retro, futuristik
6. **Hedef platform:** Amazon, Instagram, web sitesi, katalog

## Sektör Bazlı Prompt Örnekleri

### Kozmetik & Cilt Bakımı

\`\`\`
Amber rengi cam şişede serum ürünü.
Arka plan: mermer yüzey, tropikal yapraklar ve pembe çiçekler.
Soft, difüz ışık, solda küçük gölge.
Şişe etrafında minik su damlaları — taze ve nemlendirici hissi.
Renk paleti: yeşil, krem, pembe. Lüks organik marka estetiği.
\`\`\`

### Gıda & İçecek

\`\`\`
Soğuk brew kahve, buzlu cam bardakta.
Ahşap masa, arka planda kahve çekirdekleri dağılmış.
Sabah güneş ışığı, kahve buharı görünür (steam efekti).
Sıcak kahverengi-krem tonlar. Instagram square format.
\`\`\`

### Elektronik & Teknoloji

\`\`\`
Matte siyah kablosuz kulaklık, saf beyaz arka plan.
Stüdyo spotlight ışığı, metalik detaylar parlıyor.
Yandan ve önden 45 derece açı.
Apple/Sony ürün fotoğrafı estetiği.
\`\`\`

### Moda & Aksesuar

\`\`\`
Deri el çantası, mermer zemin üzerinde.
Lifestyle: kahve fincanı ve güneş gözlüğü yanında.
Golden hour ışığı, pencereden giren gün ışığı.
Nötr tonlar: krem, bej, altın. Lüks ve şık his.
\`\`\`

### Takviye & Sağlık

\`\`\`
Beyaz plastik protein tozu kavanozu.
Ahşap masa, yeşil bitki, beyaz havlu arka plan.
Soft box ışık, ürün açıkça görünür.
Yanına ölçek kaşık ve shake bardağı ekle.
Güçlü, sağlıklı his. Matte ve doğal renk paleti.
\`\`\`

### Ev & Yaşam

\`\`\`
Seramik kupa, ahşap masada sabah kahvaltısı ortamı.
Taze meyve, gazete, güneşli pencere arka plan.
Scandi minimal estetik, bej-beyaz-krem tonlar.
Sıcak ve huzurlu "Sunday morning" hissi.
\`\`\`

## İleri Seviye: Arka Plan Değiştirme

Mevcut ürün fotoğrafınız varsa sadece arka planı değiştirebilirsiniz:

\`\`\`
Mevcut ürün görselini koru, sadece arka planı değiştir:
[İstediğiniz arka plan tanımı]
Ürün gölgesi ve yansıması doğal görünsün.
Işık kaynağı arka planla tutarlı olsun.
\`\`\`

## A/B Test İçin Varyasyonlar

- **Versiyon A:** Beyaz stüdyo (Amazon/Trendyol uyumlu)
- **Versiyon B:** Lifestyle ortam (Instagram için)
- **Versiyon C:** Flatlay (Pinterest/katalog için)

## Neden MindID?

Prompt yazmak bir başlangıç. Gerçek üretim sürecinde:

- Doğru AI modelini seçmek
- Ürün renklerini ve detaylarını korumak
- Marka renk paletine uyumlu olmak
- Platform gereksinimlerine göre boyutlandırmak

...gibi onlarca teknik detay var. MindID tüm süreci yönetir.

**Bir ürünün 10 farklı açı ve atmosfer görselini tek bir brief ile alabilirsiniz.**`,

    contentEn: `## The Cost of Traditional Product Photography

For an average studio product shoot: $100–300+ per product.
With AI, you get the same quality at a fraction of the cost.

## Industry Prompt Examples

### Cosmetics & Skincare
\`\`\`
Serum in amber glass bottle. Marble surface background with tropical leaves.
Soft diffused light. Tiny water droplets. Green, cream, pink palette.
Luxury organic brand aesthetic.
\`\`\`

### Electronics
\`\`\`
Matte black wireless headphones, pure white background.
Studio spotlight. Apple/Sony product photo aesthetic.
\`\`\`

### Background Replacement
\`\`\`
Keep existing product image, change only background to:
[Your desired background description]
Natural shadows and reflections. Consistent lighting.
\`\`\`

## Why MindID?

MindID manages the entire process. Get 10 different angles and atmospheres for one product with a single brief.`,
  },
];

// Ana fonksiyon
async function main() {
  console.log("🚀 Blog seed başlıyor...\n");

  let token;
  try {
    token = await refreshAccessToken();
    console.log("✅ Access token alındı\n");
  } catch (e) {
    console.error("Token hatası:", e.message);
    process.exit(1);
  }

  for (const post of posts) {
    try {
      const id = await addDoc("mindid_blog", post, token);
      console.log(`✅ "${post.title}"`);
      console.log(`   ID: ${id} | slug: ${post.slug}\n`);
    } catch (e) {
      console.error(`❌ Hata (${post.slug}):`, e.message);
    }
  }

  console.log(`🎉 Tamamlandı! ${posts.length} blog yazısı eklendi.`);
}

main();
