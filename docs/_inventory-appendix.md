## Appendix A — Wix template filler (extracted, deliberately **not** migrated as copy)

`/ai-tools-applications` and `/practical-ai-skills` both still carry the unedited Wix "service list" template. `/llms-ai-models` carries only the hero and the heading "What is LLM". The text below is template boilerplate, not authored content, so the redesign shows **TBD slots** (striped placeholder + TBD chip) instead.

Repeated six times per page (2 columns × 3 rows), each with a stock photo:

> Service Name
>
> This is a Paragraph. Click on "Edit Text" or double click on the text box to edit the content and make sure to add any relevant information that you want to share with your visitors.

Two of the six blocks on each page also carry:

> People are genuinely interested in learning more about you, so don’t be afraid to share personal anecdotes to create a more friendly quality.

and two of the six blocks per page use the shorter filler: `This is a Paragraph. Click on "Edit Text" or double click on the text box to start editing the content.`

If real module copy exists, replace the `modules` count in `src/content/education.js` with a `modules: [{ title, description, image }]` array and update `ClassPage.jsx` (see docs/ARCHITECTURE.md).

## Appendix B — Original image assets

All downloaded at full resolution to `source-assets/` (untouched). Web-ready copies are generated into `public/media/` by `npm run media`.

| Local raw file | Original Wix media id | Used on | Original alt text | Notes |
| --- | --- | --- | --- | --- |
| `brand/logo-wordmark-arrow.png` | `fce4a0_acaaf789fc6746ba87c661625914b2a9~mv2.png` | Header (all pages) | — | Wordmark + hand-drawn red arrow. Shipped on an opaque white field; the media script converts white to real transparency and trims. |
| `brand/icon-youtube.png` | `78aa2057f0cb42fbbaffcbc36280a64a.png` | Footer, Contact | YouTube | Black glyph; inverted to white on the Deep Brick footer. |
| `home/hero-abstract-node.jpg` | `fce4a0_2e2a59486d744936b3f9aad2dc74c115~mv2.jpg` | Home (original hero, full width) | "Abstract node colorful frosted glass 3d render black … IG_ _ikanhaiyasharma_edited_e" | The handoff keeps this as "the one non-photographic tile" in the gallery rail. Credit in the alt text: *ikanhaiyasharma* (Instagram). |
| `about/founder-jason-yang.png` | `fce4a0_e7dff48fe03d4dc48f1e016545e8f572~mv2.png` | About → Staff | "Screenshot 2026-08-07 163453.png" | Original is a screenshot-derived crop (573 px). Replace with the original portrait when available. |
| `about/cofounder-harry-liu.png` | `fce4a0_e81c7be7f6da4a46980bc7a1ef423522~mv2.png` | About → Staff | "image.png" | |
| `education/class-llms-neurotechnology.jpg` | `fce4a0_def265511e7549dd8aebcbe4c30d0f99~mv2.jpg` | Education → LLMs & AI Models card | "Neurotechnology_edited.jpg" | Original page used a portrait crop (x948, w1545 of 3000×1895); the media script reproduces it. |
| `education/class-tools-made-by-wix.jpg` | `fce4a0_5bab6226119f4a6b8030da4afb93d8b9~mv2.jpg` | Education → AI Tools & Applications card | "Made-by-wix_6_edited.jpg" | Wix stock render (gear + tools). |
| `education/class-skills-digital-brain-interface.jpg` | `489a2c8c728e4d4786747253c728fd65.jpg` | Education → Practical AI Skills card | "Digital Brain Interface" | |
| `career/speaker-christopher-dede.png` | `fce4a0_f56de934e2614e858a4e021f2a19c0f9~mv2.png` | Career Awareness | "image.png" | |
| `career/speaker-tba.png` | `fce4a0_c38392a6001a49bf9a032aaee4685d8a~mv2.png` | Career Awareness (×2, "To Be Announced") | "image.png" | Generic silhouette. |
| `education/pexels-yankrukov-7693222.jpg` | — (supplied by the client, Oct 2026) | Home rail → `rail/desk-charts.webp` | — | Hands pointing at a printed spreadsheet beside a laptop. Pexels — Yan Krukov (per filename). |
| `education/pexels-mikhail-nilov-8851457.jpg` | — (supplied) | Home rail → `rail/lab-team.webp` | — | Three researchers at a monitor. Pexels — Mikhail Nilov. |
| `education/pexels-holyson-h-2154634702-34357079.jpg` | — (supplied) | Home rail → `rail/white-car.webp` | — | White car, headlight in focus. Pexels — Holyson H. |
| `education/bernd-dittrich-Sp67cxbTHZ0-unsplash.jpg` | — (supplied) | Home rail → `rail/vibe-coding.webp` | — | Terminal screen: "Claude Code / Vibe Coding" ASCII art. Unsplash — Bernd Dittrich. |
| `education/skynews-ai-will-smith-spaghetti_7004388.jpg` | — (supplied) | Home rail → `rail/ai-spaghetti.webp` | — | Still from a Sky News piece on AI video. 768 px wide — the smallest rail source; used at native size. Check reuse rights with Sky News. |
| `education/usgs-Knh_5u-ZhJw-unsplash.jpg` | — (supplied) | Home rail → `rail/satellite.webp` | — | Satellite image (USGS, via Unsplash). |
| `news/dom-01.png … dom-09.png` | `fce4a0_610a2b53…`, `0a2fb3e9…`, `7d78e428…`, `422de07d…`, `91f23b26…`, `0b9a4d68…`, `04c9aaa4…`, `5b93df6e…`, `71d5886f…` (all `~mv2.png`) | News (article order 1–9) | "image.png" | Publisher thumbnails, ~300 px wide — displayed at native size; they will look soft on high-DPI screens. |
| `classes/hero-texture.jpg` | `a3c153_a0c884d86e064a5ba8e7cc5f990e2f8e~mv2.jpg` | All three class sub-pages (hero) | "" | Wix template stock (aerial ice/sand). Kept as the sub-page hero because the original used it. |
| `classes/grid-1.jpg … grid-6.jpg` | `a3c153_608f6162…`, `ec8e183c…`, `29ef14be…`, `41602b53…`, `e34864e8…`, `d4bce080…` (all `~mv2.jpg`) | Template "Service Name" blocks | "" (originals: `11062b_fd5c21…`, `noah-boyer-…-unsplash`, `sumner-mahaffey-…-unsplash`, `matt-artz-…-unsplash copy`, `hasan-almasi-…-unsplash Copy_j`, `olga-o-…-unsplash`) | Unrelated Wix/Unsplash stock (sand, shoreline, quartz). Archived, not shown. |

## Appendix C — On the original site, intentionally not carried over

| Original | Why not carried |
| --- | --- |
| "Powered and secured by Wix" (footer, every page except Home) | Platform attribution; no longer true. Original footer line read "© 2026 by J. Yang. Powered and secured by Wix". |
| Wix member "Log In" icon behaviour | Replaced by the admin sign-in (Supabase, see `docs/ADMIN.md`). Inert and marked **TBD** until a project is connected. |
| Career Awareness "Join Meeting" button for Christopher Dede | The Sept 26 meeting is over. The entry moved to `/past-speakers` without the button. |
| Wix form submission | No backend. Forms compose an email to the director until an endpoint is chosen. Marked **TBD**. |
| Page `<title>` suffix "Mysite" | Wix default placeholder; replaced with "AI-Ways Forward". |
