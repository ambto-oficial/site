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
 *   legenda  : string  — Legenda da foto exibida no destaque (opcional)
 *   link     : string  — URL completa se notícia tiver página própria; caso contrário ""
 *   destaque : boolean — true = notícia em destaque no topo da página
 */

const AMBTO_NOTICIAS = [
  {
    titulo: "Decreto nº 7.184/2026 institui o PCMA e abre nova frente de atuação para engenheiros ambientais no Tocantins",
    data: "2026-06-29",
    resumo: "O Governo do Tocantins publicou o Decreto nº 7.184/2026, regulamentando a Lei nº 1.325/2002 e instituindo o Programa Estadual de Conversão de Multas Ambientais (PCMA). O mecanismo permite converter multas ambientais simples em bens ou serviços para recuperação ambiental, com descontos de até 60%. A elaboração de projetos na modalidade direta exige responsável técnico com CTF e ART — abrindo importante frente de atuação para o engenheiro ambiental. A <strong>AMBTO</strong> preparou materiais exclusivos sobre o tema.",
    imagem: "assets/images/noticias/decreto-pcma-7184-2026.jpg",
    legenda: "Decreto Estadual nº 7.184/2026 regulamenta a conversão de multas ambientais no Tocantins",
    link: "decreto-pcma-7184-2026.html",
    destaque: true
  },
  {
    titulo: "AMBTO e ASCAM articulam realização da segunda edição do Fórum de Regularização Ambiental junto ao Governo do Estado",
    data: "2026-05-27",
    resumo: "A <strong>AMBTO</strong>, juntamente com a ASCAM - Associação dos Consultores Ambientais do Tocantins, está articulando junto ao Governo do Estado a realização da segunda edição do Fórum Estadual de Regularização Ambiental. O intuito da <strong>AMBTO</strong> é promover o alinhamento e a atualização técnica entre profissionais e as instituições responsáveis pela gestão ambiental do Estado, especialmente o Naturatins, diante de um cenário de constantes atualizações normativas, procedimentais e operacionais que vêm sendo implementadas, assim como promover o debate técnico regional frente às diversas discussões nacionais relacionadas às mudanças no licenciamento ambiental. A primeira edição do evento foi considerada um sucesso de público. Embora o Naturatins já tenha sinalizado interesse em colaborar com sua realização, o evento ainda não tem data definida para acontecer.",
    imagem: "assets/images/noticias/forum-regularizacao-ambiental-1ed.jpg",
    legenda: "Registro da primeira edição do evento realizado no Auditório do Palácio Araguaia em 4 de abril de 2025 - Foto: Aldemar Ribeiro/Governo do Tocantins",
    link: "",
    destaque: false
  },
  {
    titulo: "AMBTO completa 25 anos com lançamento do Programa +AMBTO",
    data: "2025-05-31",
    resumo: "No dia 31 de maio de 2025, a Associação dos Engenheiros Ambientais do Estado do Tocantins completou 25 anos de história, promovendo uma feijoada para reunir associados, amigos e demais convidados para celebrar a data. O evento foi realizado na sede da AEATO - Associação dos Engenheiros Agrônomos do Tocantins e reuniu cerca de 170 pessoas, entre associados, familiares e amigos. Durante o evento, o presidente Tiago Sodré também anunciou o lançamento oficial do Programa de Benefícios +AMBTO, que visa conceder benefícios exclusivos para os associados adimplentes nos mais diversos segmentos, reunindo 11 parceiros.",
    imagem: "assets/images/noticias/destaque-25anos-ambto.jpg",
    link: "",
    destaque: false
  },
  {
    titulo: "Novos parceiros no Programa +AMBTO",
    data: "2025-06-02",
    resumo: "O Programa +AMBTO conta agora com 11 estabelecimentos conveniados em Palmas, abrangendo categorias como alimentação, saúde, educação, automotivo, marketing digital e finanças.",
    imagem: "assets/images/noticias/destaque-programa-ambto.jpg",
    link: "programa.html",
    destaque: false
  },
];
