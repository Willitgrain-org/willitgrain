# Will It Grain

**Filmproduktion & Portfolio** — Cinematic filmmaking, commercial, and documentary production.

→ [willitgrain.com](https://willitgrain.com)

---

## Tech Stack

| Bereich | Technologie |
|---------|-------------|
| Framework | [Astro 5](https://astro.build) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Typografie | Rubik Dirt, Six Caps, Inter Variable |
| Animation | [GSAP](https://gsap.com), CSS-Grain (Stop-Motion-Frames) |
| CMS | [Keystatic](https://keystatic.com) (GitHub-based, YAML content) |
| Bilder | Astro `getImage()` + [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/) |
| Shop | [Snipcart](https://snipcart.com) (derzeit deaktiviert) |
| Hosting | [Netlify](https://netlify.com) |
| Sprachen | English / Deutsch (i18n routing) |

---

## Projektstruktur

```
src/
├── components/
│   ├── pages/         # Seiten-Komponenten, gemeinsam für EN + DE
│   │                  #   (HomePage, ProjectPage, AboutPage) – Texte je Sprache im `t`-Objekt
│   ├── ui/            # shadcn/ui Komponenten
│   └── …              # Header, Footer, HomeGallery, MagicBento, Lightbox, …
├── content/
│   ├── config.ts      # Content Collections Schema
│   └── projects/      # YAML-Datei pro Film/Projekt
├── layouts/
│   └── main.astro     # Basis-Layout (Grain-Hintergrund, SEO, ggf. Snipcart)
├── lib/
│   ├── features.ts    # Feature-Schalter (SHOP_ENABLED)
│   ├── images.ts      # Responsive Bilder (srcset) über Netlify Image CDN
│   ├── projectImages.ts # Findet Stills/BTS automatisch im Ordner
│   └── …              # i18n, trailer, utils
├── pages/             # Nur dünne Routen: index, [slug], about (+ de/)
├── shop/              # Shop-Seiten (nur als Route aktiv bei SHOP_ENABLED)
└── styles/
    └── global.css
```

---

## Bilder

Projektbilder liegen in `public/projects/<slug>/`:

- `posterUrl.webp` – Poster
- `stills/` und `bts/` – werden **automatisch** eingelesen, kein YAML-Eintrag nötig
- Ein Still mit `-preview` im Dateinamen (z.B. `still-3-preview.webp`) wird als Vorschaubild auf der Startseite verwendet

Die Originale werden nie direkt ausgeliefert: `src/lib/images.ts` erzeugt per Astro `getImage()`
passende Größen (`srcset`) über das Netlify Image CDN, das die Bilder bei Bedarf skaliert,
AVIF/WebP je nach Browser liefert und cached. Lokal emuliert der Dev-Server das CDN.
Trotzdem gilt: Originale möglichst nicht größer als ~2500 px Breite hochladen.

---

## Shop

Der Shop ist vorbereitet, aber deaktiviert. Aktivieren in `src/lib/features.ts`:
`SHOP_ENABLED = true` – dann werden `/shop` + `/de/shop` gebaut, der Header-Link erscheint
und Snipcart wird geladen. Die Produkte in `src/shop/` sind noch Platzhalter.

---

## Lokale Entwicklung

```bash
# Installation
npm install

# Dev-Server starten (localhost:4321)
npm run dev

# Keystatic Admin UI
# → http://localhost:4321/keystatic

# Build + Preview
npm run build
npm run preview
```

### Umgebungsvariablen

Die `.env`-Datei wird nicht versioniert. Für lokale Entwicklung mit Keystatic GitHub Mode:

```env
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

---

## Content bearbeiten (Keystatic)

Das Admin-Interface ist unter `/keystatic` erreichbar. Nach GitHub-Login können Filme/Projekte bearbeitet werden:

- **Titel, Laufzeit, Genre, Synopsis** (EN + DE)
- **Poster & Stills** (Bild-Upload)
- **Crew-Listen** (Rolle + Name, EN + DE)
- **Billing-Header/Footer** (Credits)
- **Links** (Crew United, Filmfreeway, YouTube-Trailer)

Änderungen werden direkt als Commits ins Repo gepusht und lösen einen Netlify-Deploy aus.

---

## Deployment

Die Seite wird via **Netlify** automatisch deployed. Jeder Push auf `main` triggered einen neuen Build.

- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Astro

---

## Linting & Formatting

```bash
npm run lint       # ESLint
npm run format     # Prettier (TS, TSX, Astro, Tailwind)
npm run typecheck  # astro check (TypeScript)
```

---

## Lizenz

© 2024–2026 Willit Grain GmbH. Alle Rechte vorbehalten.
