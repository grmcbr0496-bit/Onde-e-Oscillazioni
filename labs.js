"use strict";
/* Onde & Formule — laboratori interattivi.
   Ogni laboratorio: { c, title, h, see, intro (perché succede), cards (quale formula uso), concept?,
   choice?, params, presets?, readouts(P), missions, notes, draw(ctx, w, h, P, t, L), reset?(L), audio? }.
   I testi usano $...$ per le formule (resi con KaTeX dall'app, sempre con escaping). */
/* ---------- strumenti di disegno ---------- */
const TAU = Math.PI * 2;
let COL = {};
function toRGB(c) {
  const m = /^#([0-9a-f]{6})$/i.exec(c);
  if (m) { const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  const r = String(c).match(/\d+(\.\d+)?/g);
  return r ? r.slice(0, 3).map(Number) : [39, 71, 201];
}
function readCols() {
  const cs = getComputedStyle(document.documentElement);
  const g = n => cs.getPropertyValue(n).trim();
  COL = { ink: g("--ink"), ink2: g("--ink-2"), line: g("--line"), card: g("--card"), paper: g("--paper"), pen: g("--pen"), good: g("--good"), bad: g("--bad"),
    hl1: g("--hl-1"), hl2: g("--hl-2"), hl3: g("--hl-3"), hl4: g("--hl-4"), hl5: g("--hl-5") };
  COL.penRGB = toRGB(COL.pen); COL.badRGB = toRGB(COL.bad); COL.inkRGB = toRGB(COL.ink);
}
const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
function poly(ctx, pts, color, lw, dash) {
  if (pts.length < 2) return;
  ctx.save(); ctx.beginPath();
  pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
  ctx.strokeStyle = color; ctx.lineWidth = lw || 2; ctx.setLineDash(dash || []);
  ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.stroke(); ctx.restore();
}
function txt(ctx, s, x, y, o) {
  o = o || {};
  ctx.save(); ctx.fillStyle = o.color || COL.ink2;
  ctx.font = `${o.weight || 500} ${o.size || 12}px ${o.mono ? '"IBM Plex Mono", ui-monospace, monospace' : '"Atkinson Hyperlegible", system-ui, sans-serif'}`;
  ctx.textAlign = o.align || "left"; ctx.textBaseline = o.base || "alphabetic";
  ctx.fillText(s, x, y); ctx.restore();
}
function dot(ctx, x, y, r, c) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = c; ctx.fill(); }
function box(b) { return Object.assign({}, b, { X: v => b.x + (v - b.x0) / (b.x1 - b.x0) * b.w, Y: v => b.y + b.h - (v - b.y0) / (b.y1 - b.y0) * b.h }); }
function fnPts(f, B, n) {
  n = n || 240; const pts = [];
  for (let i = 0; i <= n; i++) { const v = B.x0 + (B.x1 - B.x0) * i / n; const y = f(v); if (isFinite(y)) pts.push([B.X(v), B.Y(y)]); }
  return pts;
}
function clip(ctx, B, fn) { ctx.save(); ctx.beginPath(); ctx.rect(B.x, B.y, B.w, B.h); ctx.clip(); fn(); ctx.restore(); }
function frame(ctx, B, o) {
  o = o || {};
  if (B.y0 < 0 && B.y1 > 0) poly(ctx, [[B.x, B.Y(0)], [B.x + B.w, B.Y(0)]], COL.line, 1.2);
  else poly(ctx, [[B.x, B.y + B.h], [B.x + B.w, B.y + B.h]], COL.line, 1.2);
  poly(ctx, [[B.x, B.y], [B.x, B.y + B.h]], COL.line, 1.2);
  if (o.xl) txt(ctx, o.xl, B.x + B.w, B.y + B.h + 14, { align: "right", size: 11, mono: true });
  if (o.yl) txt(ctx, o.yl, B.x + 4, B.y + 10, { size: 11, mono: true });
  if (o.ticks) for (const [v, s] of o.ticks) { const X = B.X(v); poly(ctx, [[X, B.y + B.h], [X, B.y + B.h + 4]], COL.ink2, 1); txt(ctx, s, X, B.y + B.h + 14, { align: "center", size: 10, mono: true }); }
}
function spring(ctx, x1, x2, y, coils, amp, color) {
  const pts = [[x1, y]]; const a = x1 + 8, b = x2 - 8;
  pts.push([a, y]);
  for (let i = 1; i < coils * 2; i++) pts.push([a + (b - a) * i / (coils * 2), y + (i % 2 ? -amp : amp)]);
  pts.push([b, y], [x2, y]);
  poly(ctx, pts, color, 1.6);
}
function arrowHead(ctx, x, y, ang, s, c) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(-s, -s * 0.55); ctx.lineTo(-s, s * 0.55); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.restore();
}
const fm = (x, d) => (d === undefined ? 2 : d) >= 0 ? Number(x).toFixed(d === undefined ? 2 : d).replace(".", ",").replace("-", "−") : String(x);
const deg = r => r * 180 / Math.PI;

