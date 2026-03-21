import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";

admin.initializeApp();

// Resend API key — Firebase Secret Manager'dan çekilir
// Deploy öncesi: firebase functions:secrets:set RESEND_API_KEY
const resendApiKey = defineSecret("RESEND_API_KEY");

// ─── E-posta gönderme (Resend API) ───────────────────────────────────
async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MindID <noreply@mindid.shop>",
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Resend API error (${res.status}):`, err);
      return false;
    }

    console.log(`Email sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}

// ─── Admin bildirim maili şablonu ────────────────────────────────────
function buildAdminEmailHtml(order: FirebaseFirestore.DocumentData, orderId: string): string {
  const customer = order.customer || {};
  const pricing = order.pricing || {};
  const config = order.config || {};
  const date = order.createdAt?.toDate?.()
    ? new Date(order.createdAt.toDate()).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })
    : "Bilinmiyor";

  // Config detaylarını düz metin olarak derle
  const configLines: string[] = [];
  if (config.duration) configLines.push(`Süre: ${config.duration.label}`);
  if (config.scenario) configLines.push(`Senaryo: ${config.scenario.label} (${config.scenario.price}₺)`);
  if (config.voice) configLines.push(`Ses: ${config.voice.label} (${config.voice.price}₺)`);
  if (config.music) configLines.push(`Müzik: ${config.music.label} (${config.music.price}₺)`);
  if (config.visualStyle) configLines.push(`Görsel Stil: ${config.visualStyle.label} (${config.visualStyle.price}₺)`);
  if (config.productCount) configLines.push(`Ürün Sayısı: ${config.productCount.label}`);
  if (config.colorCount) configLines.push(`Renk Sayısı: ${config.colorCount}`);
  if (config.photoVisualStyle) configLines.push(`Fotoğraf Stili: ${config.photoVisualStyle.label}`);
  if (config.background) configLines.push(`Arka Plan: ${config.background.label}`);
  if (config.postProduction?.length) {
    configLines.push(`Post-Prodüksiyon: ${config.postProduction.map((p: { label: string }) => p.label).join(", ")}`);
  }
  if (config.revision) configLines.push(`Revizyon: ${config.revision.label}`);

  const whatsappPhone = customer.phone?.replace(/[^0-9]/g, "") || "";
  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Merhaba ${customer.name}, MindID üzerinden ${order.serviceName} siparişinizi aldık. En kısa sürede detayları konuşalım!`)}`
    : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e1a; color: #f5f0e8; padding: 24px; max-width: 600px; margin: 0 auto;">
  <div style="background: #c8ff00; color: #0a0e1a; padding: 16px 24px; border-radius: 8px 8px 0 0; font-weight: 900; font-size: 18px;">
    🎯 Yeni Sipariş — ${order.serviceName || "Bilinmeyen Hizmet"}
  </div>
  <div style="background: #111827; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #1e3a5f;">

    <h3 style="color: #c8ff00; margin-top: 0;">Müşteri Bilgileri</h3>
    <table style="width: 100%; font-size: 14px; line-height: 1.8;">
      <tr><td style="color: #9ca3af;">Ad Soyad:</td><td style="color: #f5f0e8; font-weight: 600;">${customer.name || "-"}</td></tr>
      <tr><td style="color: #9ca3af;">E-posta:</td><td><a href="mailto:${customer.email}" style="color: #60a5fa;">${customer.email || "-"}</a></td></tr>
      <tr><td style="color: #9ca3af;">Telefon:</td><td><a href="tel:${customer.phone}" style="color: #60a5fa;">${customer.phone || "-"}</a></td></tr>
      <tr><td style="color: #9ca3af;">Şirket:</td><td style="color: #f5f0e8;">${customer.company || "-"}</td></tr>
      <tr><td style="color: #9ca3af;">Sektör:</td><td style="color: #f5f0e8;">${customer.sector || "-"}</td></tr>
      <tr><td style="color: #9ca3af;">Hedef Kitle:</td><td style="color: #f5f0e8;">${customer.targetAudience || "-"}</td></tr>
    </table>
    ${customer.message ? `<p style="color: #9ca3af; margin-top: 12px;">Mesaj: <span style="color: #f5f0e8;">${customer.message}</span></p>` : ""}

    <h3 style="color: #c8ff00;">Sipariş Detayları</h3>
    <table style="width: 100%; font-size: 14px; line-height: 1.8;">
      <tr><td style="color: #9ca3af;">Hizmet:</td><td style="color: #f5f0e8; font-weight: 600;">${order.serviceName}</td></tr>
      <tr><td style="color: #9ca3af;">Sipariş ID:</td><td style="color: #60a5fa; font-size: 12px;">${orderId}</td></tr>
      <tr><td style="color: #9ca3af;">Tarih:</td><td style="color: #f5f0e8;">${date}</td></tr>
    </table>

    ${configLines.length > 0 ? `
    <h3 style="color: #c8ff00;">Konfigürasyon</h3>
    <ul style="color: #f5f0e8; font-size: 14px; line-height: 2; padding-left: 20px;">
      ${configLines.map((line) => `<li>${line}</li>`).join("")}
    </ul>
    ` : ""}

    <div style="background: #1a2744; padding: 16px; border-radius: 8px; margin-top: 16px;">
      <h3 style="color: #c8ff00; margin-top: 0;">Fiyatlandırma</h3>
      <table style="width: 100%; font-size: 14px; line-height: 2;">
        <tr><td style="color: #9ca3af;">AI Fiyat:</td><td style="color: #c8ff00; font-weight: 900; font-size: 18px;">${pricing.totalAI?.toLocaleString("tr-TR")}₺</td></tr>
        <tr><td style="color: #9ca3af;">Geleneksel Fiyat:</td><td style="color: #9ca3af; text-decoration: line-through;">${pricing.totalTraditional?.toLocaleString("tr-TR")}₺</td></tr>
        <tr><td style="color: #9ca3af;">Tasarruf:</td><td style="color: #22c55e; font-weight: 600;">${pricing.savings?.toLocaleString("tr-TR")}₺</td></tr>
      </table>
    </div>

    ${order.fileUrls?.length > 0 ? `
    <h3 style="color: #c8ff00;">Yüklenen Dosyalar (${order.fileUrls.length})</h3>
    <ul style="font-size: 13px; color: #60a5fa;">
      ${order.fileUrls.map((url: string, i: number) => `<li><a href="${url}" style="color: #60a5fa;">Dosya ${i + 1}</a></li>`).join("")}
    </ul>
    ` : ""}

    <div style="margin-top: 24px; text-align: center;">
      ${whatsappUrl ? `<a href="${whatsappUrl}" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin-right: 8px;">📱 WhatsApp ile Yaz</a>` : ""}
      <a href="mailto:${customer.email}" style="display: inline-block; background: #60a5fa; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">✉️ E-posta Gönder</a>
    </div>
  </div>
  <p style="text-align: center; font-size: 11px; color: #6b7280; margin-top: 16px;">
    MindID Admin Bildirimi — mindid.shop/admin/orders
  </p>
