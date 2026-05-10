'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangePicker from '../components/DateRangePicker';
import CustomSelect from '../components/CustomSelect';
import DiscoverySection from '../components/Home/DiscoverySection';
import ReviewsTicker from '../components/ReviewsTicker';
import ServiceUnavailableModal from '../components/ServiceUnavailableModal';

const quickFilters = [
  { label: 'Backwaters', helper: 'Alleppey / Kumarakom' },
  { label: 'Tea hills', helper: 'Munnar' },
  { label: 'Beaches', helper: 'Kovalam / Varkala' },
  { label: 'Family', helper: 'Kid friendly pacing' },
  { label: 'Honeymoon', helper: 'Privacy + views' },
  { label: 'Wildlife', helper: 'Thekkady / Wayanad' },
];

const featuredRoutes = [
  {
    title: 'Kochi → Munnar → Alleppey',
    tags: ['5 nights', 'DMC pick'],
    text: 'Tea gardens, waterfall stops, and a classic backwater night.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80', // Alleppey backwaters
  },
  {
    title: 'Kovalam → Varkala → Poovar',
    tags: ['4 nights', 'Coast'],
    text: 'Sunrise beaches, cliffside cafes, and lagoon cruises in the south.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80', // Kerala beach
  },
  {
    title: 'Wayanad → Calicut → Bekal',
    tags: ['6 nights', 'Nature + culture'],
    text: 'Rainforest hikes, spice trails, and coastal forts in North Kerala.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80', // Munnar tea plantations
  },
];

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement | null>(null);

  // Service unavailable modal state
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Hero backdrop temporarily disabled for clarity; using solid gradient only.

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [guests, setGuests] = useState('2');
  const [pickupCity, setPickupCity] = useState('kochi');
  const [days, setDays] = useState<number | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPickedDates, setHasPickedDates] = useState(false);
  const [searchGlowNonce, setSearchGlowNonce] = useState(0);
  const glowArmedRef = useRef(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const heroFeatures = [
    {
      title: 'Kerala trips that feel longer, not the drives',
      text: 'A single smart flow to plan dates, guests, and pacing in minutes.',
    },
    {
      title: 'Drive-time smart routes, ready in minutes',
      text: 'We balance backwaters, hills, and coast with realistic transfers.',
    },
    {
      title: 'Hotels and activities tuned to your budget',
      text: 'Compare tiers quickly and refine the plan without back-and-forth.',
    },
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const seasonInfo = getSeasonInfo();

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

  const handleSearch = async () => {
    // Show service unavailable modal instead of navigating
    setShowServiceModal(true);
  };

  // WhatsApp configuration
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const whatsappMessage = encodeURIComponent("Hi, I'd like to plan a Kerala trip");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.setProperty('--hero-parallax', `${Math.min(y * 0.18, 60)}px`);
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

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroFeatures.length);
    }, 13000);
    return () => window.clearInterval(id);
  }, [heroFeatures.length]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header
        ref={heroRef}
        className="relative z-20 overflow-hidden premium-glow bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-kerala.jpg')" }}
      >
        <div className="absolute inset-0 -z-30 hero-parallax" aria-hidden />
        <div className="absolute inset-0 -z-20 air-hero-bg-soft opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 -z-10 hero-premium-veil opacity-30 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 z-0 h-56 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, color-mix(in srgb, var(--pmk-bg) 0%, transparent) 0%, color-mix(in srgb, var(--pmk-bg) 40%, transparent) 55%, var(--pmk-bg) 100%)',
          }}
          aria-hidden
        />
        <div className="absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.14)' }} aria-hidden />
        <div className="absolute right-10 top-16 -z-10 h-56 w-56 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.1)' }} aria-hidden />
        <div className="absolute right-20 bottom-8 -z-10 h-72 w-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,0,0,0.06)' }} aria-hidden />
        <div className="absolute inset-y-0 left-0 -z-10 w-[30%] hero-premium-sheen pointer-events-none" aria-hidden />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col gap-7 md:gap-9">
          <div className="space-y-4 md:space-y-6 text-center md:text-left min-h-[220px] sm:min-h-[240px]">
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight hero-animate-main text-white"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              <span key={heroIndex} className="word-reveal">
                {heroFeatures[heroIndex].title.split(' ').map((word, idx) => (
                  <span key={`${word}-${idx}`} style={{ animationDelay: `${idx * 180}ms`, marginRight: idx === heroFeatures[heroIndex].title.split(' ').length - 1 ? 0 : '0.25em' }}>
                    {word}
                  </span>
                ))}
              </span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-3xl mx-auto md:mx-0 hero-animate-sub text-white"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              {heroFeatures[heroIndex].text}
            </p>
            <div
              className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold"
              style={{
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.25)',
                background: 'rgba(15,23,42,0.55)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <span className="uppercase tracking-[0.2em]" style={{ color: '#ffffff' }}>Season now</span>
              <span>{seasonInfo.label}</span>
              <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
              <span className="air-muted">Best for: {seasonInfo.destinations.join(', ')}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              {heroFeatures.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHeroIndex(i)}
                  className="h-1.5 rounded-full transition"
                  style={{ width: i === heroIndex ? '32px' : '10px', background: i === heroIndex ? 'var(--pmk-accent)' : 'color-mix(in srgb, var(--pmk-border) 60%, transparent)' }}
                  aria-label={`Hero slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div id="hero-search" className="relative z-[120] air-card p-4 sm:p-5 md:p-6 animate-panel-pop md:max-w-3xl min-h-[220px]">
            {/* Locked Overlay */}
            <div className="absolute inset-0 z-10 rounded-2xl backdrop-blur-[2px] bg-[var(--pmk-bg)]/40 flex items-center justify-center cursor-not-allowed">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 15%, var(--pmk-bg))' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--pmk-text)' }}>Itinerary Builder Coming Soon</h3>
                <p className="text-sm air-muted mb-4 max-w-sm">Chat with our Kerala experts on WhatsApp for instant personalized planning!</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Blurred Form (for visual context) */}
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.6fr_auto] items-center opacity-30 pointer-events-none">
              <div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.2em] air-muted">Pickup city</div>
                <CustomSelect
                  value={pickupCity}
                  onChange={setPickupCity}
                  options={[
                    { value: 'kochi', label: 'Kochi' },
                    { value: 'trivandrum', label: 'Trivandrum' },
                    { value: 'kozhikode', label: 'Kozhikode' },
                    { value: 'kannur', label: 'Kannur' },
                  ]}
                  className="mt-1"
                  buttonClassName="bg-[var(--pmk-bg)] border-[var(--pmk-border)]"
                />
              </div>

              <div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.2em] air-muted">When</div>
                <DateRangePicker
                  dropdown
                  onChange={({ start, end }: any) => {
                    setStartDate(start);
                    setEndDate(end);
                    setDays(computeDays(start, end));
                    const ready = Boolean(start && end);
                    setHasPickedDates(ready);
                    glowArmedRef.current = ready;
                  }}
                  onOpen={() => setIsCalendarOpen(true)}
                  onClose={() => {
                    setIsCalendarOpen(false);
                    if (!glowArmedRef.current) return;
                    window.setTimeout(() => {
                      setSearchGlowNonce((prev) => prev + 1);
                      glowArmedRef.current = false;
                    }, 2000);
                  }}
                />
              </div>

              <div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.2em] air-muted">Who</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>
                    {guests} guest{parseInt(guests, 10) > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      className="h-8 w-8 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-sm font-semibold text-[var(--pmk-text)] transition"
                      aria-label="Decrease guests"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={incrementGuests}
                      className="h-8 w-8 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-sm font-semibold text-[var(--pmk-text)] transition"
                      aria-label="Increase guests"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className={`relative ${isCalendarOpen ? 'z-0' : 'z-10'} w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--pmk-text)] px-6 py-3 text-sm font-semibold text-[var(--pmk-bg)] shadow-[var(--pmk-shadow-hover)] hover:bg-[var(--pmk-accent-deep)] transition animate-search-glow`}
                key={searchGlowNonce}
              >
                Search
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs air-muted min-h-[32px] opacity-30">
              <span>Instant draft • No payment • Local DMC in Kochi</span>
            </div>
          </div>

          {/* Service Unavailable Modal */}
          <ServiceUnavailableModal
            isOpen={showServiceModal}
            onClose={() => setShowServiceModal(false)}
            serviceName="Itinerary Builder"
          />
        </div>
      </header>

      <main className="relative z-10 -mt-6 md:-mt-10 pt-6 space-y-12 pb-16">
        <div className="absolute inset-x-0 -z-10 top-8 h-[320px] sm:h-[420px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.85), transparent)' }} aria-hidden />

        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="air-card air-card-hover p-5">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>Local DMC planning</h3>
              <p className="mt-2 text-sm air-muted">Kerala-only specialists who align hotels, transfers, and pacing for you.</p>
            </div>
            <div className="air-card air-card-hover p-5">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>Time & budget guardrails</h3>
              <p className="mt-2 text-sm air-muted">Realistic drive times and tiered budgets so you always know the tradeoffs.</p>
            </div>
            <div className="air-card air-card-hover p-5">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>Live revisions in minutes</h3>
              <p className="mt-2 text-sm air-muted">Tweak nights, vehicles, or activities—get updated plans without back-and-forth.</p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Sample routes</p>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>Quick-start templates from our DMC</h2>
            </div>
            <span className="hidden sm:inline text-sm air-muted">Swipe on mobile</span>
          </div>
          <div className="relative flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:pointer-events-none after:bg-gradient-to-l after:from-[var(--pmk-bg)] after:to-transparent after:sm:hidden">
            {featuredRoutes.map((route) => (
              <div
                key={route.title}
                className="w-[320px] min-w-[320px] max-w-[320px] shrink-0 snap-start air-card p-5"
              >
                <div className="overflow-hidden rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)]">
                  <img
                    src={route.image}
                    alt={route.title}
                    className="h-32 w-full object-cover sm:h-36"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--pmk-accent)' }}>
                  {route.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>{tag}</span>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>{route.title}</h3>
                <p className="mt-2 text-sm air-muted">{route.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <DiscoverySection />
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
          <div className="air-card p-6">
            <ReviewsTicker />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
          <div className="air-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>For partners</p>
              <h3 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Operate Kerala under your brand</h3>
              <p className="text-sm air-muted">See our white-label B2B offering with fast itineraries and on-ground delivery.</p>
            </div>
            <a
              href="/b2b"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pmk-bg)] text-[var(--pmk-text)] border border-[var(--pmk-border)] px-4 py-2 text-sm font-semibold shadow-[var(--pmk-shadow-card)] hover:shadow-[var(--pmk-shadow-hover)] transition"
            >
              Explore B2B
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function getSeasonInfo() {
  const month = new Date().getMonth();
  if (month === 11 || month <= 1) {
    return {
      label: 'Peak winter (Dec-Feb)',
      destinations: ['Varkala', 'Kovalam', 'Alleppey', 'Fort Kochi'],
    };
  }
  if (month >= 2 && month <= 4) {
    return {
      label: 'Summer (Mar-May)',
      destinations: ['Munnar', 'Wayanad', 'Thekkady'],
    };
  }
  if (month >= 5 && month <= 8) {
    return {
      label: 'Monsoon (Jun-Sep)',
      destinations: ['Alleppey', 'Athirappilly', 'Kumarakom'],
    };
  }
  return {
    label: 'Post-monsoon (Oct-Nov)',
    destinations: ['Kochi', 'Bekal', 'Ashtamudi'],
  };
}