/* ---------- i dodici laboratori ---------- */
const LABS = {
1: {
  title: "Oscillatore armonico", h: 300,
  intro: ["Una massa su una molla: la forza $F=-kx$ la riporta sempre verso $x=0$. Il risultato è un moto armonico $x(t)=C\\cos(\\omega_0 t+\\varphi)$.",
    "Muovi i cursori e guarda il grafico: $k$ e $m$ cambiano il periodo, $x_0$ e $v_0$ cambiano solo ampiezza e fase."],
  params: [
    { id: "k", label: "Costante elastica $k$", min: 1, max: 50, step: 0.5, v: 16, u: "N/m", d: 1 },
    { id: "m", label: "Massa $m$", min: 0.2, max: 5, step: 0.05, v: 1, u: "kg", d: 2 },
    { id: "x0", label: "Posizione iniziale $x_0$", min: -1, max: 1, step: 0.01, v: 0.5, u: "m", d: 2 },
    { id: "v0", label: "Velocità iniziale $v_0$", min: -5, max: 5, step: 0.05, v: 0, u: "m/s", d: 2 }],
  calc(P) { const w0 = Math.sqrt(P.k / P.m); const C = Math.hypot(P.x0, P.v0 / w0); return { w0, C, ph: Math.atan2(-P.v0 / w0, P.x0), T: TAU / w0, E: 0.5 * P.k * C * C }; },
  readouts(P) { const c = this.calc(P); return [["$\\omega_0=\\sqrt{k/m}$", fm(c.w0) + " rad/s"], ["Periodo $T$", fm(c.T) + " s"], ["Ampiezza $C$", fm(c.C) + " m"], ["Energia $E=\\tfrac12 kC^2$", fm(c.E) + " J"]]; },
  missions: [
    { t: "Costruisci un oscillatore con periodo $T=2{,}00$ s (±0,05).", ok: P => Math.abs(LABS[1].calc(P).T - 2) < 0.05 },
    { t: "Parti dall'equilibrio ($x_0=0$) e ottieni un'ampiezza di 1 m (±0,03).", ok: P => Math.abs(P.x0) < 0.005 && Math.abs(LABS[1].calc(P).C - 1) < 0.03 },
    { t: "Raddoppia sia $k$ sia $m$ rispetto a $k=10$, $m=1$ e controlla che il periodo non cambi: porta $k=20$ e $m=2$.", ok: P => Math.abs(P.k - 20) < 0.3 && Math.abs(P.m - 2) < 0.03 }],
  notes: ["Il periodo dipende solo da $k$ e $m$: cambiando $x_0$ resta uguale (isocronismo).",
    "La velocità è massima in $x=0$ e nulla agli estremi: guarda le barre dell'energia scambiarsi.",
    "Partendo da $x_0=0$ serve $v_0\\neq0$, e l'ampiezza diventa $C=v_0/\\omega_0$."],
  draw(ctx, w, h, P, t) {
    const c = this.calc(P), x = c.C * Math.cos(c.w0 * t + c.ph), v = -c.C * c.w0 * Math.sin(c.w0 * t + c.ph);
    const floorY = 104, eqX = w * 0.46, sc = (w * 0.46 - 40) / 1.6;
    ctx.fillStyle = COL.line; ctx.fillRect(10, 40, 5, floorY - 40);
    poly(ctx, [[10, floorY], [w - 10, floorY]], COL.ink2, 1.5);
    poly(ctx, [[eqX, 40], [eqX, floorY]], COL.ink2, 1, [4, 4]); txt(ctx, "x = 0", eqX + 4, 50, { size: 11, mono: true });
    const bx = eqX + x * sc;
    spring(ctx, 15, bx - 18, 86, 12, 7, COL.ink);
    ctx.fillStyle = COL.hl4; ctx.fillRect(bx - 18, 68, 36, 36); ctx.strokeStyle = COL.ink; ctx.lineWidth = 2; ctx.strokeRect(bx - 18, 68, 36, 36);
    const Ek = 0.5 * P.m * v * v, U = 0.5 * P.k * x * x, E = Ek + U || 1, bw = Math.min(110, w * 0.3), bxs = w - bw - 12;
    txt(ctx, "cinetica", bxs - 6, 18, { align: "right", size: 11 }); ctx.fillStyle = COL.good; ctx.fillRect(bxs, 9, bw * Ek / E, 10);
    txt(ctx, "potenziale", bxs - 6, 34, { align: "right", size: 11 }); ctx.fillStyle = COL.pen; ctx.fillRect(bxs, 25, bw * U / E, 10);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.strokeRect(bxs, 9, bw, 10); ctx.strokeRect(bxs, 25, bw, 10);
    const B = box({ x: 34, y: 126, w: w - 44, h: h - 152, x0: 0, x1: 10, y0: -1.6, y1: 1.6 });
    frame(ctx, B, { xl: "t (s)", yl: "x (m)", ticks: [[2, "2"], [4, "4"], [6, "6"], [8, "8"]] });
    clip(ctx, B, () => poly(ctx, fnPts(s => c.C * Math.cos(c.w0 * s + c.ph), B, 400), COL.pen, 2.2));
    if (c.C <= 1.6) dot(ctx, B.X(t % 10), B.Y(x), 4.5, COL.bad); else txt(ctx, "ampiezza fuori scala", B.x + B.w, B.y + 10, { align: "right", size: 11, color: COL.bad });
  }
},

2: {
  title: "Oscillatore smorzato", h: 280,
  intro: ["L'attrito viscoso $F=-2\\gamma m\\dot x$ toglie energia. Il confronto tra $\\gamma$ e $\\omega_0$ decide il comportamento: oscilla spegnendosi, torna a zero il più in fretta possibile, oppure scivola lentamente verso l'equilibrio.",
    "La massa parte ferma da $x_0=1$."],
  params: [
    { id: "g", label: "Smorzamento $\\gamma$", min: 0, max: 6, step: 0.02, v: 0.3, u: "s⁻¹", d: 2 },
    { id: "w0", label: "Pulsazione propria $\\omega_0$", min: 0.5, max: 5, step: 0.05, v: 3, u: "rad/s", d: 2 }],
  regime(P) { if (Math.abs(P.g - P.w0) <= 0.03 * P.w0 + 0.01) return "crit"; return P.g < P.w0 ? "sotto" : "sovra"; },
  x(P, t) {
    const g = P.g, w0 = P.w0, r = this.regime(P);
    if (r === "crit") return Math.exp(-w0 * t) * (1 + w0 * t);
    if (r === "sotto") { const w = Math.sqrt(w0 * w0 - g * g); return Math.exp(-g * t) * (Math.cos(w * t) + (g / w) * Math.sin(w * t)); }
    const s = Math.sqrt(g * g - w0 * w0), l1 = -g + s, l2 = -g - s;
    return (-l2 * Math.exp(l1 * t) + l1 * Math.exp(l2 * t)) / (l1 - l2);
  },
  readouts(P) {
    const r = this.regime(P), w = r === "sotto" ? Math.sqrt(P.w0 ** 2 - P.g ** 2) : 0;
    const name = { sotto: "sottosmorzato", crit: "critico", sovra: "sovrasmorzato" }[r];
    return [["Regime", name], ["$\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$", r === "sotto" ? fm(w) + " rad/s" : "non oscilla"],
      ["$\\tau=1/\\gamma$", P.g > 0 ? fm(1 / P.g) + " s" : "∞"], ["Oscillazioni in $\\tau$", r === "sotto" && P.g > 0 ? fm(w / (TAU * P.g), 1) : r === "sotto" ? "∞" : "0"]];
  },
  missions: [
    { t: "Porta il sistema in smorzamento critico ($\\gamma=\\omega_0$).", ok: P => LABS[2].regime(P) === "crit" },
    { t: "Rendi il sistema sovrasmorzato: niente oscillazioni.", ok: P => P.g > 1.05 * P.w0 },
    { t: "Fai vedere almeno 5 oscillazioni prima che l'ampiezza scenda a $1/e$.", ok: P => LABS[2].regime(P) === "sotto" && P.g > 0 && Math.sqrt(P.w0 ** 2 - P.g ** 2) / (TAU * P.g) >= 5 }],
  notes: ["Nel sottosmorzato l'inviluppo tratteggiato è $\\pm e^{-\\gamma t}$: le oscillazioni restano dentro.",
    "Confronta critico e sovrasmorzato: entrambi non oscillano, ma il critico torna a zero prima.",
    "Con $\\gamma$ piccolo il periodo è quasi quello libero: la correzione su $\\omega$ è del secondo ordine."],
  draw(ctx, w, h, P, t) {
    const B = box({ x: 34, y: 18, w: w - 44, h: h - 46, x0: 0, x1: 10, y0: -1.1, y1: 1.1 });
    frame(ctx, B, { xl: "t (s)", yl: "x", ticks: [[2, "2"], [4, "4"], [6, "6"], [8, "8"]] });
    const r = this.regime(P);
    clip(ctx, B, () => {
      if (r === "sotto" && P.g > 0) { poly(ctx, fnPts(s => Math.exp(-P.g * s), B), COL.ink2, 1.2, [5, 5]); poly(ctx, fnPts(s => -Math.exp(-P.g * s), B), COL.ink2, 1.2, [5, 5]); }
      poly(ctx, fnPts(s => this.x(P, s), B, 500), COL.pen, 2.4);
    });
    const tc = t % 10; dot(ctx, B.X(tc), B.Y(this.x(P, tc)), 4.5, COL.bad);
    const name = { sotto: "sottosmorzato", crit: "smorzamento critico", sovra: "sovrasmorzato" }[r];
    txt(ctx, name, B.x + B.w - 4, B.y + 16, { align: "right", size: 15, weight: 700, color: COL.ink });
  }
},

3: {
  title: "Forzato e risonanza", h: 340,
  intro: ["Una forza $F_0\\cos(\\omega_F t)$ spinge l'oscillatore. Finito il transitorio, oscilla alla frequenza della forza con ampiezza $B$ e fase $\\varphi$: entrambe dipendono da quanto $\\omega_F$ è vicina a $\\omega_0$.",
    "Qui $\\omega_0=3$ rad/s e $F_0/m=1$. In alto la curva di risonanza, in basso forza e spostamento nel tempo."],
  params: [
    { id: "wf", label: "Frequenza della forza $\\omega_F$", min: 0.2, max: 6, step: 0.02, v: 1.5, u: "rad/s", d: 2 },
    { id: "g", label: "Smorzamento $\\gamma$", min: 0.04, max: 2, step: 0.01, v: 0.3, u: "s⁻¹", d: 2 }],
  B(wf, g) { return 1 / Math.sqrt((9 - wf * wf) ** 2 + 4 * g * g * wf * wf); },
  phi(P) { return Math.atan2(-2 * P.g * P.wf, 9 - P.wf * P.wf); },
  readouts(P) { const B = this.B(P.wf, P.g); return [["Ampiezza $B$", fm(B, 3)], ["Fase $\\varphi$", fm(deg(this.phi(P)), 0) + "°"], ["$B$ rispetto a $\\omega_F\\to0$", "×" + fm(B * 9, 1)], ["Picco $B(\\omega_0)$", fm(this.B(3, P.g), 3)]]; },
  missions: [
    { t: "Trova la risonanza: $\\omega_F$ entro il 2% di $\\omega_0$. Guarda la fase in basso: $-90°$.", ok: P => Math.abs(P.wf - 3) < 0.06 },
    { t: "Forza molto più veloce di $\\omega_0$: porta la fase oltre $-160°$ (quasi controfase).", ok: P => deg(LABS[3].phi(P)) < -160 },
    { t: "Stando in risonanza, fai superare al picco il valore $B=2$.", ok: P => Math.abs(P.wf - 3) < 0.06 && LABS[3].B(P.wf, P.g) >= 2 }],
  notes: ["Dimezzando $\\gamma$ il picco raddoppia: $B(\\omega_0)=F_0/(2m\\gamma\\omega_0)$.",
    "Sotto risonanza lo spostamento segue la forza quasi in fase; sopra le va contro.",
    "A risonanza la forza è in fase con la velocità: è il modo più efficiente di dare energia."],
  draw(ctx, w, h, P, t) {
    const T = box({ x: 34, y: 14, w: w - 44, h: h * 0.48 - 14, x0: 0, x1: 6, y0: 0, y1: 2.6 });
    frame(ctx, T, { xl: "ω_F (rad/s)", yl: "B", ticks: [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"]] });
    poly(ctx, [[T.X(3), T.y], [T.X(3), T.y + T.h]], COL.ink2, 1, [4, 4]); txt(ctx, "ω₀", T.X(3) + 4, T.y + 12, { size: 11, mono: true });
    clip(ctx, T, () => poly(ctx, fnPts(s => this.B(s, P.g), T, 400), COL.pen, 2.4));
    const Bv = this.B(P.wf, P.g);
    if (Bv <= 2.6) dot(ctx, T.X(P.wf), T.Y(Bv), 5, COL.bad); else { arrowHead(ctx, T.X(P.wf), T.y + 6, -Math.PI / 2, 9, COL.bad); }
    const per = TAU / P.wf, ph = this.phi(P);
    const L = box({ x: 34, y: h * 0.48 + 26, w: w - 44, h: h * 0.52 - 52, x0: 0, x1: 3 * per, y0: -1.25, y1: 1.25 });
    frame(ctx, L, { xl: "t", yl: "" });
    clip(ctx, L, () => {
      poly(ctx, fnPts(s => Math.cos(P.wf * s), L, 300), COL.bad, 1.8, [6, 5]);
      poly(ctx, fnPts(s => Math.cos(P.wf * s + ph), L, 300), COL.ink, 2.2);
    });
    const tc = t % (3 * per);
    dot(ctx, L.X(tc), L.Y(Math.cos(P.wf * tc)), 4, COL.bad); dot(ctx, L.X(tc), L.Y(Math.cos(P.wf * tc + ph)), 4.5, COL.ink);
    txt(ctx, "- - forza", L.x + 6, L.y + 10, { size: 11, color: COL.bad }); txt(ctx, "— spostamento (normalizzato)", L.x + 70, L.y + 10, { size: 11, color: COL.ink });
  }
},

4: {
  title: "Modi normali e battimenti", h: 340,
  intro: ["Due pendoli uguali uniti da una molla. Il moto può sembrare complicato, ma è sempre la somma di due modi normali: in fase (a pendolo, $\\omega_a$) e in controfase (a respiro, $\\omega_b$).",
    "Scegli come farli partire e cambia la molla. Qui $g/l=4$, quindi $\\omega_a=2$ rad/s."],
  choice: { id: "mode", opts: [["a", "Modo a pendolo"], ["b", "Modo a respiro"], ["beat", "Parte solo il primo"]], v: "beat" },
  params: [{ id: "kc", label: "Molla $k/m$", min: 0.05, max: 3.5, step: 0.05, v: 1.2, u: "s⁻²", d: 2 }],
  wb(P) { return Math.sqrt(4 + 2 * P.kc); },
  xs(P, t) {
    const wa = 2, wb = this.wb(P);
    if (P.choice === "a") return [Math.cos(wa * t), Math.cos(wa * t)];
    if (P.choice === "b") return [Math.cos(wb * t), -Math.cos(wb * t)];
    return [0.5 * (Math.cos(wa * t) + Math.cos(wb * t)), 0.5 * (Math.cos(wa * t) - Math.cos(wb * t))];
  },
  readouts(P) { const wb = this.wb(P); return [["$\\omega_a=\\sqrt{g/l}$", "2,00 rad/s"], ["$\\omega_b=\\sqrt{g/l+2k/m}$", fm(wb) + " rad/s"], ["Energia da un pendolo all'altro in", fm(Math.PI / (wb - 2), 1) + " s"]]; },
  missions: [
    { t: "Eccita solo il modo a respiro e porta $\\omega_b$ sopra 3 rad/s.", ok: P => P.choice === "b" && LABS[4].wb(P) > 3 },
    { t: "Battimenti lenti: fai passare tutta l'energia al secondo pendolo in più di 15 s.", ok: P => P.choice === "beat" && Math.PI / (LABS[4].wb(P) - 2) > 15 },
    { t: "Battimenti veloci: scambio completo in meno di 3 s.", ok: P => P.choice === "beat" && Math.PI / (LABS[4].wb(P) - 2) < 3 }],
  notes: ["Nel modo a pendolo la molla non si deforma mai: la frequenza non dipende da $k$.",
    "Facendo partire un solo pendolo ecciti entrambi i modi: la loro somma dà i battimenti.",
    "Molla debole significa $\\omega_a\\approx\\omega_b$: battimenti lenti, inviluppo $\\cos\\!\\left(\\frac{\\omega_b-\\omega_a}{2}t\\right)$."],
  draw(ctx, w, h, P, t) {
    const [x1, x2] = this.xs(P, t);
    const topY = 12, L = h * 0.36, A = Math.min(34, w * 0.09);
    poly(ctx, [[w * 0.12, topY], [w * 0.88, topY]], COL.ink, 2.5);
    const piv = [w * 0.32, w * 0.68], xx = [x1, x2], bobs = [];
    for (let i = 0; i < 2; i++) {
      const dx = xx[i] * A, by = topY + Math.sqrt(L * L - dx * dx), bx = piv[i] + dx;
      poly(ctx, [[piv[i], topY], [bx, by]], COL.ink2, 1.6); bobs.push([bx, by]);
    }
    spring(ctx, bobs[0][0] + 11, bobs[1][0] - 11, (bobs[0][1] + bobs[1][1]) / 2, 9, 5, COL.ink);
    dot(ctx, bobs[0][0], bobs[0][1], 11, COL.pen); dot(ctx, bobs[1][0], bobs[1][1], 11, COL.bad);
    const H = (h - (topY + L + 24) - 22) / 2;
    const B1 = box({ x: 34, y: topY + L + 24, w: w - 44, h: H - 6, x0: t - 20, x1: t, y0: -1.15, y1: 1.15 });
    const B2 = box({ x: 34, y: topY + L + 24 + H + 6, w: w - 44, h: H - 6, x0: t - 20, x1: t, y0: -1.15, y1: 1.15 });
    for (const [B, i, c] of [[B1, 0, COL.pen], [B2, 1, COL.bad]]) {
      frame(ctx, B, {});
      clip(ctx, B, () => poly(ctx, fnPts(s => this.xs(P, s)[i], B, 500), c, 2));
      txt(ctx, i ? "pendolo 2" : "pendolo 1", B.x + 6, B.y + 10, { size: 11, color: c, weight: 700 });
    }
    txt(ctx, "ultimi 20 s →", w - 10, h - 6, { align: "right", size: 10, mono: true });
  }
},

5: {
  title: "Onda armonica e onde stazionarie", h: 360,
  intro: ["Un'onda armonica $\\psi(x,t)=A\\sin(kx-\\omega t+\\varphi)$ è una sinusoide che scorre. Ha due periodicità: nello spazio si ripete ogni $\\lambda=2\\pi/k$, nel tempo ogni $T=2\\pi/\\omega$. La forma avanza con velocità $v=\\lambda/T=\\omega/k$.",
    "Guarda il punto rosso: va solo su e giù, non avanza. Quello che viaggia è la forma, cioè la cresta col triangolino. In basso c'è la storia del punto rosso nel tempo: è un oscillatore armonico.",
    "Sommando un'onda che va a destra e una che va a sinistra ottieni un'onda stazionaria: compaiono i nodi, punti sempre fermi."],
  choice: { id: "kind", opts: [["prog", "Progressiva →"], ["reg", "Regressiva ←"], ["staz", "Stazionaria"], ["fissa", "Corda fissa (L = 8 m)"]], v: "prog" },
  params: [
    { id: "A", label: "Ampiezza $A$", min: 0.2, max: 1, step: 0.01, v: 0.7, u: "m", d: 2 },
    { id: "lam", label: "Lunghezza d'onda $\\lambda$", min: 0.5, max: 4, step: 0.01, v: 2.5, u: "m", d: 2, show: c => c !== "fissa" },
    { id: "T", label: "Periodo $T$", min: 0.5, max: 4, step: 0.01, v: 2, u: "s", d: 2, show: c => c !== "fissa" },
    { id: "phi", label: "Fase $\\varphi$", min: 0, max: 360, step: 1, v: 0, u: "°", d: 0, show: c => c !== "fissa" },
    { id: "n", label: "Modo $n$", min: 1, max: 8, step: 1, v: 2, u: "", d: 0, show: c => c === "fissa" }],
  readouts(P) {
    if (P.choice === "fissa") { const lam = 16 / P.n; return [["$\\lambda_n=2L/n$", fm(lam) + " m"], ["$\\nu_n=nv/2L$ (con $v=2$ m/s)", fm(P.n * 2 / 16, 3) + " Hz"], ["Nodi (estremi compresi)", String(P.n + 1)]]; }
    const k = TAU / P.lam, om = TAU / P.T;
    return [["$k=2\\pi/\\lambda$", fm(k) + " rad/m"], ["$\\omega=2\\pi/T$", fm(om) + " rad/s"], ["$\\nu=1/T$", fm(1 / P.T) + " Hz"], ["$v=\\lambda/T$", P.choice === "staz" ? "ferma (le componenti: " + fm(P.lam / P.T) + " m/s)" : fm(P.lam / P.T) + " m/s"]];
  },
  nodes(P) { return Math.floor(8 / (P.lam / 2) + 1e-9) + 1; },
  missions: [
    { t: "Fai viaggiare un'onda a $v=2$ m/s (±0,05) cambiando $\\lambda$ e $T$.", ok: P => (P.choice === "prog" || P.choice === "reg") && Math.abs(P.lam / P.T - 2) < 0.05 },
    { t: "Manda l'onda verso sinistra.", ok: P => P.choice === "reg" },
    { t: "Onda stazionaria con esattamente 5 nodi nei primi 8 m (fase 0).", ok: P => P.choice === "staz" && Math.round(P.phi) % 180 === 0 && LABS[5].nodes(P) === 5 },
    { t: "Corda fissa: trova il modo con 2 nodi interni.", ok: P => P.choice === "fissa" && P.n === 3 }],
  notes: ["A $t$ fisso vedi una sinusoide di periodo $\\lambda$; a $x$ fisso un'oscillazione di periodo $T$.",
    "Cambiando $\\lambda$ con $T$ fisso, cambia la velocità $v=\\lambda/T$. Su una corda vera però $v=\\sqrt{T_0/\\rho_L}$ è fissata dal mezzo: cambiando la frequenza cambia $\\lambda$.",
    "Nell'onda stazionaria i nodi distano $\\lambda/2$ e la forma non viaggia.",
    "Con la corda fissa solo certi modi sono possibili: $\\lambda_n=2L/n$."],
  psi(P, x, t) {
    if (P.choice === "fissa") { const kn = P.n * Math.PI / 8; return 2 * P.A * Math.sin(kn * x) * Math.cos(kn * 2 * t); }
    const k = TAU / P.lam, om = TAU / P.T, ph = P.phi * Math.PI / 180;
    if (P.choice === "prog") return P.A * Math.sin(k * x - om * t + ph);
    if (P.choice === "reg") return P.A * Math.sin(k * x + om * t + ph);
    return 2 * P.A * Math.sin(k * x + ph) * Math.cos(om * t);
  },
  draw(ctx, w, h, P, t) {
    const staz = P.choice === "staz" || P.choice === "fissa", ym = staz ? 2.2 : 1.25;
    const Tb = box({ x: 22, y: 26, w: w - 34, h: h * 0.56 - 26, x0: 0, x1: 8, y0: -ym, y1: ym });
    txt(ctx, "fotografia a t fisso: periodo λ nello spazio", Tb.x, 14, { size: 11 });
    poly(ctx, [[Tb.x, Tb.Y(0)], [Tb.x + Tb.w, Tb.Y(0)]], COL.line, 1.2, [4, 4]);
    if (P.choice === "staz") {
      const k = TAU / P.lam, om = TAU / P.T, ph = P.phi * Math.PI / 180;
      poly(ctx, fnPts(x => P.A * Math.sin(k * x - om * t + ph), Tb), COL.ink2, 1.1, [5, 4]);
      poly(ctx, fnPts(x => P.A * Math.sin(k * x + om * t + ph), Tb), COL.ink2, 1.1, [2, 4]);
    }
    if (P.choice === "fissa") { for (let m = 0; m <= P.n; m++) dot(ctx, Tb.X(8 * m / P.n), Tb.Y(0), 4, COL.bad); ctx.fillStyle = COL.ink; ctx.fillRect(Tb.x - 4, Tb.Y(0) - 14, 4, 28); ctx.fillRect(Tb.x + Tb.w, Tb.Y(0) - 14, 4, 28); }
    const pts = fnPts(x => this.psi(P, x, t), Tb, 400);
    poly(ctx, pts, COL.hl4, 9); poly(ctx, pts, COL.ink, 2.2);
    if (P.choice === "staz") {
      const k = TAU / P.lam, ph = P.phi * Math.PI / 180;
      for (let m = -20; m < 40; m++) { const x = (m * Math.PI - ph) / k; if (x >= -1e-6 && x <= 8 + 1e-6) { dot(ctx, Tb.X(x), Tb.Y(0), 5, COL.bad); txt(ctx, "nodo", Tb.X(x), Tb.Y(0) + 17, { size: 10, align: "center", color: COL.bad }); } }
    }
    if (!staz) {
      const k = TAU / P.lam, om = TAU / P.T, ph = P.phi * Math.PI / 180, dir = P.choice === "prog" ? 1 : -1;
      const crests = [];
      for (let m = -40; m < 40; m++) { const x = (Math.PI / 2 - ph + dir * om * t + TAU * m) / k; if (x > 0.15 && x < 7.85) crests.push(x); }
      if (crests.length) {
        const xc = crests[0], yc = Tb.Y(P.A) - 8;
        arrowHead(ctx, Tb.X(xc), yc, Math.PI / 2, 8, COL.pen);
        poly(ctx, [[Tb.X(xc) + 6, yc - 8], [Tb.X(xc) + 26 * dir + 6, yc - 8]], COL.pen, 2); arrowHead(ctx, Tb.X(xc) + 26 * dir + 6, yc - 8, dir > 0 ? 0 : Math.PI, 7, COL.pen);
        txt(ctx, "v", Tb.X(xc) + 13 * dir + 6, yc - 13, { size: 12, weight: 700, color: COL.pen, align: "center" });
        if (crests.length > 1) {
          const yb = Tb.Y(-ym * 0.9);
          poly(ctx, [[Tb.X(crests[0]), yb - 5], [Tb.X(crests[0]), yb], [Tb.X(crests[1]), yb], [Tb.X(crests[1]), yb - 5]], COL.ink2, 1.2);
          txt(ctx, "λ", (Tb.X(crests[0]) + Tb.X(crests[1])) / 2, yb + 13, { size: 13, weight: 700, color: COL.ink, align: "center" });
        }
      }
    }
    const xr = 2; poly(ctx, [[Tb.X(xr), Tb.y], [Tb.X(xr), Tb.y + Tb.h]], COL.bad, 1, [3, 4]);
    dot(ctx, Tb.X(xr), Tb.Y(this.psi(P, xr, t)), 6, COL.bad);
    const Bb = box({ x: 22, y: h * 0.56 + 28, w: w - 34, h: h * 0.44 - 50, x0: t - 8, x1: t, y0: -ym, y1: ym });
    txt(ctx, "il punto rosso (x = 2 m) negli ultimi 8 s: periodo T nel tempo", Bb.x, h * 0.56 + 16, { size: 11 });
    frame(ctx, Bb, {});
    clip(ctx, Bb, () => poly(ctx, fnPts(s => this.psi(P, xr, s), Bb, 300), COL.bad, 2));
    dot(ctx, Bb.X(t), Bb.Y(this.psi(P, xr, t)), 4.5, COL.bad);
  }
},

6: {
  title: "Riflessione e trasmissione", h: 260,
  intro: ["Un impulso viaggia su una corda di densità $\\rho_1$ e arriva su una corda di densità $\\rho_2$. Una parte torna indietro, una parte passa. Contano solo le densità: $r=\\frac{\\sqrt{\\rho_1}-\\sqrt{\\rho_2}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}$ e $t=1+r$.",
    "La corda a destra è disegnata più spessa se è più densa. Lì l'onda va più piano ($v\\propto1/\\sqrt\\rho$) e l'impulso si accorcia."],
  params: [{ id: "s", label: "Rapporto $\\rho_2/\\rho_1$", min: -2, max: 2, step: 0.01, v: 0.5, u: "", d: -1, fmt: v => fm(10 ** v, 10 ** v < 1 ? 2 : 1) }],
  coef(P) { const q = 10 ** P.s, sq = Math.sqrt(q); const r = (1 - sq) / (1 + sq); return { q, r, t: 1 + r, R: r * r, T: 1 - r * r, v2: 2 / sq }; },
  readouts(P) { const c = this.coef(P); return [["$r$ (ampiezza)", fm(c.r, 3)], ["$t=1+r$", fm(c.t, 3)], ["$R=r^2$ (energia)", fm(c.R, 3)], ["$T=1-R$", fm(c.T, 3)]]; },
  missions: [
    { t: "Elimina l'onda riflessa.", ok: P => Math.abs(LABS[6].coef(P).r) < 0.02 },
    { t: "Fai tornare indietro l'impulso capovolto, con $r<-0{,}5$.", ok: P => LABS[6].coef(P).r < -0.5 },
    { t: "Ottieni un impulso trasmesso più alto di quello incidente ($t>1{,}5$).", ok: P => LABS[6].coef(P).t > 1.5 }],
  notes: ["Seconda corda più densa: l'impulso riflesso è capovolto. Al limite, con un muro, $r=-1$.",
    "Seconda corda più leggera: riflesso dritto, trasmesso più alto. Al limite, estremo libero, $t=2$.",
    "Anche con $t=2$ l'energia torna: $R+T=1$ sempre, perché la potenza dipende anche da $k$."],
  draw(ctx, w, h, P, t) {
    const c = this.coef(P), v1 = 2, xc = -5 + v1 * (t % 6.5);
    const g = s => Math.exp(-s * s / 0.18);
    const B = box({ x: 12, y: 24, w: w - 24, h: h - 48, x0: -6, x1: 6, y0: -2.3, y1: 2.3 });
    poly(ctx, [[B.X(0), B.y], [B.X(0), B.y + B.h]], COL.ink2, 1, [4, 4]);
    txt(ctx, "ρ₁", B.X(-5.5), B.y + 2, { size: 13, weight: 700, color: COL.ink }); txt(ctx, "ρ₂", B.X(5.5), B.y + 2, { size: 13, weight: 700, color: COL.ink, align: "right" });
    const left = fnPts(x => g(x - xc) + c.r * g(-x - xc), box(Object.assign({}, B, { x: B.x, w: B.w / 2, x0: -6, x1: 0 })), 300);
    const right = fnPts(x => c.t * g(x * v1 / c.v2 - xc), box(Object.assign({}, B, { x: B.X(0), w: B.w / 2, x0: 0, x1: 6 })), 300);
    const lw2 = Math.max(0.8, Math.min(8, 2.2 * Math.pow(c.q, 0.3)));
    poly(ctx, left, COL.hl4, 8); poly(ctx, left, COL.ink, 2.2);
    poly(ctx, right, COL.hl5, lw2 + 6); poly(ctx, right, COL.ink, lw2);
    txt(ctx, "r = " + fm(c.r, 2) + "   t = " + fm(c.t, 2), w - 12, h - 8, { align: "right", size: 12, mono: true, color: COL.ink });
  }
},

7: {
  title: "Onde sonore e canne", h: 330,
  intro: ["Nel suono le particelle d'aria oscillano avanti e indietro lungo la direzione di propagazione: l'onda è longitudinale. Dove si addensano la pressione sale, dove si diradano scende.",
    "Nelle canne si formano onde stazionarie. Un estremo aperto è un ventre di spostamento (le particelle si muovono liberamente); un estremo chiuso è un nodo. Qui la canna è lunga $L=1$ m e $v=343$ m/s."],
  choice: { id: "pipe", opts: [["tubo", "Onda che viaggia"], ["AA", "Aperta–aperta"], ["AC", "Aperta–chiusa"], ["CC", "Chiusa–chiusa"]], v: "tubo" },
  params: [{ id: "n", label: "Modo $n$", min: 1, max: 5, step: 1, v: 1, u: "", d: 0, show: c => c !== "tubo" }],
  env(P, u) { if (P.choice === "AA") return Math.cos(P.n * Math.PI * u); if (P.choice === "CC") return Math.sin(P.n * Math.PI * u); return Math.cos((2 * P.n - 1) * Math.PI * u / 2); },
  denv(P, u) { if (P.choice === "AA") return -Math.sin(P.n * Math.PI * u); if (P.choice === "CC") return Math.cos(P.n * Math.PI * u); return -Math.sin((2 * P.n - 1) * Math.PI * u / 2); },
  freq(P) { return P.choice === "AC" ? (2 * P.n - 1) * 343 / 4 : P.n * 343 / 2; },
  nodes(P) { return this.nodePos(P).length; },
  nodePos(P) {
    const n = P.n, out = [];
    if (P.choice === "AA") for (let j = 1; j <= n; j++) out.push((2 * j - 1) / (2 * n));
    else if (P.choice === "CC") for (let j = 0; j <= n; j++) out.push(j / n);
    else for (let j = 1; j <= n; j++) out.push((2 * j - 1) / (2 * n - 1));
    return out;
  },
  readouts(P) {
    if (P.choice === "tubo") return [["Spostamento e pressione", "sfasati di 90°"], ["Particelle", "oscillano lungo x"]];
    const f = this.freq(P);
    return [["Frequenza", fm(f, 2) + " Hz"], ["$\\lambda=v/f$", fm(343 / f, 3) + " m"], ["Nodi di spostamento", String(this.nodes(P))]];
  },
  missions: [
    { t: "Trova la nota più grave possibile con una canna di 1 m.", ok: P => P.choice === "AC" && P.n === 1 },
    { t: "Trova un modo a 514,5 Hz con esattamente 3 nodi di spostamento.", ok: P => P.choice === "AA" && P.n === 3 },
    { t: "Nella canna aperta–chiusa ottieni 257 Hz: quale armonica è?", ok: P => P.choice === "AC" && P.n === 2 }],
  notes: ["Aperta–chiusa: tra ventre e nodo c'è $\\lambda/4$, quindi $\\lambda_1=4L$ e mancano le armoniche pari.",
    "Dove lo spostamento ha un nodo, la pressione ha un ventre (curva tratteggiata): le particelle lì vengono schiacciate dai due lati.",
    "Aperta–aperta e chiusa–chiusa hanno le stesse frequenze, ma nodi e ventri scambiati."],
  draw(ctx, w, h, P, t) {
    const x0 = 22, x1 = w - 22, y0 = 18, y1 = 118, om = TAU * 0.6;
    ctx.strokeStyle = COL.ink2; ctx.lineWidth = 1.5;
    poly(ctx, [[x0, y0], [x1, y0]], COL.ink2, 1.5); poly(ctx, [[x0, y1], [x1, y1]], COL.ink2, 1.5);
    const closedL = P.choice === "CC", closedR = P.choice === "CC" || P.choice === "AC";
    if (closedL) { ctx.fillStyle = COL.ink; ctx.fillRect(x0 - 5, y0, 5, y1 - y0); }
    if (closedR) { ctx.fillStyle = COL.ink; ctx.fillRect(x1, y0, 5, y1 - y0); }
    const cols = 34, rows = 6, A = (x1 - x0) / cols * 0.85;
    for (let i = 0; i <= cols; i++) {
      const u = i / cols;
      const d = P.choice === "tubo" ? Math.cos(TAU * 2 * u - om * t) : this.env(P, u) * Math.cos(om * t);
      for (let j = 0; j < rows; j++) dot(ctx, x0 + u * (x1 - x0) + A * d, y0 + 10 + j * (y1 - y0 - 20) / (rows - 1), 2.6, COL.ink);
    }
    const B = box({ x: x0, y: y1 + 30, w: x1 - x0, h: h - y1 - 56, x0: 0, x1: 1, y0: -1.2, y1: 1.2 });
    frame(ctx, B, {});
    if (P.choice === "tubo") {
      poly(ctx, fnPts(u => Math.cos(TAU * 2 * u - om * t), B), COL.pen, 2.2);
      poly(ctx, fnPts(u => Math.sin(TAU * 2 * u - om * t), B), COL.bad, 1.8, [6, 5]);
      txt(ctx, "— spostamento", B.x + 4, B.y - 6, { size: 11, color: COL.pen }); txt(ctx, "- - pressione", B.x + 110, B.y - 6, { size: 11, color: COL.bad });
    } else {
      poly(ctx, fnPts(u => Math.abs(this.env(P, u)), B), COL.pen, 1.2, [2, 3]); poly(ctx, fnPts(u => -Math.abs(this.env(P, u)), B), COL.pen, 1.2, [2, 3]);
      poly(ctx, fnPts(u => Math.abs(this.denv(P, u)), B), COL.bad, 1.4, [6, 5]); poly(ctx, fnPts(u => -Math.abs(this.denv(P, u)), B), COL.bad, 1.4, [6, 5]);
      poly(ctx, fnPts(u => this.env(P, u) * Math.cos(om * t), B), COL.pen, 2.4);
      for (const u of this.nodePos(P)) { dot(ctx, B.X(u), B.Y(0), 3.5, COL.ink); txt(ctx, "N", B.X(u), B.Y(0) - 8, { size: 11, weight: 700, color: COL.ink, align: "center" }); }
      txt(ctx, "— spostamento", B.x + 4, B.y - 6, { size: 11, color: COL.pen }); txt(ctx, "- - pressione (inviluppo)", B.x + 110, B.y - 6, { size: 11, color: COL.bad });
    }
  }
},

8: {
  title: "Onde in 3D: piane e sferiche", h: 260,
  intro: ["Una sorgente puntiforme emette onde sferiche: i fronti d'onda sono sfere che si allargano. La stessa potenza si spalma su un'area $4\\pi r^2$, quindi l'intensità cala come $1/r^2$ e l'ampiezza come $1/r$.",
    "Un'onda piana invece ha fronti piatti e ampiezza costante. Lontano dalla sorgente, un pezzo di onda sferica sembra piano."],
  choice: { id: "kind", opts: [["sfera", "Onda sferica"], ["piana", "Onda piana"]], v: "sfera" },
  params: [{ id: "r", label: "Distanza del rivelatore $r$", min: 1, max: 10, step: 0.05, v: 1, u: "m", d: 2 }],
  readouts(P) {
    if (P.choice === "piana") return [["$I/I_0$", "1 (costante)"], ["$A/A_0$", "1"], ["Livello", "0 dB"]];
    return [["$I(r)/I(1\\,\\mathrm{m})$", fm(1 / P.r ** 2, 3)], ["$A(r)/A(1\\,\\mathrm{m})$", fm(1 / P.r, 3)], ["Livello", fm(-20 * Math.log10(P.r), 1) + " dB"]];
  },
  missions: [
    { t: "Sposta il rivelatore dove l'intensità è $1/4$ di quella a 1 m.", ok: P => P.choice === "sfera" && Math.abs(P.r - 2) < 0.05 },
    { t: "Trova la distanza dove il livello sonoro è sceso di 20 dB.", ok: P => P.choice === "sfera" && Math.abs(P.r - 10) < 0.1 },
    { t: "Passa all'onda piana: l'intensità non cala più.", ok: P => P.choice === "piana" }],
  notes: ["Raddoppiare la distanza dimezza l'ampiezza e divide l'intensità per 4 (−6 dB).",
    "È un'attenuazione geometrica: l'energia non si perde, si distribuisce su una superficie più grande.",
    "Il vettore d'onda è perpendicolare ai fronti: nell'onda sferica punta radialmente."],
  draw(ctx, w, h, P, t) {
    const sx = 26, cy = h / 2, sc = (w - 80) / 10, lam = 28, speed = 40;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    if (P.choice === "sfera") {
      for (let m = 0; m < 30; m++) {
        const R = ((speed * t) % lam) + m * lam; if (R < 3) continue;
        ctx.beginPath(); ctx.arc(sx, cy, R, -Math.PI / 2, Math.PI / 2);
        ctx.strokeStyle = rgba(COL.penRGB, Math.min(1, 26 / R)); ctx.lineWidth = 2.2; ctx.stroke();
      }
      dot(ctx, sx, cy, 6, COL.ink);
    } else {
      for (let m = -1; m < 30; m++) {
        const X = sx + ((speed * t) % lam) + m * lam; if (X > w) break;
        poly(ctx, [[X, 8], [X, h - 8]], rgba(COL.penRGB, 0.75), 2.2);
      }
      poly(ctx, [[sx - 4, 8], [sx - 4, h - 8]], COL.ink, 4);
    }
    ctx.restore();
    const dx = sx + P.r * sc;
    ctx.fillStyle = COL.bad; ctx.fillRect(dx - 6, cy - 6, 12, 12);
    const I = P.choice === "sfera" ? 1 / P.r ** 2 : 1, bh = Math.max(2, 70 * I);
    ctx.fillStyle = COL.good; ctx.fillRect(dx + 12, cy - bh, 10, bh); ctx.strokeStyle = COL.line; ctx.strokeRect(dx + 12, cy - 70, 10, 70);
    txt(ctx, "I", dx + 17, cy + 14, { size: 11, align: "center", mono: true });
    for (let m = 1; m <= 10; m++) { const X = sx + m * sc; poly(ctx, [[X, h - 12], [X, h - 6]], COL.ink2, 1); if (m % 2 === 0 || m === 1) txt(ctx, m + " m", X, h - 14, { size: 10, align: "center", mono: true }); }
  }
},

9: {
  title: "Effetto Doppler e cono di Mach", h: 260,
  intro: ["La sorgente emette un fronte d'onda ogni periodo e intanto si sposta. Davanti a lei i fronti si ammassano ($\\lambda$ più corta, frequenza più alta), dietro si allargano.",
    "Oltre la velocità del suono ($v_S>c$) i fronti restano tutti indietro e si inviluppano in un cono: il cono di Mach, con $\\sin\\theta=c/v_S$."],
  params: [{ id: "b", label: "Velocità della sorgente $v_S/c$", min: 0, max: 2, step: 0.01, v: 0.3, u: "", d: 2 }],
  readouts(P) {
    const b = P.b;
    return [["$f'/f$ davanti", b < 1 ? fm(1 / (1 - b), 2) : "onda d'urto"], ["$f'/f$ dietro", fm(1 / (1 + b), 2)], ["Semiapertura del cono", b > 1 ? fm(deg(Math.asin(1 / b)), 1) + "°" : "nessun cono"]];
  },
  missions: [
    { t: "Fai sentire, davanti alla sorgente, una frequenza doppia.", ok: P => P.b < 1 && Math.abs(1 / (1 - P.b) - 2) < 0.03 },
    { t: "Supera il muro del suono.", ok: P => P.b > 1 },
    { t: "Ottieni un cono di Mach con semiapertura di 30°.", ok: P => P.b > 1 && Math.abs(deg(Math.asin(1 / P.b)) - 30) < 1 }],
  notes: ["Davanti $f'=f\\,\\frac{c}{c-v_S}$, dietro $f'=f\\,\\frac{c}{c+v_S}$: gli spostamenti non sono simmetrici.",
    "A $v_S=c$ tutti i fronti davanti coincidono: muro del suono.",
    "Più la sorgente è veloce, più il cono di Mach si stringe."],
  reset(L) { L.state = { t0: L.t, fronts: [], last: -1e9, b: L.p.b }; },
  draw(ctx, w, h, P, t, L) {
    let S = L.state;
    if (!S || S.b !== P.b) { this.reset(L); S = L.state; }
    const u = w / 10, cy = h / 2;
    let xs = 0.8 + P.b * (t - S.t0);
    if (xs > 10.8 || (t - S.t0) > 30) { this.reset(L); S = L.state; xs = 0.8; }
    if (t - S.last >= 0.5) { S.fronts.push({ x: xs, te: t }); S.last = t; }
    S.fronts = S.fronts.filter(f => t - f.te < 14);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    for (const f of S.fronts) {
      const R = (t - f.te) * u; if (R < 1) continue;
      ctx.beginPath(); ctx.arc(f.x * u, cy, R, 0, TAU); ctx.strokeStyle = rgba(COL.penRGB, 0.8); ctx.lineWidth = 1.8; ctx.stroke();
    }
    if (P.b > 1) {
      const th = Math.asin(1 / P.b), Lc = 14 * u;
      poly(ctx, [[xs * u, cy], [xs * u - Lc * Math.cos(th), cy - Lc * Math.sin(th)]], COL.bad, 2.4);
      poly(ctx, [[xs * u, cy], [xs * u - Lc * Math.cos(th), cy + Lc * Math.sin(th)]], COL.bad, 2.4);
    }
    ctx.restore();
    dot(ctx, xs * u, cy, 6, COL.ink);
    txt(ctx, "← dietro", 8, 16, { size: 12, weight: 700 }); txt(ctx, "davanti →", w - 8, 16, { size: 12, weight: 700, align: "right" });
  }
},

10: {
  title: "Interferenza: Young", h: 300,
  intro: ["Due fenditure illuminate dalla stessa sorgente diventano due sorgenti coerenti. Le loro onde si sommano: dove arrivano in fase si rinforzano, dove arrivano in controfase si annullano.",
    "La differenza di cammino è $d\\sin\\theta$. I massimi cadono dove $d\\sin\\theta=n\\lambda$; a destra vedi l'intensità sullo schermo, $I=I_0\\cos^2(\\pi d\\sin\\theta/\\lambda)$."],
  params: [
    { id: "d", label: "Distanza tra le fenditure $d$", min: 0.3, max: 6, step: 0.05, v: 4, u: "", d: 2 },
    { id: "lam", label: "Lunghezza d'onda $\\lambda$", min: 0.6, max: 2, step: 0.02, v: 1, u: "", d: 2 }],
  readouts(P) {
    const nmax = Math.floor(P.d / P.lam + 1e-9);
    return [["$\\Delta\\theta\\approx\\lambda/d$", fm(P.lam / P.d, 3) + " rad"], ["Massimi visibili", String(2 * nmax + 1)], ["Primo minimo $\\sin\\theta=\\lambda/2d$", P.lam / (2 * P.d) <= 1 ? fm(deg(Math.asin(P.lam / (2 * P.d))), 1) + "°" : "nessuno"]];
  },
  missions: [
    { t: "Allarga le frange almeno del doppio rispetto alla partenza ($\\lambda/d\\geq0{,}5$).", ok: P => P.lam / P.d >= 0.5 - 1e-9 },
    { t: "Fai sparire tutti i minimi.", ok: P => P.d < P.lam / 2 },
    { t: "Ottieni esattamente 7 massimi.", ok: P => 2 * Math.floor(P.d / P.lam + 1e-9) + 1 === 7 }],
  notes: ["Avvicinando le fenditure le frange si allargano: $\\Delta x=r\\lambda/d$.",
    "Con $\\lambda$ più grande (luce rossa) le frange sono più distanziate.",
    "Se $d<\\lambda/2$ la differenza di cammino non arriva mai a $\\lambda/2$: nessun minimo."],
  draw(ctx, w, h, P, t) {
    const fw = Math.floor(w * 0.63), cell = 4, u = 13, cy = h / 2, sxp = 6;
    const k = TAU / (P.lam * u), om = TAU * 0.8, y1 = cy - P.d * u / 2, y2 = cy + P.d * u / 2;
    for (let X = 0; X < fw; X += cell) for (let Y = 0; Y < h; Y += cell) {
      const r1 = Math.hypot(X - sxp, Y - y1), r2 = Math.hypot(X - sxp, Y - y2);
      const v = Math.cos(k * r1 - om * t) + Math.cos(k * r2 - om * t);
      ctx.fillStyle = rgba(COL.penRGB, (v + 2) / 4 * 0.9); ctx.fillRect(X, Y, cell, cell);
    }
    ctx.fillStyle = COL.ink; ctx.fillRect(0, 0, 4, h);
    dot(ctx, sxp, y1, 4, COL.bad); dot(ctx, sxp, y2, 4, COL.bad);
    const scx = fw + 8, maxL = w - scx - 8;
    poly(ctx, [[scx, 0], [scx, h]], COL.ink, 2);
    const pts = [[scx, 0]];
    for (let Y = 0; Y <= h; Y += 1) { const th = Math.atan((Y - cy) / fw); const I = Math.cos(Math.PI * P.d * Math.sin(th) / P.lam) ** 2; pts.push([scx + I * maxL, Y]); }
    pts.push([scx, h]);
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = COL.hl1; ctx.fill();
    poly(ctx, pts.slice(1, -1), COL.ink, 1.6);
    txt(ctx, "schermo", w - 6, h - 6, { size: 11, align: "right" });
  }
},

11: {
  title: "Diffrazione e reticoli", h: 300,
  intro: ["Un'onda che passa per una fenditura di larghezza $a$ si allarga. Ogni punto della fenditura è una sorgente secondaria e la loro interferenza dà $I=I_0\\,\\mathrm{sinc}^2(\\pi a\\sin\\theta/\\lambda)$, con minimi a $a\\sin\\theta=n\\lambda$.",
    "Con $N$ fenditure a passo $d$ (reticolo) l'interferenza crea picchi stretti a $d\\sin\\theta=n\\lambda$, modulati dall'inviluppo della singola fenditura (tratteggiato). Qui $d=3a$."],
  choice: { id: "kind", opts: [["single", "Fenditura singola"], ["grat", "Reticolo"]], v: "single" },
  params: [
    { id: "a", label: "Larghezza della fenditura $a/\\lambda$", min: 0.5, max: 10, step: 0.05, v: 4, u: "", d: 2 },
    { id: "N", label: "Numero di fenditure $N$", min: 2, max: 20, step: 1, v: 4, u: "", d: 0, show: c => c === "grat" }],
  I(P, s) {
    const x = Math.PI * P.a * s, sinc = Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x, env = sinc * sinc;
    if (P.choice === "single") return env;
    const y = Math.PI * 3 * P.a * s, sy = Math.sin(y);
    const arr = Math.abs(sy) < 1e-7 ? 1 : (Math.sin(P.N * y) / (P.N * sy)) ** 2;
    return env * arr;
  },
  readouts(P) {
    const out = [["Primo minimo di diffrazione", P.a >= 1 ? fm(deg(Math.asin(1 / P.a)), 1) + "°" : "nessuno ($a<\\lambda$)"]];
    if (P.choice === "grat") { out.push(["Ordini con $|\\sin\\theta|\\le1$", "fino a n = " + Math.floor(3 * P.a + 1e-9)]); out.push(["Ordini che mancano", "multipli di 3"]); out.push(["Semilarghezza al centro $\\lambda/Nd$", fm(deg(Math.asin(Math.min(1, 1 / (P.N * 3 * P.a)))), 2) + "°"]); }
    return out;
  },
  missions: [
    { t: "Fenditura singola: fai sparire tutti i minimi.", ok: P => P.choice === "single" && P.a < 1 },
    { t: "Fenditura singola: picco centrale largo 60° in tutto (primo minimo a 30°).", ok: P => P.choice === "single" && Math.abs(P.a - 2) < 0.05 },
    { t: "Reticolo: rendi i picchi strettissimi con almeno 15 fenditure.", ok: P => P.choice === "grat" && P.N >= 15 }],
  notes: ["Fenditura più stretta, picco più largo: $\\sin\\theta_1=\\lambda/a$.",
    "Nel reticolo i picchi non si spostano cambiando $N$: diventano più stretti e più intensi.",
    "Con $d=3a$ gli ordini 3, 6, … mancano: cadono sugli zeri dell'inviluppo."],
  draw(ctx, w, h, P) {
    const B = box({ x: 16, y: 16, w: w - 32, h: h - 84, x0: -1, x1: 1, y0: 0, y1: 1.08 });
    frame(ctx, B, { ticks: [[-1, "−90°"], [-0.5, "−30°"], [0, "0"], [0.5, "30°"], [1, "90°"]] });
    const n = Math.max(600, Math.floor(B.w * 3));
    if (P.choice === "grat") clip(ctx, B, () => { poly(ctx, fnPts(s => { const x = Math.PI * P.a * s; const c = Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x; return c * c; }, B, 600), COL.ink2, 1.2, [5, 4]); });
    clip(ctx, B, () => poly(ctx, fnPts(s => this.I(P, s), B, n), COL.pen, 1.8));
    const sy = h - 42;
    for (let X = 0; X < B.w; X++) { const s = -1 + 2 * X / B.w; ctx.fillStyle = rgba(COL.penRGB, Math.sqrt(this.I(P, s))); ctx.fillRect(B.x + X, sy, 1, 26); }
    ctx.strokeStyle = COL.line; ctx.strokeRect(B.x, sy, B.w, 26);
    txt(ctx, "come appare sullo schermo", B.x, sy - 4, { size: 10 });
  }
},

12: {
  title: "Rifrazione e lenti", h: 300,
  intro: ["Passando da un mezzo all'altro la luce cambia velocità ($v=c/n$) e direzione: $n_1\\sin\\theta_i=n_2\\sin\\theta_t$. Dal mezzo più denso, oltre l'angolo critico $\\sin\\theta_c=n_2/n_1$, non esce più niente: riflessione totale.",
    "Una lente sottile convergente forma l'immagine secondo $\\frac1p+\\frac1q=\\frac1f$. Segui i tre raggi principali: parallelo, per il centro, per il fuoco."],
  choice: { id: "kind", opts: [["snell", "Rifrazione"], ["lente", "Lente convergente"]], v: "snell" },
  params: [
    { id: "thi", label: "Angolo di incidenza $\\theta_i$", min: 0, max: 89, step: 0.5, v: 40, u: "°", d: 1, show: c => c === "snell" },
    { id: "n1", label: "Indice sopra $n_1$", min: 1, max: 2.4, step: 0.01, v: 1, u: "", d: 2, show: c => c === "snell" },
    { id: "n2", label: "Indice sotto $n_2$", min: 1, max: 2.4, step: 0.01, v: 1.33, u: "", d: 2, show: c => c === "snell" },
    { id: "p", label: "Distanza dell'oggetto $p$ (in unità di $f$)", min: 0.3, max: 5, step: 0.01, v: 3, u: "f", d: 2, show: c => c === "lente" }],
  lens(P) {
    const q = Math.abs(P.p - 1) < 0.015 ? Infinity : P.p / (P.p - 1), M = -q / P.p;
    return { q, M };
  },
  readouts(P) {
    if (P.choice === "snell") {
      const s = P.n1 / P.n2 * Math.sin(P.thi * Math.PI / 180), tir = s > 1;
      return [["$\\theta_t$", tir ? "nessuno" : fm(deg(Math.asin(s)), 1) + "°"], ["Angolo critico $\\theta_c$", P.n1 > P.n2 ? fm(deg(Math.asin(P.n2 / P.n1)), 1) + "°" : "non esiste ($n_1\\le n_2$)"], ["Risultato", tir ? "riflessione totale" : (P.n2 > P.n1 ? "si avvicina alla normale" : P.n2 < P.n1 ? "si allontana dalla normale" : "non devia")]];
    }
    const { q, M } = this.lens(P);
    if (!isFinite(q)) return [["$q$", "∞"], ["Immagine", "all'infinito (oggetto nel fuoco)"]];
    const kind = (q > 0 ? "reale" : "virtuale") + ", " + (M < 0 ? "capovolta" : "dritta") + ", " + (Math.abs(M) > 1.005 ? "ingrandita" : Math.abs(M) < 0.995 ? "rimpicciolita" : "stessa grandezza");
    return [["$q$ (in unità di $f$)", fm(q, 2)], ["Ingrandimento $M=-q/p$", fm(M, 2)], ["Immagine", kind]];
  },
  missions: [
    { t: "Ottieni la riflessione totale.", ok: P => P.choice === "snell" && P.n1 / P.n2 * Math.sin(P.thi * Math.PI / 180) > 1 },
    { t: "Lente: immagine reale grande quanto l'oggetto ($M=-1$).", ok: P => P.choice === "lente" && Math.abs(P.p - 2) < 0.03 },
    { t: "Lente: trasformala in una lente d'ingrandimento (immagine virtuale e dritta).", ok: P => P.choice === "lente" && P.p < 0.985 }],
  notes: ["Dall'aria all'acqua il raggio si avvicina alla normale; dall'acqua all'aria si allontana.",
    "La riflessione totale serve $n_1>n_2$: prova a mettere $n_1=1{,}5$ e $n_2=1$.",
    "Oggetto oltre $2f$: immagine reale, capovolta, rimpicciolita. Tra $f$ e $2f$: ingrandita. Dentro $f$: virtuale."],
  draw(ctx, w, h, P) {
    if (P.choice === "snell") {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.46, th = P.thi * Math.PI / 180;
      ctx.fillStyle = rgba(toRGB(COL.hl4), 0.35 * (P.n1 - 1) / 1.4 + 0.05); ctx.fillRect(0, 0, w, cy);
      ctx.fillStyle = rgba(toRGB(COL.hl4), 0.75 * (P.n2 - 1) / 1.4 + 0.08); ctx.fillRect(0, cy, w, h - cy);
      poly(ctx, [[0, cy], [w, cy]], COL.ink, 1.5); poly(ctx, [[cx, 6], [cx, h - 6]], COL.ink2, 1, [4, 4]);
      const s = P.n1 / P.n2 * Math.sin(th), tir = s > 1;
      poly(ctx, [[cx - R * Math.sin(th), cy - R * Math.cos(th)], [cx, cy]], COL.ink, 3);
      arrowHead(ctx, cx - R * Math.sin(th) * 0.5, cy - R * Math.cos(th) * 0.5, Math.atan2(Math.cos(th), Math.sin(th)), 9, COL.ink);
      poly(ctx, [[cx, cy], [cx + R * Math.sin(th), cy - R * Math.cos(th)]], tir ? COL.ink : COL.ink2, tir ? 3 : 1.2, tir ? [] : [5, 4]);
      if (!tir) { const tt = Math.asin(s); poly(ctx, [[cx, cy], [cx + R * Math.sin(tt), cy + R * Math.cos(tt)]], COL.pen, 3); txt(ctx, "θt = " + fm(deg(tt), 1) + "°", cx + 8, cy + 30, { size: 12, mono: true, color: COL.pen }); }
      else txt(ctx, "riflessione totale", cx + 8, cy + 30, { size: 13, weight: 700, color: COL.bad });
      txt(ctx, "θi = " + fm(P.thi, 1) + "°", cx - 8, cy - 30, { size: 12, mono: true, align: "right", color: COL.ink });
      txt(ctx, "n₁ = " + fm(P.n1), 8, 18, { size: 12, mono: true, color: COL.ink }); txt(ctx, "n₂ = " + fm(P.n2), 8, h - 10, { size: 12, mono: true, color: COL.ink });
      return;
    }
    const cy = h / 2, cx = w * 0.5, u = w / 9.5, hO = Math.min(55, h * 0.2), xo = cx - P.p * u, yo = cy - hO;
    const { q, M } = this.lens(P);
    poly(ctx, [[0, cy], [w, cy]], COL.ink2, 1);
    for (const f of [-1, 1, -2, 2]) { const X = cx + f * u; dot(ctx, X, cy, Math.abs(f) === 1 ? 3.5 : 2.5, COL.ink); txt(ctx, (f < 0 ? "−" : "") + (Math.abs(f) === 1 ? "f" : "2f"), X, cy + 16, { size: 11, align: "center", mono: true }); }
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, 7, h * 0.42, 0, 0, TAU); ctx.fillStyle = COL.hl4; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    const arrow = (x, y1, y2, c, dash) => { poly(ctx, [[x, y1], [x, y2]], c, 3, dash); arrowHead(ctx, x, y2, y2 < y1 ? -Math.PI / 2 : Math.PI / 2, 9, c); };
    arrow(xo, cy, yo, COL.good);
    const far = (x1, y1, x2, y2, X) => y1 + (y2 - y1) * (X - x1) / (x2 - x1);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    poly(ctx, [[xo, yo], [cx, yo]], COL.bad, 1.8);
    poly(ctx, [[cx, yo], [w, far(cx, yo, cx + u, cy, w)]], COL.bad, 1.8);
    poly(ctx, [[xo, yo], [w, far(xo, yo, cx, cy, w)]], COL.pen, 1.8);
    const y3 = cy + (yo - cy) * u / (xo - cx + u);
    if (isFinite(y3)) { poly(ctx, [[xo, yo], [cx, y3]], COL.good, 1.8); poly(ctx, [[cx, y3], [w, y3]], COL.good, 1.8); }
    if (isFinite(q) && q < 0) {
      poly(ctx, [[cx, yo], [0, far(cx, yo, cx + u, cy, 0)]], COL.bad, 1.2, [5, 4]);
      poly(ctx, [[xo, yo], [0, far(xo, yo, cx, cy, 0)]], COL.pen, 1.2, [5, 4]);
      if (isFinite(y3)) poly(ctx, [[cx, y3], [0, y3]], COL.good, 1.2, [5, 4]);
    }
    if (isFinite(q)) { const xi = cx + q * u, yi = cy - M * hO; if (xi > -50 && xi < w + 50) arrow(xi, cy, yi, COL.ink, q < 0 ? [5, 4] : []); }
    ctx.restore();
    txt(ctx, isFinite(q) ? (q > 0 ? "immagine reale" : "immagine virtuale") : "immagine all'infinito", w - 8, 16, { size: 12, weight: 700, align: "right", color: COL.ink });
  }
}
};



/* ---------- metadati dei laboratori: cosa sto vedendo, quale formula uso ---------- */
const LAB_META = {
  1: { c: 1, concept: "k.armonico", cards: ["1.2", "1.5", "1.9", "1.10"], see: "In alto la massa sulla molla, con le barre di energia cinetica e potenziale. In basso la legge oraria $x(t)$: il punto rosso è l'istante attuale." },
  2: { c: 2, concept: "k.regimi", cards: ["2.1", "2.2", "2.5", "2.10"], see: "La curva blu è $x(t)$ per una massa lasciata ferma in $x_0=1$; le linee tratteggiate sono l'inviluppo $\\pm e^{-\\gamma t}$. In alto a destra il regime attuale." },
  3: { c: 3, concept: "k.risonanza", cards: ["3.3", "3.4", "3.5", "3.6"], see: "In alto la curva di risonanza $B(\\omega_F)$ con il punto rosso sulla frequenza scelta. In basso forza (tratteggiata) e spostamento a regime: guarda lo sfasamento." },
  4: { c: 4, concept: "k.modi", cards: ["4.2", "4.3", "4.4", "4.5"], see: "Due pendoli uniti da una molla; sotto, le loro posizioni negli ultimi 20 s. Se parte un solo pendolo vedi l'energia passare dall'uno all'altro." },
  5: { c: 5, concept: "k.stazionarie", cards: ["5.1", "5.4", "5.6", "5.8"], see: "In alto una fotografia della corda a $t$ fisso; in basso la storia nel tempo del punto rosso in $x=2$ m." },
  6: { c: 6, concept: "k.rt", cards: ["6.2", "6.3", "6.4", "6.5"], see: "Un impulso arriva da sinistra sulla giunzione tra due corde ($x=0$, linea tratteggiata): guarda la parte riflessa e quella trasmessa." },
  7: { c: 7, cards: ["7.2", "7.5", "7.16", "7.17"], see: "In alto le particelle d'aria nel tubo: ogni colonna di puntini oscilla lungo $x$. Sotto, spostamento e pressione lungo la canna." },
  8: { c: 8, concept: "k.onde3d", cards: ["8.2", "8.4", "7.13"], see: "Fronti d'onda che partono dalla sorgente; il quadratino rosso è il rivelatore e la barra verde l'intensità che misura." },
  9: { c: 9, cards: ["9.1", "9.3", "9.5"], see: "I cerchi sono i fronti emessi a intervalli regolari dalla sorgente (punto nero), che si muove verso destra. Oltre $c$ compare il cono rosso." },
  10: { c: 10, concept: "k.young", cards: ["10.5", "10.6", "10.7", "10.8"], see: "A sinistra il campo delle due onde (chiaro = cresta, scuro = ventre); a destra l'intensità media sullo schermo." },
  11: { c: 11, cards: ["11.1", "11.2", "11.10", "11.11"], see: "La curva è l'intensità in funzione di $\\sin\\theta$; sotto, come appare la figura sullo schermo." },
  12: { c: 12, cards: ["12.3", "12.4", "12.11", "12.12"], see: "Rifrazione: raggio incidente, riflesso e rifratto all'interfaccia. Lente: l'oggetto (freccia verde), i tre raggi principali e l'immagine." }
};
for (const k of Object.keys(LAB_META)) if (LABS[k]) for (const [f, v] of Object.entries(LAB_META[k])) if (LABS[k][f] === undefined) LABS[k][f] = v;

/* ---------- mini-grafici (domande "grafico", schede concetto) ----------
   spec = { x:[x0,x1], y:[y0,y1], xl, yl, ticks:[[v,"etichetta"]], fns:[{ f, c, dash, lw, n }],
            vlines:[{ x, label, c }], points:[{ x, y, c, label }], fill } oppure
   spec = { polar:true, full?:bool, fns:[{ f(theta) -> r in [0,1], c }], marks:[{ th, label }] }
   theta polare misurato dalla normale (verticale), positivo verso destra. */
const PLOT_COL = c => ({ pen: COL.pen, bad: COL.bad, ink: COL.ink, ink2: COL.ink2, good: COL.good, hl1: COL.hl1, hl4: COL.hl4, hl5: COL.hl5 }[c] || c || COL.pen);
function drawPlot(ctx, w, h, spec) {
  if (spec.polar) return drawPolar(ctx, w, h, spec);
  const B = box({ x: 34, y: 14, w: w - 46, h: h - 40, x0: spec.x[0], x1: spec.x[1], y0: spec.y[0], y1: spec.y[1] });
  frame(ctx, B, { xl: spec.xl, yl: spec.yl, ticks: spec.ticks });
  for (const v of spec.vlines || []) { poly(ctx, [[B.X(v.x), B.y], [B.X(v.x), B.y + B.h]], PLOT_COL(v.c || "ink2"), 1, [4, 4]); if (v.label) txt(ctx, v.label, B.X(v.x) + 4, B.y + 12, { size: 11, mono: true }); }
  for (const v of spec.hlines || []) { poly(ctx, [[B.x, B.Y(v.y)], [B.x + B.w, B.Y(v.y)]], PLOT_COL(v.c || "ink2"), 1, [4, 4]); if (v.label) txt(ctx, v.label, B.x + B.w - 4, B.Y(v.y) - 4, { size: 11, mono: true, align: "right" }); }
  clip(ctx, B, () => {
    for (const fn of spec.fns || []) {
      const pts = fnPts(fn.f, B, fn.n || 500);
      if (spec.fill && fn === spec.fns[0] && pts.length > 1) {
        ctx.save(); ctx.beginPath(); ctx.moveTo(pts[0][0], B.Y(Math.max(spec.y[0], 0)));
        pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[pts.length - 1][0], B.Y(Math.max(spec.y[0], 0)));
        ctx.closePath(); ctx.fillStyle = COL.hl4; ctx.fill(); ctx.restore();
      }
      poly(ctx, pts, PLOT_COL(fn.c), fn.lw || 2.2, fn.dash ? [6, 5] : []);
    }
  });
  for (const p of spec.points || []) { dot(ctx, B.X(p.x), B.Y(p.y), 4.5, PLOT_COL(p.c || "bad")); if (p.label) txt(ctx, p.label, B.X(p.x) + 6, B.Y(p.y) - 6, { size: 11, mono: true, color: COL.ink }); }
}
function drawPolar(ctx, w, h, spec) {
  const full = !!spec.full, cx = w / 2, cy = full ? h / 2 : h - 18, R = full ? Math.min(w, h) / 2 - 18 : Math.min(w / 2 - 14, h - 34);
  ctx.save();
  for (const f of [0.25, 0.5, 0.75, 1]) { ctx.beginPath(); ctx.arc(cx, cy, R * f, full ? 0 : Math.PI, TAU); ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.stroke(); }
  for (let a = -90; a <= (full ? 270 : 90); a += 30) { const th = a * Math.PI / 180; poly(ctx, [[cx, cy], [cx + R * Math.sin(th), cy - R * Math.cos(th)]], COL.line, 1); }
  ctx.restore();
  txt(ctx, "0°", cx, cy - R - 4, { size: 10, mono: true, align: "center" });
  txt(ctx, "90°", cx + R + 2, cy - 4, { size: 10, mono: true }); txt(ctx, "−90°", cx - R - 2, cy - 4, { size: 10, mono: true, align: "right" });
  for (const fn of spec.fns || []) {
    const pts = [], n = fn.n || 720, a0 = full ? -Math.PI : -Math.PI / 2, a1 = full ? Math.PI : Math.PI / 2;
    for (let i = 0; i <= n; i++) { const th = a0 + (a1 - a0) * i / n, r = Math.max(0, fn.f(th)); pts.push([cx + R * r * Math.sin(th), cy - R * r * Math.cos(th)]); }
    if (fn === spec.fns[0]) { ctx.save(); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = COL.hl4; ctx.fill(); ctx.restore(); }
    poly(ctx, pts, PLOT_COL(fn.c), fn.lw || 2.2, fn.dash ? [6, 5] : []);
  }
  for (const m of spec.marks || []) { const x = cx + (R + 2) * Math.sin(m.th), y = cy - (R + 2) * Math.cos(m.th); poly(ctx, [[cx, cy], [x, y]], COL.bad, 1.2, [3, 3]); if (m.label) txt(ctx, m.label, x + (m.th >= 0 ? 4 : -4), y, { size: 10, mono: true, color: COL.bad, align: m.th >= 0 ? "left" : "right" }); }
}

/* ===== labs_a.js ===== */
/* Laboratori 11 (riscritto: fenditure, reticolo, Airy, Rayleigh), 11b (schiera di antenne),
   12 (riscritto: rifrazione, lenti, specchi, diottro), 12b (Huygens e Fermat). */
const LabsA = {
  /* J1(x) = (1/pi) * integrale da 0 a pi di cos(t - x sin t) dt: regola dei trapezi (integrando periodico, converge molto in fretta) */
  J1(x) { let s = 0; const N = 64; for (let i = 0; i <= N; i++) { const t = Math.PI * i / N; s += (i === 0 || i === N ? 0.5 : 1) * Math.cos(t - x * Math.sin(t)); } return s / N; },
  lut: null, LS: 0.002, LMAX: 40, Z1: 3.8317,
  /* [2 J1(u)/u]^2 con tabella precalcolata (una volta sola) */
  airy(u) {
    u = Math.abs(u); if (u < 1e-6) return 1;
    if (u >= this.LMAX) { const v = 2 * this.J1(u) / u; return v * v; }
    if (!this.lut) { const n = Math.ceil(this.LMAX / this.LS) + 2, a = new Float64Array(n); a[0] = 1; for (let i = 1; i < n; i++) { const x = i * this.LS, v = 2 * this.J1(x) / x; a[i] = v * v; } this.lut = a; }
    const f = u / this.LS, i = Math.floor(f), r = f - i; return this.lut[i] * (1 - r) + this.lut[i + 1] * r;
  },
  sinc(x) { return Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x; },
  arr(N, y) { const s = Math.sin(y); if (Math.abs(s) < 1e-7) return 1; const v = Math.sin(N * y) / (N * s); return v * v; },
  mant(x, d) { let e = Math.floor(Math.log10(Math.abs(x)) + 1e-12), m = x / 10 ** e; if (Math.abs(+m.toFixed(d)) >= 10) { m /= 10; e++; } return [m.toFixed(d), e]; },
  sciT(x, d) { if (!isFinite(x) || x === 0) return "$0$"; const [m, e] = this.mant(x, d === undefined ? 2 : d); return "$" + m.replace(".", "{,}") + "\\cdot10^{" + e + "}$"; },
  sup(e) { const m = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" }; return String(e).split("").map(c => m[c]).join(""); },
  sciU(x, d) { if (!isFinite(x) || x === 0) return "0"; const [m, e] = this.mant(x, d === undefined ? 2 : d); return m.replace(".", ",") + "·10" + this.sup(e); },
  len(D) { return D >= 1 ? fm(D, 2) + " m" : D >= 0.01 ? fm(D * 100, 1) + " cm" : fm(D * 1000, 1) + " mm"; },
  asec(th) { const a = th * 206265; return fm(a, a < 0.1 ? 3 : a < 10 ? 2 : 1) + "″"; },
  degS(s) { return fm(deg(Math.asin(Math.max(-1, Math.min(1, s)))), 1) + "°"; },
  natura(q, M) {
    if (!isFinite(q)) return "all'infinito (oggetto nel fuoco)";
    return (q > 0 ? "reale" : "virtuale") + ", " + (M < 0 ? "capovolta" : "dritta") + ", " + (Math.abs(M) > 1.005 ? "ingrandita" : Math.abs(M) < 0.995 ? "rimpicciolita" : "stessa grandezza");
  },
  fillPts(ctx, pts, color) { if (pts.length < 3) return; ctx.save(); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = color; ctx.fill(); ctx.restore(); },
  circle(ctx, x, y, r, color, lw, dash, a0, a1) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), a0 || 0, a1 === undefined ? TAU : a1); ctx.strokeStyle = color; ctx.lineWidth = lw || 1; ctx.setLineDash(dash || []); ctx.stroke(); ctx.restore(); },
  legend(ctx, items, x, y) {
    ctx.save(); ctx.font = '500 10px "Atkinson Hyperlegible", system-ui, sans-serif';
    for (const [c, s, dash] of items) { poly(ctx, [[x, y - 3.5], [x + 14, y - 3.5]], c, 2, dash); txt(ctx, s, x + 17, y, { size: 10 }); x += 24 + ctx.measureText(s).width; }
    ctx.restore();
  }
};

