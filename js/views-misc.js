/* StudyVault — Search results and Settings */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  SV.views.search = function (view, params) {
    const q = (params.get('q') || '').trim();
    SV.buildIndex();
    const res = q ? SV.search(q, 200) : [];
    const types = Array.from(new Set(res.map((r) => r.type)));
    const active = params.get('type') || '';
    const shown = active ? res.filter((r) => r.type === active) : res;
    view.innerHTML =
      '<header class="page-head"><div><p class="crumb">Search</p><h1 class="display sm">' + (q ? 'Results for “' + esc(q) + '”' : 'Search') + '</h1>' +
      '<p class="page-sub">' + (q ? res.length + (res.length === 1 ? ' match' : ' matches') + ' across notes, deadlines, the library and files' : 'Search every note, week, deadline, case study, tool and file.') + '</p></div></header>' +
      '<form class="big-search" id="bigSearch">' + SV.icon('search') + '<input name="q" type="search" value="' + esc(q) + '" placeholder="Search StudyVault" aria-label="Search StudyVault"><button class="btn btn-primary" type="submit">Search</button></form>' +
      (types.length > 1 ? '<div class="filters">' + '<a class="filter' + (!active ? ' on' : '') + '" href="#/search?q=' + encodeURIComponent(q) + '">All ' + res.length + '</a>' +
        types.map((t) => '<a class="filter' + (active === t ? ' on' : '') + '" href="#/search?q=' + encodeURIComponent(q) + '&type=' + encodeURIComponent(t) + '">' + esc(t) + ' ' + res.filter((r) => r.type === t).length + '</a>').join('') + '</div>' : '') +
      (q && !res.length ? '<p class="empty">No matches. Try fewer words, or a course code like WA or DMT.</p>' : '') +
      '<ol class="results">' + shown.map((r) => {
        const href = r.file ? '#/file/' + r.file : (/^#\/note\//.test(r.href) ? r.href + (r.href.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(q) : r.href);
        return '<li><a class="result" href="' + esc(href) + '"><span class="r-type"><span class="dot" style="--c:' + SV.courseColor(r.course) + '"></span>' + esc(r.type) + '</span>' +
          '<span class="r-title">' + SV.highlight(r.title, q) + '</span><span class="r-sub">' + esc(r.sub || '') + '</span>' +
          (r.text ? '<span class="r-snip">' + SV.snippet(r.text, q, 200) + '</span>' : '') + '</a></li>';
      }).join('') + '</ol>';
    view.querySelector('#bigSearch').addEventListener('submit', (e) => { e.preventDefault(); const v = e.target.q.value.trim(); if (v) location.hash = '/search?q=' + encodeURIComponent(v); });
    if (!q) view.querySelector('#bigSearch input').focus();
  };

  /* ---------- Settings ---------- */
  async function exportBackup() {
    const data = { app: 'StudyVault', version: 1, exported: new Date().toISOString(), local: {}, files: [] };
    SV.LS.keys().forEach((k) => (data.local[k] = SV.LS.get(k)));
    try {
      const files = await SV.idb.all();
      for (const f of files) {
        const b64 = await new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f.blob); });
        data.files.push({ id: f.id, name: f.blob.name || f.id, type: f.blob.type, data: b64 });
      }
    } catch (e) {}
    SV.download('studyvault-backup-' + SV.iso(new Date()) + '.json', JSON.stringify(data), 'application/json');
    SV.toast('Backup downloaded');
  }
  async function importBackup(file) {
    try {
      const data = JSON.parse(await file.text());
      if (data.app !== 'StudyVault') throw new Error('This isn’t a StudyVault backup file.');
      if (!confirm('Replace everything saved in this browser with this backup?')) return;
      SV.LS.keys().forEach((k) => SV.LS.del(k));
      Object.entries(data.local || {}).forEach(([k, v]) => SV.LS.set(k, v));
      await SV.idb.clear();
      for (const f of data.files || []) {
        const blob = await (await fetch(f.data)).blob();
        await SV.idb.put({ id: f.id, blob: new File([blob], f.name, { type: f.type }) });
      }
      SV.toast('Backup restored');
      setTimeout(() => location.reload(), 600);
    } catch (e) { SV.toast('Couldn’t restore: ' + e.message); }
  }

  SV.views.settings = async function (view) {
    const s = SV.settings;
    const accents = [['#5B8CFF', 'Hub blue'], ['#3FC1B0', 'Teal'], ['#9B7BFF', 'Violet'], ['#E0A84B', 'Amber'], ['#E87A9A', 'Rose']];
    const nLocal = { notes: SV.LS.get('userNotes', []).length, files: SV.LS.get('userFiles', []).length, deadlines: SV.LS.get('userDeadlines', []).length };
    let usage = '';
    try { if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); usage = SV.size(e.usage || 0) + ' used in this browser'; } } catch (e) {}
    const radio = (name, val, label, cur) => '<label class="choice"><input type="radio" name="' + name + '" value="' + val + '"' + (String(cur) === String(val) ? ' checked' : '') + '><span>' + label + '</span></label>';

    view.innerHTML =
      '<header class="page-head"><div><p class="crumb">Settings</p><h1 class="display sm">Settings</h1></div></header>' +
      '<form class="settings" id="settings">' +
        '<section class="set-sec"><h2>Appearance</h2>' +
          '<div class="set-row"><div><h3>Theme</h3><p>Dark matches your project hub.</p></div><div class="choice-row">' + radio('theme', 'dark', 'Dark', s.theme) + radio('theme', 'light', 'Light', s.theme) + radio('theme', 'system', 'Match device', s.theme) + '</div></div>' +
          '<div class="set-row"><div><h3>Accent colour</h3><p>Used for links, buttons and highlights.</p></div><div class="swatches">' + accents.map(([c, n]) => '<label class="swatch" title="' + n + '"><input type="radio" name="accent" value="' + c + '"' + (s.accent.toLowerCase() === c.toLowerCase() ? ' checked' : '') + '><i style="background:' + c + '"></i><span class="sr">' + n + '</span></label>').join('') + '</div></div>' +
        '</section>' +
        '<section class="set-sec"><h2>Calendar</h2>' +
          '<div class="set-row"><div><h3>Week starts on</h3></div><div class="choice-row">' + radio('weekStart', 1, 'Monday', s.weekStart) + radio('weekStart', 0, 'Sunday', s.weekStart) + '</div></div>' +
          '<div class="set-row"><div><h3>Default view</h3></div><div class="choice-row">' + radio('calendarView', 'month', 'Month', s.calendarView) + radio('calendarView', 'agenda', 'List', s.calendarView) + '</div></div>' +
          '<div class="set-row"><div><h3>Show completed deadlines</h3><p>Ticked-off items stay visible, struck through.</p></div><label class="switch"><input type="checkbox" name="showDone"' + (s.showDone ? ' checked' : '') + '><i></i></label></div>' +
        '</section>' +
        '<section class="set-sec"><h2>Courses and study</h2>' +
          '<div class="set-row"><div><h3>Show next semester’s courses</h3><p>Lists the P3–P4 courses in the sidebar.</p></div><label class="switch"><input type="checkbox" name="showUpcoming"' + (s.showUpcoming ? ' checked' : '') + '><i></i></label></div>' +
          '<div class="set-row"><div><h3>Focus timer</h3><p>Minutes per focus round and per break.</p></div><div class="nums"><label>Focus <input type="number" name="focusLen" min="5" max="90" value="' + s.focusLen + '"></label><label>Break <input type="number" name="breakLen" min="1" max="30" value="' + s.breakLen + '"></label></div></div>' +
        '</section>' +
      '</form>' +
      '<section class="set-sec"><h2>Your data</h2>' +
        '<div class="set-row"><div><h3>Saved in this browser</h3><p>' + nLocal.notes + ' notes, ' + nLocal.files + ' files and ' + nLocal.deadlines + ' deadlines you added here' + (usage ? ' · ' + usage : '') + '. These don’t sync to other devices — export a backup to move them.</p></div>' +
          '<div class="btn-row"><button type="button" class="btn btn-ghost" id="exp">' + SV.icon('download') + 'Export backup</button><label class="btn btn-ghost">' + SV.icon('upload') + 'Import backup<input type="file" accept="application/json,.json" id="imp" hidden></label></div></div>' +
        '<div class="set-row"><div><h3>Recently viewed</h3><p>The list in the sidebar.</p></div><button type="button" class="btn btn-ghost" id="clrRecent">Clear list</button></div>' +
        '<div class="set-row"><div><h3>Reset this browser</h3><p>Deletes everything you added on the site here, plus quiz scores and settings. Course content from the repo stays.</p></div><button type="button" class="btn btn-ghost danger" id="reset">' + SV.icon('trash') + 'Reset</button></div>' +
      '</section>' +
      '<section class="set-sec"><h2>Adding notes with Claude</h2>' +
        '<div class="prose small"><p>Notes you import on the site live in this browser. For notes that show up everywhere, send the PDF to Claude with the course and week, e.g. <em>“Add this to Web Analytics week 2”</em>. Claude converts it into a note, stores the PDF for download, and pushes it to the <a href="https://github.com/debruynbrycedbb/StudyVault-Website" target="_blank" rel="noopener">StudyVault repo</a>. The site updates within a minute or two.</p><p>The same works for deadlines, case studies, tools and resources.</p></div>' +
      '</section>';

    const form = view.querySelector('#settings');
    form.addEventListener('change', () => {
      const fd = new FormData(form);
      SV.saveSettings({
        theme: fd.get('theme'), accent: fd.get('accent'), weekStart: +fd.get('weekStart'), calendarView: fd.get('calendarView'),
        showDone: !!fd.get('showDone'), showUpcoming: !!fd.get('showUpcoming'),
        focusLen: Math.min(90, Math.max(5, +fd.get('focusLen') || 25)), breakLen: Math.min(30, Math.max(1, +fd.get('breakLen') || 5))
      });
      if (SV.timer && !SV.timer.running) SV.timer.left = null;
      SV.renderSidebar(); SV.setActiveNav('settings');
      SV.toast('Settings saved');
    });
    view.querySelector('#exp').addEventListener('click', exportBackup);
    view.querySelector('#imp').addEventListener('change', (e) => e.target.files[0] && importBackup(e.target.files[0]));
    view.querySelector('#clrRecent').addEventListener('click', () => { SV.LS.set('recent', []); SV.renderRecent(); SV.toast('Recently viewed cleared'); });
    view.querySelector('#reset').addEventListener('click', async () => {
      if (!confirm('Delete everything saved in this browser? This can’t be undone.')) return;
      SV.LS.keys().forEach((k) => SV.LS.del(k));
      try { await SV.idb.clear(); } catch (e) {}
      location.hash = '/'; location.reload();
    });
  };
})();
