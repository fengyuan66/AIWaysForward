import { news } from '../content/news.js';
import { safeHref, safeSrc } from '../lib/format.js';

const { labels } = news;

function Authors({ authors }) {
  return authors.map((a, i) => (
    <span key={a.text}>
      {safeHref(a.href) && !a.suspect ? (
        <a href={a.href} target="_blank" rel="noopener noreferrer">{a.text}</a>
      ) : (
        a.text
      )}
      {i < authors.length - 1 ? ', ' : ''}
    </span>
  ));
}

export default function NewsRow({ item, lead = false }) {
  const image = safeSrc(item.image);
  return (
    <article className={`news-row${lead ? ' news-row--lead' : ''}`}>
      {/* an article saved without a thumbnail gets the design system's plain light placeholder tile */}
      <div className={`news-row__img${image ? '' : ' stripe stripe--light'}`} aria-hidden="true">
        {image && <img src={image} alt="" width="330" height="180" loading={lead ? 'eager' : 'lazy'} />}
      </div>
      <div className="news-row__body">
        <dl className="news-row__meta">
          <div><dt>{labels.source}:</dt><dd>{item.source}</dd></div>
          <div><dt>{labels.authors}:</dt><dd><Authors authors={item.authors} /></dd></div>
          <div><dt>{labels.date}:</dt><dd>{item.date}</dd></div>
        </dl>
        <h3 className="news-row__title">
          <a href={safeHref(item.href)} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </h3>
      </div>
    </article>
  );
}
