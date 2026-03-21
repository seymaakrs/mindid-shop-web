const ExcelJS = require("exceljs");
const path = require("path");

// =============================================================================
// SABITLER & VARSAYIMLAR
// =============================================================================
const USD_TRY = 45;
const EUR_TRY = 56;
const KDV_RATE = 0.20;
const COGS_PERCENT = 0.30;
const COGS_AI_COMPUTE = 0.08;
const COGS_API = 0.12;
const COGS_PERSONNEL = 0.10;
const MONTHLY_GROWTH_1_6 = 0.15;
const MONTHLY_GROWTH_7_12 = 0.10;
const MARKETING_PERCENT_1_6 = 0.15;
const MARKETING_PERCENT_7_12 = 0.10;
const TAX_RATE = 0.25;
const INITIAL_CAPITAL = 200000;
const CAPEX_MONTH1 = 50000;

const SERVICES = [
  { name: "Reels (Instagram)", base: 999, avgAddon: 3500, multiplier: 3.5, initialQty: 4, mixPercent: 0.35 },
  { name: "Ürün & Hizmet Reklamı", base: 9999, avgAddon: 8000, multiplier: 3.2, initialQty: 2, mixPercent: 0.25 },
  { name: "Kampanya Reklam Filmi", base: 19999, avgAddon: 15000, multiplier: 3.0, initialQty: 1, mixPercent: 0.15 },
  { name: "Kurumsal Tanıtım Filmi", base: 29999, avgAddon: 22000, multiplier: 2.8, initialQty: 0, mixPercent: 0.10 },
  { name: "AI Avatar Oluştur", base: 5999, avgAddon: 2000, multiplier: 0, initialQty: 3, mixPercent: 0.15 },
];

const FIXED_EXPENSES = [
  { name: "Ofis / Co-working", amount: 8000 },
  { name: "İnternet & Telekom", amount: 2000 },
  { name: "Yazılım Abonelikleri (Adobe, Figma vb.)", amount: 5000 },
  { name: "AI API Maliyetleri (Sabit Kısım)", amount: 15000 },
  { name: "GPU / Cloud Computing (Sabit)", amount: 8000 },
  { name: "Kurucu Maaş", amount: 15000 },
  { name: "AI Uzmanı Maaş", amount: 12000 },
  { name: "İçerik / Pazarlama Uzmanı Maaş", amount: 10000 },
  { name: "Muhasebe & Hukuk", amount: 3000 },
  { name: "Sigorta", amount: 1500 },
  { name: "Domain / Hosting / Firebase", amount: 1500 },
  { name: "Eğitim & Konferans", amount: 2000 },
  { name: "Ofis Malzemeleri & Diğer", amount: 2000 },
];

const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const TOTAL_FIXED = FIXED_EXPENSES.reduce((s, e) => s + e.amount, 0);

// =============================================================================
// RENK PALETİ (MAVİ TONLARI)
// =============================================================================
const COLORS = {
  darkBlue: "1B3A5C",
  mediumBlue: "4A90D9",
  lightBlue: "D6E8F7",
  veryLightBlue: "F0F6FC",
  white: "FFFFFF",
  red: "CC0000",
  black: "1A1A1A",
  headerText: "FFFFFF",
  accentBlue: "2E75B6",
};

// =============================================================================
// STİL YARDIMCILARI
// =============================================================================
const THIN_BORDER = {
  top: { style: "thin", color: { argb: "B0B0B0" } },
  left: { style: "thin", color: { argb: "B0B0B0" } },
  bottom: { style: "thin", color: { argb: "B0B0B0" } },
  right: { style: "thin", color: { argb: "B0B0B0" } },
};

function applyHeaderStyle(row) {
  row.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.headerText } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.darkBlue } };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = THIN_BORDER;
  });
  row.height = 30;
}

function applySubHeaderStyle(row) {
  row.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.headerText } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.mediumBlue } };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = THIN_BORDER;
  });
  row.height = 25;
}

function applyTotalStyle(row) {
  row.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.lightBlue } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = THIN_BORDER;
  });
  row.height = 22;
}

function applyDataStyle(row, isAlt = false) {
  row.eachCell((cell) => {
    cell.font = { name: "Calibri", size: 11, color: { argb: COLORS.black } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: isAlt ? COLORS.veryLightBlue : COLORS.white } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = THIN_BORDER;
  });
}

function applyLabelStyle(cell) {
  cell.font = { name: "Calibri", size: 11, bold: false, color: { argb: COLORS.black } };
  cell.alignment = { horizontal: "left", vertical: "middle" };
}

function applyTitleStyle(ws, row, col, endCol, text) {
  ws.mergeCells(row, col, row, endCol);
  const cell = ws.getCell(row, col);
  cell.value = text;
  cell.font = { name: "Calibri", size: 14, bold: true, color: { argb: COLORS.darkBlue } };
  cell.alignment = { horizontal: "center", vertical: "middle" };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.lightBlue } };
  cell.border = THIN_BORDER;
  ws.getRow(row).height = 35;
}

function applySectionTitle(ws, row, col, endCol, text) {
  ws.mergeCells(row, col, row, endCol);
  const cell = ws.getCell(row, col);
  cell.value = text;
  cell.font = { name: "Calibri", size: 12, bold: true, color: { argb: COLORS.headerText } };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.accentBlue } };
  cell.alignment = { horizontal: "left", vertical: "middle" };
  cell.border = THIN_BORDER;
  ws.getRow(row).height = 28;
}

function currencyTRY(cell) { cell.numFmt = '#,##0" ₺"'; }
function currencyUSD(cell) { cell.numFmt = '"$"#,##0'; }
function currencyEUR(cell) { cell.numFmt = '"€"#,##0'; }
function percentFmt(cell) { cell.numFmt = "0.0%"; }
function intFmt(cell) { cell.numFmt = "#,##0"; }

// =============================================================================
// HESAPLAMA YARDIMCILARI
// =============================================================================
function avgTicket(svc) { return svc.base + svc.avgAddon; }
function kdvAmount(price) { return price * KDV_RATE; }
function kdvDahil(price) { return price * (1 + KDV_RATE); }

function getMonthlyQty(svc, month) {
  let qty = svc.initialQty;
  for (let m = 1; m < month; m++) {
    const growth = m < 6 ? MONTHLY_GROWTH_1_6 : MONTHLY_GROWTH_7_12;
    qty = Math.round(qty * (1 + growth));
  }
  if (qty < 0) qty = 0;
  // Corporate starts at month 2
  if (svc.name.includes("Kurumsal") && month === 1) return 0;
  return Math.max(qty, svc.name.includes("Kurumsal") && month <= 2 ? 1 : qty);
}

function getTeamSize(month) {
  if (month <= 5) return 3;
  if (month <= 8) return 4;
  return 5;
}

