/* ═══════════════════════════════════════════════════════════
   PROJECT ATLAS — atlas-qol-extra.js
   Loaded AFTER atlas-extras.js. Adds extra QoL features the
   user asked for, all fully translated:
     • Starting balance entered in welcome modal becomes a
       real "Starting Balance" transaction (not a silent var).
     • Editable Name field in Settings (with Save).
     • Adjust Balance from Settings (creates an adjustment tx).
     • Default Transaction Type (income | expense).
     • Smart Category Memory (remembers last used category).
     • Confirm Large Transactions with user threshold.
     • Auto-Backup reminder on export trigger (one-click).
     • Highlight Today's transactions.
     • Translates the previously-untranslated buttons in Settings
       (Clear, Loaded, Export Default UI, Import Custom UI,
        Download Sample, Import Custom Theme, Wipe All Data, etc.).
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $   = (id) => document.getElementById(id);
  const LS  = window.localStorage;
  const safeT = (k, f) => {
    try { if (typeof window.t === 'function') { const v = window.t(k); if (v && v !== k) return v; } } catch (e) {}
    return f;
  };

  /* ── 1. EXTRA i18n (translates all settings buttons) ──── */
  const I18N = {
    en: {
      // Untranslated UI labels
      clear:'Clear', loaded:'Loaded',
      exportDefaultUi:'Export Default UI', importCustomUi:'Import Custom UI',
      downloadSample:'Download Sample', importCustomTheme:'Import Custom Theme',
      wipeAllData:'Wipe All Data', dangerZone:'Danger Zone',
      customUiTheme:'Custom UI & Theme',
      customUi:'Custom UI', customTheme:'Custom Theme',
      // New QoL
      profile:'Profile', yourName:'Your Name', yourNameDesc:'Shown in the header greeting.',
      save:'Save', saved:'Saved ✓',
      adjustBalance:'Adjust Balance', adjustBalanceDesc:'Add or subtract from your current balance. Creates a real transaction so your history stays correct.',
      adjust:'Adjust', balanceAdjusted:'Balance adjusted',
      defaultsSection:'Smart Defaults',
      defaultTxType:'Default Transaction Type',
      defaultTxTypeDesc:'Pre-select this when opening the New Transaction modal.',
      smartCategory:'Smart Category Memory',
      smartCategoryDesc:'Remember your last-used category and pre-select it next time.',
      safetySection:'Safety',
      confirmLarge:'Confirm Large Transactions',
      confirmLargeDesc:'Show a confirmation popup when adding amounts above the threshold.',
      threshold:'Threshold',
      bigTxTitle:'Confirm transaction',
      bigTxBody:'You are about to add a large transaction. Continue?',
      confirm:'Confirm',
      todayHighlight:"Highlight Today's Transactions",
      todayHighlightDesc:'Mark transactions made today with the accent color.',
      startingBalance:'Starting Balance',
      welcomeNote:'Initial setup',
      adjustment:'Balance adjustment',
      experimentalSection:'Experimental', evenBiggerSettings:'Even Bigger Settings (3 columns)', evenBiggerSettingsDesc:'Expand the settings menu to three columns for more options at a glance. Requires Bigger Settings to be on.'
    },
    es: {
      clear:'Borrar', loaded:'Cargado',
      exportDefaultUi:'Exportar UI por defecto', importCustomUi:'Importar UI personalizada',
      downloadSample:'Descargar plantilla', importCustomTheme:'Importar tema',
      wipeAllData:'Borrar todos los datos', dangerZone:'Zona de peligro',
      customUiTheme:'UI y tema personalizados',
      customUi:'UI personalizada', customTheme:'Tema personalizado',
      profile:'Perfil', yourName:'Tu nombre', yourNameDesc:'Se muestra en el saludo del encabezado.',
      save:'Guardar', saved:'Guardado ✓',
      adjustBalance:'Ajustar saldo', adjustBalanceDesc:'Suma o resta a tu saldo actual. Crea una transacción real para mantener el historial correcto.',
      adjust:'Ajustar', balanceAdjusted:'Saldo ajustado',
      defaultsSection:'Predeterminados inteligentes',
      defaultTxType:'Tipo de transacción por defecto',
      defaultTxTypeDesc:'Se selecciona al abrir Nueva transacción.',
      smartCategory:'Categoría inteligente',
      smartCategoryDesc:'Recuerda la última categoría usada y la selecciona la próxima vez.',
      safetySection:'Seguridad',
      confirmLarge:'Confirmar transacciones grandes',
      confirmLargeDesc:'Mostrar una confirmación al añadir importes superiores al umbral.',
      threshold:'Umbral',
      bigTxTitle:'Confirmar transacción',
      bigTxBody:'Vas a añadir una transacción grande. ¿Continuar?',
      confirm:'Confirmar',
      todayHighlight:'Resaltar transacciones de hoy',
      todayHighlightDesc:'Marca las transacciones de hoy con el color de acento.',
      startingBalance:'Saldo inicial', welcomeNote:'Configuración inicial', adjustment:'Ajuste de saldo',
      experimentalSection:'Experimental', evenBiggerSettings:'Ajustes aún más grandes (3 columnas)', evenBiggerSettingsDesc:'Expande el menú de ajustes a tres columnas. Requiere que Ajustes más grandes esté activado.'
    },
    de: {
      clear:'Löschen', loaded:'Geladen',
      exportDefaultUi:'Standard-UI exportieren', importCustomUi:'Eigene UI importieren',
      downloadSample:'Vorlage laden', importCustomTheme:'Eigenes Theme importieren',
      wipeAllData:'Alle Daten löschen', dangerZone:'Gefahrenzone',
      customUiTheme:'Eigene UI & Theme', customUi:'Eigene UI', customTheme:'Eigenes Theme',
      profile:'Profil', yourName:'Dein Name', yourNameDesc:'Wird im Header-Gruß angezeigt.',
      save:'Speichern', saved:'Gespeichert ✓',
      adjustBalance:'Saldo anpassen', adjustBalanceDesc:'Erhöhe oder verringere dein Saldo. Erstellt eine echte Transaktion.',
      adjust:'Anpassen', balanceAdjusted:'Saldo angepasst',
      defaultsSection:'Smarte Voreinstellungen',
      defaultTxType:'Standard-Transaktionstyp',
      defaultTxTypeDesc:'Wird beim Öffnen vorausgewählt.',
      smartCategory:'Smarte Kategorie',
      smartCategoryDesc:'Merkt sich die zuletzt genutzte Kategorie.',
      safetySection:'Sicherheit',
      confirmLarge:'Große Transaktionen bestätigen',
      confirmLargeDesc:'Bestätigung bei Beträgen über dem Schwellwert.',
      threshold:'Schwellwert', bigTxTitle:'Transaktion bestätigen',
      bigTxBody:'Du fügst eine große Transaktion hinzu. Fortfahren?', confirm:'Bestätigen',
      todayHighlight:'Heutige Transaktionen hervorheben',
      todayHighlightDesc:'Heutige Transaktionen mit Akzentfarbe markieren.',
      startingBalance:'Startsaldo', welcomeNote:'Ersteinrichtung', adjustment:'Saldoanpassung',
      experimentalSection:'Experimentell', evenBiggerSettings:'Noch größere Einstellungen (3 Spalten)', evenBiggerSettingsDesc:'Erweitert das Einstellungsmenü auf drei Spalten. Benötigt aktivierte größere Einstellungen.'
    },
    tr: {
      clear:'Temizle', loaded:'Yüklendi',
      exportDefaultUi:'Varsayılan UI’yi dışa aktar', importCustomUi:'Özel UI içe aktar',
      downloadSample:'Örnek indir', importCustomTheme:'Özel tema içe aktar',
      wipeAllData:'Tüm verileri sil', dangerZone:'Tehlikeli alan',
      customUiTheme:'Özel UI ve Tema', customUi:'Özel UI', customTheme:'Özel Tema',
      profile:'Profil', yourName:'Adın', yourNameDesc:'Başlıktaki selamlamada gösterilir.',
      save:'Kaydet', saved:'Kaydedildi ✓',
      adjustBalance:'Bakiyeyi düzenle', adjustBalanceDesc:'Mevcut bakiyene ekle veya çıkar. Geçmiş düzgün kalsın diye gerçek bir işlem oluşturur.',
      adjust:'Düzenle', balanceAdjusted:'Bakiye düzenlendi',
      defaultsSection:'Akıllı Varsayılanlar',
      defaultTxType:'Varsayılan İşlem Türü',
      defaultTxTypeDesc:'Yeni İşlem açıldığında seçili gelir.',
      smartCategory:'Akıllı Kategori',
      smartCategoryDesc:'Son kullandığın kategoriyi hatırlar.',
      safetySection:'Güvenlik',
      confirmLarge:'Büyük İşlemleri Onayla',
      confirmLargeDesc:'Eşik üstü tutarlarda onay sor.',
      threshold:'Eşik', bigTxTitle:'İşlemi onayla',
      bigTxBody:'Büyük bir işlem ekliyorsun. Devam edilsin mi?', confirm:'Onayla',
      todayHighlight:"Bugünün işlemlerini vurgula",
      todayHighlightDesc:'Bugün eklenen işlemler vurgu rengiyle işaretlensin.',
      startingBalance:'Başlangıç Bakiyesi', welcomeNote:'İlk kurulum', adjustment:'Bakiye düzenlemesi',
      experimentalSection:'Deneysel', evenBiggerSettings:'Daha da büyük ayarlar (3 sütun)', evenBiggerSettingsDesc:'Ayarlar menüsünü üç sütuna genişletir. Büyük Ayarlar açık olmalı.'
    },
    ru: {
      clear:'Очистить', loaded:'Загружено',
      exportDefaultUi:'Экспорт UI', importCustomUi:'Импорт своего UI',
      downloadSample:'Скачать шаблон', importCustomTheme:'Импорт темы',
      wipeAllData:'Стереть все данные', dangerZone:'Опасная зона',
      customUiTheme:'UI и тема', customUi:'Свой UI', customTheme:'Своя тема',
      profile:'Профиль', yourName:'Ваше имя', yourNameDesc:'Показывается в приветствии.',
      save:'Сохранить', saved:'Сохранено ✓',
      adjustBalance:'Скорректировать баланс', adjustBalanceDesc:'Добавить или вычесть из текущего баланса. Создаёт реальную транзакцию.',
      adjust:'Применить', balanceAdjusted:'Баланс изменён',
      defaultsSection:'Умные значения',
      defaultTxType:'Тип по умолчанию', defaultTxTypeDesc:'Выбирается при открытии новой операции.',
      smartCategory:'Запоминать категорию', smartCategoryDesc:'Запомнит последнюю и подставит снова.',
      safetySection:'Безопасность',
      confirmLarge:'Подтверждать крупные операции',
      confirmLargeDesc:'Запрашивать подтверждение для сумм выше порога.',
      threshold:'Порог', bigTxTitle:'Подтвердить операцию',
      bigTxBody:'Добавляется крупная операция. Продолжить?', confirm:'Подтвердить',
      todayHighlight:'Подсветка сегодняшних операций',
      todayHighlightDesc:'Помечать сегодняшние операции акцентным цветом.',
      startingBalance:'Начальный баланс', welcomeNote:'Первичная настройка', adjustment:'Коррекция баланса',
      experimentalSection:'Эксперименты', evenBiggerSettings:'Ещё больше настроек (3 колонки)', evenBiggerSettingsDesc:'Расширяет меню настроек до трёх колонок. Требует включённых увеличенных настроек.'
    },
    it: {
      clear:'Cancella', loaded:'Caricato',
      exportDefaultUi:'Esporta UI predefinita', importCustomUi:'Importa UI personalizzata',
      downloadSample:'Scarica modello', importCustomTheme:'Importa tema',
      wipeAllData:'Cancella tutti i dati', dangerZone:'Zona pericolo',
      customUiTheme:'UI e Tema personalizzati', customUi:'UI personalizzata', customTheme:'Tema personalizzato',
      profile:'Profilo', yourName:'Il tuo nome', yourNameDesc:'Mostrato nel saluto in alto.',
      save:'Salva', saved:'Salvato ✓',
      adjustBalance:'Regola saldo', adjustBalanceDesc:'Somma o sottrai dal saldo. Crea una transazione reale.',
      adjust:'Regola', balanceAdjusted:'Saldo regolato',
      defaultsSection:'Predefiniti intelligenti',
      defaultTxType:'Tipo predefinito', defaultTxTypeDesc:'Pre-selezionato all’apertura.',
      smartCategory:'Categoria intelligente', smartCategoryDesc:'Ricorda l’ultima categoria usata.',
      safetySection:'Sicurezza',
      confirmLarge:'Conferma transazioni grandi',
      confirmLargeDesc:'Mostra conferma sopra la soglia.',
      threshold:'Soglia', bigTxTitle:'Conferma transazione',
      bigTxBody:'Stai per aggiungere una transazione grande. Continuare?', confirm:'Conferma',
      todayHighlight:'Evidenzia transazioni di oggi',
      todayHighlightDesc:'Segna le transazioni di oggi con il colore d’accento.',
      startingBalance:'Saldo iniziale', welcomeNote:'Configurazione iniziale', adjustment:'Regolazione saldo',
      experimentalSection:'Sperimentale', evenBiggerSettings:'Impostazioni ancora più grandi (3 colonne)', evenBiggerSettingsDesc:'Espande il menu impostazioni a tre colonne. Richiede Impostazioni più grandi attivo.'
    },
    fa: {
      clear:'پاک کردن', loaded:'بارگذاری شد',
      exportDefaultUi:'خروجی UI پیش‌فرض', importCustomUi:'ورود UI سفارشی',
      downloadSample:'دانلود نمونه', importCustomTheme:'ورود تم سفارشی',
      wipeAllData:'پاک‌سازی همه داده‌ها', dangerZone:'منطقه خطر',
      customUiTheme:'UI و تم سفارشی', customUi:'UI سفارشی', customTheme:'تم سفارشی',
      profile:'نمایه', yourName:'نام شما', yourNameDesc:'در سلام بالای صفحه نمایش داده می‌شود.',
      save:'ذخیره', saved:'ذخیره شد ✓',
      adjustBalance:'تعدیل موجودی', adjustBalanceDesc:'به موجودی فعلی اضافه یا کم کن. یک تراکنش واقعی ایجاد می‌کند.',
      adjust:'اعمال', balanceAdjusted:'موجودی تنظیم شد',
      defaultsSection:'پیش‌فرض‌های هوشمند',
      defaultTxType:'نوع تراکنش پیش‌فرض', defaultTxTypeDesc:'هنگام باز شدن انتخاب می‌شود.',
      smartCategory:'دسته هوشمند', smartCategoryDesc:'آخرین دسته را به‌خاطر می‌سپارد.',
      safetySection:'ایمنی',
      confirmLarge:'تأیید تراکنش‌های بزرگ', confirmLargeDesc:'برای مبالغ بالای آستانه تأیید بخواه.',
      threshold:'آستانه', bigTxTitle:'تأیید تراکنش',
      bigTxBody:'یک تراکنش بزرگ اضافه می‌شود. ادامه می‌دهی؟', confirm:'تأیید',
      todayHighlight:'برجسته‌سازی تراکنش‌های امروز',
      todayHighlightDesc:'تراکنش‌های امروز با رنگ تأکید مشخص شوند.',
      startingBalance:'موجودی اولیه', welcomeNote:'راه‌اندازی اولیه', adjustment:'تعدیل موجودی',
      experimentalSection:'آزمایشی', evenBiggerSettings:'تنظیمات حتی بزرگ‌تر (۳ ستون)', evenBiggerSettingsDesc:'منوی تنظیمات را به سه ستون گسترش می‌دهد. نیازمند فعال بودن تنظیمات بزرگ‌تر.'
    },
    ar: {
      clear:'مسح', loaded:'تم التحميل',
      exportDefaultUi:'تصدير الواجهة الافتراضية', importCustomUi:'استيراد واجهة مخصصة',
      downloadSample:'تنزيل النموذج', importCustomTheme:'استيراد سمة',
      wipeAllData:'مسح كل البيانات', dangerZone:'منطقة الخطر',
      customUiTheme:'واجهة وسمة مخصصة', customUi:'واجهة مخصصة', customTheme:'سمة مخصصة',
      profile:'الملف الشخصي', yourName:'اسمك', yourNameDesc:'يظهر في تحية الرأس.',
      save:'حفظ', saved:'تم الحفظ ✓',
      adjustBalance:'تعديل الرصيد', adjustBalanceDesc:'أضِف أو اطرح من رصيدك. ينشئ معاملة حقيقية.',
      adjust:'تطبيق', balanceAdjusted:'تم تعديل الرصيد',
      defaultsSection:'الإعدادات الذكية',
      defaultTxType:'نوع المعاملة الافتراضي', defaultTxTypeDesc:'يُحدَّد تلقائيًا عند الفتح.',
      smartCategory:'فئة ذكية', smartCategoryDesc:'يتذكر آخر فئة استخدمتها.',
      safetySection:'الأمان',
      confirmLarge:'تأكيد المعاملات الكبيرة', confirmLargeDesc:'اطلب تأكيدًا للمبالغ فوق الحد.',
      threshold:'الحد', bigTxTitle:'تأكيد المعاملة',
      bigTxBody:'أنت على وشك إضافة معاملة كبيرة. متابعة؟', confirm:'تأكيد',
      todayHighlight:'تمييز معاملات اليوم',
      todayHighlightDesc:'تمييز معاملات اليوم بلون التمييز.',
      startingBalance:'الرصيد الابتدائي', welcomeNote:'الإعداد الأولي', adjustment:'تعديل الرصيد',
      experimentalSection:'تجريبي', evenBiggerSettings:'إعدادات أكبر (٣ أعمدة)', evenBiggerSettingsDesc:'يوسّع قائمة الإعدادات إلى ثلاثة أعمدة. يتطلب تفعيل الإعدادات الأكبر.'
    },
    ja: {
      clear:'クリア', loaded:'読み込み済み',
      exportDefaultUi:'既定のUIを書き出し', importCustomUi:'カスタムUIを取り込み',
      downloadSample:'サンプルをDL', importCustomTheme:'テーマを取り込み',
      wipeAllData:'全データを削除', dangerZone:'危険エリア',
      customUiTheme:'カスタムUIとテーマ', customUi:'カスタムUI', customTheme:'カスタムテーマ',
      profile:'プロフィール', yourName:'お名前', yourNameDesc:'ヘッダーの挨拶に表示。',
      save:'保存', saved:'保存しました ✓',
      adjustBalance:'残高を調整', adjustBalanceDesc:'残高に加算または減算。実際の取引として記録。',
      adjust:'適用', balanceAdjusted:'残高を調整しました',
      defaultsSection:'スマート既定値',
      defaultTxType:'既定の取引タイプ', defaultTxTypeDesc:'新規取引時に自動選択。',
      smartCategory:'スマートカテゴリ', smartCategoryDesc:'最後に使ったカテゴリを覚える。',
      safetySection:'安全',
      confirmLarge:'大きな取引を確認', confirmLargeDesc:'しきい値超で確認を表示。',
      threshold:'しきい値', bigTxTitle:'取引を確認',
      bigTxBody:'大きな取引を追加します。続行しますか？', confirm:'確認',
      todayHighlight:'今日の取引を強調',
      todayHighlightDesc:'今日追加した取引をアクセント色で強調。',
      startingBalance:'初期残高', welcomeNote:'初期設定', adjustment:'残高調整',
      experimentalSection:'実験的', evenBiggerSettings:'さらに大きな設定 (3列)', evenBiggerSettingsDesc:'設定メニューを3列に拡張。大きな設定が有効である必要があります。'
    }
  };

  function mergeI18n() {
    if (!window.TRANSLATIONS) return;
    Object.keys(window.TRANSLATIONS).forEach((lang) => {
      const src = I18N[lang] || I18N.en;
      Object.assign(window.TRANSLATIONS[lang], src);
      Object.keys(I18N.en).forEach((k) => {
        if (window.TRANSLATIONS[lang][k] == null) {
          window.TRANSLATIONS[lang][k] = I18N.en[k];
        }
      });
    });
  }

  /* ── 2. Settings keys & helpers ────────────────────────── */
  const K = {
    defaultType:    'atlas_qol_default_tx_type',
    smartCat:       'atlas_qol_smart_category',
    lastCat:        'atlas_qol_last_category',
    confirmLarge:   'atlas_qol_confirm_large',
    confirmThresh:  'atlas_qol_confirm_threshold',
    todayHighlight: 'atlas_qol_today_highlight'
  };
  const get = (k, def) => { const v = LS.getItem(k); return v == null ? def : v; };
  const set = (k, v)   => LS.setItem(k, v);

  /* ── 3. Push a real transaction (uses base data model) ──
     Base script declares `transactions` and `balance` as top-level `let`
     bindings in a classic <script>, so they are NOT on `window`.
     We reach them via indirect eval, mutate them, then trigger save+UI. */
  function getTxArray() {
    try { return (0, eval)('typeof transactions !== "undefined" ? transactions : null'); }
    catch (e) { return null; }
  }
  function getBalance() {
    try { return (0, eval)('typeof balance !== "undefined" ? balance : 0'); }
    catch (e) { return 0; }
  }
  function setBalance(v) {
    try { (0, eval)('balance = ' + Number(v)); return true; }
    catch (e) { return false; }
  }
  function callGlobal(fn) {
    try { (0, eval)('typeof ' + fn + ' === "function" && ' + fn + '()'); } catch (e) {}
  }
  function pushTransaction(name, amount, type, category, note) {
    const arr = getTxArray();
    if (!Array.isArray(arr)) return false;
    const cur = getBalance();
    const next = type === 'income' ? cur + amount : cur - amount;
    setBalance(next);
    arr.push({
      name, amount, type, category: category || 'General',
      note: note || '', createdAt: new Date().toISOString()
    });
    callGlobal('saveData');
    callGlobal('updateUI');
    callGlobal('renderPredefined');
    return true;
  }
  window.atlasPushTransaction = pushTransaction;

  /* ── 4. Patch the welcome modal: starting balance → tx ── */
  // The base welcome modal already wrote `window.balance = bal`. We override
  // the wmGo handler AFTER it builds the modal to convert that into a
  // proper transaction so the user's history is correct.
  function patchWelcomeIntoTransaction() {
    const obs = new MutationObserver(() => {
      const go   = $('wmGo');
      const skip = $('wmSkip');
      const bal  = $('wmBal');
      const nameI = $('wmName');
      if (!go || go.dataset.atlasTxPatched) return;
      go.dataset.atlasTxPatched = '1';

      // Replace the click handler entirely with our own version.
      const newGo = go.cloneNode(true);
      go.parentNode.replaceChild(newGo, go);
      const newSkip = skip.cloneNode(true);
      skip.parentNode.replaceChild(newSkip, skip);

      const closeWelcome = () => {
        LS.setItem('atlas_first_run_done', '1');
        const wm = $('welcomeModal'); if (wm) wm.classList.remove('show');
      };

      newGo.addEventListener('click', () => {
        const name = nameI ? nameI.value.trim() : '';
        const amt  = parseFloat(bal ? bal.value : '');
        if (name) LS.setItem('atlas_user_name', name);
        if (!isNaN(amt) && amt !== 0) {
          // Use absolute value; sign decides type
          const type = amt >= 0 ? 'income' : 'expense';
          pushTransaction(
            safeT('startingBalance', 'Starting Balance'),
            Math.abs(amt),
            type,
            safeT('startingBalance', 'Starting Balance'),
            safeT('welcomeNote', 'Initial setup')
          );
        }
        closeWelcome();
        try { window.atlasToast && window.atlasToast(safeT('saved','Saved ✓')); } catch (e) {}
      });
      newSkip.addEventListener('click', closeWelcome);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  /* ── 5. Inject NEW settings sections (Profile / Defaults /
         Safety / View). Runs on every openSettings. ───────── */
  function injectAll() {
    const body = document.querySelector('#settingsMenu .settings-body');
    if (!body) return;

    /* Re-translate the existing Custom UI / Theme / Danger buttons
       (they were rendered with English fallbacks). */
    retranslateExistingButtons();

    if (!$('atlasProfileSec'))  body.insertBefore(buildProfileSec(),  body.firstChild);
    if (!$('atlasDefaultsSec')) body.appendChild(buildDefaultsSec());
    if (!$('atlasSafetySec'))   body.appendChild(buildSafetySec());
    injectExperimentalToggle();

    const dangerSec = $('atlasDangerSection');
    if (dangerSec) body.appendChild(dangerSec);

    apply3ColMode();
    applyTodayHighlight();
  }

  function apply3ColMode() {
    const on = LS.getItem('atlas_qol_3col') === '1';
    document.body.classList.toggle('atlas-bigger-3col', on);
  }

  // Find an existing "Experimental" section (any language) and append our row to it.
  function findExperimentalSection() {
    const titles = ['experimental','experimentell','эксперимент','sperimentale','deneysel','آزمایشی','تجريبي','実験'];
    const sections = document.querySelectorAll('#settingsMenu .settings-section');
    for (const sec of sections) {
      const titleEl = sec.querySelector('.settings-section-title');
      if (!titleEl) continue;
      const txt = titleEl.textContent.trim().toLowerCase();
      if (titles.some(t => txt.includes(t))) return sec;
    }
    return null;
  }

  function injectExperimentalToggle() {
    if ($('atlas3ColRow')) return;
    const on3 = LS.getItem('atlas_qol_3col') === '1';
    const row = document.createElement('div');
    row.id = 'atlas3ColRow';
    row.className = 'setting-row';
    row.innerHTML = `
      <div>
        <div class="setting-name">▦ <span>${safeT('evenBiggerSettings','Even Bigger Settings (3 columns)')}</span></div>
        <div class="setting-desc">${safeT('evenBiggerSettingsDesc','Expand the settings menu to three columns. Requires Bigger Settings to be on.')}</div>
      </div>
      <label class="toggle-switch"><input type="checkbox" id="atlas3Col" ${on3?'checked':''}><span class="toggle-slider"></span></label>
    `;

    let host = findExperimentalSection();
    if (!host) {
      host = document.createElement('div');
      host.id = 'atlasExperimentalSec';
      host.className = 'settings-section';
      host.innerHTML = `
        <div class="settings-section-title">
          <span class="stg-ico">⚗</span>
          <span>${safeT('experimentalSection','Experimental')}</span>
        </div>`;
      document.querySelector('#settingsMenu .settings-body')?.appendChild(host);
    }
    host.appendChild(row);

    setTimeout(() => {
      $('atlas3Col')?.addEventListener('change', (e) => {
        LS.setItem('atlas_qol_3col', e.target.checked ? '1' : '0');
        apply3ColMode();
      });
    }, 0);
  }

  function retranslateExistingButtons() {
    // Walk the dynamically-injected Custom UI / Theme / Danger sections
    // and replace any English fallback text with translated equivalents.
    const map = [
      ['Export Default UI',   safeT('exportDefaultUi','Export Default UI')],
      ['Import Custom UI',    safeT('importCustomUi','Import Custom UI')],
      ['Download Sample',     safeT('downloadSample','Download Sample')],
      ['Import Custom Theme', safeT('importCustomTheme','Import Custom Theme')],
      ['Wipe All Data',       safeT('wipeAllData','Wipe All Data')],
      ['Danger Zone',         safeT('dangerZone','Danger Zone')],
      ['Custom UI & Theme',   safeT('customUiTheme','Custom UI & Theme')],
      ['Custom UI',           safeT('customUi','Custom UI')],
      ['Custom Theme',        safeT('customTheme','Custom Theme')],
      ['Loaded',              safeT('loaded','Loaded')],
      ['Clear',               safeT('clear','Clear')]
    ];
    document.querySelectorAll(
      '#atlasExtrasSection button, #atlasExtrasSection label, #atlasExtrasSection .setting-name span, #atlasExtrasSection .settings-section-title span, #atlasExtrasSection .atlas-loaded-tag, #atlasDangerSection button, #atlasDangerSection .settings-section-title span'
    ).forEach((el) => {
      // Walk text nodes only (preserve icons inside)
      el.childNodes.forEach((node) => {
        if (node.nodeType !== 3) return;
        const original = node.nodeValue;
        const trimmed  = original.trim();
        if (!trimmed) return;
        for (const [en, tr] of map) {
          if (trimmed === en || trimmed.endsWith(en)) {
            node.nodeValue = original.replace(en, tr);
            return;
          }
        }
      });
    });
  }

  function buildProfileSec() {
    const sec = document.createElement('div');
    sec.id = 'atlasProfileSec';
    sec.className = 'settings-section';
    const currentName = LS.getItem('atlas_user_name') || '';
    sec.innerHTML = `
      <div class="settings-section-title">
        <span class="stg-ico">☺</span>
        <span>${safeT('profile','Profile')}</span>
      </div>
      <div class="setting-row" style="flex-direction:column;align-items:flex-start;gap:6px">
        <div class="setting-name">◆ <span>${safeT('yourName','Your Name')}</span></div>
        <div class="setting-desc">${safeT('yourNameDesc','Shown in the header greeting.')}</div>
        <div class="atlas-name-row">
          <input id="atlasNameInput" type="text" maxlength="40" value="${escapeHtml(currentName)}" placeholder="—">
          <button class="btn sm-btn primary" id="atlasNameSave">${safeT('save','Save')}</button>
        </div>
      </div>

      <div class="setting-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:12px">
        <div class="setting-name">± <span>${safeT('adjustBalance','Adjust Balance')}</span></div>
        <div class="setting-desc">${safeT('adjustBalanceDesc','Add or subtract from your current balance.')}</div>
        <div class="atlas-name-row">
          <input id="atlasAdjInput" type="number" step="0.01" placeholder="±0.00" class="atlas-inline-num" style="width:100%">
          <button class="btn sm-btn primary" id="atlasAdjBtn">${safeT('adjust','Adjust')}</button>
        </div>
      </div>
    `;
    setTimeout(() => {
      const saveBtn = $('atlasNameSave');
      const input   = $('atlasNameInput');
      saveBtn?.addEventListener('click', () => {
        const v = input.value.trim();
        if (v) LS.setItem('atlas_user_name', v); else LS.removeItem('atlas_user_name');
        try { window.atlasToast && window.atlasToast(safeT('saved','Saved ✓')); } catch (e) {}
        // Trigger greeting refresh — base script reads from LS on render
        document.dispatchEvent(new Event('atlas:greeting:refresh'));
        // Force re-render via toggling sidebar greeting hook if available
        const evt = new Event('storage'); window.dispatchEvent(evt);
        // Manual greeting redraw if the helper is exposed
        const g = document.getElementById('atlasGreeting');
        if (g && v) {
          const h = new Date().getHours();
          const part = h<12?'Good morning':h<18?'Good afternoon':'Good evening';
          g.textContent = `${part}, ${v}`;
        } else if (g && !v) { g.remove(); }
      });

      const adjBtn = $('atlasAdjBtn');
      const adjIn  = $('atlasAdjInput');
      adjBtn?.addEventListener('click', () => {
        const a = parseFloat(adjIn.value);
        if (isNaN(a) || a === 0) return;
        const type = a >= 0 ? 'income' : 'expense';
        pushTransaction(
          safeT('adjustment','Balance adjustment'),
          Math.abs(a), type,
          safeT('adjustment','Balance adjustment'),
          ''
        );
        adjIn.value = '';
        try { window.atlasToast && window.atlasToast(safeT('balanceAdjusted','Balance adjusted')); } catch (e) {}
      });
    }, 0);
    return sec;
  }

  function buildDefaultsSec() {
    const sec = document.createElement('div');
    sec.id = 'atlasDefaultsSec';
    sec.className = 'settings-section';
    const curType = get(K.defaultType, 'expense');
    const smartOn = get(K.smartCat, '0') === '1';
    sec.innerHTML = `
      <div class="settings-section-title">
        <span class="stg-ico">✦</span>
        <span>${safeT('defaultsSection','Smart Defaults')}</span>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-name">↕ <span>${safeT('defaultTxType','Default Transaction Type')}</span></div>
          <div class="setting-desc">${safeT('defaultTxTypeDesc','Pre-select this when opening the New Transaction modal.')}</div>
        </div>
        <select id="atlasDefType" class="atlas-select">
          <option value="expense" ${curType==='expense'?'selected':''}>${safeT('expense','↓ Expense')}</option>
          <option value="income"  ${curType==='income' ?'selected':''}>${safeT('income','↑ Income')}</option>
        </select>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-name">⌖ <span>${safeT('smartCategory','Smart Category Memory')}</span></div>
          <div class="setting-desc">${safeT('smartCategoryDesc','Remember last-used category and pre-select it next time.')}</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="atlasSmartCat" ${smartOn?'checked':''}><span class="toggle-slider"></span></label>
      </div>
    `;
    setTimeout(() => {
      $('atlasDefType')?.addEventListener('change', (e) => set(K.defaultType, e.target.value));
      $('atlasSmartCat')?.addEventListener('change', (e) => set(K.smartCat, e.target.checked ? '1' : '0'));
    }, 0);
    return sec;
  }

  function buildSafetySec() {
    const sec = document.createElement('div');
    sec.id = 'atlasSafetySec';
    sec.className = 'settings-section';
    const onLarge   = get(K.confirmLarge, '0') === '1';
    const threshold = parseFloat(get(K.confirmThresh, '500')) || 500;
    const todayOn   = get(K.todayHighlight, '1') === '1';
    sec.innerHTML = `
      <div class="settings-section-title">
        <span class="stg-ico">✦</span>
        <span>${safeT('safetySection','Safety')}</span>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-name">⚠ <span>${safeT('confirmLarge','Confirm Large Transactions')}</span></div>
          <div class="setting-desc">${safeT('confirmLargeDesc','Show a confirmation popup above the threshold.')}</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="atlasConfLarge" ${onLarge?'checked':''}><span class="toggle-slider"></span></label>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-name">＃ <span>${safeT('threshold','Threshold')}</span></div>
          <div class="setting-desc">≥ ${safeT('threshold','Threshold')}</div>
        </div>
        <input type="number" id="atlasThresh" class="atlas-inline-num" step="1" min="1" value="${threshold}">
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-name">★ <span>${safeT('todayHighlight',"Highlight Today's Transactions")}</span></div>
          <div class="setting-desc">${safeT('todayHighlightDesc','Mark transactions made today with the accent color.')}</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="atlasTodayHi" ${todayOn?'checked':''}><span class="toggle-slider"></span></label>
      </div>
    `;
    setTimeout(() => {
      $('atlasConfLarge')?.addEventListener('change', (e) => set(K.confirmLarge, e.target.checked ? '1' : '0'));
      $('atlasThresh')?.addEventListener('change', (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) set(K.confirmThresh, String(v));
      });
      $('atlasTodayHi')?.addEventListener('change', (e) => {
        set(K.todayHighlight, e.target.checked ? '1' : '0');
        applyTodayHighlight();
      });
    }, 0);
    return sec;
  }

  /* ── 6. Apply today-highlight: tag tx rows after each render ── */
  function applyTodayHighlight() {
    document.body.classList.toggle('atlas-today-highlight', get(K.todayHighlight, '1') === '1');
    if (!Array.isArray(window.transactions)) return;
    const today = new Date().toDateString();
    document.querySelectorAll('.tx-item, .transaction').forEach((row) => {
      const idx = parseInt(row.dataset.index ?? row.getAttribute('data-idx') ?? '-1', 10);
      const t = isNaN(idx) ? null : window.transactions[idx];
      // Fallback: look up by rendered text content (best-effort)
      let isToday = false;
      if (t && t.createdAt) {
        isToday = new Date(t.createdAt).toDateString() === today;
      }
      row.dataset.today = isToday ? '1' : '0';
    });
  }
  // Re-tag after every UI update. `updateUI` lives in script-scope (let),
  // so we can't easily wrap it; instead poll on a short interval after any
  // DOM mutation in the tx list.
  const _txObserver = new MutationObserver(() => {
    try { applyTodayHighlight(); } catch (e) {}
  });
  setTimeout(() => {
    const list = document.getElementById('txList') || document.getElementById('recentTx') || document.body;
    _txObserver.observe(list, { childList: true, subtree: true });
  }, 500);

  /* ── 7. Apply default-type & smart-category on Add modal ── */
  function applyAddModalDefaults() {
    const obs = new MutationObserver(() => {
      const m = $('addModal') || $('txModal');
      if (!m || getComputedStyle(m).display === 'none') return;
      // Don't overwrite when editing an existing tx.
      const editing = $('editIdx') && $('editIdx').value !== '';
      if (editing) return;
      // Default type
      const typeSel = $('txType');
      if (typeSel && !typeSel.dataset.atlasDefaulted) {
        typeSel.value = get(K.defaultType, 'expense');
        typeSel.dataset.atlasDefaulted = '1';
        typeSel.dispatchEvent(new Event('change'));
      }
      // Smart category
      if (get(K.smartCat, '0') === '1') {
        const catSel = $('txCategory');
        const last = LS.getItem(K.lastCat);
        if (catSel && last && !catSel.dataset.atlasCatDef) {
          const opt = Array.from(catSel.options).find((o) => o.value === last);
          if (opt) {
            catSel.value = last;
            catSel.dataset.atlasCatDef = '1';
            catSel.dispatchEvent(new Event('change'));
          }
        }
      }
    });
    obs.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['style','class'] });
    // Reset the "defaulted" flag whenever the modal closes so it re-applies next open.
    document.addEventListener('click', (e) => {
      if (e.target.matches('[onclick*="closeAdd"], .modal-close, #closeAdd')) {
        ['txType','txCategory'].forEach((id) => {
          const el = $(id); if (el) { delete el.dataset.atlasDefaulted; delete el.dataset.atlasCatDef; }
        });
      }
    });
  }

  /* ── 8. Wrap addTransaction: large-tx confirm + remember cat ── */
  function buildBigTxModal() {
    if ($('atlasBigTxModal')) return;
    const m = document.createElement('div');
    m.id = 'atlasBigTxModal';
    m.innerHTML = `
      <div class="btx-card">
        <h3 id="btxTitle">Confirm transaction</h3>
        <div class="btx-amt" id="btxAmt"></div>
        <p id="btxBody">You are about to add a large transaction. Continue?</p>
        <div class="btx-actions">
          <button class="btn" id="btxCancel">Cancel</button>
          <button class="btn primary" id="btxOk">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(m);
  }
  function askConfirmBig(amount, type) {
    return new Promise((resolve) => {
      buildBigTxModal();
      $('btxTitle').textContent = safeT('bigTxTitle','Confirm transaction');
      $('btxBody').textContent  = safeT('bigTxBody','You are about to add a large transaction. Continue?');
      $('btxCancel').textContent = safeT('cancel','Cancel');
      $('btxOk').textContent     = safeT('confirm','Confirm');
      const sym = (window.settings && window.settings.currencySymbol) || '$';
      $('btxAmt').textContent = `${type==='income'?'↑ ':'↓ '}${sym}${amount.toFixed(2)}`;
      const m = $('atlasBigTxModal'); m.classList.add('show');
      const close = (val) => { m.classList.remove('show'); resolve(val); };
      $('btxOk').onclick     = () => close(true);
      $('btxCancel').onclick = () => close(false);
      m.onclick = (e) => { if (e.target === m) close(false); };
    });
  }
  function wrapAddTransaction() {
    const orig = window.addTransaction;
    if (typeof orig !== 'function') return;
    window.addTransaction = async function () {
      const amount   = parseFloat(($('txAmount')||{}).value);
      const type     = ($('txType')||{}).value;
      const category = ($('txCategory')||{}).value;
      // Remember last-used category (smart memory)
      if (get(K.smartCat,'0')==='1' && category) LS.setItem(K.lastCat, category);
      // Big-tx confirmation
      const onLarge = get(K.confirmLarge,'0') === '1';
      const thresh  = parseFloat(get(K.confirmThresh,'500')) || 500;
      const editing = $('editIdx') && $('editIdx').value !== '';
      if (!editing && onLarge && !isNaN(amount) && amount >= thresh) {
        const ok = await askConfirmBig(amount, type);
        if (!ok) return;
      }
      return orig.apply(this, arguments);
    };
  }

  /* ── 9. Helpers & boot ─────────────────────────────────── */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function hookSettingsOpen() {
    const prev = window.openSettings;
    window.openSettings = function () {
      const r = prev ? prev.apply(this, arguments) : (function(){ const m=$('settingsMenu'); if(m) m.style.display='flex'; })();
      // Inject after base + atlas-extras have populated their sections.
      setTimeout(injectAll, 30);
      return r;
    };
  }

  function boot() {
    mergeI18n();
    patchWelcomeIntoTransaction();
    hookSettingsOpen();
    applyAddModalDefaults();
    wrapAddTransaction();
    setTimeout(applyTodayHighlight, 800);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
