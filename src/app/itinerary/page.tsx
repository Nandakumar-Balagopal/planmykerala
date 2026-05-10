'use client';
import React from 'react';
import Link from 'next/link';

export default function ItineraryPage() {
  // WhatsApp configuration
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const whatsappMessage = encodeURIComponent("Hi, I'd like to plan a Kerala trip with a custom itinerary");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[var(--pmk-bg)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="air-card p-8 sm:p-12 text-center">
          {/* Lock Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-6" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 15%, var(--pmk-bg))' }}>
            <svg className="h-10 w-10" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--pmk-text)' }}>
            Itinerary Builder Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg air-muted mb-8 max-w-xl mx-auto">
            We're working hard to bring you our advanced itinerary builder. In the meantime, our Kerala travel experts are ready to create your perfect trip plan!
          </p>

          {/* Features List */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--pmk-surface)' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Personalized Planning</div>
                <div className="text-sm air-muted">Custom itineraries based on your preferences</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--pmk-surface)' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Instant Quotes</div>
                <div className="text-sm air-muted">Get pricing within minutes</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--pmk-surface)' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Local Expertise</div>
                <div className="text-sm air-muted">Kerala-only specialists</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--pmk-surface)' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--pmk-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>24/7 Support</div>
                <div className="text-sm air-muted">Available on WhatsApp anytime</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white hover:bg-[#20BA5A] transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
            
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-8 py-4 text-base font-semibold text-[var(--pmk-text)] hover:bg-[var(--pmk-surface)] transition-all"
            >
              Back to Home
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-[var(--pmk-border)]">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm air-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--pmk-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>500+ Happy Travelers</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--pmk-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Local DMC in Kochi</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--pmk-accent)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Instant Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
