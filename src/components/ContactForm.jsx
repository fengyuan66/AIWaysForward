import { useId, useState } from 'react';
import Button from './Button.jsx';
import Tbd from './Tbd.jsx';
import { contact } from '../content/site.js';

// The original forms were Wix forms posting to the site owner. There is no backend here yet, so
// submit composes an email to the director (mailto:). Endpoint is TBD — see docs/TBD_REGISTER.md.
export default function ContactForm({ fields, submit }) {
  const uid = useId();
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!message) {
      setError(`Please fill in “${fields.message}” first.`);
      return;
    }
    setError('');
    const body = `${message}\n\n— ${name || 'Anonymous'}${email ? ` (${email})` : ''}`;
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent('Message from the website')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor={`${uid}-name`}>{fields.name}</label>
        <input className="field__control" id={`${uid}-name`} name="name" type="text" autoComplete="name" />
      </div>
      <div className="field">
        <label className="field__label" htmlFor={`${uid}-email`}>{fields.email}</label>
        <input className="field__control" id={`${uid}-email`} name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <label className="field__label" htmlFor={`${uid}-message`}>{fields.message}</label>
        <textarea
          className="field__control"
          id={`${uid}-message`}
          name="message"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${uid}-err` : undefined}
        />
      </div>
      <p className="form__error" id={`${uid}-err`} role="alert">{error}</p>
      <div className="form__row">
        <Button type="submit" variant="primary">{submit}</Button>
        <span className="form__note"><Tbd title="Form endpoint not wired yet" /> opens your email app until an endpoint is set</span>
      </div>
    </form>
  );
}
