// DEV-ONLY stand-in for the slice of the Supabase client this site uses (see backend.js). It keeps "tables" in
// localStorage so the admin console can be tried with `npm run dev:demo` — no Supabase project needed.
//
// It is NOT security: any email ending in @admin.demo is an admin, any other email is a plain account, the
// password is ignored. Real access control is Row Level Security in supabase/schema.sql.
import { news } from '../content/news.js';
import { pastEvents } from '../content/career.js';
import { segmentsToText } from './format.js';

const KEY = 'awf-demo-db';
const SESSION = 'awf-demo-session';
const NEWS_UPDATE = '2026-10-28-ai-news';

const iso = (label) => {
  // 'Aug 21st 2026' → '2026-08-21'
  const [mon, day, year] = label.replace(/(\d+)(st|nd|rd|th)/, '$1').split(' ');
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(mon) + 1;
  return `${year}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const seed = () => ({
  appliedContentUpdates: [NEWS_UPDATE],
  admins: [],
  articles: news.items.map((a, i) => ({
    id: `demo-article-${i + 1}`,
    position: i + 1,
    source: a.source,
    author: a.authors[0]?.text ?? '',
    author_href: a.authors[0]?.suspect ? null : a.authors[0]?.href ?? null,
    published_on: iso(a.date),
    title: a.title,
    href: a.href,
    image_url: a.image,
  })),
  events: pastEvents.map((e) => ({
    id: e.id,
    status: 'past',
    speaker_name: e.name,
    talk: e.talk,
    when_text: e.when,
    event_date: e.date,
    bio: e.bio.map(segmentsToText).join('\n\n'),
    note: segmentsToText(e.note),
    photo_url: e.photo,
    join_url: null,
  })),
  files: {},
});

const read = () => {
  try {
    const db = JSON.parse(localStorage.getItem(KEY));
    if (!db) return seed();
    // Existing demo browsers retain their old seed in localStorage across reloads.
    // Apply this release once, preserving edits and subsequent admin deletions.
    if (!db.appliedContentUpdates?.includes(NEWS_UPDATE)) {
      const additions = seed().articles.filter((article) =>
        ['2026-10-28', '2026-10-26'].includes(article.published_on) &&
        !db.articles.some((existing) => existing.href === article.href),
      );
      const firstPosition = Math.min(1, ...db.articles.map((article) => article.position));
      additions.forEach((article, i) => {
        article.id = `${NEWS_UPDATE}-${i + 1}`;
        article.position = firstPosition - additions.length + i;
      });
      db.articles.unshift(...additions);
      db.appliedContentUpdates = [...(db.appliedContentUpdates ?? []), NEWS_UPDATE];
      write(db);
    }
    return db;
  } catch {
    return seed();
  }
};
const write = (db) => localStorage.setItem(KEY, JSON.stringify(db));
const readSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION));
  } catch {
    return null;
  }
};

const isAdmin = (db, session) => Boolean(session && db.admins.some((a) => a.user_id === session.user.id));
const denied = { data: null, error: { message: 'new row violates row-level security policy' } };

class Query {
  constructor(table) {
    Object.assign(this, { table, op: 'select', filters: [], ord: null, lim: null, one: null, payload: null });
  }
  select() { return this; }
  order(col, { ascending = true } = {}) { this.ord = [col, ascending]; return this; }
  eq(col, val) { this.filters.push([col, val]); return this; }
  limit(n) { this.lim = n; return this; }
  maybeSingle() { this.one = 'maybe'; return this; }
  single() { this.one = 'single'; return this; }
  insert(row) { this.op = 'insert'; this.payload = row; return this; }
  update(patch) { this.op = 'update'; this.payload = patch; return this; }
  delete() { this.op = 'delete'; return this; }
  then(resolve, reject) { return Promise.resolve(this.run()).then(resolve, reject); }

  run() {
    const db = read();
    const session = readSession();
    const rows = db[this.table];
    const match = (r) => this.filters.every(([c, v]) => r[c] === v);
    let out;

    if (this.op !== 'select') {
      if (!isAdmin(db, session)) return denied;
      if (this.op === 'insert') {
        const row = { id: crypto.randomUUID(), ...this.payload };
        rows.push(row);
        out = [row];
      } else if (this.op === 'update') {
        out = rows.filter(match).map((r) => Object.assign(r, this.payload));
      } else {
        db[this.table] = rows.filter((r) => !match(r));
        out = [];
      }
      write(db);
    } else {
      out = rows.filter(match);
      if (this.ord) {
        const [c, asc] = this.ord;
        // nulls last, like Postgres' default ascending order
        out = [...out].sort((a, b) => (a[c] == null) - (b[c] == null) || (a[c] > b[c] ? 1 : a[c] < b[c] ? -1 : 0) * (asc ? 1 : -1));
      }
      if (this.lim != null) out = out.slice(0, this.lim);
    }

    if (this.one) return { data: out[0] ?? null, error: this.one === 'single' && !out.length ? { message: 'No rows' } : null };
    return { data: out, error: null };
  }
}

export function createDemoClient() {
  const listeners = new Set();
  const emit = (event, session) => listeners.forEach((cb) => cb(event, session));

  return {
    auth: {
      async getSession() {
        return { data: { session: readSession() }, error: null };
      },
      onAuthStateChange(cb) {
        listeners.add(cb);
        return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
      },
      async signInWithPassword({ email }) {
        if (!email) return { data: null, error: { message: 'Invalid login credentials' } };
        const user = { id: `demo-${email.toLowerCase()}`, email };
        const session = { user };
        const db = read();
        if (/@admin\.demo$/i.test(email) && !db.admins.some((a) => a.user_id === user.id)) {
          db.admins.push({ user_id: user.id });
          write(db);
        }
        localStorage.setItem(SESSION, JSON.stringify(session));
        emit('SIGNED_IN', session);
        return { data: { user, session }, error: null };
      },
      async signOut() {
        localStorage.removeItem(SESSION);
        emit('SIGNED_OUT', null);
        return { error: null };
      },
    },
    from: (table) => new Query(table),
    storage: {
      from: () => ({
        async upload(path, file) {
          if (!isAdmin(read(), readSession())) return denied;
          const dataUrl = await new Promise((resolve) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.readAsDataURL(file);
          });
          const db = read();
          db.files[path] = dataUrl;
          write(db);
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => ({ data: { publicUrl: read().files[path] ?? '' } }),
      }),
    },
  };
}
