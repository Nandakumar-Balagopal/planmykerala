import React from 'react';

const CTA: React.FC = () => {
    return (
        <div className="air-card p-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Plan with a local DMC</p>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--pmk-text)' }}>Ready to plan your Kerala adventure?</h2>
            <p className="mb-4 air-muted">Join us for an unforgettable experience tailored just for you.</p>
            <a href="/itinerary" className="inline-flex items-center justify-center rounded-full bg-[var(--pmk-accent)] text-white font-semibold py-2 px-4 hover:bg-[var(--pmk-accent-deep)] transition">
                Start building your itinerary
            </a>
        </div>
    );
};

export default CTA;