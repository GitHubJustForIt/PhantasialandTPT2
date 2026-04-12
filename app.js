// ════════════════════════════════════════════════════════════
//  APP.JS – Phantasialand Roblox
//  Translations, navigation, particles, all section renders
// ════════════════════════════════════════════════════════════

// ── Translation strings ──────────────────────────────────
const LANG_STRINGS = {
  en: {
    navHome: 'Home',
    navWorlds: 'Theme Worlds',
    navBook: 'Book',
    navCta: 'Book Now',
    heroBadge: 'Official Roblox Park',
    heroSubText: 'Welcome to the most exciting theme park on Roblox –\nbook your exclusive session and experience the magic.',
    heroBtn1: 'Book a Session',
    heroBtn2: 'Explore Theme Worlds',
    statPlayers: 'Players per Session',
    statDuration: 'Minutes Playtime',
    statWorlds: 'Theme Worlds',
    parkStatusOpen: 'The park is currently',
    parkStatusOpenWord: 'OPEN',
    parkStatusClosed: 'The park is currently',
    parkStatusClosedWord: 'CLOSED',
    parkClosedHeroText: 'The park is currently closed. We look forward to welcoming you soon.',
    ticketSalesOff: 'Ticket sales are currently not available.',
    waitLabel: 'Today',
    waitTitle: 'Wait Times',
    waitDesc: 'Current estimated wait times for our attractions.',
    waitLow: 'Short',
    waitMedium: 'Moderate',
    waitHigh: 'Long',
    waitMin: 'min',
    worldsLabel: 'Explore',
    worldsTitle: 'Our Theme Worlds',
    worldsDesc: 'Every area of the park tells a unique story – dive in and experience them all.',
    trailerLabel: 'Experience',
    trailerTitle: 'Park Trailer',
    trailerDesc: 'Get a first impression of the most magical Roblox park.',
    bookLabel: 'Reservation',
    bookTitle: 'Book a Session',
    bookDesc: 'Pick your preferred date from the calendar and choose an available time slot.',
    slotsPlaceholder: 'Select a highlighted day from the calendar to see available time slots.',
    slotBook: 'Book',
    slotFull: 'Fully Booked',
    slotFree: 'available',
    slotFullLabel: 'fully booked',
    visitorRateLow: 'Low Crowd',
    visitorRateMedium: 'Moderate Crowd',
    visitorRateHigh: 'High Crowd',
    calMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    calWeekdays: ['Mo','Tu','We','Th','Fr','Sa','Su'],
    maxPlayers: 'Max.',
    players: 'Players',
    minutes: 'Minutes',
    modalTitle: 'Book Session',
    modalSubtitle: 'Fill in the form and confirm your booking.',
    detailDate: 'Date',
    detailTime: 'Time',
    detailDuration: 'Duration',
    detailCapacity: 'Capacity',
    sessionNoteText: 'Each session lasts exactly',
    sessionNote2: 'minutes. Please be punctual and arrive on time.',
    usernameLabel: 'Roblox Username',
    usernamePlaceholder: 'Your Roblox username',
    usernameError: 'Please enter a valid Roblox username (3–20 characters).',
    confirmText: 'I confirm that I will <strong>appear in the park on time</strong> at the selected time slot.',
    checkboxError: 'Please confirm your attendance.',
    btnCancel: 'Cancel',
    btnConfirm: 'Confirm Booking',
    btnSending: 'Sending...',
    successTitle: 'Booking Successful!',
    successDesc: 'Your session has been reserved. We look forward to your visit at Phantasialand – Roblox!',
    summaryUsername: 'Roblox Username',
    summaryDate: 'Date',
    summaryTime: 'Time',
    summaryDuration: 'Session Duration',
    summaryMinutes: 'Minutes',
    btnClose: 'Close',
    errorTitle: 'An Error Occurred',
    errorGeneric: 'Something went wrong. Please try again.',
    errorFull: 'This slot was just fully booked. Please choose another time.',
    btnBack: 'Back',
    footerDisclaimerTitle: 'Legal Notice:',
    footerDisclaimer: ' Phantasialand – Roblox is an unofficial fan project on the Roblox platform and has no connection whatsoever with the real Phantasialand Freizeit- und Erlebnispark GmbH & Co. KG in Brühl. All trademarks, names, logos and rights of the real Phantasialand are the property of their respective owners. This project is an independent, non-commercial fan experience and is not supported or endorsed by Phantasialand.',
    langSwitch: 'DE',
    footerCopy: 'Fan Project',
  },
  de: {
    navHome: 'Startseite',
    navWorlds: 'Themenwelten',
    navBook: 'Buchen',
    navCta: 'Jetzt buchen',
    heroBadge: 'Offizieller Roblox-Park',
    heroSubText: 'Willkommen im aufregendsten Freizeitpark auf Roblox –\nbuche jetzt deine exklusive Session und erlebe die Magie.',
    heroBtn1: 'Session buchen',
    heroBtn2: 'Themenwelten entdecken',
    statPlayers: 'Spieler pro Session',
    statDuration: 'Minuten Spielzeit',
    statWorlds: 'Themenwelten',
    parkStatusOpen: 'Der Park ist aktuell',
    parkStatusOpenWord: 'GEÖFFNET',
    parkStatusClosed: 'Der Park ist aktuell',
    parkStatusClosedWord: 'GESCHLOSSEN',
    parkClosedHeroText: 'Der Park ist aktuell geschlossen. Wir freuen uns, dich bald begrüßen zu dürfen.',
    ticketSalesOff: 'Der Ticketverkauf ist aktuell nicht verfügbar.',
    waitLabel: 'Heute',
    waitTitle: 'Wartezeiten',
    waitDesc: 'Aktuelle geschätzte Wartezeiten für unsere Attraktionen.',
    waitLow: 'Kurz',
    waitMedium: 'Mittel',
    waitHigh: 'Lang',
    waitMin: 'Min',
    worldsLabel: 'Entdecken',
    worldsTitle: 'Unsere Themenwelten',
    worldsDesc: 'Jeder Bereich des Parks erzählt eine einzigartige Geschichte – tauche ein und erlebe sie alle.',
    trailerLabel: 'Erleben',
    trailerTitle: 'Park Trailer',
    trailerDesc: 'Verschaffe dir einen ersten Eindruck vom magischsten Roblox-Park.',
    bookLabel: 'Reservierung',
    bookTitle: 'Session buchen',
    bookDesc: 'Wähle deinen Wunschtag aus dem Kalender und anschließend einen verfügbaren Zeitslot.',
    slotsPlaceholder: 'Wähle einen markierten Tag aus dem Kalender, um die verfügbaren Zeitslots zu sehen.',
    slotBook: 'Buchen',
    slotFull: 'Ausgebucht',
    slotFree: 'frei',
    slotFullLabel: 'ausgebucht',
    visitorRateLow: 'Geringes Besucheraufkommen',
    visitorRateMedium: 'Mittleres Besucheraufkommen',
    visitorRateHigh: 'Hohes Besucheraufkommen',
    calMonths: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    calWeekdays: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    maxPlayers: 'Max.',
    players: 'Spieler',
    minutes: 'Minuten',
    modalTitle: 'Session buchen',
    modalSubtitle: 'Fülle das Formular aus und bestätige deine Buchung.',
    detailDate: 'Datum',
    detailTime: 'Uhrzeit',
    detailDuration: 'Dauer',
    detailCapacity: 'Kapazität',
    sessionNoteText: 'Jede Session dauert genau',
    sessionNote2: 'Minuten. Bitte sei pünktlich und erscheine rechtzeitig.',
    usernameLabel: 'Roblox-Benutzername',
    usernamePlaceholder: 'Dein Roblox-Username',
    usernameError: 'Bitte gib einen gültigen Roblox-Benutzernamen ein (3–20 Zeichen).',
    confirmText: 'Ich bestätige hiermit, dass ich zum gewählten Zeitpunkt <strong>pünktlich im Park erscheinen werde</strong>.',
    checkboxError: 'Bitte bestätige deine Teilnahme.',
    btnCancel: 'Abbrechen',
    btnConfirm: 'Buchung bestätigen',
    btnSending: 'Wird gesendet...',
    successTitle: 'Buchung erfolgreich!',
    successDesc: 'Deine Session wurde reserviert. Wir freuen uns auf deinen Besuch im Phantasialand – Roblox!',
    summaryUsername: 'Roblox-Username',
    summaryDate: 'Datum',
    summaryTime: 'Uhrzeit',
    summaryDuration: 'Session-Dauer',
    summaryMinutes: 'Minuten',
    btnClose: 'Schließen',
    errorTitle: 'Fehler aufgetreten',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    errorFull: 'Dieser Slot wurde gerade ausgebucht. Bitte wähle einen anderen Zeitslot.',
    btnBack: 'Zurück',
    footerDisclaimerTitle: 'Rechtlicher Hinweis:',
    footerDisclaimer: ' Phantasialand – Roblox ist ein inoffizielles Fan-Projekt auf der Plattform Roblox und steht in keinerlei Verbindung mit dem echten Phantasialand Freizeit- und Erlebnispark GmbH & Co. KG in Brühl. Alle Marken, Namen, Logos und Rechte des realen Phantasialand sind Eigentum der jeweiligen Rechteinhaber. Dieses Projekt ist ein unabhängiges, nicht-kommerzielles Fan-Erlebnis und wird nicht von Phantasialand unterstützt oder genehmigt.',
    langSwitch: 'EN',
    footerCopy: 'Fan-Projekt',
  }
};

