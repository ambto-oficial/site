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
    titulo: "Naturatins divulga entidades habilitadas para Conselho Gestor da APA Serra do Lajeado",
    data: "2026-07-10",
    resumo: "O Instituto Natureza do Tocantins (Naturatins) divulgou, no Diário Oficial do Estado - edição nº 7.096, de 8 de julho de 2026, a relação final das entidades habilitadas para integrar o Conselho Gestor da <strong>Área de Proteção Ambiental (APA) Serra do Lajeado</strong>, no biênio 2026/2028. A <strong>AMBTO</strong> foi habilitada entre as entidades da sociedade civil. O Conselho reunirá representantes de órgãos públicos e organizações sociais para fortalecer a gestão participativa da unidade de conservação, promovendo ações de preservação ambiental e uso sustentável dos recursos naturais na região.",
    imagem: "assets/images/noticias/apa-serra-lajeado.jpg",
    legenda: "Área de Proteção Ambiental (APA) Serra do Lajeado, no Tocantins - Fonte: Tocantins Rural",
    link: "",
    destaque: true
  },
  {
    titulo: "Ministério Público do Tocantins processa BRK Ambiental por poluição do ar na ETE Norte de Palmas",
    data: "2026-07-10",
    resumo: "O <strong>Ministério Público do Tocantins (MPTO)</strong> ajuizou ação judicial contra a <strong>BRK Ambiental</strong> por emissão de sulfeto de hidrogênio (H₂S) até 10 vezes acima do limite permitido na Estação de Tratamento de Esgoto (ETE) Norte em Palmas. A ação pede R$ 1 milhão de indenização por danos morais coletivos e medidas urgentes.",
    imagem: "assets/images/noticias/etenorte-brk-ambiental.jpg",
    legenda: "Estação de Tratamento de Esgoto (ETE) Norte, em Palmas - Fonte: BRK Ambiental",
    link: "acao-mpto-brk-etenorte-palmas-2026.html",
    destaque: false
  },
  {
    titulo: "Governo publica lei que atualiza o licenciamento ambiental no Tocantins",
    data: "2026-07-03",
    resumo: "O Governo do Tocantins publicou a <strong>Lei nº 5.062/2026</strong>, que moderniza o licenciamento ambiental estadual e o alinha à Lei Federal nº 15.190/2025. A nova norma cria a <strong>Licença Ambiental Única (LAU)</strong>, o <strong>Licenciamento por Adesão e Compromisso (LAC)</strong> e a <strong>Licença de Operação Corretiva (LOC)</strong>, simplifica procedimentos e amplia o campo de atuação dos engenheiros ambientais no Estado.",
    imagem: "assets/images/noticias/licenciamento-ambiental-to.png",
    legenda: "Nova lei moderniza o licenciamento ambiental no Tocantins — Foto: Governo do Tocantins/Naturatins",
    link: "nova-lei-licenciamento-ambiental-tocantins-2026.html",
    destaque: false
  },
  {
    titulo: "AMBTO lança guia técnico sobre o Programa Estadual de Conversão de Multas Ambientais",
    data: "2026-06-30",
    resumo: "A <strong>AMBTO</strong> disponibiliza gratuitamente o Guia Técnico do PCMA — material exclusivo que explica como funciona o Programa Estadual de Conversão de Multas Ambientais, quais os requisitos técnicos, prazos, modalidades e descontos previstos no Decreto nº 7.184/2026. Baixe o PDF e o infográfico.",
    imagem: "assets/images/noticias/guia-ambto-pcma.png",
    legenda: "Guia Técnico do PCMA produzido pela AMBTO",
    link: "guia-tecnico-pcma-ambto.html",
    destaque: false
  },
  {
    titulo: "Com apoio da AMBTO, 2º Fórum Estadual de Regularização Ambiental é realizado em Palmas",
    data: "2026-06-25",
    resumo: "A segunda edição do Fórum Estadual de Regularização Ambiental reuniu profissionais, consultores e representantes do setor produtivo no auditório do Palácio Araguaia, em Palmas. O evento, organizado pelo Naturatins, <strong>AMBTO</strong> e ASCAM-TO, debateu os desdobramentos da 1ª edição e apresentou três novas Instruções Normativas do Naturatins sobre licenciamento e autorizações ambientais.",
    imagem: "assets/images/noticias/2forum-regularizacao-ambiental.jpeg",
    legenda: "2º Fórum Estadual de Regularização Ambiental realizado no Auditório do Palácio Araguaia, em Palmas (TO)",
    link: "forum-regularizacao-ambiental-2ed-2026.html",
    destaque: false
  },
  {
    titulo: "Decreto nº 7.184/2026 institui o PCMA e abre nova frente de atuação para engenheiros ambientais no Tocantins",
    data: "2026-06-29",
    resumo: "O Governo do Tocantins publicou o Decreto nº 7.184/2026, regulamentando a Lei nº 1.325/2002 e instituindo o Programa Estadual de Conversão de Multas Ambientais (PCMA). O mecanismo permite converter multas ambientais simples em bens ou serviços para recuperação ambiental, com descontos de até 60%. A elaboração de projetos na modalidade direta exige responsável técnico com CTF e ART — abrindo importante frente de atuação para o engenheiro ambiental. A <strong>AMBTO</strong> preparou materiais exclusivos sobre o tema.",
    imagem: "assets/images/noticias/decreto-pcma-7184-2026.jpg",
    legenda: "Decreto Estadual nº 7.184/2026 regulamenta a conversão de multas ambientais no Tocantins",
    link: "decreto-pcma-7184-2026.html",
    destaque: false
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
