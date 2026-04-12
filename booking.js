// ════════════════════════════════════════════════════════════
//  BOOKING.JS – Calendar, Slots, Modal, Webhook
// ════════════════════════════════════════════════════════════

(function(){
'use strict';

var cy = new Date().getFullYear();
var cm = new Date().getMonth();
var selDate = null;
var selSlot = null;

document.addEventListener('DOMContentLoaded',function(){
  if(!SETTINGS.ticketSalesActive) return;
  jumpFirst();
  renderCal();
  bindNav();
  initModal();
});

window.PLA_BOOKING_REINIT = function(){
  renderCal();
  if(selDate) renderSlots(selDate);
};

// ─── Jump to first available month ───────────────────────
function jumpFirst(){
  if(!SETTINGS.bookingDates||!SETTINGS.bookingDates.length) return;
  var today=todayStr();
  var future=SETTINGS.bookingDates
    .filter(function(d){return d.date>=today;})
    .sort(function(a,b){return a.date.localeCompare(b.date);});
  if(future.length){ var p=future[0].date.split('-'); cy=+p[0]; cm=+p[1]-1; }
}

// ─── Calendar ────────────────────────────────────────────
function renderCal(){
  var label=document.getElementById('calMonthLabel');
  var grid =document.getElementById('calGrid');
  var wd   =document.getElementById('calWeekdays');
  if(!label||!grid) return;

  var months=T('calMonths');
  label.textContent=(Array.isArray(months)?months[cm]:'')+' '+cy;

  if(wd){
    var days=T('calWeekdays');
    wd.querySelectorAll('span').forEach(function(s,i){ if(Array.isArray(days)&&days[i]) s.textContent=days[i]; });
  }

  grid.innerHTML='';
  var first=new Date(cy,cm,1).getDay();
  var off  =first===0?6:first-1;
  var dim  =new Date(cy,cm+1,0).getDate();
  var today=todayStr();
  var avail=availForMonth(cy,cm);

  for(var i=0;i<off;i++){
    var e=document.createElement('div'); e.className='cal-day empty'; grid.appendChild(e);
  }
  for(var d=1;d<=dim;d++){
    var ds=fmtDate(cy,cm+1,d);
    var btn=document.createElement('button');
    btn.textContent=d; btn.type='button';
    btn.setAttribute('aria-label',fmtDateLong(ds));

    var isPast =ds<today;
    var isToday=ds===today;
    var isAvail=avail.includes(ds);
    var isSel  =ds===selDate;
    var isFull =isAvail&&isDayFull(ds);

    var cls='cal-day';
    if(isPast){ cls+=' past'; }
    else if(isAvail){
      cls+=' available';
      if(isFull) cls+=' full-day';
      if(isSel)  cls+=' selected';
      ;(function(x){btn.addEventListener('click',function(){selectDate(x);});})(ds);
    } else { btn.disabled=true; }
    if(isToday) cls+=' today';
    btn.className=cls;
    grid.appendChild(btn);
  }
}

function availForMonth(y,m){
  return (SETTINGS.bookingDates||[])
    .filter(function(d){var p=d.date.split('-');return +p[0]===y&&+p[1]-1===m;})
    .map(function(d){return d.date;});
}

// ─── Select date ─────────────────────────────────────────
function selectDate(ds){ selDate=ds; selSlot=null; renderCal(); renderSlots(ds); }

function renderSlots(ds){
  var ph  =document.getElementById('slotsPlaceholder');
  var list=document.getElementById('slotsList');
  var dtEl=document.getElementById('slotsDateTitle');
  var items=document.getElementById('slotsItems');
  if(!ph||!list||!items) return;

  var entry=(SETTINGS.bookingDates||[]).find(function(d){return d.date===ds;});
  if(!entry) return;

  ph.style.display='none'; list.style.display='block';
  var phP=ph.querySelector('p'); if(phP) phP.textContent=T('slotsPlaceholder');
  if(dtEl){ var sp=dtEl.querySelector('span'); if(sp) sp.textContent=fmtDateLong(ds); }

  items.innerHTML='';
  if(!entry.slots||!entry.slots.length){
    items.innerHTML='<p style="color:var(--text-muted);font-size:.88rem;">No time slots available.</p>';
    return;
  }

  entry.slots.forEach(function(slot){
    var booked=bCount(ds,slot.time);
    var max   =slot.maxPlayers||5;
    var free  =Math.max(0,max-booked);
    var full  =free===0;
    var rate  =slot.visitorRate||'low';
    var rIcon =rate==='low'?'fa-user':rate==='medium'?'fa-users':'fa-users-rectangle';
    var rLbl  =T('visitorRate'+rate.charAt(0).toUpperCase()+rate.slice(1));

    var item=document.createElement('div');
    item.className='slot-item '+(full?'full':'available');

    var dots='<div class="slot-dots">';
    for(var k=0;k<max;k++) dots+='<div class="slot-dot'+(k<booked?' filled':'')+'"></div>';
    dots+='</div>';

    var action=full
      ?'<div class="slot-full-badge"><i class="fa-solid fa-ban"></i> '+T('slotFull')+'</div>'
      :'<button class="slot-btn" type="button" onclick="openBookingModal(\''+s(ds)+'\',\''+s(slot.time)+'\','+max+')">'+
          T('slotBook')+' <i class="fa-solid fa-arrow-right"></i>'+
        '</button>';

    item.innerHTML=
      '<div class="slot-time"><i class="fa-regular fa-clock"></i> '+s(slot.time)+'</div>'+
      '<div class="slot-availability">'+dots+
        '<div class="slot-numbers">'+
          '<span class="slot-spots">'+free+'/'+max+'</span>'+
          '<span class="slot-label">'+(full?T('slotFullLabel'):T('slotFree'))+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="vrate-badge vrate-'+rate+'">'+
        '<i class="fa-solid '+rIcon+'"></i>'+rLbl+
      '</div>'+
      action;

    items.appendChild(item);
  });
}

// ─── Modal init ──────────────────────────────────────────
function initModal(){
  var ov=document.getElementById('bookingModal');
  var cl=document.getElementById('modalClose');
  if(cl) cl.addEventListener('click',closeModal);
  if(ov) ov.addEventListener('click',function(e){if(e.target===ov) closeModal();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeModal();});

  // Swipe down to close on mobile
  var startY=0;
  var card=ov?ov.querySelector('.modal-card'):null;
  if(card){
    card.addEventListener('touchstart',function(e){startY=e.touches[0].clientY;},{passive:true});
    card.addEventListener('touchend',function(e){
      if(e.changedTouches[0].clientY-startY>80) closeModal();
    },{passive:true});
  }
}

// ─── Open modal ──────────────────────────────────────────
window.openBookingModal=function(ds,time,max){
  selSlot={date:ds,time:time,maxPlayers:max};
  var ov=document.getElementById('bookingModal');
  var ct=document.getElementById('modalContent');
  if(!ov||!ct) return;
  var dur=SETTINGS.sessionDurationMinutes||30;
  var dl=fmtDateLong(ds);

  ct.innerHTML=
    '<div class="modal-header">'+
      '<div class="modal-icon"><i class="fa-solid fa-ticket"></i></div>'+
      '<h2 id="modalTitle">'+T('modalTitle')+'</h2>'+
      '<p>'+T('modalSubtitle')+'</p>'+
    '</div>'+
    '<div class="booking-detail-box">'+
      dItem('fa-regular fa-calendar',T('detailDate'),s(dl))+
      dItem('fa-regular fa-clock',T('detailTime'),s(time))+
      dItem('fa-solid fa-hourglass-half',T('detailDuration'),dur+' '+T('minutes'))+
      dItem('fa-solid fa-users',T('detailCapacity'),T('maxPlayers')+' '+max+' '+T('players'))+
    '</div>'+
    '<div class="session-note">'+
      '<i class="fa-solid fa-circle-info"></i>'+
      '<span>'+T('sessionNoteText')+' <strong style="color:var(--gold-dark)">'+dur+' '+T('minutes')+'</strong>. '+T('sessionNote2')+'</span>'+
    '</div>'+
    '<div class="form-group">'+
      '<label class="form-label" for="rblxUser">'+
        '<i class="fa-solid fa-user" style="margin-right:.3rem;color:var(--gold)"></i>'+
        T('usernameLabel')+
      '</label>'+
      '<input type="text" id="rblxUser" class="form-input" placeholder="'+T('usernamePlaceholder')+'" '+
        'maxlength="20" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off">'+
      '<span class="form-error" id="uErr"><i class="fa-solid fa-circle-exclamation"></i> '+T('usernameError')+'</span>'+
    '</div>'+
    '<label class="checkbox-group" id="cbGroup">'+
      '<input type="checkbox" id="cbAppear">'+
      '<span class="checkbox-custom"><i class="fa-solid fa-check"></i></span>'+
      '<span class="checkbox-label">'+T('confirmText')+'</span>'+
    '</label>'+
    '<span class="form-error" id="cbErr" style="margin-top:-.9rem;margin-bottom:1.1rem">'+
      '<i class="fa-solid fa-circle-exclamation"></i> '+T('checkboxError')+
    '</span>'+
    '<div class="modal-actions">'+
      '<button class="btn-cancel" type="button" onclick="closeBookingModal()">'+T('btnCancel')+'</button>'+
      '<button class="btn-confirm" type="button" id="confBtn" onclick="submitBooking()">'+
        '<i class="fa-solid fa-check"></i> '+T('btnConfirm')+
      '</button>'+
    '</div>';

  ov.classList.add('active');
  document.body.style.overflow='hidden';
  setTimeout(function(){
    var inp=document.getElementById('rblxUser');
    if(inp){
      inp.focus();
      inp.addEventListener('keydown',function(e){if(e.key==='Enter') submitBooking();});
    }
  },260);
};

function dItem(icon,label,val){
  return '<div class="detail-item">'+
    '<span class="detail-label"><i class="'+icon+'"></i> '+label+'</span>'+
    '<span class="detail-value">'+val+'</span>'+
  '</div>';
}

window.closeBookingModal=function(){closeModal();};
function closeModal(){
  var ov=document.getElementById('bookingModal');
  if(ov) ov.classList.remove('active');
  document.body.style.overflow='';
}

// ─── Submit ──────────────────────────────────────────────
window.submitBooking=function(){
  var inp=document.getElementById('rblxUser');
  var cb =document.getElementById('cbAppear');
  var uE =document.getElementById('uErr');
  var cE =document.getElementById('cbErr');
  var btn=document.getElementById('confBtn');
  if(!inp||!cb) return;

  var ok=true;
  var user=inp.value.trim();
  if(!validUser(user)){
    inp.classList.add('error'); if(uE) uE.classList.add('visible'); ok=false;
  } else { inp.classList.remove('error'); if(uE) uE.classList.remove('visible'); }

  if(!cb.checked){
    var g=document.getElementById('cbGroup'); if(g) g.classList.add('error');
    if(cE) cE.classList.add('visible'); ok=false;
  } else {
    var g2=document.getElementById('cbGroup'); if(g2) g2.classList.remove('error');
    if(cE) cE.classList.remove('visible');
  }
  if(!ok||!selSlot) return;

  if(bCount(selSlot.date,selSlot.time)>=selSlot.maxPlayers){ showResult('error',T('errorFull')); return; }

  if(btn){ btn.disabled=true; btn.innerHTML='<span style="display:inline-flex;align-items:center;gap:.45rem"><span class="spinner"></span>'+T('btnSending')+'</span>'; }

  var booking={username:user,date:selSlot.date,time:selSlot.time,maxPlayers:selSlot.maxPlayers};
  sendWebhook(booking)
    .then(function(){finish(booking);})
    .catch(function(){finish(booking);});
};

function finish(bk){
  saveB(bk.date,bk.time,bk.username);
  showResult('success',null,bk);
  renderCal();
  if(selDate) renderSlots(selDate);
}

// ─── Result ──────────────────────────────────────────────
function showResult(type,msg,bk){
  var ct=document.getElementById('modalContent'); if(!ct) return;
  if(type==='success'&&bk){
    var dur=SETTINGS.sessionDurationMinutes||30;
    ct.innerHTML=
      '<div class="result-state">'+
        '<div class="result-icon success"><i class="fa-solid fa-check"></i></div>'+
        '<div class="result-title success">'+T('successTitle')+'</div>'+
        '<p class="result-desc">'+T('successDesc')+'</p>'+
        '<div class="result-summary">'+
          row(T('summaryUsername'),s(bk.username))+
          row(T('summaryDate'),fmtDateLong(bk.date))+
          row(T('summaryTime'),s(bk.time))+
          row(T('summaryDuration'),dur+' '+T('summaryMinutes'))+
        '</div>'+
        '<button class="btn-confirm" style="width:100%" onclick="closeBookingModal()">'+
          '<i class="fa-solid fa-xmark"></i> '+T('btnClose')+
        '</button>'+
      '</div>';
  } else {
    ct.innerHTML=
      '<div class="result-state">'+
        '<div class="result-icon error"><i class="fa-solid fa-xmark"></i></div>'+
        '<div class="result-title error">'+T('errorTitle')+'</div>'+
        '<p class="result-desc">'+(msg||T('errorGeneric'))+'</p>'+
        '<button class="btn-cancel" style="width:100%" onclick="closeBookingModal()">'+
          '<i class="fa-solid fa-arrow-left"></i> '+T('btnBack')+
        '</button>'+
      '</div>';
  }
}

function row(label,val){ return '<div class="result-summary-row"><span>'+label+'</span><span>'+val+'</span></div>'; }

// ─── Webhook ─────────────────────────────────────────────
function sendWebhook(bk){
  if(!SETTINGS.webhookUrl) return Promise.resolve();
  var dur=SETTINGS.sessionDurationMinutes||30;
  return fetch(SETTINGS.webhookUrl,{
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      username:'Phantasialand Roblox',
      embeds:[{
        title:'New Park Booking',
        description:'A new session has been reserved!',
        color:13326348,
        fields:[
          {name:'Roblox Username',value:bk.username,inline:true},
          {name:'Date',value:fmtDateLong(bk.date),inline:true},
          {name:'Time',value:bk.time,inline:true},
          {name:'Duration',value:dur+' minutes',inline:true},
          {name:'Max Players',value:'Max. '+bk.maxPlayers,inline:true},
        ],
        footer:{text:'Phantasialand – Roblox Park System'},
        timestamp:new Date().toISOString(),
      }]
    })
  }).then(function(r){ if(!r.ok&&r.status!==204) throw new Error('HTTP '+r.status); });
}

