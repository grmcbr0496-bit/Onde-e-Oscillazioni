"use strict";
/* Onde & Formule — quiz concettuali e domande sui grafici. File generato: modificare i sorgenti e ricostruire, oppure modificare qui con cura. */
/* Domanda: id, c, q, o (4 opzioni: la prima è quella giusta, l'app le mescola), e (spiegazione), lab?, card? */
const QUIZ = [
 {
  "c": 1,
  "q": "Raddoppi l'ampiezza di oscillazione di una massa su molla. Cosa succede al periodo?",
  "o": [
   "Resta uguale",
   "Raddoppia",
   "Si dimezza",
   "Aumenta di un fattore $\\sqrt{2}$"
  ],
  "e": "$\\omega_0=\\sqrt{k/m}$ dipende solo dal sistema. L'ampiezza la decidono le condizioni iniziali: il moto armonico è isocrono.",
  "id": "q1.1"
 },
 {
  "c": 1,
  "q": "Quadruplichi la massa attaccata alla molla. Il periodo…",
  "o": [
   "raddoppia",
   "quadruplica",
   "si dimezza",
   "non cambia"
  ],
  "e": "$T=2\\pi\\sqrt{m/k}$ va come $\\sqrt{m}$: massa ×4, periodo ×2.",
  "id": "q1.2"
 },
 {
  "c": 1,
  "q": "In quale punto dell'oscillazione la velocità della massa è massima?",
  "o": [
   "Nella posizione di equilibrio $x=0$",
   "Agli estremi $x=\\pm A$",
   "A metà strada, $x=A/2$",
   "È sempre la stessa"
  ],
  "e": "In $x=0$ l'energia potenziale è nulla e tutta l'energia è cinetica. Agli estremi la massa è ferma.",
  "id": "q1.3"
 },
 {
  "c": 1,
  "q": "Raddoppi l'ampiezza. L'energia totale dell'oscillatore…",
  "o": [
   "quadruplica",
   "raddoppia",
   "resta uguale",
   "si dimezza"
  ],
  "e": "$E=\\tfrac12 kA^2$: l'energia va col quadrato dell'ampiezza.",
  "id": "q1.4"
 },
 {
  "c": 1,
  "q": "Perché il pendolo è un oscillatore armonico solo per piccoli angoli?",
  "o": [
   "L'equazione contiene $\\sin\\vartheta$, che vale circa $\\vartheta$ solo per angoli piccoli",
   "Perché la gravità cambia con l'altezza",
   "Perché la massa del filo non è trascurabile",
   "Perché per angoli grandi c'è attrito"
  ],
  "e": "$\\ddot\\vartheta+\\frac{g}{l}\\sin\\vartheta=0$ non è lineare. Linearizzando $\\sin\\vartheta\\approx\\vartheta$ diventa l'equazione dell'oscillatore armonico.",
  "id": "q1.5"
 },
 {
  "c": 1,
  "q": "Porti un pendolo sulla Luna, dove $g$ è circa 6 volte più piccola. Il periodo…",
  "o": [
   "diventa circa 2,45 volte più lungo",
   "diventa 6 volte più lungo",
   "diventa 6 volte più corto",
   "resta uguale"
  ],
  "e": "$T=2\\pi\\sqrt{l/g}$: con $g/6$ il periodo cresce di $\\sqrt6\\approx2{,}45$.",
  "id": "q1.6"
 },
 {
  "c": 1,
  "q": "Spostamento e velocità di un oscillatore armonico sono…",
  "o": [
   "sfasati di $\\pi/2$",
   "in fase",
   "in controfase",
   "sfasati di $\\pi/4$"
  ],
  "e": "$x=A\\cos(\\omega_0 t)$ e $\\dot x=-A\\omega_0\\sin(\\omega_0 t)$: quando uno è massimo l'altro è nullo.",
  "id": "q1.7"
 },
 {
  "c": 2,
  "q": "Che cosa decide in quale dei tre regimi si trova un oscillatore smorzato?",
  "o": [
   "Il confronto tra $\\gamma$ e $\\omega_0$",
   "L'ampiezza iniziale",
   "Il segno della velocità iniziale",
   "Se $\\gamma$ è maggiore di 1"
  ],
  "e": "Le radici sono $\\lambda=-\\gamma\\pm\\sqrt{\\gamma^2-\\omega_0^2}$: conta il segno di $\\gamma^2-\\omega_0^2$.",
  "id": "q2.1"
 },
 {
  "c": 2,
  "q": "Un ammortizzatore deve riportare la ruota a posto il più in fretta possibile, senza oscillare. Che regime serve?",
  "o": [
   "Smorzamento critico",
   "Sovrasmorzato",
   "Sottosmorzato",
   "Nessuno smorzamento"
  ],
  "e": "Con $\\gamma=\\omega_0$ il ritorno all'equilibrio è il più rapido senza oscillazioni. Sovrasmorzato non oscilla ma torna più lentamente.",
  "id": "q2.2"
 },
 {
  "c": 2,
  "q": "Rispetto all'oscillatore senza attrito, il periodo di un oscillatore sottosmorzato è…",
  "o": [
   "un po' più lungo",
   "un po' più corto",
   "identico",
   "infinito"
  ],
  "e": "$\\omega=\\sqrt{\\omega_0^2-\\gamma^2}<\\omega_0$, quindi $T>T_0$.",
  "id": "q2.3"
 },
 {
  "c": 2,
  "q": "Dopo un tempo $\\tau=1/\\gamma$ l'ampiezza delle oscillazioni è scesa a circa…",
  "o": [
   "il 37% del valore iniziale",
   "la metà",
   "zero",
   "il 14% del valore iniziale"
  ],
  "e": "L'ampiezza va come $e^{-\\gamma t}$: in $\\tau$ diventa $1/e\\approx0{,}37$. È l'energia a scendere al 14% ($1/e^2$).",
  "id": "q2.4"
 },
 {
  "c": 2,
  "q": "L'energia di un oscillatore poco smorzato decade come…",
  "o": [
   "$e^{-2\\gamma t}$",
   "$e^{-\\gamma t}$",
   "linearmente nel tempo",
   "$e^{-\\gamma t/2}$"
  ],
  "e": "L'energia va col quadrato dell'ampiezza: $(e^{-\\gamma t})^2=e^{-2\\gamma t}$.",
  "id": "q2.5"
 },
 {
  "c": 2,
  "q": "In quali istanti l'oscillatore smorzato perde energia più in fretta?",
  "o": [
   "Quando passa per l'equilibrio, a velocità massima",
   "Agli estremi dell'oscillazione",
   "Sempre allo stesso ritmo",
   "Solo all'inizio del moto"
  ],
  "e": "$dE/dt=-2\\gamma m\\dot x^2$: la perdita è massima dove la velocità è massima e nulla nei punti di inversione.",
  "id": "q2.6"
 },
 {
  "c": 3,
  "q": "A regime, a quale frequenza oscilla un oscillatore forzato?",
  "o": [
   "A quella della forzante, $\\omega_F$",
   "Alla sua frequenza propria $\\omega_0$",
   "A $\\sqrt{\\omega_0^2-\\gamma^2}$",
   "Alla media tra $\\omega_F$ e $\\omega_0$"
  ],
  "e": "Il transitorio (alla frequenza propria) si spegne dopo qualche $1/\\gamma$; resta $B\\cos(\\omega_F t+\\varphi)$.",
  "id": "q3.1"
 },
 {
  "c": 3,
  "q": "Sei in risonanza e dimezzi $\\gamma$. L'ampiezza a regime…",
  "o": [
   "raddoppia",
   "si dimezza",
   "non cambia",
   "quadruplica"
  ],
  "e": "$B(\\omega_0)=\\dfrac{F_0}{2m\\gamma\\omega_0}$ è inversamente proporzionale a $\\gamma$.",
  "id": "q3.2"
 },
 {
  "c": 3,
  "q": "Alla risonanza, lo spostamento rispetto alla forza è…",
  "o": [
   "in quadratura: la forza è in fase con la velocità",
   "in fase",
   "in controfase",
   "sfasato di $\\pi/4$"
  ],
  "e": "$\\tan\\varphi=\\pm\\infty$, quindi $\\varphi=-\\pi/2$. La forza spinge sempre nel verso del moto e trasferisce il massimo di energia.",
  "id": "q3.3"
 },
 {
  "c": 3,
  "q": "Se forzi a una frequenza molto più alta della propria ($\\omega_F\\gg\\omega_0$), lo spostamento è…",
  "o": [
   "piccolo e quasi in controfase con la forza",
   "grande e in fase",
   "grande e in quadratura",
   "esattamente zero"
  ],
  "e": "La fase tende a $-\\pi$ e $B\\approx F_0/(m\\omega_F^2)$: il sistema non fa in tempo a seguire la forza.",
  "id": "q3.4"
 },
 {
  "c": 3,
  "q": "Perché l'altalena va spinta \"al momento giusto\"?",
  "o": [
   "Per dare energia in fase con la velocità, come alla risonanza",
   "Perché la frequenza propria cambia a ogni spinta",
   "Per ridurre l'attrito",
   "Altrimenti cambia il periodo del pendolo"
  ],
  "e": "Spingendo alla frequenza propria e nel verso del moto, ogni spinta aggiunge energia: è la risonanza.",
  "id": "q3.5"
 },
 {
  "c": 3,
  "q": "Il transitorio dipende dalle condizioni iniziali. E la soluzione a regime?",
  "o": [
   "No: $B$ e $\\varphi$ dipendono solo da $F_0$, $m$, $\\omega_0$, $\\gamma$, $\\omega_F$",
   "Sì, anche lei",
   "Dipende solo da $x_0$",
   "Dipende solo da $v_0$"
  ],
  "e": "Le condizioni iniziali fissano solo le costanti del transitorio, che svanisce.",
  "id": "q3.6"
 },
 {
  "c": 4,
  "q": "Quanti modi normali ha un sistema con 3 gradi di libertà?",
  "o": [
   "3",
   "1",
   "6",
   "Infiniti"
  ],
  "e": "$n$ gradi di libertà, $n$ equazioni, $n$ modi normali. Solo il continuo ne ha infiniti.",
  "id": "q4.1"
 },
 {
  "c": 4,
  "q": "Nel modo \"a pendolo\" dei due pendoli accoppiati, la molla…",
  "o": [
   "non si deforma: i pendoli si muovono in fase",
   "si deforma al massimo",
   "oscilla a frequenza doppia",
   "resta sempre compressa"
  ],
  "e": "Con $x_1=x_2$ la distanza tra le masse non cambia: la molla non lavora e $\\omega_a=\\sqrt{g/l}$.",
  "id": "q4.2"
 },
 {
  "c": 4,
  "q": "Perché il modo \"a respiro\" ha frequenza più alta di quello \"a pendolo\"?",
  "o": [
   "Anche la molla richiama le masse, e la sua forza si somma alla gravità",
   "Perché le masse diventano più leggere",
   "Perché i fili si accorciano",
   "Non è vero: è più bassa"
  ],
  "e": "$\\omega_b^2=\\dfrac{g}{l}+\\dfrac{2k}{m}$: più forza di richiamo, frequenza più alta.",
  "id": "q4.3"
 },
 {
  "c": 4,
  "q": "Che cosa si osserva nei battimenti?",
  "o": [
   "Un'oscillazione veloce la cui ampiezza cresce e cala lentamente",
   "Due oscillazioni separate una dopo l'altra",
   "Un'oscillazione che si smorza esponenzialmente",
   "Un'oscillazione alla frequenza $\\omega_a+\\omega_b$"
  ],
  "e": "$2A\\cos\\!\\left(\\frac{\\omega_a+\\omega_b}{2}t\\right)\\cos\\!\\left(\\frac{\\omega_a-\\omega_b}{2}t\\right)$: il primo coseno è veloce, il secondo è l'inviluppo lento.",
  "id": "q4.4"
 },
 {
  "c": 4,
  "q": "Due diapason suonano a 440 Hz e 444 Hz. Quante volte al secondo senti il suono rinforzarsi?",
  "o": [
   "4 volte",
   "2 volte",
   "442 volte",
   "884 volte"
  ],
  "e": "L'inviluppo $\\cos\\!\\left(\\frac{\\omega_a-\\omega_b}{2}t\\right)$ ha frequenza 2 Hz, ma il volume è massimo sia quando vale +1 sia quando vale −1: 4 rinforzi al secondo, $|f_1-f_2|$.",
  "id": "q4.5"
 },
 {
  "c": 4,
  "q": "Ogni moto di un sistema lineare con $n$ gradi di libertà si può scrivere come…",
  "o": [
   "una combinazione lineare dei suoi modi normali",
   "il prodotto dei modi normali",
   "un solo modo normale",
   "la somma delle frequenze dei modi"
  ],
  "e": "Grazie alla linearità vale la sovrapposizione: i modi normali sono i \"mattoni\" di ogni moto.",
  "id": "q4.6"
 },
 {
  "c": 5,
  "q": "In un'onda armonica sulla corda, che cosa viaggia lungo $x$?",
  "o": [
   "La perturbazione (forma ed energia), non i pezzi di corda",
   "I pezzi di corda, alla velocità $v$",
   "Niente: è tutto fermo",
   "L'intera corda trasla"
  ],
  "e": "Ogni punto della corda oscilla solo su e giù attorno alla sua posizione; a spostarsi è la forma dell'onda.",
  "id": "q5.1"
 },
 {
  "c": 5,
  "q": "Fissi un punto $x$ della corda e lo guardi nel tempo. Che cosa vedi?",
  "o": [
   "Un oscillatore armonico che va su e giù con periodo $T$",
   "Un punto fermo",
   "Un punto che avanza a velocità $v$",
   "Una retta"
  ],
  "e": "$\\psi(x_0,t)=A\\sin(kx_0-\\omega t)$ è un'oscillazione armonica nel tempo, di periodo $T=2\\pi/\\omega$.",
  "id": "q5.2"
 },
 {
  "c": 5,
  "q": "Fai una \"fotografia\" della corda (tempo fissato). Che cosa vedi?",
  "o": [
   "Una sinusoide nello spazio, di periodo $\\lambda$",
   "Un solo punto",
   "Una retta",
   "Una sinusoide nello spazio, di periodo $T$"
  ],
  "e": "A $t$ fisso $\\psi(x)=A\\sin(kx-\\omega t_0)$ si ripete ogni $\\lambda=2\\pi/k$.",
  "id": "q5.3"
 },
 {
  "c": 5,
  "q": "Muovi l'estremo della corda più velocemente (tensione e densità invariate). Che cosa cambia?",
  "o": [
   "$\\lambda$ diminuisce, $v$ resta uguale",
   "$v$ aumenta, $\\lambda$ resta uguale",
   "Aumentano sia $v$ sia $\\lambda$",
   "Nulla"
  ],
  "e": "$v=\\sqrt{T_0/\\rho_L}$ dipende solo dal mezzo. Con $\\nu$ più alta, $\\lambda=v/\\nu$ si accorcia.",
  "id": "q5.4"
 },
 {
  "c": 5,
  "q": "Quadruplichi la tensione della corda. La velocità delle onde…",
  "o": [
   "raddoppia",
   "quadruplica",
   "si dimezza",
   "non cambia"
  ],
  "e": "$v=\\sqrt{T_0/\\rho_L}$: tensione ×4, velocità ×2.",
  "id": "q5.5"
 },
 {
  "c": 5,
  "q": "In che verso viaggia l'onda $\\psi=A\\sin(kx+\\omega t)$?",
  "o": [
   "Verso sinistra ($x$ decrescenti)",
   "Verso destra",
   "Non viaggia: è stazionaria",
   "Dipende da $A$"
  ],
  "e": "È una funzione di $x+vt$: per tenere la fase costante, se $t$ cresce $x$ deve diminuire.",
  "id": "q5.6"
 },
 {
  "c": 5,
  "q": "In un'onda stazionaria, i nodi sono…",
  "o": [
   "punti sempre fermi, distanti $\\lambda/2$ l'uno dall'altro",
   "punti che oscillano al massimo, distanti $\\lambda$",
   "punti che viaggiano a velocità $v$",
   "punti distanti $\\lambda/4$"
  ],
  "e": "$2A\\sin(kx)\\cos(\\omega t)$ è nulla sempre dove $\\sin(kx)=0$, cioè ogni $\\lambda/2$.",
  "id": "q5.7"
 },
 {
  "c": 5,
  "q": "Perché una corda fissata agli estremi non può vibrare con una $\\lambda$ qualsiasi?",
  "o": [
   "Gli estremi devono essere nodi: in $L$ deve stare un numero intero di mezze lunghezze d'onda",
   "Perché la tensione cambia",
   "Perché $\\lambda$ deve essere uguale a $L$",
   "Perché $v$ dipende da $\\lambda$"
  ],
  "e": "$\\sin(kL)=0$ impone $k_n=n\\pi/L$, cioè $\\lambda_n=2L/n$: i modi sono quantizzati.",
  "id": "q5.8"
 },
 {
  "c": 5,
  "q": "In un'onda armonica sulla corda, dove passa più potenza in un dato istante?",
  "o": [
   "Dove la corda è più inclinata, cioè dove $\\psi$ passa per zero",
   "Sulle creste",
   "Ovunque allo stesso modo",
   "Solo agli estremi della corda"
  ],
  "e": "$P=T_0 v\\,(\\partial\\psi/\\partial x)^2$: è massima dove la pendenza è massima. Sulle creste la pendenza è nulla.",
  "id": "q5.9"
 },
 {
  "c": 5,
  "q": "Raddoppi l'ampiezza di un'onda armonica sulla corda. La potenza media trasportata…",
  "o": [
   "quadruplica",
   "raddoppia",
   "resta uguale",
   "si dimezza"
  ],
  "e": "$\\langle P\\rangle=\\tfrac12 T_0A^2k\\omega$ va come $A^2$.",
  "id": "q5.10"
 },
 {
  "c": 6,
  "q": "Un impulso arriva su un estremo fisso (un muro). L'impulso riflesso è…",
  "o": [
   "capovolto",
   "dritto",
   "assente",
   "alto il doppio"
  ],
  "e": "Estremo fisso = $\\rho_2\\to\\infty$: $r=-1$, sfasamento di $\\pi$.",
  "id": "q6.1"
 },
 {
  "c": 6,
  "q": "L'onda passa da una corda leggera a una pesante ($\\rho_1<\\rho_2$). L'onda riflessa è…",
  "o": [
   "capovolta ($r<0$)",
   "dritta ($r>0$)",
   "assente",
   "più veloce di quella incidente"
  ],
  "e": "$r=\\dfrac{\\sqrt{\\rho_1}-\\sqrt{\\rho_2}}{\\sqrt{\\rho_1}+\\sqrt{\\rho_2}}<0$ quando il secondo mezzo è più denso.",
  "id": "q6.2"
 },
 {
  "c": 6,
  "q": "Quando non c'è onda riflessa?",
  "o": [
   "Quando le due corde hanno la stessa densità",
   "Quando $\\rho_2\\gg\\rho_1$",
   "Mai",
   "Quando l'onda è armonica"
  ],
  "e": "Con $\\rho_1=\\rho_2$ si ha $r=0$ e $t=1$: l'onda non \"sente\" la giunzione.",
  "id": "q6.3"
 },
 {
  "c": 6,
  "q": "Passando da una corda all'altra, che cosa resta uguale?",
  "o": [
   "La frequenza $\\omega$",
   "La lunghezza d'onda",
   "La velocità",
   "Il numero d'onda $k$"
  ],
  "e": "Se $\\omega$ cambiasse, in $x=0$ le onde perderebbero la fase e la corda non resterebbe continua. Cambiano $v$, $k$, $\\lambda$.",
  "id": "q6.4"
 },
 {
  "c": 6,
  "q": "Con estremo libero si ha $t=2$. Viola la conservazione dell'energia?",
  "o": [
   "No: l'energia trasmessa è $T=\\frac{k_2}{k_1}t^2$, e lì $k_2$ è piccolissimo",
   "Sì, è solo un'approssimazione",
   "Sì: l'energia viene creata",
   "No, perché $r=0$"
  ],
  "e": "Il bilancio è sulle potenze, che dipendono da $k$: $R+T=1$ sempre.",
  "id": "q6.5"
 },
 {
  "c": 6,
  "q": "Perché si impone che $\\psi$ sia continua nel punto di giunzione?",
  "o": [
   "Altrimenti la corda si spezzerebbe",
   "Perché l'energia si conserva",
   "Perché $\\omega$ è la stessa",
   "Perché la tensione è la stessa"
  ],
  "e": "È la condizione geometrica: i due pezzi di corda sono attaccati. L'energia dà la seconda condizione.",
  "id": "q6.6"
 },
 {
  "c": 7,
  "q": "Le onde sonore nell'aria sono…",
  "o": [
   "longitudinali: le particelle oscillano nella direzione di propagazione",
   "trasversali",
   "elettromagnetiche",
   "onde senza movimento delle particelle"
  ],
  "e": "Come nella corda le particelle non viaggiano, ma qui oscillano avanti e indietro lungo la direzione dell'onda.",
  "id": "q7.1"
 },
 {
  "c": 7,
  "q": "Dove c'è un nodo di spostamento, la variazione di pressione…",
  "o": [
   "è massima (ventre di pressione)",
   "è nulla (nodo di pressione)",
   "è sempre negativa",
   "non è definita"
  ],
  "e": "$dP\\propto-\\partial\\psi/\\partial x$: dove le particelle non si muovono vengono compresse e rarefatte di più.",
  "id": "q7.2"
 },
 {
  "c": 7,
  "q": "Perché il calcolo isotermo di Newton sbagliava la velocità del suono?",
  "o": [
   "Le compressioni sono troppo rapide per scambiare calore: il processo è adiabatico",
   "Newton non conosceva la densità dell'aria",
   "L'aria si comporta come un liquido",
   "Newton trascurava la gravità"
  ],
  "e": "Con l'adiabatica compare $\\gamma$: $v=\\sqrt{\\gamma P_0/\\rho_0}\\approx331$ m/s invece di 280 m/s.",
  "id": "q7.3"
 },
 {
  "c": 7,
  "q": "La velocità del suono nell'aria cresce con…",
  "o": [
   "la temperatura, come $\\sqrt{T}$",
   "la pressione, a temperatura costante",
   "la frequenza del suono",
   "l'ampiezza del suono"
  ],
  "e": "$v=\\sqrt{\\gamma k_BT/\\mu}$. A $T$ fissata $P/\\rho$ non cambia, quindi la pressione da sola non conta.",
  "id": "q7.4"
 },
 {
  "c": 7,
  "q": "Un suono a 80 dB, rispetto a uno a 60 dB, ha intensità…",
  "o": [
   "100 volte maggiore",
   "20 volte maggiore",
   "1,33 volte maggiore",
   "2 volte maggiore"
  ],
  "e": "Ogni 10 dB l'intensità si moltiplica per 10: +20 dB vuol dire ×100.",
  "id": "q7.5"
 },
 {
  "c": 7,
  "q": "Ti allontani da una sorgente puntiforme da 1 m a 2 m (senza assorbimento). Il livello sonoro…",
  "o": [
   "cala di circa 6 dB",
   "cala di 3 dB",
   "si dimezza",
   "cala di 10 dB"
  ],
  "e": "$I\\propto1/r^2$: l'intensità diventa 1/4 e $10\\log_{10}(1/4)\\approx-6$ dB.",
  "id": "q7.6"
 },
 {
  "c": 7,
  "q": "Una canna aperta–chiusa, rispetto a una aperta–aperta lunga uguale, ha la fondamentale…",
  "o": [
   "a frequenza metà",
   "a frequenza doppia",
   "alla stessa frequenza",
   "a frequenza tripla"
  ],
  "e": "Aperta–chiusa: $\\lambda_1=4L$. Aperta–aperta: $\\lambda_1=2L$. Lambda doppia, frequenza metà.",
  "id": "q7.7"
 },
 {
  "c": 7,
  "q": "Quali armoniche mancano in una canna aperta–chiusa?",
  "o": [
   "Le pari",
   "Le dispari",
   "Nessuna",
   "Solo la fondamentale"
  ],
  "e": "$f_m=(2m-1)\\,v/4L$: solo multipli dispari della fondamentale.",
  "id": "q7.8"
 },
 {
  "c": 8,
  "q": "Che cos'è un fronte d'onda?",
  "o": [
   "L'insieme dei punti in cui l'onda ha la stessa fase",
   "Il punto più alto dell'onda",
   "La direzione di propagazione",
   "Il bordo della sorgente"
  ],
  "e": "Per un'onda piana è un piano $\\vec r\\cdot\\hat u-vt=$ costante; per una sferica una sfera.",
  "id": "q8.1"
 },
 {
  "c": 8,
  "q": "Il vettore d'onda $\\vec k$ di un'onda piana è…",
  "o": [
   "perpendicolare ai fronti d'onda, nel verso di propagazione",
   "parallelo ai fronti d'onda",
   "sempre diretto lungo $z$",
   "nullo"
  ],
  "e": "$\\vec k=k\\hat u$ punta dove va l'onda; i fronti sono i piani perpendicolari a $\\hat u$.",
  "id": "q8.2"
 },
 {
  "c": 8,
  "q": "Raddoppi la distanza da una sorgente puntiforme. L'ampiezza dell'onda sferica…",
  "o": [
   "si dimezza",
   "diventa un quarto",
   "resta uguale",
   "raddoppia"
  ],
  "e": "L'intensità va come $1/r^2$ e l'intensità va come $A^2$: quindi $A\\propto1/r$.",
  "id": "q8.3"
 },
 {
  "c": 8,
  "q": "Perché l'intensità di un'onda sferica cala come $1/r^2$?",
  "o": [
   "La stessa potenza si distribuisce su una sfera di area $4\\pi r^2$",
   "Il mezzo assorbe l'energia",
   "La frequenza diminuisce con la distanza",
   "La velocità cala con la distanza"
  ],
  "e": "È attenuazione geometrica: nessuna energia si perde, si spalma su una superficie più grande.",
  "id": "q8.4"
 },
 {
  "c": 8,
  "q": "Molto lontano dalla sorgente, un pezzo di onda sferica si comporta come…",
  "o": [
   "un'onda piana",
   "un'onda stazionaria",
   "un'onda senza energia",
   "un singolo impulso"
  ],
  "e": "Su una zona piccola rispetto al raggio, la sfera è quasi un piano: è per questo che usiamo l'onda piana.",
  "id": "q8.5"
 },
 {
  "c": 8,
  "q": "Il laplaciano $\\nabla^2\\psi$ in D'Alembert 3D è la generalizzazione di…",
  "o": [
   "la curvatura $\\partial^2\\psi/\\partial x^2$ della corda",
   "la pendenza $\\partial\\psi/\\partial x$",
   "la velocità $\\partial\\psi/\\partial t$",
   "l'ampiezza $A$"
  ],
  "e": "È la divergenza del gradiente: misura quanto $\\psi$ in un punto differisce dalla media dei dintorni, come la curvatura in 1D.",
  "id": "q8.6"
 },
 {
  "c": 9,
  "q": "Un'ambulanza si avvicina e poi si allontana. Che cosa senti?",
  "o": [
   "Una frequenza più alta mentre si avvicina, più bassa mentre si allontana",
   "Il contrario",
   "Sempre la stessa frequenza, solo più forte",
   "Più alta in entrambi i casi"
  ],
  "e": "Davanti alla sorgente i fronti si schiacciano ($\\lambda$ più corta), dietro si allargano.",
  "id": "q9.1"
 },
 {
  "c": 9,
  "q": "Se si muove la sorgente e tu stai fermo, che cosa cambia nell'onda che ti arriva?",
  "o": [
   "La lunghezza d'onda: i fronti davanti alla sorgente sono più vicini",
   "La velocità del suono",
   "Niente",
   "Solo l'ampiezza"
  ],
  "e": "In un periodo la sorgente avanza di $v_ST$: $\\lambda'=(c-v_S)T$, e $c$ non cambia.",
  "id": "q9.2"
 },
 {
  "c": 9,
  "q": "Se ti muovi tu e la sorgente è ferma, che cosa cambia?",
  "o": [
   "La velocità con cui incontri i fronti; $\\lambda$ resta la stessa",
   "La lunghezza d'onda",
   "La frequenza emessa",
   "Niente"
  ],
  "e": "La velocità relativa diventa $c\\pm v_A$, quindi $f'=(c\\pm v_A)/\\lambda$.",
  "id": "q9.3"
 },
 {
  "c": 9,
  "q": "A parità di velocità relativa, l'effetto Doppler è lo stesso se si muove la sorgente o l'ascoltatore?",
  "o": [
   "No: per il suono conta chi si muove rispetto all'aria",
   "Sì, sempre",
   "Sì, ma solo se $v<c/2$",
   "Dipende dalla frequenza emessa"
  ],
  "e": "Le formule sono diverse: $v_A$ sta al numeratore, $v_S$ al denominatore. L'aria è un riferimento privilegiato.",
  "id": "q9.4"
 },
 {
  "c": 9,
  "q": "Un aereo supersonico raddoppia la sua velocità. Il cono di Mach…",
  "o": [
   "si stringe",
   "si allarga",
   "resta uguale",
   "scompare"
  ],
  "e": "$\\sin\\theta=c/v_S$: con $v_S$ doppia, $\\sin\\theta$ si dimezza e il cono si chiude.",
  "id": "q9.5"
 },
 {
  "c": 9,
  "q": "La sorgente passa davanti a te muovendosi perpendicolarmente alla linea che vi unisce. In quell'istante l'effetto Doppler è…",
  "o": [
   "nullo: conta solo la componente di $v_S$ lungo la linea visiva",
   "massimo",
   "uguale a quando viene verso di te",
   "sempre negativo"
  ],
  "e": "Se la sorgente non si avvicina né si allontana da te in quell'istante, la frequenza non è spostata.",
  "id": "q9.6"
 },
 {
  "c": 10,
  "q": "Sommi due onde identiche in controfase. Risultato?",
  "o": [
   "Si annullano: interferenza distruttiva",
   "Un'onda di ampiezza doppia",
   "Un'onda di intensità doppia",
   "Un'onda a frequenza doppia"
  ],
  "e": "Con $\\varphi=\\pi$: $2A_0\\cos(\\pi/2)=0$.",
  "id": "q10.1"
 },
 {
  "c": 10,
  "q": "Due onde in fase, ciascuna di intensità $I_0$. Intensità della somma?",
  "o": [
   "$4I_0$",
   "$2I_0$",
   "$I_0$",
   "0"
  ],
  "e": "Le ampiezze si sommano ($2A_0$) e l'intensità va col quadrato: $4I_0$.",
  "id": "q10.2"
 },
 {
  "c": 10,
  "q": "Nei massimi di interferenza c'è $4I_0$ invece di $2I_0$. Da dove arriva l'energia in più?",
  "o": [
   "Dai minimi, dove c'è 0: in media resta $2I_0$, l'energia si ridistribuisce",
   "Viene creata dall'interferenza",
   "Dal calore del mezzo",
   "È un errore della formula"
  ],
  "e": "La media di $4I_0\\cos^2(\\varphi/2)$ su tutte le fasi è $2I_0$: l'energia si sposta, non si crea.",
  "id": "q10.3"
 },
 {
  "c": 10,
  "q": "Nell'esperimento di Young avvicini le fenditure ($d$ più piccolo). Le frange…",
  "o": [
   "si allargano",
   "si stringono",
   "restano uguali",
   "spariscono subito"
  ],
  "e": "$\\Delta x=r\\lambda/d$: $d$ più piccolo, frange più distanziate.",
  "id": "q10.4"
 },
 {
  "c": 10,
  "q": "Rifai Young con luce rossa invece che blu. Le frange sono…",
  "o": [
   "più distanziate",
   "più vicine",
   "uguali",
   "invertite"
  ],
  "e": "Il rosso ha $\\lambda$ più grande e $\\Delta x=r\\lambda/d$.",
  "id": "q10.5"
 },
 {
  "c": 10,
  "q": "Perché nell'esperimento di Young si usa una sola sorgente che illumina due fenditure?",
  "o": [
   "Per avere due sorgenti coerenti, con sfasamento costante",
   "Per avere più luce",
   "Per eliminare la diffrazione",
   "Perché due lampade scaldano troppo"
  ],
  "e": "Due sorgenti indipendenti hanno una fase relativa che cambia a caso: le frange si cancellerebbero in media.",
  "id": "q10.6"
 },
 {
  "c": 10,
  "q": "Tra due onde c'è una differenza di cammino di $3\\lambda/2$. L'interferenza è…",
  "o": [
   "distruttiva",
   "costruttiva",
   "a metà tra le due",
   "impossibile da dire"
  ],
  "e": "$\\Delta\\ell=(2n+1)\\lambda/2$ con $n=1$: distruttiva.",
  "id": "q10.7"
 },
 {
  "c": 11,
  "q": "Stringi la fenditura ($a$ più piccolo). Il picco centrale di diffrazione…",
  "o": [
   "si allarga",
   "si stringe",
   "non cambia",
   "sparisce"
  ],
  "e": "Il primo minimo è a $\\sin\\theta_1=\\lambda/a$: $a$ più piccolo, picco più largo.",
  "id": "q11.1"
 },
 {
  "c": 11,
  "q": "Che cosa succede se la fenditura è più stretta della lunghezza d'onda ($a<\\lambda$)?",
  "o": [
   "Non ci sono minimi: l'onda si diffonde in tutte le direzioni",
   "Non passa niente",
   "Il picco diventa strettissimo",
   "Compaiono infiniti minimi"
  ],
  "e": "Servirebbe $\\sin\\theta_1=\\lambda/a>1$: impossibile. La diffrazione è massima e isotropa.",
  "id": "q11.2"
 },
 {
  "c": 11,
  "q": "Perché senti la musica da dietro l'angolo ma non vedi chi suona?",
  "o": [
   "Il suono ha $\\lambda$ paragonabile a porte e finestre e diffrange molto; la luce ha $\\lambda$ minuscola",
   "La luce è più veloce del suono",
   "Il suono è più intenso",
   "La luce non diffrange mai"
  ],
  "e": "La diffrazione conta quando le aperture sono paragonabili a $\\lambda$: metri per il suono, centinaia di nanometri per la luce.",
  "id": "q11.3"
 },
 {
  "c": 11,
  "q": "Un telescopio con specchio più grande (D maggiore)…",
  "o": [
   "distingue dettagli più piccoli",
   "raccoglie più luce ma ha la stessa risoluzione",
   "ha una risoluzione peggiore",
   "cambia la lunghezza d'onda osservata"
  ],
  "e": "Criterio di Rayleigh: $\\theta_R=1{,}22\\,\\lambda/D$ diminuisce al crescere di $D$.",
  "id": "q11.4"
 },
 {
  "c": 11,
  "q": "In un reticolo aumenti il numero di fenditure $N$ con lo stesso passo $d$. I massimi principali…",
  "o": [
   "restano nelle stesse posizioni ma diventano più stretti e intensi",
   "si spostano verso l'esterno",
   "si allargano",
   "spariscono"
  ],
  "e": "Le posizioni $d\\sin\\theta=n\\lambda$ non dipendono da $N$; la larghezza $\\lambda/(Nd\\cos\\theta)$ e l'intensità $N^2I_0$ sì.",
  "id": "q11.5"
 },
 {
  "c": 11,
  "q": "Un reticolo separa la luce bianca. Quale colore è deviato di più?",
  "o": [
   "Il rosso",
   "Il blu",
   "Tutti allo stesso modo",
   "Il verde"
  ],
  "e": "$\\sin\\theta=n\\lambda/d$: $\\lambda$ più grande, angolo più grande. Nel prisma è il contrario.",
  "id": "q11.6"
 },
 {
  "c": 11,
  "q": "Doppia fenditura: perché alcuni massimi di interferenza mancano?",
  "o": [
   "Cadono su un minimo della diffrazione della singola fenditura",
   "Le due fenditure non sono coerenti",
   "Per errori sperimentali",
   "Perché $d<a$"
  ],
  "e": "L'interferenza è modulata dall'inviluppo $\\mathrm{sinc}^2$: dove questo è zero, anche il massimo sparisce.",
  "id": "q11.7"
 },
 {
  "c": 12,
  "q": "Un raggio passa dall'aria all'acqua. Rispetto alla normale…",
  "o": [
   "si avvicina ($\\theta_t<\\theta_i$)",
   "si allontana",
   "non devia",
   "torna indietro"
  ],
  "e": "$n_1\\sin\\theta_i=n_2\\sin\\theta_t$ con $n_2>n_1$ dà $\\sin\\theta_t<\\sin\\theta_i$.",
  "id": "q12.1"
 },
 {
  "c": 12,
  "q": "La luce passa dall'aria al vetro. Che cosa resta uguale?",
  "o": [
   "La frequenza",
   "La lunghezza d'onda",
   "La velocità",
   "Il numero d'onda"
  ],
  "e": "Come per la corda: $\\omega$ è la stessa, mentre $v=c/n$, $\\lambda=\\lambda_0/n$ e $k=nk_0$ cambiano.",
  "id": "q12.2"
 },
 {
  "c": 12,
  "q": "La riflessione totale è possibile…",
  "o": [
   "solo passando da un mezzo più denso a uno meno denso ($n_1>n_2$)",
   "solo da un mezzo meno denso a uno più denso",
   "sempre, per angoli abbastanza grandi",
   "mai con l'acqua"
  ],
  "e": "Serve $\\sin\\theta_c=n_2/n_1<1$. È il principio delle fibre ottiche.",
  "id": "q12.3"
 },
 {
  "c": 12,
  "q": "Che cosa afferma il principio di Fermat?",
  "o": [
   "La luce segue il percorso che richiede il tempo minimo",
   "La luce segue il percorso più corto",
   "La luce va sempre in linea retta",
   "La luce sceglie il percorso più lungo"
  ],
  "e": "Nello stesso mezzo tempo minimo vuol dire distanza minima; tra due mezzi no, ed è da qui che nasce la legge di Snell (il bagnino).",
  "id": "q12.4"
 },
 {
  "c": 12,
  "q": "Metti un oggetto tra il fuoco e una lente convergente ($p<f$). L'immagine è…",
  "o": [
   "virtuale, dritta e ingrandita",
   "reale e capovolta",
   "reale e rimpicciolita",
   "assente"
  ],
  "e": "$1/q=1/f-1/p<0$, quindi $q<0$ (virtuale) e $M=-q/p>1$. È la lente d'ingrandimento.",
  "id": "q12.5"
 },
 {
  "c": 12,
  "q": "Uno specchio convesso dà sempre immagini…",
  "o": [
   "virtuali, dritte e rimpicciolite",
   "reali e capovolte",
   "reali e ingrandite",
   "virtuali e capovolte"
  ],
  "e": "Con $r<0$ il fuoco è dietro lo specchio: i raggi riflessi divergono. Per questo si usa negli specchietti delle auto.",
  "id": "q12.6"
 },
 {
  "c": 12,
  "q": "Perché un raggio che passa per il centro di una lente sottile non viene deviato?",
  "o": [
   "Lì le due facce sono quasi parallele, come una lastra sottile",
   "Perché lì $n=1$",
   "Perché la luce rallenta",
   "Perché il centro è il fuoco"
  ],
  "e": "Una lastra a facce parallele sottile sposta il raggio di pochissimo senza cambiarne la direzione.",
  "id": "q12.7"
 },
 {
  "c": 12,
  "q": "Da dove nasce l'aberrazione cromatica delle lenti?",
  "o": [
   "$n$ dipende da $\\lambda$: i colori hanno fuochi diversi",
   "La lente è troppo spessa",
   "I raggi sono paralleli",
   "Il vetro assorbe il blu"
  ],
  "e": "Nell'equazione del costruttore $1/f=(n-1)(1/r_1-1/r_2)$, se $n$ cambia col colore cambia anche $f$.",
  "id": "q12.8"
 }
];

