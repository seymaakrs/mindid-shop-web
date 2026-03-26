/**
 * Firestore Composite Index oluşturma scripti
 * Çalıştır: node scripts/create-firestore-index.mjs
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";

async function getToken() {
  const cfg = JSON.parse(readFileSync(resolve(homedir(), ".config/configstore/firebase-tools.json"), "utf8"));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: cfg.tokens.refresh_token,
      client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
      client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token alınamadı: " + JSON.stringify(data));
  return data.access_token;
}

const PROJECT_ID = "mindid-75079";

async function main() {
  const token = await getToken();

  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/collectionGroups/mindid_blog/indexes`;

  const body = {
    queryScope: "COLLECTION",
    fields: [
      { fieldPath: "published", order: "ASCENDING" },
      { fieldPath: "publishedAt", order: "DESCENDING" },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    console.log("✅ Index oluşturuldu:", data.name);
    console.log("   Durum:", data.state || "CREATING");
    console.log("   (Index hazır olması 1-2 dakika sürebilir)");
  } else if (data.error?.message?.includes("already exists")) {
    console.log("✅ Index zaten mevcut, sorun yok.");
  } else {
    console.error("❌ Hata:", JSON.stringify(data, null, 2));
  }
}

main().catch(console.error);
