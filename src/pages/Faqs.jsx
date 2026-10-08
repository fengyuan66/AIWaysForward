import PageHead from '../components/PageHead.jsx';
import ContactForm from '../components/ContactForm.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { faqs } from '../content/faq-contact.js';

export default function Faqs() {
  usePageTitle(faqs.title);
  return (
    <>
      <PageHead title={faqs.title} />

      <section className="section section--flush-top">
        <div className="wrap faq">
          <div className="faq__list">
            <h2 className="faq__sub">{faqs.subtitle}</h2>
            <div className="acc">
              {faqs.items.map((item, i) => (
                <details className="acc__item" key={item.q} open={i === 0}>
                  <summary className="acc__q">
                    <span>{item.q}</span>
                    <span className="acc__mark" aria-hidden="true" />
                  </summary>
                  <p className="acc__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="faq__form">
            <h2 className="faq__form-title">{faqs.form.heading}</h2>
            <ContactForm fields={faqs.form.fields} submit={faqs.form.submit} />
          </aside>
        </div>
      </section>
    </>
  );
}