// ── Current language (global, read by booking.js) ───────
window.PLA_LANG = localStorage.getItem('pla_lang') || 'en';

// ── Translation helper (global) ──────────────────────────
window.T = function (key) {
  return (LANG_STRINGS[window.PLA_LANG] || LANG_STRINGS.en)[key] || key;
};

// ════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  applyLanguage();
  applySettings();
  initStatusBanner();
  initNavbar();
  initParticles();
  initHeroActions();
  initWaitTimes();
  initThemeWorlds();
  initTrailer();
  initBookingVisibility();
  initRevealAnimations();
  initFooter();
  initLangToggle();
});

// ════════════════════════════════════════════════════════════
//  LANGUAGE
// ════════════════════════════════════════════════════════════
function applyLanguage() {
  document.documentElement.lang = window.PLA_LANG;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var val = T(key);
    if (val) el.textContent = val;
  });

  // Weekdays in calendar
  var wd = document.getElementById('calWeekdays');
  if (wd) {
    var days = T('calWeekdays');
    var spans = wd.querySelectorAll('span');
    if (Array.isArray(days)) {
      days.forEach(function (d, i) { if (spans[i]) spans[i].textContent = d; });
    }
  }

  // Lang toggle label
  var lt = document.getElementById('langToggleLabel');
  if (lt) lt.textContent = T('langSwitch');
}

