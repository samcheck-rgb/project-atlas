/* ═══════════════════════════════════════════════════
   PROJECT ATLAS LITE — script.js
   Lite version: no charts, no music, no cosmic FX,
   no color themes, no experimental themes.
   Export format is IDENTICAL to full v3 for compatibility.
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── i18n Translations ─────────────────────────────── */
const TRANSLATIONS = {
  en: {
    totalBalance:'TOTAL BALANCE', savingGoal:'Saving Goal', setGoal:'Set a goal to track your progress',
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
    language:'Language', languageDesc:'App interface language',
    data:'Data', exportData:'⬆ Export Data', importData:'⬇ Import Data',
    dataDesc:'Exports all transactions, balance, settings & preferences as a .json file.',
    deleteTx:'Delete Transaction?', clearAllConfirm:'This will permanently delete all transactions and reset your balance to zero. This cannot be undone.',
    yesDelete:'Yes, Clear All', currencyChange:'Currency Change', keepValues:'Keep Values', convert:'Convert',
    currencyConverter:'Currency Converter', from:'From', to:'To', popularPairs:'Popular Pairs',
    txDeleted:'Transaction deleted', undo:'Undo',
    phName:'e.g. Grocery shopping', phAmount:'0.00', phNote:'Add a note…',
    phGoal:'Set target amount', phCatSymbol:'e.g. ◆', phCatName:'e.g. Gaming',
    added:'Added',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'ENGINE',
    about_label:'PROJECT',
    about_author:'Author',
    about_hosted:'Hosted on',
    about_candidate:'Candidate for',
    about_directed:'Directed by',
    about_academy:'Academy',
    currencyConverterTitle:'Currency Converter',
    addTransactionTip:'Add Transaction',
    addCustomCategoryTip:'Add custom category',
    filterTip:'Filter',
    customCategories:'Custom Categories',
    addCustomCategory:'+ Add Custom Category',
    quickTransactions:'Quick Transactions',
    quickTransactionsHeader:'QUICK TRANSACTIONS',
    quickTxManageDesc:'Manage your saved quick transactions (max',
    noQuickTxSaved:'No quick transactions saved yet.',
    noQuickTxYet:'No quick transactions yet. Mark a transaction as predefined when adding.',
    saveAsQuick:'Save as Quick Transaction',
    saveAsQuickDesc:'Adds this to your Quick Transactions panel for fast reuse',
    lightDarkTip:'Light/Dark Mode',
    settingsTip:'Settings',
    liteBtn:'Lite',
    fullBtn:'Full',
    addCustomCategoryHeader:'Add Custom Category',
    symbolLabel:'Symbol',
    symbolHint:'Pick a symbol (e.g. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Category Name',
    addCategoryBtn:'Add Category',
    noCustomCats:'No custom categories yet.',
    editTip:'Edit',
    deleteTip:'Delete',
    removeTip:'Remove',
    swapCurrencies:'Swap currencies',
    copyClipboard:'Copy to clipboard',
    fetchingRate:'Fetching live rate…',
    cantFetchRate:'Could not fetch live rate. You can still switch currencies without converting.',
    liveRateVia:'Live rate via Open Exchange Rates',
    liveRateFrankfurter:'Live rate via frankfurter.app',
    unableFetch:'Unable to fetch',
    checkConnection:'Check your connection',
    currencySwitchPrompt:'You\'re switching from {from} to {to}. Do you want to convert your existing values using today\'s live exchange rate?',
    deleteConfirmText:'Delete "{name}" ({sign}{currency}{amount})? This cannot be undone.',
    optional:'(optional)',
    totalBalanceShort:'TOTAL BALANCE',
  },
  es: {
    totalBalance:'SALDO TOTAL', savingGoal:'Meta de Ahorro', setGoal:'Establece una meta para seguir tu progreso',
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
    language:'Idioma', languageDesc:'Idioma de la interfaz',
    data:'Datos', exportData:'⬆ Exportar', importData:'⬇ Importar',
    dataDesc:'Exporta todas las transacciones y ajustes como archivo .json.',
    deleteTx:'¿Eliminar Transacción?', clearAllConfirm:'Esto eliminará permanentemente todas las transacciones. No se puede deshacer.',
    yesDelete:'Sí, Borrar Todo', currencyChange:'Cambio de Moneda', keepValues:'Mantener Valores', convert:'Convertir',
    currencyConverter:'Conversor de Moneda', from:'De', to:'A', popularPairs:'Pares Populares',
    txDeleted:'Transacción eliminada', undo:'Deshacer',
    phName:'p. ej. Compra de comida', phAmount:'0,00', phNote:'Añade una nota…',
    phGoal:'Establecer importe objetivo', phCatSymbol:'p. ej. ◆', phCatName:'p. ej. Juegos',
    added:'Añadido',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'Motor',
    about_label:'PROYECTO',
    about_author:'Autor',
    about_hosted:'Alojado en',
    about_candidate:'Candidato a',
    about_directed:'Dirigido por',
    about_academy:'Academia',
    currencyConverterTitle:'Conversor de Moneda',
    addTransactionTip:'Añadir Transacción',
    addCustomCategoryTip:'Añadir categoría personalizada',
    filterTip:'Filtrar',
    customCategories:'Categorías Personalizadas',
    addCustomCategory:'+ Añadir Categoría',
    quickTransactions:'Transacciones Rápidas',
    quickTransactionsHeader:'TRANSACCIONES RÁPIDAS',
    quickTxManageDesc:'Gestiona tus transacciones rápidas guardadas (máx.',
    noQuickTxSaved:'Aún no hay transacciones rápidas guardadas.',
    noQuickTxYet:'No hay transacciones rápidas. Marca una al añadirla.',
    saveAsQuick:'Guardar como Transacción Rápida',
    saveAsQuickDesc:'La añade a tu panel de Transacciones Rápidas para reusarla',
    lightDarkTip:'Modo Claro/Oscuro',
    settingsTip:'Ajustes',
    liteBtn:'Lite',
    fullBtn:'Completo',
    addCustomCategoryHeader:'Añadir Categoría Personalizada',
    symbolLabel:'Símbolo',
    symbolHint:'Elige un símbolo (p. ej. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Nombre de Categoría',
    addCategoryBtn:'Añadir Categoría',
    noCustomCats:'Aún no hay categorías personalizadas.',
    editTip:'Editar',
    deleteTip:'Eliminar',
    removeTip:'Quitar',
    swapCurrencies:'Intercambiar monedas',
    copyClipboard:'Copiar al portapapeles',
    fetchingRate:'Obteniendo tasa en vivo…',
    cantFetchRate:'No se pudo obtener la tasa en vivo. Aún puedes cambiar de moneda sin convertir.',
    liveRateVia:'Tasa en vivo vía Open Exchange Rates',
    liveRateFrankfurter:'Tasa en vivo vía frankfurter.app',
    unableFetch:'No se puede obtener',
    checkConnection:'Verifica tu conexión',
    currencySwitchPrompt:'Cambias de {from} a {to}. ¿Quieres convertir tus valores actuales con la tasa de cambio en vivo de hoy?',
    deleteConfirmText:'¿Eliminar "{name}" ({sign}{currency}{amount})? Esto no se puede deshacer.',
    optional:'(opcional)',
    totalBalanceShort:'SALDO TOTAL',
  },
  ru: {
    totalBalance:'ОБЩИЙ БАЛАНС', savingGoal:'Цель Накоплений', setGoal:'Установите цель для отслеживания прогресса',
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
    language:'Язык', languageDesc:'Язык интерфейса',
    data:'Данные', exportData:'⬆ Экспорт', importData:'⬇ Импорт',
    dataDesc:'Экспортирует все операции и настройки в файл .json.',
    deleteTx:'Удалить Операцию?', clearAllConfirm:'Это навсегда удалит все операции. Отменить нельзя.',
    yesDelete:'Да, Очистить', currencyChange:'Смена Валюты', keepValues:'Оставить Значения', convert:'Конвертировать',
    currencyConverter:'Конвертер Валют', from:'Из', to:'В', popularPairs:'Популярные Пары',
    txDeleted:'Операция удалена', undo:'Отменить',
    phName:'напр. Продукты', phAmount:'0,00', phNote:'Добавить заметку…',
    phGoal:'Укажите целевую сумму', phCatSymbol:'напр. ◆', phCatName:'напр. Игры',
    added:'Добавлено',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'двигатель',
    about_label:'ПРОЕКТ',
    about_author:'Автор',
    about_hosted:'Размещён на',
    about_candidate:'Кандидат на',
    about_directed:'Под руководством',
    about_academy:'Академия',
    currencyConverterTitle:'Конвертер Валют',
    addTransactionTip:'Добавить Операцию',
    addCustomCategoryTip:'Добавить категорию',
    filterTip:'Фильтр',
    customCategories:'Свои Категории',
    addCustomCategory:'+ Добавить Категорию',
    quickTransactions:'Быстрые Операции',
    quickTransactionsHeader:'БЫСТРЫЕ ОПЕРАЦИИ',
    quickTxManageDesc:'Управляйте сохранёнными быстрыми операциями (макс.',
    noQuickTxSaved:'Пока нет сохранённых быстрых операций.',
    noQuickTxYet:'Пока нет быстрых операций. Отметьте операцию при добавлении.',
    saveAsQuick:'Сохранить как Быструю Операцию',
    saveAsQuickDesc:'Добавляет в панель быстрых операций для повторного использования',
    lightDarkTip:'Светлый/Тёмный Режим',
    settingsTip:'Настройки',
    liteBtn:'Lite',
    fullBtn:'Полная',
    addCustomCategoryHeader:'Добавить Свою Категорию',
    symbolLabel:'Символ',
    symbolHint:'Выберите символ (напр. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Название Категории',
    addCategoryBtn:'Добавить Категорию',
    noCustomCats:'Пока нет своих категорий.',
    editTip:'Изменить',
    deleteTip:'Удалить',
    removeTip:'Убрать',
    swapCurrencies:'Поменять валюты',
    copyClipboard:'Копировать в буфер',
    fetchingRate:'Получаем курс…',
    cantFetchRate:'Не удалось получить курс. Можно сменить валюту без конвертации.',
    liveRateVia:'Курс в реальном времени через Open Exchange Rates',
    liveRateFrankfurter:'Курс в реальном времени через frankfurter.app',
    unableFetch:'Не удалось получить',
    checkConnection:'Проверьте соединение',
    currencySwitchPrompt:'Вы переключаетесь с {from} на {to}. Конвертировать существующие значения по сегодняшнему курсу?',
    deleteConfirmText:'Удалить "{name}" ({sign}{currency}{amount})? Это нельзя отменить.',
    optional:'(необязательно)',
    totalBalanceShort:'ОБЩИЙ БАЛАНС',
  },
  tr: {
    totalBalance:'TOPLAM BAKİYE', savingGoal:'Tasarruf Hedefi', setGoal:'İlerlemeyi takip etmek için hedef belirleyin',
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
    language:'Dil', languageDesc:'Uygulama arayüz dili',
    data:'Veriler', exportData:'⬆ Dışa Aktar', importData:'⬇ İçe Aktar',
    dataDesc:'Tüm işlemleri ve ayarları .json dosyası olarak dışa aktarır.',
    deleteTx:'İşlem Silinsin mi?', clearAllConfirm:'Bu işlem tüm verileri kalıcı olarak siler. Geri alınamaz.',
    yesDelete:'Evet, Temizle', currencyChange:'Para Birimi Değişimi', keepValues:'Değerleri Koru', convert:'Dönüştür',
    currencyConverter:'Döviz Çevirici', from:'Kaynak', to:'Hedef', popularPairs:'Popüler Çiftler',
    txDeleted:'İşlem silindi', undo:'Geri Al',
    phName:'ör. Market alışverişi', phAmount:'0,00', phNote:'Bir not ekle…',
    phGoal:'Hedef tutar belirle', phCatSymbol:'ör. ◆', phCatName:'ör. Oyun',
    added:'Eklendi',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'Motor',
    about_label:'PROJE',
    about_author:'Yazar',
    about_hosted:'Barındırılıyor',
    about_candidate:'Aday',
    about_directed:'Yöneten',
    about_academy:'Akademi',
    currencyConverterTitle:'Döviz Çevirici',
    addTransactionTip:'İşlem Ekle',
    addCustomCategoryTip:'Özel kategori ekle',
    filterTip:'Filtrele',
    customCategories:'Özel Kategoriler',
    addCustomCategory:'+ Özel Kategori Ekle',
    quickTransactions:'Hızlı İşlemler',
    quickTransactionsHeader:'HIZLI İŞLEMLER',
    quickTxManageDesc:'Kayıtlı hızlı işlemlerinizi yönetin (maks.',
    noQuickTxSaved:'Henüz kaydedilmiş hızlı işlem yok.',
    noQuickTxYet:'Henüz hızlı işlem yok. Eklerken işaretle.',
    saveAsQuick:'Hızlı İşlem olarak Kaydet',
    saveAsQuickDesc:'Hızlı işlemler paneline ekler, yeniden kullanım için',
    lightDarkTip:'Açık/Koyu Mod',
    settingsTip:'Ayarlar',
    liteBtn:'Lite',
    fullBtn:'Tam',
    addCustomCategoryHeader:'Özel Kategori Ekle',
    symbolLabel:'Sembol',
    symbolHint:'Bir sembol seç (ör. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategori Adı',
    addCategoryBtn:'Kategori Ekle',
    noCustomCats:'Henüz özel kategori yok.',
    editTip:'Düzenle',
    deleteTip:'Sil',
    removeTip:'Kaldır',
    swapCurrencies:'Para birimlerini değiştir',
    copyClipboard:'Panoya kopyala',
    fetchingRate:'Canlı kur alınıyor…',
    cantFetchRate:'Canlı kur alınamadı. Dönüştürmeden de para birimi değiştirebilirsiniz.',
    liveRateVia:'Canlı kur: Open Exchange Rates',
    liveRateFrankfurter:'Canlı kur: frankfurter.app',
    unableFetch:'Alınamıyor',
    checkConnection:'Bağlantınızı kontrol edin',
    currencySwitchPrompt:'{from} biriminden {to} birimine geçiyorsunuz. Mevcut değerleri bugünkü canlı kurla dönüştürmek ister misiniz?',
    deleteConfirmText:'"{name}" ({sign}{currency}{amount}) silinsin mi? Bu geri alınamaz.',
    optional:'(isteğe bağlı)',
    totalBalanceShort:'TOPLAM BAKİYE',
  },
  de: {
    totalBalance:'GESAMTGUTHABEN', savingGoal:'Sparziel', setGoal:'Legen Sie ein Ziel fest, um Ihren Fortschritt zu verfolgen',
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
    language:'Sprache', languageDesc:'App-Oberflächensprache',
    data:'Daten', exportData:'⬆ Exportieren', importData:'⬇ Importieren',
    dataDesc:'Exportiert alle Transaktionen und Einstellungen als .json-Datei.',
    deleteTx:'Transaktion löschen?', clearAllConfirm:'Hiermit werden alle Transaktionen dauerhaft gelöscht. Dies kann nicht rückgängig gemacht werden.',
    yesDelete:'Ja, alles löschen', currencyChange:'Währungsänderung', keepValues:'Werte behalten', convert:'Konvertieren',
    currencyConverter:'Währungsrechner', from:'Von', to:'Nach', popularPairs:'Beliebte Paare',
    txDeleted:'Transaktion gelöscht', undo:'Rückgängig',
    phName:'z. B. Lebensmitteleinkauf', phAmount:'0,00', phNote:'Notiz hinzufügen…',
    phGoal:'Zielbetrag festlegen', phCatSymbol:'z. B. ◆', phCatName:'z. B. Gaming',
    added:'Hinzugefügt',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'Motor',
    about_label:'PROJEKT',
    about_author:'Autor',
    about_hosted:'Gehostet auf',
    about_candidate:'Kandidat für',
    about_directed:'Geleitet von',
    about_academy:'Akademie',
    currencyConverterTitle:'Währungsrechner',
    addTransactionTip:'Transaktion hinzufügen',
    addCustomCategoryTip:'Eigene Kategorie hinzufügen',
    filterTip:'Filter',
    customCategories:'Eigene Kategorien',
    addCustomCategory:'+ Eigene Kategorie hinzufügen',
    quickTransactions:'Schnellbuchungen',
    quickTransactionsHeader:'SCHNELLBUCHUNGEN',
    quickTxManageDesc:'Verwalte deine gespeicherten Schnellbuchungen (max.',
    noQuickTxSaved:'Noch keine Schnellbuchungen gespeichert.',
    noQuickTxYet:'Noch keine Schnellbuchungen. Beim Hinzufügen markieren.',
    saveAsQuick:'Als Schnellbuchung speichern',
    saveAsQuickDesc:'Fügt sie deinem Schnellbuchungs-Panel zur Wiederverwendung hinzu',
    lightDarkTip:'Hell-/Dunkelmodus',
    settingsTip:'Einstellungen',
    liteBtn:'Lite',
    fullBtn:'Voll',
    addCustomCategoryHeader:'Eigene Kategorie hinzufügen',
    symbolLabel:'Symbol',
    symbolHint:'Wähle ein Symbol (z. B. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategoriename',
    addCategoryBtn:'Kategorie hinzufügen',
    noCustomCats:'Noch keine eigenen Kategorien.',
    editTip:'Bearbeiten',
    deleteTip:'Löschen',
    removeTip:'Entfernen',
    swapCurrencies:'Währungen tauschen',
    copyClipboard:'In Zwischenablage kopieren',
    fetchingRate:'Live-Kurs wird abgerufen…',
    cantFetchRate:'Live-Kurs konnte nicht abgerufen werden. Du kannst die Währung trotzdem ohne Umrechnung wechseln.',
    liveRateVia:'Live-Kurs via Open Exchange Rates',
    liveRateFrankfurter:'Live-Kurs via frankfurter.app',
    unableFetch:'Abruf nicht möglich',
    checkConnection:'Prüfe deine Verbindung',
    currencySwitchPrompt:'Du wechselst von {from} zu {to}. Möchtest du deine bestehenden Werte mit dem heutigen Live-Kurs umrechnen?',
    deleteConfirmText:'"{name}" ({sign}{currency}{amount}) löschen? Dies kann nicht rückgängig gemacht werden.',
    optional:'(optional)',
    totalBalanceShort:'GESAMTGUTHABEN',
  },
  fa: {
    totalBalance:'موجودی کل', savingGoal:'هدف پس‌انداز', setGoal:'برای پیگیری پیشرفت خود یک هدف تعیین کنید',
    recentTx:'تراکنش‌های اخیر', viewAll:'مشاهده همه →', noTx:'هنوز تراکنشی وجود ندارد. برای افزودن، روی + بزنید.',
    newTx:'تراکنش جدید', editTx:'ویرایش تراکنش', name:'نام', amount:'مبلغ',
    category:'دسته‌بندی', note:'یادداشت', type:'نوع', income:'↑ درآمد', expense:'↓ هزینه',
    cancel:'لغو', add:'افزودن', save:'ذخیره', delete:'حذف',
    allTx:'همه تراکنش‌ها', clearAll:'حذف همه', searchTx:'جستجوی تراکنش‌ها…',
    sort:'مرتب‌سازی:', sortName:'نام', sortAmount:'مبلغ', sortDate:'تاریخ', sortCat:'دسته‌بندی',
    noMatch:'هیچ تراکنشی با فیلترهای شما مطابقت ندارد.', clearFilters:'پاک کردن فیلترها',
    settings:'تنظیمات', general:'عمومی', confirmDelete:'تأیید حذف',
    confirmDeleteDesc:'قبل از حذف تراکنش سؤال شود', tsFormat:'فرمت زمان',
    tsFormatDesc:'نمایش در هر تراکنش', dateTime:'تاریخ و زمان', dateOnly:'فقط تاریخ',
    maxShown:'تعداد تراکنش‌های اخیر', maxShownDesc:'نمایش در صفحه اصلی (۵ تا ۲۰)',
    language:'زبان', languageDesc:'زبان رابط کاربری برنامه',
    data:'داده‌ها', exportData:'⬆ خروجی گرفتن از داده‌ها', importData:'⬇ وارد کردن داده‌ها',
    dataDesc:'تمام تراکنش‌ها، موجودی، تنظیمات و ترجیحات را به‌صورت فایل .json صادر می‌کند.',
    deleteTx:'حذف تراکنش؟', clearAllConfirm:'این کار تمام تراکنش‌ها را برای همیشه حذف می‌کند. قابل بازگشت نیست.',
    yesDelete:'بله، همه حذف شوند', currencyChange:'تغییر واحد پول', keepValues:'حفظ مقادیر', convert:'تبدیل',
    currencyConverter:'مبدل ارز', from:'از', to:'به', popularPairs:'جفت‌های محبوب',
    txDeleted:'تراکنش حذف شد', undo:'بازگردانی',
    phName:'مثلاً خرید خواروبار', phAmount:'۰٫۰۰', phNote:'یادداشتی اضافه کنید…',
    phGoal:'مبلغ هدف را تعیین کنید', phCatSymbol:'مثلاً ◆', phCatName:'مثلاً بازی',
    added:'اضافه شد',
  
    // ── added i18n keys (full coverage) ──
    about_engine:'موتور',
    about_label:'پروژه',
    about_author:'نویسنده',
    about_hosted:'میزبانی شده در',
    about_candidate:'کاندیدای',
    about_directed:'به کارگردانی',
    about_academy:'آکادمی',
    currencyConverterTitle:'مبدل ارز',
    addTransactionTip:'افزودن تراکنش',
    addCustomCategoryTip:'افزودن دسته‌بندی سفارشی',
    filterTip:'فیلتر',
    customCategories:'دسته‌بندی‌های سفارشی',
    addCustomCategory:'+ افزودن دسته‌بندی سفارشی',
    quickTransactions:'تراکنش‌های سریع',
    quickTransactionsHeader:'تراکنش‌های سریع',
    quickTxManageDesc:'تراکنش‌های سریع ذخیره‌شده خود را مدیریت کنید (حداکثر',
    noQuickTxSaved:'هنوز تراکنش سریعی ذخیره نشده است.',
    noQuickTxYet:'هنوز تراکنش سریعی نیست. هنگام افزودن، تراکنش را به‌عنوان از پیش تعیین‌شده علامت بزنید.',
    saveAsQuick:'ذخیره به‌عنوان تراکنش سریع',
    saveAsQuickDesc:'این مورد را برای استفاده مجدد سریع به پنل تراکنش‌های سریع شما اضافه می‌کند',
    lightDarkTip:'حالت روشن/تاریک',
    settingsTip:'تنظیمات',
    liteBtn:'سبک',
    fullBtn:'کامل',
    addCustomCategoryHeader:'افزودن دسته‌بندی سفارشی',
    symbolLabel:'نماد',
    symbolHint:'یک نماد انتخاب کنید (مثلاً ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'نام دسته‌بندی',
    addCategoryBtn:'افزودن دسته‌بندی',
    noCustomCats:'هنوز دسته‌بندی سفارشی وجود ندارد.',
    editTip:'ویرایش',
    deleteTip:'حذف',
    removeTip:'برداشتن',
    swapCurrencies:'تعویض ارزها',
    copyClipboard:'کپی در کلیپ‌بورد',
    fetchingRate:'در حال دریافت نرخ زنده…',
    cantFetchRate:'نرخ زنده دریافت نشد. می‌توانید بدون تبدیل، ارز را تغییر دهید.',
    liveRateVia:'نرخ زنده از Open Exchange Rates',
    liveRateFrankfurter:'نرخ زنده از frankfurter.app',
    unableFetch:'امکان دریافت نیست',
    checkConnection:'اتصال خود را بررسی کنید',
    currencySwitchPrompt:'از {from} به {to} تغییر می‌دهید. آیا می‌خواهید مقادیر فعلی را با نرخ زنده امروز تبدیل کنید؟',
    deleteConfirmText:'«{name}» ({sign}{currency}{amount}) حذف شود؟ این عمل قابل بازگشت نیست.',
    optional:'(اختیاری)',
    totalBalanceShort:'موجودی کل',
  }
};

