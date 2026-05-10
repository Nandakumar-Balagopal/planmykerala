'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DateRangePicker from './DateRangePicker';
import { supabase } from '../lib/supabaseClient';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showCompact, setShowCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [globalQuery, setGlobalQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const fetchRole = async (token?: string | null) => {
      if (!token) return;
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const resp = await fetch(`${backendUrl}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) return;
        const profile = await resp.json();
        if (profile?.role === 'admin') setIsAdmin(true);
      } catch (e) {
        // ignore; keep admin link hidden
      }
    };

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token ?? null;
      setIsAuthed(Boolean(token));
      if (!token) {
        setIsAdmin(false);
        return;
      }
      await fetchRole(token);
    };

    syncSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const token = session?.access_token ?? null;
      setIsAuthed(Boolean(token));
      if (!token) {
        setIsAdmin(false);
        return;
      }
      fetchRole(token);
    });

    return () => {
      sub?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem('pmk-theme');
    const initial = stored === 'light' ? 'light' : 'dark';
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('pmk-theme', next);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthed(false);
    setIsAdmin(false);
    router.refresh();
  };

  useEffect(() => {
    setShowCompact(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setMenuOpen(false);
    };
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchParams) return;
    const s = searchParams.get('start');
    const e = searchParams.get('end');
    const g = searchParams.get('guests');
    if (s) setStart(s);
    if (e) setEnd(e);
    if (g) setGuests(Number(g) || 2);
  }, [searchParams]);

  const incrementGuests = () => setGuests((prev) => Math.max(1, prev + 1));
  const decrementGuests = () => setGuests((prev) => Math.max(1, prev - 1));

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/b2b', label: 'B2B' },
  ];

  const mobileQuickFilters = [
    { label: 'Backwaters', href: '/itinerary?vibe=Backwaters' },
    { label: 'Tea Hills', href: '/itinerary?vibe=Tea%20hills' },
    { label: 'Beaches', href: '/itinerary?vibe=Beaches' },
    { label: 'Family', href: '/itinerary?vibe=Family' },
    { label: 'Honeymoon', href: '/itinerary?vibe=Honeymoon' },
    { label: 'Wildlife', href: '/itinerary?vibe=Wildlife' },
  ];

  const searchItems = useMemo(() => {
    const blogSlugs = [
      'backwaters-houseboat-guide',
      'compact-kochi-weekend',
      'honeymoon-alappuzha-munnar',
      'kerala-with-kids',
      'kovalam-varkala-beach-loop',
      'monsoon-in-kerala',
      'munnar-tea-hills-mini-itinerary',
      'north-kerala-bekal-kannur',
      'thekkady-family-slow-trip',
      'varkala-long-weekend',
      'wayanad-wildlife-2n3d',
    ];
    const destinations = [
      { title: 'Kochi', href: '/itinerary?destinations=kochi', tags: ['destinations', 'city', 'culture'] },
      { title: 'Munnar', href: '/itinerary?destinations=munnar', tags: ['destinations', 'hills', 'tea'] },
      { title: 'Alleppey', href: '/itinerary?destinations=alleppey', tags: ['destinations', 'backwaters'] },
      { title: 'Thekkady', href: '/itinerary?destinations=thekkady', tags: ['destinations', 'wildlife'] },
      { title: 'Wayanad', href: '/itinerary?destinations=wayanad', tags: ['destinations', 'wildlife', 'hills'] },
      { title: 'Varkala', href: '/itinerary?destinations=varkala', tags: ['destinations', 'beaches'] },
      { title: 'Kovalam', href: '/itinerary?destinations=kovalam', tags: ['destinations', 'beaches'] },
      { title: 'Bekal', href: '/itinerary?destinations=bekal', tags: ['destinations', 'culture'] },
      { title: 'Kumarakom', href: '/itinerary?destinations=kumarakom', tags: ['destinations', 'backwaters'] },
    ];
    const itineraries = [
      { title: 'Backwaters + Tea Hills (5 nights)', href: '/itinerary?guests=2&vibe=Backwaters', tags: ['itinerary', 'backwaters'] },
      { title: 'South Kerala Beaches (4 nights)', href: '/itinerary?guests=2&vibe=Beaches', tags: ['itinerary', 'beaches'] },
      { title: 'Family-friendly Kerala (6 nights)', href: '/itinerary?guests=4&vibe=Family', tags: ['itinerary', 'family'] },
      { title: 'Honeymoon Escape (5 nights)', href: '/itinerary?guests=2&vibe=Honeymoon', tags: ['itinerary', 'honeymoon'] },
      { title: 'Wildlife + Hills (3 nights)', href: '/itinerary?guests=2&vibe=Wildlife', tags: ['itinerary', 'wildlife'] },
    ];
    const blogItems = blogSlugs.map((slug) => ({
      title: slug.split('-').map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part)).join(' '),
      href: `/blog/${slug}`,
      tags: ['blog', 'guide'],
    }));
    const staticPages = [
      { title: 'Home', href: '/', tags: ['home'] },
      { title: 'Itinerary Builder', href: '/itinerary', tags: ['itinerary', 'plan'] },
      { title: 'B2B Partners', href: '/b2b', tags: ['b2b', 'partners'] },
      { title: 'B2B Partner Profile', href: '/b2b/profile', tags: ['b2b', 'profile'] },
      { title: 'B2B Brand Settings', href: '/b2b/settings', tags: ['b2b', 'settings'] },
      { title: 'B2B Sign In', href: '/b2b/signin', tags: ['b2b', 'signin'] },
      { title: 'About', href: '/about', tags: ['about'] },
      { title: 'Contact', href: '/contact', tags: ['contact'] },
      { title: 'Blog', href: '/blog', tags: ['blog'] },
    ];
    return [...staticPages, ...destinations, ...itineraries, ...blogItems];
  }, []);

  const filteredSearch = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) return [];
    return searchItems.filter((item) => {
      const haystack = `${item.title} ${item.tags?.join(' ') ?? ''}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }, [globalQuery, searchItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    params.set('guests', String(guests));
    router.push(`/itinerary?${params.toString()}`);
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filteredSearch.length) return;
    router.push(filteredSearch[0].href);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const compactPicker = (
    <form onSubmit={handleSubmit} className="relative animate-fade-in-down">
      <div className="flex items-center rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] shadow-[var(--pmk-shadow-card)] overflow-visible">
        <div className="flex items-center gap-2 pl-3 sm:pl-4 pr-2 sm:pr-3 py-1.5 bg-[var(--pmk-bg)]">
          <DateRangePicker
            dropdown
            initialStart={start}
            initialEnd={end}
            onChange={({ start: s, end: e }) => {
              setStart(s);
              setEnd(e);
            }}
          />
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[var(--pmk-bg)]">
          <div className="text-xs air-muted leading-tight">Guests</div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={decrementGuests} className="h-8 w-8 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-sm font-semibold text-[var(--pmk-text)] hover:shadow-[var(--pmk-shadow-hover)]">-</button>
            <div className="text-sm font-semibold text-[var(--pmk-text)] min-w-[24px] text-center">{guests}</div>
            <button type="button" onClick={incrementGuests} className="h-8 w-8 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-sm font-semibold text-[var(--pmk-text)] hover:shadow-[var(--pmk-shadow-hover)]">+</button>
          </div>
        </div>
        <button type="submit" className="h-full px-3 sm:px-4 bg-[var(--pmk-text)] text-[var(--pmk-bg)] text-sm font-semibold">Build</button>
      </div>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl shadow-[var(--pmk-shadow-card)]" style={{ background: 'color-mix(in srgb, var(--pmk-bg) 90%, transparent)', borderBottom: '1px solid var(--pmk-border)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3.5 px-4 sm:px-6">
        <div className="flex items-center gap-3 text-[var(--pmk-text)]">
          <a href="/" className="text-2xl md:text-3xl font-semibold tracking-tight hover:text-[var(--pmk-accent)] transition-colors">PlanMyKerala</a>
          <span className="hidden sm:inline-flex h-6 items-center rounded-full bg-[var(--pmk-surface)] px-2 text-xs font-semibold text-[var(--pmk-text)] border border-[var(--pmk-border)]">Trusted DMC</span>
        </div>
        <div className="flex items-center gap-5 text-[var(--pmk-text)]">
          {/* Compact date picker disabled on all viewports */}

          <div className="hidden md:flex items-center gap-5 sm:gap-6">
            <div className="hidden lg:flex relative">
              <form onSubmit={handleGlobalSearch} className="flex items-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-3 py-1.5">
              <input
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Search destinations, blogs, trips"
                className="w-48 bg-transparent text-sm text-[var(--pmk-text)] outline-none"
                aria-label="Search"
                onFocus={() => setSearchOpen(true)}
              />
              <button type="submit" className="text-xs font-semibold text-[var(--pmk-accent)]">Search</button>
            </form>
              {searchOpen && filteredSearch.length > 0 && (
                <div className="absolute top-full mt-2 w-80 rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] shadow-[var(--pmk-shadow-card)] p-2 z-50">
                  {filteredSearch.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-[var(--pmk-surface)]"
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{item.title}</div>
                      <div className="text-[11px] air-muted">{item.tags?.join(' • ')}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-5 text-sm font-semibold tracking-tight air-muted">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-1 hover:text-[var(--pmk-text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              className="h-10 w-10 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-[var(--pmk-text)] text-sm font-semibold"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '◐'}
            </button>
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 text-sm font-semibold text-[var(--pmk-error)] shadow-[var(--pmk-shadow-card)] hover:shadow-[var(--pmk-shadow-hover)] transition"
              >
                Log out
              </button>
            ) : (
              <a
                href="/b2b/signin"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 text-sm font-semibold text-[var(--pmk-text)] shadow-[var(--pmk-shadow-card)] hover:shadow-[var(--pmk-shadow-hover)] transition"
              >
                Sign in
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="md:hidden h-11 w-11 flex flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-[var(--pmk-text)] shadow-[var(--pmk-shadow-card)]"
          >
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>

          {menuOpen && (
            <div className="fixed inset-0 z-50">
              <button
                type="button"
                aria-label="Close navigation overlay"
                className="absolute inset-0 bg-black/60"
                onClick={() => setMenuOpen(false)}
              />
              <aside className="absolute right-0 top-0 h-full w-80 max-w-[88vw] bg-[var(--pmk-bg)] shadow-2xl p-6 flex flex-col gap-6 animate-slide-in-right" style={{ background: 'var(--pmk-bg)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[var(--pmk-text)]">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-semibold air-muted hover:text-[var(--pmk-text)]"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleGlobalSearch} className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] air-muted">Search</div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      value={globalQuery}
                      onChange={(e) => setGlobalQuery(e.target.value)}
                      placeholder="Search destinations, blogs, trips"
                      className="flex-1 bg-transparent text-sm text-[var(--pmk-text)] outline-none"
                      aria-label="Search"
                      onFocus={() => setSearchOpen(true)}
                    />
                    <button type="submit" className="text-xs font-semibold text-[var(--pmk-accent)]">Go</button>
                  </div>
                  {searchOpen && filteredSearch.length > 0 && (
                    <div className="mt-3 grid gap-2">
                      {filteredSearch.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="rounded-xl px-3 py-2 text-sm bg-[var(--pmk-bg)] border border-[var(--pmk-border)]"
                          onClick={() => {
                            setSearchOpen(false);
                            setMenuOpen(false);
                          }}
                        >
                          <div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{item.title}</div>
                          <div className="text-[11px] air-muted">{item.tags?.join(' • ')}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </form>

                <div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] air-muted">Quick filters</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mobileQuickFilters.map((filter) => (
                      <a
                        key={filter.label}
                        href={filter.href}
                        className="rounded-full border border-[var(--pmk-border)] px-3 py-1 text-xs font-semibold text-[var(--pmk-text)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {filter.label}
                      </a>
                    ))}
                  </div>
                </div>

                <nav className="flex flex-col gap-4 text-base">
                  {navLinks.map((link, idx) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="hover:text-[var(--pmk-accent)] transition-colors font-medium animate-fade-in-right"
                      style={{ animationDelay: `${60 * idx}ms` }}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto grid gap-3">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] px-4 py-2 text-sm font-semibold text-[var(--pmk-text)]"
                  >
                    {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                  </button>
                  {isAuthed && (
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 text-sm font-semibold text-[var(--pmk-error)]"
                    >
                      Log out
                    </button>
                  )}
                  {!isAuthed && (
                    <a
                      href="/b2b/signin"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 text-sm font-semibold text-[var(--pmk-text)]"
                    >
                      Sign in
                    </a>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;