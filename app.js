// ════════════════════════════════════════════════════════════
//  APP.JS – Phantasialand Roblox
//  Hauptlogik: Navigation, Animationen, Themenwelten, Partikel
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── Initialisierung ─────────────────────────────────────
  applySettings();
  initNavbar();
  initParticles();
  initThemeWorlds();
  initRevealAnimations();
  initFooter();

});

// ════════════════════════════════════════════════════════════
//  EINSTELLUNGEN ANWENDEN
// ════════════════════════════════════════════════════════════
function applySettings() {
  const s = SETTINGS;

  // Park-Name in HTML setzen
  const els = {
    navLogoMain:   document.getElementById('navLogoMain'),
    heroTitleMain: document.getElementById('heroTitleMain'),
    heroTitleSub:  document.getElementById('heroTitleSub'),
    heroTagline:   document.getElementById('heroTagline'),
    footerLogoMain:document.getElementById('footerLogoMain'),
    footerTagline: document.getElementById('footerTagline'),
    statDuration:  document.getElementById('statDuration'),
    statWorlds:    document.getElementById('statWorlds'),
  };

  if (els.navLogoMain)    els.navLogoMain.textContent    = s.parkName;
  if (els.heroTitleMain)  els.heroTitleMain.textContent  = s.parkName;
  if (els.footerLogoMain) els.footerLogoMain.textContent = s.parkName;
  if (els.statDuration)   els.statDuration.textContent   = s.sessionDurationMinutes;
  if (els.statWorlds)     els.statWorlds.textContent      = s.themeWorlds.length;
  if (els.footerTagline)  els.footerTagline.textContent   = s.parkTagline;

  // Hero Hintergrundbild
  const heroBg = document.getElementById('heroBgImg');
  if (heroBg && s.heroBackgroundUrl) {
    heroBg.style.backgroundImage = `url('${s.heroBackgroundUrl}')`;
  }

  // Dokument-Titel
  document.title = s.parkName + ' – Roblox';
}

// ════════════════════════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════════════════════════
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const mobileMenu= document.getElementById('navMobile');

  // Scroll-Effekt: Klasse "scrolled" hinzufügen
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menü Toggle
  toggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
      toggle.setAttribute('aria-label', 'Menü schließen');
    } else {
      icon.className = 'fa-solid fa-bars';
      toggle.setAttribute('aria-label', 'Menü öffnen');
    }
  });

  // Menü schließen beim Klick außerhalb
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// Globale Funktion für onclick-Handler
function closeMobileMenu() {
  const mobileMenu = document.getElementById('navMobile');
  const toggle     = document.getElementById('navToggle');
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (toggle) {
    toggle.querySelector('i').className = 'fa-solid fa-bars';
    toggle.setAttribute('aria-label', 'Menü öffnen');
  }
}

// Sanftes Scrollen
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ════════════════════════════════════════════════════════════
//  GOLDENE PARTIKEL-ANIMATION (Hero-Hintergrund)
// ════════════════════════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  // Canvas-Größe anpassen
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', function () {
    resize();
    particles = createParticles();
  }, { passive: true });

  // Partikelfarben (Gold-Töne)
  const colors = [
    'rgba(212,175,55,',
    'rgba(240,215,100,',
    'rgba(255,223,80,',
    'rgba(180,140,30,',
    'rgba(255,248,176,',
  ];

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    -(Math.random() * 0.6 + 0.2),
      size:  Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.55 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      twinkleSpeed: Math.random() * 0.025 + 0.008,
      twinkleDir:   Math.random() > 0.5 ? 1 : -1,
      // Sterne-Form: 0 = Kreis, 1 = Stern
      isStar: Math.random() > 0.7,
    };
  }

  function createParticles() {
    const count = Math.min(Math.floor((W * H) / 12000), 90);
    return Array.from({ length: count }, createParticle);
  }
  particles = createParticles();

  // Stern zeichnen
  function drawStar(x, y, r, alpha, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(performance.now() * 0.0003);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const outer = r;
      const inner = r * 0.4;
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.lineTo(Math.cos(angle + Math.PI / 4) * inner, Math.sin(angle + Math.PI / 4) * inner);
    }
    ctx.closePath();
    ctx.fillStyle = color + alpha + ')';
    ctx.shadowBlur = 6;
    ctx.shadowColor = color + '0.8)';
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(function (p) {
      // Bewegen
      p.x += p.vx;
      p.y += p.vy;

      // Twinkle
      p.alpha += p.twinkleSpeed * p.twinkleDir;
      if (p.alpha > 0.75 || p.alpha < 0.05) {
        p.twinkleDir *= -1;
      }

      // Respawn wenn außerhalb
      if (p.y < -10 || p.x < -10 || p.x > W + 10) {
        p.x = Math.random() * W;
        p.y = H + 5;
        p.alpha = Math.random() * 0.3 + 0.05;
      }

      if (p.isStar) {
        drawStar(p.x, p.y, p.size * 1.5, p.alpha, p.color);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur  = p.size * 4;
        ctx.shadowColor = p.color + '0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ════════════════════════════════════════════════════════════
//  THEMENWELTEN RENDERN
// ════════════════════════════════════════════════════════════
function initThemeWorlds() {
  const grid = document.getElementById('worldsGrid');
  if (!grid || !SETTINGS.themeWorlds) return;

  grid.innerHTML = '';

  SETTINGS.themeWorlds.forEach(function (world, index) {
    const card = document.createElement('div');
    card.className = 'world-card reveal-up';
    card.style.setProperty('--delay', (index * 0.1) + 's');

    card.innerHTML = `
      <div class="card-corner"></div>
      <div class="card-img-wrap">
        <img
          class="card-img"
          src="${escapeHtml(world.imageUrl)}"
          alt="${escapeHtml(world.title)}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=60'"
        />
        <div class="card-img-overlay"></div>
        <div class="card-title-over">
          <span class="card-title-line"></span>
          ${escapeHtml(world.title)}
        </div>
      </div>
      <div class="card-body">
        <p class="card-desc">${escapeHtml(world.description)}</p>
      </div>
    `;

    grid.appendChild(card);
  });

  // Reveal für neu erstellte Karten registrieren
  refreshRevealObserver();
}

// ════════════════════════════════════════════════════════════
//  SCROLL-REVEAL ANIMATIONEN (IntersectionObserver)
// ════════════════════════════════════════════════════════════
let revealObserver = null;

function initRevealAnimations() {
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px',
  });

  document.querySelectorAll('.reveal-up').forEach(function (el) {
    revealObserver.observe(el);
  });
}

function refreshRevealObserver() {
  if (!revealObserver) return;
  document.querySelectorAll('.reveal-up:not(.revealed)').forEach(function (el) {
    revealObserver.observe(el);
  });
}

// ════════════════════════════════════════════════════════════
//  FOOTER
// ════════════════════════════════════════════════════════════
function initFooter() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ════════════════════════════════════════════════════════════
//  HILFSFUNKTIONEN
// ════════════════════════════════════════════════════════════
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
