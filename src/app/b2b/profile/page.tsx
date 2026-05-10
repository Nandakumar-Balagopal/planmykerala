'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface PartnerProfile {
  company_name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  hotel_margin_percent?: number;
  vehicle_margin_percent?: number;
  activity_margin_percent?: number;
  custom_terms?: string;
}

interface UserProfile {
  full_name?: string;
  email?: string;
  role?: string;
  customer_type?: string;
  company?: string;
}

export default function B2BProfilePage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setToken(data.session?.access_token ?? null);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${backendUrl}/api/me/`, { headers }).then((res) => (res.ok ? res.json() : null)).catch(() => null),
      fetch(`${backendUrl}/api/b2b/partner/`, { headers }).then((res) => (res.ok ? res.json() : null)).catch(() => null),
    ]).then(([meData, partnerData]) => {
      setProfile(meData);
      setPartner(partnerData);
      setLoading(false);
    });
  }, [token, backendUrl]);

  const branding = useMemo(() => {
    return {
      primary: partner?.primary_color || '#10b981',
      secondary: partner?.secondary_color || '#0f766e',
      company: partner?.company_name || profile?.company || 'Your B2B Brand',
      logo: partner?.logo_url,
    };
  }, [partner, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--pmk-bg)' }}>
        <p className="text-sm air-muted">Loading partner profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 -z-20 air-hero-bg pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 relative z-10">
        <header className="air-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>
                B2B Partner Profile
              </p>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--pmk-text)' }}>{branding.company}</h1>
              <p className="text-sm air-muted">Manage your trade identity, pricing strategy, and white-label itinerary experience.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/b2b/settings" className="rounded-full border border-[var(--pmk-border)] bg-[var(--pmk-surface)] text-[var(--pmk-text)] px-4 py-2 text-sm font-semibold">
                Edit Brand Settings
              </Link>
              <Link href="/itinerary?wizard=done&channel=b2b" className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow" style={{ backgroundColor: 'var(--pmk-accent)' }}>
                Open B2B Planner
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="air-card p-6 space-y-5">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Brand Card</h2>
            <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})` }}>
              <div className="flex items-center gap-4">
                {branding.logo ? (
                  <img src={branding.logo} alt={branding.company} className="h-14 w-14 rounded-xl border border-white/40 object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-xl border border-white/40 bg-white/20 flex items-center justify-center text-xl font-bold">
                    {branding.company.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/85">White-label identity</p>
                  <p className="text-2xl font-bold leading-tight">{branding.company}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/90">This branding is used on B2B itinerary pages for your clients and internal operations.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
                <p className="text-xs air-muted">Profile Name</p>
                <p className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{profile?.full_name || 'Not set'}</p>
              </div>
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
                <p className="text-xs air-muted">Email</p>
                <p className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{profile?.email || 'Not set'}</p>
              </div>
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
                <p className="text-xs air-muted">Role</p>
                <p className="font-semibold uppercase" style={{ color: 'var(--pmk-text)' }}>{profile?.role || 'partner'}</p>
              </div>
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
                <p className="text-xs air-muted">Segment</p>
                <p className="font-semibold uppercase" style={{ color: 'var(--pmk-text)' }}>{profile?.customer_type || 'b2b'}</p>
              </div>
            </div>
          </div>

          <div className="air-card p-6 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Markup Strategy</h2>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4 flex items-center justify-between">
                <span className="air-muted">Hotel Margin</span>
                <span className="font-bold" style={{ color: 'var(--pmk-text)' }}>{partner?.hotel_margin_percent ?? 0}%</span>
              </div>
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4 flex items-center justify-between">
                <span className="air-muted">Vehicle Margin</span>
                <span className="font-bold" style={{ color: 'var(--pmk-text)' }}>{partner?.vehicle_margin_percent ?? 0}%</span>
              </div>
              <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4 flex items-center justify-between">
                <span className="air-muted">Activity Margin</span>
                <span className="font-bold" style={{ color: 'var(--pmk-text)' }}>{partner?.activity_margin_percent ?? 0}%</span>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-surface)] p-4">
              <p className="text-xs air-muted mb-1">Custom Terms</p>
              <p className="text-sm air-muted whitespace-pre-wrap">{partner?.custom_terms || 'No custom terms set yet. Add terms in settings to include them in B2B quotes.'}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
