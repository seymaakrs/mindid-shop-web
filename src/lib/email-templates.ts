/**
 * MindID — Email HTML Templates
 *
 * Renders Turkish-language transactional emails styled with the MindID
 * brand palette (lime accent on dark-blue / cream layout). The output of
 * each function is plain HTML, ready to be passed as `message.html` to
 * the Firestore "mail" collection (Firebase Email Trigger extension) or
 * to any SMTP provider (Resend, SendGrid, Postmark, etc.).
 *
 * NOTE for repo owner: A Firebase Function (`onNewOrder` in
 * `functions/src/index.ts`) already sends order confirmations via
 * Resend. This client-side queue is a redundant safety-net using the
 * Firebase Email Trigger extension. If the extension is NOT installed,
 * see: https://extensions.dev/extensions/firebase/firestore-send-email
 *
 * Owner: Install Firebase Email Trigger extension OR connect to
 * Resend/SendGrid (see functions/src/index.ts for an existing Resend
 * integration that is already wired up).
 */

const LIME = "#ade94f";
const DARK_BLUE = "#100a2c";
const CREAM = "#eeeadc";
const CARD_BG = "#f7f4eb";
const TEXT_MUTED = "#5c5949";
const SITE_URL = "https://mindid.shop";
const SUPPORT_EMAIL = "info@mindid.shop";
// Owner WhatsApp — adjust if needed
const WHATSAPP_URL = "https://wa.me/905555555555";

const formatTRY = (n: number | undefined): string =>
  typeof n === "number"
    ? `${n.toLocaleString("tr-TR")} ₺`
    : "-";

