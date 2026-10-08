# Design addendum — styles beyond the handoff

The design system in `AI Ways Forward redesign_System/design_handoff_homepage_2a/` (sections **2a** homepage and **1c** foundations) is the source of truth and was followed as written. The handoff only specifies a homepage, a nav and a footer, though, and the site has eleven pages. This file records every style **added** to extend the system to the rest of the site, and every place a handoff value was **adjusted**. Tokens live in `/tokens.css`; component CSS in `src/styles/`.

## 1. What came straight from the handoff

| Element | Source | Where |
| --- | --- | --- |
| Palette (Ink, Charcoal, Arrow Red, Deep Brick, Paper, Rule + supporting greys) | 1c / README "Design Tokens" | `tokens.css` |
| Type: Sora (headings, nav, labels), Space Grotesk (body), Playfair Display 600 (serif accent) | 1c | `tokens.css`, `main.jsx` (self-hosted via Fontsource — no Google request) |
| H1 76px / 1.0 / −0.04em, H2 38px, H3 19–22px | README scale | `--text-h1/h2/h3` (fluid `clamp()`) |
| Top strip: 14px, dotted bottom rule | 2a | `.top-strip` |
| Nav: wordmark + links + Log In (white pill) + Join the Discord (red pill) | 2a | `Nav.jsx`, `.nav*` |
| Hero: 1.02fr / 0.98fr split, H1 + 9px brush underline, body 19px, two pill CTAs with ink arrow dots, segmented pill | 2a | `Home.jsx`, `.hero*`, `.pill*` |
| Gallery rail: two columns, tile radius 20px, 150–260px tile heights, opposite-direction drift, pause on hover, reduced-motion respected | 2a "optional enhancement" | `Rail.jsx`, `.rail*` |
| Striped placeholder tiles (135° repeating 8px) | README "Assets" | `.stripe*` |
| Ink + Arrow Red duotone on photography | 1c "Gallery art to source" | `.tone` |
| Deep Brick footer: Contact Us, phone, email, Discord (underlined), © 2026 by J. Yang. | 2a | `Footer.jsx`, `.foot*` |
| Buttons: primary red pill, secondary white pill, ink arrow dot, "More →" text link | 1c | `.btn*`, `.more` |
| Spacing 4·8·12·20·32·48·72, radii 999 / 20 / 4, no shadows, 150ms hover, 2px red focus ring | README | tokens + base |

## 2. New tokens (addendum)

