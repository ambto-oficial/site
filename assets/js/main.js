/* ============================================================
   AMBTO — main.js
   Navbar • Counter • Notícias • Galeria/Lightbox • Formulários
   ============================================================ */

'use strict';

/* ── Configurações globais ─────────────────────────── */

// Número atual de associados (atualizar aqui quando necessário)
const AMBTO_NUM_ASSOCIADOS = 320;

// URLs dos Google Apps Script Web Apps
// Substitua pelas URLs reais após publicar os scripts
const GAS_URLS = {
  associado:   'https://script.google.com/macros/s/AKfycbzGxRXz-zAUeAS6H6BrD3M9Kl7g3XpwxNjpcsvLjHzHvsXBxyXpK2QMHFbVLuLGeyDI/exec',
  carteirinha: 'https://script.google.com/macros/s/AKfycbw7C-xT-hYNrNk1S0PMVCZpVp9IqLvXmTsi6_y5ovgZcKSsNu1DO5BN-NGOnslK5TZVfA/exec',
  contato:     'https://script.google.com/macros/s/AKfycbzfVYofzAQ5hDkW7f-DV5T1v6vWMHF182ZkvMgTWdgLL1W73Yi1-xIQ1xgGfQo7wUyU/exec'
};

// Fotos da galeria
// Para adicionar fotos: inclua um objeto { src, legenda } neste array
const GALERIA_FOTOS = [
  { src: 'assets/images/galeria/feijoada-25anos.jpg',    legenda: 'Feijoada AMBTO 25 Anos - Sede da AEATO (2025)' },
  { src: 'assets/images/galeria/feijoada-25anos2.jpg',    legenda: 'Feijoada AMBTO 25 Anos - Sede da AEATO (2025)' },
  { src: 'assets/images/galeria/semana-academica-uft-2025.jpg',    legenda: 'Semana Acadêmica de Engenharia Ambiental - UFT Câmpus Palmas (2025)' },  
  { src: 'assets/images/galeria/eleicoes-diretoria-2011.jpg',    legenda: 'Eleições da Diretoria - Auditório do CREA/TO (2011)' },
  { src: 'assets/images/galeria/eleicoes-diretoria-2011-2.jpg',    legenda: 'Eleições da Diretoria - Auditório do CREA/TO (2011)' },
  { src: 'assets/images/galeria/eleicoes-diretoria-2011-3.jpg',    legenda: 'Eleições da Diretoria - Auditório do CREA/TO (2011)' },
  { src: 'assets/images/galeria/contagem-eleicoes-diretoria-2011.jpg',    legenda: 'Contagem de votos - Eleições da Diretoria (2011)' },
  { src: 'assets/images/galeria/dia-eng-ambiental2016.jpg',  legenda: 'Dia do Engenheiro Ambiental - Auditório Cuica/UFT Câmpus Palmas (2016)' },
  { src: 'assets/images/galeria/diretoria-soea2015.jpg',      legenda: 'Diretoria da AMBTO participa da 72ª SOEA 2015 (Fortaleza/CE)' },
  { src: 'assets/images/galeria/diretoria-deputado-zeroberto2015.jpg',    legenda: 'Diretoria da AMBTO com Dep. Estadual Zé Roberto (PT/TO) 2015' },
  { src: 'assets/images/galeria/reuniao-seageto-crea2016.jpg',    legenda: 'Reunião entre CREA e Seageto - Auditório do CREA/TO Palmas (2016)' }, 
  { src: 'assets/images/galeria/formacao-saneato2025.jpg',    legenda: 'Reunião de formação da SANEATO (2025)' },  
  ];

/* ── Helpers ───────────────────────────────────────── */

