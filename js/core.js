/* StudyVault — core: data, storage, helpers */
(function () {
  'use strict';
  const SV = (window.SV = window.SV || {});

  /* ---------- localStorage (per-browser conveniences + things you add on the site) ---------- */
  SV.LS = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('sv:' + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('sv:' + key, JSON.stringify(value)); return true; }
      catch (e) { SV.toast && SV.toast('Couldn’t save: browser storage is full or blocked.'); return false; }
    },
    del(key) { try { localStorage.removeItem('sv:' + key); } catch (e) {} },
    keys() {
      const out = [];
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('sv:')) out.push(k.slice(3)); } } catch (e) {}
      return out;
    }
  };

  /* ---------- IndexedDB for uploaded files (PDFs etc.) ---------- */
  SV.idb = (function () {
    let dbp = null;
    function open() {
      if (!dbp) {
        dbp = new Promise((resolve, reject) => {
          if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
          const req = indexedDB.open('studyvault', 1);
          req.onupgradeneeded = () => req.result.createObjectStore('files', { keyPath: 'id' });
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });
      }
      return dbp;
    }
    async function run(mode, fn) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('files', mode);
        const req = fn(tx.objectStore('files'));
        tx.oncomplete = () => resolve(req ? req.result : undefined);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
    }
    return {
      put: (rec) => run('readwrite', (s) => s.put(rec)),
      get: (id) => run('readonly', (s) => s.get(id)),
      del: (id) => run('readwrite', (s) => s.delete(id)),
      all: () => run('readonly', (s) => s.getAll()),
      clear: () => run('readwrite', (s) => s.clear())
    };
  })();

  /* ---------- Settings ---------- */
  const DEFAULT_SETTINGS = {
    theme: 'dark',
    accent: '#5B8CFF',
    weekStart: 1,           // 1 = Monday, 0 = Sunday
    showDone: true,
    showUpcoming: true,     // next-semester courses in the sidebar
    calendarView: 'month',
    focusLen: 25,
    breakLen: 5
  };
  SV.settings = Object.assign({}, DEFAULT_SETTINGS, SV.LS.get('settings', {}));
  SV.saveSettings = function (patch) {
    Object.assign(SV.settings, patch);
    SV.LS.set('settings', SV.settings);
    SV.applySettings();
  };
  SV.applySettings = function () {
    let t = SV.settings.theme;
    if (t === 'system') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.setProperty('--accent', SV.settings.accent || DEFAULT_SETTINGS.accent);
  };

  /* ---------- Load content shipped in the repo ---------- */
  SV.load = async function () {
    const bust = '?v=' + (SV.VERSION || '1');
    const [vault, quiz] = await Promise.all([
      fetch('content/vault.json' + bust).then((r) => { if (!r.ok) throw new Error('vault.json ' + r.status); return r.json(); }),
      fetch('content/quiz.json' + bust).then((r) => (r.ok ? r.json() : [])).catch(() => [])
    ]);
    SV.vault = vault;
    SV.quizBank = quiz;
    await Promise.all(vault.notes.map(async (n) => {
      try { const r = await fetch(n.path + bust); n.body = r.ok ? await r.text() : ''; }
      catch (e) { n.body = ''; }
    }));
  };

  /* ---------- Merged accessors (repo content + things added in this browser) ---------- */
  SV.courses = function () {
    const extraWeeks = SV.LS.get('userWeeks', {});
    return SV.vault.courses.map((c) => {
      const nums = new Set((c.weeks || []).map((w) => w.n));
      const weeks = (c.weeks || []).map((w) => Object.assign({}, w));
      (extraWeeks[c.id] || []).forEach((n) => { if (!nums.has(n)) { weeks.push({ n, title: '', date: '', notes: [], files: [], local: true }); nums.add(n); } });
      weeks.sort((a, b) => a.n - b.n);
      return Object.assign({}, c, { weeks });
    });
  };
  SV.course = (id) => SV.courses().find((c) => c.id === id);
  SV.courseColor = (id) => { const c = SV.vault.courses.find((x) => x.id === id); return c ? c.color : 'var(--muted)'; };
  SV.courseName = (id) => { if (id === 'all') return 'All module courses'; const c = SV.vault.courses.find((x) => x.id === id); return c ? c.name : 'General'; };
  /** "Week 3", or a section label such as "RD1" for courses not organised by week (e.g. the thesis). */
  SV.weekLabel = function (courseId, n) {
    const c = SV.vault.courses.find((x) => x.id === courseId);
    const w = c && (c.weeks || []).find((x) => x.n === n);
    return w && w.label ? w.label : 'Week ' + n;
  };
  SV.courseShort = (id) => { if (id === 'all') return 'ALL'; const c = SV.vault.courses.find((x) => x.id === id); return c ? c.short : '—'; };

  SV.notes = function () {
    const local = SV.LS.get('userNotes', []).map((n) => Object.assign({ local: true }, n));
    return SV.vault.notes.concat(local);
  };
  SV.note = (id) => SV.notes().find((n) => n.id === id);

  SV.files = function () {
    const local = SV.LS.get('userFiles', []).map((f) => Object.assign({ local: true }, f));
    return SV.vault.files.concat(local);
  };
  SV.file = (id) => SV.files().find((f) => f.id === id);

  SV.deadlines = function () {
    const done = SV.LS.get('doneDeadlines', {});
    const local = SV.LS.get('userDeadlines', []).map((d) => Object.assign({ local: true }, d));
    return SV.vault.deadlines.concat(local)
      .map((d) => Object.assign({}, d, { done: !!done[d.id], when: SV.dateAt(d.date, d.time) }))
      .sort((a, b) => a.when - b.when);
  };
  SV.upcoming = function (n) {
    const now = new Date();
    return SV.deadlines().filter((d) => !d.done && SV.endOfDeadline(d) >= now).slice(0, n || 999);
  };

  SV.library = function (kind) {
    const local = (SV.LS.get('userLibrary', {})[kind] || []).map((x) => Object.assign({ local: true }, x));
    return (SV.vault.library[kind] || []).concat(local);
  };

  SV.extras = function (courseId) {
    const c = SV.vault.courses.find((x) => x.id === courseId);
    const local = (SV.LS.get('userExtras', {})[courseId] || []).map((x) => Object.assign({ local: true }, x));
    return ((c && c.extras) || []).concat(local);
  };

  /* ---------- Recently viewed ---------- */
  SV.addRecent = function (item) {
    if (!item || !item.href) return;
    let list = SV.LS.get('recent', []).filter((r) => r.href !== item.href);
    list.unshift(Object.assign({ ts: Date.now() }, item));
    SV.LS.set('recent', list.slice(0, 12));
    SV.renderRecent && SV.renderRecent();
  };

  /* ---------- Dates ---------- */
  SV.parseDate = function (s) {
    if (!s) return null;
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  SV.dateAt = function (s, time) {
    const d = SV.parseDate(s);
    if (!d) return null;
    const m = /(\d{1,2}):(\d{2})/.exec(time || '');
    if (m) d.setHours(+m[1], +m[2]); else d.setHours(23, 59);
    return d;
  };
  SV.endOfDeadline = function (d) {
    const base = SV.parseDate(d.date);
    const times = (d.time || '').match(/\d{1,2}:\d{2}/g);
    const t = times ? times[times.length - 1] : '23:59';
    const [h, mi] = t.split(':').map(Number);
    base.setHours(h, mi);
    return base;
  };
  SV.iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  SV.today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  SV.daysUntil = function (s) {
    const d = SV.parseDate(s);
    return Math.round((d - SV.today()) / 86400000);
  };
  SV.relDays = function (s) {
    const n = SV.daysUntil(s);
    if (n === 0) return 'Today';
    if (n === 1) return 'Tomorrow';
    if (n === -1) return 'Yesterday';
    if (n < 0) return Math.abs(n) + ' days ago';
    if (n < 14) return 'In ' + n + ' days';
    return 'In ' + Math.round(n / 7) + ' weeks';
  };
  SV.fmt = function (s, opts) {
    const d = typeof s === 'string' ? SV.parseDate(s) : s;
    if (!d) return '';
    return d.toLocaleDateString('en-GB', opts || { day: 'numeric', month: 'short', year: 'numeric' });
  };

  /* ---------- Misc helpers ---------- */
  SV.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };
  SV.uid = (p) => (p || 'u') + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  SV.size = function (b) {
    if (!b && b !== 0) return '';
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(0) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  };
  SV.md = function (src) {
    const html = window.marked ? marked.parse(src || '', { gfm: true, breaks: false }) : '<pre>' + SV.esc(src) + '</pre>';
    return window.DOMPurify ? DOMPurify.sanitize(html) : html;
  };
  SV.slug = (s) => String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  SV.typeLabel = function (t) {
    if (!t) return '';
    if (/^RD\d+/.test(t)) return 'Hand-in';
    if (t === 'FMT') return 'Thesis';
    return t;
  };
  SV.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  SV.download = function (filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };
  /** Open or download a file record (repo file or browser-stored file). */
  SV.openFile = async function (fileId, mode) {
    const f = SV.file(fileId);
    if (!f) return;
    SV.addRecent({ type: 'File', title: f.title, href: '#/file/' + f.id, course: f.course });
    if (!f.local) {
      if (mode === 'download') {
        const a = document.createElement('a');
        a.href = f.path; a.download = f.path.split('/').pop(); document.body.appendChild(a); a.click(); a.remove();
      } else window.open(f.path, '_blank', 'noopener');
      return;
    }
    try {
      const rec = await SV.idb.get(f.id);
      if (!rec) return SV.toast('This file isn’t stored in this browser.');
      if (mode === 'download') return SV.download(f.name || f.title, rec.blob);
      const url = URL.createObjectURL(rec.blob);
      window.open(url, '_blank', 'noopener');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) { SV.toast('Couldn’t open the file: ' + e.message); }
  };
})();
