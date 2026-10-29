// Content the admin can change — articles and speaker events — as React hooks.
// Each hook starts from the bundled static content and swaps in the database rows once they arrive, so the
// first paint is never empty and a failed request changes nothing.
import { useEffect, useState } from 'react';
import { getClient } from './backend.js';
import { formatPublished, toParagraphs } from './format.js';
import { news } from '../content/news.js';
import { pastEvents, upcomingEvents } from '../content/career.js';

// ── row → UI shapes (the same shapes the static content already has) ────────────────────────────
export const toArticle = (r) => ({
  id: r.id,
  image: r.image_url,
  source: r.source,
  authors: r.author ? [{ text: r.author, href: r.author_href || undefined }] : [],
  date: formatPublished(r.published_on),
  title: r.title,
  href: r.href,
});

export const toEvent = (r) => ({
  id: r.id,
  status: r.status,
  date: r.event_date,
  name: r.speaker_name,
  photo: r.photo_url,
  alt: r.speaker_name,
  talk: r.talk,
  when: r.when_text,
  bio: toParagraphs(r.bio),
  note: r.note,
  join: r.join_url ? { label: 'Join Meeting', href: r.join_url } : null,
});

const staticArticles = news.items.map((item) => ({ ...item, id: item.href }));

// ── hooks ────────────────────────────────────────────────────────────────────────────────────────
function useRemote(load, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let live = true;
    getClient()
      .then(async (sb) => {
        if (!sb) return;
        const rows = await load(sb);
        if (live && rows) setData(rows);
      })
      .catch(() => {}); // keep the bundled content
    return () => { live = false; };
  }, [load]);
  return data;
}

// An empty table means "not set up yet", not "show nothing" — keep the bundled articles in that case.
async function loadArticles(sb) {
  const { data, error } = await sb.from('articles').select('*').order('position', { ascending: true });
  return !error && data?.length ? data.map(toArticle) : null;
}
export const useArticles = () => useRemote(loadArticles, staticArticles);

// Upcoming: admin-entered events, else the bundled next speaker. Past: newest first, bundled Dede as the fallback.
async function loadUpcoming(sb) {
  const { data, error } = await sb.from('events').select('*').eq('status', 'upcoming').order('event_date', { ascending: true });
  return !error && data?.length ? data.map(toEvent) : null;
}
async function loadPast(sb) {
  const { data, error } = await sb.from('events').select('*').eq('status', 'past').order('event_date', { ascending: false });
  return !error && data?.length ? data.map(toEvent) : null;
}
export const useUpcomingEvents = () => useRemote(loadUpcoming, upcomingEvents);
export const usePastEvents = () => useRemote(loadPast, pastEvents);
