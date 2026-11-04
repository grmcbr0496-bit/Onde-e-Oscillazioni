# Changelog

## 1.0.0 — prima versione di “Onde & Formule”

“L'albero delle formule” e “Capire le onde” diventano un unico gioco. Grafica, schede, laboratori e struttura in 12 capitoli restano quelli originali.
I contenuti sono stati confrontati con le 82 pagine degli appunti “Onde – scritto” e completati (errori degli appunti: vedi `ERRATA-APPUNTI.md`).

### Correzioni obbligatorie
- **KaTeX.** Entrambe le app caricavano KaTeX dal CDN: senza connessione, o se il CDN non rispondeva, le formule restavano testo grezzo.
  Ora si usa KaTeX **0.16.11** incluso nel progetto (`vendor/katex/`, con i font), quindi funziona anche offline.
  Tutte le 5706 formule del gioco sono state verificate con KaTeX 0.16.11 in modalità severa: 0 errori.
  Nei file originali (`originali/`) `<link>` e `<script>` puntano ora a `katex@0.16.11`.
  Nota: `katex@0.16.47` esiste su npm (pubblicata il 16/05/2026), quindi il problema non era il numero di versione
  ma la dipendenza dal CDN. Come richiesto, è stata comunque sostituita con la 0.16.11.
- **“Quale formula?”.** Le opzioni sono la formula giusta e i suoi tre distrattori **della stessa scheda**, scritti per intero.
  Il membro a sinistra è identico in tutte e quattro: per rispondere bisogna sapere la formula, non riconoscere la scheda. La correzione vale anche nell'originale.
- **Ogni formula ha:** il significato fisico di ogni simbolo (con unità), le condizioni di validità, l'errore concettuale comune,
  i collegamenti a laboratorio, schede e concetti correlati, e le pagine degli appunti.
- **Schede corrette** rispetto agli appunti:
  - 1.7 (x spostamento orizzontale);
  - 2.4 (critico = ritorno più rapido *senza oscillare*);
  - 4.5 (periodo dei battimenti 2π/|ω_a − ω_b|);
  - 12.4 e 12.12 (un distrattore era in realtà giusto);
  - 12.9 (concavo: immagine reale solo se p > f);
  - 11.9 (riscritta perché a 390 px era illeggibile).
- **Domande corrette perché ambigue:** q5.4, q9.6, q12.3.

### Struttura del gioco
Home con 7 sezioni e barra di navigazione in basso; il tasto “indietro” di Android torna alla schermata precedente.
1. **Formulario**: 194 schede (erano 118). Mantiene ripasso distanziato, Lampo, “Completa”, “Quale formula?” e “A memoria”.
2. **Laboratori**: 17 simulazioni con 90 missioni.
3. **Quiz concettuali**: 144 domande (erano 83) e 25 domande “Leggi il grafico”.
4. **Problemi da scritto**: 20 esercizi numerici a scelta multipla con dati, formula necessaria, soluzione passo passo, errore tipico e difficoltà da 1 a 3. C'è anche la “Simulazione di scritto” da 5 problemi.
5. **Allenamento**: sessione mista di formule, concetti, grafici e problemi, con filtro per capitolo e per tipo.
6. **Errori da rivedere**: tutti gli errori, con quelli ricorrenti in evidenza. Un errore esce dalla lista dopo due risposte giuste di fila.
7. **Progressi**: preparazione per capitolo, streak (attuale e massima), record di Lampo, Ripasso rapido e Allenamento, attività degli ultimi 14 giorni, **mappa delle lacune** (capitolo × formule/concetti/lab/problemi: si tocca una casella per allenarsi lì).

In più:
- **Ripasso rapido da 5 minuti**: prima gli errori, poi le scadenze, poi il materiale misto.
- **“Spiegami come a un esame”**: 27 concetti difficili spiegati passo per passo.
- **Ogni laboratorio e ogni concetto** rispondono a “Cosa sto vedendo?”, “Perché succede?”, “Quale formula uso?”, con le schede cliccabili.

