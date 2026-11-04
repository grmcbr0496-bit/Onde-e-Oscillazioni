"use strict";
/* Onde & Formule — motore del gioco.
   Unisce "L'albero delle formule" (ripasso distanziato delle formule) e "Capire le onde" (laboratori e
   domande di concetto), con problemi da scritto, allenamento misto, errori da rivedere e progressi.
   Regola di sicurezza: ogni testo finisce nel DOM passando da esc() o rich(); i dati importati
   vengono validati campo per campo e mai inseriti come HTML. */

const APP_VERSION = "1.0.0";
const KEY = "onde-formule-v2";
const DAY = 864e5;
const IV = [0, DAY, 2 * DAY, 4 * DAY, 7 * DAY, 14 * DAY];
const RANKS = ["Molla a riposo", "Piccole oscillazioni", "Oscillatore smorzato", "Forzante in fase", "In risonanza",
  "Modo normale", "Onda stazionaria", "Fronte d'onda", "Interferenza costruttiva", "Reticolo di diffrazione", "Disco di Airy", "Maestro di D'Alembert"];
const XP_PER_LEVEL = 250, MISSION_XP = 25, RAPIDO_MS = 5 * 60 * 1000;
const HL = n => "h" + (((n - 1) % 5) + 1) + "c";
const CH = CHAPTERS;
const GRAPHS_L = typeof GRAPHS !== "undefined" ? GRAPHS : [];
const CONCEPTS_L = typeof CONCEPTS !== "undefined" ? CONCEPTS : [];
/* mappe senza prototipo: un id come "constructor" o "__proto__" in un file importato non trova nulla */
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const dict = list => Object.assign(Object.create(null), Object.fromEntries(list.map(x => [x.id, x])));
const BY_ID = dict(CARDS), Q_BY = dict(QUIZ), G_BY = dict(GRAPHS_L), P_BY = dict(PROBLEMS), K_BY = dict(CONCEPTS_L);
const labKey = id => { const m = /^(\d+)([a-z]*)$/.exec(id) || [0, 99, id]; return [LABS[id].c || +m[1], +m[1], m[2]]; };
const LAB_IDS = Object.keys(LABS).sort((a, b) => { const A = labKey(a), B = labKey(b); return A[0] - B[0] || A[1] - B[1] || (A[2] < B[2] ? -1 : A[2] > B[2] ? 1 : 0); });
const labsOf = ch => LAB_IDS.filter(id => LABS[id].c === ch);
const TYPE_NAME = { card: "Formula", q: "Concetto", g: "Grafico", p: "Problema" };

/* ---------- utilità ---------- */
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const fill = (c, piece) => c.t.split("@@").join(piece);
const full = c => fill(c, c.a);
const clozeTex = c => fill(c, "\\boxed{\\;?\\;}");
const today = (days = 0) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toLocaleDateString("sv-SE"); };   // per giorni di calendario: regge il cambio dell'ora
/* testo con formule $...$ e **grassetto**: il testo viene sempre passato da esc() */
const rich = s => String(s == null ? "" : s).split("$").map((p, i) => i % 2 ? `<span class="im" data-tex="${esc(p)}"></span>` : esc(p).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")).join("");
const M = (tex, inline) => `<div class="math" data-tex="${esc(tex)}"${inline ? " data-inline" : ""}></div>`;
const plural = (n, a, b) => n + " " + (n === 1 ? a : b);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- stato e salvataggio ---------- */
function blank() {
  return { v: 2, app: "onde-formule", updatedAt: 0, xp: 0, streak: { n: 0, last: "", best: 0 }, best: { lampo: 0, rapido: 0, mix: 0 },
    cards: {}, qs: {}, gs: {}, probs: {}, missions: {}, errors: {}, days: {}, labs: {}, exam: {}, settings: { theme: "auto", volume: 0.3 } };
}
const isInt = (x, a, b) => Number.isFinite(x) && Math.floor(x) === x && x >= a && x <= b;
const num = (x, a, b, d) => (Number.isFinite(+x) && x !== null && x !== "" ? clamp(+x, a, b) : d);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function cleanSrs(x) {
  if (!x || typeof x !== "object") return null;
  return { b: Math.round(num(x.b, 0, 5, 0)), due: num(x.due, 0, 4e12, 0), s: Math.round(num(x.s, 0, 1e6, 0)), r: Math.round(num(x.r, 0, 1e6, 0)), w: Math.round(num(x.w, 0, 1e6, 0)), seen: x.seen ? 1 : 0 };
}
function errExists(key) {
  const i = key.indexOf(":"); if (i < 0) return false;
  const t = key.slice(0, i), id = key.slice(i + 1);
  return (t === "c" && !!BY_ID[id]) || (t === "q" && !!Q_BY[id]) || (t === "g" && !!G_BY[id]) || (t === "p" && !!P_BY[id]);
}
function missionValid(key) {
  const m = /^([0-9]+[a-z]*)\.(\d+)$/.exec(key);
  return !!(m && own(LABS, m[1]) && +m[2] < LABS[m[1]].missions.length);
}
/* Costruisce uno stato pulito copiando solo campi noti e validati (vale per localStorage e per i file importati). */
function sanitize(src) {
  const out = blank();
  if (!src || typeof src !== "object") return out;
  out.updatedAt = num(src.updatedAt, 0, 4e12, 0);
  out.xp = Math.round(num(src.xp, 0, 1e7, 0));
  if (src.streak && typeof src.streak === "object") {
    out.streak.n = Math.round(num(src.streak.n, 0, 1e5, 0));
    out.streak.best = Math.max(out.streak.n, Math.round(num(src.streak.best, 0, 1e5, 0)));
    out.streak.last = typeof src.streak.last === "string" && DATE_RE.test(src.streak.last) ? src.streak.last : "";
  }
  if (src.best && typeof src.best === "object") for (const k of ["lampo", "rapido", "mix"]) out.best[k] = Math.round(num(src.best[k], 0, 1e6, 0));
  const srs = (from, to, ok) => { if (from && typeof from === "object") for (const id of Object.keys(from)) if (ok(id)) { const x = cleanSrs(from[id]); if (x) to[id] = x; } };
  srs(src.cards, out.cards, id => !!BY_ID[id]);
  srs(src.qs, out.qs, id => !!Q_BY[id]);
  srs(src.gs, out.gs, id => !!G_BY[id]);
  srs(src.probs, out.probs, id => !!P_BY[id]);
  if (src.missions && typeof src.missions === "object") for (const k of Object.keys(src.missions)) if (src.missions[k] && missionValid(k)) out.missions[k] = 1;
  if (src.errors && typeof src.errors === "object") for (const k of Object.keys(src.errors)) {
    const e = src.errors[k]; if (!errExists(k) || !e || typeof e !== "object") continue;
    out.errors[k] = { n: Math.round(num(e.n, 1, 1e5, 1)), last: num(e.last, 0, 4e12, 0), fix: Math.round(num(e.fix, 0, 5, 0)) };
  }
  if (src.days && typeof src.days === "object") {
    const keys = Object.keys(src.days).filter(d => DATE_RE.test(d)).sort().slice(-120);
    for (const d of keys) out.days[d] = Math.round(num(src.days[d], 0, 1e5, 0));
  }
  if (src.labs && typeof src.labs === "object") for (const k of Object.keys(src.labs)) if (own(LABS, k)) out.labs[k] = 1;
  if (src.exam && typeof src.exam === "object") for (const k of Object.keys(src.exam)) if (K_BY[k]) out.exam[k] = 1;
  if (src.settings && typeof src.settings === "object") {
    if (["auto", "light", "dark"].includes(src.settings.theme)) out.settings.theme = src.settings.theme;
    out.settings.volume = num(src.settings.volume, 0, 0.6, 0.3);   // mai più alto del 60% da un file salvato
  }
  return out;
}
/* Unisce nello stato corrente i progressi delle due app originali (formato v1). */
function mergeLegacy(cur, old) {
  const add = (to, from) => { for (const id of Object.keys(from)) { const a = to[id], b = from[id]; if (!a || (b.s > a.s)) to[id] = b; } };
  const o = sanitize({ cards: old.cards, qs: old.qs, missions: old.missions, xp: old.xp, streak: old.streak, best: old.best });
  add(cur.cards, o.cards); add(cur.qs, o.qs);
  Object.assign(cur.missions, o.missions);
  cur.xp = Math.max(cur.xp, o.xp); cur.best.lampo = Math.max(cur.best.lampo, o.best.lampo);
  cur.streak.best = Math.max(cur.streak.best, o.streak.best);
  return cur;
}
function loadState() {
  try { const raw = localStorage.getItem(KEY); if (raw) return sanitize(JSON.parse(raw)); } catch (e) {}
  // primo avvio: se sullo stesso dominio ci sono i progressi delle due app originali, li recupero
  let s = blank();
  for (const k of ["onde-formule-v1", "onde-capire-v1"]) {
    try { const old = JSON.parse(localStorage.getItem(k)); if (old && old.v === 1) s = mergeLegacy(s, old); } catch (e) {}
  }
  return s;
}
let S = loadState();
let saveWarned = false;
function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { if (!saveWarned) { saveWarned = true; toast("Non riesco a salvare in questo browser: esporta i progressi per non perderli."); } }
}
const srsOf = (store, id) => S[store][id] || { b: 0, due: 0, s: 0, r: 0, w: 0, seen: 0 };
const cs = id => srsOf("cards", id);
const isSeen = id => !!(S.cards[id] && S.cards[id].seen);
const isDue = (id, now) => isSeen(id) && S.cards[id].due <= now;

function touchStreak() {
  const t = today();
  S.days[t] = (S.days[t] || 0) + 1;
  if (S.streak.last === t) return;
  S.streak.n = S.streak.last === today(-1) ? S.streak.n + 1 : 1;
  S.streak.last = t;
  S.streak.best = Math.max(S.streak.best, S.streak.n);
}
function noteError(key, ok) {
  const e = S.errors[key];
  if (!ok) { S.errors[key] = { n: (e ? e.n : 0) + 1, last: Date.now(), fix: 0 }; return; }
  if (e) { e.fix++; if (e.fix >= 2) delete S.errors[key]; }
}
/* formule — kind: rec (riconoscere), mem (a memoria), lampo, study. res: ok | quasi | no */
function gradeCard(id, kind, res) {
  const x = Object.assign({ b: 0, due: 0, s: 0, r: 0, w: 0, seen: 0 }, S.cards[id]);
  const now = Date.now();
  x.seen = 1;
  if (kind === "study") { x.due = now; }
  else if (kind === "lampo") {
    if (!(S.cards[id] && S.cards[id].seen)) { touchStreak(); return; }   // una formula mai studiata non entra nel ripasso da un Lampo
    if (res === "no") { x.b = Math.max(0, x.b - 1); x.due = now; x.w++; } else { x.r++; }
    x.s++;
  } else {
    x.s++;
    if (res === "ok") {
      x.r++;
      if (kind === "mem") x.b = Math.min(5, x.b + 1);
      else if (x.b < 3) x.b = x.b + 1;
      x.due = now + IV[x.b];
    } else if (res === "quasi") {
      x.b = Math.max(1, Math.min(x.b, 2)); x.due = now + IV[1];
    } else {
      x.w++; x.b = 0; x.due = now;
    }
  }
  S.cards[id] = x;
  if (kind !== "study") noteError("c:" + id, res === "ok");
  touchStreak();
}
function gradeSrs(store, prefix, id, ok) {
  const x = Object.assign({ b: 0, due: 0, s: 0, r: 0, w: 0, seen: 0 }, S[store][id]), now = Date.now();
  x.seen = 1; x.s++;
  if (ok) { x.r++; x.b = Math.min(5, x.b + 1); x.due = now + IV[x.b]; } else { x.w++; x.b = 0; x.due = now; }
  S[store][id] = x; noteError(prefix + ":" + id, ok); touchStreak();
}
function mastery(list) { list = list || CARDS; if (!list.length) return 0; let s = 0; for (const c of list) s += cs(c.id).b; return s / (5 * list.length); }
function srsMastery(store, list) { if (!list.length) return 0; let s = 0; for (const q of list) s += srsOf(store, q.id).b; return s / (5 * list.length); }
const probSolved = id => { const x = S.probs[id]; return !!(x && x.r > 0 && x.b > 0); };
function probMastery(list) { if (!list.length) return 0; return list.filter(p => probSolved(p.id)).length / list.length; }
const level = () => Math.floor(S.xp / XP_PER_LEVEL);
const rankName = l => RANKS[Math.min(l, RANKS.length - 1)];
const missionsDone = id => LABS[id].missions.filter((_, i) => S.missions[id + "." + i]).length;
const totalMissions = () => LAB_IDS.reduce((a, k) => a + LABS[k].missions.length, 0);
const doneMissions = () => Object.keys(S.missions).length;
function labMastery(ch) { const ids = labsOf(ch); let t = 0, d = 0; for (const id of ids) { t += LABS[id].missions.length; d += missionsDone(id); } return t ? d / t : 0; }

/* ---------- formule (KaTeX) ---------- */
function renderTex(el) {
  const src = el.getAttribute("data-tex"), inline = el.classList.contains("im") || el.hasAttribute("data-inline");
  if (window.katex) {
    try { window.katex.render(el.hasAttribute("data-inline") ? "\\displaystyle " + src : src, el, { displayMode: !inline, throwOnError: false, strict: "ignore" }); }
    catch (e) { el.textContent = src; el.classList.add("raw"); }
  } else { el.textContent = src; el.classList.add("raw"); }
}
function fit(el) { el.style.fontSize = ""; let f = 1; while (el.scrollWidth > el.clientWidth + 1 && f > 0.66) { f -= 0.05; el.style.fontSize = f + "em"; } }   // sotto il 65% la formula scorre di lato
/* una formula in linea più larga della riga va su una riga sua, rimpicciolita o scorrevole */
function fixWideInline(root) {
  root.querySelectorAll(".im").forEach(el => {
    if (!el.isConnected) return;
    const host = el.parentElement && el.parentElement.closest("p, li, h3, .otext, .ro, .mt, .datatab > span, div");
    const max = host ? host.clientWidth : 0; if (!max) return;
    for (const b of el.querySelectorAll(".katex-html > .base")) if (b.getBoundingClientRect().width > max + 1) { el.classList.add("im-wide"); fit(el); break; }
  });
}
function mathAll(root) {
  const els = root.querySelectorAll("[data-tex]"); els.forEach(renderTex);
  const blocks = root.querySelectorAll(".math");
  const pass = () => { blocks.forEach(el => el.isConnected && fit(el)); fixWideInline(root); };
  requestAnimationFrame(pass);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pass);
}