let currentLang = 'en';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const arrow = el.querySelector('.sort-arrow');
    if (arrow) {
      const labelNode = [...el.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
      if (labelNode) labelNode.textContent = `${t(key)} `;
      else el.insertBefore(document.createTextNode(`${t(key)} `), el.firstChild);
      return;
    }
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) el.title = t(key);
  });
  updateSortUI();
  document.title = `Project Atlas Lite`;
}

function changeLanguage(lang) {
  currentLang = lang;
  settings.language = lang;
  applyTranslations();
  renderTransactions();
  if (typeof renderPredefined === 'function') renderPredefined();
  if (typeof renderCustomCatList === 'function') renderCustomCatList();
  if (typeof renderPredefinedMgmt === 'function') renderPredefinedMgmt();
  saveData();
}

/* ── State ─────────────────────────────────────────────── */
let transactions  = [];
let balance       = 0;
let currency      = '$';
let currencyCode  = 'USD';
let currencyLabel = 'USD $';
let accentColor   = '#4ade80'; // kept in state for export compatibility
let settings = {
  confirmDelete : true,
  tsFormat      : 'datetime',
  maxShown      : 5,
  liquidGlass   : false,  // kept for export compat, not applied
  darkMode      : true,
  musicEnabled  : false,  // kept for export compat
  loopMode      : 'loop-all',
  volume        : 0.7,
  currentSong   : 0,
  language      : 'en',
  experimentalTheme: 'off', // kept for export compat
};
// songs array kept with same structure for export compatibility
let songs = [
  { title:'Cosmic Drift',    artist:'Project Atlas', src:'', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Nebula Wind',     artist:'Project Atlas', src:'', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Deep Space',      artist:'Project Atlas', src:'', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Aurora Borealis', artist:'Project Atlas', src:'', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Event Horizon',   artist:'Project Atlas', src:'', custom:false, enabled:true, trimStart:0, trimEnd:null },
];

