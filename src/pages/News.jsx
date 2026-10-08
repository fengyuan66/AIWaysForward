import PageHead from '../components/PageHead.jsx';
import NewsRow from '../components/NewsRow.jsx';
import AdminShortcut from '../components/AdminShortcut.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useArticles } from '../lib/content.js';
import { news } from '../content/news.js';

export default function News() {
  usePageTitle('AI News');
  const [lead, ...rest] = useArticles();

  return (
    <>
      <PageHead title={news.title} />
      <section className="section section--flush-top">
        <div className="wrap">
          <AdminShortcut to="/admin#news">New article</AdminShortcut>
          <div className="news-grid">
            {lead && <NewsRow item={lead} lead />}
            {rest.map((item) => (
              <NewsRow item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
