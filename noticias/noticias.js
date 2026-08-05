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
    titulo: "Com R$ 56 milhões do Fundo Amazônia, contrato firmado entre o Governo do Tocantins e o BNDES promete agilizar a análise no CAR e aprimorar o monitoramento por satélite no Estado",
    data: "2026-08-05",
    resumo: "O Estado do Tocantins assinou <strong>Contrato de Colaboração Financeira Não Reembolsável</strong> com o <strong>BNDES</strong>, captando mais de <strong>R$ 56 milhões</strong> do <strong>Fundo Amazônia</strong> para o <strong>Projeto de Fortalecimento da Gestão Ambiental (SustenTO)</strong>. Os recursos finançarão modernização do <strong>CAR</strong>, criação do <strong>Cigma</strong> (Centro de Inteligência Geográfica), monitoramento por satélite e equipamentos para brigadas do <strong>Naturatins</strong> no combate a incêndios florestais.",
    imagem: "assets/images/noticias/fundo-amazonia-bndes-governodotocantins-recursos.png",
    legenda: "",
    link: "noticias/tocantins-sustenTO-fundo-amazonia-56-milhoes-2026.html",
    destaque: true
  },
  {
    titulo: "845 mil proprietários rurais são notificados pelo Ministério da Gestão e da Inovação em Serviços Públicos para realizarem a validação das informações do Cadastro Ambiental Rural",
    data: "2026-08-04",
    resumo: "O Ministério da Gestão e da Inovação em Serviços Públicos (<strong>MGI</strong>) enviou <strong>mais de 845 mil notificações</strong> a proprietários rurais para completar a validação do <strong>Cadastro Ambiental Rural (CAR)</strong>, com aproximadamente 500 mil precisando apenas confirmar concordância com as análises já realizadas. A conclusão é essencial para regularização ambiental e acesso a crédito agrícola.",
    imagem: "assets/images/noticias/validacao-car-mgi-notificacoes.png",
    legenda: "CAR em validação — MGI envia notificações para proprietários rurais",
    link: "noticias/mgi-validacao-car-cadastro-ambiental-rural-2026.html",
    destaque: false
  },
  {
    titulo: "IBAMA cria Sistema Prisma para consulta de indicadores ambientais de imóveis rurais",
    data: "2026-08-04",
    resumo: "O <strong>IBAMA</strong> instituiu, pela <strong>Portaria nº 151/2026</strong>, o <strong>Sistema Prisma</strong>, plataforma que consolida e cruza dados do <strong>Cadastro Ambiental Rural (CAR)</strong> com outras bases públicas para apoiar a análise de indicadores de integridade e conformidade ambiental de imóveis rurais em todo o país.",
    imagem: "assets/images/noticias/ibama-sistema-prisma-2026.png",
    legenda: "Sistema Prisma, do IBAMA — consulta de indicadores de integridade ambiental de imóveis rurais",
    link: "noticias/ibama-sistema-prisma-2026.html",
    destaque: false
  },
  {
    titulo: "Audiência pública em Araguaína abre a elaboração do Plano de Manejo da APA das Nascentes",
    data: "2026-07-31",
    resumo: "A primeira audiência pública do <strong>Plano de Manejo da APA das Nascentes de Araguaína</strong> acontece em <strong>11 de agosto</strong>, às 8h, no auditório do Sebrae. Fruto de convênio entre <strong>Naturatins</strong>, Prefeitura de Araguaína e <strong>IAC/UFT</strong>, o processo prevê 480 dias de trabalho, três rodadas de audiências e oficinas comunitárias nos três municípios da unidade. Acesse o Plano de Trabalho e o Plano de Comunicação e conheça o site exclusivo do projeto.",
    imagem: "assets/images/noticias/apa-nascentes-araguaina-plano-manejo.jpg",
    legenda: "APA das Nascentes de Araguaína, em área de transição entre o Cerrado e a Amazônia — Foto: Benilson Sousa/Governo do Tocantins",
    link: "noticias/apa-nascentes-araguaina-plano-manejo-audiencia.html",
    destaque: false
  },
  {
    titulo: "Justiça determina recuperação de mais de 600 hectares de Cerrado desmatados irregularmente em Palmas",
    data: "2026-07-29",
    resumo: "Decisão judicial, em Ação Civil Pública movida pelo <strong>Ministério Público do Tocantins (MPTO)</strong>, condena proprietário rural a recuperar integralmente mais de <strong>600 hectares</strong> de Cerrado desmatados irregularmente na região de Palmas e a indenizar em 674 salários mínimos. O caso reforça que a compensação de Reserva Legal não pode viabilizar novos desmatamentos após o marco temporal do Código Florestal.",
    imagem: "assets/images/noticias/fazenda-desmatada-palmas-600ha.jpg",
    legenda: "Área de Cerrado desmatada irregularmente em propriedade rural de Palmas (TO)",
    link: "noticias/justica-recuperacao-600ha-cerrado-palmas.html",
    destaque: false
  },
  {
    titulo: "Palmas regulamenta Programa Bolsa Catador com incentivo de R$ 1 mil mensal",
    data: "2026-07-25",
    resumo: "A Prefeitura de Palmas publicou o <strong>Decreto nº 2.960/2026</strong>, regulamentando o <strong>Programa Bolsa Catador</strong> e abrindo caminho para seleção de até 70 catadores de materiais recicláveis. O incentivo mensal é de <strong>R$ 1.000,00</strong>, pago via cartão corporativo, destinado a profissionais em situação de vulnerabilidade social.",
    imagem: "assets/images/noticias/programa-bolsa-catador-palmas.jpg",
    legenda: "Programa Bolsa Catador — Palmas (TO)",
    link: "noticias/palmas-regulamenta-programa-bolsa-catador.html",
    destaque: false
  },
  {
    titulo: "Tocantins lidera em barragens no Norte, mas fiscalização opera com 5 de 20 técnicos recomendados",
    data: "2026-07-18",
    resumo: "O <strong>Relatório de Segurança de Barragens 2026</strong>, da ANA, revela que o Tocantins concentra 1.195 barragens cadastradas no <strong>SNISB</strong> — cerca de 39% de toda a Região Norte — mas o Naturatins conta com apenas 5 técnicos em dedicação exclusiva, quando o recomendado para esse volume é de 20.",
    imagem: "assets/images/noticias/barragens-naturatins-2026.jpeg",
    legenda: "Barragem no Tocantins — estado lidera o número de barragens cadastradas na Região Norte",
    link: "noticias/naturatins-barragens-risco-plano-inspeccoes-2026.html",
    destaque: false
  },
  {
    titulo: "Amazônia reduz desmatamento para menor nível em uma década, mas Tocantins segue como segundo maior deforestador do Cerrado no 1º semestre",
    data: "2026-07-18",
    resumo: "A Amazônia registrou a menor área com sinais de desmatamento detectados por satélite em uma década no primeiro semestre de 2026, com redução de 38% ante 2025, segundo o <strong>Inpe/Deter</strong>. Porém, o contraste se evidencia em biomas regionais: Tocantins concentra a segunda maior área sob alerta de desmatamento no Cerrado no mesmo período, com 825 km², atrás apenas de Maranhão.",
    imagem: "assets/images/noticias/area-desmatada-de-cerrado-no-tocantins.jpg",
    legenda: "Desmatamento no Cerrado: Tocantins registra alertas proporcionais durante o primeiro semestre de 2026 — Fonte: Inpe/Deter",
    link: "noticias/desmatamento-amazonia-cerrado-tocantins-1s-2026.html",
    destaque: false
  },
  {
    titulo: "Naturatins divulga entidades habilitadas para Conselho Gestor da APA Serra do Lajeado",
    data: "2026-07-10",
    resumo: "O Instituto Natureza do Tocantins (Naturatins) divulgou, no Diário Oficial do Estado, a relação final das entidades habilitadas para integrar o Conselho Gestor da <strong>Área de Proteção Ambiental (APA) Serra do Lajeado</strong>, no biênio 2026/2028. A <strong>AMBTO</strong> foi habilitada entre as entidades da sociedade civil. O conselho reunirá representantes de órgãos públicos e organizações sociais para fortalecer a gestão participativa da unidade de conservação, promovendo ações de preservação ambiental e uso sustentável dos recursos naturais na região.",
    imagem: "assets/images/noticias/apa-serra-lajeado.jpg",
    legenda: "Área de Proteção Ambiental (APA) Serra do Lajeado, no Tocantins",
    link: "",
    destaque: false
  },
  {
    titulo: "Ministério Público do Tocantins processa BRK Ambiental por poluição do ar na ETE Norte de Palmas",
    data: "2026-07-10",
    resumo: "O <strong>Ministério Público do Tocantins (MPTO)</strong> ajuizou ação judicial contra a <strong>BRK Ambiental</strong> por emissão de sulfeto de hidrogênio (H₂S) até 10 vezes acima do limite permitido na Estação de Tratamento de Esgoto (ETE) Norte em Palmas. A ação pede R$ 1 milhão de indenização por danos morais coletivos e medidas urgentes.",
    imagem: "assets/images/noticias/etenorte-brk-ambiental.jpg",
    legenda: "Estação de Tratamento de Esgoto (ETE) Norte, em Palmas - Fonte: BRK Ambiental",
    link: "noticias/acao-mpto-brk-etenorte-palmas-2026.html",
    destaque: false
  },
  {
    titulo: "Governo publica lei que atualiza o licenciamento ambiental no Tocantins",
    data: "2026-07-03",
    resumo: "O Governo do Tocantins publicou a <strong>Lei nº 5.062/2026</strong>, que moderniza o licenciamento ambiental estadual e o alinha à Lei Federal nº 15.190/2025. A nova norma cria a <strong>Licença Ambiental Única (LAU)</strong>, o <strong>Licenciamento por Adesão e Compromisso (LAC)</strong> e a <strong>Licença de Operação Corretiva (LOC)</strong>, simplifica procedimentos e amplia o campo de atuação dos engenheiros ambientais no Estado.",
    imagem: "assets/images/noticias/licenciamento-ambiental-to.png",
    legenda: "Nova lei moderniza o licenciamento ambiental no Tocantins — Foto: Governo do Tocantins/Naturatins",
    link: "noticias/nova-lei-licenciamento-ambiental-tocantins-2026.html",
    destaque: false
  },
  {
    titulo: "AMBTO lança guia técnico sobre o Programa Estadual de Conversão de Multas Ambientais",
    data: "2026-06-30",
    resumo: "A <strong>AMBTO</strong> disponibiliza gratuitamente o Guia Técnico do PCMA — material exclusivo que explica como funciona o Programa Estadual de Conversão de Multas Ambientais, quais os requisitos técnicos, prazos, modalidades e descontos previstos no Decreto nº 7.184/2026. Baixe o PDF e o infográfico.",
    imagem: "assets/images/noticias/guia-ambto-pcma.png",
    legenda: "Guia Técnico do PCMA produzido pela AMBTO",
    link: "noticias/guia-tecnico-pcma-ambto.html",
    destaque: false
  },
  {
    titulo: "Com apoio da AMBTO, 2º Fórum Estadual de Regularização Ambiental é realizado em Palmas",
    data: "2026-06-25",
    resumo: "A segunda edição do Fórum Estadual de Regularização Ambiental reuniu profissionais, consultores e representantes do setor produtivo no auditório do Palácio Araguaia, em Palmas. O evento, organizado pelo Naturatins, <strong>AMBTO</strong> e ASCAM-TO, debateu os desdobramentos da 1ª edição e apresentou três novas Instruções Normativas do Naturatins sobre licenciamento e autorizações ambientais.",
    imagem: "assets/images/noticias/2forum-regularizacao-ambiental.jpeg",
    legenda: "2º Fórum Estadual de Regularização Ambiental realizado no Auditório do Palácio Araguaia, em Palmas (TO)",
    link: "noticias/forum-regularizacao-ambiental-2ed-2026.html",
    destaque: false
  },
  {
    titulo: "Decreto nº 7.184/2026 institui o PCMA e abre nova frente de atuação para engenheiros ambientais no Tocantins",
    data: "2026-06-29",
    resumo: "O Governo do Tocantins publicou o Decreto nº 7.184/2026, regulamentando a Lei nº 1.325/2002 e instituindo o Programa Estadual de Conversão de Multas Ambientais (PCMA). O mecanismo permite converter multas ambientais simples em bens ou serviços para recuperação ambiental, com descontos de até 60%. A elaboração de projetos na modalidade direta exige responsável técnico com CTF e ART — abrindo importante frente de atuação para o engenheiro ambiental. A <strong>AMBTO</strong> preparou materiais exclusivos sobre o tema.",
    imagem: "assets/images/noticias/decreto-pcma-7184-2026.jpg",
    legenda: "Decreto Estadual nº 7.184/2026 regulamenta a conversão de multas ambientais no Tocantins",
    link: "noticias/decreto-pcma-7184-2026.html",
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