function getMarketingPercent(month) {
  return month <= 6 ? MARKETING_PERCENT_1_6 : MARKETING_PERCENT_7_12;
}

// Pre-calculate monthly data
function calcMonthlyData() {
  const data = [];
  for (let m = 1; m <= 12; m++) {
    const monthData = { month: m, name: MONTHS[m - 1], services: [] };
    let totalRevenue = 0;
    let totalQty = 0;
    SERVICES.forEach((svc) => {
      const qty = getMonthlyQty(svc, m);
      const ticket = avgTicket(svc);
      const revenue = qty * ticket;
      totalRevenue += revenue;
      totalQty += qty;
      monthData.services.push({ ...svc, qty, ticket, revenue });
    });
    monthData.totalRevenue = totalRevenue;
    monthData.totalQty = totalQty;
    monthData.kdv = totalRevenue * KDV_RATE;
    monthData.revenueWithKdv = totalRevenue * (1 + KDV_RATE);
    monthData.cogs = totalRevenue * COGS_PERCENT;
    monthData.grossProfit = totalRevenue - monthData.cogs;
    monthData.team = getTeamSize(m);
    monthData.personnelFixed = m <= 5 ? 37000 : m <= 8 ? 49000 : 61000;
    monthData.officeInfra = 13500;
    monthData.softwareAI = 28000;
    monthData.marketing = totalRevenue * getMarketingPercent(m);
    monthData.generalAdmin = 6500;
    monthData.totalOpex = monthData.personnelFixed + monthData.officeInfra + monthData.softwareAI + monthData.marketing + monthData.generalAdmin;
    monthData.ebitda = monthData.grossProfit - monthData.totalOpex;
    monthData.tax = monthData.ebitda > 0 ? monthData.ebitda * TAX_RATE : 0;
    monthData.netIncome = monthData.ebitda - monthData.tax;
    data.push(monthData);
  }
  return data;
}

