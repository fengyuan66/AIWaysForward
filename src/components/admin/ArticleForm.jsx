import { useState } from 'react';
import Button from '../Button.jsx';
import { Field, ImageField } from './Field.jsx';
import { getClient } from '../../lib/backend.js';
import { saveArticle, uploadImage } from '../../lib/admin-api.js';
import { todayISO } from '../../lib/format.js';

const blank = () => ({ title: '', href: '', source: '', author: '', author_href: '', published_on: todayISO(), image_url: '' });

// Add or edit one AI News article. The fields are the ones every story on the page already shows:
// source, author(s), publication date and headline (which links out to the article).
export default function ArticleForm({ initial, onSaved, onCancel }) {
  const [f, setF] = useState(() => (initial ? Object.fromEntries(Object.keys(blank()).map((k) => [k, initial[k] ?? ''])) : blank()));
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const sb = await getClient();
      const image_url = file ? await uploadImage(sb, file, 'news') : f.image_url;
      await saveArticle(sb, initial?.id, { ...f, image_url });
      onSaved();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form className="admin__form form" onSubmit={onSubmit}>
      <h3 className="admin__form-title">{initial ? 'Edit article' : 'New article'}</h3>

      <div className="admin__grid">
        <Field label="Headline" wide>
          <input className="field__control" value={f.title} onChange={set('title')} required />
        </Field>
        <Field label="Article link" wide>
          <input className="field__control" type="url" inputMode="url" placeholder="https://" value={f.href} onChange={set('href')} required />
        </Field>
        <Field label="Source" hint="The publication, e.g. CBC News.">
          <input className="field__control" value={f.source} onChange={set('source')} required />
        </Field>
        <Field label="Publication date">
          <input className="field__control" type="date" value={f.published_on} onChange={set('published_on')} required />
        </Field>
        <Field label="Author(s)">
          <input className="field__control" value={f.author} onChange={set('author')} />
        </Field>
        <Field label="Author link" hint="Optional — the author's page on the publication.">
          <input className="field__control" type="url" inputMode="url" placeholder="https://" value={f.author_href} onChange={set('author_href')} />
        </Field>
        <ImageField label="Thumbnail" current={f.image_url} onPick={setFile} />
      </div>

      <p className="form__error" role="alert">{error}</p>
      <div className="form__row">
        <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Publish article'}</Button>
        <Button type="button" variant="secondary" dot={false} onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
