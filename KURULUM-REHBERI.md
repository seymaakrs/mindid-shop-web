# MindID — Kalan Kurulum Adımları

Aşağıdaki 3 adımı kendi bilgisayarından terminal (komut satırı) açarak yapman gerekiyor.
Her adımda komutları kopyala-yapıştır yap.

---

## ADIM 1: Firebase Functions Deploy

Bu adım, sipariş geldiğinde otomatik e-posta gönderen sistemi canlıya alır.

### 1a. Firebase CLI Kur

Terminali aç ve şu komutu yapıştır:

```bash
npm install -g firebase-tools
```

### 1b. Firebase'e Giriş Yap

```bash
firebase login
```

Tarayıcı açılır → Google hesabınla giriş yap (seymaakrs@gmail.com).

### 1c. Resend API Key Al

1. Tarayıcıda şu adrese git: https://resend.com
2. "Sign Up" ile ücretsiz hesap aç (GitHub veya e-posta ile)
3. Giriş yaptıktan sonra sol menüde **"API Keys"** tıkla
4. **"Create API Key"** tıkla
5. İsim olarak `mindid-production` yaz
6. **Kopyala** — `re_` ile başlayan uzun bir anahtar olacak

### 1d. API Key'i Firebase'e Kaydet

Terminalde şu komutu çalıştır:

```bash
firebase functions:secrets:set RESEND_API_KEY
```

Senden değer girmeni ister → Kopyaladığın `re_...` anahtarını yapıştır ve Enter bas.

### 1e. Functions'ı Deploy Et

Proje klasöründeyken:

```bash
cd mindid-site
cd functions && npm run build && cd ..
firebase deploy --only functions
```

"Deploy complete!" mesajını görürsen başarılı.

---

## ADIM 2: Resend Domain Doğrulaması

Bu adım, e-postaların `noreply@mindid.shop` adresinden gönderilmesini sağlar.

### 2a. Resend'de Domain Ekle

1. https://resend.com/domains adresine git
2. **"Add Domain"** tıkla
3. `mindid.shop` yaz ve ekle
4. Resend sana DNS kayıtları verecek (genellikle 3 kayıt):
   - 1 adet **TXT** kaydı (SPF veya doğrulama)
   - 1 adet **CNAME** kaydı (DKIM)
   - 1 adet **MX** kaydı (isteğe bağlı)

### 2b. DNS Kayıtlarını Ekle

1. Domain sağlayıcının paneline git (Namecheap, GoDaddy, Google Domains vs.)
2. DNS yönetimi bölümüne gir
3. Resend'in verdiği kayıtları tek tek ekle
4. Kaydet

### 2c. Doğrulamayı Bekle

- Resend panelinde **"Verify"** butonuna tıkla
- DNS yayılması 5 dakika - 48 saat sürebilir
- Genellikle 5-30 dakika içinde tamamlanır
- Durum "Verified" olduğunda e-postalar çalışır

---

## ADIM 3: Google Search Console

Bu adım, sitenin Google'da indexlenmesini ve arama performansını takip etmeni sağlar.

### 3a. Search Console'a Git

1. https://search.google.com/search-console adresine git
2. Google hesabınla giriş yap

### 3b. Site Ekle

1. **"Mülk ekle" (Add Property)** tıkla
2. Sol tarafta **"URL Prefix"** seç
3. `https://mindid.shop` yaz ve "Devam" tıkla

### 3c. Sahipliği Doğrula

En kolay yöntem **HTML etiketi**:
1. Google sana bir `<meta>` etiketi verecek
2. Bu etiketi bana söyle, ben koda ekleyeyim

Alternatif: DNS doğrulama:
1. "Alan adı sağlayıcısı" seçeneğini seç
2. Google sana bir TXT kaydı verecek
3. Domain DNS ayarlarına bu TXT kaydını ekle
4. "Doğrula" tıkla

### 3d. Sitemap Gönder

Doğrulama tamamlandıktan sonra:
1. Sol menüde **"Site Haritaları" (Sitemaps)** tıkla
2. Kutuya `sitemap.xml` yaz
3. **"Gönder"** tıkla
4. Durum "Başarılı" olmalı

---

## Kontrol Listesi

- [ ] Firebase CLI kuruldu
- [ ] Firebase'e giriş yapıldı
- [ ] Resend hesabı açıldı
- [ ] Resend API Key alındı ve Firebase'e kaydedildi
- [ ] Firebase Functions deploy edildi
- [ ] Resend'de mindid.shop eklendi
- [ ] DNS kayıtları domain paneline eklendi
- [ ] Domain doğrulandı (Verified)
- [ ] Google Search Console'a site eklendi
- [ ] Sahiplik doğrulandı
- [ ] Sitemap gönderildi

---

## Yardım Gerekirse

Herhangi bir adımda takılırsan, ekran görüntüsü at veya hata mesajını paylaş.
Chrome tarayıcı uzantısını bağlarsan (Claude in Chrome), bu adımları senin yerine yapabilirim.