</body>
</html>`;
}

// ─── Müşteri onay maili şablonu ──────────────────────────────────────
function buildCustomerEmailHtml(order: FirebaseFirestore.DocumentData): string {
  const customer = order.customer || {};
  const pricing = order.pricing || {};

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e1a; color: #f5f0e8; padding: 24px; max-width: 600px; margin: 0 auto;">
  <div style="background: #c8ff00; color: #0a0e1a; padding: 16px 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 20px; font-weight: 900;">MindID</h1>
    <p style="margin: 4px 0 0; font-size: 13px;">AI Reklam Filmleri • Avatar • Ürün Görselleri</p>
  </div>
  <div style="background: #111827; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #1e3a5f;">

    <h2 style="color: #c8ff00; margin-top: 0;">Siparişinizi Aldık! ✅</h2>
    <p style="color: #d1d5db; font-size: 14px; line-height: 1.7;">
      Merhaba <strong style="color: #f5f0e8;">${customer.name}</strong>,
    </p>
    <p style="color: #d1d5db; font-size: 14px; line-height: 1.7;">
      <strong style="color: #f5f0e8;">${order.serviceName}</strong> hizmeti için siparişiniz başarıyla alındı.
      Ekibimiz en kısa sürede sizinle iletişime geçecektir.
    </p>

    <div style="background: #1a2744; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%; font-size: 14px; line-height: 2;">
        <tr><td style="color: #9ca3af;">Hizmet:</td><td style="color: #f5f0e8; font-weight: 600;">${order.serviceName}</td></tr>
        <tr><td style="color: #9ca3af;">Toplam:</td><td style="color: #c8ff00; font-weight: 900; font-size: 18px;">${pricing.totalAI?.toLocaleString("tr-TR")}₺</td></tr>
      </table>
    </div>

    <p style="color: #d1d5db; font-size: 14px; line-height: 1.7;">
      Sorularınız için bize ulaşabilirsiniz:
    </p>
    <ul style="color: #60a5fa; font-size: 14px; line-height: 2; padding-left: 20px;">
      <li>E-posta: <a href="mailto:info@mindid.shop" style="color: #60a5fa;">info@mindid.shop</a></li>
      <li>Web: <a href="https://mindid.shop" style="color: #60a5fa;">mindid.shop</a></li>
    </ul>

    <p style="color: #9ca3af; font-size: 13px; margin-top: 24px; text-align: center;">
      Teşekkür ederiz! — MindID Ekibi
    </p>
  </div>
  <p style="text-align: center; font-size: 11px; color: #6b7280; margin-top: 16px;">
    Bu e-posta mindid.shop üzerinden yapılan sipariş sonucu otomatik olarak gönderilmiştir.
  </p>
</body>
</html>`;
}

// ─── Ana trigger: Yeni sipariş geldiğinde ────────────────────────────
export const onNewOrder = onDocumentCreated(
  {
    document: "mindid_orders/{orderId}",
    secrets: [resendApiKey],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const order = snapshot.data();
    const orderId = event.params.orderId;
    const apiKey = resendApiKey.value();

    console.log(
      `New order: ${orderId} | Service: ${order.serviceName} | Customer: ${order.customer?.name} | Price: ${order.pricing?.totalAI} TRY`,
    );

    // API key yoksa sadece logla
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — skipping email notifications");
      return;
    }

    // 1. Admin'e bildirim maili
    const adminHtml = buildAdminEmailHtml(order, orderId);
    await sendEmail(
      apiKey,
      "seymaakrs@gmail.com",
      `🎯 Yeni Sipariş: ${order.serviceName} — ${order.customer?.name || "Anonim"} (${order.pricing?.totalAI?.toLocaleString("tr-TR")}₺)`,
      adminHtml,
    );

    // 2. Müşteriye onay maili
    const customerEmail = order.customer?.email;
    if (customerEmail) {
      const customerHtml = buildCustomerEmailHtml(order);
      await sendEmail(
        apiKey,
        customerEmail,
        `Siparişiniz Alındı — ${order.serviceName} | MindID`,
        customerHtml,
      );
    }
  },
);