function initLangToggle() {
  var btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    window.PLA_LANG = window.PLA_LANG === 'en' ? 'de' : 'en';
    localStorage.setItem('pla_lang', window.PLA_LANG);
    // Full re-render
    applyLanguage();
    applySettings();
    initStatusBanner();
    initHeroActions();
    initWaitTimes();
    initThemeWorlds();
    initTrailer();
    initFooter();
    // Re-trigger booking.js re-render
    if (typeof window.PLA_BOOKING_REINIT === 'function') window.PLA_BOOKING_REINIT();
  });
}

// ════════════════════════════════════════════════════════════
//  SETTINGS → DOM
// ════════════════════════════════════════════════════════════
function applySettings() {
  var s = SETTINGS;
  document.title = s.parkName + ' – Roblox';

  var map = {
    navLogoMain:    s.parkName,
    heroTitleMain:  s.parkName,
    footerLogoMain: s.parkName,
    statDuration:   s.sessionDurationMinutes,
    statWorlds:     s.themeWorlds.length,
  };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = map[id];
  });

  // Hero sub text (multi-line)
  var heroSub = document.getElementById('heroSubText');
  if (heroSub) heroSub.innerHTML = T('heroSubText').replace('\n', '<br>');

  // Footer tagline
  var ft = document.getElementById('footerTagline');
  if (ft) ft.textContent = s.parkTagline;

  // Hero background
  var hbg = document.getElementById('heroBgImg');
  if (hbg && s.heroBackgroundUrl) {
    hbg.style.backgroundImage = "url('" + s.heroBackgroundUrl + "')";
  }
}