const MAX_PREDEFINED = 16;

const DEFAULT_CATEGORIES = [
  { name:'General',   emoji:'◈' },
  { name:'Food',      emoji:'◉' },
  { name:'Transport', emoji:'▲' },
  { name:'Bills',     emoji:'✦' },
  { name:'Shopping',  emoji:'◆' },
  { name:'Salary',    emoji:'★' },
  { name:'Other',     emoji:'●' },
];
let customCategories = [];
let predefinedTransactions = [];
let galaxyMode = false; // kept for export compat

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
let undoTimer         = null;
let undoTransaction   = null;
let editIdx           = null;

let prevBalance = 0;
let prevIncome  = 0;
let prevExpense = 0;

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
    if (d.customCategories) customCategories = d.customCategories;
    if (d.predefinedTransactions) predefinedTransactions = d.predefinedTransactions;
    if (d.galaxyMode !== undefined) galaxyMode = d.galaxyMode;
    currentLang = settings.language || 'en';
  } catch(e) { console.warn('loadData:', e); }
}

function saveData() {
  try {
    // Preserve any full-mode-only keys that lite doesn't manage
    let existing = {};
    try { existing = JSON.parse(localStorage.getItem('atlas_v2') || '{}'); } catch(_) {}
    localStorage.setItem('atlas_v2', JSON.stringify({
      ...existing,
      transactions, balance, currency, currencyCode, currencyLabel,
      accentColor, settings,
      songs: songs.map(s => ({ title:s.title, artist:s.artist, src: s.custom ? s.src : '', custom:s.custom, enabled:s.enabled, trimStart:s.trimStart||0, trimEnd:s.trimEnd||null })),
      goal: $('goal') ? $('goal').value : '',
      customCategories, predefinedTransactions, galaxyMode,
    }));
  } catch(e) { console.warn('saveData:', e); }
}

