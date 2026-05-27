/**
 * AMBTO — Google Apps Script: Formulário de Contato
 * ============================================================
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 *
 * 1. Acesse script.google.com → Novo projeto
 * 2. Cole este código completo
 * 3. Edite a constante SHEET_ID com o ID da sua planilha de Contatos
 *    (o ID está na URL da planilha: docs.google.com/spreadsheets/d/SEU_ID/edit)
 * 4. Clique em Implantar → Nova implantação
 *    - Tipo: App da Web
 *    - Executar como: Eu (sua conta)
 *    - Acesso: Qualquer pessoa
 * 5. Copie a URL gerada
 * 6. Cole a URL em main.js → GAS_URLS.contato
 */

const SHEET_ID_CONTATO = '1Un-urdcqcrW3Xqf_dCIFhGSekJllXf7jsrNifD4o2_U';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.openById(SHEET_ID_CONTATO);
    const sheet = ss.getSheetByName('Contatos') || ss.getSheets()[0];

    // Criar cabeçalho se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'WhatsApp', 'É Associado?', 'Mensagem']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('pt-BR'),
      data.nome      || '',
      data.whatsapp  || '',
      data.associado || '',
      data.mensagem  || ''
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

// Necessário para responder a requisições GET (teste de conectividade)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'AMBTO Contato' }))
    .setMimeType(ContentService.MimeType.JSON);
}
