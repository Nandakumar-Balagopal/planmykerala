export const metadata = {
  title: 'North Kerala Loop: Bekal, Kannur, Muzhappilangad | PlanMyKerala DMC',
  description: 'Drive-in beach at Muzhappilangad, Bekal fort sunsets, Theyyam season notes, and seafood stops on a north Kerala coastal loop.',
};

const highlights = [
  'Bekal: Fort at golden hour; beach walks and backwater kayak options.',
  'Muzhappilangad: India’s famed drive-in beach—tide dependent; go slow and stay in designated lane.',
  'Kannur: Theyyam season (Nov–Apr) at temple courtyards; check timings locally.',
  'Food: Seafood shacks along NH66; try toddy shop fare if you want local spice levels.',
];

const pacing = [
  'Day 1 — Arrive Mangalore/Kannur airport → Bekal stay; sunset at the fort.',
  'Day 2 — Morning beach + kayak; move to Kannur; evening Theyyam if in season.',
  'Day 3 — Muzhappilangad drive-in beach (tide check) + Thalassery fort/cafes; depart.',
];

const tips = [
  'Check tide charts for Muzhappilangad; avoid driving during high tide or after heavy rain.',
  'Theyyam: rituals can be late-night; carry a scarf/light sweater and respect photo rules.',
  'North Kerala heat can be sharp—hydrate and plan outdoor stops before 10am and after 4pm.',
];

export default function NorthKeralaLoopPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">North Kerala Loop: Bekal, Kannur, Muzhappilangad</h1>
          <p className="text-white/85 max-w-3xl">A compact coastal loop with fort sunsets, a drive-in beach, and Theyyam culture when in season.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Beaches</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Culture</span>
            <span className="rounded-full bg-white/15 px-3 py-1">North Kerala</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Highlights</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Airports: Kannur (CNN) or Mangalore (IXE) work; plan transfers around NH66 traffic.</li>
              <li>Best months: Nov–Feb for calmer seas; Mar–May is hotter; monsoon brings big waves.</li>
              <li>We pre-check tides and temple schedules to avoid dead hours.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">3-day pacing</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {pacing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Quick tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Tell us your dates—we will stitch tides, Theyyam timings, and seafood stops into one loop.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
