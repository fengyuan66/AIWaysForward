import { More } from './Button.jsx';
import { services } from '../content/services.js';

// Index-first list of the three programs. `full` swaps the homepage teaser for the verbatim service text.
export default function ServiceIndex({ full = false }) {
  return (
    <ol className="index">
      {services.items.map((s) => (
        <li className="index__row" key={s.title}>
          <h3 className="index__title">{s.title}</h3>
          <div className="index__body">
            <p>{full ? s.text : s.teaser}</p>
            <More to={s.to}>{s.more}</More>
          </div>
        </li>
      ))}
    </ol>
  );
}
