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
    // Charts / analytics
    noExpenseData:'No expense data yet', totalExpenses:'total expenses',
    incomeLegend:'Income', expenseLegend:'Expense',
    biggestSpend:'Biggest spend', bestIncome:'Best income', highestSpend:'Highest spend',
    addTxForTrends:'Add transactions to see monthly trends.',
    addTxForHistory:'Add transactions to see balance history',
    avgExpense:'Avg expense', currentBalance:'Current balance',
    // Placeholders
    phName:'e.g. Grocery shopping', phAmount:'0.00', phNote:'Add a note…',
    phGoal:'Set target amount', phSongTitle:'Song name',
    phCatSymbol:'e.g. ◆', phCatName:'e.g. Gaming',
    // Feedback
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
    galaxyMode:'Galaxy Mode',
    galaxyModeDesc:'Experimental: nebula & deep-space effects in dark mode',
    expTheme:'Experimental Theme',
    expThemeDesc:'Try a completely different look. Off by default.',
    expOff:'Off (Default)',
    expMono:'Mono — Brutalist',
    expCumulus:'Cumulus — Neumorphic',
    expLedger:'Ledger — Editorial',
    expPrism:'Prism — Glass + Neon',
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
    clickExpand:'Click to expand',
    selectSongBelow:'Select a song below',
    loopAll:'↻ All',
    loopOne:'↺ One',
    loopRandom:'⇄ Random',
    volMinus:'vol−',
    volPlus:'vol+',
    audioFile:'Audio File',
    chooseAudio:'Choose audio file…',
    songTitleLabel:'Title',
    trimSong:'Trim Song',
    startLabel:'Start:',
    endLabel:'End:',
    addSongBtn:'Add Song',
    addCustomCategoryHeader:'Add Custom Category',
    symbolLabel:'Symbol',
    symbolHint:'Pick a symbol (e.g. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Category Name',
    addCategoryBtn:'Add Category',
    addCustomSong:'Add Custom Song',
    noCustomCats:'No custom categories yet.',
    editTip:'Edit',
    deleteTip:'Delete',
    removeTip:'Remove',
    playSongTip:'Play this song',
    enableDisableTip:'Enable/Disable',
    swapCurrencies:'Swap currencies',
    copyClipboard:'Copy to clipboard',
    noAudio:'No audio — add via + Add Your Own Song',
    unknownSong:'Unknown',
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
    songCustomTag:'custom',
    // ── Experimental UI Layout ──
    experimental:'Experimental',
    experimentalDesc:'PC-only features and layout experiments',
    expUiLayout:'Experimental UI Layout',
    expUiLayoutDesc:'Rearranges button positions for desktop use. PC ONLY.',
    expUiOff:'Off (Default)',
    expUiSidebar:'Sidebar Navigation',
    expUiTopbar:'Compact Topbar',
    // ── New custom themes ──
    expAurora:'Aurora — Nordic Glow',
    expensesByCat:'Expenses by Category',
    expObsidian:'Obsidian — Dark Marble',
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
    noExpenseData:'Aún no hay datos de gastos', totalExpenses:'gastos totales',
    incomeLegend:'Ingresos', expenseLegend:'Gastos',
    biggestSpend:'Mayor gasto', bestIncome:'Mejor ingreso', highestSpend:'Mayor gasto mensual',
    addTxForTrends:'Añade transacciones para ver tendencias mensuales.',
    addTxForHistory:'Añade transacciones para ver el historial del saldo',
    avgExpense:'Gasto medio', currentBalance:'Saldo actual',
    phName:'p. ej. Compra de comida', phAmount:'0,00', phNote:'Añade una nota…',
    phGoal:'Establecer importe objetivo', phSongTitle:'Nombre de la canción',
    phCatSymbol:'p. ej. ◆', phCatName:'p. ej. Juegos',
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
    galaxyMode:'Modo Galaxia',
    galaxyModeDesc:'Experimental: efectos de nebulosa y espacio profundo en modo oscuro',
    expTheme:'Tema Experimental',
    expThemeDesc:'Prueba un aspecto completamente diferente. Desactivado por defecto.',
    expOff:'Desactivado (Predeterminado)',
    expMono:'Mono — Brutalista',
    expCumulus:'Cumulus — Neumórfico',
    expLedger:'Ledger — Editorial',
    expPrism:'Prism — Vidrio + Neón',
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
    clickExpand:'Haz clic para expandir',
    selectSongBelow:'Selecciona una canción abajo',
    loopAll:'↻ Todas',
    loopOne:'↺ Una',
    loopRandom:'⇄ Aleatorio',
    volMinus:'vol−',
    volPlus:'vol+',
    audioFile:'Archivo de Audio',
    chooseAudio:'Elegir archivo de audio…',
    songTitleLabel:'Título',
    trimSong:'Recortar Canción',
    startLabel:'Inicio:',
    endLabel:'Fin:',
    addSongBtn:'Añadir Canción',
    addCustomCategoryHeader:'Añadir Categoría Personalizada',
    symbolLabel:'Símbolo',
    symbolHint:'Elige un símbolo (p. ej. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Nombre de Categoría',
    addCategoryBtn:'Añadir Categoría',
    addCustomSong:'Añadir Canción Personalizada',
    noCustomCats:'Aún no hay categorías personalizadas.',
    editTip:'Editar',
    deleteTip:'Eliminar',
    removeTip:'Quitar',
    playSongTip:'Reproducir esta canción',
    enableDisableTip:'Activar/Desactivar',
    swapCurrencies:'Intercambiar monedas',
    copyClipboard:'Copiar al portapapeles',
    noAudio:'Sin audio — añade vía + Añadir Canción',
    unknownSong:'Desconocido',
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
    songCustomTag:'personalizado',
    experimental:'Experimental',
    experimentalDesc:'Funciones y experimentos de diseño solo para PC',
    expUiLayout:'Diseño UI Experimental',
    expUiLayoutDesc:'Reorganiza la posición de los botones para escritorio. SOLO PC.',
    expUiOff:'Desactivado (Predeterminado)',
    expUiSidebar:'Navegación Lateral',
    expUiTopbar:'Barra Superior Compacta',
    expAurora:'Aurora — Brillo Nórdico',
    expensesByCat:'Gastos por Categoría',
    expObsidian:'Obsidian — Mármol Oscuro',
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
    noExpenseData:'Пока нет данных о расходах', totalExpenses:'всего расходов',
    incomeLegend:'Доход', expenseLegend:'Расход',
    biggestSpend:'Наибольший расход', bestIncome:'Лучший доход', highestSpend:'Самый большой расход',
    addTxForTrends:'Добавьте операции, чтобы увидеть тренды.',
    addTxForHistory:'Добавьте операции, чтобы увидеть историю баланса',
    avgExpense:'Средний расход', currentBalance:'Текущий баланс',
    phName:'напр. Продукты', phAmount:'0,00', phNote:'Добавить заметку…',
    phGoal:'Укажите целевую сумму', phSongTitle:'Название песни',
    phCatSymbol:'напр. ◆', phCatName:'напр. Игры',
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
    galaxyMode:'Режим Галактика',
    galaxyModeDesc:'Экспериментально: эффекты туманности и космоса в тёмной теме',
    expTheme:'Экспериментальная Тема',
    expThemeDesc:'Попробуйте совершенно другой вид. По умолчанию выключено.',
    expOff:'Выкл. (По умолчанию)',
    expMono:'Mono — Брутализм',
    expCumulus:'Cumulus — Неоморфизм',
    expLedger:'Ledger — Редакционный',
    expPrism:'Prism — Стекло + Неон',
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
    clickExpand:'Нажмите чтобы развернуть',
    selectSongBelow:'Выберите песню ниже',
    loopAll:'↻ Все',
    loopOne:'↺ Одна',
    loopRandom:'⇄ Случайно',
    volMinus:'гр−',
    volPlus:'гр+',
    audioFile:'Аудиофайл',
    chooseAudio:'Выберите аудиофайл…',
    songTitleLabel:'Название',
    trimSong:'Обрезать Песню',
    startLabel:'Начало:',
    endLabel:'Конец:',
    addSongBtn:'Добавить Песню',
    addCustomCategoryHeader:'Добавить Свою Категорию',
    symbolLabel:'Символ',
    symbolHint:'Выберите символ (напр. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Название Категории',
    addCategoryBtn:'Добавить Категорию',
    addCustomSong:'Добавить Свою Песню',
    noCustomCats:'Пока нет своих категорий.',
    editTip:'Изменить',
    deleteTip:'Удалить',
    removeTip:'Убрать',
    playSongTip:'Воспроизвести эту песню',
    enableDisableTip:'Включить/Выключить',
    swapCurrencies:'Поменять валюты',
    copyClipboard:'Копировать в буфер',
    noAudio:'Нет аудио — добавьте через + Добавить Песню',
    unknownSong:'Неизвестно',
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
    songCustomTag:'своё',
    experimental:'Экспериментальное',
    experimentalDesc:'Функции и эксперименты с интерфейсом только для ПК',
    expUiLayout:'Экспериментальный Интерфейс',
    expUiLayoutDesc:'Перемещает кнопки для использования на ПК. ТОЛЬКО ДЛЯ ПК.',
    expUiOff:'Выкл. (По умолчанию)',
    expUiSidebar:'Боковая Навигация',
    expUiTopbar:'Компактная Панель',
    expAurora:'Aurora — Северное Сияние',
    expensesByCat:'Расходы по Категориям',
    expObsidian:'Obsidian — Тёмный Мрамор',
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
    noExpenseData:'Henüz harcama verisi yok', totalExpenses:'toplam harcama',
    incomeLegend:'Gelir', expenseLegend:'Gider',
    biggestSpend:'En büyük harcama', bestIncome:'En iyi gelir', highestSpend:'En yüksek harcama',
    addTxForTrends:'Aylık eğilimleri görmek için işlem ekleyin.',
    addTxForHistory:'Bakiye geçmişini görmek için işlem ekleyin',
    avgExpense:'Ortalama harcama', currentBalance:'Mevcut bakiye',
    phName:'ör. Market alışverişi', phAmount:'0,00', phNote:'Bir not ekle…',
    phGoal:'Hedef tutar belirle', phSongTitle:'Şarkı adı',
    phCatSymbol:'ör. ◆', phCatName:'ör. Oyun',
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
    galaxyMode:'Galaksi Modu',
    galaxyModeDesc:'Deneysel: koyu modda nebula ve derin uzay efektleri',
    expTheme:'Deneysel Tema',
    expThemeDesc:'Tamamen farklı bir görünüm dene. Varsayılan olarak kapalı.',
    expOff:'Kapalı (Varsayılan)',
    expMono:'Mono — Brütalist',
    expCumulus:'Cumulus — Neumorfik',
    expLedger:'Ledger — Editöryel',
    expPrism:'Prism — Cam + Neon',
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
    clickExpand:'Genişletmek için tıkla',
    selectSongBelow:'Aşağıdan bir şarkı seçin',
    loopAll:'↻ Tümü',
    loopOne:'↺ Tek',
    loopRandom:'⇄ Karışık',
    volMinus:'ses−',
    volPlus:'ses+',
    audioFile:'Ses Dosyası',
    chooseAudio:'Ses dosyası seç…',
    songTitleLabel:'Başlık',
    trimSong:'Şarkıyı Kırp',
    startLabel:'Başlangıç:',
    endLabel:'Bitiş:',
    addSongBtn:'Şarkı Ekle',
    addCustomCategoryHeader:'Özel Kategori Ekle',
    symbolLabel:'Sembol',
    symbolHint:'Bir sembol seç (ör. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategori Adı',
    addCategoryBtn:'Kategori Ekle',
    addCustomSong:'Özel Şarkı Ekle',
    noCustomCats:'Henüz özel kategori yok.',
    editTip:'Düzenle',
    deleteTip:'Sil',
    removeTip:'Kaldır',
    playSongTip:'Bu şarkıyı çal',
    enableDisableTip:'Aç/Kapat',
    swapCurrencies:'Para birimlerini değiştir',
    copyClipboard:'Panoya kopyala',
    noAudio:'Ses yok — + Şarkı Ekle ile ekleyin',
    unknownSong:'Bilinmiyor',
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
    songCustomTag:'özel',
    experimental:'Deneysel',
    experimentalDesc:'Yalnızca PC için arayüz deneyleri ve özellikler',
    expUiLayout:'Deneysel Arayüz Düzeni',
    expUiLayoutDesc:'Masaüstü kullanımı için buton konumlarını değiştirir. YALNIZCA PC.',
    expUiOff:'Kapalı (Varsayılan)',
    expUiSidebar:'Kenar Çubuğu Navigasyonu',
    expUiTopbar:'Kompakt Üst Çubuk',
    expAurora:'Aurora — Kuzey Işıkları',
    expensesByCat:'Kategoriye Göre Gider',
    expObsidian:'Obsidian — Koyu Mermer',
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
    noExpenseData:'Noch keine Ausgabendaten', totalExpenses:'Gesamtausgaben',
    incomeLegend:'Einnahmen', expenseLegend:'Ausgaben',
    biggestSpend:'Größte Ausgabe', bestIncome:'Beste Einnahme', highestSpend:'Höchste Ausgabe',
    addTxForTrends:'Füge Transaktionen hinzu, um Monatstrends zu sehen.',
    addTxForHistory:'Füge Transaktionen hinzu, um den Saldoverlauf zu sehen',
    avgExpense:'Ø Ausgabe', currentBalance:'Aktueller Saldo',
    phName:'z. B. Lebensmitteleinkauf', phAmount:'0,00', phNote:'Notiz hinzufügen…',
    phGoal:'Zielbetrag festlegen', phSongTitle:'Songname',
    phCatSymbol:'z. B. ◆', phCatName:'z. B. Gaming',
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
    galaxyMode:'Galaxie-Modus',
    galaxyModeDesc:'Experimentell: Nebel- und Weltraumeffekte im Dunkelmodus',
    expTheme:'Experimentelles Thema',
    expThemeDesc:'Probiere ein völlig anderes Aussehen. Standardmäßig aus.',
    expOff:'Aus (Standard)',
    expMono:'Mono — Brutalistisch',
    expCumulus:'Cumulus — Neumorph',
    expLedger:'Ledger — Editorial',
    expPrism:'Prism — Glas + Neon',
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
    clickExpand:'Klicken zum Erweitern',
    selectSongBelow:'Wähle einen Song unten',
    loopAll:'↻ Alle',
    loopOne:'↺ Eins',
    loopRandom:'⇄ Zufällig',
    volMinus:'Lt−',
    volPlus:'Lt+',
    audioFile:'Audiodatei',
    chooseAudio:'Audiodatei wählen…',
    songTitleLabel:'Titel',
    trimSong:'Song zuschneiden',
    startLabel:'Anfang:',
    endLabel:'Ende:',
    addSongBtn:'Song hinzufügen',
    addCustomCategoryHeader:'Eigene Kategorie hinzufügen',
    symbolLabel:'Symbol',
    symbolHint:'Wähle ein Symbol (z. B. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategoriename',
    addCategoryBtn:'Kategorie hinzufügen',
    addCustomSong:'Eigenen Song hinzufügen',
    noCustomCats:'Noch keine eigenen Kategorien.',
    editTip:'Bearbeiten',
    deleteTip:'Löschen',
    removeTip:'Entfernen',
    playSongTip:'Diesen Song abspielen',
    enableDisableTip:'Aktivieren/Deaktivieren',
    swapCurrencies:'Währungen tauschen',
    copyClipboard:'In Zwischenablage kopieren',
    noAudio:'Kein Audio — über + Song hinzufügen ergänzen',
    unknownSong:'Unbekannt',
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
    songCustomTag:'eigen',
    experimental:'Experimentell',
    experimentalDesc:'Nur-PC-Funktionen und Layout-Experimente',
    expUiLayout:'Experimentelles UI-Layout',
    expUiLayoutDesc:'Verändert die Button-Positionen für Desktop-Nutzung. NUR PC.',
    expUiOff:'Aus (Standard)',
    expUiSidebar:'Seitenleisten-Navigation',
    expUiTopbar:'Kompakte Kopfleiste',
    expAurora:'Aurora — Nordisches Leuchten',
    expensesByCat:'Ausgaben nach Kategorie',
    expObsidian:'Obsidian — Dunkler Marmor',
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
    noExpenseData:'هنوز داده‌ای برای هزینه‌ها وجود ندارد',
    totalExpenses:'مجموع هزینه‌ها',
    incomeLegend:'درآمد', expenseLegend:'هزینه',
    biggestSpend:'بیشترین هزینه', bestIncome:'بهترین درآمد', highestSpend:'بالاترین هزینه',
    addTxForTrends:'برای دیدن روند ماهانه، تراکنش اضافه کنید.',
    addTxForHistory:'برای دیدن تاریخچه موجودی، تراکنش اضافه کنید',
    avgExpense:'میانگین هزینه', currentBalance:'موجودی فعلی',
    phName:'مثلاً خرید خواروبار', phAmount:'۰٫۰۰', phNote:'یادداشتی اضافه کنید…',
    phGoal:'مبلغ هدف را تعیین کنید', phSongTitle:'نام آهنگ',
    phCatSymbol:'مثلاً ◆', phCatName:'مثلاً بازی',
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
    galaxyMode:'حالت کهکشان',
    galaxyModeDesc:'آزمایشی: جلوه‌های سحابی و فضای عمیق در حالت تاریک',
    expTheme:'تم آزمایشی',
    expThemeDesc:'یک ظاهر کاملاً متفاوت را امتحان کنید. به‌طور پیش‌فرض خاموش است.',
    expOff:'خاموش (پیش‌فرض)',
    expMono:'مونو — برتالیست',
    expCumulus:'کومولوس — نئومورفیک',
    expLedger:'لجر — تحریری',
    expPrism:'پریزم — شیشه + نئون',
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
    clickExpand:'برای گسترش کلیک کنید',
    selectSongBelow:'یک آهنگ از پایین انتخاب کنید',
    loopAll:'↻ همه',
    loopOne:'↺ یکی',
    loopRandom:'⇄ تصادفی',
    volMinus:'صدا−',
    volPlus:'صدا+',
    audioFile:'فایل صوتی',
    chooseAudio:'فایل صوتی را انتخاب کنید…',
    songTitleLabel:'عنوان',
    trimSong:'برش آهنگ',
    startLabel:'شروع:',
    endLabel:'پایان:',
    addSongBtn:'افزودن آهنگ',
    addCustomCategoryHeader:'افزودن دسته‌بندی سفارشی',
    symbolLabel:'نماد',
    symbolHint:'یک نماد انتخاب کنید (مثلاً ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'نام دسته‌بندی',
    addCategoryBtn:'افزودن دسته‌بندی',
    addCustomSong:'افزودن آهنگ سفارشی',
    noCustomCats:'هنوز دسته‌بندی سفارشی وجود ندارد.',
    editTip:'ویرایش',
    deleteTip:'حذف',
    removeTip:'برداشتن',
    playSongTip:'این آهنگ را پخش کن',
    enableDisableTip:'فعال/غیرفعال',
    swapCurrencies:'تعویض ارزها',
    copyClipboard:'کپی در کلیپ‌بورد',
    noAudio:'بدون صدا — از طریق + افزودن آهنگ خود اضافه کنید',
    unknownSong:'نامشخص',
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
    songCustomTag:'سفارشی',
    experimental:'آزمایشی',
    experimentalDesc:'ویژگی‌ها و آزمایش‌های رابط کاربری فقط برای PC',
    expUiLayout:'چیدمان رابط آزمایشی',
    expUiLayoutDesc:'موقعیت دکمه‌ها را برای استفاده دسکتاپ تغییر می‌دهد. فقط PC.',
    expUiOff:'خاموش (پیش‌فرض)',
    expUiSidebar:'ناوبری نوار کناری',
    expUiTopbar:'نوار بالایی فشرده',
    expAurora:'آئورا — درخشش نوردیک',
    expensesByCat:'هزینه‌ها بر اساس دسته‌بندی',
    expObsidian:'ابسیدین — مرمر تیره',
  },

  it: {
      totalBalance:'SALDO TOTALE', savingGoal:'Obiettivo di risparmio', setGoal:'Imposta un obiettivo per monitorare i progressi',
      analytics:'Analisi', spending:'Spese', monthly:'Mensile', balance:'Saldo',
      recentTx:'Transazioni recenti', viewAll:'Vedi tutto →', noTx:'Nessuna transazione. Tocca + per aggiungerne una.',
      newTx:'Nuova transazione', editTx:'Modifica transazione', name:'Nome', amount:'Importo',
      category:'Categoria', note:'Nota', type:'Tipo', income:'↑ Entrata', expense:'↓ Uscita',
      cancel:'Annulla', add:'Aggiungi', save:'Salva', delete:'Elimina',
      allTx:'Tutte le transazioni', clearAll:'Cancella tutto', searchTx:'Cerca transazioni…',
      sort:'Ordina:', sortName:'Nome', sortAmount:'Importo', sortDate:'Data', sortCat:'Categoria',
      noMatch:'Nessuna transazione corrisponde ai filtri.', clearFilters:'Cancella filtri',
      settings:'Impostazioni', general:'Generale', confirmDelete:'Conferma eliminazione',
      confirmDeleteDesc:'Chiedi prima di eliminare una transazione', tsFormat:'Formato timestamp',
      tsFormatDesc:'Mostrato su ogni transazione', dateTime:'Data e ora', dateOnly:'Solo data',
      maxShown:'Transazioni recenti mostrate', maxShownDesc:'Visibili nella schermata principale (5–20)',
      liquidGlass:'Interfaccia Liquid Glass', liquidGlassDesc:'Stile vetro smerigliato',
      language:'Lingua', languageDesc:'Lingua dell\'interfaccia',
      music:'Musica', ambiancePlayer:'Player ambiente', ambiancePlayerDesc:'Clicca sull\'icona per espandere i controlli',
      addSong:'+ Aggiungi la tua canzone', data:'Dati', exportData:'⬆ Esporta dati', importData:'⬇ Importa dati',
      dataDesc:'Esporta tutte le transazioni, saldo, impostazioni e preferenze in un file .json.',
      deleteTx:'Eliminare transazione?', clearAllConfirm:'Questo eliminerà definitivamente tutte le transazioni e azzererà il saldo. Non può essere annullato.',
      yesDelete:'Sì, cancella tutto', currencyChange:'Cambio valuta', keepValues:'Mantieni valori', convert:'Converti',
      currencyConverter:'Convertitore di valuta', from:'Da', to:'A', popularPairs:'Coppie popolari',
      theme:'Tema ▾', txDeleted:'Transazione eliminata', undo:'Annulla',
      noExpenseData:'Nessun dato sulle spese', totalExpenses:'spese totali',
      incomeLegend:'Entrate', expenseLegend:'Spese',
      biggestSpend:'Spesa maggiore', bestIncome:'Entrata migliore', highestSpend:'Spesa più alta',
      addTxForTrends:'Aggiungi transazioni per vedere le tendenze mensili.',
      addTxForHistory:'Aggiungi transazioni per vedere la cronologia del saldo',
      avgExpense:'Spesa media', currentBalance:'Saldo attuale',
      phName:'es. Spesa alimentare', phAmount:'0.00', phNote:'Aggiungi una nota…',
      phGoal:'Imposta importo obiettivo', phSongTitle:'Nome canzone',
      phCatSymbol:'es. ◆', phCatName:'es. Gaming',
      added:'Aggiunto',

      about_engine:'MOTORE',
      about_label:'PROGETTO',
      about_author:'Autore',
      about_hosted:'Ospitato su',
      about_candidate:'Candidato per',
      about_directed:'Diretto da',
      about_academy:'Accademia',
      currencyConverterTitle:'Convertitore di valuta',
      addTransactionTip:'Aggiungi transazione',
      addCustomCategoryTip:'Aggiungi categoria personalizzata',
      filterTip:'Filtro',
      galaxyMode:'Modalità Galassia',
      galaxyModeDesc:'Sperimentale: effetti nebulosa e spazio profondo in modalità scura',
      expTheme:'Tema sperimentale',
      expThemeDesc:'Prova un aspetto completamente diverso. Disattivato per default.',
      expOff:'Off (Predefinito)',
      expMono:'Mono — Brutalista',
      expCumulus:'Cumulus — Neumorfico',
      expLedger:'Ledger — Editoriale',
      expPrism:'Prism — Vetro + Neon',
      customCategories:'Categorie personalizzate',
      addCustomCategory:'+ Aggiungi categoria personalizzata',
      quickTransactions:'Transazioni rapide',
      quickTransactionsHeader:'TRANSAZIONI RAPIDE',
      quickTxManageDesc:'Gestisci le tue transazioni rapide salvate (max',
      noQuickTxSaved:'Nessuna transazione rapida salvata.',
      noQuickTxYet:'Nessuna transazione rapida. Segna una transazione come predefinita quando la aggiungi.',
      saveAsQuick:'Salva come transazione rapida',
      saveAsQuickDesc:'Aggiunge questa al pannello per riutilizzo veloce',
      lightDarkTip:'Modalità Chiaro/Scuro',
      settingsTip:'Impostazioni',
      liteBtn:'Lite',
      fullBtn:'Completo',
      clickExpand:'Clicca per espandere',
      selectSongBelow:'Seleziona una canzone sotto',
      loopAll:'↻ Tutto',
      loopOne:'↺ Una',
      loopRandom:'⇄ Casuale',
      volMinus:'vol−',
      volPlus:'vol+',
      audioFile:'File audio',
      chooseAudio:'Scegli file audio…',
      songTitleLabel:'Titolo',
      trimSong:'Taglia canzone',
      startLabel:'Inizio:',
      endLabel:'Fine:',
      addSongBtn:'Aggiungi canzone',
      addCustomCategoryHeader:'Aggiungi categoria personalizzata',
      symbolLabel:'Simbolo',
      symbolHint:'Scegli un simbolo (es. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
      categoryName:'Nome categoria',
      addCategoryBtn:'Aggiungi categoria',
      addCustomSong:'Aggiungi canzone personalizzata',
      noCustomCats:'Nessuna categoria personalizzata.',
      editTip:'Modifica',
      deleteTip:'Elimina',
      removeTip:'Rimuovi',
      playSongTip:'Riproduci questa canzone',
      enableDisableTip:'Attiva/Disattiva',
      swapCurrencies:'Scambia valute',
      copyClipboard:'Copia negli appunti',
      noAudio:'Nessun audio — aggiungi con + Aggiungi la tua canzone',
      unknownSong:'Sconosciuto',
      fetchingRate:'Recupero tasso in tempo reale…',
      cantFetchRate:'Impossibile ottenere il tasso. Puoi comunque cambiare valuta senza conversione.',
      liveRateVia:'Tasso live tramite Open Exchange Rates',
      liveRateFrankfurter:'Tasso live tramite frankfurter.app',
      unableFetch:'Impossibile recuperare',
      checkConnection:'Controlla la connessione',
      currencySwitchPrompt:'Stai passando da {from} a {to}. Vuoi convertire i valori usando il tasso attuale?',
      deleteConfirmText:'Eliminare "{name}" ({sign}{currency}{amount})? Non può essere annullato.',
      optional:'(opzionale)',
      totalBalanceShort:'SALDO TOTALE',
      songCustomTag:'personalizzata',

      experimental:'Sperimentale',
      experimentalDesc:'Funzionalità PC e layout sperimentali',
      expUiLayout:'Layout UI sperimentale',
      expUiLayoutDesc:'Riorganizza i pulsanti per desktop. SOLO PC.',
      expUiOff:'Off (Predefinito)',
      expUiSidebar:'Navigazione laterale',
      expUiTopbar:'Topbar compatta',

      expAurora:'Aurora — Bagliore nordico',
      expensesByCat:'Spese per categoria',
      expObsidian:'Obsidian — Marmo scuro',
    },

  sv: {
    totalBalance:'TOTALT SALDO', savingGoal:'Sparmål', setGoal:'Sätt ett mål för att följa dina framsteg',
    analytics:'Analys', spending:'Utgifter', monthly:'Månadsvis', balance:'Saldo',
    recentTx:'Senaste transaktioner', viewAll:'Visa alla →', noTx:'Inga transaktioner ännu. Tryck + för att lägga till.',
    newTx:'Ny transaktion', editTx:'Redigera transaktion', name:'Namn', amount:'Belopp',
    category:'Kategori', note:'Anteckning', type:'Typ', income:'↑ Inkomst', expense:'↓ Utgift',
    cancel:'Avbryt', add:'Lägg till', save:'Spara', delete:'Ta bort',
    allTx:'Alla transaktioner', clearAll:'Rensa alla', searchTx:'Sök transaktioner…',
    sort:'Sortera:', sortName:'Namn', sortAmount:'Belopp', sortDate:'Datum', sortCat:'Kategori',
    noMatch:'Inga transaktioner matchar dina filter.', clearFilters:'Rensa filter',
    settings:'Inställningar', general:'Allmänt', confirmDelete:'Bekräfta borttagning',
    confirmDeleteDesc:'Fråga innan en transaktion tas bort', tsFormat:'Tidsformat',
    tsFormatDesc:'Visas på varje transaktion', dateTime:'Datum och tid', dateOnly:'Endast datum',
    maxShown:'Visade senaste transaktioner', maxShownDesc:'Synliga på startsidan (5–20)',
    liquidGlass:'Liquid Glass UI', liquidGlassDesc:'Frostat glas-design',
    language:'Språk', languageDesc:'Appens språk',
    music:'Musik', ambiancePlayer:'Ambience-spelare', ambiancePlayerDesc:'Klicka på ikonen för att visa kontroller',
    addSong:'+ Lägg till egen låt', data:'Data', exportData:'⬆ Exportera data', importData:'⬇ Importera data',
    dataDesc:'Exporterar alla transaktioner, saldo, inställningar och preferenser som en .json-fil.',
    deleteTx:'Ta bort transaktion?', clearAllConfirm:'Detta raderar alla transaktioner permanent och återställer saldot till noll. Kan inte ångras.',
    yesDelete:'Ja, rensa alla', currencyChange:'Valutabyte', keepValues:'Behåll värden', convert:'Konvertera',
    currencyConverter:'Valutaomvandlare', from:'Från', to:'Till', popularPairs:'Populära par',
    theme:'Tema ▾', txDeleted:'Transaktion borttagen', undo:'Ångra',
    noExpenseData:'Inga utgiftsdata ännu', totalExpenses:'totala utgifter',
    incomeLegend:'Inkomst', expenseLegend:'Utgifter',
    biggestSpend:'Största utgift', bestIncome:'Bästa inkomst', highestSpend:'Högsta utgift',
    addTxForTrends:'Lägg till transaktioner för att se månatliga trender.',
    addTxForHistory:'Lägg till transaktioner för att se saldohistorik',
    avgExpense:'Genomsnittlig utgift', currentBalance:'Nuvarande saldo',
    phName:'t.ex. Matinköp', phAmount:'0.00', phNote:'Lägg till en anteckning…',
    phGoal:'Sätt målbelopp', phSongTitle:'Låtnamn',
    phCatSymbol:'t.ex. ◆', phCatName:'t.ex. Gaming',
    added:'Tillagd',

    about_engine:'MOTOR',
    about_record:'Hur spelar du in?',
    about_question:'Fråga: ',
    about_label:'PROJEKT',
    about_author:'Författare',
    about_hosted:'Hostad på',
    about_candidate:'Kandidat för',
    about_directed:'Regisserad av',
    about_academy:'Akademi',
    currencyConverterTitle:'Valutaomvandlare',
    addTransactionTip:'Lägg till transaktion',
    addCustomCategoryTip:'Lägg till anpassad kategori',
    filterTip:'Filter',
    galaxyMode:'Galaxy-läge',
    galaxyModeDesc:'Experimentellt: nebulosa- och rymdeffekter i mörkt läge',
    expTheme:'Experimentellt tema',
    expThemeDesc:'Prova ett helt annat utseende. Av som standard.',
    expOff:'Av (Standard)',
    expMono:'Mono — Brutalistisk',
    expCumulus:'Cumulus — Neumorfisk',
    expLedger:'Ledger — Redaktionell',
    expPrism:'Prism — Glas + Neon',
    customCategories:'Anpassade kategorier',
    addCustomCategory:'+ Lägg till anpassad kategori',
    quickTransactions:'Snabba transaktioner',
    quickTransactionsHeader:'SNABBA TRANSAKTIONER',
    quickTxManageDesc:'Hantera dina sparade snabba transaktioner (max',
    noQuickTxSaved:'Inga snabba transaktioner sparade.',
    noQuickTxYet:'Inga snabba transaktioner ännu. Markera en som fördefinierad när du lägger till.',
    saveAsQuick:'Spara som snabb transaktion',
    saveAsQuickDesc:'Lägger till denna i panelen för snabb återanvändning',
    lightDarkTip:'Ljust/Mörkt läge',
    settingsTip:'Inställningar',
    liteBtn:'Lite',
    fullBtn:'Full',
    clickExpand:'Klicka för att expandera',
    selectSongBelow:'Välj en låt nedan',
    loopAll:'↻ Alla',
    loopOne:'↺ En',
    loopRandom:'⇄ Slump',
    volMinus:'vol−',
    volPlus:'vol+',
    audioFile:'Ljudfil',
    chooseAudio:'Välj ljudfil…',
    songTitleLabel:'Titel',
    trimSong:'Trimma låt',
    startLabel:'Start:',
    endLabel:'Slut:',
    addSongBtn:'Lägg till låt',
    addCustomCategoryHeader:'Lägg till anpassad kategori',
    symbolLabel:'Symbol',
    symbolHint:'Välj en symbol (t.ex. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategorinamn',
    addCategoryBtn:'Lägg till kategori',
    addCustomSong:'Lägg till egen låt',
    noCustomCats:'Inga anpassade kategorier ännu.',
    editTip:'Redigera',
    deleteTip:'Ta bort',
    removeTip:'Ta bort',
    playSongTip:'Spela denna låt',
    enableDisableTip:'Aktivera/Inaktivera',
    swapCurrencies:'Byt valutor',
    copyClipboard:'Kopiera till urklipp',
    noAudio:'Ingen ljudfil — lägg till via + Lägg till egen låt',
    unknownSong:'Okänd',
    fetchingRate:'Hämtar livekurs…',
    cantFetchRate:'Kunde inte hämta kurs. Du kan ändå byta valuta utan konvertering.',
    liveRateVia:'Livekurs via Open Exchange Rates',
    liveRateFrankfurter:'Livekurs via frankfurter.app',
    unableFetch:'Kunde inte hämta',
    checkConnection:'Kontrollera anslutningen',
    currencySwitchPrompt:'Du byter från {from} till {to}. Vill du konvertera dina värden med dagens kurs?',
    deleteConfirmText:'Ta bort "{name}" ({sign}{currency}{amount})? Detta kan inte ångras.',
    optional:'(valfritt)',
    totalBalanceShort:'TOTALT SALDO',
    songCustomTag:'anpassad',

    experimental:'Experimentellt',
    experimentalDesc:'PC-funktioner och layouttester',
    expUiLayout:'Experimentell UI-layout',
    expUiLayoutDesc:'Omorganiserar knappar för desktop. ENDAST PC.',
    expUiOff:'Av (Standard)',
    expUiSidebar:'Sidofält',
    expUiTopbar:'Kompakt toppfält',

    expAurora:'Aurora — Nordiskt sken',
    expensesByCat:'Utgifter per kategori',
    expObsidian:'Obsidian — Mörk marmor',
  },

  no: {
    totalBalance:'TOTAL SALDO', savingGoal:'Sparemål', setGoal:'Sett et mål for å følge fremgangen din',
    analytics:'Analyse', spending:'Utgifter', monthly:'Månedlig', balance:'Saldo',
    recentTx:'Nylige transaksjoner', viewAll:'Se alle →', noTx:'Ingen transaksjoner ennå. Trykk + for å legge til.',
    newTx:'Ny transaksjon', editTx:'Rediger transaksjon', name:'Navn', amount:'Beløp',
    category:'Kategori', note:'Notat', type:'Type', income:'↑ Inntekt', expense:'↓ Utgift',
    cancel:'Avbryt', add:'Legg til', save:'Lagre', delete:'Slett',
    allTx:'Alle transaksjoner', clearAll:'Slett alle', searchTx:'Søk transaksjoner…',
    sort:'Sorter:', sortName:'Navn', sortAmount:'Beløp', sortDate:'Dato', sortCat:'Kategori',
    noMatch:'Ingen transaksjoner samsvarer med filtrene.', clearFilters:'Fjern filtre',
    settings:'Innstillinger', general:'Generelt', confirmDelete:'Bekreft sletting',
    confirmDeleteDesc:'Be om bekreftelse før sletting av en transaksjon',
    tsFormat:'Tidsformat', tsFormatDesc:'Vises på hver transaksjon',
    dateTime:'Dato og tid', dateOnly:'Kun dato',
    maxShown:'Antall viste transaksjoner', maxShownDesc:'Synlig på hovedskjermen (5–20)',
    liquidGlass:'Liquid Glass-grensesnitt', liquidGlassDesc:'Frostet glass-estetikk',
    language:'Språk', languageDesc:'Applikasjonsspråk',
    music:'Musikk', ambiancePlayer:'Ambiensspiller', ambiancePlayerDesc:'Klikk på ikonet for å utvide kontroller',
    addSong:'+ Legg til egen sang', data:'Data', exportData:'⬆ Eksporter data', importData:'⬇ Importer data',
    dataDesc:'Eksporterer alle transaksjoner, saldo, innstillinger og preferanser som en .json-fil.',
    deleteTx:'Slette transaksjon?', clearAllConfirm:'Dette vil permanent slette alle transaksjoner og tilbakestille saldoen til null. Dette kan ikke angres.',
    yesDelete:'Ja, slett alle', currencyChange:'Valutaendring', keepValues:'Behold verdier', convert:'Konverter',
    currencyConverter:'Valutaomregner', from:'Fra', to:'Til', popularPairs:'Populære valutapar',
    theme:'Tema ▾', txDeleted:'Transaksjon slettet', undo:'Angre',

    noExpenseData:'Ingen utgiftsdata ennå', totalExpenses:'totale utgifter',
    incomeLegend:'Inntekt', expenseLegend:'Utgift',
    biggestSpend:'Største utgift', bestIncome:'Beste inntekt', highestSpend:'Høyeste utgift',
    addTxForTrends:'Legg til transaksjoner for å se månedlige trender.',
    addTxForHistory:'Legg til transaksjoner for å se saldohistorikk',
    avgExpense:'Gjennomsnittlig utgift', currentBalance:'Nåværende saldo',

    phName:'f.eks. Dagligvarer', phAmount:'0.00', phNote:'Legg til et notat…',
    phGoal:'Sett målbeløp', phSongTitle:'Sangtittel',
    phCatSymbol:'f.eks. ◆', phCatName:'f.eks. Gaming',
    added:'Lagt til',

    about_engine:'MOTOR', about_label:'PROSJEKT', about_author:'Forfatter',
    about_hosted:'Hostet på', about_candidate:'Kandidat for', about_directed:'Regissert av', about_academy:'Akademi',

    currencyConverterTitle:'Valutaomregner',
    addTransactionTip:'Legg til transaksjon',
    addCustomCategoryTip:'Legg til egendefinert kategori',
    filterTip:'Filter',

    galaxyMode:'Galaksemodus',
    galaxyModeDesc:'Eksperimentelt: tåke- og romeffekter i mørk modus',

    expTheme:'Eksperimentelt tema',
    expThemeDesc:'Prøv et helt nytt utseende. Av som standard.',
    expOff:'Av (standard)',
    expMono:'Mono — Brutalistisk',
    expCumulus:'Cumulus — Neumorfisk',
    expLedger:'Ledger — Redaksjonell',
    expPrism:'Prism — Glass + Neon',

    customCategories:'Egendefinerte kategorier',
    addCustomCategory:'+ Legg til egendefinert kategori',

    quickTransactions:'Hurtigtransaksjoner',
    quickTransactionsHeader:'HURTIGTRANSAKSJONER',
    quickTxManageDesc:'Administrer lagrede hurtigtransaksjoner (maks',
    noQuickTxSaved:'Ingen hurtigtransaksjoner lagret.',
    noQuickTxYet:'Ingen hurtigtransaksjoner ennå. Merk en som forhåndsdefinert ved opprettelse.',
    saveAsQuick:'Lagre som hurtigtransaksjon',
    saveAsQuickDesc:'Legger til i panelet for rask gjenbruk',

    lightDarkTip:'Lys/Mørk modus',
    settingsTip:'Innstillinger',

    liteBtn:'Lite', fullBtn:'Full',

    clickExpand:'Klikk for å utvide',
    selectSongBelow:'Velg en sang nedenfor',

    loopAll:'↻ Alle', loopOne:'↺ Én', loopRandom:'⇄ Tilfeldig',

    volMinus:'vol−', volPlus:'vol+',

    audioFile:'Lydfil', chooseAudio:'Velg lydfil…',

    songTitleLabel:'Tittel',
    trimSong:'Trim sang',
    startLabel:'Start:', endLabel:'Slutt:',

    addSongBtn:'Legg til sang',

    addCustomCategoryHeader:'Legg til egendefinert kategori',
    symbolLabel:'Symbol',
    symbolHint:'Velg et symbol (f.eks. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Kategorinavn',
    addCategoryBtn:'Legg til kategori',

    addCustomSong:'Legg til egendefinert sang',
    noCustomCats:'Ingen egendefinerte kategorier ennå.',

    editTip:'Rediger', deleteTip:'Slett', removeTip:'Fjern',

    playSongTip:'Spill denne sangen',
    enableDisableTip:'Aktiver/Deaktiver',

    swapCurrencies:'Bytt valutaer',
    copyClipboard:'Kopier til utklippstavle',

    noAudio:'Ingen lyd — legg til via + Legg til egen sang',
    unknownSong:'Ukjent',

    fetchingRate:'Henter sanntidskurs…',
    cantFetchRate:'Kunne ikke hente kurs. Du kan fortsatt bytte valuta uten konvertering.',
    liveRateVia:'Sanntidskurs via Open Exchange Rates',
    liveRateFrankfurter:'Sanntidskurs via frankfurter.app',
    unableFetch:'Kunne ikke hente',
    checkConnection:'Sjekk tilkoblingen',

    currencySwitchPrompt:'Du bytter fra {from} til {to}. Vil du konvertere verdiene dine med dagens kurs?',
    deleteConfirmText:'Slette "{name}" ({sign}{currency}{amount})? Dette kan ikke angres.',

    optional:'(valgfritt)',
    totalBalanceShort:'TOTAL SALDO',
    songCustomTag:'egendefinert',

    experimental:'Eksperimentelt',
    experimentalDesc:'PC-funksjoner og layouttester',
    expUiLayout:'Eksperimentell UI-layout',
    expUiLayoutDesc:'Omorganiserer knapper for desktop. KUN PC.',
    expUiOff:'Av (standard)',
    expUiSidebar:'Sidepanel',
    expUiTopbar:'Kompakt toppfelt',

    expAurora:'Aurora — Nordlys',
    expensesByCat:'Utgifter etter kategori',
    expObsidian:'Obsidian — Mørk marmor',
  },
  pl: {
    totalBalance:'CAŁKOWITE SALDO', savingGoal:'Cel oszczędnościowy', setGoal:'Ustaw cel, aby śledzić postępy',
    analytics:'Analiza', spending:'Wydatki', monthly:'Miesięcznie', balance:'Saldo',
    recentTx:'Ostatnie transakcje', viewAll:'Zobacz wszystko →', noTx:'Brak transakcji. Naciśnij +, aby dodać.',
    newTx:'Nowa transakcja', editTx:'Edytuj transakcję', name:'Nazwa', amount:'Kwota',
    category:'Kategoria', note:'Notatka', type:'Typ', income:'↑ Dochód', expense:'↓ Wydatek',
    cancel:'Anuluj', add:'Dodaj', save:'Zapisz', delete:'Usuń',
    allTx:'Wszystkie transakcje', clearAll:'Wyczyść wszystko', searchTx:'Szukaj transakcji…',
    sort:'Sortuj:', sortName:'Nazwa', sortAmount:'Kwota', sortDate:'Data', sortCat:'Kategoria',
    noMatch:'Brak transakcji pasujących do filtrów.', clearFilters:'Wyczyść filtry',
    settings:'Ustawienia', general:'Ogólne', confirmDelete:'Potwierdź usunięcie',
    confirmDeleteDesc:'Zapytaj przed usunięciem transakcji', tsFormat:'Format czasu',
    tsFormatDesc:'Wyświetlany przy każdej transakcji', dateTime:'Data i godzina', dateOnly:'Tylko data',
    maxShown:'Wyświetlane ostatnie transakcje', maxShownDesc:'Widoczne na ekranie głównym (5–20)',
    liquidGlass:'Interfejs Liquid Glass', liquidGlassDesc:'Efekt matowego szkła',
    language:'Język', languageDesc:'Język aplikacji',
    music:'Muzyka', ambiancePlayer:'Odtwarzacz ambientowy', ambiancePlayerDesc:'Kliknij ikonę, aby rozwinąć sterowanie',
    addSong:'+ Dodaj własny utwór', data:'Dane', exportData:'⬆ Eksportuj dane', importData:'⬇ Importuj dane',
    dataDesc:'Eksportuje wszystkie transakcje, saldo, ustawienia i preferencje do pliku .json.',
    deleteTx:'Usunąć transakcję?', clearAllConfirm:'To trwale usunie wszystkie transakcje i zresetuje saldo do zera. Nie można cofnąć.',
    yesDelete:'Tak, wyczyść wszystko', currencyChange:'Zmiana waluty', keepValues:'Zachowaj wartości', convert:'Konwertuj',
    currencyConverter:'Konwerter walut', from:'Z', to:'Na', popularPairs:'Popularne pary',
    theme:'Motyw ▾', txDeleted:'Transakcja usunięta', undo:'Cofnij',
    noExpenseData:'Brak danych o wydatkach', totalExpenses:'łączne wydatki',
    incomeLegend:'Dochód', expenseLegend:'Wydatki',
    biggestSpend:'Największy wydatek', bestIncome:'Najlepszy dochód', highestSpend:'Najwyższy wydatek',
    addTxForTrends:'Dodaj transakcje, aby zobaczyć trendy miesięczne.',
    addTxForHistory:'Dodaj transakcje, aby zobaczyć historię salda',
    avgExpense:'Średni wydatek', currentBalance:'Aktualne saldo',
    phName:'np. Zakupy spożywcze', phAmount:'0.00', phNote:'Dodaj notatkę…',
    phGoal:'Ustaw kwotę celu', phSongTitle:'Nazwa utworu',
    phCatSymbol:'np. ◆', phCatName:'np. Gaming',
    added:'Dodano',

    about_engine:'SILNIK',
    about_label:'PROJEKT',
    about_author:'Autor',
    about_hosted:'Hostowane na',
    about_candidate:'Kandydat do',
    about_directed:'Kierowane przez',
    about_academy:'Akademia',
    currencyConverterTitle:'Konwerter walut',
    addTransactionTip:'Dodaj transakcję',
    addCustomCategoryTip:'Dodaj własną kategorię',
    filterTip:'Filtr',
    galaxyMode:'Tryb galaktyki',
    galaxyModeDesc:'Eksperymentalne efekty kosmiczne w trybie ciemnym',
    expTheme:'Motyw eksperymentalny',
    expThemeDesc:'Wypróbuj zupełnie nowy wygląd. Domyślnie wyłączone.',
    expOff:'Wył. (domyślne)',
    expMono:'Mono — brutalistyczny',
    expCumulus:'Cumulus — neumorficzny',
    expLedger:'Ledger — redakcyjny',
    expPrism:'Prism — szkło + neon',
    customCategories:'Własne kategorie',
    addCustomCategory:'+ Dodaj własną kategorię',
    quickTransactions:'Szybkie transakcje',
    quickTransactionsHeader:'SZYBKIE TRANSAKCJE',
    quickTxManageDesc:'Zarządzaj zapisanymi szybkimi transakcjami (maks',
    noQuickTxSaved:'Brak zapisanych szybkich transakcji.',
    noQuickTxYet:'Brak szybkich transakcji. Oznacz jako predefiniowaną przy dodawaniu.',
    saveAsQuick:'Zapisz jako szybką transakcję',
    saveAsQuickDesc:'Dodaje do panelu szybkiego dostępu',
    lightDarkTip:'Tryb jasny/ciemny',
    settingsTip:'Ustawienia',
    liteBtn:'Lite',
    fullBtn:'Pełny',
    clickExpand:'Kliknij, aby rozwinąć',
    selectSongBelow:'Wybierz utwór poniżej',
    loopAll:'↻ Wszystkie',
    loopOne:'↺ Jeden',
    loopRandom:'⇄ Losowo',
    volMinus:'vol−',
    volPlus:'vol+',
    audioFile:'Plik audio',
    chooseAudio:'Wybierz plik audio…',
    songTitleLabel:'Tytuł',
    trimSong:'Przytnij utwór',
    startLabel:'Start:',
    endLabel:'Koniec:',
    addSongBtn:'Dodaj utwór',
    addCustomCategoryHeader:'Dodaj własną kategorię',
    symbolLabel:'Symbol',
    symbolHint:'Wybierz symbol (np. ◆ ◈ ◉ ▲ ● ♦ ✦ ✧)',
    categoryName:'Nazwa kategorii',
    addCategoryBtn:'Dodaj kategorię',
    addCustomSong:'Dodaj własny utwór',
    noCustomCats:'Brak własnych kategorii.',
    editTip:'Edytuj',
    deleteTip:'Usuń',
    removeTip:'Usuń',
    playSongTip:'Odtwórz utwór',
    enableDisableTip:'Włącz/Wyłącz',
    swapCurrencies:'Zamień waluty',
    copyClipboard:'Kopiuj do schowka',
    noAudio:'Brak audio — dodaj przez + Dodaj własny utwór',
    unknownSong:'Nieznany',
    fetchingRate:'Pobieranie kursu…',
    cantFetchRate:'Nie można pobrać kursu.',
    liveRateVia:'Kurs na żywo via Open Exchange Rates',
    liveRateFrankfurter:'Kurs na żywo via frankfurter.app',
    unableFetch:'Nie można pobrać',
    checkConnection:'Sprawdź połączenie',
    currencySwitchPrompt:'Zmiana z {from} na {to}. Konwertować wartości?',
    deleteConfirmText:'Usunąć "{name}" ({sign}{currency}{amount})? Nie można cofnąć.',
    optional:'(opcjonalne)',
    totalBalanceShort:'CAŁKOWITE SALDO',
    songCustomTag:'własny',

    experimental:'Eksperymentalne',
    experimentalDesc:'Funkcje PC i testy układu',
    expUiLayout:'Eksperymentalny układ UI',
    expUiLayoutDesc:'Zmienia układ przycisków dla desktopu. TYLKO PC.',
    expUiOff:'Wył. (domyślne)',
    expUiSidebar:'Panel boczny',
    expUiTopbar:'Kompaktowy pasek górny',

    expAurora:'Aurora — zorza polarna',
    expensesByCat:'Wydatki według kategorii',
    expObsidian:'Obsidian — ciemny marmur',
  },

  hi: {
    totalBalance:'कुल शेष राशि', savingGoal:'बचत लक्ष्य', setGoal:'प्रगति ट्रैक करने के लिए लक्ष्य सेट करें',
    analytics:'विश्लेषण', spending:'खर्च', monthly:'मासिक', balance:'शेष',
    recentTx:'हाल की लेनदेन', viewAll:'सभी देखें →', noTx:'अभी तक कोई लेनदेन नहीं। + दबाकर जोड़ें।',
    newTx:'नई लेनदेन', editTx:'लेनदेन संपादित करें', name:'नाम', amount:'राशि',
    category:'श्रेणी', note:'नोट', type:'प्रकार', income:'↑ आय', expense:'↓ खर्च',
    cancel:'रद्द करें', add:'जोड़ें', save:'सहेजें', delete:'हटाएँ',
    allTx:'सभी लेनदेन', clearAll:'सभी साफ करें', searchTx:'लेनदेन खोजें…',
    sort:'क्रमबद्ध करें:', sortName:'नाम', sortAmount:'राशि', sortDate:'तारीख', sortCat:'श्रेणी',
    noMatch:'कोई मेल नहीं मिला।', clearFilters:'फ़िल्टर साफ करें',
    settings:'सेटिंग्स', general:'सामान्य', confirmDelete:'हटाने की पुष्टि',
    confirmDeleteDesc:'लेनदेन हटाने से पहले पूछें',
    tsFormat:'समय प्रारूप', tsFormatDesc:'हर लेनदेन पर दिखाया जाता है',
    dateTime:'तारीख और समय', dateOnly:'केवल तारीख',
    maxShown:'दिखाए गए लेनदेन', maxShownDesc:'मुख्य स्क्रीन पर (5–20)',
    liquidGlass:'लिक्विड ग्लास UI', liquidGlassDesc:'फ्रॉस्टेड ग्लास डिज़ाइन',
    language:'भाषा', languageDesc:'ऐप की भाषा',
    music:'संगीत', ambiancePlayer:'एम्बियंस प्लेयर', ambiancePlayerDesc:'कंट्रोल खोलने के लिए क्लिक करें',
    addSong:'+ अपना गाना जोड़ें', data:'डेटा', exportData:'⬆ डेटा निर्यात', importData:'⬇ डेटा आयात',
    dataDesc:'.json फ़ाइल में सभी डेटा निर्यात करता है',
    deleteTx:'लेनदेन हटाएँ?', clearAllConfirm:'सभी डेटा हट जाएगा। वापस नहीं लाया जा सकता।',
    yesDelete:'हाँ, सब हटाएँ', currencyChange:'मुद्रा बदलें', keepValues:'मान रखें', convert:'परिवर्तित करें',
    currencyConverter:'मुद्रा परिवर्तक', from:'से', to:'तक', popularPairs:'लोकप्रिय जोड़े',
    theme:'थीम ▾', txDeleted:'हटाया गया', undo:'पूर्ववत',
    noExpenseData:'कोई डेटा नहीं', totalExpenses:'कुल खर्च',
    incomeLegend:'आय', expenseLegend:'खर्च',
    biggestSpend:'सबसे बड़ा खर्च', bestIncome:'सबसे अच्छी आय', highestSpend:'उच्चतम खर्च',
    addTxForTrends:'रुझान देखने के लिए जोड़ें',
    addTxForHistory:'इतिहास देखने के लिए जोड़ें',
    avgExpense:'औसत खर्च', currentBalance:'वर्तमान शेष',
    phName:'जैसे किराना', phAmount:'0.00', phNote:'नोट जोड़ें…',
    phGoal:'लक्ष्य सेट करें', phSongTitle:'गीत नाम',
    phCatSymbol:'जैसे ◆', phCatName:'जैसे गेमिंग',
    added:'जोड़ा गया',

    about_engine:'इंजन',
    about_label:'प्रोजेक्ट',
    about_author:'लेखक',
    about_hosted:'होस्ट किया गया',
    about_candidate:'उम्मीदवार',
    about_directed:'निर्देशक',
    about_academy:'अकादमी',
    currencyConverterTitle:'मुद्रा परिवर्तक',
    addTransactionTip:'लेनदेन जोड़ें',
    addCustomCategoryTip:'कस्टम श्रेणी जोड़ें',
    filterTip:'फ़िल्टर',
    galaxyMode:'गैलेक्सी मोड',
    galaxyModeDesc:'डार्क मोड में स्पेस इफेक्ट',
    expTheme:'प्रयोगात्मक थीम',
    expThemeDesc:'नया लुक आज़माएँ',
    expOff:'बंद',
    expMono:'Mono',
    expCumulus:'Cumulus',
    expLedger:'Ledger',
    expPrism:'Prism',
    customCategories:'कस्टम श्रेणियाँ',
    addCustomCategory:'+ जोड़ें',
    quickTransactions:'त्वरित लेनदेन',
    quickTransactionsHeader:'त्वरित लेनदेन',
    quickTxManageDesc:'प्रबंधित करें (अधिकतम',
    noQuickTxSaved:'कुछ नहीं',
    noQuickTxYet:'अभी नहीं',
    saveAsQuick:'त्वरित के रूप में सहेजें',
    saveAsQuickDesc:'जल्दी उपयोग के लिए जोड़ता है',
    lightDarkTip:'लाइट/डार्क मोड',
    settingsTip:'सेटिंग्स',
    liteBtn:'Lite',
    fullBtn:'Full',
    clickExpand:'खोलने के लिए क्लिक करें',
    selectSongBelow:'नीचे चुनें',
    loopAll:'↻ सभी',
    loopOne:'↺ एक',
    loopRandom:'⇄ रैंडम',
    volMinus:'vol−',
    volPlus:'vol+',
    audioFile:'ऑडियो फ़ाइल',
    chooseAudio:'फ़ाइल चुनें…',
    songTitleLabel:'शीर्षक',
    trimSong:'ट्रिम करें',
    startLabel:'शुरू:',
    endLabel:'अंत:',
    addSongBtn:'जोड़ें',
    addCustomCategoryHeader:'श्रेणी जोड़ें',
    symbolLabel:'प्रतीक',
    symbolHint:'प्रतीक चुनें',
    categoryName:'नाम',
    addCategoryBtn:'जोड़ें',
    addCustomSong:'गीत जोड़ें',
    noCustomCats:'कुछ नहीं',
    editTip:'संपादित करें',
    deleteTip:'हटाएँ',
    removeTip:'हटाएँ',
    playSongTip:'चलाएँ',
    enableDisableTip:'चालू/बंद',
    swapCurrencies:'बदलें',
    copyClipboard:'कॉपी करें',
    noAudio:'कोई ऑडियो नहीं',
    unknownSong:'अज्ञात',
    fetchingRate:'लोड हो रहा है…',
    cantFetchRate:'लोड नहीं हो सका',
    liveRateVia:'लाइव दर',
    liveRateFrankfurter:'लाइव दर',
    unableFetch:'असमर्थ',
    checkConnection:'कनेक्शन जाँचें',
    currencySwitchPrompt:'क्या बदलना है?',
    deleteConfirmText:'हटाएँ?',
    optional:'(वैकल्पिक)',
    totalBalanceShort:'कुल शेष',
    songCustomTag:'कस्टम',

    experimental:'प्रयोगात्मक',
    experimentalDesc:'पीसी फीचर्स',
    expUiLayout:'लेआउट',
    expUiLayoutDesc:'डेस्कटॉप के लिए',
    expUiOff:'बंद',
    expUiSidebar:'साइडबार',
    expUiTopbar:'टॉपबार',

    expAurora:'Aurora',
    expensesByCat:'श्रेणी अनुसार खर्च',
    expObsidian:'Obsidian',
  },

  ja: {
    totalBalance:'総残高', savingGoal:'貯蓄目標', setGoal:'進捗を追跡するための目標を設定',
    analytics:'分析', spending:'支出', monthly:'月次', balance:'残高',
    recentTx:'最近の取引', viewAll:'すべて表示 →', noTx:'取引がまだありません。＋を押して追加してください。',
    newTx:'新規取引', editTx:'取引を編集', name:'名称', amount:'金額',
    category:'カテゴリ', note:'メモ', type:'種類', income:'↑ 収入', expense:'↓ 支出',
    cancel:'キャンセル', add:'追加', save:'保存', delete:'削除',
    allTx:'すべての取引', clearAll:'すべて削除', searchTx:'取引を検索…',
    sort:'並び替え:', sortName:'名称', sortAmount:'金額', sortDate:'日付', sortCat:'カテゴリ',
    noMatch:'条件に一致する取引がありません。', clearFilters:'フィルターを解除',
    settings:'設定', general:'一般', confirmDelete:'削除の確認',
    confirmDeleteDesc:'取引を削除する前に確認する',
    tsFormat:'タイムスタンプ形式', tsFormatDesc:'各取引に表示されます',
    dateTime:'日付と時刻', dateOnly:'日付のみ',
    maxShown:'表示する最近の取引数', maxShownDesc:'メイン画面に表示 (5〜20)',
    liquidGlass:'Liquid Glass UI', liquidGlassDesc:'すりガラス風デザイン',
    language:'言語', languageDesc:'アプリの表示言語',
    music:'音楽', ambiancePlayer:'アンビエンスプレイヤー', ambiancePlayerDesc:'アイコンをクリックして展開',
    addSong:'+ カスタム曲を追加', data:'データ', exportData:'⬆ データをエクスポート', importData:'⬇ データをインポート',
    dataDesc:'すべての取引、残高、設定を.jsonファイルとして出力します。',
    deleteTx:'取引を削除しますか？', clearAllConfirm:'すべての取引が完全に削除され、残高は0になります。元に戻せません。',
    yesDelete:'はい、すべて削除', currencyChange:'通貨変更', keepValues:'値を維持', convert:'変換',
    currencyConverter:'通貨コンバーター', from:'から', to:'へ', popularPairs:'人気の通貨ペア',
    theme:'テーマ ▾', txDeleted:'削除されました', undo:'元に戻す',

    noExpenseData:'支出データがありません', totalExpenses:'総支出',
    incomeLegend:'収入', expenseLegend:'支出',
    biggestSpend:'最大支出', bestIncome:'最高収入', highestSpend:'最高支出',
    addTxForTrends:'取引を追加して月次トレンドを表示',
    addTxForHistory:'取引を追加して履歴を表示',
    avgExpense:'平均支出', currentBalance:'現在の残高',

    phName:'例：食料品', phAmount:'0.00', phNote:'メモを追加…',
    phGoal:'目標金額を設定', phSongTitle:'曲名',
    phCatSymbol:'例：◆', phCatName:'例：ゲーム',
    added:'追加されました',

    about_engine:'エンジン', about_label:'プロジェクト', about_author:'作成者',
    about_hosted:'ホスト', about_candidate:'候補', about_directed:'ディレクター', about_academy:'アカデミー',

    currencyConverterTitle:'通貨コンバーター',
    addTransactionTip:'取引を追加',
    addCustomCategoryTip:'カスタムカテゴリを追加',
    filterTip:'フィルター',

    galaxyMode:'ギャラクシーモード',
    galaxyModeDesc:'実験的：ダークモードで宇宙エフェクト',

    expTheme:'実験テーマ',
    expThemeDesc:'新しい外観を試す（デフォルトはオフ）',
    expOff:'オフ（デフォルト）',
    expMono:'Mono',
    expCumulus:'Cumulus',
    expLedger:'Ledger',
    expPrism:'Prism',

    customCategories:'カスタムカテゴリ',
    addCustomCategory:'+ カスタムカテゴリを追加',

    quickTransactions:'クイック取引',
    quickTransactionsHeader:'クイック取引',
    quickTxManageDesc:'保存済みのクイック取引を管理 (最大',
    noQuickTxSaved:'保存されたクイック取引はありません。',
    noQuickTxYet:'まだありません。',
    saveAsQuick:'クイックとして保存',
    saveAsQuickDesc:'すぐに再利用できます',

    lightDarkTip:'ライト/ダークモード',
    settingsTip:'設定',

    liteBtn:'Lite', fullBtn:'Full',

    clickExpand:'クリックして展開',
    selectSongBelow:'下から曲を選択',

    loopAll:'↻ すべて', loopOne:'↺ 1曲', loopRandom:'⇄ ランダム',

    volMinus:'音量−', volPlus:'音量+',

    audioFile:'音声ファイル', chooseAudio:'音声ファイルを選択…',

    songTitleLabel:'タイトル',
    trimSong:'トリミング',
    startLabel:'開始:', endLabel:'終了:',

    addSongBtn:'曲を追加',

    addCustomCategoryHeader:'カテゴリ追加',
    symbolLabel:'記号',
    symbolHint:'記号を選択',
    categoryName:'カテゴリ名',
    addCategoryBtn:'追加',

    addCustomSong:'カスタム曲追加',
    noCustomCats:'なし',

    editTip:'編集', deleteTip:'削除', removeTip:'削除',

    playSongTip:'再生',
    enableDisableTip:'オン/オフ',

    swapCurrencies:'通貨を交換',
    copyClipboard:'コピー',

    noAudio:'音声なし',
    unknownSong:'不明',

    fetchingRate:'取得中…',
    cantFetchRate:'取得できません',
    liveRateVia:'ライブレート',
    liveRateFrankfurter:'ライブレート',
    unableFetch:'不可',
    checkConnection:'接続確認',

    currencySwitchPrompt:'変換しますか？',
    deleteConfirmText:'削除しますか？',

    optional:'（任意）',
    totalBalanceShort:'総残高',
    songCustomTag:'カスタム',

    experimental:'実験',
    experimentalDesc:'PC専用',
    expUiLayout:'レイアウト',
    expUiLayoutDesc:'PC用',
    expUiOff:'オフ',
    expUiSidebar:'サイドバー',
    expUiTopbar:'トップバー',

    expAurora:'Aurora',
    expensesByCat:'カテゴリ別支出',
    expObsidian:'Obsidian',
  },
  vi: {
    totalBalance:'TỔNG SỐ DƯ', savingGoal:'Mục tiêu tiết kiệm', setGoal:'Đặt mục tiêu để theo dõi tiến độ của bạn',
    analytics:'Phân tích', spending:'Chi tiêu', monthly:'Hàng tháng', balance:'Số dư',
    recentTx:'Giao dịch gần đây', viewAll:'Xem tất cả →', noTx:'Chưa có giao dịch. Nhấn + để thêm.',
    newTx:'Giao dịch mới', editTx:'Chỉnh sửa giao dịch', name:'Tên', amount:'Số tiền',
    category:'Danh mục', note:'Ghi chú', type:'Loại', income:'↑ Thu nhập', expense:'↓ Chi tiêu',
    cancel:'Hủy', add:'Thêm', save:'Lưu', delete:'Xóa',
    allTx:'Tất cả giao dịch', clearAll:'Xóa tất cả', searchTx:'Tìm kiếm giao dịch…',
    sort:'Sắp xếp:', sortName:'Tên', sortAmount:'Số tiền', sortDate:'Ngày', sortCat:'Danh mục',
    noMatch:'Không có giao dịch phù hợp.', clearFilters:'Xóa bộ lọc',
    settings:'Cài đặt', general:'Chung', confirmDelete:'Xác nhận xóa',
    confirmDeleteDesc:'Hỏi trước khi xóa giao dịch', tsFormat:'Định dạng thời gian',
    tsFormatDesc:'Hiển thị trên mỗi giao dịch', dateTime:'Ngày & giờ', dateOnly:'Chỉ ngày',
    maxShown:'Số giao dịch hiển thị', maxShownDesc:'Hiển thị trên màn hình chính (5–20)',
    liquidGlass:'Giao diện Liquid Glass', liquidGlassDesc:'Hiệu ứng kính mờ',
    language:'Ngôn ngữ', languageDesc:'Ngôn ngữ giao diện ứng dụng',
    music:'Âm nhạc', ambiancePlayer:'Trình phát nền', ambiancePlayerDesc:'Nhấn biểu tượng để mở điều khiển',
    addSong:'+ Thêm bài hát của bạn', data:'Dữ liệu', exportData:'⬆ Xuất dữ liệu', importData:'⬇ Nhập dữ liệu',
    dataDesc:'Xuất tất cả giao dịch, số dư, cài đặt và tùy chọn thành tệp .json.',
    deleteTx:'Xóa giao dịch?', clearAllConfirm:'Thao tác này sẽ xóa vĩnh viễn tất cả giao dịch và đặt lại số dư về 0. Không thể hoàn tác.',
    yesDelete:'Có, xóa tất cả', currencyChange:'Thay đổi tiền tệ', keepValues:'Giữ nguyên giá trị', convert:'Chuyển đổi',
    currencyConverter:'Trình chuyển đổi tiền tệ', from:'Từ', to:'Đến', popularPairs:'Cặp phổ biến',
    theme:'Giao diện ▾', txDeleted:'Đã xóa giao dịch', undo:'Hoàn tác',

    noExpenseData:'Chưa có dữ liệu chi tiêu', totalExpenses:'tổng chi tiêu',
    incomeLegend:'Thu nhập', expenseLegend:'Chi tiêu',
    biggestSpend:'Chi tiêu lớn nhất', bestIncome:'Thu nhập cao nhất', highestSpend:'Chi tiêu cao nhất',
    addTxForTrends:'Thêm giao dịch để xem xu hướng hàng tháng.',
    addTxForHistory:'Thêm giao dịch để xem lịch sử số dư',
    avgExpense:'Chi tiêu trung bình', currentBalance:'Số dư hiện tại',

    phName:'ví dụ: Mua sắm', phAmount:'0.00', phNote:'Thêm ghi chú…',
    phGoal:'Đặt mục tiêu', phSongTitle:'Tên bài hát',
    phCatSymbol:'ví dụ: ◆', phCatName:'ví dụ: Gaming',
    added:'Đã thêm',

    about_engine:'CÔNG CỤ', about_label:'DỰ ÁN', about_author:'Tác giả',
    about_hosted:'Lưu trữ tại', about_candidate:'Ứng viên', about_directed:'Chỉ đạo bởi', about_academy:'Học viện',

    currencyConverterTitle:'Trình chuyển đổi tiền tệ',
    addTransactionTip:'Thêm giao dịch',
    addCustomCategoryTip:'Thêm danh mục tùy chỉnh',
    filterTip:'Bộ lọc',

    galaxyMode:'Chế độ thiên hà',
    galaxyModeDesc:'Thử nghiệm: hiệu ứng không gian trong chế độ tối',

    expTheme:'Giao diện thử nghiệm',
    expThemeDesc:'Thử phong cách mới. Tắt theo mặc định.',
    expOff:'Tắt (mặc định)',
    expMono:'Mono',
    expCumulus:'Cumulus',
    expLedger:'Ledger',
    expPrism:'Prism',

    customCategories:'Danh mục tùy chỉnh',
    addCustomCategory:'+ Thêm danh mục',

    quickTransactions:'Giao dịch nhanh',
    quickTransactionsHeader:'GIAO DỊCH NHANH',
    quickTxManageDesc:'Quản lý giao dịch nhanh đã lưu (tối đa',
    noQuickTxSaved:'Chưa có giao dịch nhanh.',
    noQuickTxYet:'Chưa có. Đánh dấu khi thêm.',
    saveAsQuick:'Lưu làm giao dịch nhanh',
    saveAsQuickDesc:'Thêm vào để sử dụng nhanh',

    lightDarkTip:'Chế độ sáng/tối',
    settingsTip:'Cài đặt',

    liteBtn:'Lite', fullBtn:'Full',

    clickExpand:'Nhấn để mở',
    selectSongBelow:'Chọn bài hát bên dưới',

    loopAll:'↻ Tất cả', loopOne:'↺ Một', loopRandom:'⇄ Ngẫu nhiên',

    volMinus:'vol−', volPlus:'vol+',

    audioFile:'Tệp âm thanh', chooseAudio:'Chọn tệp…',

    songTitleLabel:'Tiêu đề',
    trimSong:'Cắt bài hát',
    startLabel:'Bắt đầu:', endLabel:'Kết thúc:',

    addSongBtn:'Thêm bài hát',

    addCustomCategoryHeader:'Thêm danh mục',
    symbolLabel:'Ký hiệu',
    symbolHint:'Chọn ký hiệu',
    categoryName:'Tên danh mục',
    addCategoryBtn:'Thêm',

    addCustomSong:'Thêm bài hát',
    noCustomCats:'Chưa có danh mục.',

    editTip:'Sửa', deleteTip:'Xóa', removeTip:'Xóa',

    playSongTip:'Phát',
    enableDisableTip:'Bật/Tắt',

    swapCurrencies:'Đổi tiền tệ',
    copyClipboard:'Sao chép',

    noAudio:'Không có âm thanh',
    unknownSong:'Không rõ',

    fetchingRate:'Đang tải…',
    cantFetchRate:'Không thể tải',
    liveRateVia:'Tỷ giá trực tiếp',
    liveRateFrankfurter:'Tỷ giá trực tiếp',
    unableFetch:'Không thể',
    checkConnection:'Kiểm tra kết nối',

    currencySwitchPrompt:'Chuyển đổi giá trị?',
    deleteConfirmText:'Xóa mục này?',

    optional:'(tùy chọn)',
    totalBalanceShort:'TỔNG SỐ DƯ',
    songCustomTag:'tùy chỉnh',

    experimental:'Thử nghiệm',
    experimentalDesc:'Tính năng PC',
    expUiLayout:'Bố cục',
    expUiLayoutDesc:'Dành cho desktop',
    expUiOff:'Tắt',
    expUiSidebar:'Thanh bên',
    expUiTopbar:'Thanh trên',

    expAurora:'Aurora',
    expensesByCat:'Chi tiêu theo danh mục',
    expObsidian:'Obsidian',
  },
  ar: {
    totalBalance:'إجمالي الرصيد', savingGoal:'هدف الادخار', setGoal:'حدد هدفًا لمتابعة تقدمك',
    analytics:'التحليلات', spending:'المصروفات', monthly:'شهري', balance:'الرصيد',
    recentTx:'أحدث المعاملات', viewAll:'عرض الكل →', noTx:'لا توجد معاملات بعد. اضغط + للإضافة.',
    newTx:'معاملة جديدة', editTx:'تعديل المعاملة', name:'الاسم', amount:'المبلغ',
    category:'الفئة', note:'ملاحظة', type:'النوع', income:'↑ دخل', expense:'↓ مصروف',
    cancel:'إلغاء', add:'إضافة', save:'حفظ', delete:'حذف',
    allTx:'جميع المعاملات', clearAll:'حذف الكل', searchTx:'البحث في المعاملات…',
    sort:'ترتيب:', sortName:'الاسم', sortAmount:'المبلغ', sortDate:'التاريخ', sortCat:'الفئة',
    noMatch:'لا توجد معاملات مطابقة.', clearFilters:'مسح الفلاتر',
    settings:'الإعدادات', general:'عام', confirmDelete:'تأكيد الحذف',
    confirmDeleteDesc:'اطلب تأكيدًا قبل حذف معاملة', tsFormat:'تنسيق الوقت',
    tsFormatDesc:'يُعرض على كل معاملة', dateTime:'التاريخ والوقت', dateOnly:'التاريخ فقط',
    maxShown:'عدد المعاملات المعروضة', maxShownDesc:'في الشاشة الرئيسية (5–20)',
    liquidGlass:'واجهة الزجاج السائل', liquidGlassDesc:'تصميم زجاجي ضبابي',
    language:'اللغة', languageDesc:'لغة واجهة التطبيق',
    music:'الموسيقى', ambiancePlayer:'مشغل الأجواء', ambiancePlayerDesc:'اضغط لعرض التحكم',
    addSong:'+ أضف أغنيتك', data:'البيانات', exportData:'⬆ تصدير البيانات', importData:'⬇ استيراد البيانات',
    dataDesc:'يتم تصدير جميع البيانات كملف .json.',
    deleteTx:'حذف المعاملة؟', clearAllConfirm:'سيتم حذف جميع المعاملات نهائيًا ولا يمكن التراجع.',
    yesDelete:'نعم، حذف الكل', currencyChange:'تغيير العملة', keepValues:'الاحتفاظ بالقيم', convert:'تحويل',
    currencyConverter:'محول العملات', from:'من', to:'إلى', popularPairs:'أزواج شائعة',
    theme:'السمة ▾', txDeleted:'تم الحذف', undo:'تراجع',

    noExpenseData:'لا توجد بيانات', totalExpenses:'إجمالي المصروفات',
    incomeLegend:'الدخل', expenseLegend:'المصروفات',
    biggestSpend:'أكبر مصروف', bestIncome:'أفضل دخل', highestSpend:'أعلى مصروف',
    addTxForTrends:'أضف معاملات لرؤية الاتجاهات',
    addTxForHistory:'أضف معاملات لرؤية السجل',
    avgExpense:'متوسط المصروف', currentBalance:'الرصيد الحالي',

    phName:'مثال: تسوق', phAmount:'0.00', phNote:'أضف ملاحظة…',
    phGoal:'حدد هدفًا', phSongTitle:'اسم الأغنية',
    phCatSymbol:'مثال: ◆', phCatName:'مثال: ألعاب',
    added:'تمت الإضافة',

    about_engine:'المحرك', about_label:'المشروع', about_author:'المؤلف',
    about_hosted:'مستضاف على', about_candidate:'مرشح', about_directed:'بإشراف', about_academy:'أكاديمية',

    currencyConverterTitle:'محول العملات',
    addTransactionTip:'إضافة معاملة',
    addCustomCategoryTip:'إضافة فئة',
    filterTip:'تصفية',

    galaxyMode:'وضع المجرة',
    galaxyModeDesc:'تأثيرات فضائية في الوضع الداكن',

    expTheme:'سمة تجريبية',
    expThemeDesc:'جرّب مظهرًا جديدًا',
    expOff:'إيقاف',
    expMono:'Mono',
    expCumulus:'Cumulus',
    expLedger:'Ledger',
    expPrism:'Prism',

    customCategories:'فئات مخصصة',
    addCustomCategory:'+ إضافة',

    quickTransactions:'معاملات سريعة',
    quickTransactionsHeader:'معاملات سريعة',
    quickTxManageDesc:'إدارة (حد أقصى',
    noQuickTxSaved:'لا يوجد',
    noQuickTxYet:'لا يوجد',
    saveAsQuick:'حفظ',
    saveAsQuickDesc:'للاستخدام السريع',

    lightDarkTip:'فاتح/داكن',
    settingsTip:'الإعدادات',

    liteBtn:'Lite', fullBtn:'Full',

    clickExpand:'اضغط للتوسيع',
    selectSongBelow:'اختر أغنية',

    loopAll:'↻ الكل', loopOne:'↺ واحد', loopRandom:'⇄ عشوائي',

    volMinus:'vol−', volPlus:'vol+',

    audioFile:'ملف صوتي', chooseAudio:'اختر ملف…',

    songTitleLabel:'العنوان',
    trimSong:'قص',
    startLabel:'بداية:', endLabel:'نهاية:',

    addSongBtn:'إضافة',

    addCustomCategoryHeader:'إضافة فئة',
    symbolLabel:'رمز',
    symbolHint:'اختر رمز',
    categoryName:'الاسم',
    addCategoryBtn:'إضافة',

    addCustomSong:'إضافة أغنية',
    noCustomCats:'لا يوجد',

    editTip:'تعديل', deleteTip:'حذف', removeTip:'إزالة',

    playSongTip:'تشغيل',
    enableDisableTip:'تشغيل/إيقاف',

    swapCurrencies:'تبديل العملات',
    copyClipboard:'نسخ',

    noAudio:'لا يوجد صوت',
    unknownSong:'غير معروف',

    fetchingRate:'جارٍ التحميل…',
    cantFetchRate:'تعذر التحميل',
    liveRateVia:'سعر مباشر',
    liveRateFrankfurter:'سعر مباشر',
    unableFetch:'تعذر',
    checkConnection:'تحقق من الاتصال',

    currencySwitchPrompt:'تحويل القيم؟',
    deleteConfirmText:'حذف؟',

    optional:'(اختياري)',
    totalBalanceShort:'إجمالي الرصيد',
    songCustomTag:'مخصص',

    experimental:'تجريبي',
    experimentalDesc:'ميزات PC',
    expUiLayout:'التخطيط',
    expUiLayoutDesc:'للكمبيوتر',
    expUiOff:'إيقاف',
    expUiSidebar:'شريط جانبي',
    expUiTopbar:'شريط علوي',

    expAurora:'Aurora',
    expensesByCat:'حسب الفئة',
    expObsidian:'Obsidian',
  },
  zhTW: {
    totalBalance:'總餘額', savingGoal:'儲蓄目標', setGoal:'設定目標以追蹤您的進度',
    analytics:'分析', spending:'支出', monthly:'每月', balance:'餘額',
    recentTx:'最近交易', viewAll:'查看全部 →', noTx:'尚無交易。請點擊 + 以新增。',
    newTx:'新增交易', editTx:'編輯交易', name:'名稱', amount:'金額',
    category:'分類', note:'備註', type:'類型', income:'↑ 收入', expense:'↓ 支出',
    cancel:'取消', add:'新增', save:'儲存', delete:'刪除',
    allTx:'所有交易', clearAll:'清除全部', searchTx:'搜尋交易…',
    sort:'排序：', sortName:'名稱', sortAmount:'金額', sortDate:'日期', sortCat:'分類',
    noMatch:'沒有符合篩選條件的交易。', clearFilters:'清除篩選',
    settings:'設定', general:'一般', confirmDelete:'確認刪除',
    confirmDeleteDesc:'刪除交易前進行確認', tsFormat:'時間格式',
    tsFormatDesc:'顯示於每筆交易', dateTime:'日期與時間', dateOnly:'僅日期',
    maxShown:'顯示的最近交易數量', maxShownDesc:'主畫面顯示 (5–20)',
    liquidGlass:'Liquid Glass 介面', liquidGlassDesc:'磨砂玻璃風格',
    language:'語言', languageDesc:'應用程式介面語言',
    music:'音樂', ambiancePlayer:'環境音播放器', ambiancePlayerDesc:'點擊圖示以展開控制',
    addSong:'+ 新增自訂歌曲', data:'資料', exportData:'⬆ 匯出資料', importData:'⬇ 匯入資料',
    dataDesc:'將所有交易、餘額、設定與偏好匯出為 .json 檔案。',
    deleteTx:'刪除交易？', clearAllConfirm:'此操作將永久刪除所有交易並將餘額重設為零，且無法復原。',
    yesDelete:'是，全部清除', currencyChange:'貨幣變更', keepValues:'保留數值', convert:'轉換',
    currencyConverter:'貨幣轉換器', from:'從', to:'至', popularPairs:'熱門貨幣組合',
    theme:'主題 ▾', txDeleted:'交易已刪除', undo:'復原',

    noExpenseData:'尚無支出資料', totalExpenses:'總支出',
    incomeLegend:'收入', expenseLegend:'支出',
    biggestSpend:'最大支出', bestIncome:'最佳收入', highestSpend:'最高支出',
    addTxForTrends:'新增交易以查看每月趨勢。',
    addTxForHistory:'新增交易以查看餘額歷史',
    avgExpense:'平均支出', currentBalance:'目前餘額',

    phName:'例如：購物', phAmount:'0.00', phNote:'新增備註…',
    phGoal:'設定目標金額', phSongTitle:'歌曲名稱',
    phCatSymbol:'例如：◆', phCatName:'例如：遊戲',
    added:'已新增',

    about_engine:'引擎',
    about_label:'專案',
    about_author:'作者',
    about_hosted:'託管於',
    about_candidate:'候選項目',
    about_directed:'指導者',
    about_academy:'學院',

    currencyConverterTitle:'貨幣轉換器',
    addTransactionTip:'新增交易',
    addCustomCategoryTip:'新增自訂分類',
    filterTip:'篩選',

    galaxyMode:'銀河模式',
    galaxyModeDesc:'實驗性：深空與星雲效果（深色模式）',

    expTheme:'實驗性主題',
    expThemeDesc:'嘗試全新外觀，預設為關閉。',
    expOff:'關閉（預設）',
    expMono:'Mono — 極簡風',
    expCumulus:'Cumulus — 擬物風',
    expLedger:'Ledger — 編輯風',
    expPrism:'Prism — 玻璃 + 霓虹',

    customCategories:'自訂分類',
    addCustomCategory:'+ 新增自訂分類',

    quickTransactions:'快速交易',
    quickTransactionsHeader:'快速交易',
    quickTxManageDesc:'管理已儲存的快速交易（最多',
    noQuickTxSaved:'尚未儲存任何快速交易。',
    noQuickTxYet:'尚無快速交易。新增時可標記為預設。',
    saveAsQuick:'儲存為快速交易',
    saveAsQuickDesc:'加入快速面板以便快速重用',

    lightDarkTip:'淺色/深色模式',
    settingsTip:'設定',

    liteBtn:'精簡',
    fullBtn:'完整',

    clickExpand:'點擊展開',
    selectSongBelow:'請在下方選擇歌曲',

    loopAll:'↻ 全部',
    loopOne:'↺ 單曲',
    loopRandom:'⇄ 隨機',

    volMinus:'音量−',
    volPlus:'音量+',

    audioFile:'音訊檔案',
    chooseAudio:'選擇音訊檔案…',

    songTitleLabel:'標題',
    trimSong:'剪輯歌曲',
    startLabel:'開始：',
    endLabel:'結束：',

    addSongBtn:'新增歌曲',

    addCustomCategoryHeader:'新增自訂分類',
    symbolLabel:'符號',
    symbolHint:'選擇符號（例如 ◆ ◈ ◉ ▲ ● ♦ ✦ ✧）',
    categoryName:'分類名稱',
    addCategoryBtn:'新增分類',

    addCustomSong:'新增自訂歌曲',
    noCustomCats:'尚無自訂分類。',

    editTip:'編輯',
    deleteTip:'刪除',
    removeTip:'移除',

    playSongTip:'播放此歌曲',
    enableDisableTip:'啟用/停用',

    swapCurrencies:'切換貨幣',
    copyClipboard:'複製到剪貼簿',

    noAudio:'無音訊 — 請透過 + 新增歌曲',
    unknownSong:'未知',

    fetchingRate:'正在取得即時匯率…',
    cantFetchRate:'無法取得匯率，仍可切換貨幣而不轉換。',
    liveRateVia:'即時匯率來源：Open Exchange Rates',
    liveRateFrankfurter:'即時匯率來源：frankfurter.app',
    unableFetch:'無法取得',
    checkConnection:'請檢查網路連線',

    currencySwitchPrompt:'您正在從 {from} 切換至 {to}。是否使用今日匯率轉換現有數值？',
    deleteConfirmText:'刪除「{name}」({sign}{currency}{amount})？此操作無法復原。',

    optional:'（選填）',
    totalBalanceShort:'總餘額',
    songCustomTag:'自訂',

    experimental:'實驗性',
    experimentalDesc:'桌面專用功能與版面測試',

    expUiLayout:'實驗性介面配置',
    expUiLayoutDesc:'重新排列桌面按鈕位置（僅限 PC）。',

    expUiOff:'關閉（預設）',
    expUiSidebar:'側邊欄',
    expUiTopbar:'精簡頂欄',

    expAurora:'Aurora — 極光風',
    expensesByCat:'各分類支出',
    expObsidian:'Obsidian — 深色大理石',
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
      if (labelNode) {
        labelNode.textContent = `${t(key)} `;
      } else {
        el.insertBefore(document.createTextNode(`${t(key)} `), el.firstChild);
      }
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
  // Update page title
  document.title = `Project Atlas`;
}

