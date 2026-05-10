export const metadata = {
  title: 'Kochi Compact Weekend: Fort Kochi + Muziris | PlanMyKerala DMC',
  description: 'Two-night Kochi plan with Fort Kochi heritage, cafes, Muziris spice stories, and quick beach or backwater add-ons.',
};

const pacing = [
  'Day 1 — Land in Kochi; check-in at Fort Kochi; sunset at Chinese fishing nets; cafe hop and street art walk.',
  'Day 2 — Morning heritage/Mattancherry palaces and synagogues; afternoon Muziris tour (spice, piers, and museums).',
  'Day 3 — Short Vypin/Cherai beach stop or quick backwater ferry before departure.',
];

const tips = [
  'Stay inside Fort Kochi or Mattancherry to walk most sights; carry a hat—midday heat can spike.',
  'Many sites close on certain weekdays/holidays; we stack open venues first.',
  'Use auto rickshaws for short hops; keep UPI cash ready.',
  'Evening ferry views are great—check last-boat times so you do not miss returns.',
];

const eats = [
  'Fort Kochi cafes for seafood and pepper prawns.',
  'Jew Town spice shops for tasting fresh pepper/cardamom.',
  'Try a Kerala sadya lunch if available; reserve seats on weekends.',
];

export default function KochiWeekendPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Kochi Compact Weekend: Fort Kochi + Muziris</h1>
          <p className="text-white/85 max-w-3xl">Heritage lanes, cafes, and spice history you can cover in two nights—plus a quick beach or ferry add-on.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Culture</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Weekend</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Kochi</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">2-night pacing</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {pacing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Airport (COK) to Fort Kochi ~60–75 mins; we schedule arrivals to dodge rush hour.</li>
              <li>Museum/Palace timings vary; we front-load open venues and hold backups.</li>
              <li>Late arrivals? We queue a night walk + cafe combo to keep day one light.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Tips</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Eats to try</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {eats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Share flight times—we’ll stitch transfers, walking loops, and meal stops without rush.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
