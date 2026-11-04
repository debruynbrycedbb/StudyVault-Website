/* StudyVault — shared UI: icons, sidebar, search, dialogs, PDF import */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  /* ---------- Icons (1.5px stroke) ---------- */
  const P = {
    home: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23"/><path d="M4 20.5V5.5"/>',
    library: '<path d="M4 4h3v16H4zM9.5 4h3v16h-3zM15 5.2l2.8-.8 3.6 15-2.8.8z"/>',
    tools: '<path d="M4 20l6-6M14.5 3.5a4 4 0 0 0-4.6 5.3L3.5 15.2 8.8 20.5l6.4-6.4a4 4 0 0 0 5.3-4.6l-2.6 2.6-3-.6-.6-3z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    file: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5"/>',
    note: '<path d="M5 4h14v16H5z"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    upload: '<path d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    trash: '<path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l.8 12.2A1.5 1.5 0 0 0 8.8 20.5h6.4a1.5 1.5 0 0 0 1.5-1.3L17.5 7M9.5 7V4.5h5V7"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
    cards: '<rect x="3.5" y="6" width="13" height="14" rx="1.5"/><path d="M8 3.5h11a1.5 1.5 0 0 1 1.5 1.5v12"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5v3.5M8 18h4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/>',
    case: '<rect x="3.5" y="7" width="17" height="12.5" rx="1.5"/><path d="M9 7V5h6v2M3.5 12.5h17"/>',
    layers: '<path d="M12 4l9 5-9 5-9-5z"/><path d="M3 14l9 5 9-5"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  };
  SV.icon = (name, cls) => '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  SV.hydrateIcons = function (root) {
    (root || document).querySelectorAll('[class*="i-"]').forEach((el) => {
      if (el.dataset.ico) return;
      const m = /(?:^|\s)i-([a-z]+)/.exec(el.className);
      if (m && P[m[1]]) { el.innerHTML = SV.icon(m[1]); el.dataset.ico = '1'; }
    });
  };

  /* ---------- Toast ---------- */
  let toastT;
  SV.toast = function (msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2800);
  };

  /* ---------- Sidebar ---------- */
  const NAV = [
    { route: 'home', href: '#/', label: 'Home', icon: 'home' },
    { route: 'calendar', href: '#/calendar', label: 'Calendar', icon: 'calendar' },
    { route: 'library', href: '#/library', label: 'Research library', icon: 'library' },
    { route: 'tools', href: '#/tools', label: 'Study tools', icon: 'tools' }
  ];
  SV.renderSidebar = function () {
    document.getElementById('sideNav').innerHTML = NAV.map((n) =>
      '<a class="nav-link" data-route="' + n.route + '" href="' + n.href + '">' + SV.icon(n.icon) + '<span>' + n.label + '</span></a>').join('');

    const cs = SV.courses();
    const current = cs.filter((c) => c.status === 'current');
    const upcoming = cs.filter((c) => c.status === 'upcoming');
    const item = (c) => {
      const next = SV.upcoming().find((d) => d.course === c.id);
      const sub = next ? SV.relDays(next.date) + ' · ' + esc(next.type) : esc(c.period);
      return '<a class="course-link" data-course="' + c.id + '" href="#/course/' + c.id + '" title="' + esc(c.name) + '">' +
        '<span class="chip-code" style="--c:' + c.color + '">' + esc(c.short) + '</span>' +
        '<span class="cl-text"><span class="cl-name">' + esc(c.name) + '</span><span class="cl-sub">' + sub + '</span></span></a>';
    };
    let html = '<h2 class="side-label">Courses</h2>' + current.map(item).join('');
    if (SV.settings.showUpcoming && upcoming.length) {
      const open = SV.LS.get('upcomingOpen', false);
      html += '<details class="side-upcoming"' + (open ? ' open' : '') + '><summary>Next semester <span class="count">' + upcoming.length + '</span>' + SV.icon('down') + '</summary>' + upcoming.map(item).join('') + '</details>';
    }
    const el = document.getElementById('sideCourses');
    el.innerHTML = html;
    const det = el.querySelector('details');
    if (det) det.addEventListener('toggle', () => SV.LS.set('upcomingOpen', det.open));
    SV.renderRecent();
  };

  SV.renderRecent = function () {
    const list = SV.LS.get('recent', []).slice(0, 5);
    const el = document.getElementById('sideRecent');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<h2 class="side-label">Recently viewed</h2><p class="side-empty">Notes and files you open will show up here.</p>';
      return;
    }
    el.innerHTML = '<h2 class="side-label">Recently viewed</h2>' + list.map((r) =>
      '<a class="recent-link" href="' + esc(r.href) + '">' +
      '<span class="dot" style="--c:' + SV.courseColor(r.course) + '"></span>' +
      '<span class="rl-text"><span class="rl-title">' + esc(r.title) + '</span><span class="rl-sub">' + esc(r.type) + (r.course ? ' · ' + esc(SV.courseShort(r.course)) : '') + '</span></span></a>').join('');
  };

  SV.setActiveNav = function (route, courseId) {
    document.querySelectorAll('.nav-link').forEach((a) => a.classList.toggle('active', a.dataset.route === route));
    document.querySelectorAll('.course-link').forEach((a) => a.classList.toggle('active', a.dataset.course === courseId));
  };

  /* ---------- Search ---------- */
  function stripMd(s) {
    return String(s || '').replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`|]/g, ' ').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/-{3,}/g, ' ').replace(/\s+/g, ' ').trim();
  }
  SV.buildIndex = function () {
    const idx = [];
    SV.courses().forEach((c) => {
      idx.push({ type: 'Course', title: c.name, sub: [c.period, c.lecturer, c.code].filter(Boolean).join(' · '), text: (c.about || '') + ' ' + (c.assessment || ''), href: '#/course/' + c.id, course: c.id });
      c.weeks.forEach((w) => idx.push({ type: 'Week', title: c.short + ' · ' + SV.weekLabel(c.id, w.n) + (w.title ? ': ' + w.title : ''), sub: c.name, text: w.title || '', href: '#/course/' + c.id + '?week=' + w.n, course: c.id }));
    });
    SV.notes().forEach((n) => {
      // One entry per section so results jump to the right place.
      const body = n.body || '';
      const parts = body.split(/\n(?=##\s)/);
      idx.push({ type: 'Note', title: n.title, sub: SV.courseName(n.course) + (n.week ? ' · ' + SV.weekLabel(n.course, n.week) : ''), text: (n.tags || []).join(' ') + ' ' + stripMd(parts[0]), href: '#/note/' + n.id, course: n.course, tags: (n.tags || []).join(' ') });
      parts.slice(1).forEach((p) => {
        const h = (/^##\s+(.+)/.exec(p) || [])[1] || '';
        idx.push({ type: 'Note section', title: h.replace(/[*`]/g, ''), sub: n.title, text: stripMd(p.replace(/^##.+/, '')), href: '#/note/' + n.id + '?s=' + SV.slug(h), course: n.course });
      });
    });
    SV.deadlines().forEach((d) => idx.push({ type: 'Deadline', title: d.type + ' · ' + d.title, sub: SV.courseName(d.course) + ' · ' + SV.fmt(d.date) + (d.time ? ' · ' + d.time : ''), text: d.notes || '', href: '#/calendar?d=' + d.date, course: d.course }));
    [['cases', 'Case study'], ['tools', 'Tool'], ['resources', 'Resource']].forEach(([k, label]) => SV.library(k).forEach((x) =>
      idx.push({ type: label, title: x.title, sub: [x.category, SV.courseName(x.course)].filter(Boolean).join(' · '), text: [x.summary, x.lesson, (x.tags || []).join(' ')].join(' '), href: '#/library/' + k + '?item=' + x.id, course: x.course })));
    SV.files().forEach((f) => idx.push({ type: 'File', title: f.title, sub: (f.course ? SV.courseName(f.course) : 'General') + (f.week ? ' · ' + SV.weekLabel(f.course, f.week) : ''), text: f.kind || '', href: '#/file/' + f.id, course: f.course, file: f.id }));
    (SV.vault.formulas || []).forEach((f) => idx.push({ type: 'Formula', title: f.name + ' — ' + f.long, sub: f.formula, text: f.formula, href: '#/tools/formulas', course: f.course }));
    (SV.vault.debates || []).forEach((d) => idx.push({ type: 'Debate', title: d.q, sub: SV.courseName(d.course), text: '', href: '#/tools/debate', course: d.course }));
    SV.index = idx;
    return idx;
  };

  SV.search = function (q, limit) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const idx = SV.index || SV.buildIndex();
    const out = [];
    idx.forEach((e) => {
      const title = e.title.toLowerCase(), sub = (e.sub || '').toLowerCase(), text = (e.text || '').toLowerCase(), tags = (e.tags || '').toLowerCase();
      let score = 0;
      for (const t of terms) {
        const inT = title.includes(t), inS = sub.includes(t), inX = text.includes(t);
        if (!inT && !inS && !inX) return;
        score += (inT ? 12 : 0) + (title.startsWith(t) ? 4 : 0) + (tags.includes(t) ? 5 : 0) + (inS ? 2 : 0) + (inX ? Math.min(6, text.split(t).length - 1) : 0);
      }
      if (e.type === 'Course' || e.type === 'Note') score += 3;
      out.push({ e, score });
    });
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, limit || 50).map((o) => o.e);
  };
  SV.snippet = function (text, q, len) {
    len = len || 140;
    if (!text) return '';
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const lower = text.toLowerCase();
    let pos = -1;
    for (const t of terms) { pos = lower.indexOf(t); if (pos >= 0) break; }
    let start = Math.max(0, pos - Math.floor(len / 3));
    let s = (start > 0 ? '…' : '') + text.slice(start, start + len) + (start + len < text.length ? '…' : '');
    return SV.highlight(s, q);
  };
  SV.highlight = function (s, q) {
    let html = esc(s);
    q.split(/\s+/).filter((t) => t.length > 1).forEach((t) => {
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      html = html.replace(re, '<mark>$1</mark>');
    });
    return html;
  };

  /* Palette */
  let palSel = 0, palItems = [];
  SV.openPalette = function (initial) {
    const pal = document.getElementById('palette');
    const inp = document.getElementById('paletteInput');
    SV.buildIndex();
    pal.hidden = false;
    inp.value = initial || '';
    renderPalette();
    setTimeout(() => inp.focus(), 10);
  };
  SV.closePalette = function () { document.getElementById('palette').hidden = true; };
  function renderPalette() {
    const q = document.getElementById('paletteInput').value.trim();
    const box = document.getElementById('paletteResults');
    if (!q) {
      const recent = SV.LS.get('recent', []).slice(0, 5);
      const next = SV.upcoming(3);
      palItems = recent.map((r) => ({ title: r.title, sub: r.type, href: r.href, course: r.course, type: 'Recent' }))
        .concat(next.map((d) => ({ title: d.type + ' · ' + d.title, sub: SV.fmt(d.date) + ' · ' + SV.relDays(d.date), href: '#/calendar?d=' + d.date, course: d.course, type: 'Up next' })));
      box.innerHTML = palItems.length ? groupHtml(palItems, '') : '<p class="pal-empty">Type to search notes, weeks, deadlines, case studies, tools and files.</p>';
    } else {
      palItems = SV.search(q, 30);
      box.innerHTML = palItems.length
        ? groupHtml(palItems, q) + '<a class="pal-all" href="#/search?q=' + encodeURIComponent(q) + '">See all results for “' + esc(q) + '”</a>'
        : '<p class="pal-empty">Nothing matches “' + esc(q) + '”. Try a shorter word, or a course code like DMT.</p>';
    }
    palSel = 0;
    markSel();
  }
  function groupHtml(items, q) {
    let html = '', last = null;
    items.forEach((e, i) => {
      if (e.type !== last) { html += '<div class="pal-group">' + esc(e.type) + '</div>'; last = e.type; }
      html += '<a class="pal-item" role="option" data-i="' + i + '" href="' + esc(e.href) + '">' +
        '<span class="dot" style="--c:' + SV.courseColor(e.course) + '"></span>' +
        '<span class="pi-text"><span class="pi-title">' + (q ? SV.highlight(e.title, q) : esc(e.title)) + '</span>' +
        '<span class="pi-sub">' + (q && e.text && !e.title.toLowerCase().includes(q.toLowerCase()) ? SV.snippet(e.text, q, 90) : esc(e.sub || '')) + '</span></span></a>';
    });
    return html;
  }
  function markSel() {
    document.querySelectorAll('.pal-item').forEach((el) => el.classList.toggle('sel', +el.dataset.i === palSel));
    const el = document.querySelector('.pal-item.sel');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }
  function goItem(e) {
    SV.closePalette();
    const q = document.getElementById('paletteInput').value.trim();
    let href = e.href;
    if (q && /^#\/note\//.test(href)) href += (href.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(q);
    location.hash = href.slice(1);
  }
  SV.initPalette = function () {
    const pal = document.getElementById('palette');
    const inp = document.getElementById('paletteInput');
    inp.addEventListener('input', renderPalette);
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palItems.length - 1, palSel + 1); markSel(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(0, palSel - 1); markSel(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (palItems[palSel]) goItem(palItems[palSel]); else if (inp.value.trim()) { SV.closePalette(); location.hash = '/search?q=' + encodeURIComponent(inp.value.trim()); } }
      else if (e.key === 'Escape') SV.closePalette();
    });
    pal.addEventListener('click', (e) => {
      if (e.target === pal) return SV.closePalette();
      const a = e.target.closest('.pal-item');
      if (a) { e.preventDefault(); goItem(palItems[+a.dataset.i]); }
      if (e.target.closest('.pal-all')) SV.closePalette();
    });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? SV.openPalette() : SV.closePalette(); }
      else if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName) && !document.getElementById('dlg').open) { e.preventDefault(); SV.openPalette(); }
      else if (e.key === 'Escape' && !pal.hidden) SV.closePalette();
    });
  };

  /* ---------- Dialog helper ---------- */
  SV.dialog = function (title, bodyHtml, opts) {
    opts = opts || {};
    const dlg = document.getElementById('dlg');
    dlg.className = 'dlg' + (opts.wide ? ' wide' : '');
    dlg.innerHTML = '<form method="dialog" class="dlg-form" novalidate>' +
      '<header class="dlg-head"><h2>' + esc(title) + '</h2><button type="button" class="icon-btn" data-close aria-label="Close">' + SV.icon('x') + '</button></header>' +
      '<div class="dlg-body">' + bodyHtml + '</div>' +
      (opts.submit !== false ? '<footer class="dlg-foot">' + (opts.extraFoot || '') + '<button type="button" class="btn btn-ghost" data-close>Cancel</button><button type="submit" class="btn btn-primary">' + esc(opts.submit || 'Save') + '</button></footer>' : '') +
      '</form>';
    const form = dlg.querySelector('form');
    dlg.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => dlg.close()));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (opts.onSubmit) {
        const err = form.querySelector('.form-err');
        try {
          const ok = await opts.onSubmit(new FormData(form), form);
          if (ok !== false) dlg.close();
        } catch (ex) { if (err) err.textContent = ex.message; else SV.toast(ex.message); }
      } else dlg.close();
    });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }, { once: false });
    dlg.showModal();
    const first = dlg.querySelector('input:not([type=hidden]):not([type=file]), select, textarea');
    if (first && !opts.noAutofocus) first.focus();
    if (opts.onOpen) opts.onOpen(form, dlg);
    return dlg;
  };

  SV.courseOptions = function (selected, opts) {
    opts = opts || {};
    const cs = SV.courses();
    const grp = (label, list) => '<optgroup label="' + label + '">' + list.map((c) => '<option value="' + c.id + '"' + (c.id === selected ? ' selected' : '') + '>' + esc(c.name) + '</option>').join('') + '</optgroup>';
    return (opts.allowNone ? '<option value="">General (no course)</option>' : '') +
      (opts.allowAll ? '<option value="all"' + (selected === 'all' ? ' selected' : '') + '>All module courses</option>' : '') +
      grp('This semester', cs.filter((c) => c.status === 'current')) + grp('Next semester', cs.filter((c) => c.status === 'upcoming'));
  };

  /* ---------- Deadline dialog (add / edit) ---------- */
  SV.deadlineDialog = function (preset) {
    preset = preset || {};
    const editing = !!preset.id;
    const types = ['Assignment', 'Hand-in (RD)', 'Exam', 'Presentation', 'Reading', 'Thesis', 'Other'];
    const curType = preset.type || 'Assignment';
    SV.dialog(editing ? 'Edit deadline' : 'Add a deadline',
      '<div class="grid2">' +
        '<label class="field span2"><span>What’s due</span><input name="title" required maxlength="160" value="' + esc(preset.title || '') + '" placeholder="e.g. Campaign analysis report"></label>' +
        '<label class="field"><span>Course</span><select name="course">' + SV.courseOptions(preset.course || 'web-analytics', { allowAll: true }) + '</select></label>' +
        '<label class="field"><span>Type</span><input name="type" list="typeList" value="' + esc(curType) + '" maxlength="24"><datalist id="typeList">' + types.map((t) => '<option value="' + t + '">').join('') + '</datalist></label>' +
        '<label class="field"><span>Date</span><input type="date" name="date" required value="' + esc(preset.date || SV.iso(new Date())) + '"></label>' +
        '<label class="field"><span>Time <em>(optional)</em></span><input type="time" name="time" value="' + esc(/^\d{2}:\d{2}$/.test(preset.time || '') ? preset.time : (preset.time ? '' : '')) + '"></label>' +
        '<label class="field span2"><span>Notes <em>(optional)</em></span><textarea name="notes" rows="3" maxlength="600" placeholder="Submission format, group members, word count…">' + esc(preset.notes || '') + '</textarea></label>' +
      '</div><p class="form-err" role="alert"></p>',
      {
        submit: editing ? 'Save changes' : 'Add deadline',
        onSubmit: (fd) => {
          const title = fd.get('title').trim(), date = fd.get('date');
          if (!title) throw new Error('Add a title for the deadline.');
          if (!date) throw new Error('Pick a date.');
          const rec = { id: preset.id || SV.uid('ud'), title, course: fd.get('course'), type: (fd.get('type') || 'Assignment').trim(), date, time: fd.get('time') || '', notes: fd.get('notes').trim() };
          const list = SV.LS.get('userDeadlines', []);
          const i = list.findIndex((x) => x.id === rec.id);
          if (i >= 0) list[i] = rec; else list.push(rec);
          SV.LS.set('userDeadlines', list);
          SV.toast(editing ? 'Deadline updated' : 'Deadline added for ' + SV.fmt(date));
          SV.refresh();
        }
      });
  };
  SV.toggleDone = function (id) {
    const done = SV.LS.get('doneDeadlines', {});
    if (done[id]) delete done[id]; else done[id] = true;
    SV.LS.set('doneDeadlines', done);
  };
  SV.deleteDeadline = function (id) {
    SV.LS.set('userDeadlines', SV.LS.get('userDeadlines', []).filter((d) => d.id !== id));
    SV.toast('Deadline deleted');
  };

  /* ---------- PDF → text (pdf.js) ---------- */
  SV.pdfToMarkdown = async function (file, onProgress) {
    if (!window.pdfjsLib) throw new Error('The PDF reader didn’t load. Check your connection and try again.');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const out = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      onProgress && onProgress(p, pdf.numPages);
      const page = await pdf.getPage(p);
      const tc = await page.getTextContent();
      // Group text items into lines by their y position.
      const lines = [];
      tc.items.forEach((it) => {
        if (!it.str) return;
        const y = Math.round(it.transform[5]);
        const h = Math.abs(it.transform[3]) || it.height || 10;
        let line = lines.find((l) => Math.abs(l.y - y) < h * 0.5);
        if (!line) { line = { y, h, parts: [] }; lines.push(line); }
        line.parts.push({ x: it.transform[4], s: it.str });
        line.h = Math.max(line.h, h);
      });
      lines.sort((a, b) => b.y - a.y);
      const sizes = lines.map((l) => l.h).sort((a, b) => a - b);
      const bodySize = sizes[Math.floor(sizes.length / 2)] || 10;
      let prevY = null, para = [];
      const flush = () => { if (para.length) { out.push(para.join(' ').replace(/\s+/g, ' ').trim()); para = []; } };
      lines.forEach((l) => {
        const text = l.parts.sort((a, b) => a.x - b.x).map((x) => x.s).join(' ').replace(/\s+/g, ' ').trim();
        if (!text) return;
        if (/^page \d+( of \d+)?$/i.test(text) || /^\d+\s*\/\s*\d+$/.test(text)) return; // page numbers
        const gap = prevY == null ? 0 : prevY - l.y;
        const isHeading = l.h > bodySize * 1.25 && text.length < 90;
        const isBullet = /^[•◦▪●\-–]\s*/.test(text);
        if (isHeading) { flush(); out.push((l.h > bodySize * 1.7 ? '# ' : '## ') + text); }
        else if (isBullet) { flush(); para.push('- ' + text.replace(/^[•◦▪●\-–]\s*/, '')); flush(); }
        else {
          if (gap > l.h * 1.8) flush();
          para.push(text);
        }
        prevY = l.y;
      });
      flush();
    }
    // Merge consecutive bullets so they render as one list.
    return out.join('\n\n').replace(/\n\n(?=- )/g, '\n').replace(/^(- .*)\n(?!- )/gm, '$1\n\n').trim();
  };

  /* ---------- Add notes to a week: import PDF or write ---------- */
  SV.addNotesDialog = function (courseId, week) {
    const c = SV.course(courseId);
    let parsed = null, pdfFile = null;
    SV.dialog('Add notes · ' + c.short + ' ' + SV.weekLabel(courseId, week),
      '<div class="seg" role="tablist">' +
        '<button type="button" class="seg-btn on" data-tab="pdf" role="tab" aria-selected="true">Import a PDF</button>' +
        '<button type="button" class="seg-btn" data-tab="write" role="tab" aria-selected="false">Write a note</button></div>' +
      '<div class="tabpane" data-pane="pdf">' +
        '<label class="drop" id="drop"><input type="file" name="pdf" accept="application/pdf,.pdf" hidden>' + SV.icon('upload') +
          '<strong>Choose a PDF</strong><span>or drop it here. The text is turned into a note and the PDF stays downloadable.</span></label>' +
        '<p class="hint" id="pdfStatus"></p>' +
      '</div>' +
      '<div class="tabpane" data-pane="write" hidden></div>' +
      '<label class="field"><span>Title</span><input name="title" maxlength="140" placeholder="e.g. Session 2 notes"></label>' +
      '<label class="field"><span>Notes <em>(Markdown works: ## headings, - bullets, **bold**, tables)</em></span><textarea name="body" rows="10" placeholder="Your notes…"></textarea></label>' +
      '<p class="hint">Saved in this browser. To add notes for every device, send the PDF to Claude and it will add them to the site’s repo.</p>' +
      '<p class="form-err" role="alert"></p>',
      {
        wide: true, submit: 'Save note', noAutofocus: true,
        onOpen: (form) => {
          form.querySelectorAll('.seg-btn').forEach((b) => b.addEventListener('click', () => {
            form.querySelectorAll('.seg-btn').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
            form.querySelector('[data-pane=pdf]').hidden = b.dataset.tab !== 'pdf';
          }));
          const input = form.querySelector('input[name=pdf]');
          const drop = form.querySelector('#drop');
          const status = form.querySelector('#pdfStatus');
          const handle = async (f) => {
            if (!f) return;
            if (!/pdf$/i.test(f.type) && !/\.pdf$/i.test(f.name)) { status.textContent = 'That isn’t a PDF. Choose a .pdf file.'; return; }
            pdfFile = f;
            status.textContent = 'Reading ' + f.name + '…';
            try {
              parsed = await SV.pdfToMarkdown(f, (p, n) => { status.textContent = 'Reading page ' + p + ' of ' + n + '…'; });
              const tEl = form.elements.namedItem('title'), bEl = form.elements.namedItem('body');
              tEl.value = tEl.value || f.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ');
              bEl.value = parsed;
              status.textContent = '✓ ' + f.name + ' (' + SV.size(f.size) + ') imported. Check the text below, then save.';
            } catch (e) { status.textContent = 'Couldn’t read that PDF: ' + e.message; }
          };
          input.addEventListener('change', () => handle(input.files[0]));
          ['dragover', 'dragenter'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
          ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
          drop.addEventListener('drop', (e) => handle(e.dataTransfer.files[0]));
        },
        onSubmit: async (fd) => {
          const title = (fd.get('title') || '').trim();
          const body = (fd.get('body') || '').trim();
          if (!title) throw new Error('Give the note a title.');
          if (!body && !pdfFile) throw new Error('Write something or import a PDF first.');
          let fileId = null;
          if (pdfFile) {
            fileId = SV.uid('uf');
            await SV.idb.put({ id: fileId, blob: pdfFile });
            const files = SV.LS.get('userFiles', []);
            files.push({ id: fileId, course: courseId, week, kind: 'Notes', title: title + ' (PDF)', name: pdfFile.name, size: pdfFile.size, scope: 'week' });
            SV.LS.set('userFiles', files);
          }
          const notes = SV.LS.get('userNotes', []);
          const id = SV.uid('un');
          notes.push({ id, course: courseId, week, title, date: SV.iso(new Date()), body: body || '*Imported PDF — no selectable text was found. Download the PDF to read it.*', source: fileId, tags: [] });
          SV.LS.set('userNotes', notes);
          SV.toast('Note saved to ' + c.short + ' ' + SV.weekLabel(courseId, week));
          SV.refresh();
        }
      });
  };

  SV.editNoteDialog = function (noteId) {
    const notes = SV.LS.get('userNotes', []);
    const n = notes.find((x) => x.id === noteId);
    if (!n) return;
    SV.dialog('Edit note',
      '<label class="field"><span>Title</span><input name="title" maxlength="140" value="' + esc(n.title) + '"></label>' +
      '<label class="field"><span>Notes (Markdown)</span><textarea name="body" rows="16">' + esc(n.body) + '</textarea></label><p class="form-err" role="alert"></p>',
      {
        wide: true, submit: 'Save changes',
        onSubmit: (fd) => {
          n.title = fd.get('title').trim() || n.title;
          n.body = fd.get('body');
          SV.LS.set('userNotes', notes);
          SV.toast('Note updated');
          SV.refresh();
        }
      });
  };
  SV.deleteNote = async function (noteId) {
    const notes = SV.LS.get('userNotes', []);
    const n = notes.find((x) => x.id === noteId);
    if (!n || !confirm('Delete “' + n.title + '”? This can’t be undone.')) return false;
    if (n.source) {
      try { await SV.idb.del(n.source); } catch (e) {}
      SV.LS.set('userFiles', SV.LS.get('userFiles', []).filter((f) => f.id !== n.source));
    }
    SV.LS.set('userNotes', notes.filter((x) => x.id !== noteId));
    SV.LS.set('recent', SV.LS.get('recent', []).filter((r) => r.href !== '#/note/' + noteId));
    SV.toast('Note deleted');
    return true;
  };

  /* ---------- Attach files to a week or to Additional content ---------- */
  SV.attachDialog = function (courseId, week, scope) {
    const c = SV.course(courseId);
    SV.dialog('Upload files · ' + c.short + (week ? ' ' + SV.weekLabel(courseId, week) : ' additional content'),
      '<label class="drop" id="drop2"><input type="file" name="files" multiple hidden>' + SV.icon('upload') + '<strong>Choose files</strong><span>Slides, readings, images, spreadsheets — anything you want to keep with this course.</span></label>' +
      '<ul class="pick-list" id="pickList"></ul>' +
      '<label class="field"><span>Label <em>(optional)</em></span><select name="kind"><option>Slides</option><option>Reading</option><option>Notes</option><option>Assignment brief</option><option>Other</option></select></label>' +
      '<p class="hint">Files are stored in this browser only. Ask Claude to add them to the repo to have them everywhere.</p><p class="form-err" role="alert"></p>',
      {
        submit: 'Upload', noAutofocus: true,
        onOpen: (form) => {
          const input = form.querySelector('input[type=file]');
          const drop = form.querySelector('#drop2');
          const list = form.querySelector('#pickList');
          let picked = [];
          const show = () => { list.innerHTML = picked.map((f) => '<li>' + SV.icon('file') + esc(f.name) + ' <span>' + SV.size(f.size) + '</span></li>').join(''); };
          input.addEventListener('change', () => { picked = Array.from(input.files); show(); });
          ['dragover', 'dragenter'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
          ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
          drop.addEventListener('drop', (e) => { picked = Array.from(e.dataTransfer.files); show(); });
          form._picked = () => picked;
        },
        onSubmit: async (fd, form) => {
          const picked = form._picked();
          if (!picked.length) throw new Error('Choose at least one file.');
          const files = SV.LS.get('userFiles', []);
          for (const f of picked) {
            const id = SV.uid('uf');
            await SV.idb.put({ id, blob: f });
            files.push({ id, course: courseId, week: week || null, kind: fd.get('kind'), title: f.name, name: f.name, size: f.size, scope: scope || 'week' });
          }
          SV.LS.set('userFiles', files);
          SV.toast(picked.length + (picked.length === 1 ? ' file' : ' files') + ' uploaded');
          SV.refresh();
        }
      });
  };
  SV.deleteFile = async function (fileId) {
    const f = SV.file(fileId);
    if (!f || !f.local || !confirm('Delete “' + f.title + '”?')) return;
    try { await SV.idb.del(fileId); } catch (e) {}
    SV.LS.set('userFiles', SV.LS.get('userFiles', []).filter((x) => x.id !== fileId));
    SV.toast('File deleted');
    SV.refresh();
  };

  /* ---------- Shared bits of markup ---------- */
  SV.fileRow = function (f) {
    return '<li class="file-row">' + SV.icon('file') +
      '<button type="button" class="fr-name" data-open-file="' + f.id + '">' + esc(f.title) + '</button>' +
      '<span class="fr-meta">' + esc(f.kind || '') + (f.size ? ' · ' + SV.size(f.size) : '') + (f.local ? ' · this browser' : '') + '</span>' +
      '<span class="fr-actions">' +
        '<button type="button" class="icon-btn sm" data-open-file="' + f.id + '" aria-label="Open ' + esc(f.title) + '" title="Open">' + SV.icon('external') + '</button>' +
        '<button type="button" class="icon-btn sm" data-download-file="' + f.id + '" aria-label="Download ' + esc(f.title) + '" title="Download">' + SV.icon('download') + '</button>' +
        (f.local ? '<button type="button" class="icon-btn sm" data-delete-file="' + f.id + '" aria-label="Delete ' + esc(f.title) + '" title="Delete">' + SV.icon('trash') + '</button>' : '') +
      '</span></li>';
  };
  SV.bindFileButtons = function (root) {
    root.querySelectorAll('[data-open-file]').forEach((b) => b.addEventListener('click', () => SV.openFile(b.dataset.openFile, 'view')));
    root.querySelectorAll('[data-download-file]').forEach((b) => b.addEventListener('click', () => SV.openFile(b.dataset.downloadFile, 'download')));
    root.querySelectorAll('[data-delete-file]').forEach((b) => b.addEventListener('click', () => SV.deleteFile(b.dataset.deleteFile)));
  };
  SV.deadlineRow = function (d, opts) {
    opts = opts || {};
    const rel = SV.relDays(d.date);
    const past = SV.endOfDeadline(d) < new Date();
    return '<li class="dl-row' + (d.done ? ' done' : '') + (past && !d.done ? ' past' : '') + '" style="--c:' + SV.courseColor(d.course) + '">' +
      '<button type="button" class="check" data-done="' + d.id + '" aria-pressed="' + d.done + '" aria-label="Mark ' + esc(d.title) + (d.done ? ' as not done' : ' as done') + '">' + SV.icon('check') + '</button>' +
      '<div class="dl-date"><span class="dd">' + SV.fmt(d.date, { day: 'numeric' }) + '</span><span class="mm">' + SV.fmt(d.date, { month: 'short' }) + '</span></div>' +
      '<div class="dl-main"><div class="dl-title"><span class="tag t-' + SV.slug(SV.typeLabel(d.type)) + '">' + esc(d.type) + '</span>' + esc(d.title) + '</div>' +
      '<div class="dl-sub">' + (opts.hideCourse ? '' : '<span class="dot" style="--c:' + SV.courseColor(d.course) + '"></span>' + esc(SV.courseName(d.course)) + ' · ') +
      SV.fmt(d.date, { weekday: 'short' }) + (d.time ? ' ' + esc(d.time) : '') + (d.notes ? ' · ' + esc(d.notes) : '') + '</div></div>' +
      '<div class="dl-rel">' + (d.done ? 'Done' : rel) + '</div>' +
      (d.local ? '<div class="dl-actions"><button type="button" class="icon-btn sm" data-edit-dl="' + d.id + '" aria-label="Edit deadline">' + SV.icon('edit') + '</button><button type="button" class="icon-btn sm" data-del-dl="' + d.id + '" aria-label="Delete deadline">' + SV.icon('trash') + '</button></div>' : '<div class="dl-actions"></div>') +
      '</li>';
  };
  SV.bindDeadlineButtons = function (root) {
    root.querySelectorAll('[data-done]').forEach((b) => b.addEventListener('click', () => { SV.toggleDone(b.dataset.done); SV.refresh(); }));
    root.querySelectorAll('[data-edit-dl]').forEach((b) => b.addEventListener('click', () => SV.deadlineDialog(SV.deadlines().find((d) => d.id === b.dataset.editDl))));
    root.querySelectorAll('[data-del-dl]').forEach((b) => b.addEventListener('click', () => { if (confirm('Delete this deadline?')) { SV.deleteDeadline(b.dataset.delDl); SV.refresh(); } }));
  };
})();