/* ===================== 11 · Diffrazione e reticoli ===================== */
LABS[11] = {
  c: 11, title: "Diffrazione e reticoli", h: 340,
  see: "Fenditure e reticolo: l'intensità in funzione di $\\sin\\theta$ (tratteggiato l'inviluppo di una fenditura) e, sotto, la figura sullo schermo. Airy: l'immagine di un punto (luminosità compressa per vedere gli anelli) e il profilo radiale. Rayleigh: due stelle vicine, le due figure (tratteggiate) e la loro somma.",
  intro: ["Ogni punto della fenditura è una sorgente secondaria: le ondine interferiscono e danno $I=I_0\\,\\mathrm{sinc}^2(\\pi a\\sin\\theta/\\lambda)$, con zeri a $a\\sin\\theta=n\\lambda$ ($n\\neq0$).",
    "Con più fenditure a passo $d$ l'interferenza crea picchi a $d\\sin\\theta=n\\lambda$, modulati dall'inviluppo della singola fenditura. Se un massimo cade su uno zero dell'inviluppo, quell'ordine **manca**.",
    "Un'apertura circolare di diametro $D$ dà il disco di Airy, $I=I_0\\left[\\frac{2J_1(x)}{x}\\right]^2$ con $x=\\frac{kD}{2}\\sin\\theta$. Il primo zero, $x=3{,}832$, fissa il limite di risoluzione: $\\theta_R\\simeq1{,}22\\,\\lambda/D$."],
  cards: ["11.1", "11.2", "11.4", "11.5", "11.7", "11.10", "11.16"], concept: "k.airy",
  choice: { id: "kind", opts: [["single", "Fenditura singola"], ["double", "Doppia fenditura"], ["grat", "Reticolo"], ["airy", "Disco di Airy"], ["rayl", "Criterio di Rayleigh"]], v: "single" },
  params: [
    { id: "a", label: "Larghezza della fenditura $a/\\lambda$", min: 0.5, max: 10, step: 0.05, v: 4, u: "", d: 2, show: c => c === "single" || c === "double" || c === "grat" },
    { id: "dr", label: "Passo $d$ in unità di $a$", min: 1, max: 8, step: 0.05, v: 3, u: "", d: 2, show: c => c === "double" || c === "grat", fmt: v => "d = " + fm(v, 2) + " a" },
    { id: "N", label: "Numero di fenditure $N$", min: 2, max: 20, step: 1, v: 4, u: "", d: 0, show: c => c === "grat" },
    { id: "lgD", label: "Diametro dell'apertura $D$", min: -3, max: 1, step: 0.005, v: -1, u: "", d: 2, show: c => c === "airy" || c === "rayl", fmt: v => LabsA.len(10 ** v) },
    { id: "lam", label: "Lunghezza d'onda $\\lambda$", min: 380, max: 750, step: 5, v: 550, u: "nm", d: 0, show: c => c === "airy" || c === "rayl" },
    { id: "sep", label: "Separazione delle stelle $\\Delta\\theta/\\theta_R$", min: 0.3, max: 2.5, step: 0.01, v: 1.6, u: "", d: 2, show: c => c === "rayl", fmt: v => fm(v, 2) + " θ_R" }],
  presets: [
    { label: "d = 3,5a", choice: "double", set: { a: 3, dr: 3.5 }, note: "Mancano gli ordini 7, 14, …: cadono sugli zeri dell'inviluppo ($n=m\\,d/a$). Nel lobo centrale restano 7 frange." },
    { label: "d = 3a", choice: "double", set: { a: 3, dr: 3 }, note: "Mancano gli ordini 3, 6, 9, …: nel lobo centrale restano 5 frange." },
    { label: "Reticolo N = 5", choice: "grat", set: { a: 2, dr: 3, N: 5 }, note: "Tra due massimi principali: $N-1=4$ minimi e $N-2=3$ massimi secondari." },
    { label: "Hubble D = 2,4 m, λ = 500 nm", choice: "airy", set: { lgD: Math.log10(2.4), lam: 500 }, note: "$\\theta_R=1{,}22\\,\\lambda/D\\approx2{,}5\\cdot10^{-7}$ rad $\\approx0{,}052''$." },
    { label: "Reflex f/1,8 (D = 28 mm)", choice: "airy", set: { lgD: Math.log10(0.028), lam: 500 }, note: "$\\theta_R\\approx2{,}2\\cdot10^{-5}$ rad: con $f=50$ mm, sul sensore $x=\\theta_R f\\approx1\\,\\mu\\mathrm{m}$." },
    { label: "Due stelle al limite", choice: "rayl", set: { sep: 1 }, note: "Il massimo di una stella cade sul primo zero dell'altra: al centro la somma scende a circa il 73,5%." }],
  I(P, s) {
    const env = LabsA.sinc(Math.PI * P.a * s) ** 2;
    if (P.choice === "single") return env;
    const y = Math.PI * P.dr * P.a * s;
    if (P.choice === "double") return env * Math.cos(y) ** 2;
    return env * LabsA.arr(P.N, y);
  },
  /* ordini: visibili (|sin| <= 1), mancanti (n/(d/a) intero), frange nel lobo centrale (|n| < d/a) */
  orders(P) {
    const d = P.dr * P.a, nmax = Math.floor(d + 1e-9), miss = [];
    const isMiss = n => { const m = n / P.dr; return Math.abs(m - Math.round(m)) < 1e-6; };
    for (let n = 1; n <= nmax; n++) if (isMiss(n)) miss.push(n);
    let first = 0; for (let n = 1; n <= 200; n++) if (isMiss(n)) { first = n; break; }
    return { d, nmax, miss, first, lobe: 2 * Math.ceil(P.dr - 1e-9) - 1, vis: 2 * (nmax - miss.length) + 1 };
  },
  thR(P) { return 1.22 * P.lam * 1e-9 / 10 ** P.lgD; },
  rayl(sep) {
    const z = LabsA.Z1, f = x => LabsA.airy(z * Math.abs(x - sep / 2)) + LabsA.airy(z * Math.abs(x + sep / 2));
    let m = 0; for (let i = 0; i <= 1200; i++) { const v = f(-3 + 6 * i / 1200); if (v > m) m = v; }
    const c = f(0); return { max: m, dip: c / m, verdict: sep >= 1.03 ? "risolte" : sep >= 0.97 ? "al limite" : "non risolte" };
  },
  readouts(P) {
    const c = P.choice;
    if (c === "airy" || c === "rayl") {
      const th = this.thR(P), D = 10 ** P.lgD;
      if (c === "airy") return [["$\\theta_R=1{,}22\\,\\lambda/D$", LabsA.sciT(th) + " rad"], ["In secondi d'arco", LabsA.asec(th)],
        ["Secondo anello scuro", "$2{,}23\\,\\lambda/D$ = " + LabsA.sciT(2.233 * th / 1.22) + " rad"], ["Primo anello luminoso", "circa 1,75% del centro"],
        ["Rispetto al seeing a terra (0,2–0,3″)", th * 206265 < 0.2 ? "più fine: da terra lo rovina l'atmosfera" : "più largo: comanda la diffrazione"], ["Apertura", "$D/\\lambda$ = " + LabsA.sciT(D / (P.lam * 1e-9))]];
      const r = this.rayl(P.sep);
      return [["Separazione $\\Delta\\theta$", fm(P.sep, 2) + " $\\theta_R$ = " + LabsA.sciT(P.sep * th) + " rad"], ["Al centro / massimo", fm(r.dip * 100, 1) + "%"],
        ["Verdetto", r.verdict === "risolte" ? "**risolte**" : r.verdict === "al limite" ? "**al limite di Rayleigh**" : "**non risolte**"], ["$\\theta_R$ con questi $D$ e $\\lambda$", LabsA.sciT(th) + " rad = " + LabsA.asec(th)]];
    }
    const out = [["Primo zero $a\\sin\\theta_1=\\lambda$", P.a >= 1 ? "$\\sin\\theta_1$ = " + fm(1 / P.a, 3) + ", $\\theta_1$ = " + LabsA.degS(1 / P.a) : "nessuno ($a<\\lambda$)"]];
    if (c === "single") {
      out.push(["Larghezza del picco centrale $2\\theta_1$", P.a >= 1 ? fm(2 * deg(Math.asin(1 / P.a)), 1) + "°" : "tutto lo schermo"]);
      out.push(["Zeri per lato ($|n|\\le a/\\lambda$)", String(Math.floor(P.a + 1e-9))]);
      return out;
    }
    const o = this.orders(P);
    out.push(["Frange nel lobo centrale ($|n|<d/a$)", String(o.lobe)]);
    out.push(["Ordini visibili ($|n|\\le d/\\lambda$ = " + fm(o.d, 2) + ")", o.vis + " (|n| ≤ " + o.nmax + ")"]);
    out.push(["Ordini mancanti $n=m\\,d/a$", o.miss.length ? o.miss.map(n => "±" + n).join(", ") : o.first ? "nessuno sullo schermo (il primo: n = " + o.first + ")" : "nessuno"]);
    if (c === "grat") {
      out.push(["Tra due massimi principali", "$N-1$ = " + (P.N - 1) + " minimi, $N-2$ = " + (P.N - 2) + " massimi secondari"]);
      out.push(["Semilarghezza al centro $\\lambda/Nd$", fm(deg(Math.asin(Math.min(1, 1 / (P.N * o.d)))), 2) + "°"]);
    }
    return out;
  },
  missions: [
    { t: "Fenditura singola: fai sparire tutti i minimi.", ok: P => P.choice === "single" && P.a < 1 },
    { t: "Fenditura singola: picco centrale largo 60° in tutto (primo minimo a 30°).", ok: P => P.choice === "single" && Math.abs(P.a - 2) < 0.05 },
    { t: "Reticolo: rendi i picchi strettissimi con almeno 15 fenditure.", ok: P => P.choice === "grat" && P.N >= 15 },
    { t: "Doppia fenditura con $d=3{,}5a$: fai entrare nello schermo l'ordine mancante $n=7$ (serve $a\\ge2\\lambda$).", ok: P => P.choice === "double" && Math.abs(P.dr - 3.5) < 0.03 && P.a >= 2 - 1e-9 },
    { t: "Con $d=3a$ (doppia fenditura o reticolo) conta le 5 frange del lobo centrale: l'ordine 3 cade sullo zero.", ok: P => (P.choice === "double" || P.choice === "grat") && Math.abs(P.dr - 3) < 0.03 },
    { t: "Reticolo: ottieni esattamente 4 massimi secondari tra due massimi principali.", ok: P => P.choice === "grat" && P.N === 6 },
    { t: "Disco di Airy: imposta Hubble ($D=2{,}4$ m, $\\lambda=500$ nm) e leggi $\\theta_R\\approx0{,}05''$.", ok: P => P.choice === "airy" && Math.abs(10 ** P.lgD - 2.4) < 0.03 && Math.abs(P.lam - 500) < 3 },
    { t: "Disco di Airy: con $\\lambda=500$ nm trova il diametro più piccolo che risolve $0{,}1''$ ($\\theta_R$ tra 0,095″ e 0,1″).", ok: P => { if (P.choice !== "airy" || Math.abs(P.lam - 500) > 3) return false; const a = LABS[11].thR(P) * 206265; return a <= 0.1 && a >= 0.095; } },
    { t: "Rayleigh: porta le due stelle esattamente al limite ($\\Delta\\theta=\\theta_R$).", ok: P => P.choice === "rayl" && Math.abs(P.sep - 1) < 0.015 },
    { t: "Rayleigh: avvicinale finché l'avvallamento al centro sparisce del tutto.", ok: P => P.choice === "rayl" && LABS[11].rayl(P.sep).dip > 0.9999 }],
  notes: ["Fenditura più stretta, picco più largo: $\\sin\\theta_1=\\lambda/a$.",
    "Nel reticolo i picchi non si spostano cambiando $N$: diventano più stretti (semilarghezza $\\lambda/Nd$) e più intensi ($N^2$).",
    "Ordine mancante: il massimo $d\\sin\\theta=n\\lambda$ cade sullo zero $a\\sin\\theta=m\\lambda$ quando $n=m\\,d/a$. Con $d=3{,}5a$ mancano 7, 14, … (non 3,5!); con $d=3a$ mancano 3, 6, …",
    "Nel lobo centrale cadono le frange con $|n|<d/a$: 7 con $d=3{,}5a$, 5 con $d=3a$.",
    "Airy: in unità di $\\lambda/D$ la figura è sempre la stessa; $D$ e $\\lambda$ cambiano solo la scala. Il primo anello luminoso vale circa l'1,75% del centro.",
    "Hubble: $\\theta_R\\approx0{,}05''$. Da terra il seeing limita a 0,2–0,3″, cioè circa 5 volte peggio in angolo (gli appunti scrivono «fattore 100»: in angolo non è così).",
    "Rayleigh: al limite il centro della somma scende al 73,5% circa del massimo; sotto $\\Delta\\theta\\approx0{,}78\\,\\theta_R$ l'avvallamento sparisce."],
  draw(ctx, w, h, P, t, L) {
    const c = P.choice;
    if (c === "airy") return this.drawAiry(ctx, w, h, P, L);
    if (c === "rayl") return this.drawRayl(ctx, w, h, P, L);
    const X = c === "single" ? 1 : Math.min(1, 3.3 / P.a);
    const B = box({ x: 16, y: 18, w: w - 32, h: h - 98, x0: -X, x1: X, y0: 0, y1: 1.08 });
    const o = c === "single" ? null : this.orders(P);
    if (o && P.a >= 1) { const s1 = 1 / P.a, xa = B.X(Math.max(-X, -s1)), xb = B.X(Math.min(X, s1)); ctx.fillStyle = rgba(toRGB(COL.hl1), 0.2); ctx.fillRect(xa, B.y, xb - xa, B.h); }
    let ticks;
    if (c === "single") ticks = [[-1, "−90°"], [-0.5, "−30°"], [0, "0"], [0.5, "30°"], [1, "90°"]];
    else { ticks = [[0, "0"]]; for (let m = 1; m <= 3; m++) if (m / P.a <= X + 1e-9) { const s = (m === 1 ? "" : m) + "λ/a"; ticks.push([m / P.a, s], [-m / P.a, "−" + s]); } }
    frame(ctx, B, { ticks });
    txt(ctx, "sin θ", B.x + B.w, B.y + B.h - 5, { size: 10, mono: true, align: "right" });
    const env = s => LabsA.sinc(Math.PI * P.a * s) ** 2;
    if (c !== "single") clip(ctx, B, () => poly(ctx, fnPts(env, B, 600), COL.ink2, 1.2, [5, 4]));
    const n = Math.max(800, Math.floor(B.w * 4));
    clip(ctx, B, () => poly(ctx, fnPts(s => this.I(P, s), B, n), COL.pen, 1.8));
    if (o) {
      const per = B.w / (2 * X) / o.d, nn = Math.floor(o.d * X + 1e-9), missSet = new Set(o.miss);
      for (let k = -nn; k <= nn; k++) {
        const m = missSet.has(Math.abs(k)), Xk = B.X(k / o.d);
        if (m) {
          poly(ctx, [[Xk, B.y + 12], [Xk, B.Y(0)]], COL.bad, 1.2, [3, 3]);
          txt(ctx, "✕", Xk, B.Y(0) - 3, { size: 11, align: "center", color: COL.bad, weight: 700 });
        }
        if (per >= 15 || m) txt(ctx, (m && per < 15 ? "n=" : "") + (k < 0 ? "−" : "") + Math.abs(k), Xk, B.y + 8, { size: 9, mono: true, align: "center", color: m ? COL.bad : COL.ink2, weight: m ? 700 : 500 });
      }
    }
    const sy = h - 44;
    for (let px = 0; px < B.w; px++) {
      let I = 0; for (let k = 0; k < 3; k++) I = Math.max(I, this.I(P, -X + 2 * X * (px + (k + 0.5) / 3) / B.w));
      ctx.fillStyle = rgba(COL.penRGB, Math.sqrt(I)); ctx.fillRect(B.x + px, sy, 1.2, 26);
    }
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.strokeRect(B.x, sy, B.w, 26);
    txt(ctx, "come appare sullo schermo" + (o ? " · lobo centrale: " + o.lobe + " frange" : ""), B.x, sy - 4, { size: 10 });
    if (o && o.miss.length) txt(ctx, "✕ ordini mancanti", B.x + B.w, sy - 4, { size: 10, align: "right", color: COL.bad, weight: 700 });
  },
  airyImg(S, T) {
    const k = 2, n = S * k, cv = document.createElement("canvas"); cv.width = cv.height = n;
    const g = cv.getContext("2d"), im = g.createImageData(n, n), D = im.data, [r, gg, b] = COL.penRGB;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const tx = (i + 0.5 - n / 2) / (n / 2) * T, ty = (j + 0.5 - n / 2) / (n / 2) * T;
      const I = LabsA.airy(Math.PI * Math.hypot(tx, ty)), q = 4 * (j * n + i);
      D[q] = r; D[q + 1] = gg; D[q + 2] = b; D[q + 3] = Math.round(255 * Math.pow(I, 0.3));
    }
    g.putImageData(im, 0, 0); return cv;
  },
  drawAiry(ctx, w, h, P, L) {
    const S = Math.round(Math.min(150, w * 0.42, h * 0.45)), x0 = 10, y0 = 10, T = 4;
    const key = "airy" + S + COL.pen;
    if (!L.state || L.state.key !== key) L.state = { key, img: this.airyImg(S, T) };
    ctx.fillStyle = COL.paper; ctx.fillRect(x0, y0, S, S);
    ctx.drawImage(L.state.img, x0, y0, S, S);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.strokeRect(x0, y0, S, S);
    const rr = 1.2197 / T * S / 2;
    LabsA.circle(ctx, x0 + S / 2, y0 + S / 2, rr, COL.bad, 1.2, [3, 3]);
    txt(ctx, "θ_R", x0 + S / 2 + rr * 0.72 + 3, y0 + S / 2 - rr * 0.72 - 3, { size: 10, mono: true, color: COL.bad, weight: 700 });
    const th = this.thR(P), tx = x0 + S + 12;
    let y = y0 + 14;
    const line = (s, o) => { txt(ctx, s, tx, y, Object.assign({ size: 11 }, o)); y += 16; };
    line("Disco di Airy", { size: 13, weight: 700, color: COL.ink });
    line("1° zero: (kD/2) sin θ = 3,832", { mono: true, size: 10 });
    line("θ_R = 1,22 λ/D", { mono: true, color: COL.bad, weight: 700 });
    line("= " + LabsA.sciU(th) + " rad", { mono: true, color: COL.ink });
    line("= " + LabsA.asec(th), { mono: true, color: COL.ink });
    y += 4;
    line("D = " + LabsA.len(10 ** P.lgD) + ", λ = " + fm(P.lam, 0) + " nm", { size: 10 });
    line("luminosità ∝ I^0,3", { size: 10 });
    const B = box({ x: 16, y: y0 + S + 22, w: w - 32, h: h - (y0 + S + 22) - 24, x0: -4, x1: 4, y0: 0, y1: 1.08 });
    frame(ctx, B, { ticks: [[-3.238, ""], [-2.233, ""], [-1.22, ""], [0, "0"], [1.22, "1,22"], [2.233, "2,23"], [3.238, "3,24"]] });
    txt(ctx, "θ in unità di λ/D", B.x + B.w, B.y + 10, { size: 10, mono: true, align: "right" });
    const f = s => LabsA.airy(Math.PI * s);
    clip(ctx, B, () => { poly(ctx, fnPts(s => 20 * f(s), B, 500), COL.ink2, 1.1, [4, 3]); poly(ctx, fnPts(f, B, 500), COL.pen, 2.2); });
    txt(ctx, "×20", B.X(1.75), B.Y(0.3) - 4, { size: 10, mono: true, align: "center" });
    poly(ctx, [[B.X(1.22), B.y], [B.X(1.22), B.Y(0)]], COL.bad, 1, [3, 3]);
  },
  drawRayl(ctx, w, h, P, L) {
    const IW = Math.round(w - 20), IH = Math.round(Math.min(110, h * 0.32)), x0 = 10, y0 = 10, span = 3, sep = P.sep;
    const r = this.rayl(sep), key = "rayl" + IW + "x" + IH + "|" + sep + COL.pen;
    if (!L.state || L.state.key !== key) {
      const k = 2, nw = IW * k, nh = IH * k, cv = document.createElement("canvas"); cv.width = nw; cv.height = nh;
      const g = cv.getContext("2d"), im = g.createImageData(nw, nh), D = im.data, [cr, cg, cb] = COL.penRGB, z = LabsA.Z1;
      for (let j = 0; j < nh; j++) for (let i = 0; i < nw; i++) {
        const tx = (i + 0.5 - nw / 2) / (nw / 2) * span, ty = (j + 0.5 - nh / 2) / (nw / 2) * span;
        const I = (LabsA.airy(z * Math.hypot(tx - sep / 2, ty)) + LabsA.airy(z * Math.hypot(tx + sep / 2, ty))) / r.max, q = 4 * (j * nw + i);
        D[q] = cr; D[q + 1] = cg; D[q + 2] = cb; D[q + 3] = Math.round(255 * Math.min(1, I));
      }
      g.putImageData(im, 0, 0); L.state = { key, img: cv };
    }
    ctx.fillStyle = COL.paper; ctx.fillRect(x0, y0, IW, IH);
    ctx.drawImage(L.state.img, x0, y0, IW, IH);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.strokeRect(x0, y0, IW, IH);
    for (const sg of [-1, 1]) { const X = x0 + IW / 2 + sg * sep / 2 / span * IW / 2; poly(ctx, [[X, y0], [X, y0 + 7]], sg < 0 ? COL.bad : COL.ink, 2); }
    txt(ctx, "immagine (lineare in I)", x0 + 4, y0 + IH - 5, { size: 10 });
    const B = box({ x: 16, y: y0 + IH + 34, w: w - 32, h: h - (y0 + IH + 34) - 24, x0: -span, x1: span, y0: 0, y1: 1.12 });
    frame(ctx, B, { ticks: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"], [2, "2"]] });
    txt(ctx, "θ / θ_R", B.x + B.w, B.y + B.h - 5, { size: 10, mono: true, align: "right" });
    const z = LabsA.Z1, s1 = x => LabsA.airy(z * Math.abs(x + sep / 2)) / r.max, s2 = x => LabsA.airy(z * Math.abs(x - sep / 2)) / r.max;
    clip(ctx, B, () => {
      poly(ctx, fnPts(s1, B, 500), COL.bad, 1.4, [5, 4]); poly(ctx, fnPts(s2, B, 500), COL.pen, 1.4, [5, 4]);
      poly(ctx, fnPts(x => s1(x) + s2(x), B, 600), COL.ink, 2.4);
      if (r.dip < 0.999) { poly(ctx, [[B.X(-sep / 2), B.Y(r.dip)], [B.X(sep / 2), B.Y(r.dip)]], COL.good, 1.2, [2, 3]); }
    });
    const col = r.verdict === "risolte" ? COL.good : r.verdict === "al limite" ? COL.pen : COL.bad;
    txt(ctx, r.verdict === "al limite" ? "al limite di Rayleigh" : r.verdict, w / 2, y0 + IH + 22, { size: 15, weight: 700, align: "center", color: col });
    txt(ctx, "Δθ = " + fm(sep, 2) + " θ_R", w - 12, y0 + IH + 22, { size: 10, mono: true, align: "right" });
    txt(ctx, r.dip < 0.9999 ? "centro: " + fm(r.dip * 100, 0) + "%" : "nessun avvallamento", 12, y0 + IH + 22, { size: 10, mono: true, color: COL.good, weight: 700 });
  }
};

/* ===================== 11b · Schiera di antenne ===================== */
LABS["11b"] = {
  c: 11, title: "Schiera di antenne", h: 380,
  see: "In alto il diagramma polare dell'intensità: la schiera (puntini) è verticale e $\\theta$ si misura dalla normale (orizzontale). Le linee rosse sono gli zeri. In basso la stessa $I(\\theta)/N^2I_0$ in coordinate cartesiane.",
  intro: ["$N$ antenne uguali, in fase, a passo $d$. Nella direzione $\\theta$ (dalla normale) ogni onda è sfasata della precedente di $\\varphi=kd\\sin\\theta$; sommando i fasori: $I=I_0\\left[\\frac{\\sin(N\\varphi/2)}{\\sin(\\varphi/2)}\\right]^2$.",
    "Massimi principali dove le onde arrivano tutte in fase ($d\\sin\\theta=n\\lambda$, $I=N^2I_0$); zeri dove il poligono dei fasori si chiude ($d\\sin\\theta=n'\\lambda/N$, $n'\\neq0,N,2N,\\dots$). Più antenne, lobo più stretto: la schiera diventa **direzionale**."],
  cards: ["11.8", "11.9", "11.15"], concept: "k.array",
  params: [
    { id: "N", label: "Numero di antenne $N$", min: 1, max: 10, step: 1, v: 4, u: "", d: 0 },
    { id: "dl", label: "Passo $d/\\lambda$", min: 0.1, max: 2, step: 0.05, v: 0.5, u: "", d: 2, fmt: v => "d = " + fm(v, 2) + " λ" }],
  presets: [
    { label: "4 antenne radio, d = λ/2", set: { N: 4, dl: 0.5 }, note: "Zeri a $\\sin\\theta=\\pm\\tfrac12,\\pm1$: $\\theta=\\pm30°$ ($\\pi/6$) e $\\pm90°$ ($\\pi/2$) dalla normale. Il $\\pi/3$ degli appunti è lo stesso zero misurato dall'asse della schiera." },
    { label: "2 antenne (Young)", set: { N: 2, dl: 0.5 } },
    { label: "8 antenne, d = λ/2", set: { N: 8, dl: 0.5 }, note: "Primo zero a $\\sin\\theta=1/8$: il lobo si è dimezzato." },
    { label: "5 antenne, d = λ", set: { N: 5, dl: 1 }, note: "Compaiono massimi principali anche a $\\pm90°$; in mezzo $N-2=3$ massimi secondari." }],
  I(P, s) { return LabsA.arr(P.N, Math.PI * P.dl * s); },
  mins(P) { const out = []; if (P.N < 2) return out; for (let k = 1; k / (P.N * P.dl) <= 1 + 1e-9; k++) if (k % P.N) out.push(k / (P.N * P.dl)); return out; },
  secCount(P) {
    let c = 0, n = 4000, prev = this.I(P, -1), cur = this.I(P, -1 + 2 / n);
    for (let i = 2; i <= n; i++) { const nx = this.I(P, -1 + 2 * i / n); if (cur > prev && cur >= nx && cur < 0.98 && cur > 1e-6) c++; prev = cur; cur = nx; }
    return c;
  },
  th1(P) { const s = 1 / (P.N * P.dl); return P.N >= 2 && s <= 1 + 1e-9 ? Math.asin(Math.min(1, s)) : null; },
  readouts(P) {
    const ms = this.mins(P), t1 = this.th1(P), np = Math.floor(P.dl + 1e-9);
    return [["Zeri $d\\sin\\theta=n'\\lambda/N$", ms.length ? ms.slice(0, 4).map(s => "±" + LabsA.degS(s)).join(", ") + (ms.length > 4 ? ", … (" + ms.length + " per lato)" : "") : "nessuno"],
      ["Primo zero $\\sin\\theta_1=\\lambda/(Nd)$", t1 !== null ? fm(deg(t1), 1) + "° (" + fm(90 - deg(t1), 1) + "° dall'asse)" : "nessuno"],
      ["Larghezza del lobo principale $2\\theta_1$", t1 !== null ? fm(2 * deg(t1), 1) + "°" : "tutto il semipiano"],
      ["Al massimo $I_{max}=N^2I_0$", "$" + P.N * P.N + "\\,I_0$"],
      ["Massimi principali visibili", String(2 * np + 1) + (np ? "" : " (solo $\\theta=0$)")],
      ["Massimi secondari tra −90° e 90° (tra due principali: $N-2$)", this.secCount(P) + " (" + Math.max(0, P.N - 2) + ")"]];
  },
  missions: [
    { t: "Imposta 4 antenne radio a $d=\\lambda/2$: zeri a $\\pm30°$ e $\\pm90°$ dalla normale.", ok: P => P.N === 4 && Math.abs(P.dl - 0.5) < 0.01 },
    { t: "Con una sola antenna l'emissione è uguale in tutte le direzioni: mettila.", ok: P => P.N === 1 },
    { t: "Stringi il lobo principale sotto i 30° di larghezza totale (tra i primi zeri).", ok: P => { const t1 = LABS["11b"].th1(P); return t1 !== null && 2 * deg(t1) < 30; } },
    { t: "Fai comparire altri massimi principali oltre a $\\theta=0$ (serve $d\\ge\\lambda$).", ok: P => P.N >= 2 && P.dl >= 1 - 1e-9 },
    { t: "Con $N=5$ e $d=\\lambda$ conta tra 0° e 90° i $N-2=3$ massimi secondari.", ok: P => P.N === 5 && Math.abs(P.dl - 1) < 0.01 },
    { t: "A $d=\\lambda/2$ raddoppia le antenne da 4 a 8: il primo zero scende da 30° a 14,5°.", ok: P => P.N === 8 && Math.abs(P.dl - 0.5) < 0.01 }],
  notes: ["Il lobo principale si stringe come $1/N$: primo zero a $\\sin\\theta=\\lambda/(Nd)$. Con 4 antenne a $\\lambda/2$: $\\sin\\theta=\\tfrac12$, cioè $30°$.",
    "Attenzione: gli appunti (p. 50) scrivono $\\theta=\\pm\\pi/3$. Misurato dalla normale lo zero è a $\\arcsin\\tfrac12=\\pi/6$; $\\pi/3=60°$ è lo stesso zero misurato dall'**asse** della schiera.",
    "Nei massimi principali le $N$ onde arrivano in fase: ampiezza $N$ volte, intensità $N^2$ volte quella di un'antenna.",
    "Con $d\\ge\\lambda$ compaiono altri massimi principali ($d\\sin\\theta=\\pm\\lambda$): per un fascio unico serve $d<\\lambda$.",
    "Il diagramma è simmetrico avanti/indietro: ogni antenna da sola irradia allo stesso modo in tutte le direzioni del piano."],
  draw(ctx, w, h, P) {
    const R = Math.min(w / 2 - 36, 100), cx = w / 2, cy = R + 16, I = s => this.I(P, s);
    for (const f of [0.25, 0.5, 0.75, 1]) LabsA.circle(ctx, cx, cy, R * f, COL.line, 1);
    for (let a = 0; a < 360; a += 30) { const p = a * Math.PI / 180; poly(ctx, [[cx, cy], [cx + R * Math.cos(p), cy - R * Math.sin(p)]], COL.line, 1); }
    txt(ctx, "0°", cx + R + 4, cy + 4, { size: 10, mono: true }); txt(ctx, "180°", cx - R - 4, cy + 4, { size: 10, mono: true, align: "right" });
    txt(ctx, "90°", cx + 4, cy - R - 3, { size: 10, mono: true }); txt(ctx, "−90°", cx + 4, cy + R + 11, { size: 10, mono: true });
    const pts = [];
    for (let i = 0; i <= 900; i++) { const p = TAU * i / 900, r = I(Math.sin(p)); pts.push([cx + R * r * Math.cos(p), cy - R * r * Math.sin(p)]); }
    LabsA.fillPts(ctx, pts, COL.hl4); poly(ctx, pts, COL.pen, 2);
    const ms = this.mins(P);
    for (const s of ms) for (const sg of [1, -1]) {
      const th = sg * Math.asin(Math.min(1, s));
      poly(ctx, [[cx, cy], [cx + (R + 4) * Math.cos(th), cy - (R + 4) * Math.sin(th)]], COL.bad, 1.2, [3, 3]);
      poly(ctx, [[cx, cy], [cx - (R + 4) * Math.cos(th), cy - (R + 4) * Math.sin(th)]], rgba(COL.badRGB, 0.35), 1, [3, 3]);
    }
    const t1 = this.th1(P);
    if (t1 !== null && t1 < Math.PI / 2 - 0.05) txt(ctx, "θ₁ = " + fm(deg(t1), 0) + "°", cx + (R + 6) * Math.cos(t1), cy - (R + 6) * Math.sin(t1), { size: 10, mono: true, color: COL.bad, weight: 700 });
    poly(ctx, [[cx, cy - R - 2], [cx, cy + R + 2]], COL.ink2, 1, [2, 3]);
    const sp = Math.min(9, (R * 0.8) / Math.max(1, P.N - 1));
    for (let k = 0; k < P.N; k++) dot(ctx, cx, cy + (k - (P.N - 1) / 2) * sp, 3.2, COL.ink);
    txt(ctx, "asse della schiera", cx - 6, cy - R + 10, { size: 10, align: "right" });
    txt(ctx, "(normale)", cx + R + 4, cy + 16, { size: 10 });
    if (t1 !== null) txt(ctx, "1° zero: " + fm(deg(t1), 1) + "° dalla normale = " + fm(90 - deg(t1), 1) + "° dall'asse", cx, cy + R + 26, { size: 10, align: "center", color: COL.ink });
    else txt(ctx, P.N === 1 ? "una sola antenna: nessuno zero" : "nessuno zero: il lobo occupa tutto", cx, cy + R + 26, { size: 10, align: "center", color: COL.ink });
    const top = cy + R + 40;
    const B = box({ x: 34, y: top, w: w - 46, h: h - top - 22, x0: -90, x1: 90, y0: 0, y1: 1.08 });
    frame(ctx, B, { ticks: [[-90, "−90°"], [-60, "−60°"], [-30, "−30°"], [0, "0"], [30, "30°"], [60, "60°"], [90, "90°"]] });
    txt(ctx, "I/N²I₀", B.x + 4, B.y + 8, { size: 10, mono: true });
    for (const s of ms) for (const sg of [1, -1]) { const X = B.X(sg * deg(Math.asin(Math.min(1, s)))); poly(ctx, [[X, B.y], [X, B.y + B.h]], COL.bad, 1, [3, 3]); }
    clip(ctx, B, () => poly(ctx, fnPts(a => I(Math.sin(a * Math.PI / 180)), B, 900), COL.pen, 2));
  }
};

/* ===================== 12 · Rifrazione, lenti, specchi, diottro ===================== */
LABS[12] = {
  c: 12, title: "Rifrazione e lenti", h: 330,
  see: "Rifrazione: raggio incidente, riflesso e rifratto. Negli altri casi l'oggetto (freccia verde) è a sinistra; i raggi principali sono rosso (parallelo), blu (per il centro o il vertice), verde (per il fuoco), grigio (per il centro di curvatura); la freccia scura è l'immagine, tratteggiata se virtuale.",
  intro: ["Passando da un mezzo all'altro la luce cambia velocità ($v=c/n$) e direzione: $n_1\\sin\\theta_i=n_2\\sin\\theta_t$. Dal mezzo più denso, oltre l'angolo critico $\\sin\\theta_c=n_2/n_1$, non esce più niente: riflessione totale.",
    "Con raggi parassiali (angoli piccoli) lenti, specchi e diottri sferici formano immagini: $\\frac1p+\\frac1q=\\frac1f$ per lenti e specchi (specchio: $f=r/2$), $\\frac{n_1}{p}+\\frac{n_2}{q}=\\frac{n_2-n_1}{r}$ per il diottro.",
    "Bastano i raggi principali: parallelo all'asse (esce per il fuoco), per il centro o il vertice, per il fuoco (esce parallelo). Se divergono, si incrociano i prolungamenti (tratteggiati): immagine virtuale.",
    "Segni: $p>0$; $q>0$ immagine reale (dietro lente e diottro, davanti allo specchio); specchio concavo $r>0$, convesso $r<0$; diottro $r>0$ se l'oggetto vede la faccia convessa."],
  cards: ["12.3", "12.4", "12.7", "12.8", "12.9", "12.11", "12.12", "12.13"], concept: "k.diottro",
  choice: { id: "kind", opts: [["snell", "Rifrazione"], ["lente", "Lente convergente"], ["div", "Lente divergente"], ["concavo", "Specchio concavo"], ["convesso", "Specchio convesso"], ["diottro", "Diottro sferico"]], v: "snell" },
  params: [
    { id: "thi", label: "Angolo di incidenza $\\theta_i$", min: 0, max: 89, step: 0.5, v: 40, u: "°", d: 1, show: c => c === "snell" },
    { id: "n1", label: "Indice $n_1$ (dove arriva la luce)", min: 1, max: 2.4, step: 0.01, v: 1, u: "", d: 2, show: c => c === "snell" || c === "diottro" },
    { id: "n2", label: "Indice $n_2$ (dopo la superficie)", min: 1, max: 2.4, step: 0.01, v: 1.33, u: "", d: 2, show: c => c === "snell" || c === "diottro" },
    { id: "p", label: "Distanza dell'oggetto $p$", min: 2, max: 45, step: 0.5, v: 30, u: "cm", d: 1, show: c => c !== "snell" },
    { id: "f", label: "Focale $|f|$", min: 4, max: 20, step: 0.5, v: 10, u: "cm", d: 1, show: c => c === "lente" || c === "div" },
    { id: "r", label: "Raggio di curvatura $|r|$", min: 4, max: 40, step: 1, v: 20, u: "cm", d: 0, show: c => c === "concavo" || c === "convesso" || c === "diottro" },
    { id: "sr", label: "Superficie vista dall'oggetto", min: -1, max: 1, step: 2, v: 1, u: "", d: 0, show: c => c === "diottro", fmt: v => v > 0 ? "convessa (r > 0)" : "concava (r < 0)" }],
  presets: [
    { label: "Fibra ottica: vetro → aria", choice: "snell", set: { n1: 1.5, n2: 1, thi: 35 }, note: "Angolo critico $\\theta_c=\\arcsin(1/1{,}5)\\approx41{,}8°$: aumenta $\\theta_i$ oltre." },
    { label: "Lente: oggetto oltre 2f", choice: "lente", set: { f: 10, p: 30 } },
    { label: "Lente d'ingrandimento", choice: "lente", set: { f: 10, p: 6 }, note: "Oggetto dentro il fuoco: $q=-15$ cm, immagine virtuale, dritta, $M=2{,}5$." },
    { label: "Retrovisore (convesso)", choice: "convesso", set: { r: 20, p: 30 } },
    { label: "Diottro aria → vetro", choice: "diottro", set: { n1: 1, n2: 1.5, r: 6, sr: 1, p: 30 }, note: "$f_0=12$ cm e $f_i=18$ cm: diversi, con $f_i-f_0=r$." },
    { label: "Pesce nella boccia", choice: "diottro", set: { n1: 1.33, n2: 1, r: 15, sr: -1, p: 10 }, note: "Oggetto in acqua, superficie concava verso di lui: immagine virtuale, dritta e ingrandita." }],
  optics(P) {
    const c = P.choice, p = P.p, inv = x => Math.abs(x) < 1e-6 ? Infinity : 1 / x;
    if (c === "lente" || c === "div") { const f = c === "lente" ? P.f : -P.f, q = inv(1 / f - 1 / p); return { f, q, M: -q / p }; }
    if (c === "concavo" || c === "convesso") { const r = c === "concavo" ? P.r : -P.r, f = r / 2, q = inv(1 / f - 1 / p); return { r, f, q, M: -q / p }; }
    const r = P.sr * P.r, Phi = (P.n2 - P.n1) / r, f0 = Math.abs(Phi) < 1e-9 ? Infinity : P.n1 / Phi, fi = Math.abs(Phi) < 1e-9 ? Infinity : P.n2 / Phi;
    const den = Phi - P.n1 / p, q = Math.abs(den) < 1e-6 ? Infinity : P.n2 / den;
    return { r, Phi, f0, fi, q, M: -P.n1 * q / (P.n2 * p) };
  },
  readouts(P) {
    if (P.choice === "snell") {
      const s = P.n1 / P.n2 * Math.sin(P.thi * Math.PI / 180), tir = s > 1;
      return [["$\\theta_t$", tir ? "nessuno" : fm(deg(Math.asin(s)), 1) + "°"], ["Angolo critico $\\theta_c$", P.n1 > P.n2 ? fm(deg(Math.asin(P.n2 / P.n1)), 1) + "°" : "non esiste ($n_1\\le n_2$)"], ["Risultato", tir ? "riflessione totale" : (P.n2 > P.n1 ? "si avvicina alla normale" : P.n2 < P.n1 ? "si allontana dalla normale" : "non devia")]];
    }
    const o = this.optics(P), c = P.choice, qs = isFinite(o.q) ? fm(o.q, 1) + " cm" : "∞";
    const out = [];
    if (c === "lente" || c === "div") out.push(["Focale $f$", fm(o.f, 1) + " cm (" + (o.f > 0 ? "convergente" : "divergente") + ")"]);
    else if (c === "diottro") {
      out.push(["$f_0=n_1r/(n_2-n_1)$", isFinite(o.f0) ? fm(o.f0, 1) + " cm" : "∞ ($n_1=n_2$)"], ["$f_i=n_2r/(n_2-n_1)$", isFinite(o.fi) ? fm(o.fi, 1) + " cm" : "∞"]);
      if (isFinite(o.f0)) out.push(["Verifica $f_i-f_0=r$", fm(o.fi - o.f0, 1) + " = " + fm(o.r, 0) + " cm"]);
    } else out.push(["$f=r/2$", fm(o.f, 1) + " cm (r = " + fm(o.r, 0) + " cm)"]);
    out.push([isFinite(o.q) ? (c === "concavo" || c === "convesso" ? (o.q > 0 ? "$q$ (davanti allo specchio)" : "$q$ (dietro lo specchio)") : (o.q > 0 ? "$q$ (dall'altra parte)" : "$q$ (dalla parte dell'oggetto)")) : "$q$", qs]);
    out.push([c === "diottro" ? "$M=-\\frac{n_1q}{n_2p}$" : "$M=-q/p$", isFinite(o.q) ? fm(o.M, 2) : "∞"]);
    out.push(["Immagine", LabsA.natura(o.q, o.M)]);
    return out;
  },
  missions: [
    { t: "Ottieni la riflessione totale.", ok: P => P.choice === "snell" && P.n1 / P.n2 * Math.sin(P.thi * Math.PI / 180) > 1 },
    { t: "Lente: immagine reale grande quanto l'oggetto ($M=-1$).", ok: P => P.choice === "lente" && Math.abs(LABS[12].optics(P).M + 1) < 0.02 },
    { t: "Lente: trasformala in una lente d'ingrandimento (immagine virtuale e dritta).", ok: P => P.choice === "lente" && P.p < P.f - 0.01 },
    { t: "Lente divergente: immagine dritta grande metà dell'oggetto ($M=+0{,}5$).", ok: P => P.choice === "div" && Math.abs(LABS[12].optics(P).M - 0.5) < 0.02 },
    { t: "Specchio concavo: oggetto nel centro di curvatura, immagine capovolta e uguale ($M=-1$).", ok: P => P.choice === "concavo" && Math.abs(LABS[12].optics(P).M + 1) < 0.02 },
    { t: "Specchio concavo da trucco: immagine virtuale, dritta, ingrandita 3 volte.", ok: P => { if (P.choice !== "concavo") return false; const o = LABS[12].optics(P); return o.q < 0 && Math.abs(o.M - 3) < 0.15; } },
    { t: "Specchio convesso: immagine ridotta a un terzo ($M=1/3$).", ok: P => P.choice === "convesso" && Math.abs(LABS[12].optics(P).M - 1 / 3) < 0.02 },
    { t: "Diottro: immagine reale capovolta grande quanto l'oggetto ($M=-1$, con $p=2f_0$).", ok: P => P.choice === "diottro" && Math.abs(LABS[12].optics(P).M + 1) < 0.03 },
    { t: "Diottro convesso ($r>0$) con $n_2<n_1$: diventa divergente, con $f_0$ e $f_i$ negativi.", ok: P => P.choice === "diottro" && P.sr > 0 && P.n2 < P.n1 - 0.05 }],
  notes: ["Dall'aria all'acqua il raggio si avvicina alla normale; dall'acqua all'aria si allontana.",
    "La riflessione totale serve $n_1>n_2$: prova a mettere $n_1=1{,}5$ e $n_2=1$.",
    "Oggetto oltre $2f$: immagine reale, capovolta, rimpicciolita. Tra $f$ e $2f$: ingrandita. Dentro $f$: virtuale.",
    "Lente divergente e specchio convesso, con un oggetto reale, danno sempre un'immagine virtuale, dritta e rimpicciolita.",
    "Specchio: il raggio per $C$ torna su se stesso, quello sul vertice si riflette simmetrico rispetto all'asse.",
    "Diottro: i due fuochi non sono simmetrici, $f_0=\\frac{n_1r}{n_2-n_1}$ e $f_i=\\frac{n_2r}{n_2-n_1}$, con $f_i-f_0=r$ e $\\frac{n_1}{f_0}=\\frac{n_2}{f_i}$. Nell'ingrandimento entrano gli indici: $M=-\\frac{n_1q}{n_2p}$."],
  draw(ctx, w, h, P) {
    if (P.choice === "snell") {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.46, th = P.thi * Math.PI / 180;
      ctx.fillStyle = rgba(toRGB(COL.hl4), 0.35 * (P.n1 - 1) / 1.4 + 0.05); ctx.fillRect(0, 0, w, cy);
      ctx.fillStyle = rgba(toRGB(COL.hl4), 0.75 * (P.n2 - 1) / 1.4 + 0.08); ctx.fillRect(0, cy, w, h - cy);
      poly(ctx, [[0, cy], [w, cy]], COL.ink, 1.5); poly(ctx, [[cx, 6], [cx, h - 6]], COL.ink2, 1, [4, 4]);
      const s = P.n1 / P.n2 * Math.sin(th), tir = s > 1;
      poly(ctx, [[cx - R * Math.sin(th), cy - R * Math.cos(th)], [cx, cy]], COL.ink, 3);
      arrowHead(ctx, cx - R * Math.sin(th) * 0.5, cy - R * Math.cos(th) * 0.5, Math.atan2(Math.cos(th), Math.sin(th)), 9, COL.ink);
      poly(ctx, [[cx, cy], [cx + R * Math.sin(th), cy - R * Math.cos(th)]], tir ? COL.ink : COL.ink2, tir ? 3 : 1.2, tir ? [] : [5, 4]);
      if (!tir) { const tt = Math.asin(s); poly(ctx, [[cx, cy], [cx + R * Math.sin(tt), cy + R * Math.cos(tt)]], COL.pen, 3); txt(ctx, "θt = " + fm(deg(tt), 1) + "°", cx + 8, cy + 30, { size: 12, mono: true, color: COL.pen }); }
      else txt(ctx, "riflessione totale", cx + 8, cy + 30, { size: 13, weight: 700, color: COL.bad });
      txt(ctx, "θi = " + fm(P.thi, 1) + "°", cx - 8, cy - 30, { size: 12, mono: true, align: "right", color: COL.ink });
      txt(ctx, "n₁ = " + fm(P.n1), 8, 18, { size: 12, mono: true, color: COL.ink }); txt(ctx, "n₂ = " + fm(P.n2), 8, h - 10, { size: 12, mono: true, color: COL.ink });
      return;
    }
    const c = P.choice, o = this.optics(P), mirror = c === "concavo" || c === "convesso", dio = c === "diottro";
    const u = (w - 20) / 100, cx = Math.round(mirror ? w * 0.66 : w * 0.5), cy = Math.round(h / 2) - 8, H = h * 0.42;
    const IX = x => cx + x * u, SX = x => mirror ? cx - x * u : cx + x * u, Y = y => cy - y;
    const yO = Math.min(46, h * 0.15), p = P.p;
    /* mezzi del diottro e forma visiva della superficie (curvatura esagerata, raggi rifratti sul piano del vertice: approssimazione parassiale) */
    const sag = y => (dio ? Math.sign(o.r) : (c === "concavo" ? -1 : 1)) * 10 * (y / H) ** 2;
    if (dio) {
      ctx.fillStyle = rgba(toRGB(COL.hl4), 0.06 + 0.5 * (P.n1 - 1) / 1.4); ctx.fillRect(0, 0, w, h);
      const pts = [[w, cy - H - 20]]; for (let i = 0; i <= 40; i++) { const y = -H - 20 + (2 * H + 40) * i / 40; pts.push([cx + sag(y), cy + y]); } pts.push([w, cy + H + 20]);
      LabsA.fillPts(ctx, pts, rgba(toRGB(COL.hl4), 0.1 + 0.6 * (P.n2 - 1) / 1.4));
      poly(ctx, pts.slice(1, -1), COL.ink, 1.8);
      txt(ctx, "n₁ = " + fm(P.n1), 8, 16, { size: 11, mono: true, color: COL.ink }); txt(ctx, "n₂ = " + fm(P.n2), w - 8, 16, { size: 11, mono: true, color: COL.ink, align: "right" });
    }
    poly(ctx, [[0, cy], [w, cy]], COL.ink2, 1);
    if (c === "lente") { ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, 7, H, 0, 0, TAU); ctx.fillStyle = COL.hl4; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
    if (c === "div") {
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx - 10, cy - H); ctx.lineTo(cx + 10, cy - H); ctx.quadraticCurveTo(cx + 1, cy, cx + 10, cy + H); ctx.lineTo(cx - 10, cy + H); ctx.quadraticCurveTo(cx - 1, cy, cx - 10, cy - H); ctx.closePath();
      ctx.fillStyle = COL.hl4; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    }
    if (mirror) {
      const pts = []; for (let i = 0; i <= 40; i++) { const y = -H + 2 * H * i / 40; pts.push([cx + sag(y), cy + y]); }
      for (let y = -H; y <= H; y += 12) poly(ctx, [[cx + sag(y), cy + y], [cx + sag(y) + 7, cy + y + 7]], COL.ink2, 1);
      poly(ctx, pts, COL.ink, 2.6);
    }
    /* punti notevoli */
    const marks = [];
    if (c === "lente" || c === "div") { const F = Math.abs(o.f); marks.push([IX(-F), "F"], [IX(F), "F"], [IX(-2 * F), "2F"], [IX(2 * F), "2F"]); }
    else if (mirror) marks.push([SX(o.f), "F"], [SX(o.r), "C"]);
    else if (isFinite(o.f0)) marks.push([IX(-o.f0), "F₀"], [SX(o.fi), "Fᵢ"], [IX(o.r), "C"]); else marks.push([IX(o.r), "C"]);
    let offL = 0, offR = 0;
    for (const [X, s] of marks) {
      if (X >= 6 && X <= w - 6) { dot(ctx, X, cy, s.length > 1 && s[0] === "2" ? 2.5 : 3.5, COL.ink); txt(ctx, s, X, cy + 15, { size: 11, align: "center", mono: true, color: COL.ink }); }
      else { const dist = Math.abs((X - cx) / u); const L = X < 6; txt(ctx, (L ? "← " : "") + s + " " + fm(dist, 0) + " cm" + (L ? "" : " →"), L ? 4 : w - 4, cy + 28 + 12 * (L ? offL++ : offR++), { size: 10, mono: true, align: L ? "left" : "right" }); }
    }
    const arrow = (x, y1, y2, col, dash) => { poly(ctx, [[x, y1], [x, y2]], col, 3, dash); if (Math.abs(y2 - y1) > 3) arrowHead(ctx, x, y2, y2 < y1 ? -Math.PI / 2 : Math.PI / 2, 9, col); };
    const xo = IX(-p);
    arrow(xo, cy, Y(yO), COL.good);
    /* raggi principali: rette parassiali, deviate sul piano dell'elemento */
    const rays = [{ yl: yO, c: COL.bad }];
    const thru = xF => { const den = p + xF; return Math.abs(den) < 0.05 ? null : yO * xF / den; };   // altezza sul piano della retta dall'oggetto per il punto (xF, 0)
    if (dio) { const yc = thru(o.r); if (yc !== null) rays.push({ yl: yc, c: COL.pen }); } else rays.push({ yl: 0, c: COL.pen });
    const yF = thru(dio ? (isFinite(o.f0) ? -o.f0 : NaN) : -o.f); if (yF !== null && isFinite(yF)) rays.push({ yl: yF, c: COL.good });
    if (mirror) { const yC = thru(-o.r); if (yC !== null) rays.push({ yl: yC, c: COL.ink2, lw: 1.3 }); }
    const virt = isFinite(o.q) && o.q < 0;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    for (const r of rays) {
      if (Math.abs(r.yl) > H) continue;   // il raggio mancherebbe l'elemento
      const sIn = (r.yl - yO) / p;
      const sOut = dio ? (P.n1 * sIn - r.yl * o.Phi) / P.n2 : sIn - r.yl / o.f;
      const lw = r.lw || 1.8;
      poly(ctx, [[xo, Y(yO)], [cx, Y(r.yl)]], r.c, lw);
      const XL = 160; poly(ctx, [[cx, Y(r.yl)], [SX(XL), Y(r.yl + sOut * XL)]], r.c, lw);
      if (virt) { const xb = Math.max(o.q - 10, -160); poly(ctx, [[cx, Y(r.yl)], [SX(xb), Y(r.yl + sOut * xb)]], r.c, 1.1, [5, 4]); }
    }
    if (isFinite(o.q)) { const xi = SX(o.q), yi = o.M * yO; if (xi > -60 && xi < w + 60) arrow(xi, cy, Y(Math.max(-h, Math.min(h, yi))), COL.ink, virt ? [5, 4] : []); }
    ctx.restore();
    txt(ctx, isFinite(o.q) ? "immagine " + (o.q > 0 ? "reale" : "virtuale") + (Math.abs(o.M) * yO > h / 2 ? " (fuori scala)" : "") : "immagine all'infinito", w - 8, dio ? 32 : 16, { size: 12, weight: 700, align: "right", color: COL.ink });
    const mid = dio ? "per C" : mirror ? "vertice" : "centro";
    LabsA.legend(ctx, [[COL.bad, "parallelo"], [COL.pen, mid], [COL.good, "per F"]].concat(mirror ? [[COL.ink2, "per C"]] : []), 8, h - 6);
  }
};