// =============================================================================
// SAYFA 1: HİZMET SATIŞ & KARLILIK TABLOSU
// =============================================================================
async function createSheet1(wb) {
  const ws = wb.addWorksheet("Hizmet Karlılık", {
    properties: { tabColor: { argb: COLORS.darkBlue } },
  });

  // Column widths
  ws.columns = [
    { width: 28 }, // A - Hizmet
    { width: 16 }, // B - Taban
    { width: 18 }, // C - Ort Ek
    { width: 20 }, // D - Ort Bilet KDV Hariç
    { width: 16 }, // E - KDV Tutarı
    { width: 20 }, // F - KDV Dahil
    { width: 14 }, // G - USD
    { width: 14 }, // H - EUR
    { width: 16 }, // I - Geleneksel Çarpan
    { width: 20 }, // J - Geleneksel Fiyat
    { width: 16 }, // K - COGS
    { width: 16 }, // L - Brüt Kâr
    { width: 14 }, // M - Brüt Kâr %
  ];

  // TITLE
  applyTitleStyle(ws, 1, 1, 13, "MindID AI - HİZMET SATIŞ & KARLILIK TABLOSU");

  // VARSAYIMLAR
  applySectionTitle(ws, 3, 1, 13, "VARSAYIMLAR");
  const assumptions = [
    ["USD/TRY Kuru:", USD_TRY, "", "EUR/TRY Kuru:", EUR_TRY, "", "KDV Oranı:", "20%", "", "COGS Oranı:", "30%"],
  ];
  const aRow = ws.addRow(["", ...assumptions[0]]);
  aRow.number; // row 4
  ws.getCell(4, 1).value = "USD/TRY Kuru:";
  ws.getCell(4, 1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(4, 2).value = USD_TRY;
  ws.getCell(4, 2).font = { name: "Calibri", size: 11, bold: false };
  ws.getCell(4, 3).value = "EUR/TRY Kuru:";
  ws.getCell(4, 3).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(4, 4).value = EUR_TRY;
  ws.getCell(4, 5).value = "KDV Oranı:";
  ws.getCell(4, 5).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(4, 6).value = KDV_RATE;
  percentFmt(ws.getCell(4, 6));
  ws.getCell(4, 7).value = "COGS Oranı:";
  ws.getCell(4, 7).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(4, 8).value = COGS_PERCENT;
  percentFmt(ws.getCell(4, 8));

  // HEADER ROW
  const headerRow = ws.addRow([]); // row 6
  ws.addRow([]); // spacer row 5
  const hr = ws.addRow([
    "Hizmet",
    "Taban Fiyat (₺)",
    "Ort. Ek Seçenek (₺)",
    "Ort. Bilet KDV Hariç (₺)",
    "KDV Tutarı (%20)",
    "KDV Dahil (₺)",
    "Bilet (USD)",
    "Bilet (EUR)",
    "Geleneksel Çarpan",
    "Geleneksel Fiyat (₺)",
    "COGS (₺)",
    "Brüt Kâr (₺)",
    "Brüt Kâr Marjı %",
  ]);
  applyHeaderStyle(hr);

  // DATA ROWS
  SERVICES.forEach((svc, i) => {
    const ticket = avgTicket(svc);
    const kdv = ticket * KDV_RATE;
    const withKdv = ticket + kdv;
    const cogs = ticket * COGS_PERCENT;
    const gross = ticket - cogs;
    const grossMargin = ticket > 0 ? gross / ticket : 0;
    const traditional = svc.multiplier > 0 ? ticket * svc.multiplier : 0;

    const r = ws.addRow([
      svc.name,
      svc.base,
      svc.avgAddon,
      ticket,
      kdv,
      withKdv,
      Math.round(withKdv / USD_TRY),
      Math.round(withKdv / EUR_TRY),
      svc.multiplier > 0 ? svc.multiplier + "x" : "N/A",
      traditional,
      cogs,
      gross,
      grossMargin,
    ]);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    currencyTRY(r.getCell(2));
    currencyTRY(r.getCell(3));
    currencyTRY(r.getCell(4));
    currencyTRY(r.getCell(5));
    currencyTRY(r.getCell(6));
    currencyUSD(r.getCell(7));
    currencyEUR(r.getCell(8));
    currencyTRY(r.getCell(10));
    currencyTRY(r.getCell(11));
    currencyTRY(r.getCell(12));
    percentFmt(r.getCell(13));
  });

  // TOTALS / WEIGHTED AVERAGE
  ws.addRow([]);
  const weightedTicket = SERVICES.reduce((s, svc) => s + avgTicket(svc) * svc.mixPercent, 0);
  const weightedKdv = weightedTicket * KDV_RATE;
  const weightedWithKdv = weightedTicket + weightedKdv;
  const weightedCogs = weightedTicket * COGS_PERCENT;
  const weightedGross = weightedTicket - weightedCogs;

  const totRow = ws.addRow([
    "AĞIRLIKLI ORTALAMA",
    "",
    "",
    Math.round(weightedTicket),
    Math.round(weightedKdv),
    Math.round(weightedWithKdv),
    Math.round(weightedWithKdv / USD_TRY),
    Math.round(weightedWithKdv / EUR_TRY),
    "",
    "",
    Math.round(weightedCogs),
    Math.round(weightedGross),
    weightedGross / weightedTicket,
  ]);
  applyTotalStyle(totRow);
  applyLabelStyle(totRow.getCell(1));
  totRow.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  currencyTRY(totRow.getCell(4));
  currencyTRY(totRow.getCell(5));
  currencyTRY(totRow.getCell(6));
  currencyUSD(totRow.getCell(7));
  currencyEUR(totRow.getCell(8));
  currencyTRY(totRow.getCell(11));
  currencyTRY(totRow.getCell(12));
  percentFmt(totRow.getCell(13));

  // HİZMET MİKS DAĞILIMI
  ws.addRow([]);
  ws.addRow([]);
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 13, "HİZMET MİKS DAĞILIMI & CONTRIBUTION MARGIN");
  const cmHdr = ws.addRow([
    "Hizmet",
    "Miks Dağılımı %",
    "Ort. Bilet (₺)",
    "COGS (₺)",
    "Contribution Margin (₺)",
    "CM Oranı %",
    "Başa Baş Adet (Tek Hizmet)",
    "", "", "", "", "", "",
  ]);
  applyHeaderStyle(cmHdr);

  SERVICES.forEach((svc, i) => {
    const ticket = avgTicket(svc);
    const cogs = ticket * COGS_PERCENT;
    const cm = ticket - cogs;
    const cmPercent = cm / ticket;
    const bbAdet = Math.ceil(TOTAL_FIXED / cm);
    const r = ws.addRow([svc.name, svc.mixPercent, ticket, cogs, cm, cmPercent, bbAdet]);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    percentFmt(r.getCell(2));
    currencyTRY(r.getCell(3));
    currencyTRY(r.getCell(4));
    currencyTRY(r.getCell(5));
    percentFmt(r.getCell(6));
    intFmt(r.getCell(7));
  });

  // Freeze panes
  ws.views = [{ state: "frozen", ySplit: 7, xSplit: 1 }];

  // Auto filter
  ws.autoFilter = { from: { row: 7, column: 1 }, to: { row: 7 + SERVICES.length, column: 13 } };

  // Print setup
  ws.pageSetup = { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  ws.headerFooter = { oddHeader: "&C&BMindID AI - Hizmet Karlılık Tablosu&B", oddFooter: "&CSayfa &P / &N" };

  return ws;
}

// =============================================================================
// SAYFA 2: AYLIK HEDEF & BÜYÜME PROJEKSİYONU
// =============================================================================
async function createSheet2(wb) {
  const ws = wb.addWorksheet("Aylık Hedefler", {
    properties: { tabColor: { argb: COLORS.mediumBlue } },
  });

  const monthlyData = calcMonthlyData();

  // Column widths: A=label, B-M=months, N=6-month, O=annual, P=USD, Q=EUR
  const cols = [{ width: 28 }];
  for (let i = 0; i < 12; i++) cols.push({ width: 14 });
  cols.push({ width: 16 }); // N - 6 Aylık
  cols.push({ width: 16 }); // O - Yıllık
  cols.push({ width: 14 }); // P - USD
  cols.push({ width: 14 }); // Q - EUR
  ws.columns = cols;

  // TITLE
  applyTitleStyle(ws, 1, 1, 17, "MindID AI - AYLIK HEDEF & BÜYÜME PROJEKSİYONU");

  // VARSAYIMLAR
  ws.getCell(3, 1).value = "Büyüme Oranı (Ay 1-6):";
  ws.getCell(3, 1).font = { name: "Calibri", size: 10, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(3, 2).value = MONTHLY_GROWTH_1_6;
  percentFmt(ws.getCell(3, 2));
  ws.getCell(3, 4).value = "Büyüme Oranı (Ay 7-12):";
  ws.getCell(3, 4).font = { name: "Calibri", size: 10, bold: true, color: { argb: COLORS.darkBlue } };
  ws.getCell(3, 5).value = MONTHLY_GROWTH_7_12;
  percentFmt(ws.getCell(3, 5));
  ws.getCell(3, 7).value = "KDV: %20";
  ws.getCell(3, 7).font = { name: "Calibri", size: 10, bold: true, color: { argb: COLORS.red } };

  // ==================== BÖLÜM A: ADET HEDEFLERİ ====================
  applySectionTitle(ws, 5, 1, 17, "A) PROJE ADET HEDEFLERİ");

  // Header
  const hdrQty = ws.addRow(["Hizmet", ...MONTHS, "İlk 6 Ay", "YILLIK TOP.", "—", "—"]);
  applyHeaderStyle(hdrQty);

  SERVICES.forEach((svc, i) => {
    const row = [svc.name];
    let sum6 = 0, sum12 = 0;
    monthlyData.forEach((md, mi) => {
      const qty = md.services[i].qty;
      row.push(qty);
      if (mi < 6) sum6 += qty;
      sum12 += qty;
    });
    row.push(sum6, sum12, "", "");
    const r = ws.addRow(row);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    for (let c = 2; c <= 15; c++) intFmt(r.getCell(c));
  });

  // Total qty row
  const totalQtyRow = ["TOPLAM ADET"];
  let totalSum6 = 0, totalSum12 = 0;
  monthlyData.forEach((md, mi) => {
    totalQtyRow.push(md.totalQty);
    if (mi < 6) totalSum6 += md.totalQty;
    totalSum12 += md.totalQty;
  });
  totalQtyRow.push(totalSum6, totalSum12, "", "");
  const tqr = ws.addRow(totalQtyRow);
  applyTotalStyle(tqr);
  applyLabelStyle(tqr.getCell(1));
  tqr.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  for (let c = 2; c <= 15; c++) intFmt(tqr.getCell(c));

  ws.addRow([]);

  // ==================== BÖLÜM B: GELİR HEDEFLERİ (KDV HARİÇ) ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 17, "B) GELİR HEDEFLERİ - KDV HARİÇ (₺)");
  const hdrRev = ws.addRow(["Hizmet", ...MONTHS, "İlk 6 Ay", "YILLIK TOP.", "USD", "EUR"]);
  applyHeaderStyle(hdrRev);

  SERVICES.forEach((svc, i) => {
    const row = [svc.name];
    let sum6 = 0, sum12 = 0;
    monthlyData.forEach((md, mi) => {
      const rev = md.services[i].revenue;
      row.push(rev);
      if (mi < 6) sum6 += rev;
      sum12 += rev;
    });
    row.push(sum6, sum12, Math.round(sum12 / USD_TRY), Math.round(sum12 / EUR_TRY));
    const r = ws.addRow(row);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    for (let c = 2; c <= 15; c++) currencyTRY(r.getCell(c));
    currencyUSD(r.getCell(16));
    currencyEUR(r.getCell(17));
  });

  // Total revenue row
  const totalRevRow = ["TOPLAM GELİR (KDV Hariç)"];
  let totRev6 = 0, totRev12 = 0;
  monthlyData.forEach((md, mi) => {
    totalRevRow.push(md.totalRevenue);
    if (mi < 6) totRev6 += md.totalRevenue;
    totRev12 += md.totalRevenue;
  });
  totalRevRow.push(totRev6, totRev12, Math.round(totRev12 / USD_TRY), Math.round(totRev12 / EUR_TRY));
  const trr = ws.addRow(totalRevRow);
  applyTotalStyle(trr);
  applyLabelStyle(trr.getCell(1));
  trr.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  for (let c = 2; c <= 15; c++) currencyTRY(trr.getCell(c));
  currencyUSD(trr.getCell(16));
  currencyEUR(trr.getCell(17));

  ws.addRow([]);

  // ==================== BÖLÜM C: KDV TUTARLARI ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 17, "C) KDV TUTARLARI (%20)");
  const hdrKdv = ws.addRow(["Kalem", ...MONTHS, "İlk 6 Ay", "YILLIK TOP.", "USD", "EUR"]);
  applyHeaderStyle(hdrKdv);

  const kdvRow = ["KDV Tutarı (%20)"];
  let kdvSum6 = 0, kdvSum12 = 0;
  monthlyData.forEach((md, mi) => {
    kdvRow.push(md.kdv);
    if (mi < 6) kdvSum6 += md.kdv;
    kdvSum12 += md.kdv;
  });
  kdvRow.push(kdvSum6, kdvSum12, Math.round(kdvSum12 / USD_TRY), Math.round(kdvSum12 / EUR_TRY));
  const kr = ws.addRow(kdvRow);
  applyDataStyle(kr);
  applyLabelStyle(kr.getCell(1));
  for (let c = 2; c <= 15; c++) currencyTRY(kr.getCell(c));
  currencyUSD(kr.getCell(16));
  currencyEUR(kr.getCell(17));

  const kdvDahilRow = ["TOPLAM GELİR (KDV Dahil)"];
  let kdvDSum6 = 0, kdvDSum12 = 0;
  monthlyData.forEach((md, mi) => {
    kdvDahilRow.push(md.revenueWithKdv);
    if (mi < 6) kdvDSum6 += md.revenueWithKdv;
    kdvDSum12 += md.revenueWithKdv;
  });
  kdvDahilRow.push(kdvDSum6, kdvDSum12, Math.round(kdvDSum12 / USD_TRY), Math.round(kdvDSum12 / EUR_TRY));
  const kdr = ws.addRow(kdvDahilRow);
  applyTotalStyle(kdr);
  applyLabelStyle(kdr.getCell(1));
  kdr.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  for (let c = 2; c <= 15; c++) currencyTRY(kdr.getCell(c));
  currencyUSD(kdr.getCell(16));
  currencyEUR(kdr.getCell(17));

  ws.addRow([]);

  // ==================== BÖLÜM D: KÜMÜLATİF & BÜYÜME ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 17, "D) KÜMÜLATİF GELİR & BÜYÜME ORANLARI");
  const hdrCum = ws.addRow(["Metrik", ...MONTHS, "İlk 6 Ay", "YILLIK", "USD", "EUR"]);
  applyHeaderStyle(hdrCum);

  // Cumulative revenue
  const cumRow = ["Kümülatif Gelir (₺)"];
  let cumulative = 0;
  let cum6 = 0;
  monthlyData.forEach((md, mi) => {
    cumulative += md.totalRevenue;
    cumRow.push(cumulative);
    if (mi === 5) cum6 = cumulative;
  });
  cumRow.push(cum6, cumulative, Math.round(cumulative / USD_TRY), Math.round(cumulative / EUR_TRY));
  const cr = ws.addRow(cumRow);
  applyDataStyle(cr);
  applyLabelStyle(cr.getCell(1));
  for (let c = 2; c <= 15; c++) currencyTRY(cr.getCell(c));
  currencyUSD(cr.getCell(16));
  currencyEUR(cr.getCell(17));

  // Monthly growth rate
  const growthRow = ["Aylık Büyüme Oranı"];
  growthRow.push("—"); // Month 1 no comparison
  for (let m = 1; m < 12; m++) {
    const prev = monthlyData[m - 1].totalRevenue;
    const curr = monthlyData[m].totalRevenue;
    growthRow.push(prev > 0 ? (curr - prev) / prev : 0);
  }
  growthRow.push("", "", "", "");
  const gr = ws.addRow(growthRow);
  applyDataStyle(gr, true);
  applyLabelStyle(gr.getCell(1));
  for (let c = 3; c <= 13; c++) percentFmt(gr.getCell(c));

  // Freeze panes
  ws.views = [{ state: "frozen", ySplit: 6, xSplit: 1 }];
  ws.autoFilter = { from: { row: 6, column: 1 }, to: { row: 6 + SERVICES.length, column: 17 } };
  ws.pageSetup = { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  ws.headerFooter = { oddHeader: "&C&BMindID AI - Aylık Hedef & Büyüme Projeksiyonu&B", oddFooter: "&CSayfa &P / &N" };

  return ws;
}

// =============================================================================
// SAYFA 3: SABİT GİDER & BAŞA BAŞ ANALİZİ
// =============================================================================
async function createSheet3(wb) {
  const ws = wb.addWorksheet("Başa Baş Analizi", {
    properties: { tabColor: { argb: COLORS.accentBlue } },
  });

  ws.columns = [
    { width: 40 }, // A
    { width: 18 }, // B - Aylık TRY
    { width: 18 }, // C - Aylık USD
    { width: 18 }, // D - Aylık EUR
    { width: 18 }, // E - 6 Aylık TRY
    { width: 20 }, // F - Yıllık TRY
    { width: 18 }, // G - Yıllık USD
    { width: 18 }, // H - Yıllık EUR
  ];

  // TITLE
  applyTitleStyle(ws, 1, 1, 8, "MindID AI - SABİT GİDER & BAŞA BAŞ ANALİZİ");

  // ==================== BÖLÜM A: SABİT GİDERLER ====================
  applySectionTitle(ws, 3, 1, 8, "A) AYLIK SABİT GİDERLER");

  const hdr = ws.addRow(["Gider Kalemi", "Aylık (₺)", "Aylık (USD)", "Aylık (EUR)", "6 Aylık (₺)", "Yıllık (₺)", "Yıllık (USD)", "Yıllık (EUR)"]);
  applyHeaderStyle(hdr);

  FIXED_EXPENSES.forEach((exp, i) => {
    const r = ws.addRow([
      exp.name,
      exp.amount,
      Math.round(exp.amount / USD_TRY),
      Math.round(exp.amount / EUR_TRY),
      exp.amount * 6,
      exp.amount * 12,
      Math.round((exp.amount * 12) / USD_TRY),
      Math.round((exp.amount * 12) / EUR_TRY),
    ]);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    currencyTRY(r.getCell(2));
    currencyUSD(r.getCell(3));
    currencyEUR(r.getCell(4));
    currencyTRY(r.getCell(5));
    currencyTRY(r.getCell(6));
    currencyUSD(r.getCell(7));
    currencyEUR(r.getCell(8));
  });

  const totFix = ws.addRow([
    "TOPLAM SABİT GİDER",
    TOTAL_FIXED,
    Math.round(TOTAL_FIXED / USD_TRY),
    Math.round(TOTAL_FIXED / EUR_TRY),
    TOTAL_FIXED * 6,
    TOTAL_FIXED * 12,
    Math.round((TOTAL_FIXED * 12) / USD_TRY),
    Math.round((TOTAL_FIXED * 12) / EUR_TRY),
  ]);
  applyTotalStyle(totFix);
  applyLabelStyle(totFix.getCell(1));
  totFix.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
  currencyTRY(totFix.getCell(2));
  currencyUSD(totFix.getCell(3));
  currencyEUR(totFix.getCell(4));
  currencyTRY(totFix.getCell(5));
  currencyTRY(totFix.getCell(6));
  currencyUSD(totFix.getCell(7));
  currencyEUR(totFix.getCell(8));

  ws.addRow([]);
  ws.addRow([]);

  // ==================== BÖLÜM B: DEĞİŞKEN GİDER ORANLARI ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 8, "B) DEĞİŞKEN GİDER ORANLARI (COGS %30)");
  const hdrVar = ws.addRow(["Gider Kalemi", "Oran (%)", "Açıklama"]);
  applyHeaderStyle(hdrVar);

  const varExpenses = [
    ["AI Compute (GPU Render)", COGS_AI_COMPUTE, "Proje bazlı GPU rendering süresi"],
    ["API Kullanım (OpenAI, Runway, ElevenLabs)", COGS_API, "Token/dakika bazlı API maliyeti"],
    ["Proje Bazlı Personel Payı", COGS_PERSONNEL, "Proje süresince personel tahsisi"],
    ["TOPLAM DEĞİŞKEN (COGS)", COGS_PERCENT, "Gelirin %30'u proje maliyeti"],
  ];

  varExpenses.forEach((ve, i) => {
    const isTotal = i === varExpenses.length - 1;
    const r = ws.addRow(ve);
    if (isTotal) {
      applyTotalStyle(r);
    } else {
      applyDataStyle(r, i % 2 === 1);
    }
    applyLabelStyle(r.getCell(1));
    if (isTotal) r.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
    percentFmt(r.getCell(2));
    r.getCell(3).alignment = { horizontal: "left" };
  });

  ws.addRow([]);
  ws.addRow([]);

  // ==================== BÖLÜM C: BAŞA BAŞ ANALİZİ ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 8, "C) BAŞA BAŞ NOKTASI ANALİZİ");

  const weightedTicket = SERVICES.reduce((s, svc) => s + avgTicket(svc) * svc.mixPercent, 0);
  const cm = weightedTicket * (1 - COGS_PERCENT);
  const cmPercent = 1 - COGS_PERCENT;
  const bbAdet = Math.ceil(TOTAL_FIXED / cm);
  const bbCiro = TOTAL_FIXED / cmPercent;
  const bbCiroKdv = bbCiro * (1 + KDV_RATE);

  const bbData = [
    ["Ağırlıklı Ortalama Bilet Boyutu (KDV Hariç)", weightedTicket, "₺"],
    ["COGS Oranı", COGS_PERCENT, "%"],
    ["Contribution Margin (₺)", cm, "₺"],
    ["Contribution Margin (%)", cmPercent, "%"],
    ["", "", ""],
    ["Aylık Sabit Gider", TOTAL_FIXED, "₺"],
    ["", "", ""],
    ["BAŞA BAŞ NOKTASI (ADET / AY)", bbAdet, "proje"],
    ["BAŞA BAŞ NOKTASI (CİRO / AY - KDV Hariç)", bbCiro, "₺"],
    ["BAŞA BAŞ NOKTASI (CİRO / AY - KDV Dahil)", bbCiroKdv, "₺"],
    ["BAŞA BAŞ (6 AYLIK CİRO)", bbCiro * 6, "₺"],
    ["BAŞA BAŞ (YILLIK CİRO)", bbCiro * 12, "₺"],
    ["BAŞA BAŞ CİRO (USD)", Math.round(bbCiro / USD_TRY), "$"],
    ["BAŞA BAŞ CİRO (EUR)", Math.round(bbCiro / EUR_TRY), "€"],
  ];

  bbData.forEach((item, i) => {
    if (item[0] === "") {
      ws.addRow([]);
      return;
    }
    const isBB = item[0].startsWith("BAŞA BAŞ");
    const r = ws.addRow([item[0], item[1], item[2]]);
    if (isBB) {
      applyTotalStyle(r);
      r.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
    } else {
      applyDataStyle(r, i % 2 === 1);
    }
    applyLabelStyle(r.getCell(1));

    if (item[2] === "₺") currencyTRY(r.getCell(2));
    else if (item[2] === "%") percentFmt(r.getCell(2));
    else if (item[2] === "$") currencyUSD(r.getCell(2));
    else if (item[2] === "€") currencyEUR(r.getCell(2));
    else intFmt(r.getCell(2));
  });

  ws.addRow([]);
  ws.addRow([]);

  // ==================== BÖLÜM D: HİZMET BAZLI BAŞA BAŞ ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 8, "D) HİZMET BAZLI BAŞA BAŞ ANALİZİ");
  const hdrBB = ws.addRow(["Hizmet", "Bilet Boyutu (₺)", "COGS (₺)", "CM (₺)", "CM (%)", "BB Adet/Ay", "BB Ciro/Ay (₺)", "BB Ciro (USD)"]);
  applyHeaderStyle(hdrBB);

  SERVICES.forEach((svc, i) => {
    const ticket = avgTicket(svc);
    const cogs = ticket * COGS_PERCENT;
    const svcCm = ticket - cogs;
    const svcCmP = svcCm / ticket;
    const svcBB = Math.ceil(TOTAL_FIXED / svcCm);
    const svcBBCiro = TOTAL_FIXED / svcCmP;
    const r = ws.addRow([svc.name, ticket, cogs, svcCm, svcCmP, svcBB, svcBBCiro, Math.round(svcBBCiro / USD_TRY)]);
    applyDataStyle(r, i % 2 === 1);
    applyLabelStyle(r.getCell(1));
    currencyTRY(r.getCell(2));
    currencyTRY(r.getCell(3));
    currencyTRY(r.getCell(4));
    percentFmt(r.getCell(5));
    intFmt(r.getCell(6));
    currencyTRY(r.getCell(7));
    currencyUSD(r.getCell(8));
  });

  // Freeze & filter
  ws.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];
  ws.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4 + FIXED_EXPENSES.length, column: 8 } };
  ws.pageSetup = { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  ws.headerFooter = { oddHeader: "&C&BMindID AI - Başa Baş Analizi&B", oddFooter: "&CSayfa &P / &N" };

  return ws;
}

// =============================================================================
// SAYFA 4: 12 AYLIK FİNANSAL PROJEKSİYON
// =============================================================================
async function createSheet4(wb) {
  const ws = wb.addWorksheet("12 Ay Projeksiyon", {
    properties: { tabColor: { argb: COLORS.darkBlue } },
  });

  const monthlyData = calcMonthlyData();

  // Column widths
  const cols = [{ width: 34 }];
  for (let i = 0; i < 12; i++) cols.push({ width: 15 });
  cols.push({ width: 16 }); // N - 6 Aylık
  cols.push({ width: 18 }); // O - Yıllık
  cols.push({ width: 14 }); // P - USD
  cols.push({ width: 14 }); // Q - EUR
  ws.columns = cols;

  // TITLE
  applyTitleStyle(ws, 1, 1, 17, "MindID AI - 12 AYLIK FİNANSAL PROJEKSİYON (GELİR TABLOSU & NAKİT AKIŞ)");

  // ==================== GELİR TABLOSU (P&L) ====================
  applySectionTitle(ws, 3, 1, 17, "GELİR TABLOSU (P&L) - Aylık, 6 Aylık, Yıllık");

  const hdr = ws.addRow(["KALEM", ...MONTHS, "İLK 6 AY", "YILLIK", "USD", "EUR"]);
  applyHeaderStyle(hdr);

  // Helper to add a financial row
  function addFinRow(label, values, isBold, isTotal) {
    let sum6 = 0, sum12 = 0;
    values.forEach((v, i) => { if (i < 6) sum6 += v; sum12 += v; });
    const row = [label, ...values, sum6, sum12, Math.round(sum12 / USD_TRY), Math.round(sum12 / EUR_TRY)];
    const r = ws.addRow(row);
    if (isTotal) {
      applyTotalStyle(r);
    } else {
      applyDataStyle(r, false);
    }
    applyLabelStyle(r.getCell(1));
    if (isBold || isTotal) {
      r.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
    }
    for (let c = 2; c <= 15; c++) currencyTRY(r.getCell(c));
    currencyUSD(r.getCell(16));
    currencyEUR(r.getCell(17));

    // Color negative values red
    for (let c = 2; c <= 17; c++) {
      const cellVal = r.getCell(c).value;
      if (typeof cellVal === "number" && cellVal < 0) {
        r.getCell(c).font = { ...r.getCell(c).font, color: { argb: COLORS.red } };
      }
    }
    return r;
  }

  function addPercentRow(label, values) {
    let sum6vals = values.slice(0, 6);
    let sum12vals = values;
    const avg6 = sum6vals.reduce((a, b) => a + b, 0) / 6;
    const avg12 = sum12vals.reduce((a, b) => a + b, 0) / 12;
    const row = [label, ...values, avg6, avg12, "", ""];
    const r = ws.addRow(row);
    applyDataStyle(r, true);
    applyLabelStyle(r.getCell(1));
    r.getCell(1).font = { name: "Calibri", size: 10, italic: true, color: { argb: COLORS.darkBlue } };
    for (let c = 2; c <= 15; c++) percentFmt(r.getCell(c));
    return r;
  }

  function addSpacer() { ws.addRow([]); }

  // --- GELİR ---
  const revenues = monthlyData.map((d) => d.totalRevenue);
  addFinRow("GELİR (KDV Hariç)", revenues, true, false);

  // Per service
  SERVICES.forEach((svc, i) => {
    addFinRow(`  ${svc.name}`, monthlyData.map((d) => d.services[i].revenue), false, false);
  });

  const kdvValues = monthlyData.map((d) => d.kdv);
  addFinRow("KDV Tutarı (%20)", kdvValues, false, false);

  const revenueWithKdv = monthlyData.map((d) => d.revenueWithKdv);
  addFinRow("TOPLAM GELİR (KDV Dahil)", revenueWithKdv, true, true);

  addSpacer();

  // --- COGS ---
  const cogsAI = monthlyData.map((d) => d.totalRevenue * COGS_AI_COMPUTE);
  const cogsAPI = monthlyData.map((d) => d.totalRevenue * COGS_API);
  const cogsPersonnel = monthlyData.map((d) => d.totalRevenue * COGS_PERSONNEL);
  const totalCogs = monthlyData.map((d) => d.cogs);

  addFinRow("SATILAN MALIN MALİYETİ (SMM / COGS)", totalCogs, true, false);
  addFinRow("  AI Compute (GPU)", cogsAI, false, false);
  addFinRow("  API Maliyetleri", cogsAPI, false, false);
  addFinRow("  Proje Bazlı Personel", cogsPersonnel, false, false);

  addSpacer();

  // --- BRÜT KÂR ---
  const grossProfit = monthlyData.map((d) => d.grossProfit);
  addFinRow("BRÜT KÂR", grossProfit, true, true);
  addPercentRow("  Brüt Kâr Marjı (%)", monthlyData.map((d) => d.totalRevenue > 0 ? d.grossProfit / d.totalRevenue : 0));

  addSpacer();

  // --- FAALİYET GİDERLERİ ---
  addFinRow("FAALİYET GİDERLERİ", monthlyData.map((d) => d.totalOpex), true, false);
  addFinRow("  Personel (Sabit Maaşlar)", monthlyData.map((d) => d.personnelFixed), false, false);
  addFinRow("  Ofis & Altyapı", monthlyData.map((d) => d.officeInfra), false, false);
  addFinRow("  Yazılım & AI Abonelikler", monthlyData.map((d) => d.softwareAI), false, false);
  addFinRow("  Pazarlama & Reklam", monthlyData.map((d) => d.marketing), false, false);
  addFinRow("  Genel Yönetim", monthlyData.map((d) => d.generalAdmin), false, false);

  addSpacer();

  // --- FAVÖK (EBITDA) ---
  const ebitda = monthlyData.map((d) => d.ebitda);
  addFinRow("FAVÖK (EBITDA)", ebitda, true, true);
  addPercentRow("  FAVÖK Marjı (%)", monthlyData.map((d) => d.totalRevenue > 0 ? d.ebitda / d.totalRevenue : 0));

  addSpacer();

  // --- VERGİ & NET KÂR ---
  addFinRow("Kurumlar Vergisi (%25)", monthlyData.map((d) => d.tax), false, false);
  const netIncome = monthlyData.map((d) => d.netIncome);
  addFinRow("NET KÂR / ZARAR", netIncome, true, true);
  addPercentRow("  Net Kâr Marjı (%)", monthlyData.map((d) => d.totalRevenue > 0 ? d.netIncome / d.totalRevenue : 0));

  addSpacer();
  addSpacer();

  // ==================== NAKİT AKIŞ PROJEKSİYONU ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 17, "NAKİT AKIŞ PROJEKSİYONU");
  const hdr2 = ws.addRow(["KALEM", ...MONTHS, "İLK 6 AY", "YILLIK", "USD", "EUR"]);
  applyHeaderStyle(hdr2);

  // Cash inflows
  addFinRow("NAKİT GİRİŞLERİ", monthlyData.map((d) => d.revenueWithKdv + (monthlyData.indexOf(d) === 0 ? INITIAL_CAPITAL : 0)), true, false);
  addFinRow("  Satış Gelirleri (KDV Dahil Tahsilat)", revenueWithKdv, false, false);
  const capitalRow = Array(12).fill(0); capitalRow[0] = INITIAL_CAPITAL;
  addFinRow("  Başlangıç Sermayesi", capitalRow, false, false);

  addSpacer();

  // Cash outflows
  const totalCashOut = monthlyData.map((d, i) => d.cogs + d.totalOpex + d.kdv + (i === 0 ? CAPEX_MONTH1 : 0));
  addFinRow("NAKİT ÇIKIŞLARI", totalCashOut, true, false);
  addFinRow("  SMM Ödemeleri", totalCogs, false, false);
  addFinRow("  Faaliyet Giderleri", monthlyData.map((d) => d.totalOpex), false, false);
  addFinRow("  KDV Ödemesi (Devlete)", kdvValues, false, false);
  const capexRow = Array(12).fill(0); capexRow[0] = CAPEX_MONTH1;
  addFinRow("  Yatırım Harcamaları (CAPEX)", capexRow, false, false);

  addSpacer();

  // Net cash flow
  const netCash = monthlyData.map((d, i) => {
    const inflow = d.revenueWithKdv + (i === 0 ? INITIAL_CAPITAL : 0);
    const outflow = d.cogs + d.totalOpex + d.kdv + (i === 0 ? CAPEX_MONTH1 : 0);
    return inflow - outflow;
  });
  addFinRow("NET NAKİT AKIŞI", netCash, true, true);

  // Cumulative cash
  const cumCash = [];
  let running = 0;
  netCash.forEach((nc) => { running += nc; cumCash.push(running); });
  addFinRow("KÜMÜLATİF NAKİT", cumCash, true, true);

  // Status row
  const statusRow = ["NAKİT DURUMU"];
  cumCash.forEach((c) => statusRow.push(c >= 0 ? "OK" : "UYARI"));
  statusRow.push("", "", "", "");
  const sr = ws.addRow(statusRow);
  applyDataStyle(sr);
  applyLabelStyle(sr.getCell(1));
  sr.getCell(1).font = { name: "Calibri", size: 11, bold: true };
  for (let c = 2; c <= 13; c++) {
    const val = sr.getCell(c).value;
    sr.getCell(c).font = {
      name: "Calibri", size: 11, bold: true,
      color: { argb: val === "OK" ? "007700" : COLORS.red },
    };
  }

  // Freeze & filter
  ws.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];
  ws.pageSetup = { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  ws.headerFooter = { oddHeader: "&C&BMindID AI - 12 Aylık Finansal Projeksiyon&B", oddFooter: "&CSayfa &P / &N" };

  return ws;
}

// =============================================================================
// SAYFA 5: STRATEJİK KPI (AJANS YÖNETİM PANELİ)
// =============================================================================
async function createSheet5(wb) {
  const ws = wb.addWorksheet("KPI Dashboard", {
    properties: { tabColor: { argb: "2E75B6" } },
  });

  const monthlyData = calcMonthlyData();

  const cols = [{ width: 36 }];
  for (let i = 0; i < 12; i++) cols.push({ width: 15 });
  cols.push({ width: 16 }); // 6 Aylık
  cols.push({ width: 16 }); // Yıllık
  ws.columns = cols;

  // TITLE
  applyTitleStyle(ws, 1, 1, 14, "MindID AI - STRATEJİK KPI (AJANS YÖNETİM PANELİ)");

  // Helper
  function addKpiRow(label, values, fmt, isBold) {
    let arr6 = values.slice(0, 6);
    let sum6 = fmt === "pct" || fmt === "ratio" ? arr6.reduce((a, b) => a + b, 0) / 6 : arr6.reduce((a, b) => a + b, 0);
    let sum12 = fmt === "pct" || fmt === "ratio" ? values.reduce((a, b) => a + b, 0) / 12 : values.reduce((a, b) => a + b, 0);
    const row = [label, ...values, sum6, sum12];
    const r = ws.addRow(row);
    applyDataStyle(r);
    applyLabelStyle(r.getCell(1));
    if (isBold) r.getCell(1).font = { name: "Calibri", size: 11, bold: true, color: { argb: COLORS.darkBlue } };
    for (let c = 2; c <= 14; c++) {
      if (fmt === "try") currencyTRY(r.getCell(c));
      else if (fmt === "usd") currencyUSD(r.getCell(c));
      else if (fmt === "pct") percentFmt(r.getCell(c));
      else if (fmt === "int") intFmt(r.getCell(c));
      else if (fmt === "ratio") r.getCell(c).numFmt = "0.0x";
    }
    return r;
  }

  // ==================== A: MÜŞTERİ EDİNME ====================
  applySectionTitle(ws, 3, 1, 14, "A) MÜŞTERİ EDİNME METRİKLERİ");
  const kpiHdr1 = ws.addRow(["KPI", ...MONTHS, "6 AY ORT.", "YIL ORT."]);
  applyHeaderStyle(kpiHdr1);

  const marketingSpend = monthlyData.map((d) => d.marketing);
  addKpiRow("Toplam Pazarlama Harcaması (₺)", marketingSpend, "try", false);
  addKpiRow("Yeni Müşteri Sayısı", monthlyData.map((d) => d.totalQty), "int", false);

  const cac = monthlyData.map((d) => d.totalQty > 0 ? Math.round(d.marketing / d.totalQty) : 0);
  addKpiRow("CAC - Müşteri Edinme Maliyeti (₺)", cac, "try", true);
  addKpiRow("CAC (USD)", cac.map((c) => Math.round(c / USD_TRY)), "usd", false);

  ws.addRow([]);

  // ==================== B: MÜŞTERİ DEĞERİ ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 14, "B) MÜŞTERİ DEĞERİ METRİKLERİ");
  const kpiHdr2 = ws.addRow(["KPI", ...MONTHS, "6 AY ORT.", "YIL ORT."]);
  applyHeaderStyle(kpiHdr2);

  const avgProjectValue = monthlyData.map((d) => d.totalQty > 0 ? Math.round(d.totalRevenue / d.totalQty) : 0);
  addKpiRow("Ortalama Proje Değeri (₺)", avgProjectValue, "try", true);
  addKpiRow("Ort. Proje Değeri (USD)", avgProjectValue.map((v) => Math.round(v / USD_TRY)), "usd", false);

  const repeatRate = monthlyData.map((d, i) => i < 6 ? 0.20 : 0.35);
  addKpiRow("Tekrar Müşteri Oranı (%)", repeatRate, "pct", false);

  // LTV = avg project value * (1 + repeat rate * avg customer life in projects)
  const ltv = monthlyData.map((d, i) => {
    const apv = d.totalQty > 0 ? d.totalRevenue / d.totalQty : 0;
    const rr = i < 6 ? 0.20 : 0.35;
    return Math.round(apv * (1 + rr * 2)); // assume 2 additional projects over lifetime
  });
  addKpiRow("LTV - Yaşam Boyu Değer (₺)", ltv, "try", true);
  addKpiRow("LTV (USD)", ltv.map((l) => Math.round(l / USD_TRY)), "usd", false);

  const ltvCac = monthlyData.map((d, i) => cac[i] > 0 ? ltv[i] / cac[i] : 0);
  addKpiRow("LTV/CAC Oranı", ltvCac, "ratio", true);

  ws.addRow([]);

  // ==================== C: GELİR METRİKLERİ ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 14, "C) GELİR METRİKLERİ");
  const kpiHdr3 = ws.addRow(["KPI", ...MONTHS, "6 AY ORT.", "YIL ORT."]);
  applyHeaderStyle(kpiHdr3);

  const revenues = monthlyData.map((d) => d.totalRevenue);
  addKpiRow("Aylık Gelir / MRR (₺)", revenues, "try", true);
  addKpiRow("MRR (USD)", revenues.map((r) => Math.round(r / USD_TRY)), "usd", false);

  const growthRates = [0, ...monthlyData.slice(1).map((d, i) => {
    const prev = monthlyData[i].totalRevenue;
    return prev > 0 ? (d.totalRevenue - prev) / prev : 0;
  })];
  addKpiRow("Aylık Gelir Büyüme Oranı (%)", growthRates, "pct", false);

  const arr = revenues.map((r) => r * 12);
  addKpiRow("ARR - Yıllıklandırılmış Gelir (₺)", arr, "try", true);

  const conversionRate = monthlyData.map(() => 0.08); // %8 varsayım
  addKpiRow("Dönüşüm Oranı (Lead → Müşteri)", conversionRate, "pct", false);

  ws.addRow([]);

  // ==================== D: OPERASYONEL KPI ====================
  applySectionTitle(ws, ws.lastRow.number + 1, 1, 14, "D) OPERASYONEL KPI'LAR");
  const kpiHdr4 = ws.addRow(["KPI", ...MONTHS, "6 AY ORT.", "YIL ORT."]);
  applyHeaderStyle(kpiHdr4);

  const teamSizes = monthlyData.map((d) => d.team);
  addKpiRow("Ekip Büyüklüğü (Kişi)", teamSizes, "int", false);

  const revenuePerEmployee = monthlyData.map((d) => Math.round(d.totalRevenue / d.team));
  addKpiRow("Çalışan Başına Gelir (₺)", revenuePerEmployee, "try", true);
  addKpiRow("Çalışan Başına Gelir (USD)", revenuePerEmployee.map((r) => Math.round(r / USD_TRY)), "usd", false);

  const maxCapacity = monthlyData.map((d) => d.team * 8);
  addKpiRow("Maksimum Kapasite (Proje/Ay)", maxCapacity, "int", false);
  addKpiRow("Gerçekleşen Proje Sayısı", monthlyData.map((d) => d.totalQty), "int", false);

  const capacityUtil = monthlyData.map((d) => d.totalQty / (d.team * 8));
  addKpiRow("Kapasite Kullanım Oranı (%)", capacityUtil, "pct", true);

  // Avg delivery time (weighted)
  const avgDelivery = monthlyData.map((d) => {
    if (d.totalQty === 0) return 0;
    const totalDays = d.services.reduce((s, svc) => {
      let days = 5;
      if (svc.name.includes("Ürün")) days = 10;
      else if (svc.name.includes("Kampanya") || svc.name.includes("Kurumsal")) days = 15;
      else if (svc.name.includes("Avatar")) days = 3;
      return s + svc.qty * days;
    }, 0);
    return Math.round(totalDays / d.totalQty);
  });
  addKpiRow("Ort. Proje Teslim Süresi (Gün)", avgDelivery, "int", false);

  const nps = monthlyData.map(() => 50);
  addKpiRow("NPS Hedefi", nps, "int", false);

  const satisfaction = monthlyData.map(() => 4.5);
  addKpiRow("Müşteri Memnuniyet Skoru (Hedef /5)", satisfaction, "ratio", false);

  // Freeze & filter
  ws.views = [{ state: "frozen", ySplit: 4, xSplit: 1 }];
  ws.pageSetup = { orientation: "landscape", paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  ws.headerFooter = { oddHeader: "&C&BMindID AI - Stratejik KPI Dashboard&B", oddFooter: "&CSayfa &P / &N" };

  return ws;
}

// =============================================================================
// ANA FONKSİYON
// =============================================================================
async function main() {
  console.log("MindID AI Finansal Plan Excel dosyası oluşturuluyor...\n");

  const wb = new ExcelJS.Workbook();
  wb.creator = "MindID -Lab Technology";
  wb.created = new Date();
  wb.modified = new Date();

  console.log("  [1/5] Hizmet Karlılık Tablosu...");
  await createSheet1(wb);

  console.log("  [2/5] Aylık Hedef & Büyüme Projeksiyonu...");
  await createSheet2(wb);

  console.log("  [3/5] Sabit Gider & Başa Baş Analizi...");
  await createSheet3(wb);

  console.log("  [4/5] 12 Aylık Finansal Projeksiyon...");
  await createSheet4(wb);

  console.log("  [5/5] Stratejik KPI Dashboard...");
  await createSheet5(wb);

  const outputPath = path.join(__dirname, "..", "MindID_Finansal_Plan_2026.xlsx");
  await wb.xlsx.writeFile(outputPath);
  console.log(`\nDosya başarıyla oluşturuldu: ${outputPath}`);
  console.log("\nÖzet:");
  console.log(`  - 5 sayfa (Hizmet Karlılık, Aylık Hedefler, Başa Baş, 12 Ay P&L, KPI)`);
  console.log(`  - Döviz: USD/TRY=${USD_TRY}, EUR/TRY=${EUR_TRY}`);
  console.log(`  - KDV: %${KDV_RATE * 100}`);
  console.log(`  - 12 aylık projeksiyon + 6 aylık + yıllık toplamlar`);
}

main().catch((err) => {
  console.error("HATA:", err);
  process.exit(1);
});
