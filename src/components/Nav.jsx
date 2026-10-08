import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import Tbd from './Tbd.jsx';
import { nav, cta, contact, siteName } from '../content/site.js';

// Log In: the original Wix site had a members icon here. No auth exists yet → inert, marked TBD.
function LoginPill() {
  return (
    <button
      type="button"
      className="btn btn--sm btn--ghost nav__login"
      aria-disabled="true"
      onClick={(e) => e.preventDefault()}
      title="Member login — TBD"
    >
      {cta.login} <Tbd />
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const btnRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="wrap">
      <div className="nav">
        <Link to="/" className="nav__logo" aria-label={`${siteName} — Home`}>
          <img src="/media/brand/logo.png" alt={siteName} width="624" height="125" />
        </Link>

        <nav aria-label="Primary" className="nav__primary">
          <ul className="nav__links">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="nav__link" data-text={item.label}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <LoginPill />
          <Button size="sm" dot={false} href={contact.discordHref} external>
            {cta.joinDiscord}
          </Button>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="nav__menu-btn"
          aria-expanded={open}
          aria-controls="menu-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="menu-sheet" className="sheet" hidden={!open}>
        <div className="wrap sheet__inner">
          <ul className="sheet__links">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="sheet__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="sheet__actions">
            <LoginPill />
            <Button size="sm" dot={false} href={contact.discordHref} external>
              {cta.joinDiscord}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
