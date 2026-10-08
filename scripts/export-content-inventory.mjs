// Regenerates docs/CONTENT_INVENTORY.md from src/content/*.js so the doc can never drift from the site.
// Run: npm run inventory
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const load = (f) => import(pathToFileURL(path.resolve('src/content', f)).href);
const site = await load('site.js');
const { about } = await load('about.js');
const { services } = await load('services.js');
const edu = await load('education.js');
const { career, pastEvents } = await load('career.js');
const { news } = await load('news.js');
const { faqs, contactPage } = await load('faq-contact.js');

const segs = (parts) => parts.map((p) => (typeof p === 'string' ? p : `[${p.text}](${p.href})`)).join('');
const quote = (t) => t.split('\n').map((l) => `> ${l}`).join('\n');
const paras = (arr) => arr.map((p) => quote(p)).join('\n>\n');

const o = [];
const w = (s = '') => o.push(s);

w('# Content inventory — AI-Ways Forward');
w();
w('> **Generated** by `npm run inventory` from `src/content/*.js`. Do not edit by hand — edit the content modules and regenerate.');
w('> Source: https://www.ai-waysforward.com (Wix), extracted October 2026. Text is verbatim.');
w('> Sections that exist only on the original site (and are *not* in the content modules) live in the hand-written appendices at the bottom, which the script appends from `docs/_inventory-appendix.md`.');
w();
w('## Site map');
w();
w('| Original URL (kept as the route) | Original `<title>` | Page | Content module |');
w('| --- | --- | --- | --- |');
const rows = [
  ['/', 'Home \| Mysite', 'Home', 'site.js, services.js, news.js (teasers)'],
  ['/about-7', 'About Us \| Mysite', 'About Us', 'about.js'],
  ['/services', 'Services \| Mysite', 'Services', 'services.js'],
  ['/education', 'Education \| Mysite', 'Classes (Education)', 'education.js'],
  ['/llms-ai-models', 'LLMs & AI Models \| Mysite', 'Class page', 'education.js → classPages'],
  ['/ai-tools-applications', 'AI Tools & Applications \| Mysite', 'Class page', 'education.js → classPages'],
  ['/practical-ai-skills', 'Practical AI Skills \| Mysite', 'Class page', 'education.js → classPages'],
  ['/career-awareness', 'Career Awareness \| Mysite', 'Inspirational Speakers (upcoming)', 'career.js → career'],
  ['/past-speakers', '— (new page; the original had no equivalent)', 'Past Speakers (timeline)', 'career.js → pastEvents'],
  ['/innovation', 'AI News \| Mysite', 'Latest AI News', 'news.js'],
  ['/faqs', 'FAQs \| Mysite', 'FAQs', 'faq-contact.js'],
  ['/contact-8', 'Contact Us \| Mysite', 'Contact', 'faq-contact.js, site.js'],
];
const cell = (t) => t.replaceAll('|', '\\|');
for (const r of rows) w(`| \`${r[0]}\` | ${cell(r[1].replaceAll('\\', ''))} | ${r[2]} | ${r[3]} |`);
w();
w('Wix `sitemap.xml` lists exactly these 11 pages. The brand name in every `<title>` was the Wix default "Mysite"; the redesign uses "<Page> | AI-Ways Forward".');
w();

w('## Global elements (every page)');
w();
w('**Navigation** (order and labels as on the original):');
w();
w(site.nav.map((n) => `- ${n.label} → \`${n.to}\``).join('\n'));
w();
w('Also in the original header: a Wix "member login" person icon (no label). → rendered as the **Log In** pill. It opens the admin sign-in (see `docs/ADMIN.md`); until a Supabase project is connected it stays inert and carries a TBD chip.');
w();
w('**Footer / contact block**');
w();
w(`- Heading: ${site.contact.heading}`);
w(`- Phone: ${site.contact.phone}`);
w(`- Email: ${site.contact.email} (\`${site.contact.emailHref}\`)`);
w(`- Discord: ${site.contact.discord} (\`${site.contact.discordHref}\`)`);
w(`- YouTube icon link → ${site.contact.youtubeHref}`);
w(`- Copyright: ${site.copyright}`);
w();

w('## Home — `/`');
w();
w(`**Heading:** ${site.home.headline}`);
w();
w(quote(site.home.body));
w();
w('Original had one full-width hero image (below) with the text overlaid; nothing else on the page.');
w();
w('Design-handoff additions (from `design_handoff_homepage_2a`, not original copy): CTA labels "' + site.cta.discord + '" and "' + site.cta.youtube + '", the "' + site.audiencePill.lead + '" pill (' + site.audiencePill.items.map((i) => i.label).join(' · ') + '), and the Services/Latest AI News teasers that reuse text from the pages below.');
w();

