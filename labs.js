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
  1: { c: 1, cards: ["1.2", "1.5", "1.9", "1.10"], see: "In alto la massa sulla molla, con le barre di energia cinetica e potenziale. In basso la legge oraria $x(t)$: il punto rosso è l'istante attuale." },
  2: { c: 2, cards: ["2.1", "2.2", "2.5", "2.10"], see: "La curva blu è $x(t)$ per una massa lasciata ferma in $x_0=1$; le linee tratteggiate sono l'inviluppo $\\pm e^{-\\gamma t}$. In alto a destra il regime attuale." },
  3: { c: 3, cards: ["3.3", "3.4", "3.5", "3.6"], see: "In alto la curva di risonanza $B(\\omega_F)$ con il punto rosso sulla frequenza scelta. In basso forza (tratteggiata) e spostamento a regime: guarda lo sfasamento." },
  4: { c: 4, cards: ["4.2", "4.3", "4.4", "4.5"], see: "Due pendoli uniti da una molla; sotto, le loro posizioni negli ultimi 20 s. Se parte un solo pendolo vedi l'energia passare dall'uno all'altro." },
  5: { c: 5, cards: ["5.1", "5.4", "5.6", "5.8"], see: "In alto una fotografia della corda a $t$ fisso; in basso la storia nel tempo del punto rosso in $x=2$ m." },
  6: { c: 6, cards: ["6.2", "6.3", "6.4", "6.5"], see: "Un impulso arriva da sinistra sulla giunzione tra due corde ($x=0$, linea tratteggiata): guarda la parte riflessa e quella trasmessa." },
  7: { c: 7, cards: ["7.2", "7.5", "7.16", "7.17"], see: "In alto le particelle d'aria nel tubo: ogni colonna di puntini oscilla lungo $x$. Sotto, spostamento e pressione lungo la canna." },
  8: { c: 8, cards: ["8.2", "8.4", "7.13"], see: "Fronti d'onda che partono dalla sorgente; il quadratino rosso è il rivelatore e la barra verde l'intensità che misura." },
  9: { c: 9, cards: ["9.1", "9.3", "9.5"], see: "I cerchi sono i fronti emessi a intervalli regolari dalla sorgente (punto nero), che si muove verso destra. Oltre $c$ compare il cono rosso." },
  10: { c: 10, cards: ["10.5", "10.6", "10.7", "10.8"], see: "A sinistra il campo delle due onde (chiaro = cresta, scuro = ventre); a destra l'intensità media sullo schermo." },
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

for (const k of Object.keys(LAB_META)) if (LABS[k]) for (const [f, v] of Object.entries(LAB_META[k])) if (LABS[k][f] === undefined) LABS[k][f] = v;
