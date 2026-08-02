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
