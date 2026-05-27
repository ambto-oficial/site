/**
 * AMBTO — Banco de Notícias
 * ============================================================
 * Para publicar uma nova notícia, adicione um objeto ao TOPO
 * deste array. O site renderizará automaticamente os cards,
 * do mais recente para o mais antigo.
 *
 * Campos:
 *   titulo   : string  — Título da notícia
 *   data     : string  — Formato AAAA-MM-DD (ex: "2026-05-01")
 *   resumo   : string  — Texto breve para o card
 *   imagem   : string  — Caminho da imagem (ou "" para placeholder)
 *   link     : string  — URL completa se notícia tiver página própria; caso contrário ""
 *   destaque : boolean — true = notícia em destaque no topo da página
 */

const AMBTO_NOTICIAS = [
  {
    titulo: "AMBTO completa 25 anos com lançamento do Programa +AMBTO",
    data: "2025-05-31",
    resumo: "No dia 31 de maio de 2025, a Associação dos Engenheiros Ambientais do Estado do Tocantins completou 25 anos de história com o lançamento oficial do Programa de Benefícios +AMBTO, reunindo 11 parceiros.",
    imagem: "",
    link: "",
    destaque: true
  },
  {
    titulo: "Novos parceiros no Programa +AMBTO",
    data: "2025-06-10",
    resumo: "O Programa +AMBTO conta agora com 11 estabelecimentos conveniados em Palmas, abrangendo categorias como alimentação, saúde, educação, automotivo, marketing digital e finanças.",
    imagem: "",
    link: "programa.html",
    destaque: false
  },
  {
    titulo: "AMBTO convoca associados para assembleia geral",
    data: "2025-04-15",
    resumo: "A AMBTO convoca todos os associados para a Assembleia Geral Ordinária a ser realizada em Palmas. Pauta inclui prestação de contas e eleição de nova diretoria.",
    imagem: "",
    link: "",
    destaque: false
  }
];
