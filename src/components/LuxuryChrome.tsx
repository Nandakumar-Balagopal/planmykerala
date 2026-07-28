import Link from 'next/link';

export default function LuxuryChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="luxury-content">
    <header className="luxury-header"><Link href="/" className="brand">PLANMY<span>KERALA</span></Link><nav><Link href="/#destinations">Destinations</Link><Link href="/#experiences">Experiences</Link><Link href="/blog">Journal</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><Link href="/#planner" className="luxury-header-cta">Start planning</Link></header>
    {children}
    <footer className="luxury-footer"><Link href="/" className="brand">PLANMY<span>KERALA</span></Link><p>Discover Kerala beyond the guidebooks.</p><div><Link href="/blog">Journal</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><span>© 2026</span></div></footer>
  </div>;
}
