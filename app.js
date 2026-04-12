// ════════════════════════════════════════════════════════════
//  APP.JS – Phantasialand Roblox (Light Theme Edition)
// ════════════════════════════════════════════════════════════

// ── Translations ─────────────────────────────────────────
const LANG_STRINGS = {
  en: {
    navHome:'Home', navWorlds:'Theme Worlds', navBook:'Book', navCta:'Book Now',
    heroBadge:'Official Roblox Park',
    heroSubText:'Welcome to the most exciting theme park on Roblox –\nbook your exclusive session and experience the magic.',
    heroBtn1:'Book a Session', heroBtn2:'Explore Theme Worlds',
    statPlayers:'Players per Session', statDuration:'Minutes Playtime', statWorlds:'Theme Worlds',
    parkStatusOpen:'The park is currently', parkStatusOpenWord:'OPEN',
    parkStatusClosed:'The park is currently', parkStatusClosedWord:'CLOSED',
    parkClosedHeroText:'The park is currently closed. We look forward to welcoming you soon.',
    ticketSalesOff:'Ticket sales are currently not available.',
    waitLabel:'Today', waitTitle:'Wait Times', waitDesc:'Current estimated wait times for our attractions.',
    waitLow:'Short', waitMedium:'Moderate', waitHigh:'Long', waitMin:'min',
    tabCoasters:'Rollercoasters', tabFlatRides:'Flat Rides',
    worldsLabel:'Explore', worldsTitle:'Our Theme Worlds',
    worldsDesc:'Every area of the park tells a unique story – dive in and experience them all.',
    trailerLabel:'Experience', trailerTitle:'Park Trailer',
    trailerDesc:'Get a first impression of the most magical Roblox park.',
    bookLabel:'Reservation', bookTitle:'Book a Session',
    bookDesc:'Pick your preferred date from the calendar and choose an available time slot.',
    slotsPlaceholder:'Select a highlighted day from the calendar to see available time slots.',
    slotBook:'Book', slotFull:'Fully Booked', slotFree:'available', slotFullLabel:'fully booked',
    visitorRateLow:'Low Crowd', visitorRateMedium:'Moderate Crowd', visitorRateHigh:'High Crowd',
    calMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],
    calWeekdays:['Mo','Tu','We','Th','Fr','Sa','Su'],
    maxPlayers:'Max.', players:'Players', minutes:'Minutes',
    modalTitle:'Book Session', modalSubtitle:'Fill in the form and confirm your booking.',
    detailDate:'Date', detailTime:'Time', detailDuration:'Duration', detailCapacity:'Capacity',
    sessionNoteText:'Each session lasts exactly', sessionNote2:'minutes. Please be punctual.',
    usernameLabel:'Roblox Username', usernamePlaceholder:'Your Roblox username',
    usernameError:'Please enter a valid Roblox username (3–20 characters).',
    confirmText:'I confirm that I will <strong>appear in the park on time</strong> at the selected slot.',
    checkboxError:'Please confirm your attendance.',
    btnCancel:'Cancel', btnConfirm:'Confirm Booking', btnSending:'Sending...',
    successTitle:'Booking Successful!',
    successDesc:'Your session has been reserved. We look forward to your visit at Phantasialand – Roblox!',
    summaryUsername:'Roblox Username', summaryDate:'Date', summaryTime:'Time',
    summaryDuration:'Session Duration', summaryMinutes:'Minutes',
    btnClose:'Close', errorTitle:'An Error Occurred',
    errorGeneric:'Something went wrong. Please try again.',
    errorFull:'This slot was just fully booked. Please choose another time.',
    btnBack:'Back',
    footerDisclaimerTitle:'Legal Notice:',
    footerDisclaimer:' Phantasialand – Roblox is an unofficial fan project on the Roblox platform and has no connection whatsoever with the real Phantasialand Freizeit- und Erlebnispark GmbH & Co. KG in Brühl. All trademarks, names, logos and rights of the real Phantasialand are the property of their respective owners. This project is an independent, non-commercial fan experience and is not supported or endorsed by Phantasialand.',
    langSwitch:'DE', footerCopy:'Fan Project',
  },
  de: {
    navHome:'Startseite', navWorlds:'Themenwelten', navBook:'Buchen', navCta:'Jetzt buchen',
    heroBadge:'Offizieller Roblox-Park',
    heroSubText:'Willkommen im aufregendsten Freizeitpark auf Roblox –\nbuche jetzt deine exklusive Session und erlebe die Magie.',
    heroBtn1:'Session buchen', heroBtn2:'Themenwelten entdecken',
    statPlayers:'Spieler pro Session', statDuration:'Minuten Spielzeit', statWorlds:'Themenwelten',
    parkStatusOpen:'Der Park ist aktuell', parkStatusOpenWord:'GEÖFFNET',
    parkStatusClosed:'Der Park ist aktuell', parkStatusClosedWord:'GESCHLOSSEN',
    parkClosedHeroText:'Der Park ist aktuell geschlossen. Wir freuen uns, dich bald begrüßen zu dürfen.',
    ticketSalesOff:'Der Ticketverkauf ist aktuell nicht verfügbar.',
    waitLabel:'Heute', waitTitle:'Wartezeiten', waitDesc:'Aktuelle geschätzte Wartezeiten für unsere Attraktionen.',
    waitLow:'Kurz', waitMedium:'Mittel', waitHigh:'Lang', waitMin:'Min',
    tabCoasters:'Achterbahnen', tabFlatRides:'Fahrgeschäfte',
    worldsLabel:'Entdecken', worldsTitle:'Unsere Themenwelten',
    worldsDesc:'Jeder Bereich des Parks erzählt eine einzigartige Geschichte – tauche ein und erlebe sie alle.',
    trailerLabel:'Erleben', trailerTitle:'Park Trailer',
    trailerDesc:'Verschaffe dir einen ersten Eindruck vom magischsten Roblox-Park.',
    bookLabel:'Reservierung', bookTitle:'Session buchen',
    bookDesc:'Wähle deinen Wunschtag aus dem Kalender und anschließend einen verfügbaren Zeitslot.',
    slotsPlaceholder:'Wähle einen markierten Tag, um die verfügbaren Zeitslots zu sehen.',
    slotBook:'Buchen', slotFull:'Ausgebucht', slotFree:'frei', slotFullLabel:'ausgebucht',
    visitorRateLow:'Geringes Aufkommen', visitorRateMedium:'Mittleres Aufkommen', visitorRateHigh:'Hohes Aufkommen',
    calMonths:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    calWeekdays:['Mo','Di','Mi','Do','Fr','Sa','So'],
    maxPlayers:'Max.', players:'Spieler', minutes:'Minuten',
    modalTitle:'Session buchen', modalSubtitle:'Fülle das Formular aus und bestätige deine Buchung.',
    detailDate:'Datum', detailTime:'Uhrzeit', detailDuration:'Dauer', detailCapacity:'Kapazität',
    sessionNoteText:'Jede Session dauert genau', sessionNote2:'Minuten. Bitte sei pünktlich.',
    usernameLabel:'Roblox-Benutzername', usernamePlaceholder:'Dein Roblox-Username',
    usernameError:'Bitte gib einen gültigen Roblox-Benutzernamen ein (3–20 Zeichen).',
    confirmText:'Ich bestätige, dass ich zum gewählten Zeitpunkt <strong>pünktlich im Park erscheinen werde</strong>.',
    checkboxError:'Bitte bestätige deine Teilnahme.',
    btnCancel:'Abbrechen', btnConfirm:'Buchung bestätigen', btnSending:'Wird gesendet...',
    successTitle:'Buchung erfolgreich!',
    successDesc:'Deine Session wurde reserviert. Wir freuen uns auf deinen Besuch!',
    summaryUsername:'Roblox-Username', summaryDate:'Datum', summaryTime:'Uhrzeit',
    summaryDuration:'Session-Dauer', summaryMinutes:'Minuten',
    btnClose:'Schließen', errorTitle:'Fehler aufgetreten',
    errorGeneric:'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    errorFull:'Dieser Slot wurde gerade ausgebucht. Bitte wähle einen anderen.',
    btnBack:'Zurück',
    footerDisclaimerTitle:'Rechtlicher Hinweis:',
    footerDisclaimer:' Phantasialand – Roblox ist ein inoffizielles Fan-Projekt auf Roblox und steht in keinerlei Verbindung mit dem echten Phantasialand Freizeit- und Erlebnispark GmbH & Co. KG in Brühl. Alle Marken, Namen, Logos und Rechte des realen Phantasialand sind Eigentum der jeweiligen Rechteinhaber. Dieses Projekt ist ein unabhängiges, nicht-kommerzielles Fan-Erlebnis und wird weder von Phantasialand unterstützt noch genehmigt.',
    langSwitch:'EN', footerCopy:'Fan-Projekt',
  }
};