function saveSetting(key, val) {
  settings[key] = val;
  saveData();
}

/* ── Apply saved settings to UI ───────────────────────── */
function applySettings() {
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '☾' : '☀';
  $('stgConfirmDelete').checked  = settings.confirmDelete;
  $('stgTsFormat').value         = settings.tsFormat;
  $('stgMaxShown').value         = settings.maxShown;
  $('maxShownVal').textContent   = settings.maxShown;
  $('stgLanguage').value         = currentLang;
  $('currencyLabel').textContent = currencyLabel;
  if ($('maxPredefinedLabel')) $('maxPredefinedLabel').textContent = MAX_PREDEFINED;
  applyTranslations();
  populateCategorySelects();
}

/* ── Loader ───────────────────────────────────────────── */
function initLoader() {
  let pct = 0;
  const interval = setInterval(() => {
    pct += pct < 70 ? Math.random()*5+2 : Math.random()*1.2+0.3;
    if (pct > 100) pct = 100;
    $('loaderFill').style.width = pct+'%';
    $('loaderPct').textContent  = Math.floor(pct)+'%';
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        $('loader').classList.add('fade-out');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          $('app').classList.add('visible');
        }));
        updateUI();
      }, 400);
    }
  }, 40);
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
  const colors = ['#4ade80', '#38bdf8', '#f97316', '#e11d48', '#a78bfa', '#fb7185', '#fff'];
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