function changeLanguage(lang) {
  currentLang = lang;
  settings.language = lang;
  applyTranslations();
  renderTransactions();
  if (typeof updateUI === 'function') {
    try { updateUI(); } catch(_) {}
  }
  if (typeof renderPredefined === 'function') renderPredefined();
  if (typeof renderSongList === 'function') renderSongList();
  if (typeof renderCustomCatList === 'function') renderCustomCatList();
  if (typeof renderPredefinedMgmt === 'function') renderPredefinedMgmt();
  if (typeof updateNowPlaying === 'function') updateNowPlaying();
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
  experimentalTheme: 'off', // off | mono | cumulus | ledger | prism | aurora | obsidian
  experimentalUiLayout: 'off', // off | sidebar | topbar
};
let songs = [
  { title:'Cosmic Drift',    artist:'Project Atlas', src:'music/cosmic_drift.mp3',   custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Nebula Wind',     artist:'Project Atlas', src:'music/nebula_wind.mp3',     custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Deep Space',      artist:'Project Atlas', src:'music/deep_space.mp3',      custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Aurora Borealis', artist:'Project Atlas', src:'music/aurora_borealis.mp3', custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Event Horizon',   artist:'Project Atlas', src:'music/event_horizon.mp3',   custom:false, enabled:true, trimStart:0, trimEnd:null },
];