// ════════════════════════════════════════════════════════════
//  STATUS BANNER
// ════════════════════════════════════════════════════════════
function initStatusBanner() {
  var banner = document.getElementById('statusBanner');
  var text   = document.getElementById('statusText');
  if (!banner || !text) return;

  if (SETTINGS.parkOpen) {
    banner.className = 'park-open';
    text.innerHTML = T('parkStatusOpen') + ' <strong>' + T('parkStatusOpenWord') + '</strong>';
  } else {
    banner.className = 'park-closed';
    text.innerHTML = T('parkStatusClosed') + ' <strong>' + T('parkStatusClosedWord') + '</strong>';
  }

  // Park closed notice inside hero
  var closedHero = document.getElementById('parkClosedHero');
  if (closedHero) {
    var span = closedHero.querySelector('span');
    if (span) span.textContent = T('parkClosedHeroText');
  }
}

// ════════════════════════════════════════════════════════════
//  HERO ACTIONS (buttons, dependent on settings)
// ════════════════════════════════════════════════════════════
function initHeroActions() {
  var actions    = document.getElementById('heroActions');
  var closedHero = document.getElementById('parkClosedHero');
  if (!actions) return;

  actions.innerHTML = '';

  if (!SETTINGS.parkOpen) {
    // Park closed – no CTAs, show closed notice instead
    actions.style.display = 'none';
    if (closedHero) {
      closedHero.style.display = 'flex';
      closedHero.classList.add('revealed');
    }
    return;
  }

  actions.style.display = 'flex';
  if (closedHero) closedHero.style.display = 'none';

  if (SETTINGS.ticketSalesActive) {
    actions.innerHTML =
      '<button class="btn-primary" onclick="smoothScrollTo(\'buchen\')">' +
        '<i class="fa-solid fa-ticket"></i> ' + T('heroBtn1') +
      '</button>' +
      '<button class="btn-outline" onclick="smoothScrollTo(\'themenwelten\')">' +
        '<i class="fa-solid fa-compass"></i> ' + T('heroBtn2') +
      '</button>';
  } else {
    actions.innerHTML =
      '<button class="btn-outline" onclick="smoothScrollTo(\'themenwelten\')">' +
        '<i class="fa-solid fa-compass"></i> ' + T('heroBtn2') +
      '</button>';
  }
}

// ════════════════════════════════════════════════════════════
//  BOOKING SECTION VISIBILITY
// ════════════════════════════════════════════════════════════
function initBookingVisibility() {
  var container = document.getElementById('bookingContainer');
  var notice    = document.getElementById('ticketsInactiveNotice');
  var navBook   = document.getElementById('navBookLink');
  var mobBook   = document.getElementById('mobileBookLink');
  var navCta    = document.getElementById('navCtaBtn');
  var footBook  = document.getElementById('footerBookLink');
  var noticeP   = notice ? notice.querySelector('[data-i18n]') : null;

  if (noticeP) noticeP.textContent = T('ticketSalesOff');

  if (SETTINGS.ticketSalesActive) {
    if (container) container.style.display = '';
    if (notice)    notice.style.display    = 'none';
    if (navBook)   navBook.style.display   = '';
    if (mobBook)   mobBook.style.display   = '';
    if (navCta)    navCta.style.display    = '';
    if (footBook)  footBook.style.display  = '';
  } else {
    if (container) container.style.display = 'none';
    if (notice)    notice.style.display    = '';
    if (navBook)   navBook.style.display   = 'none';
    if (mobBook)   mobBook.style.display   = 'none';
    if (navCta)    navCta.style.display    = 'none';
    if (footBook)  footBook.style.display  = 'none';
  }
}

