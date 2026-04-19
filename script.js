/* ═══════════════════════════════════════════════════
   PROJECT ATLAS — script.js  (v2)
   ═══════════════════════════════════════════════════ */

'use strict';

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
};
let songs = [
  { title:'Cosmic Drift',      artist:'Project Atlas', src:'music/cosmic_drift.mp3',      custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Nebula Wind',       artist:'Project Atlas', src:'music/nebula_wind.mp3',        custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Deep Space',        artist:'Project Atlas', src:'music/deep_space.mp3',         custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Aurora Borealis',   artist:'Project Atlas', src:'music/aurora_borealis.mp3',    custom:false, enabled:true, trimStart:0, trimEnd:null },
  { title:'Event Horizon',     artist:'Project Atlas', src:'music/event_horizon.mp3',      custom:false, enabled:true, trimStart:0, trimEnd:null },
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
  // Theme
  document.documentElement.style.setProperty('--accent', accentColor);
  document.documentElement.style.setProperty('--income', accentColor);
  // Dark/light mode
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '🌙' : '☀️';
  // Liquid glass
  document.body.classList.toggle('liquid-glass', settings.liquidGlass);
  // Settings panel fields
  $('stgConfirmDelete').checked  = settings.confirmDelete;
  $('stgTsFormat').value         = settings.tsFormat;
  $('stgMaxShown').value         = settings.maxShown;
  $('maxShownVal').textContent   = settings.maxShown;
  $('stgLiquidGlass').checked    = settings.liquidGlass;
  $('stgMusicOn').checked        = settings.musicEnabled;
  // Music
  $('volSlider').value           = settings.volume;
  const player = $('audioPlayer');
  if (player) player.volume      = settings.volume;
  setLoopModeUI(settings.loopMode);
  // Currency
  $('currencyLabel').textContent = currencyLabel;
}

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

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; mkStars(); }
  function mkStars() {
    stars = Array.from({length:180}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.2+0.15, a: Math.random()*0.6+0.05,
      ts: Math.random()*0.012+0.002, td: Math.random()>.5?1:-1,
      dx: (Math.random()-.5)*.04, dy: -Math.random()*.07-.01,
    }));
  }
  function spawnShooter() {
    const x = Math.random()*canvas.width;
    const y = Math.random()*(canvas.height/2);
    const angle = (Math.random()*30+5) * Math.PI/180;
    shooters.push({ x, y, len: Math.random()*120+60, speed: Math.random()*8+5, angle, progress:0, maxProgress:1 });
    setTimeout(spawnShooter, Math.random()*4000+2000);
  }
  function frame() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const s of stars) {
      s.a+=s.ts*s.td; if(s.a>=.65||s.a<=.03) s.td*=-1;
      s.x+=s.dx; s.y+=s.dy;
      if(s.y<-2) s.y=canvas.height+2;
      if(s.x<-2) s.x=canvas.width+2;
      if(s.x>canvas.width) s.x=-2;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
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

/* ── Main UI Update ───────────────────────────────────── */
function updateUI() {
  // Balance display
  const neg = balance < 0;
  $('balanceSign').textContent  = neg ? '-' : '';
  $('currencyDisp').textContent = currency;
  $('balance').textContent      = Math.abs(balance).toFixed(2);
  $('balance').parentElement.style.color = neg ? 'var(--expense)' : '';

  // Currency header
  $('currencyLabel').textContent = currencyLabel;
  $('goalCurrency').textContent  = currency;

  // Totals
  const totalIn  = transactions.filter(t=>t.type==='income') .reduce((s,t)=>s+t.amount,0);
  const totalOut = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  $('totalIncome') .textContent = totalIn .toFixed(2);
  $('totalExpense').textContent = totalOut.toFixed(2);

  // Date/time
  updateDatetime();
  renderTransactions();
  updateProgress();
  saveData();
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
  if (!list.length) { empty.style.display='block'; return; }
  empty.style.display='none';
  list.forEach((t,i) => {
    const realIdx = transactions.length - 1 - i;
    container.appendChild(buildTxItem(t, realIdx, false));
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
    <button class="t-delete" onclick="requestDelete(${realIdx})" title="Delete">✕</button>
  `;
  return div;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Progress circle ──────────────────────────────────── */
function updateProgress() {
  const goalVal  = parseFloat($('goal').value)||0;
  const pSpan    = $('progress').querySelector('span');
  const pLabel   = $('progressLabel');
  if (!goalVal) {
    $('progress').style.background='conic-gradient(rgba(255,255,255,0.06) 0deg,rgba(255,255,255,0.06) 360deg)';
    pSpan.textContent='0%'; pLabel.textContent='Set a goal to track your progress'; return;
  }
  const pct = Math.min(Math.max((balance/goalVal)*100,0),100);
  $('progress').style.background=`conic-gradient(var(--accent) ${pct*3.6}deg,rgba(255,255,255,0.06) ${pct*3.6}deg)`;
  pSpan.textContent=`${pct.toFixed(0)}%`;
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
  let valid = true;
  if (!name)          { shakeEl($('txName'));   valid=false; }
  if (!amount||amount<=0) { shakeEl($('txAmount')); valid=false; }
  if (!valid) return;
  if (type==='income') balance+=amount; else balance-=amount;
  transactions.push({ name, amount, type, category, note, createdAt: new Date().toISOString() });
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

/* ── Delete Transaction ───────────────────────────────── */
function requestDelete(idx) {
  const t = transactions[idx];
  if (!t) return;
  if (settings.confirmDelete) {
    pendingDeleteIdx = idx;
    $('confirmDeleteText').textContent =
      `Delete "${escHtml(t.name)}" (${t.type==='income'?'+':'-'}${currency}${t.amount.toFixed(2)})? This cannot be undone.`;
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
  if (t.type==='income') balance-=t.amount; else balance+=t.amount;
  transactions.splice(idx,1);
  updateUI();
  renderFullTransactions();
}

function closeConfirmDelete() { $('confirmDeleteModal').style.display='none'; }

/* ── Clear All ────────────────────────────────────────── */
function confirmClearAll() { $('confirmClearModal').style.display='flex'; }

function clearAllTransactions() {
  transactions=[]; balance=0; updateUI();
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

  // Apply filters
  const ftypes = filterTypes; const fcats = filterCats;
  if (ftypes.length) list = list.filter(t=>ftypes.includes(t.type));
  if (fcats.length)  list = list.filter(t=>fcats.includes(t.category));

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

  // Map to original indices
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
  fetch(`https://api.frankfurter.app/latest?from=${currencyCode}&to=${code}`)
    .then(r=>r.json())
    .then(data=>{
      pendingRate = data.rates[code];
      $('rateInfo').innerHTML=`<strong>1 ${currencyCode} = ${pendingRate?.toFixed(4)||'N/A'} ${code}</strong><br>Live rate via frankfurter.app`;
      $('convertBtn').disabled=!pendingRate;
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

/* ── Theme ────────────────────────────────────────────── */
function setColor(color) {
  accentColor = color;
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--income', color);
  updateProgress();
  saveData();
}

function toggleMode() {
  settings.darkMode = !settings.darkMode;
  document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  $('modeBtn').textContent = settings.darkMode ? '🌙' : '☀️';
  saveData();
}

function toggleLiquidGlass(on) {
  document.body.classList.toggle('liquid-glass', on);
  settings.liquidGlass = on; saveData();
}

/* ── Add/Close modals ─────────────────────────────────── */
function openAdd() {
  $('txName').value=''; $('txAmount').value=''; $('txNote').value='';
  $('txCategory').value='General'; setType('income');
  $('addMenu').style.display='flex';
  setTimeout(()=>$('txName').focus(),120);
}
function closeAdd() { $('addMenu').style.display='none'; }

function openSettings() { $('settingsMenu').style.display='flex'; renderSongList(); }
function closeSettings() { $('settingsMenu').style.display='none'; }

/* Close modal on backdrop click */
['addMenu','transactionsFull','settingsMenu','confirmDeleteModal','confirmClearModal','currencyConvertModal','addSongModal'].forEach(id=>{
  const el = $(id);
  if (el) el.addEventListener('click', e=>{ if(e.target===el) el.style.display='none'; });
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

// Audio events
document.addEventListener('DOMContentLoaded', () => {
  const player = audioEl();
  if (!player) return;
  player.addEventListener('timeupdate', ()=>{
    if (!player.duration) return;
    const s = songs[settings.currentSong];
    const start = s?.trimStart||0, end = s?.trimEnd||player.duration;
    // Enforce trim end
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

function toggleTrim(on) {
  $('trimControls').style.display=on?'block':'none';
}

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
  songFileObjectUrl=null; // Don't revoke — it's now in use
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
updateSortUI();