// ─── Calendar nav ─────────────────────────────────────────
function bindNav(){
  var prev=document.getElementById('prevMonth');
  var next=document.getElementById('nextMonth');
  if(prev) prev.addEventListener('click',function(){ cm--; if(cm<0){cm=11;cy--;} renderCal(); });
  if(next) next.addEventListener('click',function(){ cm++; if(cm>11){cm=0;cy++;} renderCal(); });
}

// ─── Local Storage ────────────────────────────────────────
function stk(d,t){ return 'pla_'+d+'_'+t.replace(':',''); }
function getB(d,t){ try{var r=localStorage.getItem(stk(d,t));return r?JSON.parse(r):[];}catch(e){return[];} }
function bCount(d,t){ return getB(d,t).length; }
function saveB(d,t,u){ try{var bk=getB(d,t);if(!bk.includes(u)){bk.push(u);localStorage.setItem(stk(d,t),JSON.stringify(bk));}}catch(e){} }
function isDayFull(ds){
  var entry=(SETTINGS.bookingDates||[]).find(function(d){return d.date===ds;});
  if(!entry||!entry.slots||!entry.slots.length) return false;
  return entry.slots.every(function(sl){return bCount(ds,sl.time)>=(sl.maxPlayers||5);});
}

// ─── Helpers ─────────────────────────────────────────────
function todayStr(){ var d=new Date(); return fmtDate(d.getFullYear(),d.getMonth()+1,d.getDate()); }
function fmtDate(y,m,d){ return y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0'); }
function fmtDateLong(ds){
  if(!ds) return '';
  var p=ds.split('-');
  var dt=new Date(+p[0],+p[1]-1,+p[2]);
  var loc=window.PLA_LANG==='de'?'de-DE':'en-GB';
  return dt.toLocaleDateString(loc,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function validUser(n){ return n&&n.length>=3&&n.length<=20&&/^[a-zA-Z0-9_]+$/.test(n); }
function s(str){
  if(!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

})();
