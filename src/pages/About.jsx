import PageHead from '../components/PageHead.jsx';
import StatementBand from '../components/StatementBand.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { about } from '../content/about.js';

export default function About() {
  usePageTitle(about.title);
  const [lede, ...rest] = about.paragraphs;

  return (
    <>
      <PageHead title={about.title} />

      <section className="section section--flush-top about">
        <div className="wrap">
          <p className="lede about__lede">{lede}</p>
          <div className="about__cols prose">
            {rest.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <StatementBand label={about.closing} />

      <section className="section staff">
        <div className="wrap">
          <h2 className="staff__title">{about.staffHeading}</h2>
          <div className="staff__list">
            {about.staff.map((person) => (
              <article className="person" key={person.name}>
                <div className="person__photo">
                  <img src={person.photo} alt={person.alt} width="720" height="720" loading="lazy" />
                </div>
                <div className="person__body">
                  <p className="label label--red">{person.role}</p>
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__bio">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
