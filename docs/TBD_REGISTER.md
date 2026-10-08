# TBD register & open decisions

Everything marked **TBD** in the UI, plus every place where the redesign had to make a call that the original site or the design handoff did not settle. Keep this file in sync with the code: a visible TBD chip is rendered by `src/components/Tbd.jsx` — grep for `<Tbd` to find them all.

## 1. Visible TBD chips (UI that exists in the design but has no real function/content yet)

| # | Where | What it is | Why TBD | To resolve |
| --- | --- | --- | --- | --- |
| 1 | Header (desktop) + mobile menu — **Log In** pill · `Nav.jsx` → `LoginPill` | The handoff nav includes a Log In pill. The original Wix site had a members icon. | No auth/members backend exists. The pill is inert (`aria-disabled`). | Decide whether there is a members area. If yes, wire the action; if no, delete `LoginPill` from `Nav.jsx` (two usages). |
| 2 | Home hero rail — 4 striped tiles · `Rail.jsx` (`col1` / `col2`) | The handoff's gallery rail calls for photography. Four tiles are the handoff's labelled placeholders: *Hands at a keyboard*, *Hackathon table*, *Student at a laptop, daylight*, *Surgeon + AI imaging*. | No such photos exist on the original site. The other four rail tiles are real site imagery (Chris Dede, the circuit-board brain, the abstract node render, the wireframe head) in the ink + red duotone. | Source photos per the handoff brief (real people and work, daylight). Drop each file in `source-assets/home/`, add it to `scripts/optimize-media.mjs`, then replace the `kind: 'stripe'` entry with `kind: 'img'`. |
| 3 | **Hand In** buttons — `/faqs` ("Still Have a Question?") and `/contact-8` · `ContactForm.jsx` | The original forms posted to the site owner through Wix. | There is no backend. Submit currently composes an email to `director@ai-waysforward.com` in the visitor's mail app. | Pick an endpoint (Formspree, Netlify Forms, a serverless function, …) and replace the `window.location.href = mailto…` in `onSubmit`. Then remove the TBD note. |
| 4 | `/llms-ai-models` — body under **What is LLM** · `ClassPage.jsx` | The original page has the heading and nothing under it. | No content exists. | Add copy to `classPages['llms-ai-models']` in `src/content/education.js` and render it in place of the striped block. |
| 5 | `/ai-tools-applications` and `/practical-ai-skills` — 6 module slots each · `ClassPage.jsx` → `Module` | The original shows six unedited Wix template blocks ("Service Name / This is a Paragraph…") with unrelated stock photos. | Template filler is not content. Each slot shows TBD for image, title, and description. | Supply real module content, then change `modules: 6` to an array of `{ title, description, image }` and update `Module`. See Appendix A of `CONTENT_INVENTORY.md`. |

## 2. Needs a client decision (not marked in the UI)

| # | Item | Detail | Current behaviour |
| --- | --- | --- | --- |
| A | **The featured speaker event has already passed.** | Career Awareness lists Christopher Dede for "September 26th, 3 P.M. PST via Google Meet". The site's dates are 2026; Sept 26 is before the build date (Oct 7, 2026). | Shown exactly as on the original, with the "Join Meeting" link intact. Update or archive it. |
| B | **Two news author links point at the wrong person.** | On `/innovation`, *Sri Muppidi* (NYT) links to a CBC page for Yuan Wang, and *Staff* (Global News) links to a CBC page for Kayla McLean. | Rendered as plain text (not linked) so the site doesn't send readers to the wrong author. Original hrefs are preserved in `src/content/news.js` comments. |
| C | **News is static.** | Nine articles, all dated Aug 2026, hand-entered. | Static content module. Updating means editing `src/content/news.js` (add an image, source, authors, date, title, link). |
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
