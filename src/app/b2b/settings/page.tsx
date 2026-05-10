'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import CustomSelect from '../../../components/CustomSelect';

interface B2BPartner {
  id: number;
  profile_id: string;
  company_name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  font_family?: string;
  hotel_margin_percent?: number;
  vehicle_margin_percent?: number;
  activity_margin_percent?: number;
  markup_strategy?: string;
  custom_terms?: string;
}

export default function B2BSettingsPage() {
  const [partner, setPartner] = useState<B2BPartner | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    logo_url: '',
    primary_color: '#10b981',
    secondary_color: '#0f766e',
    font_family: 'sans',
    hotel_margin_percent: 0,
    vehicle_margin_percent: 0,
    activity_margin_percent: 0,
    markup_strategy: 'percentage',
    custom_terms: '',
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

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
    if (!token) return;
    fetchPartner();
  }, [token]);

  const fetchPartner = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/b2b/partner/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        setPartner(data);
        setFormData(data);
      } else if (res.status === 404) {
        setIsCreating(true);
      }
    } catch (err) {
      console.error('Failed to fetch partner', err);
      setMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('margin') || name === 'activity_margin_percent' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!token) {
      setMessage('Not authenticated');
      return;
    }
    setSaving(true);
    try {
      const method = partner ? 'PUT' : 'POST';
      const endpoint = `${backendUrl}/api/b2b/partner/`;
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setPartner(data);
        setIsCreating(false);
        setMessage('✓ Settings saved');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.detail || 'Save failed'}`);
      }
    } catch (err) {
      console.error('Save error', err);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--pmk-bg)' }}>
        <p className="air-muted">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative">
      <div className="absolute inset-0 -z-20 air-hero-bg pointer-events-none" aria-hidden />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pmk-text)' }}>B2B Partner Settings</h1>
          <p className="air-muted mt-2">Customize your white-label branding and set pricing margins.</p>
        </div>

        <div className="air-card p-8 space-y-8">
          {/* Company Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Company Profile</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Logo URL</label>
                <input
                  type="url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
                  placeholder="https://example.com/logo.png"
                />
                {formData.logo_url && <img src={formData.logo_url} alt="Logo preview" className="mt-2 h-12 w-auto" />}
              </div>
            </div>
          </section>

          {/* Branding */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Brand Customization</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="h-10 w-16 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.primary_color}
                    onChange={(e) => handleInputChange({ ...e, target: { ...e.target, name: 'primary_color' } } as any)}
                    className="flex-1 rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleInputChange}
                    className="h-10 w-16 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.secondary_color}
                    onChange={(e) => handleInputChange({ ...e, target: { ...e.target, name: 'secondary_color' } } as any)}
                    className="flex-1 rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Font Family</label>
                <CustomSelect
                  value={formData.font_family}
                  onChange={(value) => setFormData((prev) => ({ ...prev, font_family: value }))}
                  options={[
                    { value: 'sans', label: 'Sans Serif' },
                    { value: 'serif', label: 'Serif' },
                    { value: 'mono', label: 'Monospace' },
                  ]}
                  buttonClassName="bg-[var(--pmk-bg)]"
                />
              </div>
            </div>
          </section>

          {/* Pricing Margins */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Pricing Margins</h2>
            <p className="text-sm air-muted">Set markup percentages applied to base prices for your clients.</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Hotel Margin (%)</label>
                <input
                  type="number"
                  name="hotel_margin_percent"
                  value={formData.hotel_margin_percent}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="mt-1 text-xs air-muted">Base: ₹5000 → Your price: ₹{(5000 * (1 + (formData.hotel_margin_percent || 0) / 100)).toFixed(0)}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Vehicle Margin (%)</label>
                <input
                  type="number"
                  name="vehicle_margin_percent"
                  value={formData.vehicle_margin_percent}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="mt-1 text-xs air-muted">Base: ₹3000 → Your price: ₹{(3000 * (1 + (formData.vehicle_margin_percent || 0) / 100)).toFixed(0)}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--pmk-text)' }}>Activity Margin (%)</label>
                <input
                  type="number"
                  name="activity_margin_percent"
                  value={formData.activity_margin_percent}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="mt-1 text-xs air-muted">Base: ₹1000 → Your price: ₹{(1000 * (1 + (formData.activity_margin_percent || 0) / 100)).toFixed(0)}</p>
              </div>
            </div>
          </section>

          {/* Custom Terms */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--pmk-text)' }}>Custom Terms & Notes</h2>
            <textarea
              name="custom_terms"
              value={formData.custom_terms}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-lg border border-[var(--pmk-border)] bg-[var(--pmk-bg)] px-4 py-2 focus:outline-none"
              placeholder="E.g., Cancellation policy, special requirements, or terms your clients should know."
            />
          </section>

          {/* Status and Save */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-semibold ${message.startsWith('✓') ? '' : ''}`}
              style={{
                background: message.startsWith('✓') ? 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))' : '#fee2e2',
                color: message.startsWith('✓') ? 'var(--pmk-text)' : '#991b1b',
                border: '1px solid var(--pmk-border)'
              }}
            >
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-lg bg-[var(--pmk-accent)] text-white font-semibold py-3 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            {partner && (
              <button
                onClick={() => window.print()}
                className="flex-1 rounded-lg border border-[var(--pmk-border)] text-[var(--pmk-text)] font-semibold py-3"
              >
                Export Settings
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {partner && (
          <div className="mt-8 air-card p-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pmk-text)' }}>Preview</h2>
            <div
              style={{
                borderColor: formData.primary_color || '#10b981',
                backgroundColor: `${formData.primary_color}15`,
              } as React.CSSProperties}
              className="rounded-lg border-2 p-6"
            >
              <p className="font-bold text-2xl" style={{ color: formData.primary_color || '#10b981' }}>
                {formData.company_name || 'Your Company'}
              </p>
              <p className="mt-2 air-muted">Your itineraries will now appear under this branding when launched via B2B channel.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
