/* ═══════════════════════════════════════════════════════════
   PROJECT ATLAS — atlas-extras.js
   Loaded AFTER script.js. Adds:
     • First-run welcome modal (name + starting balance)
     • Wipe-all-data button with 1s arming delay
     • Custom UI/CSS imports (persisted in localStorage)
     • Custom theme import + sample download
     • Number-only input enforcement + toast
     • i18n strings for new features
     • Music persistence is already handled by base script.
   All features are theme-agnostic and work in every language.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ─── helpers ────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const LS = window.localStorage;

  function safeT(key, fallback) {
    try {
      if (typeof window.t === 'function') {
        const v = window.t(key);
        if (v && v !== key) return v;
      }
    } catch (e) {}
    return fallback;
  }

  // ─── 1. Toast helper ────────────────────────────────────────
  let toastEl;
  let toastTimer;
  function showToast(msg, opts = {}) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'atlas-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.toggle('warn', !!opts.warn);
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), opts.duration || 1800);
  }
  window.atlasToast = showToast;

  // ─── 2. Number-only input enforcement ───────────────────────
  // Tracks bad-key counts per element; shows toast after 3 strikes
  // within 4s. Allows: digits, ., -, navigation keys, paste of nums.
  const badStrikes = new WeakMap();
  function isNumericLike(value) {
    return /^-?\d*\.?\d*$/.test(value);
  }
  function attachNumericGuards() {
    document.querySelectorAll('input[type="number"]').forEach((el) => {
      if (el.dataset.atlasNumGuard) return;
      el.dataset.atlasNumGuard = '1';

      el.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const allow = [
          'Backspace','Delete','Tab','Escape','Enter','Home','End',
          'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','.','-'
        ];
        if (allow.includes(e.key)) return;
        if (/^\d$/.test(e.key)) return;
        // Bad key — block + count strike
        e.preventDefault();
        const now = Date.now();
        const rec = badStrikes.get(el) || { count: 0, first: now };
        if (now - rec.first > 4000) { rec.count = 0; rec.first = now; }
        rec.count++;
        badStrikes.set(el, rec);
        if (rec.count >= 3) {
          showToast(safeT('numbersOnly', 'Only numbers can be entered here.'), { warn: true });
          rec.count = 0;
        }
      });

      el.addEventListener('paste', (e) => {
        const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        if (!isNumericLike(text)) {
          e.preventDefault();
          showToast(safeT('numbersOnly', 'Only numbers can be entered here.'), { warn: true });
        }
      });
    });
  }
  // Run now + on any DOM mutation (modals appear later)
  if (document.readyState !== 'loading') attachNumericGuards();
  document.addEventListener('DOMContentLoaded', attachNumericGuards);
  new MutationObserver(attachNumericGuards).observe(document.documentElement, { childList: true, subtree: true });

  // ─── 3. First-run Welcome Modal ─────────────────────────────
  function buildWelcomeModal() {
    if ($('welcomeModal')) return;
    const wrap = document.createElement('div');
    wrap.id = 'welcomeModal';
    wrap.innerHTML = `
      <div class="welcome-card">
        <h2 id="wmTitle">Welcome to Atlas</h2>
        <div class="welcome-sub" id="wmSub">Let's get you set up</div>
        <label id="wmNameLbl">Your name</label>
        <input id="wmName" type="text" maxlength="40" placeholder="e.g. Alex" autocomplete="off">
        <label id="wmBalLbl">Starting balance</label>
        <input id="wmBal" type="number" placeholder="0.00" step="0.01">
        <div class="welcome-actions">
          <button class="welcome-skip" id="wmSkip">Skip</button>
          <button class="welcome-go" id="wmGo">Continue</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const finish = (skipped) => {
      const name = $('wmName').value.trim();
      const bal  = parseFloat($('wmBal').value);
      if (!skipped) {
        if (name) {
          LS.setItem('atlas_user_name', name);
        }
        if (!isNaN(bal) && bal !== 0) {
          try {
            window.balance = bal;
            if (typeof window.saveData === 'function') window.saveData();
            if (typeof window.updateUI === 'function') window.updateUI();
          } catch (e) {}
        }
      }
      LS.setItem('atlas_first_run_done', '1');
      wrap.classList.remove('show');
      renderGreeting();
    };
    $('wmGo').addEventListener('click', () => finish(false));
    $('wmSkip').addEventListener('click', () => finish(true));

    // Translate
    $('wmTitle').textContent  = safeT('welcomeTitle',  'Welcome to Atlas');
    $('wmSub').textContent    = safeT('welcomeSub',    "Let's get you set up");
    $('wmNameLbl').textContent= safeT('welcomeName',   'Your name');
    $('wmBalLbl').textContent = safeT('welcomeBalance','Starting balance');
    $('wmSkip').textContent   = safeT('skip',          'Skip');
    $('wmGo').textContent     = safeT('continue',      'Continue');

    attachNumericGuards();
  }

  function maybeShowWelcome() {
    if (LS.getItem('atlas_first_run_done') === '1') return;
    buildWelcomeModal();
    requestAnimationFrame(() => $('welcomeModal').classList.add('show'));
  }

  // Greeting in header
  function renderGreeting() {
    const name = LS.getItem('atlas_user_name');
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;
    let g = $('atlasGreeting');
    if (!name) { if (g) g.remove(); return; }
    if (!g) {
      g = document.createElement('span');
      g.id = 'atlasGreeting';
      g.className = 'atlas-greeting';
      headerControls.insertBefore(g, headerControls.firstChild);
    }
    const hour = new Date().getHours();
    const part = hour < 12 ? safeT('goodMorning','Good morning')
              : hour < 18 ? safeT('goodAfternoon','Good afternoon')
              : safeT('goodEvening','Good evening');
    g.textContent = `${part}, ${name}`;
  }

  // ─── 4. Wipe Data flow ──────────────────────────────────────
  function buildWipeModal() {
    if ($('wipeDataModal')) return;
    const m = document.createElement('div');
    m.id = 'wipeDataModal';
    m.className = 'modal mini-modal';
    m.innerHTML = `
      <div class="modal-content mini-content">
        <div class="modal-header">
          <h3><span class="warn-ico">!</span> <span id="wdTitle">Wipe ALL Data?</span></h3>
        </div>
        <p class="confirm-text">
          <span class="warn-strong" id="wdLine1">This will permanently erase everything:</span>
          <br><span id="wdLine2">transactions, balance, settings, custom themes, custom UI, custom songs, and your name.</span>
          <br><br><span id="wdLine3">This cannot be undone.</span>
        </p>
        <div class="modal-actions">
          <button class="btn" id="wdCancel">Cancel</button>
          <button class="btn danger countdown-btn" id="wdConfirm" disabled>
            <span class="cd-fill"></span>
            <span id="wdConfirmLabel">Wait 1s…</span>
          </button>
        </div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', (e) => { if (e.target === m) closeWipe(); });
    $('wdCancel').addEventListener('click', closeWipe);
    $('wdConfirm').addEventListener('click', doWipe);
  }

  function openWipeModal() {
    buildWipeModal();
    // Translate
    $('wdTitle').textContent  = safeT('wipeTitle',  'Wipe ALL Data?');
    $('wdLine1').textContent  = safeT('wipeLine1',  'This will permanently erase everything:');
    $('wdLine2').textContent  = safeT('wipeLine2',  'transactions, balance, settings, custom themes, custom UI, custom songs, and your name.');
    $('wdLine3').textContent  = safeT('wipeLine3',  'This cannot be undone.');
    $('wdCancel').textContent = safeT('cancel',     'Cancel');

    const btn = $('wdConfirm');
    const lbl = $('wdConfirmLabel');
    const fill = btn.querySelector('.cd-fill');
    btn.disabled = true;
    lbl.textContent = safeT('wipeWait', 'Wait 3s…');
    fill.style.width = '0%';
    $('wipeDataModal').style.display = 'flex';
    // Trigger fill animation
    requestAnimationFrame(() => { fill.style.width = '100%'; });
    setTimeout(() => {
      btn.disabled = false;
      lbl.textContent = safeT('wipeConfirm', 'Yes, wipe everything');
    }, 3000);
  }
  function closeWipe() { const m = $('wipeDataModal'); if (m) m.style.display = 'none'; }
  function doWipe() {
    try {
      // Remove every atlas-related key
      const keys = [];
      for (let i = 0; i < LS.length; i++) {
        const k = LS.key(i);
        if (k && (k.startsWith('atlas_') || k === 'atlas_v2')) keys.push(k);
      }
      keys.forEach((k) => LS.removeItem(k));
    } catch (e) {}
    location.reload();
  }
  window.openAtlasWipe = openWipeModal;

  // ─── 5. Custom UI / Theme LIBRARIES (multi-entry) ───────────
  // Stored in localStorage as JSON arrays:
  //   atlas_custom_ui_lib    = [{ id, name, css, active }]   (multiple can be active; stacked in order)
  //   atlas_custom_theme_lib = [{ id, name, css, active }]   (only one active at a time)
  // Legacy keys (atlas_custom_ui_css / atlas_custom_theme_css) are auto-migrated
  // into the library on first load so old imports aren't lost.

  const UI_LIB_KEY    = 'atlas_custom_ui_lib';
  const THEME_LIB_KEY = 'atlas_custom_theme_lib';

  function readLib(key) {
    try {
      const raw = LS.getItem(key);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function writeLib(key, arr) {
    try { LS.setItem(key, JSON.stringify(arr)); } catch (e) {
      showToast(safeT('importFailed','Import failed') + ' (storage full?)', { warn: true });
    }
  }
  function uid() { return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

  function migrateLegacy() {
    const legacyUi = LS.getItem('atlas_custom_ui_css');
    if (legacyUi) {
      const lib = readLib(UI_LIB_KEY);
      if (!lib.some((e) => e.css === legacyUi)) {
        lib.push({ id: uid(), name: safeT('importedUi','Imported UI'), css: legacyUi, active: true });
        writeLib(UI_LIB_KEY, lib);
      }
      LS.removeItem('atlas_custom_ui_css');
    }
    const legacyTheme = LS.getItem('atlas_custom_theme_css');
    if (legacyTheme) {
      const lib = readLib(THEME_LIB_KEY);
      if (!lib.some((e) => e.css === legacyTheme)) {
        // Only one theme can be active — make this one active, deactivate others
        lib.forEach((e) => (e.active = false));
        lib.push({ id: uid(), name: safeT('importedTheme','Imported Theme'), css: legacyTheme, active: true });
        writeLib(THEME_LIB_KEY, lib);
      }
      LS.removeItem('atlas_custom_theme_css');
    }
  }

  function ensureStyleTag(id) {
    let s = document.getElementById(id);
    if (!s) {
      s = document.createElement('style');
      s.id = id;
      document.head.appendChild(s);
    }
    return s;
  }

  // Rewrite any `[data-exp-theme="<x>"]` selector in imported CSS so it ALSO
  // matches our generic `[data-exp-theme="custom"]` slot. Without this, a theme
  // authored against a specific name (e.g. dusk) silently does nothing.
  function normalizeThemeCss(css) {
    if (!css) return '';
    // Replace any data-exp-theme attribute value with "custom" — works for
    // single, double quotes, or unquoted values.
    return css.replace(/data-exp-theme\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w-]+))/gi,
      'data-exp-theme="custom"');
  }

  function applyCustomUi() {
    // Concatenate every active UI entry, separated by banners
    const lib = readLib(UI_LIB_KEY);
    const css = lib
      .filter((e) => e.active && e.css)
      .map((e) => `/* ===== ${String(e.name||'Custom UI').replace(/\*\//g,'* /')} ===== */\n${e.css}`)
      .join('\n\n');
    ensureStyleTag('atlas-custom-ui-style').textContent = css;
    renderUiLibList();
    updateLoadedTags();
  }

  function applyCustomTheme() {
    // Only the single active theme contributes CSS
    const lib = readLib(THEME_LIB_KEY);
    const active = lib.find((e) => e.active);
    const css = active ? normalizeThemeCss(active.css) : '';
    ensureStyleTag('atlas-custom-theme-style').textContent = css;
    renderThemeLibList();
    updateLoadedTags();
    addCustomThemeOption();
    // If a theme is active, force the body slot to "custom" so the rewritten
    // selectors actually match.
    if (active) {
      try { if (window.settings) window.settings.experimentalTheme = 'custom'; } catch (e) {}
      document.body.setAttribute('data-exp-theme', 'custom');
    }
  }

  function addCustomThemeOption() {
    const sel = $('stgExpTheme');
    if (!sel) return;
    const hasAnyTheme = readLib(THEME_LIB_KEY).length > 0;
    const existing = [...sel.options].find((o) => o.value === 'custom');
    if (hasAnyTheme && !existing) {
      const opt = document.createElement('option');
      opt.value = 'custom';
      opt.textContent = safeT('expCustom', 'Custom (Imported)');
      sel.appendChild(opt);
    } else if (!hasAnyTheme && existing) {
      existing.remove();
    }
    if (window.settings && window.settings.experimentalTheme === 'custom' && hasAnyTheme) {
      sel.value = 'custom';
    }
  }

  // Patch the experimental theme setter to accept "custom"
  const origSetExpTheme = window.setExperimentalTheme;
  window.setExperimentalTheme = function (name) {
    if (name === 'custom') {
      try { window.settings.experimentalTheme = 'custom'; } catch (e) {}
      document.body.setAttribute('data-exp-theme', 'custom');
      try { if (typeof window.saveData === 'function') window.saveData(); } catch (e) {}
      return;
    }
    if (typeof origSetExpTheme === 'function') return origSetExpTheme(name);
  };
  // Same for UI layout — accept "custom"
  const origSetExpUi = window.setExperimentalUiLayout;
  window.setExperimentalUiLayout = function (name) {
    if (name === 'custom') {
      try { window.settings.experimentalUiLayout = 'custom'; } catch (e) {}
      document.body.setAttribute('data-ui-layout', 'custom');
      try { if (typeof window.saveData === 'function') window.saveData(); } catch (e) {}
      return;
    }
    if (typeof origSetExpUi === 'function') return origSetExpUi(name);
  };

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result || ''));
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  // ─── Add-CSS modal (mirrors the Add Song flow: pick file, name it, confirm) ──
  let _pendingCss = null;   // { mode, name, css }

  function openAddCustomCss(mode) {
    _pendingCss = { mode, name: '', css: '' };
    const modal = $('addCustomCssModal'); if (!modal) return;
    const isTheme = mode === 'theme';
    const titleEl = $('addCustomCssTitle');
    if (titleEl) titleEl.textContent = isTheme
      ? safeT('importCustomTheme', 'Import Custom Theme')
      : safeT('importCustomUi',    'Import Custom UI');
    const fileLbl = $('addCustomCssFileLabel');
    if (fileLbl) fileLbl.textContent = safeT('cssFileLabel', 'CSS File');
    const nameLbl = $('addCustomCssNameLabel');
    if (nameLbl) nameLbl.textContent = isTheme
      ? safeT('themeNameLabel', 'Theme Name')
      : safeT('uiNameLabel',    'UI Name');
    const confirmBtn = $('addCustomCssConfirmBtn');
    if (confirmBtn) confirmBtn.textContent = safeT('importBtn', 'Import');
    const fileInput = $('addCustomCssFile'); if (fileInput) fileInput.value = '';
    const fileName  = $('addCustomCssFileName');
    if (fileName) fileName.textContent = safeT('chooseCss', 'Choose .css file…');
    const nameInput = $('addCustomCssName');
    if (nameInput) {
      nameInput.value = '';
      nameInput.placeholder = isTheme
        ? safeT('phThemeName', 'e.g. My Sunset Theme')
        : safeT('phUiName',    'e.g. Compact Sidebar');
    }
    modal.style.display = 'flex';
    // Don't auto-click — user-gesture is lost across the setTimeout boundary
    // in some browsers and the picker silently fails. The labeled input is
    // visible and one click away.
  }
  function closeAddCustomCss() {
    const modal = $('addCustomCssModal'); if (modal) modal.style.display = 'none';
    _pendingCss = null;
  }
  async function previewCustomCss(input) {
    if (!_pendingCss) _pendingCss = { mode: 'ui', name: '', css: '' };
    const f = input.files && input.files[0];
    if (!f) return;
    try {
      const css = await readFileAsText(f);
      _pendingCss.css  = css;
      _pendingCss.name = (f.name || '').replace(/\.[^./\\]+$/, '');
      const fileName = $('addCustomCssFileName');
      if (fileName) fileName.textContent = f.name;
      const nameInput = $('addCustomCssName');
      if (nameInput && !nameInput.value) nameInput.value = _pendingCss.name;
    } catch (e) {
      showToast(safeT('importFailed', 'Import failed'), { warn: true });
    }
  }
  function confirmAddCustomCss() {
    if (!_pendingCss || !_pendingCss.css) {
      showToast(safeT('chooseCssFirst', 'Please choose a .css file first'), { warn: true });
      return;
    }
    const nameInput = $('addCustomCssName');
    const name = (nameInput && nameInput.value.trim()) || _pendingCss.name || (_pendingCss.mode === 'theme' ? 'Custom Theme' : 'Custom UI');
    if (_pendingCss.mode === 'theme') {
      const lib = readLib(THEME_LIB_KEY);
      const entry = { id: uid(), name, css: _pendingCss.css, active: true };
      lib.forEach((e) => (e.active = false));
      lib.push(entry);
      writeLib(THEME_LIB_KEY, lib);
      applyCustomTheme();
      const sel = $('stgExpTheme');
      if (sel) { sel.value = 'custom'; window.setExperimentalTheme('custom'); }
      showToast(safeT('customThemeLoaded', 'Custom theme loaded ✓'));
    } else {
      const lib = readLib(UI_LIB_KEY);
      lib.push({ id: uid(), name, css: _pendingCss.css, active: true });
      writeLib(UI_LIB_KEY, lib);
      applyCustomUi();
      showToast(safeT('customUiLoaded', 'Custom UI loaded ✓'));
    }
    closeAddCustomCss();
  }

  // Legacy multi-file handlers (kept; auto-name from filename, used by the hidden input fallback)
  async function importCustomUiFile(input) {
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    try {
      const lib = readLib(UI_LIB_KEY);
      for (const f of files) {
        const css = await readFileAsText(f);
        const name = (f.name || 'Custom UI').replace(/\.css$/i, '');
        lib.push({ id: uid(), name, css, active: true });
      }
      writeLib(UI_LIB_KEY, lib);
      applyCustomUi();
      showToast(safeT('customUiLoaded', 'Custom UI loaded ✓'));
    } catch (e) {
      showToast(safeT('importFailed', 'Import failed'), { warn: true });
    }
    input.value = '';
  }

  async function importCustomThemeFile(input) {
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    try {
      const lib = readLib(THEME_LIB_KEY);
      let lastId = null;
      for (const f of files) {
        const css = await readFileAsText(f);
        const name = (f.name || 'Custom Theme').replace(/\.css$/i, '');
        const entry = { id: uid(), name, css, active: false };
        lib.push(entry);
        lastId = entry.id;
      }
      lib.forEach((e) => (e.active = e.id === lastId));
      writeLib(THEME_LIB_KEY, lib);
      applyCustomTheme();
      const sel = $('stgExpTheme');
      if (sel) { sel.value = 'custom'; window.setExperimentalTheme('custom'); }
      showToast(safeT('customThemeLoaded', 'Custom theme loaded ✓'));
    } catch (e) {
      showToast(safeT('importFailed', 'Import failed'), { warn: true });
    }
    input.value = '';
  }

  function exportDefaultUi() {
    const safeFetch = (u) => fetch(u, { cache: 'no-store' })
      .then((r) => r.ok ? r.text() : Promise.reject(new Error('http ' + r.status)))
      .catch(() => `/* could not fetch ${u} — file may not be deployed */`);
    Promise.all([safeFetch('styles.css'), safeFetch('experimental-themes.css')])
      .then(([base, exp]) => {
        const banner = `/* PROJECT ATLAS — default UI export\n   Edit freely, then import back via Settings → Custom UI → Import.\n   Your imported CSS is appended after the defaults, so anything you write here OVERRIDES the originals. */\n\n`;
        const css = banner + '/* ===== styles.css ===== */\n' + base + '\n\n/* ===== experimental-themes.css ===== */\n' + exp;
        triggerCssDownload(css, 'atlas-default-ui.css');
        showToast(safeT('uiDownloaded', 'Default UI downloaded ✓'));
      })
      .catch(() => showToast(safeT('exportFailed', 'Export failed'), { warn: true }));
  }


  // Inline fallback so the sample is ALWAYS downloadable, even if the
  // server can't serve sample-custom-theme.css (e.g. file not deployed).
  const SAMPLE_THEME_FALLBACK = `/* PROJECT ATLAS — Custom Theme Template
   Edit the values below and import via Settings → Custom Theme → Import. */
