export const metadata = {
  title: 'Western Ghats Slow Loop: Munnar, Thekkady, Vagamon | PlanMyKerala DMC',
  description: 'A slow Western Ghats loop with tea hills, spice farms, and meadow walks. Local DMC pacing for short drives and cool-weather stays.',
};

const loopPlan = [
  'Night 1: Munnar town base, easy tea estate viewpoint before sunset.',
  'Night 2: Munnar national park visit or short waterfall loop.',
  'Night 3: Thekkady spice farm and lake cruise.',
  'Night 4: Vagamon meadows or pine trail, calm sunset drive.',
];

const tips = [
  'Keep drives under 4 hours per day; morning departures avoid fog delays.',
  'Reserve park tickets early during holiday weeks.',
  'Layer up: evenings can be cool even outside monsoon months.',
];

const addOns = [
  'Add a Kerala village cooking session in Thekkady.',
  'Swap Vagamon for Nelliyampathy if you prefer forest viewpoints.',
  'End in Kochi for a heritage day before flying out.',
];

export default function WesternGhatsSlowLoopPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Western Ghats Slow Loop: Munnar, Thekkady, Vagamon</h1>
          <p className="text-white/85 max-w-3xl">Tea hills, spice farms, and quiet meadows. A four-night loop with realistic drives and cool-weather pacing.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Wildlife</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Slow travel</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">4-night loop plan</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {loopPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>We keep transfer days short and scenic.</li>
              <li>Morning slots beat fog and traffic.</li>
              <li>Ideal for couples and families who like cool evenings.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Planning tips</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Optional add-ons</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Share dates and we will slot the best park timings and transfer windows.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
