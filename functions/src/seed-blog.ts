/**
 * Blog Seed Script (Firebase Admin SDK)
 * Çalıştırmak için (functions/ klasöründen):
 *   npx tsx src/seed-blog.ts
 */

import * as admin from "firebase-admin";

admin.initializeApp({ projectId: "mindid-75079" });
const db = admin.firestore();

const now = admin.firestore.Timestamp.now();

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

AI'a stilistik bir referans verin:

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

Artificial intelligence can complete months-long ad production in hours. But the quality of the output depends heavily on **what you say**. A bad prompt → mediocre video. A great prompt → an ad film that reflects your brand and moves audiences.

## Anatomy of an Effective Prompt

A good AI video prompt includes:

- **Scene description:** Where does it take place? (city, office, nature, studio)
- **Atmosphere/emotion:** Energetic, calm, luxury, fun?
- **Main character or product:** What/who is the focus?
- **Light and color:** Warm tone, cool, cinematic, bright daylight
- **Camera movement:** Drone shot, close-up, slow motion
- **Sound/music guidance:** Upbeat electronic, orchestral, ambient

## Industry-Specific Prompt Examples

### Technology & SaaS
\`\`\`
A young professional working in a minimalist office in morning light.
Productivity software interface visible on laptop screen.
Cinematic slow motion, cool-white color palette, technical and modern feel.
Soft ambient music in background. Duration: 30 seconds.
\`\`\`

### Food & Restaurant
\`\`\`
Gourmet burger being prepared with fresh ingredients on a wooden table,
steaming fries on the side. Warm yellow-orange lighting,
macro lens close-up, juices running. 15 seconds, loop-compatible.
\`\`\`

## MindID Advantage

You can enter these prompts into AI tools yourself. But achieving **quality usable in real advertising** requires experience. MindID manages the prompting process, model selection, and final touches for you.`,
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
Vurgu: önemli kelimelerde hafif tonlama değişimi.
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

## Avatar'da Yüz Tutarlılığı: Kritik Nokta

AI avatar üretimindeki en büyük zorluk, farklı videolarda aynı yüzü korumaktır. Bunu sağlamak için:

1. **Kaynak fotoğraf kalitesi** yüksek olmalı (min. 1080p, iyi ışık)
2. **Referans prompt** her videoda tutarlı olmalı
3. **Model fine-tuning** ile karakterinizi "öğretebilirsiniz"

MindID, avatar projelerinde karakter tutarlılığını garanti altına alır.

## Marka Karakteri (Maskot) Oluşturma

Gerçek bir kişi kullanmak istemiyorsanız, tamamen yapay bir marka maskotu oluşturabilirsiniz:

