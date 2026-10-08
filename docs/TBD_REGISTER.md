# TBD register & open decisions

Everything marked **TBD** in the UI, plus every place where the redesign had to make a call that the original site or the design handoff did not settle. Keep this file in sync with the code: a visible TBD chip is rendered by `src/components/Tbd.jsx` — grep for `<Tbd` to find them all.

## 1. Visible TBD chips (UI that exists in the design but has no real function/content yet)

| # | Where | What it is | Why TBD | To resolve |
| --- | --- | --- | --- | --- |
| 1 | Header (desktop) + mobile menu — **Log In** pill · `AuthControl.jsx` | The pill is now the admin sign-in (docs/ADMIN.md). | No backend is connected yet, so with no `VITE_SUPABASE_*` variables the pill stays inert (`aria-disabled`) and shows this chip. | Create the Supabase project, run `supabase/schema.sql` + `seed.sql`, add the first admin, set the two env vars — the chip disappears by itself. Steps: docs/ADMIN.md. |
| 3 | **Hand In** buttons — `/faqs` ("Still Have a Question?") and `/contact-8` · `ContactForm.jsx` | The original forms posted to the site owner through Wix. | There is no backend. Submit currently composes an email to `director@ai-waysforward.com` in the visitor's mail app. | Pick an endpoint (Formspree, Netlify Forms, a serverless function, …) and replace the `window.location.href = mailto…` in `onSubmit`. Then remove the TBD note. |
| 4 | `/llms-ai-models` — body under **What is LLM** · `ClassPage.jsx` | The original page has the heading and nothing under it. | No content exists. | Add copy to `classPages['llms-ai-models']` in `src/content/education.js` and render it in place of the striped block. |
| 5 | `/ai-tools-applications` and `/practical-ai-skills` — 6 module slots each · `ClassPage.jsx` → `Module` | The original shows six unedited Wix template blocks ("Service Name / This is a Paragraph…") with unrelated stock photos. | Template filler is not content. Each slot shows TBD for image, title, and description. | Supply real module content, then change `modules: 6` to an array of `{ title, description, image }` and update `Module`. See Appendix A of `CONTENT_INVENTORY.md`. |

*Row 2 (the home rail's four striped placeholder tiles) is resolved: every rail tile is now a real photograph — see `src/components/Rail.jsx`. The numbering is left as it was so older references still make sense.*

## 2. Needs a client decision (not marked in the UI)

| # | Item | Detail | Current behaviour |
| --- | --- | --- | --- |
| A | ~~The featured speaker event has already passed.~~ **Resolved.** | Christopher Dede's Sept 26 talk moved to the new **Past Speakers** timeline (`/past-speakers`, text unchanged, "Join Meeting" button dropped). Career Awareness keeps the program text and the two original "To Be Announced" slots, and shows an admin-entered *latest event* above them. | **One inference to confirm:** the original said "September 26th" with no year; the timeline files it under **2026** (the site's dates are all 2026). Fix `pastEvents[0].date` in `src/content/career.js` if wrong. |
| B | **Two news author links point at the wrong person.** | On `/innovation`, *Sri Muppidi* (NYT) links to a CBC page for Yuan Wang, and *Staff* (Global News) links to a CBC page for Kayla McLean. | Rendered as plain text (not linked) so the site doesn't send readers to the wrong author. Original hrefs are preserved in `src/content/news.js` comments. |
| C | **News and the latest event are now editable by an admin** (once Supabase is connected). | Until then the nine articles come from `src/content/news.js` as before. | After `supabase/seed.sql` is run the database is the source of truth; `news.js` / `career.js` remain the offline fallback. |
| D | **Homepage service teasers are abridged.** | The handoff (direction 1a) shortens the service blurbs for the homepage. The full verbatim text is on `/services`. | Teasers come from `services.js → teaser`. |
| E | **Hero CTAs.** | The handoff README says "I'm a student / I'm an educator" are *new copy, confirm with the client*; the handoff HTML actually uses "Join our Discord!" and "Watch our YouTube". | Used the HTML's labels (they link to the real Discord and YouTube channel). |
| F | **Segmented pill behaviour.** | README: selecting a tab might swap hero content *or* link to Services — "confirm with client". | Implemented as three links (Education, Career Awareness, AI News). Education is the resting highlight, as in the design. |
| G | **Nav includes Career Awareness.** | The original nav has six items. The handoff mock shows five (no Career Awareness). | Kept all six so no page loses a nav entry. |
| H | **"Powered and secured by Wix"** | Original footer attribution. | Dropped — the site is no longer on Wix. |
| I | **Class sub-page hero image** | The aerial ice/sand photo is Wix template stock, reused as the hero on all three class pages. The six grid photos beneath (sand, shoreline, quartz) are unrelated stock. | Hero kept (toned in the duotone). The six grid photos are archived in `source-assets/classes/` and not shown. |
| J | **Image quality.** | News thumbnails are ~300 px wide; Jason Yang's portrait is a 573 px screenshot. | Used at native size; they will look soft on high-DPI displays. Replace with originals when available. |
| K | **Form rules.** | The original forms had no required fields. | Name and email stay optional; the message must be non-empty before the email draft opens. |
| L | **Submit label "Hand In"** | Wix's default submit label, kept verbatim ("content without changes"). | Kept. Consider "Send". |
| M | **Logo.** | The handoff draws the wordmark in live Playfair with a CSS arrow, and says to use the client's original asset if available. | Uses the client's original logo PNG (white knocked out to transparency, trimmed). |
| N | **Favicon / social image.** | No favicon or Open Graph image was extracted from the original. | `public/media/brand/icon-arrow.svg` is a minimal arrow-glyph favicon made for this build. No OG image yet. |
| O | **404 page.** | Wix served its own. | Minimal "Page not found" with a Home link. |
| P | **Staff headings.** | Original: "Founder: Jason Yang", "Cofounder: Harry Liu". | Typographically split into role label + name; the same words, without the colon. |
| Q | **Hosting needs an SPA rewrite.** | The site is a single-page app; deep links like `/about-7` must serve `index.html`. | Documented in README → Deploying. |
| R | **A Supabase project must be created by the site owner.** | The admin console needs one (free plan works): docs/ADMIN.md has the 6 steps. | Until then the site behaves exactly as before. Note: free projects pause after ~1 week idle — the public site keeps working from its bundled content, but admin edits wait until the project is restored (or move to Pro). |
| S | **Who is an admin?** | Admins are rows in `public.admins`, added in the SQL editor. | Only the accounts you add. Turn off public sign-ups in Supabase so no one else can register. |
| T | **Hero "Join our Discord!" button is still Arrow Red.** | Only the header's **Join the Discord** pill was recoloured (Discord blurple `#5865F2` + logo), as requested. | Say if the hero CTA should match. |
| U | **Rail photo rights.** | Six photos supplied for the rail (Pexels / Unsplash by filename; one Sky News still, 768 px wide). | Used as supplied; credits are in `docs/_inventory-appendix.md`. Confirm you may reuse the Sky News frame. |
