import { contact, copyright } from '../content/site.js';

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot">
        <div className="foot__contact">
          <h2 className="foot__title">{contact.heading}</h2>
          <a className="foot__line" href={contact.phoneHref}>{contact.phone}</a>
          <a className="foot__line" href={contact.emailHref}>{contact.email}</a>
          <a className="foot__line foot__discord" href={contact.discordHref} target="_blank" rel="noopener noreferrer">
            {contact.discord}
          </a>
          <a className="foot__yt" href={contact.youtubeHref} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src="/media/brand/icon-youtube.png" alt="" width="28" height="28" />
          </a>
        </div>
        <p className="foot__copy">{copyright}</p>
      </div>
    </footer>
  );
}
