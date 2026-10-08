import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { More } from '../components/Button.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

// Not on the original site (Wix served its own 404). Kept minimal.
export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHead title="Page not found" />
      <section className="section section--flush-top">
        <div className="wrap">
          <More to="/">Home</More>
        </div>
      </section>
    </>
  );
}