/* ── Rolling Number Animation ─────────────────────────── */
function animateNumber(el, from, to, duration = 600) {
  if (!el) return;
  const start = performance.now();
  const absTo = Math.abs(to);
  const absFrom = Math.abs(from);
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = absFrom + (absTo - absFrom) * ease;
    el.textContent = current.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = absTo.toFixed(2);
  }
  requestAnimationFrame(step);
}

/* ── Main UI Update ───────────────────────────────────── */
function updateUI() {
  const neg = balance < 0;
  $('balanceSign').textContent = neg ? '-' : '';
  $('currencyDisp').textContent = currency;

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
  renderPredefined();
  saveData();
  document.title = `Project Atlas Lite — ${currency}${Math.abs(balance).toFixed(2)}`;
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

function buildTxItem(tx, realIdx, inFull) {
  const sign = tx.type==='income' ? '+' : '-';
  const icon = getCategoryIcon(tx.category);

  let tsText = '';
  if (tx.createdAt) {
    const d = new Date(tx.createdAt);
    tsText = settings.tsFormat === 'date'
      ? d.toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})
      : d.toLocaleDateString('en-US', {month:'short',day:'numeric'}) + ' ' + d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }

  const div = document.createElement('div');
  div.className = 'transaction-item';
  div.innerHTML = `
    <div class="t-icon ${tx.type}">${icon}</div>
    <div class="t-info">
      <div class="t-name">${escHtml(tx.name)}</div>
      <div class="t-meta">
        <span>${tx.category||'General'}</span>
        ${tsText ? `<span>${tsText}</span>` : ''}
      </div>
      ${tx.note ? `<div class="t-note">${escHtml(tx.note)}</div>` : ''}
    </div>
    <div class="t-amount ${tx.type}">${sign}${currency}${tx.amount.toFixed(2)}</div>
    <div class="t-actions">
      <button class="t-edit" onclick="openEdit(${realIdx})" title="${t('editTip')}">✏</button>
      <button class="t-delete" onclick="requestDelete(${realIdx})" title="${t('deleteTip')}">✕</button>
    </div>
  `;
  return div;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Progress circle ──────────────────────────────────── */
