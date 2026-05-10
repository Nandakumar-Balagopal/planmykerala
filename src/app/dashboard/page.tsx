"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Itinerary = {
  id: string;
  traveler_name?: string | null;
  traveler_email?: string | null;
  user_name?: string | null;
  start_date?: string | null;
  total_price?: number | null;
  status?: string | null;
  finalized_asset_url?: string | null;
  masked_planner_phone?: string | null;
  masked_planner_email?: string | null;
  masked_driver_phone?: string | null;
  masked_driver_email?: string | null;
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8001';

export default function Dashboard() {
  const router = useRouter();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setError(null);
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setError('Please sign in to view your itineraries.');
        setLoading(false);
        return;
      }
      try {
        const resp = await fetch(`${backendUrl}/api/itineraries/mine`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!resp.ok) throw new Error('Failed to load itineraries');
        const json = await resp.json();
        if (!mounted) return;
        setItineraries(Array.isArray(json) ? json : []);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || 'Could not load itineraries');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const hasItems = useMemo(() => itineraries.length > 0, [itineraries]);

  if (loading) {
    return (
      <main className="min-h-screen bg-emerald-50/40 flex items-center justify-center text-gray-900">
        <div className="text-sm font-semibold text-emerald-800">Loading your itineraries…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-emerald-50/40 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white shadow-md border border-amber-100 p-6 text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">Trouble loading itineraries</h1>
          <p className="text-sm text-gray-700">{error}</p>
          <button
            onClick={() => router.replace('/b2b/signin?return=/dashboard')}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
          >
            Sign in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-white text-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold">My itineraries</p>
            <h1 className="text-3xl font-bold mt-2">Drafts and trips</h1>
            <p className="text-sm text-gray-700 mt-1">See your drafts, status, and download white-label assets.</p>
          </div>
          <button
            onClick={() => router.refresh()}
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-emerald-50"
          >
            Refresh
          </button>
        </header>

        {!hasItems && (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center text-gray-700">
            <p className="text-lg font-semibold text-gray-900">No itineraries yet</p>
            <p className="mt-2 text-sm">Generate a plan from the itinerary builder or share a brief to get started.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/itinerary?wizard=done&channel=b2b')}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-28px_rgba(16,185,129,0.7)] hover:bg-emerald-700"
              >
                Start a draft
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-emerald-50"
              >
                Talk to a planner
              </button>
            </div>
          </div>
        )}

        {hasItems && (
          <div className="grid gap-6 md:grid-cols-2">
            {itineraries.map((itinerary) => (
              <article key={itinerary.id} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{itinerary.traveler_name || itinerary.user_name || 'Itinerary'}</h2>
                    {itinerary.traveler_email && (
                      <p className="text-sm text-gray-600">{itinerary.traveler_email}</p>
                    )}
                    {itinerary.start_date && (
                      <p className="text-sm text-gray-700 mt-1">Start: {new Date(itinerary.start_date).toLocaleDateString()}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-100">
                    {itinerary.status || 'draft'}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>Planner: {itinerary.masked_planner_email || itinerary.masked_planner_phone || 'Assigned soon'}</p>
                  <p>Driver: {itinerary.masked_driver_phone || itinerary.masked_driver_email || 'Assigned closer to travel'}</p>
                  {itinerary.total_price != null && (
                    <p className="font-semibold text-gray-900">Estimate: ₹{itinerary.total_price}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push(`/itinerary?wizard=done&channel=b2b&start=${itinerary.start_date ?? ''}`)}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-emerald-50"
                  >
                    View / edit draft
                  </button>
                  {itinerary.finalized_asset_url && (
                    <a
                      href={itinerary.finalized_asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_36px_-18px_rgba(16,185,129,0.65)] hover:bg-emerald-700"
                    >
                      Download itinerary
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