window.PLA_LANG = localStorage.getItem('pla_lang') || 'en';
window.T = function(k){ return (LANG_STRINGS[window.PLA_LANG]||LANG_STRINGS.en)[k]||k; };

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
  applyLang();
  applySettings();
  initStatusBanner();
  initNavbar();
  initParticles();
  initHeroActions();
  initWaitTimes();
  initThemeWorlds();
  initTrailer();
  initBookingVisibility();
  initReveal();
  initFooter();
  initLangToggle();
});

// ════════════════════════════════════════════════════════════
//  LANGUAGE
// ════════════════════════════════════════════════════════════
function applyLang(){
  document.documentElement.lang = window.PLA_LANG;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var v = T(el.getAttribute('data-i18n'));
    if(v) el.textContent = v;
  });
  // Weekdays
  var wd = document.getElementById('calWeekdays');
  if(wd){
    var days = T('calWeekdays');
    wd.querySelectorAll('span').forEach(function(s,i){ if(Array.isArray(days)&&days[i]) s.textContent=days[i]; });
  }
  var lt = document.getElementById('langToggleLabel');
  if(lt) lt.textContent = T('langSwitch');
}

function initLangToggle(){
  var btn = document.getElementById('langToggle');
  if(!btn) return;
  btn.addEventListener('click', function(){
    window.PLA_LANG = window.PLA_LANG==='en'?'de':'en';
    localStorage.setItem('pla_lang', window.PLA_LANG);
    applyLang(); applySettings(); initStatusBanner(); initHeroActions();
    initWaitTimes(); initThemeWorlds(); initTrailer(); initFooter();
    initBookingVisibility();
    if(typeof window.PLA_BOOKING_REINIT==='function') window.PLA_BOOKING_REINIT();
  });
}

