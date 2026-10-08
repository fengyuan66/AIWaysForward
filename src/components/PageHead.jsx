import { Link } from 'react-router-dom';

// Interior-page head: optional breadcrumb, H1 with the handoff brush underline, optional lede.
export default function PageHead({ title, crumbs, children, className = '' }) {
  return (
    <section className={`page-head ${className}`}>
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                {i < crumbs.length - 1 && <span className="crumbs__sep" aria-hidden="true"> / </span>}
              </span>
            ))}
          </nav>
        )}
        <div className="page-head__title">
          <h1>{title}</h1>
          <span className="brush" aria-hidden="true" />
        </div>
        {children}
      </div>
    </section>
  );
}
