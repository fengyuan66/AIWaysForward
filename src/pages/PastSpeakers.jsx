import PageHead from '../components/PageHead.jsx';
import Rich from '../components/Rich.jsx';
import AdminShortcut from '../components/AdminShortcut.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { usePastEvents } from '../lib/content.js';
import { safeSrc } from '../lib/format.js';
import { career } from '../content/career.js';

// Events newest-first, grouped by year. An event with no date sits under "Earlier".
function byYear(events) {
  const groups = [];
  for (const e of events) {
    const year = e.date ? e.date.slice(0, 4) : 'Earlier';
    const last = groups[groups.length - 1];
    if (last?.year === year) last.events.push(e);
    else groups.push({ year, events: [e] });
  }
  return groups;
}

function Event({ event }) {
  return (
    <li className="tl__event">
      <span className="tl__dot" aria-hidden="true" />
      {event.when && (
        <p className="tl__when">{event.date ? <time dateTime={event.date}>{event.when}</time> : event.when}</p>
      )}
      <div className="tl__card">
        <img className="tl__photo" src={safeSrc(event.photo) ?? career.slots[0].photo} alt={event.alt} width="160" height="160" loading="lazy" />
        <div className="tl__text">
          <h3 className="tl__name">{event.name}</h3>
          {event.talk && <p className="tl__talk">{event.talk}</p>}
          {event.bio.length > 0 && (
            <details className="tl__bio">
              <summary className="tl__summary">
                Speaker bio <span className="acc__mark" aria-hidden="true" />
              </summary>
              <div className="prose">
                {event.bio.map((para, i) => (
                  <p key={i}><Rich value={para} /></p>
                ))}
              </div>
            </details>
          )}
          {event.note && <p className="tl__note"><Rich value={event.note} /></p>}
        </div>
      </div>
    </li>
  );
}

export default function PastSpeakers() {
  usePageTitle('Past Speakers');
  const groups = byYear(usePastEvents());

  return (
    <>
      <PageHead title="Past Speakers" crumbs={[{ label: 'Career Awareness', to: '/career-awareness' }, { label: 'Past Speakers' }]} />

      <section className="section section--flush-top">
        <div className="wrap">
          <AdminShortcut to="/admin#events">Edit events</AdminShortcut>
          <ol className="tl">
            {groups.map((g) => (
              <li className="tl__year" key={g.year}>
                <h2 className="tl__yearhead">{g.year}</h2>
                <ol className="tl__events">
                  {g.events.map((e) => (
                    <Event event={e} key={e.id} />
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