// ════════════════════════════════════════════════════════════
//  SETTINGS → DOM
// ════════════════════════════════════════════════════════════
function applySettings(){
  var s = SETTINGS;
  document.title = s.parkName + ' – Roblox';
  var map = { navLogoMain:s.parkName, heroTitleMain:s.parkName, footerLogoMain:s.parkName,
               statDuration:s.sessionDurationMinutes, statWorlds:s.themeWorlds.length };
  Object.keys(map).forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=map[id];
  });
  var hs=document.getElementById('heroSubText');
  if(hs) hs.innerHTML=T('heroSubText').replace('\n','<br>');
  var ft=document.getElementById('footerTagline'); if(ft) ft.textContent=s.parkTagline;
  var hbg=document.getElementById('heroBgImg');
  if(hbg&&s.heroBackgroundUrl) hbg.style.backgroundImage="url('"+s.heroBackgroundUrl+"')";
}

// ════════════════════════════════════════════════════════════
//  STATUS BANNER
// ════════════════════════════════════════════════════════════
function initStatusBanner(){
  var banner=document.getElementById('statusBanner');
  var text  =document.getElementById('statusText');
  if(!banner||!text) return;
  if(SETTINGS.parkOpen){
    banner.className='park-open';
    text.innerHTML=T('parkStatusOpen')+' <strong>'+T('parkStatusOpenWord')+'</strong>';
  } else {
    banner.className='park-closed';
    text.innerHTML=T('parkStatusClosed')+' <strong>'+T('parkStatusClosedWord')+'</strong>';
  }
  var ch=document.getElementById('parkClosedHero');
  if(ch){ var sp=ch.querySelector('span'); if(sp) sp.textContent=T('parkClosedHeroText'); }
}

// ════════════════════════════════════════════════════════════
//  HERO ACTIONS
// ════════════════════════════════════════════════════════════
function initHeroActions(){
  var actions=document.getElementById('heroActions');
  var closed =document.getElementById('parkClosedHero');
  if(!actions) return;
  actions.innerHTML='';
  if(!SETTINGS.parkOpen){
    actions.style.display='none';
    if(closed){ closed.style.display='flex'; closed.classList.add('revealed'); }
    return;
  }
  actions.style.display='flex';
  if(closed) closed.style.display='none';
  if(SETTINGS.ticketSalesActive){
    actions.innerHTML=
      '<button class="btn-primary" onclick="smoothScrollTo(\'buchen\')">'+
        '<i class="fa-solid fa-ticket"></i> '+T('heroBtn1')+
      '</button>'+
      '<button class="btn-outline" onclick="smoothScrollTo(\'themenwelten\')">'+
        '<i class="fa-solid fa-compass"></i> '+T('heroBtn2')+
      '</button>';
  } else {
    actions.innerHTML=
      '<button class="btn-outline" onclick="smoothScrollTo(\'themenwelten\')">'+
        '<i class="fa-solid fa-compass"></i> '+T('heroBtn2')+
      '</button>';
  }
}

