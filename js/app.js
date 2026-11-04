/* StudyVault — router and boot */
(function () {
  'use strict';
  const SV = window.SV;
  SV.VERSION = '1.1.0';

  const TITLES = { home: 'Home', calendar: 'Calendar', library: 'Research library', tools: 'Study tools', settings: 'Settings', search: 'Search' };

  function parse() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    return { name: parts[0] || 'home', arg: parts[1] || '', params: new URLSearchParams(qs || '') };
  }

  SV.refresh = function () { render(true); };

  function render(keepScroll) {
    const { name, arg, params } = parse();
    const view = document.getElementById('view');
    const y = window.scrollY;
    const fn = SV.views[name];
    SV.index = null; // rebuild search index lazily after any change
    if (!fn) {
      view.innerHTML = '<div class="notfound"><h1 class="display sm">Page not found</h1><p><a href="#/">Back to home</a></p></div>';
    } else {
      try { fn(view, params, arg); }
      catch (e) { console.error(e); view.innerHTML = '<div class="notfound"><h1 class="display sm">Something broke on this page</h1><p>' + SV.esc(e.message) + '</p><p><a href="#/">Back to home</a></p></div>'; }
    }
    const courseId = name === 'course' ? arg : name === 'note' && SV.note(arg) ? SV.note(arg).course : '';
    SV.renderSidebar();
    SV.setActiveNav(name, courseId);
    if (!(name === 'tools' && arg === 'focus' && SV.timer && SV.timer.running)) {
      let t = TITLES[name] || '';
      if (name === 'course' && SV.course(arg)) t = SV.course(arg).name;
      if (name === 'note' && SV.note(arg)) t = SV.note(arg).title;
      document.title = (t && name !== 'home' ? t + ' · ' : '') + 'StudyVault';
    }
    SV.hydrateIcons(view);
    SV.paintTimer && SV.paintTimer();
    if (keepScroll) window.scrollTo(0, y);
    else if (!params.get('q') && !params.get('item') && !params.get('week') && !params.get('s')) { window.scrollTo(0, 0); }
    document.body.classList.remove('nav-open');
  }

  async function boot() {
    SV.applySettings();
    SV.hydrateIcons(document);
    const view = document.getElementById('view');
    view.innerHTML = '<div class="loading"><span></span>Opening the vault…</div>';
    try {
      await SV.load();
    } catch (e) {
      view.innerHTML = '<div class="notfound"><h1 class="display sm">Couldn’t load your courses</h1><p>' + SV.esc(e.message) + '. If you opened index.html straight from your computer, run it through a local server or open the GitHub Pages link instead.</p></div>';
      return;
    }
    SV.initPalette();
    document.getElementById('topSearch').addEventListener('click', () => SV.openPalette());
    document.getElementById('sideSearch').addEventListener('click', () => SV.openPalette());
    document.getElementById('quickAdd').addEventListener('click', () => {
      const { name, arg } = parse();
      SV.deadlineDialog(name === 'course' ? { course: arg } : {});
    });
    document.getElementById('menuBtn').addEventListener('click', () => document.body.classList.add('nav-open'));
    document.getElementById('closeNav').addEventListener('click', () => document.body.classList.remove('nav-open'));
    document.getElementById('scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));
    window.addEventListener('hashchange', () => render(false));
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { if (SV.settings.theme === 'system') SV.applySettings(); });
    render(false);
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
