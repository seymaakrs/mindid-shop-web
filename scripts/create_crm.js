const ExcelJS = require('exceljs');

const COLORS = {
  'Yeni':        { bg: 'FF4472C4', font: 'FFFFFFFF' },   // Mavi
  'Arandı':      { bg: 'FFFFF2CC', font: 'FF000000' },   // Sarı
  'İlgileniyor': { bg: 'FFFCE4D6', font: 'FF000000' },   // Turuncu açık
  'Teklif Verildi': { bg: 'FFE2EFDA', font: 'FF000000' },// Yeşil açık
  'Onaylandı':   { bg: 'FF70AD47', font: 'FFFFFFFF' },   // Yeşil
  'Tekrar Ara':  { bg: 'FFED7D31', font: 'FFFFFFFF' },   // Turuncu
  'Cevap Yok':   { bg: 'FFBFBFBF', font: 'FF000000' },   // Gri
  'İptal':       { bg: 'FFFF0000', font: 'FFFFFFFF' },   // Kırmızı
};

const headerStyle = {
  font: { name: 'Arial', bold: true, size: 11, color: { argb: 'FFFFFFFF' } },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } },
  alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
  border: {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } },
  }
};

const cellBorder = {
  top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
  bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
  left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
  right: { style: 'thin', color: { argb: 'FFD9D9D9' } },
};

function applyStatusColor(cell, status) {
  const color = COLORS[status];
  if (color) {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color.bg } };
    cell.font = { name: 'Arial', size: 10, color: { argb: color.font }, bold: true };
  }
}

function applyRowStyle(row, rowNum) {
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = cell.font || { name: 'Arial', size: 10 };
    if (!cell.font.name) cell.font.name = 'Arial';
    if (!cell.font.size) cell.font.size = 10;
    cell.border = cellBorder;
    cell.alignment = { vertical: 'middle', wrapText: true };
  });
  if (rowNum % 2 === 0) {
    row.eachCell({ includeEmpty: true }, (cell) => {
      if (!cell.fill || cell.fill.pattern === 'none') {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
      }
    });
  }
}

