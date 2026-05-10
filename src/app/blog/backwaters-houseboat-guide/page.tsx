export const metadata = {
  title: 'Backwaters & Houseboats: Alleppey vs Kumarakom | PlanMyKerala DMC',
  description: 'Local DMC guide on choosing Alleppey or Kumarakom for Kerala backwaters, best seasons, boat tips, and sample day plans.',
};

const tips = [
  'Best months: Nov–Mar for cooler nights; shoulder Apr and Sep for value; avoid peak monsoon weeks for houseboat safety.',
  'Alleppey suits classic canals and overnight houseboats; Kumarakom offers quieter bird sanctuary routes and boutique stays.',
  'Check build year, AC hours, and inclusions (meals, canoe ride). Favor licensed operators; ask for life jackets and clean kitchens.',
  'For families, pick 2-bedroom boats and start before noon to catch sunset on Vembanad Lake.',
  'Consider a day cruise + land resort combo if you prefer sleeping on solid ground.',
];

const sampleDay = [
  '11:30 – Board at Alleppey jetty; safety brief and welcome drink.',
  '12:00 – Cruise narrow canals; spot paddy fields and toddy shops.',
  '13:30 – Kerala lunch on board (veg + fish fry option).',
  '15:00 – Canoe ride through smaller canals (if included).',
  '17:30 – Sunset on Vembanad Lake; anchor near village.',
  '20:00 – Dinner on board; quiet night under the stars.',
  '08:00 – Breakfast; return to jetty by 09:00.',
];

export default function BackwatersGuidePage() {
  return (
    <div className="text-gray-900">
      <section className="bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-700/60 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-100 font-semibold">Kerala travel blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Backwaters & Houseboats: Alleppey vs Kumarakom</h1>
          <p className="text-white/85 max-w-3xl">Local DMC take on when to sail, which boarding point to pick, and how to choose the right boat without overpaying.</p>
          <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-50">
            <span className="rounded-full bg-white/15 px-3 py-1">Backwaters</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Houseboat</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Planning</span>
          </div>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Quick take: which base?</h2>
            <p className="text-gray-700 leading-relaxed">
              Alleppey gives you the classic canals and livelier routes; Kumarakom stays calmer with wider lake views and birdlife. If you want the postcard
              houseboat sunset, both deliver—pick Alleppey for more boat options, Kumarakom for quieter waters and upscale lakeside resorts.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">DMC snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Overnight AC typically 9pm–6am unless premium.</li>
              <li>Confirm hygiene photos and kitchen access on boarding.</li>
              <li>Ask for GST bill and boat license for insurance coverage.</li>
              <li>Carry cash/UPI for tips and toddy shop stops.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Fast planning checklist</h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">When to book</h3>
            <p className="text-sm text-gray-700 mt-2">Peak dates (Dec–Jan weekends) sell out; block boats 3–4 weeks out. Mon–Thu often 10–15% lower.</p>
            <p className="text-sm text-gray-700 mt-3">For rains (Jun–Aug), choose day cruises and land stays for comfort.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Sample day plan (Alleppey boarding)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {sampleDay.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {sampleDay.slice(4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">DMC note</h2>
          <p className="text-gray-700 leading-relaxed">
            We can pair a day cruise with a boutique stay in Kumarakom or split an Alleppey overnight with a beach add-on near Marari. Tell us guest count and
            month—our planner will suggest boats with verified crews and realistic timings.
          </p>
        </section>
      </article>
    </div>
  );
}
