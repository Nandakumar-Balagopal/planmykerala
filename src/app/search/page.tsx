'use client';

import { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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

const staticPages = [
  { title: 'Home', href: '/', tags: ['home', 'kerala', 'plan'] },
  { title: 'Itinerary Builder', href: '/itinerary', tags: ['itinerary', 'plan', 'builder'] },
  { title: 'B2B Partners', href: '/b2b', tags: ['b2b', 'partners', 'white-label'] },
  { title: 'About', href: '/about', tags: ['about'] },
  { title: 'Contact', href: '/contact', tags: ['contact', 'talk'] },
  { title: 'Blog', href: '/blog', tags: ['blog', 'stories'] },
];

const slugToTitle = (slug: string) =>
  slug
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');

const searchItems = [
  ...staticPages,
  ...blogSlugs.map((slug) => ({
    title: slugToTitle(slug),
    href: `/blog/${slug}`,
    tags: ['blog', 'guide', 'kerala'],
  })),
];

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams?.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems;
    return searchItems.filter((item) => {
      const haystack = `${item.title} ${item.tags?.join(' ') ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 air-hero-bg-soft pointer-events-none" aria-hidden />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="air-card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] air-muted">Site search</p>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>Find Kerala trips, guides, and pages</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] px-3 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, blogs, trips"
                className="w-64 max-w-full bg-transparent text-sm text-[var(--pmk-text)] outline-none"
                aria-label="Search"
              />
              <button type="submit" className="text-xs font-semibold text-[var(--pmk-accent)]">Search</button>
            </form>
          </div>

          <div className="mt-6 text-sm air-muted">{results.length} results</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {results.map((item) => (
              <Link key={item.href} href={item.href} className="air-card air-card-hover p-4">
                <div className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>{item.title}</div>
                <div className="mt-2 text-xs air-muted">{item.href}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading search...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
