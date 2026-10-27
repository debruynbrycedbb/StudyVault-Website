/* StudyVault — Research library */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  const KINDS = {
    cases: { label: 'Case studies', one: 'case study', icon: 'case', blurb: 'Real examples from class: what happened and what to take from it.' },
    tools: { label: 'Tools', one: 'tool', icon: 'tools', blurb: 'Software and platforms that came up in your courses.' },
    resources: { label: 'Resources & docs', one: 'resource', icon: 'book', blurb: 'Studies, laws, articles and documentation to cite.' }
  };
  let filterCourse = '', filterText = '';

  function card(kind, x, focus) {
    const c = x.course ? SV.vault.courses.find((y) => y.id === x.course) : null;
    const courseTag = c ? '<a class="ctag" href="#/course/' + c.id + '" style="--c:' + c.color + '"><span class="dot"></span>' + esc(c.short) + '</a>' : '';
    let actions = '';
    if (x.note) actions += '<a class="btn btn-ghost sm" href="#/note/' + x.note + '">' + SV.icon('note') + 'Read in notes</a>';
    if (x.noteRef) actions += '<a class="btn btn-ghost sm" href="#/note/' + x.noteRef + '">' + SV.icon('note') + 'Open summary</a>';
    if (x.fileRef) actions += '<button type="button" class="btn btn-ghost sm" data-open-file="' + x.fileRef + '">' + SV.icon('file') + 'Open PDF</button>';
    if (x.localFile) actions += '<button type="button" class="btn btn-ghost sm" data-open-file="' + x.localFile + '">' + SV.icon('file') + 'Open file</button>';
    if (x.url) actions += '<a class="btn btn-ghost sm" href="' + esc(x.url) + '" target="_blank" rel="noopener" data-rec="' + esc(x.id) + '">' + SV.icon('external') + (kind === 'tools' ? 'Visit' : 'Open source') + '</a>';
    if (x.local) actions += '<button type="button" class="icon-btn sm" data-del-lib="' + x.id + '" aria-label="Delete">' + SV.icon('trash') + '</button>';
    return '<article class="lib-card k-' + kind + (focus ? ' focus' : '') + '" id="item-' + esc(x.id) + '">' +
      '<div class="lc-top">' + courseTag + (x.category ? '<span class="cat">' + esc(x.category) + '</span>' : '') + (x.local ? '<span class="cat">Added by you</span>' : '') + '</div>' +
      '<h3>' + esc(x.title) + '</h3>' +
      (x.summary ? '<p>' + esc(x.summary) + '</p>' : '') +
      (x.lesson ? '<p class="lesson"><strong>Takeaway</strong>' + esc(x.lesson) + '</p>' : '') +
      ((x.tags || []).length ? '<ul class="tags sm">' + x.tags.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul>' : '') +
      (actions ? '<div class="lc-actions">' + actions + '</div>' : '') +
      '</article>';
  }

  function addDialog(kind) {
    const k = KINDS[kind];
    SV.dialog('Add a ' + k.one,
      '<div class="grid2">' +
      '<label class="field span2"><span>Title</span><input name="title" required maxlength="160"></label>' +
      '<label class="field"><span>Course</span><select name="course">' + SV.courseOptions('', { allowNone: true }) + '</select></label>' +
      '<label class="field"><span>Category <em>(optional)</em></span><input name="category" maxlength="40" placeholder="' + (kind === 'tools' ? 'e.g. Social listening' : kind === 'cases' ? 'e.g. Retail' : 'e.g. Article, Study, Law') + '"></label>' +
      '<label class="field span2"><span>Link <em>(optional)</em></span><input name="url" type="url" placeholder="https://"></label>' +
      '<label class="field span2"><span>Summary</span><textarea name="summary" rows="3" maxlength="800"></textarea></label>' +
      (kind === 'cases' ? '<label class="field span2"><span>Takeaway <em>(optional)</em></span><textarea name="lesson" rows="2" maxlength="400"></textarea></label><label class="field span2"><span>Tags <em>(comma separated)</em></span><input name="tags" maxlength="120"></label>' : '') +
      (kind !== 'tools' ? '<label class="field span2"><span>Attach a file <em>(optional)</em></span><input name="file" type="file"></label>' : '') +
      '</div><p class="form-err" role="alert"></p>',
      {
        submit: 'Add ' + k.one,
        onSubmit: async (fd) => {
          const title = fd.get('title').trim();
          if (!title) throw new Error('Add a title.');
          let url = (fd.get('url') || '').trim();
          if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
          const rec = { id: SV.uid('ul'), title, course: fd.get('course'), category: (fd.get('category') || '').trim(), url, summary: (fd.get('summary') || '').trim() };
          if (kind === 'cases') { rec.lesson = (fd.get('lesson') || '').trim(); rec.tags = (fd.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean); }
          const file = fd.get('file');
          if (file && file.size) {
            const fid = SV.uid('uf');
            await SV.idb.put({ id: fid, blob: file });
            const files = SV.LS.get('userFiles', []);
            files.push({ id: fid, course: rec.course, week: null, kind: k.one, title: file.name, name: file.name, size: file.size, scope: 'library' });
            SV.LS.set('userFiles', files);
            rec.localFile = fid;
          }
          const all = SV.LS.get('userLibrary', {});
          (all[kind] = all[kind] || []).push(rec);
          SV.LS.set('userLibrary', all);
          SV.toast('Added to ' + k.label.toLowerCase());
          SV.refresh();
        }
      });
  }

  SV.views.library = function (view, params, kindParam) {
    const kind = KINDS[kindParam] ? kindParam : 'cases';
    const focus = params.get('item');
    const courses = SV.courses();
    const counts = Object.fromEntries(Object.keys(KINDS).map((k) => [k, SV.library(k).length]));

    const render = () => {
      const t = filterText.toLowerCase();
      const list = SV.library(kind).filter((x) => (!filterCourse || x.course === filterCourse) &&
        (!t || [x.title, x.summary, x.lesson, x.category, (x.tags || []).join(' ')].join(' ').toLowerCase().includes(t)));
      const grid = view.querySelector('#libGrid');
      grid.innerHTML = list.length ? list.map((x) => card(kind, x, x.id === focus)).join('') : '<p class="empty">Nothing here' + (filterText || filterCourse ? ' matches your filter' : ' yet') + '. Add your first ' + KINDS[kind].one + ' with the button above.</p>';
      SV.bindFileButtons(grid);
      grid.querySelectorAll('[data-del-lib]').forEach((b) => b.addEventListener('click', () => {
        if (!confirm('Delete this item?')) return;
        const all = SV.LS.get('userLibrary', {});
        all[kind] = (all[kind] || []).filter((x) => x.id !== b.dataset.delLib);
        SV.LS.set('userLibrary', all); SV.refresh();
      }));
      grid.querySelectorAll('[data-rec]').forEach((a) => a.addEventListener('click', () => {
        const x = SV.library(kind).find((y) => y.id === a.dataset.rec);
        if (x) SV.addRecent({ type: KINDS[kind].one.replace(/^./, (s) => s.toUpperCase()), title: x.title, href: '#/library/' + kind + '?item=' + x.id, course: x.course });
      }));
    };

    view.innerHTML =
      '<header class="page-head"><div><p class="crumb">Research library</p><h1 class="display sm">' + KINDS[kind].label + '</h1><p class="page-sub">' + KINDS[kind].blurb + '</p></div>' +
      '<div class="head-actions"><button type="button" class="btn btn-primary" id="addLib">' + SV.icon('plus') + 'Add ' + KINDS[kind].one + '</button></div></header>' +
      '<nav class="tabs" aria-label="Library sections">' + Object.keys(KINDS).map((k) =>
        '<a class="tab' + (k === kind ? ' on' : '') + '" href="#/library/' + k + '">' + KINDS[k].label + ' <span class="count">' + counts[k] + '</span></a>').join('') + '</nav>' +
      '<div class="lib-filters">' +
        '<label class="mini-search">' + SV.icon('search') + '<input type="search" id="libQ" placeholder="Filter ' + KINDS[kind].label.toLowerCase() + '…" value="' + esc(filterText) + '"></label>' +
        '<select id="libC" aria-label="Filter by course"><option value="">All courses</option>' + courses.filter((c) => SV.library(kind).some((x) => x.course === c.id)).map((c) => '<option value="' + c.id + '"' + (c.id === filterCourse ? ' selected' : '') + '>' + esc(c.name) + '</option>').join('') + '</select>' +
      '</div>' +
      '<div class="lib-grid" id="libGrid"></div>';

    view.querySelector('#addLib').addEventListener('click', () => addDialog(kind));
    view.querySelector('#libQ').addEventListener('input', (e) => { filterText = e.target.value; render(); });
    view.querySelector('#libC').addEventListener('change', (e) => { filterCourse = e.target.value; render(); });
    if (focus) { filterText = ''; filterCourse = ''; view.querySelector('#libQ').value = ''; view.querySelector('#libC').value = ''; }
    render();
    if (focus) {
      const el = view.querySelector('#item-' + CSS.escape(focus));
      if (el) {
        setTimeout(() => el.scrollIntoView({ block: 'center' }), 40);
        const x = SV.library(kind).find((y) => y.id === focus);
        if (x) SV.addRecent({ type: KINDS[kind].one.replace(/^./, (s) => s.toUpperCase()), title: x.title, href: '#/library/' + kind + '?item=' + x.id, course: x.course });
      }
    }
  };
})();