// ════════════════════════════════════════════════════════════
//  BOOKING VISIBILITY
// ════════════════════════════════════════════════════════════
function initBookingVisibility(){
  var container =document.getElementById('bookingContainer');
  var notice    =document.getElementById('ticketsInactiveNotice');
  var navBook   =document.getElementById('navBookLink');
  var mobBook   =document.getElementById('mobileBookLink');
  var navCta    =document.getElementById('navCtaBtn');
  var navCtaMob =document.getElementById('navCtaMobile');
  var footBook  =document.getElementById('footerBookLink');
  var np        =notice?notice.querySelector('[data-i18n]'):null;
  if(np) np.textContent=T('ticketSalesOff');

  var show = SETTINGS.ticketSalesActive;
  if(container)  container.style.display  = show?'':'none';
  if(notice)     notice.style.display     = show?'none':'';
  if(navBook)    navBook.style.display    = show?'':'none';
  if(mobBook)    mobBook.style.display    = show?'':'none';
  if(navCta)     navCta.style.display     = show?'':'none';
  if(navCtaMob)  navCtaMob.style.display  = show?'':'none';
  if(footBook)   footBook.style.display   = show?'':'none';
}

// ════════════════════════════════════════════════════════════
//  WAIT TIMES – categorized
// ════════════════════════════════════════════════════════════
function initWaitTimes(){
  var section=document.getElementById('wartezeiten');
  if(!section) return;

  // Update text
  var sl=section.querySelector('.section-label span');
  var st=section.querySelector('.section-title');
  var sd=section.querySelector('.section-desc');
  if(sl) sl.textContent=T('waitLabel');
  if(st) st.textContent=T('waitTitle');
  if(sd) sd.textContent=T('waitDesc');

  // Update tab labels
  var tabs=document.querySelectorAll('.wt-tab span[data-i18n]');
  tabs.forEach(function(el){ el.textContent=T(el.getAttribute('data-i18n')); });

  var coasters  = SETTINGS.rollercoasters||[];
  var flatRides = SETTINGS.flatRides||[];
  var hasAny    = coasters.length||flatRides.length;
  section.style.display = hasAny?'':'none';
  if(!hasAny) return;

  // Hide tabs if only one category
  var tabsEl = document.getElementById('wtTabs');
  if(tabsEl) tabsEl.style.display = (coasters.length&&flatRides.length)?'':'none';

  // Legend
  var legend=document.getElementById('waitLegend');
  if(legend){
    legend.innerHTML=
      '<div class="wt-legend-item"><div class="ld ld-low"></div>'+T('waitLow')+' (0–'+SETTINGS.waitTimeLow+' '+T('waitMin')+')</div>'+
      '<div class="wt-legend-item"><div class="ld ld-medium"></div>'+T('waitMedium')+' ('+(SETTINGS.waitTimeLow+1)+'–'+SETTINGS.waitTimeMedium+' '+T('waitMin')+')</div>'+
      '<div class="wt-legend-item"><div class="ld ld-high"></div>'+T('waitHigh')+' (&gt;'+SETTINGS.waitTimeMedium+' '+T('waitMin')+')</div>';
  }

  renderWtGrid('gridCoasters', coasters, 'fa-tornado');
  renderWtGrid('gridFlatrides', flatRides, 'fa-star-of-life');

  // If only flat rides, auto-switch tab
  if(!coasters.length && flatRides.length) switchWtTab('flatrides');

  refreshReveal();
}

function renderWtGrid(gridId, items, categoryIcon){
  var grid = document.getElementById(gridId);
  if(!grid) return;
  grid.innerHTML='';
  items.forEach(function(item){
    var tier  = wtTier(item.minutes);
    var tierL = T('wait'+tier.charAt(0).toUpperCase()+tier.slice(1));
    var icon  = tier==='low'?'fa-person-walking':tier==='medium'?'fa-person-running':'fa-fire';
    var card  = document.createElement('div');
    card.className='wt-card wt-'+tier+' reveal-up';
    card.innerHTML=
      '<div class="wt-icon"><i class="fa-solid '+icon+'"></i></div>'+
      '<div class="wt-info">'+
        '<div class="wt-name">'+esc(item.name)+'</div>'+
        '<div class="wt-tier">'+tierL+'</div>'+
      '</div>'+
      '<div class="wt-minutes">'+
        '<div class="wt-num">'+item.minutes+'</div>'+
        '<div class="wt-unit">'+T('waitMin')+'</div>'+
      '</div>';
    grid.appendChild(card);
  });
}

