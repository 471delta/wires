/* ═══════════════════════════════════════════════════
   script.js — Wires & Stone
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 820px)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ─── Sticky nav + scroll progress (single rAF loop) ─── */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  let scrollTicking = false;

  function updateScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 28);

    if (progressBar) {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const p = Math.min(1, Math.max(0, y / max));
      progressBar.style.setProperty('--p', p.toFixed(4));
    }
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  /* ─── Mobile menu ─── */
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  /* ─── Scroll reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ─── Active nav link on scroll ─── */
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
  const sectionMap = {};
  navAnchors.forEach(a => {
    const id = a.getAttribute('data-nav');
    const el = document.getElementById(id);
    if (el) sectionMap[id] = el;
  });
  if ('IntersectionObserver' in window && Object.keys(sectionMap).length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navAnchors.forEach(a =>
            a.classList.toggle('active', a.getAttribute('data-nav') === id)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    Object.values(sectionMap).forEach(el => navIO.observe(el));
  }

  /* ─── 3D tilt + mouse-tracked highlight ─── */
  if (!reduce && canHover) {
    document.querySelectorAll('.cred').forEach(cred => {
      let raf = null;
      cred.addEventListener('pointermove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = cred.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width  - 0.5;
          const py = (e.clientY - r.top)  / r.height - 0.5;
          cred.style.transform =
            `translateY(-10px) rotateX(${(-py * 4.5).toFixed(2)}deg) rotateY(${(px * 5.5).toFixed(2)}deg)`;
          raf = null;
        });
      });
      cred.addEventListener('pointerleave', () => {
        cred.style.transform = '';
      });
    });

    document.querySelectorAll('.pillar, .status-panel, .inquiry-card').forEach(card => {
      let raf = null;
      card.addEventListener('pointermove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const mx = ((e.clientX - r.left) / r.width)  * 100;
          const my = ((e.clientY - r.top)  / r.height) * 100;
          card.style.setProperty('--mx', mx.toFixed(2) + '%');
          card.style.setProperty('--my', my.toFixed(2) + '%');
          raf = null;
        });
      });
    });
  }

  /* ─── Star field ─── */
  const field = document.getElementById('starfield');
  if (field && !reduce) {
    const COUNT = isMobile ? 40 : 72;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = 0.5 + Math.random() * 1.4;
      const hue = Math.random();
      let color = '#fdf0e8';
      if (hue > 0.76) color = '#f2cbc4';
      else if (hue > 0.56) color = '#e0a2a4';
      s.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        background:${color};
        box-shadow:0 0 ${3 + Math.random() * 5}px ${color};
        animation-duration:${4 + Math.random() * 6}s;
        animation-delay:${-Math.random() * 10}s;
      `;
      frag.appendChild(s);
    }
    field.appendChild(frag);
  }

  /* ─── Floating motes ─── */
  const motes = document.getElementById('motes');
  if (motes && !reduce && !isMobile) {
    const COUNT = 22;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
      const m = document.createElement('span');
      m.className = 'mote';
      const size = 1.2 + Math.random() * 2.6;
      m.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        bottom:${-10 - Math.random() * 20}%;
        animation-duration:${20 + Math.random() * 30}s;
        animation-delay:${-Math.random() * 40}s;
        opacity:${0.25 + Math.random() * 0.5};
      `;
      frag.appendChild(m);
    }
    motes.appendChild(frag);
  }

  /* ─── Sparkles around each credential seal ─── */
  if (!reduce) {
    document.querySelectorAll('.cred-seal').forEach(stage => {
      const GLYPHS = ['✦', '✧', '·'];
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 6; i++) {
        const s = document.createElement('span');
        s.textContent = GLYPHS[i % GLYPHS.length];
        s.setAttribute('aria-hidden', 'true');
        s.style.cssText = `
          position:absolute;
          color:rgba(224,162,164,${0.35 + Math.random() * 0.5});
          font-size:${8 + Math.random() * 12}px;
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;
          pointer-events:none;
          animation:twinkleStar ${4 + Math.random() * 4}s ease-in-out infinite;
          animation-delay:${-Math.random() * 6}s;
          z-index:9;
          text-shadow:0 0 12px rgba(224,162,164,.8);
        `;
        frag.appendChild(s);
      }
      stage.appendChild(frag);
    });
  }

  /* ─── Copy email ─── */
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'wiresandstone@gmail.com';
      const original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      }
      copyBtn.textContent = 'Copied';
      setTimeout(() => { copyBtn.textContent = original; }, 1800);
    });
  }

  /* ─── Smooth anchors ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

})();