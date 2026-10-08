import { useState } from 'react';

// Homepage gallery rail (handoff 2a). Every tile is a real photograph, tinted in one of the handoff's three tile
// hues — light (paper), red (Arrow Red), dark (Ink). The `tone` order follows the 2a artboard exactly
// (column 1: light · red · light · dark, column 2: light · dark · light · red), with one extra tile closing each
// column so the loop never puts two like hues side by side:
//   col 1  L R L D R  → wraps to L
//   col 2  L D L R D  → wraps to L
// Each photo sits in the hue that suits its own brightness (pale photos in light slots, dark renders in dark slots).
// `h` are the handoff's tile heights; `pos` is the object-position that keeps the subject in frame.
const col1 = [
  { tone: 'light', h: 150, src: '/media/rail/desk-charts.webp', w: 720, ph: 1080, pos: '50% 42%', alt: 'Hands pointing at a printed spreadsheet beside a laptop showing charts' },
  { tone: 'red', h: 250, src: '/media/career/christopher-dede.webp', w: 622, ph: 685, alt: 'Christopher Dede speaking at a podium' },
  { tone: 'light', h: 260, src: '/media/rail/lab-team.webp', w: 800, ph: 534, pos: '62% 50%', alt: 'Three researchers in lab coats looking at a computer monitor' },
  { tone: 'dark', h: 210, src: '/media/education/llms-wide.webp', w: 1000, ph: 631, alt: 'A glowing circuit-board brain interface' },
  { tone: 'red', h: 200, src: '/media/rail/ai-spaghetti.webp', w: 768, ph: 432, pos: '50% 30%', alt: 'A still from an AI-generated video of a man eating spaghetti' },
];
const col2 = [
  { tone: 'light', h: 180, src: '/media/rail/satellite.webp', w: 720, ph: 720, alt: 'Satellite image of mountains, plains and snow' },
  { tone: 'dark', h: 230, src: '/media/home/node-render.webp', w: 1400, ph: 933, alt: 'Abstract node render' },
  { tone: 'light', h: 200, src: '/media/rail/white-car.webp', w: 720, ph: 1080, pos: '50% 52%', alt: 'The front of a white car with its headlight in focus' },
  { tone: 'red', h: 240, src: '/media/rail/vibe-coding.webp', w: 800, ph: 533, pos: '40% 50%', alt: 'A terminal screen showing “Claude Code” and “Vibe Coding” in ASCII lettering' },
  { tone: 'dark', h: 220, src: '/media/education/skills-wide.webp', w: 1000, ph: 783, alt: 'Wireframe head over circuitry' },
];

// Drift speed in px/s (≈ the handoff's slow marquee); duration follows the column's height so adding a tile never speeds it up.
const GAP = 16;
const trackHeight = (tiles) => tiles.reduce((sum, t) => sum + t.h + GAP, 0);
const seconds = (tiles, pxPerSecond) => Math.round(trackHeight(tiles) / pxPerSecond);

function Tile({ t }) {
  return (
    <figure className={`rail__tile tone tone--${t.tone} tone--reveal`} style={{ height: t.h }}>
      <img src={t.src} alt={t.alt} width={t.w} height={t.ph} loading="eager" style={t.pos ? { objectPosition: t.pos } : undefined} />
    </figure>
  );
}

function Column({ tiles, dir, speed }) {
  return (
    <div className={`rail__col rail__col--${dir}`} style={{ '--rail-dur': `${seconds(tiles, speed)}s` }}>
      <div className="rail__track">{tiles.map((t) => <Tile t={t} key={t.src} />)}</div>
      {/* second copy makes the loop seamless; hidden from assistive tech and the tab order */}
      <div className="rail__track" aria-hidden="true" inert>{tiles.map((t) => <Tile t={t} key={t.src} />)}</div>
    </div>
  );
}

export default function Rail() {
  // WCAG 2.2.2: moving content that runs > 5s needs a pause control that works without a pointer.
  const [paused, setPaused] = useState(false);
  return (
    <div className="rail-wrap">
      <div className={`rail${paused ? ' is-paused' : ''}`}>
        <Column tiles={col1} dir="up" speed={12.3} />
        <Column tiles={col2} dir="down" speed={10.9} />
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