/* ── Custom categories ──────────────────────────────────── */
// Easily change max predefined transactions here:
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
let customCategories = []; // {name, emoji} — user-added
let predefinedTransactions = []; // {name, amount, type, category, note} up to MAX_PREDEFINED
let galaxyMode = false;
let galaxyCanvas = null;
let galaxyAnimId = null;

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
    if (d.customCategories) customCategories = d.customCategories;
    if (d.predefinedTransactions) predefinedTransactions = d.predefinedTransactions;
    if (d.galaxyMode !== undefined) galaxyMode = d.galaxyMode;
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
  document.documentElement.style.setProperty('--accent', accentColor);
  document.documentElement.style.setProperty('--income', accentColor);
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '☾' : '☀';
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
  $('currencyLabel').setAttribute('data-symbol', currency);
  if ($('stgGalaxy')) $('stgGalaxy').checked = galaxyMode;
  if ($('maxPredefinedLabel')) $('maxPredefinedLabel').textContent = MAX_PREDEFINED;
  applyTranslations();
  populateCategorySelects();
  if (galaxyMode && settings.darkMode) startGalaxyMode(); else stopGalaxyMode();
  applyExperimentalTheme(settings.experimentalTheme || 'off');
  if ($('stgExpTheme')) $('stgExpTheme').value = settings.experimentalTheme || 'off';
  applyExperimentalUiLayout(settings.experimentalUiLayout || 'off');
  if ($('stgExpUiLayout')) $('stgExpUiLayout').value = settings.experimentalUiLayout || 'off';
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
  $('currencyLabel').setAttribute('data-symbol', currency);
  $('goalCurrency').textContent  = currency;
  updateDatetime();
  renderTransactions();
  updateProgress();
  updateAnalytics();
  renderPredefined();
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


