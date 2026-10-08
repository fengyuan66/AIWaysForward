import { useState } from 'react';
import Tbd from './Tbd.jsx';

// Homepage gallery rail (handoff 2a). Real tiles use the site's own imagery in the ink+red duotone.
// Striped tiles are the handoff's labelled placeholders for photography that still has to be sourced → TBD.
const col1 = [
  { kind: 'stripe', tone: 'light', h: 150, label: 'Hands at a keyboard' },
  { kind: 'img', src: '/media/career/christopher-dede.webp', alt: 'Christopher Dede speaking at a podium', h: 250, w: 622, ph: 685 },
  { kind: 'stripe', tone: 'light', h: 260, label: 'Hackathon table' },
  { kind: 'img', src: '/media/education/llms-wide.webp', alt: 'A glowing circuit-board brain interface', h: 210, w: 1000, ph: 631 },
];
const col2 = [
  { kind: 'img', src: '/media/home/node-render.webp', alt: 'Abstract node render', h: 180, w: 1400, ph: 933 },
  { kind: 'stripe', tone: 'red', h: 230, label: 'Student at a laptop, daylight' },
  { kind: 'img', src: '/media/education/skills-wide.webp', alt: 'Wireframe head over circuitry', h: 200, w: 1000, ph: 783 },
  { kind: 'stripe', tone: 'dark', h: 240, label: 'Surgeon + AI imaging' },
];

function Tile({ t }) {
  if (t.kind === 'img') {
    return (
      <figure className="rail__tile tone tone--reveal" style={{ height: t.h }}>
        <img src={t.src} alt={t.alt} width={t.w} height={t.ph} loading="eager" />
      </figure>
    );
  }
  return (
    <div className={`rail__tile stripe stripe--${t.tone}`} style={{ height: t.h }} role="img" aria-label={`Photo to be sourced: ${t.label}`}>
      <span className="stripe__label">{t.label}</span>
      <Tbd onDark={t.tone !== 'light'} />
    </div>
  );
}

function Column({ tiles, dir }) {
  return (
    <div className={`rail__col rail__col--${dir}`}>
      <div className="rail__track">{tiles.map((t, i) => <Tile t={t} key={i} />)}</div>
      {/* second copy makes the loop seamless; hidden from assistive tech and the tab order */}
      <div className="rail__track" aria-hidden="true" inert>{tiles.map((t, i) => <Tile t={t} key={i} />)}</div>
    </div>
  );
}

export default function Rail() {
  // WCAG 2.2.2: moving content that runs > 5s needs a pause control that works without a pointer.
  const [paused, setPaused] = useState(false);
  return (
    <div className="rail-wrap">
      <div className={`rail${paused ? ' is-paused' : ''}`}>
        <Column tiles={col1} dir="up" />
        <Column tiles={col2} dir="down" />
      </div>
      <button
        type="button"
        className="rail__toggle"
        aria-pressed={paused}
        aria-label="Pause gallery animation"
        onClick={() => setPaused((v) => !v)}
      >
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
