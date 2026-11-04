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

const GRAPHS = [];