\`\`\`
Friendly ve modern bir robot maskot.
Şirket renkleri: mavi ve turuncu.
Büyük, ifadeli gözler. Dost canlısı gülümseme.
Hem 2D animasyon hem de 3D render versiyonu.
\`\`\`

## Sonuç

AI avatar, markanızın dijital yüzüdür. MindID, avatar projeleri için uçtan uca hizmet sunar — siz sadece nasıl göründüğünüzü ve ne söylemek istediğinizi anlatın.`,

    contentEn: `## What is an AI Avatar and Why Use One?

An **AI avatar** is a digital character representative — generated from a real person's image or from scratch — that speaks and moves. Companies use them for:

- Sales videos and product introductions
- Training and onboarding content
- Social media content (TikTok, LinkedIn, Instagram)
- Customer service bots
- Brand ambassador characters

## Elements of a Successful Avatar Prompt

### 1. Physical Description
\`\`\`
Professional-looking woman in her 30s.
Dark brown hair, neatly combed to shoulder length.
Natural makeup. Warm and trustworthy expression.
Professional attire: navy blazer, white shirt.
\`\`\`

### 2. Character Personality
\`\`\`
Trustworthy, expert and sincere consultant vibe.
Natural hand gestures while speaking.
Slight smile, looking directly at the viewer.
Energetic but calm, authoritative but approachable.
\`\`\`

## Conclusion

An AI avatar is your brand's digital face. MindID provides end-to-end service for avatar projects — just tell us how you want to look and what you want to say.`,
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
Ahşap masa, yeşil bitki, beyaz havlu.
Soft box ışık, ürün açıkça görünür.
Yanına bir ölçek kaşık ve shake bardağı ekle.
Güçlü, sağlıklı his. Matte ve doğal renk paleti.
\`\`\`

### Ev & Yaşam

\`\`\`
Seramik kupa, ahşap masada sabah kahvaltısı ortamı.
Taze meyve, gazete, güneşli pencere arka plan.
Scandi minimal estetik, bej-beyaz-krem tonlar.
Sıcak ve huzurlu "Sunday morning" hissi.
\`\`\`

## İleri Seviye Teknikler

### Mevcut Ürün Fotoğrafı Varsa: Arka Plan Değiştirme

\`\`\`
Mevcut ürün görselini koru, sadece arka planı değiştir:
[İstediğiniz arka plan tanımı]
Ürün gölgesi ve yansıması doğal görünsün.
Işık kaynağı arka planla tutarlı olsun.
\`\`\`

### A/B Test İçin Varyasyonlar

Aynı ürün için farklı arka planlar test edebilirsiniz:
- **Versiyon A:** Beyaz stüdyo (Amazon/Trendyol uyumlu)
- **Versiyon B:** Lifestyle ortam (Instagram için)
- **Versiyon C:** Flatlay (Pinterest/katalog için)

### Sezonluk Kampanya

\`\`\`
Yılbaşı temalı kozmetik seti.
Kırmızı ve altın hediye kutuları ortamı, çam dalları.
Yumuşak bokeh arka plan, sıcak ışık kaynakları.
"Gift set" hissi, lüks ambalaj.
\`\`\`

## Neden MindID?

Prompt yazmak bir başlangıç. Gerçek üretim sürecinde:

- Doğru AI modelini seçmek
- Ürün renklerini ve detaylarını korumak
- Marka renk paletine uyumlu olmak
- Platform gereksinimlerine göre boyutlandırmak

...gibi onlarca teknik detay var. MindID tüm süreci yönetir.

**Bir ürünün 10 farklı açı ve atmosfer görselini tek bir brief ile alabilirsiniz.**`,

    contentEn: `## The Cost of Traditional Product Photography

For an average studio product shoot you'll pay:
- Studio rental: $15–60/day
- Photographer fee: $50–150
- Retouching: $10–30/photo

**Total: $100–300+ per product**

With AI, you get the same quality at a fraction of the cost.

## Industry-Specific Prompt Examples

### Cosmetics & Skincare
\`\`\`
Serum product in an amber glass bottle.
Background: marble surface with tropical leaves and pink flowers.
Soft diffused light, small shadow on the left.
Tiny water droplets around the bottle — fresh and moisturizing feel.
Color palette: green, cream, pink. Luxury organic brand aesthetic.
\`\`\`

### Electronics & Tech
\`\`\`
Matte black wireless headphones, pure white background.
Studio spotlight, metallic details gleaming.
45-degree angle shot. Apple/Sony product photo aesthetic.
\`\`\`

## Why MindID?

MindID manages the entire process — model selection, color preservation, brand palette matching, and platform sizing.

**Get 10 different angles and atmospheres for one product with a single brief.**`,
  },
];

async function seed() {
  console.log("🚀 Blog seed başlıyor...\n");
  const col = db.collection("mindid_blog");

  for (const post of posts) {
    const ref = await col.add(post);
    console.log(`✅ "${post.title}"`);
    console.log(`   ID: ${ref.id} | slug: ${post.slug}\n`);
  }

  console.log(`🎉 Tamamlandı! ${posts.length} blog yazısı eklendi.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Hata:", err);
  process.exit(1);
});
