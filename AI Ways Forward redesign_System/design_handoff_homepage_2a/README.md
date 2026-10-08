# Handoff: AI-Ways Forward Homepage (Direction 2a) + Design System

## Overview
Redesign of https://www.ai-waysforward.com/ (a youth-focused AI education foundation). This package covers the homepage hero, nav, footer, and the design system (from direction 1c, which 2a uses). All site copy is preserved verbatim from the live site; only style changed.

## About the Design Files
`AI-Ways Forward Redesign.dc.html` is a **design reference built in HTML**, not production code. Recreate it in the target codebase using its established framework and patterns (or pick an appropriate one if none exists). Do not ship the HTML directly. The file is a canvas of several options; **2a** (top section, `id="2a"`) is the chosen design. Section `1c` is the design system specimen. 1a/1b are rejected alternatives, ignore them.

## Fidelity
**High-fidelity.** Final colors, type, spacing and radii. Recreate pixel-accurately. Exception: gallery tiles are striped placeholders (see Assets).

## Screen: Homepage (2a)
Reference width 1180px; make it fluid (see Responsive). Page ground `#F4F2EE`, 1px border `#C9C5BE` on the artboard only (not part of the design).

### Top strip
14px tall, `#EDEAE5`, 1px dotted bottom border `#C9C5BE`.

### Nav
Flex, space-between, padding `18px 36px 20px`.
- **Wordmark**: "AI-Ways Forward", Playfair Display 600, 24px, letter-spacing -0.01em, `#141414`. Beneath it, a 5px-tall red arrow (see Arrow motif) spanning wordmark width, gap 2px.
- **Links** (gap 28px): Home, About Us, Services, FAQs, Contact Us. Sora 500 14px `#33312F`. Active (Home): `#A33328`, weight 700.
- **Right actions** (gap 8px), Sora 600 13px, padding `9px 16px`, radius 999px: "Log In" (bg `#FFFFFF`, text `#141414`, 1px `#E0DCD5`); "Join the Discord" (bg `#A33328`, text white).

### Hero
Grid `1.02fr 0.98fr`.

**Left column** — padding `26px 40px 60px 36px`, flex column, gap 22px.
1. **Segmented pill** (inline-flex, bg white, 1px `#E0DCD5`, radius 999px, padding 6px, gap 6px, Sora 500 13px): "AI-Ways Forward for…" (padding `7px 12px`, `#6B6560`); "Education" selected (padding `7px 15px`, bg `#141414`, white, weight 600, pill); "Career Awareness" and "AI News" (padding `7px 13px`, `#33312F`).
2. **H1** "Learn & Use" on two lines ("Learn" / "& Use"): Sora 700, 76px, line-height 1.0, letter-spacing -0.04em, `#141414`. Under it a 9px-tall, 270px-wide `#A33328` brush underline, radius `999px 999px 40% 40%`, opacity 0.9 (gap 4px).
3. **Body**: "AI-Ways Forward provides a chance for young people to acknowledge, adapt to, and prepare for an Artificial Intelligence dominant future." Space Grotesk 400, 19px/1.55, `#3C3936`, max-width 450px, `text-wrap: pretty`.
4. **CTAs** (gap 12px, padding-top 4px), Sora 600 16px, padding `10px 12px 10px 22px`, radius 999px, each with a 30px circle (`#141414`, white "→" 14px) after the label, gap 12px: "I'm a student" (bg `#A33328`, white); "I'm an educator" (bg white, 1px `#E0DCD5`, `#141414`). **These two labels are new copy (not from the live site)**, modeled on the reference's dual-audience split; confirm with the client or swap to "Join the Discord".
5. **Tagline pill** (inline-flex, bg white, 1px `#E0DCD5`, radius 999px, padding `11px 20px`, margin-top 6px, gap 16px; Sora 600 12px uppercase, letter-spacing 0.06em, `#4A4744`): "Understand AI" • "Adapt to AI" • "Build with AI", separated by 5px `#A33328` dots.

