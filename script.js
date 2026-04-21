/* ═══════════════════════════════════════════════════
   PROJECT ATLAS — script.js  (v3)
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── i18n Translations ─────────────────────────────── */
const TRANSLATIONS = {
  en: {
    totalBalance:'TOTAL BALANCE', savingGoal:'Saving Goal', setGoal:'Set a goal to track your progress',
    analytics:'Analytics', spending:'Spending', monthly:'Monthly', balance:'Balance',
    recentTx:'Recent Transactions', viewAll:'View All →', noTx:'No transactions yet. Tap + to add one.',
    newTx:'New Transaction', editTx:'Edit Transaction', name:'Name', amount:'Amount',
    category:'Category', note:'Note', type:'Type', income:'↑ Income', expense:'↓ Expense',
    cancel:'Cancel', add:'Add', save:'Save', delete:'Delete',
    allTx:'All Transactions', clearAll:'Clear All', searchTx:'Search transactions…',
    sort:'Sort:', sortName:'Name', sortAmount:'Amount', sortDate:'Date', sortCat:'Category',
    noMatch:'No transactions match your filters.', clearFilters:'Clear Filters',
    settings:'Settings', general:'General', confirmDelete:'Confirm Delete',
    confirmDeleteDesc:'Ask before deleting a transaction', tsFormat:'Timestamp Format',
    tsFormatDesc:'Shown on each transaction', dateTime:'Date & Time', dateOnly:'Date Only',
    maxShown:'Recent Transactions Shown', maxShownDesc:'Visible on main screen (5–20)',
    liquidGlass:'Liquid Glass UI', liquidGlassDesc:'Frosted glass aesthetic',
    language:'Language', languageDesc:'App interface language',
    music:'Music', ambiancePlayer:'Ambiance Player', ambiancePlayerDesc:'Click icon to expand controls',
    addSong:'+ Add Your Own Song', data:'Data', exportData:'⬆ Export Data', importData:'⬇ Import Data',
    dataDesc:'Exports all transactions, balance, settings & preferences as a .json file.',
    deleteTx:'Delete Transaction?', clearAllConfirm:'This will permanently delete all transactions and reset your balance to zero. This cannot be undone.',
    yesDelete:'Yes, Clear All', currencyChange:'Currency Change', keepValues:'Keep Values', convert:'Convert',
    currencyConverter:'Currency Converter', from:'From', to:'To', popularPairs:'Popular Pairs',
    theme:'Theme ▾', txDeleted:'Transaction deleted', undo:'Undo',
  },
  es: {
    totalBalance:'SALDO TOTAL', savingGoal:'Meta de Ahorro', setGoal:'Establece una meta para seguir tu progreso',
    analytics:'Análisis', spending:'Gastos', monthly:'Mensual', balance:'Saldo',
    recentTx:'Transacciones Recientes', viewAll:'Ver Todo →', noTx:'Sin transacciones. Toca + para añadir.',
    newTx:'Nueva Transacción', editTx:'Editar Transacción', name:'Nombre', amount:'Importe',
    category:'Categoría', note:'Nota', type:'Tipo', income:'↑ Ingresos', expense:'↓ Gastos',
    cancel:'Cancelar', add:'Añadir', save:'Guardar', delete:'Eliminar',
    allTx:'Todas las Transacciones', clearAll:'Borrar Todo', searchTx:'Buscar transacciones…',
    sort:'Ordenar:', sortName:'Nombre', sortAmount:'Importe', sortDate:'Fecha', sortCat:'Categoría',
    noMatch:'No hay transacciones que coincidan.', clearFilters:'Limpiar Filtros',
    settings:'Ajustes', general:'General', confirmDelete:'Confirmar Eliminación',
    confirmDeleteDesc:'Preguntar antes de eliminar', tsFormat:'Formato de Fecha',
    tsFormatDesc:'Mostrado en cada transacción', dateTime:'Fecha y Hora', dateOnly:'Solo Fecha',
    maxShown:'Transacciones Recientes Mostradas', maxShownDesc:'Visible en pantalla principal (5–20)',
    liquidGlass:'Vidrio Líquido', liquidGlassDesc:'Estética de vidrio esmerilado',
    language:'Idioma', languageDesc:'Idioma de la interfaz',
    music:'Música', ambiancePlayer:'Reproductor de Ambiente', ambiancePlayerDesc:'Haz clic para expandir',
    addSong:'+ Añadir Canción', data:'Datos', exportData:'⬆ Exportar', importData:'⬇ Importar',
    dataDesc:'Exporta todas las transacciones y ajustes como archivo .json.',
    deleteTx:'¿Eliminar Transacción?', clearAllConfirm:'Esto eliminará permanentemente todas las transacciones. No se puede deshacer.',
    yesDelete:'Sí, Borrar Todo', currencyChange:'Cambio de Moneda', keepValues:'Mantener Valores', convert:'Convertir',
    currencyConverter:'Conversor de Moneda', from:'De', to:'A', popularPairs:'Pares Populares',
    theme:'Tema ▾', txDeleted:'Transacción eliminada', undo:'Deshacer',
  },
  ru: {
    totalBalance:'ОБЩИЙ БАЛАНС', savingGoal:'Цель Накоплений', setGoal:'Установите цель для отслеживания прогресса',
    analytics:'Аналитика', spending:'Расходы', monthly:'По месяцам', balance:'Баланс',
    recentTx:'Последние Операции', viewAll:'Все →', noTx:'Нет операций. Нажмите + для добавления.',
    newTx:'Новая Операция', editTx:'Редактировать', name:'Название', amount:'Сумма',
    category:'Категория', note:'Заметка', type:'Тип', income:'↑ Доход', expense:'↓ Расход',
    cancel:'Отмена', add:'Добавить', save:'Сохранить', delete:'Удалить',
    allTx:'Все Операции', clearAll:'Очистить Всё', searchTx:'Поиск операций…',
    sort:'Сортировка:', sortName:'Название', sortAmount:'Сумма', sortDate:'Дата', sortCat:'Категория',
    noMatch:'Нет подходящих операций.', clearFilters:'Сбросить Фильтры',
    settings:'Настройки', general:'Общие', confirmDelete:'Подтверждение Удаления',
    confirmDeleteDesc:'Спрашивать перед удалением', tsFormat:'Формат Даты',
    tsFormatDesc:'Отображается в каждой операции', dateTime:'Дата и Время', dateOnly:'Только Дата',
    maxShown:'Количество Последних Операций', maxShownDesc:'Видимые на главном экране (5–20)',
    liquidGlass:'Жидкое Стекло', liquidGlassDesc:'Эстетика матового стекла',
    language:'Язык', languageDesc:'Язык интерфейса',
    music:'Музыка', ambiancePlayer:'Фоновый Плеер', ambiancePlayerDesc:'Нажмите иконку для управления',
    addSong:'+ Добавить Песню', data:'Данные', exportData:'⬆ Экспорт', importData:'⬇ Импорт',
    dataDesc:'Экспортирует все операции и настройки в файл .json.',
    deleteTx:'Удалить Операцию?', clearAllConfirm:'Это навсегда удалит все операции. Отменить нельзя.',
    yesDelete:'Да, Очистить', currencyChange:'Смена Валюты', keepValues:'Оставить Значения', convert:'Конвертировать',
    currencyConverter:'Конвертер Валют', from:'Из', to:'В', popularPairs:'Популярные Пары',
    theme:'Тема ▾', txDeleted:'Операция удалена', undo:'Отменить',
  },
  tr: {
    totalBalance:'TOPLAM BAKİYE', savingGoal:'Tasarruf Hedefi', setGoal:'İlerlemeyi takip etmek için hedef belirleyin',
    analytics:'Analitik', spending:'Harcamalar', monthly:'Aylık', balance:'Bakiye',
    recentTx:'Son İşlemler', viewAll:'Tümünü Gör →', noTx:'Henüz işlem yok. Eklemek için + düğmesine tıklayın.',
    newTx:'Yeni İşlem', editTx:'İşlemi Düzenle', name:'Ad', amount:'Tutar',
    category:'Kategori', note:'Not', type:'Tür', income:'↑ Gelir', expense:'↓ Gider',
    cancel:'İptal', add:'Ekle', save:'Kaydet', delete:'Sil',
    allTx:'Tüm İşlemler', clearAll:'Tümünü Temizle', searchTx:'İşlem ara…',
    sort:'Sırala:', sortName:'Ad', sortAmount:'Tutar', sortDate:'Tarih', sortCat:'Kategori',
    noMatch:'Filtreyle eşleşen işlem yok.', clearFilters:'Filtreleri Temizle',
    settings:'Ayarlar', general:'Genel', confirmDelete:'Silmeyi Onayla',
    confirmDeleteDesc:'Silmeden önce sor', tsFormat:'Zaman Damgası Biçimi',
    tsFormatDesc:'Her işlemde gösterilir', dateTime:'Tarih ve Saat', dateOnly:'Yalnızca Tarih',
    maxShown:'Gösterilen Son İşlem Sayısı', maxShownDesc:'Ana ekranda görünür (5–20)',
    liquidGlass:'Sıvı Cam UI', liquidGlassDesc:'Buzlu cam estetiği',
    language:'Dil', languageDesc:'Uygulama arayüz dili',
    music:'Müzik', ambiancePlayer:'Ortam Oynatıcı', ambiancePlayerDesc:'Genişletmek için simgeye tıklayın',
    addSong:'+ Şarkı Ekle', data:'Veriler', exportData:'⬆ Dışa Aktar', importData:'⬇ İçe Aktar',
    dataDesc:'Tüm işlemleri ve ayarları .json dosyası olarak dışa aktarır.',
    deleteTx:'İşlem Silinsin mi?', clearAllConfirm:'Bu işlem tüm verileri kalıcı olarak siler. Geri alınamaz.',
    yesDelete:'Evet, Temizle', currencyChange:'Para Birimi Değişimi', keepValues:'Değerleri Koru', convert:'Dönüştür',
    currencyConverter:'Döviz Çevirici', from:'Kaynak', to:'Hedef', popularPairs:'Popüler Çiftler',
    theme:'Tema ▾', txDeleted:'İşlem silindi', undo:'Geri Al',
  },
  de: {
    totalBalance:'GESAMTGUTHABEN', savingGoal:'Sparziel', setGoal:'Legen Sie ein Ziel fest, um Ihren Fortschritt zu verfolgen',
    analytics:'Analyse', spending:'Ausgaben', monthly:'Monatlich', balance:'Guthaben',
    recentTx:'Letzte Transaktionen', viewAll:'Alle anzeigen →', noTx:'Noch keine Transaktionen. Tippe + um eine hinzuzufügen.',
    newTx:'Neue Transaktion', editTx:'Transaktion bearbeiten', name:'Name', amount:'Betrag',
    category:'Kategorie', note:'Notiz', type:'Typ', income:'↑ Einnahmen', expense:'↓ Ausgaben',
    cancel:'Abbrechen', add:'Hinzufügen', save:'Speichern', delete:'Löschen',
    allTx:'Alle Transaktionen', clearAll:'Alles löschen', searchTx:'Transaktionen suchen…',
    sort:'Sortieren:', sortName:'Name', sortAmount:'Betrag', sortDate:'Datum', sortCat:'Kategorie',
    noMatch:'Keine passenden Transaktionen.', clearFilters:'Filter zurücksetzen',
    settings:'Einstellungen', general:'Allgemein', confirmDelete:'Löschen bestätigen',
    confirmDeleteDesc:'Vor dem Löschen fragen', tsFormat:'Zeitstempelformat',
    tsFormatDesc:'Wird bei jeder Transaktion angezeigt', dateTime:'Datum & Uhrzeit', dateOnly:'Nur Datum',
    maxShown:'Angezeigte letzte Transaktionen', maxShownDesc:'Auf dem Hauptbildschirm (5–20)',
    liquidGlass:'Liquid Glass UI', liquidGlassDesc:'Milchglas-Ästhetik',
    language:'Sprache', languageDesc:'App-Oberflächensprache',
    music:'Musik', ambiancePlayer:'Ambiente-Player', ambiancePlayerDesc:'Symbol anklicken zum Erweitern',
    addSong:'+ Song hinzufügen', data:'Daten', exportData:'⬆ Exportieren', importData:'⬇ Importieren',
    dataDesc:'Exportiert alle Transaktionen und Einstellungen als .json-Datei.',
    deleteTx:'Transaktion löschen?', clearAllConfirm:'Hiermit werden alle Transaktionen dauerhaft gelöscht. Dies kann nicht rückgängig gemacht werden.',
    yesDelete:'Ja, alles löschen', currencyChange:'Währungsänderung', keepValues:'Werte behalten', convert:'Konvertieren',
    currencyConverter:'Währungsrechner', from:'Von', to:'Nach', popularPairs:'Beliebte Paare',
    theme:'Thema ▾', txDeleted:'Transaktion gelöscht', undo:'Rückgängig',
  },
  fa: {
    totalBalance:'موجودی کل',
    savingGoal:'هدف پس‌انداز',
    setGoal:'برای پیگیری پیشرفت خود یک هدف تعیین کنید',
    analytics:'تحلیل‌ها',
    spending:'هزینه‌ها',
    monthly:'ماهانه',
    balance:'موجودی',
    recentTx:'تراکنش‌های اخیر',
    viewAll:'مشاهده همه →',
    noTx:'هنوز تراکنشی وجود ندارد. برای افزودن، روی + بزنید.',
    newTx:'تراکنش جدید',
    editTx:'ویرایش تراکنش',
    name:'نام',
    amount:'مبلغ',
    category:'دسته‌بندی',
    note:'یادداشت',
    type:'نوع',
    income:'↑ درآمد',
    expense:'↓ هزینه',
    cancel:'لغو',
    add:'افزودن',
    save:'ذخیره',
    delete:'حذف',
    allTx:'همه تراکنش‌ها',
    clearAll:'حذف همه',
    searchTx:'جستجوی تراکنش‌ها…',
    sort:'مرتب‌سازی:',
    sortName:'نام',
    sortAmount:'مبلغ',
    sortDate:'تاریخ',
    sortCat:'دسته‌بندی',
    noMatch:'هیچ تراکنشی با فیلترهای شما مطابقت ندارد.',
    clearFilters:'پاک کردن فیلترها',
    settings:'تنظیمات',
    general:'عمومی',
    confirmDelete:'تأیید حذف',
    confirmDeleteDesc:'قبل از حذف تراکنش سؤال شود',
    tsFormat:'فرمت زمان',
    tsFormatDesc:'نمایش در هر تراکنش',
    dateTime:'تاریخ و زمان',
    dateOnly:'فقط تاریخ',
    maxShown:'تعداد تراکنش‌های اخیر',
    maxShownDesc:'نمایش در صفحه اصلی (۵ تا ۲۰)',
    liquidGlass:'رابط کاربری شیشه‌ای',
    liquidGlassDesc:'ظاهر شیشه‌ای مات',
    language:'زبان',
    languageDesc:'زبان رابط کاربری برنامه',
    music:'موسیقی',
    ambiancePlayer:'پخش‌کننده محیطی',
    ambiancePlayerDesc:'برای نمایش کنترل‌ها روی آیکون کلیک کنید',
    addSong:'+ افزودن آهنگ خود',
    data:'داده‌ها',
    exportData:'⬆ خروجی گرفتن از داده‌ها',
    importData:'⬇ وارد کردن داده‌ها',
    dataDesc:'تمام تراکنش‌ها، موجودی، تنظیمات و ترجیحات را به‌صورت فایل .json صادر می‌کند.',
    deleteTx:'حذف تراکنش؟',
    clearAllConfirm:'این کار تمام تراکنش‌ها را برای همیشه حذف کرده و موجودی شما را به صفر بازنشانی می‌کند. این عمل قابل بازگشت نیست.',
    yesDelete:'بله، همه حذف شوند',
    currencyChange:'تغییر واحد پول',
    keepValues:'حفظ مقادیر',
    convert:'تبدیل',
    currencyConverter:'مبدل ارز',
    from:'از',
    to:'به',
    popularPairs:'جفت‌های محبوب',
    theme:'تم ▾',
    txDeleted:'تراکنش حذف شد',
    undo:'بازگردانی',
  }
};

