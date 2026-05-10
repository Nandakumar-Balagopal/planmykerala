export const metadata = {
  title: 'Honeymoon: Alleppey + Munnar in 5 Nights | PlanMyKerala DMC',
  description: 'Romantic 5-night Kerala plan: one night on backwaters, three in tea hills, and a buffer night to keep drives light.',
};

const flow = [
  'Night 1 — Kochi arrival → Alleppey boutique stay or houseboat boarding (sunset cruise).',
  'Night 2 — Houseboat till morning; move to Munnar by afternoon; slow evening view point.',
  'Night 3 — Munnar tea trails + Eravikulam NP or private sunrise drive.',
  'Night 4 — Leisure day with spa/ayurveda + plantation walk; optional Top Station if clear.',
  'Night 5 — Free morning, depart to Kochi with cafe/fort stop if time allows.',
];

const tips = [
  'Pick premium boats with private dining; confirm AC hours and candle-free safety rules.',
  'Request hill-view rooms with balconies in Munnar; check for heaters in winter months.',
  'Start Alleppey → Munnar by late morning to reach before fog and to add a waterfall stop.',
  'Pack layers for hills and lighter outfits for the boat; carry a compact rain jacket year-round.',
];

const touches = [
  'Private canoe add-on at sunset in Alleppey canals.',
  'Couple photoshoot slot at a tea estate (permits arranged).',
  'In-room breakfast on one hill morning; spa slot held in advance.',
];

export default function HoneymoonAlleppeyMunnarPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Honeymoon: Alleppey + Munnar in 5 Nights</h1>
          <p className="text-white/85 max-w-3xl">A balanced honeymoon with one night on water and three in the hills, so you get sunsets, cool mornings, and unhurried drives.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Honeymoon</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Backwaters</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">5-night flow</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {flow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Private cab with water/snacks; drivers briefed for photo halts.</li>
              <li>Rain plan: swap canoe with spa if showers pick up.</li>
              <li>We align check-in/out timings to avoid idle hours.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">What to lock early</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Romantic touches</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {touches.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Tell us your dates—our DMC team will hold the right boat, hill-view rooms, and backups for rain.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
