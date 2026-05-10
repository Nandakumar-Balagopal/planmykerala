export const metadata = {
  title: 'Kerala with Kids: 6-Night Easy-Pace Plan | PlanMyKerala DMC',
  description: 'Kid-friendly Kerala plan with short drives, animal interactions, soft treks, pools, and backwater time without long transfers.',
};

const route = [
  'Night 1–2: Kochi/Alleppey — easy arrival, day cruise or short evening boat; keep transfers minimal on day one.',
  'Night 3–4: Munnar — tea views, short walks, and light sightseeing (skip long queues with early starts).',
  'Night 5–6: Thekkady — lake cruise AM, spice walk, elephant interaction, and show night.',
];

const tips = [
  'Cap drives at ~4–4.5 hours; add snack/loo stops every 90 mins for young kids.',
  'Book morning slots for popular parks and cruises; kids handle heat better earlier.',
  'Pick hotels with pools or gardens to burn energy after drives.',
  'Carry meds for motion/altitude changes; hills can be winding.',
];

const lightActivities = [
  'Kochi: Fort walk + cafe stop; short sunset ferry.',
  'Alleppey: 2–3 hr private day cruise instead of overnight if kids are under 6.',
  'Munnar: Tea museum, Pothamedu view, Attukad waterfalls viewpoint (avoid slippery trails in heavy rain).',
  'Thekkady: Bamboo rafting/green walk if age-eligible; otherwise plantation strolls.',
];

export default function KeralaWithKidsPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Kerala with Kids: 6-Night Easy-Pace Plan</h1>
          <p className="text-white/85 max-w-3xl">Short drives, wildlife-lite, and pool time baked into the plan so kids stay rested while you still see backwaters and hills.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Family</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Backwaters</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Route at a glance</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {route.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Drivers briefed for kid-paced halts and meal breaks.</li>
              <li>We pre-book entry slots to cut queues where possible.</li>
              <li>Monsoon plan includes indoor backups near each stay.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Kid-friendly tips</h2>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Light activities</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {lightActivities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Tell us kids’ ages and month—we’ll tailor stays with pools, early slots, and backup play areas.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
