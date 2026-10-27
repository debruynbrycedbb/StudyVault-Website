/* StudyVault — Home */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* The semester constellation: current courses as stars, their upcoming deadlines as satellites. */
  function constellation() {
    const W = 660, H = 470, cx = 330, cy = 238;
    const r = rng(11);
    const courses = SV.courses().filter((c) => c.status === 'current');
    const up = SV.upcoming();
    const next = up[0];
    const nodes = courses.map((c, i) => {
      const a = -Math.PI / 2 + i * (2 * Math.PI / courses.length) + 0.42;
      return { c, a, x: cx + Math.cos(a) * 222, y: cy + Math.sin(a) * 168 };
    });
    // Background star field
    const stars = Array.from({ length: 95 }, () => ({ x: r() * W, y: r() * H, s: r() }));
    const seen = new Set();
    let bg = '';
    stars.forEach((p, i) => {
      const near = stars.map((q, j) => ({ j, d: (q.x - p.x) ** 2 + (q.y - p.y) ** 2 })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
      near.forEach((o) => {
        const k = Math.min(i, o.j) + '-' + Math.max(i, o.j);
        if (seen.has(k) || o.d > 9000) return;
        seen.add(k);
        bg += '<line x1="' + p.x.toFixed(1) + '" y1="' + p.y.toFixed(1) + '" x2="' + stars[o.j].x.toFixed(1) + '" y2="' + stars[o.j].y.toFixed(1) + '"/>';
      });
    });
    const dots = stars.map((p) => '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (0.8 + p.s * 1.3).toFixed(2) + '"/>').join('');

    let spokes = '', sats = '', nodesSvg = '', hi = '';
    nodes.forEach((n) => {
      const isNext = next && next.course === n.c.id;
      spokes += '<line class="spoke' + (isNext ? ' hot' : '') + '" x1="' + cx + '" y1="' + cy + '" x2="' + n.x.toFixed(1) + '" y2="' + n.y.toFixed(1) + '"/>';
      const ds = up.filter((d) => d.course === n.c.id);
      ds.forEach((d, k) => {
        const spread = 0.42;
        const aa = n.a + Math.PI + (k - (ds.length - 1) / 2) * spread;
        const rr = 40 + (k % 2) * 13;
        const sx = n.x + Math.cos(aa) * rr, sy = n.y + Math.sin(aa) * rr;
        const isN = next && d.id === next.id;
        sats += '<a href="#/calendar?d=' + d.date + '" class="sat' + (isN ? ' hot' : '') + '" style="--c:' + n.c.color + '"><title>' + esc(d.type + ' · ' + d.title + ' · ' + SV.fmt(d.date)) + '</title>' +
          '<line x1="' + n.x.toFixed(1) + '" y1="' + n.y.toFixed(1) + '" x2="' + sx.toFixed(1) + '" y2="' + sy.toFixed(1) + '"/>' +
          (d.type === 'Exam' ? '<rect x="' + (sx - 3.2).toFixed(1) + '" y="' + (sy - 3.2).toFixed(1) + '" width="6.4" height="6.4" transform="rotate(45 ' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ')"/>' : '<circle cx="' + sx.toFixed(1) + '" cy="' + sy.toFixed(1) + '" r="3.2"/>') + '</a>';
        if (isN) hi += '<circle class="ring" cx="' + sx.toFixed(1) + '" cy="' + sy.toFixed(1) + '" r="9"/>';
      });
      const label = n.c.name.length > 24 ? n.c.short : n.c.name;
      const upper = n.y < cy - 4;
      const half = label.length * 5.1;
      let anchor = 'middle', lx = n.x;
      if (n.x - half < 6) { anchor = 'start'; lx = n.x - 10; }
      else if (n.x + half > W - 6) { anchor = 'end'; lx = n.x + 10; }
      const ly = upper ? n.y - 20 : n.y + 28;
      nodesSvg += '<a href="#/course/' + n.c.id + '" class="node' + (isNext ? ' hot' : '') + '" style="--c:' + n.c.color + '"><title>' + esc(n.c.name) + '</title>' +
        '<circle class="halo" cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="13"/>' +
        '<circle class="core" cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="5"/>' +
        '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="' + anchor + '">' + esc(label.toUpperCase()) + '</text></a>';
      if (isNext) {
        hi += '<text class="next-label" x="' + lx.toFixed(1) + '" y="' + (upper ? ly - 17 : ly + 17).toFixed(1) + '" text-anchor="' + anchor + '">NEXT · ' + esc(next.type) + ' · ' + SV.fmt(next.date, { day: 'numeric', month: 'short' }).toUpperCase() + '</text>';
      }
    });

    return '<svg class="constellation" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Your current courses with their upcoming deadlines">' +
      '<defs><radialGradient id="glow"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="bg-lines">' + bg + '</g><g class="bg-dots">' + dots + '</g>' +
      '<g class="spokes">' + spokes + '</g>' + sats +
      '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="url(#glow)"/>' +
      '<circle class="hub" cx="' + cx + '" cy="' + cy + '" r="7"/><circle class="hub-ring" cx="' + cx + '" cy="' + cy + '" r="12"/>' +
      '<text class="hub-label" x="' + cx + '" y="' + (cy - 24) + '" text-anchor="middle">STUDY VAULT</text>' +
      nodesSvg + hi + '</svg>';
  }

  /* Semester timeline: every deadline between now and the thesis defense. */
  function timeline() {
    const all = SV.deadlines();
    if (!all.length) return '';
    const today = SV.today();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastD = SV.parseDate(all[all.length - 1].date);
    const end = new Date(lastD.getFullYear(), lastD.getMonth() + 1, 1);
    const span = end - start;
    const pct = (d) => ((d - start) / span * 100).toFixed(3);
    let months = '';
    for (let m = new Date(start); m < end; m.setMonth(m.getMonth() + 1)) {
      months += '<span class="tl-month" style="left:' + pct(m) + '%">' + m.toLocaleDateString('en-GB', { month: 'short' }) + (m.getMonth() === 0 ? ' ’' + String(m.getFullYear()).slice(2) : '') + '</span>';
    }
    const stack = {};
    const marks = all.filter((d) => SV.parseDate(d.date) >= start).map((d) => {
      const lvl = (stack[d.date] = (stack[d.date] || 0) + 1) - 1;
      const kind = d.type === 'Exam' ? 'exam' : d.type === 'FMT' ? 'thesis' : 'hand';
      return '<a class="tl-mark ' + kind + (d.done ? ' done' : '') + '" href="#/calendar?d=' + d.date + '" style="left:' + pct(SV.parseDate(d.date)) + '%;--c:' + SV.courseColor(d.course) + ';--lvl:' + lvl + '" aria-label="' + esc(d.type + ', ' + d.title + ', ' + SV.courseName(d.course) + ', ' + SV.fmt(d.date)) + '">' +
        '<span class="tl-tip"><strong>' + esc(SV.fmt(d.date, { weekday: 'short', day: 'numeric', month: 'short' })) + ' · ' + esc(d.type) + '</strong>' + esc(d.title) + '<em>' + esc(SV.courseName(d.course)) + '</em></span></a>';
    }).join('');
    const defense = all.find((d) => /defen[cs]e/i.test(d.title));
    const daysLeft = defense ? SV.daysUntil(defense.date) : null;
    return '<section class="timeline-wrap" aria-labelledby="tlH">' +
      '<div class="sec-head"><h2 id="tlH">Road to the defense</h2>' +
      (daysLeft != null && daysLeft >= 0 ? '<p class="sec-aside">' + daysLeft + ' days until the thesis defense on ' + SV.fmt(defense.date, { day: 'numeric', month: 'long' }) + '</p>' : '') + '</div>' +
      '<div class="timeline"><div class="tl-axis"></div>' + months +
      '<span class="tl-today" style="left:' + pct(new Date()) + '%"><span>Today</span></span>' + marks + '</div>' +
      '<ul class="tl-legend"><li><i class="lg hand"></i>Hand-in</li><li><i class="lg exam"></i>Exam</li><li><i class="lg thesis"></i>Thesis</li></ul>' +
      '</section>';
  }

  SV.views = SV.views || {};
  SV.views.home = function (view) {
    const cs = SV.courses();
    const current = cs.filter((c) => c.status === 'current');
    const up = SV.upcoming();
    const notes = SV.notes();
    const recentNotes = SV.LS.get('recent', []).filter((r) => r.type === 'Note').slice(0, 1);
    const last = recentNotes[0] && SV.note(recentNotes[0].href.replace('#/note/', ''));

    const courseCard = (c) => {
      const nNotes = notes.filter((n) => n.course === c.id).length;
      const nFiles = SV.files().filter((f) => f.course === c.id).length;
      const nd = up.find((d) => d.course === c.id);
      return '<a class="course-card" href="#/course/' + c.id + '" style="--c:' + c.color + '">' +
        '<h3><span class="dot"></span>' + esc(c.name) + '</h3>' +
        '<p class="cc-sub">' + esc([c.period, c.lecturer].filter(Boolean).join(' · ')) + '</p>' +
        '<p class="cc-stats">' + (c.weeks.length ? c.weeks.length + (c.weeks.length === 1 ? ' week' : ' weeks') + ' · ' + nNotes + (nNotes === 1 ? ' note' : ' notes') + ' · ' + nFiles + (nFiles === 1 ? ' file' : ' files') : 'No notes yet') + '</p>' +
        '<p class="cc-next">' + (nd ? '<span class="tag t-' + SV.slug(SV.typeLabel(nd.type)) + '">' + esc(nd.type) + '</span>' + esc(SV.relDays(nd.date)) + ' · ' + esc(SV.fmt(nd.date, { day: 'numeric', month: 'short' })) : '<span class="muted">No upcoming deadlines</span>') + '</p></a>';
    };

    const noteItem = (n) => {
      const words = (n.body || '').split(/\s+/).length;
      return '<li><a class="note-item" href="#/note/' + n.id + '" style="--c:' + SV.courseColor(n.course) + '">' +
        '<span class="ni-code">' + esc(SV.courseShort(n.course)) + '</span>' +
        '<span class="ni-text"><span class="ni-title">' + esc(n.title) + '</span><span class="ni-sub">Week ' + n.week + (n.date ? ' · ' + SV.fmt(n.date, { day: 'numeric', month: 'short' }) : '') + ' · ' + Math.max(1, Math.round(words / 230)) + ' min read</span></span></a></li>';
    };
    const sortedNotes = notes.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    view.innerHTML =
      '<section class="hero">' +
        '<div class="hero-text">' +
          '<p class="badge">' + esc(SV.vault.program.student) + '</p>' +
          '<h1 class="display">Everything I study, in one place</h1>' +
          '<hr class="rule">' +
          '<p class="lede">' + esc(SV.vault.program.name) + ', ' + esc(SV.vault.program.school.split(' · ')[0]) + ' ' + esc(SV.vault.program.year) + '. ' +
            current.length + ' courses this semester, ' + up.length + ' deadlines still to go, and the notes from every class.</p>' +
          '<div class="hero-actions"><a class="btn btn-primary" href="#/calendar">' + SV.icon('calendar') + 'Open calendar</a><a class="btn btn-ghost" href="#/tools/quiz">' + SV.icon('quiz') + 'Practice quiz</a></div>' +
        '</div>' +
        '<div class="hero-art">' + constellation() + '</div>' +
      '</section>' +
      timeline() +
      '<div class="home-grid">' +
        '<section aria-labelledby="upH"><div class="sec-head"><h2 id="upH">Up next</h2><a class="sec-link" href="#/calendar?view=agenda">All deadlines</a></div>' +
          (up.length ? '<ul class="dl-list">' + up.slice(0, 5).map((d) => SV.deadlineRow(d)).join('') + '</ul>' : '<p class="empty">Nothing due. Add a deadline to see it here.</p>') +
        '</section>' +
        '<section aria-labelledby="notesH"><div class="sec-head"><h2 id="notesH">' + (last ? 'Pick up where you left off' : 'Latest notes') + '</h2></div>' +
          (last ? '<a class="resume" href="#/note/' + last.id + '" style="--c:' + SV.courseColor(last.course) + '"><span class="r-k">' + esc(SV.courseName(last.course)) + ' · Week ' + last.week + '</span><span class="r-t">' + esc(last.title) + '</span></a>' : '') +
          '<ul class="note-list">' + sortedNotes.filter((n) => !last || n.id !== last.id).slice(0, 5).map(noteItem).join('') + '</ul>' +
        '</section>' +
      '</div>' +
      '<section aria-labelledby="csH"><div class="sec-head"><h2 id="csH">This semester</h2><p class="sec-aside">' + cs.filter((c) => c.status === 'upcoming').length + ' more courses start next semester</p></div>' +
        '<div class="course-grid">' + current.map(courseCard).join('') + '</div></section>';

    SV.bindDeadlineButtons(view);
  };
})();
