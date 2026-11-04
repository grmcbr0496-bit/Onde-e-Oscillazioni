"use strict";
/* Onde & Formule — formulario: capitoli, schede e concetti. File generato: modificare i sorgenti e ricostruire, oppure modificare qui con cura. */
const CHAPTERS = [
 "Oscillatore armonico",
 "Oscillatore smorzato",
 "Oscillatore forzato",
 "Più gradi di libertà",
 "Corda e D'Alembert",
 "Riflessione e trasmissione",
 "Onde acustiche",
 "Onde in 3D",
 "Doppler e Mach",
 "Interferenza",
 "Diffrazione e reticoli",
 "Ottica geometrica"
];

/* Scheda: id, c (capitolo), n (nome), q (domanda), t (formula con @@ al posto del pezzo da trovare), a (pezzo giusto),
   d (3 distrattori della stessa scheda), h (nota), sym (simboli), val (validità), err (errore tipico), lab, rel (schede collegate), pdf (pagine degli appunti). */
const CARDS = [
 {
  "id": "1.1",
  "c": 1,
  "n": "Equazione del moto",
  "q": "Equazione del moto dell'oscillatore armonico, scritta con ω₀",
  "t": "\\ddot{x} + @@ = 0,\\qquad \\omega_0^2 = \\frac{\\alpha}{m}",
  "a": "\\omega_0^2\\,x",
  "d": [
   "\\omega_0\\,x",
   "\\omega_0^2\\,\\dot{x}",
   "\\frac{m}{\\alpha}\\,x"
  ],
  "h": "Forza di richiamo F = −αx. Per piccole oscillazioni attorno a un minimo del potenziale α = U″(x₀)."
 },
 {
  "id": "1.2",
  "c": 1,
  "n": "Pulsazione propria",
  "q": "Pulsazione propria ω₀ per una forza di richiamo F = −αx",
  "t": "\\omega_0 = @@",
  "a": "\\sqrt{\\frac{\\alpha}{m}}",
  "d": [
   "\\sqrt{\\frac{m}{\\alpha}}",
   "\\frac{\\alpha}{m}",
   "2\\pi\\sqrt{\\frac{\\alpha}{m}}"
  ],
  "h": "α = U″(x₀), la curvatura del potenziale nel minimo. Molla: α = k; pendolo: α = mg/l."
 },
 {
  "id": "1.3",
  "c": 1,
  "n": "Soluzione generale",
  "q": "Soluzione generale dell'oscillatore armonico, nelle due forme",
  "t": "x(t) = A\\cos(\\omega_0 t) + B\\sin(\\omega_0 t) = @@",
  "a": "C\\cos(\\omega_0 t + \\varphi)",
  "d": [
   "C\\cos(\\omega_0 t) + \\varphi",
   "C\\,e^{-\\omega_0 t}\\cos\\varphi",
   "C\\cos(\\omega_0 t)\\sin\\varphi"
  ],
  "h": "Due costanti arbitrarie, fissate dalle due condizioni iniziali."
 },
 {
  "id": "1.4",
  "c": 1,
  "n": "Periodo e frequenza",
  "q": "Relazioni tra periodo T, frequenza ν e pulsazione ω₀",
  "t": "T = @@,\\qquad \\nu = \\frac{1}{T},\\qquad \\omega_0 = 2\\pi\\nu",
  "a": "\\frac{2\\pi}{\\omega_0}",
  "d": [
   "\\frac{1}{\\omega_0}",
   "2\\pi\\,\\omega_0",
   "\\frac{\\omega_0}{2\\pi}"
  ],
  "h": "ω₀ in rad/s, ν in Hz. Errore classico: T = 1/ω₀."
 },
 {
  "id": "1.5",
  "c": 1,
  "n": "Massa–molla",
  "q": "Pulsazione e periodo del sistema massa–molla",
  "t": "\\omega_0 = \\sqrt{\\frac{k}{m}},\\qquad T = @@",
  "a": "2\\pi\\sqrt{\\frac{m}{k}}",
  "d": [
   "2\\pi\\sqrt{\\frac{k}{m}}",
   "\\sqrt{\\frac{m}{k}}",
   "\\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}"
  ],
  "h": "Caso α = k. Controllo: √(kg/(N/m)) = s."
 },
 {
  "id": "1.6",
  "c": 1,
  "n": "Pendolo semplice",
  "q": "Pendolo semplice per piccoli angoli: equazione e periodo",
  "t": "\\ddot{\\vartheta} + \\frac{g}{l}\\,\\vartheta = 0,\\qquad T = @@",
  "a": "2\\pi\\sqrt{\\frac{l}{g}}",
  "d": [
   "2\\pi\\sqrt{\\frac{g}{l}}",
   "2\\pi\\sqrt{\\frac{l}{mg}}",
   "\\sqrt{\\frac{l}{g}}"
  ],
  "h": "Solo per θ ≪ 1 (sin θ ≈ θ). Non dipende da massa e ampiezza: isocronismo."
 },
 {
  "id": "1.7",
  "c": 1,
  "n": "Pendolo dal potenziale",
  "q": "Potenziale del pendolo sviluppato per x ≪ l, con la prima correzione",
  "t": "U(x) = mgl\\left[1-\\sqrt{1-\\frac{x^2}{l^2}}\\right] \\simeq @@",
  "a": "\\frac{mg}{2l}\\,x^2 + \\frac{mg}{8l^3}\\,x^4",
  "d": [
   "\\frac{mg}{l}\\,x^2 + \\frac{mg}{2l^3}\\,x^4",
   "\\frac{mgl}{2}\\,x^2 + \\frac{mgl}{8}\\,x^4",
   "\\frac{mg}{2l}\\,x^2 - \\frac{mg}{8l^3}\\,x^4"
  ],
  "h": "Il termine in x² dà α = mg/l. Viene da √(1−u) ≈ 1 − u/2 − u²/8."
 },
 {
  "id": "1.8",
  "c": 1,
  "n": "Legge oraria con x₀ e v₀",
  "q": "Legge oraria con condizioni iniziali x(0) = x₀ e ẋ(0) = v₀",
  "t": "x(t) = x_0\\cos(\\omega_0 t) + @@\\,\\sin(\\omega_0 t)",
  "a": "\\frac{v_0}{\\omega_0}",
  "d": [
   "v_0\\,\\omega_0",
   "\\frac{\\omega_0}{v_0}",
   "v_0"
  ],
  "h": "Se x₀ = 0 serve v₀ ≠ 0 (parte col seno); se v₀ = 0 parte da fermo (coseno)."
 },
 {
  "id": "1.9",
  "c": 1,
  "n": "Ampiezza da x₀ e v₀",
  "q": "Ampiezza C e fase φ dell'oscillatore libero, dati x₀ e v₀",
  "t": "C = @@,\\qquad \\tan\\varphi = -\\frac{v_0}{\\omega_0\\,x_0}",
  "a": "\\sqrt{x_0^2 + \\frac{v_0^2}{\\omega_0^2}}",
  "d": [
   "\\sqrt{x_0^2 + v_0^2}",
   "x_0 + \\frac{v_0}{\\omega_0}",
   "\\sqrt{x_0^2 + v_0^2\\,\\omega_0^2}"
  ],
  "h": "È il caso γ = 0 delle formule del sottosmorzato."
 },
 {
  "id": "1.10",
  "c": 1,
  "n": "Energia dell'oscillatore",
  "q": "Energia totale dell'oscillatore armonico in funzione dell'ampiezza",
  "t": "E = \\tfrac12 m\\dot{x}^2 + \\tfrac12\\alpha x^2 = @@",
  "a": "\\tfrac12\\,m\\,\\omega_0^2 A^2",
  "d": [
   "\\tfrac12\\,m\\,\\omega_0 A^2",
   "m\\,\\omega_0^2 A^2",
   "\\tfrac12\\,m\\,\\omega_0^2 A"
  ],
  "h": "= ½αA² = ½mv²max con v_max = ω₀A. Costante: sistema conservativo. U e T sfasate."
 },
 {
  "id": "2.1",
  "c": 2,
  "n": "Equazione dello smorzato",
  "q": "Equazione del moto dell'oscillatore con attrito viscoso",
  "t": "\\ddot{x} + @@ + \\omega_0^2\\,x = 0",
  "a": "2\\gamma\\,\\dot{x}",
  "d": [
   "\\gamma\\,\\dot{x}",
   "2\\gamma\\,x",
   "2\\gamma\\,\\ddot{x}"
  ],
  "h": "Forza viscosa F = −2γmẋ, con γ > 0 in s⁻¹."
 },
 {
  "id": "2.2",
  "c": 2,
  "n": "Equazione caratteristica",
  "q": "Radici dell'equazione caratteristica dell'oscillatore smorzato",
  "t": "\\lambda_{1,2} = @@",
  "a": "-\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}",
  "d": [
   "-\\gamma \\pm \\sqrt{\\omega_0^2 - \\gamma^2}",
   "\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}",
   "-2\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}"
  ],
  "h": "Da λ² + 2γλ + ω₀² = 0. Il segno di γ² − ω₀² decide il regime."
 },
 {
  "id": "2.3",
  "c": 2,
  "n": "Sovrasmorzato",
  "q": "Soluzione nel regime sovrasmorzato (γ > ω₀)",
  "t": "x(t) = @@",
  "a": "C_1\\,e^{-|\\lambda_1| t} + C_2\\,e^{-|\\lambda_2| t}",
  "d": [
   "e^{-\\gamma t}\\,(C_1 + C_2\\,t)",
   "A\\,e^{-\\gamma t}\\cos(\\omega t + \\varphi)",
   "C_1\\,e^{|\\lambda_1| t} + C_2\\,e^{|\\lambda_2| t}"
  ],
  "h": "Somma di due decadimenti esponenziali, nessuna oscillazione."
 },
 {
  "id": "2.4",
  "c": 2,
  "n": "Smorzamento critico",
  "q": "Soluzione nello smorzamento critico (γ = ω₀)",
  "t": "x(t) = @@",
  "a": "e^{-\\gamma t}\\,(C_1 + C_2\\,t)",
  "d": [
   "C_1\\,e^{-\\gamma t} + C_2\\,e^{-\\gamma t}",
   "e^{-\\gamma t}\\,(C_1 + C_2)\\,t",
   "e^{-2\\gamma t}\\,(C_1 + C_2\\,t)"
  ],
  "h": "Una sola radice: la seconda soluzione è t·e^(−γt). Ritorno all'equilibrio più rapido."
 },
 {
  "id": "2.5",
  "c": 2,
  "n": "Sottosmorzato",
  "q": "Soluzione sottosmorzata (γ < ω₀) e la sua pulsazione ω",
  "t": "x(t) = A\\,e^{-\\gamma t}\\cos(\\omega t + \\varphi),\\qquad \\omega = @@",
  "a": "\\sqrt{\\omega_0^2 - \\gamma^2}",
  "d": [
   "\\sqrt{\\gamma^2 - \\omega_0^2}",
   "\\sqrt{\\omega_0^2 + \\gamma^2}",
   "\\omega_0 - \\gamma"
  ],
  "h": "ω < ω₀, quindi T > T₀. In τ = 1/γ l'ampiezza cala di un fattore 1/e."
 },
 {
  "id": "2.6",
  "c": 2,
  "n": "ω per piccolo smorzamento",
  "q": "Correzione su ω quando γ ≪ ω₀",
  "t": "\\omega \\simeq \\omega_0\\left[1 - @@\\right]",
  "a": "\\frac12\\left(\\frac{\\gamma}{\\omega_0}\\right)^2",
  "d": [
   "\\frac{\\gamma}{\\omega_0}",
   "\\left(\\frac{\\gamma}{\\omega_0}\\right)^2",
   "\\frac12\\,\\frac{\\gamma}{\\omega_0}"
  ],
  "h": "Correzione del secondo ordine: spesso trascurabile in ω, mai nell'esponenziale."
 },
 {
  "id": "2.7",
  "c": 2,
  "n": "Ampiezza con x₀ e v₀",
  "q": "Ampiezza A del sottosmorzato con condizioni iniziali x₀ e v₀",
  "t": "A = \\sqrt{x_0^2 + \\frac{@@}{\\omega^2}}",
  "a": "(v_0 + \\gamma x_0)^2",
  "d": [
   "v_0^2",
   "(v_0 - \\gamma x_0)^2",
   "(v_0 + \\omega x_0)^2"
  ],
  "h": "Da x₀ = A cos φ e v₀ = −γA cos φ − ωA sin φ. Con γ → 0 torna l'oscillatore libero."
 },
 {
  "id": "2.8",
  "c": 2,
  "n": "Fase con x₀ e v₀",
  "q": "Fase φ del sottosmorzato con condizioni iniziali x₀ e v₀",
  "t": "\\tan\\varphi = @@",
  "a": "-\\frac{v_0 + \\gamma x_0}{\\omega\\,x_0}",
  "d": [
   "\\frac{v_0 + \\gamma x_0}{\\omega\\,x_0}",
   "-\\frac{v_0}{\\omega\\,x_0}",
   "-\\frac{\\omega\\,x_0}{v_0 + \\gamma x_0}"
  ],
  "h": "Se v₀ = 0 diventa tan φ = −γ/ω."
 },
 {
  "id": "2.9",
  "c": 2,
  "n": "Partenza da fermo",
  "q": "Ampiezza del sottosmorzato se parte da fermo (v₀ = 0)",
  "t": "A = x_0\\,@@",
  "a": "\\sqrt{1 + \\frac{\\gamma^2}{\\omega^2}}",
  "d": [
   "\\sqrt{1 - \\frac{\\gamma^2}{\\omega^2}}",
   "\\left(1 + \\frac{\\gamma}{\\omega}\\right)",
   "\\sqrt{1 + \\frac{\\omega^2}{\\gamma^2}}"
  ],
  "h": "E la fase vale tan φ = −γ/ω."
 },
 {
  "id": "2.10",
  "c": 2,
  "n": "Energia che decade",
  "q": "Energia dell'oscillatore smorzato nel tempo (γ ≪ ω₀)",
  "t": "E(t) \\simeq \\tfrac12\\,m\\,\\omega_0^2 A^2\\,@@",
  "a": "e^{-2\\gamma t}",
  "d": [
   "e^{-\\gamma t}",
   "e^{-\\gamma t/2}",
   "e^{-2\\gamma^2 t}"
  ],
  "h": "L'ampiezza decade con e^(−γt), l'energia con e^(−2γt)."
 },
 {
  "id": "2.11",
  "c": 2,
  "n": "Potenza dissipata",
  "q": "Potenza dissipata dall'attrito viscoso, dE/dt",
  "t": "\\frac{dE}{dt} = @@",
  "a": "-2\\gamma\\,m\\,\\dot{x}^2",
  "d": [
   "-\\gamma\\,m\\,\\dot{x}^2",
   "-2\\gamma\\,m\\,x^2",
   "-2\\gamma\\,\\dot{x}"
  ],
  "h": "= F_v·ẋ. Perdite massime a velocità massima, nulle nei punti di inversione."
 },
 {
  "id": "3.1",
  "c": 3,
  "n": "Equazione del forzato",
  "q": "Equazione dell'oscillatore forzato con forzante armonica",
  "t": "\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2\\,x = @@",
  "a": "\\frac{F_0}{m}\\cos(\\omega_F t)",
  "d": [
   "F_0\\cos(\\omega_F t)",
   "\\frac{F_0}{m}\\cos(\\omega_0 t)",
   "\\frac{F_0}{m}\\,e^{-\\gamma t}\\cos(\\omega_F t)"
  ],
  "h": "Non omogenea: soluzione = omogenea (transitorio) + particolare (regime)."
 },
 {
  "id": "3.2",
  "c": 3,
  "n": "Transitorio + regime",
  "q": "Soluzione generale dell'oscillatore forzato (transitorio più regime)",
  "t": "x(t) = A\\,e^{-\\gamma t}\\cos(\\omega t + \\varphi_1) + @@",
  "a": "B\\cos(\\omega_F t + \\varphi)",
  "d": [
   "B\\cos(\\omega_0 t + \\varphi)",
   "B\\,e^{-\\gamma t}\\cos(\\omega_F t + \\varphi)",
   "B\\cos(\\omega t + \\varphi)"
  ],
  "h": "Per t ≫ 1/γ resta solo il regime, alla frequenza della forzante."
 },
 {
  "id": "3.3",
  "c": 3,
  "n": "Ampiezza a regime",
  "q": "Ampiezza a regime B(ω_F) dell'oscillatore forzato",
  "t": "B = \\frac{F_0}{m\\sqrt{@@}}",
  "a": "(\\omega_0^2 - \\omega_F^2)^2 + 4\\gamma^2\\omega_F^2",
  "d": [
   "(\\omega_0^2 - \\omega_F^2)^2 + 2\\gamma^2\\omega_F^2",
   "(\\omega_0 - \\omega_F)^2 + 4\\gamma^2\\omega_F^2",
   "(\\omega_0^2 - \\omega_F^2)^2 + 4\\gamma^2\\omega_0^2"
  ],
  "h": "Il 4 viene da (2γ)². B e φ non dipendono dalle condizioni iniziali."
 },
 {
  "id": "3.4",
  "c": 3,
  "n": "Fase a regime",
  "q": "Fase φ della soluzione a regime del forzato",
  "t": "\\tan\\varphi = @@",
  "a": "\\frac{2\\gamma\\,\\omega_F}{\\omega_F^2 - \\omega_0^2}",
  "d": [
   "\\frac{2\\gamma\\,\\omega_F}{\\omega_0^2 - \\omega_F^2}",
   "\\frac{\\gamma\\,\\omega_F}{\\omega_F^2 - \\omega_0^2}",
   "\\frac{\\omega_F^2 - \\omega_0^2}{2\\gamma\\,\\omega_F}"
  ],
  "h": "Da ω₀² − ω_F² = (F₀/Bm) cos φ e 2γω_F = −(F₀/Bm) sin φ."
 },
 {
  "id": "3.5",
  "c": 3,
  "n": "Ampiezza alla risonanza",
  "q": "Ampiezza a regime alla risonanza (ω_F = ω₀)",
  "t": "B(\\omega_0) = @@",
  "a": "\\frac{F_0}{2m\\gamma\\,\\omega_0}",
  "d": [
   "\\frac{F_0}{m\\gamma\\,\\omega_0}",
   "\\frac{F_0}{2m\\gamma}",
   "\\frac{F_0}{2m\\,\\omega_0^2}"
  ],
  "h": "Cresce al diminuire di γ; per γ → 0 diverge."
 },
 {
  "id": "3.6",
  "c": 3,
  "n": "Fase alla risonanza",
  "q": "Fase dello spostamento rispetto alla forzante alla risonanza",
  "t": "\\omega_F = \\omega_0 \\;\\Rightarrow\\; \\tan\\varphi = \\pm\\infty,\\quad \\varphi = @@",
  "a": "-\\frac{\\pi}{2}",
  "d": [
   "0",
   "-\\pi",
   "-\\frac{\\pi}{4}"
  ],
  "h": "Spostamento in quadratura con la forzante: la forza è in fase con la velocità. Negli appunti: φ = ±π/2."
 },
 {
  "id": "3.7",
  "c": 3,
  "n": "Energia a regime",
  "q": "Energia dell'oscillatore forzato a regime (ω = ω_F)",
  "t": "E(t) = \\tfrac12\\,mB^2\\left[@@\\right]",
  "a": "\\omega^2\\sin^2(\\omega t + \\varphi) + \\omega_0^2\\cos^2(\\omega t + \\varphi)",
  "d": [
   "\\omega_0^2\\sin^2(\\omega t + \\varphi) + \\omega^2\\cos^2(\\omega t + \\varphi)",
   "\\omega^2\\sin^2(\\omega t + \\varphi) + \\omega^2\\cos^2(\\omega t + \\varphi)",
   "\\omega^2\\cos^2(\\omega t + \\varphi) - \\omega_0^2\\sin^2(\\omega t + \\varphi)"
  ],
  "h": "Costante solo a risonanza: E = ½mω₀²B². Altrimenti oscilla tra ½mB²ω² e ½mB²ω₀²."
 },
 {
  "id": "4.1",
  "c": 4,
  "n": "Pendoli accoppiati",
  "q": "Equazione del moto del primo di due pendoli accoppiati da una molla k",
  "t": "m\\ddot{x}_1 = -\\frac{mg}{l}\\,x_1 - @@",
  "a": "k\\,(x_1 - x_2)",
  "d": [
   "k\\,(x_2 - x_1)",
   "k\\,x_1",
   "2k\\,(x_1 - x_2)"
  ],
  "h": "Per x₂ è uguale con k(x₂ − x₁). Si disaccoppiano con u_a = x₁ + x₂ e u_b = x₁ − x₂."
 },
 {
  "id": "4.2",
  "c": 4,
  "n": "Frequenze dei due modi",
  "q": "Pulsazioni dei due modi normali dei pendoli accoppiati",
  "t": "\\omega_a = \\sqrt{\\frac{g}{l}},\\qquad \\omega_b = @@",
  "a": "\\sqrt{\\frac{g}{l} + \\frac{2k}{m}}",
  "d": [
   "\\sqrt{\\frac{g}{l} + \\frac{k}{m}}",
   "\\sqrt{\\frac{g}{l}} + \\sqrt{\\frac{2k}{m}}",
   "\\sqrt{\\frac{2k}{m}}"
  ],
  "h": "Modo a, a pendolo: x₁ = x₂, la molla non lavora. Modo b, a respiro: x₁ = −x₂."
 },
 {
  "id": "4.3",
  "c": 4,
  "n": "Coordinate normali",
  "q": "Coordinate che disaccoppiano le equazioni dei pendoli accoppiati",
  "t": "u_a = x_1 + x_2,\\qquad u_b = @@",
  "a": "x_1 - x_2",
  "d": [
   "x_1 + 2x_2",
   "2x_1 - x_2",
   "\\frac{x_1 + x_2}{2}"
  ],
  "h": "Si ottengono sommando e sottraendo le due equazioni: ognuna diventa un oscillatore armonico."
 },
 {
  "id": "4.4",
  "c": 4,
  "n": "Moto come somma di modi",
  "q": "Moto di x₂ come sovrapposizione dei due modi normali",
  "t": "x_2(t) = @@",
  "a": "C_a\\cos(\\omega_a t + \\varphi_a) - C_b\\cos(\\omega_b t + \\varphi_b)",
  "d": [
   "C_a\\cos(\\omega_a t + \\varphi_a) + C_b\\cos(\\omega_b t + \\varphi_b)",
   "-C_a\\cos(\\omega_a t + \\varphi_a) - C_b\\cos(\\omega_b t + \\varphi_b)",
   "C_b\\cos(\\omega_a t + \\varphi_a) - C_a\\cos(\\omega_b t + \\varphi_b)"
  ],
  "h": "Per x₁ c'è il segno +. Costanti dalle condizioni iniziali."
 },
 {
  "id": "4.5",
  "c": 4,
  "n": "Battimenti",
  "q": "Battimenti: somma di due oscillazioni di uguale ampiezza e frequenze vicine",
  "t": "A\\left[\\cos(\\omega_a t) + \\cos(\\omega_b t)\\right] = @@",
  "a": "2A\\cos\\left(\\frac{\\omega_a + \\omega_b}{2}\\,t\\right)\\cos\\left(\\frac{\\omega_a - \\omega_b}{2}\\,t\\right)",
  "d": [
   "2A\\cos\\left((\\omega_a + \\omega_b)\\,t\\right)\\cos\\left((\\omega_a - \\omega_b)\\,t\\right)",
   "A\\cos\\left(\\frac{\\omega_a + \\omega_b}{2}\\,t\\right)\\cos\\left(\\frac{\\omega_a - \\omega_b}{2}\\,t\\right)",
   "2A\\sin\\left(\\frac{\\omega_a + \\omega_b}{2}\\,t\\right)\\sin\\left(\\frac{\\omega_a - \\omega_b}{2}\\,t\\right)"
  ],
  "h": "Il secondo coseno è l'inviluppo lento: la sua frequenza è la semidifferenza."
 },
 {
  "id": "4.6",
  "c": 4,
  "n": "Due masse su corda",
  "q": "Due masse su una corda tesa (tensione T₀, passo a): pulsazioni dei modi",
  "t": "\\omega_a^2 = \\frac{T_0}{ma},\\qquad \\omega_b^2 = @@",
  "a": "\\frac{3T_0}{ma}",
  "d": [
   "\\frac{2T_0}{ma}",
   "\\frac{T_0}{3ma}",
   "\\frac{4T_0}{ma}"
  ],
  "h": "Modo a: y₁ = y₂. Modo b: y₁ = −y₂."
 },
 {
  "id": "4.7",
  "c": 4,
  "n": "Equazione della prima massa",
  "q": "Equazione della prima di due masse su una corda tesa",
  "t": "\\ddot{y}_1 = @@\\,y_1 + \\frac{T_0}{ma}\\,y_2",
  "a": "-\\frac{2T_0}{ma}",
  "d": [
   "-\\frac{T_0}{ma}",
   "+\\frac{2T_0}{ma}",
   "-\\frac{3T_0}{ma}"
  ],
  "h": "Conta solo la componente verticale della tensione, per y/a ≪ 1."
 },
 {
  "id": "4.8",
  "c": 4,
  "n": "Collana di perle",
  "q": "Equazione della massa i-esima in una catena di N masse",
  "t": "\\ddot{y}_i = -\\frac{T_0}{ma}\\left[@@\\right]",
  "a": "2y_i - y_{i-1} - y_{i+1}",
  "d": [
   "y_{i-1} - 2y_i + y_{i+1}",
   "2y_i + y_{i-1} + y_{i+1}",
   "y_i - y_{i-1} - y_{i+1}"
  ],
  "h": "Per a → 0 diventa l'equazione di D'Alembert con ρ_L = m/a."
 },
 {
  "id": "4.9",
  "c": 4,
  "n": "Passaggio al continuo",
  "q": "Equazione che si ottiene dalla catena di masse per a → 0",
  "t": "\\frac{\\partial^2 y}{\\partial t^2} = @@\\,\\frac{\\partial^2 y}{\\partial x^2}",
  "a": "\\frac{T_0}{\\rho_L}",
  "d": [
   "\\frac{\\rho_L}{T_0}",
   "\\sqrt{\\frac{T_0}{\\rho_L}}",
   "\\frac{T_0}{m}"
  ],
  "h": "ρ_L = m/a densità lineare. n gradi di libertà, n modi normali; il continuo ne ha infiniti."
 },
 {
  "id": "5.1",
  "c": 5,
  "n": "Equazione di D'Alembert",
  "q": "Equazione di D'Alembert e velocità di fase della corda",
  "t": "\\frac{\\partial^2\\psi}{\\partial t^2} = v^2\\,\\frac{\\partial^2\\psi}{\\partial x^2},\\qquad v = @@",
  "a": "\\sqrt{\\frac{T_0}{\\rho_L}}",
  "d": [
   "\\sqrt{\\frac{\\rho_L}{T_0}}",
   "\\frac{T_0}{\\rho_L}",
   "\\sqrt{T_0\\,\\rho_L}"
  ],
  "h": "Lineare e omogenea: vale la sovrapposizione. v dipende solo dal mezzo."
 },
 {
  "id": "5.2",
  "c": 5,
  "n": "Soluzione di D'Alembert",
  "q": "Soluzione generale dell'equazione di D'Alembert in 1D",
  "t": "\\psi(x,t) = @@",
  "a": "f(x - vt) + g(x + vt)",
  "d": [
   "f(x - vt)\\,g(x + vt)",
   "f(x - v^2 t) + g(x + v^2 t)",
   "f(x - vt) + g(x - vt)"
  ],
  "h": "f va verso destra (progressiva), g verso sinistra (regressiva)."
 },
 {
  "id": "5.3",
  "c": 5,
  "n": "Onda progressiva",
  "q": "Relazione tra le derivate per un'onda progressiva f(x − vt)",
  "t": "\\frac{\\partial\\psi}{\\partial t} = @@",
  "a": "-v\\,\\frac{\\partial\\psi}{\\partial x}",
  "d": [
   "+v\\,\\frac{\\partial\\psi}{\\partial x}",
   "-v^2\\,\\frac{\\partial\\psi}{\\partial x}",
   "-\\frac{1}{v}\\,\\frac{\\partial\\psi}{\\partial x}"
  ],
  "h": "Per l'onda regressiva g(x + vt) il segno è +."
 },
 {
  "id": "5.4",
  "c": 5,
  "n": "Onda armonica",
  "q": "Onda armonica progressiva: legame tra v, ω, k, λ e ν",
  "t": "\\psi = A\\sin(kx - \\omega t),\\qquad k = \\frac{2\\pi}{\\lambda},\\qquad v = @@",
  "a": "\\frac{\\omega}{k} = \\lambda\\nu",
  "d": [
   "\\frac{k}{\\omega} = \\frac{\\lambda}{\\nu}",
   "\\omega\\,k = \\lambda\\nu",
   "\\frac{\\omega}{k} = \\frac{\\lambda}{\\nu}"
  ],
  "h": "ω = 2πν = 2π/T."
 },
 {
  "id": "5.5",
  "c": 5,
  "n": "Forma del modo",
  "q": "Equazione per la forma spaziale y(x) di un modo normale",
  "t": "\\frac{d^2 y}{dx^2} + k^2\\,y = 0,\\qquad k^2 = @@",
  "a": "\\frac{\\omega^2}{v^2}",
  "d": [
   "\\frac{v^2}{\\omega^2}",
   "\\omega^2 v^2",
   "\\frac{\\omega}{v}"
  ],
  "h": "Un oscillatore armonico in x: y(x) = A cos(kx + φ)."
 },
 {
  "id": "5.6",
  "c": 5,
  "n": "Corda fissa agli estremi",
  "q": "Corda di lunghezza L fissata agli estremi: k_n, λ_n e ν_n",
  "t": "k_n = \\frac{n\\pi}{L},\\qquad \\lambda_n = @@,\\qquad \\nu_n = \\frac{n\\,v}{2L}",
  "a": "\\frac{2L}{n}",
  "d": [
   "\\frac{L}{n}",
   "\\frac{4L}{n}",
   "\\frac{2L}{2n-1}"
  ],
  "h": "Fondamentale λ₁ = 2L, secondo modo λ₂ = L."
 },
 {
  "id": "5.7",
  "c": 5,
  "n": "Modi normali della corda",
  "q": "Soluzione generale della corda fissa come somma di modi normali",
  "t": "\\psi(x,t) = \\sum_{n=1}^{\\infty} A_n\\,@@",
  "a": "\\sin(k_n x)\\cos(\\omega_n t + \\varphi_n)",
  "d": [
   "\\cos(k_n x)\\cos(\\omega_n t + \\varphi_n)",
   "\\sin(k_n x - \\omega_n t + \\varphi_n)",
   "\\sin(\\omega_n x)\\cos(k_n t + \\varphi_n)"
  ],
  "h": "Con estremi fissi la forma è sin(kx), non cos. A_n e φ_n dalle condizioni iniziali."
 },
 {
  "id": "5.8",
  "c": 5,
  "n": "Stazionaria = due progressive",
  "q": "Onda stazionaria scritta come somma di due onde progressive opposte",
  "t": "A\\sin(kx)\\cos(\\omega t) = @@",
  "a": "\\frac{A}{2}\\left[\\sin(kx + \\omega t) + \\sin(kx - \\omega t)\\right]",
  "d": [
   "A\\left[\\sin(kx + \\omega t) + \\sin(kx - \\omega t)\\right]",
   "\\frac{A}{2}\\left[\\sin(kx + \\omega t) - \\sin(kx - \\omega t)\\right]",
   "\\frac{A}{2}\\left[\\cos(kx + \\omega t) + \\cos(kx - \\omega t)\\right]"
  ],
  "h": "Prostaferesi: sin a cos b = ½[sin(a + b) + sin(a − b)]."
 },
 {
  "id": "5.9",
  "c": 5,
  "n": "Potenza istantanea",
  "q": "Potenza istantanea trasportata lungo la corda",
  "t": "P(x,t) = @@",
  "a": "-T_0\\,\\frac{\\partial\\psi}{\\partial x}\\,\\frac{\\partial\\psi}{\\partial t}",
  "d": [
   "T_0\\,\\frac{\\partial\\psi}{\\partial x}\\,\\frac{\\partial\\psi}{\\partial t}",
   "-T_0\\,\\frac{\\partial^2\\psi}{\\partial x^2}\\,\\frac{\\partial\\psi}{\\partial t}",
   "-\\rho_L\\,\\frac{\\partial\\psi}{\\partial x}\\,\\frac{\\partial\\psi}{\\partial t}"
  ],
  "h": "Viene dalla componente trasversale della tensione, T_ψ ≈ −T₀ ∂ψ/∂x."
 },
 {
  "id": "5.10",
  "c": 5,
  "n": "Potenza dell'onda progressiva",
  "q": "Potenza di un'onda progressiva in funzione delle derivate",
  "t": "P = T_0\\,v\\left(\\frac{\\partial\\psi}{\\partial x}\\right)^2 = @@",
  "a": "\\frac{T_0}{v}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
  "d": [
   "T_0\\,v\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
   "\\frac{v}{T_0}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
   "-\\frac{T_0}{v}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2"
  ],
  "h": "L'energia fluisce nel verso di propagazione."
 },
 {
  "id": "5.11",
  "c": 5,
  "n": "Potenza media",
  "q": "Potenza media trasportata da un'onda armonica su corda",
  "t": "\\langle P\\rangle = @@",
  "a": "\\tfrac12\\,T_0 A^2 k\\,\\omega",
  "d": [
   "T_0 A^2 k\\,\\omega",
   "\\tfrac12\\,T_0 A\\,k\\,\\omega",
   "\\tfrac12\\,T_0 A^2\\,\\frac{\\omega}{k}"
  ],
  "h": "= ½ρ_L v ω²A². Istantanea: T₀A²kω cos²(kx − ωt)."
 },
 {
  "id": "5.12",
  "c": 5,
  "n": "Perdite radiative",
  "q": "Massa su molla K legata a una corda infinita: smorzamento γ dovuto alle onde",
  "t": "\\ddot{y} + 2\\gamma\\dot{y} + \\omega_0^2\\,y = 0,\\qquad \\gamma = @@",
  "a": "\\frac{T_0}{m\\,v}",
  "d": [
   "\\frac{2T_0}{m\\,v}",
   "\\frac{T_0\\,v}{m}",
   "\\frac{m\\,v}{T_0}"
  ],
  "h": "Da mÿ = −Ky − (2T₀/v)ẏ: le onde emesse sui due lati fanno da attrito. ω₀² = K/m."
 },
 {
  "id": "6.1",
  "c": 6,
  "n": "Condizioni di raccordo",
  "q": "Le due condizioni di raccordo in x = 0 (continuità ed energia)",
  "t": "\\psi_{0i} + \\psi_{0r} = \\psi_{0t},\\qquad \\psi_{0i}^2\\,k_1 = @@",
  "a": "\\psi_{0r}^2\\,k_1 + \\psi_{0t}^2\\,k_2",
  "d": [
   "\\psi_{0r}^2\\,k_2 + \\psi_{0t}^2\\,k_1",
   "\\psi_{0r}^2\\,k_1 - \\psi_{0t}^2\\,k_2",
   "(\\psi_{0r} + \\psi_{0t})^2\\,k_1"
  ],
  "h": "1) la corda non si spezza; 2) la potenza incidente si divide tra riflessa e trasmessa. ω è la stessa."
 },
 {
  "id": "6.2",
  "c": 6,
  "n": "Coefficienti r e t",
  "q": "Coefficienti di riflessione e trasmissione per l'ampiezza, in funzione di k",
  "t": "r = \\frac{k_1 - k_2}{k_1 + k_2},\\qquad t = @@",
  "a": "\\frac{2k_1}{k_1 + k_2}",
  "d": [
   "\\frac{2k_2}{k_1 + k_2}",
   "\\frac{k_1 + k_2}{2k_1}",
   "\\frac{k_2 - k_1}{k_1 + k_2}"
  ],
  "h": "Vale sempre 1 + r = t."
 },
 {
  "id": "6.3",
  "c": 6,
  "n": "r e t con le densità",
  "q": "Coefficienti r e t in funzione delle densità ρ₁ e ρ₂",
  "t": "r = @@,\\qquad t = \\frac{2\\sqrt{\\rho_1}}{\\sqrt{\\rho_1} + \\sqrt{\\rho_2}}",
  "a": "\\frac{\\sqrt{\\rho_1} - \\sqrt{\\rho_2}}{\\sqrt{\\rho_1} + \\sqrt{\\rho_2}}",
  "d": [
   "\\frac{\\sqrt{\\rho_2} - \\sqrt{\\rho_1}}{\\sqrt{\\rho_1} + \\sqrt{\\rho_2}}",
   "\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}",
   "\\frac{\\sqrt{\\rho_1} + \\sqrt{\\rho_2}}{\\sqrt{\\rho_1} - \\sqrt{\\rho_2}}"
  ],
  "h": "A parità di tensione e frequenza k ∝ √ρ."
 },
 {
  "id": "6.4",
  "c": 6,
  "n": "Coefficienti di energia",
  "q": "Coefficienti di riflessione e trasmissione per l'energia",
  "t": "R = r^2,\\qquad T = @@",
  "a": "1 - R = \\frac{k_2}{k_1}\\,t^2",
  "d": [
   "t^2",
   "1 + R",
   "\\frac{k_1}{k_2}\\,t^2"
  ],
  "h": "t può valere 2 senza violare l'energia: conta T, non t."
 },
 {
  "id": "6.5",
  "c": 6,
  "n": "Estremo fisso",
  "q": "Caso limite ρ₁ ≪ ρ₂ (estremo fisso): quanto valgono r e t?",
  "t": "\\rho_1 \\ll \\rho_2:\\quad @@",
  "a": "r = -1,\\quad t = 0",
  "d": [
   "r = 1,\\quad t = 2",
   "r = 0,\\quad t = 1",
   "r = -1,\\quad t = 2"
  ],
  "h": "Solo riflessione, con l'impulso capovolto (sfasamento π)."
 },
 {
  "id": "6.6",
  "c": 6,
  "n": "Estremo libero",
  "q": "Caso limite ρ₂ ≪ ρ₁ (estremo libero): quanto valgono r e t?",
  "t": "\\rho_2 \\ll \\rho_1:\\quad @@",
  "a": "r = 1,\\quad t = 2",
  "d": [
   "r = -1,\\quad t = 0",
   "r = 0,\\quad t = 1",
   "r = 1,\\quad t = 0"
  ],
  "h": "L'onda riflessa mantiene la stessa fase."
 },
 {
  "id": "6.7",
  "c": 6,
  "n": "Riflessa capovolta",
  "q": "Quando l'onda riflessa è capovolta (r < 0)?",
  "t": "r < 0 \\iff @@",
  "a": "\\rho_1 < \\rho_2",
  "d": [
   "\\rho_1 > \\rho_2",
   "k_1 > k_2",
   "v_1 < v_2"
  ],
  "h": "Il secondo mezzo è più denso: sfasamento di π. Equivale a k₁ < k₂ e v₁ > v₂."
 },
 {
  "id": "7.1",
  "c": 7,
  "n": "Velocità nel tubo sonoro",
  "q": "Velocità del suono nel tubo sonoro e modulo di compressibilità β",
  "t": "v = \\sqrt{\\frac{\\beta}{\\rho_0}},\\qquad \\beta = @@",
  "a": "\\rho_0\\left.\\frac{\\partial P}{\\partial \\rho}\\right|_0",
  "d": [
   "\\frac{1}{\\rho_0}\\left.\\frac{\\partial P}{\\partial \\rho}\\right|_0",
   "\\rho_0\\left.\\frac{\\partial \\rho}{\\partial P}\\right|_0",
   "P_0\\left.\\frac{\\partial P}{\\partial \\rho}\\right|_0"
  ],
  "h": "ψ è lo spostamento longitudinale delle particelle di fluido."
 },
 {
  "id": "7.2",
  "c": 7,
  "n": "Onda di densità",
  "q": "Onda di densità e onda di pressione legate allo spostamento ψ",
  "t": "d\\rho = @@,\\qquad dP = \\frac{\\beta}{\\rho_0}\\,d\\rho",
  "a": "-\\rho_0\\,\\frac{\\partial\\psi}{\\partial x}",
  "d": [
   "\\rho_0\\,\\frac{\\partial\\psi}{\\partial x}",
   "-\\rho_0\\,\\frac{\\partial\\psi}{\\partial t}",
   "-\\frac{1}{\\rho_0}\\,\\frac{\\partial\\psi}{\\partial x}"
  ],
  "h": "dP è in fase con dρ e in quadratura con ψ. Nodo di spostamento = ventre di pressione."
 },
 {
  "id": "7.3",
  "c": 7,
  "n": "Onda di pressione",
  "q": "Onda di pressione quando ψ = A cos(kx − ωt)",
  "t": "dP(x,t) = @@\\,\\sin(kx - \\omega t)",
  "a": "A\\,\\beta\\,k",
  "d": [
   "A\\,\\beta\\,\\omega",
   "A\\,\\rho_0\\,k",
   "\\frac{A\\,\\beta}{k}"
  ],
  "h": "E dρ = Aρ₀k sin(kx − ωt)."
 },
 {
  "id": "7.4",
  "c": 7,
  "n": "Ipotesi isoterma (Newton)",
  "q": "Velocità del suono nell'ipotesi isoterma di Newton",
  "t": "v_{iso} = @@ \\simeq 280\\ \\mathrm{m/s}",
  "a": "\\sqrt{\\frac{P_0}{\\rho_0}}",
  "d": [
   "\\sqrt{\\frac{\\rho_0}{P_0}}",
   "\\sqrt{\\frac{\\gamma P_0}{\\rho_0}}",
   "\\frac{P_0}{\\rho_0}"
  ],
  "h": "Sbagliata rispetto alle misure: le compressioni sono troppo rapide per essere isoterme."
 },
 {
  "id": "7.5",
  "c": 7,
  "n": "Ipotesi adiabatica (Laplace)",
  "q": "Velocità del suono nell'ipotesi adiabatica di Laplace",
  "t": "v = @@ \\simeq 331\\ \\mathrm{m/s}",
  "a": "\\sqrt{\\frac{\\gamma P_0}{\\rho_0}}",
  "d": [
   "\\gamma\\sqrt{\\frac{P_0}{\\rho_0}}",
   "\\sqrt{\\frac{P_0}{\\gamma\\,\\rho_0}}",
   "\\sqrt{\\frac{P_0}{\\rho_0}}"
  ],
  "h": "≈ 1,183 volte il valore di Newton (√1,4)."
 },
 {
  "id": "7.6",
  "c": 7,
  "n": "Suono e temperatura",
  "q": "Velocità del suono in funzione della temperatura (aria)",
  "t": "v = \\sqrt{\\frac{\\gamma\\,k_B T}{\\mu}} = @@",
  "a": "\\alpha\\sqrt{T},\\quad \\alpha \\simeq 20{,}05\\ \\mathrm{m\\,s^{-1}K^{-1/2}}",
  "d": [
   "\\alpha\\,T,\\quad \\alpha \\simeq 20{,}05\\ \\mathrm{m\\,s^{-1}K^{-1}}",
   "\\alpha\\sqrt{T},\\quad \\alpha \\simeq 331\\ \\mathrm{m\\,s^{-1}K^{-1/2}}",
   "\\frac{\\alpha}{\\sqrt{T}},\\quad \\alpha \\simeq 20{,}05\\ \\mathrm{m\\,s^{-1}K^{1/2}}"
  ],
  "h": "μ = massa di una molecola. A 273 K: 20,05·√273 ≈ 331 m/s."
 },
 {
  "id": "7.7",
  "c": 7,
  "n": "Gas perfetti",
  "q": "Equazione di stato dei gas perfetti in due forme",
  "t": "PV = nRT = @@,\\qquad k_B = \\frac{R}{N_A}",
  "a": "N\\,k_B\\,T",
  "d": [
   "n\\,k_B\\,T",
   "N\\,R\\,T",
   "\\frac{N}{N_A}\\,k_B\\,T"
  ],
  "h": "N = n·N_A. k_B = 1,38·10⁻²³ J/K, N_A = 6,022·10²³."
 },
 {
  "id": "7.8",
  "c": 7,
  "n": "Adiabatica e γ",
  "q": "Legge dell'adiabatica e valore di γ con η gradi di libertà",
  "t": "PV^{\\gamma} = \\text{costante},\\qquad \\gamma = @@",
  "a": "\\frac{\\eta + 2}{\\eta}",
  "d": [
   "\\frac{\\eta}{\\eta + 2}",
   "\\frac{\\eta + 1}{\\eta}",
   "\\frac{\\eta + 2}{2}"
  ],
  "h": "Monoatomico η = 3: γ = 5/3. Biatomico, come l'aria, η = 5: γ = 7/5."
 },
 {
  "id": "7.9",
  "c": 7,
  "n": "Energia interna",
  "q": "Energia interna di un gas con η gradi di libertà",
  "t": "U = @@ = \\frac{\\eta}{2}\\,PV",
  "a": "\\frac{\\eta}{2}\\,N\\,k_B\\,T",
  "d": [
   "\\frac{3}{2}\\,\\eta\\,N\\,k_B\\,T",
   "\\eta\\,N\\,k_B\\,T",
   "\\frac{\\eta}{2}\\,k_B\\,T"
  ],
  "h": "Per particella ε = (η/2)k_BT. In adiabatica dU = −P dV."
 },
 {
  "id": "7.10",
  "c": 7,
  "n": "Intensità acustica",
  "q": "Intensità media di un'onda acustica armonica, in funzione della pressione",
  "t": "\\bar{I} = \\tfrac12\\,\\gamma P_0 A^2 k\\,\\omega = @@",
  "a": "\\frac12\\,\\frac{dP_{max}^2}{\\rho_0\\,v}",
  "d": [
   "\\frac12\\,\\frac{dP_{max}^2}{\\gamma P_0}",
   "\\frac12\\,dP_{max}^2\\,\\rho_0\\,v",
   "\\frac{dP_{max}}{2\\,\\rho_0\\,v}"
  ],
  "h": "dP_max = γP₀kA. Equivale anche a ½ρ₀ω²A²v."
 },
 {
  "id": "7.11",
  "c": 7,
  "n": "Spostamento massimo",
  "q": "Ampiezza di spostamento s_max da un'intensità I",
  "t": "s_{max} = @@",
  "a": "\\sqrt{\\frac{2I}{\\rho_0\\,\\omega^2 v}}",
  "d": [
   "\\sqrt{\\frac{I}{2\\rho_0\\,\\omega^2 v}}",
   "\\frac{2I}{\\rho_0\\,\\omega^2 v}",
   "\\sqrt{\\frac{2I\\,v}{\\rho_0\\,\\omega^2}}"
  ],
  "h": "Da I = ½ρ₀ω²s²_max v."
 },
 {
  "id": "7.12",
  "c": 7,
  "n": "Livello in decibel",
  "q": "Livello sonoro in decibel e intensità di riferimento",
  "t": "L = @@\\ \\ \\mathrm{dB},\\qquad I_0 = 10^{-12}\\ \\mathrm{W/m^2}",
  "a": "10\\log_{10}\\frac{I}{I_0}",
  "d": [
   "20\\log_{10}\\frac{I}{I_0}",
   "10\\ln\\frac{I}{I_0}",
   "\\log_{10}\\frac{I}{I_0}"
  ],
  "h": "0 dB soglia di udibilità, 120 dB soglia del dolore (1 W/m²). +10 dB = intensità ×10."
 },
 {
  "id": "7.13",
  "c": 7,
  "n": "Attenuazione geometrica",
  "q": "Intensità a distanza r da una sorgente puntiforme",
  "t": "I(r) = @@",
  "a": "\\frac{P}{\\Omega\\,r^2}",
  "d": [
   "\\frac{P}{\\Omega\\,r}",
   "\\frac{P\\,r^2}{\\Omega}",
   "\\frac{P}{4\\pi\\,\\Omega\\,r^2}"
  ],
  "h": "Ω angolo solido di emissione: 4π se la sorgente emette in tutte le direzioni."
 },
 {
  "id": "7.14",
  "c": 7,
  "n": "Lambert–Beer",
  "q": "Legge di Lambert–Beer per l'assorbimento",
  "t": "dI = -\\alpha\\,I\\,dz \\;\\Rightarrow\\; I(z) = @@",
  "a": "I_0\\,e^{-\\alpha z}",
  "d": [
   "I_0\\,e^{-\\alpha/z}",
   "I_0\\,(1 - \\alpha z)",
   "I_0\\,e^{-2\\alpha z}"
  ],
  "h": "α, coefficiente di assorbimento, dipende dal materiale."
 },
 {
  "id": "7.15",
  "c": 7,
  "n": "Attenuazione in dB",
  "q": "Attenuazione geometrica più assorbimento, in decibel",
  "t": "L = L(r) - \\beta\\,r,\\qquad \\beta = @@",
  "a": "10\\log_{10}(e)\\cdot\\alpha",
  "d": [
   "\\alpha",
   "20\\log_{10}(e)\\cdot\\alpha",
   "\\frac{\\alpha}{10\\log_{10}(e)}"
  ],
  "h": "Qui β è un'attenuazione in dB/m, non il modulo di compressibilità."
 },
 {
  "id": "7.16",
  "c": 7,
  "n": "Canna aperta–aperta",
  "q": "Canna aperta–aperta (o chiusa–chiusa): lunghezze d'onda e frequenze",
  "t": "\\lambda_n = \\frac{2L}{n},\\qquad f_n = @@",
  "a": "n\\,\\frac{v}{2L}",
  "d": [
   "n\\,\\frac{v}{4L}",
   "n\\,\\frac{2L}{v}",
   "(2n-1)\\,\\frac{v}{2L}"
  ],
  "h": "Estremo aperto = ventre di spostamento, chiuso = nodo. Tra due ventri c'è λ/2."
 },
 {
  "id": "7.17",
  "c": 7,
  "n": "Canna aperta–chiusa",
  "q": "Canna aperta–chiusa: lunghezze d'onda e frequenze",
  "t": "\\lambda_m = \\frac{4L}{2m-1},\\qquad f_m = @@",
  "a": "(2m-1)\\,\\frac{v}{4L}",
  "d": [
   "m\\,\\frac{v}{4L}",
   "(2m-1)\\,\\frac{v}{2L}",
   "(2m+1)\\,\\frac{v}{2L}"
  ],
  "h": "Solo armoniche dispari: tra ventre e nodo c'è λ/4."
 },
 {
  "id": "8.1",
  "c": 8,
  "n": "D'Alembert in 3D",
  "q": "Equazione di D'Alembert in 3D, con laplaciano e dalembertiano",
  "t": "\\nabla^2\\psi = @@,\\qquad \\Box\\,\\psi = 0",
  "a": "\\frac{1}{v^2}\\,\\frac{\\partial^2\\psi}{\\partial t^2}",
  "d": [
   "v^2\\,\\frac{\\partial^2\\psi}{\\partial t^2}",
   "\\frac{1}{v}\\,\\frac{\\partial\\psi}{\\partial t}",
   "\\frac{1}{v^2}\\,\\frac{\\partial\\psi}{\\partial t}"
  ],
  "h": "□ = (1/v²)∂²/∂t² − ∇². Vale per qualunque direzione di propagazione."
 },
 {
  "id": "8.2",
  "c": 8,
  "n": "Onda piana",
  "q": "Onda piana armonica in 3D con vettore d'onda",
  "t": "\\psi(\\vec{r},t) = @@",
  "a": "A\\cos(\\vec{k}\\cdot\\vec{r} - \\omega t)",
  "d": [
   "A\\cos(k\\,r - \\omega t)",
   "\\frac{A}{r}\\cos(\\vec{k}\\cdot\\vec{r} - \\omega t)",
   "A\\cos(\\vec{k}\\times\\vec{r} - \\omega t)"
  ],
  "h": "|k| = 2π/λ. Fronti d'onda: piani perpendicolari a k; ampiezza costante."
 },
 {
  "id": "8.3",
  "c": 8,
  "n": "Dispersione in 3D",
  "q": "Relazione di dispersione in 3D",
  "t": "k_x^2 + k_y^2 + k_z^2 = @@",
  "a": "\\frac{\\omega^2}{v^2}",
  "d": [
   "\\frac{v^2}{\\omega^2}",
   "\\omega^2 v^2",
   "\\frac{\\omega}{v}"
  ],
  "h": "Si ottiene mettendo l'onda piana in D'Alembert 3D."
 },
 {
  "id": "8.4",
  "c": 8,
  "n": "Onda sferica",
  "q": "Onda sferica: come calano intensità e ampiezza con la distanza",
  "t": "I(r) = \\frac{I_1\\,r_1^2}{r^2},\\qquad A(r) \\propto @@",
  "a": "\\frac{1}{r}",
  "d": [
   "\\frac{1}{r^2}",
   "\\frac{1}{\\sqrt{r}}",
   "e^{-r}"
  ],
  "h": "I ∝ A²: l'intensità cala come 1/r², l'ampiezza come 1/r."
 },
 {
  "id": "8.5",
  "c": 8,
  "n": "Laplaciano",
  "q": "Laplaciano come divergenza del gradiente",
  "t": "\\nabla^2\\psi = @@",
  "a": "\\nabla\\cdot\\nabla\\psi = \\frac{\\partial^2\\psi}{\\partial x^2} + \\frac{\\partial^2\\psi}{\\partial y^2} + \\frac{\\partial^2\\psi}{\\partial z^2}",
  "d": [
   "\\nabla\\times\\nabla\\psi",
   "\\left(\\frac{\\partial\\psi}{\\partial x} + \\frac{\\partial\\psi}{\\partial y} + \\frac{\\partial\\psi}{\\partial z}\\right)^2",
   "\\nabla\\cdot\\nabla\\psi = \\frac{\\partial^2\\psi}{\\partial x\\,\\partial y} + \\frac{\\partial^2\\psi}{\\partial y\\,\\partial z} + \\frac{\\partial^2\\psi}{\\partial z\\,\\partial x}"
  ],
  "h": "Gradiente: da scalare a vettore. Divergenza: da vettore a scalare."
 },
 {
  "id": "9.1",
  "c": 9,
  "n": "Doppler generale",
  "q": "Effetto Doppler nel caso generale, ascoltatore e sorgente in moto",
  "t": "f' = f\\,@@",
  "a": "\\frac{c \\pm v_A}{c \\mp v_S}",
  "d": [
   "\\frac{c \\mp v_S}{c \\pm v_A}",
   "\\frac{c \\pm v_S}{c \\mp v_A}",
   "\\frac{c \\pm v_A}{c \\pm v_S}"
  ],
  "h": "Segni in alto quando si avvicinano. Avvicinarsi alza sempre la frequenza."
 },
 {
  "id": "9.2",
  "c": 9,
  "n": "Ascoltatore in moto",
  "q": "Doppler con ascoltatore in moto e sorgente ferma",
  "t": "f' = @@",
  "a": "f\\,\\frac{c \\pm v_A}{c}",
  "d": [
   "f\\,\\frac{c}{c \\mp v_A}",
   "f\\,\\frac{c}{c \\pm v_A}",
   "f\\,\\frac{c \\pm v_A}{v_A}"
  ],
  "h": "+ se si avvicina. λ non cambia, cambia la velocità relativa c ± v_A."
 },
 {
  "id": "9.3",
  "c": 9,
  "n": "Sorgente in moto",
  "q": "Doppler con sorgente in moto e ascoltatore fermo",
  "t": "f' = @@",
  "a": "f\\,\\frac{c}{c \\mp v_S}",
  "d": [
   "f\\,\\frac{c \\pm v_S}{c}",
   "f\\,\\frac{c}{c \\pm v_S}",
   "f\\,\\frac{c \\mp v_S}{c}"
  ],
  "h": "− al denominatore se si avvicina: i fronti si schiacciano, λ′ = (c − v_S)T."
 },
 {
  "id": "9.4",
  "c": 9,
  "n": "Casi limite Doppler",
  "q": "Ascoltatore che si avvicina a velocità c; sorgente che si avvicina a velocità c",
  "t": "v_A = c:\\ f' = @@;\\qquad v_S = c:\\ f' \\to \\infty",
  "a": "2f",
  "d": [
   "\\infty",
   "\\frac{f}{2}",
   "0"
  ],
  "h": "La sorgente a velocità c schiaccia i fronti: λ′ → 0."
 },
 {
  "id": "9.5",
  "c": 9,
  "n": "Cono di Mach",
  "q": "Semiapertura del cono di Mach quando v_S > c",
  "t": "\\sin\\theta = @@",
  "a": "\\frac{c}{v_S}",
  "d": [
   "\\frac{v_S}{c}",
   "\\frac{c}{v_S + c}",
   "\\frac{v_S - c}{v_S}"
  ],
  "h": "Boom sonico. Stesso principio dell'effetto Cherenkov."
 },
 {
  "id": "10.1",
  "c": 10,
  "n": "Somma di due onde",
  "q": "Somma di due onde uguali sfasate di φ",
  "t": "A_0\\cos(kx - \\omega t) + A_0\\cos(kx - \\omega t + \\varphi) = @@",
  "a": "2A_0\\cos\\frac{\\varphi}{2}\\,\\cos\\left(kx - \\omega t + \\frac{\\varphi}{2}\\right)",
  "d": [
   "2A_0\\cos\\varphi\\,\\cos\\left(kx - \\omega t + \\frac{\\varphi}{2}\\right)",
   "A_0\\cos\\frac{\\varphi}{2}\\,\\cos\\left(kx - \\omega t + \\frac{\\varphi}{2}\\right)",
   "2A_0\\cos\\frac{\\varphi}{2}\\,\\cos\\left(kx - \\omega t + \\varphi\\right)"
  ],
  "h": "L'ampiezza risultante è 2A₀cos(φ/2)."
 },
 {
  "id": "10.2",
  "c": 10,
  "n": "Fase e cammino ottico",
  "q": "Legame tra fase e differenza di cammino ottico",
  "t": "\\varphi = @@",
  "a": "\\frac{2\\pi}{\\lambda}\\,\\Delta\\ell = k\\,\\Delta\\ell",
  "d": [
   "\\frac{\\lambda}{2\\pi}\\,\\Delta\\ell",
   "\\frac{\\Delta\\ell}{\\lambda}",
   "2\\pi\\,\\lambda\\,\\Delta\\ell"
  ],
  "h": "Δℓ = nλ costruttiva, Δℓ = (2n + 1)λ/2 distruttiva."
 },
 {
  "id": "10.3",
  "c": 10,
  "n": "Intensità di due onde",
  "q": "Intensità della somma di due onde sfasate (I₀ = singola onda)",
  "t": "I = @@",
  "a": "4I_0\\cos^2\\frac{\\varphi}{2}",
  "d": [
   "2I_0\\cos^2\\frac{\\varphi}{2}",
   "4I_0\\cos^2\\varphi",
   "4I_0\\cos\\frac{\\varphi}{2}"
  ],
  "h": "Massimo 4I₀, non 2I₀: l'intensità va col quadrato dell'ampiezza."
 },
 {
  "id": "10.4",
  "c": 10,
  "n": "Costruttiva e distruttiva",
  "q": "Condizioni sul cammino per interferenza costruttiva e distruttiva",
  "t": "\\text{costruttiva: } \\Delta\\ell = n\\lambda,\\qquad \\text{distruttiva: } \\Delta\\ell = @@",
  "a": "\\frac{2n+1}{2}\\,\\lambda",
  "d": [
   "2n\\,\\lambda",
   "\\frac{n}{2}\\,\\lambda",
   "(n+1)\\,\\lambda"
  ],
  "h": "n = 0, 1, 2, … In fase φ = 2nπ, in controfase φ = (2n + 1)π."
 },
 {
  "id": "10.5",
  "c": 10,
  "n": "Young: differenza di cammino",
  "q": "Esperimento di Young: differenza di cammino e fase tra le due fenditure",
  "t": "\\Delta r = @@,\\qquad \\varphi = k\\,\\Delta r",
  "a": "d\\sin\\theta",
  "d": [
   "d\\cos\\theta",
   "\\frac{d}{\\sin\\theta}",
   "r\\sin\\theta"
  ],
  "h": "Schermo lontano: r ≫ d, raggi quasi paralleli, θ ≈ x/r."
 },
 {
  "id": "10.6",
  "c": 10,
  "n": "Young: intensità",
  "q": "Esperimento di Young: intensità sullo schermo in funzione di θ",
  "t": "I(\\theta) = I_0\\cos^2\\left(@@\\right)",
  "a": "\\frac{\\pi d\\sin\\theta}{\\lambda}",
  "d": [
   "\\frac{2\\pi d\\sin\\theta}{\\lambda}",
   "\\frac{\\pi a\\sin\\theta}{\\lambda}",
   "\\frac{\\pi\\lambda\\sin\\theta}{d}"
  ],
  "h": "Qui I₀ = I(0) è già il massimo centrale. L'argomento è kd sin θ/2."
 },
 {
  "id": "10.7",
  "c": 10,
  "n": "Young: massimi",
  "q": "Esperimento di Young: posizione dei massimi sullo schermo",
  "t": "d\\sin\\theta = n\\lambda,\\qquad x_{max} = @@",
  "a": "n\\,\\frac{\\lambda\\,r}{d}",
  "d": [
   "n\\,\\frac{d\\,r}{\\lambda}",
   "n\\,\\frac{\\lambda\\,d}{r}",
   "\\left(n + \\tfrac12\\right)\\frac{\\lambda\\,r}{d}"
  ],
  "h": "Spaziatura Δx = rλ/d, da cui si misura λ = Δx·d/r."
 },
 {
  "id": "10.8",
  "c": 10,
  "n": "Young: minimi",
  "q": "Esperimento di Young: condizione per i minimi",
  "t": "d\\sin\\theta = @@",
  "a": "\\left(n + \\tfrac12\\right)\\lambda",
  "d": [
   "n\\lambda",
   "\\frac{n\\lambda}{2}",
   "(2n+1)\\,\\lambda"
  ],
  "h": "Primo minimo sin θ = λ/(2d): esiste solo se d ≥ λ/2."
 },
 {
  "id": "11.1",
  "c": 11,
  "n": "Fenditura singola",
  "q": "Diffrazione da una fenditura di larghezza a: intensità",
  "t": "I(\\theta) = I_0\\,\\mathrm{sinc}^2\\left(@@\\right)",
  "a": "\\frac{\\pi a\\sin\\theta}{\\lambda}",
  "d": [
   "\\frac{2\\pi a\\sin\\theta}{\\lambda}",
   "\\frac{\\pi\\lambda\\sin\\theta}{a}",
   "\\frac{\\pi d\\sin\\theta}{\\lambda}"
  ],
  "h": "L'argomento è ka sin θ/2. In ampiezza: E₀ sinc(…)."
 },
 {
  "id": "11.2",
  "c": 11,
  "n": "Minimi della fenditura",
  "q": "Fenditura singola: posizione dei minimi",
  "t": "a\\sin\\theta = @@",
  "a": "n\\lambda,\\quad n = \\pm1, \\pm2, \\dots",
  "d": [
   "\\left(n + \\tfrac12\\right)\\lambda",
   "n\\lambda,\\quad n = 0, \\pm1, \\pm2, \\dots",
   "\\frac{n\\lambda}{2}"
  ],
  "h": "n ≠ 0: θ = 0 è il massimo centrale. Il primo minimo esiste solo se a ≥ λ."
 },
 {
  "id": "11.3",
  "c": 11,
  "n": "Apertura rettangolare",
  "q": "Diffrazione da un'apertura rettangolare a × b",
  "t": "I(\\theta_a,\\theta_b) = I_0\\,@@",
  "a": "\\mathrm{sinc}^2\\left(\\frac{ka}{2}\\sin\\theta_a\\right)\\mathrm{sinc}^2\\left(\\frac{kb}{2}\\sin\\theta_b\\right)",
  "d": [
   "\\mathrm{sinc}^2\\left(\\frac{ka}{2}\\sin\\theta_a\\right) + \\mathrm{sinc}^2\\left(\\frac{kb}{2}\\sin\\theta_b\\right)",
   "\\mathrm{sinc}^2\\left(\\frac{k(a+b)}{2}\\sin\\theta\\right)",
   "\\mathrm{sinc}\\left(\\frac{ka}{2}\\sin\\theta_a\\right)\\mathrm{sinc}\\left(\\frac{kb}{2}\\sin\\theta_b\\right)"
  ],
  "h": "Prodotto delle figure delle due fenditure."
 },
 {
  "id": "11.4",
  "c": 11,
  "n": "Disco di Airy",
  "q": "Apertura circolare di diametro D: intensità (disco di Airy)",
  "t": "I(\\theta) = I_0\\left[@@\\right]^2",
  "a": "\\frac{2J_1\\left(\\frac{kD}{2}\\sin\\theta\\right)}{\\frac{kD}{2}\\sin\\theta}",
  "d": [
   "\\frac{J_1\\left(\\frac{kD}{2}\\sin\\theta\\right)}{\\frac{kD}{2}\\sin\\theta}",
   "\\frac{2J_1\\left(kD\\sin\\theta\\right)}{kD\\sin\\theta}",
   "\\frac{2J_0\\left(\\frac{kD}{2}\\sin\\theta\\right)}{\\frac{kD}{2}\\sin\\theta}"
  ],
  "h": "J₁ è la Bessel di ordine 1. Zeri a (kD/2) sin θ = 3,832; 7,016; 10,173."
 },
 {
  "id": "11.5",
  "c": 11,
  "n": "Criterio di Rayleigh",
  "q": "Minimo angolo risolvibile da un'apertura circolare (Rayleigh)",
  "t": "\\theta_R \\simeq @@",
  "a": "1{,}22\\,\\frac{\\lambda}{D}",
  "d": [
   "1{,}22\\,\\frac{D}{\\lambda}",
   "\\frac{\\lambda}{D}",
   "3{,}832\\,\\frac{\\lambda}{D}"
  ],
  "h": "Da (kD/2) sin θ = 3,832. D più grande, risoluzione migliore."
 },
 {
  "id": "11.6",
  "c": 11,
  "n": "Risoluzione lineare",
  "q": "Risoluzione lineare sul rivelatore (focale f, apertura D)",
  "t": "x = @@",
  "a": "1{,}22\\,\\frac{\\lambda f}{D}",
  "d": [
   "1{,}22\\,\\frac{\\lambda D}{f}",
   "1{,}22\\,\\frac{f}{\\lambda D}",
   "\\frac{\\lambda f}{2D}"
  ],
  "h": "f/D è il rapporto focale (f-number). Reflex f/1,8 a 500 nm: circa 1 μm."
 },
 {
  "id": "11.7",
  "c": 11,
  "n": "Doppia fenditura",
  "q": "Doppia fenditura (larghezza a, distanza d): intensità",
  "t": "I(\\theta) = 4I_0'\\,@@",
  "a": "\\mathrm{sinc}^2\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)\\cos^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)",
  "d": [
   "\\mathrm{sinc}^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)\\cos^2\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)",
   "\\mathrm{sinc}^2\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right) + \\cos^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)",
   "\\mathrm{sinc}\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)\\cos\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)"
  ],
  "h": "Diffrazione (a) per interferenza (d). Massimi d sin θ = nλ, minimi di diffrazione a sin θ = mλ."
 },
 {
  "id": "11.8",
  "c": 11,
  "n": "N sorgenti coerenti",
  "q": "Interferenza di N sorgenti coerenti: intensità",
  "t": "I(\\theta) = I_0\\left[@@\\right]^2",
  "a": "\\frac{\\sin\\left(\\frac{N\\pi d\\sin\\theta}{\\lambda}\\right)}{\\sin\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)}",
  "d": [
   "\\frac{\\sin\\left(\\frac{N\\pi d\\sin\\theta}{\\lambda}\\right)}{\\frac{\\pi d\\sin\\theta}{\\lambda}}",
   "\\frac{\\sin\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)}{\\sin\\left(\\frac{N\\pi d\\sin\\theta}{\\lambda}\\right)}",
   "\\frac{\\sin\\left(\\frac{N\\pi a\\sin\\theta}{\\lambda}\\right)}{\\sin\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)}"
  ],
  "h": "Massimi principali I = N²I₀. Con N = 2 si ritrova Young."
 },
 {
  "id": "11.9",
  "c": 11,
  "n": "N sorgenti: minimi",
  "q": "N sorgenti: massimi principali, loro intensità e minimi",
  "t": "\\text{max: } d\\sin\\theta = n\\lambda,\\ I = N^2 I_0;\\qquad \\text{min: } d\\sin\\theta = @@",
  "a": "\\frac{n'\\lambda}{N},\\ \\ n' \\neq 0, N, 2N, \\dots",
  "d": [
   "\\frac{n'\\lambda}{N},\\ \\ n' = 0, 1, 2, \\dots",
   "\\frac{n'\\lambda}{2N}",
   "n'\\,N\\lambda"
  ],
  "h": "Tra due massimi principali: N − 1 minimi e N − 2 massimi secondari."
 },
 {
  "id": "11.10",
  "c": 11,
  "n": "Reticolo: intensità",
  "q": "Reticolo di N fenditure (larghezza a, passo d): intensità",
  "t": "I(\\theta) = I_{01}\\,@@",
  "a": "\\mathrm{sinc}^2\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)\\left[\\frac{\\sin\\left(\\frac{N\\pi d\\sin\\theta}{\\lambda}\\right)}{\\sin\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)}\\right]^2",
  "d": [
   "\\mathrm{sinc}^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)\\left[\\frac{\\sin\\left(\\frac{N\\pi a\\sin\\theta}{\\lambda}\\right)}{\\sin\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)}\\right]^2",
   "\\mathrm{sinc}^2\\left(\\frac{N\\pi a\\sin\\theta}{\\lambda}\\right)\\cos^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right)",
   "N\\,\\mathrm{sinc}^2\\left(\\frac{\\pi a\\sin\\theta}{\\lambda}\\right)\\cos^2\\left(\\frac{N\\pi d\\sin\\theta}{\\lambda}\\right)"
  ],
  "h": "Inviluppo di diffrazione per interferenza di N sorgenti. Picco centrale N²I₀₁."
 },
 {
  "id": "11.11",
  "c": 11,
  "n": "Reticolo: ordini",
  "q": "Reticolo: posizione dei massimi principali di ordine n",
  "t": "\\sin\\theta_n = @@",
  "a": "\\frac{n\\lambda}{d}",
  "d": [
   "\\frac{n\\lambda}{N d}",
   "\\frac{n\\,d}{\\lambda}",
   "\\frac{n\\lambda}{a}"
  ],
  "h": "sin θ ∝ λ: il rosso è deviato più del blu, al contrario del prisma."
 },
 {
  "id": "11.12",
  "c": 11,
  "n": "Dispersione del reticolo",
  "q": "Dispersione angolare di un reticolo",
  "t": "D = \\frac{d\\theta}{d\\lambda} = @@",
  "a": "\\frac{n}{d\\cos\\theta}",
  "d": [
   "\\frac{n}{d\\sin\\theta}",
   "\\frac{d\\cos\\theta}{n}",
   "\\frac{nN}{d\\cos\\theta}"
  ],
  "h": "Aumenta con l'ordine n."
 },
 {
  "id": "11.13",
  "c": 11,
  "n": "Larghezza dei massimi",
  "q": "Semilarghezza dei massimi di ordine n di un reticolo",
  "t": "\\Delta\\theta_{HW} = @@",
  "a": "\\frac{\\lambda}{N d\\cos\\theta}",
  "d": [
   "\\frac{N\\lambda}{d\\cos\\theta}",
   "\\frac{\\lambda}{d\\cos\\theta}",
   "\\frac{\\lambda}{N d\\sin\\theta}"
  ],
  "h": "= λD/(nN). Al centro vale λ/(Nd). Per ordini alti non si può usare sin θ ≈ θ."
 },
 {
  "id": "11.14",
  "c": 11,
  "n": "Potere risolutivo",
  "q": "Potere risolutivo di un reticolo",
  "t": "R = \\frac{\\lambda}{\\Delta\\lambda} = @@",
  "a": "n\\,N",
  "d": [
   "\\frac{N}{n}",
   "N",
   "\\frac{n\\,N}{d}"
  ],
  "h": "Più fenditure e ordini più alti danno risoluzione migliore."
 },
 {
  "id": "12.1",
  "c": 12,
  "n": "Indice di rifrazione",
  "q": "Indice di rifrazione, nelle tre forme",
  "t": "n = \\frac{c}{v} = @@",
  "a": "\\frac{k}{k_0} = \\frac{\\lambda_0}{\\lambda}",
  "d": [
   "\\frac{k_0}{k} = \\frac{\\lambda}{\\lambda_0}",
   "\\frac{k}{k_0} = \\frac{\\lambda}{\\lambda_0}",
   "\\frac{\\omega}{\\omega_0} = \\frac{\\lambda_0}{\\lambda}"
  ],
  "h": "ω non cambia tra i mezzi; cambiano v, k, λ. Aria 1,0003, acqua 1,33, vetro 1,5, diamante 2,4."
 },
 {
  "id": "12.2",
  "c": 12,
  "n": "Velocità della luce",
  "q": "Velocità della luce dalle equazioni di Maxwell",
  "t": "c = @@",
  "a": "\\frac{1}{\\sqrt{\\mu_0\\,\\varepsilon_0}}",
  "d": [
   "\\sqrt{\\mu_0\\,\\varepsilon_0}",
   "\\frac{1}{\\mu_0\\,\\varepsilon_0}",
   "\\sqrt{\\frac{\\mu_0}{\\varepsilon_0}}"
  ],
  "h": "E e B obbediscono all'equazione di D'Alembert."
 },
 {
  "id": "12.3",
  "c": 12,
  "n": "Snell–Cartesio",
  "q": "Legge di Snell–Cartesio per la rifrazione",
  "t": "n_1\\sin\\theta_i = @@",
  "a": "n_2\\sin\\theta_t",
  "d": [
   "n_2\\cos\\theta_t",
   "n_1\\sin\\theta_t",
   "\\frac{\\sin\\theta_t}{n_2}"
  ],
  "h": "Riflessione: θ_i = θ_r. Se n₂ > n₁ il raggio si avvicina alla normale."
 },
 {
  "id": "12.4",
  "c": 12,
  "n": "Angolo critico",
  "q": "Angolo critico per la riflessione totale",
  "t": "\\sin\\theta_c = @@\\qquad (n_2 < n_1)",
  "a": "\\frac{n_2}{n_1}",
  "d": [
   "\\frac{n_1}{n_2}",
   "n_1 - n_2",
   "\\frac{1}{n_1}"
  ],
  "h": "Esiste solo passando dal mezzo più denso al meno denso (fibre ottiche)."
 },
 {
  "id": "12.5",
  "c": 12,
  "n": "Finestra di Snell",
  "q": "Sott'acqua: angolo massimo di trasmissione e apertura del cono di luce",
  "t": "\\theta_t^{max} = \\arcsin\\frac{1}{1{,}334} \\simeq 48{,}6^\\circ,\\qquad \\alpha = @@",
  "a": "2\\,\\theta_t^{max} \\simeq 97^\\circ",
  "d": [
   "\\theta_t^{max} \\simeq 48{,}6^\\circ",
   "180^\\circ - \\theta_t^{max} \\simeq 131^\\circ",
   "2\\,\\theta_t^{max} \\simeq 180^\\circ"
  ],
  "h": "Da sott'acqua vedi tutto il cielo in un cerchio luminoso di apertura ≈ 97°."
 },
 {
  "id": "12.6",
  "c": 12,
  "n": "Principio di Fermat",
  "q": "Tempo di percorrenza tra S (altezza h) e P (profondità b) attraverso due mezzi",
  "t": "t(x) = @@",
  "a": "\\frac{\\sqrt{h^2 + x^2}}{v_1} + \\frac{\\sqrt{b^2 + (a - x)^2}}{v_2}",
  "d": [
   "\\frac{\\sqrt{h^2 + x^2}}{v_2} + \\frac{\\sqrt{b^2 + (a - x)^2}}{v_1}",
   "v_1\\sqrt{h^2 + x^2} + v_2\\sqrt{b^2 + (a - x)^2}",
   "\\frac{h + x}{v_1} + \\frac{b + a - x}{v_2}"
  ],
  "h": "dt/dx = 0 dà Snell. Forma variazionale: δ∫n ds = 0."
 },
 {
  "id": "12.7",
  "c": 12,
  "n": "Diottro sferico",
  "q": "Formula del diottro sferico (Cartesio per la rifrazione)",
  "t": "\\frac{n_1}{p} + \\frac{n_2}{q} = @@",
  "a": "\\frac{n_2 - n_1}{r}",
  "d": [
   "\\frac{n_1 - n_2}{r}",
   "\\frac{n_2 + n_1}{r}",
   "\\frac{n_2 - n_1}{2r}"
  ],
  "h": "n₁ è il mezzo dell'oggetto. r > 0 se l'oggetto vede la faccia convessa."
 },
 {
  "id": "12.8",
  "c": 12,
  "n": "Fuochi del diottro",
  "q": "Distanze focali del diottro: fuoco oggetto f₀ e fuoco immagine f_i",
  "t": "f_0 = \\frac{n_1}{n_2 - n_1}\\,r,\\qquad f_i = @@",
  "a": "\\frac{n_2}{n_2 - n_1}\\,r",
  "d": [
   "\\frac{n_1}{n_2 - n_1}\\,r",
   "\\frac{n_2 - n_1}{n_2}\\,r",
   "\\frac{n_2}{n_1 - n_2}\\,r"
  ],
  "h": "f_i − f₀ = r e n₁/f₀ = n₂/f_i."
 },
 {
  "id": "12.9",
  "c": 12,
  "n": "Specchio sferico",
  "q": "Formula dello specchio sferico",
  "t": "\\frac{1}{p} + \\frac{1}{q} = @@ = \\frac{1}{f}",
  "a": "\\frac{2}{r}",
  "d": [
   "\\frac{1}{r}",
   "\\frac{1}{2r}",
   "\\frac{r}{2}"
  ],
  "h": "f = r/2. Concavo r > 0 (immagine reale), convesso r < 0 (virtuale), piano r → ∞."
 },
 {
  "id": "12.10",
  "c": 12,
  "n": "Costruttore di lenti",
  "q": "Equazione del costruttore di lenti",
  "t": "\\frac{1}{f} = @@",
  "a": "(n - 1)\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)",
  "d": [
   "(n - 1)\\left(\\frac{1}{r_1} + \\frac{1}{r_2}\\right)",
   "n\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)",
   "(n + 1)\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)"
  ],
  "h": "Lente sottile = due diottri in successione, spessore trascurabile."
 },
 {
  "id": "12.11",
  "c": 12,
  "n": "Lente sottile",
  "q": "Formula delle lenti sottili",
  "t": "@@ = \\frac{1}{f}",
  "a": "\\frac{1}{p} + \\frac{1}{q}",
  "d": [
   "\\frac{1}{p} - \\frac{1}{q}",
   "\\frac{1}{p\\,q}",
   "p + q"
  ],
  "h": "f > 0 lente convergente, f < 0 divergente. Il raggio per il centro non è deviato."
 },
 {
  "id": "12.12",
  "c": 12,
  "n": "Ingrandimento: specchio",
  "q": "Ingrandimento di uno specchio",
  "t": "M = @@",
  "a": "-\\frac{q}{p}",
  "d": [
   "\\frac{q}{p}",
   "-\\frac{p}{q}",
   "-\\frac{n_1\\,q}{n_2\\,p}"
  ],
  "h": "M > 0 immagine dritta, M < 0 capovolta."
 },
 {
  "id": "12.13",
  "c": 12,
  "n": "Ingrandimento: diottro",
  "q": "Ingrandimento di un diottro",
  "t": "M = @@",
  "a": "-\\frac{n_1\\,q}{n_2\\,p}",
  "d": [
   "-\\frac{n_2\\,q}{n_1\\,p}",
   "-\\frac{q}{p}",
   "\\frac{n_1\\,q}{n_2\\,p}"
  ],
  "h": "Viene da sin θ_t / sin θ_i = n₁/n₂."
 }
];

/* Concetto: id, c, title, see (cosa sto vedendo), why (perché succede), tex (formule), exam (spiegazione da esame, passo per passo), cards, lab, pdf. */
const CONCEPTS = [];
