import { useState } from 'react';
import Button from '../Button.jsx';
import { Field, ImageField } from './Field.jsx';
import { getClient } from '../../lib/backend.js';
import { saveEvent, uploadImage } from '../../lib/admin-api.js';

const blank = { speaker_name: '', talk: '', when_text: '', event_date: '', status: 'upcoming', join_url: '', bio: '', note: '', photo_url: '' };

// Add or edit one speaker event. The "latest event" the Career Awareness page shows is simply the event whose
// status is Upcoming; flipping it to Past moves it onto the Past Speakers timeline.
export default function EventForm({ initial, onSaved, onCancel }) {
  const [f, setF] = useState(() => (initial ? Object.fromEntries(Object.keys(blank).map((k) => [k, initial[k] ?? ''])) : blank));
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
      const photo_url = file ? await uploadImage(sb, file, 'events') : f.photo_url;
      await saveEvent(sb, initial?.id, { ...f, photo_url });
      onSaved();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form className="admin__form form" onSubmit={onSubmit}>
      <h3 className="admin__form-title">{initial ? 'Edit event' : 'Add event'}</h3>

      <div className="admin__grid">
        <Field label="Speaker name">
          <input className="field__control" value={f.speaker_name} onChange={set('speaker_name')} required />
        </Field>
        <Field label="Status">
          <select className="field__control" value={f.status} onChange={set('status')}>
            <option value="upcoming">Upcoming — shown on Career Awareness</option>
            <option value="past">Past — shown on Past Speakers</option>
          </select>
        </Field>
        <Field label="Talk title" wide>
          <input className="field__control" value={f.talk} onChange={set('talk')} />
        </Field>
        <Field label="When" hint="Exactly as it should read on the page, e.g. “October 24th, 3 P.M. PST via Google Meet”.">
          <input className="field__control" value={f.when_text} onChange={set('when_text')} />
        </Field>
        <Field label="Event date" hint="Used to order events and group the timeline by year.">
          <input className="field__control" type="date" value={f.event_date} onChange={set('event_date')} />
        </Field>
        <Field label="Join link" hint="Where the “Join Meeting” button goes. Leave empty to hide the button." wide>
          <input className="field__control" type="url" inputMode="url" placeholder="https://" value={f.join_url} onChange={set('join_url')} />
        </Field>
        <Field label="Bio" hint="Separate paragraphs with a blank line. Link text like this: [chrisdede.com](https://chrisdede.com)" wide>
          <textarea className="field__control" rows={7} value={f.bio} onChange={set('bio')} />
        </Field>
        <Field label="Note to guests" wide>
          <textarea className="field__control" rows={3} value={f.note} onChange={set('note')} />
        </Field>
        <ImageField label="Photo" current={f.photo_url} onPick={setFile} />
      </div>

      <p className="form__error" role="alert">{error}</p>
      <div className="form__row">
        <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save event'}</Button>
        <Button type="button" variant="secondary" dot={false} onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
