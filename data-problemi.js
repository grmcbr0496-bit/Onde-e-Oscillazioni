"use strict";
/* Onde & Formule — problemi da scritto. File generato: modificare i sorgenti e ricostruire, oppure modificare qui con cura. */
/* Problemi da scritto (sorgente: tools/check_problemi.py, generato con --write).
   Opzioni: la prima è giusta; i distrattori sono i risultati degli errori tipici. Numeri verificati da tools/check_problemi.py. */
const PROBLEMS = [
 {
  "id": "p1",
  "c": 1,
  "diff": 1,
  "title": "Massa–molla: periodo e velocità massima",
  "text": "Una massa attaccata a una molla ideale, senza attrito, viene spostata di $x_0$ e lasciata ferma. È l'esempio degli appunti.",
  "data": [
   "$m=1\\,\\mathrm{kg}$",
   "$k=100\\,\\mathrm{N/m}$",
   "$x_0=1\\,\\mathrm{cm}$",
   "$v_0=0$"
  ],
  "ask": "Quanto valgono il periodo $T$, la frequenza $\\nu$ e la velocità massima $v_{max}$?",
  "o": [
   "$T\\approx0{,}63\\,\\mathrm{s}$, $\\nu\\approx1{,}6\\,\\mathrm{Hz}$, $v_{max}=0{,}10\\,\\mathrm{m/s}$",
   "$T=0{,}10\\,\\mathrm{s}$, $\\nu=10\\,\\mathrm{Hz}$, $v_{max}\\approx0{,}63\\,\\mathrm{m/s}$",
   "$T\\approx0{,}063\\,\\mathrm{s}$, $\\nu\\approx16\\,\\mathrm{Hz}$, $v_{max}=1{,}0\\,\\mathrm{m/s}$",
   "$T\\approx63\\,\\mathrm{s}$, $\\nu\\approx0{,}016\\,\\mathrm{Hz}$, $v_{max}=1{,}0\\cdot10^{-3}\\,\\mathrm{m/s}$"
  ],
  "formula": [
   "\\omega_0=\\sqrt{\\frac{k}{m}}",
   "T=\\frac{2\\pi}{\\omega_0},\\qquad \\nu=\\frac{1}{T}",
   "x(t)=x_0\\cos(\\omega_0 t)",
   "v_{max}=\\omega_0\\,x_0"
  ],
  "steps": [
   "Pulsazione propria: $\\omega_0=\\sqrt{k/m}=\\sqrt{100/1}=10\\,\\mathrm{rad/s}$.",
   "Periodo: $T=2\\pi/\\omega_0=2\\pi/10\\approx0{,}628\\,\\mathrm{s}$.",
   "Frequenza: $\\nu=1/T=\\omega_0/2\\pi\\approx1{,}59\\,\\mathrm{Hz}$, cioè oscillazioni al secondo.",
   "Legge oraria con $v_0=0$: $x(t)=x_0\\cos(\\omega_0 t)$, quindi $\\dot x=-\\omega_0x_0\\sin(\\omega_0 t)$.",
   "Velocità massima, al passaggio per $x=0$: $v_{max}=\\omega_0x_0=10\\cdot0{,}01=0{,}10\\,\\mathrm{m/s}$."
  ],
  "err": "Confondere $\\omega_0$ con $\\nu$: $10\\,\\mathrm{rad/s}$ non sono $10\\,\\mathrm{Hz}$, tra le due c'è un fattore $2\\pi$. Altri errori: dimenticare la radice in $\\sqrt{k/m}$, oppure capovolgere il rapporto ($\\sqrt{m/k}$).",
  "cards": [
   "1.5",
   "1.4",
   "1.8"
  ],
  "lab": "1",
  "pdf": "p. 13–14"
 },
 {
  "id": "p2",
  "c": 2,
  "diff": 2,
  "title": "Smorzato: quando l'energia si dimezza",
  "text": "La massa–molla dell'esempio precedente si muove in un fluido che esercita una forza viscosa $F=-b\\,\\dot x$. Lo smorzamento è debole.",
  "data": [
   "$m=1\\,\\mathrm{kg}$",
   "$k=100\\,\\mathrm{N/m}$",
   "$b=1\\,\\mathrm{kg/s}$"
  ],
  "ask": "Dopo quanto tempo l'energia meccanica (media su un ciclo) si è ridotta alla metà?",
  "o": [
   "$t\\approx0{,}69\\,\\mathrm{s}$",
   "$t\\approx1{,}4\\,\\mathrm{s}$",
   "$t\\approx0{,}35\\,\\mathrm{s}$",
   "$t\\approx0{,}30\\,\\mathrm{s}$"
  ],
  "formula": [
   "F=-2\\gamma m\\dot x\\;\\Rightarrow\\;\\gamma=\\frac{b}{2m}",
   "E(t)\\simeq\\tfrac12\\,m\\,\\omega_0^2A^2\\,e^{-2\\gamma t}"
  ],
  "steps": [
   "Negli appunti la forza viscosa è $F=-2\\gamma m\\dot x$. Confrontando con $F=-b\\dot x$: $\\gamma=b/(2m)=0{,}5\\,\\mathrm{s^{-1}}$.",
   "Controllo: $\\gamma=0{,}5\\,\\mathrm{s^{-1}}\\ll\\omega_0=10\\,\\mathrm{rad/s}$. È sottosmorzato, con $\\omega=\\sqrt{\\omega_0^2-\\gamma^2}\\approx9{,}99\\,\\mathrm{rad/s}$.",
   "L'ampiezza decade come $e^{-\\gamma t}$; l'energia, che va come $A^2$, decade come $e^{-2\\gamma t}$.",
   "Si impone $e^{-2\\gamma t}=\\tfrac12$, cioè $2\\gamma t=\\ln 2$.",
   "$t=\\dfrac{\\ln2}{2\\gamma}=\\dfrac{0{,}693}{1\\,\\mathrm{s^{-1}}}\\approx0{,}69\\,\\mathrm{s}$, poco più di un periodo ($T\\approx0{,}63\\,\\mathrm{s}$)."
  ],
  "err": "Usare $e^{-\\gamma t}$, che vale per l'ampiezza: si ottiene $1{,}4\\,\\mathrm{s}$, il doppio. Prendere $\\gamma=b/m$ dimentica il 2 della definizione $F=-2\\gamma m\\dot x$. Il logaritmo è quello naturale, non $\\log_{10}$.",
  "cards": [
   "2.1",
   "2.5",
   "2.10"
  ],
  "lab": "2",
  "pdf": "p. 18–21"
 },
 {
  "id": "p3",
  "c": 3,
  "diff": 2,
  "title": "Forzato: ampiezza alla risonanza",
  "text": "La stessa massa–molla smorzata è spinta da una forza $F_0\\cos(\\omega_F t)$ con $\\omega_F=\\omega_0$. Si aspetta che il transitorio sia finito.",
  "data": [
   "$m=1\\,\\mathrm{kg}$",
   "$k=100\\,\\mathrm{N/m}$",
   "$\\gamma=0{,}5\\,\\mathrm{s^{-1}}$",
   "$F_0=1\\,\\mathrm{N}$"
  ],
  "ask": "Quanto vale l'ampiezza $B$ dell'oscillazione a regime?",
  "o": [
   "$B=0{,}10\\,\\mathrm{m}$",
   "$B=0{,}20\\,\\mathrm{m}$",
   "$B=0{,}010\\,\\mathrm{m}$",
   "$B=1{,}0\\,\\mathrm{m}$"
  ],
  "formula": [
   "B=\\frac{F_0}{m\\sqrt{(\\omega_0^2-\\omega_F^2)^2+4\\gamma^2\\omega_F^2}}",
   "\\omega_F=\\omega_0\\;\\Rightarrow\\;B=\\frac{F_0}{2m\\gamma\\,\\omega_0}"
  ],
  "steps": [
   "$\\omega_0=\\sqrt{k/m}=10\\,\\mathrm{rad/s}$. A regime ($t\\gg\\tau=1/\\gamma=2\\,\\mathrm{s}$) resta solo $B\\cos(\\omega_F t+\\varphi)$.",
   "Alla risonanza $\\omega_F=\\omega_0$: il termine $(\\omega_0^2-\\omega_F^2)^2$ si annulla.",
   "Resta $\\sqrt{4\\gamma^2\\omega_0^2}=2\\gamma\\omega_0=2\\cdot0{,}5\\cdot10=10\\,\\mathrm{s^{-2}}$.",
   "$B=\\dfrac{F_0}{2m\\gamma\\omega_0}=\\dfrac{1}{1\\cdot10}=0{,}10\\,\\mathrm{m}$.",
   "Confronto: con una forza costante $F_0$ la molla si allungherebbe di $F_0/k=1\\,\\mathrm{cm}$. La risonanza amplifica di $\\omega_0/(2\\gamma)=10$ volte, con lo spostamento in quadratura ($\\varphi=-\\pi/2$)."
  ],
  "err": "Mettere $\\omega_0^2$ al posto di $\\omega_0$ dà $1\\,\\mathrm{cm}$, cioè la risposta statica $F_0/k$: alla risonanza invece l'ampiezza è limitata solo dallo smorzamento. Dimenticare il 2 di $2\\gamma$ raddoppia il risultato.",
  "cards": [
   "3.3",
   "3.5",
   "3.6"
  ],
  "lab": "3",
  "pdf": "p. 22–24"
 },
 {
  "id": "p4",
  "c": 4,
  "diff": 3,
  "title": "Pendoli accoppiati: periodo dei battimenti",
  "text": "Due pendoli uguali sono uniti da una molla debole. Si sposta solo il pendolo 1 e si lasciano andare entrambi da fermi: l'energia passa dal pendolo 1 al pendolo 2 e poi ritorna.",
  "data": [
   "$\\ell=1{,}0\\,\\mathrm{m}$",
   "$m=0{,}50\\,\\mathrm{kg}$",
   "$K=0{,}25\\,\\mathrm{N/m}$",
   "$g=9{,}8\\,\\mathrm{m/s^2}$"
  ],
  "ask": "Dopo quanto tempo il pendolo 1 torna per la prima volta a oscillare con l'ampiezza massima (periodo dei battimenti)?",
  "o": [
   "$\\approx40\\,\\mathrm{s}$",
   "$\\approx81\\,\\mathrm{s}$",
   "$\\approx20\\,\\mathrm{s}$",
   "$\\approx6{,}4\\,\\mathrm{s}$"
  ],
  "formula": [
   "\\omega_a=\\sqrt{\\frac{g}{\\ell}},\\qquad \\omega_b=\\sqrt{\\frac{g}{\\ell}+\\frac{2K}{m}}",
   "x_1=2A\\cos(\\omega_M t)\\cos(\\omega_{INV}t)",
   "\\omega_M=\\frac{\\omega_a+\\omega_b}{2},\\quad \\omega_{INV}=\\frac{\\omega_b-\\omega_a}{2}",
   "T_{batt}=\\frac{2\\pi}{\\omega_b-\\omega_a}"
  ],
  "steps": [
   "Modo a pendolo, in fase: $\\omega_a=\\sqrt{g/\\ell}=\\sqrt{9{,}8}\\approx3{,}130\\,\\mathrm{rad/s}$.",
   "Modo a respiro, in controfase: $\\omega_b=\\sqrt{9{,}8+2\\cdot0{,}25/0{,}5}=\\sqrt{10{,}8}\\approx3{,}286\\,\\mathrm{rad/s}$.",
   "Con $x_1(0)=2A$, $x_2(0)=0$ e velocità nulle: $x_1=A[\\cos\\omega_at+\\cos\\omega_bt]=2A\\cos(\\omega_Mt)\\cos(\\omega_{INV}t)$.",
   "Qui $\\omega_{INV}=(\\omega_b-\\omega_a)/2\\approx0{,}078\\,\\mathrm{rad/s}$. L'ampiezza di $x_1$ è $|2A\\cos(\\omega_{INV}t)|$ e torna massima per $\\omega_{INV}t=\\pi$.",
   "$T_{batt}=\\dfrac{\\pi}{\\omega_{INV}}=\\dfrac{2\\pi}{\\omega_b-\\omega_a}=\\dfrac{2\\pi}{0{,}156}\\approx40\\,\\mathrm{s}$.",
   "A metà, dopo circa $20\\,\\mathrm{s}$, il pendolo 1 è fermo e tutta l'energia è nel pendolo 2."
  ],
  "err": "Prendere il periodo del coseno modulante, $2\\pi/\\omega_{INV}\\approx81\\,\\mathrm{s}$: l'inviluppo è $|\\cos|$, che si ripete ogni mezzo periodo del coseno. Attenzione anche al $2\\pi$: $\\omega_b-\\omega_a$ è una pulsazione, non una frequenza.",
  "cards": [
   "4.2",
   "4.4",
   "4.5"
  ],
  "lab": "4",
  "pdf": "p. 1–3"
 },
 {
  "id": "p5",
  "c": 5,
  "diff": 1,
  "title": "Corda fissa: frequenze dei modi",
  "text": "Una corda è tesa e fissata ai due estremi.",
  "data": [
   "$L=0{,}50\\,\\mathrm{m}$",
   "$T_0=100\\,\\mathrm{N}$",
   "$\\rho_L=1{,}0\\,\\mathrm{g/m}$"
  ],
  "ask": "Quanto valgono la frequenza fondamentale $\\nu_1$ e quella del terzo modo $\\nu_3$?",
  "o": [
   "$\\nu_1\\approx316\\,\\mathrm{Hz}$, $\\nu_3\\approx949\\,\\mathrm{Hz}$",
   "$\\nu_1\\approx632\\,\\mathrm{Hz}$, $\\nu_3\\approx1{,}90\\,\\mathrm{kHz}$",
   "$\\nu_1\\approx158\\,\\mathrm{Hz}$, $\\nu_3\\approx474\\,\\mathrm{Hz}$",
   "$\\nu_1=10\\,\\mathrm{Hz}$, $\\nu_3=30\\,\\mathrm{Hz}$"
  ],
  "formula": [
   "v=\\sqrt{\\frac{T_0}{\\rho_L}}",
   "\\lambda_n=\\frac{2L}{n},\\qquad \\nu_n=\\frac{n\\,v}{2L}"
  ],
  "steps": [
   "Unità SI: $\\rho_L=1{,}0\\,\\mathrm{g/m}=1{,}0\\cdot10^{-3}\\,\\mathrm{kg/m}$.",
   "Velocità di fase: $v=\\sqrt{T_0/\\rho_L}=\\sqrt{10^5}\\approx316\\,\\mathrm{m/s}$.",
   "Estremi fissi = nodi: nella corda stanno $n$ mezze lunghezze d'onda, $L=n\\lambda_n/2$. Quindi $\\lambda_1=2L=1{,}0\\,\\mathrm{m}$.",
   "$\\nu_1=v/\\lambda_1=316/1{,}0\\approx316\\,\\mathrm{Hz}$.",
   "I modi sono multipli interi della fondamentale: $\\nu_3=3\\nu_1\\approx949\\,\\mathrm{Hz}$, con $\\lambda_3=2L/3\\approx0{,}33\\,\\mathrm{m}$."
  ],
  "err": "Prendere $\\lambda_1=L$ (frequenze doppie) oppure $\\lambda_1=4L$, che vale per la canna aperta–chiusa. E convertire i grammi: con $\\rho_L=1$ in $\\mathrm{g/m}$ si ottiene $v=10\\,\\mathrm{m/s}$, assurdo.",
  "cards": [
   "5.1",
   "5.6",
   "5.4"
  ],
  "lab": "5",
  "pdf": "p. 6–8"
 },
 {
  "id": "p6",
  "c": 6,
  "diff": 2,
  "title": "Giunzione tra due corde: r, t e T",
  "text": "Un'onda armonica passa da una corda leggera a una corda quattro volte più densa. La tensione è la stessa.",
  "data": [
   "$\\rho_2=4\\,\\rho_1$",
   "stessa tensione $T_0$",
   "stessa $\\omega$ nelle due corde"
  ],
  "ask": "Quanto valgono i coefficienti di ampiezza $r$ e $t$ e la frazione di potenza trasmessa $T$?",
  "o": [
   "$r=-\\tfrac13$, $t=\\tfrac23$, $T=\\tfrac89\\approx0{,}89$",
   "$r=-\\tfrac13$, $t=\\tfrac23$, $T=t^2\\approx0{,}44$",
   "$r=-0{,}6$, $t=0{,}4$, $T=0{,}64$",
   "$r=+\\tfrac13$, $t=\\tfrac43$, $T=\\tfrac89\\approx0{,}89$"
  ],
  "formula": [
   "r=\\frac{\\sqrt{\\rho_1}-\\sqrt{\\rho_2}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}",
   "t=\\frac{2\\sqrt{\\rho_1}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}",
   "R=r^2,\\qquad T=1-R"
  ],
  "steps": [
   "Con la stessa tensione e la stessa $\\omega$: $k=\\omega\\sqrt{\\rho/T_0}\\propto\\sqrt\\rho$, quindi $\\sqrt{\\rho_2}=2\\sqrt{\\rho_1}$.",
   "$r=\\dfrac{1-2}{1+2}=-\\dfrac13$: la riflessa è capovolta (sfasamento $\\pi$), perché si passa a una corda più densa.",
   "$t=\\dfrac{2\\cdot1}{1+2}=\\dfrac23$. Controllo della continuità: $1+r=t$.",
   "Energia: $R=r^2=\\tfrac19\\approx0{,}11$ e $T=1-R=\\tfrac89\\approx0{,}89$.",
   "Controllo: $T=\\dfrac{k_2}{k_1}\\,t^2=2\\cdot\\dfrac49=\\dfrac89$. Passa nella seconda corda l'89% della potenza."
  ],
  "err": "Prendere $T=t^2$: manca il fattore $k_2/k_1$, perché la potenza dipende anche dal mezzo. Altri errori: usare $\\rho$ invece di $\\sqrt\\rho$, o scambiare gli indici (si trova $t=4/3$ e una riflessa non capovolta).",
  "cards": [
   "6.2",
   "6.3",
   "6.4",
   "6.7"
  ],
  "lab": "6",
  "pdf": "p. 73–74"
 },
 {
  "id": "p7",
  "c": 7,
  "diff": 2,
  "title": "Quanto si sposta l'aria a 60 dB",
  "text": "Una conversazione produce un suono di $60\\,\\mathrm{dB}$. Considera un'onda piana armonica a $1000\\,\\mathrm{Hz}$ in aria.",
  "data": [
   "$L=60\\,\\mathrm{dB}$",
   "$f=1000\\,\\mathrm{Hz}$",
   "$\\rho_0=1{,}2\\,\\mathrm{kg/m^3}$",
   "$v=343\\,\\mathrm{m/s}$",
   "$I_0=10^{-12}\\,\\mathrm{W/m^2}$"
  ],
  "ask": "Qual è l'ampiezza di spostamento $s_{max}$ delle particelle d'aria?",
  "o": [
   "$s_{max}\\approx1{,}1\\cdot10^{-8}\\,\\mathrm{m}\\approx11\\,\\mathrm{nm}$",
   "$s_{max}\\approx7{,}0\\cdot10^{-8}\\,\\mathrm{m}=70\\,\\mathrm{nm}$",
   "$s_{max}\\approx1{,}0\\cdot10^{-5}\\,\\mathrm{m}=10\\,\\mu\\mathrm{m}$",
   "$s_{max}\\approx3{,}5\\cdot10^{-10}\\,\\mathrm{m}$"
  ],
  "formula": [
   "L=10\\log_{10}\\frac{I}{I_0}\\;\\Rightarrow\\;I=I_0\\,10^{L/10}",
   "s_{max}=\\sqrt{\\frac{2I}{\\rho_0\\,\\omega^2 v}}"
  ],
  "steps": [
   "Intensità: $I=I_0\\,10^{L/10}=10^{-12}\\cdot10^{6}=10^{-6}\\,\\mathrm{W/m^2}$.",
   "Pulsazione: $\\omega=2\\pi f\\approx6283\\,\\mathrm{rad/s}$, quindi $\\omega^2\\approx3{,}95\\cdot10^{7}\\,\\mathrm{s^{-2}}$.",
   "Denominatore: $\\rho_0\\omega^2v=1{,}2\\cdot3{,}95\\cdot10^7\\cdot343\\approx1{,}63\\cdot10^{10}$ (unità SI).",
   "$s_{max}=\\sqrt{2\\cdot10^{-6}/(1{,}63\\cdot10^{10})}=\\sqrt{1{,}23\\cdot10^{-16}}\\approx1{,}1\\cdot10^{-8}\\,\\mathrm{m}$.",
   "Sono circa 11 nm. È coerente con le soglie di p. 78: 11 pm a 0 dB e 11 μm a 120 dB, perché $s_{max}\\propto\\sqrt I$ e ogni 60 dB $I$ cresce di $10^6$."
  ],
  "err": "Gli appunti a p. 77 scrivono $s_{max}=10\\,\\mu\\mathrm{m}$: è sbagliato di un fattore 1000, il conto dà circa 11 nm. Altri errori: usare $f$ al posto di $\\omega=2\\pi f$ (risultato $2\\pi$ volte più grande) o ricavare $I$ con $20\\log_{10}$, che vale per le ampiezze.",
  "cards": [
   "7.11",
   "7.12",
   "7.10"
  ],
  "lab": "7",
  "pdf": "p. 77–78"
 },
 {
  "id": "p8",
  "c": 7,
  "diff": 3,
  "title": "Soglia del dolore: pressione e spostamento",
  "text": "Il decollo di un jet visto da vicino arriva a $120\\,\\mathrm{dB}$, la soglia del dolore. Considera un'onda piana armonica a $1000\\,\\mathrm{Hz}$ in aria.",
  "data": [
   "$L=120\\,\\mathrm{dB}$",
   "$f=1000\\,\\mathrm{Hz}$",
   "$\\rho_0=1{,}2\\,\\mathrm{kg/m^3}$",
   "$v=343\\,\\mathrm{m/s}$",
   "$I_0=10^{-12}\\,\\mathrm{W/m^2}$"
  ],
  "ask": "Quanto valgono l'ampiezza di pressione $\\delta p_{max}$ e l'ampiezza di spostamento $s_{max}$?",
  "o": [
   "$\\delta p_{max}\\approx29\\,\\mathrm{Pa}$, $s_{max}\\approx11\\,\\mu\\mathrm{m}$",
   "$\\delta p_{max}\\approx20\\,\\mathrm{Pa}$, $s_{max}\\approx7{,}8\\,\\mu\\mathrm{m}$",
   "$\\delta p_{max}\\approx29\\,\\mathrm{Pa}$, $s_{max}\\approx70\\,\\mu\\mathrm{m}$",
   "$\\delta p_{max}\\approx0{,}029\\,\\mathrm{Pa}$, $s_{max}\\approx11\\,\\mathrm{nm}$"
  ],
  "formula": [
   "I=I_0\\,10^{L/10}",
   "\\bar I=\\frac12\\,\\frac{\\delta p_{max}^2}{\\rho_0\\,v}",
   "\\delta p_{max}=\\sqrt{2\\rho_0 vI}",
   "s_{max}=\\sqrt{\\frac{2I}{\\rho_0\\,\\omega^2v}}=\\frac{\\delta p_{max}}{\\rho_0\\,v\\,\\omega}"
  ],
  "steps": [
   "Intensità: $I=10^{-12}\\cdot10^{120/10}=1\\,\\mathrm{W/m^2}$.",
   "Pressione: $\\delta p_{max}=\\sqrt{2\\rho_0vI}=\\sqrt{2\\cdot1{,}2\\cdot343\\cdot1}=\\sqrt{823}\\approx29\\,\\mathrm{Pa}$. Gli appunti (p. 78) arrotondano a 28 Pa.",
   "Spostamento: $s_{max}=\\dfrac{\\delta p_{max}}{\\rho_0v\\omega}=\\dfrac{28{,}7}{1{,}2\\cdot343\\cdot6283}\\approx1{,}1\\cdot10^{-5}\\,\\mathrm{m}$.",
   "Quindi $s_{max}\\approx11\\,\\mu\\mathrm{m}$, più sottile di un foglio. La pressione è appena $3\\cdot10^{-4}$ della pressione atmosferica ($10^5\\,\\mathrm{Pa}$).",
   "Controllo: a 0 dB si ha $s\\approx11\\,\\mathrm{pm}$; con $+120\\,\\mathrm{dB}$ l'intensità cresce di $10^{12}$ e $s\\propto\\sqrt I$ di $10^{6}$."
  ],
  "err": "Ricavare $I$ con $20\\log_{10}$: si ottiene $I=10^{-6}\\,\\mathrm{W/m^2}$ e tutto viene 1000 volte più piccolo. Non perdere il $\\tfrac12$ della media nel tempo (senza, i risultati calano di $\\sqrt2$), né il $2\\pi$ di $\\omega=2\\pi f$.",
  "cards": [
   "7.10",
   "7.11",
   "7.12"
  ],
  "lab": "7",
  "pdf": "p. 77–78"
 },
 {
  "id": "p9",
  "c": 7,
  "diff": 1,
  "title": "Raddoppio la distanza: quanti dB?",
  "text": "Una sorgente puntiforme emette in modo isotropo. A $2\\,\\mathrm{m}$ si misurano $80\\,\\mathrm{dB}$. Trascura l'assorbimento dell'aria.",
  "data": [
   "$r_1=2\\,\\mathrm{m}$",
   "$L_1=80\\,\\mathrm{dB}$",
   "$r_2=4\\,\\mathrm{m}$"
  ],
  "ask": "Qual è il livello sonoro $L_2$ alla distanza $r_2$?",
  "o": [
   "$L_2\\approx74\\,\\mathrm{dB}$",
   "$L_2\\approx77\\,\\mathrm{dB}$",
   "$L_2=40\\,\\mathrm{dB}$",
   "$L_2\\approx68\\,\\mathrm{dB}$"
  ],
  "formula": [
   "I(r)=\\frac{P}{\\Omega\\,r^2}",
   "\\frac{I_2}{I_1}=\\frac{r_1^2}{r_2^2}",
   "L_2-L_1=-20\\log_{10}\\frac{r_2}{r_1}"
  ],
  "steps": [
   "La potenza si distribuisce su sfere sempre più grandi: $I\\propto1/r^2$.",
   "Raddoppiando la distanza $I_2=I_1/4$: l'intensità diventa un quarto.",
   "$L_2-L_1=10\\log_{10}(1/4)=-20\\log_{10}2\\approx-6{,}0\\,\\mathrm{dB}$.",
   "$L_2\\approx80-6=74\\,\\mathrm{dB}$. Ogni raddoppio della distanza toglie 6 dB."
  ],
  "err": "Usare $10\\log_{10}(r_2/r_1)$, cioè $-3\\,\\mathrm{dB}$, dimentica che $I\\propto1/r^2$: il quadrato diventa il 20 davanti al logaritmo. E i dB non si dimezzano: passare da 80 a 40 dB vuol dire dividere $I$ per $10^4$.",
  "cards": [
   "7.18",
   "7.13",
   "8.4"
  ],
  "lab": "7b",
  "pdf": "p. 35, 78"
 },
 {
  "id": "p10",
  "c": 7,
  "diff": 2,
  "title": "Lambert–Beer: coefficiente di assorbimento",
  "text": "Un'onda piana (quindi senza attenuazione geometrica) attraversa un mezzo che assorbe. Dopo uno spessore $z$ l'intensità si è dimezzata.",
  "data": [
   "$z=2{,}0\\,\\mathrm{m}$",
   "$I(z)/I_0=1/2$"
  ],
  "ask": "Quanto valgono il coefficiente di assorbimento $\\alpha$ e l'attenuazione $\\beta$ in dB/m?",
  "o": [
   "$\\alpha\\approx0{,}35\\,\\mathrm{m^{-1}}$, $\\beta\\approx1{,}5\\,\\mathrm{dB/m}$",
   "$\\alpha\\approx0{,}15\\,\\mathrm{m^{-1}}$, $\\beta\\approx0{,}65\\,\\mathrm{dB/m}$",
   "$\\alpha\\approx0{,}35\\,\\mathrm{m^{-1}}$, $\\beta\\approx3{,}0\\,\\mathrm{dB/m}$",
   "$\\alpha=0{,}25\\,\\mathrm{m^{-1}}$, $\\beta\\approx1{,}1\\,\\mathrm{dB/m}$"
  ],
  "formula": [
   "I(z)=I_0\\,e^{-\\alpha z}",
   "L=L(r)-\\beta r",
   "\\beta=10\\log_{10}(e)\\,\\alpha\\simeq4{,}34\\,\\alpha"
  ],
  "steps": [
   "Lambert–Beer: $I(z)/I_0=e^{-\\alpha z}=\\tfrac12$, quindi $\\alpha z=\\ln2$.",
   "$\\alpha=\\ln2/z=0{,}693/2{,}0\\approx0{,}35\\,\\mathrm{m^{-1}}$.",
   "In dB: $10\\log_{10}(e^{-\\alpha z})=-10\\log_{10}(e)\\,\\alpha z$, quindi $\\beta=10\\log_{10}(e)\\,\\alpha\\approx4{,}34\\,\\alpha$.",
   "$\\beta\\approx4{,}34\\cdot0{,}347\\approx1{,}5\\,\\mathrm{dB/m}$.",
   "Controllo: dimezzare l'intensità vale $10\\log_{10}2\\approx3{,}0\\,\\mathrm{dB}$, persi in 2 m, cioè $1{,}5\\,\\mathrm{dB/m}$. In dB l'assorbimento è **lineare** nella distanza."
  ],
  "err": "Usare $\\log_{10}$ invece di $\\ln$ per ricavare $\\alpha$ (l'esponenziale è in base $e$), oppure $20\\log_{10}(e)\\approx8{,}69$ invece di $4{,}34$: si parla di intensità, quindi 10 log.",
  "cards": [
   "7.14",
   "7.15"
  ],
  "lab": "7b",
  "pdf": "p. 78"
 },
 {
  "id": "p11",
  "c": 8,
  "diff": 3,
  "title": "Onda sferica con assorbimento",
  "text": "Un piccolo altoparlante (sorgente puntiforme) emette in modo isotropo la potenza acustica $P$. L'aria assorbe con coefficiente $\\alpha$.",
  "data": [
   "$P=1\\,\\mathrm{W}$",
   "$r=100\\,\\mathrm{m}$",
   "$\\alpha=5\\cdot10^{-3}\\,\\mathrm{m^{-1}}$",
   "$I_0=10^{-12}\\,\\mathrm{W/m^2}$"
  ],
  "ask": "Qual è il livello sonoro alla distanza $r$?",
  "o": [
   "$L\\approx66{,}8\\,\\mathrm{dB}$",
   "$L\\approx68{,}5\\,\\mathrm{dB}$",
   "$L\\approx77{,}8\\,\\mathrm{dB}$",
   "$L\\approx64{,}7\\,\\mathrm{dB}$"
  ],
  "formula": [
   "I(r)=\\frac{P}{4\\pi r^2}\\,e^{-\\alpha r}",
   "L=10\\log_{10}\\frac{P}{4\\pi r^2I_0}-\\beta r",
   "\\beta=10\\log_{10}(e)\\,\\alpha\\simeq4{,}34\\,\\alpha"
  ],
  "steps": [
   "Isotropa: $\\Omega=4\\pi$. Senza assorbimento $I=\\dfrac{P}{4\\pi r^2}=\\dfrac{1}{4\\pi\\cdot10^4}\\approx7{,}96\\cdot10^{-6}\\,\\mathrm{W/m^2}$.",
   "Parte geometrica: $10\\log_{10}(7{,}96\\cdot10^{-6}/10^{-12})=10\\log_{10}(7{,}96\\cdot10^{6})\\approx69{,}0\\,\\mathrm{dB}$.",
   "Assorbimento: $\\beta=4{,}34\\,\\alpha\\approx0{,}0217\\,\\mathrm{dB/m}$; su 100 m si perdono $\\beta r\\approx2{,}2\\,\\mathrm{dB}$.",
   "$L\\approx69{,}0-2{,}2=66{,}8\\,\\mathrm{dB}$.",
   "La parte geometrica cala come $20\\log_{10}r$ (logaritmica), l'assorbimento come $\\beta r$ (lineare): a grande distanza vince l'assorbimento."
  ],
  "err": "Sottrarre $\\alpha r=0{,}5$ come se fossero già dB: va moltiplicato per $10\\log_{10}e\\approx4{,}34$. Dimenticare $4\\pi$ (l'angolo solido) sovrastima di 11 dB; usare $20\\log_{10}e$ conta l'assorbimento due volte.",
  "cards": [
   "8.4",
   "7.13",
   "7.15"
  ],
  "lab": "8",
  "pdf": "p. 35, 78"
 },
 {
  "id": "p12",
  "c": 9,
  "diff": 2,
  "title": "Doppler: sorgente e ascoltatore in moto",
  "text": "Un'auto con la sirena va verso un ciclista, che le va incontro. L'aria è ferma.",
  "data": [
   "$f=500\\,\\mathrm{Hz}$",
   "$v_S=30\\,\\mathrm{m/s}$ (sorgente, si avvicina)",
   "$v_A=20\\,\\mathrm{m/s}$ (ascoltatore, si avvicina)",
   "$c=340\\,\\mathrm{m/s}$"
  ],
  "ask": "Quale frequenza $f'$ sente il ciclista?",
  "o": [
   "$f'\\approx581\\,\\mathrm{Hz}$",
   "$f'\\approx432\\,\\mathrm{Hz}$",
   "$f'\\approx586\\,\\mathrm{Hz}$",
   "$f'\\approx574\\,\\mathrm{Hz}$"
  ],
  "formula": [
   "f'=f\\,\\frac{c\\pm v_A}{c\\mp v_S}"
  ],
  "steps": [
   "Ascoltatore che si avvicina: incontra i fronti più spesso, numeratore $c+v_A=360\\,\\mathrm{m/s}$.",
   "Sorgente che si avvicina: i fronti si schiacciano, $\\lambda'=(c-v_S)/f$, denominatore $c-v_S=310\\,\\mathrm{m/s}$.",
   "$f'=500\\cdot\\dfrac{360}{310}\\approx581\\,\\mathrm{Hz}$.",
   "Non basta la velocità relativa ($50\\,\\mathrm{m/s}$): il Doppler acustico non è invariante per Galileo, conta chi si muove rispetto all'aria."
  ],
  "err": "Usare solo la velocità relativa $v_A+v_S=50\\,\\mathrm{m/s}$, come se si muovesse solo la sorgente (586 Hz) o solo l'ascoltatore (574 Hz). Invertire i segni dà 432 Hz, che è il caso dell'allontanamento.",
  "cards": [
   "9.1",
   "9.2",
   "9.3"
  ],
  "lab": "9",
  "pdf": "p. 80–82"
 },
 {
  "id": "p13",
  "c": 9,
  "diff": 3,
  "title": "Cono di Mach: quando arriva il boom",
  "text": "Un aereo vola in orizzontale a Mach 1,5 alla quota $h$. Un osservatore a terra lo vede passare sopra la testa.",
  "data": [
   "$v_S=1{,}5\\,c$",
   "$h=3000\\,\\mathrm{m}$",
   "$c=340\\,\\mathrm{m/s}$"
  ],
  "ask": "Quanto tempo dopo il passaggio sulla verticale l'osservatore sente il boom?",
  "o": [
   "$\\approx6{,}6\\,\\mathrm{s}$",
   "$\\approx5{,}3\\,\\mathrm{s}$",
   "$\\approx8{,}8\\,\\mathrm{s}$",
   "$\\approx7{,}4\\,\\mathrm{s}$"
  ],
  "formula": [
   "\\sin\\theta=\\frac{c}{v_S}",
   "\\tan\\theta=\\frac{h}{x}",
   "t=\\frac{x}{v_S}=\\frac{h}{v_S\\tan\\theta}"
  ],
  "steps": [
   "Semiapertura del cono: $\\sin\\theta=c/v_S=1/1{,}5$, quindi $\\theta\\approx41{,}8^\\circ$ e $\\tan\\theta\\approx0{,}894$.",
   "Il cono viaggia attaccato all'aereo. Il boom arriva quando la superficie del cono passa sull'osservatore.",
   "In quell'istante l'aereo è avanti di $x$, con $\\tan\\theta=h/x$: $x=3000/0{,}894\\approx3350\\,\\mathrm{m}$.",
   "L'aereo percorre $x$ alla velocità $v_S=510\\,\\mathrm{m/s}$: $t=x/v_S\\approx6{,}6\\,\\mathrm{s}$.",
   "In forma compatta, con $M=v_S/c$: $t=\\dfrac{h\\sqrt{M^2-1}}{M\\,c}$."
  ],
  "err": "Pensare che il boom arrivi dopo $h/c\\approx8{,}8\\,\\mathrm{s}$, come un suono emesso sulla verticale: il fronte è il cono. Scambiare $\\tan\\theta$ con $1/\\tan\\theta$ (angolo preso dalla verticale) dà 5,3 s; dimenticare la radice in $\\sqrt{M^2-1}$ dà 7,4 s.",
  "cards": [
   "9.5"
  ],
  "lab": "9",
  "pdf": "p. 81"
 },
 {
  "id": "p14",
  "c": 10,
  "diff": 2,
  "title": "Young: misurare λ dalle frange",
  "text": "Due fenditure strette, distanti $d$, sono illuminate da luce monocromatica. Sullo schermo lontano si contano 11 frange chiare consecutive, che occupano in tutto 3,6 cm.",
  "data": [
   "$d=0{,}25\\,\\mathrm{mm}$",
   "$r=1{,}5\\,\\mathrm{m}$ (fenditure–schermo)",
   "11 frange chiare in $3{,}6\\,\\mathrm{cm}$"
  ],
  "ask": "Quanto vale la lunghezza d'onda $\\lambda$?",
  "o": [
   "$\\lambda\\approx600\\,\\mathrm{nm}$",
   "$\\lambda\\approx6{,}0\\,\\mu\\mathrm{m}$",
   "$\\lambda\\approx545\\,\\mathrm{nm}$",
   "$\\lambda\\approx300\\,\\mathrm{nm}$"
  ],
  "formula": [
   "d\\sin\\theta=n\\lambda,\\qquad \\Delta x=\\frac{r\\lambda}{d}",
   "\\lambda=\\frac{\\Delta x\\,d}{r}"
  ],
  "steps": [
   "Tra 11 frange chiare consecutive ci sono 10 intervalli: $\\Delta x=3{,}6\\,\\mathrm{cm}/10=3{,}6\\,\\mathrm{mm}$.",
   "Piccoli angoli ($r\\gg d$): i massimi sono a $x_n=n\\lambda r/d$, quindi equidistanti di $\\Delta x=r\\lambda/d$.",
   "$\\lambda=\\Delta x\\,d/r=3{,}6\\cdot10^{-3}\\cdot2{,}5\\cdot10^{-4}/1{,}5$.",
   "$\\lambda=6{,}0\\cdot10^{-7}\\,\\mathrm{m}=600\\,\\mathrm{nm}$, dentro la banda visibile (400–750 nm)."
  ],
  "err": "Dividere per 11 invece che per 10 (gli intervalli sono uno in meno delle frange), o non dividere affatto: $\\lambda$ dieci volte più grande, fuori dal visibile. Prendere $\\Delta x=r\\lambda/(2d)$, che è la distanza massimo–minimo, dimezza il risultato.",
  "cards": [
   "10.5",
   "10.7",
   "10.8"
  ],
  "lab": "10",
  "pdf": "p. 38–40"
 },
 {
  "id": "p15",
  "c": 11,
  "diff": 1,
  "title": "Reflex: limite di diffrazione sul sensore",
  "text": "Un obiettivo da reflex ha focale $f=50\\,\\mathrm{mm}$ e apertura massima $f/1{,}8$. Il sensore è nel piano focale.",
  "data": [
   "$f=50\\,\\mathrm{mm}$",
   "$f/D=1{,}8$",
   "$\\lambda=500\\,\\mathrm{nm}$"
  ],
  "ask": "Qual è il raggio $x$ del disco di Airy sul sensore (risoluzione lineare)?",
  "o": [
   "$x\\approx1{,}1\\,\\mu\\mathrm{m}$",
   "$x\\approx0{,}34\\,\\mu\\mathrm{m}$",
   "$x\\approx2{,}2\\,\\mu\\mathrm{m}$",
   "$x\\approx1{,}1\\,\\mathrm{m}$"
  ],
  "formula": [
   "\\theta\\simeq1{,}22\\,\\frac{\\lambda}{D}",
   "x\\simeq\\theta f=1{,}22\\,\\frac{\\lambda f}{D}"
  ],
  "steps": [
   "Il numero $f/1{,}8$ è il rapporto focale: $f/D=1{,}8$, quindi $D=50/1{,}8\\approx28\\,\\mathrm{mm}$.",
   "Criterio di Rayleigh: il disco di Airy ha raggio angolare $\\theta=1{,}22\\,\\lambda/D$.",
   "Sul piano focale $x\\simeq\\theta f=1{,}22\\,\\lambda\\,(f/D)$.",
   "$x=1{,}22\\cdot500\\cdot10^{-9}\\,\\mathrm{m}\\cdot1{,}8\\approx1{,}1\\cdot10^{-6}\\,\\mathrm{m}\\approx1{,}1\\,\\mu\\mathrm{m}$.",
   "Conta solo il rapporto $f/D$: chiudendo il diaframma (f-numero più grande) il disco di Airy si allarga."
  ],
  "err": "Gli appunti (p. 45) scrivono $\\lambda=500\\,\\mathrm{mm}$: è un refuso per 500 nm (con i mm verrebbe 1,1 m!). Altri errori: usare $D/f$ invece di $f/D$, o il raggio $D/2$ al posto del diametro.",
  "cards": [
   "11.6",
   "11.5",
   "11.4"
  ],
  "lab": "11",
  "pdf": "p. 44–45"
 },
 {
  "id": "p16",
  "c": 11,
  "diff": 2,
  "title": "Hubble: risoluzione angolare",
  "text": "Il telescopio spaziale Hubble ha uno specchio primario di diametro $D$. Fuori dall'atmosfera è limitato solo dalla diffrazione.",
  "data": [
   "$D=2{,}4\\,\\mathrm{m}$",
   "$\\lambda=500\\,\\mathrm{nm}$",
   "quota $h=560\\,\\mathrm{km}$"
  ],
  "ask": "Qual è la risoluzione angolare $\\theta_R$ in secondi d'arco? E la minima distanza $\\Delta s$ risolvibile a terra, guardando in giù dalla quota $h$?",
  "o": [
   "$\\theta_R\\approx0{,}052''$, $\\Delta s\\approx14\\,\\mathrm{cm}$",
   "$\\theta_R\\approx0{,}043''$, $\\Delta s\\approx12\\,\\mathrm{cm}$",
   "$\\theta_R\\approx0{,}10''$, $\\Delta s\\approx28\\,\\mathrm{cm}$",
   "$\\theta_R\\approx9{,}15\\cdot10^{-4}{}''$, $\\Delta s\\approx14\\,\\mathrm{cm}$"
  ],
  "formula": [
   "\\theta_R\\simeq1{,}22\\,\\frac{\\lambda}{D}",
   "1\\,\\mathrm{rad}=\\frac{180^\\circ}{\\pi},\\qquad 1^\\circ=3600''",
   "\\Delta s\\simeq\\theta_R\\,h"
  ],
  "steps": [
   "Rayleigh: $\\theta_R=1{,}22\\cdot\\dfrac{500\\cdot10^{-9}}{2{,}4}\\approx2{,}5\\cdot10^{-7}\\,\\mathrm{rad}$.",
   "In gradi: $2{,}54\\cdot10^{-7}\\cdot180/\\pi\\approx1{,}46\\cdot10^{-5}$ gradi.",
   "In secondi d'arco: $1{,}46\\cdot10^{-5}\\cdot3600\\approx0{,}052''$.",
   "Due punti a terra distanti $\\Delta s$, visti da $h$, sottendono $\\Delta s/h$: $\\Delta s=\\theta_Rh=2{,}54\\cdot10^{-7}\\cdot5{,}6\\cdot10^{5}\\,\\mathrm{m}\\approx0{,}14\\,\\mathrm{m}$.",
   "Gli appunti (p. 45) usano $\\lambda=400\\,\\mathrm{nm}$: $2\\cdot10^{-7}\\,\\mathrm{rad}\\simeq0{,}04''$. A terra l'atmosfera limita a 0,2–0,3″, cioè 5–8 volte peggio (non 100, come scritto a p. 46)."
  ],
  "err": "Moltiplicare i radianti direttamente per 3600 senza passare ai gradi ($\\times180/\\pi$). Usare il raggio $D/2$ al posto del diametro raddoppia l'angolo; senza 1,22 si usa la formula della fenditura, non dell'apertura circolare.",
  "cards": [
   "11.5",
   "11.4"
  ],
  "lab": "11",
  "pdf": "p. 44–46"
 },
 {
  "id": "p17",
  "c": 11,
  "diff": 2,
  "title": "Reticolo: separare il doppietto del sodio",
  "text": "La luce gialla del sodio contiene due righe molto vicine. Le si vuole separare con un reticolo, osservando il secondo ordine.",
  "data": [
   "$\\lambda_1=589{,}0\\,\\mathrm{nm}$",
   "$\\lambda_2=589{,}6\\,\\mathrm{nm}$",
   "ordine $n=2$"
  ],
  "ask": "Quante fenditure $N$ deve illuminare il fascio, come minimo?",
  "o": [
   "$N\\approx490$",
   "$N\\approx980$",
   "$N\\approx1960$",
   "$N\\approx250$"
  ],
  "formula": [
   "R=\\frac{\\lambda}{\\Delta\\lambda}=n\\,N",
   "\\lambda=\\frac{\\lambda_1+\\lambda_2}{2}"
  ],
  "steps": [
   "Lunghezza d'onda media $\\lambda=589{,}3\\,\\mathrm{nm}$; separazione $\\Delta\\lambda=0{,}6\\,\\mathrm{nm}$.",
   "Potere risolutivo richiesto: $R=\\lambda/\\Delta\\lambda=589{,}3/0{,}6\\approx982$.",
   "Il reticolo ha $R=nN$: più fenditure illuminate rendono i massimi più stretti, $\\Delta\\theta_{HW}=\\lambda/(Nd\\cos\\theta)$.",
   "$N\\ge R/n=982/2\\approx491$: servono circa 490 fenditure (492 arrotondando per eccesso).",
   "Al primo ordine ne servirebbero il doppio, circa 980."
  ],
  "err": "Dimenticare l'ordine ($N=R\\approx980$) o moltiplicare invece di dividere ($\\approx1960$). Usare $\\lambda_1$ o $\\lambda_2$ invece della media cambia poco; sbagliare $\\Delta\\lambda$ cambia tutto.",
  "cards": [
   "11.14",
   "11.13",
   "11.11"
  ],
  "lab": "11",
  "pdf": "p. 52–54"
 },
 {
  "id": "p18",
  "c": 12,
  "diff": 2,
  "title": "Finestra di Snell sott'acqua",
  "text": "Un sub guarda verso l'alto. La luce del cielo, che arriva da tutte le direzioni fino a quella radente, entra in acqua solo dentro un cono: fuori dal cerchio luminoso la superficie riflette totalmente.",
  "data": [
   "$n_{aria}=1$",
   "$n_{acqua}=1{,}334$",
   "occhi a profondità $h=2{,}0\\,\\mathrm{m}$"
  ],
  "ask": "Quanto valgono l'angolo limite $\\theta_t^{max}$ e il raggio $R$ del cerchio luminoso sulla superficie?",
  "o": [
   "$\\theta_t^{max}\\approx48{,}6^\\circ$, $R\\approx2{,}3\\,\\mathrm{m}$",
   "$\\theta_t^{max}\\approx41{,}4^\\circ$, $R\\approx1{,}8\\,\\mathrm{m}$",
   "$\\theta_t^{max}\\approx48{,}6^\\circ$, $R\\approx4{,}5\\,\\mathrm{m}$",
   "$\\theta_t^{max}\\approx48{,}6^\\circ$, $R\\approx1{,}5\\,\\mathrm{m}$"
  ],
  "formula": [
   "n_1\\sin\\theta_i=n_2\\sin\\theta_t",
   "\\theta_i=90^\\circ\\;\\Rightarrow\\;\\sin\\theta_t^{max}=\\frac{1}{n}",
   "R=h\\tan\\theta_t^{max}"
  ],
  "steps": [
   "Il raggio più inclinato che entra è quello radente, $\\theta_i=90^\\circ$: $1\\cdot\\sin90^\\circ=1{,}334\\,\\sin\\theta_t$.",
   "$\\theta_t^{max}=\\arcsin(1/1{,}334)\\approx48{,}6^\\circ$: è anche l'angolo critico acqua→aria.",
   "Il cono di visione ha apertura $2\\theta_t^{max}\\approx97^\\circ$: tutto il cielo è compresso lì dentro.",
   "Il bordo del cerchio si vede a $48{,}6^\\circ$ dalla verticale: $\\tan\\theta_t^{max}=R/h$.",
   "$R=h\\tan48{,}6^\\circ=2{,}0\\cdot1{,}13\\approx2{,}3\\,\\mathrm{m}$ (diametro circa 4,5 m)."
  ],
  "err": "Usare $\\arccos$ invece di $\\arcsin$ ($41{,}4^\\circ$), o il seno al posto della tangente per il raggio. Il cono di 97° è l'apertura intera: per $R$ serve la semiapertura, altrimenti si trova il diametro. Controlla che la calcolatrice sia in gradi.",
  "cards": [
   "12.3",
   "12.4",
   "12.5"
  ],
  "lab": "12",
  "pdf": "p. 57–58"
 },
 {
  "id": "p19",
  "c": 12,
  "diff": 1,
  "title": "Lente sottile: dove si forma l'immagine",
  "text": "Un oggetto è davanti a una lente sottile convergente, oltre il fuoco.",
  "data": [
   "$f=+10\\,\\mathrm{cm}$",
   "$p=15\\,\\mathrm{cm}$"
  ],
  "ask": "Dove si forma l'immagine e quanto vale l'ingrandimento $M$?",
  "o": [
   "$q=30\\,\\mathrm{cm}$, $M=-2$ (reale, capovolta)",
   "$q=6{,}0\\,\\mathrm{cm}$, $M=-0{,}4$",
   "$q=-30\\,\\mathrm{cm}$, $M=+2$ (virtuale, dritta)",
   "$q=30\\,\\mathrm{cm}$, $M=-0{,}5$"
  ],
  "formula": [
   "\\frac{1}{p}+\\frac{1}{q}=\\frac{1}{f}",
   "M=-\\frac{q}{p}"
  ],
  "steps": [
   "$\\dfrac1q=\\dfrac1f-\\dfrac1p=\\dfrac1{10}-\\dfrac1{15}=\\dfrac{1}{30}\\,\\mathrm{cm^{-1}}$.",
   "$q=+30\\,\\mathrm{cm}$: positivo, quindi immagine reale, dall'altra parte della lente.",
   "Ingrandimento: come per lo specchio $M=-q/p$ (in aria gli indici dei due diottri si semplificano): $M=-30/15=-2$.",
   "$M<0$: immagine capovolta; $|M|=2$: alta il doppio dell'oggetto. Oggetto tra $f$ e $2f$ → immagine reale oltre $2f$."
  ],
  "err": "Sommare invece di sottrarre ($1/q=1/f+1/p$ dà 6 cm), o invertire il rapporto dell'ingrandimento ($M=-p/q$). Sbagliare il segno di $q$ fa sembrare virtuale un'immagine reale.",
  "cards": [
   "12.11",
   "12.12",
   "12.10"
  ],
  "lab": "12",
  "pdf": "p. 66–67"
 },
 {
  "id": "p20",
  "c": 12,
  "diff": 3,
  "title": "Diottro sferico: immagine nel vetro",
  "text": "Un oggetto in aria sta davanti alla faccia sferica convessa di un lungo blocco di vetro: la luce rifratta resta nel vetro.",
  "data": [
   "$n_1=1{,}0$",
   "$n_2=1{,}5$",
   "$r=+10\\,\\mathrm{cm}$",
   "$p=40\\,\\mathrm{cm}$"
  ],
  "ask": "A che distanza $q$ dalla superficie, dentro il vetro, si forma l'immagine? Con quale ingrandimento $M$?",
  "o": [
   "$q=60\\,\\mathrm{cm}$, $M=-1{,}0$",
   "$q=60\\,\\mathrm{cm}$, $M=-1{,}5$",
   "$q=40\\,\\mathrm{cm}$, $M\\approx-0{,}67$",
   "$q=120\\,\\mathrm{cm}$, $M=-2{,}0$"
  ],
  "formula": [
   "\\frac{n_1}{p}+\\frac{n_2}{q}=\\frac{n_2-n_1}{r}",
   "f_o=\\frac{n_1}{n_2-n_1}\\,r",
   "f_i=\\frac{n_2}{n_2-n_1}\\,r",
   "M=-\\frac{n_1\\,q}{n_2\\,p}"
  ],
  "steps": [
   "Segni: $r>0$ perché l'oggetto vede la faccia convessa. Fuochi: $f_o=20\\,\\mathrm{cm}$ e $f_i=30\\,\\mathrm{cm}$ (infatti $f_i-f_o=r$).",
   "Formula del diottro: $\\dfrac{1}{40}+\\dfrac{1{,}5}{q}=\\dfrac{0{,}5}{10}=0{,}05\\,\\mathrm{cm^{-1}}$.",
   "$\\dfrac{1{,}5}{q}=0{,}05-0{,}025=0{,}025$, quindi $q=60\\,\\mathrm{cm}$: immagine reale, nel vetro.",
   "Ingrandimento: $M=-\\dfrac{n_1q}{n_2p}=-\\dfrac{1\\cdot60}{1{,}5\\cdot40}=-1{,}0$: capovolta, alta come l'oggetto.",
   "Il diottro ha due focali diverse: non si può usare $1/p+1/q=1/f$ con una sola $f$."
  ],
  "err": "Trattare il diottro come una lente sottile con $f=f_i$ (viene 120 cm), dimenticare $n_2$ davanti a $1/q$ (40 cm), oppure usare l'ingrandimento dello specchio $-q/p$ senza gli indici ($-1{,}5$).",
  "cards": [
   "12.7",
   "12.8",
   "12.13"
  ],
  "lab": "12",
  "pdf": "p. 63–65, 67"
 }
];