let progressTarget = 0;
let progressRaf = null;

function updateProgress() {
  const goalVal  = parseFloat($('goal').value)||0;
  const pSpan    = $('progress').querySelector('span');
  const pLabel   = $('progressLabel');
  if (!goalVal) {
    progressTarget = 0;
    $('progress').style.background = `conic-gradient(var(--accent) 0deg,rgba(255,255,255,0.06) 0deg)`;
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

/* ── Add Transaction ──────────────────────────────────── */
function addTransaction() {
  const name     = $('txName').value.trim();
  const amount   = parseFloat($('txAmount').value);
  const type     = $('txType').value;
  const category = $('txCategory').value;
  const note     = $('txNote').value.trim();
  const isPredefined = $('txPredefined') ? $('txPredefined').checked : false;
  let valid = true;
  if (!name)          { shakeEl($('txName'));   valid=false; }
  if (!amount||amount<=0) { shakeEl($('txAmount')); valid=false; }
  if (!valid) return;

  const editing = $('editIdx').value !== '';

  if (editing) {
    const idx = parseInt($('editIdx').value);
    const old = transactions[idx];
    if (old.type==='income') balance -= old.amount; else balance += old.amount;
    if (type==='income') balance += amount; else balance -= amount;
    transactions[idx] = { ...old, name, amount, type, category, note };
  } else {
    if (type==='income') balance += amount; else balance -= amount;
    transactions.push({ name, amount, type, category, note, createdAt: new Date().toISOString() });
  }

  if (isPredefined && !editing) {
    if (predefinedTransactions.length < MAX_PREDEFINED) {
      if (!predefinedTransactions.find(p => p.name === name && p.amount === amount && p.type === type)) {
        predefinedTransactions.push({ name, amount, type, category, note });
      }
    }
  }

  updateUI();
  renderPredefined();
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
  populateCategorySelects();
  $('txName').value = tx.name;
  $('txAmount').value = tx.amount;
  $('txCategory').value = tx.category || 'General';
  $('txNote').value = tx.note || '';
  if ($('txPredefined')) $('txPredefined').checked = false;
  setType(tx.type);
  $('editIdx').value = idx;
  $('addModalTitle').textContent = t('editTx');
  $('addBtn').textContent = t('save');
  $('addMenu').style.display = 'flex';
  const predField = document.querySelector('.predefined-field');
  if (predField) predField.style.display = 'none';
  setTimeout(() => $('txName').focus(), 120);
}

/* ── Delete Transaction ───────────────────────────────── */
function requestDelete(idx) {
  const tx = transactions[idx];
  if (!tx) return;
  if (settings.confirmDelete) {
    pendingDeleteIdx = idx;
    $('confirmDeleteText').textContent =
      t('deleteConfirmText').replace('{name}', tx.name).replace('{sign}', tx.type==='income'?'+':'-').replace('{currency}', currency).replace('{amount}', tx.amount.toFixed(2));
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
  const tx = transactions[idx];
  if (!tx) return;
  undoTransaction = { tx: {...tx}, idx, balanceBefore: balance };
  if (tx.type==='income') balance-=tx.amount; else balance+=tx.amount;
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
  const catFilterList = $('catFilterList');
  if (catFilterList) {
    const allCats = getAllCategories();
    catFilterList.innerHTML = allCats.map(c =>
      `<label class="filter-opt"><input type="checkbox" class="cat-filter" value="${escHtml(c.name)}" onchange="applyFilters()"> ${c.emoji} ${escHtml(c.name)}</label>`
    ).join('');
    catFilterList.querySelectorAll('.cat-filter').forEach(cb => {
      cb.checked = filterCats.includes(cb.value);
    });
  }

  let list = [...transactions];

  const query = ($('txSearch')?.value || '').toLowerCase().trim();
  if (query) list = list.filter(t =>
    t.name.toLowerCase().includes(query) ||
    (t.note||'').toLowerCase().includes(query) ||
    (t.category||'').toLowerCase().includes(query)
  );

  if (filterTypes.length) list = list.filter(t=>filterTypes.includes(t.type));
  if (filterCats.length)  list = list.filter(t=>filterCats.includes(t.category));

  list.sort((a,b)=>{
    let av, bv;
    if      (sortField==='name')     { av=(a.name||'').toLowerCase(); bv=(b.name||'').toLowerCase(); }
    else if (sortField==='amount')   { av=a.amount; bv=b.amount; }
    else if (sortField==='date')     { av=new Date(a.createdAt||0).getTime(); bv=new Date(b.createdAt||0).getTime(); }
    else if (sortField==='category') { av=(a.category||'').toLowerCase(); bv=(b.category||'').toLowerCase(); }
    else                             { av=new Date(a.createdAt||0).getTime(); bv=new Date(b.createdAt||0).getTime(); }
    if (av<bv) return sortDir==='asc'?-1:1;
    if (av>bv) return sortDir==='asc'?1:-1;
    return 0;
  });

  const fc = $('fullContent'), fe = $('fullEmpty');
  fc.innerHTML='';
  if (!list.length) { fe.style.display='block'; return; }
  fe.style.display='none';
  list.forEach(tx => {
    const realIdx = transactions.findIndex(x=>x===tx);
    fc.appendChild(buildTxItem(tx, realIdx, true));
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
    const isActive = f === sortField;
    btn.classList.toggle('active-sort', isActive);
    btn.classList.toggle('sort-asc',  isActive && sortDir === 'asc');
    btn.classList.toggle('sort-desc', isActive && sortDir === 'desc');
    btn.setAttribute('aria-sort', isActive ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none');
    arr.textContent = isActive ? (sortDir === 'asc' ? '↑' : '↓') : '';
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
  if ($('fltIncome'))  $('fltIncome').checked=false;
  if ($('fltExpense')) $('fltExpense').checked=false;
  document.querySelectorAll('.cat-filter').forEach(c=>c.checked=false);
  renderFullTransactions();
}

/* ── Currency ─────────────────────────────────────────── */
function changeCurrency(sym, label, code) {
  if (code===currencyCode) return;
  pendingCurrency=sym; pendingCurrLabel=label; pendingCurrCode=code;
  $('convertText').textContent=t('currencySwitchPrompt').replace('{from}',currencyCode).replace('{to}',code);
  $('rateInfo').textContent=t('fetchingRate');
  $('convertBtn').disabled=true;
  $('currencyConvertModal').style.display='flex';
  fetchRate(currencyCode, code)
    .then(rate => {
      pendingRate = rate;
      $('rateInfo').innerHTML=`<strong>1 ${currencyCode} = ${rate.toFixed(4)} ${code}</strong><br>Live rate via Open Exchange Rates`;
      $('convertBtn').disabled=false;
    })
    .catch(()=>{
      $('rateInfo').textContent=t('cantFetchRate');
      $('convertBtn').disabled=true;
    });
}

function applyCurrencyChange(doConvert) {
  if (doConvert && pendingRate) {
    balance = parseFloat((balance * pendingRate).toFixed(2));
    transactions = transactions.map(t=>({...t, amount: parseFloat((t.amount * pendingRate).toFixed(2))}));
    predefinedTransactions = predefinedTransactions.map(p => ({
      ...p,
      amount: parseFloat((parseFloat(p.amount) * pendingRate).toFixed(2))
    }));
    const goalInput = $('goal');
    if (goalInput) {
      const gv = parseFloat(goalInput.value);
      if (!isNaN(gv) && gv > 0) goalInput.value = parseFloat((gv * pendingRate).toFixed(2));
    }
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
  if (convRateCache[key] && now - (convLastFetch[key]||0) < 600000) {
    return convRateCache[key];
  }
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
      updated.textContent = t('liveRateFrankfurter');
    } catch {
      resultNum.textContent = t('unableFetch');
      resultRate.textContent = t('checkConnection');
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

function copyConvResult() {
  const num = document.getElementById('convResultNum');
  if (!num) return;
  const raw = (num.textContent || '').trim();
  if (!raw || raw === '—' || raw === '…' || raw.toLowerCase().includes('unable')) return;
  const match = raw.match(/[-+]?[\d,]*\.?\d+/);
  const toCopy = match ? match[0].replace(/,/g,'') : raw;
  const done = () => {
    const btn = document.getElementById('convCopyBtn');
    if (btn) {
      const prev = btn.textContent;
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = prev; btn.classList.remove('copied'); }, 1400);
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(toCopy).then(done).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = toCopy; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch(_) {}
      document.body.removeChild(ta); done();
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = toCopy; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(_) {}
    document.body.removeChild(ta); done();
  }
}

/* ── Theme (light/dark only) ──────────────────────────── */
function toggleMode() {
  settings.darkMode = !settings.darkMode;
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '☾' : '☀';
  saveData();
}

/* ── Add/Close modals ─────────────────────────────────── */
function openAdd() {
  $('txName').value=''; $('txAmount').value=''; $('txNote').value='';
  populateCategorySelects();
  $('txCategory').value='General'; setType('income');
  $('editIdx').value = '';
  if ($('txPredefined')) $('txPredefined').checked = false;
  $('addModalTitle').textContent = t('newTx');
  $('addBtn').textContent = t('add');
  $('addMenu').style.display='flex';
  const predField = document.querySelector('.predefined-field');
  if (predField) predField.style.display = '';
  setTimeout(()=>$('txName').focus(),120);
}
function closeAdd() { $('addMenu').style.display='none'; $('editIdx').value=''; }

function openSettings() { $('settingsMenu').style.display='flex'; renderCustomCatList(); renderPredefinedMgmt(); }
function closeSettings() { $('settingsMenu').style.display='none'; }

/* Close modal on backdrop click */
['addMenu','transactionsFull','settingsMenu','confirmDeleteModal','confirmClearModal','currencyConvertModal','converterModal','addCustomCategoryModal'].forEach(id=>{
  const el = $(id);
  if (el) el.addEventListener('click', e=>{ if(e.target===el) el.style.display='none'; });
});

/* Keyboard shortcuts */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['addMenu','transactionsFull','settingsMenu','confirmDeleteModal','confirmClearModal','currencyConvertModal','converterModal','addCustomCategoryModal'].forEach(id => {
      const el = $(id);
      if (el && el.style.display !== 'none') el.style.display = 'none';
    });
  }
  if (e.key === 'n' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    openAdd();
  }
});

/* ── Export / Import ──────────────────────────────────── */
function exportData() {
  // Export format is identical to full v3 for full compatibility
  const payload = JSON.stringify({
    version:3, exportedAt: new Date().toISOString(),
    transactions, balance, currency, currencyCode, currencyLabel,
    accentColor, settings,
    goal: $('goal')?.value||'',
    songs: songs.map(s=>({ title:s.title, artist:s.artist, custom:s.custom, enabled:s.enabled, trimStart:s.trimStart||0, trimEnd:s.trimEnd||null })),
    customCategories, predefinedTransactions, galaxyMode,
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
      if (d.accentColor)   accentColor   = d.accentColor;
      if (d.settings)      settings = Object.assign(settings, d.settings);
      if (d.goal && $('goal')) $('goal').value=d.goal;
      if (d.songs) d.songs.forEach((s,i)=>{ if(songs[i]) Object.assign(songs[i],{title:s.title,artist:s.artist,enabled:s.enabled,trimStart:s.trimStart,trimEnd:s.trimEnd}); });
      if (d.customCategories) customCategories = d.customCategories;
      if (d.predefinedTransactions) predefinedTransactions = d.predefinedTransactions;
      if (d.galaxyMode !== undefined) galaxyMode = d.galaxyMode;
      currentLang = settings.language || 'en';
      applySettings(); updateUI(); renderPredefined();
      alert('✅ Data imported successfully!');
    } catch(err) {
      alert('❌ Import failed: invalid file format.');
    }
    input.value='';
  };
  reader.readAsText(f);
}

/* ── Categories ───────────────────────────────────────── */
function getAllCategories() {
  return [...DEFAULT_CATEGORIES, ...customCategories];
}

function getCategoryIcon(name) {
  const all = getAllCategories();
  const found = all.find(c => c.name === name);
  return found ? found.emoji : '◈';
}

function populateCategorySelects() {
  const allCats = getAllCategories();
  const selects = document.querySelectorAll('#txCategory');
  selects.forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = allCats.map(c =>
      `<option value="${escHtml(c.name)}">${c.emoji} ${escHtml(c.name)}</option>`
    ).join('');
    if (cur && allCats.find(c => c.name === cur)) sel.value = cur;
  });
}

function renderCustomCatList() {
  const list = $('customCatList');
  if (!list) return;
  if (!customCategories.length) {
    list.innerHTML = `<div class="setting-desc" style="padding:6px 0">${t('noCustomCats')}</div>`;
    return;
  }
  list.innerHTML = customCategories.map((c, i) => `
    <div class="predefined-mgmt-item">
      <span class="predefined-mgmt-icon">${c.emoji}</span>
      <span class="predefined-mgmt-name">${escHtml(c.name)}</span>
      <button class="song-del-btn" onclick="deleteCustomCategory(${i})" title="${t('deleteTip')}">✕</button>
    </div>
  `).join('');
}

function openAddCustomCategory() {
  if ($('newCatEmoji')) $('newCatEmoji').value = '';
  if ($('newCatName'))  $('newCatName').value  = '';
  $('addCustomCategoryModal').style.display = 'flex';
}

function closeAddCustomCategory() {
  $('addCustomCategoryModal').style.display = 'none';
}

function addCustomCategory() {
  const emoji = ($('newCatEmoji')?.value.trim()) || '◆';
  const name  = $('newCatName')?.value.trim();
  if (!name) { shakeEl($('newCatName')); return; }
  if (getAllCategories().find(c => c.name.toLowerCase() === name.toLowerCase())) {
    shakeEl($('newCatName')); return;
  }
  customCategories.push({ name, emoji });
  saveData();
  populateCategorySelects();
  renderCustomCatList();
  closeAddCustomCategory();
}

function deleteCustomCategory(idx) {
  customCategories.splice(idx, 1);
  saveData();
  populateCategorySelects();
  renderCustomCatList();
}

/* ── Predefined Transactions ──────────────────────────── */
function renderPredefined() {
  const grid  = $('predefinedGrid');
  const empty = $('predefinedEmpty');
  if (!grid) return;
  const count = $('predefinedCount');
  if (count) count.textContent = predefinedTransactions.length ? `${predefinedTransactions.length}/${MAX_PREDEFINED}` : '';

  if (!predefinedTransactions.length) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  grid.innerHTML = predefinedTransactions.map((p, i) => `
    <button class="predefined-tile ${p.type}" onclick="applyPredefined(${i})" title="${escHtml(p.name)}">
      <span class="predefined-tile-icon">${getCategoryIcon(p.category)}</span>
      <span class="predefined-tile-name">${escHtml(p.name)}</span>
      <span class="predefined-tile-amount">${p.type==='income'?'+':'-'}${currency}${parseFloat(p.amount).toFixed(2)}</span>
    </button>
  `).join('');
}

function applyPredefined(idx) {
  const p = predefinedTransactions[idx];
  if (!p) return;
  const amt = parseFloat(p.amount);
  if (isNaN(amt) || amt <= 0) return;
  if (p.type === 'income') balance += amt;
  else                     balance -= amt;
  transactions.push({
    name: p.name,
    amount: amt,
    type: p.type,
    category: p.category || 'General',
    note: p.note || '',
    createdAt: new Date().toISOString()
  });
  saveData();
  updateUI();
  showToast(`${t('added')||'Added'}: ${p.name}`);
}

function renderPredefinedMgmt() {
  const list  = $('predefinedMgmtList');
  const empty = $('predefinedMgmtEmpty');
  if (!list) return;
  if (!predefinedTransactions.length) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.innerHTML = predefinedTransactions.map((p, i) => `
    <div class="predefined-mgmt-item">
      <span class="predefined-mgmt-icon">${getCategoryIcon(p.category)}</span>
      <div class="predefined-mgmt-info">
        <span class="predefined-mgmt-name">${escHtml(p.name)}</span>
        <span class="predefined-mgmt-meta ${p.type}">${p.type==='income'?'+':'-'}${currency}${parseFloat(p.amount).toFixed(2)} · ${escHtml(p.category)}</span>
      </div>
      <button class="song-del-btn" onclick="deletePredefined(${i})" title="${t('removeTip')}">✕</button>
    </div>
  `).join('');
}

function deletePredefined(idx) {
  predefinedTransactions.splice(idx, 1);
  saveData();
  renderPredefined();
  renderPredefinedMgmt();
}

/* ── Toast notification ───────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ── Init ─────────────────────────────────────────────── */
loadData();
applySettings();
initLoader();
updateSortUI();
renderPredefined();

['addCustomCategoryModal'].forEach(id=>{
  const el=$(id); if(el) el.addEventListener('click',e=>{ if(e.target===el) el.style.display='none'; });
});