const escapeHtml = (s: string | undefined): string =>
  (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* ─── Shared shell wrapper ─────────────────────────────────────────── */
const shell = (params: {
  preheader: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}): string => `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MindID</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Arial,sans-serif;color:${DARK_BLUE};">
  <span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(params.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CREAM};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(16,10,44,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:${DARK_BLUE};padding:24px 28px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;">
                Mind<span style="color:${LIME};">ID</span>
              </h1>
              <p style="margin:4px 0 0;font-size:11px;color:${LIME};letter-spacing:2px;text-transform:uppercase;font-weight:700;">
                AI İçerik Stüdyosu
              </p>
            </td>
          </tr>

          <!-- Headline strip -->
          <tr>
            <td style="background:${LIME};padding:18px 28px;">
              <h2 style="margin:0;font-size:20px;font-weight:900;color:${DARK_BLUE};">
                ${escapeHtml(params.heading)}
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px;color:${DARK_BLUE};font-size:14px;line-height:1.7;">
              ${params.body}
              ${params.ctaLabel && params.ctaUrl ? `
              <div style="text-align:center;margin:28px 0 12px;">
                <a href="${params.ctaUrl}" style="display:inline-block;background:${LIME};color:${DARK_BLUE};font-weight:900;font-size:14px;padding:14px 28px;border-radius:999px;text-decoration:none;letter-spacing:0.3px;">
                  ${escapeHtml(params.ctaLabel)} →
                </a>
              </div>` : ""}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${CARD_BG};padding:20px 28px;text-align:center;font-size:12px;color:${TEXT_MUTED};line-height:1.7;">
              <p style="margin:0 0 8px;">
                Sorunuz mu var? <a href="mailto:${SUPPORT_EMAIL}" style="color:${DARK_BLUE};font-weight:700;text-decoration:none;">${SUPPORT_EMAIL}</a>
                &nbsp;·&nbsp;
                <a href="${WHATSAPP_URL}" style="color:#25d366;font-weight:700;text-decoration:none;">WhatsApp</a>
              </p>
              <p style="margin:0;font-size:11px;color:${TEXT_MUTED};opacity:0.7;">
                © MindID · <a href="${SITE_URL}" style="color:${TEXT_MUTED};text-decoration:none;">mindid.shop</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/* ─── Order Confirmation ──────────────────────────────────────────── */

export type OrderConfirmationData = {
  orderId: string;
  customerName: string;
  serviceName: string;
  totalTRY: number;
  /** Lines like "Süre: 30 sn", "Ses: Profesyonel (450 ₺)" */
  configLines?: string[];
  /** Add-ons separately if you want to show them */
  addons?: { label: string; price: number }[];
  /** Optional payment status: when "awaiting_confirmation" we render bank info */
  paymentStatus?: string;
  /** Optional bank info to render when awaiting confirmation */
  bankInfo?: {
    bankName: string;
    accountHolder: string;
    iban: string;
    reference: string;
  };
  /** Expected delivery in days (e.g. 5) */
  expectedDeliveryDays?: number;
};

export const renderOrderConfirmationEmail = (
  d: OrderConfirmationData,
): string => {
  const shortId = d.orderId.slice(0, 8).toUpperCase();
  const dashboardUrl = `${SITE_URL}/dashboard`;

  const summaryRows: string[] = [
    `<tr><td style="padding:8px 0;color:${TEXT_MUTED};font-size:13px;">Hizmet</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(d.serviceName)}</td></tr>`,
    `<tr><td style="padding:8px 0;color:${TEXT_MUTED};font-size:13px;">Sipariş No</td><td style="padding:8px 0;font-family:monospace;text-align:right;">#${escapeHtml(shortId)}</td></tr>`,
  ];

  if (d.configLines && d.configLines.length) {
    for (const line of d.configLines) {
      const [label, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      summaryRows.push(
        `<tr><td style="padding:6px 0;color:${TEXT_MUTED};font-size:13px;">${escapeHtml(label)}</td><td style="padding:6px 0;text-align:right;font-size:13px;">${escapeHtml(value || "-")}</td></tr>`,
      );
    }
  }

  if (d.addons && d.addons.length) {
    for (const a of d.addons) {
      summaryRows.push(
        `<tr><td style="padding:6px 0;color:${TEXT_MUTED};font-size:13px;">+ ${escapeHtml(a.label)}</td><td style="padding:6px 0;text-align:right;font-size:13px;">${formatTRY(a.price)}</td></tr>`,
      );
    }
  }

  // Total row
  summaryRows.push(
    `<tr><td colspan="2" style="padding:8px 0 0;border-top:2px solid ${DARK_BLUE};"></td></tr>`,
    `<tr><td style="padding:12px 0 0;font-weight:900;font-size:15px;">Toplam</td><td style="padding:12px 0 0;text-align:right;font-weight:900;font-size:18px;color:${DARK_BLUE};">${formatTRY(d.totalTRY)}</td></tr>`,
  );

  const summaryTable = `
    <div style="background:${CARD_BG};border-radius:12px;padding:18px 20px;margin:20px 0;">
      <h3 style="margin:0 0 12px;font-size:13px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;color:${TEXT_MUTED};">
        Sipariş Özeti
      </h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${summaryRows.join("")}
      </table>
    </div>`;

  const paymentBlock =
    d.paymentStatus === "awaiting_confirmation" && d.bankInfo
      ? `
    <div style="background:#fff8e1;border:1px solid #f5d77a;border-radius:12px;padding:18px 20px;margin:16px 0;">
      <h3 style="margin:0 0 8px;font-size:13px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:${DARK_BLUE};">
        💳 Havale Bilgileri
      </h3>
      <p style="margin:0 0 10px;font-size:13px;line-height:1.6;color:${DARK_BLUE};">
        Üretime başlayabilmemiz için <strong>${formatTRY(d.totalTRY)}</strong> tutarındaki ödemeyi aşağıdaki hesaba EFT/Havale ile yapın.
        Açıklama kısmına mutlaka referans kodunu yazın.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;">
        <tr><td style="padding:4px 0;color:${TEXT_MUTED};">Banka</td><td style="padding:4px 0;font-weight:700;text-align:right;">${escapeHtml(d.bankInfo.bankName)}</td></tr>
        <tr><td style="padding:4px 0;color:${TEXT_MUTED};">Hesap Sahibi</td><td style="padding:4px 0;font-weight:700;text-align:right;">${escapeHtml(d.bankInfo.accountHolder)}</td></tr>
        <tr><td style="padding:4px 0;color:${TEXT_MUTED};">IBAN</td><td style="padding:4px 0;font-family:monospace;font-weight:700;text-align:right;">${escapeHtml(d.bankInfo.iban)}</td></tr>
        <tr><td style="padding:4px 0;color:${TEXT_MUTED};">Referans</td><td style="padding:4px 0;font-family:monospace;font-weight:900;text-align:right;color:${DARK_BLUE};">${escapeHtml(d.bankInfo.reference)}</td></tr>
      </table>
    </div>`
      : "";

  const eta = d.expectedDeliveryDays || 5;

  const body = `
    <p style="margin:0 0 14px;font-size:15px;">
      Merhaba <strong>${escapeHtml(d.customerName)}</strong>,
    </p>
    <p style="margin:0 0 14px;">
      Siparişin başarıyla alındı. Ekibimiz en kısa sürede üretime başlayacak.
      Aşağıda sipariş özetini bulabilirsin.
    </p>

    ${summaryTable}
    ${paymentBlock}

    <div style="background:${LIME}20;border-left:4px solid ${LIME};border-radius:8px;padding:14px 16px;margin:16px 0;">
      <p style="margin:0;font-size:13px;color:${DARK_BLUE};">
        <strong>⏱ Tahmini teslimat:</strong> ${eta} iş günü içinde tamamlanacak.
        Süreçteki her adımda sana e-posta ve panel bildirimi göndereceğiz.
      </p>
    </div>

    <p style="margin:18px 0 0;font-size:13px;color:${TEXT_MUTED};">
      Sipariş durumunu istediğin zaman panelden takip edebilirsin.
    </p>
  `;

  return shell({
    preheader: `Siparişin alındı — #${shortId} · ${d.serviceName}`,
    heading: `Siparişin alındı! 🎬`,
    body,
    ctaLabel: "Siparişini takip et",
    ctaUrl: dashboardUrl,
  });
};

