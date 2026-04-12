// ════════════════════════════════════════════════════════════
//  BOOKING.JS – Phantasialand Roblox
//  Calendar, time slots, booking modal, Discord webhook
// ════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var currentYear  = new Date().getFullYear();
  var currentMonth = new Date().getMonth();
  var selectedDate = null;
  var selectedSlot = null;

  // ── Init ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (!SETTINGS.ticketSalesActive) return;
    jumpToFirstAvailableMonth();
    renderCalendar();
    bindCalendarNav();
    initModal();
  });

  // Expose re-init for language switching
  window.PLA_BOOKING_REINIT = function () {
    renderCalendar();
    if (selectedDate) renderSlots(selectedDate);
  };

  // ════════════════════════════════════════════════════════
  //  JUMP TO FIRST AVAILABLE MONTH
  // ════════════════════════════════════════════════════════
  function jumpToFirstAvailableMonth() {
    if (!SETTINGS.bookingDates || !SETTINGS.bookingDates.length) return;
    var today  = todayStr();
    var future = SETTINGS.bookingDates
      .filter(function (d) { return d.date >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });
    if (future.length) {
      var parts    = future[0].date.split('-');
      currentYear  = parseInt(parts[0], 10);
      currentMonth = parseInt(parts[1], 10) - 1;
    }
  }

  // ════════════════════════════════════════════════════════
  //  CALENDAR
  // ════════════════════════════════════════════════════════
  function renderCalendar() {
    var label = document.getElementById('calMonthLabel');
    var grid  = document.getElementById('calGrid');
    var wd    = document.getElementById('calWeekdays');
    if (!label || !grid) return;

    // Month label
    var months = T('calMonths');
    label.textContent = (Array.isArray(months) ? months[currentMonth] : '') + ' ' + currentYear;

    // Weekday headers
    if (wd) {
      var weekdays = T('calWeekdays');
      var spans    = wd.querySelectorAll('span');
      if (Array.isArray(weekdays)) {
        weekdays.forEach(function (d, i) { if (spans[i]) spans[i].textContent = d; });
      }
    }

    grid.innerHTML = '';
    var firstDay    = new Date(currentYear, currentMonth, 1).getDay();
    var offset      = firstDay === 0 ? 6 : firstDay - 1;
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var today       = todayStr();
    var available   = getAvailableDatesForMonth(currentYear, currentMonth);

    for (var i = 0; i < offset; i++) {
      var empty = document.createElement('div');
      empty.className = 'cal-day empty';
      grid.appendChild(empty);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var dateStr    = formatDateStr(currentYear, currentMonth + 1, day);
      var btn        = document.createElement('button');
      btn.textContent = day;
      btn.type       = 'button';
      btn.setAttribute('aria-label', formatDateLong(dateStr));

      var isPast      = dateStr < today;
      var isToday     = dateStr === today;
      var isAvailable = available.includes(dateStr);
      var isSelected  = dateStr === selectedDate;
      var isFull      = isAvailable && isDayFull(dateStr);

      var cls = 'cal-day';
      if (isPast) {
        cls += ' past';
      } else if (isAvailable) {
        cls += ' available';
        if (isFull) cls += ' full-day';
        if (isSelected) cls += ' selected';
        ;(function (ds) { btn.addEventListener('click', function () { selectDate(ds); }); })(dateStr);
      } else {
        btn.disabled = true;
      }
      if (isToday) cls += ' today';
      btn.className = cls;
      grid.appendChild(btn);
    }
  }

  function getAvailableDatesForMonth(y, m) {
    return (SETTINGS.bookingDates || [])
      .filter(function (d) {
        var p = d.date.split('-');
        return parseInt(p[0]) === y && parseInt(p[1]) - 1 === m;
      })
      .map(function (d) { return d.date; });
  }

  // ════════════════════════════════════════════════════════
  //  SELECT DATE → SHOW SLOTS
  // ════════════════════════════════════════════════════════
  function selectDate(dateStr) {
    selectedDate = dateStr;
    selectedSlot = null;
    renderCalendar();
    renderSlots(dateStr);
  }

  function renderSlots(dateStr) {
    var placeholder = document.getElementById('slotsPlaceholder');
    var slotsList   = document.getElementById('slotsList');
    var dateTitle   = document.getElementById('slotsDateTitle');
    var slotsItems  = document.getElementById('slotsItems');
    if (!placeholder || !slotsList || !slotsItems) return;

    var entry = (SETTINGS.bookingDates || []).find(function (d) { return d.date === dateStr; });
    if (!entry) return;

    placeholder.style.display = 'none';
    slotsList.style.display   = 'block';

    // Update placeholder text while we're at it
    var ph = placeholder.querySelector('p');
    if (ph) ph.textContent = T('slotsPlaceholder');

    if (dateTitle) {
      var span = dateTitle.querySelector('span');
      if (span) span.textContent = formatDateLong(dateStr);
    }

    slotsItems.innerHTML = '';

    if (!entry.slots || !entry.slots.length) {
      slotsItems.innerHTML = '<p style="color:var(--text-muted);font-size:.88rem;">No time slots available.</p>';
      return;
    }

    entry.slots.forEach(function (slot) {
      var booked = getBookingCount(dateStr, slot.time);
      var max    = slot.maxPlayers || 5;
      var free   = Math.max(0, max - booked);
      var isFull = free === 0;
      var rate   = slot.visitorRate || 'low';

      var item = document.createElement('div');
      item.className = 'slot-item ' + (isFull ? 'full' : 'available');

      // Visitor rate badge
      var rateIcon = rate === 'low' ? 'fa-user' : rate === 'medium' ? 'fa-users' : 'fa-users-rectangle';
      var rateLbl  = T('visitorRate' + rate.charAt(0).toUpperCase() + rate.slice(1));
      var rateBadge =
        '<div class="vrate-badge vrate-' + rate + '">' +
          '<i class="fa-solid ' + rateIcon + '"></i>' + rateLbl +
        '</div>';

      // Dots
      var dots = '<div class="slot-dots">';
      for (var k = 0; k < max; k++) {
        dots += '<div class="slot-dot ' + (k < booked ? 'filled' : '') + '"></div>';
      }
      dots += '</div>';

      var action;
      if (isFull) {
        action = '<div class="slot-full-badge"><i class="fa-solid fa-ban"></i> ' + T('slotFull') + '</div>';
      } else {
        action =
          '<button class="slot-btn" type="button" ' +
            'onclick="openBookingModal(\'' + s(dateStr) + '\',\'' + s(slot.time) + '\',' + max + ')">' +
            T('slotBook') + ' <i class="fa-solid fa-arrow-right"></i>' +
          '</button>';
      }

      item.innerHTML =
        '<div class="slot-time"><i class="fa-regular fa-clock"></i> ' + s(slot.time) + '</div>' +
        '<div class="slot-availability">' + dots +
          '<div class="slot-numbers">' +
            '<span class="slot-spots">' + free + '/' + max + '</span>' +
            '<span class="slot-label">' + (isFull ? T('slotFullLabel') : T('slotFree')) + '</span>' +
          '</div>' +
        '</div>' +
        rateBadge +
        action;

      slotsItems.appendChild(item);
    });
  }

  // ════════════════════════════════════════════════════════
  //  MODAL
  // ════════════════════════════════════════════════════════
  function initModal() {
    var overlay  = document.getElementById('bookingModal');
    var closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  window.openBookingModal = function (dateStr, time, maxPlayers) {
    selectedSlot = { date: dateStr, time: time, maxPlayers: maxPlayers };
    var overlay  = document.getElementById('bookingModal');
    var content  = document.getElementById('modalContent');
    if (!overlay || !content) return;

    var dateLabel = formatDateLong(dateStr);
    var duration  = SETTINGS.sessionDurationMinutes || 30;

    content.innerHTML =
      '<div class="modal-header">' +
        '<div class="modal-icon"><i class="fa-solid fa-ticket"></i></div>' +
        '<h2 id="modalTitle">' + T('modalTitle') + '</h2>' +
        '<p>' + T('modalSubtitle') + '</p>' +
      '</div>' +
      '<div class="booking-detail-box">' +
        '<div class="detail-item">' +
          '<span class="detail-label"><i class="fa-regular fa-calendar"></i> ' + T('detailDate') + '</span>' +
          '<span class="detail-value">' + s(dateLabel) + '</span>' +
        '</div>' +
        '<div class="detail-item">' +
          '<span class="detail-label"><i class="fa-regular fa-clock"></i> ' + T('detailTime') + '</span>' +
          '<span class="detail-value">' + s(time) + '</span>' +
        '</div>' +
        '<div class="detail-item">' +
          '<span class="detail-label"><i class="fa-solid fa-hourglass-half"></i> ' + T('detailDuration') + '</span>' +
          '<span class="detail-value">' + duration + ' ' + T('minutes') + '</span>' +
        '</div>' +
        '<div class="detail-item">' +
          '<span class="detail-label"><i class="fa-solid fa-users"></i> ' + T('detailCapacity') + '</span>' +
          '<span class="detail-value">' + T('maxPlayers') + ' ' + maxPlayers + ' ' + T('players') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="session-note">' +
        '<i class="fa-solid fa-circle-info"></i>' +
        '<span>' + T('sessionNoteText') + ' <strong style="color:var(--gold)">' + duration + ' ' + T('minutes') + '</strong>. ' + T('sessionNote2') + '</span>' +
      '</div>' +
      '<div class="form-group">' +
        '<label class="form-label" for="robloxUsername">' +
          '<i class="fa-solid fa-user" style="margin-right:.3rem;color:var(--gold)"></i>' +
          T('usernameLabel') +
        '</label>' +
        '<input type="text" id="robloxUsername" class="form-input" ' +
          'placeholder="' + T('usernamePlaceholder') + '" maxlength="20" autocomplete="off" spellcheck="false">' +
        '<span class="form-error" id="usernameError">' +
          '<i class="fa-solid fa-circle-exclamation"></i> ' + T('usernameError') +
        '</span>' +
      '</div>' +
      '<label class="checkbox-group" id="confirmCheckboxGroup">' +
        '<input type="checkbox" id="confirmAppear">' +
        '<span class="checkbox-custom"><i class="fa-solid fa-check"></i></span>' +
        '<span class="checkbox-label">' + T('confirmText') + '</span>' +
      '</label>' +
      '<span class="form-error" id="checkboxError" style="margin-top:-.8rem;margin-bottom:1rem">' +
        '<i class="fa-solid fa-circle-exclamation"></i> ' + T('checkboxError') +
      '</span>' +
      '<div class="modal-actions">' +
        '<button class="btn-cancel" type="button" onclick="closeBookingModal()">' + T('btnCancel') + '</button>' +
        '<button class="btn-confirm" type="button" id="confirmBtn" onclick="submitBooking()">' +
          '<i class="fa-solid fa-check"></i> ' + T('btnConfirm') +
        '</button>' +
      '</div>';

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
      var inp = document.getElementById('robloxUsername');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') submitBooking(); });
      }
    }, 200);
  };

  window.closeBookingModal = function () { closeModal(); };

  function closeModal() {
    var overlay = document.getElementById('bookingModal');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ════════════════════════════════════════════════════════
  //  SUBMIT
  // ════════════════════════════════════════════════════════
  window.submitBooking = function () {
    var usernameInput = document.getElementById('robloxUsername');
    var confirmCb     = document.getElementById('confirmAppear');
    var usernameErr   = document.getElementById('usernameError');
    var checkboxErr   = document.getElementById('checkboxError');
    var confirmBtn    = document.getElementById('confirmBtn');
    if (!usernameInput || !confirmCb) return;

    var valid = true;
    var username = usernameInput.value.trim();

    if (!isValidUsername(username)) {
      usernameInput.classList.add('error');
      if (usernameErr) usernameErr.classList.add('visible');
      valid = false;
    } else {
      usernameInput.classList.remove('error');
      if (usernameErr) usernameErr.classList.remove('visible');
    }

    if (!confirmCb.checked) {
      var grp = document.getElementById('confirmCheckboxGroup');
      if (grp) grp.classList.add('error');
      if (checkboxErr) checkboxErr.classList.add('visible');
      valid = false;
    } else {
      var grp2 = document.getElementById('confirmCheckboxGroup');
      if (grp2) grp2.classList.remove('error');
      if (checkboxErr) checkboxErr.classList.remove('visible');
    }

    if (!valid || !selectedSlot) return;

    if (getBookingCount(selectedSlot.date, selectedSlot.time) >= selectedSlot.maxPlayers) {
      showResult('error', T('errorFull'));
      return;
    }

    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:.5rem"><span class="spinner"></span>' + T('btnSending') + '</span>';
    }

    var booking = { username: username, date: selectedSlot.date, time: selectedSlot.time, maxPlayers: selectedSlot.maxPlayers };

    sendWebhook(booking)
      .then(function () { finishBooking(booking); })
      .catch(function () { finishBooking(booking); }); // still confirm locally on fail
  };

  function finishBooking(booking) {
    saveBooking(booking.date, booking.time, booking.username);
    showResult('success', null, booking);
    renderCalendar();
    if (selectedDate) renderSlots(selectedDate);
  }

  // ════════════════════════════════════════════════════════
  //  RESULT STATE
  // ════════════════════════════════════════════════════════
  function showResult(type, message, booking) {
    var content = document.getElementById('modalContent');
    if (!content) return;

    if (type === 'success' && booking) {
      var duration = SETTINGS.sessionDurationMinutes || 30;
      content.innerHTML =
        '<div class="result-state">' +
          '<div class="result-icon success"><i class="fa-solid fa-check"></i></div>' +
          '<div class="result-title success">' + T('successTitle') + '</div>' +
          '<p class="result-desc">' + T('successDesc') + '</p>' +
          '<div class="result-summary">' +
            row(T('summaryUsername'), s(booking.username)) +
            row(T('summaryDate'),    formatDateLong(booking.date)) +
            row(T('summaryTime'),    s(booking.time)) +
            row(T('summaryDuration'), duration + ' ' + T('summaryMinutes')) +
          '</div>' +
          '<button class="btn-primary" style="width:100%;justify-content:center" onclick="closeBookingModal()">' +
            '<i class="fa-solid fa-xmark"></i> ' + T('btnClose') +
          '</button>' +
        '</div>';
    } else {
      content.innerHTML =
        '<div class="result-state">' +
          '<div class="result-icon error"><i class="fa-solid fa-xmark"></i></div>' +
          '<div class="result-title error">' + T('errorTitle') + '</div>' +
          '<p class="result-desc">' + (message || T('errorGeneric')) + '</p>' +
          '<button class="btn-outline" style="width:100%;justify-content:center" onclick="closeBookingModal()">' +
            '<i class="fa-solid fa-arrow-left"></i> ' + T('btnBack') +
          '</button>' +
        '</div>';
    }
  }

  function row(label, val) {
    return '<div class="result-summary-row"><span>' + label + '</span><span>' + val + '</span></div>';
  }

  // ════════════════════════════════════════════════════════
  //  DISCORD WEBHOOK
  // ════════════════════════════════════════════════════════
  function sendWebhook(booking) {
    if (!SETTINGS.webhookUrl) return Promise.resolve();
    var duration = SETTINGS.sessionDurationMinutes || 30;
    var body = {
      username: 'Phantasialand Roblox',
      embeds: [{
        title:  'New Park Booking',
        description: 'A new session has been reserved!',
        color: 13959735,
        fields: [
          { name: 'Roblox Username', value: booking.username,               inline: true },
          { name: 'Date',            value: formatDateLong(booking.date),    inline: true },
          { name: 'Time',            value: booking.time,                    inline: true },
          { name: 'Session Duration', value: duration + ' minutes',          inline: true },
          { name: 'Max Players',     value: 'Max. ' + booking.maxPlayers,   inline: true },
        ],
        footer:    { text: 'Phantasialand – Roblox Park System' },
        timestamp: new Date().toISOString(),
      }]
    };
    return fetch(SETTINGS.webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    }).then(function (res) {
      if (!res.ok && res.status !== 204) throw new Error('HTTP ' + res.status);
    });
  }

  // ════════════════════════════════════════════════════════
  //  CALENDAR NAV
  // ════════════════════════════════════════════════════════
  function bindCalendarNav() {
    var prev = document.getElementById('prevMonth');
    var next = document.getElementById('nextMonth');
    if (prev) prev.addEventListener('click', function () {
      currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } renderCalendar();
    });
    if (next) next.addEventListener('click', function () {
      currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } renderCalendar();
    });
  }

  // ════════════════════════════════════════════════════════
  //  LOCAL STORAGE
  // ════════════════════════════════════════════════════════
  function stKey(date, time) { return 'pla_' + date + '_' + time.replace(':', ''); }
  function getBookings(date, time) {
    try { var r = localStorage.getItem(stKey(date, time)); return r ? JSON.parse(r) : []; }
    catch (e) { return []; }
  }
  function getBookingCount(date, time) { return getBookings(date, time).length; }
  function saveBooking(date, time, username) {
    try {
      var bk = getBookings(date, time);
      if (!bk.includes(username)) { bk.push(username); localStorage.setItem(stKey(date, time), JSON.stringify(bk)); }
    } catch (e) {}
  }
  function isDayFull(dateStr) {
    var entry = (SETTINGS.bookingDates || []).find(function (d) { return d.date === dateStr; });
    if (!entry || !entry.slots || !entry.slots.length) return false;
    return entry.slots.every(function (sl) { return getBookingCount(dateStr, sl.time) >= (sl.maxPlayers || 5); });
  }

  // ════════════════════════════════════════════════════════
  //  HELPERS
  // ════════════════════════════════════════════════════════
  function todayStr() { var d = new Date(); return formatDateStr(d.getFullYear(), d.getMonth() + 1, d.getDate()); }
  function formatDateStr(y, m, d) { return y + '-' + String(m).padStart(2,'0') + '-' + String(d).padStart(2,'0'); }
  function formatDateLong(dateStr) {
    if (!dateStr) return '';
    var p   = dateStr.split('-');
    var dt  = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]));
    var loc = window.PLA_LANG === 'de' ? 'de-DE' : 'en-GB';
    return dt.toLocaleDateString(loc, { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }
  function isValidUsername(n) { return n && n.length >= 3 && n.length <= 20 && /^[a-zA-Z0-9_]+$/.test(n); }
  function s(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

})();
