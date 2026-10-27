/* StudyVault — Study tools */
(function () {
  'use strict';
  const SV = window.SV;
  const esc = SV.esc;

  const TOOLS = [
    { id: 'quiz', title: 'Practice quiz', icon: 'quiz', text: 'Multiple-choice questions written from your notes, with the reasoning after each answer.' },
    { id: 'flashcards', title: 'Flashcards', icon: 'cards', text: 'Flip through key ideas. Mark what you know and the rest comes back first.' },
    { id: 'focus', title: 'Focus timer', icon: 'clock', text: 'Pomodoro sessions logged against a course, so you can see where your time goes.' },
    { id: 'formulas', title: 'Metrics calculator', icon: 'calc', text: 'CTR, conversion rate, CPA and ROAS from your own numbers.' },
    { id: 'debate', title: 'Debate prep', icon: 'chat', text: 'Write your position on each class debate question before the session.' }
  ];

  function questionsFor(course) {
    return SV.quizBank.filter((q) => !course || q.course === course);
  }
  function quizCourses() {
    const ids = Array.from(new Set(SV.quizBank.map((q) => q.course)));
    return ids.map((id) => SV.vault.courses.find((c) => c.id === id)).filter(Boolean);
  }
  function toolHead(title, sub) {
    return '<header class="page-head"><div><p class="crumb"><a href="#/tools">Study tools</a></p><h1 class="display sm">' + esc(title) + '</h1>' + (sub ? '<p class="page-sub">' + sub + '</p>' : '') + '</div></header>';
  }

  /* ---------- Index ---------- */
  function index(view) {
    const hist = SV.LS.get('quizHistory', []);
    const focusLog = SV.LS.get('focusLog', []);
    const mins = focusLog.reduce((a, b) => a + b.min, 0);
    const best = hist.length ? Math.max.apply(null, hist.map((h) => Math.round(h.score / h.total * 100))) : null;
    const stat = { quiz: hist.length ? hist.length + ' attempts · best ' + best + '%' : SV.quizBank.length + ' questions', flashcards: Object.keys(SV.LS.get('known', {})).length + ' of ' + deck().length + ' marked known', focus: mins ? mins + ' min logged' : 'Nothing logged yet', formulas: '4 metrics', debate: Object.keys(SV.LS.get('debates', {})).length + ' of ' + (SV.vault.debates || []).length + ' answered' };
    view.innerHTML = '<header class="page-head"><div><p class="crumb">Study tools</p><h1 class="display sm">Study tools</h1><p class="page-sub">Everything here is built from your own course material.</p></div></header>' +
      '<div class="tool-grid">' + TOOLS.map((t) => '<a class="tool-card" href="#/tools/' + t.id + '">' + SV.icon(t.icon) + '<h2>' + t.title + '</h2><p>' + t.text + '</p><span class="tc-stat">' + stat[t.id] + '</span></a>').join('') + '</div>' +
      (hist.length ? '<section class="sec"><div class="sec-head"><h2>Recent quiz scores</h2></div><ul class="score-list">' + hist.slice(-6).reverse().map((h) =>
        '<li><span class="dot" style="--c:' + SV.courseColor(h.course) + '"></span>' + esc(h.course ? SV.courseName(h.course) : 'All courses') + '<span class="bar"><i style="width:' + Math.round(h.score / h.total * 100) + '%"></i></span><b>' + h.score + '/' + h.total + '</b><em>' + new Date(h.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + '</em></li>').join('') + '</ul></section>' : '');
  }

  /* ---------- Quiz ---------- */
  let quiz = null;
  function quizSetup(view, params) {
    const pre = params.get('course') || '';
    view.innerHTML = toolHead('Practice quiz', 'Questions are written from your notes. Each answer comes with the explanation and a link back to the source.') +
      '<form class="panel quiz-setup" id="qs">' +
        '<fieldset><legend>Course</legend><div class="choice-row">' +
          '<label class="choice"><input type="radio" name="course" value=""' + (!pre ? ' checked' : '') + '><span>All courses <em>' + SV.quizBank.length + '</em></span></label>' +
          quizCourses().map((c) => '<label class="choice" style="--c:' + c.color + '"><input type="radio" name="course" value="' + c.id + '"' + (pre === c.id ? ' checked' : '') + '><span><i class="dot"></i>' + esc(c.name) + ' <em>' + questionsFor(c.id).length + '</em></span></label>').join('') +
        '</div></fieldset>' +
        '<fieldset><legend>Length</legend><div class="choice-row">' +
          [5, 10, 0].map((n, i) => '<label class="choice"><input type="radio" name="len" value="' + n + '"' + (i === 0 ? ' checked' : '') + '><span>' + (n ? n + ' questions' : 'Every question') + '</span></label>').join('') +
        '</div></fieldset>' +
        '<button class="btn btn-primary" type="submit">' + SV.icon('play') + 'Start quiz</button>' +
      '</form>';
    view.querySelector('#qs').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const course = fd.get('course');
      const len = +fd.get('len');
      let qs = SV.shuffle(questionsFor(course));
      if (len) qs = qs.slice(0, len);
      quiz = { course, qs: qs.map((q) => { const order = SV.shuffle(q.options.map((_, i) => i)); return Object.assign({}, q, { order }); }), i: 0, score: 0, answered: false, misses: [] };
      quizStep(view);
    });
  }
  function quizStep(view) {
    const q = quiz.qs[quiz.i];
    if (!q) return quizEnd(view);
    const n = SV.note(q.note);
    view.innerHTML = toolHead('Practice quiz') +
      '<div class="panel quiz">' +
        '<div class="q-progress"><span>Question ' + (quiz.i + 1) + ' of ' + quiz.qs.length + '</span><span class="bar"><i style="width:' + (quiz.i / quiz.qs.length * 100) + '%"></i></span><span>' + quiz.score + ' correct</span></div>' +
        '<p class="q-course"><span class="dot" style="--c:' + SV.courseColor(q.course) + '"></span>' + esc(SV.courseName(q.course)) + '</p>' +
        '<h2 class="q-text">' + esc(q.q) + '</h2>' +
        '<div class="q-options" role="group" aria-label="Answers">' + q.order.map((oi, k) => '<button type="button" class="q-opt" data-oi="' + oi + '"><span class="q-key">' + 'ABCD'[k] + '</span>' + esc(q.options[oi]) + '</button>').join('') + '</div>' +
        '<div class="q-feedback" id="qf" aria-live="polite"></div>' +
      '</div>';
    const fb = view.querySelector('#qf');
    const answer = (btn) => {
      if (quiz.answered) return;
      quiz.answered = true;
      const oi = +btn.dataset.oi;
      const right = oi === q.answer;
      if (right) quiz.score++; else quiz.misses.push(q);
      view.querySelectorAll('.q-opt').forEach((b) => { b.disabled = true; if (+b.dataset.oi === q.answer) b.classList.add('right'); });
      if (!right) btn.classList.add('wrong');
      fb.innerHTML = '<p class="verdict ' + (right ? 'ok' : 'no') + '">' + (right ? 'Correct.' : 'Not quite — the answer is “' + esc(q.options[q.answer]) + '”.') + '</p><p>' + esc(q.explain) + '</p>' +
        '<div class="q-next">' + (n ? '<a href="#/note/' + n.id + '" class="link">From: ' + esc(n.title) + '</a>' : '<span></span>') +
        '<button type="button" class="btn btn-primary" id="qNext">' + (quiz.i + 1 < quiz.qs.length ? 'Next question' : 'See results') + '</button></div>';
      view.querySelector('#qNext').focus();
      view.querySelector('#qNext').addEventListener('click', () => { quiz.i++; quiz.answered = false; quizStep(view); });
    };
    view.querySelectorAll('.q-opt').forEach((b) => b.addEventListener('click', () => answer(b)));
    view.querySelector('.quiz').addEventListener('keydown', (e) => {
      const k = 'abcd'.indexOf(e.key.toLowerCase());
      if (k >= 0 && !quiz.answered) { const b = view.querySelectorAll('.q-opt')[k]; if (b) answer(b); }
    });
    view.querySelector('.q-opt').focus();
  }
  function quizEnd(view) {
    const pct = Math.round(quiz.score / quiz.qs.length * 100);
    const hist = SV.LS.get('quizHistory', []);
    hist.push({ course: quiz.course, score: quiz.score, total: quiz.qs.length, ts: Date.now() });
    SV.LS.set('quizHistory', hist.slice(-50));
    const notesToReview = Array.from(new Set(quiz.misses.map((m) => m.note))).map(SV.note).filter(Boolean);
    view.innerHTML = toolHead('Practice quiz') +
      '<div class="panel quiz-end">' +
        '<p class="score-big">' + quiz.score + '<span>/' + quiz.qs.length + '</span></p>' +
        '<p class="score-msg">' + (pct === 100 ? 'Perfect score.' : pct >= 70 ? 'Solid — review the ones you missed below.' : 'Worth another pass through the notes below.') + '</p>' +
        (quiz.misses.length ? '<h3 class="sub-h">Review</h3><ul class="miss-list">' + quiz.misses.map((m) => '<li><strong>' + esc(m.q) + '</strong><span>' + esc(m.options[m.answer]) + '</span></li>').join('') + '</ul>' : '') +
        (notesToReview.length ? '<p class="review-notes">Re-read: ' + notesToReview.map((n) => '<a href="#/note/' + n.id + '">' + esc(n.title) + '</a>').join(', ') + '</p>' : '') +
        '<div class="q-next"><a class="btn btn-ghost" href="#/tools">All study tools</a><button type="button" class="btn btn-primary" id="again">Try again</button></div>' +
      '</div>';
    view.querySelector('#again').addEventListener('click', () => quizSetup(view, new URLSearchParams(quiz.course ? 'course=' + quiz.course : '')));
  }

  /* ---------- Flashcards ---------- */
  function deck() {
    const fromQuiz = SV.quizBank.map((q, i) => ({ id: 'q' + i, course: q.course, front: q.q, back: q.options[q.answer], more: q.explain, note: q.note }));
    const own = SV.LS.get('userCards', []).map((c) => Object.assign({ own: true }, c));
    return fromQuiz.concat(own);
  }
  let fc = null;
  function flashcards(view, params) {
    const course = params.get('course') || '';
    const known = SV.LS.get('known', {});
    if (!fc || fc.course !== course) {
      const cards = deck().filter((c) => !course || c.course === course);
      // Unknown cards first, shuffled.
      fc = { course, cards: SV.shuffle(cards.filter((c) => !known[c.id])).concat(SV.shuffle(cards.filter((c) => known[c.id]))), i: 0, flipped: false };
    }
    const card = fc.cards[fc.i];
    const knownCount = fc.cards.filter((c) => known[c.id]).length;
    view.innerHTML = toolHead('Flashcards', 'Click the card or press Space to flip. Press → for “Got it”, ← for “Again”.') +
      '<div class="fc-bar"><div class="filters">' +
        '<a class="filter' + (!course ? ' on' : '') + '" href="#/tools/flashcards">All</a>' +
        quizCourses().map((c) => '<a class="filter' + (course === c.id ? ' on' : '') + '" style="--c:' + c.color + '" href="#/tools/flashcards?course=' + c.id + '"><span class="dot"></span>' + esc(c.short) + '</a>').join('') +
      '</div><span class="muted">' + knownCount + ' of ' + fc.cards.length + ' known</span>' +
      '<button type="button" class="btn btn-ghost sm" id="addCard">' + SV.icon('plus') + 'Add your own card</button></div>' +
      (card ? '<div class="fc-stage"><button type="button" class="flashcard' + (fc.flipped ? ' flipped' : '') + '" id="card" style="--c:' + SV.courseColor(card.course) + '" aria-label="Flashcard. ' + (fc.flipped ? 'Showing answer' : 'Showing question') + '. Press to flip.">' +
          '<span class="fc-face fc-front"><span class="fc-k">' + esc(SV.courseShort(card.course)) + (known[card.id] ? ' · known' : '') + '</span><span class="fc-t">' + esc(card.front) + '</span><span class="fc-hint">Show answer</span></span>' +
          '<span class="fc-face fc-back"><span class="fc-k">Answer</span><span class="fc-t">' + esc(card.back) + '</span>' + (card.more ? '<span class="fc-more">' + esc(card.more) + '</span>' : '') + '</span>' +
        '</button>' +
        '<div class="fc-controls"><button type="button" class="btn btn-ghost" id="again">' + SV.icon('reset') + 'Again</button><span class="muted">' + (fc.i + 1) + ' / ' + fc.cards.length + '</span><button type="button" class="btn btn-primary" id="got">' + SV.icon('check') + 'Got it</button></div>' +
        (card.own ? '<p class="center"><button type="button" class="link-btn danger" id="delCard">Delete this card</button></p>' : '') + '</div>'
        : '<p class="empty">No cards for this course yet. Add one above.</p>');
    const flip = () => { fc.flipped = !fc.flipped; view.querySelector('#card').classList.toggle('flipped', fc.flipped); };
    const next = (gotIt) => {
      const k = SV.LS.get('known', {});
      if (gotIt) k[card.id] = true; else delete k[card.id];
      SV.LS.set('known', k);
      if (!gotIt) fc.cards.push(fc.cards.splice(fc.i, 1)[0]); else fc.i = (fc.i + 1) % fc.cards.length;
      fc.flipped = false;
      flashcards(view, params);
    };
    if (card) {
      view.querySelector('#card').addEventListener('click', flip);
      view.querySelector('#got').addEventListener('click', () => next(true));
      view.querySelector('#again').addEventListener('click', () => next(false));
      const dc = view.querySelector('#delCard');
      if (dc) dc.addEventListener('click', () => { SV.LS.set('userCards', SV.LS.get('userCards', []).filter((c) => c.id !== card.id)); fc = null; flashcards(view, params); });
      view.onkeydown = (e) => {
        if (document.getElementById('dlg').open || /input|textarea|select/i.test(e.target.tagName)) return;
        if (e.key === ' ' && e.target.id !== 'card') { e.preventDefault(); flip(); }
        else if (e.key === 'ArrowRight') next(true);
        else if (e.key === 'ArrowLeft') next(false);
      };
    }
    view.querySelector('#addCard').addEventListener('click', () => SV.dialog('Add a flashcard',
      '<label class="field"><span>Course</span><select name="course">' + SV.courseOptions(course || 'web-analytics') + '</select></label>' +
      '<label class="field"><span>Front (question or term)</span><textarea name="front" rows="2" required></textarea></label>' +
      '<label class="field"><span>Back (answer)</span><textarea name="back" rows="3" required></textarea></label><p class="form-err" role="alert"></p>',
      { submit: 'Add card', onSubmit: (fd) => {
        const front = fd.get('front').trim(), back = fd.get('back').trim();
        if (!front || !back) throw new Error('Fill in both sides.');
        const list = SV.LS.get('userCards', []);
        list.push({ id: SV.uid('uc'), course: fd.get('course'), front, back });
        SV.LS.set('userCards', list); fc = null; SV.toast('Card added'); SV.refresh();
      } }));
  }

  /* ---------- Focus timer (keeps running while you browse) ---------- */
  const T = SV.timer = SV.timer || { mode: 'focus', left: null, running: false, course: '', h: null };
  function tick() {
    if (!T.running) return;
    T.left = Math.max(0, T.endAt - Date.now());
    if (T.left === 0) {
      T.running = false; clearInterval(T.h);
      if (T.mode === 'focus') {
        const log = SV.LS.get('focusLog', []);
        log.push({ course: T.course, min: SV.settings.focusLen, ts: Date.now() });
        SV.LS.set('focusLog', log.slice(-500));
        beep(); SV.toast('Focus session done — take a ' + SV.settings.breakLen + '-minute break');
        T.mode = 'break'; T.left = SV.settings.breakLen * 60000;
      } else { beep(); SV.toast('Break over — ready for another round?'); T.mode = 'focus'; T.left = SV.settings.focusLen * 60000; }
      if (location.hash.startsWith('#/tools/focus')) SV.refresh();
    }
    paintTimer();
  }
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.25].forEach((t) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 660; g.gain.setValueAtTime(0.15, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.22); o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.25); });
    } catch (e) {}
  }
  const mmss = (ms) => { const s = Math.ceil(ms / 1000); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  function paintTimer() {
    const pill = document.getElementById('timerPill');
    if (pill) { pill.hidden = !T.running; pill.innerHTML = SV.icon('clock') + mmss(T.left || 0); }
    const big = document.getElementById('bigTime');
    if (big) {
      big.textContent = mmss(T.left);
      const total = (T.mode === 'focus' ? SV.settings.focusLen : SV.settings.breakLen) * 60000;
      const ring = document.getElementById('ringFg');
      if (ring) ring.style.strokeDashoffset = (1 - T.left / total) * 691;
      document.title = (T.running ? mmss(T.left) + ' · ' : '') + 'Focus timer · StudyVault';
    }
  }
  function focus(view) {
    if (T.left == null) T.left = SV.settings.focusLen * 60000;
    const log = SV.LS.get('focusLog', []);
    const byCourse = {};
    log.forEach((l) => (byCourse[l.course || ''] = (byCourse[l.course || ''] || 0) + l.min));
    const max = Math.max.apply(null, Object.values(byCourse).concat([1]));
    const todayMin = log.filter((l) => new Date(l.ts).toDateString() === new Date().toDateString()).reduce((a, b) => a + b.min, 0);
    view.innerHTML = toolHead('Focus timer', 'Work in ' + SV.settings.focusLen + '-minute rounds with ' + SV.settings.breakLen + '-minute breaks. Change the lengths in Settings.') +
      '<div class="focus-layout">' +
        '<div class="panel timer-panel">' +
          '<p class="t-mode">' + (T.mode === 'focus' ? 'Focus' : 'Break') + '</p>' +
          '<div class="ring"><svg viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="110" class="ring-bg"/><circle cx="120" cy="120" r="110" class="ring-fg" id="ringFg" stroke-dasharray="691"/></svg><span id="bigTime" class="big-time">' + mmss(T.left) + '</span></div>' +
          '<label class="field inline"><span>Studying</span><select id="tCourse"><option value="">No course</option>' + SV.courses().filter((c) => c.status === 'current').map((c) => '<option value="' + c.id + '"' + (T.course === c.id ? ' selected' : '') + '>' + esc(c.name) + '</option>').join('') + '</select></label>' +
          '<div class="t-controls"><button type="button" class="btn btn-ghost" id="tReset">' + SV.icon('reset') + 'Reset</button><button type="button" class="btn btn-primary" id="tGo">' + SV.icon(T.running ? 'pause' : 'play') + (T.running ? 'Pause' : 'Start') + '</button><button type="button" class="btn btn-ghost" id="tSkip">' + (T.mode === 'focus' ? 'Skip to break' : 'Skip break') + '</button></div>' +
        '</div>' +
        '<div class="panel"><h2 class="panel-h">Time logged</h2><p class="muted">' + todayMin + ' min today · ' + log.reduce((a, b) => a + b.min, 0) + ' min in total</p>' +
          (Object.keys(byCourse).length ? '<ul class="score-list">' + Object.entries(byCourse).sort((a, b) => b[1] - a[1]).map(([cid, m]) => '<li><span class="dot" style="--c:' + SV.courseColor(cid) + '"></span>' + esc(cid ? SV.courseName(cid) : 'No course') + '<span class="bar"><i style="width:' + Math.round(m / max * 100) + '%;background:' + SV.courseColor(cid) + '"></i></span><b>' + m + ' min</b></li>').join('') + '</ul>' : '<p class="empty sm">Finish a focus round and it’s logged here.</p>') +
        '</div>' +
      '</div>';
    paintTimer();
    view.querySelector('#tCourse').addEventListener('change', (e) => { T.course = e.target.value; });
    view.querySelector('#tGo').addEventListener('click', () => {
      if (T.running) { T.running = false; clearInterval(T.h); }
      else { T.running = true; T.endAt = Date.now() + T.left; clearInterval(T.h); T.h = setInterval(tick, 250); }
      focus(view);
    });
    view.querySelector('#tReset').addEventListener('click', () => { T.running = false; clearInterval(T.h); T.mode = 'focus'; T.left = SV.settings.focusLen * 60000; focus(view); paintTimer(); });
    view.querySelector('#tSkip').addEventListener('click', () => { T.running = false; clearInterval(T.h); T.mode = T.mode === 'focus' ? 'break' : 'focus'; T.left = (T.mode === 'focus' ? SV.settings.focusLen : SV.settings.breakLen) * 60000; focus(view); paintTimer(); });
  }
  SV.paintTimer = paintTimer;

  /* ---------- Metrics calculator ---------- */
  function formulas(view) {
    const saved = SV.LS.get('calc', { impressions: 20000, clicks: 600, purchases: 60, spend: 600, revenue: 1740 });
    view.innerHTML = toolHead('Metrics calculator', 'Starts with the LOOP “Search” channel from AI Applied to Digital Marketing, week 1. Change any number.') +
      '<div class="calc-layout">' +
        '<form class="panel calc-in" id="calc">' + [['impressions', 'Impressions', ''], ['clicks', 'Clicks', ''], ['purchases', 'Purchases', ''], ['spend', 'Ad spend', '€'], ['revenue', 'Revenue', '€']].map(([k, l, u]) =>
          '<label class="field"><span>' + l + '</span><span class="num-in">' + (u ? '<i>' + u + '</i>' : '') + '<input type="number" min="0" step="any" name="' + k + '" value="' + saved[k] + '"></span></label>').join('') + '</form>' +
        '<div class="calc-out" id="calcOut"></div>' +
      '</div>' +
      '<p class="hint">Impressions and clicks for the LOOP example are illustrative — the class data only gave spend, purchases and ROAS. Purchases and revenue should share one attribution window.</p>';
    const form = view.querySelector('#calc');
    const out = view.querySelector('#calcOut');
    const run = () => {
      const v = Object.fromEntries(Array.from(new FormData(form)).map(([k, x]) => [k, parseFloat(x) || 0]));
      SV.LS.set('calc', v);
      const r = (a, b) => (b ? a / b : null);
      const rows = [
        ['CTR', 'Click-through rate', 'clicks ÷ impressions', r(v.clicks, v.impressions), (x) => (x * 100).toFixed(2) + '%'],
        ['CVR', 'Conversion rate', 'purchases ÷ clicks', r(v.purchases, v.clicks), (x) => (x * 100).toFixed(2) + '%'],
        ['CPA', 'Cost per acquisition', 'spend ÷ purchases', r(v.spend, v.purchases), (x) => '€' + x.toFixed(2)],
        ['ROAS', 'Return on ad spend', 'revenue ÷ spend', r(v.revenue, v.spend), (x) => x.toFixed(2) + '×'],
        ['AOV', 'Revenue per purchase', 'revenue ÷ purchases', r(v.revenue, v.purchases), (x) => '€' + x.toFixed(2)]
      ];
      out.innerHTML = rows.map(([k, l, f, val, fmt]) => '<div class="metric"><span class="m-k">' + k + '</span><span class="m-v">' + (val == null ? '—' : fmt(val)) + '</span><span class="m-l">' + l + '</span><span class="m-f">' + f + '</span></div>').join('');
    };
    form.addEventListener('input', run);
    run();
  }

  /* ---------- Debate prep ---------- */
  function debate(view) {
    const answers = SV.LS.get('debates', {});
    const qs = SV.vault.debates || [];
    let lastCourse = '';
    view.innerHTML = toolHead('Debate prep', 'Your answers save as you type, in this browser.') +
      '<div class="debates">' + qs.map((d, i) => {
        let h = '';
        if (d.course !== lastCourse) { h = '<h2 class="sub-h"><span class="dot" style="--c:' + SV.courseColor(d.course) + '"></span>' + esc(SV.courseName(d.course)) + '</h2>'; lastCourse = d.course; }
        return h + '<div class="debate"><label for="db' + i + '"><span class="db-sec">' + esc(d.section) + '</span>' + esc(d.q) + '</label><textarea id="db' + i + '" data-i="' + i + '" rows="3" placeholder="Your position, and one piece of evidence from class…">' + esc(answers[i] || '') + '</textarea><span class="saved" aria-live="polite"></span></div>';
      }).join('') + '</div>';
    let t;
    view.querySelectorAll('textarea[data-i]').forEach((ta) => ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const a = SV.LS.get('debates', {});
        if (ta.value.trim()) a[ta.dataset.i] = ta.value; else delete a[ta.dataset.i];
        SV.LS.set('debates', a);
        const s = ta.nextElementSibling; s.textContent = 'Saved'; setTimeout(() => (s.textContent = ''), 1200);
      }, 400);
    }));
  }

  SV.views.tools = function (view, params, sub) {
    view.onkeydown = null;
    if (sub === 'quiz') return quiz && params.get('resume') ? quizStep(view) : quizSetup(view, params);
    if (sub === 'flashcards') return flashcards(view, params);
    if (sub === 'focus') return focus(view);
    if (sub === 'formulas') return formulas(view);
    if (sub === 'debate') return debate(view);
    index(view);
  };
})();