// ════════════════════════════════════════════════════════════
//  WAIT TIMES
// ════════════════════════════════════════════════════════════
function initWaitTimes() {
  var section = document.getElementById('wartezeiten');
  var grid    = document.getElementById('waitTimesGrid');
  var legend  = document.getElementById('waitLegend');
  if (!section || !grid) return;

  // Update section header text
  var sLabel = section.querySelector('.section-label span');
  var sTitle = section.querySelector('.section-title');
  var sDesc  = section.querySelector('.section-desc');
  if (sLabel) sLabel.textContent = T('waitLabel');
  if (sTitle) sTitle.textContent = T('waitTitle');
  if (sDesc)  sDesc.textContent  = T('waitDesc');

  var times = SETTINGS.waitTimes || [];
  if (!times.length) { section.style.display = 'none'; return; }
  section.style.display = '';

  // Legend
  if (legend) {
    legend.innerHTML =
      '<div class="legend-item"><div class="legend-dot wt-low"></div>' + T('waitLow') + ' (0–' + SETTINGS.waitTimeLow + ' ' + T('waitMin') + ')</div>' +
      '<div class="legend-item"><div class="legend-dot wt-medium"></div>' + T('waitMedium') + ' (' + (SETTINGS.waitTimeLow + 1) + '–' + SETTINGS.waitTimeMedium + ' ' + T('waitMin') + ')</div>' +
      '<div class="legend-item"><div class="legend-dot wt-high"></div>' + T('waitHigh') + ' (&gt;' + SETTINGS.waitTimeMedium + ' ' + T('waitMin') + ')</div>';
  }

  // Cards
  grid.innerHTML = '';
  times.forEach(function (item) {
    var tier = getWaitTier(item.minutes);
    var tierLabel = T('wait' + tier.charAt(0).toUpperCase() + tier.slice(1));
    var icon = tier === 'low' ? 'fa-person-walking'
             : tier === 'medium' ? 'fa-person-running'
             : 'fa-fire';

    var card = document.createElement('div');
    card.className = 'wt-card wt-' + tier + ' reveal-up';

    card.innerHTML =
      '<div class="wt-icon"><i class="fa-solid ' + icon + '"></i></div>' +
      '<div class="wt-info">' +
        '<div class="wt-name">' + escapeHtml(item.name) + '</div>' +
        '<div class="wt-tier">' + tierLabel + '</div>' +
      '</div>' +
      '<div class="wt-minutes">' +
        '<div class="wt-num">' + item.minutes + '</div>' +
        '<div class="wt-unit">' + T('waitMin') + '</div>' +
      '</div>';

    grid.appendChild(card);
  });

  refreshRevealObserver();
}

function getWaitTier(minutes) {
  if (minutes <= (SETTINGS.waitTimeLow || 20))   return 'low';
  if (minutes <= (SETTINGS.waitTimeMedium || 45)) return 'medium';
  return 'high';
}

// ════════════════════════════════════════════════════════════
//  THEME WORLDS
// ════════════════════════════════════════════════════════════
function initThemeWorlds() {
  var grid = document.getElementById('worldsGrid');
  if (!grid) return;

  // Update header text
  var section = document.getElementById('themenwelten');
  if (section) {
    var sLabel = section.querySelector('.section-label span');
    var sTitle = section.querySelector('.section-title');
    var sDesc  = section.querySelector('.section-desc');
    if (sLabel) sLabel.textContent = T('worldsLabel');
    if (sTitle) sTitle.textContent = T('worldsTitle');
    if (sDesc)  sDesc.textContent  = T('worldsDesc');
  }

  grid.innerHTML = '';
  (SETTINGS.themeWorlds || []).forEach(function (world, i) {
    var card = document.createElement('div');
    card.className = 'world-card reveal-up';
    card.style.setProperty('--delay', (i * 0.09) + 's');
    card.innerHTML =
      '<div class="card-corner"></div>' +
      '<div class="card-img-wrap">' +
        '<img class="card-img" src="' + escapeHtml(world.imageUrl) + '" alt="' + escapeHtml(world.title) + '" loading="lazy" ' +
          'onerror="this.src=\'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=60\'">' +
        '<div class="card-img-overlay"></div>' +
        '<div class="card-title-over"><span class="card-title-line"></span>' + escapeHtml(world.title) + '</div>' +
      '</div>' +
      '<div class="card-body"><p class="card-desc">' + escapeHtml(world.description) + '</p></div>';
    grid.appendChild(card);
  });

  refreshRevealObserver();
}

// ════════════════════════════════════════════════════════════
//  TRAILER
// ════════════════════════════════════════════════════════════
function initTrailer() {
  var section = document.getElementById('trailer');
  var iframe  = document.getElementById('trailerIframe');
  var sLabel  = section ? section.querySelector('.section-label span') : null;
  var sTitle  = section ? section.querySelector('.section-title') : null;
  var sDesc   = section ? section.querySelector('.section-desc') : null;

  if (sLabel) sLabel.textContent = T('trailerLabel');
  if (sTitle) sTitle.textContent = T('trailerTitle');
  if (sDesc)  sDesc.textContent  = T('trailerDesc');

  if (!section || !iframe) return;

  var url = SETTINGS.trailerUrl || '';
  if (!url) { section.style.display = 'none'; return; }

  section.style.display = '';
  iframe.src = convertToEmbed(url);
}

