'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CustomSelect from '../CustomSelect';

type Room = { adults: number; children: number; childAges?: number[] };

function toISO(d: Date) {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
}

export default function ItineraryWizard({ initialGuests, initialDates, initialChannel }: { initialGuests?: string, initialDates?: { start: string, end: string }, initialChannel?: 'b2b' | 'b2c' }) {
  const router = useRouter();
  const channel: 'b2b' | 'b2c' = initialChannel ?? 'b2c';
  const isB2B = channel === 'b2b';

  // initial guest count from query
  const initialTotal = Number(initialGuests ?? 4);
  const initialGuestCount = initialTotal;

  const buildRoomsFromTotal = (total: number): Room[] => {
    const rooms: Room[] = [];
    let remaining = Math.max(1, total);
    while (remaining > 0) {
      const adults = Math.min(2, remaining);
      rooms.push({ adults, children: 0, childAges: [] });
      remaining -= adults;
    }
    return rooms;
  };

  const initialRooms = useMemo<Room[]>(() => buildRoomsFromTotal(initialTotal), [initialTotal]);

  // wizard state
  // Steps: 1=Travellers, 2=Preferences(Dates+Loc), 3=Destinations, 4=Finalize
  const [step, setStep] = useState<number>(1);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  // pickup/drop
  const LOCATIONS = ['Cochin', 'Trivandrum', 'Kozhikode', 'Kollam', 'Other (custom)'];
  const [pickup, setPickup] = useState<string>(LOCATIONS[0]);
  const [drop, setDrop] = useState<string>(LOCATIONS[0]);
  const [pickupCustom, setPickupCustom] = useState('');
  const [dropCustom, setDropCustom] = useState('');

  // calendar state
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [startDate, setStartDate] = useState<string | null>(initialDates?.start || null);
  const [endDate, setEndDate] = useState<string | null>(initialDates?.end || null);

  // destinations
  const CITIES = [
    { id:'kochi', title:'Kochi', img:'https://images.unsplash.com/photo-1596521422413-a0899a53d885?w=600&h=400&fit=crop', region:'Central', description:'Port city with heritage lanes', bestSeasons: ['winter', 'post-monsoon'] },
    { id:'munnar', title:'Munnar', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', region:'Hills', description:'Tea gardens and cool climate', bestSeasons: ['summer', 'monsoon'] },
    { id:'alleppey', title:'Alleppey', img:'https://images.unsplash.com/photo-1567359781514-3b963ff6be15?w=600&h=400&fit=crop', region:'Backwaters', description:'Houseboats and lagoons', bestSeasons: ['winter', 'post-monsoon'] },
    { id:'thekkady', title:'Thekkady', img:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop', region:'Wildlife', description:'Periyar wildlife reserve', bestSeasons: ['winter', 'summer'] }
  ];

  const EXTENDED_DESTINATIONS = [
    { id:'ooty', title:'Ooty', img:'https://images.unsplash.com/photo-1548014791-53dd6b8801f6?w=600&h=400&fit=crop', region:'Nilgiris', description:'Cool hill station escapes', bestSeasons: ['summer'] },
    { id:'mysore', title:'Mysore', img:'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop', region:'Karnataka', description:'Palace city with heritage charm', bestSeasons: ['summer'] },
  ];
  const [selectedCities, setSelectedCities] = useState<string[]>(['munnar','alleppey']);

  // finalize
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // vehicle & hotel types (placeholders for logic if needed)
  const [vehicleType, setVehicleType] = useState('');
  const [hotelType, setHotelType] = useState('');
  const [errors, setErrors] = useState<{ travellers?: string; dates?: string; destinations?: string }>({});

  const hasContactInput = Boolean(
    (name && name.trim()) ||
    (phone && phone.trim()) ||
    (email && email.trim())
  );

  // create itinerary with prices
  const createWithPrices = async () => {
    if (phone && phone.replace(/\D/g, '').length > 0 && phone.replace(/\D/g, '').length < 6) {
      alert('Enter a valid phone number');
      return;
    }
    const cfg = {
      rooms,
      startDate,
      endDate,
      cities: selectedCities,
      name,
      phone,
      email,
      vehicleType,
      hotelType,
    };
    try {
      sessionStorage.setItem('pmk_tripConfig', JSON.stringify(cfg));
    } catch { /* ignore */ }
    
    await new Promise((r) => setTimeout(r, 300));
    const params = new URLSearchParams();
    params.set('wizard', 'done');
    params.set('channel', channel);
    if (startDate) params.set('start', startDate);
    if (endDate) params.set('end', endDate);
    router.push(`/itinerary?${params.toString()}`);
  };
  
  // animation & submission states
  const [contentVisible, setContentVisible] = useState(true);
  const [animDirection, setAnimDirection] = useState<number>(1);
  const [showSkipModal, setShowSkipModal] = useState(false);

  // hydrate defaults
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sess = sessionStorage.getItem('pmk_tripConfig');
    if (sess) {
      try {
        const cfg = JSON.parse(sess);
        if (cfg.startDate) setStartDate(cfg.startDate);
        if (cfg.endDate) setEndDate(cfg.endDate);
        if (cfg.cities) setSelectedCities(cfg.cities);
        if (cfg.rooms) setRooms(cfg.rooms);
        if (cfg.name) setName(cfg.name);
      } catch { /* ignore parse errors */ }
    } else {
      const qsStart = initialDates?.start;
      const qsEnd = initialDates?.end;
      if (qsStart && qsEnd) {
        setStartDate(qsStart);
        setEndDate(qsEnd);
      }
    }
  }, [initialDates]);

  // helpers: rooms
  const totalGuests = rooms.reduce((s,r)=> s + r.adults + r.children, 0);
  const updateRoom = (idx:number, patch:Partial<Room>) => setRooms(prev => prev.map((r,i)=> i===idx ? {...r, ...patch} : r));
  const addRoom = (adults:number = 1) => setRooms(prev => [...prev, {adults: Math.min(2, Math.max(1, adults)), children:0, childAges: [] }]);
  const removeRoom = (idx:number) => setRooms(prev => {
    if (prev.length <= 1) return prev; // keep at least one room
    return prev.filter((_,i)=>i!==idx);
  });

  const validateTravellers = (): boolean => {
    for (const r of rooms) {
      if (r.children > 0) {
        const ages = r.childAges || [];
        if (ages.length !== r.children) return false;
        for (let i=0;i<r.children;i++) {
          const a = ages[i];
          if (typeof a !== 'number' || isNaN(a)) return false;
        }
      }
    }
    return true;
  };

  const canProceedTravellers = totalGuests > 0 && validateTravellers();
  const canProceedDates = Boolean(startDate && endDate);
  const canProceedDestinations = selectedCities.length > 0;

  const getSeasonKey = () => {
    const ref = startDate ? new Date(startDate) : new Date();
    const month = ref.getMonth();
    if (month === 11 || month <= 1) return 'winter';
    if (month >= 2 && month <= 4) return 'summer';
    if (month >= 5 && month <= 8) return 'monsoon';
    return 'post-monsoon';
  };

  const currentSeason = getSeasonKey();
  const seasonalDestinations = CITIES.filter((c) => c.bestSeasons.includes(currentSeason));
  const otherDestinations = CITIES.filter((c) => !c.bestSeasons.includes(currentSeason));

  const toggleCity = (cityId: string, disabled: boolean) => {
    if (disabled) return;
    const updatedCities = selectedCities.includes(cityId)
      ? selectedCities.filter((city) => city !== cityId)
      : [...selectedCities, cityId];
    setSelectedCities(updatedCities);
  };

  const renderDestinationCard = (c: any, disabled: boolean) => {
    const sel = selectedCities.includes(c.id);
    return (
      <button
        key={c.id}
        onClick={() => toggleCity(c.id, disabled)}
        className={`group relative block overflow-hidden rounded-xl transition-all ${sel ? 'shadow-lg scale-[1.02]' : 'border hover:shadow-md'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} bg-white`}
        style={sel ? { boxShadow: '0 0 0 2px var(--pmk-accent)' } : { borderColor: 'var(--pmk-border)' }}
      >
        <div className="relative h-32 md:h-40">
          <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {sel && !disabled && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 20%, transparent)' }}>
              <div className="text-white rounded-full p-1 shadow-sm" style={{ background: 'var(--pmk-accent)' }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          )}
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: '#fff', background: 'rgba(15,23,42,0.8)' }}>Add-on route</span>
            </div>
          )}
        </div>
        <div className="p-3 text-center">
          <h3 className="font-bold" style={{ color: sel ? 'var(--pmk-accent)' : 'var(--pmk-text)' }}>{c.title}</h3>
          <p className="text-[11px] air-muted mt-1">{c.region}</p>
        </div>
      </button>
    );
  };

  // calendar helpers
  const cellsFor = (m:Date) => {
    const firstDay = new Date(m.getFullYear(), m.getMonth(), 1);
    const startWeekDay = firstDay.getDay();
    const daysInMonth = new Date(m.getFullYear(), m.getMonth()+1, 0).getDate();
    const cells:(Date|null)[] = [];
    for (let i=0;i<startWeekDay;i++) cells.push(null);
    for (let d=1; d<=daysInMonth; d++) cells.push(new Date(m.getFullYear(), m.getMonth(), d));
    while (cells.length < 42) cells.push(null);
    return cells;
  };

  const animateToStep = (targetStep:number, direction:number) => {
    setAnimDirection(direction);
    setContentVisible(false);
    window.setTimeout(()=> {
      setStep(targetStep);
      window.setTimeout(()=> setContentVisible(true), 20);
    }, 220);
  };

  // navigation logic
  const next = () => {
    if (step === 1) {
      if (!canProceedTravellers) {
        setErrors({ travellers: 'Add at least one traveller and ages for all children.' });
        return;
      }
      setErrors((prev) => ({ ...prev, travellers: undefined }));
      animateToStep(2, 1);
      return;
    }
    if (step === 2) {
      if (!canProceedDates) {
        setErrors((prev) => ({ ...prev, dates: 'Select your start and end dates to continue.' }));
        return;
      }
      setErrors((prev) => ({ ...prev, dates: undefined }));
      animateToStep(3, 1);
      return;
    }
    if (step === 3) {
      if (!canProceedDestinations) {
        setErrors((prev) => ({ ...prev, destinations: 'Pick at least one destination.' }));
        return;
      }
      setErrors((prev) => ({ ...prev, destinations: undefined }));
      animateToStep(4, 1);
      return;
    }
  };
  
  const back = () => animateToStep(Math.max(1, step-1), -1);

  // finalize skip modal actions
  const buildItineraryUrl = (opts?: { skip?: boolean }) => {
    const params = new URLSearchParams();
    params.set('wizard', 'done');
    params.set('channel', channel);
    if (opts?.skip) params.set('skip', '1');
    if (startDate) params.set('start', startDate);
    if (endDate) params.set('end', endDate);
    return `/itinerary?${params.toString()}`;
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    router.push(buildItineraryUrl({ skip: true }));
  };

  const goToPartnerAuth = (mode: 'signin' | 'signup') => {
    const returnTo = buildItineraryUrl();
    const authPath = '/b2b/signin';
    const params = new URLSearchParams();
    params.set('return', returnTo);
    if (mode === 'signup') params.set('mode', 'signup');
    router.push(`${authPath}?${params.toString()}`);
  };

  // Step Labels
  const STEP_LABELS = ['Travellers', 'Preferences', 'Destinations', 'Finalize'];
  const stepTitle = STEP_LABELS[step-1];
  const nextEnabled = step === 1 ? canProceedTravellers : step === 2 ? canProceedDates : step === 3 ? canProceedDestinations : true;

  // animation classes
  const contentBase = 'transition-transform transition-opacity duration-300 ease-out';
  const enteringClass = contentVisible ? 'opacity-100 translate-x-0' : (animDirection === 1 ? 'opacity-0 translate-x-6' : 'opacity-0 -translate-x-6');

  return (
    <div className="min-h-screen relative z-0 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 -z-10 air-hero-bg pointer-events-none" aria-hidden />
      <div className="w-full max-w-5xl air-card overflow-hidden relative z-10">
        {channel === 'b2b' && (
          <div className="border-b px-6 py-3 text-sm font-semibold flex items-center justify-between" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 10%, var(--pmk-bg))', borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}>
            <span>White-label mode — partner workflow</span>
            <span className="text-xs air-muted">Client-facing names hidden until export</span>
          </div>
        )}

        {/* Header (Progress) */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pmk-border)' }}>
          <nav className="flex items-center gap-6 text-sm w-full" style={{ color: 'var(--pmk-text)' }}>
            {STEP_LABELS.map((label, i) => {
              const idx = i + 1;
              const active = idx === step;
              const done = idx < step;
              return (
                <div key={label} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={done || active
                        ? { background: 'var(--pmk-accent)', color: '#fff' }
                        : { background: 'var(--pmk-surface)', color: 'var(--pmk-text)', border: '1px solid var(--pmk-border)' }}
                    >
                      {done ? '✓' : idx}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider air-muted">Step {idx}</div>
                      <div className="text-sm font-semibold" style={{ color: active ? 'var(--pmk-text)' : 'var(--pmk-text-muted)' }}>{label}</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1 rounded" style={done || active ? { background: 'var(--pmk-accent)' } : { background: 'var(--pmk-border)' }} />
                </div>
              );
            })}
          </nav>
        </div>

        <div className="md:hidden text-center py-3 border-b" style={{ borderColor: 'var(--pmk-border)' }}>
          <div className="text-xs air-muted">Step {step} of {STEP_LABELS.length} — {stepTitle}</div>
        </div>

        {/* Content Area */}
        <div className={`px-6 py-6 md:py-8 ${contentBase} ${enteringClass}`}>
          {/* Step 1: Travellers */}
          {step === 1 && (
            <section>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--pmk-text)' }}>Who is travelling?</h3>
              <p className="text-sm air-muted mb-3">We split rooms into a maximum of 2 adults each.</p>
              <div className="text-sm air-muted mb-4">Initial guests from search: <span className="font-medium" style={{ color: 'var(--pmk-text)' }}>{initialGuestCount}</span></div>

              <div className="space-y-4">
                {rooms.map((room, i) => (
                  <div key={i} className="border rounded-xl p-4" style={{ borderColor: 'var(--pmk-border)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>Room {i + 1}</div>
                      {rooms.length > 1 && (
                        <button onClick={() => removeRoom(i)} className="text-sm" style={{ color: 'var(--pmk-error)' }}>Remove</button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs air-muted">Adults (max 2)</div>
                        <div className="mt-2 inline-flex items-center gap-3">
                          <button
                            onClick={() => updateRoom(i, { adults: Math.max(1, room.adults - 1) })}
                            disabled={room.adults <= 1}
                            className="px-2 py-1 border rounded"
                            style={{ borderColor: 'var(--pmk-border)', opacity: room.adults <= 1 ? 0.4 : 1 }}
                          >-</button>
                          <div className="w-8 text-center">{room.adults}</div>
                          <button
                            onClick={() => updateRoom(i, { adults: Math.min(2, room.adults + 1) })}
                            disabled={room.adults >= 2}
                            className="px-2 py-1 border rounded"
                            style={{ borderColor: 'var(--pmk-border)', opacity: room.adults >= 2 ? 0.4 : 1 }}
                          >+</button>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs air-muted">Children</div>
                        <div className="mt-2 inline-flex items-center gap-3">
                          <button onClick={() => updateRoom(i, { children: Math.max(0, room.children - 1), childAges: (room.childAges || []).slice(0, Math.max(0, room.children - 1)) })} className="px-2 py-1 border rounded" style={{ borderColor: 'var(--pmk-border)' }}>-</button>
                          <div className="w-8 text-center">{room.children}</div>
                          <button onClick={() => updateRoom(i, { children: room.children + 1, childAges: [...(room.childAges || []), 2] })} className="px-2 py-1 border rounded" style={{ borderColor: 'var(--pmk-border)' }}>+</button>
                        </div>

                        {room.children > 0 && (
                          <div className="mt-3 space-y-2">
                            {[...Array(room.children)].map((_, cidx) => {
                              const ages = room.childAges || [];
                              const val = ages[cidx] ?? 2;
                              return (
                                <div key={cidx} className="flex items-center gap-2 text-sm">
                                  <div style={{ color: 'var(--pmk-text)' }}>Age of Child {cidx + 1}</div>
                                  <CustomSelect
                                    value={String(val)}
                                    onChange={(value) => {
                                      const newAges = [...(room.childAges || [])];
                                      newAges[cidx] = Number(value);
                                      updateRoom(i, { childAges: newAges });
                                    }}
                                    options={Array.from({ length: 13 }).map((_, age) => ({
                                      value: String(age),
                                      label: String(age),
                                    }))}
                                    className="ml-2 w-20"
                                    buttonClassName="bg-[var(--pmk-bg)]"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={() => addRoom()} className="w-full py-3 border-2 border-dashed rounded-lg text-sm air-muted transition" style={{ borderColor: 'var(--pmk-border)' }}>+ Add Another Room</button>
              </div>

              {errors.travellers && (
                <div className="mt-3 text-sm" style={{ color: 'var(--pmk-error)' }}>{errors.travellers}</div>
              )}
              {totalGuests !== initialGuestCount && (
                <div className="mt-3 text-sm" style={{ color: 'var(--pmk-accent)' }}>
                  Initial guests: {initialGuestCount} — Current travelers: {totalGuests}
                </div>
              )}
            </section>
          )}

          {/* Step 2: Preferences (Pickup/Drop + Big Calendar) */}
          {step === 2 && (
            <section>
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--pmk-text)' }}>Preferences & Dates</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--pmk-text)' }}>Pickup Location</label>
                  <CustomSelect
                    value={pickup}
                    onChange={setPickup}
                    options={LOCATIONS.map((l) => ({ value: l, label: l }))}
                    className="w-full"
                    buttonClassName="bg-[var(--pmk-surface)]"
                  />
                  {pickup === 'Other (custom)' && (
                    <input value={pickupCustom} onChange={(e)=>setPickupCustom(e.target.value)} placeholder="Enter pickup location" className="mt-2 w-full p-2 border rounded" style={{ borderColor: 'var(--pmk-border)' }} />
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--pmk-text)' }}>Drop Location</label>
                  <CustomSelect
                    value={drop}
                    onChange={setDrop}
                    options={LOCATIONS.map((l) => ({ value: l, label: l }))}
                    className="w-full"
                    buttonClassName="bg-[var(--pmk-surface)]"
                  />
                  {drop === 'Other (custom)' && (
                    <input value={dropCustom} onChange={(e)=>setDropCustom(e.target.value)} placeholder="Enter drop location" className="mt-2 w-full p-2 border rounded" style={{ borderColor: 'var(--pmk-border)' }} />
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--pmk-text)' }}>Select Trip Dates</h4>
                
                {/* Embedded 3-Month Calendar View */}
                <div className="bg-[var(--pmk-surface)] rounded-xl border p-4 md:p-6" style={{ borderColor: 'var(--pmk-border)' }}>
                  <div className="flex items-start gap-2 md:gap-4">
                    {/* Left Arrow */}
                    <button
                      onClick={() => setDisplayMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--pmk-bg)] border flex-shrink-0 flex items-center justify-center mt-8"
                      style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}
                    >‹</button>

                    {/* Calendar Grid */}
                    <div className="flex-1 overflow-x-auto pb-2">
                      <div className="flex gap-4 md:gap-8 min-w-max">
                        {[0, 1, 2].map(offset => {
                          const m = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + offset, 1);
                          const monthLabel = m.toLocaleString(undefined, { month: 'long', year: 'numeric' });
                          const cells = cellsFor(m);
                          return (
                            <div key={offset} className="w-64">
                              <div className="text-center font-semibold mb-3" style={{ color: 'var(--pmk-text)' }}>{monthLabel.replace(',', ' ')}</div>

                              <div className="grid grid-cols-7 text-xs air-muted gap-1 mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                  <div key={d} className="text-center font-medium">{d}</div>
                                ))}
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {cells.map((c, idx) => {
                                  if (!c) return <div key={idx} className="h-8" />;
                                  const iso = toISO(c);
                                  const todayIso = toISO(new Date());
                                  const isPast = iso < todayIso;
                                  const isStart = startDate === iso;
                                  const isEnd = endDate === iso;
                                  const inRange = startDate && endDate && (iso >= startDate && iso <= endDate);

                                  return (
                                    <button
                                      key={iso}
                                      disabled={isPast}
                                      onClick={() => {
                                        if (isPast) return;
                                        if (!startDate || (startDate && endDate)) {
                                          setStartDate(iso);
                                          setEndDate(null);
                                        } else {
                                          if (iso < startDate) {
                                            setEndDate(startDate);
                                            setStartDate(iso);
                                          } else {
                                            setEndDate(iso);
                                          }
                                        }
                                      }}
                                      className={`h-8 w-8 flex items-center justify-center text-xs rounded-full transition-colors 
                                        ${isStart || isEnd ? 'text-white font-bold shadow-sm' : 
                                          inRange ? 'text-[var(--pmk-text)]' : 
                                          isPast ? 'text-gray-300 cursor-not-allowed' : 
                                          'text-gray-700 hover:bg-emerald-50'}`}
                                      style={
                                        isStart || isEnd
                                          ? { background: 'var(--pmk-accent)', boxShadow: '0 0 0 2px color-mix(in srgb, var(--pmk-accent) 20%, transparent)' }
                                          : inRange
                                            ? { background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))' }
                                            : undefined
                                      }
                                    >
                                      {c.getDate()}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => setDisplayMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--pmk-bg)] border flex-shrink-0 flex items-center justify-center mt-8"
                      style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}
                    >›</button>
                  </div>
                  
                  <div className="mt-4 text-sm text-center border-t pt-3 air-muted" style={{ borderColor: 'var(--pmk-border)' }}>
                    {startDate && endDate ? (
                      <div>Selected: <span className="font-bold" style={{ color: 'var(--pmk-accent)' }}>{startDate}</span> to <span className="font-bold" style={{ color: 'var(--pmk-accent)' }}>{endDate}</span></div>
                    ) : (
                      <div>Select your <span className="font-medium" style={{ color: 'var(--pmk-accent)' }}>Check-in</span> and <span className="font-medium" style={{ color: 'var(--pmk-accent)' }}>Check-out</span> dates</div>
                    )}
                  </div>
                </div>
              </div>
              {errors.dates && (
                <div className="mt-3 text-sm" style={{ color: 'var(--pmk-error)' }}>{errors.dates}</div>
              )}
            </section>
          )}

          {/* Step 3: Destinations */}
          {step === 3 && (
            <section>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--pmk-text)' }}>Choose destinations</h3>
              <p className="text-sm air-muted mb-6">We highlight destinations that perform best for your travel season.</p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>Best for this season</h4>
                  <span className="text-[10px] uppercase tracking-[0.25em] air-muted">{currentSeason.replace('-', ' ')}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {seasonalDestinations.map((c) => renderDestinationCard(c, false))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--pmk-text)' }}>Other Kerala destinations</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {otherDestinations.map((c) => renderDestinationCard(c, false))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--pmk-text)' }}>Extended add-ons (great for summer)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {EXTENDED_DESTINATIONS.map((c) => renderDestinationCard(c, true))}
                </div>
                <p className="text-xs air-muted mt-3">Extended routes are curated add-ons and will be enabled for multi-state planning.</p>
              </div>
              {errors.destinations && (
                <div className="mt-3 text-sm" style={{ color: 'var(--pmk-error)' }}>{errors.destinations}</div>
              )}
            </section>
          )}

          {/* Step 4: Finalize */}
          {step === 4 && (
            <section className="md:grid md:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-xl p-8 flex flex-col justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--pmk-accent), var(--pmk-accent-deep))', color: '#ffffff' }}>
                <h4 className="text-2xl font-bold mb-4">{isB2B ? 'Finalize for your client' : 'Your personalised Kerala plan'}</h4>
                <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {isB2B ? 'Sign in with your partner account to save pricing and export under your brand. You can also skip and preview the plan first.' : 'Enter your details to generate your custom itinerary with real-time pricing.'}
                </p>
                <div className="space-y-2 text-sm">
                  {startDate && <div className="flex items-center gap-2"><span className="opacity-70">Dates:</span> <span className="font-semibold">{startDate} — {endDate}</span></div>}
                  <div className="flex items-center gap-2"><span className="opacity-70">Travellers:</span> <span className="font-semibold">{totalGuests}</span></div>
                  <div className="flex items-center gap-2"><span className="opacity-70">Destinations:</span> <span className="font-semibold">{selectedCities.length} selected</span></div>
                </div>
                <div className="mt-8 p-3 rounded border text-xs" style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }}>
                  <span className="font-bold">Note:</span> {isB2B ? 'Partner sign-in keeps client pricing synced and exports white-labeled. Skip to preview without authentication.' : 'Providing your details unlocks the complete price breakdown. Skipping will show only the total estimated cost.'}
                </div>
              </div>

              {isB2B ? (
                <div className="rounded-xl p-6 shadow border mt-6 md:mt-0" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)' }}>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg text-sm" style={{ background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', border: '1px solid var(--pmk-border)', color: 'var(--pmk-text)' }}>
                      <div className="font-semibold">Partner access</div>
                      <p className="air-muted mt-1">Sign in to sync rates and export this itinerary with your branding. Skipping keeps the draft local.</p>
                    </div>
                    <button onClick={()=>goToPartnerAuth('signin')} className="w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.01]" style={{ background: 'var(--pmk-accent)' }}>
                      Sign in as Partner
                    </button>
                    <button onClick={()=>goToPartnerAuth('signup')} className="w-full py-4 rounded-xl font-bold border transition-all" style={{ background: 'var(--pmk-surface)', borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}>
                      Create Partner Account
                    </button>
                    <button onClick={()=>setShowSkipModal(true)} className="w-full py-4 rounded-xl font-bold shadow transition-all" style={{ background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }}>
                      Skip for now
                    </button>
                    <div className="text-center">
                      <p className="text-[10px] air-muted">We only use your session to keep partner pricing synced. No client emails are sent.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl p-6 shadow border mt-6 md:mt-0" style={{ borderColor: 'var(--pmk-border)', background: 'var(--pmk-surface)' }}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider air-muted">Name (Optional)</label>
                      <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full mt-1 p-3 bg-[var(--pmk-surface)] border rounded-lg outline-none transition-all" style={{ borderColor: 'var(--pmk-border)' }} placeholder="Enter your name" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider air-muted">Mobile Number (+91)</label>
                      <input value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,''))} className="w-full mt-1 p-3 bg-[var(--pmk-surface)] border rounded-lg outline-none transition-all" style={{ borderColor: 'var(--pmk-border)' }} placeholder="9876543210" />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider air-muted">Email (Optional)</label>
                      <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 p-3 bg-[var(--pmk-surface)] border rounded-lg outline-none transition-all" style={{ borderColor: 'var(--pmk-border)' }} placeholder="you@example.com" />
                    </div>

                    <div className="pt-4">
                      {hasContactInput ? (
                        <button onClick={createWithPrices} className="w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.01]" style={{ background: 'var(--pmk-accent)' }}>
                          Create Itinerary with Prices
                        </button>
                      ) : (
                        <button onClick={()=>setShowSkipModal(true)} className="w-full py-4 rounded-xl font-bold shadow transition-all" style={{ background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }}>
                          Skip & View Plan
                        </button>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] air-muted">By continuing, you agree to our Terms of Service. We respect your privacy.</p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--pmk-border)' }}>
          <div>
            {step > 1 ? <button onClick={back} className="px-4 py-2 border rounded-lg text-sm font-medium" style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}>Back</button> : <div/>}
          </div>

          <div className="flex items-center gap-3">
            {step < 4 && (
              <button onClick={next} disabled={!nextEnabled} className="px-6 py-3 text-white rounded-lg text-sm font-bold shadow-md" style={{ background: 'var(--pmk-accent)', opacity: nextEnabled ? 1 : 0.6 }}>
                Next Step
              </button>
            )}
            {step === 4 && (
              isB2B ? (
                <>
                  <button onClick={()=>goToPartnerAuth('signin')} className="px-6 py-3 text-white rounded-lg text-sm font-bold shadow-md" style={{ background: 'var(--pmk-accent)' }}>Sign in</button>
                  <button onClick={()=>setShowSkipModal(true)} className="px-6 py-3 border rounded-lg text-sm font-semibold" style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)', background: 'var(--pmk-surface)' }}>Skip</button>
                </>
              ) : (
                hasContactInput ? (
                 <button onClick={createWithPrices} className="px-6 py-3 text-white rounded-lg text-sm font-bold shadow-md" style={{ background: 'var(--pmk-accent)' }}>Create itinerary</button>
                ) : (
                 <button onClick={()=>setShowSkipModal(true)} className="px-6 py-3 border rounded-lg text-sm font-semibold" style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)', background: 'var(--pmk-surface)' }}>Skip</button>
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden border-t px-4 py-3 flex items-center justify-between z-10" style={{ background: 'var(--pmk-bg)', borderColor: 'var(--pmk-border)', boxShadow: 'var(--pmk-shadow-card)' }}>
          <button onClick={back} disabled={step===1} className={`text-sm font-medium ${step===1 ? 'text-gray-300':'text-gray-600'}`}>Back</button>
          <button onClick={next} disabled={!nextEnabled} className="text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm" style={{ background: 'var(--pmk-accent)', opacity: nextEnabled ? 1 : 0.6 }}>Next Step</button>
        </div>
      )}

      {/* Skip confirmation modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setShowSkipModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 z-50">
            <h4 className="text-lg font-bold" style={{ color: 'var(--pmk-text)' }}>Skip Price Breakdown?</h4>
            <p className="text-sm air-muted mb-6 leading-relaxed">
              {isB2B
                ? 'You can still preview the itinerary without signing in. Partner pricing and export will activate after you log in.'
                : 'Without your contact details, we cannot send you the detailed cost breakdown. You will only see the final estimated total.'}
            </p>
            <div className="flex gap-3 justify-end">
             <button onClick={()=>setShowSkipModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium" style={{ borderColor: 'var(--pmk-border)', color: 'var(--pmk-text)' }}>Cancel</button>
             <button onClick={confirmSkip} className="px-4 py-2 text-white rounded-lg text-sm font-medium" style={{ background: 'var(--pmk-text)' }}>Yes, skip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}