/* Onde & Formule — quiz concettuali: correzioni alle 83 domande base, nuove domande, domande "Leggi il grafico".
   QUIZ_FIX: solo i campi da cambiare. QUIZ_NEW / GRAPHS: la prima opzione è quella giusta (l'app le mescola). */
const QUIZ_FIX = {
 "q1.1": { lab: "1", card: "1.5" },
 "q1.2": { lab: "1", card: "1.5" },
 "q1.3": { lab: "1", card: "1.10" },
 "q1.4": { lab: "1", card: "1.10" },
 "q1.5": { lab: "1", card: "1.6" },
 "q1.6": { lab: "1", card: "1.6" },
 "q1.7": { lab: "1", card: "1.3" },
 "q2.1": { lab: "2", card: "2.2" },
 "q2.2": { lab: "2", card: "2.4" },
 "q2.3": { lab: "2", card: "2.5" },
 "q2.4": { lab: "2", card: "2.5" },
 "q2.5": { lab: "2", card: "2.10" },
 "q2.6": { lab: "2", card: "2.11" },
 "q3.1": { lab: "3", card: "3.2" },
 "q3.2": { lab: "3", card: "3.5" },
 "q3.3": { lab: "3", card: "3.6" },
 "q3.4": { lab: "3", card: "3.4" },
 "q3.5": { lab: "3", card: "3.6" },
 "q3.6": { lab: "3", card: "3.3" },
 "q4.1": { lab: "4", card: "4.4" },
 "q4.2": { lab: "4", card: "4.2" },
 "q4.3": { lab: "4", card: "4.2" },
 "q4.4": { lab: "4", card: "4.5" },
 "q4.5": { lab: "4", card: "4.5" },
 "q4.6": { lab: "4", card: "4.4" },
 "q5.1": { lab: "5", card: "5.3" },
 "q5.2": { lab: "5", card: "5.4" },
 "q5.3": { lab: "5", card: "5.4" },
 "q5.4": { q: "Fai oscillare l'estremo della corda con frequenza più alta (tensione e densità invariate). Che cosa cambia?", lab: "5", card: "5.4" },
 "q5.5": { lab: "5", card: "5.1" },
 "q5.6": { lab: "5", card: "5.3" },
 "q5.7": { lab: "5", card: "5.8" },
 "q5.8": { lab: "5", card: "5.6" },
 "q5.9": { lab: "5", card: "5.10" },
 "q5.10": { lab: "5", card: "5.11" },
 "q6.1": { lab: "6", card: "6.5" },
 "q6.2": { lab: "6", card: "6.7" },
 "q6.3": { lab: "6", card: "6.3" },
 "q6.4": { lab: "6", card: "6.1" },
 "q6.5": { lab: "6", card: "6.6" },
 "q6.6": { lab: "6", card: "6.1" },
 "q7.1": { lab: "7", card: "7.1" },
 "q7.2": { lab: "7", card: "7.3" },
 "q7.3": { lab: "7", card: "7.5" },
 "q7.4": { lab: "7", card: "7.6" },
 "q7.5": { lab: "7b", card: "7.12" },
 "q7.6": { lab: "7b", card: "7.18" },
 "q7.7": { lab: "7", card: "7.17" },
 "q7.8": { lab: "7", card: "7.17" },
 "q8.1": { lab: "8", card: "8.2" },
 "q8.2": { lab: "8", card: "8.2" },
 "q8.3": { lab: "8", card: "8.4" },
 "q8.4": { lab: "8", card: "7.13" },
 "q8.5": { lab: "8", card: "8.2" },
 "q8.6": { lab: "8", card: "8.5" },
 "q9.1": { lab: "9", card: "9.3" },
 "q9.2": { lab: "9", card: "9.3" },
 "q9.3": { lab: "9", card: "9.2" },
 "q9.4": { lab: "9", card: "9.1" },
 "q9.5": { lab: "9", card: "9.5" },
 "q9.6": { q: "Una sorgente sonora ti passa davanti. Il suono emesso nell'istante in cui la sua velocità è perpendicolare alla linea che vi unisce ti arriva con frequenza…",
   o: ["non spostata: conta solo la componente di $v_S$ lungo la linea visiva", "spostata al massimo verso l'alto", "spostata come se la sorgente venisse dritta verso di te", "sempre più bassa di quella emessa"],
   e: "Il Doppler dipende da $v_S\\cos\\theta$, la componente lungo la congiungente: se all'emissione è nulla, $f'=f$. Attenzione: ciò che senti nell'istante del passaggio più vicino è partito un po' prima, quando la sorgente si avvicinava ancora, quindi è appena più alto.",
   lab: "9", card: "9.1" },
 "q10.1": { lab: "10", card: "10.4" },
 "q10.2": { lab: "10", card: "10.3" },
 "q10.3": { lab: "10", card: "10.3" },
 "q10.4": { lab: "10", card: "10.7" },
 "q10.5": { lab: "10", card: "10.7" },
 "q10.6": { lab: "10", card: "10.6" },
 "q10.7": { lab: "10", card: "10.4" },
 "q11.1": { lab: "11", card: "11.2" },
 "q11.2": { lab: "11", card: "11.2" },
 "q11.3": { lab: "11", card: "11.2" },
 "q11.4": { lab: "11", card: "11.5" },
 "q11.5": { lab: "11", card: "11.13" },
 "q11.6": { lab: "11", card: "11.11" },
 "q11.7": { lab: "11", card: "11.16" },
 "q12.1": { lab: "12", card: "12.3" },
 "q12.2": { lab: "12", card: "12.1" },
 "q12.3": { o: ["solo passando da un mezzo con indice maggiore a uno con indice minore ($n_1>n_2$)", "solo passando da un mezzo con indice minore a uno con indice maggiore", "sempre, per angoli abbastanza grandi", "mai con l'acqua"], lab: "12", card: "12.4" },
 "q12.4": { lab: "12b", card: "12.6" },
 "q12.5": { lab: "12", card: "12.11" },
 "q12.6": { lab: "12", card: "12.9" },
 "q12.7": { lab: "12", card: "12.11" },
 "q12.8": { lab: "12", card: "12.10" }
};