let currentLang = 'en';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });
  // Update page title
  document.title = `Project Atlas`;
}

function changeLanguage(lang) {
  currentLang = lang;
  settings.language = lang;
  applyTranslations();
  renderTransactions();
  saveData();
}

/* ── State ─────────────────────────────────────────────── */
let transactions  = [];
let balance       = 0;
let currency      = '$';
let currencyCode  = 'USD';
let currencyLabel = 'USD $';
let accentColor   = '#4ade80';
let settings = {
  confirmDelete : true,
  tsFormat      : 'datetime',
  maxShown      : 5,
  liquidGlass   : false,
  darkMode      : true,
  musicEnabled  : false,
  loopMode      : 'loop-all',
  volume        : 0.7,
  currentSong   : 0,
  language      : 'en',
};
let songs = [
  { title:'Cosmic Drift',    artist:'Project Atlas', src:'music/cosmic_drift.mp3',   custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Nebula Wind',     artist:'Project Atlas', src:'music/nebula_wind.mp3',     custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Deep Space',      artist:'Project Atlas', src:'music/deep_space.mp3',      custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Aurora Borealis', artist:'Project Atlas', src:'music/aurora_borealis.mp3', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Event Horizon',   artist:'Project Atlas', src:'music/event_horizon.mp3',   custom:false, enabled:true, trimStart:0, trimEnd:null },
];

