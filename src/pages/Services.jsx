import PageHead from '../components/PageHead.jsx';
import ServiceIndex from '../components/ServiceIndex.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { services } from '../content/services.js';

export default function Services() {
  usePageTitle(services.title);
  return (
    <>
      <PageHead title={services.title} />
      <section className="section section--flush-top services-page">
        <div className="wrap">
          <ServiceIndex full />
        </div>
      </section>
    </>
  );
}
