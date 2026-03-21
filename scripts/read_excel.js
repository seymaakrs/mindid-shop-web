const ExcelJS = require('exceljs');

async function readFiles() {
  const wb1 = new ExcelJS.Workbook();
  await wb1.xlsx.readFile('C:/Users/asus/Downloads/Dalaman_Ortaca_Isletmeler.xlsx');
  for (const ws of wb1.worksheets) {
    console.log('=== Dosya 1 - Sheet:', ws.name, '===');
    console.log('Satir:', ws.rowCount, 'Sutun:', ws.columnCount);
    const headers = [];
    ws.getRow(1).eachCell((cell, colNum) => { headers.push(colNum + ':' + cell.value); });
    console.log('Sutunlar:', headers.join(' | '));
    for (let r = 1; r <= Math.min(5, ws.rowCount); r++) {
      const row = [];
      ws.getRow(r).eachCell({includeEmpty: true}, (cell, colNum) => { row.push(String(cell.value).substring(0, 50)); });
      console.log('Row', r, ':', row.join(' | '));
    }
    console.log();
  }

  const wb2 = new ExcelJS.Workbook();
  await wb2.xlsx.readFile('C:/Users/asus/Downloads/Mugla_Dalaman_Ortaca_CRM.xlsx');
  for (const ws of wb2.worksheets) {
    console.log('=== Dosya 2 - Sheet:', ws.name, '===');
    console.log('Satir:', ws.rowCount, 'Sutun:', ws.columnCount);
    const headers = [];
    ws.getRow(1).eachCell((cell, colNum) => { headers.push(colNum + ':' + cell.value); });
    console.log('Sutunlar:', headers.join(' | '));
    for (let r = 1; r <= Math.min(5, ws.rowCount); r++) {
      const row = [];
      ws.getRow(r).eachCell({includeEmpty: true}, (cell, colNum) => { row.push(String(cell.value).substring(0, 50)); });
      console.log('Row', r, ':', row.join(' | '));
    }
    console.log();
  }
}
readFiles().catch(console.error);