/* Sort/filter state */
let sortField = 'date';
let sortDir   = 'desc';
let filterTypes = [];
let filterCats  = [];

/* Temp state */
let pendingDeleteIdx  = null;
let pendingCurrency   = null;
let pendingCurrLabel  = null;
let pendingCurrCode   = null;
let pendingRate       = null;
let musicPlaying      = false;
let songPreviewDuration = 0;
let songFileObjectUrl   = null;
let undoTimer         = null;
let undoTransaction   = null;
let undoBalance       = null;
let editIdx           = null;

/* Analytics state */
let activeAnalyticsTab = 'donut';
let analyticsAnimated  = false;

/* ── Element refs ─────────────────────────────────────── */
const $ = id => document.getElementById(id);

/* ── Persist ───────────────────────────────────────────── */
function loadData() {
  try {
    const d = JSON.parse(localStorage.getItem('atlas_v2') || '{}');
    if (d.transactions)  transactions  = d.transactions;
    if (d.balance !== undefined) balance = d.balance;
    if (d.currency)      currency       = d.currency;
    if (d.currencyCode)  currencyCode   = d.currencyCode;
    if (d.currencyLabel) currencyLabel  = d.currencyLabel;
    if (d.accentColor)   accentColor    = d.accentColor;
    if (d.settings)      settings       = Object.assign(settings, d.settings);
    if (d.songs)         songs          = d.songs.map((s,i) => Object.assign({}, songs[i] || {}, s));
    if (d.goal)          { const g = $('goal'); if(g) g.value = d.goal; }
    currentLang = settings.language || 'en';
  } catch(e) { console.warn('loadData:', e); }
}

function saveData() {
  try {
    localStorage.setItem('atlas_v2', JSON.stringify({
      transactions, balance, currency, currencyCode, currencyLabel,
      accentColor, settings,
      songs: songs.map(s => ({ title:s.title, artist:s.artist, src: s.custom ? s.src : '', custom:s.custom, enabled:s.enabled, trimStart:s.trimStart||0, trimEnd:s.trimEnd||null })),
      goal: $('goal') ? $('goal').value : '',
    }));
  } catch(e) { console.warn('saveData:', e); }
}

function saveSetting(key, val) {
  settings[key] = val;
  saveData();
}

/* ── Apply saved settings to UI ───────────────────────── */
function applySettings() {
  document.documentElement.style.setProperty('--accent', accentColor);
  document.documentElement.style.setProperty('--income', accentColor);
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '🌙' : '☀️';
  document.body.classList.toggle('liquid-glass', settings.liquidGlass);
  $('stgConfirmDelete').checked  = settings.confirmDelete;
  $('stgTsFormat').value         = settings.tsFormat;
  $('stgMaxShown').value         = settings.maxShown;
  $('maxShownVal').textContent   = settings.maxShown;
  $('stgLiquidGlass').checked    = settings.liquidGlass;
  $('stgMusicOn').checked        = settings.musicEnabled;
  $('volSlider').value           = settings.volume;
  $('stgLanguage').value         = currentLang;
  const player = $('audioPlayer');
  if (player) player.volume      = settings.volume;
  setLoopModeUI(settings.loopMode);
  $('currencyLabel').textContent = currencyLabel;
  applyTranslations();
}

/* ── Rolling Number Animation ─────────────────────────── */
function animateNumber(el, from, to, duration = 600) {
  if (!el) return;
  const start = performance.now();
  const isNeg = to < 0;
  const absTo = Math.abs(to);
  const absFrom = Math.abs(from);

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = absFrom + (absTo - absFrom) * ease;
    el.textContent = current.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = absTo.toFixed(2);
  }
  requestAnimationFrame(step);
}

let prevBalance = 0;
let prevIncome  = 0;
let prevExpense = 0;

/* ── Loader + Starfield ───────────────────────────────── */
function initLoader() {
  const canvas = $('starfield'), ctx = canvas.getContext('2d');
  let stars = [], animId;

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  function mkStars() {
    stars = Array.from({length:300}, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2, a: Math.random() * 0.9 + 0.1,
      ts: Math.random() * 0.02 + 0.004, td: Math.random()>.5 ? 1:-1,
      dx: (Math.random()-.5)*.06, dy: -Math.random()*.12-.02,
    }));
  }
  function frame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const s of stars) {
      s.a += s.ts * s.td;
      if(s.a>=1||s.a<=.05) s.td*=-1;
      s.x+=s.dx; s.y+=s.dy;
      if(s.y<-2) s.y=canvas.height+2;
      if(s.x<-2) s.x=canvas.width+2;
      if(s.x>canvas.width) s.x=-2;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${s.a.toFixed(2)})`; ctx.fill();
    }
    animId = requestAnimationFrame(frame);
  }
  resize(); mkStars();
  addEventListener('resize', ()=>{ resize(); mkStars(); });
  frame();

  let pct = 0;
  const interval = setInterval(() => {
    pct += pct < 70 ? Math.random()*5+2 : Math.random()*1.2+0.3;
    if (pct > 100) pct = 100;
    $('loaderFill').style.width = pct+'%';
    $('loaderPct').textContent  = Math.floor(pct)+'%';
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        cancelAnimationFrame(animId);
        $('loader').classList.add('fade-out');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          $('app').classList.add('visible');
        }));
        updateUI();
      }, 400);
    }
  }, 40);
}

/* ── Cosmic Background Canvas ─────────────────────────── */
function initCosmicBg() {
  const canvas = $('cosmicBg'), ctx = canvas.getContext('2d');
  let stars = [], shooters = [];
  let mouseX = 0, mouseY = 0;

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; mkStars(); }
  function mkStars() {
    stars = Array.from({length:180}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.2+0.15, a: Math.random()*0.6+0.05,
      ts: Math.random()*0.012+0.002, td: Math.random()>.5?1:-1,
      dx: (Math.random()-.5)*.04, dy: -Math.random()*.07-.01,
      px: 0, py: 0,
    }));
    // Give each star a parallax depth
    stars.forEach(s => { s.depth = Math.random() * 0.03 + 0.005; });
  }
  function spawnShooter() {
    const x = Math.random()*canvas.width;
    const y = Math.random()*(canvas.height/2);
    const angle = (Math.random()*30+5) * Math.PI/180;
    shooters.push({ x, y, len: Math.random()*120+60, speed: Math.random()*8+5, angle, progress:0 });
    setTimeout(spawnShooter, Math.random()*4000+2000);
  }

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function frame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2, cy = canvas.height/2;
    const mx = (mouseX - cx) / cx;
    const my = (mouseY - cy) / cy;

    for(const s of stars) {
      s.a+=s.ts*s.td; if(s.a>=.65||s.a<=.03) s.td*=-1;
      s.x+=s.dx; s.y+=s.dy;
      if(s.y<-2) s.y=canvas.height+2;
      if(s.x<-2) s.x=canvas.width+2;
      if(s.x>canvas.width) s.x=-2;
      // Parallax offset
      const ox = mx * s.depth * canvas.width * 0.5;
      const oy = my * s.depth * canvas.height * 0.5;
      ctx.beginPath(); ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${s.a.toFixed(2)})`; ctx.fill();
    }
    shooters.forEach((sh, i) => {
      sh.progress += sh.speed / sh.len;
      const tail = sh.speed*3;
      const x1 = sh.x + Math.cos(sh.angle)*sh.progress*sh.len;
      const y1 = sh.y + Math.sin(sh.angle)*sh.progress*sh.len;
      const x0 = sh.x + Math.cos(sh.angle)*(sh.progress*sh.len - tail);
      const y0 = sh.y + Math.sin(sh.angle)*(sh.progress*sh.len - tail);
      const grad = ctx.createLinearGradient(x0,y0,x1,y1);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, 'rgba(255,255,255,0.8)');
      ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1);
      ctx.strokeStyle=grad; ctx.lineWidth=1.2; ctx.stroke();
      if(sh.progress>=1) shooters.splice(i,1);
    });
    requestAnimationFrame(frame);
  }
  resize(); addEventListener('resize', resize);
  spawnShooter();
  frame();
}

