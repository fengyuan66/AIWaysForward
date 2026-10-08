import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to Main Content</a>
      <header className="site-head">
        <div className="top-strip" aria-hidden="true" />
        <Nav />
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
