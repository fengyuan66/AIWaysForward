import { Link } from 'react-router-dom';
import Tbd from './Tbd.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { cta } from '../content/site.js';

// The header's account pill. Visitors see "Log In"; a signed-in non-admin sees "Log Out" and nothing else changes;
// an admin sees "Admin", which opens the console. With no backend configured it stays inert and says so (TBD).
export default function AuthControl() {
  const { enabled, ready, user, isAdmin, openLogin, signOut } = useAuth();
  const cls = 'btn btn--sm btn--ghost nav__login';

  if (!enabled) {
    return (
      <button type="button" className={cls} aria-disabled="true" onClick={(e) => e.preventDefault()} title="Admin login isn't set up yet — see docs/ADMIN.md">
        {cta.login} <Tbd />
      </button>
    );
  }
  if (ready && isAdmin) return <Link className="btn btn--sm btn--ink nav__login" to="/admin">Admin</Link>;
  if (ready && user) return <button type="button" className={cls} onClick={signOut}>Log Out</button>;
  return <button type="button" className={cls} onClick={openLogin} disabled={!ready}>{cta.login}</button>;
}
