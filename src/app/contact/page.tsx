'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
	const operatorPhone = '+917025803160';
	const whatsappLink = `https://wa.me/917025803160`;
	const insta = 'https://instagram.com/planmykerala';
	const fb = 'https://facebook.com/planmykerala';
	const [chatOpen, setChatOpen] = useState(false);
	const [msg, setMsg] = useState('');

	const handleMail = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const name = (form.querySelector('[name=name]') as HTMLInputElement).value || '';
		const email = (form.querySelector('[name=email]') as HTMLInputElement).value || '';
		const message = (form.querySelector('[name=message]') as HTMLTextAreaElement).value || '';
		const mailto = `mailto:info@planmykerala.com?subject=${encodeURIComponent('Website Enquiry from ' + name)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`)}`;
		window.location.href = mailto;
	};

	const sendChatToWhatsApp = () => {
		if (!msg.trim()) return;
		const text = encodeURIComponent(msg);
		window.open(`https://wa.me/917025803160?text=${text}`, '_blank');
	};

	return (
		<main className="relative min-h-screen py-12 px-4">
			<div className="absolute inset-0 -z-20 air-hero-bg pointer-events-none" aria-hidden />
			<div className="absolute -left-16 top-12 -z-10 h-48 w-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.12)' }} aria-hidden />
			<div className="absolute right-10 top-16 -z-10 h-56 w-56 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,0,0,0.05)' }} aria-hidden />

			<div className="max-w-6xl mx-auto space-y-10 relative z-10">
				<section className="air-card p-6 sm:p-10 relative overflow-hidden">
					<div className="absolute -right-10 -top-16 h-40 w-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(14,165,107,0.12)' }} aria-hidden />
					<div className="absolute -left-12 bottom-0 h-44 w-44 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(0,0,0,0.05)' }} aria-hidden />
					<div className="relative grid gap-8 lg:grid-cols-3 items-start">
						<div className="lg:col-span-2 space-y-3">
							<p className="inline-flex items-center gap-2 px-3 py-1 rounded-full air-pill text-xs font-semibold uppercase tracking-wide">Local DMC • Kerala only</p>
							<h1 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--pmk-text)' }}>Talk to a human who knows Kerala end-to-end</h1>
							<p className="text-lg air-muted max-w-2xl">Fast answers on dates, budgets, vehicles, and halal-friendly or family itineraries. We reply in under 10 minutes during working hours.</p>
							<div className="flex flex-wrap gap-2 text-xs" style={{ color: 'var(--pmk-text)' }}>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">Drive-time realistic</span>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">WhatsApp-first support</span>
								<span className="inline-flex items-center gap-1 air-pill px-3 py-1">Japan + GCC guests</span>
							</div>
						</div>
						<div className="air-card p-4 sm:p-5 space-y-3">
							<div className="text-sm air-muted">Call / WhatsApp</div>
							<div className="text-2xl font-bold" style={{ color: 'var(--pmk-accent)' }}>{operatorPhone}</div>
							<div className="text-xs air-muted">V K Balagopal, PlanMyKerala</div>
							<div className="flex gap-2 mt-2">
								<a
									href={whatsappLink}
									className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl py-2.5 font-semibold shadow-md"
									style={{ background: 'var(--pmk-accent)', color: '#ffffff', border: '1px solid var(--pmk-accent)' }}
									target="_blank"
									rel="noreferrer"
								>
									WhatsApp now
								</a>
								<a href={`tel:${operatorPhone}`} className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] py-2.5 font-semibold text-[var(--pmk-text)]">Call</a>
							</div>
							<div className="text-xs air-muted">Instagram <a className="font-semibold" style={{ color: 'var(--pmk-accent)' }} href={insta} target="_blank" rel="noreferrer">@planmykerala</a> • Facebook <a className="font-semibold" style={{ color: 'var(--pmk-accent)' }} href={fb} target="_blank" rel="noreferrer">planmykerala</a></div>
						</div>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 air-card p-6 sm:p-8">
						<h2 className="text-xl font-bold mb-2" style={{ color: 'var(--pmk-text)' }}>Send us a message</h2>
						<p className="text-sm air-muted mb-4">Tell us dates, guests, and rough budget. We’ll send a draft plan with drive times and hotel tiers.</p>
						<form onSubmit={handleMail} className="space-y-4">
							<input
								name="name"
								placeholder="Your name"
								className="w-full p-3 rounded-xl bg-[var(--pmk-surface)] border border-[var(--pmk-border)] placeholder:air-muted focus:outline-none"
								style={{ color: 'var(--pmk-text)', caretColor: 'var(--pmk-text)', WebkitTextFillColor: 'var(--pmk-text)' }}
							/>
							<input
								name="email"
								placeholder="Email"
								className="w-full p-3 rounded-xl bg-[var(--pmk-surface)] border border-[var(--pmk-border)] placeholder:air-muted focus:outline-none"
								style={{ color: 'var(--pmk-text)', caretColor: 'var(--pmk-text)', WebkitTextFillColor: 'var(--pmk-text)' }}
							/>
							<textarea
								name="message"
								placeholder="Share dates, pickup/drop, travellers, budget"
								rows={5}
								className="w-full p-3 rounded-xl bg-[var(--pmk-surface)] border border-[var(--pmk-border)] placeholder:air-muted focus:outline-none"
								style={{ color: 'var(--pmk-text)', caretColor: 'var(--pmk-text)', WebkitTextFillColor: 'var(--pmk-text)' }}
							/>
							<div className="flex flex-wrap gap-3">
								<button type="submit" className="bg-[var(--pmk-text)] text-white py-3 px-5 rounded-xl font-semibold shadow-md">Send Email</button>
								<a className="px-4 py-3 border border-[var(--pmk-border)] rounded-xl text-sm font-semibold text-[var(--pmk-text)] bg-[var(--pmk-surface)]" href={whatsappLink} target="_blank" rel="noreferrer">Message on WhatsApp</a>
							</div>
						</form>
					</div>

					<div className="air-card p-6 sm:p-7 space-y-4">
						<h3 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Office hours</h3>
						<ul className="space-y-2 text-sm air-muted">
							<li>Mon–Sat: 9:00 AM – 8:00 PM IST</li>
							<li>Sun: 10:00 AM – 2:00 PM IST</li>
							<li>Typical reply: &lt; 10 minutes on WhatsApp</li>
						</ul>
						<div className="p-3 rounded-xl text-sm" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', color: 'var(--pmk-text)', border: '1px solid var(--pmk-border)' }}>Need Japanese or Arabic support? Mention it and we’ll route to the right planner.</div>
						<div className="text-sm air-muted">
							Prefer a quick chat? <button onClick={() => setChatOpen(true)} className="font-semibold underline" style={{ color: 'var(--pmk-accent)' }}>Open mini chat</button>
						</div>
					</div>
				</section>

				<section className="air-card p-6 sm:p-8">
					<h3 className="text-lg font-bold mb-3" style={{ color: 'var(--pmk-text)' }}>Where we help fastest</h3>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm air-muted">
						<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">Dates & drive-time feasibility</div>
						<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">Budget tiers (3★ / 4★ / 5★)</div>
						<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">Vehicles (sedan, SUV, tempo, coach)</div>
						<div className="rounded-2xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">Special requests (halal, kids, honeymoon)</div>
					</div>
					<p className="mt-4 text-xs air-muted">We reply with a ready draft itinerary link you can tweak instantly.</p>
				</section>

				<p className="text-sm air-muted text-center">Prefer human chat? Use the floating chat to ping us on WhatsApp or email.</p>
				<p className="text-sm air-muted text-center">
					<Link href="/" className="font-semibold hover:underline" style={{ color: 'var(--pmk-accent)' }}>← Back to home</Link>
				</p>
			</div>

			{/* Chatbot / quick message floating */}
			<div className="fixed bottom-6 right-6 z-50">
				{!chatOpen && (
					<button
						onClick={() => setChatOpen(true)}
						className="group flex items-center gap-2 rounded-full border border-[var(--pmk-accent)] bg-[var(--pmk-accent)] px-4 py-3 text-white shadow-lg transition hover:shadow-[var(--pmk-shadow-hover)]"
						aria-label="Chat with us"
					>
						<img
							src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
							alt="WhatsApp"
							className="h-5 w-5"
						/>
						<span className="text-sm font-semibold">Chat</span>
					</button>
				)}

				{chatOpen && (
					<div className="w-80 air-card p-4 shadow-[var(--pmk-shadow-card)]">
						<div className="flex items-center justify-between border-b border-[var(--pmk-border)] pb-2 mb-3">
							<div className="flex items-center gap-2">
								<img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="h-4 w-4" />
								<div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>Quick Chat</div>
							</div>
							<button onClick={() => setChatOpen(false)} className="text-xs font-semibold air-muted">Close</button>
						</div>
						<textarea
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							rows={4}
							placeholder="Type your question..."
							className="w-full p-2.5 border border-[var(--pmk-border)] bg-[var(--pmk-surface)] placeholder:air-muted rounded-xl mb-3"
							style={{ color: 'var(--pmk-text)', caretColor: 'var(--pmk-text)', WebkitTextFillColor: 'var(--pmk-text)' }}
						/>
						<div className="flex gap-2">
							<button onClick={sendChatToWhatsApp} className="flex-1 bg-[var(--pmk-accent)] text-white py-2 rounded-xl text-sm font-semibold">Send to WhatsApp</button>
							<a className="px-3 py-2 border border-[var(--pmk-border)] rounded-xl text-sm font-semibold text-[var(--pmk-text)] bg-[var(--pmk-surface)]" href={`mailto:info@planmykerala.com?subject=${encodeURIComponent('Chat enquiry')}`} onClick={() => setChatOpen(false)}>Email</a>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}