import PageHead from '../components/PageHead.jsx';
import Button from '../components/Button.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { career } from '../content/career.js';

// Renders a paragraph made of strings and { href, text } link segments (original inline links preserved).
function Segments({ parts }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a>
    ),
  );
}

export default function Career() {
  usePageTitle('Career Awareness');
  const [feature, ...tba] = career.speakers;
  const [lede, ...rest] = career.paragraphs;

  return (
    <>
      <PageHead title={career.title} />

      <section className="section section--flush-top">
        <div className="wrap">
          <article className="speaker">
            <figure className="speaker__photo">
              <img src={feature.photo} alt={feature.alt} width="622" height="685" loading="eager" />
            </figure>
            <div className="speaker__body">
              <h2 className="speaker__name">{feature.name}</h2>
              <p className="speaker__talk">{feature.talk}</p>
              <p className="speaker__when">{feature.when}</p>
              <div className="speaker__bio prose">
                {feature.bio.map((parts, i) => (
                  <p key={i}><Segments parts={parts} /></p>
                ))}
              </div>
              <div className="speaker__join">
                <Button href={feature.join.href} external>{feature.join.label}</Button>
              </div>
              <p className="speaker__note"><Segments parts={feature.note} /></p>
            </div>
          </article>

          <ul className="tba">
            {tba.map((s, i) => (
              <li className="tba__item" key={i}>
                <img src={s.photo} alt={s.alt} width="480" height="480" loading="lazy" />
                <h2 className="tba__name">{s.name}</h2>
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
