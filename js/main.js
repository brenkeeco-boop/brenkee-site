// ==========================================================
// BRENKEE — Interações (Etapa 4)
// Menu mobile, links de WhatsApp, e modal de "Solicitar orçamento".
// ==========================================================

(function () {
  'use strict';

  // -----------------------------------------------------------
  // Configuração
  // -----------------------------------------------------------
  var WHATSAPP_NUMERO = '5561999350668'; // +55 61 99935-0668, formato internacional para wa.me

  function abrirWhatsApp(mensagem) {
    var url = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(mensagem);
    window.open(url, '_blank', 'noopener');
  }

  // -----------------------------------------------------------
  // Ano atual no footer
  // -----------------------------------------------------------
  var anoEl = document.getElementById('ano-atual');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------
  // Links diretos de WhatsApp (contato geral, sem formulário)
  // -----------------------------------------------------------
  var MENSAGEM_PADRAO = 'Olá! Gostaria de falar com a Brenkee.';

  document.querySelectorAll('[data-whatsapp-link]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      abrirWhatsApp(MENSAGEM_PADRAO);
    });
  });

  // -----------------------------------------------------------
  // Menu mobile
  // -----------------------------------------------------------
  var menuToggle = document.getElementById('menu-toggle');
  var menuPrincipal = document.getElementById('menu-principal');

  function fecharMenu() {
    menuPrincipal.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener('click', function () {
      var aberto = menuPrincipal.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    // Fecha o menu ao clicar em um link (rolagem para a seção)
    menuPrincipal.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', fecharMenu);
    });
  }

  // -----------------------------------------------------------
  // Modal — Solicitar orçamento
  // -----------------------------------------------------------
  var modal = document.getElementById('orcamento-modal');
  var form = document.getElementById('orcamento-form');
  var inputNome = document.getElementById('orcamento-nome');
  var inputRamo = document.getElementById('orcamento-ramo');
  var botaoSubmit = document.getElementById('orcamento-submit');
  var gatilhos = document.querySelectorAll('[data-orcamento-trigger]');
  var ultimoElementoFocado = null;

  function validarFormulario() {
    var nomePreenchido = inputNome.value.trim().length > 0;
    var ramoPreenchido = inputRamo.value.trim().length > 0;
    botaoSubmit.disabled = !(nomePreenchido && ramoPreenchido);
  }

  function abrirModal(event) {
    if (event) event.preventDefault();
    ultimoElementoFocado = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (menuPrincipal) fecharMenu();
    window.setTimeout(function () { inputNome.focus(); }, 50);
  }

  function fecharModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (ultimoElementoFocado) ultimoElementoFocado.focus();
  }

  if (modal && form) {
    gatilhos.forEach(function (botao) {
      botao.addEventListener('click', abrirModal);
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', fecharModal);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        fecharModal();
      }
    });

    inputNome.addEventListener('input', validarFormulario);
    inputRamo.addEventListener('input', validarFormulario);

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var nome = inputNome.value.trim();
      var ramo = inputRamo.value.trim();
      if (!nome || !ramo) return;

      var mensagem = 'Olá! Meu nome é ' + nome + ' e atuo no ramo de ' + ramo +
        '. Gostaria de solicitar um orçamento com a Brenkee.';

      abrirWhatsApp(mensagem);
      fecharModal();
      form.reset();
      botaoSubmit.disabled = true;
    });
  }

  // -----------------------------------------------------------
  // Reveal suave ao rolar (Etapa 7.1)
  // Por padrão os elementos ".reveal" ficam totalmente visíveis
  // (nenhuma regra os esconde). Só entram no estado oculto se
  // esta seção rodar com sucesso e o navegador suportar
  // IntersectionObserver — ou seja, se o JS falhar ou não
  // carregar, o conteúdo nunca fica invisível.
  // -----------------------------------------------------------
  var elementosReveal = document.querySelectorAll('.reveal');
  var prefereMenosMovimento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (elementosReveal.length && !prefereMenosMovimento && 'IntersectionObserver' in window) {
    elementosReveal.forEach(function (el) {
      el.classList.add('reveal-init');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-init');
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // anima uma vez só, depois fica estável
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    // Espera dois frames antes de começar a observar: garante que o navegador
    // já pintou o estado oculto (reveal-init) antes da primeira checagem do
    // IntersectionObserver. Sem isso, um elemento que já está perto do topo
    // da tela no carregamento pode ser marcado como visível instantaneamente,
    // sem transição perceptível.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        elementosReveal.forEach(function (el) {
          revealObserver.observe(el);
        });
      });
    });
  }
  // Sem IntersectionObserver ou com "prefers-reduced-motion": não faz nada,
  // os elementos permanecem visíveis normalmente, sem animação.
})();