body[data-exp-theme="custom"] {
  --bg:      #0b0f1a;
  --bg2:     #131a2e;
  --card:    rgba(255,255,255,0.05);
  --border:  rgba(255,255,255,0.12);
  --text:    #ecf1ff;
  --muted:   #8390ad;
  --accent:  #7c5cff;
  --income:  #4ade80;
  --expense: #ff6b88;
  --shadow:  rgba(0,0,0,0.55);
}
[data-theme="light"] body[data-exp-theme="custom"] {
  --bg:      #f5f7fb;
  --bg2:     #e9eef8;
  --card:    rgba(255,255,255,0.85);
  --border:  rgba(0,0,0,0.10);
  --text:    #131a2e;
  --muted:   #5a6478;
  --shadow:  rgba(0,0,0,0.18);
}
`;
  function triggerCssDownload(css, filename) {
    const blob = new Blob([css], { type: 'text/css' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function downloadSampleTheme() {
    const filename = 'atlas-custom-theme-template.css';
    fetch('sample-custom-theme.css', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.text(); })
      .then((css) => {
        if (!css || css.trim().length < 20) throw new Error('empty');
        triggerCssDownload(css, filename);
        showToast(safeT('sampleDownloaded', 'Sample downloaded ✓'));
      })
      .catch(() => {
        // Fallback: ship the embedded copy so the user always gets the file
        triggerCssDownload(SAMPLE_THEME_FALLBACK, filename);
        showToast(safeT('sampleDownloaded', 'Sample downloaded ✓'));
      });
  }

  // ─── Library item operations ────────────────────────────────
  function uiToggle(id) {
    const lib = readLib(UI_LIB_KEY);
    const e = lib.find((x) => x.id === id); if (!e) return;
    e.active = !e.active;
    writeLib(UI_LIB_KEY, lib);
    applyCustomUi();
  }
  function uiRename(id) {
    const lib = readLib(UI_LIB_KEY);
    const e = lib.find((x) => x.id === id); if (!e) return;
    const nv = window.prompt(safeT('renamePrompt','New name:'), e.name);
    if (nv == null) return;
    e.name = String(nv).trim() || e.name;
    writeLib(UI_LIB_KEY, lib);
    applyCustomUi();
  }
  function uiDelete(id) {
    const lib = readLib(UI_LIB_KEY).filter((x) => x.id !== id);
    writeLib(UI_LIB_KEY, lib);
    applyCustomUi();
  }
  function uiExport(id) {
    const e = readLib(UI_LIB_KEY).find((x) => x.id === id); if (!e) return;
    triggerCssDownload(e.css, (e.name || 'custom-ui') + '.css');
  }
  function themeActivate(id) {
    const lib = readLib(THEME_LIB_KEY);
    lib.forEach((e) => (e.active = e.id === id));
    writeLib(THEME_LIB_KEY, lib);
    applyCustomTheme();
    const sel = $('stgExpTheme');
    if (sel) { sel.value = 'custom'; window.setExperimentalTheme('custom'); }
  }
  function themeDeactivate() {
    const lib = readLib(THEME_LIB_KEY);
    lib.forEach((e) => (e.active = false));
    writeLib(THEME_LIB_KEY, lib);
    applyCustomTheme();
    const sel = $('stgExpTheme');
    if (sel && sel.value === 'custom') { sel.value = 'off'; window.setExperimentalTheme('off'); }
  }
  function themeRename(id) {
    const lib = readLib(THEME_LIB_KEY);
    const e = lib.find((x) => x.id === id); if (!e) return;
    const nv = window.prompt(safeT('renamePrompt','New name:'), e.name);
    if (nv == null) return;
    e.name = String(nv).trim() || e.name;
    writeLib(THEME_LIB_KEY, lib);
    applyCustomTheme();
  }
  function themeDelete(id) {
    const wasActive = (readLib(THEME_LIB_KEY).find((x) => x.id === id) || {}).active;
    const lib = readLib(THEME_LIB_KEY).filter((x) => x.id !== id);
    writeLib(THEME_LIB_KEY, lib);
    applyCustomTheme();
    if (wasActive) {
      const sel = $('stgExpTheme');
      if (sel && sel.value === 'custom') { sel.value = 'off'; window.setExperimentalTheme('off'); }
    }
  }
  function themeExport(id) {
    const e = readLib(THEME_LIB_KEY).find((x) => x.id === id); if (!e) return;
    triggerCssDownload(e.css, (e.name || 'custom-theme') + '.css');
  }
  function clearAllUi() {
    if (!window.confirm(safeT('confirmClearAllUi','Remove ALL custom UIs?'))) return;
    writeLib(UI_LIB_KEY, []);
    applyCustomUi();
    showToast(safeT('customUiCleared','Custom UI cleared'));
  }
  function clearAllThemes() {
    if (!window.confirm(safeT('confirmClearAllThemes','Remove ALL custom themes?'))) return;
    writeLib(THEME_LIB_KEY, []);
    applyCustomTheme();
    const sel = $('stgExpTheme');
    if (sel && sel.value === 'custom') { sel.value = 'off'; window.setExperimentalTheme('off'); }
    showToast(safeT('customThemeCleared','Custom theme cleared'));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function renderUiLibList() {
    const host = $('atlasUiLibList'); if (!host) return;
    const lib = readLib(UI_LIB_KEY);
    if (!lib.length) {
      host.innerHTML = `<div class="atlas-lib-empty">${safeT('noCustomUi','No custom UIs imported yet.')}</div>`;
      return;
    }
    host.innerHTML = lib.map((e) => `
      <div class="atlas-lib-item${e.active ? ' active' : ''}">
        <div class="atlas-lib-name" title="${escapeHtml(e.name)}">${e.active ? '● ' : '○ '}${escapeHtml(e.name)}</div>
        <div class="atlas-lib-actions">
          <button class="btn sm-btn" onclick="atlasUiToggle('${e.id}')">${e.active ? safeT('deactivate','Deactivate') : safeT('activate','Activate')}</button>
          <button class="btn sm-btn" onclick="atlasUiRename('${e.id}')">${safeT('rename','Rename')}</button>
          <button class="btn sm-btn" onclick="atlasUiExport('${e.id}')">⬇</button>
          <button class="btn sm-btn danger-btn-wipe" onclick="atlasUiDelete('${e.id}')">✕</button>
        </div>
      </div>
    `).join('');
  }
  function renderThemeLibList() {
    const host = $('atlasThemeLibList'); if (!host) return;
    const lib = readLib(THEME_LIB_KEY);
    if (!lib.length) {
      host.innerHTML = `<div class="atlas-lib-empty">${safeT('noCustomTheme','No custom themes imported yet.')}</div>`;
      return;
    }
    host.innerHTML = lib.map((e) => `
      <div class="atlas-lib-item${e.active ? ' active' : ''}">
        <div class="atlas-lib-name" title="${escapeHtml(e.name)}">${e.active ? '● ' : '○ '}${escapeHtml(e.name)}</div>
        <div class="atlas-lib-actions">
          <button class="btn sm-btn ${e.active ? '' : 'primary'}" onclick="${e.active ? 'atlasThemeDeactivate()' : `atlasThemeActivate('${e.id}')`}">${e.active ? safeT('deactivate','Deactivate') : safeT('activate','Activate')}</button>
          <button class="btn sm-btn" onclick="atlasThemeRename('${e.id}')">${safeT('rename','Rename')}</button>
          <button class="btn sm-btn" onclick="atlasThemeExport('${e.id}')">⬇</button>
          <button class="btn sm-btn danger-btn-wipe" onclick="atlasThemeDelete('${e.id}')">✕</button>
        </div>
      </div>
    `).join('');
  }

  function updateLoadedTags() {
    const ui = $('atlasUiLoadedTag');
    if (ui) {
      const n = readLib(UI_LIB_KEY).filter((e) => e.active).length;
      ui.style.display = n ? 'inline-block' : 'none';
      ui.textContent = n > 1
        ? (safeT('loaded','Loaded') + ' × ' + n)
        : safeT('loaded','Loaded');
    }
    const th = $('atlasThemeLoadedTag');
    if (th) th.style.display = readLib(THEME_LIB_KEY).some((e) => e.active) ? 'inline-block' : 'none';
  }

  // Backward-compatible legacy "clear everything" helpers
  function clearCustomUi()    { clearAllUi(); }
  function clearCustomTheme() { clearAllThemes(); }

  window.atlasImportCustomUi      = importCustomUiFile;
  window.atlasImportCustomTheme   = importCustomThemeFile;
  window.atlasExportDefaultUi     = exportDefaultUi;
  window.atlasDownloadSampleTheme = downloadSampleTheme;
  window.atlasClearCustomUi       = clearCustomUi;
  window.atlasClearCustomTheme    = clearCustomTheme;
  window.atlasUiToggle      = uiToggle;
  window.atlasUiRename      = uiRename;
  window.atlasUiDelete      = uiDelete;
  window.atlasUiExport      = uiExport;
  window.atlasThemeActivate   = themeActivate;
  window.atlasThemeDeactivate = themeDeactivate;
  window.atlasThemeRename     = themeRename;
  window.atlasThemeDelete     = themeDelete;
  window.atlasThemeExport     = themeExport;
  // New: Add-CSS modal (file + name flow, like Add Song)
  window.atlasOpenAddCustomCss    = openAddCustomCss;
  window.atlasCloseAddCustomCss   = closeAddCustomCss;
  window.atlasPreviewCustomCss    = previewCustomCss;
  window.atlasConfirmAddCustomCss = confirmAddCustomCss;

  // Run legacy migration once, before any apply()
  migrateLegacy();

  // ─── 6. Inject UI into Settings ─────────────────────────────
  function injectSettingsUi() {
    const body = document.querySelector('#settingsMenu .settings-body');
    if (!body || $('atlasExtrasSection')) return;

    // 6a. Custom UI / Custom Theme section (place near Experimental)
    const customSec = document.createElement('div');
    customSec.id = 'atlasExtrasSection';
    customSec.className = 'settings-section';
    customSec.innerHTML = `
      <div class="settings-section-title">
        <span class="stg-ico">✦</span>
        <span>${safeT('customUiTheme', 'Custom UI & Theme')}</span>
      </div>
      <div class="setting-desc" style="margin-bottom:10px">
        ${safeT('customUiThemeDescMulti', 'Import as many custom UIs and themes as you like. Each one is saved in this browser. Active UIs stack on top of each other; only one custom theme can be active at a time.')}
      </div>

      <div class="setting-row" style="align-items:flex-start;flex-direction:column;gap:6px">
        <div style="width:100%;display:flex;justify-content:space-between;align-items:center">
          <div class="setting-name">
            <span class="stg-ico">⊞</span>
            <span>${safeT('customUi', 'Custom UI')}</span>
            <span class="atlas-loaded-tag" id="atlasUiLoadedTag" style="display:none">${safeT('loaded','Loaded')}</span>
          </div>
        </div>
        <div class="atlas-import-row">
          <button class="btn sm-btn" onclick="atlasExportDefaultUi()">⬇ ${safeT('exportDefaultUi','Export Default UI')}</button>
          <button class="btn sm-btn primary" onclick="atlasOpenAddCustomCss('ui')">
            ⬆ ${safeT('importCustomUi','Import Custom UI')}
          </button>
          <button class="btn sm-btn danger-btn-wipe" onclick="atlasClearCustomUi()">${safeT('clearAll','Clear All')}</button>
        </div>
        <div class="atlas-lib-list" id="atlasUiLibList"></div>
      </div>

      <div class="setting-row" style="align-items:flex-start;flex-direction:column;gap:6px;margin-top:14px">
        <div style="width:100%;display:flex;justify-content:space-between;align-items:center">
          <div class="setting-name">
            <span class="stg-ico">⚗</span>
            <span>${safeT('customTheme', 'Custom Theme')}</span>
            <span class="atlas-loaded-tag" id="atlasThemeLoadedTag" style="display:none">${safeT('loaded','Loaded')}</span>
          </div>
        </div>
        <div class="atlas-import-row">
          <button class="btn sm-btn" onclick="atlasDownloadSampleTheme()">⬇ ${safeT('downloadSample','Download Sample')}</button>
          <button class="btn sm-btn primary" onclick="atlasOpenAddCustomCss('theme')">
            ⬆ ${safeT('importCustomTheme','Import Custom Theme')}
          </button>
          <button class="btn sm-btn danger-btn-wipe" onclick="atlasClearCustomTheme()">${safeT('clearAll','Clear All')}</button>
        </div>
        <div class="atlas-lib-list" id="atlasThemeLibList"></div>
        <div class="setting-desc" style="margin-top:4px">
          ${safeT('customThemeHint','Download the sample, change the colors / fonts, then import. The theme appears as “Custom (Imported)” in the experimental theme dropdown.')}
        </div>
      </div>
    `;
    body.appendChild(customSec);
    // Populate the lists right after injecting
    renderUiLibList();
    renderThemeLibList();

    // 6b. Danger Zone (Wipe All Data)
    const danger = document.createElement('div');
    danger.id = 'atlasDangerSection';
    danger.className = 'settings-section';
    danger.innerHTML = `
      <div class="settings-section-title" style="color:var(--expense)">
        <span class="stg-ico">!</span>
        <span>${safeT('dangerZone','Danger Zone')}</span>
      </div>
      <div class="setting-desc" style="margin-bottom:10px">
        ${safeT('dangerZoneDesc','Permanently erase every piece of Atlas data stored in this browser — transactions, settings, custom UI, custom theme, songs, and your name.')}
      </div>
      <button class="btn danger-btn-wipe" style="width:100%;padding:12px;font-weight:600" onclick="openAtlasWipe()">
        ⌫ ${safeT('wipeAllData','Wipe All Data')}
      </button>
    `;
    body.appendChild(danger);

    addCustomThemeOption();
    updateLoadedTags();
    attachNumericGuards();
  }

  // Patch openSettings so we inject right before it shows
  const origOpenSettings = window.openSettings;
  window.openSettings = function () {
    injectSettingsUi();
    if (typeof origOpenSettings === 'function') return origOpenSettings.apply(this, arguments);
    const m = $('settingsMenu'); if (m) m.style.display = 'flex';
  };

  // ─── 7. Extra translations (merged into TRANSLATIONS at boot) ──
  const EXTRA_I18N = {
    en: {
      biggerSettings:'Bigger Settings', biggerSettingsDesc:'Expand the settings menu so more options fit on screen.',
      privacyMode:'Privacy Mode', privacyModeDesc:'Blur all amounts. Hover or press Ctrl+H to reveal.',
      compactNumbers:'Compact Numbers', compactNumbersDesc:'Show big amounts as 1.2K / 3.4M instead of full digits.',
      keyboardShortcuts:'Keyboard Shortcuts', keyboardShortcutsDesc:'Enable hotkeys. Press ? to see the list.',
      backupReminder:'Backup Reminder', backupReminderDesc:'Gently remind me to export my data every 14 days.',
      qolFeatures:'Quality of Life',
      shortcutsTitle:'Keyboard Shortcuts',
      scNew:'New transaction', scSettings:'Open settings', scSearch:'Focus search', scClose:'Close any open modal',
      scPrivacy:'Toggle privacy mode', scHelp:'Show this help',
      backupHint:'It has been a while — consider exporting your data as a backup.',
      hiddenForPrivacy:'Hidden — Ctrl+H to show'
    },
    es: { biggerSettings:'Ajustes Grandes', biggerSettingsDesc:'Amplía el menú de ajustes para mostrar más opciones.',
      privacyMode:'Modo Privacidad', privacyModeDesc:'Difumina los importes. Pasa el ratón o pulsa Ctrl+H para verlos.',
      compactNumbers:'Números Compactos', compactNumbersDesc:'Mostrar 1,2K / 3,4M en vez de cifras largas.',
      keyboardShortcuts:'Atajos de Teclado', keyboardShortcutsDesc:'Activa atajos. Pulsa ? para ver la lista.',
      backupReminder:'Recordatorio de Copia', backupReminderDesc:'Recordarme exportar mis datos cada 14 días.',
      qolFeatures:'Calidad de Vida', shortcutsTitle:'Atajos de Teclado',
      scNew:'Nueva transacción', scSettings:'Abrir ajustes', scSearch:'Buscar', scClose:'Cerrar ventana',
      scPrivacy:'Modo privacidad', scHelp:'Mostrar esta ayuda',
      backupHint:'Ha pasado un tiempo: considera exportar tus datos como copia de seguridad.' },
    de: { biggerSettings:'Größere Einstellungen', biggerSettingsDesc:'Einstellungen vergrößern, damit mehr Optionen passen.',
      privacyMode:'Privatsphäre-Modus', privacyModeDesc:'Beträge verschwommen anzeigen. Strg+H zum Anzeigen.',
      compactNumbers:'Kompakte Zahlen', compactNumbersDesc:'Große Beträge als 1,2K / 3,4M anzeigen.',
      keyboardShortcuts:'Tastenkürzel', keyboardShortcutsDesc:'Hotkeys aktivieren. ? für die Liste.',
      backupReminder:'Backup-Erinnerung', backupReminderDesc:'Alle 14 Tage an Daten-Export erinnern.',
      qolFeatures:'Komfortfunktionen', shortcutsTitle:'Tastenkürzel',
      scNew:'Neue Transaktion', scSettings:'Einstellungen öffnen', scSearch:'Suche fokussieren', scClose:'Fenster schließen',
      scPrivacy:'Privatsphäre umschalten', scHelp:'Diese Hilfe anzeigen',
      backupHint:'Es ist eine Weile her — exportiere deine Daten als Sicherung.' },
    tr: { biggerSettings:'Geniş Ayarlar', biggerSettingsDesc:'Daha fazla seçenek sığsın diye ayar menüsünü büyüt.',
      privacyMode:'Gizlilik Modu', privacyModeDesc:'Tutarları bulanıklaştır. Görmek için Ctrl+H.',
      compactNumbers:'Kısaltılmış Sayılar', compactNumbersDesc:'Büyük tutarları 1,2B / 3,4M olarak göster.',
      keyboardShortcuts:'Klavye Kısayolları', keyboardShortcutsDesc:'Kısayolları aç. Liste için ? tuşuna bas.',
      backupReminder:'Yedek Hatırlatıcısı', backupReminderDesc:'14 günde bir yedek almayı hatırlat.',
      qolFeatures:'Kullanım Kolaylığı', shortcutsTitle:'Klavye Kısayolları',
      scNew:'Yeni işlem', scSettings:'Ayarlar', scSearch:'Aramaya odaklan', scClose:'Pencereyi kapat',
      scPrivacy:'Gizliliği aç/kapat', scHelp:'Bu yardımı göster',
      backupHint:'Uzun zaman oldu — verilerini yedek olarak dışa aktar.' },
    ru: { biggerSettings:'Большие настройки', biggerSettingsDesc:'Расширить меню настроек, чтобы поместилось больше.',
      privacyMode:'Режим приватности', privacyModeDesc:'Размыть суммы. Ctrl+H, чтобы показать.',
      compactNumbers:'Сжатые числа', compactNumbersDesc:'Показывать 1,2К / 3,4М вместо полных цифр.',
      keyboardShortcuts:'Горячие клавиши', keyboardShortcutsDesc:'Включить хоткеи. Нажми ? для списка.',
      backupReminder:'Напоминание о бэкапе', backupReminderDesc:'Напоминать экспортировать данные раз в 14 дней.',
      qolFeatures:'Удобство', shortcutsTitle:'Горячие клавиши',
      scNew:'Новая операция', scSettings:'Настройки', scSearch:'Поиск', scClose:'Закрыть окно',
      scPrivacy:'Приватность', scHelp:'Показать справку',
      backupHint:'Давно не было бэкапа — экспортируй данные.' },
    it: { biggerSettings:'Impostazioni Grandi', biggerSettingsDesc:'Espandi il menu impostazioni per più opzioni.',
      privacyMode:'Modalità Privacy', privacyModeDesc:'Sfoca gli importi. Ctrl+H per mostrarli.',
      compactNumbers:'Numeri Compatti', compactNumbersDesc:'Mostra 1,2K / 3,4M invece di cifre intere.',
      keyboardShortcuts:'Scorciatoie Tastiera', keyboardShortcutsDesc:'Attiva i tasti rapidi. Premi ? per la lista.',
      backupReminder:'Promemoria Backup', backupReminderDesc:'Ricordami di esportare i dati ogni 14 giorni.',
      qolFeatures:'Comodità', shortcutsTitle:'Scorciatoie',
      scNew:'Nuova transazione', scSettings:'Impostazioni', scSearch:'Cerca', scClose:'Chiudi finestra',
      scPrivacy:'Modalità privacy', scHelp:'Mostra aiuto',
      backupHint:'È passato un po\' — esporta i tuoi dati come backup.' },
    fa: { biggerSettings:'تنظیمات بزرگ‌تر', biggerSettingsDesc:'منوی تنظیمات را بزرگ‌تر کن تا گزینه‌های بیشتری جا شود.',
      privacyMode:'حالت حریم خصوصی', privacyModeDesc:'مبالغ را تار کن. Ctrl+H برای نمایش.',
      compactNumbers:'اعداد فشرده', compactNumbersDesc:'نمایش ۱٫۲هزار / ۳٫۴م به‌جای کامل.',
      keyboardShortcuts:'میان‌برهای کیبورد', keyboardShortcutsDesc:'فعال‌سازی میان‌برها. ? برای فهرست.',
      backupReminder:'یادآور پشتیبان', backupReminderDesc:'هر ۱۴ روز یادآوری برای خروجی گرفتن.',
      qolFeatures:'کیفیت زندگی', shortcutsTitle:'میان‌برها',
      scNew:'تراکنش جدید', scSettings:'تنظیمات', scSearch:'جستجو', scClose:'بستن پنجره',
      scPrivacy:'حالت حریم خصوصی', scHelp:'نمایش راهنما',
      backupHint:'مدتی گذشته — داده‌ها را به‌عنوان پشتیبان خروجی بگیر.' },
    ar: { biggerSettings:'إعدادات أكبر', biggerSettingsDesc:'وسّع قائمة الإعدادات لتظهر خيارات أكثر.',
      privacyMode:'وضع الخصوصية', privacyModeDesc:'تمويه المبالغ. Ctrl+H للإظهار.',
      compactNumbers:'أرقام مختصرة', compactNumbersDesc:'عرض 1.2K / 3.4M بدل الأرقام الكاملة.',
      keyboardShortcuts:'اختصارات لوحة المفاتيح', keyboardShortcutsDesc:'فعّل الاختصارات. اضغط ? للقائمة.',
      backupReminder:'تذكير بالنسخ الاحتياطي', backupReminderDesc:'ذكّرني بتصدير البيانات كل 14 يومًا.',
      qolFeatures:'تحسينات الاستخدام', shortcutsTitle:'الاختصارات',
      scNew:'معاملة جديدة', scSettings:'الإعدادات', scSearch:'بحث', scClose:'إغلاق النافذة',
      scPrivacy:'وضع الخصوصية', scHelp:'عرض المساعدة',
      backupHint:'مرّ وقت — صدّر بياناتك كنسخة احتياطية.' },
    ja: { biggerSettings:'大きな設定', biggerSettingsDesc:'設定メニューを拡張して項目を見やすく。',
      privacyMode:'プライバシーモード', privacyModeDesc:'金額をぼかす。Ctrl+Hで表示。',
      compactNumbers:'数値を短縮', compactNumbersDesc:'1.2K / 3.4M のように短く表示。',
      keyboardShortcuts:'キーボードショートカット', keyboardShortcutsDesc:'有効化。? で一覧。',
      backupReminder:'バックアップ通知', backupReminderDesc:'14日ごとにエクスポートを促す。',
      qolFeatures:'便利機能', shortcutsTitle:'ショートカット',
      scNew:'新規取引', scSettings:'設定を開く', scSearch:'検索', scClose:'ウィンドウを閉じる',
      scPrivacy:'プライバシー切替', scHelp:'ヘルプ表示',
      backupHint:'しばらく経ちました — データのエクスポートを検討してください。' }
  };
  function mergeI18n() {
    try {
      if (!window.TRANSLATIONS) return;
      Object.keys(window.TRANSLATIONS).forEach((lang) => {
        const src = EXTRA_I18N[lang] || EXTRA_I18N.en;
        Object.assign(window.TRANSLATIONS[lang], src);
        // Always backfill missing keys from EN so other languages still get the feature.
        Object.keys(EXTRA_I18N.en).forEach((k) => {
          if (window.TRANSLATIONS[lang][k] == null) {
            window.TRANSLATIONS[lang][k] = EXTRA_I18N.en[k];
          }
        });
      });
    } catch (e) {}
  }

  // ─── 8. QoL settings (persisted) ────────────────────────────
  const QOL_KEYS = {
    bigger:    'atlas_qol_bigger_settings',
    privacy:   'atlas_qol_privacy',
    compact:   'atlas_qol_compact_numbers',
    shortcuts: 'atlas_qol_shortcuts',
    backup:    'atlas_qol_backup_reminder'
  };
  const qolGet = (k, def) => {
    const v = LS.getItem(QOL_KEYS[k]);
    if (v == null) return def;
    return v === '1';
  };
  const qolSet = (k, val) => LS.setItem(QOL_KEYS[k], val ? '1' : '0');

  function applyBigger()  { document.body.classList.toggle('atlas-bigger-settings', qolGet('bigger', false)); }
  function applyPrivacy() { document.body.classList.toggle('atlas-privacy',         qolGet('privacy', false)); }

  function applyCompact() {
    if (!qolGet('compact', false)) {
      // Re-run native updateUI to restore full numbers
      try { if (typeof window.updateUI === 'function') window.updateUI(); } catch (e) {}
      return;
    }
    const fmt = (n) => {
      const abs = Math.abs(n);
      if (abs >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'B';
      if (abs >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'M';
      if (abs >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'K';
      return n.toFixed(2);
    };
    ['balance','totalIncome','totalExpense'].forEach((id) => {
      const el = $(id); if (!el) return;
      const raw = parseFloat(el.dataset.raw ?? el.textContent.replace(/[^\d.\-]/g,''));
      if (isNaN(raw)) return;
      el.dataset.raw = raw;
      el.textContent = fmt(raw);
    });
  }
  // Keep compact in sync when base updates the UI
  const origUpdateUI = window.updateUI;
  if (typeof origUpdateUI === 'function') {
    window.updateUI = function () {
      const r = origUpdateUI.apply(this, arguments);
      if (qolGet('compact', false)) applyCompact();
      return r;
    };
  }

  // ─── 9. Keyboard shortcuts ──────────────────────────────────
  function buildShortcutsModal() {
    if ($('atlasShortcutsModal')) return;
    const m = document.createElement('div');
    m.id = 'atlasShortcutsModal';
    m.innerHTML = `
      <div class="sc-card">
        <h3><span id="scTitle">Keyboard Shortcuts</span><button class="sc-close" id="scClose">✕</button></h3>
        <div class="sc-row"><span id="scNewLbl">New transaction</span><kbd>N</kbd></div>
        <div class="sc-row"><span id="scSetLbl">Open settings</span><kbd>S</kbd></div>
        <div class="sc-row"><span id="scSrchLbl">Focus search</span><kbd>/</kbd></div>
        <div class="sc-row"><span id="scClsLbl">Close any open modal</span><kbd>Esc</kbd></div>
        <div class="sc-row"><span id="scPrvLbl">Toggle privacy mode</span><kbd>Ctrl</kbd> + <kbd>H</kbd></div>
        <div class="sc-row"><span id="scHlpLbl">Show this help</span><kbd>?</kbd></div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('show'); });
    $('scClose').addEventListener('click', () => m.classList.remove('show'));
  }
  function openShortcuts() {
    buildShortcutsModal();
    $('scTitle').textContent  = safeT('shortcutsTitle','Keyboard Shortcuts');
    $('scNewLbl').textContent = safeT('scNew','New transaction');
    $('scSetLbl').textContent = safeT('scSettings','Open settings');
    $('scSrchLbl').textContent= safeT('scSearch','Focus search');
    $('scClsLbl').textContent = safeT('scClose','Close any open modal');
    $('scPrvLbl').textContent = safeT('scPrivacy','Toggle privacy mode');
    $('scHlpLbl').textContent = safeT('scHelp','Show this help');
    $('atlasShortcutsModal').classList.add('show');
  }
  window.openAtlasShortcuts = openShortcuts;

  function isTypingTarget(t) {
    if (!t) return false;
    const tag = (t.tagName || '').toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || t.isContentEditable;
  }
  document.addEventListener('keydown', (e) => {
    // Privacy hotkey works regardless of toggle (still useful)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'h' || e.key === 'H')) {
      e.preventDefault();
      qolSet('privacy', !qolGet('privacy', false));
      applyPrivacy();
      showToast(qolGet('privacy', false) ? safeT('privacyMode','Privacy Mode') + ' ✓' : '—');
      const cb = $('stgQolPrivacy'); if (cb) cb.checked = qolGet('privacy', false);
      return;
    }
    if (!qolGet('shortcuts', true)) return;
    if (isTypingTarget(e.target)) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    if (e.key === 'Escape') {
      // Close any visible modal
      document.querySelectorAll('.modal').forEach((m) => {
        if (getComputedStyle(m).display !== 'none') m.style.display = 'none';
      });
      const sm = $('atlasShortcutsModal'); if (sm) sm.classList.remove('show');
      const wm = $('welcomeModal'); if (wm) wm.classList.remove('show');
      return;
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) { e.preventDefault(); openShortcuts(); return; }
    if (e.key === 'n' || e.key === 'N') { try { window.openAdd && window.openAdd(); } catch(_){} return; }
    if (e.key === 's' || e.key === 'S') { try { window.openSettings && window.openSettings(); } catch(_){} return; }
    if (e.key === '/') {
      const search = document.querySelector('input[type="search"], #searchInput, input[placeholder*="earch" i]');
      if (search) { e.preventDefault(); search.focus(); }
    }
  });

  // ─── 10. Backup reminder ────────────────────────────────────
  function maybeShowBackupReminder() {
    if (!qolGet('backup', true)) return;
    const last = parseInt(LS.getItem('atlas_last_backup_seen') || '0', 10);
    const now = Date.now();
    if (!last) { LS.setItem('atlas_last_backup_seen', String(now)); return; }
    const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
    if (now - last >= FOURTEEN_DAYS) {
      setTimeout(() => showToast(safeT('backupHint','It has been a while — consider exporting your data as a backup.'), { duration: 4500 }), 2500);
      LS.setItem('atlas_last_backup_seen', String(now));
    }
  }

  // ─── 11. Inject QoL settings into General section ───────────
  function injectQolSettings() {
    const generalSection = document.querySelector('#settingsMenu .settings-section');
    if (!generalSection || $('atlasQolBlock')) return;

    const block = document.createElement('div');
    block.id = 'atlasQolBlock';
    block.innerHTML = `
      <div class="setting-row">
        <div><div class="setting-name">⤢ <span>${safeT('biggerSettings','Bigger Settings')}</span></div>
        <div class="setting-desc">${safeT('biggerSettingsDesc','Expand the settings menu so more options fit on screen.')}</div></div>
        <label class="toggle-switch"><input type="checkbox" id="stgQolBigger"><span class="toggle-slider"></span></label>
      </div>
      <div class="setting-row">
        <div><div class="setting-name">◐ <span>${safeT('privacyMode','Privacy Mode')}</span></div>
        <div class="setting-desc">${safeT('privacyModeDesc','Blur all amounts. Hover or press Ctrl+H to reveal.')}</div></div>
        <label class="toggle-switch"><input type="checkbox" id="stgQolPrivacy"><span class="toggle-slider"></span></label>
      </div>
      <div class="setting-row">
        <div><div class="setting-name">≈ <span>${safeT('compactNumbers','Compact Numbers')}</span></div>
        <div class="setting-desc">${safeT('compactNumbersDesc','Show big amounts as 1.2K / 3.4M instead of full digits.')}</div></div>
        <label class="toggle-switch"><input type="checkbox" id="stgQolCompact"><span class="toggle-slider"></span></label>
      </div>
      <div class="setting-row">
        <div><div class="setting-name">⌨ <span>${safeT('keyboardShortcuts','Keyboard Shortcuts')}</span></div>
        <div class="setting-desc">${safeT('keyboardShortcutsDesc','Enable hotkeys. Press ? to see the list.')} <a href="#" id="stgQolShowSc" style="color:var(--accent,#4ade80)">?</a></div></div>
        <label class="toggle-switch"><input type="checkbox" id="stgQolShortcuts"><span class="toggle-slider"></span></label>
      </div>
      <div class="setting-row">
        <div><div class="setting-name">⏰ <span>${safeT('backupReminder','Backup Reminder')}</span></div>
        <div class="setting-desc">${safeT('backupReminderDesc','Gently remind me to export my data every 14 days.')}</div></div>
        <label class="toggle-switch"><input type="checkbox" id="stgQolBackup"><span class="toggle-slider"></span></label>
      </div>
    `;
    generalSection.appendChild(block);

    // Wire up
    const wire = (id, key, def, after) => {
      const cb = $(id); if (!cb) return;
      cb.checked = qolGet(key, def);
      cb.addEventListener('change', () => {
        qolSet(key, cb.checked);
        if (after) after();
      });
    };
    wire('stgQolBigger',    'bigger',    false, applyBigger);
    wire('stgQolPrivacy',   'privacy',   false, applyPrivacy);
    wire('stgQolCompact',   'compact',   false, applyCompact);
    wire('stgQolShortcuts', 'shortcuts', true,  () => {});
    wire('stgQolBackup',    'backup',    true,  () => {});
    const link = $('stgQolShowSc');
    if (link) link.addEventListener('click', (e) => { e.preventDefault(); openShortcuts(); });
  }

  // Hook openSettings to also inject the QoL block
  const prevOpenSettings = window.openSettings;
  window.openSettings = function () {
    const r = prevOpenSettings ? prevOpenSettings.apply(this, arguments) : (function(){ const m = $('settingsMenu'); if (m) m.style.display = 'flex'; })();
    injectQolSettings();
    return r;
  };

  // ─── 12. Loader-aware welcome ───────────────────────────────
  function whenLoaderGone(cb) {
    const loader = $('loader');
    if (!loader || loader.classList.contains('fade-out') || getComputedStyle(loader).display === 'none') {
      cb(); return;
    }
    const obs = new MutationObserver(() => {
      if (loader.classList.contains('fade-out')) {
        obs.disconnect();
        // Wait for fade-out transition (~500ms) so the welcome lands on the menu, not over the loader
        setTimeout(cb, 600);
      }
    });
    obs.observe(loader, { attributes: true, attributeFilter: ['class', 'style'] });
    // Safety net: if loader never finishes, show after 8s
    setTimeout(() => { obs.disconnect(); cb(); }, 8000);
  }

  // ─── 13. Boot ───────────────────────────────────────────────
  function boot() {
    mergeI18n();
    applyCustomUi();
    applyCustomTheme();
    applyBigger();
    applyPrivacy();
    renderGreeting();
    // Re-run greeting whenever sidebar toggles, so layout stays clean
    const origToggle = window.toggleSidebarCollapse;
    if (typeof origToggle === 'function') {
      window.toggleSidebarCollapse = function () {
        const r = origToggle.apply(this, arguments);
        renderGreeting();
        return r;
      };
    }
    // Welcome modal: only after loader is gone (so it lands on the actual menu)
    whenLoaderGone(() => {
      maybeShowWelcome();
      maybeShowBackupReminder();
      // Apply compact numbers after first updateUI tick
      if (qolGet('compact', false)) setTimeout(applyCompact, 100);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
