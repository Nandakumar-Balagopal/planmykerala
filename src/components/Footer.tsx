'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Footer = () => {
    const pathname = usePathname() || '';
    // don't render footer on itinerary pages
    if (pathname.startsWith('/itinerary')) return null;

    return (
        <footer className="border-t py-10" style={{ borderColor: 'var(--pmk-border)', background: 'color-mix(in srgb, var(--pmk-bg) 96%, transparent)' }}>
            <div className="max-w-7xl mx-auto px-4 text-sm" style={{ color: 'var(--pmk-secondary)' }}>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="font-semibold" style={{ color: 'var(--pmk-text)' }}>PlanMyKerala</div>
                        <div className="text-xs">© {new Date().getFullYear()} PlanMyKerala. All rights reserved.</div>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/about" className="hover:underline">About</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;