/* ===================== 12b · Huygens e Fermat ===================== */
LABS["12b"] = {
  c: 12, title: "Huygens e Fermat", h: 360,
  see: "Huygens: fronte incidente (blu), ondine secondarie (grigie) e fronte riflesso o rifratto (rosso) che le inviluppa; in tratteggio la costruzione con A, B, C, D. Kirchhoff: diagramma polare di $K(\\chi)$. Bagnino: il percorso scelto e il grafico $t(x)$. Specchi: sopra lo sferico, sotto il parabolico.",
  intro: ["Huygens: ogni punto di un fronte d'onda è sorgente di un'onda sferica secondaria, e il nuovo fronte è l'inviluppo delle ondine. Kirchhoff mostrò che ogni ondina pesa con $K(\\chi)=\\tfrac12(1+\\cos\\chi)$: niente fronte regressivo.",
    "Sullo specchio le ondine partono dai punti colpiti in istanti successivi: $\\overline{BC}=\\overline{AD}=vt$, i triangoli $ABC$ e $ADC$ sono uguali e $\\theta_i=\\theta_r$. Nel secondo mezzo le ondine hanno raggio $v_2t$: $\\frac{\\sin\\theta_1}{\\sin\\theta_2}=\\frac{v_1}{v_2}$.",
    "Fermat: la luce va da un punto all'altro nel tempo minimo. Il minimo di $t(x)$ dà Snell. Uno specchio parabolico manda nel fuoco tutti i raggi paralleli all'asse; lo sferico solo quelli vicini all'asse."],
  cards: ["12.14", "12.15", "12.6", "12.17", "12.18", "12.16"], concept: "k.huygens",
  choice: { id: "kind", opts: [["refl", "Huygens: riflessione"], ["refr", "Huygens: rifrazione"], ["kirch", "Fattore di Kirchhoff"], ["fermat", "Fermat: il bagnino"], ["parab", "Sferico o parabolico"]], v: "refl" },
  params: [
    { id: "th", label: "Angolo di incidenza $\\theta_1$", min: 5, max: 75, step: 0.5, v: 35, u: "°", d: 1, show: c => c === "refl" || c === "refr" },
    { id: "vr", label: "Velocità nel mezzo 2: $v_2/v_1$", min: 0.4, max: 1.6, step: 0.01, v: 0.75, u: "", d: 2, show: c => c === "refr" },
    { id: "chi", label: "Direzione $\\chi$ rispetto all'avanti", min: 0, max: 180, step: 1, v: 45, u: "°", d: 0, show: c => c === "kirch" },
    { id: "x", label: "Punto di ingresso in acqua $x$", min: 0, max: 30, step: 0.1, v: 15, u: "m", d: 1, show: c => c === "fermat" },
    { id: "vv", label: "Corsa / nuoto: $v_1/v_2$", min: 1, max: 4, step: 0.05, v: 2, u: "", d: 2, show: c => c === "fermat" },
    { id: "A", label: "Apertura del fascio $h_{max}/r$", min: 0.05, max: 0.9, step: 0.01, v: 0.5, u: "", d: 2, show: c => c === "parab" }],
  presets: [
    { label: "Aria → acqua", choice: "refr", set: { vr: 0.75, th: 50 }, note: "$v_2/v_1=1/1{,}33\\approx0{,}75$: le ondine nell'acqua sono più piccole e il fronte si piega verso la normale." },
    { label: "Acqua → aria, vicino al critico", choice: "refr", set: { vr: 1.33, th: 45 }, note: "L'angolo critico è $\\arcsin(1/1{,}33)\\approx48{,}8°$: aumenta $\\theta_1$ di poco." },
    { label: "Bagnino: corre 3 volte più veloce", choice: "fermat", set: { vv: 3, x: 15 }, note: "Sposta $x$ fino al minimo di $t(x)$: entra in acqua ben dopo la retta." },
    { label: "Fascio largo", choice: "parab", set: { A: 0.8 }, note: "Nello specchio sferico i raggi esterni incrociano l'asse molto prima del fuoco." }],
  /* bagnino: S sulla sabbia a h = 10 m dalla riva, P in acqua a b = 8 m, distanza lungo la riva a = 30 m, v1 = 7 m/s */
  FG: { h: 10, b: 8, a: 30, v1: 7 },
  fer(P, x) { const G = this.FG, v2 = G.v1 / P.vv; return Math.hypot(G.h, x) / G.v1 + Math.hypot(G.b, G.a - x) / v2; },
  ferMin(P) { let a = 0, b = this.FG.a; for (let i = 0; i < 80; i++) { const m1 = a + (b - a) / 3, m2 = b - (b - a) / 3; if (this.fer(P, m1) < this.fer(P, m2)) b = m2; else a = m1; } return (a + b) / 2; },
  ferSines(P, x) { const G = this.FG, s1 = x / Math.hypot(G.h, x), s2 = (G.a - x) / Math.hypot(G.b, G.a - x), v2 = G.v1 / P.vv; return { s1, s2, r1: s1 / G.v1, r2: s2 / v2, ratio: s2 > 1e-9 ? (s1 / G.v1) / (s2 / v2) : Infinity }; },
  aberr(A) { const c = Math.sqrt(1 - A * A); return 1 / c - 1; },
  readouts(P) {
    const c = P.choice;
    if (c === "refl") return [["$\\theta_i$", fm(P.th, 1) + "°"], ["$\\theta_r$ (dall'inviluppo)", fm(P.th, 1) + "°"], ["Costruzione", "$\\overline{BC}=\\overline{AD}=vt$: triangoli $ABC$ e $ADC$ uguali"]];
    if (c === "refr") {
      const s2 = P.vr * Math.sin(P.th * Math.PI / 180);
      return [["$\\theta_1$", fm(P.th, 1) + "°"], ["$\\theta_2$ da $\\sin\\theta_2=\\frac{v_2}{v_1}\\sin\\theta_1$", s2 > 1 ? "nessun inviluppo: riflessione totale" : fm(deg(Math.asin(s2)), 1) + "°"],
        ["$\\sin\\theta_1/\\sin\\theta_2$ e $v_1/v_2$", s2 > 1 ? "—" : fm(Math.sin(P.th * Math.PI / 180) / s2, 3) + " e " + fm(1 / P.vr, 3)], ["Angolo critico", P.vr > 1 ? fm(deg(Math.asin(1 / P.vr)), 1) + "°" : "non esiste ($v_2<v_1$)"]];
    }
    if (c === "kirch") { const K = 0.5 * (1 + Math.cos(P.chi * Math.PI / 180)); return [["$K(\\chi)=\\tfrac12(1+\\cos\\chi)$", fm(K, 3)], ["Avanti, di lato, indietro", "$K(0)=1$, $K(90°)=\\tfrac12$, $K(180°)=0$"], ["Intensità relativa $K^2$", fm(K * K, 3)]]; }
    if (c === "fermat") {
      const xm = this.ferMin(P), s = this.ferSines(P, P.x), G = this.FG;
      return [["$t(x)$", fm(this.fer(P, P.x), 2) + " s"], ["Minimo", "$x$ = " + fm(xm, 1) + " m, $t$ = " + fm(this.fer(P, xm), 2) + " s"], ["$v_1$, $v_2$", fm(G.v1, 1) + " m/s, " + fm(G.v1 / P.vv, 2) + " m/s"],
        ["$\\sin\\theta_1/v_1$ e $\\sin\\theta_2/v_2$", fm(s.r1, 4) + " e " + fm(s.r2, 4) + " s/m"], ["Rapporto", isFinite(s.ratio) ? fm(s.ratio, 3) + (Math.abs(s.ratio - 1) < 0.01 ? " → Snell!" : "") : "∞"]];
    }
    const ab = this.aberr(P.A);
    return [["Apertura $h_{max}/r$", fm(P.A, 2)], ["Sferico: raggio esterno sull'asse a", fm(2 - 1 / Math.sqrt(1 - P.A * P.A), 3) + " f dal vertice"], ["Aberrazione sferica", fm(ab * 100, 1) + "% di f"], ["Parabolico", "tutti nel fuoco: aberrazione 0"]];
  },
  missions: [
    { t: "Riflessione con Huygens: con $\\theta_i=60°$ guarda l'inviluppo e verifica $\\theta_r=60°$.", ok: P => P.choice === "refl" && Math.abs(P.th - 60) < 0.5 },
    { t: "Aria → acqua ($v_2/v_1=0{,}75$) con $\\theta_1=40°$: leggi $\\theta_2\\approx28{,}8°$.", ok: P => P.choice === "refr" && Math.abs(P.vr - 0.75) < 0.01 && Math.abs(P.th - 40) < 0.5 },
    { t: "Rifrazione: fai sparire l'inviluppo nel mezzo 2 (riflessione totale).", ok: P => P.choice === "refr" && P.vr * Math.sin(P.th * Math.PI / 180) > 1 },
    { t: "Kirchhoff: trova la direzione in cui l'ondina vale metà ($K=\\tfrac12$).", ok: P => P.choice === "kirch" && Math.abs(P.chi - 90) < 0.5 },
    { t: "Kirchhoff: guarda all'indietro e verifica che non c'è fronte regressivo ($K=0$).", ok: P => P.choice === "kirch" && P.chi >= 179.5 },
    { t: "Bagnino con $v_1=v_2$: il percorso più rapido è la retta. Trovalo ($x\\approx16{,}7$ m).", ok: P => P.choice === "fermat" && Math.abs(P.vv - 1) < 0.001 && Math.abs(P.x - 30 * 10 / 18) < 0.2 },
    { t: "Bagnino con $v_1/v_2=3$: trova il tempo minimo ($x$ entro 0,15 m dal minimo).", ok: P => P.choice === "fermat" && Math.abs(P.vv - 3) < 0.03 && Math.abs(P.x - LABS["12b"].ferMin(P)) < 0.15 },
    { t: "Al minimo, con $v_1/v_2\\ge2$, verifica Snell: $\\frac{\\sin\\theta_1}{v_1}=\\frac{\\sin\\theta_2}{v_2}$ entro l'1%.", ok: P => P.choice === "fermat" && P.vv >= 2 - 1e-9 && Math.abs(LABS["12b"].ferSines(P, P.x).ratio - 1) < 0.01 },
    { t: "Specchi: con un fascio sottile l'aberrazione dello sferico scende sotto l'1%.", ok: P => P.choice === "parab" && LABS["12b"].aberr(P.A) < 0.01 },
    { t: "Specchi: apri il fascio finché nello sferico il raggio esterno cade almeno il 10% prima del fuoco.", ok: P => P.choice === "parab" && LABS["12b"].aberr(P.A) >= 0.1 }],
  notes: ["Il fronte riflesso è tangente all'ondina partita da A: $\\overline{AD}=\\overline{BC}$ (stesso tempo, stessa velocità). Gli appunti scrivono $\\overline{BC}=\\overline{AB}$: è un errore.",
    "Se $v_2>v_1$ e $\\sin\\theta_1>v_1/v_2$ il punto colpito scorre sulla superficie più piano di quanto crescono le ondine nel mezzo 2: nessuna tangente comune, riflessione totale.",
    "Huygens senza Kirchhoff darebbe anche un fronte all'indietro: il fattore $K(\\chi)$ lo annulla ($K(180°)=0$).",
    "Bagnino: né la retta né il tratto minimo in acqua sono i più rapidi. Il minimo di $t(x)$ dà $\\frac{\\sin\\theta_1}{v_1}=\\frac{\\sin\\theta_2}{v_2}$, cioè $n_1\\sin\\theta_1=n_2\\sin\\theta_2$.",
    "Forma variazionale: $\\delta\\int n\\,ds=0$. In meccanica l'analogo è $\\delta\\int p\\,ds=0$ (Maupertuis), con $n\\leftrightarrow p$.",
    "Lo sferico fa incrociare i raggi esterni più vicino allo specchio (aberrazione sferica); il parabolico no: per questo i grandi telescopi usano specchi parabolici."],
  draw(ctx, w, h, P, t) {
    const c = P.choice;
    if (c === "refl" || c === "refr") return this.drawHuy(ctx, w, h, P, t);
    if (c === "kirch") return this.drawKirch(ctx, w, h, P, t);
    if (c === "fermat") return this.drawFermat(ctx, w, h, P);
    return this.drawParab(ctx, w, h, P);
  },
  drawHuy(ctx, w, h, P, t) {
    const refr = P.choice === "refr", th = P.th * Math.PI / 180, s1 = Math.sin(th), c1 = Math.cos(th);
    const y0 = Math.round(h * 0.56), Ax = w * 0.16, AC = w * 0.62, Cx = Ax + AC, T = AC * s1, AB = AC * c1;
    const v2 = refr ? P.vr : 1, s2 = refr ? P.vr * s1 : s1, tir = refr && s2 > 1;
    const c2 = tir ? 0 : Math.sqrt(1 - s2 * s2);
    const k1 = [s1, c1], t1 = [c1, -s1], km = refr ? [s2, c2] : [s1, -c1];
    if (refr) { ctx.fillStyle = rgba(toRGB(COL.hl4), Math.min(0.7, 0.25 / P.vr)); ctx.fillRect(0, y0, w, h - y0); poly(ctx, [[0, y0], [w, y0]], COL.ink, 1.5); }
    else { for (let x = 4; x < w; x += 10) poly(ctx, [[x, y0], [x - 7, y0 + 7]], COL.ink2, 1); poly(ctx, [[0, y0], [w, y0]], COL.ink, 3); }
    txt(ctx, refr ? "mezzo 1: v₁" : "mezzo: v", 8, 16, { size: 11, color: COL.ink });
    if (refr) txt(ctx, "mezzo 2: v₂ = " + fm(P.vr, 2) + " v₁", 8, h - 8, { size: 11, color: COL.ink });
    const A = [Ax, y0], Bp = [Ax + AB * t1[0], y0 + AB * t1[1]], C = [Cx, y0];
    /* costruzione statica (a t = 0 il fronte è AB, a t = T è DC) */
    poly(ctx, [A, Bp], rgba(COL.penRGB, 0.45), 1.5, [4, 3]); poly(ctx, [Bp, C], COL.ink2, 1, [2, 3]);
    let D = null;
    if (!tir) { D = [Ax + v2 * T * km[0], y0 + v2 * T * km[1]]; poly(ctx, [D, C], rgba(COL.badRGB, 0.45), 1.5, [4, 3]); poly(ctx, [A, D], COL.ink2, 1, [2, 3]); }
    const lab = (p, s, dx, dy) => txt(ctx, s, p[0] + dx, p[1] + dy, { size: 12, weight: 700, color: COL.ink, align: "center" });
    lab(A, "A", -8, refr ? -6 : -6); lab(Bp, "B", 8, -4); lab(C, "C", 8, refr ? -6 : -6); if (D) lab(D, "D", -9, refr ? 12 : -2);
    /* raggi estremi */
    const ray = (p, d, L, col, lw, dash) => poly(ctx, [p, [p[0] + d[0] * L, p[1] + d[1] * L]], col, lw, dash);
    ray(A, [-k1[0], -k1[1]], 400, COL.ink2, 1); ray(Bp, [-k1[0], -k1[1]], 400, COL.ink2, 1); ray(Bp, k1, T, COL.ink2, 1);
    if (!tir) { ray(A, km, 400, COL.ink2, 1); ray(C, km, 400, COL.ink2, 1); }
    poly(ctx, [[Cx, y0 - 70], [Cx, y0 + (refr ? 70 : 0)]], COL.ink2, 1, [4, 4]);
    txt(ctx, "θ₁ = " + fm(P.th, 1) + "°", Cx - 6, y0 - 54, { size: 11, mono: true, align: "right", color: COL.pen });
    if (!tir) txt(ctx, (refr ? "θ₂ = " + fm(deg(Math.asin(s2)), 1) : "θr = " + fm(P.th, 1)) + "°", Cx + 6, refr ? y0 + 58 : y0 - 54, { size: 11, mono: true, color: COL.bad });
    /* animazione: tempo tt da -0,3T a 1,3T */
    const tt = ((((t || 0) / 6) + 0.6) % 1 * 1.6 - 0.3) * T;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    const lmin = Math.max(0, tt * c1 / s1);
    if (lmin < AB) { const o = [Ax + tt * k1[0], y0 + tt * k1[1]]; poly(ctx, [[o[0] + lmin * t1[0], o[1] + lmin * t1[1]], [o[0] + AB * t1[0], o[1] + AB * t1[1]]], COL.pen, 3); }
    for (let j = 0; j <= 8; j++) {
      const s = AC * j / 8, tj = s * s1; if (tt <= tj) continue;
      const R = v2 * (tt - tj);
      LabsA.circle(ctx, Ax + s, y0, R, rgba(COL.inkRGB, 0.45), 1, [], refr ? 0 : Math.PI, refr ? Math.PI : TAU);
      if (refr) LabsA.circle(ctx, Ax + s, y0, tt - tj, rgba(COL.inkRGB, 0.15), 1, [], Math.PI, TAU);
    }
    if (tt > 0) {
      const sm = Math.min(AC, tt / s1);
      if (!tir) { const F = s => [Ax + s + v2 * (tt - s * s1) * km[0], y0 + v2 * (tt - s * s1) * km[1]]; poly(ctx, [F(0), F(sm)], COL.bad, 3); }
      if (refr) { const kr = [s1, -c1], F = s => [Ax + s + (tt - s * s1) * kr[0], y0 + (tt - s * s1) * kr[1]]; poly(ctx, [F(0), F(sm)], rgba(COL.badRGB, 0.35), 1.6, [5, 4]); }
    }
    ctx.restore();
    if (tir) txt(ctx, "nessun inviluppo nel mezzo 2: riflessione totale", w / 2, y0 + 40, { size: 12, weight: 700, align: "center", color: COL.bad });
    txt(ctx, refr ? "BC = v₁t,  AD = v₂t" : "BC = AD = v t", w - 8, 16, { size: 11, mono: true, align: "right", color: COL.ink });
  },
  drawKirch(ctx, w, h, P, t) {
    const R = Math.min(w * 0.3, 92), cx = w / 2, cy = R + 20, K = a => 0.5 * (1 + Math.cos(a));
    for (const f of [0.25, 0.5, 0.75, 1]) LabsA.circle(ctx, cx, cy, R * f, COL.line, 1);
    for (let a = 0; a < 360; a += 30) { const p = a * Math.PI / 180; poly(ctx, [[cx, cy], [cx + R * Math.cos(p), cy - R * Math.sin(p)]], COL.line, 1); }
    const pts = []; for (let i = 0; i <= 360; i++) { const a = TAU * i / 360, r = K(a); pts.push([cx + R * r * Math.cos(a), cy - R * r * Math.sin(a)]); }
    LabsA.fillPts(ctx, pts, COL.hl4); poly(ctx, pts, COL.pen, 2.2);
    txt(ctx, "avanti χ = 0", cx + R + 4, cy + 4, { size: 10 }); txt(ctx, "indietro", cx - R - 4, cy + 4, { size: 10, align: "right" });
    txt(ctx, "χ = 180°", cx - R - 4, cy + 16, { size: 10, align: "right" }); txt(ctx, "90°", cx + 4, cy - R - 4, { size: 10, mono: true });
    const ch = P.chi * Math.PI / 180, kv = K(ch);
    poly(ctx, [[cx, cy], [cx + (R + 6) * Math.cos(ch), cy - (R + 6) * Math.sin(ch)]], COL.bad, 1.2, [3, 3]);
    dot(ctx, cx + R * kv * Math.cos(ch), cy - R * kv * Math.sin(ch), 5, COL.bad);
    txt(ctx, "K = " + fm(kv, 2), cx + (R + 10) * Math.cos(ch), cy - (R + 10) * Math.sin(ch) - 2, { size: 11, mono: true, weight: 700, color: COL.bad, align: Math.cos(ch) >= 0 ? "left" : "right" });
    /* sotto: un fronte piano e le sue ondine pesate da K */
    const top = cy + R + 26, fx = w * 0.4, ph = ((t || 0) * 0.35) % 1, rho = 14 + 30 * ph, n = 5, gap = (h - top - 22) / (n - 1);
    poly(ctx, [[fx, top - 6], [fx, h - 10]], COL.pen, 2.4);
    txt(ctx, "fronte", fx - 4, top - 8, { size: 10, align: "right", color: COL.pen });
    for (let j = 0; j < n; j++) {
      const y = top + j * gap, q = [];
      for (let i = 0; i <= 90; i++) { const a = TAU * i / 90, r = rho * K(a); q.push([fx + r * Math.cos(a), y - r * Math.sin(a)]); }
      poly(ctx, q, rgba(COL.inkRGB, 0.5), 1); dot(ctx, fx, y, 2.5, COL.pen);
    }
    poly(ctx, [[fx + rho, top - 6], [fx + rho, h - 10]], COL.bad, 2.6);
    txt(ctx, "nuovo fronte", fx + rho + 6, top + 4, { size: 10, weight: 700, color: COL.bad });
    poly(ctx, [[fx - rho, top - 6], [fx - rho, h - 10]], rgba(COL.inkRGB, 0.25), 1.2, [3, 4]);
    txt(ctx, "✕ niente fronte all'indietro", fx - rho - 6, h - 12, { size: 10, align: "right", color: COL.ink2 });
  },
  drawFermat(ctx, w, h, P) {
    const G = this.FG, u = (w - 40) / G.a, X0 = 20, top = 14, yI = top + G.h * u, Sx = X0, Sy = top, Px = X0 + G.a * u, Py = yI + G.b * u;
    ctx.fillStyle = rgba(toRGB(COL.hl1), 0.22); ctx.fillRect(0, 0, w, yI);
    ctx.fillStyle = rgba(toRGB(COL.hl4), 0.4); ctx.fillRect(0, yI, w, Py + 10 - yI);
    poly(ctx, [[0, yI], [w, yI]], COL.ink, 1.5);
    txt(ctx, "sabbia: v₁ = " + fm(G.v1, 1) + " m/s", w - 8, top + 10, { size: 11, align: "right", color: COL.ink });
    txt(ctx, "acqua: v₂ = " + fm(G.v1 / P.vv, 2) + " m/s", 8, Py + 4, { size: 11, color: COL.ink });
    poly(ctx, [[Sx, Sy], [Px, Py]], COL.ink2, 1, [3, 4]);
    const xm = this.ferMin(P), Xm = X0 + xm * u;
    poly(ctx, [[Sx, Sy], [Xm, yI], [Px, Py]], COL.good, 1.6, [6, 4]);
    const Xc = X0 + P.x * u;
    poly(ctx, [[Sx, Sy], [Xc, yI], [Px, Py]], COL.bad, 2.6);
    poly(ctx, [[Xc, yI - 40], [Xc, yI + 40]], COL.ink2, 1, [3, 3]);
    const s = this.ferSines(P, P.x);
    txt(ctx, "θ₁ = " + fm(deg(Math.asin(s.s1)), 0) + "°", Xc - 4, yI - 26, { size: 10, mono: true, align: "right", color: COL.ink });
    txt(ctx, "θ₂ = " + fm(deg(Math.asin(s.s2)), 0) + "°", Xc + 4, yI + 34, { size: 10, mono: true, color: COL.ink });
    dot(ctx, Sx, Sy, 5, COL.ink); txt(ctx, "S (bagnino)", Sx + 8, Sy + 4, { size: 11, weight: 700, color: COL.ink });
    dot(ctx, Px, Py, 5, COL.ink); txt(ctx, "P", Px - 8, Py + 4, { size: 11, weight: 700, color: COL.ink, align: "right" });
    const tops = Py + 30, n = 150, ts = []; let tmin = Infinity, tmax = -Infinity;
    for (let i = 0; i <= n; i++) { const v = this.fer(P, G.a * i / n); ts.push(v); tmin = Math.min(tmin, v); tmax = Math.max(tmax, v); }
    const pad = (tmax - tmin) * 0.12 + 0.05;
    const B = box({ x: 40, y: tops, w: w - 52, h: h - tops - 24, x0: 0, x1: G.a, y0: tmin - pad, y1: tmax + pad });
    frame(ctx, B, { ticks: [[0, "0"], [10, "10"], [20, "20"], [30, "30 m"]] });
    txt(ctx, "t(x)", B.x + 4, B.y + 8, { size: 10, mono: true });
    txt(ctx, fm(tmax, 1) + " s", B.x - 4, B.Y(tmax) + 4, { size: 9, mono: true, align: "right" }); txt(ctx, fm(tmin, 1) + " s", B.x - 4, B.Y(tmin) + 4, { size: 9, mono: true, align: "right" });
    clip(ctx, B, () => poly(ctx, fnPts(x => this.fer(P, x), B, 300), COL.pen, 2.2));
    poly(ctx, [[B.X(xm), B.y], [B.X(xm), B.y + B.h]], COL.good, 1, [4, 4]);
    dot(ctx, B.X(xm), B.Y(this.fer(P, xm)), 4, COL.good);
    dot(ctx, B.X(P.x), B.Y(this.fer(P, P.x)), 5, COL.bad);
    LabsA.legend(ctx, [[COL.bad, "scelto"], [COL.good, "più rapido", [6, 4]], [COL.ink2, "retta", [3, 4]]], B.x + B.w - 196, B.y + 10);
  },
  drawParab(ctx, w, h, P) {
    const cy = Math.round(h / 2), R = Math.min(w * 0.7, (h / 2 - 16) / 0.92), f = R / 2, xv = w - 26, xC = xv - R, xF = xv - f, A = P.A, K = 7;
    poly(ctx, [[0, cy], [w, cy]], COL.ink2, 1);
    /* specchio sferico (sopra) e parabolico (sotto) */
    const sph = []; for (let i = 0; i <= 50; i++) { const y = 0.95 * R * i / 50; sph.push([xC + Math.sqrt(R * R - y * y), cy - y]); }
    const par = []; for (let i = 0; i <= 50; i++) { const y = 0.95 * R * i / 50; par.push([xv - y * y / (4 * f), cy + y]); }
    poly(ctx, sph, COL.ink, 2.6); poly(ctx, par, COL.ink, 2.6);
    txt(ctx, "sferico", w - 8, 14, { size: 12, weight: 700, align: "right", color: COL.ink }); txt(ctx, "parabolico", w - 8, h - 6, { size: 12, weight: 700, align: "right", color: COL.ink });
    dot(ctx, xF, cy, 4, COL.ink); txt(ctx, "F", xF, cy + 15, { size: 11, mono: true, align: "center", color: COL.ink });
    if (xC > 6) { dot(ctx, xC, cy, 3, COL.ink2); txt(ctx, "C", xC, cy + 15, { size: 11, mono: true, align: "center" }); }
    let xOuter = xF;
    for (let k = 1; k <= K; k++) {
      const y = A * R * k / K, col = k === K ? COL.bad : COL.pen, lw = k === K ? 2 : 1.4;
      /* sferico: riflessione esatta sulla sfera */
      const c = Math.sqrt(1 - (y / R) ** 2), sn = y / R, xq = xC + R * c, d = [1 - 2 * c * c, -2 * c * sn];
      const lam = y / (2 * c * sn), xa = xq + d[0] * lam;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, cy + 22); ctx.clip();
      poly(ctx, [[6, cy - y], [xq, cy - y]], col, lw);
      poly(ctx, [[xq, cy - y], [xq + d[0] * lam * 1.3, cy - (y + d[1] * lam * 1.3)]], col, lw);
      ctx.restore();
      dot(ctx, xa, cy, 2.4, col); if (k === K) xOuter = xa;
      /* parabolico: tutti nel fuoco */
      const xp = xv - y * y / (4 * f), dx = xF - xp, dy = y;
      ctx.save(); ctx.beginPath(); ctx.rect(0, cy - 22, w, h); ctx.clip();
      poly(ctx, [[6, cy + y], [xp, cy + y]], col, lw);
      poly(ctx, [[xp, cy + y], [xp + dx * 1.3, cy + y - dy * 1.3]], col, lw);
      ctx.restore();
    }
    poly(ctx, [[xOuter, cy + 5], [xOuter, cy - 5]], COL.bad, 2);
    txt(ctx, "raggi paralleli all'asse →", 8, 14, { size: 10 });
    txt(ctx, "sferico: il raggio esterno incrocia l'asse " + fm(this.aberr(A) * 100, 1) + "% di f prima di F", 8, 28, { size: 10, color: COL.bad, weight: 700 });
    txt(ctx, "parabolico: tutti in F", 8, h - 8, { size: 10, color: COL.good, weight: 700 });
  }
};

