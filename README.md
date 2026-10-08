# AI-Ways Forward — frontend redesign

A complete frontend rebuild of <https://www.ai-waysforward.com> (originally Wix), following the design handoff in `AI Ways Forward redesign_System/design_handoff_homepage_2a/`. All 11 original pages, all their text, and all their imagery are migrated; anything that has no real content or function yet is marked **TBD** in the UI.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build
```

| Script | What it does |
| --- | --- |
| `npm run media` | Regenerates `public/media/` from the raw originals in `source-assets/` |
| `npm run inventory` | Regenerates `docs/CONTENT_INVENTORY.md` from `src/content/` |
| `npm run verify:content` | Checks every authored string against the live Wix site (needs network) |

## What's here

- **Pages:** Home · About Us · Services · Education (+ 3 class pages) · Career Awareness · AI News · FAQs · Contact. Routes keep the original Wix slugs (`/about-7`, `/contact-8`, `/innovation` …).
- **Design:** the handoff's palette, Sora / Space Grotesk / Playfair, pill nav and buttons, brush underline, striped placeholders, ink + red duotone, Deep Brick footer — extended to every page. Extensions are catalogued in `docs/DESIGN_ADDENDUM.md`.
- **Content:** every string lives in `src/content/` and is verified verbatim against the live site.

## Read these next

| File | For |
| --- | --- |
| `docs/TBD_REGISTER.md` | Everything marked TBD + open decisions (**start here**) |
| `docs/DESIGN_ADDENDUM.md` | New styles beyond the handoff |
| `docs/CONTENT_INVENTORY.md` | Verbatim copy, links, and image provenance for every page |
| `docs/ARCHITECTURE.md` | Folder map, routes, how to edit/add things |

## Deploying

It is a single-page app, so the host must serve `index.html` for unknown paths (otherwise a refresh on `/about-7` returns 404). Netlify: add `public/_redirects` containing `/*  /index.html  200`. Vercel: a `rewrites` entry mapping `/(.*)` to `/`. Static hosts with a "SPA fallback" toggle: turn it on. Build output is `dist/`.