function setupHiDPICanvas(canvas) {
  if (!canvas) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const cssW = Math.max(1, Math.floor(rect.width));
  const cssH = Math.max(1, Math.floor(rect.height || canvas.height));
  // Set display size
  canvas.style.width = cssW + 'px';
  canvas.style.height = cssH + 'px';
  // Set backing buffer size
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // Store logical size for drawing
  canvas._logicalW = cssW;
  canvas._logicalH = cssH;
  return ctx;
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
  const ctx = setupHiDPICanvas(canvas);
  const W = canvas._logicalW, H = canvas._logicalH;
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  ctx.textBaseline = 'alphabetic';

  const BASE_COLORS = ['#4ade80','#38bdf8','#f97316','#f59e0b','#a78bfa','#34d399','#fb7185','#e879f9','#22d3ee','#fbbf24','#f472b6','#6ee7b7','#818cf8','#f87171','#34d399','#a3e635'];
  const allCatsList = getAllCategories();
  const expenses = transactions.filter(t => t.type === 'expense');
  const byCategory = {};
  allCatsList.forEach(c => byCategory[c.name] = 0);
  expenses.forEach(t => { byCategory[t.category] = (byCategory[t.category]||0) + t.amount; });

  const total = Object.values(byCategory).reduce((a,b)=>a+b,0);
  const entries = allCatsList.map((c,i) => ({ label:c.name, value:byCategory[c.name]||0, color:BASE_COLORS[i % BASE_COLORS.length] }))
                      .filter(e => e.value > 0);

  const legend = $('donutLegend');
  const insight = $('donutInsight');

  if (!entries.length) {
    ctx.fillStyle = getThemeColor(0.18);
    ctx.beginPath(); ctx.arc(W/2, H/2, 90, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = getThemeColor(0.4);
    ctx.font = '14px Outfit, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(t('noExpenseData'), W/2, H/2 + 5);
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
  ctx.font = 'bold 16px Orbitron, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(currency + total.toFixed(0), cx, cy - 4);
  ctx.font = '11px Outfit, sans-serif';
  ctx.fillStyle = getThemeColor(0.45);
  ctx.fillText(t('totalExpenses'), cx, cy + 14);

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
    insight.innerHTML = `★ ${t('biggestSpend')}: <strong>${biggest.label}</strong> — ${currency}${biggest.value.toFixed(2)} (${((biggest.value/total)*100).toFixed(1)}%)`;
  }
}

function drawBar() {
  const canvas = $('barChart');
  if (!canvas) return;
  const ctx = setupHiDPICanvas(canvas);
  const W = canvas._logicalW, H = canvas._logicalH;
  ctx.clearRect(0,0,W,H);
  ctx.imageSmoothingEnabled = true;
  ctx.textBaseline = 'alphabetic';

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
    ctx.font = '11px Outfit, sans-serif'; ctx.textAlign = 'right';
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
    ctx.font = '11px Outfit, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(m.label, x, H - padB + 14);
  });

  // Legend
  ctx.fillStyle = accentColor; ctx.globalAlpha = 0.85;
  ctx.fillRect(padL, padT - 14, 10, 8);
  ctx.globalAlpha = 1;
  ctx.fillStyle = getThemeColor(0.5); ctx.font = '11px Outfit, sans-serif'; ctx.textAlign = 'left';
  ctx.fillText(t('incomeLegend'), padL + 14, padT - 7);
  ctx.fillStyle = '#f87171'; ctx.globalAlpha = 0.85;
  ctx.fillRect(padL + 65, padT - 14, 10, 8);
  ctx.globalAlpha = 1;
  ctx.fillStyle = getThemeColor(0.5);
  ctx.fillText(t('expenseLegend'), padL + 79, padT - 7);

  // Insight
  const insight = $('barInsight');
  if (insight) {
    const bestLabel  = bestMonthIncome.income   > 0 ? `★ ${t('bestIncome')}: <strong>${bestMonthIncome.label}</strong> (${currency}${bestMonthIncome.income.toFixed(0)})` : '';
    const worstLabel = worstMonthExpense.expense> 0 ? `▼ ${t('highestSpend')}: <strong>${worstMonthExpense.label}</strong> (${currency}${worstMonthExpense.expense.toFixed(0)})` : '';
    insight.innerHTML = [bestLabel, worstLabel].filter(Boolean).join(' &nbsp;·&nbsp; ') || t('addTxForTrends');
  }
}