w('## About Us — `/about-7`');
w();
w(`**Heading:** ${about.title}`);
w();
w(paras(about.paragraphs));
w();
w(`**Closing line:** ${about.closing}`);
w();
w(`### ${about.staffHeading}`);
for (const p of about.staff) {
  w();
  w(`**${p.role}: ${p.name}**  `);
  w(`Photo: \`${p.photo}\``);
  w();
  w(quote(p.bio));
}
w();

w('## Services — `/services`');
w();
w(`**Heading:** ${services.title}`);
for (const s of services.items) {
  w();
  w(`### ${s.title}`);
  w();
  w(quote(s.text));
  w();
  w(`Link: "${s.more}" → \`${s.to}\``);
  w();
  w(`Homepage teaser (from handoff 1a, abridged): ${s.teaser}`);
}
w();

w('## Education — `/education`');
w();
w(`**Heading:** ${edu.education.title}`);
w();
for (const c of edu.education.classes) w(`- **${c.title}** — button "${c.cta}" → \`${c.to}\` · image \`${c.image}\` (original alt: "${c.alt}")`);
w();
w(paras(edu.education.paragraphs));
w();

w('## Class sub-pages');
w();
for (const [slug, p] of Object.entries(edu.classPages)) {
  w(`### \`/${slug}\` — ${p.title}`);
  w();
  w(quote(p.subtitle));
  if (p.sectionHeading) { w(); w(`Section heading: **${p.sectionHeading}** (original: nothing beneath it)`); }
  if (p.modules) { w(); w(`${p.modules} unedited Wix template blocks — see Appendix A (not migrated as copy; TBD slots).`); }
  w();
}

w('## Career Awareness — `/career-awareness`');
w();
w(`**Heading:** ${career.title}`);
w();
w('The original page opened with Christopher Dede\'s talk (now a past event — see the next section), followed by two "To Be Announced" slots. A live "latest event" is entered by an admin and shown above the slots (see `docs/ADMIN.md`).');
for (const s of career.slots) {
  w();
  w(`### ${s.name}`);
  w(`Photo: \`${s.photo}\` (original alt: "${s.alt}")`);
}
w();
w(paras(career.paragraphs));
w();

w('## Past Speakers — `/past-speakers`');
w();
w('New page: events that have happened, as a timeline grouped by year. The first entry is the original Career Awareness copy, unchanged; only the "Join Meeting" button (it pointed to https://forms.fillout.com/t/3T7C7jhKYPus) was dropped because the meeting is over.');
for (const e of pastEvents) {
  w();
  w(`### ${e.name}`);
  w(`Photo: \`${e.photo}\` (original alt: "${e.alt}")`);
  w();
  w(`**Talk:** ${e.talk}  `);
  w(`**When:** ${e.when}  `);
  w(`**Sort date:** ${e.date} (year inferred — the original said "September 26th" only)`);
  w();
  w(e.bio.map((b) => quote(segs(b))).join('\n>\n'));
  w();
  w(`Note: ${segs(e.note)}`);
}
w();

w('## Latest AI News — `/innovation`');
w();
w(`**Heading:** ${news.title}`);
w();
news.items.forEach((n, i) => {
  w(`${i + 1}. **${n.title}** — ${n.href}`);
  w(`   - ${news.labels.source}: ${n.source}`);
  w(`   - ${news.labels.authors}: ${n.authors.map((a) => a.text + (a.href ? ` (${a.href})` : '') + (a.suspect ? ' ⚠ original link pointed at a different author' : '')).join(', ')}`);
  w(`   - ${news.labels.date}: ${n.date}`);
  w(`   - Image: \`${n.image}\``);
});
w();

w('## FAQs — `/faqs`');
w();
w(`**Heading:** ${faqs.title} · **Sub-heading:** ${faqs.subtitle}`);
for (const f of faqs.items) {
  w();
  w(`**${f.q}**`);
  w();
  w(quote(f.a));
}
w();
w(`**Form — "${faqs.form.heading}":** fields: ${Object.values(faqs.form.fields).join(' · ')} · submit: "${faqs.form.submit}"`);
w();

w('## Contact — `/contact-8`');
w();
w(`**Heading:** ${contactPage.title}`);
w();
w(`- ${contactPage.rows[0].label}: ${site.contact.phone}`);
w(`- ${contactPage.rows[1].label}: ${site.contact.email}`);
w(`- ${contactPage.rows[2].label}: [${site.contact.youtubeLabel}](${site.contact.youtubeHref})`);
w();
w(`**Form fields:** ${Object.values(contactPage.form.fields).join(' · ')} · submit: "${contactPage.form.submit}"`);
w();

const appendix = path.resolve('docs/_inventory-appendix.md');
if (fs.existsSync(appendix)) {
  w('---');
  w();
  w(fs.readFileSync(appendix, 'utf8'));
}

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/CONTENT_INVENTORY.md', o.join('\n') + '\n');
console.log('wrote docs/CONTENT_INVENTORY.md', o.length, 'lines');