### Contenuti nuovi (dagli appunti)
- **Perdite radiative**: massa su molla collegata a una corda infinita, γ = T₀/(m v), impedenza e potenza irradiata.
- **Schiera di 4 antenne radio** con d = λ/2: diagramma polare, massimi, minimi a ±π/6 e ±π/2 dalla normale (gli appunti scrivono π/3: è l'angolo dall'asse), direzionalità che cresce con N.
- **Frusta e timbro**: ρ_L → 0 fa crescere v = √(T/ρ_L); tono puro a 440 Hz e suono reale come somma di armoniche.
- **Lambert–Beer e dB**: l'attenuazione geometrica fa calare il livello col logaritmo della distanza (−6 dB raddoppiando r); l'assorbimento lo fa calare linearmente, β ≈ 4,34 α dB/m.
- **Effetto Cherenkov** come analogo ottico del cono di Mach.
- **Principio di Huygens–Fresnel**: costruzione di riflessione e rifrazione e argomento di Kirchhoff sull'assenza del fronte regressivo.
- **Specchi parabolici**, aberrazione sferica e vantaggi dei telescopi riflettori.
- **Principio di Fermat** e analogia con Maupertuis/Hamilton–Jacobi.
- **Altre schede degli appunti**: pendolo esatto, metodo complesso del forzato, coordinate normali, tubo di Kundt, soglie e tabella dei dB, fasori di N sorgenti, massimi secondari, Maxwell e n = √(ε_r μ_r), e molte altre.

### Laboratori
- **Diffrazione (11)**:
  - fenditura singola, doppia fenditura e reticolo con cursore d/a;
  - preset “d = 3,5a” con gli ordini mancanti (7, 14, …) segnati e il conteggio delle frange nel lobo centrale;
  - **disco di Airy** (immagine 2D e profilo);
  - **criterio di Rayleigh** con due sorgenti vicine;
  - preset **Hubble** (D = 2,4 m, λ = 500 nm: 2,5·10⁻⁷ rad ≈ 0,052″).
- **Schiera di antenne (11b)**: diagramma polare e cartesiano, N da 1 a 10.
- **Ottica geometrica (12)**:
  - lente convergente e divergente, specchio concavo e convesso, con i tre raggi principali;
  - **diottro sferico** con focale oggetto e focale immagine diverse.
- **Huygens e Fermat (12b)**: costruzioni di Huygens, fattore di Kirchhoff, il bagnino con t(x), specchio sferico contro parabolico.
- **Onde sonore (7)**:
  - nuove scelte battimenti, timbro e Doppler;
  - pulsante **Ascolta** (Web Audio) con controlli di frequenza, ampiezza, velocità relativa e livello;
  - limitatore e spegnimento automatico dopo 20 s;
  - **avviso se il volume è troppo alto**.
- **Attenuazione (7b)**: dB e Lambert–Beer, asse r lineare o logaritmico.
- **Perdite radiative (5b)** e **Frusta (5c)**: laboratori nuovi.
- **Doppler (9)**: aggiunta la scelta **Cherenkov**.
- Le missioni originali restano le prime: i progressi salvati restano validi.

### PWA e dati
- **App installabile**: `manifest.json` con icone 192/512 e maskable, scorciatoie (Ripasso rapido, Laboratori, Problemi).
- **Offline**: `service-worker.js` mette in cache tutti i file al primo avvio. Quando esce una versione nuova compare il banner “Aggiorna”.
- **Font locali**: Atkinson Hyperlegible, IBM Plex Mono e Kalam, licenza OFL; lo stile non cambia.
- **Progressi** in `localStorage`: livelli, statistiche, errori ricorrenti, record, streak, missioni. **Esporta** e **Importa** in JSON.
  Il file importato viene validato campo per campo; i progressi delle app originali, se presenti sullo stesso dominio o in un file, vengono uniti.
- **Sicurezza**: nessun contenuto entra nella pagina come HTML senza escaping. È stata provata l'importazione di un file con HTML e script nei campi: tutto scartato.
- **Tema** chiaro, scuro o automatico, con impostazione manuale in Progressi.

### Collaudo
- **Prove automatiche in Chromium**: ogni capitolo, concetto, laboratorio (con tutte le scelte, i preset e gli slider agli estremi), problema, grafico, domanda e scheda, a 320, 360 e 390 px e in tema chiaro e scuro. Risultato: nessun errore in console, nessuna formula non resa, nessuno scorrimento laterale.
- **Offline**: dopo il primo caricamento l'app funziona senza rete, con formule e font.
- **Revisione del codice**: 13 bug corretti.
  - Non si può più rispondere due volte alla stessa domanda con indietro e avanti.
  - Un file importato con chiavi come `constructor` non manda più in crash l'app.
  - Il service worker non mescola più due versioni.
  - Le missioni non si completano più da sole aprendo il laboratorio o con gli esempi pronti.
  - La streak regge il cambio dell'ora legale.
  - Altri casi di navigazione corretti.
