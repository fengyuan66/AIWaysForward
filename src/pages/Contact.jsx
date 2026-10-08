import PageHead from '../components/PageHead.jsx';
import ContactForm from '../components/ContactForm.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { contact } from '../content/site.js';
import { contactPage } from '../content/faq-contact.js';

export default function Contact() {
  usePageTitle('Contact Us');
  const [phone, email, youtube] = contactPage.rows;

  return (
    <>
      <PageHead title={contactPage.title} />

      <section className="section section--flush-top">
        <div className="wrap contact">
          <dl className="contact__list">
            <div className="contact__row">
              <dt className="label">{phone.label}</dt>
              <dd><a href={contact.phoneHref}>{contact.phone}</a></dd>
            </div>
            <div className="contact__row">
              <dt className="label">{email.label}</dt>
              <dd><a href={contact.emailHref}>{contact.email}</a></dd>
            </div>
            <div className="contact__row">
              <dt className="label">{youtube.label}</dt>
              <dd>
                <a className="contact__yt" href={contact.youtubeHref} target="_blank" rel="noopener noreferrer">
                  <img src="/media/brand/icon-youtube.png" alt="YouTube" width="28" height="28" />
                  <span>{contact.youtubeLabel}</span>
                </a>
              </dd>
            </div>
          </dl>

          <div className="contact__form">
            <ContactForm fields={contactPage.form.fields} submit={contactPage.form.submit} />
          </div>
        </div>
      </section>
    </>
  );
}
