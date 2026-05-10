'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function B2BSignIn() {
  const router = useRouter();
  const params = useSearchParams();
  const modeParam = params?.get('mode');
  const returnTo = params?.get('return');
  const [mode, setMode] = useState<'signin' | 'signup'>(modeParam === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
      }
      // keep users on B2B after auth; only honor explicit return param
      router.push(returnTo || '/b2b');
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong';
      // If the user already exists, guide them to sign in instead of sign up
      if (mode === 'signup' && msg.toLowerCase().includes('registered')) {
        setMode('signin');
        setError('Account already exists. Please sign in.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 -z-10 air-hero-bg" aria-hidden />
      <div className="relative z-10 w-full max-w-md air-card p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--pmk-accent)' }}>Partner access</p>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--pmk-text)' }}>{mode === 'signin' ? 'Sign in to your B2B workspace' : 'Create your B2B workspace'}</h1>
          <p className="text-sm air-muted">White-labeled Kerala itineraries and on-ground execution under your brand.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }} htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-3 text-sm focus:outline-none"
              placeholder="you@agency.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }} htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-3 text-sm focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={()=>setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-semibold"
              style={{ color: 'var(--pmk-accent)' }}
            >
              {mode === 'signin' ? 'Create account' : 'Have an account? Sign in'}
            </button>
            <Link href="/contact" className="font-semibold" style={{ color: 'var(--pmk-accent)' }}>Need access?</Link>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-[var(--pmk-accent)] text-white font-semibold px-4 py-3 shadow-[var(--pmk-shadow-hover)] disabled:opacity-60"
          >
            {loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Create account')}
          </button>
        </form>
        <div className="text-sm text-center air-muted">
          New to PlanMyKerala B2B? <Link href="/contact" className="font-semibold" style={{ color: 'var(--pmk-accent)' }}>Talk to partnerships</Link>
        </div>
      </div>
    </main>
  );
}
