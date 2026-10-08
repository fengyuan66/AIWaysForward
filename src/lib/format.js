// Small pure helpers shared by the public pages and the admin console.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ordinal = (n) => {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10 > 3 ? 0 : n % 10]}`;
};

// '2026-08-21' → 'Aug 21st 2026' (the format the original news page used for "Publication Date").
// Split by hand rather than `new Date()` so a timezone can never shift the day.
export function formatPublished(iso) {
  const [y, m, d] = String(iso ?? '').split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${MONTHS[m - 1]} ${ordinal(d)} ${y}`;
}

// Today as a yyyy-mm-dd string in the visitor's own timezone (what <input type="date"> expects).
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Only ever render links that are plain web URLs — never `javascript:` or `data:`.
export const safeHref = (url) => (/^https?:\/\//i.test(url ?? '') ? url : undefined);
// Images may also be site-relative (`/media/…`) or, in the dev-only demo backend, data URIs.
export const safeSrc = (url) => (/^(https?:\/\/|\/(?!\/)|data:image\/)/i.test(url ?? '') ? url : undefined);

// Admin-entered text keeps the original site's inline links with `[text](https://…)`. Static content uses
// the segment-array form already (string | { href, text }); both come out as segments.
export function toSegments(value) {
  if (Array.isArray(value)) return value;
  const text = String(value ?? '');
  const out = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// The inverse, used when a static entry is turned into a database row (scripts/export-seed-sql.mjs).
export const segmentsToText = (parts) =>
  (Array.isArray(parts) ? parts : [parts]).map((p) => (typeof p === 'string' ? p : `[${p.text}](${p.href})`)).join('');

// Blank-line separated paragraphs → array (empty entries dropped).
export const toParagraphs = (text) => String(text ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