/* ── Nebula Parallax ──────────────────────────────────── */
function initNebulaParallax() {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const mx = (e.clientX - cx) / cx;
    const my = (e.clientY - cy) / cy;
    const nebulae = document.querySelectorAll('.nebula');
    nebulae.forEach((n, i) => {
      const strength = (i + 1) * 8;
      n.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    });
  });
}

/* ── Confetti ─────────────────────────────────────────── */
function fireConfetti() {
  const canvas = $('confettiCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = [accentColor, '#38bdf8', '#f97316', '#e11d48', '#a78bfa', '#fb7185', '#fff'];
  for (let i = 0; i < 140; i++) {
    particles.push({
      x: Math.random() * canvas.width, y: -10,
      w: Math.random() * 10 + 5, h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 4 + 2, vx: (Math.random() - 0.5) * 4,
      rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 8,
      alpha: 1,
    });
  }
  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rotV;
      if (frame > 80) p.alpha -= 0.012;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 160) requestAnimationFrame(tick);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display='none'; }
  }
  requestAnimationFrame(tick);
}

/* ── Main UI Update ───────────────────────────────────── */
function updateUI() {
  const neg = balance < 0;
  $('balanceSign').textContent = neg ? '-' : '';
  $('currencyDisp').textContent = currency;

  // Rolling animation
  const balEl = $('balance');
  const incEl = $('totalIncome');
  const expEl = $('totalExpense');
  const totalIn  = transactions.filter(t=>t.type==='income') .reduce((s,t)=>s+t.amount,0);
  const totalOut = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  animateNumber(balEl, prevBalance, Math.abs(balance));
  animateNumber(incEl, prevIncome, totalIn);
  animateNumber(expEl, prevExpense, totalOut);
  prevBalance = Math.abs(balance);
  prevIncome  = totalIn;
  prevExpense = totalOut;

  $('balance').parentElement.style.color = neg ? 'var(--expense)' : '';

  // Flash balance card
  const card = $('balanceCard');
  if (card) {
    card.classList.remove('flash-green','flash-red');
    void card.offsetWidth;
    card.classList.add(neg ? 'flash-red' : 'flash-green');
    setTimeout(() => card.classList.remove('flash-green','flash-red'), 700);
  }

  $('currencyLabel').textContent = currencyLabel;
  $('goalCurrency').textContent  = currency;
  updateDatetime();
  renderTransactions();
  updateProgress();
  updateAnalytics();
  saveData();
  document.title = `Project Atlas — ${currency}${Math.abs(balance).toFixed(2)}`;
}

function updateDatetime() {
  const now = new Date();
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  let str = now.toLocaleDateString('en-US', opts);
  str += ' · ' + now.toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'});
  $('mainDatetime').textContent = str;
}
setInterval(updateDatetime, 30000);

/* ── Render Transactions (preview) ───────────────────── */
function renderTransactions() {
  const container = $('content');
  const empty     = $('emptyState');
  container.innerHTML = '';
  const max = settings.maxShown || 5;
  const list = [...transactions].reverse().slice(0, max);
  if (!list.length) { empty.style.display='flex'; return; }
  empty.style.display='none';
  list.forEach((t,i) => {
    const realIdx = transactions.length - 1 - i;
    const item = buildTxItem(t, realIdx, false);
    item.style.animationDelay = `${i * 60}ms`;
    container.appendChild(item);
  });
}

function buildTxItem(t, realIdx, inFull) {
  const ICONS = {General:'📋',Food:'🍔',Transport:'🚌',Bills:'💡',Shopping:'🛍',Salary:'💼',Other:'📦'};
  const sign = t.type==='income' ? '+' : '-';
  const icon = ICONS[t.category]||'📋';

  let tsText = '';
  if (t.createdAt) {
    const d = new Date(t.createdAt);
    tsText = settings.tsFormat === 'date'
      ? d.toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})
      : d.toLocaleDateString('en-US', {month:'short',day:'numeric'}) + ' ' + d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }

  const div = document.createElement('div');
  div.className = 'transaction-item';
  div.innerHTML = `
    <div class="t-icon ${t.type}">${icon}</div>
    <div class="t-info">
      <div class="t-name">${escHtml(t.name)}</div>
      <div class="t-meta">
        <span>${t.category||'General'}</span>
        ${tsText ? `<span>${tsText}</span>` : ''}
      </div>
      ${t.note ? `<div class="t-note">${escHtml(t.note)}</div>` : ''}
    </div>
    <div class="t-amount ${t.type}">${sign}${currency}${t.amount.toFixed(2)}</div>
    <div class="t-actions">
      <button class="t-edit" onclick="openEdit(${realIdx})" title="Edit">✏</button>
      <button class="t-delete" onclick="requestDelete(${realIdx})" title="Delete">✕</button>
    </div>
  `;
  return div;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Progress circle ──────────────────────────────────── */
let progressTarget = 0;
let progressCurrent = 0;
let progressRaf = null;

function updateProgress() {
  const goalVal  = parseFloat($('goal').value)||0;
  const pSpan    = $('progress').querySelector('span');
  const pLabel   = $('progressLabel');
  if (!goalVal) {
    progressTarget = 0;
    animateProgress(0);
    pSpan.textContent='0%'; pLabel.textContent= t('setGoal'); return;
  }
  const pct = Math.min(Math.max((balance/goalVal)*100,0),100);
  const prevTarget = progressTarget;
  progressTarget = pct;

  if (progressRaf) cancelAnimationFrame(progressRaf);
  const startTime = performance.now();
  const startPct  = prevTarget;

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / 800, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = startPct + (pct - startPct) * ease;
    $('progress').style.background = `conic-gradient(var(--accent) ${current*3.6}deg,rgba(255,255,255,0.06) ${current*3.6}deg)`;
    pSpan.textContent = `${Math.round(current)}%`;
    if (progress < 1) progressRaf = requestAnimationFrame(step);
    else {
      progressRaf = null;
      if (pct >= 100 && prevTarget < 100) fireConfetti();
    }
  }
  progressRaf = requestAnimationFrame(step);
  pLabel.textContent=`${currency}${balance.toFixed(2)} of ${currency}${goalVal.toFixed(2)}`;
  saveData();
}

function animateProgress(targetPct) {
  $('progress').style.background = `conic-gradient(var(--accent) 0deg,rgba(255,255,255,0.06) 0deg)`;
}

/* ── Analytics Charts ─────────────────────────────────── */
function switchAnalyticsTab(tab) {
  activeAnalyticsTab = tab;
  document.querySelectorAll('.atab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.analytics-panel').forEach(p => p.classList.remove('active'));
  $(`tab-${tab}`)?.classList.add('active');
  $(`panel-${tab}`)?.classList.add('active');
  updateAnalytics();
}

function updateAnalytics() {
  if (activeAnalyticsTab === 'donut') drawDonut();
  else if (activeAnalyticsTab === 'bar') drawBar();
  else if (activeAnalyticsTab === 'line') drawLine();
}

