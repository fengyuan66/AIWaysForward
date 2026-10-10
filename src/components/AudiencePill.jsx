import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandIcon from './BrandIcon.jsx';
import { audiencePill, contact } from '../content/site.js';

// Segmented pill. One indicator slides under whichever option was last hovered or focused and
// stays there when the pointer leaves. It turns YouTube red while resting on the YouTube link.
const ITEMS = [
  { key: 'youtube', label: audiencePill.lead, href: contact.youtubeHref, youtube: true },
  ...audiencePill.items.map((item) => ({ key: item.to, label: item.label, to: item.to })),
];
const START = 1; // Education

export default function AudiencePill() {
  const pillRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(START);
  const [box, setBox] = useState(null);

  const measure = useCallback(() => {
    const el = itemRefs.current[active];
    if (el) setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
  }, [active]);

  useLayoutEffect(measure, [measure]);
  useLayoutEffect(() => {
    const ro = new ResizeObserver(measure);
    ro.observe(pillRef.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <nav className="pill" aria-label="Explore AI-Ways Forward" ref={pillRef}>
      {box && (
        <span
          className={`pill__thumb${ITEMS[active].youtube ? ' is-youtube' : ''}`}
          aria-hidden="true"
          style={{ width: box.w, height: box.h, transform: `translate(${box.x}px, ${box.y}px)` }}
        />
      )}
      {ITEMS.map((item, i) => {
        const props = {
          key: item.key,
          ref: (el) => { itemRefs.current[i] = el; },
          className: `pill__item${i === active ? ' is-active' : ''}${item.youtube ? ' pill__item--youtube' : ''}`,
          onPointerEnter: () => setActive(i),
          onFocus: () => setActive(i),
        };
        const inner = (
          <>
            {item.youtube && <BrandIcon name="youtube" />}
            {item.label}
          </>
        );
        return item.to ? (
          <Link {...props} to={item.to}>{inner}</Link>
        ) : (
          <a {...props} href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>
        );
      })}
    </nav>
  );
}
