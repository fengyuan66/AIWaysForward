import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import AuthControl from './AuthControl.jsx';
import DiscordIcon from './DiscordIcon.jsx';
import { nav, cta, contact, siteName } from '../content/site.js';

// "Join the Discord" wears Discord's own blurple and mark, so it reads as the way into the server.
function DiscordButton() {
  return (
    <Button size="sm" variant="discord" dot={false} href={contact.discordHref} external>
      <DiscordIcon />
      {cta.joinDiscord}
    </Button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const btnRef = useRef(null);
  // a sub-page keeps its parent's link lit (e.g. /past-speakers under Career Awareness)
  const isParent = (item) => Boolean(item.alsoActiveOn?.includes(pathname));

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
                <NavLink to={item.to} end={item.to === '/'} className={`nav__link${isParent(item) ? ' is-parent' : ''}`} data-text={item.label}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <AuthControl />
          <DiscordButton />
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
                <NavLink to={item.to} end={item.to === '/'} className={`sheet__link${isParent(item) ? ' is-parent' : ''}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="sheet__actions">
            <AuthControl />
            <DiscordButton />
          </div>
        </div>
      </div>
    </div>
  );
}