function wtTier(m){
  if(m<=(SETTINGS.waitTimeLow||20)) return 'low';
  if(m<=(SETTINGS.waitTimeMedium||45)) return 'medium';
  return 'high';
}

// Tab switch (globally accessible from HTML onclick)
window.switchWtTab = function(tab){
  document.querySelectorAll('.wt-tab').forEach(function(b){ b.classList.toggle('active', b.dataset.tab===tab); });
  document.querySelectorAll('.wt-panel').forEach(function(p){ p.classList.toggle('active', p.id==='panel'+tab.charAt(0).toUpperCase()+tab.slice(1)); });
};

// ════════════════════════════════════════════════════════════
//  THEME WORLDS
// ════════════════════════════════════════════════════════════
function initThemeWorlds(){
  var grid=document.getElementById('worldsGrid');
  if(!grid) return;
  var sec=document.getElementById('themenwelten');
  if(sec){
    var sl=sec.querySelector('.section-label span');
    var st=sec.querySelector('.section-title');
    var sd=sec.querySelector('.section-desc');
    if(sl) sl.textContent=T('worldsLabel');
    if(st) st.textContent=T('worldsTitle');
    if(sd) sd.textContent=T('worldsDesc');
  }
  grid.innerHTML='';
  (SETTINGS.themeWorlds||[]).forEach(function(w,i){
    var card=document.createElement('div');
    card.className='world-card reveal-up';
    card.style.setProperty('--delay',(i*0.09)+'s');
    card.innerHTML=
      '<div class="card-corner"></div>'+
      '<div class="card-img-wrap">'+
        '<img class="card-img" src="'+esc(w.imageUrl)+'" alt="'+esc(w.title)+'" loading="lazy" '+
          'onerror="this.src=\'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800\'">' +
        '<div class="card-img-overlay"></div>'+
        '<div class="card-title-over"><span class="card-title-line"></span>'+esc(w.title)+'</div>'+
      '</div>'+
      '<div class="card-body"><p class="card-desc">'+esc(w.description)+'</p></div>';
    grid.appendChild(card);
  });
  refreshReveal();
}

// ════════════════════════════════════════════════════════════
//  TRAILER
// ════════════════════════════════════════════════════════════
function initTrailer(){
  var sec   =document.getElementById('trailer');
  var iframe=document.getElementById('trailerIframe');
  if(!sec||!iframe) return;
  var sl=sec.querySelector('.section-label span');
  var st=sec.querySelector('.section-title');
  var sd=sec.querySelector('.section-desc');
  if(sl) sl.textContent=T('trailerLabel');
  if(st) st.textContent=T('trailerTitle');
  if(sd) sd.textContent=T('trailerDesc');
  var url=(SETTINGS.trailerUrl||'').trim();
  if(!url){ sec.style.display='none'; return; }
  sec.style.display='';
  iframe.src=toEmbed(url);
}

function toEmbed(u){
  if(u.includes('/embed/')) return u;
  var m=u.match(/youtu\.be\/([^?&]+)/); if(m) return 'https://www.youtube.com/embed/'+m[1];
  var n=u.match(/[?&]v=([^?&]+)/);     if(n) return 'https://www.youtube.com/embed/'+n[1];
  return u;
}

// ════════════════════════════════════════════════════════════
//  NAVBAR
// ════════════════════════════════════════════════════════════
function initNavbar(){
  var nb=document.getElementById('navbar');
  var tg=document.getElementById('navToggle');
  var mm=document.getElementById('navMobile');
  window.addEventListener('scroll',function(){
    nb.classList.toggle('scrolled',window.scrollY>60);
  },{passive:true});
  tg.addEventListener('click',function(){
    var open=mm.classList.toggle('open');
    tg.querySelector('i').className=open?'fa-solid fa-xmark':'fa-solid fa-bars';
  });
  document.addEventListener('click',function(e){
    if(!nb.contains(e.target)) closeMobileMenu();
  });
}