function formatarData(dataStr) {
  const d = new Date(dataStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload  = () => res(reader.result.split(',')[1]);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

/* ── Ano do footer ─────────────────────────────────── */

document.querySelectorAll('#footerYear').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ── NAVBAR ────────────────────────────────────────── */

(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  if (!navbar) return;

  // Scroll: adicionar classe .scrolled
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Toggle mobile
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Fechar ao clicar em link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
})();

/* ── DASHBOARD COUNTER ─────────────────────────────── */

(function initCounters() {
  const statAnos       = document.getElementById('statAnos');
  const statAssociados = document.getElementById('statAssociados');
  const statParceiros  = document.getElementById('statParceiros');
  const statEstado     = document.getElementById('statEstado');

  if (!statAnos) return;

  const anoAtual = new Date().getFullYear();
  const targets  = [
    { el: statAnos,       val: anoAtual - 2000 },
    { el: statAssociados, val: AMBTO_NUM_ASSOCIADOS, suffix: '+' },
    { el: statParceiros,  val: 11 },
    { el: statEstado,     val: 1 }
  ];

  function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const step     = 16;
    const steps    = Math.round(duration / step);
    let   current  = 0;
    const inc      = target / steps;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  // Usar IntersectionObserver para iniciar quando visível
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(t => {
          if (t.el) animateCounter(t.el, t.val, t.suffix || '');
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statAnos);
})();

/* ── NOTÍCIAS ──────────────────────────────────────── */

(function initNoticias() {
  if (typeof AMBTO_NOTICIAS === 'undefined') return;

  // Ordenar por data (mais recente primeiro)
  const sorted = [...AMBTO_NOTICIAS].sort((a, b) => new Date(b.data) - new Date(a.data));

  function criarCard(n) {
    const img = n.imagem
      ? `<img src="${n.imagem}" alt="${n.titulo}" class="noticia-card-img" loading="lazy" />`
      : `<div class="noticia-card-img-placeholder">📰</div>`;

    const link = n.link
      ? `<a href="${n.link}" class="noticia-card-link">Saiba mais</a>`
      : '';

    return `
      <div class="noticia-card">
        ${img}
        <div class="noticia-card-body">
          <div class="noticia-card-date">${formatarData(n.data)}</div>
          <h3>${n.titulo}</h3>
          <p>${n.resumo}</p>
          ${link}
        </div>
      </div>`;
  }

  // Home: 3 mais recentes (resumo truncado + "Leia mais" → noticias.html)
  const homeGrid = document.getElementById('homeNoticias');
  if (homeGrid) {
    homeGrid.innerHTML = sorted.slice(0, 3).map(n => {
      const limit = 160;
      const plain = n.resumo.replace(/<[^>]+>/g, '');
      const resumoCurto = plain.length > limit ? plain.slice(0, limit).replace(/\s+\S*$/, '') + '…' : plain;
      const href = n.link || 'noticias.html';
      const linkLabel = n.link ? 'Saiba mais' : 'Leia mais';
      const img = n.imagem
        ? `<img src="${n.imagem}" alt="${n.titulo}" class="noticia-card-img" loading="lazy" />`
        : `<div class="noticia-card-img-placeholder">📰</div>`;
      return `
        <div class="noticia-card">
          ${img}
          <div class="noticia-card-body">
            <div class="noticia-card-date">${formatarData(n.data)}</div>
            <h3>${n.titulo}</h3>
            <p>${resumoCurto}</p>
            <a href="${href}" class="noticia-card-link">${linkLabel}</a>
          </div>
        </div>`;
    }).join('');
  }

  // Página de notícias
  const noticiasGrid = document.getElementById('noticiasGrid');
  if (!noticiasGrid) return;

  const PER_PAGE    = 6;
  let   currentPage = 1;

  // Destaque
  const destaqueEl = document.getElementById('noticiaDestaque');
  const destaqueItem = sorted.find(n => n.destaque) || sorted[0];
  if (destaqueEl && destaqueItem) {
    const legenda = destaqueItem.legenda
      ? `<p style="font-size:.72rem;color:var(--cinza-claro);margin:.4rem 0 0;line-height:1.4;font-style:italic">${destaqueItem.legenda}</p>`
      : '';
    const img = destaqueItem.imagem
      ? `<div style="margin:1rem 0 .25rem">
           <img src="${destaqueItem.imagem}" alt="${destaqueItem.titulo}" style="width:100%;max-height:380px;object-fit:cover;border-radius:var(--raio)" loading="lazy" />
           ${legenda}
         </div>`
      : '';
    const lnk = destaqueItem.link
      ? `<a href="${destaqueItem.link}" class="btn btn-primary btn-sm" style="margin-top:1rem;align-self:flex-start">Saiba mais</a>` : '';

    destaqueEl.innerHTML = `
      <div style="background:var(--branco);border-radius:var(--raio-lg);padding:2rem 2.5rem 2.5rem;box-shadow:var(--sombra);display:flex;flex-direction:column">
        <span style="font-size:.75rem;font-weight:700;font-family:var(--fonte-heading);text-transform:uppercase;letter-spacing:.1em;color:var(--verde-folha);margin-bottom:.4rem">⭐ Destaque</span>
        <div style="font-size:.82rem;color:var(--cinza-claro);margin-bottom:.5rem">${formatarData(destaqueItem.data)}</div>
        <h2 style="font-size:1.4rem;margin-bottom:0">${destaqueItem.titulo}</h2>
        ${img}
        <p style="color:var(--cinza-medio);margin-top:.75rem;text-align:justify">${destaqueItem.resumo}</p>
        ${lnk}
      </div>`;
  }

  // Grid paginado (excluindo destaque)
  const semDestaque = sorted.filter(n => n !== destaqueItem);

  function renderPage() {
    const slice = semDestaque.slice(0, currentPage * PER_PAGE);
    noticiasGrid.innerHTML = slice.map(criarCard).join('');

    const verMais = document.getElementById('noticiasVerMais');
    if (verMais) {
      verMais.style.display = slice.length < semDestaque.length ? 'block' : 'none';
    }
  }

  renderPage();

  const btnVerMais = document.getElementById('btnVerMais');
  if (btnVerMais) {
    btnVerMais.addEventListener('click', () => {
      currentPage++;
      renderPage();
    });
  }
})();

/* ── GALERIA ───────────────────────────────────────── */

(function initGaleria() {
  const grid = document.getElementById('galeriaGrid');
  const msg  = document.getElementById('galeriaMensagem');
  if (!grid) return;

  if (!GALERIA_FOTOS || GALERIA_FOTOS.length === 0) {
    grid.style.display = 'none';
    if (msg) msg.style.display = 'block';
    return;
  }

  grid.innerHTML = GALERIA_FOTOS.map((f, i) => `
    <div class="galeria-item" data-index="${i}" tabindex="0" role="button" aria-label="${f.legenda || 'Foto ' + (i+1)}">
      <img src="${f.src}" alt="${f.legenda || ''}" loading="lazy" />
      <div class="galeria-overlay">
        <span class="galeria-legenda">${f.legenda || ''}</span>
      </div>
    </div>`).join('');

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCaption');
  const lbClose  = document.getElementById('lightboxClose');
  const lbPrev   = document.getElementById('lightboxPrev');
  const lbNext   = document.getElementById('lightboxNext');
  if (!lightbox) return;

  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    const foto = GALERIA_FOTOS[idx];
    lbImg.src        = foto.src;
    lbImg.alt        = foto.legenda || '';
    lbCap.textContent = foto.legenda || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + GALERIA_FOTOS.length) % GALERIA_FOTOS.length;
    openLightbox(currentIdx);
  }

  grid.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click',   () => openLightbox(+item.dataset.index));
    item.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(+item.dataset.index); });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(+1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(+1);
  });
})();

