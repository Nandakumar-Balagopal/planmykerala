'use client';
import React from 'react';

const sampleReviews = [
  { author: 'R. Saito (Japan)', rating: 5, text: 'Incredible service — flawless Kerala experience.' },
  { author: 'Omar (UAE)', rating: 5, text: 'Very trustworthy and well-organised. Highly recommend.' },
  { author: 'Meera', rating: 5, text: 'Loved the houseboat stay and the personalised itinerary.' },
  { author: 'Akiko (Japan)', rating: 5, text: 'Professional guides and great value.' },
  { author: 'Hassan (Saudi)', rating: 5, text: 'Excellent halal-friendly options and warm hospitality.' },
];

export default function ReviewsTicker() {
  // duplicate reviews for seamless scroll
  const reviews = [...sampleReviews, ...sampleReviews];

  return (
    <div className="w-full overflow-hidden rounded-lg border py-3" style={{ borderColor: 'var(--pmk-border)', background: 'color-mix(in srgb, var(--pmk-bg) 96%, transparent)' }}>
      <div className="ticker-track whitespace-nowrap flex gap-8 animate-scroll">
        {reviews.map((r, i) => (
          <div key={i} className="inline-block text-sm px-4" style={{ color: 'var(--pmk-text)' }}>
            <div className="font-semibold">{r.author} — <span style={{ color: 'var(--pmk-accent)' }}>★{r.rating}</span></div>
            <div className="text-xs air-muted">{r.text}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .ticker-track {
          will-change: transform;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* animate-scroll duration tuned for readability */
        .animate-scroll {
          animation: scroll 28s linear infinite;
        }
      `}</style>
    </div>
  );
}
