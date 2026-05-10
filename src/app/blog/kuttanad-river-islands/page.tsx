export const metadata = {
  title: 'Kuttanad River Islands: Village Stays + Canoe Mornings | PlanMyKerala DMC',
  description: 'A local DMC guide to Kuttanad: river islands, homestays, canoe routes, and slow backwater days beyond the usual houseboat loop.',
};

const highlights = [
  'Sunrise canoe ride through narrow canals with village life on both banks.',
  'Island homestays with home-cooked meals and coir craft stops.',
  'Short ferry hops that feel more local than private car transfers.',
  'Optional paddy field walk and toddy shop lunch.',
];

const plan = [
  'Day 1: Arrive in Kuttanad, settle into a homestay, sunset by the lake edge.',
  'Day 2: Early canoe ride, village breakfast, coir workshop, and relaxed afternoon.',
  'Day 3: Short backwater ferry, head to Kochi or Marari beach.',
];

const tips = [
  'Best season: Nov to Mar for cooler mornings and clearer canals.',
  'Keep one light day with no long transfers to enjoy the village pace.',
  'If you want a boat, pick a short day cruise rather than overnight.',
];

export default function KuttanadRiverIslandsPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Kuttanad River Islands: Village Stays + Canoe Mornings</h1>
          <p className="text-white/85 max-w-3xl">A slow backwater base with island life, canoe loops, and homestays that feel more local than the classic houseboat circuit.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Backwaters</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Culture</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Slow travel</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why Kuttanad feels different</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Ideal for couples, families, and photographers.</li>
              <li>Best done with 2 nights to keep it unhurried.</li>
              <li>Combine with Kochi or Marari for a balanced loop.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">3-day sample plan</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {plan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Quick tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Tell us your pace and interests and we will slot the best village stays.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
