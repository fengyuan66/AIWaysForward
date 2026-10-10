import { tagline } from '../content/site.js';

// "Understand AI. Adapt to AI. Build with AI." — the foundation's three-part line, set large.
// Each line steps in a little further: the page moves forward.
export default function StatementBand({ label = 'Understand AI. Adapt to AI. Build with AI.' }) {
  return (
    <section className="band" aria-label={label}>
      <div className="wrap">
        <ul className="band__lines" aria-hidden="true">
          {tagline.map((line) => {
            const [lead, ...rest] = line.split(' AI.');
            return (
              <li className="band__line" key={line}>
                {lead} <b>AI<span className="band__dot">.</span></b>
                {rest.join('')}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
