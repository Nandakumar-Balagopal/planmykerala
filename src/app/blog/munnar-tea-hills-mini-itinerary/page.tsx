export const metadata = {
  title: 'Munnar Tea Hills: 3-Day Mini Itinerary | PlanMyKerala DMC',
  description: 'Concise DMC guide for a 3-day Munnar loop—tea gardens, waterfalls, Eravikulam permits, sunrise points, and drive times.',
};

const dayByDay = [
  {
    title: 'Day 1 — Arrive & unwind',
    items: [
      'Drive Kochi → Munnar (4–4.5 hrs with one chai stop).',
      'Check-in, then Tea Museum/Blossom Park for a light first afternoon.',
      'Evening at Pothamedu view point or a plantation walk if weather permits.',
    ],
  },
  {
    title: 'Day 2 — Peaks and lakes',
    items: [
      'Early start: Eravikulam National Park; pre-book slots to avoid queues.',
      'Mattupetty → Echo Point → Kundala Lake loop; keep buffer for photos.',
      'Optional Top Station (adds 1.5–2 hrs) if clouds are clear.',
    ],
  },
  {
    title: 'Day 3 — Waterfalls & depart',
    items: [
      'Lakkam or Attukad waterfalls in the morning; watch for leeches in monsoon.',
      'Spice/tea shop stop for gifts; target Kochi by evening (start by 1pm).',
    ],
  },
];

const quickTips = [
  'Best months: Oct–Mar for clear mornings; Apr for blooms; Jun–Sep misty/monsoon mood with wet trails.',
  'Carry layers: mornings can hit 12–15°C; pack a rain jacket and grippy shoes.',
  'Pre-book Eravikulam tickets online; daily caps apply in season.',
  'Avoid overstuffed days: the hill traffic + photo halts add hidden time.',
];

export default function MunnarMiniPage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Munnar Tea Hills: 3-Day Mini Itinerary</h1>
          <p className="text-white/85 max-w-3xl">A concise DMC playbook for first timers: what to keep, what to drop, and realistic timing so you don’t spend the day in traffic.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Munnar</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Hills</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Why a 3-day loop works</h2>
            <p className="text-gray-700 leading-relaxed">
              Three days balances signature viewpoints, Eravikulam NP, and the Mattupetty lake loop without rushing. With kids or elders, keep drives short and
              add a plantation walk instead of Top Station on foggy days.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Start Kochi → Munnar no later than 10am to beat evening fog.</li>
              <li>Keep a buffer for photo halts; add 45–60 mins to maps ETA.</li>
              <li>Book Eravikulam tickets online; slot early to avoid crowds.</li>
              <li>Carry cash/UPI for local snacks and entry fees.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {dayByDay.map((day) => (
              <div key={day.title} className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  {day.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Quick tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              {quickTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-700">Need transfers + permits handled? Share dates and guests—our DMC team will stitch the loop with realistic buffers.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