**Right column — gallery rail.** Two equal flex columns, gap 16px, padding-right 20px, max-height 640px, `overflow: hidden`. Tiles bleed off top and bottom; column 1 offset `margin-top:-70px`, column 2 `-140px`, `align-items:flex-start`. Tile radius 20px, label (Sora 10px, letter-spacing 0.06em, bottom-left, padding 12–14px). Order and heights:
- Col 1: 150 (light) · 250 (red) · 260 (light) · 210 (dark)
- Col 2: 180 (light) · 230 (dark) · 200 (light) · 240 (red)

Optional enhancement: slow vertical marquee, columns drifting in opposite directions; pause on hover; respect `prefers-reduced-motion`.

### Footer
Bg `#6E2622`, padding `44px 36px`, flex space-between. Left: "Contact Us" (Sora 700 19px, white), then lines at 15px `#F0DCD8`: "672-515-5775", "director@ai-waysforward.com", and "discord.gg/33CsDt3K" (white, underlined; link to the Discord). Right: "© 2026 by J. Yang." 13px `#E8CFCB`.

## Interactions & Behavior
- The segmented pill is a tab-style selector (Education / Career Awareness / AI News). Reference shows Education selected; recommended behavior: selecting a tab swaps the hero's supporting content or links to the corresponding Services section. Confirm with client.
- Buttons/links: hover = darken (`#A33328` → `#6E2622`; ink buttons → `#3C3936`), 150ms ease. Focus: 2px `#A33328` outline, 2px offset.
- Nav links route to About Us, Services, FAQs, Contact Us pages (not designed yet; use the live site's content).
- Log In: existing behavior from the live site.

## Responsive
Not designed. Suggested: below ~900px stack hero (copy first, gallery below as a 2-col strip, max-height ~360px); nav collapses to a menu button; H1 clamps to ~48px.

## State Management
Only the active tab of the segmented pill and the active nav item. No data fetching.

## Design Tokens
**Color**
- Ink `#141414` · Charcoal `#3C3936` · Arrow Red `#A33328` · Deep Brick `#6E2622` · Paper `#F1EFEC` · Rule `#E0DCD5`
- Supporting: page ground `#F4F2EE`, strip `#EDEAE5`, body-muted `#4A4744` / `#6B6560`, nav text `#33312F`, footer text `#F0DCD8` / `#E8CFCB`, white `#FFFFFF`
- Placeholder tiles: light stripes `#E3DFD8`/`#DAD5CD`, red `#8E2C22`/`#A33328`, dark `#1F1D1B`/`#282522` (135° repeating, 8px)

**Type** (Google Fonts)
- Playfair Display 400/600 — wordmark only (this page)
- Sora 300–800 — headings, nav, buttons, labels, eyebrows
- Space Grotesk 300–700 — body copy
- Scale: H1 76/1.0/-0.04em · H2 38 · H3 19–22 (700) · body 19/1.55 (hero), 14–15 (cards, footer) · label 12–13 uppercase, +0.06–0.16em

**Spacing**: 4 · 8 · 12 · 20 · 32 · 48 · 72px
**Radius**: pills 999px · gallery tiles 20px · cards 4px
**Shadows**: none (flat, border-defined)

**Arrow motif**: hand-drawn-style red arrow, shaft ~20% of height, head at right. CSS: `clip-path: polygon(0 40%,88% 40%,88% 0,100% 50%,88% 100%,88% 60%,0 60%)` on a `#A33328` bar. Use once per screen under the wordmark. The live site uses an illustrated arrow; replace with the client's original asset if available.

## Assets
- No raster assets. Gallery tiles are **placeholders**; source real images: students at laptops in daylight; a professional using AI on the job (surgeon/architect/engineer); hackathon table; speaker in front of a room; macro of an AI interface; blueprint/CAD detail; plus the **existing abstract node render** from the live site (the one non-photographic tile). Apply a duotone of Ink + Arrow Red at ~60% so the set coheres. Corner radius 20px.
- Fonts via Google Fonts.

## Files
- `AI-Ways Forward Redesign.dc.html` — design reference (2a = homepage, 1c = design system specimen)
- `uploads/` screenshots of the live site used to derive the system (not copied; available in the project)
