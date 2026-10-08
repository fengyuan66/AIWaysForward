import PageHead from '../components/PageHead.jsx';
import Button from '../components/Button.jsx';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import { education } from '../content/education.js';

export default function Education() {
  usePageTitle('Education');
  const [lede, ...rest] = education.paragraphs;

  return (
    <>
      <PageHead
        title={education.title}
        crumbs={[{ label: education.crumbParent.label, to: education.crumbParent.to }, { label: education.crumb }]}
      />

      <section className="section section--flush-top">
        <div className="wrap">
          <ul className="class-grid">
            {education.classes.map((c) => (
              <li className="class-card" key={c.to}>
                <Link to={c.to} className={`class-card__img tone tone--reveal${c.punch ? ' tone--punch' : ''}`} tabIndex={-1} aria-hidden="true">
                  <img src={c.image} alt="" width="900" height="1100" loading="lazy" />
                </Link>
                <h2 className="class-card__title">{c.title}</h2>
                <Button to={c.to} variant="secondary" aria-label={`${c.cta}: ${c.title}`}>{c.cta}</Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap long">
          <p className="lede">{lede}</p>
          <div className="prose">
            {rest.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