function getThemeColor(opacity = 1) {
  const isDark = settings.darkMode;
  return isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`;
}

function drawDonut() {
  const canvas = $('donutChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const CATS = ['General','Food','Transport','Bills','Shopping','Salary','Other'];
  const CAT_COLORS = ['#4ade80','#38bdf8','#f97316','#f59e0b','#a78bfa','#34d399','#fb7185'];

  const expenses = transactions.filter(t => t.type === 'expense');
  const byCategory = {};
  CATS.forEach(c => byCategory[c] = 0);
  expenses.forEach(t => { byCategory[t.category] = (byCategory[t.category]||0) + t.amount; });

  const total = Object.values(byCategory).reduce((a,b)=>a+b,0);
  const entries = CATS.map((c,i) => ({ label:c, value:byCategory[c], color:CAT_COLORS[i] }))
                      .filter(e => e.value > 0);

  const legend = $('donutLegend');
  const insight = $('donutInsight');

  if (!entries.length) {
    ctx.fillStyle = getThemeColor(0.18);
    ctx.beginPath(); ctx.arc(W/2, H/2, 90, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = getThemeColor(0.4);
    ctx.font = '14px Outfit'; ctx.textAlign = 'center';
    ctx.fillText('No expense data yet', W/2, H/2 + 5);
    if (legend) legend.innerHTML = '';
    if (insight) insight.innerHTML = '';
    return;
  }

  const cx = W/2, cy = H/2, r = 90, inner = 55;
  let angle = -Math.PI/2;

  entries.forEach(e => {
    const slice = (e.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = e.color;
    ctx.fill();
    ctx.strokeStyle = settings.darkMode ? '#070d1a' : '#f0f4ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    angle += slice;
  });

  // Inner circle
  ctx.beginPath(); ctx.arc(cx, cy, inner, 0, Math.PI*2);
  ctx.fillStyle = settings.darkMode ? '#0d1628' : '#e2e8f8';
  ctx.fill();

  // Center text
  ctx.fillStyle = getThemeColor(0.9);
  ctx.font = 'bold 15px Orbitron, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(currency + total.toFixed(0), cx, cy - 4);
  ctx.font = '10px Outfit';
  ctx.fillStyle = getThemeColor(0.45);
  ctx.fillText('total expenses', cx, cy + 14);

  // Legend
  if (legend) {
    legend.innerHTML = entries.map(e =>
      `<div class="legend-item">
        <span class="legend-dot" style="background:${e.color}"></span>
        <span class="legend-label">${e.label}</span>
        <span class="legend-val">${currency}${e.value.toFixed(2)}</span>
        <span class="legend-pct">${((e.value/total)*100).toFixed(1)}%</span>
      </div>`
    ).join('');
  }

  // Insight
  if (insight && entries.length) {
    const biggest = entries.reduce((a,b) => a.value > b.value ? a : b);
    insight.innerHTML = `🏆 Biggest spend: <strong>${biggest.label}</strong> — ${currency}${biggest.value.toFixed(2)} (${((biggest.value/total)*100).toFixed(1)}%)`;
  }
}

function drawBar() {
  const canvas = $('barChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // Last 6 months
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label: d.toLocaleDateString('en-US',{month:'short'}), year: d.getFullYear(), month: d.getMonth(), income:0, expense:0 });
  }
  transactions.forEach(t => {
    if (!t.createdAt) return;
    const d = new Date(t.createdAt);
    const m = months.find(mo => mo.year === d.getFullYear() && mo.month === d.getMonth());
    if (!m) return;
    if (t.type === 'income') m.income += t.amount;
    else m.expense += t.amount;
  });

  const maxVal = Math.max(...months.map(m => Math.max(m.income, m.expense)), 1);
  const padL = 48, padR = 16, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupW = chartW / months.length;
  const barW   = Math.min(groupW * 0.32, 24);

  // Grid lines
  ctx.strokeStyle = getThemeColor(0.07);
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (chartH * i / 4);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillStyle = getThemeColor(0.35);
    ctx.font = '9px Outfit'; ctx.textAlign = 'right';
    ctx.fillText(currency + ((maxVal * i / 4)).toFixed(0), padL - 4, y + 3);
  }

  let bestMonthIncome = months[0], worstMonthExpense = months[0];
  months.forEach(m => {
    if (m.income > bestMonthIncome.income) bestMonthIncome = m;
    if (m.expense > worstMonthExpense.expense) worstMonthExpense = m;
  });

  months.forEach((m, i) => {
    const x = padL + i * groupW + groupW / 2;
    const incH = (m.income / maxVal) * chartH;
    const expH = (m.expense / maxVal) * chartH;

    // Income bar
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = m === bestMonthIncome ? 1 : 0.75;
    const incY = padT + chartH - incH;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x - barW - 2, incY, barW, incH, [3,3,0,0]) :
      ctx.rect(x - barW - 2, incY, barW, incH);
    ctx.fill();

    // Expense bar
    ctx.fillStyle = '#f87171';
    ctx.globalAlpha = m === worstMonthExpense ? 1 : 0.75;
    const expY = padT + chartH - expH;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x + 2, expY, barW, expH, [3,3,0,0]) :
      ctx.rect(x + 2, expY, barW, expH);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Month label
    ctx.fillStyle = getThemeColor(0.5);
    ctx.font = '10px Outfit'; ctx.textAlign = 'center';
    ctx.fillText(m.label, x, H - padB + 14);
  });

  // Legend
  ctx.fillStyle = accentColor; ctx.globalAlpha = 0.85;
  ctx.fillRect(padL, padT - 14, 10, 8);
  ctx.globalAlpha = 1;
  ctx.fillStyle = getThemeColor(0.5); ctx.font = '10px Outfit'; ctx.textAlign = 'left';
  ctx.fillText('Income', padL + 14, padT - 7);
  ctx.fillStyle = '#f87171'; ctx.globalAlpha = 0.85;
  ctx.fillRect(padL + 65, padT - 14, 10, 8);
  ctx.globalAlpha = 1;
  ctx.fillStyle = getThemeColor(0.5);
  ctx.fillText('Expense', padL + 79, padT - 7);

  // Insight
  const insight = $('barInsight');
  if (insight) {
    const bestLabel = bestMonthIncome.income > 0 ? `🏆 Best income: <strong>${bestMonthIncome.label}</strong> (${currency}${bestMonthIncome.income.toFixed(0)})` : '';
    const worstLabel = worstMonthExpense.expense > 0 ? `📉 Highest spend: <strong>${worstMonthExpense.label}</strong> (${currency}${worstMonthExpense.expense.toFixed(0)})` : '';
    insight.innerHTML = [bestLabel, worstLabel].filter(Boolean).join(' &nbsp;·&nbsp; ') || 'Add transactions to see monthly trends.';
  }
}

function drawLine() {
  const canvas = $('lineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  if (!transactions.length) {
    ctx.fillStyle = getThemeColor(0.35);
    ctx.font = '13px Outfit'; ctx.textAlign = 'center';
    ctx.fillText('Add transactions to see balance history', W/2, H/2);
    $('lineInsight').innerHTML = '';
    return;
  }

  // Build running balance over all tx sorted by date
  const sorted = [...transactions].sort((a,b) => new Date(a.createdAt||0) - new Date(b.createdAt||0));
  let running = 0;
  const points = sorted.map(t => {
    running += t.type === 'income' ? t.amount : -t.amount;
    return { date: new Date(t.createdAt||0), val: running };
  });

  // Add origin if no points before first tx
  if (points.length) points.unshift({ date: new Date(points[0].date.getTime() - 86400000), val: 0 });

  const minVal = Math.min(...points.map(p=>p.val), 0);
  const maxVal = Math.max(...points.map(p=>p.val), 1);
  const range  = maxVal - minVal || 1;
  const padL = 52, padR = 16, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const xForIdx = i => padL + (i / (points.length - 1)) * chartW;
  const yForVal = v => padT + chartH - ((v - minVal) / range) * chartH;

  // Grid
  ctx.strokeStyle = getThemeColor(0.07); ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (chartH * i / 4);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    const val = minVal + range * i / 4;
    ctx.fillStyle = getThemeColor(0.35); ctx.font = '9px Outfit'; ctx.textAlign = 'right';
    ctx.fillText(currency + val.toFixed(0), padL - 4, y + 3);
  }

  // Zero line
  if (minVal < 0) {
    const y0 = yForVal(0);
    ctx.strokeStyle = getThemeColor(0.2); ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(padL, y0); ctx.lineTo(W - padR, y0); ctx.stroke();
    ctx.setLineDash([]);
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
  grad.addColorStop(0, accentColor + '44');
  grad.addColorStop(1, accentColor + '00');
  ctx.beginPath();
  ctx.moveTo(xForIdx(0), padT + chartH);
  points.forEach((p,i) => ctx.lineTo(xForIdx(i), yForVal(p.val)));
  ctx.lineTo(xForIdx(points.length - 1), padT + chartH);
  ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.strokeStyle = accentColor; ctx.lineWidth = 2; ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p,i) => i === 0 ? ctx.moveTo(xForIdx(0), yForVal(p.val)) : ctx.lineTo(xForIdx(i), yForVal(p.val)));
  ctx.stroke();

  // Date labels (first and last)
  ctx.fillStyle = getThemeColor(0.4); ctx.font = '9px Outfit'; ctx.textAlign = 'center';
  if (points.length >= 2) {
    ctx.fillText(points[0].date.toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(0), H - padB + 14);
    ctx.fillText(points[points.length-1].date.toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(points.length-1), H - padB + 14);
  }

  // Insight
  const insight = $('lineInsight');
  if (insight) {
    const avg = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0) / (transactions.filter(t=>t.type==='expense').length || 1);
    insight.innerHTML = `💳 Avg expense: <strong>${currency}${avg.toFixed(2)}</strong> &nbsp;·&nbsp; Current balance: <strong>${currency}${balance.toFixed(2)}</strong>`;
  }
}

/* ── Add Transaction ──────────────────────────────────── */
function addTransaction() {
  const name     = $('txName').value.trim();
  const amount   = parseFloat($('txAmount').value);
  const type     = $('txType').value;
  const category = $('txCategory').value;
  const note     = $('txNote').value.trim();
  let valid = true;
  if (!name)          { shakeEl($('txName'));   valid=false; }
  if (!amount||amount<=0) { shakeEl($('txAmount')); valid=false; }
  if (!valid) return;

  const editing = $('editIdx').value !== '';

  if (editing) {
    const idx = parseInt($('editIdx').value);
    const old = transactions[idx];
    // Revert old balance effect
    if (old.type==='income') balance -= old.amount; else balance += old.amount;
    // Apply new
    if (type==='income') balance += amount; else balance -= amount;
    transactions[idx] = { ...old, name, amount, type, category, note };
  } else {
    if (type==='income') balance += amount; else balance -= amount;
    transactions.push({ name, amount, type, category, note, createdAt: new Date().toISOString() });
  }

  updateUI();
  closeAdd();
}

function shakeEl(el) {
  el.style.animation='none'; void el.offsetHeight;
  el.style.animation='shake 0.4s ease';
  el.style.borderColor='var(--expense)';
  el.addEventListener('animationend',()=>{ el.style.animation=''; el.style.borderColor=''; },{once:true});
}

function setType(type) {
  $('txType').value = type;
  $('incomeBtn') .classList.toggle('active', type==='income');
  $('expenseBtn').classList.toggle('active', type==='expense');
}

/* ── Edit Transaction ─────────────────────────────────── */
function openEdit(idx) {
  const tx = transactions[idx];
  if (!tx) return;

  editIdx = idx;

  $('txName').value = tx.name;
  $('txAmount').value = tx.amount;
  $('txCategory').value = tx.category || 'General';
  $('txNote').value = tx.note || '';

  setType(tx.type);

  $('editIdx').value = idx;

  // FIXED: use translation function t(), not transaction object
  $('addModalTitle').textContent = t('editTx');
  $('addBtn').textContent = t('save');

  $('addMenu').style.display = 'flex';

  setTimeout(() => $('txName').focus(), 120);
}

/* ── Delete Transaction ───────────────────────────────── */
function requestDelete(idx) {
  const t = transactions[idx];
  if (!t) return;
  if (settings.confirmDelete) {
    pendingDeleteIdx = idx;
    $('confirmDeleteText').textContent =
      `Delete "${t.name}" (${t.type==='income'?'+':'-'}${currency}${t.amount.toFixed(2)})? This cannot be undone.`;
    $('confirmDeleteModal').style.display='flex';
  } else {
    doDelete(idx);
  }
}

function executeDelete() {
  if (pendingDeleteIdx !== null) { doDelete(pendingDeleteIdx); pendingDeleteIdx=null; }
  closeConfirmDelete();
}

function doDelete(idx) {
  const t = transactions[idx];
  if (!t) return;
  // Save for undo
  undoTransaction = { tx: {...t}, idx, balanceBefore: balance };
  if (t.type==='income') balance-=t.amount; else balance+=t.amount;
  undoBalance = balance;
  transactions.splice(idx,1);
  updateUI();
  renderFullTransactions();
  showUndoToast();
}

function showUndoToast() {
  const toast = $('undoToast');
  $('undoMsg').textContent = t('txDeleted');
  toast.classList.add('visible');
  const prog = $('undoProgress');
  prog.style.transition = 'none';
  prog.style.width = '100%';
  void prog.offsetWidth;
  prog.style.transition = 'width 5s linear';
  prog.style.width = '0%';
  if (undoTimer) clearTimeout(undoTimer);
  undoTimer = setTimeout(() => {
    toast.classList.remove('visible');
    undoTransaction = null;
  }, 5000);
}

function undoDelete() {
  if (!undoTransaction) return;
  clearTimeout(undoTimer);
  $('undoToast').classList.remove('visible');
  const { tx, idx } = undoTransaction;
  transactions.splice(idx, 0, tx);
  balance = undoTransaction.balanceBefore;
  undoTransaction = null;
  updateUI();
  renderFullTransactions();
}

function closeConfirmDelete() { $('confirmDeleteModal').style.display='none'; }

/* ── Clear All ────────────────────────────────────────── */
function confirmClearAll() { $('confirmClearModal').style.display='flex'; }

function clearAllTransactions() {
  transactions=[]; balance=0; prevBalance=0; prevIncome=0; prevExpense=0;
  updateUI();
  renderFullTransactions();
  $('confirmClearModal').style.display='none';
  closeTransactionsFull();
}

/* ── Full Transactions Modal ──────────────────────────── */
function openTransactionsFull() {
  $('transactionsFull').style.display='flex';
  renderFullTransactions();
}

function closeTransactionsFull() { $('transactionsFull').style.display='none'; }

function renderFullTransactions() {
  let list = [...transactions];

  // Search
  const query = ($('txSearch')?.value || '').toLowerCase().trim();
  if (query) list = list.filter(t =>
    t.name.toLowerCase().includes(query) ||
    (t.note||'').toLowerCase().includes(query) ||
    (t.category||'').toLowerCase().includes(query)
  );

  // Apply filters
  if (filterTypes.length) list = list.filter(t=>filterTypes.includes(t.type));
  if (filterCats.length)  list = list.filter(t=>filterCats.includes(t.category));

  // Sort
  list.sort((a,b)=>{
    let av, bv;
    if      (sortField==='name')     { av=a.name.toLowerCase(); bv=b.name.toLowerCase(); }
    else if (sortField==='amount')   { av=a.amount; bv=b.amount; }
    else if (sortField==='date')     { av=new Date(a.createdAt||0); bv=new Date(b.createdAt||0); }
    else if (sortField==='category') { av=a.category; bv=b.category; }
    if (av<bv) return sortDir==='asc'?-1:1;
    if (av>bv) return sortDir==='asc'?1:-1;
    return 0;
  });

  const fc = $('fullContent'), fe = $('fullEmpty');
  fc.innerHTML='';
  if (!list.length) { fe.style.display='block'; return; }
  fe.style.display='none';
  list.forEach(t => {
    const realIdx = transactions.findIndex(x=>x===t);
    fc.appendChild(buildTxItem(t, realIdx, true));
  });
}

/* Sort */
function toggleSort(field) {
  if (sortField===field) { sortDir = sortDir==='asc'?'desc':'asc'; }
  else { sortField=field; sortDir='desc'; }
  updateSortUI();
  renderFullTransactions();
}

function updateSortUI() {
  ['name','amount','date','category'].forEach(f=>{
    const btn = $(`sb-${f}`); const arr = $(`sarr-${f}`);
    if (!btn||!arr) return;
    btn.classList.toggle('active-sort', f===sortField);
    arr.textContent = f===sortField ? (sortDir==='asc'?'▲':'▼') : '';
  });
}

/* Filter */
function applyFilters() {
  filterTypes=[];
  if ($('fltIncome')?.checked)  filterTypes.push('income');
  if ($('fltExpense')?.checked) filterTypes.push('expense');
  filterCats = [...document.querySelectorAll('.cat-filter:checked')].map(c=>c.value);
  renderFullTransactions();
}

function clearFilters() {
  filterTypes=[]; filterCats=[];
  $('fltIncome').checked=$('fltExpense').checked=false;
  document.querySelectorAll('.cat-filter').forEach(c=>c.checked=false);
  renderFullTransactions();
}

/* ── Currency ─────────────────────────────────────────── */
function changeCurrency(sym, label, code) {
  if (code===currencyCode) return;
  pendingCurrency=sym; pendingCurrLabel=label; pendingCurrCode=code;
  $('convertText').textContent=`You're switching from ${currencyCode} to ${code}. Do you want to convert your existing values using today's live exchange rate?`;
  $('rateInfo').textContent='Fetching live rate…';
  $('convertBtn').disabled=true;
  $('currencyConvertModal').style.display='flex';
  fetchRate(currencyCode, code)
    .then(rate => {
      pendingRate = rate;
      $('rateInfo').innerHTML=`<strong>1 ${currencyCode} = ${rate.toFixed(4)} ${code}</strong><br>Live rate via Open Exchange Rates`;
      $('convertBtn').disabled=false;
    })
    .catch(()=>{
      $('rateInfo').textContent='Could not fetch live rate. You can still switch currencies without converting.';
      $('convertBtn').disabled=true;
    });
}

function applyCurrencyChange(doConvert) {
  if (doConvert && pendingRate) {
    balance = parseFloat((balance * pendingRate).toFixed(2));
    transactions = transactions.map(t=>({...t, amount: parseFloat((t.amount * pendingRate).toFixed(2))}));
  }
  currency=pendingCurrency; currencyLabel=pendingCurrLabel; currencyCode=pendingCurrCode;
  pendingCurrency=pendingCurrLabel=pendingCurrCode=pendingRate=null;
  $('currencyConvertModal').style.display='none';
  updateUI();
}

/* ── Currency Converter Tool ──────────────────────────── */
let convRateCache = {};
let convLastFetch = {};

async function fetchRate(from, to) {
  const key = `${from}_${to}`;
  const now = Date.now();
  // Cache for 10 minutes
  if (convRateCache[key] && now - (convLastFetch[key]||0) < 600000) {
    return convRateCache[key];
  }
  // Try frankfurter.app first (works on Cloudflare)
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
    if (res.ok) {
      const data = await res.json();
      if (data.rates && data.rates[to]) {
        convRateCache[key] = data.rates[to];
        convLastFetch[key] = now;
        return data.rates[to];
      }
    }
  } catch(_) {}
  // Fallback: exchangerate.host
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (res.ok) {
      const data = await res.json();
      if (data.rates && data.rates[to]) {
        convRateCache[key] = data.rates[to];
        convLastFetch[key] = now;
        return data.rates[to];
      }
    }
  } catch(_) {}
  throw new Error('Cannot fetch rate');
}

function openConverter() {
  $('converterModal').style.display = 'flex';
  runConvert();
  renderQuickPairs();
}
function closeConverter() { $('converterModal').style.display = 'none'; }

let convDebounce = null;
async function runConvert() {
  const from   = $('convFrom').value;
  const to     = $('convTo').value;
  const amount = parseFloat($('convAmount').value) || 1;
  const resultNum  = $('convResultNum');
  const resultRate = $('convResultRate');
  const updated    = $('convUpdated');
  if (from === to) {
    resultNum.textContent = amount.toFixed(2) + ' ' + to;
    resultRate.textContent = `1 ${from} = 1 ${to}`;
    updated.textContent = '';
    return;
  }
  resultNum.textContent = '…';
  resultRate.textContent = '';
  if (convDebounce) clearTimeout(convDebounce);
  convDebounce = setTimeout(async () => {
    try {
      const rate = await fetchRate(from, to);
      const result = amount * rate;
      resultNum.textContent = result.toLocaleString('en-US', {maximumFractionDigits: 4}) + ' ' + to;
      resultRate.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
      updated.textContent = 'Live rate via frankfurter.app';
    } catch {
      resultNum.textContent = 'Unable to fetch';
      resultRate.textContent = 'Check your connection';
      updated.textContent = '';
    }
  }, 350);
}

function swapConv() {
  const from = $('convFrom').value;
  const to   = $('convTo').value;
  $('convFrom').value = to;
  $('convTo').value   = from;
  runConvert();
}

const QUICK_PAIRS = [
  ['USD','EUR'],['USD','GBP'],['EUR','GBP'],
  ['USD','JPY'],['USD','TRY'],['EUR','TRY'],
];

async function renderQuickPairs() {
  const container = $('quickPairs');
  if (!container) return;
  container.innerHTML = '';
  for (const [from, to] of QUICK_PAIRS) {
    const card = document.createElement('div');
    card.className = 'quick-pair-card';
    card.innerHTML = `<span class="qp-pair">${from}→${to}</span><span class="qp-rate">…</span>`;
    container.appendChild(card);
    try {
      const rate = await fetchRate(from, to);
      card.querySelector('.qp-rate').textContent = rate.toFixed(4);
    } catch {
      card.querySelector('.qp-rate').textContent = 'N/A';
    }
    card.onclick = () => {
      $('convFrom').value = from;
      $('convTo').value   = to;
      runConvert();
    };
  }
}

/* ── Theme ────────────────────────────────────────────── */
function setColor(color) {
  accentColor = color;
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--income', color);
  updateProgress();
  updateAnalytics();
  saveData();
}

function toggleMode() {
  settings.darkMode = !settings.darkMode;
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '🌙' : '☀️';
  saveData();
  updateAnalytics();
}

function toggleLiquidGlass(on) {
  document.body.classList.toggle('liquid-glass', on);
  settings.liquidGlass = on; saveData();
}

/* ── Add/Close modals ─────────────────────────────────── */
function openAdd() {
  $('txName').value=''; $('txAmount').value=''; $('txNote').value='';
  $('txCategory').value='General'; setType('income');
  $('editIdx').value = '';
  $('addModalTitle').textContent = t('newTx');
  $('addBtn').textContent = t('add');
  $('addMenu').style.display='flex';
  setTimeout(()=>$('txName').focus(),120);
}
function closeAdd() { $('addMenu').style.display='none'; $('editIdx').value=''; }

function openSettings() { $('settingsMenu').style.display='flex'; renderSongList(); }
function closeSettings() { $('settingsMenu').style.display='none'; }

/* Close modal on backdrop click */
['addMenu','transactionsFull','settingsMenu','confirmDeleteModal','confirmClearModal','currencyConvertModal','addSongModal','converterModal'].forEach(id=>{
  const el = $(id);
  if (el) el.addEventListener('click', e=>{ if(e.target===el) el.style.display='none'; });
});

/* Keyboard shortcuts */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['addMenu','transactionsFull','settingsMenu','confirmDeleteModal','confirmClearModal','currencyConvertModal','addSongModal','converterModal'].forEach(id => {
      const el = $(id);
      if (el && el.style.display !== 'none') el.style.display = 'none';
    });
  }
  if (e.key === 'n' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    openAdd();
  }
});

/* ── Music Player ─────────────────────────────────────── */
const audioEl = () => $('audioPlayer');

function toggleMusicPanel() {
  const panel = $('musicPanel');
  panel.style.display = panel.style.display==='none' ? 'flex' : 'none';
}

function toggleMusic(on) {
  settings.musicEnabled = on;
  if (!on) { audioEl()?.pause(); $('playBtn').textContent='▶'; musicPlaying=false; }
  else { loadSong(settings.currentSong); }
  saveData();
}

function loadSong(idx) {
  const enabledSongs = songs.map((s,i)=>({...s,origIdx:i})).filter(s=>s.enabled);
  if (!enabledSongs.length) { updateNowPlaying(); return; }
  const s = enabledSongs.find(s=>s.origIdx===idx) || enabledSongs[0];
  settings.currentSong = s.origIdx;
  updateNowPlaying();
  const player = audioEl();
  if (!player) return;
  if (!s.src) { $('npArtist').textContent='No audio — add via + Add Your Own Song'; musicPlaying=false; return; }
  player.src = s.src;
  player.currentTime = s.trimStart||0;
  if (settings.musicEnabled && musicPlaying) player.play().catch(()=>{});
  renderSongList();
}

function updateNowPlaying() {
  const s = songs[settings.currentSong];
  $('npTitle').textContent  = s?.title  || 'Unknown';
  $('npArtist').textContent = s?.artist || '';
}

function togglePlay() {
  const player = audioEl();
  if (!player) return;
  if (!settings.musicEnabled) { $('stgMusicOn').checked=true; toggleMusic(true); return; }
  if (musicPlaying) {
    player.pause(); musicPlaying=false; $('playBtn').textContent='▶';
  } else {
    if (!player.src && songs[settings.currentSong]?.src) { loadSong(settings.currentSong); }
    player.play().then(()=>{ musicPlaying=true; $('playBtn').textContent='⏸'; }).catch(e=>console.warn(e));
  }
}

function prevSong() {
  const enabled = songs.map((s,i)=>i).filter(i=>songs[i].enabled);
  if (!enabled.length) return;
  let ci = enabled.indexOf(settings.currentSong);
  ci = (ci-1+enabled.length)%enabled.length;
  loadSong(enabled[ci]);
}

function nextSong() {
  const enabled = songs.map((s,i)=>i).filter(i=>songs[i].enabled);
  if (!enabled.length) return;
  if (settings.loopMode==='random') {
    let ni; do { ni=Math.floor(Math.random()*enabled.length); } while(enabled.length>1&&enabled[ni]===settings.currentSong);
    loadSong(enabled[ni]); return;
  }
  let ci = enabled.indexOf(settings.currentSong);
  ci = (ci+1)%enabled.length;
  loadSong(enabled[ci]);
}

function seekSong(val) {
  const player = audioEl();
  if (!player||!player.duration) return;
  const s = songs[settings.currentSong];
  const start = s?.trimStart||0, end = s?.trimEnd||player.duration;
  player.currentTime = start + (val/100)*(end-start);
}

function setVolume(val) {
  settings.volume = parseFloat(val);
  const player = audioEl();
  if (player) player.volume = settings.volume;
  saveData();
}

function setLoopMode(mode) {
  settings.loopMode = mode;
  setLoopModeUI(mode);
  const player = audioEl();
  if (player) { player.loop = mode==='loop-one'; }
  saveData();
}

function setLoopModeUI(mode) {
  ['lbAll','lbOne','lbRand'].forEach(id=>$(id)?.classList.remove('active'));
  if (mode==='loop-all')  $('lbAll') ?.classList.add('active');
  if (mode==='loop-one')  $('lbOne') ?.classList.add('active');
  if (mode==='random')    $('lbRand')?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const player = audioEl();
  if (!player) return;
  player.addEventListener('timeupdate', ()=>{
    if (!player.duration) return;
    const s = songs[settings.currentSong];
    const start = s?.trimStart||0, end = s?.trimEnd||player.duration;
    if (s?.trimEnd && player.currentTime >= s.trimEnd) { player.pause(); onSongEnd(); return; }
    const pct = (player.currentTime-start)/Math.max(end-start,0.1)*100;
    $('scrubber').value = Math.min(Math.max(pct,0),100);
    $('curTime').textContent = fmtTime(player.currentTime);
    $('totTime').textContent = fmtTime(end);
  });
  player.addEventListener('ended', onSongEnd);
  player.addEventListener('play',  ()=>{ $('playBtn').textContent='⏸'; musicPlaying=true; });
  player.addEventListener('pause', ()=>{ $('playBtn').textContent='▶'; musicPlaying=false; });
});

function onSongEnd() {
  if (settings.loopMode==='loop-one') { const p=audioEl(); if(p){const s=songs[settings.currentSong]; p.currentTime=s?.trimStart||0; p.play().catch(()=>{}); } return; }
  nextSong();
  setTimeout(()=>{ if(settings.musicEnabled){ const p=audioEl(); if(p&&p.src) p.play().catch(()=>{}); } }, 200);
}

function fmtTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m=Math.floor(sec/60), s=Math.floor(sec%60);
  return `${m}:${String(s).padStart(2,'0')}`;
}

/* ── Song List Render ─────────────────────────────────── */
function renderSongList() {
  const sl = $('songList'); if (!sl) return;
  sl.innerHTML='';
  songs.forEach((s,i)=>{
    const item = document.createElement('div');
    item.className = 'song-item' + (i===settings.currentSong?' playing':'');
    item.innerHTML=`
      <span class="song-num">${i+1}</span>
      <span class="song-name">${escHtml(s.title)}</span>
      ${s.custom ? '<span class="song-custom-tag">custom</span>' : ''}
      <button class="song-play-btn" onclick="selectSong(${i})" title="Play this song">${i===settings.currentSong&&musicPlaying?'⏸':'▶'}</button>
      <label class="toggle-switch song-toggle" title="Enable/Disable">
        <input type="checkbox" ${s.enabled?'checked':''} onchange="toggleSongEnabled(${i},this.checked)">
        <span class="toggle-slider"></span>
      </label>
      ${s.custom?`<button class="song-del-btn" onclick="removeSong(${i})" title="Remove">✕</button>`:''}
    `;
    sl.appendChild(item);
  });
}

function selectSong(idx) {
  loadSong(idx);
  if (settings.musicEnabled) { const p=audioEl(); if(p&&p.src){ musicPlaying=false; togglePlay(); } }
}

function toggleSongEnabled(idx, on) {
  songs[idx].enabled = on;
  saveData();
}

function removeSong(idx) {
  if (!songs[idx]?.custom) return;
  songs.splice(idx,1);
  if (settings.currentSong>=songs.length) settings.currentSong=0;
  renderSongList();
  saveData();
}

/* ── Add Song Modal ───────────────────────────────────── */
function openAddSong() { $('addSongModal').style.display='flex'; }
function closeAddSong() {
  $('addSongModal').style.display='none';
  $('songFile').value=''; $('songTitle').value='';
  $('songFileLabel').textContent='Choose audio file…';
  $('songTrimSection').style.display='none';
  $('trimControls').style.display='none';
  $('trimEnabled').checked=false;
  const prev=$('songPreview'); if(prev){prev.src=''; prev.style.display='none';}
  if (songFileObjectUrl) { URL.revokeObjectURL(songFileObjectUrl); songFileObjectUrl=null; }
}

function previewSong(input) {
  const f=input.files[0]; if(!f) return;
  $('songFileLabel').textContent=f.name;
  if ($('songTitle').value==='') $('songTitle').value=f.name.replace(/\.[^.]+$/,'');
  if (songFileObjectUrl) URL.revokeObjectURL(songFileObjectUrl);
  songFileObjectUrl = URL.createObjectURL(f);
  const prev=$('songPreview');
  prev.src=songFileObjectUrl; prev.style.display='block';
  $('songTrimSection').style.display='block';
  prev.addEventListener('loadedmetadata', ()=>{
    songPreviewDuration=prev.duration;
    $('trimEnd').max=$('trimStart').max=prev.duration;
    $('trimEnd').value=prev.duration;
    $('trimStartVal').textContent=fmtTime(0);
    $('trimEndVal').textContent=fmtTime(prev.duration);
  },{once:true});
}

function toggleTrim(on) { $('trimControls').style.display=on?'block':'none'; }

function updateTrim() {
  const start=parseFloat($('trimStart').value), end=parseFloat($('trimEnd').value);
  if (start>end) $('trimEnd').value=start;
  $('trimStartVal').textContent=fmtTime(start);
  $('trimEndVal').textContent=fmtTime(parseFloat($('trimEnd').value));
}

function addCustomSong() {
  const title=$('songTitle').value.trim();
  if (!songFileObjectUrl) { shakeEl($('songFileLabel')); return; }
  if (!title) { shakeEl($('songTitle')); return; }
  const trimOn = $('trimEnabled').checked;
  const trimStart = trimOn ? parseFloat($('trimStart').value)||0 : 0;
  const trimEnd   = trimOn ? parseFloat($('trimEnd').value)||null : null;
  songs.push({ title, artist:'Custom', src:songFileObjectUrl, custom:true, enabled:true, trimStart, trimEnd });
  songFileObjectUrl=null;
  renderSongList();
  saveData();
  closeAddSong();
}

/* ── Export / Import ──────────────────────────────────── */
function exportData() {
  const payload = JSON.stringify({
    version:2, exportedAt: new Date().toISOString(),
    transactions, balance, currency, currencyCode, currencyLabel,
    accentColor, settings,
    goal: $('goal')?.value||'',
    songs: songs.map(s=>({ title:s.title, artist:s.artist, custom:s.custom, enabled:s.enabled, trimStart:s.trimStart||0, trimEnd:s.trimEnd||null })),
  }, null, 2);
  const blob = new Blob([payload], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href=url; a.download=`project-atlas-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
}