window.closeMobileMenu=function(){
  var m=document.getElementById('navMobile');
  var t=document.getElementById('navToggle');
  if(m) m.classList.remove('open');
  if(t) t.querySelector('i').className='fa-solid fa-bars';
};

window.smoothScrollTo=function(id){
  var el=document.getElementById(id); if(!el) return;
  // Account for status banner + navbar height
  var navH = document.getElementById('navbar');
  var offset = 90;
  window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-offset,behavior:'smooth'});
};

// ════════════════════════════════════════════════════════════
//  PARTICLES (golden sparkles on hero)
// ════════════════════════════════════════════════════════════
function initParticles(){
  var cv=document.getElementById('particleCanvas'); if(!cv) return;
  var ctx=cv.getContext('2d');
  var W,H,pts;
  var cols=['rgba(255,215,40,','rgba(255,235,100,','rgba(248,195,30,','rgba(255,248,160,','rgba(230,180,20,'];

  function resize(){ W=cv.width=cv.offsetWidth; H=cv.height=cv.offsetHeight; }
  resize();
  window.addEventListener('resize',function(){ resize(); pts=mkPts(); },{passive:true});

  function mkP(){
    return{
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.3, vy:-(Math.random()*.55+.18),
      r:Math.random()*2.2+.4,
      a:Math.random()*.5+.1,
      c:cols[Math.floor(Math.random()*cols.length)],
      ts:Math.random()*.022+.007,
      td:Math.random()>.5?1:-1,
      star:Math.random()>.68,
    };
  }
  function mkPts(){ return Array.from({length:Math.min(Math.floor(W*H/11000),100)},mkP); }
  pts=mkPts();

  function dstar(x,y,r,a,c){
    ctx.save(); ctx.translate(x,y); ctx.rotate(performance.now()*.00025);
    ctx.beginPath();
    for(var i=0;i<4;i++){
      var ang=i*Math.PI/2;
      ctx.lineTo(Math.cos(ang)*r,Math.sin(ang)*r);
      ctx.lineTo(Math.cos(ang+Math.PI/4)*r*.38,Math.sin(ang+Math.PI/4)*r*.38);
    }
    ctx.closePath();
    ctx.fillStyle=c+a+')';
    ctx.shadowBlur=5; ctx.shadowColor=c+'.7)'; ctx.fill(); ctx.restore();
  }

  (function loop(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(function(p){
      p.x+=p.vx; p.y+=p.vy;
      p.a+=p.ts*p.td;
      if(p.a>.7||p.a<.05) p.td*=-1;
      if(p.y<-8||p.x<-8||p.x>W+8){ p.x=Math.random()*W; p.y=H+4; p.a=.08; }
      if(p.star){ dstar(p.x,p.y,p.r*1.4,p.a,p.c); }
      else {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c+p.a+')';
        ctx.shadowBlur=p.r*3.5; ctx.shadowColor=p.c+'.5)'; ctx.fill(); ctx.shadowBlur=0;
      }
    });
    requestAnimationFrame(loop);
  })();
}

// ════════════════════════════════════════════════════════════
//  SCROLL REVEAL
// ════════════════════════════════════════════════════════════
var _obs=null;
function initReveal(){
  _obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('revealed'); _obs.unobserve(e.target); }
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal-up').forEach(function(el){ _obs.observe(el); });
}
function refreshReveal(){
  if(!_obs) return;
  document.querySelectorAll('.reveal-up:not(.revealed)').forEach(function(el){ _obs.observe(el); });
}

// ════════════════════════════════════════════════════════════
//  FOOTER
// ════════════════════════════════════════════════════════════
function initFooter(){
  var yr=document.getElementById('footerYear'); if(yr) yr.textContent=new Date().getFullYear();
  var dt=document.getElementById('footerDisclTitle');
  var dp=document.getElementById('footerDisclText');
  if(dt) dt.textContent=T('footerDisclaimerTitle');
  if(dp) dp.textContent=T('footerDisclaimer');
  var ft=document.getElementById('footerTagline'); if(ft) ft.textContent=SETTINGS.parkTagline;
  var fc=document.getElementById('footerCopyText');
  if(fc) fc.innerHTML='&copy; '+new Date().getFullYear()+' Phantasialand – Roblox &nbsp;|&nbsp; '+T('footerCopy');
}

// ── Helpers ──────────────────────────────────────────────
function esc(s){
  if(!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
