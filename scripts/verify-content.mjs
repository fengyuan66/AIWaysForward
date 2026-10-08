// (Whitespace-insensitive: Wix splits some sentences across inline spans. Characters must still match exactly.)
// Confirms every authored string in src/content/*.js still appears verbatim on the live Wix pages.
// Run: npm run verify:content   (needs network; exits 1 on any mismatch)
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const load = (f) => import(pathToFileURL(path.resolve('src/content', f)).href);
const site = await load('site.js');
const { about } = await load('about.js');
const { services } = await load('services.js');
const edu = await load('education.js');
const { career, pastEvents } = await load('career.js');
const { news } = await load('news.js');
const { faqs, contactPage } = await load('faq-contact.js');

// keys that hold routes, URLs, media paths or design-handoff copy — not original page text
const SKIP = new Set(['to', 'href', 'photo', 'image', 'alt', 'teaser', 'phoneHref', 'emailHref', 'discordHref', 'youtubeHref', 'punch', 'modules', 'kind', 'crumb', 'crumbParent', 'suspect', 'tba', 'id', 'date', 'alsoActiveOn']);

function collect(v, out = []) {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) {
    // an array of strings/{text} segments is one paragraph
    if (v.every((x) => typeof x === 'string' || (x && typeof x === 'object' && 'text' in x && 'href' in x))) {
      if (v.some((x) => typeof x === 'object')) out.push(v.map((x) => (typeof x === 'string' ? x : x.text)).join(''));
      else v.forEach((x) => collect(x, out));
    } else v.forEach((x) => collect(x, out));
  } else if (v && typeof v === 'object') {
    for (const [k, val] of Object.entries(v)) if (!SKIP.has(k)) collect(val, out);
  }
  return out;
}

const pages = {
  '/': [site.home.headline, site.home.body],
  '/about-7': collect(about),
  '/services': collect(services),
  '/education': collect(edu.education),
  '/llms-ai-models': collect(edu.classPages['llms-ai-models']),
  '/ai-tools-applications': collect(edu.classPages['ai-tools-applications']),
  '/practical-ai-skills': collect(edu.classPages['practical-ai-skills']),
  // Dede's copy now renders on /past-speakers, but the live Wix Career Awareness page still carries it
  '/career-awareness': [...collect(career), ...collect(pastEvents)],
  '/innovation': collect(news),
  '/faqs': collect(faqs),
  // "Your Name" / "Your Message" are input placeholders (HTML attributes, not text) — confirmed against the live DOM.
  '/contact-8': [...collect(contactPage), site.contact.phone, site.contact.email, site.contact.youtubeLabel].filter((s) => !['Your Name', 'Your Message'].includes(s)),
};

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—' };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => entities[n.toLowerCase()] ?? m);
const norm = (s) => decode(s).replace(/[​ ]/g, ' ').replace(/\s+/g, ' ').trim();
const htmlToText = (html) =>
  norm(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<br\s*\/?>/gi, ' ').replace(/<\/(p|div|h\d|li|span|a|button)>/gi, ' ').replace(/<[^>]+>/g, ''));

let bad = 0;
let checked = 0;
for (const [route, strings] of Object.entries(pages)) {
  const res = await fetch(`https://www.ai-waysforward.com${route === '/' ? '' : route}`, { headers: { 'user-agent': 'Mozilla/5.0' } });
  const text = htmlToText(await res.text());
  const squish = (s) => s.replace(/\s+/g, '');
  const squished = squish(text);
  const missing = [...new Set(strings.map(norm).filter((s) => s.length > 1))].filter((s) => !text.includes(s) && !squished.includes(squish(s)));
  checked += strings.length;
  if (missing.length) {
    bad += missing.length;
    console.log(`✗ ${route}  (${missing.length} not found)`);
    missing.forEach((m) => console.log(`    “${m.slice(0, 110)}…” len=${m.length}`));
  } else console.log(`✓ ${route}  (${new Set(strings).size} strings)`);
}
console.log(bad ? `\n${bad} string(s) differ from the live site.` : `\nAll ${checked} authored strings match the live site.`);
process.exit(bad ? 1 : 0);
