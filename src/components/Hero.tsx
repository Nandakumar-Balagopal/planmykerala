import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="air-card p-8 flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Kerala in a few clicks</p>
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--pmk-text)' }}>Discover Kerala like never before</h1>
            <p className="text-lg mb-6 air-muted">
                Plan your perfect trip with our dynamic itinerary builder and explore the beauty of Kerala.
            </p>
            <button className="bg-[var(--pmk-text)] px-6 py-3 rounded-md text-white font-semibold">
                Start planning
            </button>
            <div className="mt-8">
                <img
                    src="/images/kerala-illustration.svg"
                    alt="Kerala Illustration"
                    className="w-full max-w-md"
                />
            </div>
        </section>
    );
};

export default Hero;