// ════════════════════════════════════════════════════════════
//  BOOKING.JS – Phantasialand Roblox
//  Kalendar, Zeitslots, Buchungsmodal, Discord-Webhook
// ════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Zustand ─────────────────────────────────────────────
  let currentYear  = new Date().getFullYear();
  let currentMonth = new Date().getMonth(); // 0-basiert
  let selectedDate = null;
  let selectedSlot = null;
  let pendingBooking = null;

  // Deutsche Monatsnamen
  const MONTHS = [
    'Januar','Februar','März','April','Mai','Juni',
    'Juli','August','September','Oktober','November','Dezember'
  ];

  // ── Initialisierung ─────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    jumpToFirstAvailableMonth();
    renderCalendar();
    bindCalendarNav();
    initModal();
  });

  // ════════════════════════════════════════════════════════
  //  ZUM ERSTEN VERFÜGBAREN MONAT SPRINGEN
  // ════════════════════════════════════════════════════════
  function jumpToFirstAvailableMonth() {
    if (!SETTINGS.bookingDates || !SETTINGS.bookingDates.length) return;

    const today = todayStr();
    const future = SETTINGS.bookingDates
      .filter(function (d) { return d.date >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });

    if (future.length > 0) {
      const parts = future[0].date.split('-');
      currentYear  = parseInt(parts[0], 10);
      currentMonth = parseInt(parts[1], 10) - 1;
    }
  }

  // ════════════════════════════════════════════════════════
  //  KALENDER RENDERN
  // ════════════════════════════════════════════════════════
  function renderCalendar() {
    const label = document.getElementById('calMonthLabel');
    const grid  = document.getElementById('calGrid');
    if (!label || !grid) return;

    label.textContent = MONTHS[currentMonth] + ' ' + currentYear;
    grid.innerHTML = '';

    const firstDay  = new Date(currentYear, currentMonth, 1).getDay(); // 0=So
    const offset    = firstDay === 0 ? 6 : firstDay - 1; // Mo=0
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today     = todayStr();

    // Sammle verfügbare Daten für diesen Monat
    const availableDates = getAvailableDatesForMonth(currentYear, currentMonth);

    // Leere Zellen am Anfang
    for (let i = 0; i < offset; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      grid.appendChild(empty);
    }

    // Tage einfügen
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateStr(currentYear, currentMonth + 1, day);
      const btn = document.createElement('button');
      btn.textContent = day;
      btn.setAttribute('aria-label', formatDateLong(dateStr));
      btn.type = 'button';

      const isPast      = dateStr < today;
      const isToday     = dateStr === today;
      const isAvailable = availableDates.includes(dateStr);
      const isSelected  = dateStr === selectedDate;
      const isFullDay   = isAvailable && isDayFull(dateStr);

      let classes = 'cal-day';

      if (isPast) {
        classes += ' past';
      } else if (isAvailable && !isFullDay) {
        classes += ' available';
        if (isSelected) classes += ' selected';
        btn.addEventListener('click', function () { selectDate(dateStr); });
      } else if (isAvailable && isFullDay) {
        classes += ' full-day available';
        if (isSelected) classes += ' selected';
        btn.addEventListener('click', function () { selectDate(dateStr); });
      } else {
        btn.disabled = true;
      }

      if (isToday) classes += ' today';
      btn.className = classes;
      grid.appendChild(btn);
    }
  }

  function getAvailableDatesForMonth(year, month) {
    return (SETTINGS.bookingDates || [])
      .filter(function (d) {
        const parts = d.date.split('-');
        return parseInt(parts[0], 10) === year &&
               parseInt(parts[1], 10) - 1 === month;
      })
      .map(function (d) { return d.date; });
  }

  // ════════════════════════════════════════════════════════
  //  DATUM AUSWÄHLEN → SLOTS LADEN
  // ════════════════════════════════════════════════════════
  function selectDate(dateStr) {
    selectedDate = dateStr;
    selectedSlot = null;
    renderCalendar(); // re-render mit neuem "selected"
    renderSlots(dateStr);
  }

  function renderSlots(dateStr) {
    const placeholder = document.getElementById('slotsPlaceholder');
    const slotsList   = document.getElementById('slotsList');
    const dateTitle   = document.getElementById('slotsDateTitle');
    const slotsItems  = document.getElementById('slotsItems');
    if (!placeholder || !slotsList || !slotsItems) return;

    const entry = (SETTINGS.bookingDates || []).find(function (d) { return d.date === dateStr; });
    if (!entry) return;

    // Panel einblenden
    placeholder.style.display = 'none';
    slotsList.style.display   = 'block';

    // Datum-Überschrift
    if (dateTitle) {
      dateTitle.innerHTML = `<i class="fa-regular fa-calendar"></i> <span>${formatDateLong(dateStr)}</span>`;
    }

    // Slots rendern
    slotsItems.innerHTML = '';

    if (!entry.slots || !entry.slots.length) {
      slotsItems.innerHTML = '<p style="color:var(--text-muted);font-size:0.88rem;">Keine Zeitslots verfügbar.</p>';
      return;
    }

    entry.slots.forEach(function (slot) {
      const booked  = getBookingCount(dateStr, slot.time);
      const max     = slot.maxPlayers || 5;
      const free    = Math.max(0, max - booked);
      const isFull  = free === 0;

      const item = document.createElement('div');
      item.className = 'slot-item ' + (isFull ? 'full' : 'available');

      // Punkte-Indikatoren
      let dotsHtml = '<div class="slot-dots">';
      for (let i = 0; i < max; i++) {
        dotsHtml += `<div class="slot-dot ${i < booked ? 'filled' : ''}"></div>`;
      }
      dotsHtml += '</div>';

      let actionHtml;
      if (isFull) {
        actionHtml = `
          <div class="slot-full-badge">
            <i class="fa-solid fa-ban"></i> Ausgebucht
          </div>`;
      } else {
        actionHtml = `
          <button
            class="slot-btn"
            onclick="openBookingModal('${escSafe(dateStr)}', '${escSafe(slot.time)}', ${max})"
            type="button"
          >
            Buchen <i class="fa-solid fa-arrow-right"></i>
          </button>`;
      }

      item.innerHTML = `
        <div class="slot-time">
          <i class="fa-regular fa-clock"></i>
          ${escSafe(slot.time)} Uhr
        </div>
        <div class="slot-availability">
          ${dotsHtml}
          <span class="slot-spots">${free}/${max}</span>
          <span class="slot-label">${isFull ? 'ausgebucht' : 'frei'}</span>
        </div>
        ${actionHtml}
      `;

      slotsItems.appendChild(item);
    });
  }

  // ════════════════════════════════════════════════════════
  //  MODAL INITIALISIERUNG
  // ════════════════════════════════════════════════════════
  function initModal() {
    const overlay   = document.getElementById('bookingModal');
    const closeBtn  = document.getElementById('modalClose');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Schließen beim Klick auf Overlay (nicht auf Karte)
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    // ESC-Taste
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ════════════════════════════════════════════════════════
  //  MODAL ÖFFNEN
  // ════════════════════════════════════════════════════════
  window.openBookingModal = function (dateStr, time, maxPlayers) {
    selectedSlot = { date: dateStr, time: time, maxPlayers: maxPlayers };

    const overlay = document.getElementById('bookingModal');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    const dateLabel = formatDateLong(dateStr);
    const duration  = SETTINGS.sessionDurationMinutes || 30;

    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon">
          <i class="fa-solid fa-ticket"></i>
        </div>
        <h2 id="modalTitle">Session buchen</h2>
        <p>Fülle das Formular aus und bestätige deine Buchung.</p>
      </div>

      <div class="booking-detail-box">
        <div class="detail-item">
          <span class="detail-label"><i class="fa-regular fa-calendar"></i> Datum</span>
          <span class="detail-value">${escSafe(dateLabel)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label"><i class="fa-regular fa-clock"></i> Uhrzeit</span>
          <span class="detail-value">${escSafe(time)} Uhr</span>
        </div>
        <div class="detail-item">
          <span class="detail-label"><i class="fa-solid fa-hourglass-half"></i> Dauer</span>
          <span class="detail-value">${duration} Minuten</span>
        </div>
        <div class="detail-item">
          <span class="detail-label"><i class="fa-solid fa-users"></i> Kapazität</span>
          <span class="detail-value">Max. ${maxPlayers} Spieler</span>
        </div>
      </div>

      <div class="session-note">
        <i class="fa-solid fa-circle-info"></i>
        <span>Jede Session dauert genau <strong style="color:var(--gold)">${duration} Minuten</strong>.
        Bitte sei pünktlich und erscheine rechtzeitig im Park.</span>
      </div>

      <div class="form-group">
        <label class="form-label" for="robloxUsername">
          <i class="fa-solid fa-user" style="margin-right:0.3rem;color:var(--gold)"></i>
          Roblox-Benutzername
        </label>
        <input
          type="text"
          id="robloxUsername"
          class="form-input"
          placeholder="Dein Roblox-Username"
          maxlength="20"
          autocomplete="off"
          spellcheck="false"
        />
        <span class="form-error" id="usernameError">
          <i class="fa-solid fa-circle-exclamation"></i>
          Bitte gib einen gültigen Roblox-Benutzernamen ein (3–20 Zeichen).
        </span>
      </div>

      <label class="checkbox-group" id="confirmCheckboxGroup">
        <input type="checkbox" id="confirmAppear" />
        <span class="checkbox-custom"><i class="fa-solid fa-check"></i></span>
        <span class="checkbox-label">
          Ich bestätige hiermit, dass ich zum gewählten Zeitpunkt
          <strong>pünktlich im Park erscheinen werde</strong>.
        </span>
      </label>
      <span class="form-error" id="checkboxError" style="margin-top:-0.8rem;margin-bottom:1rem">
        <i class="fa-solid fa-circle-exclamation"></i>
        Bitte bestätige deine Teilnahme.
      </span>

      <div class="modal-actions">
        <button class="btn-cancel" type="button" onclick="closeBookingModal()">
          Abbrechen
        </button>
        <button class="btn-confirm" type="button" id="confirmBtn" onclick="submitBooking()">
          <i class="fa-solid fa-check"></i>
          Buchung bestätigen
        </button>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Fokus auf Usernamefeld
    setTimeout(function () {
      const input = document.getElementById('robloxUsername');
      if (input) input.focus();
    }, 200);

    // Enter-Taste im Eingabefeld
    const usernameInput = document.getElementById('robloxUsername');
    if (usernameInput) {
      usernameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') submitBooking();
      });
    }
  };

  // ════════════════════════════════════════════════════════
  //  MODAL SCHLIESSEN
  // ════════════════════════════════════════════════════════
  window.closeBookingModal = function () { closeModal(); };

  function closeModal() {
    const overlay = document.getElementById('bookingModal');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ════════════════════════════════════════════════════════
  //  BUCHUNG ABSENDEN
  // ════════════════════════════════════════════════════════
  window.submitBooking = function () {
    const usernameInput = document.getElementById('robloxUsername');
    const confirmCb     = document.getElementById('confirmAppear');
    const usernameErr   = document.getElementById('usernameError');
    const checkboxErr   = document.getElementById('checkboxError');
    const confirmBtn    = document.getElementById('confirmBtn');

    if (!usernameInput || !confirmCb) return;

    let valid = true;

    // Validierung Username
    const username = usernameInput.value.trim();
    if (!isValidRobloxUsername(username)) {
      usernameInput.classList.add('error');
      if (usernameErr) usernameErr.classList.add('visible');
      valid = false;
    } else {
      usernameInput.classList.remove('error');
      if (usernameErr) usernameErr.classList.remove('visible');
    }

    // Validierung Checkbox
    if (!confirmCb.checked) {
      const group = document.getElementById('confirmCheckboxGroup');
      if (group) group.classList.add('error');
      if (checkboxErr) checkboxErr.classList.add('visible');
      valid = false;
    } else {
      const group = document.getElementById('confirmCheckboxGroup');
      if (group) group.classList.remove('error');
      if (checkboxErr) checkboxErr.classList.remove('visible');
    }

    if (!valid) return;

    // Noch ein Mal prüfen ob Slot noch frei ist
    if (!selectedSlot) return;
    const booked = getBookingCount(selectedSlot.date, selectedSlot.time);
    if (booked >= selectedSlot.maxPlayers) {
      showResultState('error', 'Dieser Slot ist leider gerade ausgebucht worden. Bitte wähle einen anderen Zeitslot.');
      return;
    }

    // Lade-Zustand
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `
        <span class="btn-loading">
          <span class="spinner"></span>
          Wird gesendet...
        </span>`;
    }

    pendingBooking = {
      username:   username,
      date:       selectedSlot.date,
      time:       selectedSlot.time,
      maxPlayers: selectedSlot.maxPlayers,
    };

    sendToDiscord(pendingBooking)
      .then(function () {
        // Lokal speichern
        saveBooking(pendingBooking.date, pendingBooking.time, pendingBooking.username);
        showResultState('success', null, pendingBooking);
        // Slots neu rendern
        if (selectedDate) renderSlots(selectedDate);
        if (selectedDate) renderCalendar();
      })
      .catch(function (err) {
        console.error('Webhook-Fehler:', err);
        // Trotzdem lokal speichern (Buchung gilt)
        saveBooking(pendingBooking.date, pendingBooking.time, pendingBooking.username);
        showResultState('success', null, pendingBooking);
        if (selectedDate) renderSlots(selectedDate);
        if (selectedDate) renderCalendar();
      });
  };

  // ════════════════════════════════════════════════════════
  //  ERGEBNIS-ZUSTAND IM MODAL ANZEIGEN
  // ════════════════════════════════════════════════════════
  function showResultState(type, message, booking) {
    const content = document.getElementById('modalContent');
    if (!content) return;

    if (type === 'success' && booking) {
      content.innerHTML = `
        <div class="result-state">
          <div class="result-icon success">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="result-title success">Buchung erfolgreich!</div>
          <p class="result-desc">
            Deine Session wurde reserviert. Wir freuen uns auf deinen Besuch
            im Phantasialand – Roblox!
          </p>
          <div class="result-summary">
            <div class="result-summary-row">
              <span>Roblox-Username</span>
              <span>${escSafe(booking.username)}</span>
            </div>
            <div class="result-summary-row">
              <span>Datum</span>
              <span>${formatDateLong(booking.date)}</span>
            </div>
            <div class="result-summary-row">
              <span>Uhrzeit</span>
              <span>${escSafe(booking.time)} Uhr</span>
            </div>
            <div class="result-summary-row">
              <span>Session-Dauer</span>
              <span>${SETTINGS.sessionDurationMinutes || 30} Minuten</span>
            </div>
          </div>
          <button class="btn-primary" style="width:100%;justify-content:center" onclick="closeBookingModal()">
            <i class="fa-solid fa-xmark"></i> Schließen
          </button>
        </div>
      `;
    } else {
      const msg = message || 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.';
      content.innerHTML = `
        <div class="result-state">
          <div class="result-icon error">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <div class="result-title error">Fehler aufgetreten</div>
          <p class="result-desc">${escSafe(msg)}</p>
          <button class="btn-outline" style="width:100%;justify-content:center" onclick="closeBookingModal()">
            <i class="fa-solid fa-arrow-left"></i> Zurück
          </button>
        </div>
      `;
    }
  }

  // ════════════════════════════════════════════════════════
  //  DISCORD WEBHOOK
  // ════════════════════════════════════════════════════════
  function sendToDiscord(booking) {
    const webhookUrl = SETTINGS.webhookUrl;
    if (!webhookUrl) return Promise.resolve();

    const goldColor = 13959735; // #D4AF37 as decimal

    const payload = {
      username: 'Phantasialand Roblox',
      embeds: [
        {
          title: 'Neue Park-Buchung',
          description: 'Eine neue Session wurde reserviert!',
          color: goldColor,
          fields: [
            {
              name: 'Roblox-Username',
              value: booking.username,
              inline: true,
            },
            {
              name: 'Datum',
              value: formatDateLong(booking.date),
              inline: true,
            },
            {
              name: 'Uhrzeit',
              value: booking.time + ' Uhr',
              inline: true,
            },
            {
              name: 'Session-Dauer',
              value: (SETTINGS.sessionDurationMinutes || 30) + ' Minuten',
              inline: true,
            },
            {
              name: 'Kapazität',
              value: 'Max. ' + booking.maxPlayers + ' Spieler',
              inline: true,
            },
          ],
          footer: {
            text: 'Phantasialand – Roblox Park System',
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    return fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok && res.status !== 204) {
        throw new Error('Webhook antwortet mit Status ' + res.status);
      }
    });
  }

  // ════════════════════════════════════════════════════════
  //  LOKALSTORAGE – BUCHUNGSVERWALTUNG
  // ════════════════════════════════════════════════════════
  function storageKey(date, time) {
    return 'pla_booking_' + date + '_' + time.replace(':', '');
  }

  function getBookings(date, time) {
    try {
      const raw = localStorage.getItem(storageKey(date, time));
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function getBookingCount(date, time) {
    return getBookings(date, time).length;
  }

  function saveBooking(date, time, username) {
    try {
      const bookings = getBookings(date, time);
      if (!bookings.includes(username)) {
        bookings.push(username);
        localStorage.setItem(storageKey(date, time), JSON.stringify(bookings));
      }
    } catch (e) {
      console.warn('LocalStorage nicht verfügbar:', e);
    }
  }

  function isDayFull(dateStr) {
    const entry = (SETTINGS.bookingDates || []).find(function (d) { return d.date === dateStr; });
    if (!entry || !entry.slots || !entry.slots.length) return false;
    return entry.slots.every(function (slot) {
      const max    = slot.maxPlayers || 5;
      const booked = getBookingCount(dateStr, slot.time);
      return booked >= max;
    });
  }

  // ════════════════════════════════════════════════════════
  //  KALENDER-NAVIGATION
  // ════════════════════════════════════════════════════════
  function bindCalendarNav() {
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if (prev) {
      prev.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar();
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
      });
    }
  }

  // ════════════════════════════════════════════════════════
  //  HILFSFUNKTIONEN
  // ════════════════════════════════════════════════════════
  function todayStr() {
    const d = new Date();
    return formatDateStr(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  function formatDateStr(y, m, d) {
    return y + '-' +
      String(m).padStart(2, '0') + '-' +
      String(d).padStart(2, '0');
  }

  function formatDateLong(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d     = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('de-DE', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    });
  }

  function isValidRobloxUsername(name) {
    if (!name) return false;
    if (name.length < 3 || name.length > 20) return false;
    return /^[a-zA-Z0-9_]+$/.test(name);
  }

  function escSafe(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
