import PageHead from '../components/PageHead.jsx';
import NewsRow from '../components/NewsRow.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { news } from '../content/news.js';

export default function News() {
  usePageTitle('AI News');
  const [lead, ...rest] = news.items;

  return (
    <>
      <PageHead title={news.title} />
      <section className="section section--flush-top">
        <div className="wrap news-grid">
          <NewsRow item={lead} lead />
          {rest.map((item) => (
            <NewsRow item={item} key={item.href} />
          ))}
        </div>
      </section>
    </>
  );
}
