'use client';
import React from 'react';

/**
 * DiscoverySection
 * Now: RecentBookings only (Itinerary redirect removed)
 */
export default function DiscoverySection() {
	return (
		<section className="mt-12">
			<RecentBookings />
		</section>
	);
}

/* ---------------- RecentBookings (unchanged) ---------------- */
function RecentBookings() {
	const MOCK = [
		{ id: 1, user: 'Rohan, Mumbai', ago: '2h', title: '5 Nights in Munnar & Alleppey', tags: ['Couple','Luxury'], price: 24500, img: 'https://source.unsplash.com/800x500/?alleppey,houseboat' },
		{ id: 2, user: 'Aisha, Dubai', ago: '4h', title: '3 Nights Kovalam Retreat', tags: ['Solo','Budget'], price: 15000, img: 'https://source.unsplash.com/800x500/?kovalam,beach' },
	];

	return (
		<div className="px-4">
			<div className="max-w-7xl mx-auto air-card p-6">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-lg font-semibold" style={{ color: 'var(--pmk-text)' }}>Recently Booked Kerala Trips</h4>
					<div className="flex items-center gap-2">
						<span className="w-3 h-3 rounded-full animate-pulse inline-block" style={{ background: 'var(--pmk-accent)' }} />
						<span className="text-sm air-muted">Live</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{MOCK.map(m => (
						<div key={m.id} className="air-card overflow-hidden">
							<div className="flex items-center justify-between p-3">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }}>R</div>
									<div className="text-xs air-muted">{m.user} • {m.ago}</div>
								</div>
							</div>

							<div className="h-40 relative overflow-hidden">
								<img src={m.img} alt={m.title} className="w-full h-full object-cover" />
								{/* top gradient for header visibility */}
								<div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
							</div>

							<div className="p-4">
								<div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{m.title}</div>
								<div className="mt-2 flex gap-2">
									{m.tags.map(t => (
										<span key={t} className="text-xs px-2 py-1 rounded" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)' }}>{t}</span>
									))}
								</div>

								<div className="mt-4 flex items-center justify-between">
									<div>
										<div className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>₹{m.price.toLocaleString()}</div>
										<div className="text-xs air-muted">per person</div>
									</div>
									<button className="px-4 py-2 border rounded" style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}>View Plan</button>
								</div>
							</div>
						</div>
					))}
				</div>

			</div>
		</div>
	);
}