const QUIZ_NEW = [
 /* ---------- 1 Oscillatore armonico ---------- */
 { id: "q1.8", c: 1, q: "Una massa su molla parte dall'equilibrio ($x_0=0$) con velocità $v_0>0$. Quale legge oraria la descrive?",
   o: ["$x(t)=\\dfrac{v_0}{\\omega_0}\\sin(\\omega_0 t)$", "$x(t)=\\dfrac{v_0}{\\omega_0}\\cos(\\omega_0 t)$", "$x(t)=v_0\\sin(\\omega_0 t)$", "$x(t)=v_0\\,t$"],
   e: "Da $x=A\\cos\\omega_0t+B\\sin\\omega_0t$: $x(0)=0$ dà $A=0$, $\\dot x(0)=v_0$ dà $B=v_0/\\omega_0$. Il coseno partirebbe dal massimo; senza $1/\\omega_0$ le unità non tornano (m/s invece di m); $v_0t$ è un moto uniforme, senza molla.", lab: "1", card: "1.8" },
 { id: "q1.9", c: 1, q: "Una pallina sta vicino al fondo di una buca di potenziale $U(x)$ qualsiasi, con il minimo in $x=0$. Che cosa fissa la frequenza delle piccole oscillazioni?",
   o: ["La curvatura del fondo: $\\omega_0^2=U''(0)/m$", "La profondità della buca, $U(0)$", "La pendenza $U'(0)$", "L'ampiezza con cui la lasci andare"],
   e: "Vicino al minimo $U'(0)=0$ e $U\\approx\\tfrac12U''(0)\\,x^2$: è una molla con $\\alpha=U''(0)$. $U(0)$ è una costante arbitraria e la pendenza nel minimo è nulla: nessuna delle due entra nella forza $-dU/dx$.", lab: "1", card: "1.7" },
 { id: "q1.10", c: 1, q: "Un oscillatore armonico ha pulsazione $\\omega_0$. Con che pulsazione oscilla la sua energia cinetica?",
   o: ["$2\\omega_0$", "$\\omega_0$", "$\\omega_0/2$", "Non oscilla: è costante"],
   e: "$T=\\tfrac12m\\omega_0^2A^2\\sin^2(\\omega_0t+\\varphi)$ e $\\sin^2\\alpha=\\tfrac12(1-\\cos2\\alpha)$: si ripete ogni mezzo periodo. Costante è la somma $T+U$, non $T$ da sola; $T$ e $U$ sono in opposizione: quando una è massima l'altra è nulla.", lab: "1", card: "1.10" },
 { id: "q1.11", c: 1, q: "Filmi un oscillatore armonico senza attrito e proietti il film al contrario. Chi guarda vede…",
   o: ["un moto fisicamente possibile: se $x(t)$ è soluzione lo è anche $x(-t)$", "un moto impossibile, perché la molla dovrebbe spingere al contrario", "un moto possibile solo se il film parte dall'equilibrio", "un oscillatore che si smorza"],
   e: "$\\ddot x+\\omega_0^2x=0$ contiene solo la derivata seconda, che non cambia segno con $t\\to-t$: il sistema ideale è reversibile. È il termine $2\\gamma\\dot x$ dell'attrito a introdurre una freccia del tempo.", lab: "1", card: "1.1" },

 /* ---------- 2 Oscillatore smorzato ---------- */
 { id: "q2.7", c: 2, q: "Nello smorzamento critico ($\\gamma=\\omega_0$) la soluzione generale è $e^{-\\gamma t}(C_1+C_2t)$. Perché compare il termine $t\\,e^{-\\gamma t}$?",
   o: ["L'equazione caratteristica ha una sola radice, $\\lambda=-\\gamma$: serve una seconda soluzione indipendente", "Serve a far oscillare il sistema", "Perché $e^{-\\gamma t}$ da sola non risolve l'equazione", "Tiene conto di una forza esterna"],
   e: "Un'equazione del 2° ordine vuole due soluzioni indipendenti (due condizioni iniziali). Con $\\Delta=0$ la radice è doppia: $e^{-\\gamma t}$ è soluzione ma non basta, e si prova $u(t)e^{-\\gamma t}$ con $u=t$. Il moto resta senza oscillazioni.", lab: "2", card: "2.4" },
 { id: "q2.8", c: 2, q: "Lasci una massa ferma in $x_0$ ($v_0=0$), con smorzamento debole. Nella legge oraria $x=Ae^{-\\gamma t}\\cos(\\omega t+\\varphi)$ la costante $A$ è…",
   o: ["un po' più grande di $x_0$: $A=x_0\\sqrt{1+\\gamma^2/\\omega^2}$", "esattamente $x_0$", "un po' più piccola di $x_0$", "nulla, perché $v_0=0$"],
   e: "La condizione $\\dot x(0)=-\\gamma x_0-\\omega A\\sin\\varphi=0$ richiede $\\tan\\varphi=-\\gamma/\\omega\\neq0$. Con la fase diversa da zero, per avere $A\\cos\\varphi=x_0$ serve $A>x_0$. Solo per $\\gamma\\to0$ si ritrova $A=x_0$.", lab: "2", card: "2.9" },
 { id: "q2.9", c: 2, q: "Un oscillatore è già sovrasmorzato. Aumenti ancora $\\gamma$. Il ritorno all'equilibrio…",
   o: ["rallenta: l'esponenziale lento ha $|\\lambda_1|=\\gamma-\\sqrt{\\gamma^2-\\omega_0^2}$, che diminuisce", "accelera, perché c'è più attrito", "diventa oscillante", "non cambia: oltre il critico conta solo $\\omega_0$"],
   e: "Per $\\gamma\\gg\\omega_0$ si ha $|\\lambda_1|\\approx\\omega_0^2/(2\\gamma)$: più attrito, moto più lento, come un pistone nel miele. Il ritorno più rapido senza oscillare è quello critico, $\\gamma=\\omega_0$.", lab: "2", card: "2.3" },
 { id: "q2.10", c: 2, q: "L'ampiezza di un oscillatore smorzato si riduce di un fattore $1/e$ in 2 s. In quanto tempo si riduce di $1/e$ la sua energia?",
   o: ["1 s", "2 s", "4 s", "0,5 s"],
   e: "Ampiezza $\\propto e^{-\\gamma t}$, quindi $\\gamma=0{,}5\\,\\mathrm{s^{-1}}$. L'energia va col quadrato, $e^{-2\\gamma t}$: tempo caratteristico $1/(2\\gamma)=1$ s. Essendo un quadrato, l'energia cala più in fretta dell'ampiezza, non più piano.", lab: "2", card: "2.10" },

 /* ---------- 3 Oscillatore forzato ---------- */
 { id: "q3.7", c: 3, q: "$x_1(t)$ e $x_2(t)$ risolvono la stessa equazione dell'oscillatore forzato, con condizioni iniziali diverse. Che cos'è $x_1-x_2$?",
   o: ["Una soluzione dell'oscillatore smorzato libero (equazione omogenea)", "Un'altra soluzione dell'equazione forzata", "Sempre zero", "Una soluzione con forzante doppia"],
   e: "Sottraendo, i due termini $\\frac{F_0}{m}\\cos\\omega_Ft$ si cancellano: resta $\\ddot g+2\\gamma\\dot g+\\omega_0^2g=0$. Per questo la soluzione generale è omogenea (transitorio) più una particolare. La somma $x_1+x_2$ avrebbe forzante doppia: l'equazione non è omogenea e la sovrapposizione non vale.", lab: "3", card: "3.2" },
 { id: "q3.8", c: 3, q: "A regime forzi sotto risonanza ($\\omega_F<\\omega_0$). Come si comporta l'energia meccanica dell'oscillatore?",
   o: ["Oscilla tra $\\tfrac12mB^2\\omega_F^2$ e $\\tfrac12mB^2\\omega_0^2$", "Oscilla tra 0 e $\\tfrac12mB^2\\omega_0^2$", "È costante, come alla risonanza", "Decade come $e^{-2\\gamma t}$"],
   e: "$E=\\tfrac12mB^2[\\omega_F^2\\sin^2(\\cdot)+\\omega_0^2\\cos^2(\\cdot)]$: gli estremi sono $\\tfrac12mB^2\\omega_F^2$ e $\\tfrac12mB^2\\omega_0^2$, mai 0 (gli appunti, p. 24, scrivono $E_{min}=0$: è un errore). Solo per $\\omega_F=\\omega_0$ è costante. A regime non decade: la forzante rimette l'energia dissipata.", lab: "3", card: "3.7" },
 { id: "q3.9", c: 3, q: "Forzi molto lentamente, $\\omega_F\\ll\\omega_0$. Lo spostamento a regime…",
   o: ["segue la forza quasi in fase, con $B\\approx F_0/(m\\omega_0^2)=F_0/k$", "è in controfase con la forza", "è in quadratura con la forza", "è grandissimo, come alla risonanza"],
   e: "Per $\\omega_F\\to0$: $\\tan\\varphi=\\frac{2\\gamma\\omega_F}{\\omega_F^2-\\omega_0^2}\\to0^-$ e $B\\to\\frac{F_0}{m\\omega_0^2}$. È la risposta statica della molla, $kx=F$. La controfase è il limite opposto, $\\omega_F\\gg\\omega_0$; la quadratura è la risonanza.", lab: "3", card: "3.4" },

 /* ---------- 4 Più gradi di libertà ---------- */
 { id: "q4.7", c: 4, q: "Due pendoli accoppiati: sposti solo il primo ($x_1=-2A$, $x_2=0$) e li lasci fermi. Quali modi normali hai eccitato?",
   o: ["Entrambi, con la stessa ampiezza: $(-A,-A)$ a pendolo più $(-A,+A)$ a respiro", "Solo il modo a pendolo", "Solo il modo a respiro", "Nessuno: questo moto non è una combinazione di modi"],
   e: "$u_a=x_1+x_2=-2A$ e $u_b=x_1-x_2=-2A$: i due modi partono con la stessa ampiezza. Avendo frequenze diverse si sfasano: da qui nascono i battimenti e lo scambio di energia tra i pendoli.", lab: "4", card: "4.4" },
 { id: "q4.8", c: 4, q: "Rendi più debole la molla che accoppia i due pendoli. Il tempo che l'energia impiega a passare da un pendolo all'altro…",
   o: ["si allunga: $\\omega_b-\\omega_a$ diminuisce", "si accorcia", "non cambia: dipende solo da $g/l$", "si annulla: i pendoli si muovono insieme"],
   e: "$\\omega_b^2=\\frac{g}{l}+\\frac{2k}{m}$: con $k$ più piccolo $\\omega_b$ si avvicina a $\\omega_a$. Il periodo dell'inviluppo va come $1/|\\omega_b-\\omega_a|$: con accoppiamento debole lo scambio è lento.", lab: "4", card: "4.5" },
 { id: "q4.9", c: 4, q: "Due masse uguali su una corda tesa tra due pareti. Il rapporto tra la pulsazione del modo in controfase e quella del modo in fase è…",
   o: ["$\\sqrt3$", "3", "2", "$\\sqrt2$"],
   e: "$\\omega_a^2=\\frac{T_0}{ma}$ (in fase) e $\\omega_b^2=\\frac{3T_0}{ma}$ (in controfase): il rapporto delle pulsazioni è $\\sqrt3$. 3 è il rapporto dei quadrati: dimenticare la radice è l'errore tipico.", lab: "4", card: "4.6" },

 /* ---------- 5 Corda e D'Alembert ---------- */
 { id: "q5.11", c: 5, q: "Una massa su molla è attaccata a due corde tese semi-infinite. Non c'è attrito, ma l'oscillazione si smorza. Dove va l'energia?",
   o: ["Nelle onde che la massa irradia lungo le corde, che la portano lontano", "In calore nella molla", "Nella tensione delle corde, che aumenta", "Da nessuna parte: l'oscillazione non si smorza"],
   e: "Ogni corda tira la massa con $-\\frac{T_0}{v}\\dot y$: una forza proporzionale alla velocità, come un attrito viscoso, con $\\gamma=\\frac{T_0}{mv}$. Sono perdite radiative: l'energia non diventa calore, viaggia via con le onde. Con una forzante si mantiene l'ampiezza costante.", lab: "5b", card: "5.12" },
 { id: "q5.12", c: 5, q: "Nello stesso sistema usi corde 4 volte più dense, con la stessa tensione. Lo smorzamento radiativo $\\gamma$…",
   o: ["raddoppia", "si dimezza", "quadruplica", "non cambia"],
   e: "$v=\\sqrt{T_0/\\rho_L}$ si dimezza, quindi $\\gamma=\\frac{T_0}{mv}=\\frac{\\sqrt{T_0\\rho_L}}{m}$ raddoppia: una corda con impedenza $\\sqrt{T_0\\rho_L}$ maggiore porta via energia più in fretta. 'Si dimezza' mette $v$ al numeratore; 'quadruplica' dimentica la radice.", lab: "5b", card: "5.13" },
 { id: "q5.13", c: 5, q: "Perché la punta di una frusta schiocca?",
   o: ["Verso la punta $\\rho_L\\to0$, quindi $v=\\sqrt{T/\\rho_L}$ cresce fino a superare la velocità del suono: è un boom sonico", "La punta urta l'aria come un martello", "La tensione cresce verso la punta e la frusta entra in risonanza", "La punta si spezza a ogni colpo"],
   e: "La frusta si assottiglia: $\\rho_L$ cala di continuo e l'impulso accelera. In più l'energia cinetica impressa si concentra su una massa sempre più piccola. Quando la punta supera circa 340 m/s nasce un'onda d'urto, come per un aereo supersonico.", lab: "5c", card: "5.14" },
 { id: "q5.14", c: 5, q: "In un'onda armonica progressiva su una corda, dove un pezzetto di corda ha più energia?",
   o: ["Dove $\\psi=0$: lì sono massime sia la cinetica sia la potenziale elastica", "Sulle creste, dove la potenziale è massima come nell'oscillatore", "Ovunque allo stesso modo", "Sulle creste la potenziale, negli zeri la cinetica"],
   e: "Nella corda la potenziale dipende dall'allungamento, cioè dalla pendenza $\\partial\\psi/\\partial x$, non dall'altezza. Negli zeri pendenza e velocità $\\partial\\psi/\\partial t$ sono massime; sulle creste sono entrambe nulle. È diverso dall'oscillatore, dove $T$ e $U$ si alternano.", lab: "5", card: "5.10" },
 { id: "q5.15", c: 5, q: "Una corda lunga 1 m è fissata agli estremi. Quale di queste lunghezze d'onda NON può avere un suo modo normale?",
   o: ["1,5 m", "2 m", "1 m", "0,5 m"],
   e: "$\\lambda_n=2L/n$: 2 m, 1 m, 0,67 m, 0,5 m, … Solo valori discreti, il massimo è $2L$. Gli appunti (p. 7) scrivono 'tutti i modi con $\\lambda<2L$': non tutte, solo quelle per cui in $L$ sta un numero intero di mezze $\\lambda$.", lab: "5", card: "5.6" },

 /* ---------- 6 Riflessione e trasmissione ---------- */
 { id: "q6.7", c: 6, q: "Un'onda passa da una corda a una 4 volte più densa (stessa tensione). Che frazione della potenza incidente viene trasmessa?",
   o: ["8/9", "2/3", "4/9", "1/9"],
   e: "$r=\\frac{1-2}{1+2}=-\\frac13$, quindi $R=r^2=\\frac19$ e $T=1-R=\\frac89$. 2/3 è $t$, il rapporto delle ampiezze; e non vale $T=t^2$ (4/9) perché la potenza dipende anche da $k$: $T=\\frac{k_2}{k_1}t^2=2\\cdot\\frac49$. 1/9 è la parte riflessa.", lab: "6", card: "6.4" },
 { id: "q6.8", c: 6, q: "Stessa giunzione (corda 2 quattro volte più densa). Rispetto all'onda incidente, la lunghezza d'onda trasmessa è…",
   o: ["la metà", "uguale", "il doppio", "un quarto"],
   e: "La frequenza resta la stessa, la velocità $v=\\sqrt{T/\\rho}$ si dimezza, quindi $\\lambda=v/\\nu$ si dimezza. 'Un quarto' dimentica la radice; 'uguale' confonde $\\lambda$ con la frequenza, che è l'unica a non cambiare.", lab: "6", card: "6.2" },
 { id: "q6.9", c: 6, q: "Perché alla giunzione tra due corde diverse la tensione è la stessa da entrambe le parti?",
   o: ["Il nodo di giunzione è in equilibrio: tensioni diverse darebbero una forza netta lungo la corda", "Perché le due densità sono uguali", "Perché la frequenza è la stessa", "Non è vero: la corda più densa è più tesa"],
   e: "Il punto di giunzione ha massa trascurabile: le due tensioni orizzontali devono bilanciarsi. Cambiano invece $v$, $k$ e $\\lambda$, perché cambia $\\rho$; la frequenza è uguale per un altro motivo, la continuità della corda.", lab: "6", card: "6.1" },

 /* ---------- 7 Onde acustiche ---------- */
 { id: "q7.9", c: 7, q: "Un diapason e un violino suonano lo stesso LA a 440 Hz. Perché li distingui?",
   o: ["Hanno la stessa fondamentale ma armoniche $nf_1$ con ampiezze diverse: il timbro", "Il violino suona a una frequenza un po' più alta", "Nel violino il suono viaggia più veloce", "Il diapason è sempre più forte"],
   e: "Il diapason dà quasi un tono puro: una sola sinusoide, 'piatta e pungente'. Il violino aggiunge alla fondamentale le armoniche 880, 1320, 1760 Hz…, amplificate in modo diverso dalla sua struttura. L'altezza è la stessa; la velocità del suono dipende dall'aria, non dallo strumento.", lab: "7", card: "7.19" },
 { id: "q7.10", c: 7, q: "Una canna aperta–chiusa ha la fondamentale a 220 Hz. Quale frequenza NON può comparire nel suo suono?",
   o: ["440 Hz", "660 Hz", "1100 Hz", "1540 Hz"],
   e: "Aperta–chiusa: $f_m=(2m-1)\\frac{v}{4L}$, solo multipli dispari: 220, 660, 1100, 1540 Hz… 440 Hz (2ª armonica) vorrebbe due ventri o due nodi agli estremi. Il timbro di questa canna ha solo armoniche dispari.", lab: "7", card: "7.17" },
 { id: "q7.11", c: 7, q: "All'estremità aperta di una canna sonora c'è un ventre di spostamento. E la pressione, lì?",
   o: ["Ha un nodo: resta circa quella esterna", "Ha un ventre: è lì che varia di più", "Ha un ventre solo nelle canne aperte–chiuse", "Non si può dire senza conoscere $L$"],
   e: "Dove l'aria si muove di più non si comprime; dove è ferma (estremo chiuso) si comprime di più. Nel tubo di Kundt: nodo di spostamento = ventre di pressione e viceversa, sfasati di $\\lambda/4$.", lab: "7", card: "7.3" },
 { id: "q7.12", c: 7, q: "Secondo la regola empirica, un suono ti sembra circa due volte più forte quando il livello aumenta di…",
   o: ["circa 10 dB, cioè intensità ×10", "3 dB, cioè intensità ×2", "20 dB, cioè intensità ×100", "2 dB"],
   e: "La sensazione cresce circa come il logaritmo: +10 dB ≈ volume percepito doppio. Gli appunti (p. 77) scrivono '2 volte più forte ⇔ $I_2=100\\,I_1$': ×100 sono +20 dB, circa 4 volte più forte. Raddoppiare l'intensità dà solo +3 dB.", lab: "7b", card: "7.12" },
 { id: "q7.13", c: 7, q: "Lungo un tubo lunghissimo (onda piana) il livello sonoro cala di 2 dB per ogni metro, sempre uguale. Che cosa lo fa calare?",
   o: ["L'assorbimento del mezzo (Lambert–Beer): in dB dà un termine $-\\beta r$, lineare", "L'attenuazione geometrica $1/r^2$", "La diffrazione sulle pareti del tubo", "L'effetto Doppler"],
   e: "Nel tubo la sezione è costante: niente attenuazione geometrica. $I=I_0e^{-\\alpha r}$ in dB diventa $-\\beta r$ con $\\beta=10\\log_{10}(e)\\,\\alpha$: perdita costante per metro. L'attenuazione geometrica toglie invece dB costanti per ogni raddoppio della distanza (6 dB), non per ogni metro.", lab: "7b", card: "7.15" },
 { id: "q7.14", c: 7, q: "Una sorgente puntiforme in aria, assorbimento trascurabile. Ti sposti da 10 m a 100 m. Il livello sonoro cala di…",
   o: ["20 dB", "10 dB", "6 dB", "90 dB"],
   e: "$I\\propto1/r^2$: $\\Delta L=-20\\log_{10}(r_2/r_1)=-20\\log_{10}10=-20$ dB. 10 dB vorrebbe un'intensità $\\propto1/r$ (è l'ampiezza a fare così); 6 dB è il calo per un solo raddoppio di distanza.", lab: "7b", card: "7.18" },
 { id: "q7.15", c: 7, q: "Un mezzo ha coefficiente di assorbimento $\\alpha=0{,}1\\,\\mathrm{m^{-1}}$. Di quanto cala il livello in 10 m per il solo assorbimento?",
   o: ["Circa 4,3 dB", "1 dB", "10 dB", "Circa 2,3 dB"],
   e: "$\\beta=10\\log_{10}(e)\\,\\alpha\\approx4{,}34\\cdot0{,}1=0{,}434$ dB/m, per 10 m: 4,3 dB. Infatti $I/I_0=e^{-1}\\approx0{,}37$ e $10\\log_{10}0{,}37\\approx-4{,}3$. '1 dB' confonde il numero puro $\\alpha r=1$ con i decibel.", lab: "7b", card: "7.14" },
 { id: "q7.16", c: 7, q: "Di che fattore la correzione di Laplace aumenta, nell'aria, la velocità del suono calcolata da Newton?",
   o: ["$\\sqrt{7/5}\\approx1{,}18$", "$7/5=1{,}4$", "$\\sqrt{5/3}\\approx1{,}29$", "$5/3\\approx1{,}67$"],
   e: "Newton (isoterma): $v=\\sqrt{P_0/\\rho_0}\\approx280$ m/s. Laplace (adiabatica, le compressioni sono troppo rapide per scambiare calore): $v=\\sqrt{\\gamma P_0/\\rho_0}$ con $\\gamma=7/5$ per l'aria biatomica, fattore $\\sqrt{1{,}4}\\approx1{,}18$, 331 m/s. $\\gamma$ sta sotto radice; 5/3 vale per i gas monoatomici.", lab: "7", card: "7.5" },
 { id: "q7.17", c: 7, q: "Per un gas ideale $\\gamma=\\frac{\\eta+2}{\\eta}$, con $\\eta$ gradi di libertà. Che cosa succede per molecole con moltissimi gradi di libertà ($\\eta\\to\\infty$)?",
   o: ["$\\gamma\\to1$: l'adiabatica tende all'isoterma e la velocità del suono a quella di Newton", "$\\gamma\\to\\infty$: il suono diventa velocissimo", "$\\gamma\\to0$: il suono non si propaga", "$\\gamma\\to5/3$"],
   e: "$\\gamma=1+2/\\eta$: il lavoro di compressione si spartisce su tanti gradi di libertà e la temperatura sale poco, quasi come in un'isoterma ($PV=$ cost). Monoatomico: $\\eta=3$, $\\gamma=5/3$; biatomico: $\\eta=5$, $\\gamma=7/5$.", lab: "7", card: "7.8" },
 { id: "q7.18", c: 7, q: "Un suono a 1000 Hz e circa 60 dB ($I=10^{-6}\\,\\mathrm{W/m^2}$). Di quanto si spostano le molecole d'aria?",
   o: ["Circa 10 nm", "Circa 10 μm", "Circa 1 mm", "Circa 10 pm"],
   e: "$s_{max}=\\sqrt{\\frac{2I}{\\rho_0\\omega^2v}}$ con $\\rho_0\\approx1{,}2\\,\\mathrm{kg/m^3}$, $\\omega\\approx6300$ rad/s, $v\\approx343$ m/s: circa $1{,}1\\cdot10^{-8}$ m. Gli appunti (p. 77) scrivono 10 μm, ma quello è lo spostamento alla soglia del dolore (120 dB); circa 10 pm è la soglia di udibilità (0 dB).", lab: "7", card: "7.11" },

 /* ---------- 8 Onde in 3D ---------- */
 { id: "q8.7", c: 8, q: "Un'onda piana di pulsazione $\\omega$ ha $k_z=0$ e $k_x=k_y$. Quanto vale $k_x$?",
   o: ["$\\dfrac{\\omega}{\\sqrt2\\,v}$", "$\\dfrac{\\omega}{v}$", "$\\dfrac{\\omega}{2v}$", "$\\dfrac{\\sqrt2\\,\\omega}{v}$"],
   e: "D'Alembert in 3D richiede $k_x^2+k_y^2+k_z^2=\\omega^2/v^2$, quindi $2k_x^2=\\omega^2/v^2$. Si sommano i quadrati delle componenti, non le componenti ($\\omega/(2v)$). L'onda va a 45° tra $x$ e $y$.", lab: "8", card: "8.3" },
 { id: "q8.8", c: 8, q: "In un tubo sonoro ideale (niente assorbimento) misuri l'intensità a 1 m e a 10 m dal pistone. Che cosa trovi?",
   o: ["Sono uguali", "A 10 m è 100 volte più piccola", "A 10 m è 10 volte più piccola", "A 10 m è nulla"],
   e: "Nel tubo l'onda è piana e la sezione $S$ è costante: la stessa potenza attraversa sempre la stessa area. Il $1/r^2$ vale per l'onda sferica, dove l'area $4\\pi r^2$ cresce.", lab: "8", card: "8.2" },
 { id: "q8.9", c: 8, q: "Per un'onda piana armonica $\\psi=A\\cos(\\vec k\\cdot\\vec r-\\omega t)$, quanto vale $\\nabla^2\\psi$?",
   o: ["$-k^2\\psi$", "$k^2\\psi$", "$-k\\psi$", "0"],
   e: "Ogni derivata seconda porta un $-k_i^2$: $\\nabla^2\\psi=-(k_x^2+k_y^2+k_z^2)\\psi=-k^2\\psi$. Con $\\partial_t^2\\psi=-\\omega^2\\psi$, D'Alembert dà $\\omega=kv$. Gli appunti (p. 35) perdono il segno meno: il risultato torna solo perché lo perdono da entrambe le parti.", lab: "8", card: "8.1" },

 /* ---------- 9 Doppler e Mach ---------- */
 { id: "q9.7", c: 9, q: "Una particella carica attraversa l'acqua ($n=1{,}33$) a $0{,}9\\,c$. Emette luce Cherenkov?",
   o: ["Sì: supera la velocità della luce nell'acqua, $c/n\\approx0{,}75\\,c$", "No: nessuna particella supera $c$", "No: servirebbe $v>c$", "Solo se anche l'acqua è in moto"],
   e: "La condizione è superare la velocità delle onde nel mezzo, $c/n$, non $c$ nel vuoto. Il cono ha $\\sin\\alpha=\\frac{c}{nv}=\\frac{1}{1{,}33\\cdot0{,}9}\\approx0{,}84$, cioè $\\alpha\\approx57^\\circ$.", lab: "9", card: "9.6" },
 { id: "q9.8", c: 9, q: "Che cosa hanno in comune il cono di Mach e il cono di Cherenkov?",
   o: ["La sorgente va più veloce delle onde che emette nel mezzo: i fronti si accumulano su un cono", "Sono entrambi onde sonore", "Entrambi richiedono di superare la velocità della luce nel vuoto", "Esistono solo per sorgenti che si avvicinano a chi osserva"],
   e: "Mach: $\\sin\\theta=c/v_S$ con $c$ velocità del suono. Cherenkov: $\\sin\\alpha=\\frac{c}{nv}$ con $c/n$ velocità della luce nel mezzo. Stessa geometria: velocità dell'onda diviso velocità della sorgente, possibile solo se il rapporto è minore di 1.", lab: "9", card: "9.6" },
 { id: "q9.9", c: 9, q: "Velocità pari a $c$ (velocità del suono). (a) Tu corri verso una sorgente ferma; (b) la sorgente viene verso di te, fermo. Che cosa prevedono le formule?",
   o: ["(a) $2f$; (b) $f'\\to\\infty$", "(a) $f'\\to\\infty$; (b) $2f$", "$2f$ in entrambi i casi", "$f'\\to\\infty$ in entrambi i casi"],
   e: "Ascoltatore: $f'=f\\frac{c+v_A}{c}=2f$, incontri i fronti al doppio del ritmo. Sorgente: $f'=f\\frac{c}{c-v_S}\\to\\infty$, i fronti si accumulano davanti a lei ($\\lambda'\\to0$). Per il suono non conta solo la velocità relativa: l'aria è il riferimento privilegiato.", lab: "9", card: "9.4" },
 { id: "q9.10", c: 9, q: "$c=340$ m/s. Chi sente la frequenza più alta? (a) Tu fermo, sorgente verso di te a 34 m/s; (b) sorgente ferma, tu verso di lei a 34 m/s.",
   o: ["(a): $f'\\approx1{,}11\\,f$ contro $1{,}10\\,f$", "(b): $f'\\approx1{,}11\\,f$ contro $1{,}10\\,f$", "Sentono lo stesso: conta solo la velocità relativa", "Nessuno dei due sente un cambiamento"],
   e: "(a) $f\\frac{340}{306}\\approx1{,}111\\,f$; (b) $f\\frac{374}{340}=1{,}100\\,f$. A velocità piccole la differenza è piccola, ma c'è: $v_S$ al denominatore pesa più di $v_A$ al numeratore.", lab: "9", card: "9.1" },
 { id: "q9.11", c: 9, q: "Una sorgente di frequenza $f$ si allontana da te a velocità $v_S$. Che lunghezza d'onda ti arriva?",
   o: ["$(c+v_S)/f$", "$(c-v_S)/f$", "$c/f$", "$c/(f+v_S)$"],
   e: "In un periodo $T=1/f$ il fronte fa $cT$ e la sorgente si sposta all'indietro di $v_ST$: dietro di lei i fronti distano $(c+v_S)T$. La velocità del suono resta $c$, quindi $f'=\\frac{c}{c+v_S}f<f$. $(c-v_S)/f$ è la $\\lambda$ davanti alla sorgente.", lab: "9", card: "9.3" },

 /* ---------- 10 Interferenza ---------- */
 { id: "q10.8", c: 10, q: "Nell'esperimento di Young si pone $r_1\\approx r_2\\approx r$ nei fattori $1/r$, ma non dentro il coseno. Perché?",
   o: ["Nel coseno conta $k\\Delta r$: basta $\\Delta r=\\lambda/2$ per cambiare la fase di $\\pi$, mentre $1/r$ cambia pochissimo", "È solo una convenzione di calcolo", "Perché nel coseno $r_1$ e $r_2$ sono esattamente uguali", "Perché il coseno è una funzione pari"],
   e: "Con $r\\gg d$ i cammini differiscono di $\\Delta r=d\\sin\\theta$: piccolo rispetto a $r$ (ampiezze quasi uguali), ma non rispetto a $\\lambda$. La fase $kd\\sin\\theta$ decide tutto; approssimare anche lì cancellerebbe le frange.", lab: "10", card: "10.5" },
 { id: "q10.9", c: 10, q: "Fai Young con fenditure vicinissime, $d<\\lambda/2$. Che cosa vedi sullo schermo?",
   o: ["Nessun minimo: servirebbe $\\sin\\theta=\\lambda/(2d)>1$", "Frange strettissime", "Buio ovunque", "Le stesse frange di prima, solo più fitte"],
   e: "Il primo minimo è a $\\sin\\theta=\\frac{\\lambda}{2d}$, che esiste solo se $d\\ge\\lambda/2$. Con $d$ così piccolo le due onde arrivano quasi in fase ovunque. Diminuendo $d$ le frange si allargano, non si stringono.", lab: "10", card: "10.8" },
 { id: "q10.10", c: 10, q: "Metodo dei fasori: sommi due fasori di uguale lunghezza $E_0$ che formano un angolo di 120°. Quanto è lungo il risultante?",
   o: ["$E_0$", "$2E_0$", "$\\sqrt3\\,E_0$", "0"],
   e: "$E_T=2E_0\\cos(\\varphi/2)=2E_0\\cos60^\\circ=E_0$: i due fasori e il risultante formano un triangolo equilatero. $\\sqrt3\\,E_0$ è il risultato per 60°; $2E_0$ vale solo in fase, 0 solo in controfase.", lab: "10", card: "10.1" },

 /* ---------- 11 Diffrazione e reticoli ---------- */
 { id: "q11.8", c: 11, q: "Hai 6 sorgenti coerenti equispaziate. Tra due massimi principali, quanti zeri e quanti massimi secondari trovi?",
   o: ["5 zeri e 4 massimi secondari", "6 zeri e 5 massimi secondari", "4 zeri e 3 massimi secondari", "1 zero e nessun massimo secondario"],
   e: "Zeri: $d\\sin\\theta=n'\\lambda/N$ con $n'=1,\\dots,N-1$, cioè $N-1=5$; tra due zeri consecutivi c'è un massimo secondario: $N-2=4$. '1 zero e nessun secondario' è il caso di Young, $N=2$.", lab: "11b", card: "11.9" },
 { id: "q11.9", c: 11, q: "Passi da 4 a 8 antenne uguali, stesso passo $d$. Nella direzione del massimo principale l'intensità…",
   o: ["quadruplica, e il lobo si dimezza in larghezza", "raddoppia", "resta uguale, ma il lobo si stringe", "si dimezza"],
   e: "Nel massimo tutti i fasori sono allineati: $E=NE_0$, $I=N^2I_0$, da 16 a 64 volte $I_0$. La larghezza $\\lambda/(Nd\\cos\\theta)$ si dimezza: la potenza totale ($\\propto N$) si concentra in un lobo più stretto.", lab: "11b", card: "11.8" },
 { id: "q11.10", c: 11, q: "Quattro antenne in fila con $d=\\lambda/2$. A quali angoli $\\theta$ dalla normale alla schiera l'intensità è nulla?",
   o: ["$\\pm30^\\circ$ e $\\pm90^\\circ$", "$\\pm60^\\circ$ e $\\pm90^\\circ$", "Solo $\\pm90^\\circ$", "$\\pm45^\\circ$ e $\\pm90^\\circ$"],
   e: "Zeri: $d\\sin\\theta=n'\\lambda/N$, cioè $\\sin\\theta=n'/2$ con $n'=\\pm1,\\pm2$: $\\theta=\\pm\\pi/6$ e $\\pm\\pi/2$. Gli appunti (p. 50) scrivono $\\pm\\pi/3$: ma $\\arcsin\\frac12=30^\\circ$; 60° è lo stesso zero misurato dall'asse della schiera. Il massimo principale è solo a $\\theta=0$: $\\sin\\theta=2n$ ammette solo $n=0$.", lab: "11b", card: "11.15" },
 { id: "q11.11", c: 11, q: "Doppia fenditura con $d=3{,}5\\,a$. Qual è il primo ordine di interferenza che manca?",
   o: ["Il 7°", "Il 3°", "Il 4°", "Nessuno, perché $d/a$ non è intero"],
   e: "Un massimo $d\\sin\\theta=n\\lambda$ manca se cade su uno zero di diffrazione $a\\sin\\theta=m\\lambda$: $n=m\\,d/a=3{,}5\\,m$, intero per $m=2$, quindi $n=7$ (poi 14, 21…). Il primo zero di diffrazione cade a $n=3{,}5$, tra due massimi: non ne cancella nessuno.", lab: "11", card: "11.16" },
 { id: "q11.12", c: 11, q: "Vuoi che il tuo telescopio separi due stelle a metà della distanza angolare di prima. Che cosa cambi?",
   o: ["Raddoppi il diametro $D$ dello specchio", "Raddoppi la focale $f$", "Osservi nel rosso invece che nel blu", "Raddoppi il tempo di esposizione"],
   e: "Rayleigh: $\\theta_R=1{,}22\\,\\lambda/D$ dipende solo da $\\lambda$ e $D$. Una focale più lunga ingrandisce l'immagine sul sensore ($x=\\theta f$), ma ingrandisce allo stesso modo il disco di Airy. Il rosso ha $\\lambda$ maggiore: peggiora.", lab: "11", card: "11.5" },
 { id: "q11.13", c: 11, q: "HST ($D=2{,}4$ m) risolve circa 0,04″; un telescopio a terra molto più grande non scende sotto 0,2–0,3″. Perché?",
   o: ["A terra la turbolenza dell'atmosfera allarga le immagini più del limite di diffrazione", "HST ha una focale più lunga", "Nello spazio la luce ha lunghezza d'onda più corta", "Lo specchio di HST è più liscio di quelli a terra"],
   e: "Il limite di diffrazione $1{,}22\\lambda/D$ migliora con $D$, ma a terra domina l'atmosfera (per questo si usano ottiche attive o si va nello spazio). Il guadagno di HST in angolo è un fattore 5–8; gli appunti (p. 46) dicono 'fattore 100', che non torna con questi numeri.", lab: "11", card: "11.5" },
 { id: "q11.14", c: 11, q: "Vuoi separare il doppietto del sodio (589,0 e 589,6 nm) al 1° ordine. Quante fenditure illuminate servono almeno?",
   o: ["Circa 1000", "Circa 500", "2", "Circa 100 000"],
   e: "$R=\\lambda/\\Delta\\lambda=589{,}3/0{,}6\\approx980$ e $R=nN$: al 1° ordine $N\\approx1000$. Circa 500 basterebbero al 2° ordine. Conta il numero di fenditure illuminate, non il passo $d$.", lab: "11", card: "11.14" },
 { id: "q11.15", c: 11, q: "Reticolo con passo $d=2\\,\\mu\\mathrm{m}$ illuminato a 600 nm. Quanti ordini, oltre allo 0, vedi da ciascun lato?",
   o: ["3", "4", "2", "Infiniti, sempre più deboli"],
   e: "Serve $|\\sin\\theta|=n\\lambda/d\\le1$: $n\\le d/\\lambda=3{,}33$, quindi $n=1,2,3$. Il 4° ordine richiederebbe $\\sin\\theta=1{,}2$, impossibile.", lab: "11", card: "11.11" },
 { id: "q11.16", c: 11, q: "Da una porta larga 1 m esce musica ($v=340$ m/s). Quali suoni senti bene anche da fuori, di lato alla porta?",
   o: ["Quelli sotto circa 340 Hz, con $\\lambda>1$ m", "Quelli sopra circa 340 Hz", "Tutti allo stesso modo", "Nessuno: il suono va solo dritto"],
   e: "Se $\\lambda>a$ il primo minimo non esiste ($\\sin\\theta=\\lambda/a>1$): l'onda si allarga in tutte le direzioni. Gli acuti ($\\lambda<a$) restano concentrati nel lobo centrale. Per questo dal corridoio senti soprattutto i bassi.", lab: "11", card: "11.2" },

 /* ---------- 12 Ottica geometrica ---------- */
 { id: "q12.9", c: 12, q: "Nel principio di Huygens ogni punto del fronte emette un'ondina sferica. Perché non si forma anche un fronte che torna indietro?",
   o: ["Il fattore di obliquità di Kirchhoff, $K(\\chi)=\\tfrac12(1+\\cos\\chi)$, si annulla all'indietro ($\\chi=\\pi$)", "Il mezzo assorbe le ondine che vanno all'indietro", "Le ondine all'indietro sono più lente", "Si forma, ma è troppo debole per vederlo"],
   e: "Huygens prendeva solo l'inviluppo in avanti, senza giustificarlo. Kirchhoff (fine '800) mostra che ogni ondina pesa $K(\\chi)$: 1 in avanti, ½ a 90°, 0 all'indietro. Non c'è nessun fronte regressivo, nemmeno debole, e vale anche nel vuoto.", lab: "12b", card: "12.14" },
 { id: "q12.10", c: 12, q: "Costruzione di Huygens della rifrazione: il fronte entra in un mezzo più lento ($v_2<v_1$). Mentre il bordo B percorre $\\overline{BC}$, l'ondina partita da A arriva a una distanza…",
   o: ["$\\overline{AD}=\\overline{BC}\\,v_2/v_1$, più corta: il fronte si piega e il raggio si avvicina alla normale", "$\\overline{AD}=\\overline{BC}$, come nella riflessione", "$\\overline{AD}=\\overline{BC}\\,v_1/v_2$, più lunga", "nulla: l'ondina parte solo quando arriva anche B"],
   e: "Tempi uguali: $\\overline{AD}/v_2=\\overline{BC}/v_1$. Con $\\overline{BC}=\\overline{AC}\\sin\\theta_1$ e $\\overline{AD}=\\overline{AC}\\sin\\theta_2$ si ottiene $\\frac{\\sin\\theta_1}{\\sin\\theta_2}=\\frac{v_1}{v_2}=\\frac{n_2}{n_1}$: Snell. $\\overline{AD}=\\overline{BC}$ vale per la riflessione, dove la velocità non cambia.", lab: "12b", card: "12.15" },
 { id: "q12.11", c: 12, q: "Al tramonto vedi il Sole anche quando è già un po' sotto l'orizzonte. Perché?",
   o: ["L'indice dell'aria cresce scendendo: il raggio si incurva, seguendo $\\delta\\int n\\,ds=0$", "Per la diffrazione sul bordo della Terra", "Per riflessione totale sugli strati alti dell'atmosfera", "Per la dispersione, che separa i colori"],
   e: "In un mezzo a strati la luce non va dritta: rende stazionario il cammino ottico $\\int n\\,ds$ e si piega verso gli strati con $n$ maggiore (in basso, $n\\approx1{,}0003$). La dispersione cambia un po' l'angolo col colore, ma la deviazione nasce dal gradiente di $n$.", lab: "12b", card: "12.17" },
 { id: "q12.12", c: 12, q: "Nell'analogia tra Fermat, $\\delta\\int n\\,ds=0$, e la minima azione di Maupertuis, $\\delta\\int p\\,ds=0$, all'indice di rifrazione $n$ corrisponde…",
   o: ["l'impulso $p=mv$ della particella", "l'energia potenziale $U$", "il tempo di percorrenza", "la massa $m$"],
   e: "La particella si comporta come la luce in un mezzo con indice proporzionale al suo impulso. Attenzione: per la luce $n=c/v$ è grande dove $v$ è piccola, per la particella $p$ è grande dove $v$ è grande. Gli appunti la chiamano Hamilton–Jacobi; il principio di Hamilton vero e proprio è $\\delta\\int L\\,dt=0$.", lab: "12b", card: "12.18" },
 { id: "q12.13", c: 12, q: "Perché uno specchio parabolico non ha aberrazione sferica per i raggi paralleli all'asse?",
   o: ["La parabola manda nel fuoco tutti i raggi paralleli all'asse, anche quelli lontani dall'asse", "Perché ha un raggio di curvatura più grande", "Perché riflette solo i raggi vicini all'asse", "Perché la parabola non ha un fuoco"],
   e: "Nello specchio sferico $f=r/2$ vale solo per raggi parassiali: quelli lontani dall'asse lo incrociano in un altro punto (aberrazione sferica, il difetto iniziale di Hubble). La parabola è proprio la curva che manda esattamente nel fuoco ogni raggio parallelo all'asse.", lab: "12", card: "12.16" },
 { id: "q12.14", c: 12, q: "Perché i grandi telescopi moderni sono riflettori (a specchio) e non rifrattori (a lente)?",
   o: ["Basta lavorare bene una superficie alluminata invece di un grande vetro omogeneo, e la focale si può ripiegare", "Uno specchio ha un limite di diffrazione minore di una lente con lo stesso $D$", "Le lenti non possono focalizzare la luce delle stelle", "Gli specchi ingrandiscono di più a parità di focale"],
   e: "Una lente grande richiede vetro perfetto in tutto il volume; per uno specchio conta solo la superficie. Con lo specchio secondario la luce torna indietro e il tubo è lungo circa metà della focale (HST: $f=58$ m). La riflessione non dipende da $n(\\lambda)$: niente aberrazione cromatica. Il limite di diffrazione dipende solo da $D$ e $\\lambda$.", lab: "12", card: "12.16" },
 { id: "q12.15", c: 12, q: "Un diottro sferico convesso separa aria ($n_1=1$) e vetro ($n_2=1{,}5$), con $r=10$ cm. Quanto valgono la focale oggetto $f_o$ e la focale immagine $f_i$?",
   o: ["$f_o=20$ cm, $f_i=30$ cm", "$f_o=f_i=20$ cm", "$f_o=30$ cm, $f_i=20$ cm", "$f_o=f_i=5$ cm"],
   e: "$f_o=\\frac{n_1}{n_2-n_1}r=20$ cm e $f_i=\\frac{n_2}{n_2-n_1}r=30$ cm: diverse perché i mezzi ai due lati sono diversi. Controllo: $n_1/f_o=n_2/f_i$ e $f_i-f_o=r$. $r/2=5$ cm è la focale di uno specchio, non di un diottro.", lab: "12", card: "12.8" },
 { id: "q12.16", c: 12, q: "Sei sott'acqua ($n=1{,}334$) e guardi verso la superficie calma. Dove vedi il cielo?",
   o: ["In un cono di apertura circa 97° attorno alla verticale", "In tutto l'emisfero sopra di te", "Solo esattamente sopra la tua testa", "In un cono di apertura circa 49°"],
   e: "Anche i raggi radenti ($\\theta_i=90^\\circ$) entrano con $\\theta_t=\\arcsin(1/1{,}334)\\approx48{,}6^\\circ$: tutto il cielo è compresso in un cono di semiapertura 48,6°, apertura circa 97° (finestra di Snell). 49° è la semiapertura, non l'apertura.", lab: "12", card: "12.5" },
 { id: "q12.17", c: 12, q: "Quando l'ottica geometrica (per raggi) funziona senza errori evidenti?",
   o: ["Quando aperture e ostacoli sono molto più grandi di $\\lambda$", "Quando aperture e ostacoli sono più piccoli di $\\lambda$", "Solo nel vuoto", "Solo con luce monocromatica"],
   e: "Con dimensioni $\\gg\\lambda$ diffrazione e interferenza sono trascurabili e la luce va per raggi. Con dimensioni $\\lesssim\\lambda$ domina la diffrazione (la fenditura con $a<\\lambda$ diffonde in tutte le direzioni). Gli appunti (p. 61) scrivono la condizione al contrario.", lab: "12" }
];