/* ── ACCORDION (regulamento) ───────────────────────── */

document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const id   = btn.dataset.acc;
    const body = document.getElementById(id);
    if (!body) return;

    const isOpen = body.classList.contains('open');
    // Fechar todos
    document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('open'));
    // Abrir o clicado (se estava fechado)
    if (!isOpen) {
      body.classList.add('open');
      btn.classList.add('open');
    }
  });
});

/* ── FORM HELPERS ──────────────────────────────────── */

function maskCPF(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    input.value = v;
  });
}

document.querySelectorAll('#cpf, #cCpf').forEach(maskCPF);

// Upload: mostrar nome do arquivo
function setupUploadLabel(inputId, labelId) {
  const inp = document.getElementById(inputId);
  const lbl = document.getElementById(labelId);
  if (!inp || !lbl) return;
  inp.addEventListener('change', () => {
    lbl.textContent = inp.files[0] ? inp.files[0].name : '';
    lbl.style.display = inp.files[0] ? 'block' : 'none';
  });
}
setupUploadLabel('cFoto',        'fotoNome');
setupUploadLabel('cComprovante', 'compNome');

/* ── FORMULÁRIO: Quero ser associado ────────────────── */

const formAssociado = document.getElementById('formAssociado');
if (formAssociado) {
  formAssociado.addEventListener('submit', async e => {
    e.preventDefault();
    const btn      = document.getElementById('btnAssociado');
    const feedback = document.getElementById('feedbackAssociado');
    const fd       = new FormData(formAssociado);

    if (!formAssociado.checkValidity()) {
      formAssociado.reportValidity();
      return;
    }

    btn.classList.add('btn-loading');
    btn.disabled = true;

    const payload = {
      tipo:       'associado',
      nome:       fd.get('nome'),
      dataNasc:   fd.get('dataNasc'),
      atuacao:    fd.get('atuacao'),
      cpf:        fd.get('cpf'),
      telefone:   fd.get('telefone'),
      email:      fd.get('email'),
      endereco:   fd.get('endereco'),
      cidade:     fd.get('cidade'),
      registro:   fd.get('registro') || '',
      declaracao: fd.get('declaracao') ? 'Sim' : 'Não'
    };

    try {
      await fetch(GAS_URLS.associado, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      feedback.className  = 'form-feedback success';
      feedback.textContent = '✅ Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.';
      formAssociado.reset();
    } catch {
      feedback.className  = 'form-feedback error';
      feedback.textContent = '❌ Erro ao enviar. Tente novamente ou entre em contato por e-mail.';
    } finally {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ── FORMULÁRIO: Solicitar Carteirinha ─────────────── */

const formCarteirinha = document.getElementById('formCarteirinha');
if (formCarteirinha) {
  formCarteirinha.addEventListener('submit', async e => {
    e.preventDefault();
    const btn      = document.getElementById('btnCarteirinha');
    const feedback = document.getElementById('feedbackCarteirinha');
    const fd       = new FormData(formCarteirinha);

    if (!formCarteirinha.checkValidity()) {
      formCarteirinha.reportValidity();
      return;
    }

    btn.classList.add('btn-loading');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Converter arquivos para base64
    let fotoB64 = '', compB64 = '', fotoNm = '', compNm = '';
    const fotoFile = document.getElementById('cFoto')?.files[0];
    const compFile = document.getElementById('cComprovante')?.files[0];

    if (fotoFile) {
      fotoB64 = await fileToBase64(fotoFile).catch(() => '');
      fotoNm  = fotoFile.name;
    }
    if (compFile) {
      compB64 = await fileToBase64(compFile).catch(() => '');
      compNm  = compFile.name;
    }

    const payload = {
      tipo:       'carteirinha',
      nome:       fd.get('nome'),
      cpf:        fd.get('cpf'),
      dataNasc:   fd.get('dataNasc'),
      registro:   fd.get('registro'),
      email:      fd.get('email'),
      telefone:   fd.get('telefone'),
      declaracao: fd.get('declaracao') ? 'Sim' : 'Não',
      foto:       fotoB64,
      fotoNome:   fotoNm,
      comprovante: compB64,
      comprovanteNome: compNm
    };

    try {
      await fetch(GAS_URLS.carteirinha, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      feedback.className  = 'form-feedback success';
      feedback.textContent = '✅ Solicitação enviada com sucesso! Sua carteirinha será confeccionada e entregue em até 15 dias úteis.';
      formCarteirinha.reset();
      document.getElementById('fotoNome').style.display = 'none';
      document.getElementById('compNome').style.display = 'none';
    } catch {
      feedback.className  = 'form-feedback error';
      feedback.textContent = '❌ Erro ao enviar. Tente novamente ou entre em contato por e-mail.';
    } finally {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
      btn.textContent = 'Solicitar minha Carteirinha +AMBTO';
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ── FORMULÁRIO: Contato ───────────────────────────── */

const formContato = document.getElementById('formContato');
if (formContato) {
  formContato.addEventListener('submit', async e => {
    e.preventDefault();
    const btn      = document.getElementById('btnContato');
    const feedback = document.getElementById('feedbackContato');
    const fd       = new FormData(formContato);

    if (!formContato.checkValidity()) {
      formContato.reportValidity();
      return;
    }

    btn.classList.add('btn-loading');
    btn.disabled = true;

    const payload = {
      tipo:      'contato',
      nome:      fd.get('nome'),
      whatsapp:  fd.get('whatsapp'),
      associado: fd.get('associado') || 'Não informado',
      mensagem:  fd.get('mensagem')
    };

    try {
      await fetch(GAS_URLS.contato, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      feedback.className  = 'form-feedback success';
      feedback.textContent = '✅ Mensagem enviada com sucesso! Responderemos em breve.';
      formContato.reset();
    } catch {
      feedback.className  = 'form-feedback error';
      feedback.textContent = '❌ Erro ao enviar. Tente novamente ou entre em contato pelo Instagram.';
    } finally {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
