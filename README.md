# Onde & Formule

Gioco didattico per preparare lo **scritto di Onde** (Fisica). Nasce dall'unione di due app:
“L'albero delle formule” e “Capire le onde”. Stile grafico, schede, laboratori, progressi e capitoli
sono rimasti quelli originali. I contenuti sono stati confrontati e completati con gli appunti “Onde – scritto” (82 pagine).

HTML, CSS e JavaScript vanilla, senza framework. KaTeX **0.16.11** e i font sono inclusi nel progetto, quindi
l'app funziona **offline** dopo il primo caricamento. È una **PWA installabile** su Android.

## Struttura

| File | Contenuto |
|---|---|
| `index.html` | pagina unica dell'app |
| `style.css` | stile del quaderno a quadretti (quello delle app originali) e componenti nuovi |
| `app.js` | motore: navigazione, ripasso distanziato, sessioni, quiz, problemi, allenamento, errori, progressi, export/import |
| `data-formule.js` | capitoli, schede di formula (simboli, validità, errore tipico, collegamenti) e concetti “Spiegami come a un esame” |
| `data-quiz.js` | quiz concettuali e domande “Leggi il grafico” |
| `data-problemi.js` | problemi da scritto con soluzione guidata |
| `labs.js` | laboratori interattivi (canvas e Web Audio) e mini-grafici |
| `manifest.json` | manifest della PWA (nome, icone, colori, scorciatoie) |
| `service-worker.js` | cache offline di tutti i file |
| `icons/` | icone 192 e 512, maskable, apple-touch, favicon |
| `vendor/katex/` | KaTeX 0.16.11 (licenza MIT) con i font |
| `fonts/` | Atkinson Hyperlegible, IBM Plex Mono, Kalam (licenza SIL OFL) |
| `originali/` | le due app originali con il bug di KaTeX corretto |
| `.well-known/assetlinks.json` | modello per l'APK (TWA), vedi sotto |

## Provarlo sul computer

Il service worker e i font locali richiedono un indirizzo `http://` o `https://`: se apri `index.html` con un doppio clic
(`file://`) l'app funziona lo stesso, ma senza modalità offline e con i font di sistema.

```bash
cd Onde-e-Oscillazioni
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Installarlo su Android come PWA

1. **Pubblica la cartella su un indirizzo HTTPS.** Ecco due modi gratuiti.
   - **GitHub Pages:** nel repository vai su *Settings → Pages → Build and deployment*, scegli *Deploy from a branch*,
     poi il branch `main` e la cartella `/ (root)`. Dopo un minuto l'app è su
     <https://grmcbr0496-bit.github.io/Onde-e-Oscillazioni/>. Il file `.nojekyll` è già incluso.
   - **Netlify Drop:** apri <https://app.netlify.com/drop> e trascina la cartella del repository. Ottieni un indirizzo
     `https://<nome>.netlify.app`.
2. Sul telefono apri l'indirizzo con **Chrome**.
3. Tocca il menu **⋮** e poi **Installa app** (oppure **Aggiungi a schermata Home**). In *Progressi* c'è anche il pulsante
   “Installa l'app sul telefono”, che compare quando Chrome lo permette.
4. Apri l'app una volta con la connessione attiva. Compare il messaggio “Pronta anche offline” e da lì in poi
   funziona anche in modalità aereo.
5. **Aggiornamenti:** quando pubblichi una nuova versione, all'apertura successiva compare “È pronta una nuova versione”.
   Tocca **Aggiorna**.

Tenendo premuta l'icona compaiono le scorciatoie *Ripasso rapido*, *Laboratori* e *Problemi*.

### Progressi

I progressi (livelli delle schede, risposte, errori ricorrenti, record, streak, missioni) restano nel dispositivo
(`localStorage`). In **Progressi → Esporta progressi** scarichi un file `.json`. Con **Importa progressi** lo carichi
su un altro telefono, oppure dopo aver cancellato i dati del browser. Il file viene validato campo per campo prima
dell'uso. Si possono importare anche i progressi delle due app originali, se ne hai una copia JSON: vengono uniti ai tuoi.

## Trasformarlo in APK con Bubblewrap (TWA), senza toccare il codice del gioco

Una *Trusted Web Activity* è un'app Android che mostra la PWA a schermo intero. Il gioco resta lo stesso e
si aggiorna da solo quando aggiorni il sito.

Prerequisiti: Node.js 18 o superiore e la PWA già pubblicata in HTTPS (vedi sopra). Al primo avvio Bubblewrap scarica da sé JDK e Android SDK.

```bash
npm install -g @bubblewrap/cli
mkdir onde-formule-apk && cd onde-formule-apk
bubblewrap init --manifest https://grmcbr0496-bit.github.io/Onde-e-Oscillazioni/manifest.json
#   - Application ID (package): es. it.<tuonome>.ondeformule
#   - Display mode: standalone   - Orientation: portrait
#   - crea una nuova chiave di firma (annota password e percorso del keystore)
bubblewrap build
#   -> app-release-signed.apk (da installare) e app-release-bundle.aab (per il Play Store)
```

Installazione sul telefono: copia `app-release-signed.apk` e aprilo, autorizzando l'installazione da fonti sconosciute.
In alternativa, con il debug USB attivo: `bubblewrap install`.

### Togliere la barra dell'indirizzo (Digital Asset Links)

Senza verifica la TWA mostra una sottile barra con l'indirizzo. Per toglierla:

1. Ricava l'impronta della chiave: `bubblewrap fingerprint list`, oppure
   `keytool -list -v -keystore android.keystore` e copia la riga SHA256.
2. Compila `.well-known/assetlinks.json` con il package scelto e l'impronta. Se l'APK lo distribuisci tramite Play Store
   con la firma gestita da Google, usa l'impronta che trovi in *Play Console → Integrità dell'app*.
3. Il file deve stare alla **radice del dominio**: `https://<dominio>/.well-known/assetlinks.json`.
   - Con Netlify (`https://<nome>.netlify.app`) basta pubblicare la cartella così com'è.
   - Con GitHub Pages di questo repository (`grmcbr0496-bit.github.io/Onde-e-Oscillazioni/`) la radice è
     `grmcbr0496-bit.github.io`: il file va messo nel repository speciale `grmcbr0496-bit.github.io`, nella cartella `.well-known/`.
4. Ricostruisci con `bubblewrap build` (non serve se il file è cambiato solo sul sito).

Il codice del gioco non cambia mai: Bubblewrap legge `manifest.json` e le icone già pronte.

## Modificare i contenuti

Ogni file `data-*.js` comincia con una descrizione dei campi. Testi: formule tra `$...$` (KaTeX) e `**grassetto**`.
L'HTML non è ammesso: ogni testo viene inserito con escaping. Dopo una modifica, cambia anche un carattere qualsiasi
in `service-worker.js` (per esempio la riga `VERSION`), così i telefoni scaricano la versione nuova.
