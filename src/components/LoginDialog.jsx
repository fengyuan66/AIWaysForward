import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import Button from './Button.jsx';

// Native <dialog>: focus is trapped, Escape closes it, and the page behind is inert — no modal library needed.
export default function LoginDialog({ open, onClose }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) setError('');
  }, [open]);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      const res = await signIn(String(form.get('email')).trim(), String(form.get('password')));
      if (res.error) {
        const status = res.error.status;
        // one message for a rejected login, so it never reveals which half was wrong; transport problems say so
        setError(
          status === 429
            ? 'Too many attempts. Wait a minute and try again.'
            : status >= 400 && status < 500
              ? 'That email and password don’t match an account.'
              : 'Couldn’t reach the sign-in service. Try again in a moment.',
        );
        return;
      }
      onClose();
      if (res.isAdmin) navigate('/admin');
    } catch {
      setError('Couldn’t reach the sign-in service. Try again in a moment.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="login-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()} // a click on the backdrop lands on the <dialog> itself
    >
      <form className="dialog__panel form" onSubmit={onSubmit}>
        <h2 id="login-title" className="dialog__title">Log In</h2>

        <label className="field">
          <span className="field__label">Email</span>
          <input className="field__control" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span className="field__label">Password</span>
          <input className="field__control" name="password" type="password" autoComplete="current-password" required />
        </label>

        <p className="form__error" role="alert">{error}</p>

        <div className="form__row">
          <Button type="submit" disabled={busy}>{busy ? 'Logging In…' : 'Log In'}</Button>
          <Button type="button" variant="secondary" dot={false} onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </dialog>
  );
}