/* ===== labs_b.js ===== */
/* Laboratori: 7 (riscritto: canne, battimenti, timbro, Doppler), 7b (dB e Lambert–Beer), 5b (perdite radiative), 5c (frusta), 9 (riscritto: Doppler, Mach, Cherenkov). */
(() => {
const C_S = 343;                       // velocità del suono (m/s)
const LOG_E = 10 * Math.log10(Math.E); // 4,343: β = 4,34 α
const f3 = x => { const a = Math.abs(x); return fm(x, a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3); };
const db = x => (x > 0 ? "+" : "") + fm(x, 1) + " dB";

/* banco di oscillatori sinusoidali: ogni voce ha la sua ampiezza (somma ≤ 0,3), frequenze 80–2000 Hz, rampe senza click */
function bank(ac, dest, n) {
  const out = ac.createGain(); out.gain.value = 1; out.connect(dest);
  const vs = []; let dead = false;
  for (let i = 0; i < n; i++) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = "sine"; o.frequency.value = 440; g.gain.value = 0;
    o.connect(g); g.connect(out); o.start(); vs.push({ o, g });
  }
  const glide = (p, v, now, tc) => { p.cancelScheduledValues(now); p.setValueAtTime(p.value, now); p.setTargetAtTime(v, now, tc); };
  return {
    vs, ac,
    alive: () => !dead,
    set(list) {           // list: [[f, a], ...]
      if (dead) return;
      const now = ac.currentTime;
      let tot = 0; const L = vs.map((_, i) => { const [f, a] = list[i] || [440, 0]; const ok = f >= 80 && f <= 2000 && a > 0; const A = ok ? a : 0; tot += A; return [Math.min(2000, Math.max(80, f || 440)), A]; });
      const k = tot > 0.3 ? 0.3 / tot : 1;
      vs.forEach((v, i) => { glide(v.o.frequency, L[i][0], now, 0.02); glide(v.g.gain, L[i][1] * k, now, 0.03); });
    },
    stop() {
      if (dead) return; dead = true;
      const now = ac.currentTime;
      for (const v of vs) { try { v.g.gain.cancelScheduledValues(now); v.g.gain.setValueAtTime(0, now); v.o.frequency.cancelScheduledValues(now); v.o.stop(); } catch (e) {} try { v.o.disconnect(); v.g.disconnect(); } catch (e) {} }
      try { out.disconnect(); } catch (e) {}
    }
  };
}
/* pianifica una sequenza di punti [t, f, a] (t relativo ad adesso) sulla voce 0, spegne le altre */
function schedule(B, pts) {
  if (!B.alive()) return;
  const ac = B.ac, now = ac.currentTime + 0.01, v = B.vs[0];
  for (const w of B.vs.slice(1)) { w.g.gain.cancelScheduledValues(now); w.g.gain.setValueAtTime(w.g.gain.value, now); w.g.gain.setTargetAtTime(0, now, 0.03); }
  const fr = v.o.frequency, g = v.g.gain;
  fr.cancelScheduledValues(now); g.cancelScheduledValues(now);
  fr.setValueAtTime(fr.value, now); g.setValueAtTime(g.value, now);
  for (const [t, f, a] of pts) {
    const ok = f >= 80 && f <= 2000;
    fr.linearRampToValueAtTime(Math.min(2000, Math.max(80, f)), now + t);
    g.linearRampToValueAtTime(ok ? Math.min(0.3, a) : 0, now + t);
  }
}
function vspring(ctx, x, y1, y2, coils, amp, color) {
  const pts = [[x, y1], [x, y1 + 6]], a = y1 + 6, b = y2 - 6;
  for (let i = 1; i < coils * 2; i++) pts.push([x + (i % 2 ? -amp : amp), a + (b - a) * i / (coils * 2)]);
  pts.push([x, b], [x, y2]); poly(ctx, pts, color, 1.6);
}
function yTicks(ctx, B, list) { for (const [v, s] of list) { const Y = B.Y(v); if (Y < B.y - 1 || Y > B.y + B.h + 1) continue; poly(ctx, [[B.x - 4, Y], [B.x, Y]], COL.ink2, 1); txt(ctx, s, B.x - 6, Y + 3, { size: 10, mono: true, align: "right" }); } }
/* fronti d'onda emessi da una sorgente in moto (stato in L.state) */
function fronts(L, key, t, every, life) {
  let S = L.state;
  if (!S || S.key !== key) { S = L.state = { key, t0: t, fronts: [], last: -1e9 }; }
  return S;
}

/* =====================================================================
   7 · Onde sonore e canne (riscritto)
   ===================================================================== */
const OLD7 = LABS[7];
const PIPES = ["tubo", "AA", "AC", "CC"];
const HARM = ["a1", "a2", "a3", "a4", "a5", "a6"];
LABS[7] = {
  c: 7, title: "Onde sonore e canne", h: 340,
  see: "Canne: in alto le particelle d'aria nel tubo (ogni colonna di puntini oscilla lungo $x$), sotto spostamento e pressione. Battimenti: la somma di due toni, ingrandita e su 2 s con il suo inviluppo. Timbro: forma d'onda e spettro delle armoniche. Doppler: fronti d'onda tra sorgente S e ascoltatore A, con il tono emesso e quello percepito.",
  intro: [OLD7.intro[0], OLD7.intro[1],
    "Due toni vicini $f_1$ e $f_2$ sommati danno un suono di frequenza $\\frac{f_1+f_2}{2}$ la cui ampiezza pulsa lentamente: l'intensità ha un massimo $f_{batt}=|f_1-f_2|$ volte al secondo (battimenti).",
    "Un LA puro a 440 Hz è una sola sinusoide e suona piatto. Uno strumento produce anche le armoniche $n f_1$, amplificate in modo diverso secondo la sua struttura: è il **timbro**. La nota (l'altezza) resta $f_1$.",
    "Effetto Doppler: se sorgente o ascoltatore si muovono rispetto all'aria, $f'=f\\,\\frac{c\\pm v_A}{c\\mp v_S}$ con $c=343$ m/s (segni superiori: avvicinamento)."],
  cards: ["7.16", "7.17", "4.5", "7.19", "9.1", "9.2", "9.3"], concept: "k.timbro",
  choice: { id: "pipe", opts: [["tubo", "Onda che viaggia"], ["AA", "Aperta–aperta"], ["AC", "Aperta–chiusa"], ["CC", "Chiusa–chiusa"], ["batt", "Battimenti"], ["timbro", "Tono puro e timbro"], ["dopp", "Doppler"], ["pass", "Doppler: passata"]], v: "tubo" },
  params: [
    { id: "n", label: "Modo $n$", min: 1, max: 5, step: 1, v: 1, u: "", d: 0, show: c => c === "AA" || c === "AC" || c === "CC" },
    { id: "f1", label: "Frequenza del primo tono $f_1$", min: 200, max: 1000, step: 1, v: 440, u: "Hz", d: 0, show: c => c === "batt" },
    { id: "df", label: "Differenza $f_2-f_1$", min: -10, max: 10, step: 0.1, v: 3, u: "Hz", d: 1, show: c => c === "batt" },
    { id: "fT", label: "Fondamentale $f_1$", min: 110, max: 440, step: 1, v: 440, u: "Hz", d: 0, show: c => c === "timbro" },
    ...HARM.map((id, i) => ({ id, label: "Armonica " + (i + 1) + ": ampiezza $a_" + (i + 1) + "$", min: 0, max: 1, step: 0.05, v: [1, 0.5, 0.3, 0, 0, 0][i], u: "", d: 2, show: c => c === "timbro" })),
    { id: "fS", label: "Frequenza emessa dalla sorgente $f$", min: 200, max: 1000, step: 1, v: 440, u: "Hz", d: 0, show: c => c === "dopp" || c === "pass" },
    { id: "vS", label: "Sorgente verso l'ascoltatore $v_S$ (negativa: si allontana)", min: -150, max: 150, step: 0.1, v: 20, u: "m/s", d: 1, show: c => c === "dopp" },
    { id: "vA", label: "Ascoltatore verso la sorgente $v_A$ (negativa: si allontana)", min: -150, max: 150, step: 0.1, v: 0, u: "m/s", d: 1, show: c => c === "dopp" },
    { id: "vP", label: "Velocità della sorgente che passa $v_S$", min: 5, max: 150, step: 0.5, v: 30, u: "m/s", d: 1, show: c => c === "pass" },
    { id: "lev", label: "Intensità del suono $L$ (dB rispetto al massimo)", min: -40, max: 0, step: 1, v: -10, u: "dB", d: 0 }],
  presets: [
    { label: "LA 440 puro", choice: "timbro", set: { fT: 440, a1: 1, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0 }, note: "Una sola sinusoide: suona piatta." },
    { label: "Tipo flauto (LA 220)", choice: "timbro", set: { fT: 220, a1: 1, a2: 0.45, a3: 0.2, a4: 0.1, a5: 0.05, a6: 0 }, note: "Ampiezze indicative: tutte le armoniche, che calano in fretta." },
    { label: "Tipo clarinetto: solo dispari", choice: "timbro", set: { fT: 220, a1: 1, a2: 0, a3: 0.35, a4: 0, a5: 0.2, a6: 0 }, note: "Solo armoniche dispari, come in una canna aperta–chiusa (ampiezze indicative)." },
    { label: "Tipo corda: aₙ = 1/n", choice: "timbro", set: { fT: 220, a1: 1, a2: 0.5, a3: 0.35, a4: 0.25, a5: 0.2, a6: 0.15 }, note: "Tutte le armoniche, con ampiezza circa $1/n$ (indicativa)." },
    { label: "Battimenti 440 + 442 Hz", choice: "batt", set: { f1: 440, df: 2 } },
    { label: "Sirena che arriva a 20 m/s", choice: "dopp", set: { fS: 700, vS: 20, vA: 0 } },
    { label: "Passata a 40 m/s", choice: "pass", set: { fS: 700, vP: 40 } }],
  env: OLD7.env, denv: OLD7.denv, freq: OLD7.freq, nodes: OLD7.nodes, nodePos: OLD7.nodePos,
  dop(P) { return P.fS * (C_S + P.vA) / (C_S - P.vS); },
  passF(P, x) { const r = Math.hypot(x, 15), cosT = -x / r; return P.fS * C_S / (C_S - P.vP * cosT); },
  amps(P) { return HARM.map(k => P[k]); },
  readouts(P) {
    const amp = 10 ** (P.lev / 20), lev = ["Livello relativo $L$", db(P.lev) + ": ampiezza ×" + fm(amp, 2) + ", intensità ×" + fm(amp * amp, amp * amp < 0.01 ? 4 : 2)];
    const ch = P.choice;
    if (PIPES.includes(ch)) { const r = OLD7.readouts.call(this, P); if (ch === "tubo") r.push(["Qui $\\lambda=0{,}5$ m (2 onde in 1 m)", "$f=v/\\lambda=686$ Hz"]); r.push(lev); return r; }
    if (ch === "batt") {
      const f2 = P.f1 + P.df, fb = Math.abs(P.df);
      return [["$f_2=f_1+\\Delta f$", fm(f2, 1) + " Hz"], ["$f_{batt}=|f_1-f_2|$", fm(fb, 1) + " Hz"], ["Periodo dei battimenti $1/f_{batt}$", fb > 0 ? f3(1 / fb) + " s" : "∞ (nessun battimento)"], ["Frequenza che senti $\\frac{f_1+f_2}{2}$", fm((P.f1 + f2) / 2, 1) + " Hz"], lev];
    }
    if (ch === "timbro") {
      const a = this.amps(P), on = a.map((v, i) => v > 0 ? i + 1 : 0).filter(Boolean), hi = on.filter(n => n * P.fT > 2000);
      const gcd = (x, y) => y ? gcd(y, x % y) : x, g = on.reduce(gcd, 0) || 1;
      return [["Fondamentale $f_1$", fm(P.fT, 0) + " Hz"], ["Periodo della forma d'onda", fm(1000 / (g * P.fT), 2) + " ms" + (g === 1 ? " $=1/f_1$" : " $=1/(" + g + "f_1)$")], ["Armoniche presenti", on.length ? on.map(n => n + "·f₁").join(", ") : "nessuna"],
        ["Armoniche dispari soltanto?", on.length && on.every(n => n % 2) ? "sì" : "no"], ...(hi.length ? [["Non suonate (oltre 2 kHz)", hi.map(n => n * P.fT + " Hz").join(", ")]] : []), lev];
    }
    if (ch === "dopp") {
      const fp = this.dop(P), who = Math.abs(P.vS) < 0.05 && Math.abs(P.vA) < 0.05 ? "nessuno" : Math.abs(P.vA) < 0.05 ? "solo la sorgente" : Math.abs(P.vS) < 0.05 ? "solo l'ascoltatore" : "entrambi";
      return [["$f'=f\\,\\frac{c+v_A}{c-v_S}$", fm(fp, 1) + " Hz" + (fp > 2000 ? " (troppo alta per l'audio)" : "")], ["$f'/f$", fm(fp / P.fS, 3)], ["$\\lambda'$ verso l'ascoltatore $=(c-v_S)/f$", fm((C_S - P.vS) / P.fS, 3) + " m"], ["Chi si muove (rispetto all'aria)", who], lev];
    }
    const fa = P.fS * C_S / (C_S - P.vP), fr = P.fS * C_S / (C_S + P.vP);
    return [["In arrivo (lontano) $f\\,\\frac{c}{c-v_S}$", fm(fa, 1) + " Hz"], ["In partenza $f\\,\\frac{c}{c+v_S}$", fm(fr, 1) + " Hz"], ["Rapporto $f'_{arr}/f'_{par}=\\frac{c+v_S}{c-v_S}$", fm(fa / fr, 3)], ["Quando ti passa davanti", "$f'=f=$ " + fm(P.fS, 0) + " Hz"], lev];
  },
  missions: [
    OLD7.missions[0], OLD7.missions[1], OLD7.missions[2],
    { t: "Battimenti: ottieni $f_{batt}=2$ Hz.", ok: P => P.choice === "batt" && Math.abs(Math.abs(P.df) - 2) < 0.05 },
    { t: "Battimenti lenti: un massimo di intensità ogni 2 s.", ok: P => P.choice === "batt" && Math.abs(Math.abs(P.df) - 0.5) < 0.05 },
    { t: "Timbro: suona come una canna aperta–chiusa lunga 0,78 m: $f_1=v/4L=110$ Hz e solo armoniche dispari (almeno $a_1$ e $a_3$).", ok: P => P.choice === "timbro" && P.fT === 110 && P.a1 > 0 && P.a3 > 0 && P.a2 === 0 && P.a4 === 0 && P.a6 === 0 },
    { t: "Timbro: spegni la fondamentale ($a_1=0$) tenendo $a_2$ e $a_3$: il periodo della forma d'onda resta $1/f_1$.", ok: P => P.choice === "timbro" && P.a1 === 0 && P.a2 > 0 && P.a3 > 0 },
    { t: "Doppler: con l'ascoltatore fermo, fai avvicinare la sorgente finché $f'=1{,}10\\,f$.", ok: P => P.choice === "dopp" && Math.abs(P.vA) < 0.05 && P.vS > 0 && Math.abs(LABS[7].dop(P) / P.fS - 1.1) < 0.01 },
    { t: "Doppler: stessa $f'=1{,}10\\,f$ muovendo solo l'ascoltatore ($v_S=0$). Serve la stessa velocità?", ok: P => P.choice === "dopp" && Math.abs(P.vS) < 0.05 && P.vA > 0 && Math.abs(LABS[7].dop(P) / P.fS - 1.1) < 0.01 },
    { t: "Doppler: con la sorgente in moto ($|v_S|\\ge5$ m/s) fai sentire $f'=f$.", ok: P => P.choice === "dopp" && Math.abs(P.vS) >= 5 && Math.abs(LABS[7].dop(P) / P.fS - 1) < 0.01 },
    { t: "Passata: fai sì che il rapporto tra frequenza in arrivo e in partenza superi 1,2.", ok: P => P.choice === "pass" && (C_S + P.vP) / (C_S - P.vP) >= 1.2 }],
  notes: [OLD7.notes[0], OLD7.notes[1], OLD7.notes[2],
    "Battimenti: l'inviluppo $2A\\cos(\\pi\\Delta f\\,t)$ ha frequenza $\\Delta f/2$, ma l'intensità è massima sia quando vale $+2A$ sia quando vale $-2A$: per questo $f_{batt}=|f_1-f_2|$ e non $\\Delta f/2$ (errore tipico).",
    "Timbro: cambiando le ampiezze delle armoniche cambia la forma d'onda ma non il periodo $1/f_1$: la nota resta la stessa. Anche senza fondamentale, $2f_1$ e $3f_1$ insieme si ripetono ogni $1/f_1$.",
    "Solo armoniche dispari: è lo spettro di una canna aperta–chiusa, $f_m=(2m-1)\\,\\frac{v}{4L}$.",
    "Doppler: avvicinandosi alla stessa velocità, la sorgente alza $f'$ più dell'ascoltatore, perché $\\frac{c}{c-v}>\\frac{c+v}{c}$. Conta chi si muove rispetto all'aria.",
    "Passata: conta la componente di $v_S$ lungo la linea sorgente–ascoltatore. Quando la sorgente ti passa davanti quella componente è nulla e senti $f'=f$.",
    "Livello: $-10$ dB vuol dire intensità $\\times0{,}1$ e ampiezza $\\times0{,}32$; $-20$ dB ampiezza $\\times0{,}1$ (l'intensità va come l'ampiezza al quadrato)."],
  draw(ctx, w, h, P, t, L) {
    const ch = P.choice;
    if (PIPES.includes(ch)) return OLD7.draw.call(this, ctx, w, h, P, t);
    if (ch === "batt") return this.drawBatt(ctx, w, h, P, t);
    if (ch === "timbro") return this.drawTimbro(ctx, w, h, P, t);
    if (ch === "dopp") return this.drawDopp(ctx, w, h, P, t, L);
    return this.drawPass(ctx, w, h, P, t, L);
  },
  drawBatt(ctx, w, h, P, t) {
    const f1 = P.f1, f2 = P.f1 + P.df, fb = Math.abs(P.df), Tw = 2, tau = t % Tw, zw = 12 / f1;
    const T = box({ x: 34, y: 24, w: w - 44, h: h * 0.4 - 24, x0: tau - zw / 2, x1: tau + zw / 2, y0: -2.3, y1: 2.3 });
    txt(ctx, "ingrandimento: " + fm(zw * 1000, 0) + " ms attorno all'istante attuale", T.x, 14, { size: 11 });
    frame(ctx, T, {});
    clip(ctx, T, () => {
      poly(ctx, fnPts(s => Math.cos(TAU * f1 * s), T, 500), COL.ink2, 1, [4, 3]);
      poly(ctx, fnPts(s => Math.cos(TAU * f1 * s) + Math.cos(TAU * f2 * s), T, 600), COL.pen, 2.2);
    });
    txt(ctx, "— somma   - - solo f₁", T.x + T.w - 4, T.y + 10, { size: 10, align: "right", color: COL.ink2 });
    const B = box({ x: 34, y: h * 0.4 + 34, w: w - 44, h: h * 0.6 - 62, x0: 0, x1: Tw, y0: -2.3, y1: 2.3 });
    txt(ctx, "ultimi 2 s: il tono è troppo fitto, si vede l'inviluppo", B.x, B.y - 8, { size: 11 });
    frame(ctx, B, { xl: "t (s)", ticks: [[0.5, "0,5"], [1, "1"], [1.5, "1,5"]] });
    const env = s => 2 * Math.abs(Math.cos(Math.PI * P.df * s));
    const up = fnPts(env, B, 400), dn = fnPts(s => -env(s), B, 400);
    ctx.save(); ctx.beginPath(); up.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = dn.length - 1; i >= 0; i--) ctx.lineTo(dn[i][0], dn[i][1]); ctx.closePath(); ctx.fillStyle = COL.hl4; ctx.fill(); ctx.restore();
    poly(ctx, up, COL.bad, 1.6, [6, 4]); poly(ctx, dn, COL.bad, 1.6, [6, 4]);
    poly(ctx, [[B.X(tau), B.y], [B.X(tau), B.y + B.h]], COL.ink, 1.2);
    dot(ctx, B.X(tau), B.Y(env(tau)), 4.5, COL.bad);
    txt(ctx, fb > 0 ? "f_batt = " + fm(fb, 1) + " Hz" : "nessun battimento", B.x + B.w - 4, B.y + 12, { size: 12, weight: 700, color: COL.ink, align: "right", mono: true });
  },
  drawTimbro(ctx, w, h, P, t) {
    const a = this.amps(P), sum = a.reduce((x, y) => x + y, 0) || 1, f0 = P.fT, T0 = 1000 / f0, sh = (t * 0.25) % 1;
    const sig = s => a.reduce((acc, an, i) => acc + an * Math.sin(TAU * (i + 1) * (s / T0 + sh)), 0) / sum;
    const W = box({ x: 34, y: 24, w: w - 44, h: h * 0.5 - 30, x0: 0, x1: 2 * T0, y0: -1.1, y1: 1.1 });
    txt(ctx, "forma d'onda in 2/f₁ = " + fm(2 * T0, 2) + " ms", W.x, 14, { size: 11 });
    frame(ctx, W, { xl: "t (ms)", ticks: [[T0, fm(T0, 2)]] });
    clip(ctx, W, () => {
      poly(ctx, fnPts(s => a[0] * Math.sin(TAU * (s / T0 + sh)) / sum, W, 300), COL.ink2, 1.1, [4, 3]);
      poly(ctx, fnPts(sig, W, 500), COL.pen, 2.4);
    });
    txt(ctx, "— suono   - - solo la fondamentale", W.x + W.w - 4, W.y + 8, { size: 10, align: "right", color: COL.ink2 });
    const S = box({ x: 34, y: h * 0.5 + 26, w: w - 44, h: h * 0.5 - 56, x0: 0.3, x1: 6.7, y0: 0, y1: 1.08 });
    txt(ctx, "spettro: ampiezze aₙ (blu dispari, rosso pari)", S.x, S.y - 10, { size: 11 });
    frame(ctx, S, {});
    const bw = S.w / 6.4 * 0.55;
    for (let i = 0; i < 6; i++) {
      const X = S.X(i + 1), f = (i + 1) * f0, hi = f > 2000;
      const y = S.Y(a[i]);
      ctx.fillStyle = hi ? COL.line : (i % 2 ? COL.bad : COL.pen); ctx.fillRect(X - bw / 2, y, bw, S.y + S.h - y);
      txt(ctx, (i + 1) + "f₁", X, S.y + S.h + 13, { size: 10, align: "center", mono: true, color: COL.ink });
      txt(ctx, String(f), X, S.y + S.h + 25, { size: 9, align: "center", mono: true });
      if (a[i] > 0) txt(ctx, fm(a[i], 2), X, y - 4, { size: 10, align: "center", mono: true, color: COL.ink });
    }
    txt(ctx, "Hz", S.x - 4, S.y + S.h + 25, { size: 9, align: "right", mono: true });
    if (a.some((v, i) => v > 0 && (i + 1) * f0 > 2000)) txt(ctx, "grigio: oltre 2 kHz, non suonata", S.x + S.w, S.y + 4, { size: 10, align: "right" });
  },
  drawDopp(ctx, w, h, P, t, L) {
    const bS = P.vS / C_S, bA = P.vA / C_S, H = h * 0.6, u = w / 10, cy = H / 2 + 6;
    let S = fronts(L, "d|" + P.vS + "|" + P.vA, t);
    let dt = t - S.t0, xs = 1.4 + bS * dt, xa = 8.6 - bA * dt;
    if (xa - xs < 0.5 || xs < -0.5 || xa > 10.5 || dt > 16) { S = L.state = { key: S.key, t0: t, fronts: [], last: -1e9 }; dt = 0; xs = 1.4; xa = 8.6; }
    if (t - S.last >= 0.45) { S.fronts.push({ x: xs, te: t }); S.last = t; }
    S.fronts = S.fronts.filter(f => t - f.te < 12);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, H); ctx.clip();
    for (const f of S.fronts) { const R = (t - f.te) * u; if (R < 1) continue; ctx.beginPath(); ctx.arc(f.x * u, cy, R, 0, TAU); ctx.strokeStyle = rgba(COL.penRGB, 0.75); ctx.lineWidth = 1.6; ctx.stroke(); }
    ctx.restore();
    dot(ctx, xs * u, cy, 7, COL.ink); txt(ctx, "S", xs * u, cy - 12, { size: 12, weight: 700, color: COL.ink, align: "center" });
    ctx.fillStyle = COL.bad; ctx.fillRect(xa * u - 7, cy - 7, 14, 14); txt(ctx, "A", xa * u, cy - 12, { size: 12, weight: 700, color: COL.bad, align: "center" });
    const arr = (x, v, c) => { if (Math.abs(v) < 0.05) return; const L2 = Math.min(40, 6 + Math.abs(v) / 4), d = Math.sign(v); poly(ctx, [[x, cy + 16], [x + d * L2, cy + 16]], c, 2); arrowHead(ctx, x + d * L2, cy + 16, d > 0 ? 0 : Math.PI, 7, c); };
    arr(xs * u, P.vS, COL.ink); arr(xa * u, -P.vA, COL.bad);
    poly(ctx, [[0, H], [w, H]], COL.line, 1);
    const fp = this.dop(P), r = fp / P.fS;
    const strip = (y, ratio, c, label) => {
      const B = box({ x: 110, y: y - 14, w: w - 120, h: 28, x0: 0, x1: 1, y0: -1.2, y1: 1.2 });
      txt(ctx, label, 8, y + 4, { size: 11, color: c, weight: 700, mono: true });
      clip(ctx, B, () => poly(ctx, fnPts(s => Math.sin(TAU * 5 * ratio * s - 6 * t), B, 400), c, 1.8));
    };
    strip(H + 26, 1, COL.ink, "f  = " + fm(P.fS, 0) + " Hz");
    strip(H + 66, Math.min(4, Math.max(0.1, r)), COL.bad, "f′ = " + fm(fp, 0) + " Hz");
    txt(ctx, "fronti disegnati con c = 1 casella/s (velocità in scala)", w - 6, H - 6, { size: 10, align: "right" });
  },
  drawPass(ctx, w, h, P, t, L) {
    const X = 60, d = 15, sx = (w - 40) / (2 * X), cx = w / 2, ry = 34, ly = ry + d * sx, per = 2 * X / P.vP + 1;
    let S = fronts(L, "p|" + P.vP, t);
    const tau = (t - S.t0) % per, x = Math.min(X, -X + P.vP * tau);
    poly(ctx, [[10, ry], [w - 10, ry]], COL.ink2, 6); poly(ctx, [[10, ry], [w - 10, ry]], COL.paper || COL.card, 1, [8, 8]);
    const px = cx + x * sx;
    poly(ctx, [[px, ry], [cx, ly]], COL.ink2, 1, [3, 3]);
    dot(ctx, px, ry, 7, COL.ink); txt(ctx, "S", px, ry - 10, { size: 12, weight: 700, color: COL.ink, align: "center" });
    poly(ctx, [[px + 9, ry], [px + 34, ry]], COL.ink, 2); arrowHead(ctx, px + 36, ry, 0, 7, COL.ink);
    ctx.fillStyle = COL.bad; ctx.fillRect(cx - 6, ly - 6, 12, 12); txt(ctx, "A (a " + d + " m dalla strada)", cx + 12, ly + 4, { size: 11, color: COL.bad });
    const fNow = this.passF(P, x);
    txt(ctx, "f′ = " + fm(fNow, 0) + " Hz", w - 8, ly + 22, { size: 13, weight: 700, mono: true, color: COL.ink, align: "right" });
    const fa = this.passF(P, -1e6), fr = this.passF(P, 1e6), pad = (fa - fr) * 0.15 + 5;
    const B = box({ x: 40, y: ly + 40, w: w - 50, h: h - ly - 70, x0: -X, x1: X, y0: fr - pad, y1: fa + pad });
    frame(ctx, B, { xl: "x (m)", ticks: [[-40, "−40"], [-20, "−20"], [0, "0"], [20, "20"]] });
    yTicks(ctx, B, [[fa, fm(fa, 0)], [P.fS, fm(P.fS, 0)], [fr, fm(fr, 0)]]);
    for (const v of [fa, P.fS, fr]) poly(ctx, [[B.x, B.Y(v)], [B.x + B.w, B.Y(v)]], COL.line, 1, [4, 4]);
    clip(ctx, B, () => poly(ctx, fnPts(s => this.passF(P, s), B, 300), COL.pen, 2.2));
    dot(ctx, B.X(x), B.Y(fNow), 4.5, COL.bad);
    txt(ctx, "f′ (Hz) del suono emesso quando S è in x", B.x + 4, B.y - 6, { size: 10 });
  },
  audio: {
    hint: "Parti con il volume basso; il suono si ferma da solo dopo 20 s. Canne: la frequenza del modo (la fondamentale aperta–chiusa, 86 Hz, può non sentirsi dagli altoparlanti del telefono). Battimenti: due oscillatori. Timbro: una sinusoide per armonica. Doppler: la frequenza $f'$. Passata: $f'$ e il volume (che va come $1/r$) cambiano mentre la sorgente ti supera.",
    loud: P => 10 ** (P.lev / 20),
    build(ac, dest, P) {
      const L7 = LABS[7], B = bank(ac, dest, 6);
      const apply = P => {
        const amp = 10 ** (P.lev / 20), A = 0.3 * amp, ch = P.choice;
        if (ch === "pass") {
          const X = 60, d = 15, v = P.vP, Tp = 2 * X / v, per = Tp + 0.8, r0 = Math.hypot(X, d) / C_S, pts = [];
          for (let k = 0; k * per < 22; k++) {
            const tb = k * per + 0.05;
            pts.push([tb, L7.passF(P, -X), 0]);
            for (let i = 0; i <= 60; i++) { const te = i / 60 * Tp, x = -X + v * te, r = Math.hypot(x, d); pts.push([tb + 0.05 + te + r / C_S - r0, L7.passF(P, x), A * d / r]); }
            pts.push([tb + Tp + 0.25, L7.passF(P, X), 0]);
          }
          schedule(B, pts); return;
        }
        let list;
        if (PIPES.includes(ch)) list = [[ch === "tubo" ? 686 : L7.freq(P), A]];
        else if (ch === "batt") list = [[P.f1, A / 2], [P.f1 + P.df, A / 2]];
        else if (ch === "timbro") { const a = L7.amps(P), s = a.reduce((x, y) => x + y, 0) || 1; list = a.map((an, i) => [(i + 1) * P.fT, A * an / s]); }
        else list = [[L7.dop(P), A]];
        B.set(list);
      };
      apply(P);
      return { update: apply, stop: () => B.stop() };
    }
  }
};

