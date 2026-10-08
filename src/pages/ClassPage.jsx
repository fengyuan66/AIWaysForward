import { Link, Navigate } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import Tbd from '../components/Tbd.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { classPages, classHeroImage, education } from '../content/education.js';

function Module() {
  return (
    <li className="module">
      <div className="stripe stripe--light module__img" role="img" aria-label="Module image to be supplied">
        <span className="stripe__label">Module image</span>
        <Tbd />
      </div>
      <p className="module__title">Module title <Tbd /></p>
      <p className="module__desc">Description <Tbd /></p>
    </li>
  );
}

// Shared template for /llms-ai-models, /ai-tools-applications, /practical-ai-skills.
export default function ClassPage({ slug }) {
  const page = classPages[slug];
  usePageTitle(page?.title);
  if (!page) return <Navigate to="/education" replace />;

  return (
    <>
      <section className="chero-section">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/services">{education.crumbParent.label}</Link>
            <span className="crumbs__sep" aria-hidden="true"> / </span>
            <Link to="/education">{education.crumb}</Link>
            <span className="crumbs__sep" aria-hidden="true"> / </span>
            <span aria-current="page">{page.title}</span>
          </nav>
          <div className="chero">
            <div className="chero__img tone tone--reveal tone--punch">
              <img src={classHeroImage} alt="" width="1600" height="1199" loading="eager" />
            </div>
            <div className="chero__panel">
              <h1>{page.title}</h1>
              <span className="brush" aria-hidden="true" />
              <p className="lede">{page.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section class-body">
        <div className="wrap">
          {page.sectionHeading && <h2 className="class-body__title">{page.sectionHeading}</h2>}
          {page.modules === 0 ? (
            <div className="stripe stripe--light class-body__empty" role="img" aria-label="Section content to be supplied">
              <span className="stripe__label">Section content</span>
              <Tbd />
            </div>
          ) : (
            <ul className="modules">
              {Array.from({ length: page.modules }, (_, i) => <Module key={i} />)}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
