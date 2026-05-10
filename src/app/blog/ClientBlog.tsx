"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  image: string;
};

export function ClientBlog({ posts, filters, featuredPost }: { posts: BlogPost[]; filters: string[]; featuredPost?: BlogPost }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts;
    return posts.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter, posts]);

  return (
    <div style={{ color: 'var(--pmk-text)' }}>
      <section className="relative">
        <div className="absolute inset-0 -z-10 air-hero-bg-soft opacity-60" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Kerala travel blog</p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--pmk-text)' }}>Local DMC guides for Kerala sightseeing</h1>
          <p className="text-sm sm:text-base air-muted max-w-3xl">
            Fast reads on when to go, what to see, realistic drive times, and how to stitch backwaters, hills, and beaches in one flow.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-sm">
            {filters.map((f) => {
              const active = f === activeFilter;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-3 py-1 shadow-sm transition ${
                    active ? 'text-white border-transparent' : 'text-[var(--pmk-text)]'
                  }`}
                  style={active
                    ? { background: 'var(--pmk-accent)' }
                    : { background: 'var(--pmk-bg)', borderColor: 'var(--pmk-border)' }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group air-card air-card-hover overflow-hidden block"
          >
            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              <div className="h-56 sm:h-72 lg:h-full bg-[var(--pmk-surface)] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-center gap-3">
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--pmk-accent)' }}>
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>{tag}</span>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Featured</p>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--pmk-text)' }}>{featuredPost.title}</h2>
                <p className="text-sm sm:text-base air-muted leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 text-xs air-muted">
                  <span>{featuredPost.readTime}</span>
                  <span className="font-semibold" style={{ color: 'var(--pmk-accent)' }}>Read guide →</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Trending now</p>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>Sightseeing guides with quick takeaways</h2>
          </div>
          <span className="hidden sm:inline text-sm air-muted">Tap any card to read</span>
        </div>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group air-card air-card-hover overflow-hidden block"
            >
              <div className="h-44 bg-[var(--pmk-surface)] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--pmk-accent)' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-1" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>{tag}</span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold leading-snug" style={{ color: 'var(--pmk-text)' }}>{post.title}</h3>
                <p className="text-sm air-muted leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs air-muted">
                  <span>{post.readTime}</span>
                  <span className="font-semibold" style={{ color: 'var(--pmk-accent)' }}>Read guide →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
