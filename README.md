# Filip Engelhart — Portfolio

Osobní web video editora. Vite + React + framer-motion.
Tmavý cinematic / gaming-motion design, dvojjazyčný (CZ výchozí, EN přepínač).

## Spuštění

```bash
npm install
npm run dev      # dev server na http://localhost:5180
npm run build    # produkční build do /dist
npm run preview  # náhled produkčního buildu
```

## Kde co upravit

| Chci změnit… | Soubor |
|---|---|
| **Texty (CZ i EN)** | `src/i18n/translations.js` |
| **Kontakt, Instagram, seznam klientů** | `src/i18n/translations.js` (dole) |
| **Videa do portfolia** | `src/data/projects.js` |
| **Barvy, fonty, mezery** | `src/index.css` (sekce `:root` nahoře) |
| **Pořadí sekcí** | `src/App.jsx` |
| **Čísla a graf v okně „Přehled"** | `src/data/dashboard.js` |
| **Recenze klientů (text i video)** | `src/data/reviews.js` |
| **Klienti a odkazy na jejich weby** | `src/i18n/translations.js` (dole) |

## Okno „Přehled" (sekce statistik)

Není to obrázek, je to funkční mini-appka:

- **boční menu** přepíná dva pohledy (Přehled / Klienti), šipky ↑↓ fungují taky
- **graf** ukazuje po najetí myší konkrétní hodnotu
- **klik na logo klienta** otevře jeho web v nové záložce
- **žlutý puntík** okno sbalí, **zelený** ho roztáhne na plnou šířku
- **výška okna** se při přepnutí pohledu animuje, ať to neproblikne

Čísla v grafu jsou zatím ilustrativní křivka růstu, ne export z YouTube Studia.

## Recenze

Sekce se vykreslí, až do `src/data/reviews.js` přidáš první položku. Dokud jsou
obě pole prázdná, sekce ani odkaz v menu na webu nejsou.

## Sekce na stránce

Hero, pás klientů, okno „Přehled", Vybrané projekty, Reference, **Služby
(včetně Spolupráce krok za krokem)**, O mně, Kontakt. Postup je spodní část
sekce Služby, ale drží si vlastní kotvu `#process`.

## Jak přidat videa

V `src/data/projects.js` u každého projektu doplň:

- `videoUrl` — odkaz na video (YouTube/Vimeo embed nebo `.mp4`). Jakmile je vyplněný, zmizí štítek „Brzy".
- `thumb` — cesta k náhledovému obrázku (např. `/thumbs/reels-1.jpg`, obrázky dej do složky `public/`).
- `vertical: true` u reels/shorts (formát 9:16).

Kategorie (`category`) drží filtr nad galerií: `reels`, `youtube`, `ads`, `motion`.
Nové projekty klidně přidávej dál do pole — mřížka i filtr se přizpůsobí.

## Deploy (Netlify / Vercel)

- Build command: `npm run build`
- Publish directory: `dist`

## Fonty

Anton (nadpisy) + Space Grotesk (texty) se načítají z Google Fonts v `index.html`.
