// Reads and writes used by the admin console. Every write is also checked by Postgres Row Level Security
// (supabase/schema.sql) — hiding the console from non-admins is a courtesy, the database is the lock.
import { safeHref } from './format.js';

const fail = (error) => {
  if (error) throw new Error(error.message || 'Something went wrong.');
};

// ── articles ─────────────────────────────────────────────────────────────────────────────────────
export async function listArticles(sb) {
  const { data, error } = await sb.from('articles').select('*').order('position', { ascending: true });
  fail(error);
  return data;
}

export async function saveArticle(sb, id, f) {
  const row = {
    title: f.title.trim(),
    href: safeHref(f.href.trim()),
    source: f.source.trim(),
    author: f.author.trim(),
    author_href: f.author_href.trim() ? safeHref(f.author_href.trim()) : null,
    published_on: f.published_on,
    image_url: f.image_url || null,
  };
  if (!row.href) throw new Error('The article link must start with http:// or https://');
  if (f.author_href.trim() && !row.author_href) throw new Error('The author link must start with http:// or https://');

  if (id) {
    const { error } = await sb.from('articles').update(row).eq('id', id);
    return fail(error);
  }
  // a new article goes to the top of the list: AI News leads with its newest story
  const { data: first, error: e1 } = await sb.from('articles').select('position').order('position', { ascending: true }).limit(1);
  fail(e1);
  const { error } = await sb.from('articles').insert({ ...row, position: (first?.[0]?.position ?? 1) - 1 });
  fail(error);
}

export async function deleteArticle(sb, id) {
  const { error } = await sb.from('articles').delete().eq('id', id);
  fail(error);
}

// ── events ───────────────────────────────────────────────────────────────────────────────────────
export async function listEvents(sb) {
  const { data, error } = await sb.from('events').select('*').order('event_date', { ascending: false });
  fail(error);
  return data;
}

export async function saveEvent(sb, id, f) {
  const row = {
    status: f.status,
    speaker_name: f.speaker_name.trim(),
    talk: f.talk.trim(),
    when_text: f.when_text.trim(),
    event_date: f.event_date || null,
    join_url: f.join_url.trim() ? safeHref(f.join_url.trim()) : null,
    bio: f.bio.trim(),
    note: f.note.trim(),
    photo_url: f.photo_url || null,
  };
  if (f.join_url.trim() && !row.join_url) throw new Error('The join link must start with http:// or https://');

  const { error } = id ? await sb.from('events').update(row).eq('id', id) : await sb.from('events').insert(row);
  fail(error);
}

export async function setEventStatus(sb, id, status) {
  const { error } = await sb.from('events').update({ status }).eq('id', id);
  fail(error);
}

export async function deleteEvent(sb, id) {
  const { error } = await sb.from('events').delete().eq('id', id);
  fail(error);
}

// ── images ───────────────────────────────────────────────────────────────────────────────────────
// Shrinks the photo in the browser (max 720px wide, WebP) before it is uploaded to the public `media` bucket.
export async function uploadImage(sb, file, folder) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 720 / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
  if (!blob) throw new Error('That image could not be read.');

  const path = `${folder}/${crypto.randomUUID()}.webp`;
  const { error } = await sb.storage.from('media').upload(path, blob, { contentType: 'image/webp' });
  fail(error);
  return sb.storage.from('media').getPublicUrl(path).data.publicUrl;
}
