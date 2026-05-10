export const metadata = {
  title: 'Thekkady for Families: Slow 3-Day Plan | PlanMyKerala DMC',
  description: 'Kid-friendly Thekkady loop with lake cruise timing, spice walks, elephant interactions, and gentle trails for families.',
};

const pacing = [
  'Day 1 — Arrive by noon; spice plantation walk; evening Kathakali/Kalaripayattu show.',
  'Day 2 — Early Periyar lake cruise (book tickets in advance); later elephant interaction center; relaxed pool time.',
  'Day 3 — Light trek or bamboo rafting (age permitting); stop for spices/tea before departing to Munnar/Kochi.',
];

const kidFriendly = [
  'Pick morning lake cruise slots for cooler weather and better sightings.',
  'Choose plantations with short, shaded walks; avoid steep trails with toddlers.',
  'Carry light sweaters for dawn rides; Periyar can be misty.',
  'Keep snacks and cash/UPI for entry gates and local stalls.',
];

const stays = [
  'Family resorts near the Periyar gate to cut transfer time for the cruise.',
  'Homestays with garden space if you want quieter evenings.',
  'Ask for connecting rooms or cottages; confirm power backup in monsoon.',
];

export default function ThekkadyFamilyPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Thekkady for Families: Slow 3-Day Plan</h1>
          <p className="text-white/85 max-w-3xl">A gentle Thekkady itinerary with lake cruise slots, spice walks, elephant time, and buffer hours so kids stay happy.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Family</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Wildlife</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why go slow here</h2>
            <p className="text-gray-700 leading-relaxed">
              Thekkady days start early for lake cruises and end with easy cultural shows. Spreading activities keeps kids rested and gives you space for pool time and short walks instead of long treks.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Reserve cruise tickets online/offline a day ahead; carry ID.</li>
              <li>Age limits apply for bamboo rafting/treks; check before booking.</li>
              <li>Evenings can be buggy—pack light insect repellent.</li>
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
            <h3 className="text-lg font-semibold text-gray-900">Kid-friendly notes</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {kidFriendly.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Stay picks</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {stays.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC note</h3>
            <p className="text-sm text-gray-700 mt-2">Tell us kids’ ages and dates—we will lock cruise tickets, age-appropriate activities, and buffer drives between Kochi/Munnar.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
