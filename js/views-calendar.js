/* StudyVault — Calendar */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  const state = { month: null, selected: null, hidden: new Set(SV.LS.get('calHidden', [])) };

  function filtered() {
    return SV.deadlines().filter((d) => !state.hidden.has(d.course) && (SV.settings.showDone || !d.done));
  }

  function icsDate(dateStr, hm) {
    const d = SV.parseDate(dateStr);
    const [h, m] = hm.split(':').map(Number);
    d.setHours(h, m, 0, 0);
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + 'T' + String(h).padStart(2, '0') + String(m).padStart(2, '0') + '00';
  }
  function exportIcs() {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//StudyVault//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:StudyVault deadlines', 'X-WR-TIMEZONE:Europe/Madrid'];
    const escI = (s) => String(s || '').replace(/[\\;,]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
    SV.deadlines().forEach((d) => {
      const times = (d.time || '').match(/\d{1,2}:\d{2}/g);
      lines.push('BEGIN:VEVENT', 'UID:' + d.id + '@studyvault', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z');
      if (times) {
        lines.push('DTSTART;TZID=Europe/Madrid:' + icsDate(d.date, times[0]));
        if (times[1]) lines.push('DTEND;TZID=Europe/Madrid:' + icsDate(d.date, times[1]));
        else lines.push('DURATION:PT30M');
      } else {
        lines.push('DTSTART;VALUE=DATE:' + d.date.replace(/-/g, ''));
      }
      lines.push('SUMMARY:' + escI(d.type + ' · ' + SV.courseShort(d.course) + ' · ' + d.title), 'DESCRIPTION:' + escI(SV.courseName(d.course) + (d.notes ? '\n' + d.notes : '')), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    SV.download('studyvault-deadlines.ics', lines.join('\r\n'), 'text/calendar');
    SV.toast('Calendar file downloaded — open it to add the deadlines to your calendar app');
  }

  function monthGrid(items) {
    const m = state.month;
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const ws = SV.settings.weekStart;
    const offset = (first.getDay() - ws + 7) % 7;
    const startDate = new Date(first); startDate.setDate(1 - offset);
    const byDate = {};
    items.forEach((d) => (byDate[d.date] = byDate[d.date] || []).push(d));
    const todayIso = SV.iso(new Date());
    const names = [];
    for (let i = 0; i < 7; i++) names.push(new Date(2024, 0, 7 + ws + i).toLocaleDateString('en-GB', { weekday: 'short' }));
    let html = '<div class="cal-grid" role="grid" aria-label="' + esc(m.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })) + '">' +
      names.map((n) => '<div class="cal-dow" role="columnheader">' + n + '</div>').join('');
    const weeks = Math.ceil((offset + new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()) / 7);
    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(startDate); d.setDate(startDate.getDate() + i);
      const iso = SV.iso(d);
      const list = byDate[iso] || [];
      const cls = ['cal-day'];
      if (d.getMonth() !== m.getMonth()) cls.push('out');
      if (iso === todayIso) cls.push('today');
      if (iso === state.selected) cls.push('sel');
      if (list.length) cls.push('has');
      html += '<button type="button" class="' + cls.join(' ') + '" data-date="' + iso + '" role="gridcell" aria-label="' + esc(SV.fmt(d, { weekday: 'long', day: 'numeric', month: 'long' }) + (list.length ? ', ' + list.length + ' due' : '')) + '">' +
        '<span class="cd-num">' + d.getDate() + '</span>' +
        '<span class="cd-items">' + list.slice(0, 3).map((x) => '<span class="cd-chip' + (x.done ? ' done' : '') + '" style="--c:' + SV.courseColor(x.course) + '"><b>' + esc(x.type) + '</b> ' + esc(SV.courseShort(x.course)) + '</span>').join('') +
        (list.length > 3 ? '<span class="cd-more">+' + (list.length - 3) + ' more</span>' : '') + '</span></button>';
    }
    return html + '</div>';
  }

  function dayPanel(items) {
    const iso = state.selected;
    const list = items.filter((d) => d.date === iso);
    return '<div class="day-panel">' +
      '<div class="dp-head"><h2>' + esc(SV.fmt(iso, { weekday: 'long', day: 'numeric', month: 'long' })) + '</h2>' +
      '<button type="button" class="btn btn-ghost sm" id="addOnDay">' + SV.icon('plus') + 'Add</button></div>' +
      (list.length ? '<ul class="dl-list compact">' + list.map((d) => SV.deadlineRow(d)).join('') + '</ul>' : '<p class="empty">Nothing due this day.</p>') +
      '</div>';
  }

  function coming() {
    const up = SV.upcoming().filter((d) => !state.hidden.has(d.course)).slice(0, 4);
    if (!up.length) return '';
    return '<div class="coming"><h3>Coming up</h3><ul class="dl-list compact">' + up.map((d) => SV.deadlineRow(d).replace('<div class="dl-main">', '<div class="dl-main"><a class="jump" href="#/calendar?d=' + d.date + '">' + SV.fmt(d.date, { weekday: 'short', day: 'numeric', month: 'short' }) + '</a>')).join('') + '</ul></div>';
  }

  function agenda(items) {
    if (!items.length) return '<p class="empty">No deadlines match the selected courses.</p>';
    let html = '', lastM = '';
    const now = new Date();
    const firstUpcoming = items.find((d) => SV.endOfDeadline(d) >= now);
    items.forEach((d) => {
      const mk = d.date.slice(0, 7);
      if (mk !== lastM) { if (lastM) html += '</ul>'; html += '<h3 class="ag-month">' + SV.fmt(d.date, { month: 'long', year: 'numeric' }) + '</h3><ul class="dl-list">'; lastM = mk; }
      html += SV.deadlineRow(d).replace('<li class="dl-row', '<li ' + (firstUpcoming && d.id === firstUpcoming.id ? 'id="agNow" ' : '') + 'class="dl-row');
    });
    return html + '</ul>';
  }

  SV.views.calendar = function (view, params) {
    const view_ = params.get('view') || SV.settings.calendarView || 'month';
    const d = params.get('d');
    if (d) { state.selected = d; state.month = SV.parseDate(d); state.month.setDate(1); }
    if (!state.month) { state.month = new Date(); state.month.setDate(1); }
    if (!state.selected) state.selected = SV.iso(new Date());
    const items = filtered();
    const courses = SV.courses().filter((c) => c.status === 'current');
    const done = SV.deadlines().filter((x) => x.done).length;

    view.innerHTML =
      '<header class="page-head"><div><p class="crumb">Calendar</p><h1 class="display sm">Deadlines</h1>' +
      '<p class="page-sub">' + SV.deadlines().length + ' deadlines from the La Salle schedule and your own · ' + done + ' done</p></div>' +
      '<div class="head-actions"><button type="button" class="btn btn-ghost" id="ics">' + SV.icon('download') + 'Export to calendar app</button>' +
      '<button type="button" class="btn btn-primary" id="addDl">' + SV.icon('plus') + 'Add deadline</button></div></header>' +
      '<div class="cal-toolbar">' +
        '<div class="seg"><a class="seg-btn' + (view_ === 'month' ? ' on' : '') + '" href="#/calendar?view=month">Month</a><a class="seg-btn' + (view_ === 'agenda' ? ' on' : '') + '" href="#/calendar?view=agenda">List</a></div>' +
        (view_ === 'month' ? '<div class="cal-nav"><button type="button" class="icon-btn" id="prevM" aria-label="Previous month">' + SV.icon('left') + '</button>' +
          '<h2 class="cal-title">' + esc(state.month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })) + '</h2>' +
          '<button type="button" class="icon-btn" id="nextM" aria-label="Next month">' + SV.icon('right') + '</button>' +
          '<button type="button" class="btn btn-ghost sm" id="todayM">Today</button></div>' : '') +
        '<div class="filters" role="group" aria-label="Show courses">' + courses.concat([{ id: 'all', short: 'ALL', name: 'All module courses', color: 'var(--muted)' }]).map((c) =>
          '<button type="button" class="filter' + (state.hidden.has(c.id) ? '' : ' on') + '" data-filter="' + c.id + '" style="--c:' + c.color + '" aria-pressed="' + !state.hidden.has(c.id) + '" title="' + esc(c.name) + '"><span class="dot"></span>' + esc(c.short) + '</button>').join('') + '</div>' +
      '</div>' +
      (view_ === 'month'
        ? '<div class="cal-layout">' + monthGrid(items) + '<div class="cal-side">' + dayPanel(items) + coming() + '</div></div>'
        : '<div class="agenda">' + agenda(items) + '</div>');

    view.querySelector('#addDl').addEventListener('click', () => SV.deadlineDialog());
    view.querySelector('#ics').addEventListener('click', exportIcs);
    view.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.filter;
      state.hidden.has(id) ? state.hidden.delete(id) : state.hidden.add(id);
      SV.LS.set('calHidden', Array.from(state.hidden));
      SV.refresh();
    }));
    if (view_ === 'month') {
      const shift = (n) => { state.month = new Date(state.month.getFullYear(), state.month.getMonth() + n, 1); SV.views.calendar(view, new URLSearchParams('view=month')); };
      view.querySelector('#prevM').addEventListener('click', () => shift(-1));
      view.querySelector('#nextM').addEventListener('click', () => shift(1));
      view.querySelector('#todayM').addEventListener('click', () => { state.month = new Date(); state.month.setDate(1); state.selected = SV.iso(new Date()); SV.views.calendar(view, new URLSearchParams('view=month')); });
      view.querySelectorAll('.cal-day').forEach((b) => b.addEventListener('click', () => {
        state.selected = b.dataset.date;
        const dt = SV.parseDate(b.dataset.date);
        if (dt.getMonth() !== state.month.getMonth()) { state.month = new Date(dt.getFullYear(), dt.getMonth(), 1); }
        SV.views.calendar(view, new URLSearchParams('view=month'));
        const p = view.querySelector('.day-panel');
        if (p && window.innerWidth < 1100) p.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
      view.querySelector('#addOnDay').addEventListener('click', () => SV.deadlineDialog({ date: state.selected }));
    } else {
      const now = view.querySelector('#agNow');
      if (now && !params.get('d')) setTimeout(() => now.scrollIntoView({ block: 'center' }), 30);
    }
    SV.bindDeadlineButtons(view);
  };
})();