const GRAPHS = [
 /* ---------- 1 ---------- */
 { id: "g1.1", c: 1, q: "La curva blu è $x(t)=A\\cos(\\omega_0t)$. Quale delle altre due è la velocità $\\dot x/(\\omega_0A)$?",
   cap: "Rossa continua e grigia tratteggiata: due candidate per la velocità.",
   plot: { x: [0, 4 * Math.PI], y: [-1.15, 1.15], xl: "ω₀t", yl: "x/A,  v/(ω₀A)",
     ticks: [[Math.PI / 2, "π/2"], [Math.PI, "π"], [3 * Math.PI / 2, "3π/2"], [2 * Math.PI, "2π"], [3 * Math.PI, "3π"]],
     fns: [{ f: t => Math.cos(t), c: "pen" }, { f: t => -Math.sin(t), c: "bad" }, { f: t => Math.sin(t), c: "ink2", dash: true }] },
   o: ["La rossa: parte da 0 e diventa negativa, perché la massa torna verso l'equilibrio", "La grigia: parte da 0 e diventa positiva", "Nessuna delle due: la velocità parte dal massimo, come $x$", "Sono equivalenti: cambia solo il segno, che non conta"],
   e: "$\\dot x=-\\omega_0A\\sin(\\omega_0t)$: lasciata in $x=A$, subito dopo la massa va verso $x=0$, cioè con velocità negativa. Gli appunti (p. 17) disegnano la velocità che sale: segno sbagliato. Lo sfasamento con $x$ è $\\pi/2$ in entrambe, ma il segno dice dove va la massa.", lab: "1", card: "1.10" },
 { id: "g1.2", c: 1, q: "Legge oraria di una massa di 1 kg attaccata a una molla. Dal grafico, quanto vale la costante elastica $k$?",
   plot: { x: [0, 2.3], y: [-1.25, 1.25], xl: "t (s)", yl: "x (cm)",
     ticks: [[0, "0"], [0.2 * Math.PI, "0,63"], [0.4 * Math.PI, "1,26"], [0.6 * Math.PI, "1,88"]],
     fns: [{ f: t => Math.cos(10 * t), c: "pen" }] },
   o: ["100 N/m", "10 N/m", "25 N/m", "1,6 N/m"],
   e: "Tra due massimi passano $T\\approx0{,}63$ s: $\\omega_0=2\\pi/T=10$ rad/s e $k=m\\omega_0^2=100$ N/m. 10 N/m confonde $k$ con $\\omega_0$; 25 N/m nasce leggendo come periodo 1,26 s (due oscillazioni). L'ampiezza (1 cm) non serve: il periodo non dipende da lei.", lab: "1", card: "1.5" },

 /* ---------- 2 ---------- */
 { id: "g2.1", c: 2, q: "Tre oscillatori con lo stesso $\\omega_0$ partono da fermi in $x_0$, con tre valori diversi di $\\gamma$. Quale curva è lo smorzamento critico?",
   cap: "Curve blu, verde e rossa.",
   plot: { x: [0, 12], y: [-0.75, 1.1], xl: "ω₀t", yl: "x/x₀", ticks: [[2, "2"], [4, "4"], [6, "6"], [8, "8"], [10, "10"]],
     fns: [{ f: t => { const g = 0.2, w = Math.sqrt(1 - g * g); return Math.exp(-g * t) * (Math.cos(w * t) + g / w * Math.sin(w * t)); }, c: "pen" },
           { f: t => Math.exp(-t) * (1 + t), c: "good" },
           { f: t => { const g = 3, s = Math.sqrt(g * g - 1), l1 = -g + s, l2 = -g - s; return (-l2 * Math.exp(l1 * t) + l1 * Math.exp(l2 * t)) / (l1 - l2); }, c: "bad" }] },
   o: ["La verde: tra le curve che non attraversano lo zero, è quella che ci arriva prima", "La blu: è la prima a toccare $x=0$", "La rossa: è l'unica che non oscilla", "Nessuna: il critico oscilla una volta e poi si ferma"],
   e: "Blu: sottosmorzato, tocca zero per primo ma lo attraversa e oscilla. Rossa: sovrasmorzato ($\\gamma=3\\omega_0$), non oscilla ma è lento: domina $e^{-|\\lambda_1|t}$ con $|\\lambda_1|$ piccolo. Verde: $x=x_0e^{-\\omega_0t}(1+\\omega_0t)$, il ritorno più rapido senza oscillazioni.", lab: "2", card: "2.4" },
 { id: "g2.2", c: 2, q: "Oscillazione smorzata (blu) con il suo inviluppo (tratteggiato). Quanto vale $\\gamma$?",
   plot: { x: [0, 5], y: [-1.05, 1.05], xl: "t (s)", yl: "x/A", ticks: [[1, "1"], [2, "2"], [3, "3"], [4, "4"]],
     hlines: [{ y: 0.368, label: "0,37" }],
     fns: [{ f: t => Math.exp(-0.5 * t) * Math.cos(2 * Math.PI * t), c: "pen", n: 800 }, { f: t => Math.exp(-0.5 * t), c: "ink2", dash: true }, { f: t => -Math.exp(-0.5 * t), c: "ink2", dash: true }] },
   o: ["$0{,}5\\,\\mathrm{s^{-1}}$", "$2\\,\\mathrm{s^{-1}}$", "$0{,}25\\,\\mathrm{s^{-1}}$", "$1\\,\\mathrm{s^{-1}}$"],
   e: "L'inviluppo $e^{-\\gamma t}$ scende a $1/e\\approx0{,}37$ dopo $\\tau=1/\\gamma$: dal grafico $\\tau=2$ s, quindi $\\gamma=0{,}5\\,\\mathrm{s^{-1}}$. $2\\,\\mathrm{s^{-1}}$ confonde $\\gamma$ con $\\tau$; $0{,}25\\,\\mathrm{s^{-1}}$ applica all'ampiezza la legge dell'energia, $e^{-2\\gamma t}$.", lab: "2", card: "2.5" },

 /* ---------- 3 ---------- */
 { id: "g3.1", c: 3, q: "Tre curve di risonanza: stessa forza, stesso oscillatore, $\\gamma$ diverso. Quale ha il $\\gamma$ più piccolo, e quanto vale $\\omega_0$?",
   cap: "Curve blu, verde e rossa; $\\omega_F$ in rad/s.",
   plot: { x: [0, 4], y: [0, 2.7], xl: "ω_F", yl: "B", ticks: [[1, "1"], [2, "2"], [3, "3"], [4, "4"]],
     fns: [{ f: w => 1 / Math.sqrt((4 - w * w) ** 2 + 4 * 0.01 * w * w), c: "pen", n: 800 },
           { f: w => 1 / Math.sqrt((4 - w * w) ** 2 + 4 * 0.09 * w * w), c: "good" },
           { f: w => 1 / Math.sqrt((4 - w * w) ** 2 + 4 * 0.36 * w * w), c: "bad" }] },
   o: ["La blu, la più alta e stretta; $\\omega_0\\approx2$ rad/s", "La rossa, la più bassa e larga; $\\omega_0\\approx2$ rad/s", "La blu; $\\omega_0\\approx2{,}5$ rad/s, l'altezza del picco", "Hanno tutte lo stesso $\\gamma$: cambia solo $F_0$"],
   e: "$B(\\omega_0)=\\frac{F_0}{2m\\gamma\\omega_0}$: meno attrito, picco più alto e stretto. I picchi stanno a $\\omega_F\\approx\\omega_0=2$ rad/s; quello della rossa è un po' più a sinistra, perché con $\\gamma$ grande il massimo di $B$ scende sotto $\\omega_0$. L'altezza è un'ampiezza, non una frequenza.", lab: "3", card: "3.3" },
 { id: "g3.2", c: 3, q: "Fase $\\varphi$ dello spostamento a regime rispetto alla forza, in funzione di $\\omega_F$. Quanto vale $\\omega_0$?",
   cap: "$\\omega_F$ in rad/s.",
   plot: { x: [0, 6], y: [-3.4, 0.25], xl: "ω_F", yl: "φ", ticks: [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"]],
     hlines: [{ y: -Math.PI / 2, label: "−π/2" }, { y: -Math.PI, label: "−π" }],
     fns: [{ f: w => Math.atan2(-0.8 * w, 9 - w * w), c: "pen" }] },
   o: ["3 rad/s, dove $\\varphi=-\\pi/2$: lì la forza è in fase con la velocità", "6 rad/s, dove $\\varphi$ è quasi $-\\pi$", "3 rad/s, dove la forza è in fase con lo spostamento", "0, dove $\\varphi=0$"],
   e: "Alla risonanza $\\tan\\varphi\\to\\infty$, $\\varphi=-\\pi/2$: lo spostamento è in ritardo di un quarto di periodo, la velocità è in fase con la forza e il lavoro è massimo. Sotto risonanza $\\varphi\\to0$ (segue la forza), sopra $\\varphi\\to-\\pi$ (controfase).", lab: "3", card: "3.6" },

 /* ---------- 4 ---------- */
 { id: "g4.1", c: 4, q: "Somma di due oscillazioni di uguale ampiezza e frequenze vicine. Dal grafico, quanto vale $|f_1-f_2|$?",
   plot: { x: [0, 2], y: [-2.2, 2.2], xl: "t (s)", yl: "x", ticks: [[0.5, "0,5"], [1, "1"], [1.5, "1,5"]],
     fns: [{ f: t => Math.cos(2 * Math.PI * 20 * t) + Math.cos(2 * Math.PI * 22 * t), c: "pen", n: 2400, lw: 1.4 },
           { f: t => 2 * Math.abs(Math.cos(2 * Math.PI * t)), c: "ink2", dash: true }, { f: t => -2 * Math.abs(Math.cos(2 * Math.PI * t)), c: "ink2", dash: true }] },
   o: ["2 Hz", "1 Hz", "4 Hz", "0,5 Hz"],
   e: "L'oscillazione si rinforza ogni 0,5 s, cioè 2 volte al secondo: $|f_1-f_2|=2$ Hz (qui 20 e 22 Hz). Il coseno modulante $\\cos\\big(\\frac{\\omega_1-\\omega_2}{2}t\\big)$ ha frequenza 1 Hz, ma l'ampiezza è massima sia quando vale +1 sia quando vale −1. 0,5 Hz scambia il periodo per la frequenza.", lab: "4", card: "4.5" },

 /* ---------- 5 ---------- */
 { id: "g5.1", c: 5, q: "Inviluppo di un'onda stazionaria su una corda lunga 1,2 m fissata agli estremi. Che modo è e quanto vale $\\lambda$?",
   plot: { x: [0, 1.2], y: [-1.2, 1.2], xl: "x (m)", yl: "ψ", ticks: [[0.3, "0,3"], [0.6, "0,6"], [0.9, "0,9"]],
     fns: [{ f: x => Math.sin(4 * Math.PI * x / 1.2), c: "pen" }, { f: x => -Math.sin(4 * Math.PI * x / 1.2), c: "ink2", dash: true }] },
   o: ["$n=4$, $\\lambda=0{,}6$ m", "$n=3$, $\\lambda=0{,}8$ m", "$n=4$, $\\lambda=0{,}3$ m", "$n=4$, $\\lambda=1{,}2$ m"],
   e: "Si contano i ventri: 4, quindi $n=4$ e $\\lambda_n=2L/n=0{,}6$ m. I nodi interni sono 3 ($n-1$): contare quelli dà $n$ sbagliato. Tra due nodi c'è $\\lambda/2=0{,}3$ m, non $\\lambda$.", lab: "5", card: "5.7" },
 { id: "g5.2", c: 5, q: "Fotografia di un'onda armonica progressiva su una corda. In quale punto passa, in quell'istante, più potenza?",
   plot: { x: [0, 1.5], y: [-1.3, 1.3], xl: "x/λ", yl: "ψ", ticks: [[0.5, "0,5"], [1, "1"]],
     fns: [{ f: x => Math.sin(2 * Math.PI * x), c: "pen" }],
     points: [{ x: 0.25, y: 1, label: "A" }, { x: 0.5, y: 0, label: "B" }, { x: 0.625, y: -Math.SQRT1_2, label: "C" }] },
   o: ["In B, dove la corda è più inclinata", "In A, sulla cresta", "In C, a metà tra cresta e zero", "In tutti e tre allo stesso modo"],
   e: "$P=T_0v\\,(\\partial\\psi/\\partial x)^2$: conta la pendenza, massima negli zeri di $\\psi$. In A la pendenza è nulla: sulla cresta il pezzetto di corda è fermo e non deformato, non trasferisce energia. In C la pendenza, e quindi $P$, è intermedia.", lab: "5", card: "5.9" },

 /* ---------- 6 ---------- */
 { id: "g6.1", c: 6, q: "Coefficienti $r$ (blu) e $t$ (verde tratteggiato) in funzione di $\\rho_2/\\rho_1$. Un impulso passa su una corda 9 volte più densa: che riflesso vedi?",
   plot: { x: [0, 12], y: [-1.1, 2.1], xl: "ρ₂/ρ₁", yl: "r, t", ticks: [[1, "1"], [4, "4"], [9, "9"]],
     hlines: [{ y: 0.5, label: "0,5" }, { y: -0.5, label: "−0,5" }], vlines: [{ x: 9 }],
     fns: [{ f: x => (1 - Math.sqrt(x)) / (1 + Math.sqrt(x)), c: "pen" }, { f: x => 2 / (1 + Math.sqrt(x)), c: "good", dash: true }] },
   o: ["$r\\approx-0{,}5$: capovolto e alto la metà", "$r\\approx+0{,}5$: dritto e alto la metà", "$r\\approx-0{,}8$: quasi tutto riflesso", "$r\\approx-1/3$: piccolo e capovolto"],
   e: "$r=\\frac{1-\\sqrt9}{1+\\sqrt9}=-\\frac12$: negativo, quindi capovolto (sfasamento $\\pi$). Il trasmesso ha $t=0{,}5$ ed è sempre dritto. −0,8 è $(1-9)/(1+9)$: dimentica le radici; −1/3 è il caso $\\rho_2=4\\rho_1$. A sinistra, per $\\rho_2\\to0$ (estremo libero), $r\\to1$ e $t\\to2$.", lab: "6", card: "6.3" },

 /* ---------- 7 ---------- */
 { id: "g7.1", c: 7, q: "Livello sonoro in funzione della distanza in due situazioni. Quale curva è una sorgente puntiforme in aria, con assorbimento trascurabile?",
   cap: "Curva rossa e retta blu, stesso livello a 1 m.",
   plot: { x: [1, 50], y: [60, 102], xl: "r (m)", yl: "L (dB)", ticks: [[2, "2"], [10, "10"], [20, "20"], [30, "30"], [40, "40"]],
     hlines: [{ y: 94, label: "94" }, { y: 80, label: "80" }],
     fns: [{ f: r => 100 - 0.6 * (r - 1), c: "pen" }, { f: r => 100 - 20 * Math.log10(r), c: "bad" }] },
   o: ["La rossa: perde 6 dB a ogni raddoppio di $r$ (94 dB a 2 m, circa 74 dB a 20 m)", "La blu: perde gli stessi dB a ogni metro", "Entrambe: in dB l'attenuazione geometrica è lineare", "Nessuna: senza assorbimento il livello non cambia"],
   e: "Attenuazione geometrica: $L=L_1-20\\log_{10}(r/r_1)$, una curva logaritmica, ripida vicino alla sorgente e poi sempre più piatta. La retta, $L=L_1-\\beta r$, è l'impronta dell'assorbimento (Lambert–Beer), come in un tubo. In un caso reale le due si sommano: $L=L(r)-\\beta r$.", lab: "7b", card: "7.18" },
 { id: "g7.2", c: 7, q: "Ampiezza di spostamento (blu) e di pressione (tratteggiata) lungo una canna di lunghezza $L$. Quale estremo è chiuso, e che frequenza è rispetto alla fondamentale $f_1$ della canna?",
   plot: { x: [0, 1], y: [0, 1.12], yl: "ampiezza", ticks: [[0, "0"], [1 / 3, "L/3"], [2 / 3, "2L/3"], [1, "L"]],
     fns: [{ f: x => Math.abs(Math.cos(1.5 * Math.PI * x)), c: "pen" }, { f: x => Math.abs(Math.sin(1.5 * Math.PI * x)), c: "ink2", dash: true }] },
   o: ["Chiuso in $x=L$; è $3f_1$", "Chiuso in $x=0$; è $3f_1$", "Chiuso in $x=L$; è $2f_1$", "Entrambi aperti; è $3f_1$"],
   e: "All'estremo chiuso l'aria non si muove: nodo di spostamento e ventre di pressione, cioè $x=L$. In $L$ stanno $3/4$ di lunghezza d'onda: $\\lambda=4L/3$, $f=3\\frac{v}{4L}=3f_1$. Una canna aperta–chiusa ha solo armoniche dispari, quindi $2f_1$ è impossibile.", lab: "7", card: "7.17" },

 /* ---------- 8 ---------- */
 { id: "g8.1", c: 8, q: "Due grandezze di un'onda sferica, entrambe pari a 1 a $r=1$ m. Quale curva è l'intensità e quale l'ampiezza?",
   cap: "Curva blu continua e curva grigia tratteggiata.",
   plot: { x: [0.7, 5], y: [0, 1.6], xl: "r (m)", yl: "valore relativo", ticks: [[1, "1"], [2, "2"], [3, "3"], [4, "4"]],
     hlines: [{ y: 0.25, label: "1/4" }, { y: 0.5, label: "1/2" }],
     fns: [{ f: r => 1 / (r * r), c: "pen" }, { f: r => 1 / r, c: "ink2", dash: true }] },
   o: ["Blu l'intensità (1/4 a 2 m), grigia l'ampiezza (1/2 a 2 m)", "Blu l'ampiezza, grigia l'intensità", "Sono entrambe intensità, a frequenze diverse", "Blu l'intensità di un'onda sferica, grigia quella di un'onda piana"],
   e: "La potenza si distribuisce su $4\\pi r^2$: $I\\propto1/r^2$, a distanza doppia un quarto. Poiché $I\\propto A^2$, l'ampiezza va come $1/r$: a distanza doppia la metà. Un'onda piana avrebbe intensità costante, non $1/r$.", lab: "8", card: "8.4" },

 /* ---------- 9 ---------- */
 { id: "g9.1", c: 9, q: "Frequenza percepita mentre un'ambulanza (sirena a 700 Hz) ti passa accanto; a $t=0$ è nel punto più vicino. Quanto vale circa la sua velocità? ($c=340$ m/s)",
   plot: { x: [-4, 4], y: [630, 785], xl: "t (s)", yl: "f′ (Hz)", ticks: [[-4, "−4"], [-2, "−2"], [0, "0"], [2, "2"]],
     hlines: [{ y: 768, label: "768" }, { y: 700, label: "700" }, { y: 643, label: "643" }],
     fns: [{ f: tr => { const c = 340, vs = 30, b = 20, a = c * c - vs * vs; const te = (c * c * tr - Math.sqrt(b * b * a + vs * vs * c * c * tr * tr)) / a; const xs = vs * te; return 700 / (1 + vs / c * xs / Math.sqrt(xs * xs + b * b)); }, c: "pen" }] },
   o: ["Circa 30 m/s", "Circa 68 m/s", "Circa 125 m/s", "Circa 3 m/s"],
   e: "Lontana, in avvicinamento: $f'=f\\frac{c}{c-v_S}\\approx768$ Hz, quindi $v_S=c(1-f/f')\\approx30$ m/s; in allontanamento $f\\frac{c}{c+v_S}\\approx643$ Hz dà lo stesso valore. Il passaggio non è un salto: conta la componente di $v_S$ lungo la linea visiva, che si annulla nel punto più vicino. Le differenze in Hz (68, 125) non sono velocità.", lab: "9", card: "9.3" },
 { id: "g9.2", c: 9, q: "Semiapertura $\\alpha$ del cono di Cherenkov in acqua ($n=1{,}33$) in funzione di $v/c$. Una particella va a $0{,}9\\,c$: quanto vale $\\alpha$? E se rallenta sotto $0{,}75\\,c$?",
   plot: { x: [0.76, 1], y: [40, 92], xl: "v/c", yl: "α (gradi)", ticks: [[0.8, "0,8"], [0.85, "0,85"], [0.9, "0,9"], [0.95, "0,95"]],
     hlines: [{ y: 50, label: "50°" }, { y: 60, label: "60°" }, { y: 70, label: "70°" }, { y: 80, label: "80°" }],
     fns: [{ f: b => Math.asin(1 / (1.33 * b)) * 180 / Math.PI, c: "pen" }] },
   o: ["$\\alpha\\approx57^\\circ$; sotto $0{,}75\\,c$ il cono sparisce", "$\\alpha\\approx57^\\circ$; sotto $0{,}75\\,c$ il cono si stringe", "$\\alpha\\approx49^\\circ$; il cono c'è a ogni velocità", "$\\alpha\\approx90^\\circ$; il cono sparisce solo sotto $c/2$"],
   e: "$\\sin\\alpha=\\frac{c}{nv}\\approx0{,}84$, $\\alpha\\approx57^\\circ$. Più la particella è veloce, più il cono si stringe (verso 49° per $v\\to c$). Per $v<c/n\\approx0{,}75\\,c$ servirebbe $\\sin\\alpha>1$: niente cono, come un aereo subsonico non ha cono di Mach.", lab: "9", card: "9.6" },

 /* ---------- 10 ---------- */
 { id: "g10.1", c: 10, q: "Frange di Young su uno schermo a $r=1$ m, con fenditure distanti $d=0{,}5$ mm. Quanto vale $\\lambda$?",
   plot: { x: [-3, 3], y: [0, 1.1], xl: "x (mm)", yl: "I/I_max", ticks: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"], [2, "2"]],
     fns: [{ f: x => Math.cos(Math.PI * x) ** 2, c: "pen" }] },
   o: ["500 nm", "250 nm", "1 μm", "5 μm"],
   e: "Dal grafico l'interfrangia (tra due massimi) è $\\Delta x=1$ mm, quindi $\\lambda=\\Delta x\\,d/r=10^{-3}\\cdot5\\cdot10^{-4}/1=5\\cdot10^{-7}$ m. 250 nm prende come interfrangia la distanza massimo–minimo (0,5 mm); 1 μm ne prende due.", lab: "10", card: "10.7" },

 /* ---------- 11 ---------- */
 { id: "g11.1", c: 11, q: "Figura di diffrazione di una fenditura singola. Quanto è larga la fenditura, in unità di $\\lambda$?",
   plot: { x: [-0.8, 0.8], y: [0, 1.05], xl: "sin θ", yl: "I/I₀",
     ticks: [[-0.5, "−0,5"], [-0.25, "−0,25"], [0, "0"], [0.25, "0,25"], [0.5, "0,5"]],
     fns: [{ f: s => { const u = 4 * Math.PI * s; return Math.abs(u) < 1e-9 ? 1 : (Math.sin(u) / u) ** 2; }, c: "pen", n: 800 }] },
   o: ["$a=4\\lambda$", "$a=\\lambda/4$", "$a=2\\lambda$", "$a=8\\lambda$"],
   e: "Il primo zero è a $\\sin\\theta=0{,}25$ e vale $\\sin\\theta_1=\\lambda/a$: $a=4\\lambda$. $2\\lambda$ usa la larghezza totale del picco centrale (0,5) al posto della semilarghezza; $\\lambda/4$ inverte il rapporto. Più stretta la fenditura, più largo il picco.", lab: "11", card: "11.2" },
 { id: "g11.2", c: 11, q: "Doppia fenditura: frange di interferenza (blu) sotto l'inviluppo di diffrazione (tratteggiato). Quale ordine manca, e quanto vale $d/a$?",
   cap: "Scala verticale ingrandita: si vedono i massimi dal 3° al 9°; il centrale e i primi due escono dal grafico.",
   plot: { x: [2.5, 9.5], y: [0, 0.06], xl: "d·sinθ/λ", yl: "I/I_max", ticks: [[3, "3"], [4, "4"], [5, "5"], [6, "6"], [7, "7"], [8, "8"]],
     fns: [{ f: u => { const b = Math.PI * u / 3.5; const s = Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; return s * Math.cos(Math.PI * u) ** 2; }, c: "pen", n: 1400 },
           { f: u => { const b = Math.PI * u / 3.5; return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; }, c: "ink2", dash: true }] },
   o: ["Manca il 7°; $d/a=3{,}5$", "Manca il 7°; $d/a=7$", "Manca il 4°; $d/a=4$", "Non manca nessun ordine; $d/a=3{,}5$"],
   e: "L'inviluppo si annulla a $d\\sin\\theta/\\lambda=3{,}5$ e a 7: il primo zero di diffrazione ($a\\sin\\theta=\\lambda$) è a 3,5, quindi $d/a=3{,}5$. A 3,5 non c'è nessun massimo da cancellare; a 7 sì: $n=m\\,d/a$ con $m=2$. Il 4° c'è, solo debole.", lab: "11", card: "11.16" },
 { id: "g11.3", c: 11, q: "Intensità di $N$ sorgenti coerenti tra due massimi principali. Quante sono le sorgenti?",
   cap: "Scala ingrandita: i due massimi principali (in 0 e in 1) valgono 1 ed escono dal grafico.",
   plot: { x: [-0.08, 1.35], y: [0, 0.1], xl: "d·sinθ/λ", yl: "I/I_max", ticks: [[0, "0"], [0.2, "0,2"], [0.4, "0,4"], [0.6, "0,6"], [0.8, "0,8"], [1, "1"]],
     fns: [{ f: u => { const s = Math.sin(Math.PI * u); return Math.abs(s) < 1e-9 ? 1 : (Math.sin(5 * Math.PI * u) / (5 * s)) ** 2; }, c: "pen", n: 1000 }] },
   o: ["5", "3", "4", "6"],
   e: "Tra due massimi principali ci sono $N-1$ zeri e $N-2$ massimi secondari. Qui gli zeri sono 4 (a 0,2, 0,4, 0,6, 0,8) e i secondari 3: $N=5$. Prendere come $N$ il numero dei secondari (3) o degli zeri (4) è l'errore tipico.", lab: "11b", card: "11.9" },
 { id: "g11.4", c: 11, q: "Blu: apertura circolare di diametro $D$. Grigia tratteggiata: fenditura di larghezza $D$. Dove cade il primo zero della curva blu?",
   plot: { x: [-3.3, 3.3], y: [0, 1.05], xl: "D·sinθ/λ", yl: "I/I₀", ticks: [[-2, "−2"], [-1, "−1"], [0, "0"], [1, "1"], [2, "2"]],
     fns: [{ f: x => { const u = Math.PI * x; if (Math.abs(u) < 1e-6) return 1; let s = 0; const n = 120; for (let i = 0; i <= n; i++) { const t = Math.PI * i / n, w = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2); s += w * Math.cos(t - u * Math.sin(t)); } const j1 = s / (3 * n); return (2 * j1 / u) ** 2; }, c: "pen", n: 600 },
           { f: x => { const u = Math.PI * x; return Math.abs(u) < 1e-9 ? 1 : (Math.sin(u) / u) ** 2; }, c: "ink2", dash: true, n: 600 }] },
   o: ["A circa $1{,}22\\,\\lambda/D$, più lontano di quello della fenditura", "A $\\lambda/D$, come per la fenditura", "A circa $0{,}61\\,\\lambda/D$", "A circa $2{,}44\\,\\lambda/D$"],
   e: "Il primo zero di $J_1$ è a 3,832: $\\sin\\theta=\\frac{3{,}832}{\\pi}\\frac{\\lambda}{D}=1{,}22\\frac{\\lambda}{D}$, raggio angolare del disco di Airy e criterio di Rayleigh. 2,44 è il diametro angolare del disco, non il raggio. Gli anelli dell'apertura circolare sono anche più deboli dei lobi della fenditura.", lab: "11", card: "11.4" },
 { id: "g11.5", c: 11, q: "Diagramma polare di 4 antenne in fila con $d=\\lambda/2$. In quali direzioni l'intensità è nulla?",
   cap: "Le antenne sono in fila sull'asse orizzontale; θ è misurato dalla normale (verticale). Il raggio della curva è l'ampiezza $|E|/E_{max}$ (l'intensità è il suo quadrato), così si vedono i lobi secondari.",
   plot: { polar: true, full: true,
     fns: [{ f: th => { const p = Math.PI / 2 * Math.sin(th), s = Math.sin(p); return Math.abs(s) < 1e-9 ? 1 : Math.abs(Math.sin(4 * p) / (4 * s)); }, c: "pen" }],
     marks: [{ th: Math.PI / 6, label: "30°" }, { th: Math.PI / 3, label: "60°" }] },
   o: ["$\\theta=\\pm30^\\circ$ e $\\pm90^\\circ$ dalla normale", "$\\theta=\\pm60^\\circ$ e $\\pm90^\\circ$ dalla normale", "Solo lungo la fila, $\\theta=\\pm90^\\circ$", "$\\theta=\\pm45^\\circ$ dalla normale"],
   e: "La linea a 30° passa per un punto in cui la curva tocca il centro; a 60° c'è invece un lobo secondario. Zeri: $\\sin\\theta=n'/2$, $n'=\\pm1,\\pm2$. Gli appunti (p. 50) scrivono $\\pm\\pi/3$: è lo stesso zero misurato dall'asse della fila, non dalla normale. Un solo massimo principale per lato, a $\\theta=0$ (e $\\pi$).", lab: "11b", card: "11.15" },
 { id: "g11.6", c: 11, q: "Un reticolo ($d=2\\,\\mu\\mathrm{m}$) è illuminato da luce a 450 nm e a 650 nm: due serie di picchi, continua (blu) e tratteggiata (verde). Quale serie è il rosso (650 nm)?",
   plot: { x: [0, 80], y: [0, 1.1], xl: "θ (gradi)", yl: "I", ticks: [[0, "0°"], [20, "20°"], [40, "40°"], [60, "60°"]],
     fns: [{ f: th => { const s = Math.sin(th * Math.PI / 180), p = Math.PI * 2000 * s / 450, q = Math.sin(p); return Math.abs(q) < 1e-9 ? 1 : (Math.sin(8 * p) / (8 * q)) ** 2; }, c: "pen", n: 3000, lw: 1.6 },
           { f: th => { const s = Math.sin(th * Math.PI / 180), p = Math.PI * 2000 * s / 650, q = Math.sin(p); return Math.abs(q) < 1e-9 ? 1 : (Math.sin(8 * p) / (8 * q)) ** 2; }, c: "good", dash: true, n: 3000, lw: 2 }] },
   o: ["La tratteggiata: ogni suo ordine cade a un angolo maggiore", "La continua: ha più ordini visibili", "La continua: il suo primo picco è più vicino al centro", "Non si può dire senza conoscere $N$"],
   e: "$\\sin\\theta=n\\lambda/d$: a parità di ordine, $\\lambda$ più grande dà un angolo più grande (1° ordine: 13° il blu, 19° il rosso). Il blu ha anche più ordini ($n\\le d/\\lambda=4{,}4$ contro 3,1). Nel prisma è il contrario: il blu è deviato di più.", lab: "11", card: "11.11" },

 /* ---------- 12 ---------- */
 { id: "g12.1", c: 12, q: "Tempo di percorrenza $t(x)$ da S a P passando per il punto $x$ dell'interfaccia. Dove la attraversa il raggio di luce?",
   cap: "S è 1 m sopra l'interfaccia, nel mezzo veloce ($v_1=1$ m/s); P è 1 m sotto e 2 m più in là, nel mezzo lento ($v_2=0{,}5$ m/s).",
   plot: { x: [-0.2, 2.5], y: [3.8, 6], xl: "x (m)", yl: "t (s)", ticks: [[0, "0"], [0.5, "0,5"], [1, "1"], [1.5, "1,5"], [2, "2"]],
     fns: [{ f: x => Math.sqrt(1 + x * x) / 1 + Math.sqrt(1 + (2 - x) ** 2) / 0.5, c: "pen" }] },
   o: ["Nel minimo di $t(x)$, a circa 1,5 m", "A $x=1$ m, sulla retta che unisce S e P", "A $x=2$ m, per fare il minimo tratto nel mezzo lento", "A $x=0$, per fare il minimo tratto nel mezzo veloce"],
   e: "Fermat: il raggio rende minimo il tempo, $dt/dx=0$, che equivale a $\\frac{\\sin\\theta_1}{v_1}=\\frac{\\sin\\theta_2}{v_2}$ (Snell). Come il bagnino, conviene allungare il tratto veloce, ma non fino a $x=2$: lì $t$ è già risalito. La retta ($x=1$) è il cammino più corto, non il più rapido.", lab: "12b", card: "12.6" },
 { id: "g12.2", c: 12, q: "Raggio dall'aria all'acqua ($n=1{,}334$): angolo di rifrazione $\\theta_t$ in funzione di $\\theta_i$. Con che apertura un sub, guardando in su, vede tutto il cielo?",
   plot: { x: [0, 90], y: [0, 60], xl: "θᵢ (aria)", yl: "θₜ (acqua)", ticks: [[0, "0°"], [30, "30°"], [60, "60°"]],
     hlines: [{ y: 48.6, label: "48,6°" }],
     fns: [{ f: th => Math.asin(Math.sin(th * Math.PI / 180) / 1.334) * 180 / Math.PI, c: "pen" }] },
   o: ["Circa 97°", "Circa 49°", "180°", "Circa 132°"],
   e: "Anche i raggi radenti ($\\theta_i=90^\\circ$) entrano con $\\theta_t\\le48{,}6^\\circ$: tutto il cielo arriva dentro un cono di semiapertura 48,6°, apertura circa 97° (finestra di Snell). 48,6° è anche l'angolo critico acqua→aria: fuori dal cono, da sotto, vedi la riflessione totale.", lab: "12", card: "12.5" },
 { id: "g12.3", c: 12, q: "Fattore di obliquità di Kirchhoff per un'ondina di Huygens. Quanto pesa l'ondina a 90° e all'indietro?",
   cap: "In alto la direzione di propagazione ($\\chi=0$); il raggio della curva è il peso $K(\\chi)$ dell'ondina in quella direzione.",
   plot: { polar: true, full: true, fns: [{ f: th => 0.5 * (1 + Math.cos(th)), c: "pen" }],
     marks: [{ th: Math.PI, label: "180°" }] },
   o: ["½ a 90°, 0 all'indietro: nessuna onda regressiva", "0 a 90°, ½ all'indietro", "1 in tutte le direzioni: l'ondina è una sfera uniforme", "½ a 90° e ½ all'indietro"],
   e: "$K(\\chi)=\\tfrac12(1+\\cos\\chi)$: 1 in avanti, ½ a 90°, 0 a 180°. Per questo l'inviluppo delle ondine dà solo il fronte in avanti. Ondine sferiche uniformi, come le immaginava Huygens, produrrebbero anche un fronte all'indietro, che non si osserva.", lab: "12b", card: "12.14" }
];

if (typeof QUIZ_FIX !== "undefined") for (const q of QUIZ) if (QUIZ_FIX[q.id]) Object.assign(q, QUIZ_FIX[q.id]);
QUIZ.push(...QUIZ_NEW);
