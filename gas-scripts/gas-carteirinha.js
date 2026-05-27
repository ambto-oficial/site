/**
 * AMBTO — Google Apps Script: Formulário de Carteirinha +AMBTO
 * ============================================================
 * Este script recebe os dados + arquivos (foto e comprovante),
 * cria uma subpasta no Drive com o nome do solicitante e salva
 * ambos os arquivos lá dentro. O link da pasta é gravado na planilha.
 *
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 *
 * 1. Acesse script.google.com → Novo projeto
 * 2. Cole este código completo
 * 3. Edite as constantes abaixo:
 *    - SHEET_ID_CARTEIRINHA : ID da planilha de Carteirinhas
 *    - DRIVE_FOLDER_ID      : ID da pasta "Carteirinhas +AMBTO" no Drive
 *      (crie a pasta no Drive e copie o ID da URL)
 * 4. Implante como App da Web (acesso: Qualquer pessoa)
 * 5. Copie a URL e cole em main.js → GAS_URLS.carteirinha
 *
 * ATENÇÃO: Por usar base64 para os arquivos, o tamanho máximo
 * recomendado por envio é ~5 MB por arquivo (limite do GAS: 50 MB total).
 */

const SHEET_ID_CARTEIRINHA = '1PKViCVFgHrKhULasRxmgqG6ac0Br56qKsg_CBv1oKcM';
const DRIVE_FOLDER_ID      = '1_CvsDOtoSxrS6mFn3H4cfBvaKiwaulr0';

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.openById(SHEET_ID_CARTEIRINHA);
    const sheet = ss.getSheetByName('Solicitações') || ss.getSheets()[0];

    // Cabeçalho
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora', 'Nome', 'CPF', 'Data Nasc.', 'Registro CREA',
        'E-mail', 'Telefone', 'Declaração', 'Link Arquivos no Drive', 'Status'
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    // Criar subpasta com o nome do solicitante
    let pastaLink = '';
    try {
      const pastaRaiz = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const nomePasta = (data.nome || 'Sem_Nome').replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '').trim();
      const subPasta  = pastaRaiz.createFolder(nomePasta + ' — ' + Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd'));
      pastaLink = subPasta.getUrl();

      // Salvar foto
      if (data.foto && data.fotoNome) {
        const fotoBlob = Utilities.newBlob(
          Utilities.base64Decode(data.foto),
          'image/jpeg',
          'foto_' + nomePasta + getExt(data.fotoNome)
        );
        subPasta.createFile(fotoBlob);
      }

      // Salvar comprovante
      if (data.comprovante && data.comprovanteNome) {
        const compMime = data.comprovanteNome.toLowerCase().endsWith('.pdf')
          ? 'application/pdf' : 'image/jpeg';
        const compBlob = Utilities.newBlob(
          Utilities.base64Decode(data.comprovante),
          compMime,
          'comprovante_' + nomePasta + getExt(data.comprovanteNome)
        );
        subPasta.createFile(compBlob);
      }
    } catch (driveErr) {
      pastaLink = 'Erro ao salvar no Drive: ' + driveErr.toString();
    }

    // Gravar na planilha
    sheet.appendRow([
      new Date().toLocaleString('pt-BR'),
      data.nome       || '',
      data.cpf        || '',
      data.dataNasc   || '',
      data.registro   || '',
      data.email      || '',
      data.telefone   || '',
      data.declaracao || '',
      pastaLink,
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

function getExt(filename) {
  const m = filename.match(/\.[^.]+$/);
  return m ? m[0] : '';
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'AMBTO Carteirinha' }))
    .setMimeType(ContentService.MimeType.JSON);
}
