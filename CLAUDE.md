# MindID — Proje Kural Kitabi

## Dil / Language
- Claude her zaman TURKCE konusur ve yazar.
- Commit mesajlari INGILIZCE yazilir (conventional commits: feat:, fix:, chore:, docs:, refactor:, test:).
- Kod icerisindeki degisken ve fonksiyon adlari INGILIZCE olur.
- Kullaniciya yonelik UI metinleri Turkce VE Ingilizce desteklenir (i18n sistemi).

---

## Takim

### Seyma (Kurucu / Yonetici)
- Teknik arka plani yok, "vibe coding" yaklasimi ile calisiyor.
- Claude Cowork mode ile calisiyor.
- Gorevleri: pazarlama stratejisi, musteri yonetimi, icerik planlama, sosyal medya, takim yonetimi.
- **KURAL:** Seyma ile calisirken teknik jargon KULLANMA. Her seyi basit Turkce anlat, gerekirse benzetmelerle acikla.
- **KURAL:** Seyma bir karar verdiginde veya onemli bilgi payласtiginda, bu bilgiyi CLAUDE.md'ye kaydetmesini oner: "Bu bilgiyi CLAUDE.md'ye ekleyelim mi? Boylece bir dahaki seferde tekrar soylemene gerek kalmaz."
- **KURAL:** Tehlikeli islemlerden (dosya silme, deploy, force push) once Seyma'yi acikca uyar ve Burak'a danisilmasini oner.

### Burak (Yazilim Muhendisi)
- Uzman Claude Code kullanicisi, terminal modu kullanir.
- Gorevleri: teknik gelistirme, altyapi, n8n workflow'lari, agent/skill gelistirme, deploy, CI/CD.
- Tam teknik erisim ve karar yetkisi var.
- n8n workflow'lari ve skill dosyalari Burak tarafindan yonetilir.

### Beyza (Bilisim Muhendisi — Ogreniyor)
- Claude'u ogreniyor, Chat mode kullanir, kodlama yapabilir.
- Su an Seyma'ya asistanlik yapiyor, zamanla kendi gorevlerine donecek.
- Seyma ve Beyza esit gorevlendirme ile calisiyor.
- Gorevleri: frontend gelistirme, bug fix, test yazma, kod review.
- **KURAL:** Beyza ile calisirken ogretici ol. Neden yapidigini acikla, alternatiflerden bahset.
- **KURAL:** Tehlikeli islemlerden (deploy, toplu silme) once uyar ve Burak'a danisilmasini oner.
- **NOT:** Beyza'nin bilgisayarina Claude Code ayarlari kurulmali (global settings). Gorev listesi yeni sohbette hazirlanacak.

---

