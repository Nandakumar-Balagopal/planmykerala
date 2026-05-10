export const metadata = {
  title: 'Varkala Long Weekend: Cliffs, Cafes, and Kayaks | PlanMyKerala DMC',
  description: 'Three-day Varkala break with cliff walks, cafes, ayurveda add-ons, and a Poovar or Kappil backwater detour.',
};

const pacing = [
  'Day 1 — Arrive Trivandrum/Kollam; check-in; sunset cliff walk + cafe hop.',
  'Day 2 — Morning beach or surf lesson; ayurveda massage midday; kayak in Kappil backwaters by evening.',
  'Day 3 — Optional Poovar lagoon cruise or Edava black sand stop; depart.',
];

const tips = [
  'Stay on or near North Cliff for walkable cafes; pick AC rooms—midday heat climbs.',
  'Surf lessons run early; book the first slot for gentler waves.',
  'Carry cash/UPI for cliff cafes and parking; weekends can be busy—reserve dinner tables.',
  'Monsoon brings stronger currents; swim only where flagged safe.',
];

const addOns = [
  'Poovar estuary cruise to pair lagoon + sea mouth views.',
  'Short drive to Anjengo fort and lighthouse for history lovers.',
  'Sunrise yoga slot on the cliff (many stays arrange mats on request).',
];

export default function VarkalaWeekendPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Varkala Long Weekend: Cliffs, Cafes, and Kayaks</h1>
          <p className="text-white/85 max-w-3xl">A cliffside mini-break with cafe sunsets, morning surf, ayurveda, and a backwater detour if you want one more water day.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Beaches</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Weekend</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">3-day pacing</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {pacing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Airport: TRV (~1.5 hrs); Rail: Varkala Sivagiri (~10 mins to cliff).</li>
              <li>Best months: Nov–Feb; shoulder Mar–Apr (hotter); Jun–Sep for monsoon moods.</li>
              <li>We reserve trusted drivers for late arrivals; cliff lanes get narrow at night.</li>
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
            <h3 className="text-lg font-semibold text-gray-900">Nice add-ons</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Share dates—our DMC team will layer transfers, surf slots, and backwater cruises without rush.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
