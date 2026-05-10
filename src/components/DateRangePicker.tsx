"use client";
import React, { useMemo, useState, useEffect, useRef } from 'react';

type Props = {
  initialStart?: string | null;
  initialEnd?: string | null;
  onChange?: (payload: { start: string | null; end: string | null; days: number }) => void;
  dropdown?: boolean; // render as dropdown when true
  startOnly?: boolean; // only pick a start date when true
  fullWidth?: boolean; // stretch trigger to full width when true
  panelAlign?: 'left' | 'center'; // alignment for dropdown panel
  onClose?: () => void; // fires when dropdown closes
  onOpen?: () => void; // fires when dropdown opens
};

function toISO(d: Date | null) {
  if (!d) return null;
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
}

function daysBetween(a: Date | null, b: Date | null) {
  if (!a || !b) return 0;
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return Math.abs(diff) + 1;
}

export default function DateRangePicker({ initialStart = null, initialEnd = null, onChange, dropdown = false, startOnly = false, fullWidth = true, panelAlign = 'left', onClose, onOpen }: Props) {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [displayMonth, setDisplayMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = useState<Date | null>(initialStart ? new Date(initialStart) : null);
  const [end, setEnd] = useState<Date | null>(initialEnd ? new Date(initialEnd) : null);
  const [open, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const prevOpenRef = useRef<boolean>(false);
  const closeTimerRef = useRef<number | null>(null);
  const onOpenRef = useRef<(() => void) | undefined>(onOpen);
  const onCloseRef = useRef<(() => void) | undefined>(onClose);

  const closeDropdown = () => setOpen(false);

  const holidays = useMemo(() => new Set<string>([]), []);

  const startISO = useMemo(() => toISO(start), [start]);
  const endISO = useMemo(() => toISO(end), [end]);
  const daysCount = useMemo(() => (startOnly ? (start ? 1 : 0) : daysBetween(start, end)), [start, end, startOnly]);

  const monthLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
    return formatter.format(displayMonth);
  }, [displayMonth]);

  const cells = useMemo(() => {
    const firstDay = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
    const startWeekDay = firstDay.getDay();
    const daysInMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
    const result: (Date | null)[] = [];

    for (let i = 0; i < startWeekDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      result.push(new Date(displayMonth.getFullYear(), displayMonth.getMonth(), d));
    }
    while (result.length < 42) result.push(null);
    return result;
  }, [displayMonth]);

  const inRange = (d: Date) => {
    if (startOnly) return false;
    if (!start || !end) return false;
    const time = d.getTime();
    return time >= start.getTime() && time <= end.getTime();
  };

  const handleDayClick = (d: Date) => {
    if (d.getTime() < todayStart.getTime()) return;
    if (startOnly) {
      setStart(d);
      setEnd(null);
      return;
    }
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
    } else if (start && !end) {
      if (d.getTime() < start.getTime()) {
        setStart(d);
      } else {
        setEnd(d);
      }
    }
  };

  const prev = () => setDisplayMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const next = () => setDisplayMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  useEffect(() => {
    if (!onChange) return;
    onChange({ start: startISO, end: endISO, days: daysCount });
  }, [startISO, endISO, daysCount, onChange]);

  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onOpen, onClose]);

  useEffect(() => {
    if (!dropdown) return;
    if (!prevOpenRef.current && open && onOpenRef.current) {
      onOpenRef.current();
    }
    if (prevOpenRef.current && !open && onCloseRef.current) {
      window.setTimeout(() => onCloseRef.current && onCloseRef.current(), 120);
    }
    prevOpenRef.current = open;
  }, [dropdown, open]);

  useEffect(() => {
    if (!dropdown) return;
    if (!open || !startISO || !endISO) return;
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      closeDropdown();
    }, 3000);
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [dropdown, open, startISO, endISO]);

  useEffect(() => {
    if (!dropdown) return;
    const onDoc = (ev: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(ev.target as Node)) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
    };
  }, [dropdown]);

  useEffect(() => {
    if (!dropdown) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        closeDropdown();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dropdown]);

  const triggerLabel = startOnly
    ? (startISO ? `${startISO}` : 'Add start date')
    : (startISO && endISO ? `${startISO} → ${endISO}` : startISO ? `${startISO} → —` : 'Add dates');

  const calendarPanel = (
    <div
      ref={panelRef}
      className="mt-2 rounded-2xl p-4 shadow-xl w-[92vw] max-w-[720px] sm:min-w-[560px]"
      style={{
        transform: open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(.97)',
        opacity: open ? 1 : 0,
        transition: 'opacity 240ms ease, transform 240ms ease',
        transformOrigin: 'top center',
        pointerEvents: open ? 'auto' : 'none',
        background: 'var(--pmk-bg)',
        border: '1px solid var(--pmk-border)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm air-muted space-y-1">
          <div>Start: <span className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{startISO ?? '—'}</span></div>
          {!startOnly && (
            <div>End: <span className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{endISO ?? '—'}</span></div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} className="px-2.5 py-1.5 rounded-full text-sm" style={{ background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }} aria-label="Previous month">‹</button>
          <div className="text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>{monthLabel}</div>
          <button type="button" onClick={next} className="px-2.5 py-1.5 rounded-full text-sm" style={{ background: 'var(--pmk-surface)', color: 'var(--pmk-text)' }} aria-label="Next month">›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold air-muted uppercase tracking-wide">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={idx} className="h-10" />;
          const iso = toISO(cell);
          const isHoliday = holidays.has(iso ?? '');
          const selected = (start && cell.toDateString() === start.toDateString()) || (end && cell.toDateString() === end.toDateString());
          const range = inRange(new Date(cell));
          const weekend = cell.getDay() === 0 || cell.getDay() === 6;
          const isPast = cell.getTime() < todayStart.getTime();
          return (
            <button
              type="button"
              key={iso ?? idx}
              onClick={() => handleDayClick(cell)}
              className={`h-10 flex items-center justify-center rounded-xl text-sm transition border
                ${isPast ? 'cursor-not-allowed opacity-40 text-gray-400 border-transparent' : ''}
                ${selected ? 'text-white font-semibold' : ''}
                ${range && !selected ? 'text-[var(--pmk-text)]' : ''}
                ${isHoliday ? 'ring-2 ring-amber-300' : ''}
                ${(!selected && !range && !isPast) ? (weekend ? 'text-gray-500 border-transparent hover:border-gray-200' : 'text-gray-700 border-transparent hover:border-gray-200') : ''}
              `}
              style={
                selected
                  ? { background: 'var(--pmk-accent)', borderColor: 'var(--pmk-accent)' }
                  : range && !selected
                    ? { background: 'color-mix(in srgb, var(--pmk-accent) 12%, var(--pmk-bg))', borderColor: 'var(--pmk-border)' }
                    : undefined
              }
              disabled={isPast}
              aria-pressed={selected}
            >
              <span>{cell.getDate()}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-xs air-muted flex items-center justify-between">
        <span>{daysCount > 0 ? `${daysCount} day(s)` : (startOnly ? 'Select a start date' : 'Select start and end dates')}</span>
        <span className="font-semibold" style={{ color: 'var(--pmk-accent)' }}>Trip plan updates instantly</span>
      </div>
    </div>
  );

  if (!dropdown) {
    return calendarPanel;
  }

  return (
    <div ref={wrapperRef} className={`relative z-[9999] inline-block ${fullWidth ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fullWidth ? 'w-full' : 'min-w-[360px]'} text-left px-3 sm:px-3 py-2.5 rounded-2xl border flex items-center justify-between gap-3 transition ${open ? 'shadow-[var(--pmk-shadow-hover)]' : ''}`}
        style={{ background: 'var(--pmk-bg)', borderColor: open ? 'var(--pmk-accent)' : 'var(--pmk-border)', boxShadow: open ? '0 0 0 3px color-mix(in srgb, var(--pmk-accent) 20%, transparent)' : undefined }}
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <span className="text-sm sm:text-sm font-semibold" style={{ color: 'var(--pmk-text)' }}>{triggerLabel}</span>
        </div>
        <span className="text-[11px] sm:text-xs air-muted font-semibold ml-2">{open ? 'Close' : 'Open'}</span>
      </button>

      <div
        className={`absolute z-[9999] ${panelAlign === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        {calendarPanel}
      </div>
    </div>
  );
}