let lineMode = 'balance'; // 'balance' | 'expense'

function setLineMode(mode) {
  lineMode = mode;
  const bBtn = document.getElementById('lineMode-balance');
  const eBtn = document.getElementById('lineMode-expense');
  if (bBtn) bBtn.classList.toggle('active', mode === 'balance');
  if (eBtn) eBtn.classList.toggle('active', mode === 'expense');
  drawLine();
}

function drawLine() {
  const canvas = $('lineChart');
  if (!canvas) return;
  const ctx = setupHiDPICanvas(canvas);
  const W = canvas._logicalW, H = canvas._logicalH;
  ctx.clearRect(0,0,W,H);
  ctx.imageSmoothingEnabled = true;
  ctx.textBaseline = 'alphabetic';

  if (!transactions.length) {
    ctx.fillStyle = getThemeColor(0.35);
    ctx.font = '13px Outfit, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(t('addTxForHistory'), W/2, H/2);
    if ($('lineInsight')) $('lineInsight').innerHTML = '';
    return;
  }

  const padL = 52, padR = 16, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  if (lineMode === 'expense') {
    // Multi-line: cumulative spending per category over time
    const expenses = transactions.filter(t => t.type === 'expense' && t.createdAt)
      .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (!expenses.length) {
      ctx.fillStyle = getThemeColor(0.35);
      ctx.font = '13px Outfit, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(t('noExpenseData'), W/2, H/2);
      if ($('lineInsight')) $('lineInsight').innerHTML = '';
      return;
    }
    const BASE_COLORS = ['#4ade80','#38bdf8','#f97316','#f59e0b','#a78bfa','#34d399','#fb7185','#e879f9','#22d3ee','#fbbf24'];
    const cats = [...new Set(expenses.map(e => e.category || 'General'))];
    const series = cats.map((c, i) => {
      let cum = 0;
      const pts = expenses.map(e => {
        if ((e.category || 'General') === c) cum += e.amount;
        return { date: new Date(e.createdAt), val: cum };
      });
      return { cat: c, color: BASE_COLORS[i % BASE_COLORS.length], pts, total: cum };
    });

    const maxVal = Math.max(...series.map(s => s.total), 1);

    // Grid
    ctx.strokeStyle = getThemeColor(0.07); ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + chartH - (chartH * i / 4);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
      ctx.fillStyle = getThemeColor(0.35); ctx.font = '11px Outfit, sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(currency + ((maxVal * i / 4)).toFixed(0), padL - 4, y + 3);
    }

    const N = expenses.length;
    const xForIdx = i => N === 1 ? padL + chartW / 2 : padL + (i / (N - 1)) * chartW;
    const yForVal = v => padT + chartH - (v / maxVal) * chartH;

    series.forEach(s => {
      ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.beginPath();
      s.pts.forEach((p, i) => i === 0 ? ctx.moveTo(xForIdx(i), yForVal(p.val)) : ctx.lineTo(xForIdx(i), yForVal(p.val)));
      ctx.stroke();
    });

    // Date labels
    ctx.fillStyle = getThemeColor(0.4); ctx.font = '9px Outfit'; ctx.textAlign = 'center';
    if (N >= 2) {
      ctx.fillText(new Date(expenses[0].createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(0), H - padB + 14);
      ctx.fillText(new Date(expenses[N-1].createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(N-1), H - padB + 14);
    }

    // Insight: legend with totals
    const insight = $('lineInsight');
    if (insight) {
      insight.innerHTML = series
        .sort((a,b) => b.total - a.total)
        .map(s => `<span style="display:inline-flex;align-items:center;gap:6px;margin-right:12px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${s.color}"></span>
          <strong>${s.cat}</strong> ${currency}${s.total.toFixed(2)}
        </span>`).join('');
    }
    return;
  }

  // Default: running balance over time
  const sorted = [...transactions].sort((a,b) => new Date(a.createdAt||0) - new Date(b.createdAt||0));
  let running = 0;
  const points = sorted.map(t => {
    running += t.type === 'income' ? t.amount : -t.amount;
    return { date: new Date(t.createdAt||0), val: running };
  });
  if (points.length) points.unshift({ date: new Date(points[0].date.getTime() - 86400000), val: 0 });

  const minVal = Math.min(...points.map(p=>p.val), 0);
  const maxVal = Math.max(...points.map(p=>p.val), 1);
  const range  = maxVal - minVal || 1;

  const xForIdx = i => padL + (i / (points.length - 1)) * chartW;
  const yForVal = v => padT + chartH - ((v - minVal) / range) * chartH;

  ctx.strokeStyle = getThemeColor(0.07); ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (chartH * i / 4);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    const val = minVal + range * i / 4;
    ctx.fillStyle = getThemeColor(0.35); ctx.font = '11px Outfit, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(currency + val.toFixed(0), padL - 4, y + 3);
  }

  if (minVal < 0) {
    const y0 = yForVal(0);
    ctx.strokeStyle = getThemeColor(0.2); ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(padL, y0); ctx.lineTo(W - padR, y0); ctx.stroke();
    ctx.setLineDash([]);
  }

  const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
  grad.addColorStop(0, accentColor + '44');
  grad.addColorStop(1, accentColor + '00');
  ctx.beginPath();
  ctx.moveTo(xForIdx(0), padT + chartH);
  points.forEach((p,i) => ctx.lineTo(xForIdx(i), yForVal(p.val)));
  ctx.lineTo(xForIdx(points.length - 1), padT + chartH);
  ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  ctx.strokeStyle = accentColor; ctx.lineWidth = 2; ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p,i) => i === 0 ? ctx.moveTo(xForIdx(0), yForVal(p.val)) : ctx.lineTo(xForIdx(i), yForVal(p.val)));
  ctx.stroke();

  ctx.fillStyle = getThemeColor(0.4); ctx.font = '9px Outfit'; ctx.textAlign = 'center';
  if (points.length >= 2) {
    ctx.fillText(points[0].date.toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(0), H - padB + 14);
    ctx.fillText(points[points.length-1].date.toLocaleDateString('en-US',{month:'short',day:'numeric'}), xForIdx(points.length-1), H - padB + 14);
  }

  const insight = $('lineInsight');
  if (insight) {
    const avg = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0) / (transactions.filter(t=>t.type==='expense').length || 1);
    insight.innerHTML = `⟶ ${t('avgExpense')}: <strong>${currency}${avg.toFixed(2)}</strong> &nbsp;·&nbsp; ${t('currentBalance')}: <strong>${currency}${balance.toFixed(2)}</strong>`;
  }
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

  // Save as predefined if checked
  if (isPredefined && !editing) {
    if (predefinedTransactions.length < MAX_PREDEFINED) {
      // avoid duplicates by name
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
  // Hide predefined checkbox when editing
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
    $('confirmDeleteText').textContent = t('deleteConfirmText')
        .replace('{name}', tx.name)
        .replace('{sign}', tx.type==='income'?'+':'-')
        .replace('{currency}', currency)
        .replace('{amount}', tx.amount.toFixed(2));
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
  // Rebuild category filter list dynamically
  const catFilterList = $('catFilterList');
  if (catFilterList) {
    const allCats = getAllCategories();
    catFilterList.innerHTML = allCats.map(c =>
      `<label class="filter-opt"><input type="checkbox" class="cat-filter" value="${escHtml(c.name)}" onchange="applyFilters()"> ${c.emoji} ${escHtml(c.name)}</label>`
    ).join('');
    // Restore checked state
    catFilterList.querySelectorAll('.cat-filter').forEach(cb => {
      cb.checked = filterCats.includes(cb.value);
    });
  }

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
      $('rateInfo').innerHTML=`<strong>1 ${currencyCode} = ${rate.toFixed(4)} ${code}</strong><br>${t('liveRateVia')}`;
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
    // Also convert quick (predefined) transaction amounts
    predefinedTransactions = predefinedTransactions.map(p => ({
      ...p,
      amount: parseFloat((parseFloat(p.amount) * pendingRate).toFixed(2))
    }));
    // Convert savings goal target (stored in the goal input)
    const goalInput = $('goal');
    if (goalInput) {
      const gv = parseFloat(goalInput.value);
      if (!isNaN(gv) && gv > 0) {
        goalInput.value = parseFloat((gv * pendingRate).toFixed(2));
      }
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
  // Strip currency code suffix; keep number
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
  $('modeBtn').textContent = settings.darkMode ? '☾' : '☀';
  saveData();
  updateAnalytics();
  if (galaxyMode && settings.darkMode) startGalaxyMode(); else stopGalaxyMode();
}

function toggleLiquidGlass(on) {
  document.body.classList.toggle('liquid-glass', on);
  settings.liquidGlass = on; saveData();
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
  // Show predefined checkbox for new transactions
  const predField = document.querySelector('.predefined-field');
  if (predField) predField.style.display = '';
  setTimeout(()=>$('txName').focus(),120);
}
function closeAdd() { $('addMenu').style.display='none'; $('editIdx').value=''; }

function openSettings() { $('settingsMenu').style.display='flex'; renderSongList(); renderCustomCatList(); renderPredefinedMgmt(); }
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
  if (!s.src) { $('npArtist').textContent=t('noAudio'); musicPlaying=false; return; }
  player.src = s.src;
  player.currentTime = s.trimStart||0;
  if (settings.musicEnabled && musicPlaying) player.play().catch(()=>{});
  renderSongList();
}

function updateNowPlaying() {
  const s = songs[settings.currentSong];
  $('npTitle').textContent  = s?.title  || t('unknownSong');
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
      ${s.custom ? `<span class="song-custom-tag">${t('songCustomTag')}</span>` : ''}
      <button class="song-play-btn" onclick="selectSong(${i})" title="${t('playSongTip')}">${i===settings.currentSong&&musicPlaying?'⏸':'▶'}</button>
      <label class="toggle-switch song-toggle" title="${t('enableDisableTip')}">
        <input type="checkbox" ${s.enabled?'checked':''} onchange="toggleSongEnabled(${i},this.checked)">
        <span class="toggle-slider"></span>
      </label>
      ${s.custom?`<button class="song-del-btn" onclick="removeSong(${i})" title="${t('removeTip')}">✕</button>`:''}
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
  $('songFileLabel').textContent=t('chooseAudio');
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
      if (d.accentColor)   { accentColor=d.accentColor; document.documentElement.style.setProperty('--accent',accentColor); document.documentElement.style.setProperty('--income',accentColor); }
      if (d.settings)      settings = Object.assign(settings, d.settings);
      if (d.goal && $('goal')) $('goal').value=d.goal;
      if (d.songs) d.songs.forEach((s,i)=>{ if(songs[i]) Object.assign(songs[i],{title:s.title,artist:s.artist,enabled:s.enabled,trimStart:s.trimStart,trimEnd:s.trimEnd}); });
      if (d.customCategories) customCategories = d.customCategories;
      if (d.predefinedTransactions) predefinedTransactions = d.predefinedTransactions;
      if (d.galaxyMode !== undefined) galaxyMode = d.galaxyMode;
      currentLang = settings.language || 'en';
      applySettings(); updateUI(); renderSongList(); renderPredefined();
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
  // Directly add the transaction — no modal
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
  if (typeof flashBalance === 'function') flashBalance(p.type);
  if (typeof showToast === 'function') showToast(`${t('added')||'Added'}: ${p.name}`);
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

/* ── Galaxy Mode ──────────────────────────────────────── */
function toggleGalaxyMode(on) {
  galaxyMode = on;
  saveData();
  if (on && settings.darkMode) startGalaxyMode(); else stopGalaxyMode();
}

function startGalaxyMode() {
  document.body.classList.add('galaxy-mode');
  if (galaxyCanvas) return; // already running
  galaxyCanvas = document.createElement('canvas');
  galaxyCanvas.id = 'galaxyCanvas';
  galaxyCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0;transition:opacity 1.5s ease;';
  document.body.insertBefore(galaxyCanvas, document.body.firstChild);
  requestAnimationFrame(() => { galaxyCanvas.style.opacity = '1'; });
  runGalaxy();
}

function stopGalaxyMode() {
  document.body.classList.remove('galaxy-mode');
  if (!galaxyCanvas) return;
  galaxyCanvas.style.opacity = '0';
  setTimeout(() => {
    if (galaxyCanvas && galaxyCanvas.parentNode) galaxyCanvas.parentNode.removeChild(galaxyCanvas);
    galaxyCanvas = null;
    if (galaxyAnimId) { cancelAnimationFrame(galaxyAnimId); galaxyAnimId = null; }
  }, 1600);
}

function runGalaxy() {
  const canvas = galaxyCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  // Nebulae layers
  const nebulae = Array.from({length: 6}, (_, i) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 350 + 180,
    hue: [260, 200, 300, 180, 340, 230][i],
    sat: Math.random() * 40 + 40,
    opa: Math.random() * 0.12 + 0.04,
    dx: (Math.random() - 0.5) * 0.15,
    dy: (Math.random() - 0.5) * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.008 + 0.003,
  }));

  // Star clusters
  const stars = Array.from({length: 400}, () => ({
    x: Math.random() * 2000,
    y: Math.random() * 2000,
    r: Math.random() * 1.8 + 0.1,
    a: Math.random() * 0.8 + 0.1,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.04 + 0.01,
    hue: Math.random() > 0.8 ? Math.random() * 60 + 200 : 0, // some colored stars
    colored: Math.random() > 0.8,
  }));

  // Dust particles
  const dust = Array.from({length: 80}, () => ({
    x: Math.random() * 2000, y: Math.random() * 2000,
    r: Math.random() * 3 + 1,
    a: Math.random() * 0.06 + 0.01,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
  }));

  let t = 0;
  function frame() {
    if (!galaxyCanvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.005;

    // Draw nebulae
    nebulae.forEach(n => {
      n.x += n.dx; n.y += n.dy;
      if (n.x < -n.r) n.x = canvas.width + n.r;
      if (n.x > canvas.width + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = canvas.height + n.r;
      if (n.y > canvas.height + n.r) n.y = -n.r;
      n.pulse += n.pulseSpeed;
      const pulseOpa = n.opa * (0.8 + 0.2 * Math.sin(n.pulse));
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grad.addColorStop(0, `hsla(${n.hue},${n.sat}%,60%,${pulseOpa})`);
      grad.addColorStop(0.4, `hsla(${n.hue},${n.sat}%,40%,${pulseOpa * 0.5})`);
      grad.addColorStop(1, `hsla(${n.hue},${n.sat}%,20%,0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Draw dust
    dust.forEach(d => {
      d.x += d.dx; d.y += d.dy;
      if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,160,255,${d.a})`;
      ctx.fill();
    });

    // Draw stars with twinkle
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const opa = s.a * (0.5 + 0.5 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x % canvas.width, s.y % canvas.height, s.r, 0, Math.PI * 2);
      if (s.colored) {
        ctx.fillStyle = `hsla(${s.hue},80%,85%,${opa})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${opa})`;
      }
      ctx.fill();
      // Star glow for bright stars
      if (opa > 0.6 && s.r > 1.2) {
        const glow = ctx.createRadialGradient(s.x % canvas.width, s.y % canvas.height, 0, s.x % canvas.width, s.y % canvas.height, s.r * 4);
        glow.addColorStop(0, s.colored ? `hsla(${s.hue},80%,85%,0.3)` : `rgba(255,255,255,0.25)`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x % canvas.width, s.y % canvas.height, s.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    });

    // Occasional shooting star
    if (Math.random() < 0.003) {
      const sx = Math.random() * canvas.width;
      const sy = Math.random() * canvas.height * 0.6;
      const len = Math.random() * 150 + 80;
      const angle = (Math.random() * 30 + 10) * Math.PI / 180;
      const grad2 = ctx.createLinearGradient(sx, sy, sx + Math.cos(angle)*len, sy + Math.sin(angle)*len);
      grad2.addColorStop(0, 'transparent');
      grad2.addColorStop(1, 'rgba(200,220,255,0.9)');
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(angle)*len, sy + Math.sin(angle)*len);
      ctx.strokeStyle = grad2;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    galaxyAnimId = requestAnimationFrame(frame);
  }
  frame();
}

/* ── Init ─────────────────────────────────────────────── */
loadData();
applySettings();
initLoader();
initCosmicBg();
initNebulaParallax();
updateSortUI();
renderPredefined();
// Close new modals on backdrop click
['addCustomCategoryModal'].forEach(id=>{
  const el=$(id); if(el) el.addEventListener('click',e=>{ if(e.target===el) el.style.display='none'; });
});

/* ── Experimental Themes ──────────────────────────────────
   Off by default. Switches body[data-exp-theme] which is
   styled by experimental-themes.css. */
function applyExperimentalTheme(name) {
  const valid = ['off','mono','cumulus','ledger','prism','aurora','obsidian'];
  const v = valid.includes(name) ? name : 'off';
  if (v === 'off') document.body.removeAttribute('data-exp-theme');
  else document.body.setAttribute('data-exp-theme', v);
}
function setExperimentalTheme(name) {
  settings.experimentalTheme = name;
  applyExperimentalTheme(name);
  saveData();
}


/* ── Experimental UI Layout ───────────────────────────────
   PC-only layout rearrangements. Switches body[data-ui-layout].
   Styled via experimental-themes.css layout section. */
function applyExperimentalUiLayout(name) {
  const valid = ['off','sidebar','topbar'];
  const v = valid.includes(name) ? name : 'off';
  if (v === 'off') document.body.removeAttribute('data-ui-layout');
  else document.body.setAttribute('data-ui-layout', v);
}
function setExperimentalUiLayout(name) {
  settings.experimentalUiLayout = name;
  applyExperimentalUiLayout(name);
  saveData();
}

/* ── Sidebar collapse toggle (experimental sidebar layout) ── */
function toggleSidebarCollapse() {
  document.body.classList.toggle('sidebar-collapsed');
  try { localStorage.setItem('atlas_sidebar_collapsed', document.body.classList.contains('sidebar-collapsed') ? '1' : '0'); } catch(e){}
}
(function restoreSidebarCollapsed(){
  try { if (localStorage.getItem('atlas_sidebar_collapsed') === '1') document.body.classList.add('sidebar-collapsed'); } catch(e){}
})();