/* =====================================================================
   7b · Attenuazione: dB e Lambert–Beer
   ===================================================================== */
LABS["7b"] = {
  c: 7, title: "Attenuazione: dB e Lambert–Beer", h: 360,
  see: "Sorgente puntiforme: in alto l'intensità $I(r)$, in basso il livello $L(r)$ in dB. Tratteggiate le due perdite separate (blu: geometria, verde: assorbimento), continua la loro somma; il punto rosso è la distanza scelta. Strato: un fascio piano che attraversa un mezzo che assorbe.",
  intro: ["Una sorgente puntiforme di potenza $P$ spalma l'energia su una sfera: $I(r)=\\frac{P}{\\Omega r^2}$, qui con $\\Omega=4\\pi$. In decibel ogni raddoppio di $r$ toglie $20\\log_{10}2\\approx6$ dB: è una retta se l'asse $r$ è logaritmico.",
    "Il mezzo inoltre assorbe: $dI=-\\alpha I\\,dz$ dà $I(z)=I_0e^{-\\alpha z}$ (Lambert–Beer). In dB è una perdita proporzionale al cammino, $\\beta r$ con $\\beta=10\\log_{10}(e)\\,\\alpha\\approx4{,}34\\,\\alpha$: è una retta se l'asse $r$ è lineare.",
    "Insieme: $I(r)=\\frac{P}{\\Omega r^2}e^{-\\alpha r}$, cioè $L=L(r)-\\beta r$, dove $L(r)$ è il livello dovuto alla sola geometria."],
  cards: ["7.12", "7.13", "7.14", "7.15", "7.18"], concept: "k.dB",
  choice: { id: "kind", opts: [["lin", "Sorgente, asse r lineare"], ["log", "Sorgente, asse r logaritmico"], ["strato", "Lambert–Beer in uno strato"]], v: "log" },
  params: [
    { id: "L1", label: "Livello a 1 m, solo geometria, $L(1\\,\\mathrm{m})$", min: 40, max: 120, step: 1, v: 90, u: "dB", d: 0, show: c => c !== "strato" },
    { id: "al", label: "Coefficiente di assorbimento $\\alpha$", min: 0, max: 0.5, step: 0.001, v: 0.05, u: "m⁻¹", d: 3 },
    { id: "lr", label: "Distanza dalla sorgente $r$", min: 0, max: 2, step: 0.005, v: 0.30103, u: "", d: -1, fmt: v => f3(10 ** v) + " m", show: c => c !== "strato" },
    { id: "z", label: "Spessore attraversato $z$", min: 0, max: 20, step: 0.05, v: 5, u: "m", d: 2, show: c => c === "strato" }],
  presets: [
    { label: "Solo geometria, r = 10 m", choice: "log", set: { al: 0, lr: 1 } },
    { label: "Tre raddoppi: r = 8 m", choice: "log", set: { al: 0, lr: 0.90309 }, note: "Tre raddoppi di distanza: $3\\times6{,}02\\approx18$ dB in meno." },
    { label: "β ≈ 1 dB/m", choice: "lin", set: { al: 0.23, lr: 1.5 } },
    { label: "Strato: 3 dimezzamenti", choice: "strato", set: { al: 0.2, z: 10.4 }, note: "$z=3\\ln2/\\alpha$: l'intensità si dimezza tre volte, $I/I_0=1/8$." }],
  calc(P) {
    const r = 10 ** P.lr, be = LOG_E * P.al, geo = -20 * Math.log10(r), ab = -be * r;
    return { r, be, geo, ab, L: P.L1 + geo + ab, dbl: 20 * Math.log10(2) + be * r, half: P.al > 0 ? Math.LN2 / P.al : Infinity, Pw: 4 * Math.PI * 1e-12 * 10 ** (P.L1 / 10) };
  },
  readouts(P) {
    const be = LOG_E * P.al, half = P.al > 0 ? f3(Math.LN2 / P.al) + " m" : "∞ (nessun assorbimento)";
    if (P.choice === "strato") {
      const I = Math.exp(-P.al * P.z);
      return [["$I(z)/I_0=e^{-\\alpha z}$", fm(I, 3)], ["Perdita in dB $=-\\beta z$", db(-be * P.z)], ["$\\beta=4{,}34\\,\\alpha$", fm(be, 3) + " dB/m"], ["Spessore di dimezzamento $\\ln2/\\alpha$", half], ["Dimezzamenti in $z$", P.al > 0 ? fm(P.al * P.z / Math.LN2, 2) : "0"]];
    }
    const c = this.calc(P);
    return [["Livello a $r=$ " + f3(c.r) + " m", fm(c.L, 1) + " dB"], ["Geometria $-20\\log_{10}r$", db(c.geo)], ["Assorbimento $-\\beta r$", db(c.ab)],
      ["$\\beta=10\\log_{10}(e)\\,\\alpha$", fm(c.be, 3) + " dB/m"], ["Perdita per raddoppio $r\\to2r$: $6{,}02+\\beta r$", fm(c.dbl, 2) + " dB"], ["Dimezzamento per assorbimento $\\ln2/\\alpha$", half],
      ["Potenza della sorgente $P=4\\pi r^2 I$", c.Pw >= 0.01 ? f3(c.Pw) + " W" : fm(c.Pw * 1e3, c.Pw * 1e3 >= 0.01 ? 3 : 6) + " mW"]];
  },
  missions: [
    { t: "Senza assorbimento ($\\alpha=0$) trova la distanza a cui il livello è sceso di 20 dB rispetto a 1 m.", ok: P => P.choice !== "strato" && P.al === 0 && Math.abs(10 ** P.lr - 10) < 0.3 },
    { t: "Ottieni un assorbimento di $\\beta=1$ dB/m (±0,02).", ok: P => Math.abs(LOG_E * P.al - 1) < 0.02 },
    { t: "Asse logaritmico, $\\alpha=0$: vai a $r=8$ m e controlla che il livello è sceso di circa 18 dB (tre raddoppi).", ok: P => P.choice === "log" && P.al === 0 && Math.abs(10 ** P.lr - 8) < 0.1 },
    { t: "Lambert–Beer: scegli uno spessore pari a 3 spessori di dimezzamento ($I/I_0=1/8$).", ok: P => P.choice === "strato" && P.al > 0 && Math.abs(P.al * P.z / Math.LN2 - 3) < 0.05 },
    { t: "Con $\\alpha=0{,}1\\,\\mathrm{m^{-1}}$ trova la distanza (oltre 10 m) a cui assorbimento e geometria tolgono gli stessi dB.", ok: P => P.choice !== "strato" && Math.abs(P.al - 0.1) < 0.0005 && Math.abs(10 ** P.lr - 90) < 2 }],
  notes: ["Asse logaritmico: la geometria è una retta che scende di 20 dB per decade (−6 dB per raddoppio); l'assorbimento invece si incurva verso il basso.",
    "Asse lineare: è l'assorbimento a essere una retta, di pendenza $-\\beta$; la geometria scende ripida vicino alla sorgente e poi quasi si ferma.",
    "Vicino alla sorgente domina la geometria, lontano l'assorbimento: $20\\log_{10}r$ cresce lentamente, $\\beta r$ linearmente.",
    "Perdita per raddoppio: $6{,}02$ dB $+\\,\\beta r$. Senza assorbimento non dipende da dove sei.",
    "Lo spessore di dimezzamento $\\ln2/\\alpha$ vale sempre $-3{,}01$ dB, qualunque sia $I_0$: l'esponenziale perde la stessa frazione in ogni tratto uguale.",
    "Attenuazione geometrica: l'energia non si perde, si spalma su una sfera più grande. Assorbimento: l'energia meccanica diventa calore (viscosità, urti tra molecole)."],
  draw(ctx, w, h, P) {
    if (P.choice === "strato") return this.drawStrato(ctx, w, h, P);
    const lg = P.choice === "log", c = this.calc(P), be = c.be;
    const ax = r => lg ? Math.log10(r) : r, rr = v => lg ? 10 ** v : v;
    const x0 = lg ? 0 : 0, x1 = lg ? 2 : 100;
    const ticks = lg ? [[0, "1"], [Math.log10(2), "2"], [Math.log10(5), "5"], [1, "10"], [Math.log10(20), "20"], [Math.log10(50), "50"]] : [[0, "0"], [20, "20"], [40, "40"], [60, "60"], [80, "80"]];
    const T = box({ x: 40, y: 22, w: w - 50, h: 92, x0, x1, y0: 0, y1: 1.08 });
    txt(ctx, "I(r) / I₁   (I₁ = intensità a 1 m senza assorbimento)", T.x - 32, 12, { size: 10 });
    frame(ctx, T, {}); yTicks(ctx, T, [[0, "0"], [0.5, "0,5"], [1, "1"]]);
    const Ig = v => { const r = rr(v); return r < 1 ? NaN : 1 / (r * r); }, It = v => { const r = rr(v); return r < 1 ? NaN : Math.exp(-P.al * r) / (r * r); };
    clip(ctx, T, () => { poly(ctx, fnPts(Ig, T, 500), COL.pen, 1.4, [5, 4]); poly(ctx, fnPts(It, T, 500), COL.ink, 2.2); });
    dot(ctx, T.X(ax(c.r)), T.Y(Math.exp(-P.al * c.r) / (c.r * c.r)), 4, COL.bad);
    const B = box({ x: 40, y: 146, w: w - 50, h: h - 146 - 30, x0, x1, y0: P.L1 - 62, y1: P.L1 + 4 });
    txt(ctx, "L(r) in dB:  — totale   - - geometria   - - assorbimento", B.x - 32, B.y - 12, { size: 10 });
    frame(ctx, B, { xl: "r (m)", ticks });
    if (lg) txt(ctx, "asse r logaritmico", B.x + B.w, B.y + B.h - 4, { size: 10, align: "right" });
    yTicks(ctx, B, [[P.L1, fm(P.L1, 0)], [P.L1 - 20, fm(P.L1 - 20, 0)], [P.L1 - 40, fm(P.L1 - 40, 0)], [P.L1 - 60, fm(P.L1 - 60, 0)]]);
    for (const k of [20, 40, 60]) poly(ctx, [[B.x, B.Y(P.L1 - k)], [B.x + B.w, B.Y(P.L1 - k)]], COL.line, 1, [2, 4]);
    const geo = v => { const r = rr(v); return r < 1 ? NaN : P.L1 - 20 * Math.log10(r); };
    const abs = v => { const r = rr(v); return r < 1 ? NaN : P.L1 - be * r; };
    const tot = v => { const r = rr(v); return r < 1 ? NaN : P.L1 - 20 * Math.log10(r) - be * r; };
    clip(ctx, B, () => {
      poly(ctx, fnPts(geo, B, 500), COL.pen, 1.6, [6, 4]);
      if (P.al > 0) poly(ctx, fnPts(abs, B, 500), COL.good, 1.6, [6, 4]);
      poly(ctx, fnPts(tot, B, 500), COL.ink, 2.4);
      if (lg) for (let k = 0, r = 1; r <= 100; k++, r *= 2) { dot(ctx, B.X(ax(r)), B.Y(P.L1 - 20 * Math.log10(r)), 2.6, COL.pen); }
    });
    if (lg) txt(ctx, "punti blu: r = 1, 2, 4, 8 … m, −6 dB ciascuno", B.x + B.w - 4, B.y + 12, { size: 10, align: "right", color: COL.pen });
    else if (P.al > 0) txt(ctx, "assorbimento: retta, pendenza −" + fm(be, 2) + " dB/m", B.x + B.w - 4, B.y + 12, { size: 10, align: "right", color: COL.good });
    const X = B.X(ax(c.r));
    poly(ctx, [[X, B.y], [X, B.y + B.h]], COL.bad, 1, [3, 4]);
    if (c.L >= B.y0) dot(ctx, X, B.Y(c.L), 5, COL.bad);
    txt(ctx, "L = " + fm(c.L, 1) + " dB", Math.min(X + 6, w - 86), B.y + B.h - 18, { size: 11, mono: true, weight: 700, color: COL.bad });
  },
  drawStrato(ctx, w, h, P) {
    const be = LOG_E * P.al, zh = P.al > 0 ? Math.LN2 / P.al : Infinity;
    const S = box({ x: 40, y: 18, w: w - 50, h: 50, x0: 0, x1: 20, y0: 0, y1: 1 });
    ctx.fillStyle = COL.hl5; ctx.fillRect(S.x, S.y - 4, S.w, S.h + 8);
    for (let X = 0; X < S.w; X += 2) { const z = 20 * X / S.w; ctx.fillStyle = rgba(COL.badRGB, 0.9 * Math.exp(-P.al * z)); ctx.fillRect(S.x + X, S.y + 12, 2, S.h - 24); }
    txt(ctx, "I₀", 14, S.y + S.h / 2 + 4, { size: 12, color: COL.bad, weight: 700 });
    arrowHead(ctx, S.x - 2, S.y + S.h / 2, 0, 8, COL.bad);
    const Xz = S.X(P.z); poly(ctx, [[Xz, S.y - 6], [Xz, S.y + S.h + 6]], COL.ink, 2);
    txt(ctx, "z", Xz, S.y + S.h + 17, { size: 11, align: "center", mono: true, weight: 700, color: COL.ink });
    const T = box({ x: 40, y: 104, w: w - 50, h: 104, x0: 0, x1: 20, y0: 0, y1: 1.08 });
    txt(ctx, "I(z)/I₀ = e^(−αz)", T.x, T.y - 8, { size: 11 });
    frame(ctx, T, { ticks: [[5, "5"], [10, "10"], [15, "15"], [20, "20"]] }); yTicks(ctx, T, [[0.25, "¼"], [0.5, "½"], [1, "1"]]);
    for (const v of [0.5, 0.25, 0.125]) poly(ctx, [[T.x, T.Y(v)], [T.x + T.w, T.Y(v)]], COL.line, 1, [2, 4]);
    clip(ctx, T, () => poly(ctx, fnPts(z => Math.exp(-P.al * z), T, 300), COL.ink, 2.4));
    for (let k = 1; k <= 6 && k * zh <= 20; k++) { const X = T.X(k * zh); poly(ctx, [[X, T.Y(0.5 ** k)], [X, T.y + T.h]], COL.pen, 1, [3, 3]); dot(ctx, X, T.Y(0.5 ** k), 3, COL.pen); }
    if (isFinite(zh)) txt(ctx, "dimezzamenti ogni " + f3(zh) + " m", T.x + T.w - 4, T.y + 10, { size: 10, align: "right", color: COL.pen });
    dot(ctx, T.X(P.z), T.Y(Math.exp(-P.al * P.z)), 5, COL.bad);
    const lo = -10 * Math.max(1, Math.ceil(be * 20 / 10));
    const D = box({ x: 40, y: 240, w: w - 50, h: h - 240 - 26, x0: 0, x1: 20, y0: lo, y1: 2 });
    txt(ctx, "perdita in dB: −βz (retta)", D.x, D.y - 8, { size: 11 });
    frame(ctx, D, { xl: "z (m)", ticks: [[5, "5"], [10, "10"], [15, "15"]] }); yTicks(ctx, D, [[0, "0"], [lo / 2, fm(lo / 2, 0)], [lo, fm(lo, 0)]]);
    poly(ctx, [[D.x, D.Y(0)], [D.x + D.w, D.Y(0)]], COL.line, 1);
    clip(ctx, D, () => poly(ctx, fnPts(z => -be * z, D, 50), COL.good, 2.4));
    dot(ctx, D.X(P.z), D.Y(-be * P.z), 5, COL.bad);
    txt(ctx, db(-be * P.z), Math.min(D.X(P.z) + 6, w - 60), D.Y(-be * P.z) - 6, { size: 11, mono: true, weight: 700, color: COL.bad });
  }
};

