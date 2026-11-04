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
  "h": "Forza di richiamo F = −αx. Per piccole oscillazioni attorno a un minimo del potenziale α = U″(x₀).",
  "sym": [
   [
    "\\ddot{x}",
    "accelerazione (m/s²)"
   ],
   [
    "x",
    "spostamento dall'equilibrio (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\alpha",
    "costante elastica generalizzata, $F=-\\alpha x$ (N/m)"
   ],
   [
    "m",
    "massa (kg)"
   ]
  ],
  "val": "Forza di richiamo lineare $F=-\\alpha x$, nessun attrito, nessuna forzante. Per un potenziale qualsiasi vale solo per piccoli spostamenti attorno a un minimo stabile.",
  "err": "Scrivere $\\ddot x+\\omega_0 x=0$: senza il quadrato le dimensioni non tornano, perché $\\omega_0$ è in $\\mathrm{s^{-1}}$ mentre $\\ddot x/x$ è in $\\mathrm{s^{-2}}$.",
  "lab": "1",
  "rel": [
   "1.2",
   "1.3",
   "1.12",
   "2.1"
  ],
  "pdf": "p. 13, 17"
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
  "h": "α = U″(x₀), la curvatura del potenziale nel minimo. Molla: α = k; pendolo: α = mg/l.",
  "sym": [
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\alpha",
    "costante elastica generalizzata, $\\alpha=U''(x_0)$ (N/m)"
   ],
   [
    "m",
    "massa (kg)"
   ]
  ],
  "val": "Piccole oscillazioni attorno a un minimo stabile, dove $\\alpha=U''(x_0)>0$. Molla: $\\alpha=k$; pendolo: $\\alpha=mg/l$.",
  "err": "Pensare che $\\omega_0$ dipenda dall'ampiezza o dalle condizioni iniziali: dipende solo da $\\alpha$ e $m$, cioè dal sistema. Le condizioni iniziali fissano solo ampiezza e fase.",
  "lab": "1",
  "rel": [
   "1.1",
   "1.5",
   "1.6",
   "1.12"
  ],
  "pdf": "p. 16–17"
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
  "h": "Due costanti arbitrarie, fissate dalle due condizioni iniziali.",
  "sym": [
   [
    "x(t)",
    "legge oraria, spostamento dall'equilibrio (m)"
   ],
   [
    "A,\\ B",
    "costanti arbitrarie (m)"
   ],
   [
    "C",
    "ampiezza (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "\\varphi",
    "fase iniziale (rad)"
   ]
  ],
  "val": "Oscillatore armonico libero e non smorzato. Le due forme sono equivalenti: $A=C\\cos\\varphi$, $B=-C\\sin\\varphi$.",
  "err": "Credere che basti una costante: un'equazione del secondo ordine richiede due costanti indipendenti ($A,B$ oppure $C,\\varphi$), perché servono due condizioni iniziali, $x_0$ e $v_0$.",
  "lab": "1",
  "rel": [
   "1.8",
   "1.9",
   "1.1"
  ],
  "pdf": "p. 13, 15"
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
  "h": "ω₀ in rad/s, ν in Hz. Errore classico: T = 1/ω₀.",
  "sym": [
   [
    "T",
    "periodo (s)"
   ],
   [
    "\\nu",
    "frequenza, cicli al secondo (Hz)"
   ],
   [
    "\\omega_0",
    "pulsazione (rad/s)"
   ]
  ],
  "val": "Ogni moto armonico semplice. $T$ non dipende dall'ampiezza (isocronismo).",
  "err": "Confondere $\\nu$ e $\\omega_0$: $\\omega_0$ è in rad/s, $\\nu$ in Hz, e differiscono di $2\\pi$. Con $\\omega_0=10\\,\\mathrm{rad/s}$ il periodo è $T=0{,}628\\,\\mathrm s$, non $0{,}1\\,\\mathrm s$.",
  "lab": "1",
  "rel": [
   "1.5",
   "1.2",
   "2.15"
  ],
  "pdf": "p. 14"
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
  "h": "Caso α = k. Controllo: √(kg/(N/m)) = s.",
  "sym": [
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "k",
    "costante elastica della molla (N/m)"
   ],
   [
    "m",
    "massa del blocco (kg)"
   ],
   [
    "T",
    "periodo (s)"
   ]
  ],
  "val": "Molla ideale senza massa, piano senza attrito, tutta la massa nel blocco.",
  "err": "Invertire $m$ e $k$ sotto radice. Controllo: una massa più grande oscilla più lentamente, quindi $T$ cresce con $m$. Esempio degli appunti: $m=1\\,\\mathrm{kg}$, $k=100\\,\\mathrm{N/m}$ danno $\\omega_0=10\\,\\mathrm{rad/s}$ e $T=0{,}628\\,\\mathrm s$.",
  "lab": "1",
  "rel": [
   "1.2",
   "1.4",
   "1.8"
  ],
  "pdf": "p. 13–14"
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
  "h": "Solo per θ ≪ 1 (sin θ ≈ θ). Non dipende da massa e ampiezza: isocronismo.",
  "sym": [
   [
    "\\vartheta",
    "angolo dalla verticale (rad)"
   ],
   [
    "\\ddot{\\vartheta}",
    "accelerazione angolare (rad/s²)"
   ],
   [
    "g",
    "accelerazione di gravità (m/s²)"
   ],
   [
    "l",
    "lunghezza del filo (m)"
   ],
   [
    "T",
    "periodo (s)"
   ]
  ],
  "val": "Piccole oscillazioni, $\\vartheta\\ll1$ in radianti; filo inestensibile e senza massa, moto piano. L'equazione esatta $\\ddot\\vartheta+\\frac{g}{l}\\sin\\vartheta=0$ non è lineare.",
  "err": "Pensare che una massa più grande oscilli più lentamente: $m$ si semplifica perché massa inerziale e gravitazionale coincidono. Anche l'ampiezza non conta, ma solo finché $\\sin\\vartheta\\simeq\\vartheta$.",
  "lab": "1",
  "rel": [
   "1.11",
   "1.7",
   "1.2"
  ],
  "pdf": "p. 16"
 },
 {
  "id": "1.7",
  "c": 1,
  "n": "Pendolo dal potenziale",
  "q": "Potenziale del pendolo sviluppato per x ≪ l (x spostamento orizzontale), con la prima correzione",
  "t": "U(x) = mgl\\left[1-\\sqrt{1-\\frac{x^2}{l^2}}\\right] \\simeq @@",
  "a": "\\frac{mg}{2l}\\,x^2 + \\frac{mg}{8l^3}\\,x^4",
  "d": [
   "\\frac{mg}{l}\\,x^2 + \\frac{mg}{2l^3}\\,x^4",
   "\\frac{mgl}{2}\\,x^2 + \\frac{mgl}{8}\\,x^4",
   "\\frac{mg}{2l}\\,x^2 - \\frac{mg}{8l^3}\\,x^4"
  ],
  "h": "Il termine in x² dà α = mg/l. Viene da √(1−u) ≈ 1 − u/2 − u²/8.",
  "sym": [
   [
    "U(x)",
    "energia potenziale gravitazionale, con $U(0)=0$ (J)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "g",
    "accelerazione di gravità (m/s²)"
   ],
   [
    "l",
    "lunghezza del filo (m)"
   ],
   [
    "x",
    "spostamento orizzontale della massa, non l'arco (m)"
   ]
  ],
  "val": "$x\\ll l$, con $x$ spostamento orizzontale. Il termine in $x^2$ dà l'oscillatore armonico ($\\alpha=mg/l$); quello in $x^4$ è la prima correzione anarmonica.",
  "err": "Sbagliare lo sviluppo $\\sqrt{1-u}\\simeq1-\\frac u2-\\frac{u^2}{8}$: nel potenziale il termine in $x^4$ ha segno $+$, quindi la forza è $-\\frac{mg}{l}\\left(x+\\frac{x^3}{2l^2}\\right)$. Gli appunti scrivono anche $\\vec F=\\nabla U$: il segno giusto è $\\vec F=-\\nabla U$.",
  "lab": "1",
  "rel": [
   "1.6",
   "1.12",
   "1.2"
  ],
  "pdf": "p. 16"
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
  "h": "Se x₀ = 0 serve v₀ ≠ 0 (parte col seno); se v₀ = 0 parte da fermo (coseno).",
  "sym": [
   [
    "x(t)",
    "legge oraria (m)"
   ],
   [
    "x_0",
    "posizione iniziale $x(0)$ (m)"
   ],
   [
    "v_0",
    "velocità iniziale $\\dot x(0)$ (m/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Oscillatore armonico libero; $v_0$ è impresso istantaneamente in $t=0$.",
  "err": "Scrivere $v_0\\sin(\\omega_0 t)$: il coefficiente del seno deve essere una lunghezza, quindi $v_0/\\omega_0$. Si verifica derivando: $\\dot x(0)=B\\omega_0=v_0$.",
  "lab": "1",
  "rel": [
   "1.3",
   "1.9",
   "1.13"
  ],
  "pdf": "p. 14–15"
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
  "h": "È il caso γ = 0 delle formule del sottosmorzato.",
  "sym": [
   [
    "C",
    "ampiezza (m)"
   ],
   [
    "x_0",
    "posizione iniziale (m)"
   ],
   [
    "v_0",
    "velocità iniziale (m/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase iniziale (rad)"
   ]
  ],
  "val": "Oscillatore libero non smorzato ($\\gamma=0$), scritto come $x=C\\cos(\\omega_0 t+\\varphi)$.",
  "err": "Sommare $x_0^2+v_0^2$: grandezze con dimensioni diverse, la velocità va divisa per $\\omega_0$. Inoltre $\\tan\\varphi$ non fissa il quadrante: va scelto dai segni di $\\cos\\varphi=x_0/C$ e $\\sin\\varphi=-v_0/(\\omega_0C)$.",
  "lab": "1",
  "rel": [
   "1.8",
   "2.7",
   "2.8"
  ],
  "pdf": "p. 15, 20"
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
  "h": "= ½αA² = ½mv²max con v_max = ω₀A. Costante: sistema conservativo. U e T sfasate.",
  "sym": [
   [
    "E",
    "energia meccanica totale (J)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\dot{x}",
    "velocità (m/s)"
   ],
   [
    "\\alpha",
    "costante elastica generalizzata (N/m)"
   ],
   [
    "x",
    "spostamento (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "A",
    "ampiezza (m)"
   ]
  ],
  "val": "Sistema conservativo, senza attrito né forzante. $E$ è costante e il moto è reversibile: se $x(t)$ è soluzione lo è anche $x(-t)$.",
  "err": "Dimenticare il quadrato su $\\omega_0$ o su $A$. Controllo rapido: $E=\\frac12 m v_{max}^2$ con $v_{max}=\\omega_0 A$.",
  "lab": "1",
  "rel": [
   "1.14",
   "1.13",
   "2.10"
  ],
  "pdf": "p. 17–18"
 },
 {
  "id": "1.11",
  "c": 1,
  "n": "Pendolo: equazione esatta",
  "q": "Equazione esatta del pendolo semplice, prima dell'approssimazione di piccoli angoli",
  "t": "\\ddot{\\vartheta} + @@ = 0",
  "a": "\\frac{g}{l}\\,\\sin\\vartheta",
  "d": [
   "\\frac{g}{l}\\,\\cos\\vartheta",
   "\\frac{mg}{l}\\,\\sin\\vartheta",
   "\\frac{l}{g}\\,\\sin\\vartheta"
  ],
  "h": "Da m l ϑ̈ = −mg sin ϑ lungo la tangente (x = lϑ). Non è lineare: diventa armonica solo per ϑ ≪ 1.",
  "sym": [
   [
    "\\vartheta",
    "angolo dalla verticale (rad)"
   ],
   [
    "\\ddot{\\vartheta}",
    "accelerazione angolare (rad/s²)"
   ],
   [
    "g",
    "accelerazione di gravità (m/s²)"
   ],
   [
    "l",
    "lunghezza del filo (m)"
   ]
  ],
  "val": "Pendolo semplice: filo inestensibile senza massa, moto piano, nessun attrito. Esatta per ogni ampiezza.",
  "err": "Trattarla come un oscillatore armonico anche per ampiezze grandi: $\\sin\\vartheta\\simeq\\vartheta$ vale solo per $\\vartheta\\ll1$; altrimenti l'equazione non è lineare e l'isocronismo non è garantito.",
  "lab": "1",
  "rel": [
   "1.6",
   "1.7"
  ],
  "pdf": "p. 16"
 },
 {
  "id": "1.12",
  "c": 1,
  "n": "Potenziale vicino a un minimo",
  "q": "Sviluppo del potenziale attorno a un minimo stabile x₀ e pulsazione delle piccole oscillazioni",
  "t": "U(x) \\simeq U(x_0) + @@,\\qquad \\omega_0^2 = \\frac{U''(x_0)}{m}",
  "a": "\\tfrac12\\,U''(x_0)\\,(x-x_0)^2",
  "d": [
   "U'(x_0)\\,(x-x_0)",
   "U''(x_0)\\,(x-x_0)^2",
   "\\tfrac12\\,U'(x_0)\\,(x-x_0)^2"
  ],
  "h": "Nel minimo U′(x₀) = 0 e U″(x₀) > 0: vicino a un minimo ogni potenziale è una parabola e dà un oscillatore armonico con α = U″(x₀).",
  "sym": [
   [
    "U(x)",
    "energia potenziale (J)"
   ],
   [
    "x_0",
    "posizione di equilibrio stabile (m)"
   ],
   [
    "U''(x_0)",
    "curvatura del potenziale nel minimo, cioè $\\alpha$ (N/m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "\\omega_0",
    "pulsazione delle piccole oscillazioni (rad/s)"
   ],
   [
    "m",
    "massa (kg)"
   ]
  ],
  "val": "Piccoli spostamenti $|x-x_0|$, finché i termini di ordine superiore (come $x^4$ nel pendolo) sono trascurabili; serve $U''(x_0)>0$.",
  "err": "Tenere un termine lineare: nel minimo $U'(x_0)=0$, altrimenti non sarebbe un equilibrio. Dimenticare il $\\frac12$ porta a $\\omega_0^2=2U''/m$, sbagliato.",
  "lab": "1",
  "rel": [
   "1.2",
   "1.7",
   "1.1"
  ],
  "pdf": "p. 16–17"
 },
 {
  "id": "1.13",
  "c": 1,
  "n": "Velocità dell'oscillatore",
  "q": "Velocità dell'oscillatore armonico e suo valore massimo",
  "t": "x = A\\cos(\\omega_0 t+\\varphi),\\qquad \\dot{x} = @@",
  "a": "-\\omega_0 A\\sin(\\omega_0 t+\\varphi)",
  "d": [
   "\\omega_0 A\\sin(\\omega_0 t+\\varphi)",
   "-\\frac{A}{\\omega_0}\\sin(\\omega_0 t+\\varphi)",
   "-\\omega_0 A\\cos(\\omega_0 t+\\varphi)"
  ],
  "h": "v_max = ω₀A, nel passaggio per l'equilibrio. Velocità e spostamento sono sfasati di π/2.",
  "sym": [
   [
    "x",
    "spostamento (m)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "\\varphi",
    "fase iniziale (rad)"
   ],
   [
    "\\dot{x}",
    "velocità (m/s)"
   ]
  ],
  "val": "Oscillatore armonico libero non smorzato.",
  "err": "Disegnare la velocità che parte crescendo quando $x$ parte dal massimo, come a p. 17: con $x=A\\cos\\omega_0t$ si ha $\\dot x=-\\omega_0A\\sin\\omega_0t$, che parte da 0 e diventa negativa. Esempio di p. 14: $A=0{,}01\\,\\mathrm m$, $\\omega_0=10\\,\\mathrm{rad/s}$ danno $v_{max}=0{,}1\\,\\mathrm{m/s}$.",
  "lab": "1",
  "rel": [
   "1.3",
   "1.10",
   "1.14"
  ],
  "pdf": "p. 14, 17"
 },
 {
  "id": "1.14",
  "c": 1,
  "n": "Cinetica e potenziale nel tempo",
  "q": "Energia potenziale e cinetica dell'oscillatore armonico istante per istante",
  "t": "U(t) = \\tfrac12\\alpha A^2\\cos^2(\\omega_0 t+\\varphi),\\quad T(t) = @@",
  "a": "\\tfrac12\\alpha A^2\\sin^2(\\omega_0 t+\\varphi)",
  "d": [
   "\\tfrac12\\alpha A^2\\cos^2(\\omega_0 t+\\varphi)",
   "\\tfrac12 m\\,\\omega_0 A^2\\sin^2(\\omega_0 t+\\varphi)",
   "\\tfrac12\\alpha A\\sin^2(\\omega_0 t+\\varphi)"
  ],
  "h": "T = ½mω₀²A² sin² e mω₀² = α. La somma è costante, ½αA²; le due energie oscillano con fase 2ω₀t, in opposizione.",
  "sym": [
   [
    "U(t)",
    "energia potenziale (J)"
   ],
   [
    "T(t)",
    "energia cinetica (J), qui non è il periodo"
   ],
   [
    "\\alpha",
    "costante elastica generalizzata (N/m)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase iniziale (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Oscillatore armonico non smorzato, $x=A\\cos(\\omega_0t+\\varphi)$.",
  "err": "Dire che $U$ e $T$ sono sfasate di $\\pi$ in $\\omega_0t$, come gli appunti a p. 17: $\\cos^2$ e $\\sin^2$ sono sfasate di $\\pi/2$ in $\\omega_0t$. Sono in opposizione perché oscillano con fase $2\\omega_0t$, e lì lo sfasamento è $\\pi$.",
  "lab": "1",
  "rel": [
   "1.10",
   "1.13"
  ],
  "pdf": "p. 17"
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
  "h": "Forza viscosa F = −2γmẋ, con γ > 0 in s⁻¹.",
  "sym": [
   [
    "\\ddot{x}",
    "accelerazione (m/s²)"
   ],
   [
    "\\dot{x}",
    "velocità (m/s)"
   ],
   [
    "x",
    "spostamento (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega_0",
    "pulsazione propria senza attrito (rad/s)"
   ]
  ],
  "val": "Attrito viscoso $F=-2\\gamma m\\dot x$, proporzionale alla velocità, con $\\gamma>0$. L'attrito radente $\\mu mg$ è trascurato.",
  "err": "Dimenticare il 2 della convenzione: con $F=-2\\gamma m\\dot x$ l'equazione ha $2\\gamma\\dot x$, e tutte le formule successive ($e^{-\\gamma t}$, $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$) usano questo $\\gamma$.",
  "lab": "2",
  "rel": [
   "2.12",
   "2.2",
   "1.1"
  ],
  "pdf": "p. 18"
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
  "h": "Da λ² + 2γλ + ω₀² = 0. Il segno di γ² − ω₀² decide il regime.",
  "sym": [
   [
    "\\lambda_{1,2}",
    "radici dell'equazione caratteristica, in generale complesse (s⁻¹)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ]
  ],
  "val": "Soluzioni di prova $x=e^{\\lambda t}$ dell'equazione $\\ddot x+2\\gamma\\dot x+\\omega_0^2x=0$; il discriminante è $\\gamma^2-\\omega_0^2$.",
  "err": "Mettere $\\omega_0^2-\\gamma^2$ sotto radice: quella è la pulsazione $\\omega$ del sottosmorzato, dove le radici sono $-\\gamma\\pm i\\omega$. Il discriminante dell'equazione $\\lambda^2+2\\gamma\\lambda+\\omega_0^2=0$ è $\\gamma^2-\\omega_0^2$.",
  "lab": "2",
  "rel": [
   "2.3",
   "2.4",
   "2.5"
  ],
  "pdf": "p. 18–19"
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
  "h": "Somma di due decadimenti esponenziali, nessuna oscillazione.",
  "sym": [
   [
    "x(t)",
    "legge oraria (m)"
   ],
   [
    "C_1,\\ C_2",
    "costanti dalle condizioni iniziali (m)"
   ],
   [
    "\\lambda_1,\\ \\lambda_2",
    "radici reali negative, $-\\gamma\\pm\\sqrt{\\gamma^2-\\omega_0^2}$ (s⁻¹)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Sovrasmorzato: $\\gamma>\\omega_0$, radici reali e distinte, entrambe negative.",
  "err": "Pensare che $\\lambda_1=-\\gamma+\\sqrt{\\gamma^2-\\omega_0^2}$ possa essere positiva: è sempre negativa perché $\\sqrt{\\gamma^2-\\omega_0^2}<\\gamma$. Niente crescita esponenziale e niente oscillazioni; il ritorno è lento, dominato dalla radice più piccola in modulo.",
  "lab": "2",
  "rel": [
   "2.2",
   "2.4",
   "2.5"
  ],
  "pdf": "p. 19"
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
  "h": "Una sola radice: la seconda soluzione è t·e^(−γt). È il ritorno all'equilibrio più rapido senza oscillare (es. ammortizzatori).",
  "sym": [
   [
    "x(t)",
    "legge oraria (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento, qui $\\gamma=\\omega_0$ (s⁻¹)"
   ],
   [
    "C_1",
    "costante (m)"
   ],
   [
    "C_2",
    "costante (m/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Smorzamento critico: $\\gamma=\\omega_0$, radice doppia $\\lambda=-\\gamma$.",
  "err": "Scrivere $C_1e^{-\\gamma t}+C_2e^{-\\gamma t}$: è una sola funzione con costante $C_1+C_2$, non basta per due condizioni iniziali. Serve la seconda soluzione indipendente $te^{-\\gamma t}$.",
  "lab": "2",
  "rel": [
   "2.2",
   "2.3",
   "2.5"
  ],
  "pdf": "p. 19"
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
  "h": "ω < ω₀, quindi T > T₀. In τ = 1/γ l'ampiezza cala di un fattore 1/e.",
  "sym": [
   [
    "x(t)",
    "legge oraria (m)"
   ],
   [
    "A",
    "ampiezza iniziale dell'inviluppo (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ],
   [
    "\\varphi",
    "fase (rad)"
   ],
   [
    "\\omega_0",
    "pulsazione propria senza attrito (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Sottosmorzato: $\\gamma<\\omega_0$, radici complesse coniugate $-\\gamma\\pm i\\omega$.",
  "err": "Usare $\\omega_0$ al posto di $\\omega$ nella legge oraria, come fanno gli appunti a p. 12: la differenza è piccola per $\\gamma\\ll\\omega_0$, ma l'errore di fase si accumula ciclo dopo ciclo.",
  "lab": "2",
  "rel": [
   "2.6",
   "2.15",
   "2.13",
   "2.7"
  ],
  "pdf": "p. 19–20"
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
  "h": "Correzione del secondo ordine: spesso trascurabile in ω, mai nell'esponenziale.",
  "sym": [
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ]
  ],
  "val": "$\\gamma/\\omega_0\\ll1$: sviluppo $\\sqrt{1-u}\\simeq1-u/2$ con $u=(\\gamma/\\omega_0)^2$.",
  "err": "Credere che la correzione sia del primo ordine in $\\gamma/\\omega_0$: è del secondo. E non va trascurata nella fase $\\omega t$ dopo molti cicli.",
  "lab": "2",
  "rel": [
   "2.5",
   "2.15"
  ],
  "pdf": "p. 20"
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
  "h": "Da x₀ = A cos φ e v₀ = −γA cos φ − ωA sin φ. Con γ → 0 torna l'oscillatore libero.",
  "sym": [
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "x_0",
    "posizione iniziale (m)"
   ],
   [
    "v_0",
    "velocità iniziale (m/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ]
  ],
  "val": "Sottosmorzato scritto come $x=Ae^{-\\gamma t}\\cos(\\omega t+\\varphi)$, con $x(0)=x_0$ e $\\dot x(0)=v_0$.",
  "err": "Dimenticare che derivando $e^{-\\gamma t}$ la velocità iniziale contiene $-\\gamma A\\cos\\varphi=-\\gamma x_0$: per questo $v_0$ è sostituito da $v_0+\\gamma x_0$.",
  "lab": "2",
  "rel": [
   "2.8",
   "2.9",
   "1.9"
  ],
  "pdf": "p. 20"
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
  "h": "Se v₀ = 0 diventa tan φ = −γ/ω.",
  "sym": [
   [
    "\\varphi",
    "fase (rad)"
   ],
   [
    "v_0",
    "velocità iniziale (m/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "x_0",
    "posizione iniziale (m)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ]
  ],
  "val": "Sottosmorzato con $x_0\\neq0$. Il quadrante si sceglie dai segni di $\\cos\\varphi=x_0/A$ e $\\sin\\varphi=-(v_0+\\gamma x_0)/(\\omega A)$.",
  "err": "Perdere il segno meno, che viene da $v_0=-\\gamma A\\cos\\varphi-\\omega A\\sin\\varphi$. E pensare che con $v_0=0$ la fase sia nulla: vale $\\tan\\varphi=-\\gamma/\\omega$.",
  "lab": "2",
  "rel": [
   "2.7",
   "2.9",
   "1.9"
  ],
  "pdf": "p. 20"
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
  "h": "E la fase vale tan φ = −γ/ω.",
  "sym": [
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "x_0",
    "posizione iniziale (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ]
  ],
  "val": "Sottosmorzato con $v_0=0$. Per $\\gamma\\ll\\omega$ si ha $A\\simeq x_0$.",
  "err": "Porre $A=x_0$ e $\\varphi=0$ anche con attrito: $x_0=A\\cos\\varphi$ con $\\varphi\\neq0$, quindi $A$ è un po' più grande di $x_0$.",
  "lab": "2",
  "rel": [
   "2.7",
   "2.8"
  ],
  "pdf": "p. 20"
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
  "h": "L'ampiezza decade con e^(−γt), l'energia con e^(−2γt).",
  "sym": [
   [
    "E(t)",
    "energia meccanica (J)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "A",
    "ampiezza iniziale (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Smorzamento debole, $\\gamma\\ll\\omega_0$. È l'andamento medio: istante per istante $E$ scende a gradini.",
  "err": "Far decadere l'energia come l'ampiezza: $E\\propto A^2e^{-2\\gamma t}$, quindi il tempo caratteristico è $1/(2\\gamma)$ per l'energia e $1/\\gamma$ per l'ampiezza.",
  "lab": "2",
  "rel": [
   "2.11",
   "2.13",
   "2.14",
   "1.10"
  ],
  "pdf": "p. 21"
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
  "h": "= F_v·ẋ. Perdite massime a velocità massima, nulle nei punti di inversione.",
  "sym": [
   [
    "\\frac{dE}{dt}",
    "potenza persa dall'oscillatore (W)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\dot{x}",
    "velocità (m/s)"
   ]
  ],
  "val": "Attrito viscoso $F_v=-2\\gamma m\\dot x$; vale istante per istante e per qualsiasi $\\gamma$. È la potenza della forza viscosa, $F_v\\dot x$.",
  "err": "Pensare che l'energia cali in modo uniforme: $dE/dt$ è nulla nei punti di inversione ($\\dot x=0$) e massima nel passaggio per l'equilibrio. È sempre $\\le0$: il processo non è reversibile.",
  "lab": "2",
  "rel": [
   "2.14",
   "2.10",
   "2.12"
  ],
  "pdf": "p. 21"
 },
 {
  "id": "2.12",
  "c": 2,
  "n": "Forza viscosa",
  "q": "Forza di attrito viscoso nella convenzione degli appunti, e unità di γ",
  "t": "\\vec{F}_\\gamma = @@,\\qquad [\\gamma] = \\mathrm{s^{-1}}",
  "a": "-2\\gamma m\\,\\dot{\\vec{x}}",
  "d": [
   "-\\gamma\\,\\dot{\\vec{x}}",
   "-2\\gamma m\\,\\vec{x}",
   "+2\\gamma m\\,\\dot{\\vec{x}}"
  ],
  "h": "Proporzionale alla velocità e alla massa: γ è uno smorzamento per unità di massa. Il 2 è una comodità che semplifica le radici.",
  "sym": [
   [
    "\\vec{F}_\\gamma",
    "forza di attrito viscoso (N)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\dot{\\vec{x}}",
    "velocità (m/s)"
   ]
  ],
  "val": "Attrito viscoso, per esempio un pistone in un fluido; l'attrito radente $\\mu mg$ è trascurato.",
  "err": "Scrivere $-\\gamma\\dot x$: non è una forza, manca la massa. Oppure mettere il segno $+$: la forza farebbe crescere l'energia invece di dissiparla.",
  "lab": "2",
  "rel": [
   "2.1",
   "2.11"
  ],
  "pdf": "p. 18"
 },
 {
  "id": "2.13",
  "c": 2,
  "n": "Tempi caratteristici",
  "q": "Tempo in cui l'ampiezza dello smorzato cala di un fattore e, confrontato con quello dell'energia",
  "t": "\\tau_A = @@,\\qquad \\tau_E = \\frac{1}{2\\gamma}",
  "a": "\\frac{1}{\\gamma}",
  "d": [
   "\\frac{1}{2\\gamma}",
   "\\frac{2}{\\gamma}",
   "\\frac{2\\pi}{\\gamma}"
  ],
  "h": "L'ampiezza va come e^(−γt), l'energia come e^(−2γt): l'energia cala due volte più in fretta. Anche il transitorio del forzato si spegne in τ = 1/γ.",
  "sym": [
   [
    "\\tau_A",
    "tempo in cui l'ampiezza diventa $1/e$ (s)"
   ],
   [
    "\\tau_E",
    "tempo in cui l'energia diventa $1/e$ (s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ]
  ],
  "val": "Sottosmorzato (inviluppo $Ae^{-\\gamma t}$) e transitorio del forzato; per $\\tau_E$ serve $\\gamma\\ll\\omega_0$.",
  "err": "Usare lo stesso tempo per ampiezza ed energia: dopo $\\tau=1/\\gamma$ l'ampiezza è $A/e$, ma l'energia è $E_0/e^2$.",
  "lab": "2",
  "rel": [
   "2.5",
   "2.10",
   "3.2"
  ],
  "pdf": "p. 21, 23"
 },
 {
  "id": "2.14",
  "c": 2,
  "n": "Perdite istante per istante",
  "q": "Potenza persa dall'oscillatore debolmente smorzato in funzione del tempo",
  "t": "\\frac{dE}{dt} = -2\\gamma m A^2\\omega_0^2\\,e^{-2\\gamma t}\\,@@",
  "a": "\\sin^2(\\omega t+\\varphi)",
  "d": [
   "\\cos^2(\\omega t+\\varphi)",
   "\\sin(\\omega t+\\varphi)",
   "\\sin^2(2\\omega t+\\varphi)"
  ],
  "h": "Viene da −2γmẋ² con ẋ ≃ −ωA e^(−γt) sin(ωt + φ). Perdita massima al passaggio per l'equilibrio, nulla agli estremi.",
  "sym": [
   [
    "\\frac{dE}{dt}",
    "potenza persa (W)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "A",
    "ampiezza iniziale (m)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ],
   [
    "\\varphi",
    "fase (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "$\\gamma\\ll\\omega_0$: si trascura il termine $\\gamma\\cos$ nella velocità e si usa $\\omega\\simeq\\omega_0$ nel prefattore, ma non nella fase.",
  "err": "Disegnare $E(t)$ come un esponenziale liscio: scende a gradini, ripida dove la velocità è massima e piatta nei punti di inversione, dove la perdita è zero.",
  "lab": "2",
  "rel": [
   "2.11",
   "2.10"
  ],
  "pdf": "p. 21"
 },
 {
  "id": "2.15",
  "c": 2,
  "n": "Pseudo-periodo",
  "q": "Periodo delle oscillazioni smorzate (γ < ω₀) confrontato con quello senza attrito",
  "t": "T = \\frac{2\\pi}{\\omega} = @@ > T_0",
  "a": "\\frac{2\\pi}{\\sqrt{\\omega_0^2-\\gamma^2}}",
  "d": [
   "\\frac{2\\pi}{\\sqrt{\\omega_0^2+\\gamma^2}}",
   "\\frac{2\\pi}{\\omega_0-\\gamma}",
   "2\\pi\\sqrt{\\omega_0^2-\\gamma^2}"
  ],
  "h": "L'attrito rallenta le oscillazioni: ω < ω₀, quindi T > T₀ = 2π/ω₀. Per γ → ω₀ il periodo diverge: si arriva allo smorzamento critico.",
  "sym": [
   [
    "T",
    "pseudo-periodo (s)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione senza attrito (rad/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "T_0",
    "periodo senza attrito, $2\\pi/\\omega_0$ (s)"
   ]
  ],
  "val": "Solo sottosmorzato, $\\gamma<\\omega_0$. Il moto non è periodico in senso stretto: si ripetono i passaggi per lo zero, non l'ampiezza.",
  "err": "Pensare che l'attrito acceleri le oscillazioni, o che non cambi il periodo: $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}<\\omega_0$. Per $\\gamma\\ll\\omega_0$ la differenza è però del secondo ordine.",
  "lab": "2",
  "rel": [
   "2.5",
   "2.6",
   "1.4"
  ],
  "pdf": "p. 20"
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
  "h": "Non omogenea: soluzione = omogenea (transitorio) + particolare (regime).",
  "sym": [
   [
    "x",
    "spostamento (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "F_0",
    "ampiezza della forza esterna (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Forzante armonica $F(t)=F_0\\cos(\\omega_F t)$ su un oscillatore con attrito viscoso. Equazione lineare ma non omogenea.",
  "err": "Credere che valga la sovrapposizione: la somma di due soluzioni non è soluzione (la forzante comparirebbe due volte). La loro differenza invece risolve l'omogenea associata: da qui omogenea + particolare.",
  "lab": "3",
  "rel": [
   "3.2",
   "3.8",
   "2.1"
  ],
  "pdf": "p. 22"
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
  "h": "Per t ≫ 1/γ resta solo il regime, alla frequenza della forzante.",
  "sym": [
   [
    "x(t)",
    "legge oraria (m)"
   ],
   [
    "A",
    "ampiezza del transitorio (m)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega",
    "pseudo-pulsazione $\\sqrt{\\omega_0^2-\\gamma^2}$ (rad/s)"
   ],
   [
    "\\varphi_1",
    "fase del transitorio (rad)"
   ],
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\varphi",
    "fase a regime rispetto alla forzante (rad)"
   ]
  ],
  "val": "Soluzione generale: omogenea dello smorzato più una particolare. Per $t\\gg\\tau=1/\\gamma$ resta solo $B\\cos(\\omega_F t+\\varphi)$.",
  "err": "Credere che a regime l'oscillatore vibri alla sua frequenza propria: vibra alla frequenza della forzante $\\omega_F$. $\\omega$ e le condizioni iniziali contano solo nel transitorio.",
  "lab": "3",
  "rel": [
   "3.1",
   "3.3",
   "2.13"
  ],
  "pdf": "p. 22–23"
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
  "h": "Il 4 viene da (2γ)². B e φ non dipendono dalle condizioni iniziali.",
  "sym": [
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "F_0",
    "ampiezza della forzante (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ]
  ],
  "val": "Solo a regime ($t\\gg1/\\gamma$). $B$ e $\\varphi$ non dipendono dalle condizioni iniziali, ma da $F_0$, $\\omega_F$ e $\\gamma$.",
  "err": "Dimenticare il quadrato su $(\\omega_0^2-\\omega_F^2)$, come gli appunti a p. 23: senza quadrato il radicando può diventare negativo. Sempre a p. 23 compare $(4\\gamma^2\\omega_F^2)^2$: il termine giusto è $(2\\gamma\\omega_F)^2=4\\gamma^2\\omega_F^2$.",
  "lab": "3",
  "rel": [
   "3.5",
   "3.9",
   "3.10",
   "3.4"
  ],
  "pdf": "p. 23"
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
  "h": "Da ω₀² − ω_F² = (F₀/Bm) cos φ e 2γω_F = −(F₀/Bm) sin φ.",
  "sym": [
   [
    "\\varphi",
    "fase dello spostamento rispetto alla forzante (rad)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ]
  ],
  "val": "A regime. Poiché $\\sin\\varphi<0$, $\\varphi$ sta tra $0$ e $-\\pi$: tende a $0$ per $\\omega_F\\ll\\omega_0$, vale $-\\pi/2$ in risonanza, tende a $-\\pi$ per $\\omega_F\\gg\\omega_0$.",
  "err": "Calcolare $\\varphi=\\arctan(\\dots)$ con la calcolatrice: per $\\omega_F>\\omega_0$ si ottiene un angolo tra $0$ e $\\pi/2$, mentre quello giusto sta tra $-\\pi/2$ e $-\\pi$ (bisogna sottrarre $\\pi$).",
  "lab": "3",
  "rel": [
   "3.9",
   "3.6",
   "3.11"
  ],
  "pdf": "p. 23"
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
  "h": "Cresce al diminuire di γ; per γ → 0 diverge.",
  "sym": [
   [
    "B(\\omega_0)",
    "ampiezza a regime in risonanza (m)"
   ],
   [
    "F_0",
    "ampiezza della forzante (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ]
  ],
  "val": "$\\omega_F=\\omega_0$, a regime. Per $\\gamma\\ll\\omega_0$ è praticamente il massimo della curva $B(\\omega_F)$.",
  "err": "Pensare che in risonanza l'ampiezza sia infinita anche con attrito: diverge solo per $\\gamma\\to0$. Con $\\gamma\\neq0$ il picco è finito, e si abbassa e si allarga al crescere di $\\gamma$.",
  "lab": "3",
  "rel": [
   "3.3",
   "3.6",
   "3.7"
  ],
  "pdf": "p. 23"
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
  "h": "Spostamento in quadratura con la forzante: la forza è in fase con la velocità. Negli appunti: φ = ±π/2.",
  "sym": [
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase dello spostamento rispetto alla forzante (rad)"
   ]
  ],
  "val": "Risonanza, a regime. Il segno viene da $2\\gamma\\omega_F=-\\frac{F_0}{Bm}\\sin\\varphi$, quindi $\\sin\\varphi<0$.",
  "err": "Dire che in risonanza spostamento e forza sono in fase: sono in quadratura. In fase con la forza è la velocità, per questo la forzante compie sempre lavoro positivo. Il $\\pm\\pi/2$ degli appunti va letto $-\\pi/2$: spostamento in ritardo.",
  "lab": "3",
  "rel": [
   "3.4",
   "3.9",
   "3.5"
  ],
  "pdf": "p. 24"
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
  "h": "Costante solo a risonanza: E = ½mω₀²B². Altrimenti oscilla tra ½mB²ω² e ½mB²ω₀².",
  "sym": [
   [
    "E(t)",
    "energia meccanica a regime (J)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "\\omega",
    "pulsazione del moto, uguale a $\\omega_F$ (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "A regime, $x=B\\cos(\\omega t+\\varphi)$ con $\\omega=\\omega_F$. La cinetica porta $\\omega^2$, la potenziale $\\alpha=m\\omega_0^2$.",
  "err": "Usare la stessa pulsazione nei due termini: $E$ sembrerebbe sempre costante. Lo è solo in risonanza; altrimenti oscilla tra $\\frac12mB^2\\omega^2$ e $\\frac12mB^2\\omega_0^2$. Gli appunti, per $\\omega<\\omega_0$, scrivono $E_{min}=0$: il minimo è $\\frac12mB^2\\omega^2$.",
  "lab": "3",
  "rel": [
   "3.12",
   "3.5",
   "1.10"
  ],
  "pdf": "p. 24"
 },
 {
  "id": "3.8",
  "c": 3,
  "n": "Metodo complesso",
  "q": "Equazione per B e φ che si ottiene sostituendo nel forzato la soluzione complessa B·exp[i(ω_F t + φ)]",
  "t": "B\\,e^{i\\varphi}\\left[@@\\right] = \\frac{F_0}{m}",
  "a": "\\omega_0^2 - \\omega_F^2 + 2i\\gamma\\omega_F",
  "d": [
   "\\omega_0^2 + \\omega_F^2 + 2i\\gamma\\omega_F",
   "\\omega_0^2 - \\omega_F^2 - 2i\\gamma\\omega_F",
   "\\omega_0^2 - \\omega_F^2 + 2\\gamma\\omega_F"
  ],
  "h": "Si risolve z̈ + 2γż + ω₀²z = (F₀/m)e^(iω_F t) e si prende la parte reale: ż = iω_F z, z̈ = −ω_F² z, e il fattore e^(iω_F t) si semplifica.",
  "sym": [
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "\\varphi",
    "fase a regime (rad)"
   ],
   [
    "i",
    "unità immaginaria"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ],
   [
    "F_0",
    "ampiezza della forzante (N)"
   ],
   [
    "m",
    "massa (kg)"
   ]
  ],
  "val": "A regime, forzante armonica. La soluzione fisica è la parte reale, $x_p=\\mathrm{Re}\\{Be^{i(\\omega_Ft+\\varphi)}\\}=B\\cos(\\omega_Ft+\\varphi)$.",
  "err": "Sbagliare le derivate: $\\ddot z=-\\omega_F^2z$ (segno meno) e $\\dot z=i\\omega_Fz$ (con la $i$). Perdere la $i$ significa perdere lo sfasamento tra forza e spostamento.",
  "lab": "3",
  "rel": [
   "3.9",
   "3.3",
   "3.4"
  ],
  "pdf": "p. 23"
 },
 {
  "id": "3.9",
  "c": 3,
  "n": "Parte reale e immaginaria",
  "q": "Le due equazioni reali che si ottengono dal metodo complesso per il forzato",
  "t": "\\omega_0^2-\\omega_F^2 = \\frac{F_0}{Bm}\\cos\\varphi,\\qquad 2\\gamma\\omega_F = @@",
  "a": "-\\frac{F_0}{Bm}\\sin\\varphi",
  "d": [
   "\\frac{F_0}{Bm}\\sin\\varphi",
   "-\\frac{F_0}{Bm}\\cos\\varphi",
   "-\\frac{F_0 B}{m}\\sin\\varphi"
  ],
  "h": "Da ω₀² − ω_F² + 2iγω_F = (F₀/Bm)e^(−iφ). Il rapporto dà tan φ, la somma dei quadrati dà B.",
  "sym": [
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "F_0",
    "ampiezza della forzante (N)"
   ],
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "\\varphi",
    "fase a regime (rad)"
   ],
   [
    "\\gamma",
    "coefficiente di smorzamento (s⁻¹)"
   ]
  ],
  "val": "A regime. Poiché $2\\gamma\\omega_F>0$, risulta $\\sin\\varphi<0$: lo spostamento è sempre in ritardo sulla forzante.",
  "err": "Elevare male al quadrato: $(2\\gamma\\omega_F)^2=4\\gamma^2\\omega_F^2$, non $(4\\gamma^2\\omega_F^2)^2$ come scritto negli appunti a p. 23.",
  "lab": "3",
  "rel": [
   "3.8",
   "3.3",
   "3.4",
   "3.6"
  ],
  "pdf": "p. 23"
 },
 {
  "id": "3.10",
  "c": 3,
  "n": "Ampiezza lontano dalla risonanza",
  "q": "Ampiezza a regime per forzante molto lenta e molto veloce",
  "t": "\\omega_F\\ll\\omega_0:\\ B\\simeq\\frac{F_0}{m\\omega_0^2};\\qquad \\omega_F\\gg\\omega_0:\\ B\\simeq @@",
  "a": "\\frac{F_0}{m\\,\\omega_F^2}",
  "d": [
   "\\frac{F_0}{m\\,\\omega_0^2}",
   "\\frac{F_0}{2m\\gamma\\,\\omega_F}",
   "\\frac{F_0}{m\\,\\omega_F}"
  ],
  "h": "Forzante lenta: risposta quasi statica, B = F₀/α come per la sola molla. Forzante veloce: conta l'inerzia e B cala come 1/ω_F².",
  "sym": [
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "F_0",
    "ampiezza della forzante (N)"
   ],
   [
    "m",
    "massa (kg)"
   ]
  ],
  "val": "Conseguenza diretta della formula di $B$ (p. 23) lontano dal picco, dove $|\\omega_0^2-\\omega_F^2|\\gg2\\gamma\\omega_F$.",
  "err": "Pensare che una forzante più veloce produca ampiezze più grandi: sopra la risonanza la massa non fa in tempo a seguire la forza e $B\\to0$.",
  "lab": "3",
  "rel": [
   "3.3",
   "3.11",
   "3.5"
  ],
  "pdf": "p. 23"
 },
 {
  "id": "3.11",
  "c": 3,
  "n": "Fase lontano dalla risonanza",
  "q": "Sfasamento a regime per forzante molto lenta e molto veloce",
  "t": "\\omega_F\\ll\\omega_0:\\ \\varphi\\to0;\\qquad \\omega_F\\gg\\omega_0:\\ \\varphi\\to @@",
  "a": "-\\pi",
  "d": [
   "-\\frac{\\pi}{2}",
   "+\\frac{\\pi}{2}",
   "0"
  ],
  "h": "Forzante lenta: spostamento in fase con la forza. In risonanza −π/2. Forzante veloce: opposizione di fase, la massa si sposta contro la forza.",
  "sym": [
   [
    "\\omega_F",
    "pulsazione della forzante (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase dello spostamento rispetto alla forzante (rad)"
   ]
  ],
  "val": "Dalla coppia $\\cos\\varphi\\propto\\omega_0^2-\\omega_F^2$, $\\sin\\varphi\\propto-2\\gamma\\omega_F$ (p. 23), lontano dal picco.",
  "err": "Concludere $\\varphi\\to0$ anche per $\\omega_F\\gg\\omega_0$ perché $\\tan\\varphi\\to0$: la tangente non distingue $0$ da $-\\pi$. Sopra la risonanza $\\cos\\varphi<0$, quindi è $-\\pi$.",
  "lab": "3",
  "rel": [
   "3.4",
   "3.6",
   "3.10"
  ],
  "pdf": "p. 23–24"
 },
 {
  "id": "3.12",
  "c": 3,
  "n": "Energia a regime riscritta",
  "q": "Energia a regime del forzato riscritta con sin² = 1 − cos²",
  "t": "E(t) = \\tfrac12 mB^2\\left[\\omega^2 + @@\\right]",
  "a": "(\\omega_0^2-\\omega^2)\\cos^2(\\omega t+\\varphi)",
  "d": [
   "(\\omega_0^2-\\omega^2)\\cos(\\omega t+\\varphi)",
   "(\\omega^2-\\omega_0^2)\\cos^2(\\omega t+\\varphi)",
   "(\\omega_0^2-\\omega^2)\\sin^2(\\omega t+\\varphi)"
  ],
  "h": "Oscilla tra ½mB²ω² (cos² = 0) e ½mB²ω₀² (cos² = 1). In risonanza la parentesi vale ω₀²: E costante.",
  "sym": [
   [
    "E(t)",
    "energia meccanica a regime (J)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "B",
    "ampiezza a regime (m)"
   ],
   [
    "\\omega",
    "pulsazione del moto, uguale a $\\omega_F$ (rad/s)"
   ],
   [
    "\\omega_0",
    "pulsazione propria (rad/s)"
   ],
   [
    "\\varphi",
    "fase (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "A regime, con $\\omega=\\omega_F$.",
  "err": "Scrivere $\\cos$ senza quadrato, come gli appunti a p. 24: l'energia scenderebbe sotto entrambi gli estremi. Per $\\omega<\\omega_0$ il minimo è $\\frac12mB^2\\omega^2$, non zero.",
  "lab": "3",
  "rel": [
   "3.7",
   "3.5"
  ],
  "pdf": "p. 24"
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
  "h": "Per x₂ è uguale con k(x₂ − x₁). Si disaccoppiano con u_a = x₁ + x₂ e u_b = x₁ − x₂.",
  "sym": [
   [
    "m",
    "massa di ciascun pendolo (kg)"
   ],
   [
    "\\ddot{x}_1",
    "accelerazione del pendolo 1 (m/s²)"
   ],
   [
    "g",
    "accelerazione di gravità (m/s²)"
   ],
   [
    "l",
    "lunghezza dei pendoli (m)"
   ],
   [
    "x_1,\\ x_2",
    "spostamenti orizzontali dei due pendoli (m)"
   ],
   [
    "k",
    "costante della molla di accoppiamento (N/m)"
   ]
  ],
  "val": "Pendoli uguali, piccole oscillazioni ($\\sin\\vartheta\\simeq\\vartheta$), molla a riposo quando $x_1=x_2$.",
  "err": "Sbagliare il segno della molla: sul pendolo 1 la forza è $-k(x_1-x_2)$, sul 2 è $-k(x_2-x_1)$. Se i pendoli si spostano insieme la molla non si deforma e non fa forza.",
  "lab": "4",
  "rel": [
   "4.3",
   "4.2"
  ],
  "pdf": "p. 1"
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
  "h": "Modo a, a pendolo: x₁ = x₂, la molla non lavora. Modo b, a respiro: x₁ = −x₂.",
  "sym": [
   [
    "\\omega_a",
    "pulsazione del modo a pendolo (rad/s)"
   ],
   [
    "\\omega_b",
    "pulsazione del modo a respiro (rad/s)"
   ],
   [
    "g",
    "accelerazione di gravità (m/s²)"
   ],
   [
    "l",
    "lunghezza dei pendoli (m)"
   ],
   [
    "k",
    "costante della molla (N/m)"
   ],
   [
    "m",
    "massa di ciascun pendolo (kg)"
   ]
  ],
  "val": "Pendoli uguali, piccole oscillazioni. I battimenti sono netti con accoppiamento debole, $k\\ll mg/l$, cioè $\\omega_a\\simeq\\omega_b$.",
  "err": "Mettere $k/m$ invece di $2k/m$: nel modo a respiro $x_2=-x_1$, quindi la molla è deformata di $2x_1$ e la forza è doppia.",
  "lab": "4",
  "rel": [
   "4.1",
   "4.3",
   "4.5"
  ],
  "pdf": "p. 1, 3"
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
  "h": "Si ottengono sommando e sottraendo le due equazioni: ognuna diventa un oscillatore armonico.",
  "sym": [
   [
    "u_a",
    "coordinata normale del modo a pendolo (m)"
   ],
   [
    "u_b",
    "coordinata normale del modo a respiro (m)"
   ],
   [
    "x_1,\\ x_2",
    "spostamenti dei due pendoli (m)"
   ]
  ],
  "val": "Sistema simmetrico (pendoli e masse uguali): sommando e sottraendo le due equazioni si ottengono due oscillatori armonici indipendenti.",
  "err": "Confondere $u_a$, $u_b$ con le posizioni dei pendoli: sono combinazioni. Per tornare alle masse serve $x_1=\\frac{u_a+u_b}{2}$, $x_2=\\frac{u_a-u_b}{2}$.",
  "lab": "4",
  "rel": [
   "4.10",
   "4.1",
   "4.2"
  ],
  "pdf": "p. 1–2"
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
  "h": "Per x₁ c'è il segno +. Costanti dalle condizioni iniziali.",
  "sym": [
   [
    "x_2(t)",
    "spostamento del pendolo 2 (m)"
   ],
   [
    "C_a,\\ C_b",
    "ampiezze dei due modi, $C_a=A_a/2$, $C_b=A_b/2$ (m)"
   ],
   [
    "\\omega_a,\\ \\omega_b",
    "pulsazioni dei modi (rad/s)"
   ],
   [
    "\\varphi_a,\\ \\varphi_b",
    "fasi dei modi (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Qualsiasi moto dei due pendoli accoppiati, grazie alla linearità; le quattro costanti si fissano con le condizioni iniziali.",
  "err": "Pensare che il moto di un pendolo sia armonico: è la somma di due armoniche con $\\omega$ diverse. È armonico solo se è eccitato un modo solo.",
  "lab": "4",
  "rel": [
   "4.10",
   "4.11",
   "4.5"
  ],
  "pdf": "p. 2"
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
  "h": "Il secondo coseno è l'inviluppo lento, con pulsazione semidifferenza; l'ampiezza però torna massima con pulsazione |ω_a − ω_b|.",
  "sym": [
   [
    "A",
    "ampiezza di ciascun modo (m)"
   ],
   [
    "\\omega_a,\\ \\omega_b",
    "pulsazioni vicine (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Ampiezze uguali e fasi nulle; i battimenti si vedono bene se $\\omega_a\\simeq\\omega_b$ (accoppiamento debole).",
  "err": "Confondere la pulsazione del coseno lento, $\\frac{|\\omega_a-\\omega_b|}{2}$, con quella dei battimenti: l'ampiezza torna massima due volte per periodo del coseno lento, cioè ogni $\\frac{2\\pi}{|\\omega_a-\\omega_b|}$. Negli appunti la prostaferesi è scritta senza $t$ negli argomenti.",
  "lab": "4",
  "rel": [
   "4.12",
   "4.11",
   "4.2"
  ],
  "pdf": "p. 3"
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
  "h": "Modo a: y₁ = y₂. Modo b: y₁ = −y₂.",
  "sym": [
   [
    "\\omega_a",
    "pulsazione del modo in fase (rad/s)"
   ],
   [
    "\\omega_b",
    "pulsazione del modo in controfase (rad/s)"
   ],
   [
    "T_0",
    "tensione della corda (N)"
   ],
   [
    "m",
    "massa di ciascuna perla (kg)"
   ],
   [
    "a",
    "distanza tra masse vicine e dalle pareti (m)"
   ]
  ],
  "val": "Due masse uguali su una corda tra due pareti, passo $a$; piccoli spostamenti trasversali $y_i/a\\ll1$, tensione costante, niente gravità.",
  "err": "Scambiare i modi: la frequenza più bassa è quella in fase ($y_1=y_2$), perché il tratto centrale resta orizzontale e non tira. In controfase tira anche il tratto centrale e $\\omega^2$ triplica.",
  "lab": "4",
  "rel": [
   "4.7",
   "4.13",
   "4.8"
  ],
  "pdf": "p. 3–4"
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
  "h": "Conta solo la componente verticale della tensione, per y/a ≪ 1.",
  "sym": [
   [
    "\\ddot{y}_1",
    "accelerazione trasversale della massa 1 (m/s²)"
   ],
   [
    "y_1,\\ y_2",
    "spostamenti trasversali delle masse (m)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "a",
    "passo (m)"
   ]
  ],
  "val": "Piccoli angoli: $\\sin\\theta\\simeq\\tan\\theta=y/a$; conta solo la componente verticale della tensione.",
  "err": "Dimenticare uno dei due tratti: la massa 1 è tirata dal tratto verso la parete ($-T_0y_1/a$) e da quello verso la massa 2 ($-T_0(y_1-y_2)/a$), da cui $-\\frac{2T_0}{a}y_1+\\frac{T_0}{a}y_2$.",
  "lab": "4",
  "rel": [
   "4.6",
   "4.8",
   "4.13"
  ],
  "pdf": "p. 3–4"
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
  "h": "Per a → 0 diventa l'equazione di D'Alembert con ρ_L = m/a.",
  "sym": [
   [
    "\\ddot{y}_i",
    "accelerazione trasversale della massa $i$ (m/s²)"
   ],
   [
    "y_i",
    "spostamento della massa $i$ (m)"
   ],
   [
    "y_{i\\pm1}",
    "spostamenti delle due vicine (m)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "m",
    "massa di ciascuna perla (kg)"
   ],
   [
    "a",
    "passo della catena (m)"
   ]
  ],
  "val": "Catena di masse uguali a passo $a$, piccoli spostamenti trasversali, tensione uniforme $T_0$.",
  "err": "Sbagliare il segno della parentesi: la massa è richiamata verso il basso quando sta più in alto della media delle vicine, cioè quando $2y_i-y_{i-1}-y_{i+1}>0$.",
  "lab": "4",
  "rel": [
   "4.7",
   "4.14",
   "4.9"
  ],
  "pdf": "p. 5"
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
  "h": "ρ_L = m/a densità lineare. n gradi di libertà, n modi normali; il continuo ne ha infiniti.",
  "sym": [
   [
    "y(x,t)",
    "spostamento trasversale della corda (m)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "x",
    "posizione lungo la corda (m)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "\\rho_L",
    "densità lineare $m/a$ (kg/m)"
   ]
  ],
  "val": "Limite continuo $a\\to0$ con $\\rho_L=m/a$ fisso; serve $a\\ll\\lambda$. Piccole deformazioni.",
  "err": "Pensare che $T_0/\\rho_L$ sia la velocità: ha le dimensioni di una velocità al quadrato, $\\mathrm{m^2/s^2}$. La velocità è $v=\\sqrt{T_0/\\rho_L}$.",
  "lab": "5",
  "rel": [
   "4.8",
   "4.14",
   "5.1"
  ],
  "pdf": "p. 5–6"
 },
 {
  "id": "4.10",
  "c": 4,
  "n": "Dai modi ai pendoli",
  "q": "Posizioni dei due pendoli in funzione delle coordinate normali",
  "t": "x_1 = \\frac{u_a+u_b}{2},\\qquad x_2 = @@",
  "a": "\\frac{u_a-u_b}{2}",
  "d": [
   "u_a-u_b",
   "\\frac{u_b-u_a}{2}",
   "\\frac{u_a+u_b}{2}"
  ],
  "h": "Si invertono u_a = x₁ + x₂ e u_b = x₁ − x₂. Per questo C_a = A_a/2 e C_b = A_b/2.",
  "sym": [
   [
    "x_1,\\ x_2",
    "spostamenti dei due pendoli (m)"
   ],
   [
    "u_a",
    "coordinata del modo a pendolo, $x_1+x_2$ (m)"
   ],
   [
    "u_b",
    "coordinata del modo a respiro, $x_1-x_2$ (m)"
   ]
  ],
  "val": "Due pendoli uguali accoppiati; vale uguale per due masse su corda, con $y$ al posto di $x$.",
  "err": "Dimenticare il fattore $\\frac12$: le ampiezze dei pendoli sono la metà di quelle delle coordinate normali.",
  "lab": "4",
  "rel": [
   "4.3",
   "4.4",
   "4.11"
  ],
  "pdf": "p. 2"
 },
 {
  "id": "4.11",
  "c": 4,
  "n": "Un pendolo spostato, l'altro fermo",
  "q": "Pendolo 1 spostato di X, pendolo 2 in equilibrio, entrambi fermi: moto del pendolo 2",
  "t": "x_1(0)=X,\\ x_2(0)=0:\\quad x_2(t) = @@",
  "a": "\\frac{X}{2}\\left[\\cos(\\omega_a t)-\\cos(\\omega_b t)\\right]",
  "d": [
   "\\frac{X}{2}\\left[\\cos(\\omega_a t)+\\cos(\\omega_b t)\\right]",
   "X\\left[\\cos(\\omega_a t)-\\cos(\\omega_b t)\\right]",
   "\\frac{X}{2}\\left[\\sin(\\omega_a t)-\\sin(\\omega_b t)\\right]"
  ],
  "h": "La condizione iniziale è metà modo a pendolo più metà modo a respiro. x₂ parte da 0 e cresce lentamente: l'energia passa da un pendolo all'altro.",
  "sym": [
   [
    "X",
    "spostamento iniziale del pendolo 1 (m)"
   ],
   [
    "x_1,\\ x_2",
    "spostamenti dei due pendoli (m)"
   ],
   [
    "\\omega_a,\\ \\omega_b",
    "pulsazioni dei due modi (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Partenza da fermi ($v_0=0$, fasi nulle), pendoli uguali. Lo scambio quasi completo di energia si vede con accoppiamento debole.",
  "err": "Pensare che il pendolo 2 resti fermo perché parte da fermo in equilibrio: la molla lo mette in moto. Con la prostaferesi $x_2=X\\sin\\left(\\frac{\\omega_a+\\omega_b}{2}t\\right)\\sin\\left(\\frac{\\omega_b-\\omega_a}{2}t\\right)$: è massimo quando l'ampiezza di $x_1$ è minima.",
  "lab": "4",
  "rel": [
   "4.4",
   "4.5",
   "4.10"
  ],
  "pdf": "p. 2–3"
 },
 {
  "id": "4.12",
  "c": 4,
  "n": "Periodo dei battimenti",
  "q": "Ogni quanto l'ampiezza dei battimenti torna massima",
  "t": "T_{\\rm batt} = \\frac{\\pi}{\\omega_{\\rm INV}} = @@",
  "a": "\\frac{2\\pi}{|\\omega_a-\\omega_b|}",
  "d": [
   "\\frac{4\\pi}{|\\omega_a-\\omega_b|}",
   "\\frac{\\pi}{|\\omega_a-\\omega_b|}",
   "\\frac{4\\pi}{\\omega_a+\\omega_b}"
  ],
  "h": "Con ω_INV = |ω_a − ω_b|/2: |cos(ω_INV t)| ha periodo π/ω_INV, cioè due massimi dell'inviluppo per ogni periodo del coseno lento.",
  "sym": [
   [
    "T_{\\rm batt}",
    "periodo dei battimenti (s)"
   ],
   [
    "\\omega_{\\rm INV}",
    "pulsazione del coseno modulante, $|\\omega_a-\\omega_b|/2$ (rad/s)"
   ],
   [
    "\\omega_a,\\ \\omega_b",
    "pulsazioni vicine (rad/s)"
   ]
  ],
  "val": "Due oscillazioni di uguale ampiezza con $\\omega_a\\simeq\\omega_b$ (accoppiamento debole), così che $\\omega_{\\rm INV}\\ll\\omega_M=\\frac{\\omega_a+\\omega_b}{2}$.",
  "err": "Prendere come periodo dei battimenti $2\\pi/\\omega_{\\rm INV}$, il periodo del coseno modulante: l'ampiezza dipende da $|\\cos(\\omega_{\\rm INV}t)|$, che ha periodo metà.",
  "lab": "4",
  "rel": [
   "4.5",
   "4.11",
   "4.2"
  ],
  "pdf": "p. 3"
 },
 {
  "id": "4.13",
  "c": 4,
  "n": "Una massa su corda",
  "q": "Una sola massa al centro di una corda tesa tra due pareti, a distanza a da ciascuna: pulsazione",
  "t": "N=1:\\qquad \\omega^2 = @@",
  "a": "\\frac{2T_0}{ma}",
  "d": [
   "\\frac{T_0}{ma}",
   "\\frac{T_0}{2ma}",
   "\\frac{2T_0\\,a}{m}"
  ],
  "h": "Ognuno dei due tratti tira verso l'equilibrio con T₀y/a. È la prima riga della tabella dei modi: 1 grado di libertà, 1 modo.",
  "sym": [
   [
    "N",
    "numero di masse sulla corda"
   ],
   [
    "\\omega",
    "pulsazione dell'unico modo (rad/s)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "a",
    "lunghezza di ciascun tratto (m)"
   ]
  ],
  "val": "Piccoli spostamenti $y/a\\ll1$, tensione $T_0$ costante, niente gravità. Conseguenza immediata della forza trasversale di p. 3.",
  "err": "Contare un solo tratto di corda e trovare $\\omega^2=T_0/(ma)$: la massa è tirata da entrambi i lati.",
  "lab": "4",
  "rel": [
   "4.7",
   "4.6",
   "4.8"
  ],
  "pdf": "p. 3–4"
 },
 {
  "id": "4.14",
  "c": 4,
  "n": "Differenza seconda",
  "q": "Limite a → 0 della combinazione della collana di perle, con lo sviluppo di Taylor",
  "t": "2y(x) - y(x-a) - y(x+a) \\simeq @@",
  "a": "-a^2\\,\\frac{\\partial^2 y}{\\partial x^2}",
  "d": [
   "+a^2\\,\\frac{\\partial^2 y}{\\partial x^2}",
   "-2a\\,\\frac{\\partial y}{\\partial x}",
   "-\\frac{a^2}{2}\\,\\frac{\\partial^2 y}{\\partial x^2}"
  ],
  "h": "Da y(x ± a) ≃ y ± a y′ + ½a²y″: i termini in y e y′ si cancellano. Con −T₀/(ma) davanti resta (T₀a/m) y″ = (T₀/ρ_L) y″.",
  "sym": [
   [
    "y(x)",
    "spostamento della corda nel punto $x$ (m)"
   ],
   [
    "a",
    "passo tra le masse (m)"
   ],
   [
    "\\frac{\\partial^2 y}{\\partial x^2}",
    "curvatura della corda (1/m)"
   ]
  ],
  "val": "$a\\ll\\lambda$: la forma cambia poco tra una massa e la successiva, quindi si può troncare al secondo ordine.",
  "err": "Fermarsi al primo ordine: i termini in $\\partial y/\\partial x$ si cancellano e resterebbe zero. È la curvatura, non la pendenza, a dare l'accelerazione.",
  "lab": "5",
  "rel": [
   "4.8",
   "4.9",
   "5.1"
  ],
  "pdf": "p. 5"
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
  "h": "Lineare e omogenea: vale la sovrapposizione. v dipende solo dal mezzo.",
  "sym": [
   [
    "\\psi(x,t)",
    "perturbazione: spostamento trasversale della corda (m)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "\\rho_L",
    "densità lineare (kg/m)"
   ]
  ],
  "val": "Corda tesa, piccole deformazioni ($|\\partial\\psi/\\partial x|\\ll1$), tensione uniforme, niente gravità né attrito. Equazione lineare e omogenea.",
  "err": "Credere che $v$ sia la velocità dei punti della corda: quelli vanno solo su e giù. $v$ è la velocità della perturbazione e dipende solo dal mezzo ($T_0$, $\\rho_L$), non da ampiezza o frequenza.",
  "lab": "5",
  "rel": [
   "4.9",
   "5.2",
   "5.14"
  ],
  "pdf": "p. 5–6, 9"
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
  "h": "f va verso destra (progressiva), g verso sinistra (regressiva).",
  "sym": [
   [
    "\\psi(x,t)",
    "perturbazione (m)"
   ],
   [
    "f",
    "onda progressiva, verso $+x$"
   ],
   [
    "g",
    "onda regressiva, verso $-x$"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Qualsiasi soluzione dell'equazione di D'Alembert in 1D con $v$ costante; $f$ e $g$ si fissano dalle condizioni iniziali.",
  "err": "Pensare che servano onde sinusoidali: $f$ e $g$ hanno forma qualsiasi, l'unico vincolo è che dipendano da $x\\mp vt$. Gli appunti chiamano $f$ la regressiva, $f(x+vt)+g(x-vt)$: è la stessa cosa.",
  "lab": "5",
  "rel": [
   "5.16",
   "5.3",
   "5.8"
  ],
  "pdf": "p. 9–10"
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
  "h": "Per l'onda regressiva g(x + vt) il segno è +.",
  "sym": [
   [
    "\\frac{\\partial\\psi}{\\partial t}",
    "velocità trasversale di un punto della corda (m/s)"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial x}",
    "pendenza della corda (adimensionale)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ]
  ],
  "val": "Solo per un'onda puramente progressiva $f(x-vt)$. Per $g(x+vt)$ vale $\\partial_t\\psi=+v\\,\\partial_x\\psi$; una sovrapposizione delle due non soddisfa nessuna delle due relazioni.",
  "err": "Confondere la velocità trasversale $\\partial\\psi/\\partial t$ con la velocità di fase $v$: la prima dipende dalla pendenza locale e dall'ampiezza, la seconda solo dal mezzo.",
  "lab": "5",
  "rel": [
   "5.2",
   "5.10",
   "5.20"
  ],
  "pdf": "p. 10"
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
  "h": "ω = 2πν = 2π/T.",
  "sym": [
   [
    "\\psi",
    "spostamento (m)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "\\nu",
    "frequenza (Hz)"
   ]
  ],
  "val": "Onda armonica progressiva su corda: $v$ è la stessa per tutte le frequenze.",
  "err": "Perdere il $2\\pi$: $k=2\\pi/\\lambda$ e $\\omega=2\\pi\\nu$, quindi $\\omega/k=\\lambda\\nu$. A $t$ fisso il periodo spaziale è $\\lambda$, a $x$ fisso il periodo temporale è $1/\\nu$.",
  "lab": "5",
  "rel": [
   "5.1",
   "5.5",
   "5.6"
  ],
  "pdf": "p. 7, 10"
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
  "h": "Un oscillatore armonico in x: y(x) = A cos(kx + φ).",
  "sym": [
   [
    "y(x)",
    "forma spaziale del modo (m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione del modo (rad/s)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ]
  ],
  "val": "Separazione delle variabili $\\psi=y(x)\\cos(\\omega t+\\varphi)$ nell'equazione di D'Alembert: tutti i punti oscillano con la stessa $\\omega$.",
  "err": "Usare la stessa fase per spazio e tempo, come gli appunti a p. 7: la fase spaziale (fissata dagli estremi) e quella temporale (fissata dalle condizioni iniziali) sono indipendenti.",
  "lab": "5",
  "rel": [
   "5.6",
   "5.7",
   "5.4"
  ],
  "pdf": "p. 7"
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
  "h": "Fondamentale λ₁ = 2L, secondo modo λ₂ = L.",
  "sym": [
   [
    "k_n",
    "numero d'onda del modo $n$ (rad/m)"
   ],
   [
    "n",
    "numero del modo, $n=1,2,3,\\dots$"
   ],
   [
    "L",
    "lunghezza della corda (m)"
   ],
   [
    "\\lambda_n",
    "lunghezza d'onda del modo $n$ (m)"
   ],
   [
    "\\nu_n",
    "frequenza del modo $n$ (Hz)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ]
  ],
  "val": "Corda di lunghezza $L$ fissata a entrambi gli estremi: $y(0)=y(L)=0$.",
  "err": "Dire che sono permesse tutte le $\\lambda<2L$, come gli appunti a p. 7: sono permesse solo le $\\lambda_n=2L/n$, valori discreti, e la più lunga è proprio $2L$.",
  "lab": "5",
  "rel": [
   "5.7",
   "5.15",
   "5.5"
  ],
  "pdf": "p. 7–8"
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
  "h": "Con estremi fissi la forma è sin(kx), non cos. A_n e φ_n dalle condizioni iniziali.",
  "sym": [
   [
    "\\psi(x,t)",
    "spostamento della corda (m)"
   ],
   [
    "A_n",
    "ampiezza del modo $n$ (m)"
   ],
   [
    "k_n",
    "numero d'onda $n\\pi/L$ (rad/m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "\\omega_n",
    "pulsazione $k_n v$ (rad/s)"
   ],
   [
    "\\varphi_n",
    "fase del modo $n$ (rad)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Corda fissa agli estremi; due costanti per modo, $A_n$ e $\\varphi_n$, dalla forma e dalla velocità iniziali della corda.",
  "err": "Usare $\\cos(k_nx)$, che in $x=0$ non si annulla: la condizione $y(0)=0$ impone $\\varphi=\\pi/2$ e la forma diventa $\\sin(k_nx)$.",
  "lab": "5",
  "rel": [
   "5.6",
   "5.8",
   "5.15"
  ],
  "pdf": "p. 8"
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
  "h": "Prostaferesi: sin a cos b = ½[sin(a + b) + sin(a − b)].",
  "sym": [
   [
    "A",
    "ampiezza dell'onda stazionaria (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Identità trigonometrica, vale per ogni modo normale: due onde con stessa ampiezza $A/2$, stessi $k$ e $\\omega$, versi opposti.",
  "err": "Dare ampiezza $A$ a ciascuna progressiva: ognuna ha $A/2$. E pensare che l'onda stazionaria trasporti energia: le due progressive portano potenze uguali e opposte, il flusso netto medio è nullo.",
  "lab": "5",
  "rel": [
   "5.7",
   "5.2",
   "5.17"
  ],
  "pdf": "p. 8–9"
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
  "h": "Viene dalla componente trasversale della tensione, T_ψ ≈ −T₀ ∂ψ/∂x.",
  "sym": [
   [
    "P(x,t)",
    "potenza che attraversa il punto $x$, verso $+x$ (W)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial x}",
    "pendenza della corda"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial t}",
    "velocità trasversale (m/s)"
   ]
  ],
  "val": "Piccole pendenze ($\\sin\\theta\\simeq\\tan\\theta$); è la potenza che il tratto a sinistra di $x$ cede a quello a destra. Vale per ogni forma d'onda.",
  "err": "Perdere il segno meno: la forza trasversale del tratto di sinistra è $-T_0\\,\\partial\\psi/\\partial x$. Con il segno giusto un'onda progressiva dà $P>0$. $P$ è nulla dove la corda è orizzontale (creste), massima dove la pendenza è massima.",
  "lab": "5",
  "rel": [
   "5.10",
   "5.18",
   "5.11"
  ],
  "pdf": "p. 11"
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
  "h": "L'energia fluisce nel verso di propagazione.",
  "sym": [
   [
    "P",
    "potenza istantanea (W)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial x}",
    "pendenza"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial t}",
    "velocità trasversale (m/s)"
   ]
  ],
  "val": "Solo per un'onda progressiva $f(x-vt)$, usando $\\partial_t\\psi=-v\\,\\partial_x\\psi$. Per la regressiva compare un segno meno.",
  "err": "Scrivere $T_0v\\left(\\partial\\psi/\\partial t\\right)^2$, come il passaggio a matita degli appunti a p. 11: sostituendo $\\partial_x\\psi=-\\frac1v\\partial_t\\psi$ la $v$ va al denominatore. Controllo: $T_0/v$ è in kg/s, per $\\mathrm{(m/s)^2}$ dà watt.",
  "lab": "5",
  "rel": [
   "5.9",
   "5.17",
   "5.13"
  ],
  "pdf": "p. 11"
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
  "h": "= ½ρ_L v ω²A². Istantanea: T₀A²kω cos²(kx − ωt).",
  "sym": [
   [
    "\\langle P\\rangle",
    "potenza media su un periodo (W)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ]
  ],
  "val": "Onda armonica progressiva, media su un periodo (o su una lunghezza d'onda), con $\\langle\\cos^2\\rangle=\\frac12$.",
  "err": "Dimenticare il $\\frac12$ della media. Oppure integrare la potenza su tutto il tempo: un'onda armonica infinita porterebbe energia infinita, è un'idealizzazione, per questo si usa la potenza media.",
  "lab": "5",
  "rel": [
   "5.18",
   "5.19",
   "5.10"
  ],
  "pdf": "p. 11, 33"
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
  "h": "Da mÿ = −Ky − (2T₀/v)ẏ: le onde emesse sui due lati fanno da attrito. ω₀² = K/m.",
  "sym": [
   [
    "y(t)",
    "spostamento della massa, $\\psi(0,t)$ (m)"
   ],
   [
    "\\gamma",
    "smorzamento dovuto alle onde (s⁻¹)"
   ],
   [
    "\\omega_0",
    "pulsazione propria, $\\omega_0^2=K/m$ (rad/s)"
   ],
   [
    "T_0",
    "tensione delle corde (N)"
   ],
   [
    "m",
    "massa (kg)"
   ],
   [
    "v",
    "velocità delle onde sulla corda (m/s)"
   ]
  ],
  "val": "Due corde semi-infinite uguali, una per lato, con sole onde uscenti (nessuna riflessione); piccole pendenze. Oscilla se $\\gamma<\\omega_0$, con $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$.",
  "err": "Mettere $\\gamma=2T_0/(mv)$: il termine $\\frac{2T_0}{v}\\dot y$ va confrontato con $2\\gamma m\\dot y$, quindi il 2 delle due corde è già il 2 della convenzione. Gli appunti scrivono poi $\\omega_0y$ senza quadrato e la soluzione con $\\omega_0$ al posto di $\\sqrt{\\omega_0^2-\\gamma^2}$.",
  "lab": "5b",
  "rel": [
   "5.13",
   "5.20",
   "2.1",
   "2.5"
  ],
  "pdf": "p. 12"
 },
 {
  "id": "5.13",
  "c": 5,
  "n": "Impedenza e potenza irradiata",
  "q": "Impedenza della corda e potenza che una massa oscillante, legata a due corde, irradia sotto forma di onde",
  "t": "Z = \\frac{T_0}{v} = \\sqrt{T_0\\,\\rho_L},\\qquad P_{\\rm rad} = @@",
  "a": "2Z\\,\\dot{y}^2",
  "d": [
   "Z\\,\\dot{y}^2",
   "2Z\\,y^2",
   "\\frac{2\\,\\dot{y}^2}{Z}"
  ],
  "h": "Ogni corda porta via (T₀/v)ẏ², la potenza dell'onda progressiva in x = 0. Uguagliando a 2γmẏ² si ritrova γ = Z/m = T₀/(mv).",
  "sym": [
   [
    "Z",
    "impedenza della corda, rapporto tra forza e velocità trasversale (kg/s)"
   ],
   [
    "T_0",
    "tensione delle corde (N)"
   ],
   [
    "v",
    "velocità delle onde, $\\sqrt{T_0/\\rho_L}$ (m/s)"
   ],
   [
    "\\rho_L",
    "densità lineare (kg/m)"
   ],
   [
    "P_{\\rm rad}",
    "potenza irradiata nelle due corde (W)"
   ],
   [
    "\\dot{y}",
    "velocità della massa (m/s)"
   ]
  ],
  "val": "Onde solo uscenti (corde semi-infinite, nessuna riflessione), piccole pendenze. Gli appunti scrivono $T_0/v$; il nome impedenza indica il coefficiente in $F=-Z\\dot y$.",
  "err": "Contare una sola corda: la massa emette un'onda a destra e una a sinistra, ognuna con potenza $Z\\dot y^2$. Oppure pensare che l'energia persa diventi calore: viaggia lontano lungo le corde.",
  "lab": "5b",
  "rel": [
   "5.12",
   "5.20",
   "5.10",
   "5.19"
  ],
  "pdf": "p. 11–12"
 },
 {
  "id": "5.14",
  "c": 5,
  "n": "Frusta",
  "q": "Frusta: velocità dell'onda dove la densità lineare diminuisce verso la punta",
  "t": "v(x) = @@,\\qquad \\rho_L(x)\\to 0\\;\\Rightarrow\\; v > v_s",
  "a": "\\sqrt{\\frac{T}{\\rho_L(x)}}",
  "d": [
   "\\sqrt{\\frac{\\rho_L(x)}{T}}",
   "\\frac{T}{\\rho_L(x)}",
   "\\sqrt{T\\,\\rho_L(x)}"
  ],
  "h": "Sezione e ρ_L calano verso la punta, quindi v cresce enormemente; l'energia cinetica si concentra su una massa sempre più piccola. Alla punta si supera la velocità del suono: lo schiocco è un boom sonico.",
  "sym": [
   [
    "v(x)",
    "velocità locale dell'onda (m/s)"
   ],
   [
    "T",
    "tensione della frusta (N)"
   ],
   [
    "\\rho_L(x)",
    "densità lineare locale, decrescente verso la punta (kg/m)"
   ],
   [
    "v_s",
    "velocità del suono nell'aria, circa 340 m/s"
   ]
  ],
  "val": "Modello qualitativo degli appunti: tensione uguale lungo la frusta, $\\rho_L$ che diminuisce con continuità, $v$ velocità locale.",
  "err": "Pensare che su un tratto più sottile l'onda vada più piano: a parità di tensione, meno massa per metro significa $v$ più grande. E lo schiocco non è un urto: è un boom sonico, lo stesso cono di Mach di un aereo supersonico.",
  "lab": "5c",
  "rel": [
   "5.1",
   "6.3",
   "9.5"
  ],
  "pdf": "p. 75"
 },
 {
  "id": "5.15",
  "c": 5,
  "n": "Nodi del modo n",
  "q": "Posizioni dei nodi del modo n di una corda fissata agli estremi",
  "t": "\\sin(k_n x) = 0 \\;\\Rightarrow\\; x_m = @@,\\quad m = 0,1,\\dots,n",
  "a": "\\frac{m\\,L}{n}",
  "d": [
   "\\frac{m\\,L}{2n}",
   "\\frac{(2m+1)\\,L}{2n}",
   "\\frac{n\\,L}{m}"
  ],
  "h": "Con k_n = nπ/L: k_n x = mπ. Il modo n ha n + 1 nodi contando i due estremi, cioè n − 1 nodi interni; i ventri stanno a metà tra due nodi.",
  "sym": [
   [
    "k_n",
    "numero d'onda del modo $n$, $n\\pi/L$ (rad/m)"
   ],
   [
    "x_m",
    "posizione del nodo $m$-esimo (m)"
   ],
   [
    "m",
    "indice del nodo (qui non è una massa)"
   ],
   [
    "L",
    "lunghezza della corda (m)"
   ],
   [
    "n",
    "numero del modo"
   ]
  ],
  "val": "Corda fissa agli estremi, un solo modo normale eccitato. In una sovrapposizione di modi diversi questi punti non restano fermi.",
  "err": "Contare $n$ nodi interni: il fondamentale non ne ha, il secondo modo ne ha uno al centro. Oppure mettere i nodi in $(2m+1)L/(2n)$: quelli sono i ventri.",
  "lab": "5",
  "rel": [
   "5.6",
   "5.7"
  ],
  "pdf": "p. 6–8"
 },
 {
  "id": "5.16",
  "c": 5,
  "n": "Variabili di D'Alembert",
  "q": "Operatore d'onda scritto nelle variabili ξ = x − vt e η = x + vt",
  "t": "\\frac{\\partial^2\\psi}{\\partial x^2} - \\frac{1}{v^2}\\frac{\\partial^2\\psi}{\\partial t^2} = @@ = 0",
  "a": "4\\,\\frac{\\partial^2\\psi}{\\partial\\xi\\,\\partial\\eta}",
  "d": [
   "2\\,\\frac{\\partial^2\\psi}{\\partial\\xi\\,\\partial\\eta}",
   "\\frac{\\partial^2\\psi}{\\partial\\xi^2}+\\frac{\\partial^2\\psi}{\\partial\\eta^2}",
   "4\\,\\frac{\\partial^2\\psi}{\\partial\\xi^2}"
  ],
  "h": "ψ_xx = ψ_ξξ + ψ_ηη + 2ψ_ξη e ψ_tt = v²(ψ_ξξ + ψ_ηη − 2ψ_ξη). Da ψ_ξη = 0 segue ψ = f(ξ) + g(η).",
  "sym": [
   [
    "\\psi",
    "perturbazione (m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "\\xi",
    "variabile $x-vt$ (m)"
   ],
   [
    "\\eta",
    "variabile $x+vt$ (m)"
   ]
  ],
  "val": "Equazione di D'Alembert in 1D con $v$ costante; le due derivate miste sono uguali.",
  "err": "Dimenticare che $\\partial\\xi/\\partial t=-v$: è questo segno che, nella derivata seconda nel tempo, cambia il segno del termine misto e lascia solo $4\\,\\partial^2\\psi/\\partial\\xi\\partial\\eta$.",
  "lab": "5",
  "rel": [
   "5.2",
   "5.1",
   "5.3"
  ],
  "pdf": "p. 9–10"
 },
 {
  "id": "5.17",
  "c": 5,
  "n": "Potenza dell'onda regressiva",
  "q": "Potenza trasportata da un'onda puramente regressiva g(x + vt)",
  "t": "\\psi = g(x+vt):\\qquad P = @@",
  "a": "-\\frac{T_0}{v}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
  "d": [
   "+\\frac{T_0}{v}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
   "-T_0\\,v\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2",
   "-\\frac{v}{T_0}\\left(\\frac{\\partial\\psi}{\\partial t}\\right)^2"
  ],
  "h": "Con ∂ψ/∂t = +v ∂ψ/∂x la potenza è negativa: l'energia fluisce verso −x, cioè nel verso di propagazione.",
  "sym": [
   [
    "\\psi",
    "perturbazione (m)"
   ],
   [
    "g",
    "forma dell'onda regressiva"
   ],
   [
    "P",
    "potenza verso $+x$ (W)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "\\frac{\\partial\\psi}{\\partial t}",
    "velocità trasversale (m/s)"
   ]
  ],
  "val": "Onda solo regressiva. Se sono presenti sia progressiva che regressiva, $P=-T_0\\partial_x\\psi\\,\\partial_t\\psi$ contiene anche termini misti.",
  "err": "Pensare che una potenza negativa sia un assurdo: il segno dice solo che l'energia va nel verso delle $x$ decrescenti.",
  "lab": "5",
  "rel": [
   "5.10",
   "5.9",
   "5.3"
  ],
  "pdf": "p. 11"
 },
 {
  "id": "5.18",
  "c": 5,
  "n": "Potenza istantanea armonica",
  "q": "Potenza istantanea di un'onda armonica progressiva ψ = A sin(kx − ωt)",
  "t": "\\psi = A\\sin(kx-\\omega t):\\quad P(x,t) = @@",
  "a": "T_0A^2k\\omega\\cos^2(kx-\\omega t)",
  "d": [
   "T_0A^2k\\omega\\sin^2(kx-\\omega t)",
   "-T_0A^2k\\omega\\cos^2(kx-\\omega t)",
   "\\tfrac12T_0A^2k\\omega\\cos^2(kx-\\omega t)"
  ],
  "h": "Sempre ≥ 0 e funzione di x − vt: la potenza viaggia con l'onda. Massima dove ψ = 0 (pendenza massima), nulla sulle creste.",
  "sym": [
   [
    "\\psi",
    "spostamento (m)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "P(x,t)",
    "potenza istantanea (W)"
   ]
  ],
  "val": "Onda armonica progressiva su corda, piccole pendenze. Se l'onda è scritta con il coseno, come a p. 73, al posto di $\\cos^2$ compare $\\sin^2$.",
  "err": "Mettere la potenza massima sulle creste: lì la corda è orizzontale e ferma, quindi $P=0$. Il massimo è nei passaggi per lo zero, dove pendenza e velocità sono massime.",
  "lab": "5",
  "rel": [
   "5.9",
   "5.11",
   "5.19"
  ],
  "pdf": "p. 11–12, 73"
 },
 {
  "id": "5.19",
  "c": 5,
  "n": "Potenza media con l'impedenza",
  "q": "Potenza media dell'onda armonica scritta con tensione e densità della corda",
  "t": "\\langle P\\rangle = \\tfrac12\\,T_0A^2k\\omega = @@",
  "a": "\\tfrac12\\sqrt{T_0\\,\\rho_L}\\;\\omega^2A^2",
  "d": [
   "\\tfrac12\\sqrt{T_0/\\rho_L}\\;\\omega^2A^2",
   "\\tfrac12\\sqrt{T_0\\,\\rho_L}\\;\\omega A^2",
   "\\tfrac12\\,\\rho_L\\,\\omega^2A^2"
  ],
  "h": "Con k = ω/v e T₀/v = √(T₀ρ_L) = Z. Equivale a ½ρ_L v ω²A²: cresce con il quadrato di frequenza e ampiezza.",
  "sym": [
   [
    "\\langle P\\rangle",
    "potenza media (W)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "A",
    "ampiezza (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "\\rho_L",
    "densità lineare (kg/m)"
   ]
  ],
  "val": "Onda armonica progressiva, media su un periodo; $\\sqrt{T_0\\rho_L}$ è l'impedenza $Z$ della corda.",
  "err": "Confondere $\\sqrt{T_0/\\rho_L}$, che è la velocità $v$, con $\\sqrt{T_0\\rho_L}$, che è l'impedenza. Il controllo dimensionale aiuta: $\\langle P\\rangle$ deve venire in watt.",
  "lab": "5",
  "rel": [
   "5.11",
   "5.13"
  ],
  "pdf": "p. 11, 33"
 },
 {
  "id": "5.20",
  "c": 5,
  "n": "Forza della corda sulla massa",
  "q": "Forza verticale che la corda di destra, con onda uscente, esercita sulla massa in x = 0",
  "t": "F_1 = T_0\\left.\\frac{\\partial\\psi}{\\partial x}\\right|_{x=0} = @@",
  "a": "-\\frac{T_0}{v}\\,\\dot{y}",
  "d": [
   "+\\frac{T_0}{v}\\,\\dot{y}",
   "-T_0\\,v\\,\\dot{y}",
   "-\\frac{2T_0}{v}\\,\\dot{y}"
  ],
  "h": "A destra l'onda è progressiva: ∂ψ/∂x = −(1/v)∂ψ/∂t. Anche la corda di sinistra, con onda regressiva, dà −(T₀/v)ẏ: le due forze si sommano.",
  "sym": [
   [
    "F_1",
    "componente verticale della forza della corda di destra (N)"
   ],
   [
    "T_0",
    "tensione (N)"
   ],
   [
    "\\left.\\frac{\\partial\\psi}{\\partial x}\\right|_{x=0}",
    "pendenza della corda accanto alla massa"
   ],
   [
    "v",
    "velocità delle onde (m/s)"
   ],
   [
    "\\dot{y}",
    "velocità della massa (m/s)"
   ]
  ],
  "val": "Corda di destra con sola onda uscente (nessuna riflessione), piccole pendenze, massa puntiforme nella giunzione.",
  "err": "Pensare che le forze delle due corde si annullino per simmetria: le pendenze sono opposte, ma lo sono anche i versi di propagazione, quindi le due forze hanno lo stesso segno, entrambe opposte alla velocità.",
  "lab": "5b",
  "rel": [
   "5.12",
   "5.13",
   "5.3"
  ],
  "pdf": "p. 12"
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
  "h": "1) la corda non si spezza; 2) la potenza incidente si divide tra riflessa e trasmessa. ω è la stessa.",
  "sym": [
   [
    "\\psi_{0i},\\ \\psi_{0r},\\ \\psi_{0t}",
    "ampiezze incidente, riflessa, trasmessa (m)"
   ],
   [
    "k_1",
    "numero d'onda nella corda 1 (rad/m)"
   ],
   [
    "k_2",
    "numero d'onda nella corda 2 (rad/m)"
   ]
  ],
  "val": "Giunzione in $x=0$ tra due corde semi-infinite con la stessa tensione; onde armoniche con la stessa $\\omega$; nessuna dissipazione.",
  "err": "Conservare $\\psi_0^2$ invece della potenza: la potenza di un'onda armonica è $\\propto T\\psi_0^2k\\omega$ e $k$ cambia da una corda all'altra, quindi nel bilancio compaiono i pesi $k_1$ e $k_2$.",
  "lab": "6",
  "rel": [
   "6.2",
   "6.8",
   "6.4"
  ],
  "pdf": "p. 71–73"
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
  "h": "Vale sempre 1 + r = t.",
  "sym": [
   [
    "r",
    "coefficiente di riflessione per l'ampiezza, $\\psi_{0r}/\\psi_{0i}$"
   ],
   [
    "t",
    "coefficiente di trasmissione per l'ampiezza, $\\psi_{0t}/\\psi_{0i}$"
   ],
   [
    "k_1,\\ k_2",
    "numeri d'onda nelle due corde (rad/m)"
   ]
  ],
  "val": "Stessa tensione e stessa $\\omega$ nelle due corde; onda incidente da sinistra (corda 1).",
  "err": "Tenere la soluzione $t=0$, $r=-1$ del sistema: va scartata perché per due corde qualsiasi non ha senso fisico. Oppure scambiare i $k$ al numeratore di $t$: c'è il $k$ della corda da cui arriva l'onda.",
  "lab": "6",
  "rel": [
   "6.1",
   "6.3",
   "6.12"
  ],
  "pdf": "p. 73"
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
  "h": "A parità di tensione e frequenza k ∝ √ρ.",
  "sym": [
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "t",
    "coefficiente di trasmissione (ampiezza)"
   ],
   [
    "\\rho_1,\\ \\rho_2",
    "densità lineari delle due corde (kg/m)"
   ]
  ],
  "val": "Stessa tensione $T$ nelle due corde (equilibrio della giunzione) e stessa frequenza, così $k\\propto\\sqrt\\rho$.",
  "err": "Usare $\\rho$ invece di $\\sqrt\\rho$: $k=\\omega/v$ e $v=\\sqrt{T/\\rho}$, quindi $k\\propto\\sqrt\\rho$. Con $\\rho_2=4\\rho_1$ viene $r=-\\frac13$, non $-\\frac35$.",
  "lab": "6",
  "rel": [
   "6.2",
   "6.9",
   "6.11"
  ],
  "pdf": "p. 73–74"
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
  "h": "t può valere 2 senza violare l'energia: conta T, non t.",
  "sym": [
   [
    "R",
    "coefficiente di riflessione per l'energia"
   ],
   [
    "T",
    "coefficiente di trasmissione per l'energia (qui non è la tensione)"
   ],
   [
    "r,\\ t",
    "coefficienti per l'ampiezza"
   ],
   [
    "k_1,\\ k_2",
    "numeri d'onda (rad/m)"
   ]
  ],
  "val": "Nessuna dissipazione alla giunzione: $R+T=1$.",
  "err": "Usare $T=t^2$: la potenza dipende anche da $k$, quindi $T=\\frac{k_2}{k_1}t^2$. Con estremo libero $t=2$ ma $k_2\\to0$, quindi $T\\to0$: nessuna violazione dell'energia.",
  "lab": "6",
  "rel": [
   "6.1",
   "6.11",
   "6.2"
  ],
  "pdf": "p. 74"
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
  "h": "Solo riflessione, con l'impulso capovolto (sfasamento π).",
  "sym": [
   [
    "\\rho_1,\\ \\rho_2",
    "densità lineari (kg/m)"
   ],
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "t",
    "coefficiente di trasmissione (ampiezza)"
   ]
  ],
  "val": "Seconda corda molto più densa: si comporta come un estremo fisso (una parete).",
  "err": "Pensare che il riflesso torni dritto: torna capovolto ($r=-1$, sfasamento $\\pi$), e nella giunzione incidente e riflessa si annullano ($1+r=0$).",
  "lab": "6",
  "rel": [
   "6.6",
   "6.7",
   "5.6"
  ],
  "pdf": "p. 74"
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
  "h": "L'onda riflessa mantiene la stessa fase.",
  "sym": [
   [
    "\\rho_1,\\ \\rho_2",
    "densità lineari (kg/m)"
   ],
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "t",
    "coefficiente di trasmissione (ampiezza)"
   ]
  ],
  "val": "Seconda corda molto più leggera: si comporta come un estremo libero.",
  "err": "Credere che $t=2$ violi la conservazione dell'energia: l'ampiezza raddoppia, ma la potenza trasmessa è $\\frac{k_2}{k_1}t^2\\to0$ perché $k_2\\to0$. Tutta l'energia torna indietro ($R=1$).",
  "lab": "6",
  "rel": [
   "6.5",
   "6.4",
   "6.7"
  ],
  "pdf": "p. 74"
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
  "h": "Il secondo mezzo è più denso: sfasamento di π. Equivale a k₁ < k₂ e v₁ > v₂.",
  "sym": [
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "\\rho_1",
    "densità della corda da cui arriva l'onda (kg/m)"
   ],
   [
    "\\rho_2",
    "densità della seconda corda (kg/m)"
   ]
  ],
  "val": "Stessa tensione nelle due corde. Equivale a $k_1<k_2$ e a $v_1>v_2$.",
  "err": "Ragionare con le velocità al contrario: l'impulso si capovolge passando da un mezzo veloce a uno lento (più denso). Il trasmesso invece non si capovolge mai: $t>0$ sempre.",
  "lab": "6",
  "rel": [
   "6.5",
   "6.6",
   "6.3"
  ],
  "pdf": "p. 74"
 },
 {
  "id": "6.8",
  "c": 6,
  "n": "Le tre onde alla giunzione",
  "q": "Onda incidente e onda riflessa armoniche alla giunzione tra due corde",
  "t": "\\psi_i = \\psi_{0i}\\cos(k_1x-\\omega t),\\qquad \\psi_r = @@",
  "a": "\\psi_{0r}\\cos(k_1x+\\omega t)",
  "d": [
   "\\psi_{0r}\\cos(k_2x+\\omega t)",
   "\\psi_{0r}\\cos(k_1x-\\omega t)",
   "\\psi_{0r}\\cos(k_2x-\\omega t)"
  ],
  "h": "La riflessa è regressiva e resta nella corda 1 (k₁); la trasmessa è ψ₀t cos(k₂x − ωt). Tutte con la stessa ω.",
  "sym": [
   [
    "\\psi_i,\\ \\psi_r",
    "onda incidente e riflessa (m)"
   ],
   [
    "\\psi_{0i},\\ \\psi_{0r}",
    "ampiezze (m)"
   ],
   [
    "k_1",
    "numero d'onda nella corda 1 (rad/m)"
   ],
   [
    "x",
    "posizione, giunzione in $x=0$ (m)"
   ],
   [
    "\\omega",
    "pulsazione, uguale nelle due corde (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Due corde semi-infinite con la stessa tensione, giunzione in $x=0$, onda che arriva da sinistra.",
  "err": "Cambiare $\\omega$ nella seconda corda: in $x=0$ la continuità deve valere a ogni istante, quindi la frequenza è la stessa. Cambiano $v$, $\\lambda$ e $k$.",
  "lab": "6",
  "rel": [
   "6.1",
   "6.9",
   "6.2"
  ],
  "pdf": "p. 72"
 },
 {
  "id": "6.9",
  "c": 6,
  "n": "Numero d'onda e densità",
  "q": "Numero d'onda su una corda di densità ρ, a frequenza e tensione fissate",
  "t": "k = \\frac{2\\pi}{\\lambda} = \\frac{\\omega}{v} = @@",
  "a": "\\frac{2\\pi\\nu}{\\sqrt{T}}\\,\\sqrt{\\rho}",
  "d": [
   "\\frac{2\\pi\\nu}{\\sqrt{\\rho}}\\,\\sqrt{T}",
   "2\\pi\\nu\\,\\sqrt{T\\rho}",
   "\\frac{\\nu}{\\sqrt{T}}\\,\\sqrt{\\rho}"
  ],
  "h": "Da λν = v = √(T/ρ). Con stessa ν e stessa T: k ∝ √ρ, quindi k₁/k₂ = √ρ₁/√ρ₂.",
  "sym": [
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "\\nu",
    "frequenza (Hz)"
   ],
   [
    "T",
    "tensione (N)"
   ],
   [
    "\\rho",
    "densità lineare (kg/m)"
   ]
  ],
  "val": "Stessa frequenza e stessa tensione nelle due corde, come alla giunzione.",
  "err": "Pensare che nella corda più densa la lunghezza d'onda si allunghi: l'onda è più lenta, quindi $\\lambda$ si accorcia e $k$ cresce.",
  "lab": "6",
  "rel": [
   "6.3",
   "6.8",
   "5.4"
  ],
  "pdf": "p. 72–74"
 },
 {
  "id": "6.10",
  "c": 6,
  "n": "Corde uguali",
  "q": "Caso limite ρ₁ = ρ₂: quanto valgono r e t?",
  "t": "\\rho_1 = \\rho_2:\\quad @@",
  "a": "r = 0,\\quad t = 1",
  "d": [
   "r = 1,\\quad t = 0",
   "r = 0,\\quad t = 0",
   "r = 1,\\quad t = 1"
  ],
  "h": "Nessuna discontinuità: l'onda passa invariata, senza riflessione.",
  "sym": [
   [
    "\\rho_1,\\ \\rho_2",
    "densità lineari (kg/m)"
   ],
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "t",
    "coefficiente di trasmissione (ampiezza)"
   ]
  ],
  "val": "Stessa tensione; in generale basta $k_1=k_2$.",
  "err": "Pensare che il nodo tra due corde uguali rifletta comunque qualcosa: in questo modello la riflessione nasce solo dalla differenza di $k$, cioè di densità.",
  "lab": "6",
  "rel": [
   "6.5",
   "6.6",
   "6.3"
  ],
  "pdf": "p. 74"
 },
 {
  "id": "6.11",
  "c": 6,
  "n": "Energia trasmessa con le densità",
  "q": "Coefficiente di trasmissione per l'energia in funzione delle densità delle due corde",
  "t": "T = 1 - R = @@",
  "a": "\\frac{4\\sqrt{\\rho_1\\rho_2}}{(\\sqrt{\\rho_1}+\\sqrt{\\rho_2})^2}",
  "d": [
   "\\frac{4\\rho_1}{(\\sqrt{\\rho_1}+\\sqrt{\\rho_2})^2}",
   "\\frac{2\\sqrt{\\rho_1\\rho_2}}{(\\sqrt{\\rho_1}+\\sqrt{\\rho_2})^2}",
   "\\frac{4\\sqrt{\\rho_1\\rho_2}}{\\rho_1+\\rho_2}"
  ],
  "h": "È (k₂/k₁)t². Simmetrica nello scambio 1 ↔ 2: passa la stessa frazione di energia nei due versi, anche se t è diverso.",
  "sym": [
   [
    "T",
    "coefficiente di trasmissione per l'energia (qui non è la tensione)"
   ],
   [
    "R",
    "coefficiente di riflessione per l'energia, $r^2$"
   ],
   [
    "\\rho_1,\\ \\rho_2",
    "densità lineari (kg/m)"
   ]
  ],
  "val": "Stessa tensione nelle due corde, nessuna dissipazione alla giunzione.",
  "err": "Calcolare $T=t^2=\\frac{4\\rho_1}{(\\sqrt{\\rho_1}+\\sqrt{\\rho_2})^2}$: manca il fattore $k_2/k_1=\\sqrt{\\rho_2/\\rho_1}$. Con $\\rho_2=4\\rho_1$: $t=\\frac23$, $R=\\frac19$, $T=\\frac89$.",
  "lab": "6",
  "rel": [
   "6.4",
   "6.3"
  ],
  "pdf": "p. 74"
 },
 {
  "id": "6.12",
  "c": 6,
  "n": "r e t con le velocità",
  "q": "Coefficienti r e t in funzione delle velocità v₁ e v₂ nelle due corde",
  "t": "r = \\frac{v_2-v_1}{v_1+v_2},\\qquad t = @@",
  "a": "\\frac{2v_2}{v_1+v_2}",
  "d": [
   "\\frac{2v_1}{v_1+v_2}",
   "\\frac{v_1+v_2}{2v_2}",
   "\\frac{2v_2}{v_2-v_1}"
  ],
  "h": "Da k = ω/v con la stessa ω: al posto di k₁ si mette 1/v₁. Riflessa capovolta (r < 0) se v₂ < v₁.",
  "sym": [
   [
    "r",
    "coefficiente di riflessione (ampiezza)"
   ],
   [
    "t",
    "coefficiente di trasmissione (ampiezza)"
   ],
   [
    "v_1,\\ v_2",
    "velocità delle onde nelle due corde (m/s)"
   ]
  ],
  "val": "Stessa frequenza e stessa tensione nelle due corde (ipotesi usate per ricavare $r$ e $t$).",
  "err": "Ricopiare la forma di $r(k)$ mettendo $v$ al posto di $k$: siccome $k\\propto1/v$ i ruoli si scambiano, e al numeratore di $t$ va $v_2$.",
  "lab": "6",
  "rel": [
   "6.2",
   "6.3",
   "6.7"
  ],
  "pdf": "p. 73–74"
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
  "h": "ψ è lo spostamento longitudinale delle particelle di fluido.",
  "sym": [
   [
    "v",
    "velocità di propagazione dell'onda acustica (m/s)"
   ],
   [
    "\\beta",
    "modulo di compressibilità del fluido (Pa)"
   ],
   [
    "\\rho_0",
    "densità di equilibrio del fluido ($\\mathrm{kg/m^3}$)"
   ],
   [
    "P",
    "pressione (Pa)"
   ],
   [
    "\\rho",
    "densità ($\\mathrm{kg/m^3}$)"
   ],
   [
    "\\left.\\frac{\\partial P}{\\partial\\rho}\\right|_0",
    "derivata calcolata nello stato di equilibrio"
   ]
  ],
  "val": "Fluido trattato come continuo, tubo di sezione costante, onda piana lungo $x$, piccole deformazioni $|\\partial\\psi/\\partial x|\\ll1$. La derivata $\\partial P/\\partial\\rho$ va presa lungo la trasformazione giusta: per questo serve sapere come $P$ dipende da $\\rho$ e da $T$ (gas perfetto).",
  "err": "Calcolare $\\partial P/\\partial\\rho$ a temperatura costante: è l'errore di Newton e dà 280 m/s invece di 331 m/s. Le compressioni del suono sono adiabatiche, quindi $\\beta=\\gamma P_0$.",
  "lab": "7",
  "rel": [
   "7.2",
   "7.20",
   "7.4",
   "7.5"
  ],
  "pdf": "p. 26, 28"
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
  "h": "dP è in fase con dρ e in quadratura con ψ. Nodo di spostamento = ventre di pressione.",
  "sym": [
   [
    "d\\rho",
    "variazione di densità rispetto a $\\rho_0$ ($\\mathrm{kg/m^3}$)"
   ],
   [
    "\\rho_0",
    "densità di equilibrio ($\\mathrm{kg/m^3}$)"
   ],
   [
    "\\psi",
    "spostamento longitudinale di una particella di fluido dalla sua posizione di equilibrio (m)"
   ],
   [
    "x",
    "coordinata lungo il tubo (m)"
   ],
   [
    "dP",
    "variazione di pressione rispetto a $P_0$ (Pa)"
   ],
   [
    "\\beta",
    "modulo di compressibilità (Pa)"
   ]
  ],
  "val": "Piccole perturbazioni ($|\\partial\\psi/\\partial x|\\ll1$), onda piana. $d\\rho$ e $dP$ soddisfano la stessa equazione di D'Alembert di $\\psi$, con $v^2=\\beta/\\rho_0$ (scheda 7.20).",
  "err": "Pensare che la densità aumenti dove lo spostamento è massimo. Conta la derivata: $d\\rho\\propto-\\partial\\psi/\\partial x$. Dove $\\psi$ è massimo (ventre di spostamento) $\\partial\\psi/\\partial x=0$ e la pressione non cambia: lì c'è un nodo di pressione.",
  "lab": "7",
  "rel": [
   "7.1",
   "7.3",
   "7.27"
  ],
  "pdf": "p. 26–27"
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
  "h": "E dρ = Aρ₀k sin(kx − ωt).",
  "sym": [
   [
    "dP",
    "variazione di pressione (Pa)"
   ],
   [
    "A",
    "ampiezza dello spostamento, con $\\psi=A\\cos(kx-\\omega t)$ (m)"
   ],
   [
    "\\beta",
    "modulo di compressibilità (Pa)"
   ],
   [
    "k",
    "numero d'onda $2\\pi/\\lambda$ (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "x,\\ t",
    "posizione (m) e tempo (s)"
   ]
  ],
  "val": "Onda armonica progressiva $\\psi=A\\cos(kx-\\omega t)$. Negli appunti (p. 27) $\\psi$ è scritta senza $A$: va sottintesa. Con $\\beta=\\gamma P_0$ l'ampiezza di pressione è $dP_{max}=\\gamma P_0kA$.",
  "err": "Scrivere $dP$ in fase con $\\psi$ (con il coseno). La derivata spaziale trasforma il coseno in seno: $dP$ è in quadratura con lo spostamento, sfasata di $\\pi/2$, e in fase con $d\\rho$.",
  "lab": "7",
  "rel": [
   "7.2",
   "7.10",
   "7.24"
  ],
  "pdf": "p. 27"
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
  "h": "Sbagliata rispetto alle misure: le compressioni sono troppo rapide per essere isoterme.",
  "sym": [
   [
    "v_{iso}",
    "velocità del suono nell'ipotesi isoterma (m/s)"
   ],
   [
    "P_0",
    "pressione di equilibrio, circa $10^5$ Pa"
   ],
   [
    "\\rho_0",
    "densità di equilibrio dell'aria ($\\mathrm{kg/m^3}$)"
   ]
  ],
  "val": "Varrebbe se le compressioni fossero abbastanza lente da scambiare calore ($dT=0$, quindi $dP/P_0=-dV/V_0$). Con $P_0\\approx1{,}013\\cdot10^5$ Pa e $\\rho_0\\approx1{,}29\\ \\mathrm{kg/m^3}$ dà circa 280 m/s, in disaccordo con le misure.",
  "err": "Credere che l'isoterma sia giusta perché le variazioni di temperatura sono piccole. Il punto è il tempo: con periodi tra 50 μs e 50 ms il calore non fa in tempo a passare, quindi la trasformazione è adiabatica.",
  "lab": "7",
  "rel": [
   "7.5",
   "7.21",
   "7.1"
  ],
  "pdf": "p. 32"
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
  "h": "≈ 1,183 volte il valore di Newton (√1,4).",
  "sym": [
   [
    "v",
    "velocità del suono (m/s)"
   ],
   [
    "\\gamma",
    "indice dell'adiabatica $(\\eta+2)/\\eta$: $7/5$ per l'aria (adimensionale)"
   ],
   [
    "P_0",
    "pressione di equilibrio (Pa)"
   ],
   [
    "\\rho_0",
    "densità di equilibrio ($\\mathrm{kg/m^3}$)"
   ]
  ],
  "val": "Compressioni adiabatiche (rapide, senza scambio di calore), gas perfetto, piccole perturbazioni. 331 m/s è il valore a 0 °C; a 20 °C si ha circa 343 m/s (scheda 7.6). Insieme all'onda di pressione viaggia un'onda di temperatura con la stessa velocità.",
  "err": "Mettere $\\gamma$ fuori dalla radice: $\\gamma\\sqrt{P_0/\\rho_0}\\approx392$ m/s. Il fattore di Laplace rispetto a Newton è $\\sqrt\\gamma=\\sqrt{1{,}4}=1{,}183$, non $\\gamma$.",
  "lab": "7",
  "rel": [
   "7.4",
   "7.6",
   "7.8",
   "7.22"
  ],
  "pdf": "p. 32"
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
  "h": "μ = massa di una molecola. A 273 K: 20,05·√273 ≈ 331 m/s.",
  "sym": [
   [
    "v",
    "velocità del suono (m/s)"
   ],
   [
    "\\gamma",
    "indice dell'adiabatica (adimensionale)"
   ],
   [
    "k_B",
    "costante di Boltzmann, $1{,}38\\cdot10^{-23}$ J/K"
   ],
   [
    "T",
    "temperatura assoluta (K)"
   ],
   [
    "\\mu",
    "massa di una molecola (kg)"
   ],
   [
    "\\alpha",
    "costante dell'aria $\\sqrt{\\gamma k_B/\\mu}\\simeq20{,}05\\ \\mathrm{m\\,s^{-1}K^{-1/2}}$"
   ]
  ],
  "val": "Gas perfetto, compressioni adiabatiche. $T$ in kelvin, mai in gradi Celsius. A temperatura fissata $v$ non dipende dalla pressione: nella formula compare solo $T$.",
  "err": "Mettere $T$ in °C, oppure pensare che $v$ sia proporzionale a $T$: raddoppiando la temperatura assoluta $v$ cresce di $\\sqrt2$, non di 2. Attenzione alle unità: negli appunti $\\alpha$ è scritta in m/s, ma è in $\\mathrm{m\\,s^{-1}K^{-1/2}}$.",
  "lab": "7",
  "rel": [
   "7.5",
   "7.29",
   "7.30"
  ],
  "pdf": "p. 32, 80"
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
  "h": "N = n·N_A. k_B = 1,38·10⁻²³ J/K, N_A = 6,022·10²³.",
  "sym": [
   [
    "P",
    "pressione (Pa)"
   ],
   [
    "V",
    "volume ($\\mathrm{m^3}$)"
   ],
   [
    "n",
    "numero di moli"
   ],
   [
    "R",
    "costante dei gas, $k_BN_A\\simeq8{,}31$ J/(mol K)"
   ],
   [
    "T",
    "temperatura assoluta (K)"
   ],
   [
    "N",
    "numero totale di molecole, $N=nN_A$"
   ],
   [
    "k_B",
    "costante di Boltzmann, $1{,}38\\cdot10^{-23}$ J/K"
   ],
   [
    "N_A",
    "numero di Avogadro, $6{,}022\\cdot10^{23}\\ \\mathrm{mol^{-1}}$"
   ]
  ],
  "val": "Gas ideale in equilibrio: molecole puntiformi che interagiscono solo per urti.",
  "err": "Confondere $n$ (moli) e $N$ (molecole), cioè usare $R$ con $N$ o $k_B$ con $n$. Negli appunti (p. 28) $k_B$ è scritta $1{,}38\\cdot10^{-11}$ J/K: il valore giusto è $1{,}38\\cdot10^{-23}$ J/K.",
  "lab": "7",
  "rel": [
   "7.30",
   "7.9",
   "7.6"
  ],
  "pdf": "p. 28"
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
  "h": "Monoatomico η = 3: γ = 5/3. Biatomico, come l'aria, η = 5: γ = 7/5.",
  "sym": [
   [
    "P",
    "pressione (Pa)"
   ],
   [
    "V",
    "volume ($\\mathrm{m^3}$)"
   ],
   [
    "\\gamma",
    "indice dell'adiabatica (adimensionale, $>1$)"
   ],
   [
    "\\eta",
    "gradi di libertà di una molecola: 3 monoatomico, 5 biatomico"
   ]
  ],
  "val": "Adiabatica reversibile ($dQ=0$, isentropica) di un gas perfetto. Si ricava da $dU=-P\\,dV$ con $U=\\frac\\eta2PV$. L'aria è quasi tutta $\\mathrm{N_2}$ e $\\mathrm{O_2}$, biatomici: $\\gamma\\simeq7/5$.",
  "err": "Usare $\\gamma=5/3$ per l'aria: è il valore dei gas monoatomici. Oppure invertire la frazione: $\\gamma$ è sempre maggiore di 1, perché l'adiabatica è più ripida dell'isoterma (per cui $\\gamma=1$).",
  "lab": "7",
  "rel": [
   "7.9",
   "7.5",
   "7.22"
  ],
  "pdf": "p. 30–31"
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
  "h": "Per particella ε = (η/2)k_BT. In adiabatica dU = −P dV.",
  "sym": [
   [
    "U",
    "energia interna del gas (J)"
   ],
   [
    "\\eta",
    "gradi di libertà di una molecola"
   ],
   [
    "N",
    "numero di molecole"
   ],
   [
    "k_B",
    "costante di Boltzmann (J/K)"
   ],
   [
    "T",
    "temperatura assoluta (K)"
   ],
   [
    "P,\\ V",
    "pressione (Pa) e volume ($\\mathrm{m^3}$)"
   ]
  ],
  "val": "Gas perfetto, molecole tutte uguali, ognuna con energia media $\\varepsilon=\\frac\\eta2k_BT$. In un'adiabatica il primo principio con $dQ=0$ dà $dU=-P\\,dV$.",
  "err": "Usare sempre $\\frac32k_BT$ per molecola: vale solo per il gas monoatomico ($\\eta=3$). Per l'aria $\\eta=5$.",
  "lab": "7",
  "rel": [
   "7.8",
   "7.7"
  ],
  "pdf": "p. 30"
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
  "h": "dP_max = γP₀kA. Equivale anche a ½ρ₀ω²A²v.",
  "sym": [
   [
    "\\bar I",
    "intensità media: potenza media per unità di superficie ($\\mathrm{W/m^2}$)"
   ],
   [
    "\\gamma",
    "indice dell'adiabatica"
   ],
   [
    "P_0",
    "pressione di equilibrio (Pa)"
   ],
   [
    "A",
    "ampiezza di spostamento (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "dP_{max}",
    "ampiezza dell'onda di pressione, $\\gamma P_0kA$ (Pa)"
   ],
   [
    "\\rho_0",
    "densità di equilibrio ($\\mathrm{kg/m^3}$)"
   ],
   [
    "v",
    "velocità del suono (m/s)"
   ]
  ],
  "val": "Onda piana armonica, compressioni adiabatiche. Si passa da una forma all'altra con $\\gamma P_0=\\rho_0v^2$ e $k=\\omega/v$. Equivale anche a $\\frac12\\rho_0\\omega^2A^2v$ (scheda 7.11).",
  "err": "Dimenticare l'$\\frac12$ (media di $\\sin^2$) o mettere $\\gamma P_0$ al denominatore: $dP_{max}^2/(2\\gamma P_0)$ ha le dimensioni di una pressione, non di un'intensità.",
  "lab": "7b",
  "rel": [
   "7.11",
   "7.24",
   "7.23",
   "7.12"
  ],
  "pdf": "p. 33, 77"
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
  "h": "Da I = ½ρ₀ω²s²_max v.",
  "sym": [
   [
    "s_{max}",
    "ampiezza di spostamento delle particelle d'aria (m)"
   ],
   [
    "I",
    "intensità ($\\mathrm{W/m^2}$)"
   ],
   [
    "\\rho_0",
    "densità dell'aria ($\\mathrm{kg/m^3}$)"
   ],
   [
    "\\omega",
    "pulsazione $2\\pi f$ (rad/s)"
   ],
   [
    "v",
    "velocità del suono (m/s)"
   ]
  ],
  "val": "Onda piana armonica. Esempio: $f=1000$ Hz, $I=10^{-6}\\ \\mathrm{W/m^2}$ (60 dB), $\\rho_0=1{,}2\\ \\mathrm{kg/m^3}$, $v=343$ m/s: $s_{max}\\approx1{,}1\\cdot10^{-8}$ m, circa 11 nm.",
  "err": "Gli appunti (p. 77) danno 10 μm per questo esempio: è sbagliato di un fattore 1000. Il conto dà circa 11 nm, coerente con le soglie: 11 pm a 0 dB, 11 μm a 120 dB. Poiché $s_{max}\\propto\\sqrt I$, +60 dB moltiplicano $s_{max}$ per 1000.",
  "lab": "7b",
  "rel": [
   "7.10",
   "7.24",
   "7.25"
  ],
  "pdf": "p. 77–78"
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
  "h": "0 dB soglia di udibilità, 120 dB soglia del dolore (1 W/m²). +10 dB = intensità ×10.",
  "sym": [
   [
    "L",
    "livello di intensità sonora (dB)"
   ],
   [
    "I",
    "intensità ($\\mathrm{W/m^2}$)"
   ],
   [
    "I_0",
    "intensità di riferimento: soglia di udibilità, $10^{-12}\\ \\mathrm{W/m^2}$"
   ]
  ],
  "val": "Scala logaritmica: ogni +10 dB l'intensità si moltiplica per 10, ogni +3 dB circa raddoppia. La sensibilità dell'orecchio dipende anche dalla frequenza (curve isofoniche).",
  "err": "Usare $20\\log_{10}$: il fattore 20 vale per i rapporti di ampiezza (pressione, spostamento), perché $I\\propto dP^2$. Con le intensità il fattore è 10. Attenzione agli appunti (p. 77): \"2 volte più forte ⇔ $I_2=100\\,I_1$\"; la regola usuale è +10 dB, cioè $I_2=10\\,I_1$.",
  "lab": "7b",
  "rel": [
   "7.26",
   "7.25",
   "7.18"
  ],
  "pdf": "p. 77–78"
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
  "h": "Ω angolo solido di emissione: 4π se la sorgente emette in tutte le direzioni.",
  "sym": [
   [
    "I(r)",
    "intensità a distanza $r$ ($\\mathrm{W/m^2}$)"
   ],
   [
    "P",
    "potenza emessa dalla sorgente (W)"
   ],
   [
    "\\Omega",
    "angolo solido in cui la sorgente emette (sr): $4\\pi$ se isotropa"
   ],
   [
    "r",
    "distanza dalla sorgente (m)"
   ]
  ],
  "val": "Sorgente puntiforme (siamo lontani rispetto alle sue dimensioni), mezzo senza assorbimento: la potenza si conserva e si distribuisce su superfici $\\Omega r^2$ sempre più grandi.",
  "err": "Far calare l'intensità come $1/r$: è l'ampiezza che va come $1/r$, l'intensità ($\\propto A^2$) va come $1/r^2$.",
  "lab": "7b",
  "rel": [
   "8.4",
   "7.18",
   "7.14"
  ],
  "pdf": "p. 35, 78"
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
  "h": "α, coefficiente di assorbimento, dipende dal materiale.",
  "sym": [
   [
    "I(z)",
    "intensità dopo aver percorso lo spessore $z$ ($\\mathrm{W/m^2}$)"
   ],
   [
    "I_0",
    "intensità all'ingresso, in $z=0$ (qui NON è la soglia di $10^{-12}\\ \\mathrm{W/m^2}$)"
   ],
   [
    "\\alpha",
    "coefficiente di assorbimento ($\\mathrm{m^{-1}}$)"
   ],
   [
    "z",
    "spessore attraversato (m)"
   ]
  ],
  "val": "La perdita in un tratto $dz$ è proporzionale a $dz$ e all'intensità stessa. Vale per luce e suono; $\\alpha$ dipende dal materiale (anche l'aria) ed è più grande nei mezzi densi o viscosi. Dopo $z=1/\\alpha$ l'intensità è scesa a $1/e\\approx37\\%$.",
  "err": "Confondere questa $I_0$ (intensità iniziale) con la $I_0=10^{-12}\\ \\mathrm{W/m^2}$ dei decibel. Oppure credere che l'assorbimento tolga ogni metro gli stessi W/m²: toglie la stessa frazione.",
  "lab": "7b",
  "rel": [
   "7.15",
   "7.13"
  ],
  "pdf": "p. 78–79"
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
  "h": "Qui β è un'attenuazione in dB/m, non il modulo di compressibilità.",
  "sym": [
   [
    "L",
    "livello con l'assorbimento (dB)"
   ],
   [
    "L(r)",
    "livello dovuto alla sola attenuazione geometrica, $10\\log_{10}\\frac{P}{\\Omega r^2I_0}$ (dB)"
   ],
   [
    "\\beta",
    "attenuazione per assorbimento (dB/m); non è il modulo di compressibilità"
   ],
   [
    "r",
    "distanza dalla sorgente (m)"
   ],
   [
    "\\alpha",
    "coefficiente di assorbimento ($\\mathrm{m^{-1}}$)"
   ],
   [
    "10\\log_{10}e",
    "fattore di conversione, circa 4,34"
   ]
  ],
  "val": "Sorgente puntiforme in un mezzo assorbente: $I(r)=\\frac{P}{\\Omega r^2}e^{-\\alpha r}$. In dB la parte geometrica cala col logaritmo di $r$ ($-6$ dB a ogni raddoppio), l'assorbimento cala linearmente in $r$: a grandi distanze vince l'assorbimento.",
  "err": "Mettere $\\beta=\\alpha$ (dimenticando il passaggio da $\\ln$ a $\\log_{10}$) o usare 20 invece di 10: $\\alpha$ agisce su un'intensità, quindi $\\beta=10\\log_{10}(e)\\,\\alpha\\simeq4{,}34\\,\\alpha$.",
  "lab": "7b",
  "rel": [
   "7.14",
   "7.18",
   "7.12"
  ],
  "pdf": "p. 78"
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
  "h": "Estremo aperto = ventre di spostamento, chiuso = nodo. Tra due ventri c'è λ/2.",
  "sym": [
   [
    "\\lambda_n",
    "lunghezza d'onda del modo $n$ (m)"
   ],
   [
    "L",
    "lunghezza della canna (m)"
   ],
   [
    "n",
    "numero del modo: 1, 2, 3, …"
   ],
   [
    "f_n",
    "frequenza del modo $n$ (Hz)"
   ],
   [
    "v",
    "velocità del suono (m/s)"
   ]
  ],
  "val": "Onde stazionarie in una canna aperta–aperta (ventri di spostamento agli estremi) o chiusa–chiusa (nodi agli estremi). Ci sono tutte le armoniche $f_n=nf_1$, con $f_1=v/(2L)$.",
  "err": "Pensare che chiusa–chiusa abbia frequenze diverse da aperta–aperta: tra due nodi o tra due ventri c'è sempre $\\lambda/2$, quindi le frequenze sono le stesse. Cambia solo dove stanno nodi e ventri.",
  "lab": "7",
  "rel": [
   "7.17",
   "7.27",
   "7.28",
   "7.19"
  ],
  "pdf": "p. 76"
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
  "h": "Solo armoniche dispari: tra ventre e nodo c'è λ/4.",
  "sym": [
   [
    "\\lambda_m",
    "lunghezza d'onda del modo $m$ (m)"
   ],
   [
    "L",
    "lunghezza della canna (m)"
   ],
   [
    "m",
    "numero del modo: 1, 2, 3, …"
   ],
   [
    "f_m",
    "frequenza del modo $m$ (Hz)"
   ],
   [
    "v",
    "velocità del suono (m/s)"
   ]
  ],
  "val": "Canna con un estremo aperto (ventre di spostamento) e uno chiuso (nodo). Fondamentale $f_1=v/(4L)$, metà di quella di una canna aperta–aperta della stessa lunghezza; solo armoniche dispari $f_1, 3f_1, 5f_1,\\dots$",
  "err": "Scrivere $f=m\\,v/(4L)$ con $m$ qualsiasi: con $m$ pari avresti due nodi o due ventri agli estremi, cioè un'altra canna. Nella forma degli appunti con $n$, $n$ deve essere dispari; con $m$ intero qualsiasi si scrive $2m-1$.",
  "lab": "7",
  "rel": [
   "7.16",
   "7.27",
   "7.19"
  ],
  "pdf": "p. 76"
 },
 {
  "id": "7.18",
  "c": 7,
  "n": "Livello sonoro e distanza",
  "q": "Di quanto cala il livello sonoro passando dalla distanza r₁ alla distanza r₂ (solo attenuazione geometrica)",
  "t": "L(r_2) = L(r_1)\\ @@",
  "a": "-\\,20\\log_{10}\\frac{r_2}{r_1}",
  "d": [
   "-\\,10\\log_{10}\\frac{r_2}{r_1}",
   "-\\,20\\log_{10}\\frac{r_1}{r_2}",
   "-\\,20\\ln\\frac{r_2}{r_1}"
  ],
  "h": "Raddoppiando la distanza: −6 dB. Decuplicandola: −20 dB.",
  "sym": [
   [
    "L(r_1),\\ L(r_2)",
    "livelli sonori alle distanze $r_1$ e $r_2$ (dB)"
   ],
   [
    "r_1,\\ r_2",
    "distanze dalla sorgente (m)"
   ]
  ],
  "val": "Sorgente puntiforme, nessun assorbimento: $I\\propto1/r^2$ (schede 7.13 e 8.4). Da $L=10\\log_{10}(I/I_0)$: $L(r_2)-L(r_1)=10\\log_{10}\\frac{r_1^2}{r_2^2}=-20\\log_{10}\\frac{r_2}{r_1}$.",
  "err": "Usare 10 invece di 20 ($-3$ dB a ogni raddoppio): il 20 nasce dal quadrato di $1/r^2$. Oppure pensare che il livello cali in proporzione alla distanza: cala col logaritmo; il calo lineare in dB è quello dell'assorbimento (scheda 7.15).",
  "lab": "7b",
  "rel": [
   "7.12",
   "7.13",
   "7.15",
   "8.4"
  ],
  "pdf": "p. 78"
 },
 {
  "id": "7.19",
  "c": 7,
  "n": "Timbro e armoniche",
  "q": "Un suono musicale reale come somma di armoniche: quali frequenze contiene",
  "t": "\\psi(t) = \\sum_{n\\ge1} A_n\\cos(2\\pi f_n t + \\varphi_n),\\qquad f_n = @@",
  "a": "n\\,f_1",
  "d": [
   "\\frac{f_1}{n}",
   "n^2 f_1",
   "2^n f_1"
  ],
  "h": "LA a 440 Hz: armoniche a 880, 1320, 1760 Hz… Il timbro è il peso relativo delle ampiezze Aₙ.",
  "sym": [
   [
    "\\psi(t)",
    "segnale sonoro in un punto (spostamento o pressione)"
   ],
   [
    "A_n",
    "ampiezza dell'armonica $n$"
   ],
   [
    "f_n",
    "frequenza dell'armonica $n$ (Hz)"
   ],
   [
    "f_1",
    "frequenza fondamentale: fissa l'altezza della nota (Hz)"
   ],
   [
    "\\varphi_n",
    "fase dell'armonica $n$ (rad)"
   ],
   [
    "n",
    "1, 2, 3, …"
   ]
  ],
  "val": "Suono periodico (una nota tenuta): contiene solo multipli interi della fondamentale. Un tono puro ha solo $A_1\\ne0$: è una sinusoide perfetta e suona \"piatto e pungente\". La struttura dello strumento amplifica le armoniche in modo diverso: per questo lo stesso LA suona diverso su strumenti diversi.",
  "err": "Credere che due strumenti che suonano la stessa nota emettano la stessa onda: hanno la stessa $f_1$ (altezza) ma ampiezze $A_n$ diverse (timbro). Altro errore: prendere le armoniche per ottave $2^nf_1$; le ottave sono solo le armoniche 2, 4, 8, …",
  "lab": "7",
  "rel": [
   "7.16",
   "7.17"
  ],
  "pdf": "p. 75"
 },
 {
  "id": "7.20",
  "c": 7,
  "n": "Onde di densità e di pressione",
  "q": "Equazione d'onda per la variazione di pressione dP (la stessa vale per dρ)",
  "t": "\\frac{\\partial^2 (dP)}{\\partial t^2} = @@\\,\\frac{\\partial^2 (dP)}{\\partial x^2}",
  "a": "\\frac{\\beta}{\\rho_0}",
  "d": [
   "\\frac{\\rho_0}{\\beta}",
   "\\sqrt{\\frac{\\beta}{\\rho_0}}",
   "\\frac{\\beta}{\\rho_0^2}"
  ],
  "h": "Stessa equazione per ψ, dρ e dP: tutte viaggiano a v = √(β/ρ₀).",
  "sym": [
   [
    "dP",
    "variazione di pressione (Pa)"
   ],
   [
    "x,\\ t",
    "posizione lungo il tubo (m) e tempo (s)"
   ],
   [
    "\\beta",
    "modulo di compressibilità (Pa)"
   ],
   [
    "\\rho_0",
    "densità di equilibrio ($\\mathrm{kg/m^3}$)"
   ]
  ],
  "val": "Piccole perturbazioni, onda piana nel tubo. Si ottiene derivando rispetto a $x$ l'equazione per $\\psi$ e usando $d\\rho=-\\rho_0\\,\\partial\\psi/\\partial x$ e $dP=(\\beta/\\rho_0)\\,d\\rho$.",
  "err": "Pensare che l'onda di pressione viaggi a una velocità diversa da quella di spostamento: è la stessa onda descritta con grandezze diverse. Cambia solo la fase: $dP$ è in quadratura con $\\psi$.",
  "lab": "7",
  "rel": [
   "7.1",
   "7.2",
   "7.3"
  ],
  "pdf": "p. 26–27"
 },
 {
  "id": "7.21",
  "c": 7,
  "n": "Gas perfetto: piccole variazioni",
  "q": "Legame tra piccole variazioni di volume, pressione e temperatura di un gas perfetto attorno all'equilibrio",
  "t": "\\frac{dV}{V_0} + \\frac{dP}{P_0} = @@",
  "a": "\\frac{dT}{T_0}",
  "d": [
   "0",
   "-\\frac{dT}{T_0}",
   "\\gamma\\,\\frac{dT}{T_0}"
  ],
  "h": "Isoterma (dT = 0): dP/P₀ = −dV/V₀, da cui dP = −P₀ ∂ψ/∂x (Newton).",
  "sym": [
   [
    "dV,\\ V_0",
    "variazione di volume e volume di equilibrio ($\\mathrm{m^3}$)"
   ],
   [
    "dP,\\ P_0",
    "variazione di pressione e pressione di equilibrio (Pa)"
   ],
   [
    "dT,\\ T_0",
    "variazione di temperatura e temperatura di equilibrio (K)"
   ]
  ],
  "val": "Gas perfetto con numero di molecole fisso, variazioni piccole: è il differenziale di $\\ln(PV)=\\ln(Nk_BT)$. Nel tubo sonoro $dV=V_0\\,\\partial\\psi/\\partial x$.",
  "err": "Mettere 0 a destra in ogni caso: vale solo per l'isoterma. Nel suono la temperatura oscilla (onda di temperatura) e con l'adiabatica si ha $dP/P_0=-\\gamma\\,dV/V_0$.",
  "lab": "7",
  "rel": [
   "7.4",
   "7.22",
   "7.7"
  ],
  "pdf": "p. 32"
 },
 {
  "id": "7.22",
  "c": 7,
  "n": "Pressione nell'onda adiabatica",
  "q": "Variazione di pressione legata allo spostamento nell'ipotesi adiabatica di Laplace",
  "t": "dP = @@\\,\\frac{\\partial\\psi}{\\partial x}",
  "a": "-\\gamma P_0",
  "d": [
   "-P_0",
   "\\gamma P_0",
   "-\\frac{P_0}{\\gamma}"
  ],
  "h": "Da PV^γ = cost: dP/P₀ = −γ dV/V₀. Quindi β = γP₀ e v = √(γP₀/ρ₀).",
  "sym": [
   [
    "dP",
    "variazione di pressione (Pa)"
   ],
   [
    "\\gamma",
    "indice dell'adiabatica"
   ],
   [
    "P_0",
    "pressione di equilibrio (Pa)"
   ],
   [
    "\\psi",
    "spostamento longitudinale (m)"
   ],
   [
    "x",
    "posizione (m)"
   ]
  ],
  "val": "Compressioni rapide, senza scambio di calore; piccole perturbazioni. Con $-P_0$ (isoterma) si ritrova il valore sbagliato di Newton.",
  "err": "Dimenticare il segno meno: dove $\\partial\\psi/\\partial x>0$ le particelle si allontanano tra loro, il volume aumenta e la pressione cala.",
  "lab": "7",
  "rel": [
   "7.5",
   "7.21",
   "7.1",
   "7.23"
  ],
  "pdf": "p. 32–33"
 },
 {
  "id": "7.23",
  "c": 7,
  "n": "Potenza dell'onda acustica",
  "q": "Potenza istantanea trasportata da un'onda acustica armonica attraverso la sezione S del tubo",
  "t": "W = -\\gamma P_0 S\\,\\frac{\\partial\\psi}{\\partial x}\\,\\frac{\\partial\\psi}{\\partial t} = @@",
  "a": "\\gamma P_0 S\\,k\\omega A^2\\sin^2(kx - \\omega t)",
  "d": [
   "\\gamma P_0 S\\,k\\omega A^2\\cos^2(kx - \\omega t)",
   "\\tfrac12\\gamma P_0 S\\,k\\omega A^2\\sin(kx - \\omega t)",
   "\\gamma P_0 S\\,k^2 A^2\\sin^2(kx - \\omega t)"
  ],
  "h": "Media di sin² = ½: intensità media Ī = ½γP₀A²kω (scheda 7.10).",
  "sym": [
   [
    "W",
    "potenza istantanea (W)"
   ],
   [
    "\\gamma P_0",
    "modulo di compressibilità adiabatico (Pa)"
   ],
   [
    "S",
    "sezione del tubo ($\\mathrm{m^2}$)"
   ],
   [
    "\\psi",
    "spostamento (m)"
   ],
   [
    "k,\\ \\omega",
    "numero d'onda (rad/m) e pulsazione (rad/s)"
   ],
   [
    "A",
    "ampiezza di spostamento (m)"
   ]
  ],
  "val": "Onda armonica progressiva $\\psi=A\\cos(kx-\\omega t)$, compressioni adiabatiche. La forza sulla sezione è $dP\\cdot S$ e la potenza è forza per velocità $\\partial\\psi/\\partial t$.",
  "err": "Usare il coseno: le due derivate di $A\\cos(kx-\\omega t)$ danno entrambe un seno. La potenza è sempre $\\ge0$: l'energia va sempre nel verso di propagazione.",
  "lab": "7",
  "rel": [
   "7.10",
   "7.22"
  ],
  "pdf": "p. 33"
 },
 {
  "id": "7.24",
  "c": 7,
  "n": "Pressione e spostamento massimi",
  "q": "Legame tra l'ampiezza di pressione dP_max e l'ampiezza di spostamento s_max",
  "t": "dP_{max} = \\gamma P_0\\,k\\,s_{max} = @@",
  "a": "\\rho_0\\,v\\,\\omega\\,s_{max}",
  "d": [
   "\\rho_0\\,v^2\\,\\omega\\,s_{max}",
   "\\frac{\\rho_0\\,\\omega\\,s_{max}}{v}",
   "\\rho_0\\,v\\,\\omega^2\\,s_{max}"
  ],
  "h": "Usa γP₀ = ρ₀v² e k = ω/v. Alla soglia (0 dB, 1000 Hz): 2,8·10⁻⁵ Pa e circa 11 pm.",
  "sym": [
   [
    "dP_{max}",
    "ampiezza di pressione (Pa)"
   ],
   [
    "\\gamma P_0",
    "modulo di compressibilità adiabatico (Pa)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "s_{max}",
    "ampiezza di spostamento (m)"
   ],
   [
    "\\rho_0",
    "densità dell'aria ($\\mathrm{kg/m^3}$)"
   ],
   [
    "v",
    "velocità del suono (m/s)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ]
  ],
  "val": "Onda armonica, compressioni adiabatiche. Con questa relazione le due forme dell'intensità coincidono: $\\frac{dP_{max}^2}{2\\rho_0v}=\\frac12\\rho_0\\omega^2s_{max}^2v$. Qui $s_{max}$ è la $A$ della scheda 7.3.",
  "err": "Pensare che a pari pressione lo spostamento non dipenda dalla frequenza: $s_{max}=dP_{max}/(\\rho_0v\\omega)$, quindi a pari livello i suoni gravi muovono l'aria di più.",
  "lab": "7b",
  "rel": [
   "7.10",
   "7.11",
   "7.3",
   "7.25"
  ],
  "pdf": "p. 33, 77–78"
 },
 {
  "id": "7.25",
  "c": 7,
  "n": "Soglie di udibilità e del dolore",
  "q": "Ampiezza della variazione di pressione alla soglia di udibilità (0 dB) e alla soglia del dolore (120 dB)",
  "t": "\\delta p_{min} \\simeq 2{,}8\\cdot10^{-5}\\ \\mathrm{Pa},\\qquad \\delta p_{max} \\simeq @@",
  "a": "28\\ \\mathrm{Pa}",
  "d": [
   "2{,}8\\cdot10^{7}\\ \\mathrm{Pa}",
   "3{,}4\\cdot10^{-3}\\ \\mathrm{Pa}",
   "0{,}28\\ \\mathrm{Pa}"
  ],
  "h": "Tabella: 0 dB soglia, 10 respiro, 50 conversazione, 75 lavatrice, 120 decollo di un jet (1 W/m²).",
  "sym": [
   [
    "\\delta p_{min}",
    "ampiezza di pressione alla soglia di udibilità, $I_0=10^{-12}\\ \\mathrm{W/m^2}$"
   ],
   [
    "\\delta p_{max}",
    "ampiezza di pressione alla soglia del dolore, $I=1\\ \\mathrm{W/m^2}$"
   ]
  ],
  "val": "Valori per l'aria ($\\rho_0v\\approx410\\ \\mathrm{kg\\,m^{-2}s^{-1}}$), con $\\delta p=\\sqrt{2\\rho_0vI}$. A 1000 Hz gli spostamenti sono circa 11 pm (meno della distanza H–H) e 11 μm. L'orecchio copre 12 ordini di grandezza in intensità: per questo si usano i dB.",
  "err": "Scalare la pressione come l'intensità: tra 0 e 120 dB l'intensità cresce di $10^{12}$, la pressione solo di $10^6$, perché $I\\propto\\delta p^2$.",
  "lab": "7b",
  "rel": [
   "7.12",
   "7.24",
   "7.11"
  ],
  "pdf": "p. 78"
 },
 {
  "id": "7.26",
  "c": 7,
  "n": "Differenza di livelli",
  "q": "Rapporto tra due intensità a partire dalla differenza dei loro livelli in decibel",
  "t": "\\frac{I_2}{I_1} = @@",
  "a": "10^{(L_2 - L_1)/10}",
  "d": [
   "10^{(L_2 - L_1)/20}",
   "\\frac{L_2}{L_1}",
   "e^{(L_2 - L_1)/10}"
  ],
  "h": "+3 dB ≈ ×2, +10 dB = ×10, +20 dB = ×100. I dB si sottraggono, le intensità si dividono.",
  "sym": [
   [
    "I_1,\\ I_2",
    "intensità ($\\mathrm{W/m^2}$)"
   ],
   [
    "L_1,\\ L_2",
    "livelli corrispondenti (dB)"
   ]
  ],
  "val": "Conseguenza diretta di $L=10\\log_{10}(I/I_0)$: $L_2-L_1=10\\log_{10}(I_2/I_1)$, e $I_0$ si semplifica.",
  "err": "Fare il rapporto dei livelli: 60 dB non è \"il doppio\" di 30 dB, è $10^3$ volte l'intensità. Negli appunti (p. 77) \"2 volte più forte ⇔ $I_2=100\\,I_1$\" corrisponde a +20 dB; la regola usuale è +10 dB.",
  "lab": "7b",
  "rel": [
   "7.12",
   "7.18"
  ],
  "pdf": "p. 77"
 },
 {
  "id": "7.27",
  "c": 7,
  "n": "Nodi di spostamento e di pressione",
  "q": "Onda stazionaria in una canna: dove stanno i nodi di pressione rispetto a quelli di spostamento",
  "t": "\\psi = A\\sin kx\\,\\cos\\omega t\\;\\Rightarrow\\; dP = @@",
  "a": "-\\beta k A\\cos kx\\,\\cos\\omega t",
  "d": [
   "-\\beta k A\\sin kx\\,\\cos\\omega t",
   "\\beta k A\\cos kx\\,\\sin\\omega t",
   "-\\frac{\\beta A}{k}\\cos kx\\,\\cos\\omega t"
  ],
  "h": "Da dP = −β ∂ψ/∂x. Nodo di spostamento (sin kx = 0) = ventre di pressione (cos kx = ±1), e viceversa.",
  "sym": [
   [
    "\\psi",
    "spostamento longitudinale (m)"
   ],
   [
    "A",
    "ampiezza dell'onda stazionaria (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "x,\\ t",
    "posizione (m) e tempo (s)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "dP",
    "variazione di pressione (Pa)"
   ],
   [
    "\\beta",
    "modulo di compressibilità (Pa)"
   ]
  ],
  "val": "Onda stazionaria, piccole perturbazioni. $dP=-\\beta\\,\\partial\\psi/\\partial x$ segue da $d\\rho=-\\rho_0\\,\\partial\\psi/\\partial x$ e $dP=(\\beta/\\rho_0)\\,d\\rho$. Estremo chiuso: nodo di spostamento e ventre di pressione; estremo aperto: il contrario.",
  "err": "Pensare che all'estremo chiuso \"non succeda niente\": lo spostamento è nullo, ma le molecole che sbattono sul fondo producono la massima variazione di pressione.",
  "lab": "7",
  "rel": [
   "7.2",
   "7.16",
   "7.17",
   "7.28"
  ],
  "pdf": "p. 76–77"
 },
 {
  "id": "7.28",
  "c": 7,
  "n": "Tubo di Kundt: misura di v",
  "q": "Velocità del suono dalla distanza tra due nodi consecutivi dell'onda stazionaria nel tubo",
  "t": "v = \\lambda f = @@",
  "a": "2f\\,\\Delta x_{nodi}",
  "d": [
   "f\\,\\Delta x_{nodi}",
   "4f\\,\\Delta x_{nodi}",
   "\\frac{\\Delta x_{nodi}}{2f}"
  ],
  "h": "Due nodi consecutivi distano λ/2; un nodo e il ventre vicino distano λ/4.",
  "sym": [
   [
    "v",
    "velocità del suono (m/s)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "f",
    "frequenza dell'onda (Hz)"
   ],
   [
    "\\Delta x_{nodi}",
    "distanza tra due nodi consecutivi (m)"
   ]
  ],
  "val": "Onda stazionaria in un tubo in risonanza, frequenza nota. Vale per nodi di spostamento o di pressione indifferentemente: entrambi sono spaziati di $\\lambda/2$.",
  "err": "Prendere la distanza tra due nodi come $\\lambda$: tra due nodi consecutivi c'è mezza lunghezza d'onda, come nella corda.",
  "lab": "7",
  "rel": [
   "7.16",
   "7.27"
  ],
  "pdf": "p. 76"
 },
 {
  "id": "7.29",
  "c": 7,
  "n": "Velocità a due temperature",
  "q": "Rapporto tra le velocità del suono in un gas a due temperature diverse",
  "t": "\\frac{v(T_2)}{v(T_1)} = @@",
  "a": "\\sqrt{\\frac{T_2}{T_1}}",
  "d": [
   "\\frac{T_2}{T_1}",
   "\\sqrt{\\frac{T_1}{T_2}}",
   "\\sqrt{\\frac{T_2 - T_1}{T_1}}"
  ],
  "h": "Da 0 °C (273 K) a 20 °C (293 K): da 331 a 343 m/s. Le temperature vanno in kelvin.",
  "sym": [
   [
    "v(T)",
    "velocità del suono alla temperatura $T$ (m/s)"
   ],
   [
    "T_1,\\ T_2",
    "temperature assolute (K)"
   ]
  ],
  "val": "Stesso gas (stessi $\\gamma$ e $\\mu$), compressioni adiabatiche: da $v=\\alpha\\sqrt T$ la costante $\\alpha$ si semplifica.",
  "err": "Usare i gradi Celsius: $\\sqrt{20/0}$ non ha senso. Con i kelvin il rapporto è $\\sqrt{293/273}=1{,}036$.",
  "lab": "7",
  "rel": [
   "7.6",
   "7.5"
  ],
  "pdf": "p. 32, 80"
 },
 {
  "id": "7.30",
  "c": 7,
  "n": "Pressione, densità e temperatura",
  "q": "Pressione di un gas perfetto in funzione della densità di massa e della temperatura",
  "t": "P = \\bar n\\,k_B T = @@",
  "a": "\\frac{\\rho}{\\mu}\\,k_B T",
  "d": [
   "\\frac{\\mu}{\\rho}\\,k_B T",
   "\\rho\\,\\mu\\,k_B T",
   "\\frac{\\rho}{\\mu}\\,R\\,T"
  ],
  "h": "n̄ = N/V è il numero di molecole per unità di volume; con μ massa di una molecola, ρ/μ = n̄.",
  "sym": [
   [
    "P",
    "pressione (Pa)"
   ],
   [
    "\\bar n",
    "molecole per unità di volume ($\\mathrm{m^{-3}}$)"
   ],
   [
    "k_B",
    "costante di Boltzmann (J/K)"
   ],
   [
    "T",
    "temperatura assoluta (K)"
   ],
   [
    "\\rho",
    "densità di massa ($\\mathrm{kg/m^3}$)"
   ],
   [
    "\\mu",
    "massa di una molecola (kg)"
   ]
  ],
  "val": "Gas perfetto. Serve per calcolare $\\partial P/\\partial\\rho$, cioè la velocità del suono, una volta deciso come varia $T$ (isoterma o adiabatica).",
  "err": "Usare per $\\mu$ la massa molare (kg/mol) insieme a $k_B$: con la massa molare va $R$, con la massa di una molecola va $k_B$. Negli appunti $\\mu$ è chiamato \"peso molecolare\", ma qui è la massa di una molecola.",
  "lab": "7",
  "rel": [
   "7.7",
   "7.6",
   "7.1"
  ],
  "pdf": "p. 28"
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
  "h": "□ = (1/v²)∂²/∂t² − ∇². Vale per qualunque direzione di propagazione.",
  "sym": [
   [
    "\\nabla^2",
    "laplaciano $\\partial_x^2+\\partial_y^2+\\partial_z^2$ ($\\mathrm{m^{-2}}$)"
   ],
   [
    "\\psi",
    "perturbazione, campo scalare $\\psi(x,y,z,t)$"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "\\Box",
    "dalembertiano $\\frac{1}{v^2}\\partial_t^2-\\nabla^2$"
   ]
  ],
  "val": "Mezzo omogeneo e isotropo (stessa $v$ ovunque e in ogni direzione), equazione lineare: vale la sovrapposizione. Soluzioni: onde piane in qualunque direzione e onde sferiche.",
  "err": "Mettere $v^2$ dalla parte sbagliata. Nella forma col laplaciano c'è $1/v^2$ davanti alla derivata temporale; nella forma $\\partial_t^2\\psi=v^2\\nabla^2\\psi$ il $v^2$ moltiplica le derivate spaziali. Controlla le dimensioni.",
  "lab": "8",
  "rel": [
   "8.5",
   "8.3",
   "8.2"
  ],
  "pdf": "p. 35"
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
  "h": "|k| = 2π/λ. Fronti d'onda: piani perpendicolari a k; ampiezza costante.",
  "sym": [
   [
    "\\psi",
    "perturbazione"
   ],
   [
    "A",
    "ampiezza, costante"
   ],
   [
    "\\vec k",
    "vettore d'onda $k\\hat u$, modulo $2\\pi/\\lambda$ (rad/m)"
   ],
   [
    "\\vec r",
    "posizione $(x,y,z)$ (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Onda piana armonica che si propaga lungo $\\hat u=\\vec k/k$. Buona approssimazione di un'onda sferica lontano dalla sorgente, su regioni piccole rispetto al raggio di curvatura del fronte.",
  "err": "Scrivere $A/r$: l'onda piana non si attenua, i suoi fronti hanno tutti la stessa area. Il fattore $1/r$ è delle onde sferiche.",
  "lab": "8",
  "rel": [
   "8.3",
   "8.6",
   "8.7",
   "8.4"
  ],
  "pdf": "p. 33–34"
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
  "h": "Si ottiene mettendo l'onda piana in D'Alembert 3D.",
  "sym": [
   [
    "k_x,\\ k_y,\\ k_z",
    "componenti del vettore d'onda (rad/m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ]
  ],
  "val": "Mezzo non dispersivo ($v$ non dipende da $\\omega$). Fissata $\\omega$, il modulo di $\\vec k$ è fissato ($\\omega/v$), la direzione è libera. Si ottiene mettendo l'onda piana nell'equazione di D'Alembert 3D.",
  "err": "Pensare che ogni componente valga $\\omega/v$: è la somma dei quadrati a valere $\\omega^2/v^2$. Una componente da sola è una proiezione, più piccola.",
  "lab": "8",
  "rel": [
   "8.2",
   "8.1",
   "8.7"
  ],
  "pdf": "p. 34–35"
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
  "h": "I ∝ A²: l'intensità cala come 1/r², l'ampiezza come 1/r.",
  "sym": [
   [
    "I(r)",
    "intensità a distanza $r$ ($\\mathrm{W/m^2}$)"
   ],
   [
    "I_1",
    "intensità nota alla distanza $r_1$"
   ],
   [
    "r_1,\\ r",
    "distanze dalla sorgente (m)"
   ],
   [
    "A(r)",
    "ampiezza dell'onda sferica"
   ]
  ],
  "val": "Sorgente puntiforme isotropa, mezzo senza assorbimento: la potenza in un angolo solido $d\\Omega$ si conserva, cioè $I\\,r^2\\,d\\Omega$ è costante.",
  "err": "Applicare $1/r^2$ all'ampiezza: raddoppiando la distanza l'intensità diventa 1/4, l'ampiezza 1/2. Nel tubo sonoro invece la sezione è costante e non c'è attenuazione geometrica.",
  "lab": "8",
  "rel": [
   "7.13",
   "8.8",
   "7.18"
  ],
  "pdf": "p. 35"
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
  "h": "Gradiente: da scalare a vettore. Divergenza: da vettore a scalare.",
  "sym": [
   [
    "\\nabla^2",
    "laplaciano"
   ],
   [
    "\\nabla",
    "gradiente, l'operatore $(\\partial_x,\\partial_y,\\partial_z)$"
   ],
   [
    "\\nabla\\cdot",
    "divergenza"
   ],
   [
    "\\psi",
    "campo scalare $\\psi(x,y,z)$"
   ]
  ],
  "val": "Coordinate cartesiane. Prima il gradiente (da scalare a vettore), poi la divergenza (da vettore a scalare): il risultato è di nuovo uno scalare.",
  "err": "Mettere le derivate miste o il quadrato delle derivate prime. Il laplaciano è la somma delle derivate seconde pure: in 3D generalizza la curvatura $\\partial^2\\psi/\\partial x^2$ della corda.",
  "lab": "8",
  "rel": [
   "8.9",
   "8.10",
   "8.1"
  ],
  "pdf": "p. 36–37"
 },
 {
  "id": "8.6",
  "c": 8,
  "n": "Fronte d'onda",
  "q": "Onda piana che si propaga lungo û: superfici su cui la perturbazione è costante",
  "t": "\\psi = \\psi(\\hat u\\cdot\\vec r - v t):\\qquad \\text{fronti d'onda: } @@ = \\text{cost}",
  "a": "\\hat u\\cdot\\vec r - v t",
  "d": [
   "\\hat u\\times\\vec r - v t",
   "|\\vec r| - v t",
   "\\hat u\\cdot\\vec r + v t"
  ],
  "h": "A t fissato: û·r = cost, piani perpendicolari a û. Onda sferica: r − vt = cost, sfere.",
  "sym": [
   [
    "\\psi",
    "perturbazione"
   ],
   [
    "\\hat u",
    "versore della direzione di propagazione"
   ],
   [
    "\\vec r",
    "posizione $(x,y,z)$ (m)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ],
   [
    "t",
    "tempo (s)"
   ]
  ],
  "val": "Onda progressiva qualsiasi (non solo armonica) in un mezzo omogeneo. Il raggio, cioè la direzione di propagazione, è perpendicolare al fronte.",
  "err": "Confondere fronte d'onda e raggio: il fronte è la superficie a fase costante, il raggio è la direzione in cui l'onda avanza, perpendicolare al fronte.",
  "lab": "8",
  "rel": [
   "8.2",
   "8.7",
   "12.15"
  ],
  "pdf": "p. 33–34, 67–68"
 },
 {
  "id": "8.7",
  "c": 8,
  "n": "Vettore d'onda",
  "q": "Vettore d'onda di un'onda piana che si propaga lungo il versore û",
  "t": "\\vec k = @@,\\qquad |\\vec k| = \\frac{2\\pi}{\\lambda} = \\frac{\\omega}{v}",
  "a": "k\\,\\hat u",
  "d": [
   "\\frac{\\hat u}{k}",
   "k\\,\\vec r",
   "\\omega\\,\\hat u"
  ],
  "h": "k·r = kₓx + k_y y + k_z z è la fase spaziale dell'onda piana.",
  "sym": [
   [
    "\\vec k",
    "vettore d'onda (rad/m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\hat u",
    "versore di propagazione"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "v",
    "velocità di fase (m/s)"
   ]
  ],
  "val": "Onda piana armonica in un mezzo non dispersivo. Negli appunti (p. 34) è scritto \"$\\vec K=k\\cdot r\\,\\hat u$\": la definizione corretta è $\\vec k=k\\hat u$.",
  "err": "Mettere $\\vec r$ nella definizione: $\\vec k$ non dipende dalla posizione, è lo stesso in tutto lo spazio; è il prodotto $\\vec k\\cdot\\vec r$ a cambiare da punto a punto.",
  "lab": "8",
  "rel": [
   "8.2",
   "8.3",
   "8.6"
  ],
  "pdf": "p. 34"
 },
 {
  "id": "8.8",
  "c": 8,
  "n": "Angolo solido",
  "q": "Angolo solido sotteso da una piccola superficie dS perpendicolare al raggio, a distanza r",
  "t": "d\\Omega = @@",
  "a": "\\frac{dS}{r^2}",
  "d": [
   "\\frac{dS}{r}",
   "dS\\,r^2",
   "\\frac{dS}{4\\pi r^2}"
  ],
  "h": "Sfera intera: 4π sr. La potenza in dΩ si conserva: I₁r₁² = I r².",
  "sym": [
   [
    "d\\Omega",
    "angolo solido (sr)"
   ],
   [
    "dS",
    "area perpendicolare alla direzione radiale ($\\mathrm{m^2}$)"
   ],
   [
    "r",
    "distanza dal vertice (m)"
   ]
  ],
  "val": "Superficie piccola e perpendicolare alla direzione radiale. Per una sorgente isotropa la potenza nel cono è $dP=\\frac{P}{4\\pi}\\,d\\Omega$.",
  "err": "Dividere per $4\\pi$: quella è la frazione di sfera, non l'angolo solido. L'angolo solido è adimensionale (steradianti), come il radiante $ds/r$ nel piano.",
  "lab": "8",
  "rel": [
   "8.4",
   "7.13"
  ],
  "pdf": "p. 35"
 },
 {
  "id": "8.9",
  "c": 8,
  "n": "Gradiente",
  "q": "Forza come gradiente dell'energia potenziale: da campo scalare a campo vettoriale",
  "t": "\\vec F = -\\vec\\nabla U = @@",
  "a": "-\\left(\\frac{\\partial U}{\\partial x}, \\frac{\\partial U}{\\partial y}, \\frac{\\partial U}{\\partial z}\\right)",
  "d": [
   "-\\left(\\frac{\\partial U}{\\partial x} + \\frac{\\partial U}{\\partial y} + \\frac{\\partial U}{\\partial z}\\right)",
   "\\left(\\frac{\\partial U}{\\partial x}, \\frac{\\partial U}{\\partial y}, \\frac{\\partial U}{\\partial z}\\right)",
   "-\\left(\\frac{\\partial^2 U}{\\partial x^2}, \\frac{\\partial^2 U}{\\partial y^2}, \\frac{\\partial^2 U}{\\partial z^2}\\right)"
  ],
  "h": "Il gradiente punta nella direzione di massima salita; la forza va in discesa.",
  "sym": [
   [
    "\\vec F",
    "forza (N)"
   ],
   [
    "U",
    "energia potenziale, campo scalare $U(x,y,z)$ (J)"
   ],
   [
    "\\vec\\nabla",
    "operatore $(\\partial_x,\\partial_y,\\partial_z)$"
   ]
  ],
  "val": "Campo scalare derivabile; forze conservative.",
  "err": "Scrivere la somma delle derivate: quella è uno scalare (assomiglia a una divergenza). Il gradiente produce tre numeri, cioè un vettore.",
  "lab": "8",
  "rel": [
   "8.10",
   "8.5"
  ],
  "pdf": "p. 36"
 },
 {
  "id": "8.10",
  "c": 8,
  "n": "Divergenza",
  "q": "Divergenza di un campo vettoriale v = (vₓ, v_y, v_z)",
  "t": "\\vec\\nabla\\cdot\\vec v = @@",
  "a": "\\frac{\\partial v_x}{\\partial x} + \\frac{\\partial v_y}{\\partial y} + \\frac{\\partial v_z}{\\partial z}",
  "d": [
   "\\left(\\frac{\\partial v_x}{\\partial x}, \\frac{\\partial v_y}{\\partial y}, \\frac{\\partial v_z}{\\partial z}\\right)",
   "\\frac{\\partial v_x}{\\partial y} + \\frac{\\partial v_y}{\\partial z} + \\frac{\\partial v_z}{\\partial x}",
   "\\frac{\\partial^2 v_x}{\\partial x^2} + \\frac{\\partial^2 v_y}{\\partial y^2} + \\frac{\\partial^2 v_z}{\\partial z^2}"
  ],
  "h": "Risultato scalare: misura quanto le linee di campo escono da un punto. Divergenza del gradiente = laplaciano.",
  "sym": [
   [
    "\\vec\\nabla\\cdot\\vec v",
    "divergenza (scalare)"
   ],
   [
    "v_x,\\ v_y,\\ v_z",
    "componenti del campo vettoriale"
   ]
  ],
  "val": "Campo vettoriale derivabile, coordinate cartesiane. Se $\\vec v=\\vec\\nabla\\psi$ si ottiene $\\nabla^2\\psi$.",
  "err": "Lasciare il risultato come vettore: la divergenza è uno scalare, come ogni prodotto scalare $\\vec\\nabla\\cdot\\vec v$.",
  "lab": "8",
  "rel": [
   "8.9",
   "8.5"
  ],
  "pdf": "p. 36–37"
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
  "h": "Segni in alto quando si avvicinano. Avvicinarsi alza sempre la frequenza.",
  "sym": [
   [
    "f'",
    "frequenza percepita dall'ascoltatore (Hz)"
   ],
   [
    "f",
    "frequenza emessa dalla sorgente (Hz)"
   ],
   [
    "c",
    "velocità del suono nell'aria (m/s)"
   ],
   [
    "v_A",
    "velocità dell'ascoltatore rispetto all'aria (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ]
  ],
  "val": "Moti lungo la congiungente, velocità misurate rispetto all'aria ferma, $v_S<c$. Segni in alto se ci si avvicina, in basso se ci si allontana. Se il moto non è lungo la congiungente si usa la componente lungo la linea visiva (scheda 9.9).",
  "err": "Usare solo la velocità relativa: il Doppler acustico non è invariante per Galileo. Conta chi si muove rispetto all'aria: sorgente che si avvicina a $v$ e ascoltatore che si avvicina a $v$ danno frequenze diverse.",
  "lab": "9",
  "rel": [
   "9.2",
   "9.3",
   "9.9",
   "9.10"
  ],
  "pdf": "p. 80, 82"
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
  "h": "+ se si avvicina. λ non cambia, cambia la velocità relativa c ± v_A.",
  "sym": [
   [
    "f'",
    "frequenza percepita dall'ascoltatore (Hz)"
   ],
   [
    "f",
    "frequenza emessa dalla sorgente (Hz)"
   ],
   [
    "c",
    "velocità del suono nell'aria (m/s)"
   ],
   [
    "v_A",
    "velocità dell'ascoltatore rispetto all'aria (m/s)"
   ]
  ],
  "val": "Sorgente ferma rispetto all'aria. $\\lambda$ non cambia; cambia la velocità con cui l'ascoltatore incontra i fronti, $c\\pm v_A$. Segno + se si avvicina.",
  "err": "Gli appunti (p. 82) scrivono $v'=c+v_S$ anche se a muoversi è l'ascoltatore: la velocità giusta è $c\\pm v_A$. Altro errore: aspettarsi $f'\\to\\infty$ per $v_A\\to c$; qui $f'$ cresce linearmente e per $v_A=c$ vale $2f$.",
  "lab": "9",
  "rel": [
   "9.8",
   "9.3",
   "9.4"
  ],
  "pdf": "p. 80, 82"
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
  "h": "− al denominatore se si avvicina: i fronti si schiacciano, λ′ = (c − v_S)T.",
  "sym": [
   [
    "f'",
    "frequenza percepita dall'ascoltatore (Hz)"
   ],
   [
    "f",
    "frequenza emessa dalla sorgente (Hz)"
   ],
   [
    "c",
    "velocità del suono nell'aria (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ]
  ],
  "val": "Ascoltatore fermo rispetto all'aria, $v_S<c$. La sorgente insegue i propri fronti: $\\lambda'=(c\\mp v_S)/f$, mentre la velocità dell'onda resta $c$.",
  "err": "Sbagliare il segno: avvicinarsi alza sempre la frequenza, quindi per la sorgente che si avvicina il denominatore deve diminuire, $c-v_S$. Oppure trattare la sorgente come l'ascoltatore e scrivere $f(c+v_S)/c$.",
  "lab": "9",
  "rel": [
   "9.7",
   "9.2",
   "9.10"
  ],
  "pdf": "p. 80, 82"
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
  "h": "La sorgente a velocità c schiaccia i fronti: λ′ → 0.",
  "sym": [
   [
    "v_A",
    "velocità dell'ascoltatore rispetto all'aria (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ],
   [
    "f'",
    "frequenza percepita dall'ascoltatore (Hz)"
   ],
   [
    "f",
    "frequenza emessa dalla sorgente (Hz)"
   ],
   [
    "c",
    "velocità del suono nell'aria (m/s)"
   ]
  ],
  "val": "Casi limite delle schede 9.2 e 9.3. Per $v_S\\ge c$ la formula della sorgente non vale più: i fronti si accumulano e si forma il cono di Mach.",
  "err": "Pensare che i due casi siano simmetrici. Ascoltatore a velocità $c$: $f'=2f$, finito. Sorgente a velocità $c$: $\\lambda'\\to0$ e $f'\\to\\infty$ (muro del suono).",
  "lab": "9",
  "rel": [
   "9.2",
   "9.3",
   "9.5"
  ],
  "pdf": "p. 80"
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
  "h": "Boom sonico. Stesso principio dell'effetto Cherenkov.",
  "sym": [
   [
    "\\theta",
    "semiapertura del cono di Mach: angolo tra la superficie del cono e la traiettoria"
   ],
   [
    "c",
    "velocità del suono (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente (m/s), con $v_S>c$"
   ]
  ],
  "val": "Sorgente supersonica, $v_S>c$ (altrimenti il seno supererebbe 1). In un tempo $t$ la sorgente percorre $v_St$ e il fronte emesso all'inizio ha raggio $ct$: il fronte d'urto è la tangente comune a tutti i fronti.",
  "err": "Invertire il rapporto: $\\sin\\theta=v_S/c$ sarebbe maggiore di 1. Più la sorgente è veloce, più il cono è stretto; il cono accompagna la sorgente finché resta supersonica, non nasce solo \"nel momento\" in cui supera $c$.",
  "lab": "9",
  "rel": [
   "9.6",
   "9.4"
  ],
  "pdf": "p. 81"
 },
 {
  "id": "9.6",
  "c": 9,
  "n": "Cono di Cherenkov",
  "q": "Semiapertura del cono di luce emesso da una particella carica più veloce della luce nel mezzo",
  "t": "\\sin\\alpha = @@\\qquad \\left(v > \\frac{c}{n}\\right)",
  "a": "\\frac{c}{n\\,v}",
  "d": [
   "\\frac{n\\,c}{v}",
   "\\frac{n\\,v}{c}",
   "\\frac{c}{v}"
  ],
  "h": "È il cono di Mach con la velocità della luce nel mezzo, c/n, al posto della velocità del suono.",
  "sym": [
   [
    "\\alpha",
    "semiapertura del cono: angolo tra il fronte luminoso e la traiettoria"
   ],
   [
    "c",
    "velocità della luce nel vuoto (qui NON quella del suono)"
   ],
   [
    "n",
    "indice di rifrazione del mezzo"
   ],
   [
    "v",
    "velocità della particella, sempre minore di $c$"
   ]
  ],
  "val": "Particella carica in un mezzo trasparente isolante, con $c/n<v<c$: supera la luce nel mezzo, non nel vuoto (nessun conflitto con la relatività). In acqua ($n=1{,}33$) serve $v>0{,}75\\,c$; per $v\\approx c$, $\\alpha\\approx49°$.",
  "err": "Usare $c$ invece di $c/n$: nel vuoto niente supera $c$ e non c'è cono. Attenzione all'angolo: spesso si scrive $\\cos\\vartheta=c/(nv)$, con $\\vartheta$ tra traiettoria e direzione della luce emessa (perpendicolare al fronte): $\\vartheta=90°-\\alpha$.",
  "lab": "9",
  "rel": [
   "9.5",
   "12.1"
  ],
  "pdf": "p. 81"
 },
 {
  "id": "9.7",
  "c": 9,
  "n": "Lunghezza d'onda con sorgente in moto",
  "q": "Lunghezza d'onda davanti e dietro una sorgente in moto (ascoltatore fermo)",
  "t": "\\lambda' = @@",
  "a": "\\frac{c \\mp v_S}{f}",
  "d": [
   "\\frac{c \\pm v_S}{f}",
   "\\frac{c}{f}",
   "(c \\mp v_S)\\,f"
  ],
  "h": "− davanti (fronti schiacciati), + dietro. Poi f′ = c/λ′.",
  "sym": [
   [
    "\\lambda'",
    "distanza tra due creste nell'aria (m)"
   ],
   [
    "c",
    "velocità del suono (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ],
   [
    "f",
    "frequenza emessa (Hz)"
   ]
  ],
  "val": "Sorgente in moto rispetto all'aria, $v_S<c$. In un periodo $T=1/f$ il fronte percorre $cT$ e la sorgente $v_ST$: davanti $\\lambda'=(c-v_S)T$, dietro $(c+v_S)T$. L'onda viaggia sempre a $c$.",
  "err": "Pensare che cambi $\\lambda$ anche quando si muove l'ascoltatore: se la sorgente è ferma, i fronti nell'aria restano equidistanti; cambia solo la velocità con cui l'ascoltatore li incontra.",
  "lab": "9",
  "rel": [
   "9.3",
   "9.8"
  ],
  "pdf": "p. 82"
 },
 {
  "id": "9.8",
  "c": 9,
  "n": "Velocità relativa dell'onda",
  "q": "Ascoltatore in moto, sorgente ferma: con che velocità l'ascoltatore incontra i fronti d'onda",
  "t": "f' = \\frac{v'}{\\lambda},\\qquad v' = @@",
  "a": "c \\pm v_A",
  "d": [
   "c \\pm v_S",
   "c",
   "\\frac{c}{1 \\pm v_A/c}"
  ],
  "h": "+ se l'ascoltatore si avvicina. λ = c/f non cambia, quindi f′ = f(c ± v_A)/c.",
  "sym": [
   [
    "f'",
    "frequenza percepita (Hz)"
   ],
   [
    "v'",
    "velocità dell'onda rispetto all'ascoltatore (m/s)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda nell'aria (m)"
   ],
   [
    "c",
    "velocità del suono (m/s)"
   ],
   [
    "v_A",
    "velocità dell'ascoltatore rispetto all'aria (m/s)"
   ]
  ],
  "val": "Sorgente ferma rispetto all'aria, ascoltatore in moto lungo la congiungente. Composizione galileiana delle velocità.",
  "err": "Gli appunti (p. 82) scrivono $v'=c+v_S$ nel caso dell'ascoltatore in moto: la velocità che conta è quella dell'ascoltatore, $v_A$ (che poi negli appunti è chiamata $v_0$).",
  "lab": "9",
  "rel": [
   "9.2",
   "9.7"
  ],
  "pdf": "p. 82"
 },
 {
  "id": "9.9",
  "c": 9,
  "n": "Doppler fuori asse",
  "q": "Sorgente che non si muove dritta verso l'ascoltatore (fermo): quale velocità usare",
  "t": "f' = f\\,\\frac{c}{c - @@}",
  "a": "v_S\\cos\\varphi",
  "d": [
   "v_S\\sin\\varphi",
   "v_S",
   "\\frac{v_S}{\\cos\\varphi}"
  ],
  "h": "φ = angolo tra la velocità della sorgente e la direzione sorgente → ascoltatore. A φ = 90° l'effetto si annulla.",
  "sym": [
   [
    "f'",
    "frequenza percepita (Hz)"
   ],
   [
    "f",
    "frequenza emessa (Hz)"
   ],
   [
    "c",
    "velocità del suono (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ],
   [
    "\\varphi",
    "angolo tra $\\vec v_S$ e la linea visiva sorgente → ascoltatore"
   ]
  ],
  "val": "Conta solo la componente di $\\vec v_S$ lungo la linea visiva, presa all'istante di emissione. Per $\\varphi=0$ si ritrova la sorgente che si avvicina (scheda 9.3), per $\\varphi=180°$ quella che si allontana.",
  "err": "Usare la velocità intera anche quando la sorgente passa di lato: un treno che ti passa accanto non dà un salto improvviso di frequenza, perché $v_S\\cos\\varphi$ passa con continuità da $+v_S$ a $-v_S$.",
  "lab": "9",
  "rel": [
   "9.3",
   "9.1"
  ],
  "pdf": "p. 81"
 },
 {
  "id": "9.10",
  "c": 9,
  "n": "Doppler a basse velocità",
  "q": "Sorgente lenta (v_S ≪ c) che si avvicina: forma approssimata del Doppler",
  "t": "v_S \\ll c:\\quad f' = f\\,\\frac{c}{c - v_S} \\simeq @@",
  "a": "f\\left(1 + \\frac{v_S}{c}\\right)",
  "d": [
   "f\\left(1 - \\frac{v_S}{c}\\right)",
   "f\\left(1 + \\frac{v_S^2}{c^2}\\right)",
   "f\\,\\frac{v_S}{c}"
  ],
  "h": "Al primo ordine sorgente e ascoltatore danno lo stesso effetto, f(1 + u/c).",
  "sym": [
   [
    "f'",
    "frequenza percepita (Hz)"
   ],
   [
    "f",
    "frequenza emessa (Hz)"
   ],
   [
    "c",
    "velocità del suono (m/s)"
   ],
   [
    "v_S",
    "velocità della sorgente rispetto all'aria (m/s)"
   ]
  ],
  "val": "Sviluppo al primo ordine in $v_S/c$, con $\\frac{1}{1-x}\\simeq1+x$. L'errore è dell'ordine di $(v_S/c)^2$: con $v_S=34$ m/s e $c=340$ m/s, da 440 Hz la formula esatta dà 488,9 Hz, quella approssimata 484 Hz.",
  "err": "Concludere che sorgente e ascoltatore sono sempre equivalenti: lo sono solo al primo ordine. A $v=0{,}1\\,c$: ascoltatore 484 Hz, sorgente 488,9 Hz; a $v=c$: $2f$ contro $\\infty$.",
  "lab": "9",
  "rel": [
   "9.3",
   "9.2",
   "9.4"
  ],
  "pdf": "p. 80"
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
  "h": "L'ampiezza risultante è 2A₀cos(φ/2).",
  "sym": [
   [
    "A_0",
    "ampiezza di ciascuna onda"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "x",
    "posizione (m)"
   ],
   [
    "\\omega",
    "pulsazione (rad/s)"
   ],
   [
    "t",
    "tempo (s)"
   ],
   [
    "\\varphi",
    "sfasamento tra le due onde (rad)"
   ]
  ],
  "val": "Due onde con stessa ampiezza, stessa $k$ e stessa $\\omega$ (coerenti), che si sovrappongono (equazione lineare). Si usa la prostaferesi $\\cos\\alpha+\\cos\\beta=2\\cos\\frac{\\alpha+\\beta}2\\cos\\frac{\\alpha-\\beta}2$.",
  "err": "Scrivere l'ampiezza come $2A_0\\cos\\varphi$: l'argomento è $\\varphi/2$. Con $\\varphi=\\pi/2$ l'ampiezza è $\\sqrt2A_0$, non zero; lo zero si ha per $\\varphi=\\pi$.",
  "lab": "10",
  "rel": [
   "10.3",
   "10.2",
   "11.17"
  ],
  "pdf": "p. 70"
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
  "h": "Δℓ = nλ costruttiva, Δℓ = (2n + 1)λ/2 distruttiva.",
  "sym": [
   [
    "\\varphi",
    "sfasamento (rad)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "\\Delta\\ell",
    "differenza di cammino (m)"
   ],
   [
    "k",
    "numero d'onda $2\\pi/\\lambda$ (rad/m)"
   ]
  ],
  "val": "Onde con la stessa lunghezza d'onda nello stesso mezzo, partite in fase.",
  "err": "Confondere $\\Delta\\ell/\\lambda$ (numero di lunghezze d'onda) con la fase: va moltiplicato per $2\\pi$. Mezza lunghezza d'onda di differenza vale $\\pi$, non 1/2.",
  "lab": "10",
  "rel": [
   "10.4",
   "10.5"
  ],
  "pdf": "p. 70"
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
  "h": "Massimo 4I₀, non 2I₀: l'intensità va col quadrato dell'ampiezza.",
  "sym": [
   [
    "I",
    "intensità media dell'onda risultante ($\\mathrm{W/m^2}$)"
   ],
   [
    "I_0",
    "intensità di una sola onda"
   ],
   [
    "\\varphi",
    "sfasamento (rad)"
   ]
  ],
  "val": "Due onde coerenti di uguale ampiezza. In media su $\\varphi$, $\\langle4I_0\\cos^2(\\varphi/2)\\rangle=2I_0$: l'energia totale si conserva, viene solo ridistribuita tra zone chiare e scure.",
  "err": "Sommare le intensità ($2I_0$) invece delle ampiezze. Per onde coerenti si sommano le ampiezze e poi si eleva al quadrato: il massimo è $4I_0$, il minimo 0.",
  "lab": "10",
  "rel": [
   "10.1",
   "10.6"
  ],
  "pdf": "p. 70"
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
  "h": "n = 0, 1, 2, … In fase φ = 2nπ, in controfase φ = (2n + 1)π.",
  "sym": [
   [
    "\\Delta\\ell",
    "differenza di cammino (m)"
   ],
   [
    "n",
    "intero: 0, 1, 2, …"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Due onde coerenti partite in fase. Se le sorgenti sono già sfasate, va aggiunto lo sfasamento iniziale.",
  "err": "Scrivere i minimi come $\\frac n2\\lambda$ (errore anche negli appunti a p. 40): con $n$ pari si ottengono i massimi. Servono i multipli dispari di $\\lambda/2$.",
  "lab": "10",
  "rel": [
   "10.2",
   "10.7",
   "10.8"
  ],
  "pdf": "p. 70"
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
  "h": "Schermo lontano: r ≫ d, raggi quasi paralleli, θ ≈ x/r.",
  "sym": [
   [
    "\\Delta r",
    "differenza di cammino $r_2-r_1$ (m)"
   ],
   [
    "d",
    "distanza tra le fenditure (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale al piano delle fenditure"
   ],
   [
    "\\varphi",
    "sfasamento (rad)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ]
  ],
  "val": "Schermo lontano: $r\\gg d$, i due raggi sono quasi paralleli. Sorgenti puntiformi, coerenti, monocromatiche.",
  "err": "Usare $\\cos\\theta$: $\\theta$ è misurato dalla normale, quindi il cateto opposto è $d\\sin\\theta$. Altro errore: porre $r_1=r_2$ anche nelle fasi; si può fare solo nelle ampiezze ($1/r$), perché nella fase conta $k\\Delta r$, che non è piccolo.",
  "lab": "10",
  "rel": [
   "10.6",
   "10.9",
   "10.2"
  ],
  "pdf": "p. 38–39"
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
  "h": "Qui I₀ = I(0) è già il massimo centrale. L'argomento è kd sin θ/2.",
  "sym": [
   [
    "I(\\theta)",
    "intensità sullo schermo nella direzione $\\theta$"
   ],
   [
    "I_0",
    "intensità al centro, $\\theta=0$ (già il massimo: 4 volte quella di una fenditura)"
   ],
   [
    "d",
    "distanza tra le fenditure (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Young ideale: due sorgenti puntiformi coerenti, $r\\gg d$, si trascura la diffrazione delle singole fenditure (frange tutte alte uguali). Con fenditure di larghezza $a$ si moltiplica per $\\mathrm{sinc}^2$ (scheda 11.7).",
  "err": "Mettere $2\\pi d\\sin\\theta/\\lambda$ nel $\\cos^2$: quella è la fase $\\varphi$, ma nel coseno va $\\varphi/2$.",
  "lab": "10",
  "rel": [
   "10.5",
   "10.7",
   "11.7"
  ],
  "pdf": "p. 39–40"
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
  "h": "Spaziatura Δx = rλ/d, da cui si misura λ = Δx·d/r.",
  "sym": [
   [
    "d",
    "distanza tra le fenditure (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "n",
    "ordine del massimo: 0, 1, 2, …"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "x_{max}",
    "posizione del massimo sullo schermo (m)"
   ],
   [
    "r",
    "distanza fenditure–schermo (m)"
   ]
  ],
  "val": "Piccoli angoli: $\\sin\\theta\\approx\\tan\\theta\\approx x/r$. Luce monocromatica.",
  "err": "Pensare che avvicinando le fenditure le frange si stringano: è il contrario, $\\Delta x=r\\lambda/d$ cresce se $d$ diminuisce.",
  "lab": "10",
  "rel": [
   "10.10",
   "10.8",
   "10.6"
  ],
  "pdf": "p. 40"
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
  "h": "Primo minimo sin θ = λ/(2d): esiste solo se d ≥ λ/2.",
  "sym": [
   [
    "d",
    "distanza tra le fenditure (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "n",
    "intero: 0, 1, 2, …"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Due sorgenti coerenti. Serve $|\\sin\\theta|\\le1$: il primo minimo ($n=0$) esiste solo se $d\\ge\\lambda/2$.",
  "err": "Copiare dagli appunti (p. 40) $\\sin\\theta=\\frac n2\\frac\\lambda d$ per ogni $n$: vale solo per $n$ dispari. Non confondere con i minimi di diffrazione, $a\\sin\\theta=n\\lambda$, che sono a multipli interi.",
  "lab": "10",
  "rel": [
   "10.7",
   "10.11",
   "11.2"
  ],
  "pdf": "p. 40"
 },
 {
  "id": "10.9",
  "c": 10,
  "n": "Young: campo sullo schermo",
  "q": "Somma delle due onde sferiche uscite dalle fenditure, in un punto lontano dello schermo",
  "t": "\\xi(r,t) = @@\\,\\cos(kr - \\omega t)",
  "a": "\\frac{2A_0}{r}\\cos\\frac{k\\Delta r}{2}",
  "d": [
   "\\frac{2A_0}{r}\\cos(k\\Delta r)",
   "\\frac{A_0}{r}\\cos\\frac{k\\Delta r}{2}",
   "\\frac{2A_0}{r^2}\\cos\\frac{k\\Delta r}{2}"
  ],
  "h": "Somma di (A₀/r₁)cos(kr₁ − ωt) e (A₀/r₂)cos(kr₂ − ωt) con la prostaferesi.",
  "sym": [
   [
    "\\xi",
    "campo totale nel punto dello schermo"
   ],
   [
    "A_0",
    "ampiezza di ciascuna onda (a distanza unitaria)"
   ],
   [
    "r",
    "distanza media dalle fenditure, $(r_1+r_2)/2$ (m)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "\\Delta r",
    "differenza di cammino $r_2-r_1$ (m)"
   ],
   [
    "\\omega,\\ t",
    "pulsazione (rad/s) e tempo (s)"
   ]
  ],
  "val": "$r\\gg d$: si pone $r_1\\approx r_2\\approx r$ solo nelle ampiezze $1/r$, non nelle fasi. A $r$ fissato $\\frac{2A_0}{r}$ e $\\cos(kr-\\omega t)$ sono costanti e la figura dipende solo da $\\cos(k\\Delta r/2)$.",
  "err": "Approssimare $r_1=r_2$ anche nel coseno: si perderebbe proprio $\\Delta r$, cioè le frange. Negli appunti (p. 39) c'è scritto \"$r\\ll d$\": è $r\\gg d$.",
  "lab": "10",
  "rel": [
   "10.5",
   "10.6",
   "10.1"
  ],
  "pdf": "p. 39"
 },
 {
  "id": "10.10",
  "c": 10,
  "n": "Misura di λ con Young",
  "q": "Lunghezza d'onda dalla distanza tra due frange chiare consecutive",
  "t": "\\Delta x = \\frac{r\\lambda}{d}\\;\\Rightarrow\\; \\lambda = @@",
  "a": "\\frac{\\Delta x\\,d}{r}",
  "d": [
   "\\frac{\\Delta x\\,r}{d}",
   "\\frac{d\\,r}{\\Delta x}",
   "\\frac{2\\,\\Delta x\\,d}{r}"
  ],
  "h": "Esempio: d = 0,5 mm, r = 1 m, Δx = 1,2 mm → λ = 600 nm.",
  "sym": [
   [
    "\\Delta x",
    "interfrangia: distanza tra due massimi consecutivi (m)"
   ],
   [
    "r",
    "distanza fenditure–schermo (m)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "d",
    "distanza tra le fenditure (m)"
   ]
  ],
  "val": "Luce monocromatica, piccoli angoli ($\\sin\\theta\\approx x/r$), $d$ e $r$ noti.",
  "err": "Usare la distanza tra una frangia chiara e la scura vicina: è $\\Delta x/2$, e si otterrebbe metà della lunghezza d'onda.",
  "lab": "10",
  "rel": [
   "10.7",
   "10.6"
  ],
  "pdf": "p. 40"
 },
 {
  "id": "10.11",
  "c": 10,
  "n": "Esistenza dei minimi di Young",
  "q": "Condizione sulla distanza d tra le sorgenti per vedere almeno un minimo di interferenza",
  "t": "\\sin\\theta_{min} = \\frac{\\lambda}{2d} \\le 1 \\;\\Rightarrow\\; @@",
  "a": "d \\ge \\frac{\\lambda}{2}",
  "d": [
   "d \\ge \\lambda",
   "d \\le \\frac{\\lambda}{2}",
   "d \\ge 2\\lambda"
  ],
  "h": "Se d < λ/2 le due onde arrivano quasi in fase ovunque: niente frange. Per la fenditura singola serve invece a ≥ λ.",
  "sym": [
   [
    "\\theta_{min}",
    "direzione del primo minimo"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "d",
    "distanza tra le sorgenti (m)"
   ]
  ],
  "val": "Due sorgenti coerenti in fase. Ogni direzione reale ha $|\\sin\\theta|\\le1$.",
  "err": "Confondere con la diffrazione: il primo zero della fenditura singola richiede $a\\ge\\lambda$, quello di Young $d\\ge\\lambda/2$, perché il minimo di Young è a mezza lunghezza d'onda di differenza.",
  "lab": "10",
  "rel": [
   "10.8",
   "11.2"
  ],
  "pdf": "p. 40"
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
  "h": "L'argomento è ka sin θ/2. In ampiezza: E₀ sinc(…).",
  "sym": [
   [
    "I(\\theta)",
    "intensità nella direzione $\\theta$"
   ],
   [
    "I_0",
    "intensità al centro"
   ],
   [
    "\\mathrm{sinc}\\,x",
    "$\\sin x/x$, che vale 1 in $x=0$"
   ],
   [
    "a",
    "larghezza della fenditura (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale alla fenditura"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Diffrazione di Fraunhofer (campo lontano, $r\\gg a$), onda piana incidente. Ogni punto della fenditura è una sorgente secondaria (Huygens–Fresnel): si sommano infinite ondine con un integrale.",
  "err": "Mettere $2\\pi$ nell'argomento: è $\\frac{ka}2\\sin\\theta=\\frac{\\pi a\\sin\\theta}{\\lambda}$. Con $2\\pi$ i minimi cadrebbero a $a\\sin\\theta=\\lambda/2$.",
  "lab": "11",
  "rel": [
   "11.2",
   "11.3",
   "11.7"
  ],
  "pdf": "p. 41–42"
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
  "h": "n ≠ 0: θ = 0 è il massimo centrale. Il primo minimo esiste solo se a ≥ λ.",
  "sym": [
   [
    "a",
    "larghezza della fenditura (m)"
   ],
   [
    "\\theta",
    "angolo del minimo"
   ],
   [
    "n",
    "intero non nullo"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Fraunhofer. Piccoli angoli: $\\theta_1\\simeq\\lambda/a$, più stretta è la fenditura più largo è il picco. Se $a<\\lambda$ non c'è nessun minimo: diffusione quasi isotropa (massima diffrazione).",
  "err": "Includere $n=0$: in $\\theta=0$ c'è il massimo centrale ($\\mathrm{sinc}\\,0=1$). Il massimo centrale è largo il doppio dei lobi laterali.",
  "lab": "11",
  "rel": [
   "11.1",
   "11.21",
   "10.8"
  ],
  "pdf": "p. 42–43"
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
  "h": "Prodotto delle figure delle due fenditure.",
  "sym": [
   [
    "I",
    "intensità"
   ],
   [
    "I_0",
    "intensità al centro"
   ],
   [
    "a,\\ b",
    "lati dell'apertura (m)"
   ],
   [
    "k",
    "numero d'onda $2\\pi/\\lambda$"
   ],
   [
    "\\theta_a,\\ \\theta_b",
    "angoli misurati nelle direzioni parallele ai lati $a$ e $b$"
   ]
  ],
  "val": "Fraunhofer (campo lontano), apertura rettangolare con lati confrontabili. In campo vicino (Fresnel) le onde sono ancora sferiche e la formula non vale.",
  "err": "Aspettarsi una figura allungata come l'apertura: è il contrario. Il lato più corto dà la figura più larga ($\\sim\\lambda/a$).",
  "lab": "11",
  "rel": [
   "11.1",
   "11.4"
  ],
  "pdf": "p. 43"
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
  "h": "J₁ è la Bessel di ordine 1. Zeri a (kD/2) sin θ = 3,832; 7,016; 10,173.",
  "sym": [
   [
    "I(\\theta)",
    "intensità"
   ],
   [
    "I_0",
    "intensità al centro"
   ],
   [
    "J_1",
    "funzione di Bessel di ordine 1"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "D",
    "diametro dell'apertura (m)"
   ],
   [
    "\\theta",
    "angolo dall'asse"
   ]
  ],
  "val": "Fraunhofer, apertura circolare. Figura: un disco luminoso (disco di Airy) circondato da anelli. Il primo zero, $\\frac{kD}2\\sin\\theta=3{,}832$, dà il raggio del disco.",
  "err": "Usare $J_0$ o dimenticare il 2: $2J_1(x)/x\\to1$ per $x\\to0$, così $I(0)=I_0$. È la \"sinc\" delle aperture circolari.",
  "lab": "11",
  "rel": [
   "11.5",
   "11.3"
  ],
  "pdf": "p. 44"
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
  "h": "Da (kD/2) sin θ = 3,832. D più grande, risoluzione migliore.",
  "sym": [
   [
    "\\theta_R",
    "minimo angolo risolvibile, raggio angolare del disco di Airy (rad)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "D",
    "diametro dell'apertura (m)"
   ]
  ],
  "val": "Apertura circolare, piccoli angoli. Due sorgenti sono appena risolte quando il massimo dell'una cade sul primo minimo dell'altra. $1{,}22=3{,}832/\\pi$.",
  "err": "Scambiare $\\lambda$ e $D$ o dimenticare che l'angolo è in radianti (1 rad = 206 265 arcsec). Hubble ($D=2{,}4$ m, $\\lambda=500$ nm): $\\theta_R\\simeq2{,}5\\cdot10^{-7}$ rad $\\simeq0{,}05$ arcsec.",
  "lab": "11",
  "rel": [
   "11.4",
   "11.6",
   "11.20"
  ],
  "pdf": "p. 44"
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
  "h": "f/D è il rapporto focale (f-number). Reflex f/1,8 a 500 nm: circa 1 μm.",
  "sym": [
   [
    "x",
    "raggio del disco di Airy sul rivelatore (m)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "f",
    "lunghezza focale (m)"
   ],
   [
    "D",
    "diametro dell'obiettivo (m)"
   ],
   [
    "f/D",
    "rapporto focale (f-numero)"
   ]
  ],
  "val": "Rivelatore nel piano focale, piccoli angoli ($\\theta\\simeq x/f$). Dipende solo dal rapporto focale $f/D$ e da $\\lambda$.",
  "err": "Gli appunti (p. 45) scrivono \"500 mm\" invece di 500 nm nell'esempio della reflex. Con $f/D=1{,}8$ e $\\lambda=500$ nm si ha $x\\simeq1{,}1\\ \\mu$m; con 500 mm verrebbe 1,1 m, assurdo.",
  "lab": "11",
  "rel": [
   "11.5",
   "11.20"
  ],
  "pdf": "p. 45"
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
  "h": "Diffrazione (a) per interferenza (d). Massimi d sin θ = nλ, minimi di diffrazione a sin θ = mλ.",
  "sym": [
   [
    "I(\\theta)",
    "intensità"
   ],
   [
    "I_0'",
    "intensità al centro di una sola fenditura, quindi $I(0)=4I_0'$"
   ],
   [
    "a",
    "larghezza di ciascuna fenditura (m)"
   ],
   [
    "d",
    "distanza tra i centri delle fenditure (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Fraunhofer, due fenditure uguali con $a<d$. Il $\\cos^2$ (interferenza, come Young) è modulato dall'inviluppo $\\mathrm{sinc}^2$ (diffrazione di una fenditura).",
  "err": "Scambiare $a$ e $d$: le frange fitte vengono dalla distanza $d$ (più grande), l'inviluppo largo dalla larghezza $a$ (più piccola). E le frange non sono più tutte alte uguali come in Young ideale.",
  "lab": "11",
  "rel": [
   "11.16",
   "10.6",
   "11.1",
   "11.10"
  ],
  "pdf": "p. 46–47, 50"
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
  "h": "Massimi principali I = N²I₀. Con N = 2 si ritrova Young.",
  "sym": [
   [
    "I(\\theta)",
    "intensità"
   ],
   [
    "I_0",
    "intensità di una sola sorgente"
   ],
   [
    "N",
    "numero di sorgenti"
   ],
   [
    "d",
    "distanza tra sorgenti vicine (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale alla schiera"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "N sorgenti puntiformi coerenti, uguali, equispaziate, in campo lontano. Si ricava con i fasori: $N$ vettori uguali, ognuno ruotato di $\\varphi=kd\\sin\\theta$ (scheda 11.17).",
  "err": "Mettere al denominatore l'argomento invece del suo seno (come in una sinc): il denominatore $\\sin(\\pi d\\sin\\theta/\\lambda)$ si annulla di nuovo a ogni $d\\sin\\theta=n\\lambda$, ed è questo che ripete i massimi principali.",
  "lab": "11b",
  "rel": [
   "11.9",
   "11.17",
   "11.15",
   "11.10"
  ],
  "pdf": "p. 47–49"
 },
 {
  "id": "11.9",
  "c": 11,
  "n": "N sorgenti: minimi",
  "q": "N sorgenti: massimi principali, loro intensità e minimi",
  "t": "\\text{max: } d\\sin\\theta = n\\lambda;\\qquad \\text{min: } d\\sin\\theta = @@",
  "a": "\\frac{n'\\lambda}{N},\\ \\ n' \\neq 0, N, 2N, \\dots",
  "d": [
   "\\frac{n'\\lambda}{N},\\ \\ n' = 0, 1, 2, \\dots",
   "\\frac{n'\\lambda}{2N}",
   "n'\\,N\\lambda"
  ],
  "h": "Nei massimi principali I = N²I₀. Tra due massimi principali: N − 1 minimi e N − 2 massimi secondari.",
  "sym": [
   [
    "d",
    "passo (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "n",
    "ordine del massimo principale"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "I",
    "intensità del massimo"
   ],
   [
    "N",
    "numero di sorgenti"
   ],
   [
    "I_0",
    "intensità di una sorgente"
   ],
   [
    "n'",
    "intero che numera i minimi"
   ]
  ],
  "val": "N sorgenti coerenti equispaziate. Si tengono solo le soluzioni con $|\\sin\\theta|\\le1$.",
  "err": "Includere $n'=0, N, 2N,\\dots$: lì numeratore e denominatore si annullano insieme e c'è un massimo principale. Errore opposto: credere che tra due massimi principali ci sia un solo minimo come in Young (vale solo per $N=2$).",
  "lab": "11b",
  "rel": [
   "11.8",
   "11.18",
   "11.15"
  ],
  "pdf": "p. 49–50"
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
  "h": "Inviluppo di diffrazione per interferenza di N sorgenti. Picco centrale N²I₀₁.",
  "sym": [
   [
    "I(\\theta)",
    "intensità"
   ],
   [
    "I_{01}",
    "intensità di una sola fenditura al centro"
   ],
   [
    "a",
    "larghezza di una fenditura (m)"
   ],
   [
    "d",
    "passo del reticolo (m)"
   ],
   [
    "N",
    "numero di fenditure"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Reticolo di $N$ fenditure uguali, Fraunhofer, per trasmissione o per riflessione. Picco centrale $N^2I_{01}$.",
  "err": "Gli appunti (p. 51) mettono $N^2$ davanti e $a$ al denominatore della parentesi: così a $\\theta=0$ verrebbe $N^4I_{01}$. Nella parentesi va $d$, e il fattore $N^2$ c'è già (limite della parentesi per $\\theta\\to0$).",
  "lab": "11",
  "rel": [
   "11.8",
   "11.7",
   "11.11",
   "11.16"
  ],
  "pdf": "p. 50–51"
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
  "h": "sin θ ∝ λ: il rosso è deviato più del blu, al contrario del prisma.",
  "sym": [
   [
    "\\theta_n",
    "direzione del massimo di ordine $n$"
   ],
   [
    "n",
    "ordine di diffrazione"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "d",
    "passo del reticolo (m)"
   ]
  ],
  "val": "Massimi principali di un reticolo (o di N sorgenti), incidenza normale. Esistono solo gli ordini con $|n|\\le d/\\lambda$ (scheda 11.19). L'ordine 0 è uguale per tutte le $\\lambda$: in luce bianca è bianco.",
  "err": "Pensare che il reticolo devii il blu più del rosso, come il prisma: qui $\\sin\\theta\\propto\\lambda$, quindi il rosso è deviato di più. Nel prisma decide l'indice di rifrazione, più grande per il blu.",
  "lab": "11",
  "rel": [
   "11.12",
   "11.19",
   "11.14"
  ],
  "pdf": "p. 51"
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
  "h": "Aumenta con l'ordine n.",
  "sym": [
   [
    "D",
    "dispersione angolare (rad/m); non è il diametro della scheda 11.5"
   ],
   [
    "\\theta",
    "angolo del massimo"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "n",
    "ordine"
   ],
   [
    "d",
    "passo (m)"
   ]
  ],
  "val": "Si ottiene derivando $\\sin\\theta=n\\lambda/d$ rispetto a $\\lambda$. Cresce con l'ordine: ordini alti separano di più i colori, ma con meno luce.",
  "err": "Dimenticare il $\\cos\\theta$ usando $\\sin\\theta\\approx\\theta$, cioè $D=n/d$: agli ordini alti gli angoli non sono piccoli.",
  "lab": "11",
  "rel": [
   "11.11",
   "11.13",
   "11.14"
  ],
  "pdf": "p. 52, 54"
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
  "h": "= λD/(nN). Al centro vale λ/(Nd). Per ordini alti non si può usare sin θ ≈ θ.",
  "sym": [
   [
    "\\Delta\\theta_{HW}",
    "semilarghezza del massimo: dal centro al primo minimo (rad)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "N",
    "numero di fenditure"
   ],
   [
    "d",
    "passo (m)"
   ],
   [
    "\\theta",
    "angolo del massimo"
   ]
  ],
  "val": "Massimo principale di ordine $n$ all'angolo $\\theta$. Vale a qualunque angolo; al centro ($\\theta=0$) si riduce a $\\lambda/(Nd)$.",
  "err": "Usare $\\Delta(\\sin\\theta)\\approx\\Delta\\theta$ anche agli ordini alti: è l'errore segnalato negli appunti (p. 53). Si deve scrivere $\\Delta(\\sin\\theta)=\\cos\\theta\\,\\Delta\\theta$, quindi i massimi si allargano con l'ordine.",
  "lab": "11",
  "rel": [
   "11.12",
   "11.14",
   "11.9"
  ],
  "pdf": "p. 53–54"
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
  "h": "Più fenditure e ordini più alti danno risoluzione migliore.",
  "sym": [
   [
    "R",
    "potere risolutivo (adimensionale)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda media $(\\lambda_1+\\lambda_2)/2$"
   ],
   [
    "\\Delta\\lambda",
    "minima differenza di lunghezza d'onda separabile"
   ],
   [
    "n",
    "ordine"
   ],
   [
    "N",
    "numero di fenditure illuminate"
   ]
  ],
  "val": "Due righe sono separate quando il massimo dell'una cade sul primo minimo dell'altra ($\\Delta\\theta=\\Delta\\theta_{HW}$). Non dipende dal passo $d$.",
  "err": "Pensare che conti solo la densità di righe: a parità di ordine conta quante fenditure sono illuminate. Doppietto del sodio (589,0 e 589,6 nm): $R\\approx982$, servono almeno 982 fenditure al 1° ordine, 491 al 2°.",
  "lab": "11",
  "rel": [
   "11.13",
   "11.12"
  ],
  "pdf": "p. 52, 54"
 },
 {
  "id": "11.15",
  "c": 11,
  "n": "Schiera di 4 antenne",
  "q": "4 antenne coerenti a distanza d = λ/2: direzioni dei minimi, con θ misurato dalla normale alla schiera",
  "t": "N = 4,\\ d = \\frac{\\lambda}{2}:\\quad \\sin\\theta_- = \\frac{n'}{2}\\;\\Rightarrow\\; \\theta_- = @@",
  "a": "\\pm\\frac{\\pi}{6},\\ \\pm\\frac{\\pi}{2}",
  "d": [
   "\\pm\\frac{\\pi}{3},\\ \\pm\\frac{\\pi}{2}",
   "\\pm\\frac{\\pi}{4},\\ \\pm\\frac{\\pi}{2}",
   "\\pm\\frac{\\pi}{6},\\ \\pm\\frac{\\pi}{3}"
  ],
  "h": "Massimi principali solo a θ = 0 e θ = π (sin θ = 2n). Minimi a ±30° e ±90°.",
  "sym": [
   [
    "N",
    "numero di antenne"
   ],
   [
    "d",
    "distanza tra antenne vicine (m)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "\\theta_-",
    "direzione di un minimo, misurata dalla normale alla schiera (direzione del lobo principale)"
   ],
   [
    "n'",
    "intero che numera i minimi: qui $\\pm1,\\pm2$"
   ]
  ],
  "val": "Antenne puntiformi, uguali, in fase, campo lontano. Dai minimi $d\\sin\\theta=n'\\lambda/N$ con $|\\sin\\theta|\\le1$ restano $n'=\\pm1,\\pm2$. Lobo principale con picco $16I_0$ tra $-30°$ e $30°$; tra $30°$ e $90°$ un lobo secondario per lato (picco a circa $47°$, circa il 7% del principale).",
  "err": "Gli appunti (p. 50) scrivono $\\arcsin(1/2)=\\pi/3$: è sbagliato, $\\arcsin(1/2)=\\pi/6$. Il valore $\\pi/3=60°$ è lo stesso minimo, ma misurato dall'asse della schiera (la retta delle antenne) invece che dalla normale.",
  "lab": "11b",
  "rel": [
   "11.9",
   "11.8",
   "11.18"
  ],
  "pdf": "p. 50"
 },
 {
  "id": "11.16",
  "c": 11,
  "n": "Ordini mancanti",
  "q": "Doppia fenditura o reticolo: quale ordine di interferenza cade su uno zero di diffrazione",
  "t": "d\\sin\\theta = n\\lambda\\ \\ \\text{e}\\ \\ a\\sin\\theta = m\\lambda \\;\\Rightarrow\\; n = @@",
  "a": "m\\,\\frac{d}{a}",
  "d": [
   "m\\,\\frac{a}{d}",
   "\\frac{m}{2}\\,\\frac{d}{a}",
   "m\\,\\frac{d}{\\lambda}"
  ],
  "h": "d = 3,5a: n = 3,5m è intero solo per m pari, quindi mancano gli ordini ±7, ±14, … Nel lobo centrale ci sono 7 frange (n = 0, ±1, ±2, ±3).",
  "sym": [
   [
    "d",
    "passo: distanza tra i centri delle fenditure (m)"
   ],
   [
    "a",
    "larghezza di una fenditura (m)"
   ],
   [
    "n",
    "ordine di interferenza (intero)"
   ],
   [
    "m",
    "ordine dello zero di diffrazione, $m\\ne0$"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ]
  ],
  "val": "Fraunhofer, fenditure uguali, $a<d$. Un ordine manca solo se $m\\,d/a$ è intero. Nel lobo centrale stanno gli ordini con $|n|<d/a$: se $d/a$ non è intero sono $2\\lfloor d/a\\rfloor+1$.",
  "err": "Pensare che con $d=3{,}5a$ manchi l'ordine \"3,5\" o il 4: gli ordini sono interi. Il primo zero ($m=1$) cade tra gli ordini 3 e 4 e li indebolisce, ma il primo ordine davvero mancante è il 7 ($m=2$).",
  "lab": "11",
  "rel": [
   "11.7",
   "11.10",
   "11.2"
  ],
  "pdf": "p. 47"
 },
 {
  "id": "11.17",
  "c": 11,
  "n": "Fasori di N sorgenti",
  "q": "Ampiezza della somma di N fasori uguali, ciascuno ruotato di φ rispetto al precedente",
  "t": "E_{0T} = E_{01}\\,@@,\\qquad \\varphi = kd\\sin\\theta",
  "a": "\\frac{\\sin(N\\varphi/2)}{\\sin(\\varphi/2)}",
  "d": [
   "\\frac{\\sin(N\\varphi)}{\\sin\\varphi}",
   "\\frac{\\sin(\\varphi/2)}{\\sin(N\\varphi/2)}",
   "N\\cos\\frac{\\varphi}{2}"
  ],
  "h": "I vertici dei fasori stanno su una circonferenza di raggio R: corda totale 2R sin(Nφ/2), un fasore 2R sin(φ/2). Per N = 2: 2E₀₁cos(φ/2).",
  "sym": [
   [
    "E_{0T}",
    "ampiezza del campo totale"
   ],
   [
    "E_{01}",
    "ampiezza del campo di una sorgente"
   ],
   [
    "N",
    "numero di sorgenti"
   ],
   [
    "\\varphi",
    "sfasamento tra sorgenti vicine (rad)"
   ],
   [
    "k",
    "numero d'onda (rad/m)"
   ],
   [
    "d",
    "passo (m)"
   ],
   [
    "\\theta",
    "angolo dalla normale"
   ]
  ],
  "val": "N oscillazioni con stessa ampiezza e frequenza e sfasamenti $0,\\varphi,2\\varphi,\\dots$ (sorgenti equispaziate in campo lontano). Il campo fisico è la proiezione del fasore, cioè il coseno.",
  "err": "Usare $\\sin(N\\varphi)/\\sin\\varphi$: un fasore sottende al centro l'angolo $\\varphi$, ma la sua lunghezza (corda) è $2R\\sin(\\varphi/2)$, con metà angolo. Per $N=2$ quella forma darebbe $2\\cos\\varphi$ invece di $2\\cos(\\varphi/2)$.",
  "lab": "11b",
  "rel": [
   "11.8",
   "10.1",
   "11.18"
  ],
  "pdf": "p. 48–49"
 },
 {
  "id": "11.18",
  "c": 11,
  "n": "Massimi secondari",
  "q": "N sorgenti: quanti minimi e quanti massimi secondari ci sono tra due massimi principali consecutivi",
  "t": "n_{min} = N-1,\\qquad n_{sec} = @@",
  "a": "N-2",
  "d": [
   "N-1",
   "N",
   "2N-1"
  ],
  "h": "N = 2 (Young): un minimo, nessun secondario. Più N cresce, più i secondari sono deboli e i principali stretti.",
  "sym": [
   [
    "n_{min}",
    "numero di minimi tra due massimi principali consecutivi"
   ],
   [
    "n_{sec}",
    "numero di massimi secondari tra due massimi principali consecutivi"
   ],
   [
    "N",
    "numero di sorgenti (o di fenditure)"
   ]
  ],
  "val": "N sorgenti coerenti equispaziate. Tra l'ordine 0 e l'ordine 1 i minimi sono a $d\\sin\\theta=n'\\lambda/N$ con $n'=1,\\dots,N-1$; tra due minimi consecutivi c'è sempre un massimo, quindi $N-2$ secondari.",
  "err": "Credere che tra due massimi principali ci sia un solo minimo, come in Young: vale solo per $N=2$. Con $N=4$ ci sono 3 minimi e 2 massimi secondari, ciascuno circa il 7% del principale.",
  "lab": "11b",
  "rel": [
   "11.9",
   "11.8",
   "11.15"
  ],
  "pdf": "p. 49"
 },
 {
  "id": "11.19",
  "c": 11,
  "n": "Ordine massimo del reticolo",
  "q": "Ordine di diffrazione più alto che un reticolo di passo d può mostrare",
  "t": "|\\sin\\theta_n| = \\frac{|n|\\,\\lambda}{d} \\le 1 \\;\\Rightarrow\\; |n| \\le @@",
  "a": "\\frac{d}{\\lambda}",
  "d": [
   "\\frac{\\lambda}{d}",
   "\\frac{N d}{\\lambda}",
   "\\frac{d}{2\\lambda}"
  ],
  "h": "Esempio: d = 2 μm, λ = 600 nm: d/λ ≈ 3,3, quindi ordini 0, ±1, ±2, ±3.",
  "sym": [
   [
    "\\theta_n",
    "direzione del massimo di ordine $n$"
   ],
   [
    "n",
    "ordine (intero)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "d",
    "passo del reticolo (m)"
   ]
  ],
  "val": "Reticolo (o N sorgenti) con incidenza normale. Se $d<\\lambda$ esiste solo l'ordine 0: è il caso della schiera con $d=\\lambda/2$ (scheda 11.15).",
  "err": "Pensare che più fenditure diano più ordini: il numero di ordini dipende solo da $d/\\lambda$; $N$ rende i massimi più stretti. A parità di $d$ il rosso ha meno ordini del blu.",
  "lab": "11",
  "rel": [
   "11.11",
   "11.15"
  ],
  "pdf": "p. 50–51"
 },
 {
  "id": "11.20",
  "c": 11,
  "n": "Dettaglio minimo a distanza L",
  "q": "Minima distanza tra due punti che un'apertura di diametro D separa a distanza L",
  "t": "\\Delta s_{min} = L\\,\\theta_R = @@",
  "a": "1{,}22\\,\\frac{\\lambda L}{D}",
  "d": [
   "1{,}22\\,\\frac{\\lambda D}{L}",
   "1{,}22\\,\\frac{L}{\\lambda D}",
   "1{,}22\\,\\frac{\\lambda}{L D}"
  ],
  "h": "Hubble (D = 2,4 m, λ = 500 nm) da 560 km di quota: circa 14 cm.",
  "sym": [
   [
    "\\Delta s_{min}",
    "minima separazione risolvibile (m)"
   ],
   [
    "L",
    "distanza degli oggetti (m)"
   ],
   [
    "\\theta_R",
    "angolo di Rayleigh (rad)"
   ],
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "D",
    "diametro dell'apertura (m)"
   ]
  ],
  "val": "Piccoli angoli ($\\Delta s\\ll L$), limite di diffrazione: si trascurano atmosfera e difetti dell'ottica. A terra l'atmosfera limita a 0,2–0,3 arcsec.",
  "err": "Dimenticare che $\\theta_R$ è in radianti, o usarlo come diametro del disco: $1{,}22\\lambda/D$ è il raggio angolare del disco di Airy.",
  "lab": "11",
  "rel": [
   "11.5",
   "11.6"
  ],
  "pdf": "p. 44–46"
 },
 {
  "id": "11.21",
  "c": 11,
  "n": "Diffrazione del suono",
  "q": "Suono attraverso una porta larga a: frequenze per cui l'onda si allarga in tutte le direzioni",
  "t": "\\lambda = \\frac{v_s}{\\nu} > a \\;\\Rightarrow\\; \\nu < @@",
  "a": "\\frac{v_s}{a}",
  "d": [
   "\\frac{a}{v_s}",
   "v_s\\,a",
   "\\frac{v_s}{2a}"
  ],
  "h": "Porta di 1 m, v_s = 340 m/s: sotto circa 340 Hz (i bassi) il suono gira l'angolo.",
  "sym": [
   [
    "\\lambda",
    "lunghezza d'onda (m)"
   ],
   [
    "v_s",
    "velocità del suono (m/s)"
   ],
   [
    "\\nu",
    "frequenza (Hz)"
   ],
   [
    "a",
    "larghezza dell'apertura (m)"
   ]
  ],
  "val": "Stessa fisica della fenditura singola (scheda 11.2): con $a<\\lambda$ non c'è nessun minimo e la diffusione è quasi isotropa. Alle frequenze alte il suono resta concentrato nel lobo centrale, con lobi secondari.",
  "err": "Pensare che la diffrazione riguardi solo la luce: vale per ogni onda. Nel suono è evidente perché $\\lambda$ (da 1,7 cm a 17 m nella banda udibile) è paragonabile agli oggetti di tutti i giorni.",
  "lab": "11",
  "rel": [
   "11.2",
   "11.1"
  ],
  "pdf": "p. 43"
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
  "h": "ω non cambia tra i mezzi; cambiano v, k, λ. Aria 1,0003, acqua 1,33, vetro 1,5, diamante 2,4.",
  "sym": [
   [
    "n",
    "indice di rifrazione (adimensionale, $\\ge1$)"
   ],
   [
    "c",
    "velocità della luce nel vuoto, $3\\cdot10^8$ m/s"
   ],
   [
    "v",
    "velocità della luce nel mezzo"
   ],
   [
    "k,\\ k_0",
    "numero d'onda nel mezzo e nel vuoto"
   ],
   [
    "\\lambda,\\ \\lambda_0",
    "lunghezza d'onda nel mezzo e nel vuoto"
   ]
  ],
  "val": "Mezzo trasparente. La frequenza non cambia passando da un mezzo all'altro ($k_0c=kv$), quindi $\\lambda=\\lambda_0/n$. In un mezzo dispersivo $n$ dipende da $\\lambda$.",
  "err": "Pensare che entrando in acqua cambi la frequenza (il colore): cambiano $v$, $k$ e $\\lambda$, non $\\omega$. Gli appunti (p. 57) scrivono \"$n\\propto\\lambda$ [da vedere]\": è sbagliato, $n$ dipende da $\\lambda$ ma non è proporzionale.",
  "lab": "12",
  "rel": [
   "12.3",
   "12.25",
   "12.2"
  ],
  "pdf": "p. 57"
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
  "h": "E e B obbediscono all'equazione di D'Alembert.",
  "sym": [
   [
    "c",
    "velocità della luce nel vuoto (m/s)"
   ],
   [
    "\\mu_0",
    "permeabilità magnetica del vuoto"
   ],
   [
    "\\varepsilon_0",
    "costante dielettrica del vuoto"
   ]
  ],
  "val": "Vuoto. Le equazioni di Maxwell danno un'equazione di D'Alembert per $E$ e per $B$ con $v^2=1/(\\mu_0\\varepsilon_0)$: la luce è un'onda elettromagnetica e non serve un mezzo. $\\mu_0$ e $\\varepsilon_0$ si misurano in laboratorio.",
  "err": "Dimenticare la radice: $1/(\\mu_0\\varepsilon_0)$ è $c^2$. E gli appunti (p. 57) dicono che $\\mu_0$ e $\\varepsilon_0$ dipendono dal materiale: sono le costanti del vuoto; nel mezzo contano $\\varepsilon$ e $\\mu$ (scheda 12.25).",
  "lab": "12",
  "rel": [
   "12.24",
   "12.25",
   "12.1"
  ],
  "pdf": "p. 56–57"
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
  "h": "Riflessione: θ_i = θ_r. Se n₂ > n₁ il raggio si avvicina alla normale.",
  "sym": [
   [
    "n_1",
    "indice del mezzo di provenienza"
   ],
   [
    "\\theta_i",
    "angolo di incidenza, dalla normale"
   ],
   [
    "n_2",
    "indice del secondo mezzo"
   ],
   [
    "\\theta_t",
    "angolo di rifrazione (trasmissione), dalla normale"
   ]
  ],
  "val": "Interfaccia piana, angoli tra 0 e $\\pi/2$ misurati dalla normale; raggi e normale nello stesso piano. Si ricava da Fermat (scheda 12.6) o da Huygens (scheda 12.15).",
  "err": "Misurare gli angoli dalla superficie invece che dalla normale. Oppure scrivere $n_1\\sin\\theta_t$: ogni indice va col seno dell'angolo nel proprio mezzo.",
  "lab": "12",
  "rel": [
   "12.4",
   "12.6",
   "12.15"
  ],
  "pdf": "p. 57"
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
   "\\sqrt{\\frac{n_2}{n_1}}",
   "1 - \\frac{n_2}{n_1}"
  ],
  "h": "Esiste solo passando dal mezzo più denso al meno denso (fibre ottiche).",
  "sym": [
   [
    "\\theta_c",
    "angolo critico (dalla normale)"
   ],
   [
    "n_1",
    "indice del mezzo da cui arriva la luce (più denso)"
   ],
   [
    "n_2",
    "indice del mezzo meno denso"
   ]
  ],
  "val": "Solo da mezzo più denso a meno denso ($n_2<n_1$). Per $\\theta_i>\\theta_c$ non c'è raggio trasmesso: riflessione totale (fibre ottiche). Acqua–aria 48,8°, vetro–aria 41,8°, diamante–aria 24,6°.",
  "err": "Cercare l'angolo critico entrando in acqua dall'aria: verrebbe $\\sin\\theta_c=n_2/n_1>1$, non esiste. Entrando nel mezzo più denso il raggio si avvicina sempre alla normale.",
  "lab": "12",
  "rel": [
   "12.3",
   "12.5",
   "12.19"
  ],
  "pdf": "p. 58"
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
  "h": "Da sott'acqua vedi tutto il cielo in un cerchio luminoso di apertura ≈ 97°.",
  "sym": [
   [
    "\\theta_t^{max}",
    "massimo angolo di rifrazione in acqua, per raggi radenti in aria"
   ],
   [
    "1{,}334",
    "indice dell'acqua usato negli appunti"
   ],
   [
    "\\alpha",
    "apertura del cono di luce vista dal sub"
   ]
  ],
  "val": "Superficie dell'acqua piatta, $n_{aria}=1$. È l'angolo critico visto al contrario: i raggi radenti ($\\theta_i=90°$) entrano a $48{,}6°$ dalla verticale.",
  "err": "Prendere come apertura $\\theta_t^{max}$ invece del doppio: il cono si apre di $48{,}6°$ da entrambe le parti della verticale. Fuori dal cerchio il sub vede solo luce riflessa totalmente sotto la superficie.",
  "lab": "12",
  "rel": [
   "12.4",
   "12.19"
  ],
  "pdf": "p. 58"
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
  "h": "dt/dx = 0 dà Snell. Forma variazionale: δ∫n ds = 0.",
  "sym": [
   [
    "t(x)",
    "tempo di percorrenza (s)"
   ],
   [
    "h",
    "distanza di S dall'interfaccia (m)"
   ],
   [
    "x",
    "posizione del punto O di attraversamento (m)"
   ],
   [
    "v_1,\\ v_2",
    "velocità della luce nei due mezzi, $c/n_1$ e $c/n_2$"
   ],
   [
    "b",
    "distanza di P dall'interfaccia (m)"
   ],
   [
    "a",
    "distanza orizzontale tra S e P (m)"
   ]
  ],
  "val": "S nel mezzo 1, P nel mezzo 2, interfaccia piana. $dt/dx=0$ dà $\\frac{\\sin\\theta_i}{v_1}=\\frac{\\sin\\theta_t}{v_2}$, cioè Snell. Con $v_1=v_2$ e P dalla stessa parte di S si ottiene la riflessione.",
  "err": "Minimizzare la lunghezza invece del tempo: tra due mezzi la retta non è la via più veloce (esempio del bagnino). Negli appunti (p. 59), nella riflessione, manca $1/v$ e sotto la seconda radice c'è un meno: va $+(a-x)^2$.",
  "lab": "12b",
  "rel": [
   "12.17",
   "12.3",
   "12.15"
  ],
  "pdf": "p. 58–60"
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
  "h": "n₁ è il mezzo dell'oggetto. r > 0 se l'oggetto vede la faccia convessa.",
  "sym": [
   [
    "n_1",
    "indice del mezzo dell'oggetto"
   ],
   [
    "p",
    "distanza oggetto–vertice"
   ],
   [
    "n_2",
    "indice dell'altro mezzo"
   ],
   [
    "q",
    "distanza immagine–vertice"
   ],
   [
    "r",
    "raggio di curvatura"
   ]
  ],
  "val": "Raggi parassiali (angoli piccoli, $\\sin\\theta\\approx\\theta$). Segni: $p>0$; $q>0$ immagine reale dalla parte opposta all'oggetto, $q<0$ virtuale dallo stesso lato; $r>0$ se l'oggetto vede la faccia convessa.",
  "err": "Scambiare $n_1$ e $n_2$ o i segni. Controllo: con $n_1=n_2$ deve sparire ogni effetto, e infatti viene $q=-p$ (immagine sull'oggetto).",
  "lab": "12",
  "rel": [
   "12.8",
   "12.20",
   "12.13",
   "12.10"
  ],
  "pdf": "p. 63–64"
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
  "h": "f_i − f₀ = r e n₁/f₀ = n₂/f_i.",
  "sym": [
   [
    "f_0",
    "distanza focale oggetto (1° punto focale $F_0$)"
   ],
   [
    "f_i",
    "distanza focale immagine (2° punto focale $F_i$)"
   ],
   [
    "n_1",
    "indice del mezzo dell'oggetto"
   ],
   [
    "n_2",
    "indice dell'altro mezzo"
   ],
   [
    "r",
    "raggio di curvatura"
   ]
  ],
  "val": "Diottro sferico, raggi parassiali. $f_0$: oggetto in $F_0$, immagine all'infinito. $f_i$: oggetto all'infinito, immagine in $F_i$. Sono diverse perché i mezzi ai due lati sono diversi.",
  "err": "Usare una sola focale come per specchi e lenti sottili in aria: nel diottro $f_0\\ne f_i$, con $f_i-f_0=r$ e $n_1/f_0=n_2/f_i$.",
  "lab": "12",
  "rel": [
   "12.7",
   "12.20",
   "12.21"
  ],
  "pdf": "p. 64–65"
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
  "h": "f = r/2. Concavo r > 0 (immagine reale solo se p > f), convesso r < 0 (sempre virtuale), piano r → ∞.",
  "sym": [
   [
    "p",
    "distanza oggetto–vertice"
   ],
   [
    "q",
    "distanza immagine–vertice ($>0$ davanti allo specchio, reale)"
   ],
   [
    "r",
    "raggio di curvatura ($>0$ concavo, $<0$ convesso)"
   ],
   [
    "f",
    "distanza focale, $r/2$"
   ]
  ],
  "val": "Raggi parassiali. Concavo $r>0$; convesso $r<0$ (immagine sempre virtuale); piano $r\\to\\infty$ ($q=-p$). Per raggi lontani dall'asse c'è aberrazione sferica (scheda 12.16).",
  "err": "Dire che lo specchio concavo dà sempre un'immagine reale: è reale solo se $p>f$. Con l'oggetto tra fuoco e specchio l'immagine è virtuale, dritta e ingrandita ($q<0$).",
  "lab": "12",
  "rel": [
   "12.12",
   "12.16",
   "12.11"
  ],
  "pdf": "p. 62–63"
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
  "h": "Lente sottile = due diottri in successione, spessore trascurabile.",
  "sym": [
   [
    "f",
    "distanza focale ($>0$ convergente)"
   ],
   [
    "n",
    "indice del vetro della lente (lente in aria)"
   ],
   [
    "r_1",
    "raggio della prima superficie incontrata dalla luce"
   ],
   [
    "r_2",
    "raggio della seconda superficie"
   ]
  ],
  "val": "Lente sottile in aria: spessore $s\\ll r_1, r_2, p, q$. Si applica due volte il diottro: l'immagine del primo fa da oggetto virtuale per il secondo, con $p'\\approx-q'$ (scheda 12.22).",
  "err": "Sbagliare il segno di $r_2$: in una biconvessa $r_1>0$ e $r_2<0$, così i due contributi si sommano. Controllo: con $n=1$ (lente fatta d'aria) $1/f=0$, nessun effetto.",
  "lab": "12",
  "rel": [
   "12.11",
   "12.7",
   "12.22"
  ],
  "pdf": "p. 65–66"
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
  "h": "f > 0 lente convergente, f < 0 divergente. Il raggio per il centro non è deviato.",
  "sym": [
   [
    "p",
    "distanza oggetto–lente"
   ],
   [
    "q",
    "distanza immagine–lente ($>0$ reale, dall'altra parte)"
   ],
   [
    "f",
    "distanza focale ($>0$ convergente, $<0$ divergente)"
   ]
  ],
  "val": "Lente sottile, raggi parassiali. Aberrazione sferica (raggi lontani dall'asse) e cromatica ($n$ dipende da $\\lambda$, quindi anche $f$).",
  "err": "Usare $\\frac1p-\\frac1q$: con la convenzione degli appunti l'immagine reale ha $q>0$ e i due termini si sommano. Oggetto nel fuoco ($p=f$): immagine all'infinito.",
  "lab": "12",
  "rel": [
   "12.10",
   "12.23",
   "12.9"
  ],
  "pdf": "p. 66"
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
   "-\\frac{q}{2p}"
  ],
  "h": "M > 0 immagine dritta, M < 0 capovolta.",
  "sym": [
   [
    "M",
    "ingrandimento: altezza dell'immagine / altezza dell'oggetto"
   ],
   [
    "q",
    "distanza immagine–specchio"
   ],
   [
    "p",
    "distanza oggetto–specchio"
   ]
  ],
  "val": "Raggi parassiali. $M>0$ immagine dritta, $M<0$ capovolta; $|M|>1$ ingrandita. Specchio piano: $q=-p$, $M=1$.",
  "err": "Definire $M$ come oggetto/immagine (così è scritto a parole a p. 67): dalla formula $M=\\overline{ab}/\\overline{AB}$ è immagine/oggetto. Il segno meno serve: immagine reale ($q>0$) vuol dire capovolta.",
  "lab": "12",
  "rel": [
   "12.9",
   "12.13",
   "12.23"
  ],
  "pdf": "p. 63, 67"
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
  "h": "Viene da sin θ_t / sin θ_i = n₁/n₂.",
  "sym": [
   [
    "M",
    "ingrandimento (immagine/oggetto)"
   ],
   [
    "n_1",
    "indice del mezzo dell'oggetto"
   ],
   [
    "n_2",
    "indice dell'altro mezzo"
   ],
   [
    "q,\\ p",
    "distanze dell'immagine e dell'oggetto dal vertice"
   ]
  ],
  "val": "Raggi parassiali: si usano $\\tan\\theta\\approx\\sin\\theta$ e Snell, $\\sin\\theta_t/\\sin\\theta_i=n_1/n_2$.",
  "err": "Scambiare gli indici: al numeratore va l'indice del mezzo dell'oggetto, $n_1$. Oppure usare $-q/p$ come per lo specchio, dimenticando la rifrazione.",
  "lab": "12",
  "rel": [
   "12.7",
   "12.12",
   "12.23"
  ],
  "pdf": "p. 67"
 },
 {
  "id": "12.14",
  "c": 12,
  "n": "Fattore di obliquità",
  "q": "Fattore di obliquità di Kirchhoff per le onde secondarie di Huygens–Fresnel (χ misurato dalla direzione di avanzamento)",
  "t": "K(\\chi) = @@",
  "a": "\\tfrac12(1 + \\cos\\chi)",
  "d": [
   "\\tfrac12(1 - \\cos\\chi)",
   "\\cos\\chi",
   "1 + \\cos\\chi"
  ],
  "h": "K(0) = 1 in avanti, K(π/2) = ½ di lato, K(π) = 0 all'indietro: niente onda regressiva.",
  "sym": [
   [
    "K(\\chi)",
    "peso dell'ondina secondaria nella direzione $\\chi$ (adimensionale)"
   ],
   [
    "\\chi",
    "angolo tra la direzione considerata e la normale al fronte, verso l'avanti"
   ]
  ],
  "val": "Teoria di Kirchhoff (fine '800), che giustifica matematicamente Huygens–Fresnel: le ondine non sono isotrope ma irradiano soprattutto in avanti. Negli appunti (p. 69) c'è solo la conclusione, cioè l'assenza del fronte regressivo; la forma esplicita di $K$ è il risultato standard di quella teoria.",
  "err": "Prendere le ondine di Huygens come sfere complete: allora dovrebbe esistere anche un fronte che torna indietro, che non si osserva. Non va confuso con $\\cos\\chi$, che all'indietro darebbe $-1$, cioè un'onda regressiva capovolta.",
  "lab": "12b",
  "rel": [
   "12.15",
   "8.6"
  ],
  "pdf": "p. 67–69"
 },
 {
  "id": "12.15",
  "c": 12,
  "n": "Huygens: riflessione e rifrazione",
  "q": "Costruzione di Huygens alla superficie di separazione: rapporto tra i seni degli angoli",
  "t": "\\overline{BC} = v_1 t,\\ \\ \\overline{AD} = v_2 t\\;\\Rightarrow\\; \\frac{\\sin\\theta_1}{\\sin\\theta_2} = @@",
  "a": "\\frac{v_1}{v_2}",
  "d": [
   "\\frac{v_2}{v_1}",
   "\\frac{n_1}{n_2}",
   "\\frac{v_1^2}{v_2^2}"
  ],
  "h": "Con v = c/n è Snell: n₁ sin θ₁ = n₂ sin θ₂. Nella riflessione v₂ = v₁, i triangoli sono uguali e θ_i = θ_r.",
  "sym": [
   [
    "\\overline{BC}",
    "cammino dell'estremo B del fronte nel mezzo 1 (m)"
   ],
   [
    "\\overline{AD}",
    "raggio dell'ondina partita da A nel mezzo 2 (m)"
   ],
   [
    "v_1,\\ v_2",
    "velocità nei due mezzi (m/s)"
   ],
   [
    "t",
    "tempo impiegato da B per arrivare in C (s)"
   ],
   [
    "\\theta_1",
    "angolo di incidenza"
   ],
   [
    "\\theta_2",
    "angolo di rifrazione"
   ]
  ],
  "val": "Fronte piano su superficie piana. Il fronte tocca la superficie in A; mentre B percorre $\\overline{BC}$, l'ondina da A percorre $\\overline{AD}$ nello stesso tempo. Con $\\overline{BC}=\\overline{AC}\\sin\\theta_1$ e $\\overline{AD}=\\overline{AC}\\sin\\theta_2$ si ottiene il rapporto.",
  "err": "Mettere gli indici al posto delle velocità senza invertire: $v_1/v_2=n_2/n_1$. Negli appunti (p. 69), nella riflessione, c'è $\\overline{BC}=\\overline{AB}$: l'uguaglianza giusta è $\\overline{BC}=\\overline{AD}$ (stesso tempo, stessa velocità).",
  "lab": "12b",
  "rel": [
   "12.3",
   "12.14",
   "12.6"
  ],
  "pdf": "p. 69"
 },
 {
  "id": "12.16",
  "c": 12,
  "n": "Specchio parabolico",
  "q": "Profilo dello specchio che manda nel fuoco tutti i raggi paralleli all'asse (y = distanza dall'asse)",
  "t": "z(y) = @@\\qquad (\\text{fuoco a distanza } f \\text{ dal vertice})",
  "a": "\\frac{y^2}{4f}",
  "d": [
   "\\frac{y^2}{2f}",
   "\\frac{y^2}{f}",
   "\\frac{y}{4f}"
  ],
  "h": "La sfera di raggio r = 2f vicino all'asse vale z ≈ y²/(2r) = y²/(4f): coincide con la parabola solo per raggi parassiali.",
  "sym": [
   [
    "z",
    "profondità della superficie rispetto al vertice (m)"
   ],
   [
    "y",
    "distanza del punto dall'asse (m)"
   ],
   [
    "f",
    "distanza focale (m)"
   ]
  ],
  "val": "Raggi paralleli all'asse, a qualunque distanza da esso: passano tutti per il fuoco, senza approssimazione parassiale. La sfera, $z=r-\\sqrt{r^2-y^2}\\simeq\\frac{y^2}{2r}+\\frac{y^4}{8r^3}$, se ne discosta col termine in $y^4$: è l'aberrazione sferica.",
  "err": "Usare $y^2/(2f)$ confondendo $f$ con $r$: per la sfera $z\\simeq y^2/(2r)$, con $r=2f$. Altro errore: credere che lo specchio sferico sia esatto; $\\frac1p+\\frac1q=\\frac2r$ vale solo vicino all'asse.",
  "lab": "12",
  "rel": [
   "12.9"
  ],
  "pdf": "p. 63"
 },
 {
  "id": "12.17",
  "c": 12,
  "n": "Fermat in forma variazionale",
  "q": "Principio di Fermat in un mezzo con indice di rifrazione variabile n(s)",
  "t": "t = \\int_A^B \\frac{ds}{v(s)} = \\frac{1}{c}\\int_A^B n\\,ds,\\qquad @@ = 0",
  "a": "\\delta\\!\\int_A^B n\\,ds",
  "d": [
   "\\delta\\!\\int_A^B \\frac{ds}{n}",
   "\\delta\\!\\int_A^B v\\,ds",
   "\\int_A^B n\\,ds"
  ],
  "h": "Il raggio rende stazionario il cammino ottico ∫n ds. Atmosfera: il Sole si vede anche sotto l'orizzonte.",
  "sym": [
   [
    "t",
    "tempo di percorrenza (s)"
   ],
   [
    "A,\\ B",
    "punti di partenza e di arrivo"
   ],
   [
    "ds",
    "tratto di cammino (m)"
   ],
   [
    "v(s)",
    "velocità della luce lungo il cammino (m/s)"
   ],
   [
    "c",
    "velocità della luce nel vuoto"
   ],
   [
    "n",
    "indice di rifrazione, $n(s)=c/v(s)$"
   ],
   [
    "\\delta",
    "variazione: confronto tra cammini vicini con gli stessi estremi"
   ]
  ],
  "val": "Ottica geometrica: ostacoli e variazioni di $n$ su scale molto maggiori di $\\lambda$ (gli appunti, p. 61, scrivono la condizione al contrario). Da $\\delta\\int n\\,ds=0$ seguono riflessione, Snell e la curvatura dei raggi negli strati d'aria.",
  "err": "Scrivere $\\int n\\,ds=0$: il cammino ottico è sempre positivo; è la sua variazione a essere nulla. E $\\delta=0$ vuol dire \"stazionario\": nei casi visti (riflessione, rifrazione) è un minimo.",
  "lab": "12b",
  "rel": [
   "12.6",
   "12.18",
   "12.3"
  ],
  "pdf": "p. 60–61"
 },
 {
  "id": "12.18",
  "c": 12,
  "n": "Maupertuis: analogia ottica–meccanica",
  "q": "Analogo meccanico del principio di Fermat: a sinistra la luce, a destra un punto materiale in un potenziale",
  "t": "\\delta\\!\\int n\\,ds = 0\\quad\\longleftrightarrow\\quad @@ = 0",
  "a": "\\delta\\!\\int p\\,ds",
  "d": [
   "\\delta\\!\\int \\frac{ds}{p}",
   "\\delta\\!\\int p\\,dt",
   "\\delta\\!\\int E\\,ds"
  ],
  "h": "L'impulso p = mv fa la parte dell'indice n = c/v.",
  "sym": [
   [
    "n",
    "indice di rifrazione"
   ],
   [
    "p",
    "modulo dell'impulso $mv$ della particella (kg m/s)"
   ],
   [
    "ds",
    "tratto di traiettoria (m)"
   ],
   [
    "\\delta",
    "variazione tra traiettorie vicine con gli stessi estremi"
   ]
  ],
  "val": "Punto materiale con energia totale $E$ fissata in un potenziale $U$: $p=\\sqrt{2m(E-U)}$ dipende dalla posizione come $n$ in un mezzo non omogeneo. Negli appunti è chiamato principio di Hamilton–Jacobi; propriamente è la minima azione di Maupertuis (quello di Hamilton è $\\delta\\int L\\,dt=0$). È una delle basi della meccanica quantistica (de Broglie, Schrödinger, Feynman).",
  "err": "Prendere l'analogia alla lettera sulle velocità: $n=c/v$ è grande dove la luce è lenta, $p=mv$ è grande dove la particella è veloce. A corrispondersi sono $n$ e $p$, non le velocità.",
  "lab": "12b",
  "rel": [
   "12.17"
  ],
  "pdf": "p. 61"
 },
 {
  "id": "12.19",
  "c": 12,
  "n": "Cerchio luminoso sott'acqua",
  "q": "Raggio del cerchio di cielo visto da un sub a profondità h",
  "t": "R = @@,\\qquad \\theta_c = \\arcsin\\frac{1}{n_{acqua}} \\simeq 48{,}6^\\circ",
  "a": "h\\tan\\theta_c",
  "d": [
   "h\\sin\\theta_c",
   "\\frac{h}{\\tan\\theta_c}",
   "2h\\tan\\theta_c"
  ],
  "h": "tan 48,6° ≈ 1,13: a 2 m di profondità il cerchio ha raggio circa 2,3 m.",
  "sym": [
   [
    "R",
    "raggio del cerchio luminoso sulla superficie (m)"
   ],
   [
    "h",
    "profondità dell'occhio (m)"
   ],
   [
    "\\theta_c",
    "angolo critico acqua–aria, dalla verticale"
   ],
   [
    "n_{acqua}",
    "1,334 negli appunti"
   ]
  ],
  "val": "Superficie piatta. È la geometria della finestra di Snell (scheda 12.5): i raggi radenti arrivano all'occhio a $\\theta_c$ dalla verticale.",
  "err": "Usare il seno: $R$ è il cateto opposto a $\\theta_c$ in un triangolo rettangolo con cateto adiacente $h$, quindi serve la tangente. E $2h\\tan\\theta_c$ è il diametro, non il raggio.",
  "lab": "12",
  "rel": [
   "12.5",
   "12.4"
  ],
  "pdf": "p. 58"
 },
 {
  "id": "12.20",
  "c": 12,
  "n": "Diottro con le focali",
  "q": "Formula del diottro scritta con la focale oggetto f₀ o con la focale immagine f_i",
  "t": "\\frac{n_1}{p} + \\frac{n_2}{q} = \\frac{n_1}{f_0} = @@",
  "a": "\\frac{n_2}{f_i}",
  "d": [
   "\\frac{n_1}{f_i}",
   "\\frac{n_2}{f_0}",
   "\\frac{1}{f_i}"
  ],
  "h": "Quindi n₁/f₀ = n₂/f_i: la focale è più lunga dalla parte del mezzo con indice maggiore.",
  "sym": [
   [
    "n_1,\\ n_2",
    "indici del mezzo dell'oggetto e dell'altro mezzo"
   ],
   [
    "p,\\ q",
    "distanze dell'oggetto e dell'immagine dal vertice"
   ],
   [
    "f_0",
    "focale oggetto"
   ],
   [
    "f_i",
    "focale immagine"
   ]
  ],
  "val": "Diottro sferico, raggi parassiali. Si ottiene sostituendo $f_0=\\frac{n_1}{n_2-n_1}r$ e $f_i=\\frac{n_2}{n_2-n_1}r$ nella formula di Cartesio.",
  "err": "Scrivere $\\frac1p+\\frac1q=\\frac1f$ come per la lente: nel diottro ogni distanza è pesata con l'indice del proprio mezzo, e le focali sono due.",
  "lab": "12",
  "rel": [
   "12.7",
   "12.8",
   "12.21"
  ],
  "pdf": "p. 65"
 },
 {
  "id": "12.21",
  "c": 12,
  "n": "Differenza delle focali del diottro",
  "q": "Differenza tra la focale immagine e la focale oggetto di un diottro sferico",
  "t": "f_i - f_0 = @@",
  "a": "r",
  "d": [
   "0",
   "2r",
   "\\frac{r}{2}"
  ],
  "h": "Esempio aria–vetro (n₁ = 1, n₂ = 1,5), r = 10 cm: f₀ = 20 cm, f_i = 30 cm.",
  "sym": [
   [
    "f_i",
    "focale immagine"
   ],
   [
    "f_0",
    "focale oggetto"
   ],
   [
    "r",
    "raggio di curvatura del diottro"
   ]
  ],
  "val": "Diottro sferico, raggi parassiali, segni degli appunti ($r>0$ se l'oggetto vede la faccia convessa). Vale qualunque siano $n_1$ e $n_2$: $\\frac{n_2-n_1}{n_2-n_1}r=r$.",
  "err": "Pensare che le due focali coincidano come in una lente sottile in aria: coinciderebbero solo con lo stesso mezzo dai due lati, ma allora il diottro non esisterebbe.",
  "lab": "12",
  "rel": [
   "12.8",
   "12.20"
  ],
  "pdf": "p. 64"
 },
 {
  "id": "12.22",
  "c": 12,
  "n": "Lente: oggetto virtuale",
  "q": "Lente sottile: posizione dell'oggetto per il secondo diottro, nota l'immagine q′ del primo",
  "t": "p' = -(q' - s) \\simeq @@",
  "a": "-q'",
  "d": [
   "q'",
   "-q",
   "q' - s"
  ],
  "h": "L'immagine del primo diottro (che non si forma davvero) fa da oggetto virtuale per il secondo.",
  "sym": [
   [
    "p'",
    "distanza dell'oggetto per il secondo diottro"
   ],
   [
    "q'",
    "distanza dell'immagine del primo diottro"
   ],
   [
    "s",
    "spessore della lente"
   ]
  ],
  "val": "Lente sottile: $s\\ll r_1, r_2, p, q$. Il segno meno dice che l'oggetto è virtuale: sta dalla parte da cui la luce esce.",
  "err": "Usare $p'=q'$: l'oggetto del secondo diottro sta dalla parte opposta a quella da cui arriva la luce, quindi ha segno opposto.",
  "lab": "12",
  "rel": [
   "12.10",
   "12.7"
  ],
  "pdf": "p. 65–66"
 },
 {
  "id": "12.23",
  "c": 12,
  "n": "Ingrandimento: lente sottile",
  "q": "Ingrandimento di una lente sottile in aria, come prodotto di quelli dei due diottri",
  "t": "M = M_1 M_2 = @@",
  "a": "-\\frac{q}{p}",
  "d": [
   "\\frac{q}{p}",
   "-\\frac{n\\,q}{p}",
   "-\\frac{p}{q}"
  ],
  "h": "Stessa forma dello specchio. Oggetto oltre 2f: immagine reale, capovolta e rimpicciolita, come nell'occhio.",
  "sym": [
   [
    "M",
    "ingrandimento della lente (immagine/oggetto)"
   ],
   [
    "M_1,\\ M_2",
    "ingrandimenti dei due diottri"
   ],
   [
    "q",
    "distanza immagine–lente"
   ],
   [
    "p",
    "distanza oggetto–lente"
   ]
  ],
  "val": "Lente sottile in aria, raggi parassiali. Dalla scheda 12.13 applicata due volte: $M_1=-\\frac{q'}{n\\,p}$, $M_2=-\\frac{n\\,q}{p'}$, con $p'\\approx-q'$; l'indice $n$ si semplifica. Negli appunti non è scritta: è una conseguenza diretta.",
  "err": "Lasciare l'indice $n$ della lente nell'ingrandimento: si semplifica tra i due diottri. Segno: $q>0$ (immagine reale) vuol dire immagine capovolta.",
  "lab": "12",
  "rel": [
   "12.11",
   "12.12",
   "12.13"
  ],
  "pdf": "p. 66–67"
 },
 {
  "id": "12.24",
  "c": 12,
  "n": "Onde elettromagnetiche",
  "q": "Equazione delle onde per il campo elettrico ricavata dalle equazioni di Maxwell, nel vuoto",
  "t": "\\frac{\\partial^2 E}{\\partial t^2} = @@\\,\\frac{\\partial^2 E}{\\partial x^2}",
  "a": "\\frac{1}{\\mu_0\\varepsilon_0}",
  "d": [
   "\\mu_0\\varepsilon_0",
   "\\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}",
   "\\frac{\\mu_0}{\\varepsilon_0}"
  ],
  "h": "Stessa equazione per B. 1/(μ₀ε₀) = c²: la luce è un'onda elettromagnetica e non serve un mezzo.",
  "sym": [
   [
    "E",
    "campo elettrico (V/m)"
   ],
   [
    "x,\\ t",
    "posizione (m) e tempo (s)"
   ],
   [
    "\\mu_0",
    "permeabilità magnetica del vuoto"
   ],
   [
    "\\varepsilon_0",
    "costante dielettrica del vuoto"
   ]
  ],
  "val": "Vuoto, onda piana lungo $x$. In 3D si scrive col laplaciano, $\\nabla^2\\vec E=\\mu_0\\varepsilon_0\\,\\partial_t^2\\vec E$ (come la scheda 8.1). Maxwell, 1861–1865.",
  "err": "Confondere il coefficiente con $c$: davanti alla derivata spaziale c'è $c^2=1/(\\mu_0\\varepsilon_0)$, come $v^2$ nella corda.",
  "lab": "12",
  "rel": [
   "12.2",
   "8.1"
  ],
  "pdf": "p. 56"
 },
 {
  "id": "12.25",
  "c": 12,
  "n": "Indice e costanti del mezzo",
  "q": "Velocità della luce in un mezzo e indice di rifrazione a partire dalle costanti ε e μ del mezzo",
  "t": "v = \\frac{1}{\\sqrt{\\varepsilon\\mu}},\\qquad n = \\frac{c}{v} = @@",
  "a": "\\sqrt{\\varepsilon_r\\,\\mu_r}",
  "d": [
   "\\varepsilon_r\\,\\mu_r",
   "\\frac{1}{\\sqrt{\\varepsilon_r\\,\\mu_r}}",
   "\\sqrt{\\frac{\\varepsilon_r}{\\mu_r}}"
  ],
  "h": "ε = ε_r ε₀ e μ = μ_r μ₀: nel vuoto ε_r = μ_r = 1 e n = 1.",
  "sym": [
   [
    "v",
    "velocità della luce nel mezzo (m/s)"
   ],
   [
    "\\varepsilon,\\ \\mu",
    "costante dielettrica e permeabilità magnetica del mezzo"
   ],
   [
    "n",
    "indice di rifrazione"
   ],
   [
    "c",
    "velocità della luce nel vuoto"
   ],
   [
    "\\varepsilon_r,\\ \\mu_r",
    "costanti relative, adimensionali"
   ]
  ],
  "val": "Mezzo lineare, omogeneo e isotropo. È la versione corretta della frase degli appunti (p. 57) \"$\\mu_0,\\varepsilon_0$ dipendono dal materiale\": quelle sono le costanti del vuoto; nel mezzo cambiano $\\varepsilon$ e $\\mu$.",
  "err": "Dimenticare la radice: è $n^2=\\varepsilon_r\\mu_r$. Poiché $n$ dipende da $\\lambda$ (dispersione), anche $\\varepsilon_r$ dipende dalla frequenza.",
  "lab": "12",
  "rel": [
   "12.1",
   "12.2",
   "12.24"
  ],
  "pdf": "p. 57"
 }
];

/* Concetto: id, c, title, see (cosa sto vedendo), why (perché succede), tex (formule), exam (spiegazione da esame, passo per passo), cards, lab, pdf. */
const CONCEPTS = [
 {
  "id": "k.radiative",
  "c": 5,
  "title": "Perdite radiative",
  "see": "Una massa su una molla, attaccata a due corde lunghissime. Non c'è attrito, eppure l'oscillazione si spegne: l'energia se ne va lungo le corde sotto forma di onde.",
  "why": [
   "Muovendosi, la massa trascina la corda e genera due onde uscenti, una a destra e una a sinistra. Ogni onda porta via la potenza $\\frac{T_0}{v}\\dot y^2$.",
   "La corda reagisce con una forza proporzionale alla velocità e opposta: è un attrito viscoso a tutti gli effetti, con $\\gamma=\\frac{T_0}{mv}$."
  ],
  "tex": [
   "m\\ddot y=-Ky-\\frac{2T_0}{v}\\,\\dot y"
  ],
  "exam": [
   "Impostazione: massa $m$ su una molla $K$, legata in $x=0$ a due corde semi-infinite con tensione $T_0$ e velocità $v=\\sqrt{T_0/\\rho_L}$. Chiamo $y(t)=\\psi(0,t)$ lo spostamento della massa, puntiforme nella giunzione.",
   "Ipotesi: piccole pendenze ($\\sin\\alpha\\simeq\\tan\\alpha$) e solo onde uscenti, cioè nessuna riflessione dagli estremi lontani: a destra un'onda progressiva $f(x-vt)$, a sinistra una regressiva $g(x+vt)$.",
   "Forze sulla massa: $m\\ddot y=-Ky+F_1+F_2$, con $F_1=T_0\\,\\partial_x\\psi|_{0^+}$ e $F_2=-T_0\\,\\partial_x\\psi|_{0^-}$. A destra $\\partial_x\\psi=-\\frac1v\\partial_t\\psi$, a sinistra $\\partial_x\\psi=+\\frac1v\\partial_t\\psi$: entrambe danno $-\\frac{T_0}{v}\\dot y$ e si sommano.",
   "Equazione del moto: $m\\ddot y=-Ky-\\frac{2T_0}{v}\\dot y$, cioè $\\ddot y+2\\gamma\\dot y+\\omega_0^2y=0$ con $\\omega_0^2=K/m$ e $\\gamma=\\frac{T_0}{mv}$. È un oscillatore smorzato senza alcun attrito.",
   "Controllo con l'energia: ogni onda progressiva porta $P=\\frac{T_0}{v}\\left(\\partial_t\\psi\\right)^2$, quindi la massa irradia $P_{\\rm rad}=\\frac{2T_0}{v}\\dot y^2$. Uguagliando alla potenza viscosa $2\\gamma m\\dot y^2$ ritrovo $\\gamma=\\frac{T_0}{mv}$.",
   "Risultato: se $\\gamma<\\omega_0$, $y(t)=Ae^{-\\gamma t}\\cos(\\omega t+\\varphi)$ con $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$. Gli appunti scrivono $\\omega_0$, che va bene solo per $\\gamma\\ll\\omega_0$.",
   "Commento: $\\frac{T_0}{v}=\\sqrt{T_0\\rho_L}$ è l'impedenza della corda: corde più tese o più pesanti smorzano di più. L'energia non diventa calore, viaggia lontano. Per mantenere l'oscillazione serve una forzante, che rifornisce di energia le onde."
  ],
  "cards": [
   "5.12",
   "5.13",
   "5.20",
   "5.10"
  ],
  "lab": "5b",
  "pdf": "p. 11–12"
 },
 {
  "id": "k.frusta",
  "c": 5,
  "title": "La frusta e il boom sonico",
  "see": "Una frusta è spessa vicino al manico e sottilissima in punta. L'impulso partito dal manico corre sempre più veloce e la punta schiocca: è un piccolo boom sonico.",
  "why": [
   "Lungo la frusta la sezione, e quindi $\\rho_L$, diminuisce. Con la stessa tensione $v=\\sqrt{T/\\rho_L}$ cresce: l'impulso accelera verso la punta.",
   "L'energia cinetica data al manico si conserva, ma l'onda mette in moto una massa sempre più piccola: la punta si muove sempre più in fretta e alla fine supera la velocità del suono."
  ],
  "tex": [
   "v(x)=\\sqrt{\\frac{T}{\\rho_L(x)}}"
  ],
  "exam": [
   "Modello: la frusta è una corda con tensione $T$ circa uniforme e densità lineare $\\rho_L(x)$ che diminuisce con continuità dal manico alla punta, perché la sezione $S$ si assottiglia.",
   "Velocità locale dell'onda, da D'Alembert: $v(x)=\\sqrt{T/\\rho_L(x)}$. Se $\\rho_L\\to0$ verso la punta, $v$ cresce enormemente.",
   "Energia: il colpo al manico fornisce un'energia cinetica che, trascurando le perdite, si conserva. Mentre l'impulso avanza, la stessa energia è portata da un tratto di frusta di massa sempre minore.",
   "Conseguenza immediata: se $\\frac12mu^2$ resta circa costante e $m$ diminuisce, la velocità $u$ della parte in moto cresce, come $u\\propto1/\\sqrt m$.",
   "Alla punta si supera la velocità del suono $v_s\\simeq340\\,\\mathrm{m/s}$: la punta si muove nell'aria più veloce dei fronti d'onda che produce, e si forma un cono di Mach con $\\sin\\theta=c/v_S$.",
   "Risultato: lo schiocco non è il rumore di un urto ma un vero boom sonico, come quello di un aereo supersonico.",
   "Commento: è l'opposto della corda più densa di p. 74, dove l'onda rallenta. Passando a un tratto più leggero, invece, l'onda va più veloce e il trasmesso è più alto ($t>1$): qualitativamente la frusta è una lunga serie di questi passaggi."
  ],
  "cards": [
   "5.14",
   "5.1",
   "9.5"
  ],
  "lab": "5c",
  "pdf": "p. 75, 81"
 },
 {
  "id": "k.armonico",
  "c": 1,
  "title": "Perché tutto è un oscillatore armonico",
  "see": "Una massa su una molla, un pendolo, qualsiasi corpo vicino a un minimo di energia potenziale: per piccoli spostamenti oscillano tutti con la stessa legge $x=C\\cos(\\omega_0t+\\varphi)$.",
  "why": [
   "Vicino a un minimo stabile $U'(x_0)=0$ e $U''(x_0)>0$: il potenziale è una parabola e la forza è di richiamo lineare, $F=-\\alpha x$ con $\\alpha=U''(x_0)$.",
   "L'equazione $\\ddot x+\\omega_0^2x=0$ è lineare: $\\omega_0=\\sqrt{\\alpha/m}$ dipende solo dal sistema, ampiezza e fase solo dalle condizioni iniziali."
  ],
  "exam": [
   "Impostazione: un grado di libertà $x$ e un'energia potenziale $U(x)$ con un minimo, che pongo in $x=0$. Mi interessano piccoli spostamenti.",
   "Sviluppo di Taylor: $U(x)\\simeq U(0)+U'(0)x+\\frac12U''(0)x^2$. Nel minimo $U'(0)=0$, quindi $U\\simeq U(0)+\\frac12\\alpha x^2$ con $\\alpha=U''(0)>0$.",
   "Forza: $F=-dU/dx=-\\alpha x$, di richiamo e lineare. Newton dà $m\\ddot x=-\\alpha x$, cioè $\\ddot x+\\omega_0^2x=0$ con $\\omega_0^2=\\alpha/m$.",
   "Esempi: molla, $\\alpha=k$. Pendolo, $U=mgl\\left[1-\\sqrt{1-x^2/l^2}\\right]\\simeq\\frac{mg}{2l}x^2+\\frac{mg}{8l^3}x^4$: $\\alpha=mg/l$ e $T=2\\pi\\sqrt{l/g}$. Il termine in $x^4$ dice fin dove vale l'approssimazione.",
   "Soluzione: $x=A\\cos(\\omega_0t)+B\\sin(\\omega_0t)=C\\cos(\\omega_0t+\\varphi)$, con due costanti fissate da $x_0$ e $v_0$: $A=x_0$, $B=v_0/\\omega_0$.",
   "Energia: moltiplicando l'equazione per $\\dot x$ si ha $\\frac{d}{dt}\\left(\\frac12m\\dot x^2+\\frac12\\alpha x^2\\right)=0$, quindi $E=\\frac12\\alpha C^2=\\frac12m\\omega_0^2C^2$ è costante; cinetica e potenziale si scambiano due volte per periodo.",
   "Commento: il periodo non dipende dall'ampiezza (isocronismo) e il moto è reversibile, perché anche $x(-t)$ è soluzione. Attrito e forzanti, nei capitoli successivi, rompono queste proprietà."
  ],
  "cards": [
   "1.12",
   "1.2",
   "1.7",
   "1.10"
  ],
  "lab": "1",
  "pdf": "p. 13–18"
 },
 {
  "id": "k.regimi",
  "c": 2,
  "title": "I tre regimi dello smorzato",
  "see": "La stessa massa su molla con attrito viscoso crescente: prima oscilla spegnendosi, poi torna a zero senza oscillare nel modo più rapido, infine scivola lentamente verso l'equilibrio.",
  "why": [
   "Con $x=e^{\\lambda t}$ l'equazione diventa $\\lambda^2+2\\gamma\\lambda+\\omega_0^2=0$: il segno di $\\gamma^2-\\omega_0^2$ decide se le radici sono complesse (oscillazioni) o reali (solo decadimento).",
   "L'attrito toglie energia con potenza $2\\gamma m\\dot x^2$: di più quando la massa va veloce, niente nei punti di inversione."
  ],
  "exam": [
   "Impostazione: $m\\ddot x=-\\alpha x-2\\gamma m\\dot x$, cioè $\\ddot x+2\\gamma\\dot x+\\omega_0^2x=0$: lineare, omogenea, del secondo ordine, con $[\\gamma]=\\mathrm{s^{-1}}$.",
   "Prova $x=e^{\\lambda t}$: $\\lambda_{1,2}=-\\gamma\\pm\\sqrt{\\gamma^2-\\omega_0^2}$. Ci sono tre casi, secondo il discriminante $\\gamma^2-\\omega_0^2$.",
   "Sovrasmorzato, $\\gamma>\\omega_0$: radici reali, entrambe negative perché $\\sqrt{\\gamma^2-\\omega_0^2}<\\gamma$. $x=C_1e^{-|\\lambda_1|t}+C_2e^{-|\\lambda_2|t}$: niente oscillazioni, ritorno lento.",
   "Critico, $\\gamma=\\omega_0$: radice doppia $-\\gamma$, e serve una seconda soluzione indipendente, $te^{-\\gamma t}$. $x=e^{-\\gamma t}(C_1+C_2t)$: il ritorno più rapido senza oscillare, come negli ammortizzatori.",
   "Sottosmorzato, $\\gamma<\\omega_0$: radici $-\\gamma\\pm i\\omega$ con $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}$, e $x=Ae^{-\\gamma t}\\cos(\\omega t+\\varphi)$. Il periodo è più lungo di $T_0$; per $\\gamma\\ll\\omega_0$, $\\omega\\simeq\\omega_0\\left[1-\\frac12(\\gamma/\\omega_0)^2\\right]$.",
   "Energia nel sottosmorzato debole: $E\\simeq\\frac12m\\omega_0^2A^2e^{-2\\gamma t}$; istante per istante $dE/dt=-2\\gamma m\\dot x^2$, nulla nei punti di inversione e massima a velocità massima.",
   "Commento: il termine dissipativo rompe la simmetria $t\\to-t$: il processo non è reversibile e definisce una freccia del tempo."
  ],
  "cards": [
   "2.2",
   "2.3",
   "2.4",
   "2.5",
   "2.11"
  ],
  "lab": "2",
  "pdf": "p. 18–21"
 },
 {
  "id": "k.risonanza",
  "c": 3,
  "title": "Risonanza e fase",
  "see": "Un oscillatore smorzato spinto da una forza armonica. Dopo un transitorio vibra alla frequenza della forza, con un'ampiezza enorme se questa è vicina alla frequenza propria.",
  "why": [
   "La soluzione è l'omogenea, che si spegne in $\\tau=1/\\gamma$, più la particolare a regime $B\\cos(\\omega_Ft+\\varphi)$: $B$ e $\\varphi$ dipendono dalla forzante, non dalle condizioni iniziali.",
   "In risonanza lo spostamento è in ritardo di $\\pi/2$: la forza è in fase con la velocità e compie sempre lavoro positivo, come la spinta data al momento giusto all'altalena."
  ],
  "exam": [
   "Impostazione: $\\ddot x+2\\gamma\\dot x+\\omega_0^2x=\\frac{F_0}{m}\\cos(\\omega_Ft)$, lineare non omogenea. Soluzione generale = generale dell'omogenea + una particolare.",
   "Transitorio: l'omogenea $Ae^{-\\gamma t}\\cos(\\omega t+\\varphi_1)$ si spegne in $\\tau=1/\\gamma$. A regime resta $x_p=B\\cos(\\omega_Ft+\\varphi)$.",
   "Metodo complesso: $z_p=Be^{i(\\omega_Ft+\\varphi)}$, con $\\dot z=i\\omega_Fz$ e $\\ddot z=-\\omega_F^2z$. Sostituendo: $\\omega_0^2-\\omega_F^2+2i\\gamma\\omega_F=\\frac{F_0}{Bm}e^{-i\\varphi}$.",
   "Parte reale e immaginaria: $\\omega_0^2-\\omega_F^2=\\frac{F_0}{Bm}\\cos\\varphi$ e $2\\gamma\\omega_F=-\\frac{F_0}{Bm}\\sin\\varphi$. Il rapporto dà $\\tan\\varphi=\\frac{2\\gamma\\omega_F}{\\omega_F^2-\\omega_0^2}$, la somma dei quadrati $B=\\frac{F_0}{m\\sqrt{(\\omega_0^2-\\omega_F^2)^2+4\\gamma^2\\omega_F^2}}$.",
   "Curva di risonanza: per $\\omega_F=\\omega_0$, $B=\\frac{F_0}{2m\\gamma\\omega_0}$, che diverge per $\\gamma\\to0$; più grande è $\\gamma$, più il picco è basso e largo. Lontano dal picco: $B\\to F_0/(m\\omega_0^2)$ per forzante lenta, $B\\to0$ per forzante veloce.",
   "Fase: $\\sin\\varphi<0$ sempre, quindi $\\varphi$ va da $0$ (forzante lenta) a $-\\pi/2$ (risonanza) a $-\\pi$ (forzante veloce). Gli appunti scrivono $\\pm\\pi/2$: il segno giusto è il meno.",
   "Energia a regime: $E=\\frac12mB^2\\left[\\omega^2\\sin^2(\\omega t+\\varphi)+\\omega_0^2\\cos^2(\\omega t+\\varphi)\\right]$. È costante solo in risonanza, $E=\\frac12m\\omega_0^2B^2$: lì la forzante rimpiazza istante per istante ciò che l'attrito dissipa."
  ],
  "cards": [
   "3.3",
   "3.4",
   "3.5",
   "3.6",
   "3.7"
  ],
  "lab": "3",
  "pdf": "p. 22–24"
 },
 {
  "id": "k.modi",
  "c": 4,
  "title": "Modi normali e battimenti",
  "see": "Due pendoli uguali uniti da una molla. Se ne sposti uno solo, oscilla, si ferma quasi del tutto mentre l'altro parte, poi tutto ricomincia: l'energia passa avanti e indietro.",
  "why": [
   "Le equazioni sono accoppiate, ma la somma e la differenza delle posizioni oscillano ciascuna di moto armonico: sono i modi normali, a pendolo ($\\omega_a$) e a respiro ($\\omega_b$).",
   "Ogni moto è una combinazione dei due modi. Con $\\omega_a\\simeq\\omega_b$ la somma di due coseni vicini dà i battimenti."
  ],
  "exam": [
   "Equazioni, piccole oscillazioni: $m\\ddot x_1=-\\frac{mg}{l}x_1-k(x_1-x_2)$ e $m\\ddot x_2=-\\frac{mg}{l}x_2-k(x_2-x_1)$. Sono accoppiate dal termine della molla.",
   "Disaccoppiamento: sommando e sottraendo, $u_a=x_1+x_2$ e $u_b=x_1-x_2$ soddisfano $\\ddot u_a+\\frac gl u_a=0$ e $\\ddot u_b+\\left(\\frac gl+\\frac{2k}{m}\\right)u_b=0$.",
   "Modi: a pendolo $x_1=x_2$, la molla non lavora, $\\omega_a=\\sqrt{g/l}$; a respiro $x_1=-x_2$, la molla è deformata di $2x_1$, $\\omega_b=\\sqrt{g/l+2k/m}$. In un modo tutte le parti oscillano con la stessa $\\omega$.",
   "Moto generale: $x_{1,2}=C_a\\cos(\\omega_at+\\varphi_a)\\pm C_b\\cos(\\omega_bt+\\varphi_b)$, con quattro costanti dalle condizioni iniziali. Non è armonico: contiene due frequenze.",
   "Esempio: $x_1(0)=X$, $x_2(0)=0$, da fermi. È metà modo a pendolo più metà modo a respiro: $x_1=\\frac X2[\\cos\\omega_at+\\cos\\omega_bt]$, $x_2=\\frac X2[\\cos\\omega_at-\\cos\\omega_bt]$.",
   "Battimenti, con la prostaferesi: $x_1=X\\cos\\left(\\frac{\\omega_a+\\omega_b}{2}t\\right)\\cos\\left(\\frac{\\omega_a-\\omega_b}{2}t\\right)$, un'oscillazione veloce dentro un inviluppo lento. Con $k\\ll mg/l$ l'inviluppo è molto lento e l'ampiezza torna massima ogni $\\frac{2\\pi}{|\\omega_a-\\omega_b|}$.",
   "Generalizzazione: $n$ gradi di libertà, $n$ modi normali e $n$ frequenze; due masse su corda danno $\\omega^2=T_0/(ma)$ e $3T_0/(ma)$. Il continuo ne ha infiniti."
  ],
  "cards": [
   "4.2",
   "4.3",
   "4.4",
   "4.5",
   "4.12"
  ],
  "lab": "4",
  "pdf": "p. 1–4"
 },
 {
  "id": "k.continuo",
  "c": 4,
  "title": "Dalla collana di perle a D'Alembert",
  "see": "Una fila di masse uguali su una corda tesa. Se le masse diventano infinite e infinitamente vicine, la fila diventa una corda continua, e le equazioni di Newton diventano l'equazione d'onda.",
  "why": [
   "Ogni massa è tirata dalle due vicine: la forza dipende da quanto sporge rispetto alla media delle vicine. Nel continuo questa differenza diventa la curvatura $\\partial^2y/\\partial x^2$.",
   "La curvatura della corda decide l'accelerazione di ogni punto: $\\frac{\\partial^2y}{\\partial t^2}=\\frac{T_0}{\\rho_L}\\frac{\\partial^2y}{\\partial x^2}$."
  ],
  "exam": [
   "Modello: masse $m$ a passo $a$ su una corda con tensione $T_0$; piccoli spostamenti trasversali, $y_i/a\\ll1$, quindi $\\sin\\theta\\simeq\\tan\\theta$ e conta solo la componente verticale della tensione.",
   "Forza sulla massa $i$: $F_i=-\\frac{T_0}{a}(y_i-y_{i-1})-\\frac{T_0}{a}(y_i-y_{i+1})$, da cui $\\ddot y_i=-\\frac{T_0}{ma}\\left[2y_i-y_{i-1}-y_{i+1}\\right]$.",
   "Limite continuo: $y_i\\to y(x)$, $y_{i\\pm1}\\to y(x\\pm a)$, con $a\\ll\\lambda$. Taylor al secondo ordine: $y(x\\pm a)\\simeq y\\pm a\\,y'+\\frac12a^2y''$.",
   "I termini in $y$ e in $y'$ si cancellano: $2y-y(x-a)-y(x+a)\\simeq-a^2y''$. Quindi $\\ddot y=\\frac{T_0a}{m}\\,y''$.",
   "Con $\\rho_L=m/a$, densità lineare che resta fissa nel limite: $\\frac{\\partial^2y}{\\partial t^2}=\\frac{T_0}{\\rho_L}\\frac{\\partial^2y}{\\partial x^2}$, l'equazione di D'Alembert.",
   "Dimensioni: $\\left[\\frac{T_0}{\\rho_L}\\right]=\\frac{\\mathrm N}{\\mathrm{kg/m}}=\\mathrm{m^2/s^2}$, quindi $v=\\sqrt{T_0/\\rho_L}$ è una velocità: quella con cui viaggia la perturbazione.",
   "Commento: l'equazione è lineare e omogenea, quindi vale la sovrapposizione; da $n$ gradi di libertà con $n$ modi si passa a infiniti modi normali."
  ],
  "cards": [
   "4.8",
   "4.14",
   "4.9",
   "5.1"
  ],
  "lab": "5",
  "pdf": "p. 3–6"
 },
 {
  "id": "k.stazionarie",
  "c": 5,
  "title": "Onde stazionarie e modi della corda",
  "see": "Una corda fissata ai due estremi vibra in forme precise: un ventre, due, tre… Alcuni punti, i nodi, restano sempre fermi, e la forma si gonfia e si sgonfia senza avanzare.",
  "why": [
   "Separando le variabili, la forma $y(x)$ obbedisce a un oscillatore armonico nello spazio, $y''+k^2y=0$ con $k=\\omega/v$. Gli estremi fissi lasciano solo $k_n=n\\pi/L$.",
   "Ogni modo è la somma di due onde uguali che viaggiano in versi opposti e interferiscono."
  ],
  "exam": [
   "Cerco i modi normali: $\\psi(x,t)=y(x)\\cos(\\omega t+\\varphi)$, tutti i punti con la stessa $\\omega$. Sostituendo in D'Alembert: $y''+k^2y=0$, con $k^2=\\omega^2/v^2$.",
   "Soluzione: $y=A\\cos(kx)+B\\sin(kx)$. Condizioni al contorno $y(0)=0$ e $y(L)=0$: la prima elimina il coseno, la seconda impone $\\sin(kL)=0$.",
   "Quantizzazione: $k_n=\\frac{n\\pi}{L}$, $\\lambda_n=\\frac{2L}{n}$ ($\\lambda_1=2L$, $\\lambda_2=L$), $\\nu_n=\\frac{nv}{2L}$. Solo valori discreti, non tutte le $\\lambda<2L$.",
   "Nodi: $\\sin(k_nx)=0$ in $x=mL/n$, quindi il modo $n$ ha $n-1$ nodi interni. Gli altri punti oscillano tutti con la stessa legge temporale e ampiezza $A_n\\sin(k_nx)$.",
   "Soluzione generale: $\\psi=\\sum_nA_n\\sin(k_nx)\\cos(\\omega_nt+\\varphi_n)$, con $A_n$ e $\\varphi_n$ dalla forma e dalla velocità iniziali della corda.",
   "Significato: per la prostaferesi $A\\sin(kx)\\cos(\\omega t)=\\frac A2[\\sin(kx+\\omega t)+\\sin(kx-\\omega t)]$, due progressive opposte di ampiezza $A/2$. Per questo $v=\\omega/k$ è la velocità di propagazione.",
   "Commento: le due progressive portano potenze uguali e opposte, quindi in media un'onda stazionaria non trasporta energia: l'energia resta intrappolata tra gli estremi."
  ],
  "cards": [
   "5.5",
   "5.6",
   "5.7",
   "5.8",
   "5.15"
  ],
  "lab": "5",
  "pdf": "p. 6–9"
 },
 {
  "id": "k.potenza",
  "c": 5,
  "title": "L'energia che viaggia con l'onda",
  "see": "Un'onda su una corda sposta energia senza spostare materia: ogni pezzo di corda va su e giù, ma tira il pezzo vicino e gli cede lavoro.",
  "why": [
   "Il tratto di sinistra esercita su quello di destra la forza trasversale $-T_0\\,\\partial\\psi/\\partial x$; moltiplicata per la velocità $\\partial\\psi/\\partial t$ dà la potenza.",
   "Per un'onda progressiva $\\partial_t\\psi=-v\\,\\partial_x\\psi$: la potenza è sempre positiva e viaggia con l'onda, come una funzione di $x-vt$."
  ],
  "exam": [
   "Forza trasversale: con piccole pendenze, il tratto a sinistra di $x$ tira con $T_\\psi=-T_0\\sin\\theta\\simeq-T_0\\,\\partial\\psi/\\partial x$.",
   "Potenza: $dL=T_\\psi\\,d\\psi$, quindi $P(x,t)=-T_0\\frac{\\partial\\psi}{\\partial x}\\frac{\\partial\\psi}{\\partial t}$. È nulla dove la corda è orizzontale (creste) e massima dove la pendenza è massima.",
   "Onda progressiva: $\\partial_t\\psi=-v\\,\\partial_x\\psi$ dà $P=T_0v(\\partial_x\\psi)^2=\\frac{T_0}{v}(\\partial_t\\psi)^2\\ge0$; attenzione, il passaggio a matita di p. 11 mette $T_0v$ davanti a $(\\partial_t\\psi)^2$, sbagliato. Per la regressiva $P\\le0$: l'energia va verso $-x$.",
   "Onda armonica $\\psi=A\\sin(kx-\\omega t)$: $P=T_0A^2k\\omega\\cos^2(kx-\\omega t)$, sempre positiva e funzione di $x-vt$.",
   "Media su un ciclo, con $\\langle\\cos^2\\rangle=\\frac12$: $\\langle P\\rangle=\\frac12T_0A^2k\\omega=\\frac12\\sqrt{T_0\\rho_L}\\,\\omega^2A^2=\\frac12\\rho_Lv\\,\\omega^2A^2$.",
   "Commento: un'onda armonica infinita porterebbe energia infinita, è un'idealizzazione, e per questo si usa la potenza media. La stessa formula serve per le perdite radiative (p. 12) e per il bilancio alla giunzione di due corde (p. 72)."
  ],
  "cards": [
   "5.9",
   "5.10",
   "5.18",
   "5.11",
   "5.19"
  ],
  "lab": "5",
  "pdf": "p. 10–12"
 },
 {
  "id": "k.rt",
  "c": 6,
  "title": "Riflessione e trasmissione su corda",
  "see": "Un impulso corre su una corda e incontra il nodo con una corda di densità diversa: una parte torna indietro, una parte passa. Il riflesso può tornare dritto o capovolto.",
  "why": [
   "Alla giunzione valgono due condizioni: la corda non si spezza (continuità) e la potenza in arrivo si divide tra riflessa e trasmessa (energia).",
   "La frequenza resta la stessa, ma $v=\\sqrt{T/\\rho}$ cambia, quindi cambia $k$: è il rapporto tra i $k$ a decidere quanto si riflette."
  ],
  "exam": [
   "Impostazione: due corde semi-infinite con densità $\\rho_1$ e $\\rho_2$ e la stessa tensione $T$ (equilibrio della giunzione), giunzione in $x=0$, onda armonica incidente da sinistra.",
   "Onde: $\\psi_i=\\psi_{0i}\\cos(k_1x-\\omega t)$, $\\psi_r=\\psi_{0r}\\cos(k_1x+\\omega t)$, $\\psi_t=\\psi_{0t}\\cos(k_2x-\\omega t)$. Stessa $\\omega$, altrimenti la continuità non varrebbe a ogni istante.",
   "Continuità in $x=0$: $\\psi_{0i}+\\psi_{0r}=\\psi_{0t}$, cioè $1+r=t$. Energia: la potenza è $\\propto T\\psi_0^2k\\omega$, quindi $\\psi_{0i}^2k_1=\\psi_{0r}^2k_1+\\psi_{0t}^2k_2$, cioè $k_1=r^2k_1+t^2k_2$.",
   "Soluzione: con $r=t-1$ si ottiene $t\\left[t(k_1+k_2)-2k_1\\right]=0$. Scarto $t=0$, che non avrebbe senso fisico, e trovo $t=\\frac{2k_1}{k_1+k_2}$, $r=\\frac{k_1-k_2}{k_1+k_2}$.",
   "Con le densità, $k=\\frac{2\\pi\\nu}{\\sqrt T}\\sqrt\\rho$: $r=\\frac{\\sqrt{\\rho_1}-\\sqrt{\\rho_2}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}$, $t=\\frac{2\\sqrt{\\rho_1}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}$. Sempre $t>0$; $r<0$ (riflesso capovolto, sfasamento $\\pi$) se $\\rho_1<\\rho_2$.",
   "Energia: $R=r^2$ e $T=1-R=\\frac{k_2}{k_1}t^2$. Esempio $\\rho_2=4\\rho_1$: $r=-\\frac13$, $t=\\frac23$, $R=\\frac19$, $T=\\frac89$.",
   "Casi limite: $\\rho_1=\\rho_2$ dà $r=0$, $t=1$; $\\rho_1\\ll\\rho_2$ (estremo fisso) dà $r=-1$, $t=0$; $\\rho_2\\ll\\rho_1$ (estremo libero) dà $r=1$, $t=2$, ma $T=\\frac{k_2}{k_1}t^2\\to0$: nessuna violazione dell'energia."
  ],
  "cards": [
   "6.1",
   "6.2",
   "6.3",
   "6.4",
   "6.7"
  ],
  "lab": "6",
  "pdf": "p. 71–74"
 },
 {
  "id": "k.timbro",
  "c": 7,
  "title": "Timbro: tono puro e suono reale",
  "see": "Un generatore elettronico che emette un LA puro a 440 Hz e un violino che suona lo stesso LA: stessa altezza, suono diverso. La differenza sta nelle armoniche.",
  "why": [
   "Un tono puro è una sola sinusoide, $\\psi=A\\cos(2\\pi\\cdot440\\,t)$: all'orecchio suona piatto e pungente.",
   "Uno strumento vibra su più modi normali insieme: la nota contiene la fondamentale $f_1$ e le armoniche $nf_1$. La struttura dello strumento le amplifica in modo diverso: questo è il timbro."
  ],
  "exam": [
   "Distinguo i due casi. Suono \"matematico\" (tono puro): una sola frequenza. Suono musicale: somma di più frequenze. Il LA di riferimento ha $f_1=440$ Hz.",
   "Un suono periodico di periodo $T_1=1/f_1$ contiene solo multipli interi di $f_1$: $\\psi(t)=\\sum_nA_n\\cos(2\\pi nf_1t+\\varphi_n)$, cioè 440, 880, 1320, 1760 Hz… (scheda 7.19).",
   "Perché multipli interi: in una canna o in una corda i modi normali hanno $f_n=n\\frac{v}{2L}$ (canna aperta–aperta, corda fissa) oppure solo armoniche dispari $(2m-1)\\frac{v}{4L}$ (canna aperta–chiusa). Lo strumento eccita più modi insieme.",
   "L'altezza percepita è fissata da $f_1$; il timbro dall'insieme delle ampiezze $A_n$. Stessa nota su strumenti diversi: stessa $f_1$, $A_n$ diverse.",
   "La forma d'onda nel tempo non è più una sinusoide, ma il periodo resta $T_1$: per il LA si ripete identica ogni 2,27 ms.",
   "Caso limite: tono puro, solo $A_1\\ne0$. Confronto: una canna aperta–chiusa ha solo armoniche dispari, quindi un timbro diverso da una canna aperta–aperta con la stessa fondamentale."
  ],
  "cards": [
   "7.19",
   "7.16",
   "7.17"
  ],
  "lab": "7",
  "pdf": "p. 75–76"
 },
 {
  "id": "k.dB",
  "c": 7,
  "title": "Decibel: attenuazione geometrica e assorbimento",
  "see": "Il livello sonoro di una sorgente che si allontana. In scala dB la parte geometrica scende come un logaritmo della distanza, l'assorbimento come una retta.",
  "why": [
   "Attenuazione geometrica: la potenza si distribuisce su una sfera di area $\\propto r^2$, quindi $I\\propto1/r^2$ e il livello cala di $20\\log_{10}(r_2/r_1)$: $-6$ dB a ogni raddoppio della distanza.",
   "Assorbimento (Lambert–Beer): ogni metro toglie la stessa frazione di intensità, $I\\propto e^{-\\alpha r}$. Il logaritmo di un esponenziale è lineare: si perdono $\\beta=10\\log_{10}(e)\\,\\alpha\\simeq4{,}34\\,\\alpha$ dB al metro."
  ],
  "exam": [
   "Imposto: sorgente puntiforme di potenza $P$ che emette nell'angolo solido $\\Omega$, mezzo con coefficiente di assorbimento $\\alpha$. Intensità: $I(r)=\\frac{P}{\\Omega r^2}e^{-\\alpha r}$.",
   "Passo ai dB con $L=10\\log_{10}(I/I_0)$, $I_0=10^{-12}\\ \\mathrm{W/m^2}$. Il logaritmo trasforma il prodotto in una somma: $L=10\\log_{10}\\frac{P}{\\Omega r^2I_0}+10\\log_{10}e^{-\\alpha r}$.",
   "Primo termine, $L(r)$: geometria. Tra $r_1$ e $r_2$ cambia di $-20\\log_{10}(r_2/r_1)$: $-6{,}0$ dB raddoppiando, $-20$ dB decuplicando. Cala col logaritmo di $r$.",
   "Secondo termine: $10\\log_{10}e^{-\\alpha r}=-10\\log_{10}(e)\\,\\alpha r=-\\beta r$. Cala linearmente con $r$, con $\\beta\\simeq4{,}34\\,\\alpha$ in dB/m. Risultato: $L=L(r)-\\beta r$.",
   "Confronto con numeri di esempio: $\\alpha=10^{-3}\\ \\mathrm{m^{-1}}$, cioè $\\beta\\simeq4{,}3\\cdot10^{-3}$ dB/m. Da 10 m a 1000 m la geometria toglie 40 dB, l'assorbimento circa 4 dB. Da 1 km a 10 km la geometria toglie altri 20 dB, l'assorbimento circa 39 dB: a grandi distanze vince l'assorbimento.",
   "Origine fisica dell'assorbimento: urti tra molecole e viscosità trasformano lentamente l'energia meccanica del suono in calore. Più il mezzo è denso o viscoso, più $\\alpha$ è grande.",
   "Errori da evitare: usare 10 invece di 20 per la distanza, oppure 20 invece di 10 per $\\beta$; confondere l'$I_0$ di Lambert–Beer (intensità iniziale) con la soglia $10^{-12}\\ \\mathrm{W/m^2}$."
  ],
  "cards": [
   "7.18",
   "7.15",
   "7.14",
   "7.13"
  ],
  "lab": "7b",
  "pdf": "p. 78–79"
 },
 {
  "id": "k.cherenkov",
  "c": 9,
  "title": "Effetto Cherenkov",
  "see": "Una particella carica attraversa l'acqua più veloce della luce in acqua: si lascia dietro un cono di luce blu, come un aereo supersonico si lascia dietro il cono di Mach.",
  "why": [
   "Ogni punto della traiettoria emette un'onda luminosa che viaggia a $c/n$. Se la particella va più veloce ($v>c/n$), le onde restano indietro e il loro inviluppo è un cono.",
   "È la stessa geometria del boom sonico: al posto della velocità del suono c'è la velocità della luce nel mezzo, $c/n$."
  ],
  "exam": [
   "Parto dal cono di Mach. Chiamo $c_s$ la velocità del suono: in un tempo $t$ la sorgente avanza di $v_St$, il fronte emesso all'inizio ha raggio $c_st$. Il fronte d'urto è la tangente comune: $\\sin\\theta=c_s/v_S$ (scheda 9.5).",
   "Analogo ottico: in un mezzo trasparente di indice $n$ la luce viaggia a $c/n<c$. Una particella carica con $c/n<v<c$ è \"supersonica\" per la luce, senza violare la relatività ($v<c$).",
   "Sostituisco $c_s\\to c/n$ e $v_S\\to v$: $\\sin\\alpha=\\frac{c}{nv}$ (scheda 9.6).",
   "Soglia: il cono esiste solo se $\\sin\\alpha<1$, cioè $v>c/n$. In acqua ($n=1{,}33$) serve $v>0{,}75\\,c$.",
   "Andamento: alla soglia $\\alpha=90°$; al crescere di $v$ il cono si stringe e per $v\\to c$ si ha $\\sin\\alpha\\to1/n$, in acqua $\\alpha\\approx49°$.",
   "Si osserva un'intensa luce blu o ultravioletta (un'onda d'urto luminosa). Attenzione all'angolo: spesso si usa l'angolo $\\vartheta$ tra traiettoria e direzione della luce, con $\\cos\\vartheta=c/(nv)$: è il complementare di $\\alpha$."
  ],
  "cards": [
   "9.6",
   "9.5"
  ],
  "lab": "9",
  "pdf": "p. 81"
 },
 {
  "id": "k.array",
  "c": 11,
  "title": "Schiera di 4 antenne",
  "see": "Quattro antenne radio in fila, alimentate in fase, a distanza $d=\\lambda/2$. Il diagramma polare di potenza ha un lobo principale stretto davanti e dietro la schiera, zeri a $\\pm30°$ e $\\pm90°$ dalla normale e piccoli lobi in mezzo.",
  "why": [
   "Nella direzione $\\theta$ (dalla normale alla schiera) due antenne vicine sono sfasate di $\\varphi=kd\\sin\\theta=\\pi\\sin\\theta$. I quattro fasori si sommano bene solo vicino a $\\theta=0$.",
   "Più antenne si aggiungono, più è facile che i fasori si cancellino lontano da $\\theta=0$: il lobo si stringe e la schiera diventa direzionale. È il principio delle stazioni radio trasmittenti e riceventi."
  ],
  "exam": [
   "Imposto: $N=4$ sorgenti coerenti e in fase, passo $d=\\lambda/2$, campo lontano, $\\theta$ misurato dalla normale. $I(\\theta)=I_0\\left[\\frac{\\sin(N\\pi d\\sin\\theta/\\lambda)}{\\sin(\\pi d\\sin\\theta/\\lambda)}\\right]^2=I_0\\left[\\frac{\\sin(2\\pi\\sin\\theta)}{\\sin(\\frac\\pi2\\sin\\theta)}\\right]^2$.",
   "Massimi principali: $d\\sin\\theta=n\\lambda\\Rightarrow\\sin\\theta=2n$. Con $|\\sin\\theta|\\le1$ resta solo $n=0$: $\\theta=0$ e $\\theta=\\pi$ (davanti e dietro), con $I=N^2I_0=16I_0$.",
   "Minimi: $d\\sin\\theta=n'\\lambda/N\\Rightarrow\\sin\\theta=n'/2$, con $n'\\ne0,\\pm4,\\dots$ e $|n'|\\le2$: $n'=\\pm1,\\pm2$. Quindi $\\sin\\theta=\\pm\\frac12$ e $\\pm1$, cioè $\\theta=\\pm\\frac\\pi6=\\pm30°$ e $\\theta=\\pm\\frac\\pi2=\\pm90°$.",
   "Errore degli appunti (p. 50): $\\arcsin\\frac12=\\frac\\pi6$, non $\\frac\\pi3$. Il valore $\\frac\\pi3=60°$ è la stessa direzione misurata dall'asse della schiera (la retta su cui stanno le antenne): $90°-30°=60°$. All'esame dichiara sempre da dove misuri l'angolo.",
   "Tra $30°$ e $90°$ c'è un lobo secondario per lato, con picco a $\\sin\\theta\\simeq0{,}73$ ($\\theta\\approx47°$) e intensità $\\approx1{,}19\\,I_0$: circa il 7% del principale. In generale tra due massimi principali ci sono $N-1$ minimi e $N-2$ massimi secondari.",
   "Diagramma polare: antenne sull'asse $y$; per ogni $\\theta$ si disegna un raggio lungo $I(\\theta)$. Risultano due grandi lobi lungo l'asse orizzontale ($0$ e $\\pi$) e piccoli lobi vicino all'origine.",
   "Direzionalità: il primo zero è a $\\sin\\theta=\\lambda/(Nd)=2/N$. $N=2$: $90°$ (nessuna direzionalità, è Young con $d=\\lambda/2$); $N=4$: $30°$; $N=8$: $14{,}5°$; $N=16$: $7{,}2°$. Il lobo si stringe come $1/N$ mentre il picco cresce come $N^2$."
  ],
  "cards": [
   "11.15",
   "11.8",
   "11.9",
   "11.18"
  ],
  "lab": "11b",
  "pdf": "p. 49–50"
 },
 {
  "id": "k.airy",
  "c": 11,
  "title": "Disco di Airy e criterio di Rayleigh",
  "see": "La luce di una stella, dopo un'apertura circolare di diametro $D$, non dà un punto ma un dischetto luminoso con anelli: il disco di Airy. Due stelle troppo vicine danno dischi che si sovrappongono.",
  "why": [
   "Diffrazione: ogni punto dell'apertura è una sorgente secondaria e la loro interferenza dà $I=I_0[2J_1(x)/x]^2$, con $x=\\frac{kD}2\\sin\\theta$.",
   "Il primo zero di $J_1$ è a $x=3{,}832$: da lì il raggio angolare del disco, $\\theta\\simeq1{,}22\\lambda/D$. È il limite di risoluzione dello strumento."
  ],
  "exam": [
   "Imposto: onda piana su un'apertura circolare di diametro $D$, campo lontano (Fraunhofer). È l'analogo 2D della fenditura: al posto della sinc c'è $2J_1(x)/x$, con $J_1$ funzione di Bessel di ordine 1.",
   "Raggio del disco: primo zero, $\\frac{2\\pi}\\lambda\\frac D2\\sin\\theta=3{,}832\\Rightarrow\\sin\\theta=\\frac{3{,}832}{\\pi}\\frac\\lambda D\\simeq1{,}22\\frac\\lambda D$. Per angoli piccoli $\\theta_R\\simeq1{,}22\\lambda/D$.",
   "Criterio di Rayleigh: due sorgenti sono appena distinguibili se il massimo dell'una cade sul primo minimo dell'altra, cioè se distano almeno $\\theta_R$. $D$ più grande dà un disco più piccolo e risoluzione migliore.",
   "Esempio Hubble: $D=2{,}4$ m, $\\lambda=500$ nm. $\\theta_R=1{,}22\\cdot5\\cdot10^{-7}/2{,}4\\simeq2{,}5\\cdot10^{-7}$ rad $\\simeq0{,}05$ arcsec (1 rad = 206 265 arcsec). Gli appunti usano $\\lambda=400$ nm e trovano $2\\cdot10^{-7}$ rad $\\simeq0{,}04$ arcsec.",
   "Sul rivelatore nel piano focale: $x=\\theta f=1{,}22\\lambda f/D$. Con $f=58$ m: $x\\simeq15\\ \\mu$m a 500 nm (12 μm a 400 nm), come la dimensione di un pixel.",
   "Dettaglio minimo a distanza $L$: $\\Delta s=L\\,\\theta_R$. Da 560 km di quota Hubble separa due punti distanti circa 14 cm (a 500 nm).",
   "Perché nello spazio: a terra l'atmosfera limita a 0,2–0,3 arcsec, cioè 4–6 volte peggio dei 0,05 arcsec di Hubble (gli appunti dicono \"fattore 100\", ma in angolo non è così). Per questo si scelgono siti speciali, si usano ottiche attive o si va nello spazio."
  ],
  "cards": [
   "11.4",
   "11.5",
   "11.6",
   "11.20"
  ],
  "lab": "11",
  "pdf": "p. 44–46"
 },
 {
  "id": "k.missing",
  "c": 11,
  "title": "Ordini mancanti nella doppia fenditura",
  "see": "Doppia fenditura con $d=3{,}5a$: frange fitte di interferenza dentro un inviluppo largo di diffrazione. Alcune frange spariscono perché cadono proprio su uno zero dell'inviluppo.",
  "why": [
   "L'intensità è un prodotto, $I=4I_0'\\,\\mathrm{sinc}^2(\\pi a\\sin\\theta/\\lambda)\\cos^2(\\pi d\\sin\\theta/\\lambda)$: dove il fattore di diffrazione è zero, nessuna interferenza può riaccendere la luce.",
   "Il massimo di ordine $n$ ($d\\sin\\theta=n\\lambda$) coincide con lo zero $m$ ($a\\sin\\theta=m\\lambda$) quando $n/m=d/a$."
  ],
  "exam": [
   "Scrivo la figura: interferenza ($\\cos^2$, passo $d$) modulata dalla diffrazione ($\\mathrm{sinc}^2$, larghezza $a<d$). Uso la variabile $u=d\\sin\\theta/\\lambda$: i massimi di interferenza sono a $u=n$ intero.",
   "Zeri di diffrazione: $a\\sin\\theta=m\\lambda$, cioè $u=m\\,d/a=3{,}5\\,m$ con $m=\\pm1,\\pm2,\\dots$: a $u=3{,}5;\\ 7;\\ 10{,}5;\\ 14;\\dots$",
   "Ordine mancante: $n=m\\,d/a$ intero. $3{,}5m$ è intero solo per $m$ pari: mancano gli ordini $\\pm7,\\pm14,\\pm21,\\dots$",
   "Lobo centrale di diffrazione: $|u|<3{,}5$. Ci sono gli ordini $n=0,\\pm1,\\pm2,\\pm3$: 7 frange. Il primo zero ($u=3{,}5$) cade a metà tra gli ordini 3 e 4, che restano presenti ma molto deboli.",
   "Altezze relative, $\\mathrm{sinc}^2(\\pi n/3{,}5)$: ordine 1 circa 0,76, ordine 2 circa 0,29, ordine 3 circa 0,03 dell'ordine 0. Nel primo lobo laterale ($3{,}5<u<7$) ci sono gli ordini 4, 5, 6: 3 frange; l'ordine 7 manca.",
   "Regola generale: se $d/a$ non è intero, nel lobo centrale ci sono $2\\lfloor d/a\\rfloor+1$ frange; se $d/a=k$ è intero, gli ordini $\\pm k$ cadono sugli zeri e le frange sono $2k-1$.",
   "Vale lo stesso per il reticolo di $N$ fenditure: l'inviluppo è lo stesso $\\mathrm{sinc}^2$ e gli ordini mancanti sono gli stessi."
  ],
  "cards": [
   "11.16",
   "11.7",
   "11.10"
  ],
  "lab": "11",
  "pdf": "p. 46–47, 50–51"
 },
 {
  "id": "k.huygens",
  "c": 12,
  "title": "Principio di Huygens–Fresnel",
  "see": "Un fronte d'onda avanza: ogni suo punto emette una piccola onda sferica e il nuovo fronte è la superficie che le tocca tutte, il loro inviluppo.",
  "why": [
   "Le ondine secondarie hanno la stessa frequenza e la stessa velocità dell'onda (ereditano $\\nu$, $v$, $k$, $\\lambda$); la loro interferenza ricostruisce il fronte successivo.",
   "Kirchhoff (fine '800) lo dimostra matematicamente e mostra che le ondine irradiano in avanti: non esiste un fronte che torna indietro."
  ],
  "exam": [
   "Fronte d'onda: luogo dei punti con la stessa fase. Onda piana: $\\hat u\\cdot\\vec r-vt=$ cost (piani perpendicolari a $\\hat u$); onda sferica: $r-vt=$ cost (sfere). I raggi sono perpendicolari ai fronti.",
   "Enunciato (Huygens, circa 1680; Fresnel, 1818): ogni punto del fronte è sorgente di un'onda sferica secondaria; dopo un tempo $\\Delta t$ ognuna ha raggio $v\\Delta t$ e il nuovo fronte è il loro inviluppo.",
   "Problema: una sfera completa avrebbe anche una metà che torna indietro, che non si osserva. Kirchhoff mostra che le ondine sono pesate da un fattore di obliquità, $K(\\chi)=\\frac12(1+\\cos\\chi)$: vale 1 in avanti e 0 all'indietro. Niente fronte regressivo.",
   "Riflessione: il fronte piano tocca la superficie in A; mentre l'estremo B percorre $\\overline{BC}=vt$, l'ondina da A raggiunge il raggio $\\overline{AD}=vt$. I triangoli ABC e ADC hanno l'ipotenusa AC in comune, un angolo retto e $\\overline{BC}=\\overline{AD}$: sono uguali, quindi $\\theta_i=\\theta_r$.",
   "Rifrazione: nello stesso tempo $t$, $\\overline{BC}=v_1t$ nel mezzo 1 e $\\overline{AD}=v_2t$ nel mezzo 2. Con $\\overline{BC}=\\overline{AC}\\sin\\theta_i$ e $\\overline{AD}=\\overline{AC}\\sin\\theta_t$: $\\frac{\\sin\\theta_i}{\\sin\\theta_t}=\\frac{v_1}{v_2}$, cioè $n_1\\sin\\theta_i=n_2\\sin\\theta_t$.",
   "Lo stesso principio spiega la diffrazione: la fenditura è un insieme di infinite sorgenti secondarie. Conferma storica: il punto luminoso al centro dell'ombra di un disco, previsto da Poisson come obiezione a Fresnel e poi osservato.",
   "Attenzione agli appunti (p. 69): nella riflessione è scritto $\\overline{BC}=\\overline{AB}$; l'uguaglianza giusta è $\\overline{BC}=\\overline{AD}$."
  ],
  "cards": [
   "12.14",
   "12.15",
   "8.6"
  ],
  "lab": "12b",
  "pdf": "p. 56, 67–69"
 },
 {
  "id": "k.parabolic",
  "c": 12,
  "title": "Specchi parabolici e telescopi riflettori",
  "see": "Raggi paralleli all'asse su uno specchio sferico: quelli vicini all'asse si incontrano nel fuoco $r/2$, quelli lontani un po' più vicino allo specchio. Con uno specchio parabolico si incontrano tutti nello stesso punto.",
  "why": [
   "La formula $\\frac1p+\\frac1q=\\frac2r$ usa angoli piccoli (raggi parassiali): per i raggi lontani dall'asse non vale e il fuoco si allarga in una macchia, l'aberrazione sferica.",
   "La parabola è la curva che, per costruzione, manda nel fuoco ogni raggio parallelo all'asse."
  ],
  "exam": [
   "Specchio sferico: dai triangoli e da $\\theta_i=\\theta_r$ si ha $\\alpha_1+\\alpha_2=2\\beta$; con angoli piccoli $\\alpha_1\\approx\\ell/p$, $\\alpha_2\\approx\\ell/q$, $\\beta=\\ell/r$, quindi $\\frac1p+\\frac1q=\\frac2r$ e $f=r/2$.",
   "Un raggio parallelo all'asse a quota $y$ incide con angolo $\\theta$, $\\sin\\theta=y/r$; il triangolo tra centro C, punto di incidenza e punto in cui il raggio riflesso taglia l'asse è isoscele, quindi quel punto dista $\\frac{r}{2\\cos\\theta}$ da C. Solo per $\\theta\\to0$ è il fuoco a $r/2$ dal vertice; per raggi alti è più vicino allo specchio: aberrazione sferica.",
   "Profili: la sfera vicino al vertice è $z=r-\\sqrt{r^2-y^2}\\simeq\\frac{y^2}{2r}+\\frac{y^4}{8r^3}$, la parabola con fuoco a distanza $f$ è $z=\\frac{y^2}{4f}$. Con $r=2f$ coincidono fino a $y^2$: la sfera è una buona parabola solo vicino all'asse.",
   "Rimedio: specchio parabolico, i raggi paralleli all'asse passano tutti per il fuoco senza approssimazioni. Gli appunti citano il caso di Hubble, il cui specchio primario soffriva proprio di aberrazione sferica.",
   "Perché i grandi telescopi sono riflettori: con uno specchio basta lavorare bene la superficie concava e coprirla di alluminio, mentre una lente richiede un grande vetro perfettamente omogeneo. Così si fanno aperture $D$ molto grandi, e la risoluzione $1{,}22\\lambda/D$ migliora con $D$.",
   "Inoltre con primario e secondario si \"spezza\" la focale: Hubble ha $f=58$ m in un tubo lungo circa $f/2$, un vantaggio ingegneristico. E la riflessione ($\\theta_i=\\theta_r$) non dipende da $\\lambda$: lo specchio non ha l'aberrazione cromatica delle lenti, dove $n$ dipende da $\\lambda$."
  ],
  "cards": [
   "12.16",
   "12.9",
   "11.5"
  ],
  "lab": "12",
  "pdf": "p. 45, 62–63, 66"
 },
 {
  "id": "k.fermat",
  "c": 12,
  "title": "Principio di Fermat e Maupertuis",
  "see": "Il bagnino deve raggiungere chi annega: corre sulla sabbia e poi nuota. La via più rapida non è la retta ma una spezzata, proprio come un raggio di luce che si rifrange.",
  "why": [
   "Fermat (1657): la luce va da A a B lungo il cammino che rende minimo (più in generale stazionario) il tempo. In un solo mezzo è la retta; tra due mezzi conta il tempo, non la lunghezza.",
   "Lo stesso schema vale in meccanica: con l'impulso $p$ al posto di $n$, il moto di un punto materiale rende stazionario $\\int p\\,ds$ (Maupertuis)."
  ],
  "exam": [
   "Enunciato: $t=\\int_A^B\\frac{ds}{v}=\\frac1c\\int_A^Bn\\,ds$, e il cammino reale rende stazionario il cammino ottico: $\\delta\\int n\\,ds=0$.",
   "Riflessione: S a quota $h$, P a quota $b$, punto O sullo specchio a distanza $x$. $t(x)=\\frac1v\\left[\\sqrt{h^2+x^2}+\\sqrt{b^2+(a-x)^2}\\right]$; $dt/dx=0$ dà $\\sin\\theta_i=\\sin\\theta_r$, quindi $\\theta_i=\\theta_r$.",
   "Rifrazione: $t(x)=\\frac{\\sqrt{h^2+x^2}}{v_1}+\\frac{\\sqrt{b^2+(a-x)^2}}{v_2}$; $dt/dx=0$ dà $\\frac{\\sin\\theta_i}{v_1}=\\frac{\\sin\\theta_t}{v_2}$, cioè $n_1\\sin\\theta_i=n_2\\sin\\theta_t$. Il bagnino fa più strada sulla sabbia, dove è più veloce.",
   "Mezzo non omogeneo: atmosfera a strati con $n$ che cresce verso il suolo (fino a 1,0003). Il raggio si incurva e il Sole al tramonto si vede anche quando è già sotto l'orizzonte.",
   "Analogia meccanica: per un punto materiale con energia fissata, la traiettoria reale rende stazionario $\\int p\\,ds$ con $p=mv$ (minima azione di Maupertuis; negli appunti è chiamata Hamilton–Jacobi). La corrispondenza è $n\\leftrightarrow p$.",
   "Sottigliezza: $n=c/v$ è grande dove la luce è lenta, $p=mv$ è grande dove la particella è veloce. Si corrispondono $n$ e $p$, non le velocità.",
   "Questi principi variazionali sono alla base della meccanica quantistica (de Broglie, Schrödinger, Feynman). Nota finale: $\\delta=0$ significa stazionario; nei casi di riflessione e rifrazione visti è un minimo."
  ],
  "cards": [
   "12.17",
   "12.18",
   "12.6"
  ],
  "lab": "12b",
  "pdf": "p. 58–61"
 },
 {
  "id": "k.diottro",
  "c": 12,
  "title": "Diottro sferico: due focali diverse",
  "see": "Una superficie sferica separa aria ($n_1$) e vetro ($n_2$). I raggi paralleli che arrivano dall'aria convergono in $F_i$ nel vetro; quelli che partono da $F_0$ nell'aria escono paralleli nel vetro. $F_0$ e $F_i$ non sono alla stessa distanza dal vertice.",
  "why": [
   "Snell lega gli angoli tramite gli indici: le distanze dalla parte del vetro contano con peso $n_2$, quelle dalla parte dell'aria con peso $n_1$.",
   "Per questo le due focali sono diverse: $f_i/f_0=n_2/n_1$ e $f_i-f_0=r$."
  ],
  "exam": [
   "Derivazione: raggio da P (nel mezzo $n_1$) al punto A della superficie, rifratto verso Q (in $n_2$). Angoli piccoli: Snell diventa $n_1\\theta_i=n_2\\theta_t$, con $\\theta_i=\\frac\\ell p+\\frac\\ell r$ e $\\theta_t=\\frac\\ell r-\\frac\\ell q$.",
   "Sostituendo: $\\frac{n_1}p+\\frac{n_2}q=\\frac{n_2-n_1}r$ (Cartesio per la rifrazione). Segni: $r>0$ se l'oggetto vede la faccia convessa; $q>0$ immagine reale dall'altra parte, $q<0$ virtuale dallo stesso lato.",
   "Fuoco oggetto: $q\\to\\infty$ ⇒ $p=f_0=\\frac{n_1}{n_2-n_1}r$. Fuoco immagine: $p\\to\\infty$ ⇒ $q=f_i=\\frac{n_2}{n_2-n_1}r$.",
   "Relazioni: $f_i-f_0=\\frac{n_2-n_1}{n_2-n_1}r=r$ e $\\frac{n_1}{f_0}=\\frac{n_2}{f_i}=\\frac{n_2-n_1}r$. Quindi $\\frac{n_1}p+\\frac{n_2}q=\\frac{n_1}{f_0}=\\frac{n_2}{f_i}$.",
   "Esempio: aria–vetro, $n_1=1$, $n_2=1{,}5$, $r=10$ cm. $f_0=\\frac{1}{0{,}5}\\cdot10=20$ cm, $f_i=\\frac{1{,}5}{0{,}5}\\cdot10=30$ cm. Controllo: $30-20=10=r$ e $\\frac1{20}=\\frac{1{,}5}{30}$.",
   "Ingrandimento: $M=-\\frac{n_1q}{n_2p}$. Casi limite: con $n_1=n_2$ il diottro sparisce ($f_0,f_i\\to\\infty$). Una lente sottile in aria è due diottri in fila: lì le focali dai due lati tornano uguali.",
   "Anche il diottro ha aberrazione sferica, perché tutto si basa su angoli piccoli."
  ],
  "cards": [
   "12.7",
   "12.8",
   "12.20",
   "12.21"
  ],
  "lab": "12",
  "pdf": "p. 63–65, 67"
 },
 {
  "id": "k.laplace",
  "c": 7,
  "title": "Velocità del suono: Newton contro Laplace",
  "see": "Due previsioni per la velocità del suono nell'aria: 280 m/s (Newton, compressioni isoterme) e 331 m/s (Laplace, compressioni adiabatiche). La misura a 0 °C dà 331 m/s.",
  "why": [
   "La velocità è $\\sqrt{\\beta/\\rho_0}$ con $\\beta=\\rho_0\\,\\partial P/\\partial\\rho$: dipende da quanto cresce la pressione quando comprimi il gas, cioè dal tipo di trasformazione.",
   "Le compressioni del suono sono rapidissime (periodi tra 50 μs e 50 ms): il calore non fa in tempo a fluire. La trasformazione è adiabatica e la pressione cresce di più: $\\beta=\\gamma P_0$ invece di $P_0$."
  ],
  "exam": [
   "Imposto: tubo sonoro, onda piana, piccole perturbazioni. $d\\rho=-\\rho_0\\,\\partial\\psi/\\partial x$ e D'Alembert $\\partial_t^2\\psi=\\frac\\beta{\\rho_0}\\partial_x^2\\psi$, quindi $v=\\sqrt{\\beta/\\rho_0}$. Serve $P(\\rho,T)$: per il gas perfetto $P=\\frac\\rho\\mu k_BT$.",
   "Variazioni attorno all'equilibrio: $\\frac{dV}{V_0}+\\frac{dP}{P_0}=\\frac{dT}{T_0}$, con $dV=V_0\\,\\partial\\psi/\\partial x$.",
   "Newton (isoterma, $dT=0$): $dP=-P_0\\,\\partial\\psi/\\partial x$, quindi $\\beta=P_0$ e $v=\\sqrt{P_0/\\rho_0}\\simeq280$ m/s. Non torna con le misure.",
   "Laplace (adiabatica, $PV^\\gamma=$ cost): $\\frac{dP}{P_0}=-\\gamma\\frac{dV}{V_0}$, $dP=-\\gamma P_0\\,\\partial\\psi/\\partial x$, $\\beta=\\gamma P_0$, $v=\\sqrt{\\gamma P_0/\\rho_0}$.",
   "Aria (biatomica): $\\gamma=7/5$, $\\sqrt{1{,}4}=1{,}183$, $v\\simeq1{,}183\\cdot280\\simeq331$ m/s, in accordo con l'esperimento.",
   "Conseguenze: insieme all'onda di pressione viaggia un'onda di temperatura (le compressioni scaldano, le rarefazioni raffreddano). E $v=\\sqrt{\\gamma k_BT/\\mu}=\\alpha\\sqrt T$ con $\\alpha\\simeq20{,}05\\ \\mathrm{m\\,s^{-1}K^{-1/2}}$: a 20 °C circa 343 m/s, indipendente dalla pressione."
  ],
  "cards": [
   "7.4",
   "7.5",
   "7.21",
   "7.22",
   "7.6"
  ],
  "lab": "7",
  "pdf": "p. 26, 28–32"
 },
 {
  "id": "k.doppler",
  "c": 9,
  "title": "Doppler: sorgente o ascoltatore?",
  "see": "Una sirena a 440 Hz e $c=340$ m/s. Se ti avvicini tu a 34 m/s senti 484 Hz; se si avvicina lei a 34 m/s senti 489 Hz. Stessa velocità relativa, frequenze diverse.",
  "why": [
   "Se si muove la sorgente cambia la lunghezza d'onda nell'aria: i fronti si schiacciano davanti, $\\lambda'=(c-v_S)/f$.",
   "Se si muove l'ascoltatore, $\\lambda$ resta la stessa ma lui incontra i fronti più spesso: velocità relativa $c+v_A$. L'aria è il riferimento privilegiato: il Doppler acustico non è invariante per Galileo."
  ],
  "exam": [
   "Imposto: velocità del suono $c$ rispetto all'aria ferma; sorgente di frequenza $f$; moti lungo la congiungente.",
   "Ascoltatore in moto: $\\lambda=c/f$ invariata, velocità dell'onda rispetto a lui $v'=c\\pm v_A$, quindi $f'=\\frac{v'}\\lambda=f\\frac{c\\pm v_A}{c}$ (+ se si avvicina).",
   "Sorgente in moto: in un periodo $T=1/f$ il fronte fa $cT$ e la sorgente $v_ST$; davanti $\\lambda'=(c-v_S)T$. L'onda viaggia sempre a $c$: $f'=\\frac{c}{\\lambda'}=f\\frac{c}{c-v_S}$; dietro si ha $c+v_S$.",
   "Caso generale: $f'=f\\frac{c\\pm v_A}{c\\mp v_S}$, segni in alto se ci si avvicina. Controllo: avvicinarsi alza sempre la frequenza.",
   "Confronto con $c=340$ m/s, $f=440$ Hz, $v=34$ m/s: ascoltatore che si avvicina 484 Hz, sorgente che si avvicina 488,9 Hz; allontanandosi 396 Hz e 400 Hz. Al primo ordine in $v/c$ coincidono: $f(1\\pm v/c)$.",
   "Casi limite: $v_A=c$ dà $2f$; $v_S=c$ dà $\\lambda'\\to0$ e $f'\\to\\infty$; per $v_S>c$ si forma il cono di Mach, $\\sin\\theta=c/v_S$.",
   "Se il moto non è lungo la congiungente si usa la componente lungo la linea visiva, $v_S\\cos\\varphi$. Attenzione agli appunti (p. 82): per l'ascoltatore in moto la velocità relativa è $c\\pm v_A$, non $c\\pm v_S$."
  ],
  "cards": [
   "9.1",
   "9.2",
   "9.3",
   "9.7",
   "9.8",
   "9.10"
  ],
  "lab": "9",
  "pdf": "p. 80–82"
 },
 {
  "id": "k.young",
  "c": 10,
  "title": "Young: coerenza e frange",
  "see": "Luce monocromatica passa per due fenditure vicine: sullo schermo lontano compaiono frange chiare e scure equidistanti, tutte della stessa altezza.",
  "why": [
   "Le due fenditure sono illuminate dalla stessa onda: sono due sorgenti coerenti, con stessa frequenza e sfasamento fisso. Sullo schermo conta solo la differenza di cammino $\\Delta r=d\\sin\\theta$.",
   "Con luce non coerente (la luce del Sole, che \"non è in fase\") lo sfasamento cambia a caso nel tempo e le frange si cancellano in media."
  ],
  "exam": [
   "Montaggio: onda piana su una fenditura, poi su due fenditure a distanza $d$ (così sono coerenti), schermo a distanza $r\\gg d$. Ipotesi: sorgenti puntiformi, luce monocromatica, si trascura la diffrazione delle singole fenditure.",
   "Raggi quasi paralleli: $\\Delta r=r_2-r_1=d\\sin\\theta$, sfasamento $\\varphi=k\\,d\\sin\\theta$.",
   "Somma delle onde sferiche $\\frac{A_0}{r_i}\\cos(kr_i-\\omega t)$: si pone $r_1\\approx r_2\\approx r$ solo nelle ampiezze, non nelle fasi. Risultato: $\\xi=\\frac{2A_0}r\\cos\\frac{k\\Delta r}2\\cos(kr-\\omega t)$.",
   "Intensità: $I(\\theta)=I_0\\cos^2\\left(\\frac{\\pi d\\sin\\theta}\\lambda\\right)$. Massimi a $d\\sin\\theta=n\\lambda$, minimi a $d\\sin\\theta=(n+\\frac12)\\lambda$.",
   "Piccoli angoli, $\\sin\\theta\\approx x/r$: interfrangia $\\Delta x=r\\lambda/d$, quindi $\\lambda=\\Delta x\\,d/r$. Le frange sono più larghe se le fenditure sono più vicine.",
   "Per avere almeno un minimo serve $\\sin\\theta=\\lambda/(2d)\\le1$, cioè $d\\ge\\lambda/2$. Con fenditure vere di larghezza $a$ le frange sono modulate dall'inviluppo $\\mathrm{sinc}^2$ (doppia fenditura).",
   "Significato (1803): l'interferenza dimostra la natura ondulatoria della luce. Attenzione agli appunti (p. 40): i minimi sono a $(n+\\frac12)\\lambda/d$, non a $\\frac n2\\frac\\lambda d$ per ogni $n$."
  ],
  "cards": [
   "10.5",
   "10.6",
   "10.7",
   "10.8",
   "10.10"
  ],
  "lab": "10",
  "pdf": "p. 38–40"
 },
 {
  "id": "k.reticolo",
  "c": 11,
  "title": "Reticolo come spettrografo",
  "see": "Luce con due colori vicini su un reticolo: in ogni ordine $n\\ne0$ compaiono due righe. Più fenditure ci sono, più le righe sono sottili e meglio si separano.",
  "why": [
   "I massimi principali sono a $d\\sin\\theta=n\\lambda$: angoli diversi per $\\lambda$ diverse (dispersione), tranne l'ordine 0.",
   "Con $N$ fenditure i massimi hanno semilarghezza $\\lambda/(Nd\\cos\\theta)$: più $N$ è grande, più sono stretti. Separare due righe vuol dire che la loro distanza angolare supera questa larghezza."
  ],
  "exam": [
   "Intensità: $I=I_{01}\\,\\mathrm{sinc}^2\\left(\\frac{\\pi a\\sin\\theta}\\lambda\\right)\\left[\\frac{\\sin(N\\pi d\\sin\\theta/\\lambda)}{\\sin(\\pi d\\sin\\theta/\\lambda)}\\right]^2$: picchi stretti di interferenza sotto l'inviluppo di diffrazione. Massimi principali a $\\sin\\theta_n=n\\lambda/d$, con $|n|\\le d/\\lambda$.",
   "Dispersione: derivo $\\sin\\theta=n\\lambda/d$ rispetto a $\\lambda$: $\\cos\\theta\\,d\\theta=\\frac nd\\,d\\lambda$, quindi $D=\\frac{d\\theta}{d\\lambda}=\\frac n{d\\cos\\theta}$. Cresce con l'ordine. Il rosso è deviato più del blu, al contrario del prisma.",
   "Larghezza: i minimi accanto al massimo di ordine $n$ hanno $\\sin\\theta=(nN\\pm1)\\frac\\lambda{Nd}$; la differenza dei seni è $\\frac{2\\lambda}{Nd}=\\cos\\theta\\,\\Delta\\theta$. Quindi $\\Delta\\theta_{HW}=\\frac\\lambda{Nd\\cos\\theta}$. Errore tipico: usare $\\Delta\\sin\\theta\\approx\\Delta\\theta$ agli ordini alti.",
   "Risoluzione (Rayleigh): due righe sono separate se $D\\,\\Delta\\lambda\\ge\\Delta\\theta_{HW}$. Con $\\Delta\\lambda=\\frac{d\\cos\\theta}n\\Delta\\theta_{HW}$ si ottiene $R=\\frac\\lambda{\\Delta\\lambda}=nN$.",
   "Esempio: doppietto del sodio, 589,0 e 589,6 nm. $R=589{,}3/0{,}6\\simeq982$: al 1° ordine servono almeno 982 fenditure illuminate, al 2° ne bastano 491.",
   "Pratica: reticoli per trasmissione o per riflessione (CD e DVD); quelli a riflessione non dipendono dal materiale attraversato. I prismi non arrivano alla stessa risoluzione dei reticoli.",
   "Compromesso: gli ordini alti danno più dispersione e più risoluzione, ma meno luce (l'inviluppo di diffrazione cala) e gli ordini di colori diversi possono sovrapporsi."
  ],
  "cards": [
   "11.11",
   "11.12",
   "11.13",
   "11.14",
   "11.19"
  ],
  "lab": "11",
  "pdf": "p. 50–54"
 },
 {
  "id": "k.snell",
  "c": 12,
  "title": "Riflessione totale e finestra di Snell",
  "see": "Dal fondo di una piscina guardi in su: vedi tutto il cielo dentro un cerchio luminoso; fuori dal cerchio la superficie fa da specchio.",
  "why": [
   "Uscendo dall'acqua verso l'aria il raggio si allontana dalla normale; oltre l'angolo critico $\\sin\\theta_c=n_2/n_1$ non c'è raggio trasmesso: riflessione totale.",
   "Al contrario, i raggi del cielo, anche quelli radenti, entrano in acqua con un angolo al massimo $\\theta_c$: tutto il cielo è compresso in un cono di apertura $2\\theta_c\\approx97°$."
  ],
  "exam": [
   "Snell: $n_1\\sin\\theta_i=n_2\\sin\\theta_t$, con angoli dalla normale; la frequenza non cambia e $\\lambda=\\lambda_0/n$.",
   "Da mezzo più denso a meno denso ($n_1>n_2$): $\\sin\\theta_t=\\frac{n_1}{n_2}\\sin\\theta_i>\\sin\\theta_i$. Il raggio trasmesso arriva a $90°$ quando $\\sin\\theta_i=n_2/n_1$: è l'angolo critico.",
   "Per $\\theta_i>\\theta_c$ niente raggio trasmesso: riflessione totale. Esiste solo se $n_2<n_1$. Valori: acqua–aria 48,8° ($n=1{,}33$), vetro–aria 41,8°, diamante–aria 24,6°. Applicazione: fibre ottiche.",
   "Visto da sotto: aria $n_1=1$, acqua $n_2=1{,}334$. Raggio radente $\\theta_i=90°$: $\\sin\\theta_t^{max}=1/1{,}334$, $\\theta_t^{max}\\simeq48{,}6°$. Apertura del cono $\\alpha=2\\theta_t^{max}\\simeq97°$ (\"optical manhole\").",
   "A profondità $h$ il cerchio ha raggio $R=h\\tan\\theta_c\\simeq1{,}13\\,h$. Fuori dal cerchio arrivano all'occhio solo raggi riflessi totalmente sotto la superficie.",
   "Errori tipici: misurare gli angoli dalla superficie; cercare l'angolo critico entrando nel mezzo più denso (non esiste); prendere $\\theta_c$ come apertura del cono invece di $2\\theta_c$."
  ],
  "cards": [
   "12.3",
   "12.4",
   "12.5",
   "12.19"
  ],
  "lab": "12",
  "pdf": "p. 57–58"
 },
 {
  "id": "k.canne",
  "c": 7,
  "title": "Canne sonore: nodi di spostamento e di pressione",
  "see": "Onde stazionarie in una canna: dove l'aria resta ferma (nodo di spostamento) la pressione oscilla al massimo; dove l'aria si muove di più la pressione resta costante.",
  "why": [
   "La pressione dipende dalla derivata dello spostamento, $dP=-\\beta\\,\\partial\\psi/\\partial x$: dove $\\psi$ è massimo la derivata è zero, e viceversa.",
   "Gli estremi fissano le condizioni: estremo aperto = ventre di spostamento (nodo di pressione), estremo chiuso = nodo di spostamento (ventre di pressione)."
  ],
  "exam": [
   "Onda stazionaria $\\psi=A\\sin(kx)\\cos(\\omega t)$. Da $dP=-\\beta\\,\\partial\\psi/\\partial x$: $dP=-\\beta kA\\cos(kx)\\cos(\\omega t)$. Nodi e ventri di pressione sono spostati di $\\lambda/4$ rispetto a quelli di spostamento.",
   "Aperta–aperta: ventri di spostamento ai due estremi, $L=n\\lambda/2$, $f_n=n\\frac v{2L}$: tutte le armoniche.",
   "Chiusa–chiusa: nodi ai due estremi, di nuovo $L=n\\lambda/2$: le stesse frequenze dell'aperta–aperta.",
   "Aperta–chiusa: un ventre e un nodo, $L=(2m-1)\\lambda/4$, $f_m=(2m-1)\\frac v{4L}$: solo armoniche dispari, fondamentale metà di quella aperta–aperta.",
   "Esempio con $L=1$ m e $v=343$ m/s: aperta–aperta 171,5 Hz, 343 Hz, 514,5 Hz…; aperta–chiusa 85,8 Hz, 257 Hz, 429 Hz…",
   "Tubo di Kundt: due nodi consecutivi distano $\\lambda/2$, quindi misurando la loro distanza a frequenza nota si ottiene $v=2f\\,\\Delta x_{nodi}$.",
   "Il timbro della canna dipende da quali armoniche sono presenti: canna aperta e canna chiusa suonano diverse anche alla stessa altezza."
  ],
  "cards": [
   "7.16",
   "7.17",
   "7.27",
   "7.28"
  ],
  "lab": "7",
  "pdf": "p. 76–77"
 },
 {
  "id": "k.onde3d",
  "c": 8,
  "title": "Onde piane e onde sferiche",
  "see": "Una sorgente puntiforme emette fronti d'onda sferici; lontano dalla sorgente un pezzo di fronte è quasi piano. Il vettore d'onda $\\vec k$ è sempre perpendicolare ai fronti.",
  "why": [
   "L'equazione di D'Alembert in 3D, $\\nabla^2\\psi=\\frac{1}{v^2}\\frac{\\partial^2\\psi}{\\partial t^2}$, ammette onde piane $A\\cos(\\vec k\\cdot\\vec r-\\omega t)$ purché $k_x^2+k_y^2+k_z^2=\\omega^2/v^2$.",
   "Per una sorgente puntiforme senza perdite la stessa potenza $P$ attraversa sfere sempre più grandi: $I=P/(4\\pi r^2)$, quindi $I\\propto1/r^2$ e, poiché $I\\propto A^2$, $A\\propto1/r$."
  ],
  "tex": [
   "I(r)=\\frac{P}{4\\pi r^2}",
   "A(r)\\propto\\frac{1}{r}"
  ],
  "exam": [
   "Scrivo D'Alembert in 3D: $\\nabla^2\\psi-\\frac{1}{v^2}\\frac{\\partial^2\\psi}{\\partial t^2}=0$, cioè $\\Box\\psi=0$.",
   "Provo un'onda piana $\\psi=A\\cos(\\vec k\\cdot\\vec r-\\omega t)$: $\\nabla^2\\psi=-k^2\\psi$ e $\\partial_t^2\\psi=-\\omega^2\\psi$, quindi $-k^2+\\omega^2/v^2=0$, la relazione di dispersione $k_x^2+k_y^2+k_z^2=\\omega^2/v^2$.",
   "I fronti d'onda sono le superfici a fase costante $\\vec k\\cdot\\vec r-\\omega t=$ cost: piani perpendicolari a $\\vec k=k\\hat u$ che avanzano con velocità $v$. L'ampiezza è la stessa ovunque.",
   "Per una sorgente puntiforme i fronti sono sfere. Senza assorbimento la potenza emessa $P$ attraversa intera ogni sfera di area $4\\pi r^2$: $I(r)=P/(4\\pi r^2)$; se la sorgente emette solo nell'angolo solido $\\Omega$, $I=P/(\\Omega r^2)$.",
   "Poiché l'intensità è proporzionale al quadrato dell'ampiezza, $A\\propto1/r$: raddoppiando la distanza l'ampiezza si dimezza e l'intensità diventa un quarto ($-6$ dB).",
   "Commento: è un'attenuazione **geometrica**, l'energia non si perde ma si distribuisce su una superficie più grande. Lontano dalla sorgente, su una regione piccola rispetto a $r$, il fronte sferico è quasi piano: per questo l'onda piana è un buon modello."
  ],
  "cards": [
   "8.1",
   "8.2",
   "8.3",
   "8.4",
   "8.7",
   "8.8"
  ],
  "lab": "8",
  "pdf": "p. 33–35"
 }
];
