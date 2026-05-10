export const metadata = {
  title: 'Monsoon Kerala: Where to Go and What to Skip | PlanMyKerala DMC',
  description: 'Kerala in the rains: safe routes, backwater picks, hill cautions, and how to plan drives and ferries in monsoon months.',
};

const goList = [
  'Backwaters: Day cruises with covered decks; avoid overnight boats during heavy spells.',
  'Hills: Short, paved viewpoints near town (skip long off-road trails when rain is high).',
  'Ayurveda: Great season for therapies; block slots near your stay to avoid wet transfers.',
  'Waterfalls: View from designated platforms; watch for flash warnings.',
];

const skipList = [
  'Remote, unpaved routes during red alerts—landslide risk.',
  'Late-evening hill drives in heavy rain—visibility drops fast.',
  'Sea swims on rough days; stick to flagged safe zones only.',
];

const packing = [
  'Light rain jacket, quick-dry layers, and spare socks.',
  'Waterproof shoe cover or sandals with grip for wet steps.',
  'Pack power bank; short outages are common in storms.',
  'Download offline maps—mobile data can dip in hills.',
];

export default function MonsoonKeralaPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Monsoon Kerala: Where to Go and What to Skip</h1>
          <p className="text-white/85 max-w-3xl">A rains-first guide: safe picks, what to avoid, and how to keep drives and boats comfortable in monsoon months.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Monsoon</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Backwaters</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Go here, comfortably</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {goList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Check IMD alerts daily; we reroute if red alerts pop up.</li>
              <li>Pick stays with power backup and covered parking.</li>
              <li>Keep drive times realistic—rain adds 30–40% buffer.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Skip or rethink</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {skipList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Pack smart</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {packing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Share travel dates—our DMC team will set rain-safe day plans and backups for boats and drives.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
