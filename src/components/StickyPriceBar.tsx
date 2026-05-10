'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

type Props = {
  original?: string;
  price: string;
  onBook?: () => void;
};

export default function StickyPriceBar({ original = '₹28,000', price, onBook }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDarkBg, setIsDarkBg] = useState(false);

  // parse "rgb(...)" or "rgba(...)" to [r,g,b,a]
  const parseRGBA = (css: string) => {
    const m = css.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(',').map(p => parseFloat(p.trim()));
    return parts; // [r,g,b] or [r,g,b,a]
  };

  const getEffectiveBackgroundColor = (el: Element | null): string | null => {
    let cur: Element | null = el;
    while (cur) {
      const style = window.getComputedStyle(cur);
      const bg = style.backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        return bg;
      }
      cur = cur.parentElement;
    }
    // fallback to body bg
    return window.getComputedStyle(document.body).backgroundColor || null;
  };

  const luminanceFromRGBA = (arr: number[]) => {
    // arr: [r,g,b] with 0-255
    const r = arr[0] / 255;
    const g = arr[1] / 255;
    const b = arr[2] / 255;
    // relative luminance
    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const sampleUnderlying = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // choose a point inside the bar (center)
    const x = Math.max(rect.left + 2, rect.left + rect.width / 2);
    const y = Math.max(rect.top + 2, rect.top + rect.height / 2);

    // elementsFromPoint returns the top-most first; find the first element that is NOT the bar itself
    const elems = document.elementsFromPoint(x, y);
    let underlying: Element | null = null;
    for (const e of elems) {
      if (e === el || el.contains(e)) continue;
      underlying = e;
      break;
    }
    if (!underlying) underlying = document.body;

    const bg = getEffectiveBackgroundColor(underlying);
    if (!bg) {
      setIsDarkBg(false);
      return;
    }
    const rgba = parseRGBA(bg);
    if (!rgba || rgba.length < 3) {
      setIsDarkBg(false);
      return;
    }
    const lum = luminanceFromRGBA(rgba);
    // threshold: if luminance is low -> background is dark -> set isDarkBg = true
    // choose 0.45 as threshold (tweakable)
    setIsDarkBg(lum < 0.45);
  }, []);

  useEffect(() => {
    // initial sample
    sampleUnderlying();

    // debounced handler
    let t: number | null = null;
    const handler = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        sampleUnderlying();
        t = null;
      }, 80);
    };

    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    // MutationObserver to detect style/background changes that might affect underlying
    const mo = new MutationObserver(handler);
    mo.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });

    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      mo.disconnect();
      if (t) window.clearTimeout(t);
    };
  }, [sampleUnderlying]);

  // Keep glassmorphism: backdrop blur + translucent background + subtle border
  const baseClasses = 'sticky-price fixed bottom-0 left-0 right-0 z-50 p-4 md:px-8 shadow-lg backdrop-blur-md';

  // dynamic CSS custom properties, applied inline to the container.
  const cssVars = {
    // NOTE: reversed mapping — when underlying is dark (isDarkBg === true) show a light/translucent bar,
    // and when underlying is light (isDarkBg === false) show a darker translucent bar for contrast.
    '--sticky-bg': isDarkBg ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.55)',
    '--sticky-border': isDarkBg ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
    '--sticky-text': isDarkBg ? 'var(--pmk-text, #222222)' : '#ffffff',
    '--sticky-muted': isDarkBg ? '#6B7280' : '#CBD5E1',
    '--sticky-accent': isDarkBg ? 'var(--pmk-accent, #ff385c)' : '#ffd1db',
    '--sticky-btn-start': isDarkBg ? 'var(--pmk-accent, #ff385c)' : '#ff385c',
    '--sticky-btn-end': isDarkBg ? 'var(--pmk-accent-deep, #e00b41)' : '#e00b41'
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={baseClasses}
      role="region"
      aria-label="Price bar"
      style={{
        ...cssVars,
        background: 'var(--sticky-bg)',
        border: '1px solid var(--sticky-border)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <div className="line-through text-sm" style={{ color: 'var(--sticky-muted)' }}>{original}</div>
          <div className="text-2xl font-heading font-bold" style={{ color: 'var(--sticky-text)' }}>{price}</div>
          <div className="text-xs ml-2" style={{ color: 'var(--sticky-accent)' }}>Direct Booking Savings</div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/?text=Check%20out%20my%20itinerary%20from%20PlanMyKerala"
            target="_blank"
            rel="noreferrer"
            className="sticky-share-btn py-2 px-3 rounded-md shadow-sm hover:scale-95 transition"
            style={{
              color: 'var(--sticky-text)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <svg className="w-5 h-5 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.5 3.5A11.9 11.9 0 0012 1C6.48 1 1.73 4.87 1 10.08L1 15l4.98-1.31A11.9 11.9 0 0012 23c5.52 0 10.27-3.87 11-9.08 0-1 .5-6.42-2.5-10.42z"/></svg>
            Share
          </a>

          <button
            onClick={onBook}
            className="btn-gradient text-white py-2 px-5 rounded-lg font-semibold shadow-md hover:shadow-emerald-500/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Book now"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