/* =====================================================================
   5b · Perdite radiative
   ===================================================================== */
const V0 = 1; // velocità impressa alla massa (m/s)
LABS["5b"] = {
  c: 5, title: "Perdite radiative", h: 370,
  see: "Una massa su una molla è attaccata in $x=0$ a una corda infinita. A $t=0$ la corda è dritta e la massa viene colpita ($y(0)=0$, $\\dot y(0)=v_0=1$ m/s): guarda le onde che partono verso destra e verso sinistra, il grafico $y(t)$ con l'inviluppo $e^{-\\gamma t}$ e la barra dell'energia.",
  intro: ["La corda tira la massa con le tensioni dei due lati. Le onde sono solo uscenti, $\\psi(x,t)=y(t-|x|/v)$, quindi in $x=0$ ogni lato dà una forza $-\\frac{T_0}{v}\\dot y$: in tutto $-\\frac{2T_0}{v}\\dot y$, una forza viscosa.",
    "L'equazione è quella dello smorzato: $\\ddot y+2\\gamma\\dot y+\\omega_0^2y=0$ con $\\omega_0^2=K/m$ e $\\gamma=\\frac{T_0}{mv}$. Non c'è attrito: l'energia non diventa calore, viene portata via dalle onde (perdita radiativa).",
    "Con $y(0)=0$ e $\\dot y(0)=v_0$ la soluzione è $y(t)=\\frac{v_0}{\\omega}e^{-\\gamma t}\\sin(\\omega t)$, con $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$. Si può scrivere $\\gamma=Z/m$, con l'impedenza della corda $Z=\\sqrt{T_0\\rho_L}=T_0/v$."],
  cards: ["5.12", "5.13", "5.10", "2.1"], concept: "k.radiative",
  params: [
    { id: "K", label: "Costante della molla $K$", min: 1, max: 200, step: 1, v: 40, u: "N/m", d: 0 },
    { id: "m", label: "Massa $m$", min: 0.1, max: 5, step: 0.05, v: 1, u: "kg", d: 2 },
    { id: "T0", label: "Tensione della corda $T_0$", min: 1, max: 50, step: 0.5, v: 10, u: "N", d: 1 },
    { id: "lr", label: "Densità lineare $\\rho_L$", min: -2.5, max: 0.5, step: 0.01, v: -1, u: "", d: -1, fmt: v => f3(10 ** v) + " kg/m" }],
  presets: [
    { label: "Corda leggera: smorza poco", set: { K: 40, m: 1, T0: 10, lr: -2 }, note: "$Z=\\sqrt{T_0\\rho_L}=0{,}32$ kg/s: $Q\\approx10$." },
    { label: "Smorzamento critico", set: { K: 40, m: 1, T0: 20, lr: 0.30103 }, note: "$Z=\\sqrt{40}\\approx6{,}3$ kg/s $=\\sqrt{Km}$, quindi $\\gamma=\\omega_0$." },
    { label: "Corda pesante: sovrasmorzato", set: { K: 40, m: 0.5, T0: 50, lr: 0.30103 } },
    { label: "Massa grande: dura a lungo", set: { K: 100, m: 5, T0: 10, lr: -1 } }],
  calc(P) {
    const rho = 10 ** P.lr, v = Math.sqrt(P.T0 / rho), Z = Math.sqrt(P.T0 * rho), g = P.T0 / (P.m * v), w0 = Math.sqrt(P.K / P.m);
    const reg = Math.abs(g - w0) <= 0.03 * w0 ? "crit" : g < w0 ? "sotto" : "sovra";
    return { rho, v, Z, g, w0, reg, w: reg === "sotto" ? Math.sqrt(w0 * w0 - g * g) : 0, s: reg === "sovra" ? Math.sqrt(g * g - w0 * w0) : 0 };
  },
  yv(c, t) {   // [y, ẏ] per y(0)=0, ẏ(0)=V0
    if (t <= 0) return [0, t === 0 ? V0 : 0];
    const e = Math.exp(-c.g * t);
    if (c.reg === "sotto") { const sn = Math.sin(c.w * t), cs = Math.cos(c.w * t); return [V0 / c.w * e * sn, V0 * e * (cs - c.g / c.w * sn)]; }
    if (c.reg === "crit") return [V0 * t * e, V0 * e * (1 - c.g * t)];
    const sh = Math.sinh(c.s * t), ch = Math.cosh(c.s * t); return [V0 / c.s * e * sh, V0 * e * (ch - c.g / c.s * sh)];
  },
  readouts(P) {
    const c = this.calc(P), name = { sotto: "sottosmorzato", crit: "critico", sovra: "sovrasmorzato" }[c.reg];
    return [["$v=\\sqrt{T_0/\\rho_L}$", f3(c.v) + " m/s"], ["Impedenza $Z=\\sqrt{T_0\\rho_L}=T_0/v$", f3(c.Z) + " kg/s"], ["$\\omega_0=\\sqrt{K/m}$", f3(c.w0) + " rad/s"],
      ["$\\gamma=\\frac{T_0}{mv}=\\frac{Z}{m}$", f3(c.g) + " s⁻¹"], ["$\\tau=1/\\gamma$", f3(1 / c.g) + " s"], ["$Q\\approx\\omega_0/(2\\gamma)$", f3(c.w0 / (2 * c.g))], ["Regime", name]];
  },
  missions: [
    { t: "Fai durare l'oscillazione: $\\tau=1/\\gamma$ di almeno 5 s.", ok: P => { const c = LABS["5b"].calc(P); return c.reg === "sotto" && 1 / c.g >= 5; } },
    { t: "Rendi la corda così 'frenante' che la massa non oscilla più ($\\gamma\\ge\\omega_0$).", ok: P => LABS["5b"].calc(P).reg !== "sotto" },
    { t: "Ottieni un fattore di qualità $Q\\approx10$ (±0,5).", ok: P => { const c = LABS["5b"].calc(P); return Math.abs(c.w0 / (2 * c.g) - 10) < 0.5; } },
    { t: "Con $T_0=40$ N ottieni un'impedenza $Z=1$ kg/s (±3%): cambia $v$, ma lo smorzamento dipende solo da $Z/m$.", ok: P => P.T0 >= 39.5 && P.T0 <= 40.5 && Math.abs(LABS["5b"].calc(P).Z - 1) < 0.03 }],
  notes: ["Davanti al fronte $|x|=vt$ la corda è ancora ferma: il disturbo viaggia a velocità $v$.",
    "Un punto della corda a distanza $|x|$ ripete il moto della massa con ritardo $|x|/v$: lontano vedi le oscillazioni di prima, più ampie.",
    "Conta l'impedenza $Z=\\sqrt{T_0\\rho_L}$: corda più tesa o più densa, smorzamento più forte. Massa più grande, smorzamento più debole ($\\gamma=Z/m$).",
    "Potenza irradiata: le due onde portano via $2\\frac{T_0}{v}\\dot y^2=2\\gamma m\\dot y^2$, la stessa potenza persa da un oscillatore smorzato.",
    "Se $\\gamma\\ge\\omega_0$ la massa sale e torna a zero senza oscillare: la corda la frena troppo.",
    "Errore tipico: scrivere $\\omega_0$ al posto di $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$ nella soluzione; la differenza si vede quando $\\gamma$ non è piccolo."],
  draw(ctx, w, h, P, t, L) {
    const c = this.calc(P), key = [P.K, P.m, P.T0, P.lr].join("|");
    let S = L.state;
    if (!S || S.key !== key) {
      const Tl = Math.min(16, Math.max(3, 5 / c.g, 3 * TAU / c.w0));
      let ym = 1e-9; for (let i = 1; i <= 400; i++) ym = Math.max(ym, Math.abs(this.yv(c, Tl * i / 400)[0]));
      S = L.state = { key, t0: t, Tl, ym, Xr: c.v * Math.min(Tl, 3 * TAU / c.w0) };
    }
    const tt = (t - S.t0) % (S.Tl + 0.8), ts = Math.min(tt, S.Tl);
    const cx = w / 2, cy = 92, Amp = 42, sc = Amp / S.ym;
    const [y, yd] = this.yv(c, ts);
    // soffitto, molla, corda
    ctx.fillStyle = COL.line; ctx.fillRect(cx - 26, 4, 52, 5);
    const my = cy - y * sc;
    vspring(ctx, cx, 9, my - 9, 8, 6, COL.ink);
    const Xr = S.Xr, X = x => cx + x / Xr * (w / 2 - 12);
    const psi = x => ts - Math.abs(x) / c.v > 0 ? this.yv(c, ts - Math.abs(x) / c.v)[0] : 0;
    const pts = []; for (let i = 0; i <= 400; i++) { const x = -Xr + 2 * Xr * i / 400; pts.push([X(x), cy - psi(x) * sc]); }
    poly(ctx, [[12, cy], [w - 12, cy]], COL.line, 1, [4, 4]);
    poly(ctx, pts, COL.hl4, 7); poly(ctx, pts, COL.ink, 2);
    ctx.fillStyle = COL.pen; ctx.fillRect(cx - 9, my - 9, 18, 18); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5; ctx.strokeRect(cx - 9, my - 9, 18, 18);
    const xf = c.v * ts;
    if (xf < Xr) for (const s of [-1, 1]) { const Xf = X(s * xf); poly(ctx, [[Xf, cy - 30], [Xf, cy + 30]], COL.bad, 1, [3, 3]); }
    txt(ctx, xf < Xr ? "fronte a |x| = vt" : "il fronte è uscito: la corda è infinita", w - 8, 16, { size: 10, align: "right", color: COL.bad });
    for (const s of [-1, 1]) { const x0 = cx + s * (w / 2 - 40); poly(ctx, [[x0, cy + 40], [x0 + s * 22, cy + 40]], COL.pen, 2); arrowHead(ctx, x0 + s * 24, cy + 40, s > 0 ? 0 : Math.PI, 7, COL.pen); }
    txt(ctx, "v = " + f3(c.v) + " m/s", w - 10, cy + 56, { size: 10, align: "right", mono: true });
    txt(ctx, "|x| ≤ " + f3(Xr) + " m", 10, cy + 56, { size: 10, mono: true });
    // grafico y(t)
    const B = box({ x: 34, y: 176, w: w - 44, h: 116, x0: 0, x1: S.Tl, y0: -1.15 * S.ym, y1: 1.15 * S.ym });
    const tk = []; const st = S.Tl > 10 ? 4 : S.Tl > 5 ? 2 : 1; for (let k = st; k < S.Tl; k += st) tk.push([k, String(k)]);
    frame(ctx, B, { xl: "t (s)", yl: "y", ticks: tk });
    clip(ctx, B, () => {
      if (c.reg === "sotto") { const A = V0 / c.w; poly(ctx, fnPts(s => A * Math.exp(-c.g * s), B), COL.ink2, 1.2, [5, 5]); poly(ctx, fnPts(s => -A * Math.exp(-c.g * s), B), COL.ink2, 1.2, [5, 5]); }
      poly(ctx, fnPts(s => this.yv(c, s)[0], B, 500), COL.pen, 2.2);
    });
    dot(ctx, B.X(ts), B.Y(y), 4.5, COL.bad);
    if (c.reg === "sotto") txt(ctx, "- - inviluppo ±(v₀/ω)e^(−γt)", B.x + B.w - 4, B.y + 10, { size: 10, align: "right" });
    // barra dell'energia
    const E0 = 0.5 * P.m * V0 * V0, Em = Math.min(E0, 0.5 * P.m * yd * yd + 0.5 * P.K * y * y), f = Em / E0;
    const bx = 34, by = h - 46, bw = w - 44, bh = 14;
    txt(ctx, "energia: nella massa (blu) e portata via dalle onde (rosso)", bx, by - 6, { size: 11 });
    ctx.fillStyle = COL.pen; ctx.fillRect(bx, by, bw * f, bh);
    ctx.fillStyle = rgba(COL.badRGB, 0.55); ctx.fillRect(bx + bw * f, by, bw * (1 - f), bh);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1; ctx.strokeRect(bx, by, bw, bh);
    txt(ctx, fm(100 * f, 0) + "% nella massa · " + fm(100 * (1 - f), 0) + "% irradiata", bx, by + bh + 14, { size: 11, mono: true, color: COL.ink });
  }
};

