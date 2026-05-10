'use client';
import ReviewsTicker from '../../components/ReviewsTicker';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutPage() {
	const [guestCount, setGuestCount] = useState(1990);

	useEffect(() => {
		const targetMid = 1999;
		const targetFinal = 2000;
		if (guestCount >= targetFinal) return;

		const delay = guestCount < targetMid ? 200 : 1000;
		const timer = setTimeout(() => {
			setGuestCount((prev) => {
				if (prev >= targetFinal) return prev;
				if (prev < targetMid) return Math.min(prev + 1, targetMid);
				return targetFinal;
			});
		}, delay);

		return () => clearTimeout(timer);
	}, [guestCount]);

	return (
		<main className="relative min-h-screen py-12 px-4">
			<div className="absolute inset-0 -z-20 air-hero-bg pointer-events-none" aria-hidden />
			<div className="absolute -left-16 top-12 -z-10 h-48 w-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.12)' }} aria-hidden />
			<div className="absolute right-10 top-16 -z-10 h-56 w-56 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,0,0,0.05)' }} aria-hidden />

			<div className="max-w-6xl mx-auto space-y-10 relative z-10">
				<section className="air-card p-6 sm:p-10 relative overflow-hidden">
					<div className="absolute -right-10 -top-16 h-40 w-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.12)' }} aria-hidden />
					<div className="absolute -left-12 bottom-0 h-44 w-44 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,0,0,0.05)' }} aria-hidden />
					<div className="relative grid gap-8 lg:grid-cols-2 items-start">
						<div className="space-y-3">
							<p className="inline-flex items-center gap-2 px-3 py-1 rounded-full air-pill text-xs font-semibold uppercase tracking-wide">Kerala-only DMC</p>
							<h1 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--pmk-text)' }}>Local family-run DMC, rebuilt for instant itineraries</h1>
							<p className="text-lg air-muted max-w-2xl">Since 2015 we’ve planned Kerala trips for Japan, GCC, and Indian guests with realistic drive times, vetted hotels, and clear budgets.</p>
							<div className="flex flex-wrap gap-2 text-xs" style={{ color: 'var(--pmk-text)' }}>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">Drive-time smart</span>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">Budget transparency</span>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">Japan + GCC experience</span>
							</div>
						</div>
						<div className="air-card p-5 space-y-3">
							<div className="text-sm air-muted">Founded</div>
							<div className="text-2xl font-bold" style={{ color: 'var(--pmk-accent)' }}>2015</div>
							<div className="text-sm air-muted">Guests served</div>
							<div className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>{guestCount}{guestCount >= 2000 ? '+' : ''} travellers</div>
							<div className="text-sm air-muted">Core promise</div>
							<div className="text-base font-semibold" style={{ color: 'var(--pmk-text)' }}>Treat every guest like family</div>
							<div className="flex flex-wrap gap-2 pt-2">
								<span className="rounded-full air-pill px-3 py-1 text-xs font-semibold">Houseboats</span>
								<span className="rounded-full air-pill px-3 py-1 text-xs font-semibold">Tea hills</span>
								<span className="rounded-full air-pill px-3 py-1 text-xs font-semibold">Beaches</span>
								<span className="rounded-full air-pill px-3 py-1 text-xs font-semibold">Culture</span>
							</div>
						</div>
					</div>
				</section>

				<section className="air-card p-6 sm:p-8 grid gap-6 lg:grid-cols-2 items-start">
					<div className="space-y-4">
						<h2 className="text-xl font-bold" style={{ color: 'var(--pmk-text)' }}>Our story</h2>
						<p className="text-sm air-muted leading-relaxed">We began life in 2015 as Sree Padmanabham Travels—a small, family-run travel agency in Kerala. Early guests from Japan and the Arab world valued our punctuality, cultural sensitivity, and realistic pacing. We grew by focusing on verified stays, safe vehicles, and honest budgets.</p>
						<p className="text-sm air-muted leading-relaxed">In 2022 we reimagined the service as PlanMyKerala, pairing our local network with a modern itinerary builder so travellers can see options, prices, and drive times instantly.</p>
						<p className="text-sm air-muted leading-relaxed">Today we combine on-ground partners, vetted accommodations, and transparent pricing so you can relax and enjoy Kerala without surprises.</p>
					</div>
					<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-5 space-y-3">
						<h3 className="font-semibold" style={{ color: 'var(--pmk-text)' }}>What we optimise</h3>
						<ul className="space-y-2 text-sm air-muted">
							<li>✅ Drive-time balanced routes (backwaters + hills + coast)</li>
							<li>✅ Budget tiers with clear tradeoffs</li>
							<li>✅ Vehicles matched to group & luggage</li>
							<li>✅ Cultural / halal-friendly requests handled upfront</li>
						</ul>
						<div className="p-3 rounded-xl text-sm" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)', border: '1px solid var(--pmk-border)' }}>Instant drafts in under 30 seconds—then a human polishes it.</div>
					</div>
				</section>

				<section className="air-card p-6 sm:p-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
						<div>
							<h3 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Trusted by international guests</h3>
							<p className="text-sm air-muted">Japan, GCC, and domestic families who value thoughtful pacing.</p>
						</div>
						<Link href="/contact" className="text-sm font-semibold" style={{ color: 'var(--pmk-accent)' }}>Talk to a planner →</Link>
					</div>
					<ReviewsTicker />
				</section>

				<section className="air-card p-6 sm:p-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm air-muted">
					<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
						<h4 className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Partners</h4>
						<p>Approved partners in Munnar, Alleppey, Kochi.</p>
					</div>
					<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
						<h4 className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Accommodation</h4>
						<p>Verified stays (KTD approved) with clear tiers.</p>
					</div>
					<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
						<h4 className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Special requests</h4>
						<p>Halal-friendly, kids-first, honeymoon, or senior pacing.</p>
					</div>
					<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
						<h4 className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>On-ground</h4>
						<p>Local drivers and coordinators monitoring every segment.</p>
					</div>
				</section>

				<p className="text-sm air-muted text-center"><Link href="/">← Back to home</Link></p>
			</div>
		</main>
	);
}