/* ─── Order Status Update ─────────────────────────────────────────── */

export type OrderStatusEmailData = {
  orderId: string;
  customerName: string;
  newStatus: string;
};

const STATUS_COPY: Record<
  string,
  { heading: string; intro: string; ctaLabel: string }
> = {
  seen: {
    heading: "Siparişin inceleniyor 👀",
    intro:
      "Ekibimiz siparişini inceledi ve hazırlık sürecine aldı. En kısa sürede üretime başlıyoruz.",
    ctaLabel: "Siparişini görüntüle",
  },
  "in-progress": {
    heading: "Üretim başladı! 🎬",
    intro:
      "Harika haber — siparişinin üretimi başladı. Tamamlandığında sana hemen haber vereceğiz.",
    ctaLabel: "İlerlemeyi takip et",
  },
  completed: {
    heading: "Siparişin hazır! 🎉",
    intro:
      "Siparişin tamamlandı ve teslime hazır. Dosyalarına panelden hemen erişebilirsin.",
    ctaLabel: "Dosyalarını indir",
  },
  cancelled: {
    heading: "Siparişin iptal edildi",
    intro:
      "Siparişin iptal edilmiştir. Sorularını yanıtlamak için bizimle iletişime geçebilirsin.",
    ctaLabel: "İletişime geç",
  },
};

export const renderOrderStatusUpdateEmail = (
  d: OrderStatusEmailData,
): string => {
  const shortId = d.orderId.slice(0, 8).toUpperCase();
  const copy = STATUS_COPY[d.newStatus] || {
    heading: "Sipariş durumu güncellendi",
    intro: `Siparişinin durumu "${d.newStatus}" olarak güncellendi.`,
    ctaLabel: "Siparişini görüntüle",
  };

  const body = `
    <p style="margin:0 0 14px;font-size:15px;">
      Merhaba <strong>${escapeHtml(d.customerName)}</strong>,
    </p>
    <p style="margin:0 0 14px;">${escapeHtml(copy.intro)}</p>
    <div style="background:${CARD_BG};border-radius:12px;padding:14px 18px;margin:18px 0;font-size:13px;">
      <span style="color:${TEXT_MUTED};">Sipariş No:</span>
      <strong style="font-family:monospace;margin-left:8px;">#${escapeHtml(shortId)}</strong>
    </div>
  `;

  return shell({
    preheader: copy.heading,
    heading: copy.heading,
    body,
    ctaLabel: copy.ctaLabel,
    ctaUrl: `${SITE_URL}/dashboard/orders`,
  });
};