async function main() {
  const wb1 = new ExcelJS.Workbook();
  await wb1.xlsx.readFile('C:/Users/asus/Downloads/Dalaman_Ortaca_Isletmeler.xlsx');
  const ws1 = wb1.getWorksheet('📋 İşletme Listesi');

  const wb2 = new ExcelJS.Workbook();
  await wb2.xlsx.readFile('C:/Users/asus/Downloads/Mugla_Dalaman_Ortaca_CRM.xlsx');
  const ws2 = wb2.getWorksheet('📋 CRM Kişi Listesi');
  const wsPipeline = wb2.getWorksheet('📊 Pipeline Takip');
  const wsWhatsapp = wb2.getWorksheet('💬 WhatsApp Şablonları');
  const wsAksiyon = wb2.getWorksheet('🗺️ Aksiyon Planı');

  // ---- Dosya 1 verilerini oku (row 4'ten itibaren) ----
  const isletmeler = [];
  for (let r = 4; r <= ws1.rowCount; r++) {
    const row = ws1.getRow(r);
    const isletmeAdi = row.getCell(2).value;
    if (!isletmeAdi) continue;
    isletmeler.push({
      isletmeAdi: String(isletmeAdi || ''),
      adSoyad: '',
      unvan: '',
      sektor: String(row.getCell(3).value || ''),
      lokasyon: String(row.getCell(7).value || ''),
      telefon: String(row.getCell(4).value || ''),
      whatsapp: String(row.getCell(5).value || ''),
      eposta: '',
      webSitesi: String(row.getCell(6).value || ''),
      linkedin: '',
      googleMaps: String(row.getCell(10).value || ''),
      puan: row.getCell(8).value,
      degerlendirme: row.getCell(9).value,
      kaynak: 'Google Maps',
      durum: 'Yeni',
      sonAramaTarihi: '',
      sonNotTarihi: '',
      aramaSayisi: 0,
      notlar: String(row.getCell(12).value || ''),
    });
  }

  // ---- Dosya 2 verilerini oku (row 4'ten itibaren) ----
  const kisiler = [];
  for (let r = 4; r <= ws2.rowCount; r++) {
    const row = ws2.getRow(r);
    const adSoyad = row.getCell(2).value;
    if (!adSoyad) continue;
    kisiler.push({
      isletmeAdi: String(row.getCell(4).value || ''),
      adSoyad: String(adSoyad || ''),
      unvan: String(row.getCell(3).value || ''),
      sektor: String(row.getCell(5).value || ''),
      lokasyon: String(row.getCell(6).value || ''),
      telefon: String(row.getCell(7).value || ''),
      whatsapp: String(row.getCell(8).value || ''),
      eposta: String(row.getCell(9).value || ''),
      webSitesi: String(row.getCell(10).value || ''),
      linkedin: String(row.getCell(11).value || ''),
      googleMaps: '',
      puan: '',
      degerlendirme: '',
      kaynak: String(row.getCell(12).value || ''),
      durum: 'Yeni',
      sonAramaTarihi: '',
      sonNotTarihi: '',
      aramaSayisi: 0,
      notlar: String(row.getCell(16).value || ''),
    });
  }

  // ---- YENİ CRM WORKBOOK ----
  const crm = new ExcelJS.Workbook();
  crm.creator = 'MindID CRM';
  crm.created = new Date();

  // ============ SHEET 1: ANA CRM LİSTESİ ============
  const wsCRM = crm.addWorksheet('📋 CRM Ana Liste', {
    views: [{ state: 'frozen', xSplit: 0, ySplit: 3 }],
    properties: { tabColor: { argb: 'FF2F5496' } }
  });

  // Başlık satırı
  wsCRM.mergeCells('A1:T1');
  const titleCell = wsCRM.getCell('A1');
  titleCell.value = '🎯 MindID CRM — MUĞLA / DALAMAN & ORTACA BÖLGE MÜŞTERİ TAKİP';
  titleCell.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  wsCRM.getRow(1).height = 35;

  // Alt başlık (durum renk açıklaması)
  wsCRM.mergeCells('A2:T2');
  const subtitleCell = wsCRM.getCell('A2');
  subtitleCell.value = 'Durum Renkleri:  🔵 Yeni  |  🟡 Arandı  |  🟠 İlgileniyor  |  🟢 Teklif Verildi  |  ✅ Onaylandı  |  🔶 Tekrar Ara  |  ⚪ Cevap Yok  |  🔴 İptal';
  subtitleCell.font = { name: 'Arial', size: 9, color: { argb: 'FFFFFFFF' } };
  subtitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } };
  subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  wsCRM.getRow(2).height = 22;

  // Sütun başlıkları
  const headers = [
    'No', 'İşletme / Firma Adı', 'Yetkili Ad Soyad', 'Unvan / Rol',
    'Sektör', 'Lokasyon', 'Telefon', 'WhatsApp', 'E-Posta',
    'Web Sitesi', 'LinkedIn', 'Google Maps', 'Puan', 'Değ. Sayısı',
    'Kaynak', 'DURUM', 'Son Arama Tarihi', 'Arama Sayısı',
    'Sonraki Arama', 'Notlar'
  ];

  const headerRow = wsCRM.getRow(3);
  headers.forEach((h, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });
  headerRow.height = 30;

  // Sütun genişlikleri
  const colWidths = [5, 28, 22, 18, 20, 22, 18, 10, 24, 22, 22, 15, 6, 8, 14, 16, 15, 10, 15, 35];
  colWidths.forEach((w, i) => { wsCRM.getColumn(i + 1).width = w; });

  // Durum dropdown validasyonu
  const statusValidation = {
    type: 'list',
    allowBlank: true,
    formulae: ['"Yeni,Arandı,İlgileniyor,Teklif Verildi,Onaylandı,Tekrar Ara,Cevap Yok,İptal"'],
    showErrorMessage: true,
    errorTitle: 'Geçersiz Durum',
    error: 'Lütfen listeden bir durum seçin.',
  };

  // Veri yazma
  const allData = [...isletmeler, ...kisiler];
  let rowNum = 4;
  for (let i = 0; i < allData.length; i++) {
    const d = allData[i];
    const row = wsCRM.getRow(rowNum);
    row.values = [
      i + 1,
      d.isletmeAdi,
      d.adSoyad,
      d.unvan,
      d.sektor,
      d.lokasyon,
      d.telefon,
      d.whatsapp,
      d.eposta,
      d.webSitesi,
      d.linkedin,
      d.googleMaps,
      d.puan || '',
      d.degerlendirme || '',
      d.kaynak,
      d.durum,
      d.sonAramaTarihi,
      d.aramaSayisi,
      '',
      d.notlar === 'null' ? '' : d.notlar,
    ];
    row.height = 20;
    applyRowStyle(row, rowNum);

    // Durum hücresine renk uygula
    const statusCell = row.getCell(16);
    applyStatusColor(statusCell, d.durum);
    statusCell.dataValidation = statusValidation;

    // Tarih formatı
    row.getCell(17).numFmt = 'DD.MM.YYYY';
    row.getCell(19).numFmt = 'DD.MM.YYYY';

    // null temizliği
    for (let c = 1; c <= 20; c++) {
      const cell = row.getCell(c);
      if (cell.value === 'null' || cell.value === 'undefined') cell.value = '';
    }

    rowNum++;
  }

  // Boş satırlar ekle (yeni müşteri eklemek için, 50 adet)
  for (let i = 0; i < 50; i++) {
    const row = wsCRM.getRow(rowNum);
    row.getCell(1).value = allData.length + i + 1;
    row.height = 20;
    applyRowStyle(row, rowNum);
    row.getCell(16).dataValidation = statusValidation;
    row.getCell(17).numFmt = 'DD.MM.YYYY';
    row.getCell(19).numFmt = 'DD.MM.YYYY';
    rowNum++;
  }

  // AutoFilter
  wsCRM.autoFilter = { from: 'A3', to: `T${rowNum - 1}` };

  // Conditional formatting for status column
  const lastDataRow = rowNum - 1;
  Object.entries(COLORS).forEach(([status, colors]) => {
    wsCRM.addConditionalFormatting({
      ref: `P4:P${lastDataRow}`,
      rules: [{
        type: 'containsText',
        operator: 'containsText',
        text: status,
        style: {
          fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: colors.bg } },
          font: { color: { argb: colors.font }, bold: true },
        },
      }],
    });
  });

  // ============ SHEET 2: DURUM ÖZETİ (Dashboard) ============
  const wsDashboard = crm.addWorksheet('📊 Durum Özeti', {
    properties: { tabColor: { argb: 'FF70AD47' } }
  });

  wsDashboard.mergeCells('A1:D1');
  const dashTitle = wsDashboard.getCell('A1');
  dashTitle.value = '📊 CRM DURUM ÖZETİ';
  dashTitle.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  dashTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
  dashTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsDashboard.getRow(1).height = 35;

  const dashHeaders = ['Durum', 'Kayıt Sayısı', 'Yüzde', 'Renk'];
  const dashHeaderRow = wsDashboard.getRow(3);
  dashHeaders.forEach((h, i) => {
    const cell = dashHeaderRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });

  const statuses = ['Yeni', 'Arandı', 'İlgileniyor', 'Teklif Verildi', 'Onaylandı', 'Tekrar Ara', 'Cevap Yok', 'İptal'];
  statuses.forEach((s, i) => {
    const r = wsDashboard.getRow(4 + i);
    r.getCell(1).value = s;
    r.getCell(2).value = { formula: `COUNTIF('📋 CRM Ana Liste'!P:P,"${s}")` };
    r.getCell(3).value = { formula: `IF(SUM(B4:B11)=0,0,B${4+i}/SUM(B4:B11))` };
    r.getCell(3).numFmt = '0.0%';
    r.getCell(4).value = '';
    r.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS[s].bg } };
    r.height = 22;
    r.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: 'Arial', size: 11 };
      cell.border = cellBorder;
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // Toplam satırı
  const totalRow = wsDashboard.getRow(12);
  totalRow.getCell(1).value = 'TOPLAM';
  totalRow.getCell(1).font = { name: 'Arial', bold: true, size: 11 };
  totalRow.getCell(2).value = { formula: 'SUM(B4:B11)' };
  totalRow.getCell(2).font = { name: 'Arial', bold: true, size: 11 };
  totalRow.getCell(3).value = { formula: 'SUM(C4:C11)' };
  totalRow.getCell(3).numFmt = '0.0%';
  totalRow.getCell(3).font = { name: 'Arial', bold: true, size: 11 };
  totalRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.border = headerStyle.border;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // Sektör Özeti
  wsDashboard.mergeCells('A14:D14');
  const sektorTitle = wsDashboard.getCell('A14');
  sektorTitle.value = '📊 SEKTÖR BAZLI ÖZET';
  sektorTitle.font = { name: 'Arial', bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
  sektorTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } };
  sektorTitle.alignment = { horizontal: 'center', vertical: 'middle' };

  const sektorHeaders = ['Sektör', 'Kayıt Sayısı', 'Telefonlu', 'Web Siteli'];
  const sektorHeaderRow = wsDashboard.getRow(15);
  sektorHeaders.forEach((h, i) => {
    const cell = sektorHeaderRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });

  const sektorler = [...new Set(allData.map(d => d.sektor).filter(s => s))];
  sektorler.forEach((s, i) => {
    const r = wsDashboard.getRow(16 + i);
    const count = allData.filter(d => d.sektor === s).length;
    const telCount = allData.filter(d => d.sektor === s && d.telefon && d.telefon !== '' && d.telefon !== '—').length;
    const webCount = allData.filter(d => d.sektor === s && d.webSitesi && d.webSitesi !== '' && d.webSitesi !== 'null').length;
    r.getCell(1).value = s;
    r.getCell(2).value = count;
    r.getCell(3).value = telCount;
    r.getCell(4).value = webCount;
    r.height = 20;
    r.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: 'Arial', size: 10 };
      cell.border = cellBorder;
      cell.alignment = { vertical: 'middle' };
    });
  });

  wsDashboard.getColumn(1).width = 28;
  wsDashboard.getColumn(2).width = 15;
  wsDashboard.getColumn(3).width = 12;
  wsDashboard.getColumn(4).width = 12;

  // ============ SHEET 3: PIPELINE TAKİP ============
  const wsPipe = crm.addWorksheet('📊 Pipeline Takip', {
    properties: { tabColor: { argb: 'FFED7D31' } }
  });

  wsPipe.mergeCells('A1:H1');
  const pipeTitle = wsPipe.getCell('A1');
  pipeTitle.value = '📊 SATIŞ PIPELINE — MUĞLA BÖLGE KAMPANYASI';
  pipeTitle.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  pipeTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
  pipeTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsPipe.getRow(1).height = 35;

  // Pipeline headers
  const pipeHeaders = ['Aşama', 'Kişi Sayısı', 'Hedef', 'Oran %', 'Eylem', 'Araç', 'Sorumlu', 'Notlar'];
  const pipeHeaderRow = wsPipe.getRow(2);
  pipeHeaders.forEach((h, i) => {
    const cell = pipeHeaderRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });

  for (let r = 3; r <= wsPipeline.rowCount; r++) {
    const srcRow = wsPipeline.getRow(r);
    const destRow = wsPipe.getRow(r);
    for (let c = 1; c <= 8; c++) {
      const val = srcRow.getCell(c).value;
      destRow.getCell(c).value = (typeof val === 'object' && val !== null && val.formula) ? '' : (val || '');
      destRow.getCell(c).font = { name: 'Arial', size: 10 };
      destRow.getCell(c).border = cellBorder;
      destRow.getCell(c).alignment = { vertical: 'middle', wrapText: true };
    }
    destRow.height = 25;
  }

  [18, 14, 8, 10, 35, 22, 12, 30].forEach((w, i) => { wsPipe.getColumn(i + 1).width = w; });

  // ============ SHEET 4: WHATSAPP ŞABLONLARI ============
  const wsWA = crm.addWorksheet('💬 WhatsApp Şablonları', {
    properties: { tabColor: { argb: 'FF25D366' } }
  });

  wsWA.mergeCells('A1:C1');
  const waTitle = wsWA.getCell('A1');
  waTitle.value = '💬 WHATSAPP MESAJ ŞABLONLARI — MUĞLA BÖLGE KAMPANYASI';
  waTitle.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  waTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF25D366' } };
  waTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsWA.getRow(1).height = 35;

  const waHeaders = ['Şablon Adı', 'Mesaj İçeriği', 'Hedef Sektör'];
  const waHeaderRow = wsWA.getRow(2);
  waHeaders.forEach((h, i) => {
    const cell = waHeaderRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });

  for (let r = 3; r <= wsWhatsapp.rowCount; r++) {
    const srcRow = wsWhatsapp.getRow(r);
    const destRow = wsWA.getRow(r);
    for (let c = 1; c <= 3; c++) {
      destRow.getCell(c).value = srcRow.getCell(c).value || '';
      destRow.getCell(c).font = { name: 'Arial', size: 10 };
      destRow.getCell(c).border = cellBorder;
      destRow.getCell(c).alignment = { vertical: 'top', wrapText: true };
    }
    destRow.height = 80;
  }

  wsWA.getColumn(1).width = 22;
  wsWA.getColumn(2).width = 70;
  wsWA.getColumn(3).width = 20;

  // ============ SHEET 5: AKSİYON PLANI ============
  const wsAP = crm.addWorksheet('🗺️ Aksiyon Planı', {
    properties: { tabColor: { argb: 'FF4472C4' } }
  });

  wsAP.mergeCells('A1:F1');
  const apTitle = wsAP.getCell('A1');
  apTitle.value = '🗺️ MUĞLA BÖLGE OUTREACH — ADIM ADIM AKSİYON PLANI';
  apTitle.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  apTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
  apTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsAP.getRow(1).height = 35;

  const apHeaders = ['#', 'Adım', 'Açıklama', 'Araç / Platform', 'Süre', 'Durum'];
  const apHeaderRow = wsAP.getRow(2);
  apHeaders.forEach((h, i) => {
    const cell = apHeaderRow.getCell(i + 1);
    cell.value = h;
    Object.assign(cell, { font: headerStyle.font, fill: headerStyle.fill, alignment: headerStyle.alignment, border: headerStyle.border });
  });

  for (let r = 3; r <= wsAksiyon.rowCount; r++) {
    const srcRow = wsAksiyon.getRow(r);
    const destRow = wsAP.getRow(r);
    for (let c = 1; c <= 6; c++) {
      destRow.getCell(c).value = srcRow.getCell(c).value || '';
      destRow.getCell(c).font = { name: 'Arial', size: 10 };
      destRow.getCell(c).border = cellBorder;
      destRow.getCell(c).alignment = { vertical: 'middle', wrapText: true };
    }
    destRow.height = 25;
  }

  [5, 22, 45, 25, 12, 15].forEach((w, i) => { wsAP.getColumn(i + 1).width = w; });

  // ============ SHEET 6: KULLANIM KILAVUZU ============
  const wsGuide = crm.addWorksheet('📖 Kullanım Kılavuzu', {
    properties: { tabColor: { argb: 'FFFFC000' } }
  });

  wsGuide.mergeCells('A1:B1');
  const guideTitle = wsGuide.getCell('A1');
  guideTitle.value = '📖 MindID CRM — KULLANIM KILAVUZU';
  guideTitle.font = { name: 'Arial', bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  guideTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
  guideTitle.alignment = { horizontal: 'center', vertical: 'middle' };
  wsGuide.getRow(1).height = 35;

  const guide = [
    ['🎯 DURUM KODLARI VE RENK AÇIKLAMALARI', ''],
    ['Yeni (🔵 Mavi)', 'Henüz iletişime geçilmemiş müşteri. Listeye yeni eklenmiş.'],
    ['Arandı (🟡 Sarı)', 'Telefon ile arandı, görüşme yapıldı ama henüz karar verilmedi.'],
    ['İlgileniyor (🟠 Turuncu Açık)', 'Müşteri ilgi gösterdi, daha fazla bilgi istedi veya düşünüyor.'],
    ['Teklif Verildi (🟢 Yeşil Açık)', 'Fiyat teklifi veya proje detayları gönderildi.'],
    ['Onaylandı (✅ Yeşil)', 'Müşteri teklifi kabul etti, iş başladı veya başlayacak.'],
    ['Tekrar Ara (🔶 Turuncu)', 'Müşteri şu an müsait değil, belirtilen tarihte tekrar aranacak.'],
    ['Cevap Yok (⚪ Gri)', 'Telefon açılmadı veya mesaja yanıt gelmedi.'],
    ['İptal (🔴 Kırmızı)', 'Müşteri ilgilenmiyor veya reddetti.'],
    ['', ''],
    ['📝 NASIL KULLANILIR?', ''],
    ['Yeni Müşteri Ekleme', 'Ana listede boş satırlara müşteri bilgilerini girin. No sütunu otomatik numaralıdır.'],
    ['Durum Değiştirme', 'P (DURUM) sütununda dropdown listeden yeni durumu seçin. Renk otomatik değişir.'],
    ['Arama Kaydı', 'Aradığınızda Son Arama Tarihi ve Arama Sayısı sütunlarını güncelleyin.'],
    ['Tekrar Arama', 'Sonraki Arama sütununa tekrar aranacak tarihi yazın.'],
    ['Filtreleme', 'Başlık satırındaki filtre oklarını kullanarak duruma, sektöre veya lokasyona göre filtreleyin.'],
    ['Notlar', 'Her görüşmenin detayını Notlar sütununa yazın. Tarih ekleyerek not tutun.'],
    ['', ''],
    ['⚠️ ÖNEMLİ İPUÇLARI', ''],
    ['1.', 'Her aramadan sonra DURUM sütununu mutlaka güncelleyin.'],
    ['2.', '"Tekrar Ara" durumundaki müşteriler için Sonraki Arama tarihini girin.'],
    ['3.', 'Notlar sütununa tarih ile birlikte not ekleyin: "07.03.2026 - Fiyat sordu, teklif gönderilecek"'],
    ['4.', 'Durum Özeti sayfasından genel durumu takip edin.'],
    ['5.', 'WhatsApp Şablonları sayfasındaki mesajları kopyalayıp kullanabilirsiniz.'],
  ];

  guide.forEach((g, i) => {
    const row = wsGuide.getRow(3 + i);
    row.getCell(1).value = g[0];
    row.getCell(2).value = g[1];
    row.getCell(1).font = { name: 'Arial', size: 10, bold: g[0].includes('DURUM') || g[0].includes('NASIL') || g[0].includes('ÖNEMLİ') };
    row.getCell(2).font = { name: 'Arial', size: 10 };
    row.getCell(1).alignment = { vertical: 'middle', wrapText: true };
    row.getCell(2).alignment = { vertical: 'middle', wrapText: true };
    row.height = g[0].includes('DURUM') || g[0].includes('NASIL') || g[0].includes('ÖNEMLİ') || g[0] === '' ? 25 : 20;
    if (g[0].includes('DURUM') || g[0].includes('NASIL') || g[0].includes('ÖNEMLİ')) {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } };
      row.getCell(1).font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      row.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } };
    }
  });

  wsGuide.getColumn(1).width = 30;
  wsGuide.getColumn(2).width = 70;

  // KAYDET
  const outputPath = 'C:/Users/asus/Downloads/MindID_CRM_Dalaman_Ortaca.xlsx';
  await crm.xlsx.writeFile(outputPath);
  console.log('CRM dosyası oluşturuldu:', outputPath);
  console.log('Toplam kayıt:', allData.length, '(İşletmeler:', isletmeler.length, '+ Kişiler:', kisiler.length, ')');
}

main().catch(console.error);