function convertToEmbed(url) {
  // Already embed
  if (url.includes('youtube.com/embed/') || url.includes('player.vimeo')) return url;
  // youtu.be/ID
  var s = url.match(/youtu\.be\/([^?&]+)/);
  if (s) return 'https://www.youtube.com/embed/' + s[1];
  // youtube.com/watch?v=ID
  var w = url.match(/[?&]v=([^?&]+)/);
  if (w) return 'https://www.youtube.com/embed/' + w[1];
  return url;
}

// ════════════════════════════════════════════════════════════
//  NAVBAR
// ════════════════════════════════════════════════════════════
function initNavbar() {
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  toggle.addEventListener('click', function () {
    mobile.classList.toggle('open');
    var icon = toggle.querySelector('i');
    var isOpen = mobile.classList.contains('open');
    icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) closeMobileMenu();
  });
}

window.closeMobileMenu = function () {
  var m = document.getElementById('navMobile');
  var t = document.getElementById('navToggle');
  if (m) m.classList.remove('open');
  if (t) {
    t.querySelector('i').className = 'fa-solid fa-bars';
    t.setAttribute('aria-label', 'Open menu');
  }
};

window.smoothScrollTo = function (id) {
  var el = document.getElementById(id);
  if (!el) return;
  var top = el.getBoundingClientRect().top + window.scrollY - 95;
  window.scrollTo({ top: top, behavior: 'smooth' });
};

// ════════════════════════════════════════════════════════════
//  PARTICLES
// ════════════════════════════════════════════════════════════
function initParticles() {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles;
  var colors = ['rgba(212,175,55,','rgba(240,215,100,','rgba(255,223,80,','rgba(180,140,30,','rgba(255,248,176,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', function () { resize(); particles = mkParticles(); }, { passive: true });

  function mkP() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: -(Math.random() * .6 + .2),
      size: Math.random() * 2.5 + .5,
      alpha: Math.random() * .55 + .1,
      color: colors[Math.floor(Math.random() * colors.length)],
      ts: Math.random() * .025 + .008,
      td: Math.random() > .5 ? 1 : -1,
      isStar: Math.random() > .7,
    };
  }
  function mkParticles() {
    return Array.from({ length: Math.min(Math.floor((W * H) / 12000), 90) }, mkP);
  }
  particles = mkParticles();

  function drawStar(x, y, r, a, col) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(performance.now() * .0003);
    ctx.beginPath();
    for (var i = 0; i < 4; i++) {
      var ang = i * Math.PI / 2;
      ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
      ctx.lineTo(Math.cos(ang + Math.PI / 4) * r * .4, Math.sin(ang + Math.PI / 4) * r * .4);
    }
    ctx.closePath();
    ctx.fillStyle = col + a + ')';
    ctx.shadowBlur = 6; ctx.shadowColor = col + '.8)'; ctx.fill(); ctx.restore();
  }

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      p.alpha += p.ts * p.td;
      if (p.alpha > .75 || p.alpha < .05) p.td *= -1;
      if (p.y < -10 || p.x < -10 || p.x > W + 10) {
        p.x = Math.random() * W; p.y = H + 5; p.alpha = Math.random() * .3 + .05;
      }
      if (p.isStar) {
        drawStar(p.x, p.y, p.size * 1.5, p.alpha, p.color);
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = p.size * 4; ctx.shadowColor = p.color + '.6)'; ctx.fill(); ctx.shadowBlur = 0;
      }
    });
    requestAnimationFrame(animate);
  })();
}

// ════════════════════════════════════════════════════════════
//  SCROLL REVEAL
// ════════════════════════════════════════════════════════════
var revealObserver = null;

function initRevealAnimations() {
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });

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
  var yr = document.getElementById('footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

  var dt = document.querySelector('.footer-disclaimer strong');
  var dp = document.querySelector('.footer-disclaimer span');
  if (dt) dt.textContent = T('footerDisclaimerTitle');
  if (dp) dp.textContent = T('footerDisclaimer');

  var ft = document.getElementById('footerTagline');
  if (ft) ft.textContent = SETTINGS.parkTagline;

  var fc = document.querySelector('.footer-copy span');
  if (fc) fc.innerHTML = '&copy; ' + new Date().getFullYear() + ' Phantasialand – Roblox &nbsp;|&nbsp; ' + T('footerCopy');
}

// ════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
