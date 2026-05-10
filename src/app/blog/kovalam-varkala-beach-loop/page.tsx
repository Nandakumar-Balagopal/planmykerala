export const metadata = {
  title: 'Kovalam & Varkala: South Kerala Beach Loop | PlanMyKerala DMC',
  description: 'TripAdvisor-style DMC guide to pairing Kovalam and Varkala: when to visit, what to see, and how to add Poovar backwaters.',
};

const highlights = [
  'Kovalam: Lighthouse Beach for sunrise walks; Hawa Beach for evenings; Vizhinjam harbor for fresh catch mornings.',
  'Varkala: Cliff cafes, black sand at Edava, and sunset points along the North Cliff trail.',
  'Poovar: Lagoon and estuary cruise; pair with Kovalam for a half-day backwater add-on.',
  'Wellness: Many cliff stays offer yoga; book sunrise slots to avoid midday heat.',
];

const pacing = [
  'Day 1: Arrive Trivandrum → Kovalam; lighthouse + beach evening.',
  'Day 2: Poovar backwater cruise (AM) → move to Varkala by afternoon (1.5–2 hrs).',
  'Day 3: Varkala cliff walk, cafes, and sunset. Optional Edava/Anjengo detour.',
  'Day 4 (optional): Surf/yoga morning; depart via Trivandrum or Kollam.',
];

export default function KovalamVarkalaPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Kovalam & Varkala: South Kerala Beach Loop</h1>
          <p className="text-white/85 max-w-3xl">Two beach moods in one trip: lighthouse shores at Kovalam, cliff cafes at Varkala, plus a Poovar lagoon cruise add-on.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Beaches</span>
            <span className="rounded-full bg-white/15 px-3 py-1">South Kerala</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why pair them</h2>
            <p className="text-gray-700 leading-relaxed">
              Kovalam offers calm bays and a sunrise lighthouse vibe; Varkala brings cliffside sunsets and cafes. The short drive between them makes a compact
              3–4 day coastal loop without long transfers.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Best months: Nov–Feb for calm seas; Mar–May warmer; Jun–Sep monsoon swells.</li>
              <li>Stay choices: Kovalam for resorts and easy swims; Varkala for cafes and sunset rooms.</li>
              <li>Transfers: TRV airport → Kovalam ~30 mins; Kovalam → Varkala ~1.5–2 hrs.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Pacing suggestion</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {pacing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Share dates and interests—our DMC team can stitch lagoon cruises, surf lessons, and airport transfers into one plan.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
