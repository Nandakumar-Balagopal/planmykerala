'use client';

import React, { useEffect, useRef, useState } from 'react';

type Option = {
  value: string;
  label: string;
  description?: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
};

export default function CustomSelect({
  value,
  options,
  onChange,
  placeholder = 'Select',
  className,
  buttonClassName,
  menuClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(ev.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full rounded-xl border border-[var(--pmk-border)] px-3 py-2 text-left text-sm font-semibold text-[var(--pmk-text)] transition ${buttonClassName ?? ''}`}
        style={{ background: 'var(--pmk-bg)' }}
        aria-expanded={open}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate">
              {selected ? selected.label : placeholder}
            </div>
            {selected?.description && (
              <div className="text-[11px] air-muted truncate">{selected.description}</div>
            )}
          </div>
          <span className="text-xs air-muted">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className={`absolute left-0 mt-2 w-full rounded-2xl border border-[var(--pmk-border)] shadow-[var(--pmk-shadow-card)] z-50 ${menuClassName ?? ''}`} style={{ background: 'var(--pmk-bg)' }}>
          <div className="max-h-64 overflow-auto py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-[var(--pmk-surface)]"
              >
                <div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>{opt.label}</div>
                {opt.description && (
                  <div className="text-[11px] air-muted">{opt.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
