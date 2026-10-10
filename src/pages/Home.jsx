import { Link } from 'react-router-dom';
import BrandIcon from '../components/BrandIcon.jsx';
import Button, { More } from '../components/Button.jsx';
import Rail from '../components/Rail.jsx';
import ServiceIndex from '../components/ServiceIndex.jsx';
import StatementBand from '../components/StatementBand.jsx';
import NewsRow from '../components/NewsRow.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useArticles } from '../lib/content.js';
import { home, cta, audiencePill, contact } from '../content/site.js';
import { services } from '../content/services.js';
import { news } from '../content/news.js';

export default function Home() {
  usePageTitle('');
  const articles = useArticles();

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <div className="hero__title">
              <h1>
                Learn
                <br />
                &amp; Use
              </h1>
              <span className="brush" aria-hidden="true" />
            </div>

            <p className="hero__body">{home.body}</p>

            <div className="hero__ctas">
              <Button variant="primary" to="/career-awareness">{cta.register}</Button>
              <Button variant="secondary" href={contact.discordHref} external>
                <BrandIcon name="discord" />
                {cta.discord}
              </Button>
            </div>

            <nav className="pill" aria-label="Explore AI-Ways Forward">
              <a className="pill__lead" href={contact.youtubeHref} target="_blank" rel="noopener noreferrer">
                <BrandIcon name="youtube" />
                {audiencePill.lead}
              </a>
              {audiencePill.items.map((item, i) => (
                <Link key={item.to} to={item.to} className={`pill__item${i === 0 ? ' is-rest' : ''}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Rail />
        </div>
      </section>

      <section className="section home-services">
        <div className="wrap">
          <h2 className="home-services__title">{services.title}</h2>
          <ServiceIndex />
        </div>
      </section>

      <StatementBand />

      <section className="section home-news">
        <div className="wrap">
          <div className="home-news__head">
            <h2>{news.title}</h2>
            <More to="/innovation" />
          </div>
          <div className="home-news__list">
            {articles.slice(0, 3).map((item) => (
              <NewsRow item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
