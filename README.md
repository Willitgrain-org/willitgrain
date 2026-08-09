# Will It Grain

**Filmproduktion & Portfolio** — Cinematic filmmaking, commercial, and documentary production.

→ [willitgrain.netlify.app](https://willitgrain.netlify.app)

---

## Tech Stack

| Bereich | Technologie |
|---------|-------------|
| Framework | [Astro 5](https://astro.build) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Typografie | Rubik Dirt, Six Caps, Inter Variable |
| Animation | [GSAP](https://gsap.com), [OGL](https://github.com/oframe/ogl) (WebGL Grain Gradient) |
| CMS | [Keystatic](https://keystatic.com) (GitHub-based, YAML content) |
| Shop | [Snipcart](https://snipcart.com) |
| Hosting | [Netlify](https://netlify.com) |
| Sprachen | English / Deutsch (i18n routing) |

---

## Projektstruktur

```
src/
├── components/        # React components (Header, Footer, Gallery, Bento Grid, …)
│   └── ui/            # shadcn/ui Komponenten (Button, Card, Badge, Dialog)
├── content/
│   ├── config.ts      # Astro Content Collections Schema
│   └── projects/      # YAML-Dateien pro Film/Projekt
├── layouts/
│   └── main.astro     # Basis-Layout (Grainient-Hintergrund, Snipcart, SEO)
├── pages/
│   ├── index.astro    # Startseite EN
│   ├── [slug].astro   # Projekt-Detailseite EN
│   ├── shop.astro     # Shop-Seite EN
│   └── de/            # Deutsche Seiten (gleiche Struktur)
├── styles/
│   └── global.css     # Tailwind + Theme + Snipcart Custom Properties
└── lib/
    └── utils.ts       # cn() Utility (clsx + tailwind-merge)
```

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
