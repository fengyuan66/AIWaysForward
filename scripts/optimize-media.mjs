// Generates web-ready media in public/media from the raw originals in source-assets/.
// Run: npm run media              (everything)
//      npm run media -- rail/     (only outputs whose path starts with that prefix)
// Raw originals are never modified.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'source-assets';
const OUT = 'public/media';

const jobs = [
  // brand — the client's own wordmark + arrow, trimmed to its ink bounds (transparent PNG)
  { in: 'brand/logo-wordmark-arrow.png', out: 'brand/logo.png', knockoutWhite: true, trim: true },
  { in: 'brand/icon-youtube.png', out: 'brand/icon-youtube.png', width: 96 },

  // home + rail
  { in: 'home/hero-abstract-node.jpg', out: 'home/node-render.webp', width: 1400 },

  // about
  { in: 'about/founder-jason-yang.png', out: 'about/jason-yang.webp', width: 720, flatten: '#EEEEEE' },
  { in: 'about/cofounder-harry-liu.png', out: 'about/harry-liu.webp', width: 720 },

  // education class cards — same crops the original page used (portrait)
  { in: 'education/class-llms-neurotechnology.jpg', out: 'education/llms.webp', extract: { left: 948, top: 0, width: 1545, height: 1895 }, width: 900 },
  { in: 'education/class-tools-made-by-wix.jpg', out: 'education/tools.webp', cover: [900, 1100] },
  { in: 'education/class-skills-digital-brain-interface.jpg', out: 'education/skills.webp', cover: [900, 1100] },
  // landscape versions for the rail
  { in: 'education/class-llms-neurotechnology.jpg', out: 'education/llms-wide.webp', width: 1000 },
  { in: 'education/class-skills-digital-brain-interface.jpg', out: 'education/skills-wide.webp', width: 1000 },
  { in: 'education/class-tools-made-by-wix.jpg', out: 'education/tools-wide.webp', width: 1000 },

  // home rail — photographs supplied for the hero gallery (tinted in CSS, see .tone--*)
  { in: 'education/pexels-yankrukov-7693222.jpg', out: 'rail/desk-charts.webp', width: 720 },
  { in: 'education/pexels-mikhail-nilov-8851457.jpg', out: 'rail/lab-team.webp', width: 800 },
  { in: 'education/pexels-holyson-h-2154634702-34357079.jpg', out: 'rail/white-car.webp', width: 720 },
  { in: 'education/bernd-dittrich-Sp67cxbTHZ0-unsplash.jpg', out: 'rail/vibe-coding.webp', width: 800 },
  { in: 'education/skynews-ai-will-smith-spaghetti_7004388.jpg', out: 'rail/ai-spaghetti.webp', width: 768 },
  { in: 'education/usgs-Knh_5u-ZhJw-unsplash.jpg', out: 'rail/satellite.webp', width: 720, quality: 66 },

  // career
  { in: 'career/speaker-christopher-dede.png', out: 'career/christopher-dede.webp', width: 720 },
  { in: 'career/speaker-tba.png', out: 'career/speaker-tba.webp', width: 480 },

  // class sub-page hero (original template texture — kept as the pages' hero image)
  { in: 'classes/hero-texture.jpg', out: 'classes/hero.webp', width: 1600 },

  // October 2026 news refresh. Keep source photography and illustration in full colour.
  { in: 'news/google-earnings-2026-10-28.jpg', out: 'news/google-earnings-2026-10-28.webp', width: 660 },
  { in: 'news/ai-cybersecurity-2026-10-28.jpg', out: 'news/ai-cybersecurity-2026-10-28.webp', width: 660 },
  { in: 'news/openai-google-chips-2026-10-28.jpg', out: 'news/openai-google-chips-2026-10-28.webp', width: 660 },
  { in: 'news/anthropic-nonprofits-2026-10-26.jpg', out: 'news/anthropic-nonprofits-2026-10-26.webp', width: 660 },
];

// news thumbnails — native size (originals are ~300px wide), lossless-ish
for (let i = 1; i <= 9; i++) {
  jobs.push({ in: `news/dom-0${i}.png`, out: `news/${i}.webp`, quality: 92 });
}

// The original logo PNG ships on an opaque white field. Turn white into real transparency:
// alpha = how far a pixel is from white, colour recovered by un-blending from white.
async function knockoutWhite(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const a = 255 - min;
    if (a === 0) { data[i + 3] = 0; continue; }
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - min) * 255 / a)));
    data[i + 3] = a;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

fs.mkdirSync(OUT, { recursive: true });

const only = process.argv[2];
for (const j of jobs) {
  if (only && !j.out.startsWith(only)) continue;
  const src = path.join(SRC, j.in);
  const dst = path.join(OUT, j.out);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  let img = sharp(src);
  if (j.knockoutWhite) img = await knockoutWhite(src);
  if (j.trim) img = img.trim({ threshold: 10 });
  if (j.flatten) img = img.flatten({ background: j.flatten });
  if (j.extract) img = img.extract(j.extract);
  if (j.cover) img = img.resize(j.cover[0], j.cover[1], { fit: 'cover', position: 'centre' });
  else if (j.width) img = img.resize({ width: j.width, withoutEnlargement: true });
  if (dst.endsWith('.webp')) img = img.webp({ quality: j.quality ?? 80 });
  else if (dst.endsWith('.png')) img = img.png({ compressionLevel: 9 });
  const info = await img.toFile(dst);
  console.log(j.out.padEnd(36), `${info.width}x${info.height}`.padEnd(11), `${(info.size / 1024).toFixed(0)} KB`);
}