## Teknoloji Yigini
- **Framework:** Next.js 16 (App Router)
- **Dil:** TypeScript (strict mode)
- **Stil:** Tailwind CSS 4
- **UI Bilesenleri:** Radix UI
- **Backend:** Firebase (Auth, Firestore, Storage, Functions)
- **Deploy:** Netlify (https://mindid.shop)
- **i18n:** Turkce (varsayilan) + Ingilizce (cookie tabanli: lang)
- **Paket Yoneticisi:** npm
- **Analytics:** Google Analytics (GA4)

## Proje Yapisi
```
src/
  app/            → Next.js App Router sayfalari
    admin/        → Yonetim paneli (Firebase Auth ile korunuyor)
    blog/         → Blog sayfalari (Firestore'dan veri)
    portfolio/    → Portfolyo sayfalari (REST API ile veri)
    configure/    → Hizmet yapilandirici (fiyatlandirma)
  components/     → React bilesenleri
    admin/        → Yonetim paneli bilesenleri
    blog/         → Blog bilesenleri
    content-pages/ → Statik icerik sayfalari
    ui/           → Genel UI bilesenleri (WhatsApp, slider)
  lib/            → Yardimci fonksiyonlar
    hooks/        → Custom React hook'lari (useFirestore)
    firebase.ts   → Firebase baglantisi
    i18n.tsx      → Ceviri sistemi
    types.ts      → Konfigurator tipleri
    firestore-types.ts → Firestore dokuman tipleri
    pricing-data.ts    → Fiyatlandirma tablosu
    portfolio-server.ts → Portfolyo veri cekme (REST API)
    order-service.ts   → Siparis gonderme
    cn.ts          → Tailwind class birlestirici (clsx)
functions/        → Firebase Cloud Functions (siparis email bildirimi)
public/           → Statik dosyalar (logo, favicon, og-image)
```

## Kod Kurallari
- Fonksiyonel bilesenlerde arrow function kullan: `const Component = () => {}`
- Named export tercih et: `export const Component` (default export degil)
- Tailwind class'lari dogrudan kullan, ozel CSS yazma (globals.css haricinde).
- Bilesenler kucuk ve tek sorumluluklu olsun.
- `@/*` path alias'i kullan: `import { db } from "@/lib/firebase"`
- Tip tanimlari `src/lib/types.ts` ve `src/lib/firestore-types.ts` icinde.
- `cn()` fonksiyonu Tailwind class birlestirmek icin: `import { cn } from "@/lib/cn"`

## Git Kurallari
- Ise baslamadan once: `git fetch origin`
- Kullanici onayindan sonra: `git push`
- **ASLA** force push yapma (master branch'e).
- **ASLA** `.env.local` dosyasini commit'leme.

## Deploy Sureci
1. `npm run build` — hata yoksa devam
2. Netlify otomatik deploy (GitHub push ile tetiklenir)
3. Firebase Functions ayri deploy: `firebase deploy --only functions` (sadece Burak yapar)

## MCP Entegrasyonlari
- **Supabase:** Veritabani yonetimi
- **Netlify:** Deploy ve site yonetimi
- **Google Calendar:** Takvim yonetimi
- **Gmail:** E-posta yonetimi
- **Canva:** Gorsel tasarim
- **Cray:** Otomasyon workflow'lari (n8n ve Apollo'dan gecis yapiliyor)
- **Claude Preview:** Canli onizleme ve test
- **Claude in Chrome:** Tarayici otomasyonu
- **Google Drive:** Dosya erisimi

## Dokunulmamasi Gerekenler
- `competitive-site-analysis.skill` → Burak'in skill dosyasi. Silme, degistirme.
- Root'taki `.docx` ve `.xlsx` dosyalari → Seyma'nin strateji raporlari. Repo'ya commit ETME.
- `C:/Users/asus/.n8n/` → Burak'in n8n workflow veritabani. Dokunma.
- `functions/` → Firebase Cloud Functions. Degisiklik yapmadan once Burak'a danisilmali.
- `C:/Users/asus/OneDrive/Desktop/pazarlaMa Growth/` → Seyma'nin satis sistemi.

## Kapanmis Projeler
- **ari-personel**: Kapanmis musteri projesi. Bu projeye referans verme, dosyalarini okuma, orneklerinde kullanma. Hukuki nedenlerle dosyalar saklanmaktadir ancak Claude icin ilgisizdir.

## Agent Buyume Stratejisi (Az Insan, Cok Agent)
**Vizyon:** 3 kisilik ekiple 10+ musteriye hizmet vermek. Tekrar eden her gorevi agent'a devret.
**Durum:** Strateji yeniden planlanacak. Detaylar yeni sohbette Seyma ile birlikte olusturulacak.

---

## Seyma icin Hafiza Notu
Seyma, Claude'a soyledigin onemli bilgileri (musteri kararlari, fiyat degisiklikleri, strateji degisiklikleri) bu dosyaya kaydetmeni sagla. Claude'a "Bu bilgiyi CLAUDE.md'ye ekle" de, Claude ekleyecektir. Boylece bir sonraki oturumda Claude her seyi hatirlar.
