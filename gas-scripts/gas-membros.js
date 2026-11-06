/**
 * AMBTO — Google Apps Script: Área do Associado (acesso à pasta do Drive)
 * ============================================================
 * Fluxo:
 *   1. O associado informa CPF + data de nascimento no site.
 *   2. O script confere na planilha de Associados e exige Status = "Ativo".
 *   3. Se confere, o e-mail Google CADASTRADO NA PLANILHA (nunca um e-mail
 *      digitado no site) é adicionado como "Leitor" da pasta do Drive.
 *   4. Uma rotina diária remove da pasta quem deixou de estar "Ativo".
 *
 * A planilha nunca é exposta ao navegador: o site só recebe
 * { status: 'ok' | 'inativo' | 'invalido' | 'bloqueado' | 'error' }.
 *
 * ------------------------------------------------------------
 * INSTRUÇÕES DE CONFIGURAÇÃO (fazer logado na conta Google da AMBTO,
 * a mesma que é dona da pasta e que enxerga a planilha de Associados):
 *
 * 1. Acesse script.google.com → Novo projeto → nome: "AMBTO - Área do Associado"
 * 2. Cole este código completo (substitui o Código.gs)
 * 3. Confira as constantes abaixo (IDs já preenchidos)
 * 4. No menu de funções, execute UMA VEZ a função  configurarPasta
 *    → autorize as permissões quando o Google pedir
 *    → ela torna a pasta PRIVADA (remove o "qualquer pessoa com o link")
 * 5. Execute UMA VEZ a função  criarGatilhoDiario
 *    → agenda a limpeza diária de quem ficou inativo
 * 6. Implantar → Nova implantação → tipo "App da Web"
 *      Executar como: Eu (conta da AMBTO)
 *      Quem tem acesso: Qualquer pessoa
 * 7. Copie a URL gerada e cole em assets/js/main.js → GAS_URLS.membros
 *
 * IMPORTANTE: a cada alteração neste código, é preciso criar uma
 * NOVA VERSÃO da implantação (Implantar → Gerenciar implantações → editar).
 * ------------------------------------------------------------
 *
 * COLUNAS DA PLANILHA: o script localiza as colunas pelo texto do cabeçalho
 * (qualquer posição). Precisam existir cabeçalhos contendo:
 *   "CPF"  |  "Nasc" (ex.: Data Nasc.)  |  "mail" (ex.: E-mail)  |  "Status"
 * Se houver mais de uma coluna com "mail", vale a primeira.
 * Dica: deixe a coluna CPF com formato "Texto simples" para não perder zeros.
 */

const SHEET_ID_ASSOCIADOS = '1qg8r8V2UGsHan6cXAE7fElfc3DmEmIkv9wTCLj3hr2Y';
const DRIVE_FOLDER_ID     = '1MN2Fy9KhFWvllOQjVO2ClF3d283IwgFd';

// Nome da aba com os associados. Deixe '' para usar a primeira aba.
const ABA_ASSOCIADOS = '';

// Valores de Status que liberam o acesso (comparação sem acento/maiúscula)
const STATUS_ATIVO = ['ativo', 'ativa'];

// Proteção contra tentativa e erro: máx. de tentativas FALHAS por CPF por hora
const MAX_TENTATIVAS = 5;

const ABA_LOG = 'Log de Acessos';

/* ── Endpoint ─────────────────────────────────────────── */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    return json_(verificarAcesso_(data.cpf, data.dataNasc));
  } catch (err) {
    registrarLog_('', 'erro: ' + err);
    return json_({ status: 'error' });
  }
}

function doGet() {
  return json_({ status: 'ok', service: 'AMBTO Área do Associado' });
}

/* ── Lógica principal ─────────────────────────────────── */

function verificarAcesso_(cpfBruto, nascBruto) {
  const cpf  = String(cpfBruto || '').replace(/\D/g, '');
  const nasc = normalizarData_(nascBruto);

  if (cpf.length !== 11 || !nasc) {
    return { status: 'invalido' };
  }

  const chaveTent = 'tent_' + hash_(cpf);
  const cache = CacheService.getScriptCache();
  if (Number(cache.get(chaveTent) || 0) >= MAX_TENTATIVAS) {
    registrarLog_(cpf, 'bloqueado');
    return { status: 'bloqueado' };
  }

  const reg = buscarAssociado_(cpf, nasc);

  if (!reg) {
    contarFalha_(cache, chaveTent);
    registrarLog_(cpf, 'dados nao conferem');
    return { status: 'invalido' };
  }

  if (!STATUS_ATIVO.includes(normalizarTexto_(reg.status))) {
    registrarLog_(cpf, 'cadastro nao ativo (' + reg.status + ')');
    return { status: 'inativo' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.email)) {
    registrarLog_(cpf, 'e-mail ausente/invalido na planilha');
    return { status: 'error' };
  }

  try {
    liberarPasta_(reg.email);
  } catch (err) {
    registrarLog_(cpf, 'falha ao compartilhar: ' + err);
    return { status: 'error' };
  }

  cache.remove(chaveTent);
  registrarLog_(cpf, 'acesso liberado');
  return {
    status: 'ok',
    emailMascarado: mascararEmail_(reg.email),
    pastaUrl: 'https://drive.google.com/drive/folders/' + DRIVE_FOLDER_ID
  };
}

