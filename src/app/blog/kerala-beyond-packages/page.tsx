export const metadata = {
  title: 'Kerala Beyond Packages: A More Diverse Map | PlanMyKerala DMC',
  description: 'Kerala is far more than a few fixed packages. A local DMC view on how to plan a diverse Kerala loop across coast, backwaters, hills, and culture.',
};

const whyPackages = [
  'Most standard itineraries repeat the same 3-4 stops because they are safe, short-drive, and easy to sell.',
  'Large group routing prioritizes hotel inventory and fixed price blocks, not diversity of experiences.',
  'Seasonality gets ignored, so hill and coast days are swapped without logic.',
];

const diversityMap = [
  'North Malabar: Theyyam season, fort towns, and beach drives (Kannur, Thalassery, Bekal).',
  'Central heritage: Kochi-Muziris spice story, art lanes, and ferry culture.',
  'Backwater heartland: Kuttanad villages, canoe mornings, and coir workshops.',
  'Highlands: Munnar tea, Thekkady spice farms, Vagamon meadows.',
  'South coast: Varkala cliffs, Poovar estuary, quiet Ayurveda stays.',
];

const buildLoop = [
  'Pick a primary theme (culture, nature, food) and a secondary theme for contrast.',
  'Limit long drives to 2 transfers max in a 6-7 night trip.',
  'Use one slow base (2 nights) for rest, and two short bases (1-2 nights) for variety.',
  'Sync with season: monsoon favors Ayurveda and backwaters; winter favors hills and coast.',
];

const extendBeyondKerala = [
  'Malabar-side extensions can connect to Ooty (Nilgiris) or Mysore for palace and food trails.',
  'Wayanad pairs naturally with Coorg or Kabini if you want forests and wildlife.',
  'North Kerala beach loops can stretch into Mangalore for coastal food and heritage stops.',
];

const sampleSplit = [
  'Night 1: Kochi heritage + cafe walk.',
  'Nights 2-3: Kuttanad village stay with canoe ride.',
  'Nights 4-5: Munnar tea hills + short waterfall loop.',
  'Night 6: Varkala cliff sunset and beach day.',
];

export default function KeralaBeyondPackagesPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Kerala Beyond Packages: A More Diverse Map</h1>
          <p className="text-white/85 max-w-3xl">Kerala tourism often sells fixed packages, but the state has far more range. Here is a local DMC view on building a richer loop.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Culture</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Diversity</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why packages feel narrow</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {whyPackages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <p className="text-sm text-gray-700 mt-2">We build loops that balance diversity with drive time. No more than 4.5 hours per transfer day.</p>
            <p className="text-sm text-gray-700 mt-3">If a stop exists only as a photo break, we swap it for a lived-in village or coast base.</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">A diverse Kerala map</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {diversityMap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">How to build your loop</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {buildLoop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Sample 6-night split</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {sampleSplit.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {sampleSplit.slice(3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Extend the Malabar side</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are already doing North Kerala, small extensions beyond the state can add contrast without breaking the pace.
            </p>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {extendBeyondKerala.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">DMC note</h3>
            <p className="text-sm text-gray-700">
              We keep cross-state add-ons short and only suggest them when the drive time stays under 5 hours.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