/* ---------- toast e banner ---------- */
function toast(msg) {
  const box = document.getElementById("toast"), d = document.createElement("div");
  while (box.children.length >= 2) box.firstChild.remove();
  d.className = "t"; d.innerHTML = rich(msg); box.appendChild(d); mathAll(d);
  setTimeout(() => d.remove(), Math.min(6500, 2400 + 35 * String(msg).length));
}
function banner(text, label, onClick) {
  const b = document.getElementById("banner");
  b.innerHTML = `<p>${esc(text)}</p><button class="btn small primary" id="bannerbtn">${esc(label)}</button><button class="link" id="bannerx" aria-label="Chiudi">✕</button>`;
  b.hidden = false;
  document.getElementById("bannerbtn").onclick = () => { b.hidden = true; onClick(); };
  document.getElementById("bannerx").onclick = () => { b.hidden = true; };
}

/* ---------- la corda (combo = modo normale) ---------- */
const Wave = {
  cv: null, ctx: null, A: 0.3, target: 0.3, n: 1, t: 0, flash: 0, tone: "good", raf: 0, colors: null, still: reduce,
  attach(cv) {
    this.cv = cv; if (!cv) return;
    this.ctx = cv.getContext("2d"); this.readColors(); this.resize();
    if (this.still) this.draw(); else if (!this.raf) this.loop();
  },
  readColors() { this.colors = { ink: COL.ink, hl: COL.hl4, good: COL.good, bad: COL.bad }; },
  resize() {
    if (!this.cv) return;
    const r = this.cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    this.cv.width = Math.max(1, Math.round(r.width * dpr)); this.cv.height = Math.max(1, Math.round(r.height * dpr)); this.dpr = dpr;
  },
  set(a, n) { this.target = a; this.n = n; if (this.still) this.draw(); },
  kick(combo) {
    this.n = combo >= 9 ? 5 : combo >= 6 ? 4 : combo >= 4 ? 3 : combo >= 2 ? 2 : 1;
    this.A = Math.min(1, this.A + 0.28 + 0.04 * combo); this.flash = 1; this.tone = "good";
    if (this.still) this.draw();
  },
  damp() { this.A *= 0.25; this.n = 1; this.flash = 1; this.tone = "bad"; if (this.still) this.draw(); },
  loop() {
    const step = () => {
      if (!this.cv || !this.cv.isConnected) { this.raf = 0; return; }
      this.t += 1 / 60; this.A += (this.target - this.A) * 0.012; this.flash = Math.max(0, this.flash - 0.025);
      this.draw(); this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  },
  draw() {
    const cv = this.cv, ctx = this.ctx;
    if (!cv || !ctx || !cv.isConnected) return;
    const w = cv.width, h = cv.height, d = this.dpr || 1, C = this.colors;
    ctx.clearRect(0, 0, w, h);
    const pad = 12 * d, x0 = pad, x1 = w - pad, mid = h / 2, amp = (h / 2 - 8 * d) * this.A;
    const om = 2 * Math.PI * (0.55 + 0.22 * this.n), ph = this.still ? 1 : Math.cos(om * this.t);
    const pts = [];
    for (let i = 0; i <= 160; i++) { const u = i / 160; pts.push([x0 + u * (x1 - x0), mid - amp * Math.sin(this.n * Math.PI * u) * ph]); }
    const path = () => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    path(); ctx.strokeStyle = C.hl; ctx.lineWidth = 11 * d; ctx.stroke();
    if (this.flash > 0) { ctx.globalAlpha = this.flash * 0.8; path(); ctx.strokeStyle = this.tone === "good" ? C.good : C.bad; ctx.lineWidth = 6 * d; ctx.stroke(); ctx.globalAlpha = 1; }
    path(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2.2 * d; ctx.stroke();
    ctx.fillStyle = C.ink;
    for (let k = 0; k <= this.n; k++) { const x = x0 + (k / this.n) * (x1 - x0); ctx.beginPath(); ctx.arc(x, mid, (k === 0 || k === this.n ? 4.5 : 2.6) * d, 0, 2 * Math.PI); ctx.fill(); }
  }
};
window.addEventListener("resize", () => { Wave.resize(); if (Wave.still) Wave.draw(); drawPlots(app); });

/* ---------- navigazione (con il tasto indietro di Android) ---------- */
let VIEW = { name: "home" };
const app = document.getElementById("app");
const SECTION_OF = { home: "home", formule: "formule", chapter: "formule", lampo: "formule", "lampo-end": "formule", labs: "labs", lab: "labs",
  quiz: "quiz", problemi: "problemi", problema: "problemi", progressi: "progressi", errori: "home", allena: "home", concept: "formule" };
function cleanupView() {
  stopLab();
  if (L && L.timer && VIEW.name === "lampo") { clearInterval(L.timer); }
}
function go(name, extra, opt) {
  cleanupView();
  VIEW = Object.assign({ name }, extra || {});
  const st = { v: VIEW };
  try { if (opt && opt.replace) history.replaceState(st, ""); else history.pushState(st, ""); } catch (e) {}
  render(); window.scrollTo(0, 0);
}
window.addEventListener("popstate", e => {
  cleanupView();
  VIEW = (e.state && e.state.v) || { name: "home" };
  render(); window.scrollTo(0, 0);
});
function render() {
  const n = VIEW.name;
  if ((n === "session" || n === "results") && (!SES || (VIEW.sid && VIEW.sid !== SES.sid))) VIEW = { name: "home" };
  else if (n === "session" && SES.finished) VIEW = { name: "results", sid: SES.sid };
  if ((n === "lampo" || n === "lampo-end") && (!L || (VIEW.lid && VIEW.lid !== L.id))) VIEW = { name: "formule" };
  else if (n === "lampo" && L.xp != null) VIEW = { name: "lampo-end", lid: L.id };
  else if (n === "lampo-end" && L.xp == null) VIEW = { name: "lampo", lid: L.id };
  const R = { home: renderHome, formule: renderFormule, chapter: renderChapter, concept: renderConcept, session: renderItem, results: renderResults,
    lampo: renderLampo, "lampo-end": renderLampoEnd, labs: renderLabs, lab: renderLab, quiz: renderQuizHome, problemi: renderProblems,
    problema: renderProblem, allena: renderAllena, errori: renderErrors, progressi: renderProgress }[VIEW.name] || renderHome;
  R();
  renderTop(); renderNav();
}
function renderTop() {
  const l = level(), inLvl = S.xp - l * XP_PER_LEVEL;
  document.getElementById("top").innerHTML = `
    <div class="top-in">
      <div class="brand">Onde <span class="amp">&amp;</span> Formule</div>
      <div class="lvl">Liv. ${l + 1} <b>${esc(rankName(l))}</b><br>${S.xp} XP</div>
      <div class="streak" title="Giorni di fila con almeno un esercizio">${plural(S.streak.n, "giorno", "giorni")}</div>
    </div>
    <div class="xpbar" aria-hidden="true"><i style="width:${(inLvl / XP_PER_LEVEL * 100).toFixed(1)}%"></i></div>`;
}
const ICONS = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  formule: '<path d="M17 4H7l6 8-6 8h10"/>',
  labs: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"/><path d="M12 17.5v.01"/>',
  problemi: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
  progressi: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
};
function renderNav() {
  const cur = SECTION_OF[VIEW.name] || (VIEW.name === "session" || VIEW.name === "results" ? (SES && SES.section) || "home" : "home");
  const items = [["home", "Home"], ["formule", "Formule"], ["labs", "Lab"], ["quiz", "Quiz"], ["problemi", "Problemi"], ["progressi", "Progressi"]];
  document.getElementById("nav").innerHTML = `<div class="nav-in">${items.map(([k, l]) =>
    `<button data-act="nav" data-to="${k}"${cur === k ? ' aria-current="page"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg><span>${l}</span></button>`).join("")}</div>`;
}

/* ---------- home ---------- */
function formulaPlan() {
  const now = Date.now();
  const due = CARDS.filter(c => isDue(c.id, now)).sort((a, b) => cs(a.id).due - cs(b.id).due);
  const fresh = CARDS.filter(c => !isSeen(c.id));
  const dueTake = due.slice(0, 15);
  const freshTake = fresh.slice(0, Math.max(0, Math.min(5, 15 - dueTake.length)));
  return { due, fresh, dueTake, freshTake };
}
function quizPlan() {
  const now = Date.now();
  const due = QUIZ.filter(q => srsOf("qs", q.id).seen && srsOf("qs", q.id).due <= now).sort((a, b) => srsOf("qs", a.id).due - srsOf("qs", b.id).due).slice(0, 12);
  const fresh = QUIZ.filter(q => !srsOf("qs", q.id).seen).slice(0, Math.max(0, Math.min(6, 12 - due.length)));
  return { due, fresh };
}
const errCount = () => Object.keys(S.errors).length;
function overall() {
  const f = mastery(), q = srsMastery("qs", QUIZ), l = totalMissions() ? doneMissions() / totalMissions() : 0, p = probMastery(PROBLEMS);
  return { f, q, l, p, all: (f + q + l + p) / 4 };
}
function renderHome() {
  const fp = formulaPlan(), qp = quizPlan(), o = overall(), ne = errCount();
  const n = 1 + Math.min(4, Math.floor(o.all * 5));
  const pdone = PROBLEMS.filter(p => probSolved(p.id)).length;
  const sec = (k, num, title, sub, stat, wide) => `<button class="sec${wide ? " wide" : ""}" data-act="nav" data-to="${k}"><span class="sn">${num}</span><b>${title}</b><span>${sub}</span><span class="stat">${stat}</span></button>`;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">Onde e Oscillazioni · preparazione allo scritto</div>
    <h1>Onde <span class="mark">&amp; Formule</span></h1>
    <div class="wavebox"><canvas id="wave" aria-hidden="true"></canvas>
      <div class="wave-cap">preparazione ${Math.round(o.all * 100)}% · modo n = ${n}</div></div>
    <div class="today">
      <div class="today-num"><b>${fp.dueTake.length}</b> formule e <b>${qp.due.length}</b> concetti da ripassare · <b>${ne}</b> ${ne === 1 ? "errore" : "errori"} da rivedere</div>
      <button class="btn primary big" data-act="rapido">Ripasso rapido · 5 minuti</button>
    </div>
    <button class="btn lampo-btn" data-act="today"><span class="lb"><b>Ripasso di oggi</b><span>le formule in scadenza, con il ripasso distanziato</span></span><span class="rec">${fp.dueTake.length + fp.freshTake.length} schede</span></button>
  </section>
  <section>
    <h2>Le sezioni</h2>
    <div class="sections">
      ${sec("formule", "1", "Formulario", "tutte le schede, con simboli, validità ed errori tipici", `${Math.round(o.f * 100)}% padronanza`)}
      ${sec("labs", "2", "Laboratori", "simulazioni da toccare con mano", `missioni ${doneMissions()}/${totalMissions()}`)}
      ${sec("quiz", "3", "Quiz concettuali", "scelta multipla con spiegazione subito", `${Math.round(o.q * 100)}% concetti`)}
      ${sec("problemi", "4", "Problemi da scritto", "esercizi numerici con soluzione guidata", `risolti ${pdone}/${PROBLEMS.length}`)}
      ${sec("allena", "5", "Allenamento", "misto: formula, concetto, grafico, problema", `record ${S.best.mix}`)}
      ${sec("errori", "6", "Errori da rivedere", "le domande e le schede sbagliate", `${ne} da rivedere`)}
      ${sec("progressi", "7", "Progressi", "statistiche, streak, record e mappa delle lacune", `${plural(S.streak.n, "giorno", "giorni")} di fila`, true)}
    </div>
  </section>
  <section class="how">
    <h2>Come funziona</h2>
    <p>Ogni formula, domanda e problema torna con il ripasso distanziato: se rispondi bene lo rivedi più in là (1, 2, 4, 7, 14 giorni), se sbagli te lo ripropongo subito e finisce tra gli errori da rivedere. Un errore esce dalla lista dopo due risposte giuste di fila. Ogni schermata risponde a tre domande: <b>cosa sto vedendo</b>, <b>perché succede</b>, <b>quale formula uso</b>.</p>
  </section>
  <div class="foot"><span>Progressi salvati in questo dispositivo · v${APP_VERSION}</span><button class="link" data-act="nav" data-to="progressi">Esporta / importa</button></div>`;
  Wave.attach(document.getElementById("wave"));
  Wave.set(0.34 + 0.6 * o.all, n); Wave.A = Math.max(Wave.A, 0.34 + 0.6 * o.all);
}

/* ---------- 1. Formulario ---------- */
function pipsHtml(list) { return `<span class="pips" aria-hidden="true">${list.map(c => `<i class="pip${isSeen(c.id) ? " b" + cs(c.id).b : ""}"></i>`).join("")}</span>`; }
function chipsHtml(sel, act) {
  return [0].concat(CH.map((_, i) => i + 1)).map(k =>
    `<button class="chip" data-act="${act}" data-ch="${k}" aria-pressed="${sel === k}" title="${k ? esc(CH[k - 1]) : "Tutti i capitoli"}">${k ? k : "Tutti"}</button>`).join("");
}
let FILTER = 0;
function renderFormule() {
  const p = formulaPlan(), m = mastery(), nothing = p.dueTake.length + p.freshTake.length === 0;
  const rows = CH.map((name, i) => {
    const list = CARDS.filter(c => c.c === i + 1);
    return `<li><button class="branch" data-act="chapter" data-ch="${i + 1}">
      <span class="cn ${HL(i + 1)}">${i + 1}</span>
      <span class="cname">${esc(name)}${pipsHtml(list)}</span>
      <span class="pct">${Math.round(mastery(list) * 100)}%</span></button></li>`;
  }).join("");
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">1 · Formulario</div>
    <h1>L'albero <span class="mark">delle formule</span></h1>
    <p class="muted" style="margin:0">${CARDS.length} schede in ${CH.length} rami. Ogni scheda ha il significato dei simboli, le condizioni di validità, l'errore tipico e il laboratorio collegato. Padronanza complessiva ${Math.round(m * 100)}%.</p>
    <div class="today">
      <div class="today-num">${nothing ? "Per oggi è tutto ripassato. Allenati sotto o ripassa le più deboli." : `<b>${p.dueTake.length}</b> da ripassare · <b>${p.freshTake.length}</b> nuove oggi`}</div>
      <button class="btn primary big" data-act="today">${nothing ? "Ripassa le più deboli" : "Inizia il ripasso"}</button>
    </div>
    <button class="btn lampo-btn" data-act="lampo"><span class="lb"><b>Lampo</b><span>giusta o sbagliata? 60 secondi</span></span><span class="rec">record ${S.best.lampo}</span></button>
  </section>
  <section>
    <h2>Allenamento libero</h2>
    <div class="chips" role="group" aria-label="Capitoli">${chipsHtml(FILTER, "filter")}</div>
    <div class="modes">
      <button class="mode" data-act="free" data-mode="cloze"><b>Completa</b><span>trova il pezzo mancante della formula</span></button>
      <button class="mode" data-act="free" data-mode="quale"><b>Quale formula?</b><span>quattro versioni della stessa formula, una sola giusta</span></button>
      <button class="mode" data-act="free" data-mode="memoria"><b>A memoria</b><span>scrivila su carta, poi controlla</span></button>
    </div>
  </section>
  <section>
    <h2>I dodici rami</h2>
    <div class="legend"><span><i class="pip"></i>mai vista</span><span><i class="pip b0"></i>da rifare</span><span><i class="pip b2"></i>in corso</span><span><i class="pip b5"></i>padroneggiata</span></div>
    <ol class="tree">${rows}</ol>
  </section>
  <section class="how">
    <h2>Come funziona</h2>
    <p>Ogni formula ha sei livelli. Una risposta giusta la fa salire e la rimanda più in là (1, 2, 4, 7, 14 giorni); una sbagliata la riporta a zero e te la ripropone subito. Riconoscerla basta fino al livello 3: gli ultimi due si conquistano solo a memoria. Ogni risposta giusta di fila eccita un modo più alto della corda.</p>
  </section>`;
}
function cardDetails(c, open) {
  const sym = (c.sym || []).map(([t, d]) => `<span class="sk">${t ? `<span class="im" data-tex="${esc(t)}"></span>` : ""}</span><span>${rich(d)}</span>`).join("");
  const rel = (c.rel || []).filter(id => BY_ID[id]).map(id => `<button class="chip" data-act="card" data-id="${esc(id)}">${esc(id)} · ${esc(BY_ID[id].n)}</button>`).join("");
  const labs = [].concat(c.lab || []).filter(id => LABS[id]).map(id => `<button class="chip" data-act="lab" data-id="${esc(id)}">Lab: ${esc(LABS[id].title)}</button>`).join("");
  const kc = CONCEPTS_L.filter(k => (k.cards || []).includes(c.id)).map(k => `<button class="chip" data-act="concept" data-id="${esc(k.id)}">Concetto: ${esc(k.title)}</button>`).join("");
  const has = sym || c.val || c.err || rel || labs || kc;
  if (!has) return "";
  return `<details${open ? " open" : ""}><summary>Simboli, validità, errore tipico, collegamenti</summary><div class="dl">
    ${sym ? `<div><h4>Significato dei simboli</h4><div class="syms">${sym}</div></div>` : ""}
    ${c.val ? `<div class="val-box"><h4>Quando vale</h4><p>${rich(c.val)}</p></div>` : ""}
    ${c.err ? `<div class="err-box"><h4>Errore tipico</h4><p>${rich(c.err)}</p></div>` : ""}
    ${labs || rel || kc ? `<div><h4>Collegamenti</h4><div class="chips links">${labs}${kc}${rel}</div></div>` : ""}
    ${c.pdf ? `<div class="pdfref">Appunti: ${esc(c.pdf)}</div>` : ""}
  </div></details>`;
}
function renderChapter() {
  const ch = VIEW.ch, list = CARDS.filter(c => c.c === ch), labs = labsOf(ch), ks = CONCEPTS_L.filter(k => k.c === ch);
  const items = list.map(c => {
    const x = cs(c.id), on = isSeen(c.id) ? x.b : -1;
    const pips = [0, 1, 2, 3, 4].map(k => `<i class="${k < on ? "on" : ""}"></i>`).join("");
    return `<article class="panel fcard" id="card-${esc(c.id)}">
      <div class="fcard-top"><h3>${esc(c.n)}</h3><span class="lvpips" title="${on < 0 ? "Mai vista" : "Livello " + on + " di 5"}">${pips}</span></div>
      <p class="note">${esc(c.q)}</p>
      ${M(full(c))}
      <p class="note">${esc(c.h)}</p>
      ${cardDetails(c, VIEW.focus === c.id)}</article>`;
  }).join("");
  const kHtml = ks.map(k => `<article class="panel concept"><h3>${esc(k.title)}</h3><p class="note">${rich(k.see)}</p>
      <div class="row"><button class="btn small" data-act="concept" data-id="${esc(k.id)}">Apri il concetto</button><button class="btn small examb" data-act="concept" data-id="${esc(k.id)}" data-exam="1">Spiegami come a un esame</button></div></article>`).join("");
  const nq = QUIZ.filter(q => q.c === ch).length;
  app.innerHTML = `
  <div class="sesbar"><button class="link" data-act="nav" data-to="formule">← Tutti i rami</button></div>
  <section>
    <div class="chhead"><span class="cn ${HL(ch)}">${ch}</span><div><h1 style="font-size:1.9rem">${esc(CH[ch - 1])}</h1>
      <div class="muted">${list.length} formule · padronanza ${Math.round(mastery(list) * 100)}%</div></div></div>
    <button class="btn primary big" data-act="train-ch">Allenati su questo ramo</button>
    <div class="row">${labs.map(id => `<button class="btn small" data-act="lab" data-id="${esc(id)}">Lab: ${esc(LABS[id].title)}</button>`).join("")}
      ${nq ? `<button class="btn small" data-act="quiz-ch" data-ch="${ch}">Quiz (${nq})</button>` : ""}</div>
    ${ks.length ? `<h2>Concetti chiave</h2><div class="fl">${kHtml}</div>` : ""}
    <h2>Le formule</h2>
    <div class="fl">${items}</div>
  </section>`;
  mathAll(app);
  if (VIEW.focus) { const el = document.getElementById("card-" + VIEW.focus); if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" })); }
}
function renderConcept() {
  const k = K_BY[VIEW.id]; if (!k) return go("formule", {}, { replace: true });
  if (VIEW.exam && !S.exam[k.id]) { S.exam[k.id] = 1; save(); }
  const cards = (k.cards || []).filter(id => BY_ID[id]);
  app.innerHTML = `
  <div class="sesbar"><button class="link" data-act="chapter" data-ch="${k.c}">← ${esc(CH[k.c - 1])}</button></div>
  <section>
    <div class="chhead"><span class="cn ${HL(k.c)}">${k.c}</span><div><div class="eyebrow">Concetto</div><h1 style="font-size:1.8rem">${esc(k.title)}</h1></div></div>
    ${threeHtml(k.see, k.why, cards, k.tex)}
    ${k.plot ? `<div class="plotbox"><canvas data-plot="k:${esc(k.id)}" aria-label="Grafico: ${esc(k.title)}"></canvas>${k.plotcap ? `<p class="note">${rich(k.plotcap)}</p>` : ""}</div>` : ""}
    <div id="exambox">${VIEW.exam ? examHtml(k) : `<button class="btn big examb" data-act="exam" data-id="${esc(k.id)}">Spiegami come a un esame</button>`}</div>
    <div class="row">${[].concat(k.lab || []).filter(id => LABS[id]).map(id => `<button class="btn" data-act="lab" data-id="${esc(id)}">Apri il laboratorio</button>`).join("")}
      <button class="btn" data-act="quiz-ch" data-ch="${k.c}">Quiz del capitolo</button></div>
    ${k.pdf ? `<div class="pdfref">Appunti: ${esc(k.pdf)}</div>` : ""}
  </section>`;
  mathAll(app); drawPlots(app);
}
function examHtml(k) {
  return `<div class="exam"><div class="eh">Come lo spiegherei all'esame</div><ol>${(k.exam || []).map(s => `<li>${rich(s)}</li>`).join("")}</ol></div>`;
}
function threeHtml(see, why, cards, tex) {
  const why2 = [].concat(why || []);
  const fl = (cards || []).map(id => { const c = BY_ID[id]; return `<button class="flink" data-act="card" data-id="${esc(id)}"><small>${esc(c.n)} · scheda ${esc(id)}</small>${M(full(c))}</button>`; }).join("")
    + (tex || []).map(t => `<div class="panel">${M(t)}</div>`).join("");
  return `<div class="three">
    <div class="qa see"><div class="qk">Cosa sto vedendo?</div><p>${rich(see)}</p></div>
    ${why2.length ? `<div class="qa why"><div class="qk">Perché succede?</div>${why2.map(p => `<p>${rich(p)}</p>`).join("")}</div>` : ""}
    ${fl ? `<div class="qa which"><div class="qk">Quale formula uso?</div><div class="flinks">${fl}</div></div>` : ""}
  </div>`;
}
/* disegna i mini-grafici presenti in una radice */
function drawPlots(root) {
  if (!root) return;
  root.querySelectorAll("canvas[data-plot]").forEach(cv => {
    const ref = cv.getAttribute("data-plot"), [t, id] = [ref.slice(0, 1), ref.slice(2)];
    const spec = t === "k" ? K_BY[id] && K_BY[id].plot : t === "g" ? G_BY[id] && G_BY[id].plot : t === "p" ? P_BY[id] && P_BY[id].plot : null;
    if (!spec) return;
    const r = cv.getBoundingClientRect(); if (!r.width) return;
    const d = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d);
    const ctx = cv.getContext("2d"); ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, r.width, r.height);
    try { drawPlot(ctx, r.width, r.height, spec); } catch (e) { console.error(e); }
  });
}

/* ---------- motore delle sessioni: formule, concetti, grafici, problemi ---------- */
let SES = null;
function modeFor(id) {
  const b = cs(id).b;
  if (!isSeen(id)) return "study";
  if (b === 0) return "cloze";
  if (b === 1) return "quale";
  if (b === 2) return Math.random() < 0.5 ? "cloze" : "memoria";
  return "memoria";
}
function withChecks(base, fresh) {
  // nuove formule: prima le leggi, poi almeno due domande dopo te le chiedo da completare
  const main = [], due = shuffle(base);
  let di = 0;
  for (const c of fresh) { main.push({ type: "card", id: c.id, mode: "study" }); if (di < due.length) main.push(due[di++]); }
  while (di < due.length) main.push(due[di++]);
  const out = [], pending = [];
  for (const it of main) {
    while (pending.length && pending[0].at <= out.length) out.push(pending.shift().item);
    out.push(it);
    if (it.mode === "study") pending.push({ at: out.length + 2, item: { type: "card", id: it.id, mode: "cloze" } });
  }
  for (const p of pending) out.push(p.item);
  return out;
}
function startSession(items, title, again, opt) {
  if (!items.length) { toast("Niente da proporre con questi filtri."); return; }
  opt = opt || {};
  const prev = SES; if (prev && prev.timer) clearInterval(prev.timer);
  const inherit = prev && (VIEW.name === "results" || VIEW.name === "session");   // "Un altro giro": si torna dove si era partiti
  SES = { sid: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), items, i: 0, ok: 0, tot: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], requeued: new Set(), title, again, startLevel: level(), state: "ask",
    from: inherit ? prev.from : Object.assign({}, VIEW), section: inherit ? prev.section : (SECTION_OF[VIEW.name] || "home"), rapido: !!opt.rapido, end: opt.rapido ? Date.now() + RAPIDO_MS : 0, record: opt.record || null, timer: 0, timeUp: false };
  Wave.A = 0.15; Wave.n = 1;
  if (SES.rapido) SES.timer = setInterval(tickRapido, 250);
  go("session", { sid: SES.sid });
}
const card = (id, mode) => ({ type: "card", id, mode });
function startToday() {
  const p = formulaPlan();
  if (!p.dueTake.length && !p.freshTake.length) return startWeakest();
  const base = p.dueTake.map(c => card(c.id, modeFor(c.id)));
  startSession(withChecks(base, p.freshTake), "Ripasso di oggi", startToday);
}
function startWeakest() {
  const pool = shuffle(CARDS).sort((a, b) => cs(a.id).b - cs(b.id).b || cs(a.id).due - cs(b.id).due).slice(0, 10);
  const seen = pool.filter(c => isSeen(c.id)).map(c => card(c.id, modeFor(c.id)));
  startSession(withChecks(seen, pool.filter(c => !isSeen(c.id))), "Le più deboli", startWeakest);
}
function startFree(mode) {
  const f = FILTER, pool = CARDS.filter(c => !f || c.c === f);
  const pickd = shuffle(pool).sort((a, b) => cs(a.id).b - cs(b.id).b).slice(0, 10);
  startSession(shuffle(pickd).map(c => card(c.id, mode)), "Allenamento libero", () => startFree(mode));
}
function startChapter(ch) {
  const list = CARDS.filter(c => c.c === ch);
  const seen = list.filter(c => isSeen(c.id)).map(c => card(c.id, modeFor(c.id)));
  startSession(withChecks(seen, list.filter(c => !isSeen(c.id))), CH[ch - 1], () => startChapter(ch));
}
function startQuizReview() {
  const p = quizPlan();
  if (!p.due.length && !p.fresh.length) {
    const weak = shuffle(QUIZ).sort((a, b) => srsOf("qs", a.id).b - srsOf("qs", b.id).b).slice(0, 10);
    return startSession(shuffle(weak).map(q => ({ type: "q", id: q.id })), "Concetti più deboli", startQuizReview);
  }
  startSession(shuffle(p.due.concat(p.fresh)).map(q => ({ type: "q", id: q.id })), "Ripasso dei concetti", startQuizReview);
}
function startQuizChapter(ch) {
  const list = QUIZ.filter(q => !ch || q.c === ch).sort((a, b) => srsOf("qs", a.id).b - srsOf("qs", b.id).b);
  startSession(shuffle(list.slice(0, 10)).map(q => ({ type: "q", id: q.id })), ch ? CH[ch - 1] : "Quiz concettuali", () => startQuizChapter(ch));
}
function startGraphs(ch) {
  const list = GRAPHS_L.filter(g => !ch || g.c === ch).sort((a, b) => srsOf("gs", a.id).b - srsOf("gs", b.id).b);
  startSession(shuffle(list.slice(0, 10)).map(g => ({ type: "g", id: g.id })), "Leggi il grafico", () => startGraphs(ch));
}
/* pesca dagli elementi più deboli, con un po' di caso */
function weakFirst(list, w) { return shuffle(list).sort((a, b) => w(a) - w(b) + (Math.random() - 0.5) * 1.5); }
function buildMix(opt) {
  const ch = opt.ch || 0, types = opt.types, n = opt.n || 10;
  const pools = {
    card: weakFirst(CARDS.filter(c => !ch || c.c === ch), c => cs(c.id).b).map(c => card(c.id, Math.random() < 0.5 ? "cloze" : "quale")),
    q: weakFirst(QUIZ.filter(q => !ch || q.c === ch), q => srsOf("qs", q.id).b).map(q => ({ type: "q", id: q.id })),
    g: weakFirst(GRAPHS_L.filter(g => !ch || g.c === ch), g => srsOf("gs", g.id).b).map(g => ({ type: "g", id: g.id })),
    p: weakFirst(PROBLEMS.filter(p => !ch || p.c === ch), p => (probSolved(p.id) ? 3 : 0) + (S.probs[p.id] ? S.probs[p.id].b : 0)).map(p => ({ type: "p", id: p.id }))
  };
  const act = types.filter(t => pools[t].length), out = [];
  let k = 0;
  while (out.length < n && act.some(t => pools[t].length)) { const t = act[k++ % act.length]; if (pools[t].length) out.push(pools[t].shift()); }
  return shuffle(out);
}
function startMix(opt) {
  startSession(buildMix(opt), "Allenamento misto", () => startMix(opt), { record: "mix" });
}
function errorItems() {
  return Object.keys(S.errors).sort((a, b) => S.errors[b].n - S.errors[a].n || S.errors[b].last - S.errors[a].last).map(k => {
    const t = k.slice(0, 1), id = k.slice(2);
    return t === "c" ? card(id, "cloze") : { type: { q: "q", g: "g", p: "p" }[t], id };
  });
}
function startErrors() { startSession(errorItems().slice(0, 15), "Errori da rivedere", startErrors); }
function startRapido() {
  const now = Date.now();
  const errs = errorItems().slice(0, 8);
  const dueC = CARDS.filter(c => isDue(c.id, now)).map(c => card(c.id, Math.random() < 0.5 ? "cloze" : "quale"));
  const dueQ = QUIZ.filter(q => srsOf("qs", q.id).seen && srsOf("qs", q.id).due <= now).map(q => ({ type: "q", id: q.id }));
  const mix = buildMix({ types: ["card", "q", "g", "p"], n: 40 });
  const seen = new Set(), items = [];
  for (const it of [].concat(shuffle(errs), shuffle(dueC).slice(0, 10), shuffle(dueQ).slice(0, 8), mix)) {
    const key = it.type + ":" + it.id; if (seen.has(key)) continue; seen.add(key); items.push(it);
  }
  const first = items.slice(0, 18), rest = items.slice(18);
  startSession(shuffle(first).concat(rest).slice(0, 60), "Ripasso rapido · 5 minuti", startRapido, { rapido: true, record: "rapido" });
}
function tickRapido() {
  if (!SES || !SES.rapido) return;
  const left = SES.end - Date.now(), el = document.getElementById("clock");
  if (el) { const s = Math.max(0, Math.ceil(left / 1000)); el.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  const bar = document.getElementById("tbar"); if (bar) bar.style.width = Math.max(0, left / RAPIDO_MS * 100) + "%";
  if (left <= 0 && !SES.timeUp) {
    SES.timeUp = true; clearInterval(SES.timer);
    if (VIEW.name !== "session") return;   // l'utente è uscito: non lo riporto ai risultati di colpo
    if (SES.state === "ask") { const n = document.getElementById("timeup"); if (n) n.hidden = false; else finishSession(); }
    else { const nb = document.getElementById("nextbtn"); if (nb) nb.textContent = "Tempo scaduto: vedi i risultati"; }
  }
}
function finishSession() {
  if (SES && SES.timer) clearInterval(SES.timer);
  if (SES) SES.finished = true;
  if (SES && SES.record) { SES.isRecord = SES.ok > S.best[SES.record]; if (SES.isRecord) S.best[SES.record] = SES.ok; save(); }
  go("results", { sid: SES && SES.sid }, { replace: true });
}

const MODE_LABEL = { study: "Nuova formula", cloze: "Completa la formula", quale: "Quale formula è giusta?", memoria: "A memoria" };
const MODE_HL = { study: "h4c", cloze: "h1c", quale: "h2c", memoria: "h3c" };
function buildOptions(it) {
  if (it.type === "card") {
    const c = BY_ID[it.id];
    if (it.mode === "cloze") return shuffle([{ tex: c.a, ok: true }].concat(c.d.map(t => ({ tex: t, ok: false }))));
    // "Quale formula?": la formula giusta e i tre distrattori della STESSA scheda, scritti per intero.
    // Il membro a sinistra è identico in tutte e quattro: si deve riconoscere il pezzo giusto, non la scheda.
    return shuffle([{ tex: full(c), ok: true }].concat(c.d.map(t => ({ tex: fill(c, t), ok: false }))));
  }
  const src = it.type === "q" ? Q_BY[it.id] : it.type === "g" ? G_BY[it.id] : P_BY[it.id];
  return shuffle(src.o.map((t, k) => ({ t, ok: k === 0 })));
}
function itemValid(it) { return !!(it && (it.type === "card" ? BY_ID[it.id] : it.type === "q" ? Q_BY[it.id] : it.type === "g" ? G_BY[it.id] : it.type === "p" ? P_BY[it.id] : null)); }
function sesHeader() {
  const pct = (SES.i / SES.items.length) * 100;
  const mid = SES.rapido
    ? `<div class="timer" aria-hidden="true"><i id="tbar" style="width:${Math.max(0, (SES.end - Date.now()) / RAPIDO_MS * 100)}%"></i></div><span class="clock" id="clock">5:00</span>`
    : `<div class="prog" aria-hidden="true"><i style="width:${pct}%"></i></div><span class="count">${SES.i + 1}/${SES.items.length}</span>`;
  return `<div class="sesbar"><button class="link" data-act="quit">Esci</button>${mid}</div>
  <div class="wavebox small"><canvas id="wave" aria-hidden="true"></canvas><div class="wave-cap">combo ×${SES.combo} · modo n = ${Wave.n}</div></div>`;
}
function optsHtml(it, txtMode) {
  return `<div class="opts">${it.opts.map((o, k) => txtMode
    ? `<button class="opt txt" data-act="opt" data-k="${k}"><span class="k">${k + 1}</span><span class="otext">${rich(o.t)}</span></button>`
    : `<button class="opt" data-act="opt" data-k="${k}"><span class="k">${k + 1}</span>${M(o.tex, true)}</button>`).join("")}</div>`;
}
function renderItem() {
  while (SES.i < SES.items.length && (!itemValid(SES.items[SES.i]) || SES.items[SES.i].answered)) SES.i++;   // indietro/avanti non fa rispondere due volte
  if (SES.i >= SES.items.length) return finishSession();
  const it = SES.items[SES.i];
  if (!it.opts && !(it.type === "card" && (it.mode === "study" || it.mode === "memoria"))) it.opts = buildOptions(it);
  let head = "", body = "";
  if (it.type === "card") {
    const c = BY_ID[it.id];
    head = `<div class="qhead"><span class="tag ${MODE_HL[it.mode]}">${MODE_LABEL[it.mode]}</span><span class="qch">${c.c} · ${esc(CH[c.c - 1])}</span></div>
      <p class="prompt">${esc(it.mode === "cloze" ? c.n : c.q)}</p>`;
    if (it.mode === "study") body = `<div class="panel">${M(full(c))}</div><p class="note">${esc(c.h)}</p>${cardDetails(c, true)}
      <button class="btn primary big" data-act="studied">Fatto, l'ho letta</button>`;
    else if (it.mode === "cloze" || it.mode === "quale") body = `${it.mode === "cloze" ? `<div class="panel">${M(clozeTex(c))}</div>` : ""}${optsHtml(it, false)}<div id="fb"></div>`;
    else body = `<p class="hint">Scrivila su carta o dilla ad alta voce, poi controlla. Sii onesto: ti torna più avanti se non la sai.</p>
      <div id="fb"><button class="btn primary big" data-act="reveal">Mostra la formula</button></div>`;
  } else if (it.type === "q") {
    const q = Q_BY[it.id];
    head = `<div class="qhead"><span class="tag ${HL(q.c)}">Domanda di concetto</span><span class="qch">${q.c} · ${esc(CH[q.c - 1])}</span></div><p class="prompt">${rich(q.q)}</p>`;
    body = `${optsHtml(it, true)}<div id="fb"></div>`;
  } else if (it.type === "g") {
    const g = G_BY[it.id];
    head = `<div class="qhead"><span class="tag h5c">Leggi il grafico</span><span class="qch">${g.c} · ${esc(CH[g.c - 1])}</span></div><p class="prompt">${rich(g.q)}</p>`;
    body = `<div class="plotbox${g.plot && g.plot.polar ? " tall" : ""}"><canvas data-plot="g:${esc(g.id)}" aria-label="Grafico della domanda"></canvas>${g.cap ? `<p class="note">${rich(g.cap)}</p>` : ""}</div>${optsHtml(it, true)}<div id="fb"></div>`;
  } else {
    const p = P_BY[it.id];
    head = `<div class="qhead"><span class="tag h3c">Problema da scritto</span><span class="qch">${p.c} · ${esc(CH[p.c - 1])} · <span class="diff">${"●".repeat(p.diff)}${"○".repeat(3 - p.diff)}</span></span></div>
      <p class="prompt">${esc(p.title)}</p>`;
    body = `${problemTextHtml(p)}${optsHtml(it, true)}<div id="fb"></div>`;
  }
  app.innerHTML = `${sesHeader()}<article class="q">${head}${body}
    <p class="warn" id="timeup" hidden>Tempo scaduto: rispondi a questa e vedi i risultati.</p></article>`;
  SES.state = it.type === "card" && it.mode === "memoria" ? "ask" : "ask";
  Wave.attach(document.getElementById("wave")); Wave.set(0.15, Wave.n);
  mathAll(app); drawPlots(app); tickRapido();
}
function problemTextHtml(p) {
  return `<div class="panel" style="display:grid;gap:8px"><p style="margin:0">${rich(p.text)}</p>
    ${(p.data || []).length ? `<div class="datatab">${p.data.map(d => `<span>${rich(d)}</span>`).join("")}</div>` : ""}
    ${p.plot ? `<div class="plotbox"><canvas data-plot="p:${esc(p.id)}" aria-label="Figura del problema"></canvas></div>` : ""}
    <p style="margin:0;font-weight:700">${rich(p.ask)}</p></div>`;
}
function award(kind, res, it) {
  let gain = 0;
  if (res === "ok") {
    SES.combo++; SES.maxCombo = Math.max(SES.maxCombo, SES.combo);
    const base = kind === "mem" ? 15 : it && it.type === "p" ? 10 + 5 * (P_BY[it.id].diff || 1) : it && it.type === "g" ? 12 : 10;
    gain = base + 2 * Math.min(SES.combo - 1, 5);
    Wave.kick(SES.combo);
  } else if (res === "quasi") { gain = 5; }
  else { SES.combo = 0; Wave.damp(); }
  SES.xp += gain; S.xp += gain;
  return gain;
}
function afterAnswer(it, res, kind) {
  it.answered = true;
  SES.tot++;
  if (res === "ok") SES.ok++;
  if (it.type === "card") gradeCard(it.id, kind, res);
  else if (it.type === "q") gradeSrs("qs", "q", it.id, res === "ok");
  else if (it.type === "g") gradeSrs("gs", "g", it.id, res === "ok");
  else gradeSrs("probs", "p", it.id, res === "ok");
  const gain = award(kind, res, it);
  if (res === "no") {
    const key = it.type + ":" + it.id;
    if (!SES.wrong.some(w => w.type + ":" + w.id === key)) SES.wrong.push({ type: it.type, id: it.id });
    if (!SES.requeued.has(key) && !SES.rapido) {
      SES.requeued.add(key);
      SES.items.push(it.type === "card" ? card(it.id, it.mode === "memoria" ? "memoria" : "cloze") : { type: it.type, id: it.id });
    }
  }
  save(); renderTop();
  const cap = app.querySelector(".wave-cap"); if (cap) cap.textContent = `combo ×${SES.combo} · modo n = ${Wave.n}`;
  return gain;
}
const nextLabel = () => SES.timeUp ? "Tempo scaduto: vedi i risultati" : "Avanti";
function feedbackHtml(it, res, gain, showFormula) {
  const msg = res === "ok" ? `Giusto! +${gain} XP` : res === "quasi" ? `Quasi. +${gain} XP, torna domani` : SES.rapido ? "Non era questa. Finisce tra gli errori da rivedere." : "Non era questa. Te la ripropongo.";
  let more = "", btns = "";
  if (it.type === "card") {
    const c = BY_ID[it.id];
    more = `${showFormula ? `<div class="panel">${M(full(c))}</div>` : ""}<p class="note">${esc(c.h)}</p>${c.err && res !== "ok" ? `<div class="err-box"><p class="note">${rich(c.err)}</p></div>` : ""}`;
    btns = `<button class="btn" data-act="card" data-id="${esc(c.id)}">Apri la scheda</button>`;
  } else if (it.type === "q" || it.type === "g") {
    const q = it.type === "q" ? Q_BY[it.id] : G_BY[it.id];
    more = `<p class="expl">${rich(q.e)}</p>`;
    const lab = q.lab || (labsOf(q.c)[0]);
    btns = (lab && LABS[lab] ? `<button class="btn" data-act="lab" data-id="${esc(lab)}">Apri il laboratorio</button>` : "") + (q.card && BY_ID[q.card] ? `<button class="btn" data-act="card" data-id="${esc(q.card)}">Scheda</button>` : "");
  } else {
    const p = P_BY[it.id];
    more = solutionHtml(p, true);
  }
  return `<div class="feedback ${res === "ok" ? "ok" : "no"}"><div class="verdict">${msg}</div>${more}
    <div class="row"><button class="btn primary" data-act="next" id="nextbtn">${nextLabel()}</button>${btns}</div></div>`;
}
function solutionHtml(p, allSteps) {
  const steps = (p.steps || []).map((s, i) => `<li class="${allSteps || i === 0 ? "" : "hide"}">${rich(s)}</li>`).join("");
  return `<div class="dl">
    <div><h4>Formula necessaria</h4>${(p.formula || []).map(t => M(t)).join("")}</div>
    <div><h4>Soluzione passo passo</h4><ol class="steps" id="steps">${steps}</ol>
      ${allSteps ? "" : `<div class="row" style="margin-top:8px"><button class="btn small" data-act="step">Passo successivo</button><button class="link" data-act="allsteps">Mostra tutto</button></div>`}</div>
    ${p.err ? `<div class="err-box"><h4>Errore tipico</h4><p>${rich(p.err)}</p></div>` : ""}
    <div class="chips links">${(p.cards || []).filter(id => BY_ID[id]).map(id => `<button class="chip" data-act="card" data-id="${esc(id)}">${esc(id)} · ${esc(BY_ID[id].n)}</button>`).join("")}
      ${[].concat(p.lab || []).filter(id => LABS[id]).map(id => `<button class="chip" data-act="lab" data-id="${esc(id)}">Lab: ${esc(LABS[id].title)}</button>`).join("")}</div>
  </div>`;
}
function markOptions(it, k) {
  app.querySelectorAll(".opt").forEach((b, i) => {
    b.disabled = true;
    if (it.opts[i].ok) b.classList.add("ok"); else if (i === k) b.classList.add("no"); else b.classList.add("dim");
  });
}
function answerOpt(k) {
  if (!SES || SES.state !== "ask") return;
  const it = SES.items[SES.i]; if (!it.opts) return;
  const o = it.opts[k]; if (!o) return;
  SES.state = "done";
  const res = o.ok ? "ok" : "no";
  const gain = afterAnswer(it, res, "rec");
  markOptions(it, k);
  const fb = document.getElementById("fb");
  fb.innerHTML = feedbackHtml(it, res, gain, it.type === "card" && it.mode === "cloze");
  mathAll(fb);
  const tu = document.getElementById("timeup"); if (tu) tu.hidden = true;
  const nb = document.getElementById("nextbtn"); nb.focus({ preventScroll: true });
  nb.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
}
function reveal() {
  if (!SES || SES.state !== "ask") return;
  SES.state = "graded-wait";
  const c = BY_ID[SES.items[SES.i].id], fb = document.getElementById("fb");
  fb.innerHTML = `<div class="panel">${M(full(c))}</div><p class="note">${esc(c.h)}</p>
    <div class="muted" style="font-size:.9rem">Com'è andata?</div>
    <div class="grades">
      <button class="btn g-no" data-act="mem" data-r="no">Non la sapevo</button>
      <button class="btn" data-act="mem" data-r="quasi">Quasi</button>
      <button class="btn g-ok" data-act="mem" data-r="ok">Giusta</button></div>`;
  mathAll(fb);
}
function gradeMem(r) {
  if (!SES || SES.state !== "graded-wait") return;
  SES.state = "done";
  const it = SES.items[SES.i], gain = afterAnswer(it, r, "mem"), fb = document.getElementById("fb");
  fb.innerHTML = feedbackHtml(it, r, gain, true); mathAll(fb);
  document.getElementById("nextbtn").focus({ preventScroll: true });
}
function studied() {
  const it = SES.items[SES.i]; if (!it || it.answered) return next();
  it.answered = true;
  gradeCard(it.id, "study"); S.xp += 2; SES.xp += 2; save();
  next();
}
function next() {
  if (!SES) return;
  SES.i++;
  if (SES.i >= SES.items.length || SES.timeUp || (SES.rapido && Date.now() >= SES.end)) finishSession();
  else { render(); window.scrollTo(0, 0); }
}
function reviewEntry(w) {
  if (w.type === "card") { const c = BY_ID[w.id]; return `<article class="panel rv"><div class="kind">Formula · ${esc(c.id)}</div><h3>${esc(c.n)}</h3>${M(full(c))}<p class="note">${esc(c.h)}</p>${c.err ? `<p class="note">${rich(c.err)}</p>` : ""}</article>`; }
  if (w.type === "p") { const p = P_BY[w.id]; return `<article class="panel rv"><div class="kind">Problema</div><h3>${esc(p.title)}</h3><p class="note"><b>${rich(p.o[0])}</b></p>${p.err ? `<p class="note">${rich(p.err)}</p>` : ""}<div class="row"><button class="btn small" data-act="problem" data-id="${esc(p.id)}">Rivedi la soluzione</button></div></article>`; }
  const q = w.type === "q" ? Q_BY[w.id] : G_BY[w.id];
  return `<article class="panel rv"><div class="kind">${TYPE_NAME[w.type]}</div><h3>${rich(q.q)}</h3><p class="note"><b>${rich(q.o[0])}</b></p><p class="note">${rich(q.e)}</p></article>`;
}
function renderResults() {
  const up = level() > SES.startLevel;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">${esc(SES.title)}</div>
    <h1>${SES.isRecord ? 'Nuovo <span class="mark">record!</span>' : 'Sessione <span class="mark">finita</span>'}</h1>
    ${up ? `<div class="levelup">Nuovo livello: ${esc(rankName(level()))}</div>` : ""}
    <div class="tiles">
      <div class="tile"><b>${SES.ok}/${SES.tot}</b><span>risposte giuste${SES.record ? ` (record ${S.best[SES.record]})` : ""}</span></div>
      <div class="tile"><b>+${SES.xp}</b><span>XP guadagnati</span></div>
      <div class="tile"><b>×${SES.maxCombo}</b><span>combo massima</span></div></div>
    <div class="row">
      <button class="btn primary" data-act="again">Un altro giro</button>
      <button class="btn" data-act="back-from">Torna indietro</button></div>
  </section>
  ${SES.wrong.length ? `<section><h2>Da rivedere</h2><div class="review-list">${SES.wrong.map(reviewEntry).join("")}</div></section>` : `<section><p class="muted">Nessun errore in questa sessione.</p></section>`}`;
  mathAll(app);
}

/* ---------- lampo: giusta o sbagliata ---------- */
let L = null;
function startLampo() {
  const seen = CARDS.filter(c => isSeen(c.id)), pool = seen.length >= 12 ? seen : CARDS;
  L = { id: Date.now().toString(36), pool, end: Date.now() + 60000, score: 0, combo: 0, n: 0, ok: 0, mistakes: [], cur: null, timer: 0, last: null, startLevel: level() };
  go("lampo", { lid: L.id });
}
function nextLampo() {
  let c; do { c = pick(L.pool); } while (L.pool.length > 1 && L.last && c.id === L.last);
  L.last = c.id;
  const truth = Math.random() < 0.5;
  L.cur = { c, truth, tex: truth ? full(c) : fill(c, pick(c.d)) };
  const cardEl = document.getElementById("swipe"); if (!cardEl) return;
  cardEl.classList.remove("ok", "no"); cardEl.style.transform = "";
  cardEl.innerHTML = `<div class="qch">${esc(c.n)}</div>${M(L.cur.tex)}`;
  mathAll(cardEl);
}
function renderLampo() {
  app.innerHTML = `
  <div class="sesbar"><button class="link" data-act="quit-lampo">Esci</button>
    <div class="timer" aria-hidden="true"><i id="tbar" style="width:100%"></i></div>
    <span class="score" id="lscore">${L.score}</span></div>
  <section style="margin-top:14px">
    <div class="muted" style="font-size:.9rem">Questa formula è giusta o sbagliata? Scorri a destra se è giusta, a sinistra se è sbagliata, o usa i pulsanti.</div>
    <article class="swipe" id="swipe"></article>
    <div class="vf"><button class="btn v-no" data-act="vf" data-v="0">← Sbagliata</button><button class="btn v-yes" data-act="vf" data-v="1">Giusta →</button></div>
    <div class="combo" id="lcombo">combo ×${L.combo}</div>
    <div class="toast" id="ltoast" aria-live="polite"></div>
  </section>`;
  nextLampo();
  bindSwipe(document.getElementById("swipe"));
  clearInterval(L.timer);
  L.timer = setInterval(() => {
    const left = L.end - Date.now(), bar = document.getElementById("tbar");
    if (bar) bar.style.width = Math.max(0, left / 600) + "%";
    if (left <= 0) endLampo();
  }, 100);
}
function answerLampo(saysTrue) {
  if (!L || !L.cur || Date.now() > L.end) return;
  const right = saysTrue === L.cur.truth, cardEl = document.getElementById("swipe"), t = document.getElementById("ltoast");
  L.n++;
  if (right) {
    L.ok++; L.combo++; L.score += 10 + 2 * Math.min(L.combo - 1, 10);
    gradeCard(L.cur.c.id, "lampo", "ok"); cardEl.classList.add("ok"); t.innerHTML = "";
  } else {
    L.combo = 0; gradeCard(L.cur.c.id, "lampo", "no");
    L.mistakes.push({ id: L.cur.c.id, truth: L.cur.truth }); cardEl.classList.add("no");
    t.innerHTML = `<div class="t-head">${L.cur.truth ? "Era giusta." : "Era sbagliata. Quella giusta:"}</div>${L.cur.truth ? "" : M(full(L.cur.c))}`;
    mathAll(t);
  }
  document.getElementById("lscore").textContent = L.score;
  document.getElementById("lcombo").textContent = `combo ×${L.combo}`;
  L.cur = null;
  setTimeout(() => { if (VIEW.name === "lampo" && L && Date.now() <= L.end) nextLampo(); }, right ? 260 : 650);
}
function endLampo() {
  if (!L) return;
  clearInterval(L.timer);
  L.xp = Math.round(L.score / 5); S.xp += L.xp;
  L.record = L.score > S.best.lampo; if (L.record) S.best.lampo = L.score;
  if (L.n) touchStreak();
  save(); go("lampo-end", { lid: L.id }, { replace: true });
}
function renderLampoEnd() {
  const acc = L.n ? Math.round((L.ok / L.n) * 100) : 0, up = level() > L.startLevel;
  const list = L.mistakes.map(m => { const c = BY_ID[m.id]; return `<article class="panel rv"><h3>${esc(c.n)}</h3>
      <div class="muted" style="font-size:.85rem">${m.truth ? "Era giusta, l'hai scartata:" : "Era sbagliata. Quella giusta è:"}</div>${M(full(c))}<p class="note">${esc(c.h)}</p></article>`; }).join("");
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">Lampo · 60 secondi</div>
    <h1>${L.record ? 'Nuovo <span class="mark">record!</span>' : 'Tempo <span class="mark">scaduto</span>'}</h1>
    ${up ? `<div class="levelup">Nuovo livello: ${esc(rankName(level()))}</div>` : ""}
    <div class="tiles">
      <div class="tile"><b>${L.score}</b><span>punti (record ${S.best.lampo})</span></div>
      <div class="tile"><b>${L.ok}/${L.n}</b><span>giuste (${acc}%)</span></div>
      <div class="tile"><b>+${L.xp}</b><span>XP</span></div></div>
    <div class="row"><button class="btn primary" data-act="lampo">Ancora</button><button class="btn" data-act="nav" data-to="formule">Torna all'albero</button></div>
  </section>
  ${list ? `<section><h2>Gli errori</h2><div class="review-list">${list}</div></section>` : ""}`;
  mathAll(app);
}
function bindSwipe(el) {
  let x0 = null, dx = 0, id = null;
  el.addEventListener("pointerdown", e => { if (!L || !L.cur) return; x0 = e.clientX; dx = 0; id = e.pointerId; try { el.setPointerCapture(id); } catch (_) {} });
  el.addEventListener("pointermove", e => {
    if (x0 === null || e.pointerId !== id) return;
    dx = e.clientX - x0;
    if (!reduce) el.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg)`;
    el.classList.toggle("ok", dx > 60); el.classList.toggle("no", dx < -60);
  });
  el.addEventListener("pointerup", e => {
    if (x0 === null || (e && e.pointerId !== id)) return;
    x0 = null;
    if (Math.abs(dx) > 90) answerLampo(dx > 0); else { el.style.transform = ""; el.classList.remove("ok", "no"); }
    dx = 0;
  });
  el.addEventListener("pointercancel", () => { x0 = null; el.style.transform = ""; el.classList.remove("ok", "no"); });
}

/* ---------- 2. Laboratori ---------- */
function renderLabs() {
  const groups = CH.map((name, i) => {
    const ids = labsOf(i + 1); if (!ids.length) return "";
    const rows = ids.map(id => {
      const Lb = LABS[id], md = missionsDone(id);
      const pips = Lb.missions.map((_, k) => `<i class="${S.missions[id + "." + k] ? "on" : ""}"></i>`).join("");
      return `<li><button class="branch labrow" data-act="lab" data-id="${esc(id)}">
        <span class="cn ${HL(i + 1)}">${esc(id)}</span>
        <span class="cname">${esc(Lb.title)}<small>missioni ${md}/${Lb.missions.length}${Lb.audio ? " · con audio" : ""}</small></span>
        <span class="mpips" aria-label="${md} missioni su ${Lb.missions.length}">${pips}</span></button></li>`;
    }).join("");
    return `<div class="lab-group"><h3>${i + 1} · ${esc(name)}</h3><ol class="tree">${rows}</ol></div>`;
  }).join("");
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">2 · Laboratori</div>
    <h1>Capire <span class="mark">le onde</span></h1>
    <p class="muted" style="margin:0">${LAB_IDS.length} simulazioni da toccare con mano: muovi i cursori, guarda cosa succede, completa le missioni (+${MISSION_XP} XP l'una). Missioni completate: ${doneMissions()}/${totalMissions()}.</p>
  </section>
  <section>${groups}</section>`;
}
let LAB = null;
function stopLab() { if (LAB) { cancelAnimationFrame(LAB.raf); LabAudio.stop(); LAB = null; } }
function P() { return Object.assign({}, LAB.p, { choice: LAB.choice }); }
function fmtParam(prm, v) { return prm.fmt ? prm.fmt(v) : fm(v, prm.d) + (prm.u ? " " + prm.u : ""); }
function renderLab() {
  const id = String(VIEW.id), def = LABS[id];
  if (!def) return go("labs", {}, { replace: true });
  if (!S.labs[id]) { S.labs[id] = 1; save(); }
  LAB = { id, ch: def.c, def, p: {}, choice: def.choice ? def.choice.v : null, t: 0, playing: !reduce, raf: 0, last: 0, state: null };
  def.params.forEach(prm => LAB.p[prm.id] = prm.v);
  if (VIEW.preset != null && def.presets && def.presets[VIEW.preset]) applyPresetValues(def.presets[VIEW.preset]);
  const seg = def.choice ? `<div class="seg" role="group" aria-label="Scenario">${def.choice.opts.map(([v, l]) => `<button class="chip" data-act="choice" data-v="${esc(v)}" aria-pressed="${v === LAB.choice}">${esc(l)}</button>`).join("")}</div>` : "";
  const ctls = def.params.map(prm => `<div class="ctl" id="c-${prm.id}"${prm.show && !prm.show(LAB.choice) ? " hidden" : ""}>
      <label for="p-${prm.id}">${rich(prm.label)}</label><output id="o-${prm.id}">${esc(fmtParam(prm, LAB.p[prm.id]))}</output>
      <input type="range" id="p-${prm.id}" data-p="${prm.id}" min="${prm.min}" max="${prm.max}" step="${prm.step}" value="${LAB.p[prm.id]}"></div>`).join("");
  const ms = def.missions.map((m, i) => { const done = !!S.missions[id + "." + i]; return `<li class="mission${done ? " done" : ""}" id="m-${i}"><span class="boxm">${done ? "✓" : i + 1}</span><span class="mt">${rich(m.t)}</span></li>`; }).join("");
  const presets = def.presets && def.presets.length ? `<div class="presets"><span class="lbl">Esempi pronti:</span>${def.presets.map((p, i) => `<button class="chip" data-act="preset" data-k="${i}">${esc(p.label)}</button>`).join("")}</div>` : "";
  const nq = QUIZ.filter(q => q.c === def.c).length;
  const audio = def.audio ? `<div class="audiobar">
      <div class="row"><button class="btn primary small" data-act="listen" id="listenbtn">▶ Ascolta</button>
        <div class="ctl" style="flex:1 1 160px"><label for="vol">Volume</label><output id="o-vol">${Math.round(S.settings.volume * 100)}%</output>
        <input type="range" id="vol" min="0" max="1" step="0.01" value="${S.settings.volume}"></div></div>
      <p class="note">${rich(def.audio.hint || "Parti con il volume basso. Il suono si ferma da solo dopo 20 secondi.")}</p>
      <p class="warn" id="loudwarn" hidden>Volume alto: abbassalo, soprattutto se usi le cuffie.</p></div>` : "";
  const concept = def.concept && K_BY[def.concept] ? `<button class="btn big examb" data-act="concept" data-id="${esc(def.concept)}" data-exam="1">Spiegami come a un esame</button>` : "";
  app.innerHTML = `
  <div class="sesbar"><button class="link" data-act="nav" data-to="labs">← Tutti i laboratori</button></div>
  <section>
    <div class="chhead"><span class="cn ${HL(def.c)}">${esc(id)}</span><div><div class="eyebrow">Laboratorio · ${esc(CH[def.c - 1])}</div><h1 style="font-size:1.85rem">${esc(def.title)}</h1></div></div>
    ${threeHtml(def.see || "", def.intro || [], (def.cards || []).filter(x => BY_ID[x]))}
    <div class="labbox"><canvas class="lab-canvas" id="labcv" style="height:${def.h}px" aria-label="Simulazione: ${esc(def.title)}"></canvas>
      <div class="labbar"><button class="chip" data-act="play" id="playbtn">${LAB.playing ? "Pausa" : "Avvia"}</button><span class="muted" style="font-size:.85rem">Muovi i cursori qui sotto.</span></div></div>
    ${seg}${presets}
    <div class="controls">${ctls}</div>
    <div class="readouts" id="ro"></div>
    ${audio}
    <h2>Missioni</h2><ol class="missions">${ms}</ol>
    <h2>Cosa notare</h2><ul class="notes">${(def.notes || []).map(n => `<li>${rich(n)}</li>`).join("")}</ul>
    ${concept}
    ${nq ? `<button class="btn primary big" data-act="quiz-ch" data-ch="${def.c}">Domande su questo ramo (${nq})</button>` : ""}
  </section>`;
  mathAll(app);
  updateReadouts(); updateLoudWarn();   // le missioni si completano solo muovendo i comandi
  const loop = ts => {
    if (!LAB || VIEW.name !== "lab") return;
    const dt = LAB.last ? Math.min(0.05, (ts - LAB.last) / 1000) : 0; LAB.last = ts;
    if (LAB.playing) LAB.t += dt;
    drawLab();
    LAB.raf = requestAnimationFrame(loop);
  };
  LAB.raf = requestAnimationFrame(loop);
}
function drawLab() {
  const cv = document.getElementById("labcv"); if (!cv || !LAB) return;
  const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
  const W = Math.round(r.width * d), H = Math.round(r.height * d);
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  const ctx = cv.getContext("2d"); ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, r.width, r.height);
  try { LAB.def.draw(ctx, r.width, r.height, P(), LAB.t, LAB); } catch (e) { console.error(e); }
}
function updateReadouts() {
  const el = document.getElementById("ro"); if (!el || !LAB) return;
  let rows = [];
  try { rows = LAB.def.readouts(P()) || []; } catch (e) { console.error(e); }
  el.innerHTML = rows.map(([l, v]) => `<div class="ro"><span>${rich(l)}</span><b>${rich(v)}</b></div>`).join("");
  mathAll(el);
}
function checkMissions() {
  const id = LAB.id, p = P();
  LAB.def.missions.forEach((m, i) => {
    const key = id + "." + i;
    if (S.missions[key]) return;
    let ok = false; try { ok = m.ok(p, LAB); } catch (e) {}
    if (!ok) return;
    S.missions[key] = 1; S.xp += MISSION_XP; touchStreak(); save(); renderTop();
    const li = document.getElementById("m-" + i); if (li) { li.classList.add("done"); li.querySelector(".boxm").textContent = "✓"; }
    toast(`Missione compiuta! +${MISSION_XP} XP`);
  });
}
function afterLabChange(fromPreset) {
  updateReadouts(); if (!fromPreset) checkMissions(); LabAudio.update(); updateLoudWarn();
  if (!LAB.playing) drawLab();
}
function onParam(el) {
  const id = el.getAttribute("data-p"), prm = LAB.def.params.find(x => x.id === id);
  LAB.p[id] = parseFloat(el.value);
  document.getElementById("o-" + id).textContent = fmtParam(prm, LAB.p[id]);
  afterLabChange();
}
function setChoice(v) {
  LAB.choice = v;
  app.querySelectorAll('[data-act="choice"]').forEach(x => x.setAttribute("aria-pressed", String(x.getAttribute("data-v") === v)));
  LAB.def.params.forEach(prm => { const c = document.getElementById("c-" + prm.id); if (c) c.hidden = !!(prm.show && !prm.show(LAB.choice)); });
  LAB.state = null;
}
function applyPresetValues(pr) {
  if (pr.choice != null) LAB.choice = pr.choice;
  for (const [k, v] of Object.entries(pr.set || {})) if (k in LAB.p) LAB.p[k] = v;
}
function applyPreset(k) {
  const pr = LAB.def.presets[k]; if (!pr) return;
  if (pr.choice != null) setChoice(pr.choice);
  applyPresetValues(pr);
  LAB.def.params.forEach(prm => {
    const inp = document.getElementById("p-" + prm.id); if (inp) inp.value = LAB.p[prm.id];
    const o = document.getElementById("o-" + prm.id); if (o) o.textContent = fmtParam(prm, LAB.p[prm.id]);
  });
  LAB.state = null;
  if (pr.note) toast(pr.note);
  afterLabChange(true);
}

/* audio dei laboratori (Web Audio API), con limitatore e spegnimento automatico */
const LabAudio = {
  ac: null, master: null, h: null, timer: 0,
  ensure() {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    if (!this.ac) {
      this.ac = new AC();
      const comp = this.ac.createDynamicsCompressor();
      comp.threshold.value = -12; comp.knee.value = 6; comp.ratio.value = 12; comp.attack.value = 0.003; comp.release.value = 0.2;
      this.master = this.ac.createGain(); this.master.gain.value = 0;
      this.master.connect(comp); comp.connect(this.ac.destination);
    }
    if (this.ac.state === "suspended") this.ac.resume();
    return true;
  },
  gainFor(v) { return 0.5 * v * v; },
  start() {
    if (!LAB || !LAB.def.audio) return;
    if (!this.ensure()) { toast("Questo browser non supporta l'audio."); return; }
    this.stop(true);
    try { this.h = LAB.def.audio.build(this.ac, this.master, P()); } catch (e) { console.error(e); this.h = null; return; }
    const g = this.master.gain, now = this.ac.currentTime;
    g.cancelScheduledValues(now); g.setValueAtTime(0, now); g.linearRampToValueAtTime(this.gainFor(S.settings.volume), now + 0.08);
    clearTimeout(this.timer); this.timer = setTimeout(() => this.stop(), 20000);
    const b = document.getElementById("listenbtn"); if (b) b.textContent = "■ Ferma";
  },
  update() { if (this.h && this.h.update && LAB) try { this.h.update(P()); } catch (e) { console.error(e); } },
  setVol(v) {
    S.settings.volume = v;
    if (this.ac && this.h) { const now = this.ac.currentTime; this.master.gain.cancelScheduledValues(now); this.master.gain.setTargetAtTime(this.gainFor(v), now, 0.03); }
  },
  stop(quick) {
    clearTimeout(this.timer);
    const b = document.getElementById("listenbtn"); if (b) b.textContent = "▶ Ascolta";
    if (!this.h) return;
    const h = this.h; this.h = null;
    if (this.ac) { const now = this.ac.currentTime; this.master.gain.cancelScheduledValues(now); this.master.gain.setValueAtTime(this.master.gain.value, now); this.master.gain.linearRampToValueAtTime(0, now + (quick ? 0.02 : 0.08)); }
    setTimeout(() => { try { h.stop && h.stop(); } catch (e) {} }, quick ? 30 : 120);
  }
};
function updateLoudWarn() {
  const w = document.getElementById("loudwarn"); if (!w || !LAB || !LAB.def.audio) return;
  let loud = 1; try { loud = LAB.def.audio.loud ? LAB.def.audio.loud(P()) : 1; } catch (e) {}
  w.hidden = !(S.settings.volume > 0.7 || S.settings.volume * loud > 0.55);
}

/* ---------- 3. Quiz concettuali ---------- */
let QFILTER = 0;
function renderQuizHome() {
  const p = quizPlan(), m = srsMastery("qs", QUIZ), nothing = !p.due.length && !p.fresh.length;
  const rows = CH.map((name, i) => {
    const list = QUIZ.filter(q => q.c === i + 1), gl = GRAPHS_L.filter(g => g.c === i + 1);
    const qp = list.map(q => `<i class="pip${srsOf("qs", q.id).seen ? " b" + srsOf("qs", q.id).b : ""}"></i>`).join("");
    return `<li><button class="branch" data-act="quiz-ch" data-ch="${i + 1}">
      <span class="cn ${HL(i + 1)}">${i + 1}</span>
      <span class="cname">${esc(name)}<small>${list.length} domande${gl.length ? ` · ${gl.length} grafici` : ""}</small><span class="pips" aria-hidden="true">${qp}</span></span>
      <span class="pct">${Math.round(srsMastery("qs", list) * 100)}%</span></button></li>`;
  }).join("");
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">3 · Quiz concettuali</div>
    <h1>Domande <span class="mark">di concetto</span></h1>
    <p class="muted" style="margin:0">${QUIZ.length} domande a scelta multipla e ${GRAPHS_L.length} da leggere sul grafico, con la spiegazione subito dopo la risposta. Padronanza ${Math.round(m * 100)}%.</p>
    <div class="today">
      <div class="today-num">${nothing ? "Per oggi le domande sono tutte ripassate." : `<b>${p.due.length}</b> da ripassare · <b>${p.fresh.length}</b> nuove`}</div>
      <button class="btn primary big" data-act="quiz-review">${nothing ? "Ripassa le più deboli" : "Ripasso dei concetti"}</button>
    </div>
    ${GRAPHS_L.length ? `<button class="btn lampo-btn" data-act="graphs"><span class="lb"><b>Leggi il grafico</b><span>riconosci il fenomeno da una curva</span></span><span class="rec">${Math.round(srsMastery("gs", GRAPHS_L) * 100)}%</span></button>` : ""}
  </section>
  <section><h2>Per capitolo</h2><ol class="tree">${rows}</ol></section>`;
}

/* ---------- 4. Problemi da scritto ---------- */
let PFILTER = 0;
function renderProblems() {
  const list = PROBLEMS.filter(p => !PFILTER || p.c === PFILTER);
  const rows = list.map(p => {
    const x = S.probs[p.id], st = !x ? "" : probSolved(p.id) ? '<span class="pstat ok">risolto</span>' : x.w ? '<span class="pstat no">da rifare</span>' : "";
    return `<li><button class="prow" data-act="problem" data-id="${esc(p.id)}"><b>${esc(p.title)}</b><span class="diff" title="Difficoltà ${p.diff} su 3">${"●".repeat(p.diff)}${"○".repeat(3 - p.diff)}</span>
      <small>${p.c} · ${esc(CH[p.c - 1])}</small>${st}</button></li>`;
  }).join("");
  const solved = PROBLEMS.filter(p => probSolved(p.id)).length;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">4 · Problemi da scritto</div>
    <h1>Esercizi <span class="mark">numerici</span></h1>
    <p class="muted" style="margin:0">${PROBLEMS.length} problemi con dati, formula necessaria, soluzione passo passo ed errore tipico. Risolti: ${solved}/${PROBLEMS.length}.</p>
    <button class="btn primary big" data-act="exam-sim">Simula uno scritto (5 problemi)</button>
  </section>
  <section>
    <div class="chips" role="group" aria-label="Capitoli">${chipsHtml(PFILTER, "pfilter")}</div>
    ${rows ? `<ol class="plist" style="list-style:none;margin:0;padding:0">${rows}</ol>` : `<p class="muted">Nessun problema in questo capitolo.</p>`}
  </section>`;
}
function startExamSim() {
  const byDiff = d => weakFirst(PROBLEMS.filter(p => p.diff === d), p => probSolved(p.id) ? 1 : 0);
  const pick5 = [].concat(byDiff(1).slice(0, 1), byDiff(2).slice(0, 2), byDiff(3).slice(0, 2));
  const rest = weakFirst(PROBLEMS.filter(p => !pick5.includes(p)), () => 0);
  const items = pick5.concat(rest).slice(0, 5).map(p => ({ type: "p", id: p.id }));
  startSession(items, "Simulazione di scritto", startExamSim);
}
let PB = null;
function renderProblem() {
  const p = P_BY[VIEW.id]; if (!p) return go("problemi", {}, { replace: true });
  PB = { id: p.id, opts: shuffle(p.o.map((t, k) => ({ t, ok: k === 0 }))), done: false, hint: false };
  app.innerHTML = `
  <div class="sesbar"><button class="link" data-act="nav" data-to="problemi">← Tutti i problemi</button></div>
  <article class="q">
    <div class="qhead"><span class="tag h3c">Problema da scritto</span><span class="qch">${p.c} · ${esc(CH[p.c - 1])} · <span class="diff">${"●".repeat(p.diff)}${"○".repeat(3 - p.diff)}</span></span></div>
    <h1 style="font-size:1.7rem">${esc(p.title)}</h1>
    ${problemTextHtml(p)}
    <div id="phint"><button class="link" data-act="phint">Non so da dove partire: mostrami la formula</button></div>
    <div class="opts">${PB.opts.map((o, k) => `<button class="opt txt" data-act="popt" data-k="${k}"><span class="k">${k + 1}</span><span class="otext">${rich(o.t)}</span></button>`).join("")}</div>
    <div id="fb"></div>
  </article>`;
  mathAll(app); drawPlots(app);
}
function answerProblem(k) {
  if (!PB || PB.done) return;
  const p = P_BY[PB.id], o = PB.opts[k]; if (!o) return;
  PB.done = true;
  const prev = S.probs[p.id], fresh = !(prev && prev.r > 0 && prev.due > Date.now());   // rifatto prima della scadenza: niente XP
  gradeSrs("probs", "p", p.id, o.ok);
  let gain = 0; if (o.ok && fresh) { gain = (PB.hint ? 5 : 10) + 5 * (p.diff || 1); S.xp += gain; }
  save(); renderTop();
  app.querySelectorAll(".opt").forEach((b, i) => { b.disabled = true; if (PB.opts[i].ok) b.classList.add("ok"); else if (i === k) b.classList.add("no"); else b.classList.add("dim"); });
  const h = document.getElementById("phint"); if (h) h.innerHTML = "";
  const fb = document.getElementById("fb");
  fb.innerHTML = `<div class="feedback ${o.ok ? "ok" : "no"}"><div class="verdict">${o.ok ? (gain ? `Giusto! +${gain} XP` : "Giusto! (già risolto: gli XP tornano quando è in scadenza)") : "Non è questo il risultato. Seguiamo la soluzione."}</div>
    ${solutionHtml(p, false)}
    <div class="row"><button class="btn primary" data-act="pnext">Prossimo problema</button><button class="btn" data-act="problem" data-id="${esc(p.id)}">Rifallo</button></div></div>`;
  mathAll(fb);
}
function showStep(all) {
  const hidden = Array.from(app.querySelectorAll("#steps li.hide"));
  (all ? hidden : hidden.slice(0, 1)).forEach(li => li.classList.remove("hide"));
  if (hidden.length <= (all ? hidden.length : 1)) { const r = app.querySelector('[data-act="step"]'); if (r) r.parentNode.remove(); }
}

/* ---------- 5. Allenamento misto ---------- */
let MIX = { ch: 0, types: ["card", "q", "g", "p"], n: 10 };
function renderAllena() {
  const tchip = (t, l) => `<button class="chip" data-act="mixtype" data-t="${t}" aria-pressed="${MIX.types.includes(t)}">${l}</button>`;
  const nchip = n => `<button class="chip" data-act="mixn" data-n="${n}" aria-pressed="${MIX.n === n}">${n}</button>`;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">5 · Allenamento</div>
    <h1>Modalità <span class="mark">mista</span></h1>
    <p class="muted" style="margin:0">Una sessione che alterna formule da completare, domande di concetto, grafici da leggere e problemi numerici, come allo scritto. Pesca prima dalle cose che sai meno.</p>
    <button class="btn primary big" data-act="mix">Inizia (${MIX.n} domande)</button>
    <button class="btn lampo-btn" data-act="rapido"><span class="lb"><b>Ripasso rapido</b><span>5 minuti: errori e scadenze prima di tutto</span></span><span class="rec">record ${S.best.rapido}</span></button>
  </section>
  <section>
    <h2>Capitolo</h2><div class="chips" role="group" aria-label="Capitoli">${chipsHtml(MIX.ch, "mixch")}</div>
    <h2>Tipi di domanda</h2><div class="chips seg" role="group" aria-label="Tipi">${tchip("card", "Formula")}${tchip("q", "Concetto")}${tchip("g", "Grafico")}${tchip("p", "Problema")}</div>
    <h2>Quante domande</h2><div class="chips" role="group" aria-label="Lunghezza">${nchip(10)}${nchip(20)}${nchip(30)}</div>
    <p class="muted">Record dell'allenamento misto: ${S.best.mix} risposte giuste in una sessione.</p>
  </section>`;
}

/* ---------- 6. Errori da rivedere ---------- */
function errTitle(t, id) {
  if (t === "c") return `<b>${esc(BY_ID[id].n)}</b>`;
  if (t === "q") return rich(Q_BY[id].q);
  if (t === "g") return rich(G_BY[id].q);
  return `<b>${esc(P_BY[id].title)}</b>`;
}
function renderErrors() {
  const keys = Object.keys(S.errors).sort((a, b) => S.errors[b].n - S.errors[a].n || S.errors[b].last - S.errors[a].last);
  const tname = { c: "Formula", q: "Concetto", g: "Grafico", p: "Problema" };
  const rows = keys.map(k => {
    const e = S.errors[k], t = k.slice(0, 1), id = k.slice(2);
    let ans = "";
    if (t === "c") ans = M(full(BY_ID[id]));
    else if (t === "p") ans = `<p class="note"><b>${rich(P_BY[id].o[0])}</b></p>`;
    else { const q = t === "q" ? Q_BY[id] : G_BY[id]; ans = `<p class="note"><b>${rich(q.o[0])}</b></p><p class="note">${rich(q.e)}</p>`; }
    const act = t === "c" ? `<button class="btn small" data-act="card" data-id="${esc(id)}">Apri la scheda</button>` : t === "p" ? `<button class="btn small" data-act="problem" data-id="${esc(id)}">Rifai il problema</button>` : "";
    return `<article class="panel rv"><div class="kind">${tname[t]} ${e.n >= 2 ? `<span class="errtag">· errore ricorrente ×${e.n}</span>` : ""}${e.fix ? ` · ${e.fix}/2 giuste` : ""}</div>
      <h3>${errTitle(t, id)}</h3>${ans}${act ? `<div class="row">${act}</div>` : ""}</article>`;
  }).join("");
  const rec = keys.filter(k => S.errors[k].n >= 2).length;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">6 · Errori da rivedere</div>
    <h1>Gli <span class="mark">errori</span></h1>
    <p class="muted" style="margin:0">${keys.length ? `${plural(keys.length, "elemento", "elementi")} da rivedere, ${plural(rec, "ricorrente", "ricorrenti")}. Un errore esce dalla lista dopo due risposte giuste di fila.` : "Nessun errore da rivedere. Ottimo: allenati con il misto o i problemi."}</p>
    ${keys.length ? `<button class="btn primary big" data-act="errors">Ripassa gli errori (${Math.min(15, keys.length)})</button>` : `<button class="btn primary big" data-act="nav" data-to="allena">Vai all'allenamento</button>`}
  </section>
  ${rows ? `<section><div class="review-list">${rows}</div></section>` : ""}`;
  mathAll(app);
}

/* ---------- 7. Progressi ---------- */
let installEvt = null;
function lvClass(v) { return "l" + Math.min(5, Math.round(v * 5)); }
function gapData() {
  return CH.map((name, i) => {
    const ch = i + 1, cards = CARDS.filter(c => c.c === ch), qs = QUIZ.filter(q => q.c === ch), labs = labsOf(ch), ps = PROBLEMS.filter(p => p.c === ch);
    return { ch, name, cells: [
      cards.length ? mastery(cards) : null,
      qs.length ? srsMastery("qs", qs) : null,
      labs.length ? labMastery(ch) : null,
      ps.length ? probMastery(ps) : null] };
  });
}
function renderProgress() {
  const o = overall(), gd = gapData(), totS = Object.values(S.cards).concat(Object.values(S.qs), Object.values(S.gs), Object.values(S.probs));
  const answers = totS.reduce((a, x) => a + x.s, 0), right = totS.reduce((a, x) => a + x.r, 0);
  const acc = answers ? Math.round(right / answers * 100) : 0;
  const days = []; for (let k = 13; k >= 0; k--) { const d = today(-k), n = S.days[d] || 0; days.push(`<i class="${n >= 30 ? "a3" : n >= 10 ? "a2" : n > 0 ? "a1" : ""}" title="${d}: ${n} risposte"></i>`); }
  const cols = ["Formule", "Concetti", "Lab", "Problemi"];
  const gap = `<div class="gap" role="table" aria-label="Mappa delle lacune"><span></span>${cols.map(c => `<span class="gh">${c}</span>`).join("")}
    ${gd.map(r => `<span class="gn" title="${esc(r.name)}">${r.ch} · ${esc(r.name)}</span>${r.cells.map((v, j) => v === null ? `<span class="gc na">–</span>`
      : `<button class="gc ${lvClass(v)}" data-act="gap" data-ch="${r.ch}" data-j="${j}" title="${esc(r.name)} · ${cols[j]}: ${Math.round(v * 100)}%">${Math.round(v * 100)}</button>`).join("")}`).join("")}</div>`;
  const cells = []; gd.forEach(r => r.cells.forEach((v, j) => { if (v !== null) cells.push({ ch: r.ch, j, v, name: r.name }); }));
  const weak = cells.sort((a, b) => a.v - b.v).slice(0, 3);
  const bars = gd.map(r => { const vals = r.cells.filter(v => v !== null), v = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return `<div class="barrow"><span class="cn ${HL(r.ch)}" style="font-size:1rem;padding:2px 0">${r.ch}</span><span class="bt"><i style="width:${(v * 100).toFixed(0)}%"></i></span><span class="bv">${Math.round(v * 100)}%</span></div>`; }).join("");
  const th = S.settings.theme;
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">7 · Progressi</div>
    <h1>Come <span class="mark">sto andando</span></h1>
    <div class="tiles">
      <div class="tile"><b>${Math.round(o.all * 100)}%</b><span>preparazione complessiva</span></div>
      <div class="tile"><b>${S.streak.n}</b><span>giorni di fila (max ${S.streak.best})</span></div>
      <div class="tile"><b>${acc}%</b><span>risposte giuste su ${answers}</span></div></div>
    <div class="tiles">
      <div class="tile"><b>${S.best.lampo}</b><span>record Lampo</span></div>
      <div class="tile"><b>${S.best.rapido}</b><span>record Ripasso rapido</span></div>
      <div class="tile"><b>${S.best.mix}</b><span>record Allenamento</span></div></div>
    <div><div class="muted" style="font-size:.85rem;margin-bottom:6px">Attività degli ultimi 14 giorni</div><div class="week">${days.join("")}</div></div>
  </section>
  <section>
    <h2>Mappa delle lacune</h2>
    <p class="muted" style="margin:0">Percentuale di padronanza per capitolo e tipo di attività. Tocca una casella per allenarti proprio lì.</p>
    ${gap}
    <div class="legend"><span><i class="pip b0"></i>lacuna</span><span><i class="pip b2"></i>in corso</span><span><i class="pip b5"></i>solido</span></div>
  </section>
  <section>
    <h2>Le lacune più grandi</h2>
    <div class="review-list">${weak.map(w => `<article class="panel rv"><h3>${w.ch} · ${esc(w.name)} — ${cols[w.j]}</h3><p class="note">Padronanza ${Math.round(w.v * 100)}%.</p><div class="row"><button class="btn small" data-act="gap" data-ch="${w.ch}" data-j="${w.j}">Allenati qui</button></div></article>`).join("")}</div>
  </section>
  <section>
    <h2>Per capitolo</h2><div class="bars">${bars}</div>
    <div class="tiles two">
      <div class="tile"><b>${Math.round(o.f * 100)}%</b><span>formule (${CARDS.length} schede)</span></div>
      <div class="tile"><b>${Math.round(o.q * 100)}%</b><span>concetti (${QUIZ.length} domande)</span></div>
      <div class="tile"><b>${doneMissions()}/${totalMissions()}</b><span>missioni dei laboratori</span></div>
      <div class="tile"><b>${PROBLEMS.filter(p => probSolved(p.id)).length}/${PROBLEMS.length}</b><span>problemi risolti</span></div></div>
    <button class="btn" data-act="nav" data-to="errori">Errori da rivedere (${errCount()})</button>
  </section>
  <section class="settings">
    <h2>Salvataggio e impostazioni</h2>
    <p class="muted" style="margin:0">I progressi restano in questo dispositivo (localStorage). Esportali in un file per tenerne una copia o per passarli su un altro telefono.</p>
    <div class="row"><button class="btn" data-act="export">Esporta progressi</button>
      <label class="btn filebtn" for="importfile">Importa progressi<input type="file" id="importfile" accept="application/json,.json"></label></div>
    <div><div class="muted" style="font-size:.85rem;margin-bottom:6px">Tema</div><div class="seg">
      ${[["auto", "Automatico"], ["light", "Chiaro"], ["dark", "Scuro"]].map(([v, l]) => `<button class="chip" data-act="theme" data-v="${v}" aria-pressed="${th === v}">${l}</button>`).join("")}</div></div>
    ${installEvt ? `<button class="btn primary" data-act="install">Installa l'app sul telefono</button>` : ""}
    <div class="foot" style="margin-top:6px"><span>Onde &amp; Formule v${APP_VERSION} · KaTeX ${esc(window.katex && window.katex.version || "non caricato")}</span><button class="link" data-act="reset" id="resetbtn">Azzera i progressi</button></div>
  </section>`;
}
function gapTrain(ch, j) {
  if (j === 0) return startChapter(ch);
  if (j === 1) return startQuizChapter(ch);
  if (j === 2) { const id = labsOf(ch).find(x => missionsDone(x) < LABS[x].missions.length) || labsOf(ch)[0]; return go("lab", { id }); }
  const ps = PROBLEMS.filter(p => p.c === ch);
  return startSession(weakFirst(ps, p => probSolved(p.id) ? 1 : 0).map(p => ({ type: "p", id: p.id })), "Problemi · " + CH[ch - 1], () => gapTrain(ch, 3));
}
function exportProgress() {
  const payload = { app: "onde-formule", format: 2, exportedAt: new Date().toISOString(), version: APP_VERSION, state: S };
  const blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = `onde-formule-progressi-${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast("Progressi esportati nel file scaricato.");
}
let pendingImport = null;
function importProgress(file) {
  if (!file) return;
  if (file.size > 3e6) { toast("File troppo grande: non sembra un file di progressi."); return; }
  const rd = new FileReader();
  rd.onload = () => {
    let data;
    try { data = JSON.parse(String(rd.result)); } catch (e) { toast("Il file non è un JSON valido."); return; }
    if (!data || typeof data !== "object") { toast("File non riconosciuto."); return; }
    if (data.app === "onde-formule" && data.state && typeof data.state === "object") {
      const clean = sanitize(data.state);
      pendingImport = clean;
      banner(`Sostituire i progressi attuali con quelli del file (${clean.xp} XP, ${Object.keys(clean.cards).length} schede viste)?`, "Sostituisci", () => {
        S = pendingImport; pendingImport = null; save(); applyTheme(); toast("Progressi importati."); go("progressi", {}, { replace: true });
      });
    } else if (data.v === 1 && (data.cards || data.qs || data.missions)) {
      banner("Unire ai tuoi i progressi delle app originali contenuti nel file?", "Unisci", () => { S = mergeLegacy(S, data); save(); toast("Progressi delle app originali uniti ai tuoi."); go("progressi", {}, { replace: true }); });
    } else toast("Il file non contiene progressi di Onde & Formule.");
  };
  rd.onerror = () => toast("Non riesco a leggere il file.");
  rd.readAsText(file);
}
function applyTheme() {
  const t = S.settings.theme, root = document.documentElement;
  // in automatico tolgo solo il tema che ho messo io (non quello scelto dall'ambiente che ospita la pagina)
  if (t === "auto") { if (root.hasAttribute("data-of-theme")) { root.removeAttribute("data-theme"); root.removeAttribute("data-of-theme"); } }
  else { root.setAttribute("data-theme", t); root.setAttribute("data-of-theme", "1"); }
  setTimeout(() => { readCols(); Wave.readColors(); if (Wave.still) Wave.draw(); if (LAB && !LAB.playing) drawLab(); drawPlots(app); }, 30);
}

/* ---------- eventi ---------- */
let resetArmed = false;
app.addEventListener("input", e => {
  const el = e.target;
  if (LAB && el.matches && el.matches("input[type=range][data-p]")) onParam(el);
  else if (el.id === "vol") { const v = parseFloat(el.value); LabAudio.setVol(v); const o = document.getElementById("o-vol"); if (o) o.textContent = Math.round(v * 100) + "%"; updateLoudWarn(); }
});
app.addEventListener("change", e => {
  if (e.target.id === "vol") save();
  if (e.target.id === "importfile") { importProgress(e.target.files && e.target.files[0]); e.target.value = ""; }
});
function onAct(b) {
  const a = b.getAttribute("data-act"), ch = +b.getAttribute("data-ch"), id = b.getAttribute("data-id");
  switch (a) {
    case "nav": go(b.getAttribute("data-to")); break;
    case "rapido": startRapido(); break;
    case "today": startToday(); break;
    case "lampo": startLampo(); break;
    case "free": startFree(b.getAttribute("data-mode")); break;
    case "filter": FILTER = ch; app.querySelectorAll('[data-act="filter"]').forEach(x => x.setAttribute("aria-pressed", String(x === b))); break;
    case "chapter": go("chapter", { ch }); break;
    case "card": { const c = BY_ID[id]; if (c) go("chapter", { ch: c.c, focus: id }); break; }
    case "concept": if (K_BY[id]) go("concept", { id, exam: b.hasAttribute("data-exam") }); break;
    case "exam": { const k = K_BY[id]; if (!k) break; VIEW.exam = true; try { history.replaceState({ v: VIEW }, ""); } catch (e) {} S.exam[id] = 1; save(); const eb = document.getElementById("exambox"); eb.innerHTML = examHtml(k); mathAll(eb); break; }
    case "train-ch": startChapter(VIEW.ch); break;
    case "quit": if (SES && SES.timer) clearInterval(SES.timer); { const f = SES && SES.from; SES = null; go(f ? f.name : "home", f); } break;
    case "quit-lampo": if (L) clearInterval(L.timer); L = null; go("formule"); break;
    case "opt": answerOpt(+b.getAttribute("data-k")); break;
    case "reveal": reveal(); break;
    case "mem": gradeMem(b.getAttribute("data-r")); break;
    case "studied": studied(); break;
    case "next": next(); break;
    case "again": { const f = SES && SES.again; if (f) f(); else go("home"); break; }
    case "back-from": { const f = SES && SES.from; go(f ? f.name : "home", f); break; }
    case "vf": answerLampo(b.getAttribute("data-v") === "1"); break;
    case "lab": go("lab", { id }); break;
    case "play": LAB.playing = !LAB.playing; LAB.last = 0; b.textContent = LAB.playing ? "Pausa" : "Avvia"; break;
    case "choice": setChoice(b.getAttribute("data-v")); afterLabChange(); break;
    case "preset": applyPreset(+b.getAttribute("data-k")); break;
    case "listen": if (LabAudio.h) LabAudio.stop(); else { LabAudio.start(); updateLoudWarn(); } break;
    case "quiz-review": startQuizReview(); break;
    case "quiz-ch": startQuizChapter(ch); break;
    case "graphs": startGraphs(0); break;
    case "pfilter": PFILTER = ch; renderProblems(); break;
    case "problem": go("problema", { id }); break;
    case "popt": answerProblem(+b.getAttribute("data-k")); break;
    case "phint": { const p = P_BY[PB && PB.id]; if (!p) break; PB.hint = true; const h = document.getElementById("phint"); h.innerHTML = `<div class="qa which"><div class="qk">Quale formula uso?</div>${(p.formula || []).map(t => M(t)).join("")}</div>`; mathAll(h); break; }
    case "step": showStep(false); break;
    case "allsteps": showStep(true); break;
    case "pnext": { const list = PROBLEMS.filter(p => !PFILTER || p.c === PFILTER), i = list.findIndex(p => p.id === VIEW.id); const nx = list[(i + 1) % list.length]; if (nx) go("problema", { id: nx.id }, { replace: true }); break; }
    case "exam-sim": startExamSim(); break;
    case "mix": if (!MIX.types.length) { toast("Scegli almeno un tipo di domanda."); break; } startMix(Object.assign({}, MIX, { types: MIX.types.slice() })); break;
    case "mixch": MIX.ch = ch; renderAllena(); break;
    case "mixtype": { const t = b.getAttribute("data-t"); MIX.types = MIX.types.includes(t) ? MIX.types.filter(x => x !== t) : MIX.types.concat(t); renderAllena(); break; }
    case "mixn": MIX.n = +b.getAttribute("data-n"); renderAllena(); break;
    case "errors": startErrors(); break;
    case "gap": gapTrain(ch, +b.getAttribute("data-j")); break;
    case "export": exportProgress(); break;
    case "theme": S.settings.theme = b.getAttribute("data-v"); save(); applyTheme(); renderProgress(); break;
    case "install": if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; if (VIEW.name === "progressi") renderProgress(); }); } break;
    case "reset":
      if (!resetArmed) { resetArmed = true; b.textContent = "Tocca di nuovo per azzerare tutto"; setTimeout(() => { resetArmed = false; const r = document.getElementById("resetbtn"); if (r) r.textContent = "Azzera i progressi"; }, 4000); }
      else { resetArmed = false; const st = S.settings; S = blank(); S.settings = st; save(); go("home"); }
      break;
  }
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b || b.tagName === "LABEL") return;
  if (!app.contains(b) && !document.getElementById("nav").contains(b)) return;
  onAct(b);
});
document.addEventListener("keydown", e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = e.target && e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (VIEW.name === "session" && SES) {
    const it = SES.items[SES.i]; if (!it) return;
    if (SES.state === "ask" && it.opts && /^[1-4]$/.test(e.key)) { e.preventDefault(); answerOpt(+e.key - 1); }
    else if (SES.state === "ask" && it.type === "card" && it.mode === "memoria" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); reveal(); }
    else if (SES.state === "ask" && it.type === "card" && it.mode === "study" && e.key === "Enter") { e.preventDefault(); studied(); }
    else if (SES.state === "done" && e.key === "Enter" && document.activeElement && document.activeElement.id !== "nextbtn" && document.activeElement.tagName !== "BUTTON") { e.preventDefault(); next(); }
  } else if (VIEW.name === "lampo") {
    if (e.key === "ArrowRight") { e.preventDefault(); answerLampo(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); answerLampo(false); }
  } else if (VIEW.name === "problema" && PB && !PB.done && /^[1-4]$/.test(e.key)) { e.preventDefault(); answerProblem(+e.key - 1); }
});
document.addEventListener("visibilitychange", () => { if (document.hidden) LabAudio.stop(); });
if (window.matchMedia) {
  const re = () => setTimeout(() => { readCols(); Wave.readColors(); if (Wave.still) Wave.draw(); if (LAB && !LAB.playing) drawLab(); drawPlots(app); }, 30);
  const mq = matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", re);
}