function importData(input) {
  const f=input.files[0]; if(!f) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try {
      const d=JSON.parse(e.target.result);
      if (d.transactions)  transactions  = d.transactions;
      if (d.balance!==undefined) balance = d.balance;
      if (d.currency)      currency      = d.currency;
      if (d.currencyCode)  currencyCode  = d.currencyCode;
      if (d.currencyLabel) currencyLabel = d.currencyLabel;
      if (d.accentColor)   { accentColor=d.accentColor; document.documentElement.style.setProperty('--accent',accentColor); document.documentElement.style.setProperty('--income',accentColor); }
      if (d.settings)      settings = Object.assign(settings, d.settings);
      if (d.goal && $('goal')) $('goal').value=d.goal;
      if (d.songs) d.songs.forEach((s,i)=>{ if(songs[i]) Object.assign(songs[i],{title:s.title,artist:s.artist,enabled:s.enabled,trimStart:s.trimStart,trimEnd:s.trimEnd}); });
      currentLang = settings.language || 'en';
      applySettings(); updateUI(); renderSongList();
      alert('✅ Data imported successfully!');
    } catch(err) {
      alert('❌ Import failed: invalid file format.');
    }
    input.value='';
  };
  reader.readAsText(f);
}

/* ── Init ─────────────────────────────────────────────── */
loadData();
applySettings();
initLoader();
initCosmicBg();
initNebulaParallax();
updateSortUI();
