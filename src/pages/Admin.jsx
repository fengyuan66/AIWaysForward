import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import Button from '../components/Button.jsx';
import EventForm from '../components/admin/EventForm.jsx';
import ArticleForm from '../components/admin/ArticleForm.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { getClient } from '../lib/backend.js';
import { deleteArticle, deleteEvent, listArticles, listEvents, setEventStatus } from '../lib/admin-api.js';
import { formatPublished } from '../lib/format.js';
import usePageTitle from '../hooks/usePageTitle.js';

// Loads a list from the database and exposes `reload`. Errors are shown in place, never swallowed.
function useList(load) {
  const [state, setState] = useState({ rows: null, error: '' });
  const reload = useCallback(async () => {
    try {
      const sb = await getClient();
      setState({ rows: await load(sb), error: '' });
    } catch (err) {
      setState({ rows: [], error: err.message });
    }
  }, [load]);
  useEffect(() => { reload(); }, [reload]);
  return [state, reload];
}

// Two-step delete: the first press arms the button, the second one deletes. No browser confirm() box.
function DeleteButton({ onConfirm, label }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  return (
    <Button
      size="sm"
      variant="ghost"
      dot={false}
      className={armed ? 'btn--danger' : ''}
      aria-label={armed ? `Confirm: delete ${label}` : `Delete ${label}`}
      onClick={() => (armed ? onConfirm() : setArmed(true))}
    >
      {armed ? 'Confirm delete' : 'Delete'}
    </Button>
  );
}

function Section({ id, title, onAdd, addLabel, notice, error, children }) {
  return (
    <section id={id} className="section admin__section">
      <div className="wrap">
        <div className="admin__head">
          <h2>{title}</h2>
          <Button size="sm" variant="secondary" dot={false} onClick={onAdd}>{addLabel}</Button>
        </div>
        <p className="form__ok" role="status">{notice}</p>
        {error && <p className="form__error" role="alert">{error} — has supabase/schema.sql been run? See docs/ADMIN.md.</p>}
        {children}
      </div>
    </section>
  );
}

export default function Admin() {
  usePageTitle('Admin');
  const { ready, isAdmin, user, signOut } = useAuth();
  const { hash } = useLocation();

  const [events, reloadEvents] = useList(listEvents);
  const [articles, reloadArticles] = useList(listArticles);
  const [editingEvent, setEditingEvent] = useState(null); // null | 'new' | event row
  const [editingArticle, setEditingArticle] = useState(null);
  const [notice, setNotice] = useState({ events: '', news: '' });
  const noticeTimer = useRef();

  const say = (which, text) => {
    setNotice((n) => ({ ...n, [which]: text }));
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice({ events: '', news: '' }), 4000);
  };
  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  // /admin#events and /admin#news (from the shortcut pills). The sections only exist once the session is restored,
  // and Layout scrolls to the top on navigation, so wait for both.
  const allowed = ready && isAdmin;
  useEffect(() => {
    if (!hash || !allowed) return undefined;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [hash, allowed]);

  // The route is reachable by URL, so it checks for itself. (The database refuses non-admin writes regardless.)
  if (!ready) return null;
  if (!isAdmin) return <Navigate to="/" replace />;

  const run = (which, reload, action, done) => async () => {
    try {
      await action(await getClient());
      say(which, done);
      await reload();
    } catch (err) {
      say(which, err.message);
    }
  };

  return (
    <>
      <PageHead title="Admin">
        <div className="admin__who">
          <p>Signed in as <strong>{user?.email}</strong></p>
          <Button size="sm" variant="secondary" dot={false} onClick={signOut}>Log Out</Button>
        </div>
      </PageHead>

      <Section id="events" title="Events" addLabel="Add event" onAdd={() => setEditingEvent('new')} notice={notice.events} error={events.error}>
        {editingEvent && (
          <EventForm
            key={editingEvent === 'new' ? 'new' : editingEvent.id}
            initial={editingEvent === 'new' ? null : editingEvent}
            onCancel={() => setEditingEvent(null)}
            onSaved={() => {
              setEditingEvent(null);
              say('events', 'Saved.');
              reloadEvents();
            }}
          />
        )}
        <ul className="admin__list">
          {events.rows?.map((e) => (
            <li className="admin__row" key={e.id}>
              <div className="admin__main">
                <p className="admin__title">{e.speaker_name}</p>
                <p className="admin__meta">
                  <span className={`admin__status admin__status--${e.status}`}>{e.status === 'upcoming' ? 'Upcoming' : 'Past'}</span>
                  {e.when_text || e.event_date}
                </p>
              </div>
              <div className="admin__actions">
                <Button size="sm" variant="ghost" dot={false} aria-label={`Edit ${e.speaker_name}`} onClick={() => setEditingEvent(e)}>Edit</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  dot={false}
                  onClick={run('events', reloadEvents, (sb) => setEventStatus(sb, e.id, e.status === 'upcoming' ? 'past' : 'upcoming'), 'Saved.')}
                >
                  {e.status === 'upcoming' ? 'Move to Past' : 'Mark Upcoming'}
                </Button>
                <DeleteButton label={e.speaker_name} onConfirm={run('events', reloadEvents, (sb) => deleteEvent(sb, e.id), 'Deleted.')} />
              </div>
            </li>
          ))}
          {events.rows?.length === 0 && !events.error && <li className="admin__empty">No events yet.</li>}
        </ul>
      </Section>

      <Section id="news" title="AI News" addLabel="New article" onAdd={() => setEditingArticle('new')} notice={notice.news} error={articles.error}>
        {editingArticle && (
          <ArticleForm
            key={editingArticle === 'new' ? 'new' : editingArticle.id}
            initial={editingArticle === 'new' ? null : editingArticle}
            onCancel={() => setEditingArticle(null)}
            onSaved={() => {
              setEditingArticle(null);
              say('news', 'Saved.');
              reloadArticles();
            }}
          />
        )}
        <ul className="admin__list">
          {articles.rows?.map((a) => (
            <li className="admin__row" key={a.id}>
              <div className="admin__main">
                <p className="admin__title">{a.title}</p>
                <p className="admin__meta">{a.source} · {formatPublished(a.published_on)}</p>
              </div>
              <div className="admin__actions">
                <Button size="sm" variant="ghost" dot={false} aria-label={`Edit ${a.title}`} onClick={() => setEditingArticle(a)}>Edit</Button>
                <DeleteButton label={a.title} onConfirm={run('news', reloadArticles, (sb) => deleteArticle(sb, a.id), 'Deleted.')} />
              </div>
            </li>
          ))}
          {articles.rows?.length === 0 && !articles.error && (
            <li className="admin__empty">No articles in the database yet — the site is showing its built-in ones. Run supabase/seed.sql to copy them in, or add one here.</li>
          )}
        </ul>
      </Section>
    </>
  );
}
