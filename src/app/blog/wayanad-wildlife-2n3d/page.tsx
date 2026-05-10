export const metadata = {
  title: 'Wayanad Wildlife: 2N/3D with Edakkal & Kuruva | PlanMyKerala DMC',
  description: 'Compact wildlife loop in Wayanad with safari slots, caves, bamboo rafting, waterfalls, and pairing ideas with Coorg.',
};

const pacing = [
  'Day 1 — Arrive Kalpetta/Sultan Bathery; Edakkal Caves (reach early to avoid queues), evening sunset at Lakkidi view point.',
  'Day 2 — Early Muthanga or Tholpetty safari slot; later Pookode Lake or Karlad zipline; relaxed coffee estate stop.',
  'Day 3 — Kuruva Island bamboo rafting if river is open; Thirunelli temple detour; exit toward Kozhikode or Coorg.',
];

const tips = [
  'Book jeep safaris a day prior; carry ID and reach the gate 30–40 mins early for morning slots.',
  'Monsoon (Jun–Aug) brings mist and leeches on trails; carry rain layers and grippy footwear.',
  'Stay choice: Bathery for safari proximity; Kalpetta for cafes; Vythiri for resort stays in the forest fringe.',
  'Keep buffer drives—ghat roads slow down with rain and truck traffic.',
];

const addOns = [
  'Pair with Coorg (3–4 hrs) for coffee estates and Dubare elephant camp.',
  'Add Banasura Sagar dam + zipline combo for teens.',
  'For birders, target dawn walks near Kuruvadweep belt (if open).',
];

export default function WayanadWildlifePage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Wayanad Wildlife: 2N/3D with Edakkal & Kuruva</h1>
          <p className="text-white/85 max-w-3xl">How to pack safaris, caves, rafting, and waterfalls into a short Wayanad loop without rushing drives.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Wildlife</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why a 2N/3D loop works</h2>
            <p className="text-gray-700 leading-relaxed">
              Two nights let you attempt one prime safari, fit Edakkal Caves before crowds, and keep a light third morning for Kuruva Island or a coffee estate. Add a night if you want multiple safari attempts in different ranges.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Gate times: first safari slots typically ~6am; evening around 3pm. Vary by season—check locally.</li>
              <li>Carry cash/UPI for entry and camera fees.</li>
              <li>Mobile data can dip inside forest belts; download offline tickets.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Suggested pacing</h2>
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
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Add-ons we like</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC note</h3>
            <p className="text-sm text-gray-700 mt-2">
              Share your dates and group size—we will align safari slots, pick stays close to gates, and build a rain-safe backup plan.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
