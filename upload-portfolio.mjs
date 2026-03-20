#!/usr/bin/env node
/**
 * MindID Portfolio Toplu Video Yükleme Scripti
 *
 * KULLANIM:
 * 1. mindid-site klasörüne git: cd mindid-site
 * 2. Scripti çalıştır: node upload-portfolio.mjs
 *
 * NOT: Bu script PORTFOLYO klasörünün Desktop'ta (../PORTFOLYO/) olduğunu varsayar.
 * Firebase node_modules zaten mevcut olmalı (npm install yapılmışsa).
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readFileSync, statSync, existsSync } from "fs";
import { basename, join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMFIE-sWKLvrWtdSqGt6bACU4clDT_boc",
  authDomain: "mindid-75079.firebaseapp.com",
  projectId: "mindid-75079",
  storageBucket: "mindid-75079.firebasestorage.app",
  messagingSenderId: "561012536316",
  appId: "1:561012536316:web:11aa021d42142cca977879",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const EMAIL = "seymaakrs@gmail.com";
const PASSWORD = "teknolojiai1.";

// Base directory - PORTFOLYO is sibling of mindid-site on Desktop
const PORTFOLYO_DIR = resolve(__dirname, "..", "PORTFOLYO");
const MAX_SIZE_MB = 700;

// Pre-analyzed portrait videos list (height > width, ≤700MB)
// Paths relative to PORTFOLYO_DIR
const PORTRAIT_VIDEOS = [
  // === ANA KLASÖR - REKLAM VİDEOLARI ===
  { file: "Aİ REKLAM AVATAR REKLAM.mp4", category: "avatar", title: "Avatar Reklam", titleEn: "Avatar Ad" },
  { file: "Aİ REKLAM IG ABİYE.mp4", category: "moda", title: "IG Abiye", titleEn: "Instagram Evening Dress" },
  { file: "Aİ REKLAM KOZMATİK.mp4", category: "kozmetik", title: "Kozmetik", titleEn: "Cosmetics" },
  { file: "Aİ REKLAM PARFÜM.mp4", category: "parfüm", title: "Parfüm", titleEn: "Perfume" },
  { file: "Aİ REKLAM PERDE.mp4", category: "perde", title: "Perde", titleEn: "Curtain" },
  { file: "Aİ REKLAM REZİDANS.mp4", category: "emlak", title: "Rezidans", titleEn: "Residence" },
  { file: "Aİ REKLAM SEHPA.mp4", category: "mobilya", title: "Sehpa", titleEn: "Coffee Table" },
  { file: "Aİ REKLAM SY PARFÜM.mp4", category: "parfüm", title: "SY Parfüm", titleEn: "SY Perfume" },
  { file: "Aİ REKLAM SYPARFÜM 2..mp4", category: "parfüm", title: "SY Parfüm 2", titleEn: "SY Perfume 2" },
  { file: "Aİ REKLAM TRVAİNŞAAT-MUTFAK.mp4", category: "inşaat", title: "TRV İnşaat - Mutfak", titleEn: "TRV Construction - Kitchen" },
  { file: "Aİ REKLAM YEMEK.mp4", category: "yemek", title: "Yemek", titleEn: "Food" },
  { file: "Aİ REKLAM1TRVAİNŞAAT.mp4", category: "inşaat", title: "TRV İnşaat 1", titleEn: "TRV Construction 1" },
  { file: "Aİ REKLAMTRVAİNŞAAT.mp4", category: "inşaat", title: "TRV İnşaat", titleEn: "TRV Construction" },
  { file: "NAİL ART REKLAM.mp4", category: "nail-art", title: "Nail Art Reklam", titleEn: "Nail Art Ad" },

  // === Aİ İNSTAGRAM REELS ===
  { file: "Aİ İNSTAGRAM REELS/Aİ REELS ARABA.mp4", category: "reels", title: "Reels - Araba", titleEn: "Reels - Car" },
  { file: "Aİ İNSTAGRAM REELS/Aİ REELS.mp4", category: "reels", title: "Reels", titleEn: "Reels" },
  { file: "Aİ İNSTAGRAM REELS/Aİ REKLAM IG .mp4", category: "reels", title: "Instagram Reklam", titleEn: "Instagram Ad" },
  { file: "Aİ İNSTAGRAM REELS/Aİ REKLAM IG-KOZMETİK.mp4", category: "reels", title: "IG Kozmetik", titleEn: "Instagram Cosmetics" },
  { file: "Aİ İNSTAGRAM REELS/Aİ REKLAM IG.mp4", category: "reels", title: "Instagram Reklam 2", titleEn: "Instagram Ad 2" },
  { file: "Aİ İNSTAGRAM REELS/Aİ REKLAM IG3.mp4", category: "reels", title: "Instagram Reklam 3", titleEn: "Instagram Ad 3" },

  // === Aİ STÜDYO ===
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/1.mp4", category: "stüdyo", title: "Stüdyo 1", titleEn: "Studio 1" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/2.mp4", category: "stüdyo", title: "Stüdyo 2", titleEn: "Studio 2" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/3.mp4", category: "stüdyo", title: "Stüdyo 3", titleEn: "Studio 3" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/4.mp4", category: "stüdyo", title: "Stüdyo 4", titleEn: "Studio 4" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/5.mp4", category: "stüdyo", title: "Stüdyo 5", titleEn: "Studio 5" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/6.mp4", category: "stüdyo", title: "Stüdyo 6", titleEn: "Studio 6" },
  { file: "Aİ İNSTAGRAM REELS/Aİ STÜDYO/7.mp4", category: "stüdyo", title: "Stüdyo 7", titleEn: "Studio 7" },

  // === MARKASIZ - İÇ MEKAN ===
  { file: "markasız/GİRİŞ (1).mp4", category: "iç-mekan", title: "İç Mekan - Giriş", titleEn: "Interior - Entrance" },
  { file: "markasız/mutfak full markasız.mp4", category: "iç-mekan", title: "İç Mekan - Mutfak", titleEn: "Interior - Kitchen" },
  { file: "markasız/yatayodası başlangıç (1).mp4", category: "iç-mekan", title: "İç Mekan - Yatak Odası", titleEn: "Interior - Bedroom" },

  // === MARKASIZ - BANYO / DIŞ ÇEKİM ===
  { file: "markasız/banyo/dış çekim ev/DIŞ ÇEKİM.mp4", category: "iç-mekan", title: "Dış Çekim - Ev", titleEn: "Exterior - House" },
  { file: "markasız/banyo/dış çekim ev/dış2.mp4", category: "iç-mekan", title: "Dış Çekim 2", titleEn: "Exterior 2" },
  { file: "markasız/banyo/dış çekim ev/dış22.mp4", category: "iç-mekan", title: "Dış Çekim 3", titleEn: "Exterior 3" },
  { file: "markasız/banyo/dış çekim ev/dışi.mp4", category: "iç-mekan", title: "Dış Çekim 4", titleEn: "Exterior 4" },
  { file: "markasız/banyo/dış çekim ev/dışson.mp4", category: "iç-mekan", title: "Dış Çekim - Final", titleEn: "Exterior - Final" },
  { file: "markasız/banyo/dış çekim ev/fnl.mp4", category: "iç-mekan", title: "Dış Çekim - Son", titleEn: "Exterior - End" },
  { file: "markasız/banyo/dış çekim ev/_shot__202511210327_v2trc.mp4", category: "iç-mekan", title: "Dış Çekim - Shot", titleEn: "Exterior - Shot" },
  { file: "markasız/banyo/MURFAK FULL HD.mp4", category: "iç-mekan", title: "Mutfak Full HD", titleEn: "Kitchen Full HD" },
  { file: "markasız/banyo/mutfak full HD.mp4", category: "iç-mekan", title: "Mutfak Full HD 2", titleEn: "Kitchen Full HD 2" },

  // === MARKASIZ - YATAK ODASI ===
  { file: "markasız/banyo/yatakodası/2.sahne.mp4", category: "iç-mekan", title: "Yatak Odası - Sahne 2", titleEn: "Bedroom - Scene 2" },
  { file: "markasız/banyo/yatakodası/86d0e3c7-e05f-41c6-a157-05b1a9e1a7b6.mp4", category: "iç-mekan", title: "Yatak Odası - Çekim", titleEn: "Bedroom - Shot" },
  { file: "markasız/banyo/yatakodası/giriiş.mp4", category: "iç-mekan", title: "Yatak Odası - Giriş", titleEn: "Bedroom - Entrance" },
  { file: "markasız/banyo/yatakodası/il 3 sn.mp4", category: "iç-mekan", title: "Yatak Odası - İlk 3 Saniye", titleEn: "Bedroom - First 3 Seconds" },
  { file: "markasız/banyo/yatakodası/ilk üç sn.mp4", category: "iç-mekan", title: "Yatak Odası - İlk Üç Saniye", titleEn: "Bedroom - First Three Seconds" },
  { file: "markasız/banyo/yatakodası/KIZLAR  KONUŞMA.mp4", category: "iç-mekan", title: "Yatak Odası - Kızlar Konuşma", titleEn: "Bedroom - Girls Talking" },
  { file: "markasız/banyo/yatakodası/KIZLAR KOMİK.mp4", category: "iç-mekan", title: "Yatak Odası - Kızlar Komik", titleEn: "Bedroom - Girls Fun" },
  { file: "markasız/banyo/yatakodası/KOMİK KIZLAR.mp4", category: "iç-mekan", title: "Yatak Odası - Komik Kızlar", titleEn: "Bedroom - Fun Girls" },
  { file: "markasız/banyo/yatakodası/ODA VİDEO.mp4", category: "iç-mekan", title: "Yatak Odası - Video", titleEn: "Bedroom - Video" },
  { file: "markasız/banyo/yatakodası/ODA2.mp4", category: "iç-mekan", title: "Yatak Odası 2", titleEn: "Bedroom 2" },
  { file: "markasız/banyo/yatakodası/ses kullan.mp4", category: "iç-mekan", title: "Yatak Odası - Ses", titleEn: "Bedroom - Sound" },
  { file: "markasız/banyo/yatakodası/son sn kullan.mp4", category: "iç-mekan", title: "Yatak Odası - Son Saniye", titleEn: "Bedroom - Last Second" },
  { file: "markasız/banyo/yatakodası/yatayodası başlangıç.mp4", category: "iç-mekan", title: "Yatak Odası - Başlangıç", titleEn: "Bedroom - Beginning" },
  { file: "markasız/banyo/yatakodası/çekim.mp4", category: "iç-mekan", title: "Yatak Odası - Çekim", titleEn: "Bedroom - Footage" },
];

// Upload file to Firebase Storage with retry
async function uploadToStorage(filePath, storagePath, retries = 2) {
  const fileBuffer = readFileSync(filePath);
  const contentType = "video/mp4";
  const storageRef = ref(storage, storagePath);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, fileBuffer, { contentType });
        const fileName = basename(filePath);

        task.on(
          "state_changed",
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (pct % 10 === 0) process.stdout.write(`\r  ${fileName}: %${pct}  `);
          },
          (error) => reject(error),
          async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            process.stdout.write(`\r  ${fileName}: %100 ✓\n`);
            resolve(url);
          }
        );
      });
    } catch (err) {
      if (attempt < retries) {
        console.log(`  ⚠ Yeniden deneniyor... (${attempt + 1}/${retries})`);
        await new Promise(r => setTimeout(r, 3000));
      } else {
        throw err;
      }
    }
  }
}

// Get current max order from existing portfolio items
async function getMaxOrder() {
  try {
    const q = query(collection(db, "mindid_portfolio"), orderBy("order", "desc"));
    const snap = await getDocs(q);
    if (snap.docs.length > 0) {
      return snap.docs[0].data().order || 0;
    }
  } catch {}
  return 0;
}

// Main
async function main() {
  console.log("=".repeat(60));
  console.log("  MindID Portfolio Toplu Video Yükleme");
  console.log("=".repeat(60));
  console.log(`\nPORTFOLYO klasörü: ${PORTFOLYO_DIR}`);

  // Verify PORTFOLYO directory exists
  if (!existsSync(PORTFOLYO_DIR)) {
    console.error(`\n✗ PORTFOLYO klasörü bulunamadı: ${PORTFOLYO_DIR}`);
    console.error("  Bu scripti mindid-site klasöründen çalıştırdığınızdan emin olun.");
    console.error("  PORTFOLYO klasörünün Desktop'ta olması gerekir.");
    process.exit(1);
  }

  // Check which files exist
  console.log("\n📂 Dosyalar kontrol ediliyor...");
  const validVideos = [];
  const missingVideos = [];

  for (const video of PORTRAIT_VIDEOS) {
    const fullPath = join(PORTFOLYO_DIR, video.file);
    if (existsSync(fullPath)) {
      const stats = statSync(fullPath);
      const sizeMB = Math.round(stats.size / 1048576);
      if (sizeMB <= MAX_SIZE_MB) {
        validVideos.push({ ...video, fullPath, sizeMB });
      } else {
        console.log(`  ⏭ Atlandı (${sizeMB}MB > ${MAX_SIZE_MB}MB): ${video.file}`);
      }
    } else {
      missingVideos.push(video.file);
    }
  }

  console.log(`\n✓ ${validVideos.length} video bulundu`);
  if (missingVideos.length > 0) {
    console.log(`⚠ ${missingVideos.length} dosya bulunamadı (atlandı)`);
  }

  const totalSizeMB = validVideos.reduce((sum, v) => sum + v.sizeMB, 0);
  console.log(`📦 Toplam boyut: ${totalSizeMB}MB (~${(totalSizeMB / 1024).toFixed(1)}GB)`);

  // Sign in
  console.log("\n🔑 Firebase'e giriş yapılıyor...");
  try {
    await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    console.log("✓ Giriş başarılı!\n");
  } catch (err) {
    console.error("✗ Giriş başarısız:", err.message);
    process.exit(1);
  }

  // Get current max order
  let currentOrder = await getMaxOrder();
  console.log(`📊 Mevcut max sıra numarası: ${currentOrder}\n`);
  console.log("=".repeat(60));
  console.log("  YÜKLEME BAŞLIYOR");
  console.log("=".repeat(60));

  const results = { success: 0, failed: 0, skipped: 0, errors: [] };

  for (let i = 0; i < validVideos.length; i++) {
    const video = validVideos[i];
    currentOrder++;

    console.log(`\n[${i + 1}/${validVideos.length}] "${video.title}" (${video.sizeMB}MB)`);

    try {
      // Generate unique storage path
      const uniqueId = `upload_${Date.now()}_${i}`;
      const storagePath = `mindid-site/portfolio/${uniqueId}/video.mp4`;

      // Upload video
      const videoUrl = await uploadToStorage(video.fullPath, storagePath);

      // Create Firestore document
      console.log("  📝 Veritabanı kaydı oluşturuluyor...");
      await addDoc(collection(db, "mindid_portfolio"), {
        title: video.title,
        titleEn: video.titleEn,
        description: `${video.category} kategorisinde AI video içerik`,
        descriptionEn: `AI video content in ${video.category} category`,
        thumbnailUrl: "",
        videoUrl,
        category: video.category,
        order: currentOrder,
        visible: true,
        createdAt: Timestamp.now(),
      });

      console.log(`  ✅ Başarılı! (sıra: ${currentOrder})`);
      results.success++;
    } catch (err) {
      console.error(`  ❌ Hata: ${err.message}`);
      results.failed++;
      results.errors.push({ title: video.title, error: err.message });
    }
  }

  // Final report
  console.log("\n\n" + "=".repeat(60));
  console.log("  SONUÇ RAPORU");
  console.log("=".repeat(60));
  console.log(`  ✅ Başarılı yükleme: ${results.success}`);
  console.log(`  ❌ Başarısız: ${results.failed}`);
  console.log(`  ⏭ Atlanan: ${results.skipped}`);
  if (results.errors.length > 0) {
    console.log("\n  Hatalar:");
    results.errors.forEach(e => console.log(`    - ${e.title}: ${e.error}`));
  }
  console.log("\n" + "=".repeat(60));
  console.log("  mindid.shop/admin/portfolio adresinden kontrol edebilirsiniz.");
  console.log("=".repeat(60));

  // Force exit (Firebase keeps connections open)
  setTimeout(() => process.exit(0), 2000);
}

main().catch((err) => {
  console.error("Beklenmeyen hata:", err);
  process.exit(1);
});