/* =====================================================================
   5c · La frusta
   ===================================================================== */
const WL = 2; // lunghezza della frusta (m)
LABS["5c"] = {
  c: 5, title: "La frusta", h: 340,
  see: "In alto la frusta, spessa al manico e sottile in punta, con l'impulso che corre verso la punta (al rallentatore). In basso la velocità locale $v(x)=\\sqrt{T/\\rho_L(x)}$ in scala logaritmica, con la linea della velocità del suono, 343 m/s.",
  intro: ["La frusta si assottiglia: sezione e densità lineare $\\rho_L$ calano continuamente dal manico alla punta. Su una corda tesa $v=\\sqrt{T/\\rho_L}$: dove $\\rho_L\\to0$ la velocità cresce enormemente.",
    "Ogni tratto dell'impulso avanza con la velocità del punto in cui si trova: $\\frac{dx}{dt}=v(x)$, quindi il tempo per arrivare in $x$ è $t=\\int_0^x\\frac{dx'}{v(x')}$.",
    "Quando in punta $v$ supera la velocità del suono, lo schiocco è un vero boom sonico. Gli appunti aggiungono che l'energia impressa si conserva, ma si muove su una massa sempre più piccola."],
  cards: ["5.1", "5.14"], concept: "k.frusta",
  choice: { id: "prof", opts: [["con", "Frusta conica"], ["exp", "Densità esponenziale"]], v: "con" },
  params: [
    { id: "T", label: "Tensione $T$", min: 10, max: 300, step: 1, v: 100, u: "N", d: 0 },
    { id: "r0", label: "Densità al manico $\\rho_{manico}$", min: 0.02, max: 0.5, step: 0.01, v: 0.1, u: "kg/m", d: 2 },
    { id: "lq", label: "Rapporto $\\rho_{punta}/\\rho_{manico}$", min: -4, max: 0, step: 0.01, v: -1, u: "", d: -1, fmt: v => { const q = 10 ** v; return q >= 0.01 ? fm(q, q >= 0.1 ? 2 : 3) : "1/" + fm(1 / q, 0); } }],
  presets: [
    { label: "Uniforme: niente schiocco", set: { lq: 0 } },
    { label: "Punta 100 volte più leggera", set: { T: 100, r0: 0.1, lq: -2 } },
    { label: "Punta 10 000 volte più leggera", set: { T: 100, r0: 0.1, lq: -4 }, note: "In punta $v=100\\,v_{manico}\\approx3200$ m/s: ben oltre il suono." }],
  calc(P) {
    const q = 10 ** P.lq, s = Math.sqrt(q), v0 = Math.sqrt(P.T / P.r0), ex = P.choice === "exp";
    const d = u => ex ? q ** (u / 2) : 1 - (1 - s) * u;            // diametro relativo, ρ ∝ d²
    const v = u => v0 / d(u);
    const g = u => ex ? (q > 0.9999 ? u : (q ** (u / 2) - 1) / (Math.log(q) / 2)) : u - (1 - s) * u * u / 2;   // ∫ du / (v/v0)
    const vt = v0 / s, ttip = WL / v0 * g(1);
    let us = null; if (vt > C_S) { const ds = v0 / C_S; us = ex ? 2 * Math.log(ds) / Math.log(q) : (1 - ds) / (1 - s); }
    return { q, s, v0, vt, d, v, g, ttip, us };
  },
  readouts(P) {
    const c = this.calc(P);
    return [["$v_{manico}=\\sqrt{T/\\rho_{manico}}$", f3(c.v0) + " m/s"], ["$v_{punta}=v_{manico}\\sqrt{\\rho_{manico}/\\rho_{punta}}$", f3(c.vt) + " m/s"], ["$\\rho_{punta}$", (P.r0 * c.q >= 0.001 ? fm(P.r0 * c.q, 4) : fm(P.r0 * c.q * 1e3, 3) + "·10⁻³") + " kg/m"],
      ["Supera 343 m/s in", c.us === null ? "mai: niente schiocco" : "$x^*=$ " + fm(c.us * WL, 2) + " m (su 2 m)"], ["Tempo vero per arrivare in punta", fm(c.ttip * 1000, 1) + " ms"]];
  },
  missions: [
    { t: "Fai schioccare la frusta: in punta $v$ deve superare 343 m/s.", ok: P => LABS["5c"].calc(P).vt > C_S },
    { t: "Frusta uniforme ($\\rho_{punta}=\\rho_{manico}$): la velocità resta costante.", ok: P => P.lq > -0.005 },
    { t: "Fai diventare la velocità in punta 10 volte quella al manico.", ok: P => { const c = LABS["5c"].calc(P); return Math.abs(c.vt / c.v0 - 10) < 0.25; } },
    { t: "Supera il suono prima di metà frusta ($x^*<1$ m).", ok: P => { const c = LABS["5c"].calc(P); return c.us !== null && c.us * WL < 1; } }],
  notes: ["$v_{punta}/v_{manico}=\\sqrt{\\rho_{manico}/\\rho_{punta}}$ dipende solo dalle densità agli estremi, non dal profilo: per avere $\\times10$ serve $\\rho_L$ cento volte più piccola.",
    "Il profilo decide **dove** si supera il suono e quanto tempo impiega l'impulso ad arrivare in punta.",
    "Raddoppiando $T$ tutte le velocità aumentano di $\\sqrt2$.",
    "Frusta conica: il diametro cala linearmente, quindi $\\rho_L\\propto d^2$. Profilo esponenziale: $\\rho_L$ si divide per lo stesso fattore in ogni tratto uguale.",
    "L'impulso è disegnato con altezza costante e forma schematica: qui conta solo la velocità con cui avanza."],
  draw(ctx, w, h, P, t) {
    const c = this.calc(P), x0 = 40, x1 = w - 16, cy = 66, Xu = u => x0 + (x1 - x0) * u;
    const run = 3.6, per = 5, tau = t % per, tr = Math.min(1, tau / run) * c.ttip;
    // trova u con g(u) = v0 t / L
    const target = c.v0 * tr / WL; let lo = 0, hi = 1; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (c.g(m) < target) lo = m; else hi = m; }
    const up = tau >= run ? 1 : lo;
    ctx.fillStyle = COL.ink; ctx.fillRect(6, cy - 9, x0 - 6, 18);
    txt(ctx, "manico", 6, cy + 24, { size: 10 }); txt(ctx, "punta", x1, cy + 24, { size: 10, align: "right" });
    const A = 22, sig = 0.045, N = 160;
    let prev = null;
    for (let i = 0; i <= N; i++) {
      const u = i / N, yy = cy - A * Math.exp(-(((u - up) / sig) ** 2)), p = [Xu(u), yy];
      if (prev) poly(ctx, [prev, p], COL.ink, Math.max(0.8, 1 + 7 * c.d(u - 0.5 / N)));
      prev = p;
    }
    dot(ctx, Xu(up), cy - A, 3, COL.bad);
    if (c.us !== null && up >= c.us) {
      const tx = Xu(1);
      for (const r of [8, 14, 20]) { ctx.beginPath(); ctx.arc(tx, cy - A * Math.exp(-(((1 - up) / sig) ** 2)), r, 0, TAU); ctx.strokeStyle = rgba(COL.badRGB, 1 - r / 26); ctx.lineWidth = 2; ctx.stroke(); }
      txt(ctx, "schiocco!", tx - 4, 14, { size: 13, weight: 700, color: COL.bad, align: "right" });
    }
    txt(ctx, "rallentato ×" + Math.round(run / c.ttip), x0, 14, { size: 10, mono: true });
    // grafico v(x), scala log
    const B = box({ x: 46, y: 118, w: w - 58, h: h - 118 - 34, x0: 0, x1: WL, y0: 0.5, y1: 4 });
    frame(ctx, B, { xl: "x (m)", ticks: [[0.5, "0,5"], [1, "1"], [1.5, "1,5"]] });
    yTicks(ctx, B, [[1, "10"], [2, "100"], [3, "1000"], [4, "10⁴"]]);
    txt(ctx, "v (m/s), scala log", B.x + 4, B.y + 10, { size: 10, mono: true });
    const ys = Math.log10(C_S);
    poly(ctx, [[B.x, B.Y(ys)], [B.x + B.w, B.Y(ys)]], COL.bad, 1.4, [6, 4]);
    txt(ctx, "suono 343 m/s", B.x + B.w - 4, B.Y(ys) - 5, { size: 10, align: "right", color: COL.bad });
    clip(ctx, B, () => poly(ctx, fnPts(x => Math.log10(c.v(x / WL)), B, 300), COL.pen, 2.4));
    if (c.us !== null) { const X = B.X(c.us * WL); poly(ctx, [[X, B.Y(ys)], [X, B.y + B.h]], COL.bad, 1, [3, 3]); dot(ctx, X, B.Y(ys), 4.5, COL.bad); txt(ctx, "x* = " + fm(c.us * WL, 2) + " m", X - 4, B.Y(ys) + 16, { size: 10, align: X > B.x + 60 ? "right" : "left", mono: true, color: COL.bad }); }
    dot(ctx, B.X(up * WL), B.Y(Math.log10(c.v(up))), 4, COL.ink);
  }
};

/* =====================================================================
   9 · Effetto Doppler e cono di Mach (riscritto, con Cherenkov)
   ===================================================================== */
const OLD9 = LABS[9];
LABS[9] = {
  c: 9, title: "Effetto Doppler e cono di Mach", h: 260,
  see: "I cerchi sono i fronti emessi a intervalli regolari dalla sorgente (punto), che si muove verso destra. Suono: oltre $c$ compare il cono di Mach. Cherenkov: una particella carica in un mezzo di indice $n$; i fronti di luce viaggiano a $c/n$ e il cono compare se la particella va più veloce di loro.",
  intro: [OLD9.intro[0], OLD9.intro[1],
    "Lo stesso inviluppo vale per la luce (effetto Cherenkov): in un mezzo di indice $n$ la luce va a $c/n$. Una particella carica più veloce, $v>c/n$, lascia indietro i fronti e forma un cono luminoso con $\\sin\\alpha=\\frac{c}{nv}$. La particella non supera mai $c$: supera la luce **nel mezzo**."],
  cards: ["9.1", "9.3", "9.5", "9.6"], concept: "k.cherenkov",
  choice: { id: "kind", opts: [["suono", "Suono: Doppler e Mach"], ["cher", "Luce: Cherenkov"]], v: "suono" },
  params: [
    Object.assign({}, OLD9.params[0], { show: c => c === "suono" }),
    { id: "n", label: "Indice di rifrazione del mezzo $n$", min: 1, max: 2.5, step: 0.01, v: 1.33, u: "", d: 2, show: c => c === "cher" },
    { id: "bc", label: "Velocità della particella $\\beta=v/c$", min: 0.3, max: 0.999, step: 0.001, v: 0.9, u: "", d: 3, show: c => c === "cher" }],
  presets: [
    { label: "Mach 2: cono di 30°", choice: "suono", set: { b: 2 } },
    { label: "Acqua, β = 0,99", choice: "cher", set: { n: 1.33, bc: 0.99 } },
    { label: "Acqua, sotto soglia", choice: "cher", set: { n: 1.33, bc: 0.7 }, note: "$\\beta=0{,}7<1/n=0{,}75$: niente cono." }],
  readouts(P) {
    if (P.choice !== "cher") return OLD9.readouts.call(this, P);
    const th = 1 / P.n, on = P.bc > th;
    return [["Luce nel mezzo $c/n$", fm(th, 3) + " c ≈ " + fm(3e5 * th / 1000, 0) + "·10³ km/s"], ["Soglia: $\\beta>1/n$", fm(th, 3) + (on ? " (superata)" : " (non superata)")],
      ["Semiapertura $\\sin\\alpha=\\frac{c}{nv}=\\frac{1}{n\\beta}$", on ? fm(deg(Math.asin(1 / (P.n * P.bc))), 1) + "°" : "nessun cono"]];
  },
  missions: [
    { t: OLD9.missions[0].t, ok: P => P.choice !== "cher" && OLD9.missions[0].ok(P) },
    { t: OLD9.missions[1].t, ok: P => P.choice !== "cher" && OLD9.missions[1].ok(P) },
    { t: OLD9.missions[2].t, ok: P => P.choice !== "cher" && OLD9.missions[2].ok(P) },
    { t: "Cherenkov in acqua ($n=1{,}33$): trova la soglia, con $\\beta$ appena sopra $1/n$ (entro 0,01).", ok: P => P.choice === "cher" && Math.abs(P.n - 1.33) < 0.005 && P.bc > 1 / P.n && P.bc - 1 / P.n < 0.01 },
    { t: "Cherenkov: con una particella velocissima ($\\beta\\ge0{,}9$) fai sparire il cono scegliendo il mezzo.", ok: P => P.choice === "cher" && P.bc >= 0.9 && P.bc * P.n < 1 },
    { t: "Cherenkov: ottieni un cono con semiapertura di 45° (±1°).", ok: P => P.choice === "cher" && P.bc * P.n > 1 && Math.abs(deg(Math.asin(1 / (P.n * P.bc))) - 45) < 1 }],
  notes: [OLD9.notes[0], OLD9.notes[1], OLD9.notes[2],
    "Cherenkov: è la stessa geometria di Mach con $c/n$ al posto della velocità del suono: $\\sin\\alpha=\\frac{c/n}{v}=\\frac{1}{n\\beta}$.",
    "In acqua ($n=1{,}33$) la soglia è $\\beta=1/n\\approx0{,}75$. Più grande è $n$, più è facile superarla e più il cono si apre.",
    "Nel vuoto ($n=1$) il cono non c'è mai: servirebbe $v>c$."],
  reset(L) { L.state = null; },
  draw(ctx, w, h, P, t, L) {
    const cher = P.choice === "cher", b = cher ? P.bc : P.b, cw = cher ? 1 / P.n : 1;
    let S = L.state; const key = P.choice + "|" + b + "|" + cw;
    if (!S || S.key !== key) S = L.state = { key, t0: t, fronts: [], last: -1e9 };
    const u = w / 10, cy = h / 2;
    let xs = 0.8 + b * (t - S.t0);
    if (xs > 10.8 || (t - S.t0) > 30) { S = L.state = { key, t0: t, fronts: [], last: -1e9 }; xs = 0.8; }
    if (t - S.last >= 0.5) { S.fronts.push({ x: xs, te: t }); S.last = t; }
    S.fronts = S.fronts.filter(f => t - f.te < 14 / cw);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    for (const f of S.fronts) {
      const R = (t - f.te) * u * cw; if (R < 1) continue;
      ctx.beginPath(); ctx.arc(f.x * u, cy, R, 0, TAU); ctx.strokeStyle = rgba(COL.penRGB, 0.8); ctx.lineWidth = 1.8; ctx.stroke();
    }
    if (b > cw) {
      const th = Math.asin(cw / b), Lc = 14 * u;
      poly(ctx, [[xs * u, cy], [xs * u - Lc * Math.cos(th), cy - Lc * Math.sin(th)]], COL.bad, 2.4);
      poly(ctx, [[xs * u, cy], [xs * u - Lc * Math.cos(th), cy + Lc * Math.sin(th)]], COL.bad, 2.4);
    }
    ctx.restore();
    dot(ctx, xs * u, cy, 6, cher ? COL.bad : COL.ink);
    if (cher) txt(ctx, "+", xs * u, cy + 4, { size: 11, weight: 700, color: COL.card, align: "center" });
    txt(ctx, "← dietro", 8, 16, { size: 12, weight: 700 }); txt(ctx, "davanti →", w - 8, 16, { size: 12, weight: 700, align: "right" });
    if (cher) txt(ctx, "n = " + fm(P.n, 2) + "   β = " + fm(P.bc, 3) + "   soglia 1/n = " + fm(1 / P.n, 3), 8, h - 8, { size: 11, mono: true, color: COL.ink });
  },
  audio: {
    hint: "Suono: senti una sorgente a 300 Hz che arriva (frequenza davanti) e poi si allontana (frequenza dietro), a ripetizione. Oltre $c$ davanti non arriva niente prima del cono. Cherenkov: è luce, non c'è suono.",
    loud: P => P.choice === "cher" ? 0 : 0.6,
    build(ac, dest, P) {
      const B = bank(ac, dest, 1);
      const apply = P => {
        const f = 300, A = 0.18, pts = [];
        const fa = P.b < 1 ? f / (1 - P.b) : Infinity, fr = f / (1 + P.b);
        for (let k = 0; k < 9; k++) {
          const t0 = k * 2.4 + 0.02;
          if (P.choice === "cher") { pts.push([t0, f, 0]); continue; }
          const ok = isFinite(fa) && fa <= 2000;
          pts.push([t0, ok ? fa : fr, 0], [t0 + 0.04, ok ? fa : fr, ok ? A : 0], [t0 + 1.16, ok ? fa : fr, ok ? A : 0], [t0 + 1.2, fr, 0], [t0 + 1.24, fr, A], [t0 + 2.3, fr, A], [t0 + 2.36, fr, 0]);
        }
        schedule(B, pts);
      };
      apply(P);
      return { update: apply, stop: () => B.stop() };
    }
  }
};
})();

for (const k of Object.keys(LAB_META)) if (LABS[k]) for (const [f, v] of Object.entries(LAB_META[k])) if (LABS[k][f] === undefined) LABS[k][f] = v;
