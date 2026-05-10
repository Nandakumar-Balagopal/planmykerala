'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Profile = {
  supabase_user_id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  company?: string;
  role?: 'user' | 'partner' | 'admin';
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export default function AdminDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        router.replace('/b2b/signin?return=/admin');
        return;
      }
      try {
        const resp = await fetch(`${backendUrl}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!resp.ok) throw new Error('Unable to load profile');
        const json = await resp.json();
        setProfile(json as Profile);
      } catch (err: any) {
        setError(err?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const isAdmin = useMemo(() => profile?.role === 'admin', [profile]);

  if (loading) {
    return (
      <main className="min-h-screen bg-emerald-50/40 flex items-center justify-center text-gray-900">
        <div className="text-sm font-semibold text-emerald-800">Checking your access…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-emerald-50/40 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white shadow-md border border-emerald-100 p-6 text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">Could not load admin</h1>
          <p className="text-sm text-gray-700">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-emerald-50/40 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white shadow-md border border-amber-100 p-6 text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">Not authorized</h1>
          <p className="text-sm text-gray-700">You need an admin account to access this dashboard.</p>
          <button
            onClick={() => router.replace('/b2b/signin?return=/admin')}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
          >
            Sign in as admin
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
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold">Admin</p>
            <h1 className="text-3xl font-bold mt-2">Control center</h1>
            <p className="text-sm text-gray-700 mt-1">Manage partners, itineraries, and pricing.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm text-sm text-gray-800">
            <div className="font-semibold">{profile?.full_name || profile?.email}</div>
            <div className="text-gray-600">Role: Admin</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Partners</p>
            <h3 className="text-2xl font-bold mt-2">—</h3>
            <p className="text-sm text-gray-600">Coming soon: approve partners & roles.</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Itineraries</p>
            <h3 className="text-2xl font-bold mt-2">—</h3>
            <p className="text-sm text-gray-600">Coming soon: review drafts & bookings.</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Pricing</p>
            <h3 className="text-2xl font-bold mt-2">—</h3>
            <p className="text-sm text-gray-600">Coming soon: manage rates & vehicles.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
