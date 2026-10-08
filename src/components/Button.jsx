import { Link } from 'react-router-dom';

// Pill button from the design system. variant: primary | secondary | ghost. `dot` adds the ink arrow circle.
export default function Button({ to, href, variant = 'primary', size, dot = true, external = false, className = '', children, ...rest }) {
  const cls = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {children}
      {dot && <span className="btn__dot" aria-hidden="true">→</span>}
    </>
  );
  if (to) return <Link className={cls} to={to} {...rest}>{inner}</Link>;
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a className={cls} href={href} {...ext} {...rest}>{inner}</a>;
  }
  return <button className={cls} {...rest}>{inner}</button>;
}

// "More →" text link (DS 1c)
export function More({ to, children = 'More' }) {
  return (
    <Link className="more" to={to}>
      {children} <span className="more__arrow" aria-hidden="true">→</span>
    </Link>
  );
}
