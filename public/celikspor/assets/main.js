/* =====================================================================
   ÇELİK SPOR — Shared JS
   - Page transition (curtain in/out)
   - Navbar scroll + mobile toggle
   - Intersection-Observer reveal
   - Word-split reveal for text
   - Stat counters
   - Hero slider (auto-rotate + dots/arrows)
   ===================================================================== */

(function () {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------------- Page curtain — covers on load then slides off-screen right ---------------- */
  const curtain = $('#pageCurtain');
  const mark    = $('#curtainMark');
  if (curtain) {
    setTimeout(() => {
      curtain.classList.add('intro');
      if (mark) {
        mark.classList.add('show');
        setTimeout(() => mark.classList.remove('show'), 460);
      }
      setTimeout(() => {
        curtain.style.transform = 'translateX(105%)';
        curtain.style.visibility = 'hidden';
      }, 900);
    }, 30);
  }

  /* Outgoing — intercept internal links */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || a.target === '_blank') return;
    // only intercept .html navigation
    if (!/\.html(\?.*)?$/.test(href)) return;
    if (a.hasAttribute('data-no-transition')) return;

    e.preventDefault();
    if (curtain) {
      curtain.style.transform = '';
      curtain.style.visibility = 'visible';
      curtain.classList.remove('intro');
      curtain.classList.add('outro');
      if (mark) mark.classList.add('show');
      setTimeout(() => {
        curtain.style.transform = 'translateX(0)';
        window.location.href = href;
      }, 540);
    } else {
      window.location.href = href;
    }
  });

  /* ---------------- Navbar scroll & mobile toggle ---------------- */
  const navbar = $('#navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 30) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  const navToggle = $('#navToggle');
  const navLinks  = $('#navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    }));
  }

  /* ---------------- Word-split for .reveal-text ---------------- */
  $$('.reveal-text').forEach(el => {
    if (el.dataset.split === 'done') return;
    const html = el.innerHTML;
    // Split on whitespace, preserve simple tags by tokenizing
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const walk = (node, out) => {
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          parts.forEach(p => {
            if (/^\s+$/.test(p)) { out.push({ space: true, text: p }); }
            else if (p.length) { out.push({ word: true, text: p }); }
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          out.push({ openTag: child.outerHTML.match(/^<[^>]+>/)[0] });
          walk(child, out);
          out.push({ closeTag: '</' + child.tagName.toLowerCase() + '>' });
        }
      });
    };
    const tokens = [];
    walk(tmp, tokens);

    let i = 0;
    const built = tokens.map(t => {
      if (t.space) return t.text;
      if (t.openTag) return t.openTag;
      if (t.closeTag) return t.closeTag;
      if (t.word) {
        i++;
        const d = Math.min(i * 0.05, 0.6);
        return `<span class="word-wrap"><span class="word" style="transition-delay:${d}s">${t.text}</span></span>`;
      }
      return '';
    }).join('');
    el.innerHTML = built;
    el.dataset.split = 'done';
  });

  /* ---------------- Reveal observer ---------------- */
  const revealEls = $$('.reveal, .reveal-text');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
  // Failsafe: if IO doesn't fire (e.g. tab inactive, snapshot tools), reveal after timeout
  setTimeout(() => revealEls.forEach(el => el.classList.add('is-visible')), 2500);

  /* ---------------- Stat counter ---------------- */
  const stats = $$('[data-count]');
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count) || 0;
      const dur = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = Number.isInteger(target)
          ? Math.round(val).toString()
          : val.toFixed(1);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(el => statIO.observe(el));

  /* ---------------- Hero slider ---------------- */
  const slider = $('#heroSlider');
  if (slider) {
    const slides = $$('.slide', slider);
    const dots   = $$('.dots button', slider);
    const arrowP = $('.arrow.prev', slider);
    const arrowN = $('.arrow.next', slider);
    const curr   = $('.progress .curr', slider);
    const total  = $('.progress .total', slider);
    let idx = 0;
    let timer;

    if (total) total.textContent = String(slides.length).padStart(2, '0');

    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      if (curr) curr.textContent = String(idx + 1).padStart(2, '0');
    };

    const next = () => go(idx + 1);
    const prev = () => go(idx - 1);

    if (arrowN) arrowN.addEventListener('click', () => { next(); restart(); });
    if (arrowP) arrowP.addEventListener('click', () => { prev(); restart(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); restart(); }));

    const start = () => { timer = setInterval(next, 6000); };
    const restart = () => { clearInterval(timer); start(); };
    start();
    go(0);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); restart(); }
      if (e.key === 'ArrowLeft')  { prev(); restart(); }
    });

    // Pause on hover for accessibility
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => start());
  }

  /* ---------------- Page-hero parallax + content fade on scroll ---------------- */
  $$('.page-hero').forEach(hero => {
    const bg = hero.querySelector('.ph-bg');
    const inner = hero.querySelector('.container');
    const updatePH = () => {
      const rect = hero.getBoundingClientRect();
      const offset = Math.max(-rect.height, -rect.top);
      if (bg) bg.style.transform = `translate3d(0, ${offset * 0.35}px, 0) scale(1.06)`;
      if (inner) {
        // text moves up slower and fades as the hero scrolls off
        const ratio = Math.min(1, Math.max(0, -rect.top / rect.height));
        inner.style.transform = `translate3d(0, ${ratio * -50}px, 0)`;
        inner.style.opacity = String(1 - ratio * 1.2);
      }
    };
    window.addEventListener('scroll', updatePH, { passive: true });
    window.addEventListener('resize', updatePH);
    updatePH();
  });

  /* ---------------- Subtle parallax for .parallax-y ---------------- */
  const parallaxEls = $$('[data-parallax]');
  if (parallaxEls.length) {
    const onPx = () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    window.addEventListener('scroll', onPx, { passive: true });
    onPx();
  }

  /* ---------------- Contact form ---------------- */
  const cf = $('#contactForm');
  if (cf) {
    cf.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = $('.form-ok', cf);
      if (ok) ok.classList.add('show');
      cf.reset();
      setTimeout(() => ok && ok.classList.remove('show'), 4200);
    });
  }
})();
