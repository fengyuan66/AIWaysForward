import PageHead from '../components/PageHead.jsx';
import Button, { More } from '../components/Button.jsx';
import Rich from '../components/Rich.jsx';
import AdminShortcut from '../components/AdminShortcut.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useUpcomingEvents } from '../lib/content.js';
import { safeSrc } from '../lib/format.js';
import { career } from '../content/career.js';

// The latest event, entered by an admin (docs/ADMIN.md). Same speaker block the page has always used.
function Feature({ event }) {
  return (
    <article className="speaker">
      <figure className="speaker__photo">
        <img src={safeSrc(event.photo) ?? career.slots[0].photo} alt={event.alt} width="622" height="685" loading="eager" />
      </figure>
      <div className="speaker__body">
        <h2 className="speaker__name">{event.name}</h2>
        {event.talk && <p className="speaker__talk">{event.talk}</p>}
        {event.when && <p className="speaker__when">{event.when}</p>}
        {event.bio.length > 0 && (
          <div className="speaker__bio prose">
            {event.bio.map((para, i) => (
              <p key={i}><Rich value={para} /></p>
            ))}
          </div>
        )}
        {event.join && (
          <div className="speaker__join">
            <Button href={event.join.href} external>{event.join.label}</Button>
          </div>
        )}
        {event.note && <p className="speaker__note"><Rich value={event.note} /></p>}
      </div>
    </article>
  );
}

export default function Career() {
  usePageTitle('Career Awareness');
  const upcoming = useUpcomingEvents();
  const [lede, ...rest] = career.paragraphs;

  return (
    <>
      <PageHead title={career.title} />

      <section className="section section--flush-top">
        <div className="wrap">
          <AdminShortcut to="/admin#events">Edit events</AdminShortcut>

          {upcoming.map((event) => (
            <Feature event={event} key={event.id} />
          ))}

          <ul className="tba">
            {career.slots.map((s, i) => (
              <li className="tba__item" key={i}>
                <img src={s.photo} alt={s.alt} width="480" height="480" loading="lazy" />
                <h2 className="tba__name">{s.name}</h2>
              </li>
            ))}
          </ul>

          <p className="career__past">
            <More to="/past-speakers">Past Speakers</More>
          </p>
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
