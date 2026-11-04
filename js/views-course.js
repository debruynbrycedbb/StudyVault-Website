/* StudyVault — Course pages and the note reader */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  function weekBlock(c, w, open) {
    const notes = SV.notes().filter((n) => n.course === c.id && n.week === w.n);
    const files = SV.files().filter((f) => f.course === c.id && f.week === w.n && f.scope !== 'extra');
    const label = w.label || 'Week ' + String(w.n).padStart(2, '0');
    return '<details class="week" id="week-' + w.n + '"' + (open ? ' open' : '') + '>' +
      '<summary><span class="wk-num">' + label + '</span>' +
        '<span class="wk-title">' + (w.title ? esc(w.title) : '<span class="muted">Untitled week</span>') + '</span>' +
        '<span class="wk-meta">' + (w.date ? esc(SV.fmt(w.date, { day: 'numeric', month: 'short' })) + ' · ' : '') + notes.length + (notes.length === 1 ? ' note' : ' notes') + ' · ' + files.length + (files.length === 1 ? ' file' : ' files') + '</span>' +
        SV.icon('down', 'wk-chev') + '</summary>' +
      '<div class="wk-body">' +
        '<div class="wk-col"><h4>Notes</h4>' +
          (notes.length ? '<ul class="wk-notes">' + notes.map((n) => {
            const words = (n.body || '').split(/\s+/).length;
            return '<li><a class="wk-note" href="#/note/' + n.id + '">' + SV.icon('note') + '<span><strong>' + esc(n.title) + '</strong><em>' + Math.max(1, Math.round(words / 230)) + ' min read' + (n.local ? ' · this browser' : '') + '</em></span></a></li>';
          }).join('') + '</ul>' : '<p class="empty sm">No notes for this week yet.</p>') +
          '<button type="button" class="btn btn-ghost sm" data-add-notes="' + w.n + '">' + SV.icon('upload') + 'Add notes or import PDF</button>' +
        '</div>' +
        '<div class="wk-col"><h4>Files</h4>' +
          (files.length ? '<ul class="file-list">' + files.map(SV.fileRow).join('') + '</ul>' : '<p class="empty sm">No files yet.</p>') +
          '<button type="button" class="btn btn-ghost sm" data-attach="' + w.n + '">' + SV.icon('plus') + 'Upload files</button>' +
        '</div>' +
      '</div>' +
      (w.local && !notes.length && !files.length ? '<button type="button" class="link-btn danger" data-remove-week="' + w.n + '">Remove this empty week</button>' : '') +
      '</details>';
  }

  function extrasPane(c) {
    const extras = SV.extras(c.id);
    const files = SV.files().filter((f) => f.course === c.id && f.scope === 'extra');
    const related = [['cases', 'Case studies'], ['tools', 'Tools'], ['resources', 'Resources']]
      .map(([k, l]) => [k, l, SV.library(k).filter((x) => x.course === c.id)]).filter((x) => x[2].length);
    return '<div class="extras">' +
      '<div class="extras-actions"><button type="button" class="btn btn-ghost sm" data-add-extra="link">' + SV.icon('link') + 'Add link</button>' +
      '<button type="button" class="btn btn-ghost sm" data-add-extra="note">' + SV.icon('note') + 'Add note</button>' +
      '<button type="button" class="btn btn-ghost sm" data-attach-extra>' + SV.icon('upload') + 'Upload file</button></div>' +
      (extras.length ? '<ul class="extra-list">' + extras.map((x) =>
        '<li class="extra">' + SV.icon(x.type === 'link' ? 'link' : 'note') +
        '<div><h4>' + (x.url ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.title) + '</a>' : esc(x.title)) + '</h4>' +
        (x.body ? '<div class="extra-body">' + SV.md(x.body) + '</div>' : '') + (x.url ? '<p class="muted sm">' + esc(x.url.replace(/^https?:\/\//, '')) + '</p>' : '') + '</div>' +
        (x.local ? '<button type="button" class="icon-btn sm" data-del-extra="' + x.id + '" aria-label="Delete">' + SV.icon('trash') + '</button>' : '') + '</li>').join('') + '</ul>' : '') +
      (files.length ? '<h3 class="sub-h">Files</h3><ul class="file-list">' + files.map(SV.fileRow).join('') + '</ul>' : '') +
      (!extras.length && !files.length ? '<p class="empty">Keep useful extras here: links, readings, templates, examples from class.</p>' : '') +
      (related.length ? '<h3 class="sub-h">From the research library</h3><div class="related">' + related.map(([k, l, list]) =>
        '<div><h4>' + l + '</h4><ul>' + list.map((x) => '<li><a href="#/library/' + k + '?item=' + x.id + '">' + esc(x.title) + '</a></li>').join('') + '</ul></div>').join('') + '</div>' : '') +
      '</div>';
  }

  function extraDialog(c, type) {
    SV.dialog(type === 'link' ? 'Add a link' : 'Add a note',
      '<label class="field"><span>Title</span><input name="title" required maxlength="140"></label>' +
      (type === 'link' ? '<label class="field"><span>URL</span><input name="url" type="url" required placeholder="https://"></label>' : '') +
      '<label class="field"><span>' + (type === 'link' ? 'Why it’s useful <em>(optional)</em>' : 'Note (Markdown)') + '</span><textarea name="body" rows="' + (type === 'link' ? 3 : 8) + '"></textarea></label><p class="form-err" role="alert"></p>',
      {
        submit: 'Save',
        onSubmit: (fd) => {
          const title = fd.get('title').trim();
          if (!title) throw new Error('Add a title.');
          let url = type === 'link' ? (fd.get('url') || '').trim() : '';
          if (type === 'link') {
            if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
            try { new URL(url); } catch (e) { throw new Error('That URL doesn’t look right.'); }
          }
          const all = SV.LS.get('userExtras', {});
          (all[c.id] = all[c.id] || []).push({ id: SV.uid('ux'), type, title, url, body: fd.get('body').trim() });
          SV.LS.set('userExtras', all);
          SV.toast('Saved to ' + c.short + ' additional content');
          SV.refresh();
        }
      });
  }

  SV.views.course = function (view, params, id) {
    const c = SV.course(id);
    if (!c) { view.innerHTML = '<div class="notfound"><h1 class="display sm">Course not found</h1><p><a href="#/">Back to home</a></p></div>'; return; }
    SV.addRecent({ type: 'Course', title: c.name, href: '#/course/' + c.id, course: c.id });
    const tab = params.get('tab') || 'weeks';
    const sectioned = c.weeks.some((w) => w.label);
    const openWeek = +params.get('week') || (c.weeks.length ? (sectioned ? c.weeks[0].n : c.weeks[c.weeks.length - 1].n) : 0);
    const dls = SV.deadlines().filter((d) => d.course === c.id || (d.course === 'all' && c.status === 'current' && c.id !== 'masters-thesis'));
    const up = dls.filter((d) => !d.done && SV.endOfDeadline(d) >= new Date());
    const nextN = c.weeks.length ? Math.max.apply(null, c.weeks.map((w) => w.n)) + 1 : 1;
    const meta = [c.period, c.code, c.ects ? c.ects + ' ECTS' : '', c.lecturer].filter(Boolean);

    view.innerHTML =
      '<header class="course-head" style="--c:' + c.color + '">' +
        '<p class="crumb"><a href="#/">Home</a> / ' + (c.status === 'upcoming' ? 'Next semester' : 'This semester') + '</p>' +
        '<h1 class="display sm"><span class="big-dot"></span>' + esc(c.name) + '</h1>' +
        '<p class="meta-line">' + meta.map(esc).join('<span class="sep"></span>') + '</p>' +
        (c.about ? '<p class="about">' + esc(c.about) + '</p>' : '') +
        (up[0] ? '<a class="next-due" href="#/calendar?d=' + up[0].date + '"><span class="nd-k">Next due</span><span class="nd-v"><span class="tag t-' + SV.slug(SV.typeLabel(up[0].type)) + '">' + esc(up[0].type) + '</span>' + esc(up[0].title) + '</span><span class="nd-w">' + esc(SV.fmt(up[0].date, { weekday: 'short', day: 'numeric', month: 'short' })) + ' · ' + esc(SV.relDays(up[0].date)) + '</span></a>' : '') +
      '</header>' +
      (c.assessment ? '<aside class="callout"><h3>Assessment and rules</h3><p>' + esc(c.assessment) + '</p></aside>' : '') +
      '<nav class="tabs" aria-label="Course sections">' +
        '<a class="tab' + (tab === 'weeks' ? ' on' : '') + '" href="#/course/' + c.id + '">' + (c.weeks.some((w) => w.label) ? 'Sections' : 'Weeks') + ' <span class="count">' + c.weeks.length + '</span></a>' +
        '<a class="tab' + (tab === 'deadlines' ? ' on' : '') + '" href="#/course/' + c.id + '?tab=deadlines">Deadlines <span class="count">' + dls.length + '</span></a>' +
        '<a class="tab' + (tab === 'extras' ? ' on' : '') + '" href="#/course/' + c.id + '?tab=extras">Additional content</a>' +
      '</nav>' +
      '<div class="tab-body">' +
      (tab === 'weeks'
        ? (c.weeks.length ? (sectioned ? c.weeks.slice() : c.weeks.slice().reverse()).map((w) => weekBlock(c, w, w.n === openWeek)).join('') : '<div class="empty-state">' + SV.icon('layers') + '<h3>No weeks yet</h3><p>Add Week 1 to start storing notes and files for ' + esc(c.name) + '. You can also send the PDFs to Claude and they’ll be added here for you.</p></div>') +
          (sectioned ? '' : '<button type="button" class="add-week" id="addWeek">' + SV.icon('plus') + 'Add week ' + String(nextN).padStart(2, '0') + '</button>')
        : tab === 'deadlines'
          ? '<div class="tab-tools"><button type="button" class="btn btn-ghost sm" id="addCourseDl">' + SV.icon('plus') + 'Add a deadline for ' + esc(c.short) + '</button></div>' +
            (dls.length ? '<ul class="dl-list">' + dls.map((d) => SV.deadlineRow(d, { hideCourse: d.course === c.id })).join('') + '</ul>' : '<p class="empty">No deadlines for this course yet.</p>')
          : extrasPane(c)) +
      '</div>';

    // Bindings
    view.querySelectorAll('[data-add-notes]').forEach((b) => b.addEventListener('click', () => SV.addNotesDialog(c.id, +b.dataset.addNotes)));
    view.querySelectorAll('[data-attach]').forEach((b) => b.addEventListener('click', () => SV.attachDialog(c.id, +b.dataset.attach, 'week')));
    view.querySelectorAll('[data-remove-week]').forEach((b) => b.addEventListener('click', () => {
      const all = SV.LS.get('userWeeks', {});
      all[c.id] = (all[c.id] || []).filter((n) => n !== +b.dataset.removeWeek);
      SV.LS.set('userWeeks', all); SV.refresh();
    }));
    const aw = view.querySelector('#addWeek');
    if (aw) aw.addEventListener('click', () => {
      const all = SV.LS.get('userWeeks', {});
      (all[c.id] = all[c.id] || []).push(nextN);
      SV.LS.set('userWeeks', all);
      SV.toast('Week ' + nextN + ' added');
      location.hash = '/course/' + c.id + '?week=' + nextN;
    });
    const acd = view.querySelector('#addCourseDl');
    if (acd) acd.addEventListener('click', () => SV.deadlineDialog({ course: c.id }));
    view.querySelectorAll('[data-add-extra]').forEach((b) => b.addEventListener('click', () => extraDialog(c, b.dataset.addExtra)));
    const ae = view.querySelector('[data-attach-extra]');
    if (ae) ae.addEventListener('click', () => SV.attachDialog(c.id, null, 'extra'));
    view.querySelectorAll('[data-del-extra]').forEach((b) => b.addEventListener('click', () => {
      if (!confirm('Delete this item?')) return;
      const all = SV.LS.get('userExtras', {});
      all[c.id] = (all[c.id] || []).filter((x) => x.id !== b.dataset.delExtra);
      SV.LS.set('userExtras', all); SV.refresh();
    }));
    SV.bindFileButtons(view);
    SV.bindDeadlineButtons(view);
    if (params.get('week')) { const el = view.querySelector('#week-' + params.get('week')); if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 30); }
  };

  /* ---------- Note reader ---------- */
  function markText(root, q) {
    const terms = q.split(/\s+/).filter((t) => t.length > 1).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!terms.length) return null;
    const re = new RegExp('(' + terms.join('|') + ')', 'ig');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (re.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const span = document.createElement('span');
      span.innerHTML = SV.esc(n.nodeValue).replace(re, '<mark>$1</mark>');
      n.parentNode.replaceChild(span, n);
    });
    return root.querySelector('mark');
  }

  SV.views.note = function (view, params, id) {
    const n = SV.note(id);
    if (!n) { view.innerHTML = '<div class="notfound"><h1 class="display sm">Note not found</h1><p>It may have been deleted, or it was saved in a different browser. <a href="#/">Back to home</a></p></div>'; return; }
    const c = SV.course(n.course);
    SV.addRecent({ type: 'Note', title: n.title, href: '#/note/' + n.id, course: n.course });
    const src = n.source && SV.file(n.source);
    const sameWeek = SV.files().filter((f) => f.course === n.course && f.week === n.week && f.id !== n.source && f.scope !== 'extra');
    const hasQuiz = SV.quizBank.some((q) => q.note === n.id || (q.course === n.course));
    const words = (n.body || '').split(/\s+/).length;

    view.innerHTML =
      '<article class="reader" style="--c:' + c.color + '">' +
        '<header class="reader-head">' +
          '<p class="crumb"><a href="#/course/' + c.id + '">' + esc(c.name) + '</a> / <a href="#/course/' + c.id + '?week=' + n.week + '">' + esc(SV.weekLabel(n.course, n.week)) + '</a></p>' +
          '<h1 class="reader-title">' + esc(n.title) + '</h1>' +
          '<p class="meta-line">' + [n.date ? SV.fmt(n.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '', Math.max(1, Math.round(words / 230)) + ' min read', n.local ? 'Saved in this browser' : ''].filter(Boolean).map(esc).join('<span class="sep"></span>') + '</p>' +
          '<div class="reader-actions">' +
            (src ? '<button type="button" class="btn btn-primary" data-download-file="' + src.id + '">' + SV.icon('download') + 'Download PDF</button><button type="button" class="btn btn-ghost" data-open-file="' + src.id + '">' + SV.icon('external') + 'Open original</button>' : '') +
            (hasQuiz ? '<a class="btn btn-ghost" href="#/tools/quiz?course=' + n.course + '">' + SV.icon('quiz') + 'Quiz me on ' + esc(c.short) + '</a>' : '') +
            '<button type="button" class="btn btn-ghost" id="dlMd">' + SV.icon('note') + 'Save as Markdown</button>' +
            (n.local ? '<button type="button" class="btn btn-ghost" id="editNote">' + SV.icon('edit') + 'Edit</button><button type="button" class="btn btn-ghost danger" id="delNote">' + SV.icon('trash') + 'Delete</button>' : '') +
          '</div>' +
          ((n.tags || []).length ? '<ul class="tags">' + n.tags.map((t) => '<li><button type="button" data-tag="' + esc(t) + '">' + esc(t) + '</button></li>').join('') + '</ul>' : '') +
        '</header>' +
        '<div class="reader-grid">' +
          '<nav class="toc" aria-label="On this page"><h2>On this page</h2><ol id="toc"></ol>' +
            (sameWeek.length ? '<h2>Also in ' + esc(SV.weekLabel(n.course, n.week)) + '</h2><ul class="file-list mini">' + sameWeek.map(SV.fileRow).join('') + '</ul>' : '') +
          '</nav>' +
          '<div class="prose" id="prose">' + SV.md(n.body) + '</div>' +
        '</div>' +
      '</article>';

    const prose = view.querySelector('#prose');
    // Drop the duplicate H1 (title is already in the header) and build the TOC.
    const h1 = prose.querySelector('h1'); if (h1) h1.remove();
    prose.querySelectorAll('table').forEach((t) => { const w = document.createElement('div'); w.className = 'table-wrap'; t.parentNode.insertBefore(w, t); w.appendChild(t); });
    prose.querySelectorAll('a[href^="http"]').forEach((a) => { a.target = '_blank'; a.rel = 'noopener'; });
    const toc = view.querySelector('#toc');
    const heads = prose.querySelectorAll('h2');
    heads.forEach((h) => { h.id = SV.slug(h.textContent); toc.insertAdjacentHTML('beforeend', '<li><a href="#" data-target="' + h.id + '">' + esc(h.textContent) + '</a></li>'); });
    if (!heads.length) view.querySelector('.toc').classList.add('empty-toc');
    toc.addEventListener('click', (e) => { const a = e.target.closest('a'); if (!a) return; e.preventDefault(); const t = document.getElementById(a.dataset.target); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    // Highlight the current section in the TOC while reading.
    if ('IntersectionObserver' in window && heads.length) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => { if (en.isIntersecting) { toc.querySelectorAll('a').forEach((a) => a.classList.toggle('on', a.dataset.target === en.target.id)); } });
      }, { rootMargin: '-10% 0px -75% 0px' });
      heads.forEach((h) => io.observe(h));
    }
    view.querySelectorAll('[data-tag]').forEach((b) => b.addEventListener('click', () => SV.openPalette(b.dataset.tag)));
    view.querySelector('#dlMd').addEventListener('click', () => SV.download(SV.slug(n.title) + '.md', n.body, 'text/markdown'));
    const en = view.querySelector('#editNote'); if (en) en.addEventListener('click', () => SV.editNoteDialog(n.id));
    const dn = view.querySelector('#delNote'); if (dn) dn.addEventListener('click', async () => { if (await SV.deleteNote(n.id)) location.hash = '/course/' + n.course + '?week=' + n.week; });
    SV.bindFileButtons(view);

    const q = params.get('q');
    const s = params.get('s');
    setTimeout(() => {
      let target = null;
      if (s) target = document.getElementById(s);
      if (q) { const m = markText(prose, q); if (!target) target = m; }
      if (target) target.scrollIntoView({ block: 'center' });
    }, 40);
  };

  /* A file route (from search / recent): open it, then return. */
  SV.views.file = function (view, params, id) {
    const f = SV.file(id);
    if (!f) { view.innerHTML = '<div class="notfound"><h1 class="display sm">File not found</h1></div>'; return; }
    view.innerHTML = '<div class="file-page"><p class="crumb">' + (f.course ? '<a href="#/course/' + f.course + (f.week ? '?week=' + f.week : '') + '">' + esc(SV.courseName(f.course)) + (f.week ? ' / ' + esc(SV.weekLabel(f.course, f.week)) : '') + '</a>' : 'General') + '</p>' +
      '<h1 class="display sm">' + esc(f.title) + '</h1><p class="meta-line">' + esc(f.kind || '') + ' · ' + SV.size(f.size) + '</p>' +
      '<div class="reader-actions"><button type="button" class="btn btn-primary" data-open-file="' + f.id + '">' + SV.icon('external') + 'Open</button><button type="button" class="btn btn-ghost" data-download-file="' + f.id + '">' + SV.icon('download') + 'Download</button></div>' +
      (!f.local && /\.pdf$/i.test(f.path) ? '<iframe class="pdf-frame" src="' + esc(f.path) + '" title="' + esc(f.title) + '"></iframe>' : '') +
      (!f.local && /\.(jpe?g|png|webp|gif)$/i.test(f.path) ? '<img class="file-img" src="' + esc(f.path) + '" alt="' + esc(f.title) + '">' : '') + '</div>';
    SV.bindFileButtons(view);
    SV.addRecent({ type: 'File', title: f.title, href: '#/file/' + f.id, course: f.course });
  };
})();
