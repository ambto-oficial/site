/**
 * AMBTO — Google Apps Script: Formulário "Quero me Tornar Associado"
 * ============================================================
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 *
 * 1. Acesse script.google.com → Novo projeto
 * 2. Cole este código completo
 * 3. Edite a constante SHEET_ID com o ID da sua planilha de Associados
 * 4. Implante como App da Web (acesso: Qualquer pessoa)
 * 5. Copie a URL e cole em main.js → GAS_URLS.associado
 */

const SHEET_ID_ASSOCIADO = '1swGa9iD13N0z4LKAwWq3hORSuxRS9eCutjvoxqYgQL0';

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.openById(SHEET_ID_ASSOCIADO);
    const sheet = ss.getSheetByName('Solicitações') || ss.getSheets()[0];

    // Cabeçalho
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora', 'Nome', 'Data Nasc.', 'Área de Atuação',
        'CPF', 'Telefone', 'E-mail', 'Endereço', 'Cidade/UF',
        'Registro CREA', 'Declaração', 'Status'
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('pt-BR'),
      data.nome       || '',
      data.dataNasc   || '',
      data.atuacao    || '',
      data.cpf        || '',
      data.telefone   || '',
      data.email      || '',
      data.endereco   || '',
      data.cidade     || '',
      data.registro   || '',
      data.declaracao || '',
      'Pendente'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'AMBTO Associado' }))
    .setMimeType(ContentService.MimeType.JSON);
}