function buscarAssociado_(cpf, nasc) {
  const sheet = abrirAba_();
  const valores = sheet.getDataRange().getDisplayValues();
  if (valores.length < 2) return null;

  const col = localizarColunas_(valores[0]);

  for (let i = 1; i < valores.length; i++) {
    const linha = valores[i];
    const cpfLinha = String(linha[col.cpf]).replace(/\D/g, '').padStart(11, '0');
    if (cpfLinha !== cpf) continue;
    if (normalizarData_(linha[col.nasc]) !== nasc) continue;
    return {
      email:  String(linha[col.email]).trim().toLowerCase(),
      status: String(linha[col.status])
    };
  }
  return null;
}

function liberarPasta_(email) {
  const pasta = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const jaTem = pasta.getViewers().concat(pasta.getEditors())
    .some(u => u.getEmail().toLowerCase() === email);
  if (!jaTem) pasta.addViewer(email);
}

/* ── Rotinas de manutenção (rodar manualmente / por gatilho) ── */

/** Executar UMA VEZ: deixa a pasta privada (só entra quem for compartilhado). */
function configurarPasta() {
  const pasta = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  pasta.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
  Logger.log('Pasta "%s" agora é privada.', pasta.getName());
}

/** Executar UMA VEZ: agenda sincronizarAcessos() todo dia entre 3h e 4h. */
function criarGatilhoDiario() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'sincronizarAcessos')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sincronizarAcessos').timeBased().everyDays(1).atHour(3).create();
}

/**
 * Remove da pasta os "Leitores" que não constam como Ativos na planilha.
 * Não mexe no dono nem em Editores (diretoria/administração).
 */
function sincronizarAcessos() {
  const valores = abrirAba_().getDataRange().getDisplayValues();
  const col = localizarColunas_(valores[0]);

  const ativos = new Set();
  for (let i = 1; i < valores.length; i++) {
    if (STATUS_ATIVO.includes(normalizarTexto_(valores[i][col.status]))) {
      ativos.add(String(valores[i][col.email]).trim().toLowerCase());
    }
  }

  const pasta = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  pasta.getViewers().forEach(u => {
    const email = u.getEmail().toLowerCase();
    if (!ativos.has(email)) {
      pasta.removeViewer(email);
      registrarLog_('', 'acesso removido: ' + mascararEmail_(email));
    }
  });
}

/* ── Utilitários ──────────────────────────────────────── */

function abrirAba_() {
  const ss = SpreadsheetApp.openById(SHEET_ID_ASSOCIADOS);
  return (ABA_ASSOCIADOS && ss.getSheetByName(ABA_ASSOCIADOS)) || ss.getSheets()[0];
}

function localizarColunas_(cabecalho) {
  const heads = cabecalho.map(normalizarTexto_);
  const achar = trecho => heads.findIndex(h => h.includes(trecho));
  const col = { cpf: achar('cpf'), nasc: achar('nasc'), email: achar('mail'), status: achar('status') };
  Object.keys(col).forEach(k => {
    if (col[k] < 0) throw new Error('Coluna não encontrada na planilha: ' + k);
  });
  return col;
}

/** Aceita 'yyyy-mm-dd' (site) ou 'dd/mm/yyyy' (planilha); devolve 'yyyy-mm-dd' ou ''. */
function normalizarData_(v) {
  const s = String(v || '').trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[1] + '-' + m[2] + '-' + m[3];
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0');
  return '';
}

function normalizarTexto_(v) {
  return String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function mascararEmail_(email) {
  const [user, dominio] = email.split('@');
  return user.slice(0, 2) + '***@' + dominio;
}

function hash_(txt) {
  return Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, txt)
  ).slice(0, 22);
}

function contarFalha_(cache, chave) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    cache.put(chave, String(Number(cache.get(chave) || 0) + 1), 3600);
  } finally {
    lock.releaseLock();
  }
}

/** Log sem CPF completo (apenas os 6 dígitos do meio, mascarados). */
function registrarLog_(cpf, resultado) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID_ASSOCIADOS);
    let aba = ss.getSheetByName(ABA_LOG);
    if (!aba) {
      aba = ss.insertSheet(ABA_LOG);
      aba.appendRow(['Data/Hora', 'CPF (mascarado)', 'Resultado']);
      aba.getRange(1, 1, 1, 3).setFontWeight('bold');
    }
    const cpfMasc = cpf ? '***.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-**' : '';
    aba.appendRow([new Date().toLocaleString('pt-BR'), cpfMasc, resultado]);
  } catch (e) { /* o log nunca pode derrubar o login */ }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
