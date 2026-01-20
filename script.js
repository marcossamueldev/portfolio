/* script.js - interactions: menu mobile, reveal, lazy, form WhatsApp, language toggle */

document.addEventListener('DOMContentLoaded', () => {
  /* MENU MOBILE */
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.querySelector('.menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  /* REVEAL ON SCROLL */
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('reveal'));
  }

  /* LAZY LOAD IMAGES */
  const imgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '120px' });
    imgs.forEach(i => imgObs.observe(i));
  } else {
    imgs.forEach(i => { if (i.dataset.src) i.src = i.dataset.src; });
  }

  /* FORM -> WHATSAPP */
  const form = document.getElementById('contactForm') || document.querySelector('.formulario');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const nome = document.getElementById('nome')?.value?.trim();
      const mensagem = document.getElementById('mensagem')?.value?.trim();
      if (!nome || !mensagem) {
        alert('Por favor preencha nome e mensagem / Please fill name and message.');
        return;
      }
      const phone = '5562995141626'; // seu número
      const text = `Olá, meu nome é ${nome}. ${mensagem}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* LANGUAGE TOGGLE (pt / en) */
  const langToggle = document.getElementById('langToggle');
  const ptEls = document.querySelectorAll('.text-pt');
  const enEls = document.querySelectorAll('.text-en');
  const current = localStorage.getItem('site-lang') || 'pt';
  setLanguage(current);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = (localStorage.getItem('site-lang') === 'en') ? 'pt' : 'en';
      setLanguage(next);
    });
  }

  function setLanguage(lang) {
    if (lang === 'en') {
      enEls.forEach(e => e.style.display = '');
      ptEls.forEach(e => e.style.display = 'none');
      if (langToggle) langToggle.innerText = 'PT';
      localStorage.setItem('site-lang', 'en');
      document.documentElement.lang = 'en';
    } else {
      enEls.forEach(e => e.style.display = 'none');
      ptEls.forEach(e => e.style.display = '');
      if (langToggle) langToggle.innerText = 'EN';
      localStorage.setItem('site-lang', 'pt');
      document.documentElement.lang = 'pt-BR';
    }
  }

});