| Token | Value | Why |
| --- | --- | --- |
| `--color-red-on-dark` | `#E58D7E` | Accent on Ink surfaces; Arrow Red (#A33328) is too dark there. The value appears in handoff direction 1b. |
| `--color-ink-rule`, `--color-ink-muted`, `--color-ink-soft` | `#332F2C`, `#B8B2AC`, `#8A837D` | Ink-surface rules/secondary text, from direction 1b. (Reserved; not all used yet.) |
| `--color-on-red` | `var(--color-surface)` | Text on Arrow Red fills. Named so the pairing is explicit (7.2 : 1). |
| `--space-3xl` | `112px` | Larger section rhythm than the handoff's 72px ceiling. (Defined; currently unused.) |
| `--text-statement` | `clamp(2.5rem, 0.8rem + 7.4vw, 7rem)` | The tagline band. |
| `--text-lede` | `clamp(1.1875rem, 1.05rem + .6vw, 1.5rem)` | Opening paragraphs of long-form pages. |
| `--z-sheet`, `--z-nav` | 20, 30 | Named layering scale. |
| `--ease-out`, `--dur-short/med/long` | `cubic-bezier(.22,1,.36,1)`, 150 / 320 / 640 ms | Short = the handoff's 150ms hover. |

## 3. New elements (and the rule each follows)

**TBD chip** — `.tbd`. A 10px Sora 700 uppercase tag, Arrow Red text and dashed border on white (white-on-transparent on dark/red surfaces). The one place the system uses a dashed line: dashed = unfinished. Never used decoratively. Register: `docs/TBD_REGISTER.md`.

**Page head** — `.page-head`. Optional breadcrumb (Sora 12px, 0.12em caps, muted) stacked **above** the H1; H1 + the handoff's brush underline (`.brush`: 9px, `border-radius: 999px 999px 40% 40%`, `min(270px, 62%)` wide). The brush is the H1's underline on every page and is **not** the arrow motif.

**Arrow motif** — the handoff says *once per screen, under the wordmark, never a divider*. The arrow is part of the client's logo PNG in the header, so it appears exactly once per screen and is never redrawn in CSS.

**Statement band** — `.band`. Ink ground; "Understand AI. Adapt to AI. Build with AI." in Sora 800, `--text-statement`, −0.045em. "AI." is `--color-red-on-dark`. Each line is indented a little further than the one before (0 → 86px → 172px at desktop, `7vw`/`14vw` below): the line moves forward. Mobile: no indent. Used on Home and About (the original's closing line).

**Services index** — `.index`. Replaces a three-card grid: hairline-ruled rows, title in Sora 800 at up to 60px on the left, text + "More →" on the right (5fr / 6fr). Title turns red while "More" is hovered. Same component on Home (teaser text) and Services (verbatim text).

**Class card (Education)** — `.class-grid`, `.class-card`. Three portrait tiles (9:11, radius 20px, duotone) staggered 0 / 48px / 96px down; title (Sora 700) and a secondary pill "Get Started". Stagger echoes the hero rail's offsets. Stacks single-column below 640px.

**Long-form block** — `.long`. Used on Education and Career Awareness for the prose. Lede (first paragraph, `--text-lede`, Ink) then body at 17px / 1.7, measure 64ch, placed in the right 8 of 11 columns so the left margin stays open. About uses `.about__cols` instead: lede, then a 2-column body from 900px.

**Staff person** — `.person`. 280px square portrait (radius 4px) beside a stack of role label (`.label--red`), name in **Playfair Display 600** (clamp 34–48px), bio at 62ch. Hairline between people.

**Speaker feature** — `.speaker`. 330px portrait (sticky beside the bio on desktop), name in Playfair 600 (clamp 38–60px), talk title Sora 700, date line in Arrow Red with a leading 8px dot, bio at 16px, primary pill "Join Meeting", a muted note. "To Be Announced" slots (`.tba`): 96px square silhouette + Sora 700 title on a hairline.

*Playfair is the one outlier face* (wordmark-family serif) and is used in exactly two slots: staff names and the speaker name.

**News row** — `.news-row`. Thumbnail 172px (native-size 330px for the lead), then a compact meta list (Source / Author(s) / Publication Date in the original order and labels) and the headline (Sora 700, 20px; lead 24–36px). `/innovation` is a 2-column ledger with the first story spanning both columns; Home shows the first three as a single column. Source thumbnails are **not** toned — they are journalists' photographs.

**Accordion** — `.acc`. Native `<details>`; Sora 700 questions with a CSS-drawn plus/minus mark in Arrow Red (no icon library). First item open. Answers at 64ch.

**Forms** — `.field`, `.form`. Labels above (Sora 600, 13px). Inputs: white, 1px `--color-rule-strong`, radius 4px, focus = 2px red outline with a transparent resting outline (no layout shift) + ink border. The error slot is always rendered (`min-height: 1lh`) so an error never moves the form. Form containers (`.faq__form`, `.contact__form`) are single white cards with a 1px rule — no card-in-card.

**Class sub-page hero** — `.chero`. A wide duotoned image (16:10 mobile, 16:6 desktop, radius 20px) with a white panel (radius 4px, 1px rule) overlapping its bottom-right corner (−96px) carrying the H1, brush underline, and subtitle. Mirrors the original's grey-box-over-image layout in the system's vocabulary.

**Module placeholders** — `.module`. `.stripe--light` tile (380:347) + "Module title" and "Description" lines, each marked TBD.

**Mobile menu sheet** — `.sheet`. Below 1152px the links and actions collapse into a "Menu" pill. The sheet drops below the header on the page ground with Sora 700 24px links on hairlines; Escape closes it and returns focus to the button. The nav needs ~1056px, hence the 1152px breakpoint (measured, not a default).

**Active nav link** — red + weight 700. The bold width is reserved with a hidden `::before` copy, so the active link never nudges its neighbours.

**Segmented-pill handoff** — resting highlight on *Education* (as designed); hovering or focusing another option moves the ink fill to it (`:has()`), then returns.

**Rail pause** — a small white pill "Pause / Play" at the rail's bottom-left (WCAG 2.2.2: moving content > 5s must be pausable without a pointer). Hidden when `prefers-reduced-motion`.

## 4. Handoff values adjusted (and why)

| Handoff | Changed to | Reason |
| --- | --- | --- |
| Light stripe label `#6B6560` | `--color-muted` (`#4A4744`) | 4.1 : 1 on the stripe fails 4.5 : 1; muted gives 6.2 : 1. |
| Nav link gap 28px (1180px artboard) | 22px, 28px ≥ 1216px | With six links (Career Awareness added) the nav needs the tighter gap between 1152 and 1216px. |
| Wordmark in live Playfair + CSS arrow | Client's logo PNG | README: "replace with the client's original asset if available". |
| H1 size 76px fixed | `clamp(46px … 76px)` | Handoff: "Responsive: not designed… H1 clamps to ~48px". |
| Hero rail `max-height` 640px | 640px ≥ 900px viewport, 360px below | Handoff suggestion (~360px). |
| Tile "red / light / dark" fills | Real imagery in ink+red duotone where we own images; stripe placeholders (TBD) otherwise | Handoff: duotone the set; stripes are placeholders. |

## 5. Known system-level deviations from Hallmark's defaults (deliberate — the handoff wins)

- **Pill-shaped buttons and nav actions**, **zero-chroma ink `#141414`**, **pure white `#FFFFFF` for pills, panels and fields** (the page *ground* is `#F4F2EE`, never white), and the **wordmark-left / links / pill-actions nav** are all specified by the handoff. They are kept.
- The red duotone on the hero rail means accent covers well over 5% of the first viewport. That is the handoff's own art direction (it specifies red tiles and the ink + red duotone).
- Some handoff measurements are off a 4px grid (22px hero gap, 26px top padding, 14px, 7px pill padding). They are lifted from the handoff as written.

## 6. Motion

One orchestrated entrance (`rise`: 14px / 640ms ease-out) on the home hero's four blocks and each interior page's H1 block. The rail drifts at ~12px/s and pauses on hover or via the Pause button. Everything else is a ≤150ms colour change (the handoff's hover spec) or the 320ms duotone reveal on hover. `prefers-reduced-motion` removes the rise and rail drift (rail becomes static with the handoff's −70 / −140px offsets).

## 7. Accessibility notes

Skip link; one `h1` per page; breadcrumb landmarks; visible 2px focus ring on every control (white on dark surfaces); decorative stripes/tiles are `role="img"` with labels or `aria-hidden`; the duplicated rail track is `aria-hidden` + `inert`; native `<details>` for FAQs; form errors announce via `role="alert"`.
