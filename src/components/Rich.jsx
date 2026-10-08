import { safeHref, toSegments } from '../lib/format.js';

// Text with inline links. Accepts the static segment arrays (string | { href, text }) or admin-entered text that
// uses `[label](https://…)`. Only plain http(s) links are ever rendered as links.
export default function Rich({ value }) {
  return toSegments(value).map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <a key={i} href={safeHref(part.href)} target="_blank" rel="noopener noreferrer">{part.text}</a>
    ),
  );
}
