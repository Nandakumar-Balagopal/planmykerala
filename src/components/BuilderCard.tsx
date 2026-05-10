import React from 'react';

type BuilderCardProps = {
  day?: string;
  hotel?: { name: string; rating?: number; image?: string };
  morning?: string[];
  afternoon?: string[];
  evening?: string[];
  onSwap?: () => void;
};

export default function BuilderCard({
  day = 'Day 1',
  hotel,
  morning = [],
  afternoon = [],
  evening = [],
  onSwap
}: BuilderCardProps) {
  return (
    <article className="air-card overflow-hidden mb-6">
      <header className="glass px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>{day}</h3>
        <button
          className="btn-swap"
          onClick={onSwap}
          title="Swap hotel"
          aria-label="Swap hotel"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h12M3 6h12M3 18h12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Swap Hotel
        </button>
      </header>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <section>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--pmk-text)' }}>Morning</h4>
          <ul className="space-y-2 text-sm">
            {morning.map((it, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: 'var(--pmk-accent)' }} className="font-semibold">•</span>{it}</li>)}
          </ul>
        </section>

        <section>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--pmk-text)' }}>Afternoon</h4>
          <ul className="space-y-2 text-sm">
            {afternoon.map((it, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: 'var(--pmk-accent)' }} className="font-semibold">•</span>{it}</li>)}
          </ul>
        </section>

        <section>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--pmk-text)' }}>Evening</h4>
          <ul className="space-y-2 text-sm">
            {evening.map((it, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: 'var(--pmk-accent)' }} className="font-semibold">•</span>{it}</li>)}
          </ul>

          {hotel && (
            <div className="mt-4 flex items-center gap-3">
              <img src={hotel.image || '/placeholder-hotel.jpg'} alt={hotel.name} className="w-20 h-14 object-cover rounded-md img-zoom" />
              <div>
                <div className="font-medium" style={{ color: 'var(--pmk-text)' }}>{hotel.name}</div>
                <div className="text-xs air-muted">Rating: {hotel.rating ?? '—'}</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