/* ---------- PWA: service worker, aggiornamenti, installazione ---------- */
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (VIEW.name === "progressi") renderProgress(); });
window.addEventListener("appinstalled", () => { installEvt = null; toast("App installata. La trovi tra le app del telefono."); });
function registerSW() {
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  let userAsked = false;
  const first = !navigator.serviceWorker.controller;
  const offer = w => banner("È pronta una nuova versione dell'app.", "Aggiorna", () => { userAsked = true; if (w.state === "activated") location.reload(); else w.postMessage({ type: "SKIP_WAITING" }); });
  navigator.serviceWorker.register("service-worker.js").then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
    reg.addEventListener("updatefound", () => {
      const nw = reg.installing; if (!nw) return;
      nw.addEventListener("statechange", () => {
        if (nw.state === "installed" && navigator.serviceWorker.controller) offer(nw);
        if (nw.state === "activated" && first) toast("Pronta anche offline.");
      });
    });
  }).catch(() => {});
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (userAsked) location.reload(); });
}

function start() {
  readCols(); applyTheme();
  const go0 = new URLSearchParams(location.search).get("go");
  const routes = { rapido: "home", labs: "labs", formule: "formule", problemi: "problemi", quiz: "quiz", progressi: "progressi" };
  VIEW = { name: routes[go0] || "home" };
  try { history.replaceState({ v: VIEW }, "", go0 ? location.pathname + location.hash : undefined); } catch (e) { try { history.replaceState({ v: VIEW }, ""); } catch (e2) {} }
  render();
  if (go0 === "rapido") startRapido();
  registerSW();
}
start();
