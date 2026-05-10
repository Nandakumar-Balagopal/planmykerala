"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DateRangePicker from '../../components/DateRangePicker';
import useItinerary from '../../hooks/useItinerary';
import { supabase } from '../../lib/supabaseClient';

export default function B2BHome() {
  const router = useRouter();
  const { clearItinerary } = useItinerary();
  const heroRef = useRef<HTMLElement | null>(null);
  const [showPlanner, setShowPlanner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [guests, setGuests] = useState('2');
  const [days, setDays] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState('');
  const handleCompanyName = (value: string) => setCompanyName(value);

  const incrementGuests = () => {
    setGuests((prev) => {
      const next = (parseInt(prev, 10) || 1) + 1;
      return String(Math.max(1, next));
    });
  };

  const decrementGuests = () => {
    setGuests((prev) => {
      const next = (parseInt(prev, 10) || 1) - 1;
      return String(Math.max(1, next));
    });
  };

  const computeDays = (start?: string | null, end?: string | null) => {
    if (!start || !end) return null;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : null;
  };

  const helperTextForDays = (d: number | null) => {
    if (d == null) return '';
    if (d === 1) return 'Only 1 day? Add 1–2 more days to relax.';
    if (d === 2) return '2 days is quick — consider 1 more day.';
    if (d <= 4) return 'Great for a short getaway.';
    if (d <= 7) return 'Perfect trip duration.';
    return 'Plenty of time to explore deeply.';
  };

  // Detect auth and show overlay that blurs everything except the primary CTA
  useEffect(() => {
    let mounted = true;
    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const authed = Boolean(data.session);
      setIsLoggedIn(authed);
    };
    syncSession();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      syncSession();
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const startWizard = () => {
    setShowPlanner(true);
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.setProperty('--hero-parallax', `${Math.min(y * 0.16, 50)}px`);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const launchItinerary = async () => {
    clearItinerary();
    const q = new URLSearchParams({
      start: startDate ?? '',
      end: endDate ?? '',
      guests,
      company: companyName ?? '',
      channel: 'b2b',
    }).toString();
    await router.push(`/itinerary?${q}`);
  };
  const highlights = [
    { title: 'White-label itineraries', text: 'We operate under your brand with Kerala-only expertise.' },
    { title: 'Faster turnarounds', text: 'Instant drafts + human polish so you reply to clients in minutes.' },
    { title: 'Verified network', text: 'Trusted hotels, vehicles, and guides with on-ground monitoring.' }
  ];

  const steps = [
    'Share your client brief (dates, budget, pacing, must-see).',
    'We craft drive-time-smart routes with hotel/vehicle options.',
    'You present the white-labeled plan; we deliver on the ground.',
    'Live revisions and status tracking until checkout.'
  ];

  const verticals = [
    'Inbound tour operators (Asia / GCC / Europe)',
    'Corporate travel desks and MICE',
    'Boutique luxury advisors',
    'OTA / concierge teams needing Kerala fulfillment'
  ];

  return (
    <main className="relative min-h-screen bg-[var(--pmk-bg)]" style={{ color: 'var(--pmk-text)' }}>
      <header ref={heroRef} className="relative isolate overflow-hidden bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center hero-parallax">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f1a]/85 via-[#0c2f26]/70 to-[#0f3a2f]/65" aria-hidden />
        <div className="absolute inset-0 hero-premium-veil pointer-events-none" aria-hidden />
        <div className="absolute inset-y-0 left-0 w-[35%] hero-premium-sheen pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative">
          <div className="air-card rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.55)] p-6 sm:p-8 space-y-6 relative" style={{ background: 'color-mix(in srgb, var(--pmk-bg) 86%, transparent)', borderColor: 'color-mix(in srgb, var(--pmk-border) 60%, transparent)' }}>
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--pmk-text)', borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)' }}>B2B • Trade partners</div>
              {!isLoggedIn && (
                <Link
                  href="/b2b/signin"
                  className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-[0_18px_46px_-26px_rgba(16,185,129,0.35)] transition transform hover:-translate-y-0.5"
                  style={{ color: 'var(--pmk-text)' }}
                >
                  Partner sign in
                </Link>
              )}
              {isLoggedIn && (
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/b2b/profile"
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-[0_18px_46px_-26px_rgba(16,185,129,0.35)] transition sm:px-4 sm:py-2 sm:text-xs"
                    style={{ color: 'var(--pmk-text)' }}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/b2b/settings"
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-[0_18px_46px_-26px_rgba(16,185,129,0.35)] transition sm:px-4 sm:py-2 sm:text-xs"
                    style={{ color: 'var(--pmk-text)' }}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.reload();
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-[0_18px_46px_-26px_rgba(16,185,129,0.35)] transition sm:px-4 sm:py-2 sm:text-xs"
                    style={{ color: 'var(--pmk-text)' }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4 max-w-3xl hero-stagger">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Your Kerala DMC, operating as your brand</h1>
              <p className="text-lg sm:text-xl" style={{ color: 'var(--pmk-text)' }}>We build and deliver Kerala itineraries under your label—drive-time smart, budget clear, with vetted stays and vehicles. Faster responses, zero on-ground surprises.</p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold hero-stagger">
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>24h turnaround</span>
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 10%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>White-label delivery</span>
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 8%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>On-ground ops team</span>
              </div>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] transition transform hover:-translate-y-0.5"
                style={{ color: 'var(--pmk-text)' }}
              >
                Talk to a DMC lead
              </Link>
              <button
                type="button"
                onClick={startWizard}
                className={`relative z-20 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-[0_20px_60px_-24px_rgba(16,185,129,0.3)] transition transform ${showPlanner ? '' : 'animate-bounce'}`}
                style={{ color: 'var(--pmk-text)' }}
              >
                Generate instant itinerary
              </button>

            </div>
            {showPlanner && (
              <div className="mt-5 rounded-3xl border shadow-[0_24px_70px_-32px_rgba(0,0,0,0.45)] ring-1 ring-emerald-100 p-5 sm:p-6 space-y-4 animate-panel-pop" style={{ background: 'color-mix(in srgb, var(--pmk-bg) 92%, transparent)', borderColor: 'color-mix(in srgb, var(--pmk-border) 70%, transparent)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--pmk-accent)' }}>Quick brief</p>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Drop dates and guests; we’ll draft under your brand</h3>
                    <p className="text-sm air-muted">No payment. Takes ~30s. White-labeled output.</p>
                  </div>
                  {days !== null && (
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>
                      🌿 {days}-day trip • {helperTextForDays(days)}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                  <div className="rounded-2xl border p-4 shadow-inner" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)' }}>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide air-muted">
                      <span>Trip dates</span>
                      <span style={{ color: 'var(--pmk-accent)' }}>Smart range</span>
                    </div>
                    <div className="mt-2">
                      <DateRangePicker
                        dropdown
                        onChange={({ start, end }: any) => {
                          setStartDate(start);
                          setEndDate(end);
                          setDays(computeDays(start, end));
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-bg)' }}>
                      <div className="text-xs font-semibold uppercase tracking-wide air-muted">Your company name</div>
                      <input
                        type="text"
                        inputMode="text"
                        autoComplete="organization"
                        value={companyName}
                        onChange={(e) => handleCompanyName(e.target.value)}
                        onFocus={() => setShowPlanner(true)}
                        placeholder="e.g., Aurora Travels"
                        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm bg-[var(--pmk-bg)] text-[var(--pmk-text)] focus:outline-none"
                        style={{ borderColor: 'var(--pmk-border)' }}
                      />
                    </div>

                    <div className="rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-bg)' }}>
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide air-muted">
                        <span>Guests</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--pmk-text)' }}>
                          👥 {guests} guest{parseInt(guests, 10) > 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={decrementGuests}
                            className="h-9 w-9 rounded-full border text-lg font-semibold transition"
                            style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }}
                            aria-label="Decrease guests"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-12 text-center rounded-full border text-base font-semibold bg-[var(--pmk-surface)] text-[var(--pmk-text)] focus:outline-none"
                            style={{ borderColor: 'var(--pmk-border)' }}
                          />
                          <button
                            type="button"
                            onClick={incrementGuests}
                            className="h-9 w-9 rounded-full border text-lg font-semibold transition"
                            style={{ borderColor: 'var(--pmk-border)', background: 'color-mix(in srgb, var(--pmk-accent) 10%, var(--pmk-bg))', color: 'var(--pmk-text)' }}
                            aria-label="Increase guests"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border p-3 shadow-inner text-xs air-muted" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)' }}>
                      {days ? `Looks like a ${days}-day trip. We’ll keep drives tight and suggest 1–2 hotel tiers.` : 'Pick dates to see trip length and pacing advice.'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs air-muted">Instant draft • White-labeled • Human DMC follow-up</p>
                  <button
                    type="button"
                    onClick={launchItinerary}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-24px_rgba(16,185,129,0.6)] hover:scale-[1.01] active:scale-[0.99] transition"
                  >
                    Generate white-label itinerary
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="air-card air-card-hover p-5">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>{item.title}</h3>
            <p className="mt-2 text-sm air-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16 grid gap-8 lg:grid-cols-2 items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>How we work</p>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>White-label, fast, and drive-time smart</h2>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--pmk-text)' }}>
            {steps.map((step, idx) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full text-xs font-bold inline-flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', border: '1px solid var(--pmk-border)', color: 'var(--pmk-accent)' }}>{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: 'var(--pmk-border)', background: 'color-mix(in srgb, var(--pmk-accent) 10%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>We stay invisible to your client. You control the relationship; we handle on-ground execution.</div>
        </div>
        <div className="air-card p-6 space-y-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Who we support</h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--pmk-text)' }}>
            {verticals.map((v) => (
              <li key={v} className="flex items-start gap-2">
                <span className="mt-0.5" style={{ color: 'var(--pmk-accent)' }}>•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm air-muted pt-2">Regional hubs: Kochi, Trivandrum, Calicut. Vehicles, guides, and hotel partners vetted for consistency.</div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold" style={{ color: 'var(--pmk-text)' }}>
            <span className="px-3 py-1 rounded-full" style={{ background: 'var(--pmk-surface)', border: '1px solid var(--pmk-border)' }}>Houseboats & backwaters</span>
            <span className="px-3 py-1 rounded-full" style={{ background: 'var(--pmk-surface)', border: '1px solid var(--pmk-border)' }}>Tea hills & treks</span>
            <span className="px-3 py-1 rounded-full" style={{ background: 'var(--pmk-surface)', border: '1px solid var(--pmk-border)' }}>Coast & surf</span>
            <span className="px-3 py-1 rounded-full" style={{ background: 'var(--pmk-surface)', border: '1px solid var(--pmk-border)' }}>Culture & cuisine</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="air-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="space-y-2 flex-1">
            <p className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Partner with us</p>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>Need Kerala handled under your banner?</h3>
            <p className="text-sm air-muted">Send a brief or loop us into your ops thread. We revert with a white-labeled plan (drive times, budgets, alternates) so you can win and service the client faster.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white text-sm font-semibold shadow-[0_20px_60px_-24px_rgba(16,185,129,0.7)] transition"
              style={{ background: 'var(--pmk-accent)' }}
            >
              Start a brief
            </Link>
            <a
              href="mailto:partners@planmykerala.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition"
              style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)', background: 'var(--pmk-surface)' }}
            >
              Email partners@planmykerala.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
