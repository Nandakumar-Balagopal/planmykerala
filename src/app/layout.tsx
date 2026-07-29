import type { Metadata } from 'next';
import '../globals.css';
import './brand.css';
import './articles.css';
import './motion.css';
import './conversion.css';
import './guides.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.planmykerala.com'),
  title: 'PlanMyKerala | Discover Kerala Beyond the Guidebooks',
  description: 'Considered, deeply personal journeys through Kerala.',
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'PlanMyKerala', description: 'Discover Kerala Beyond the Guidebooks', type: 'website', locale: 'en_IN', siteName: 'PlanMyKerala' },
  twitter: { card: 'summary_large_image', title: 'PlanMyKerala', description: 'Discover Kerala Beyond the Guidebooks' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const businessSchema = { '@context': 'https://schema.org', '@type': ['TravelAgency', 'LocalBusiness'], name: 'PlanMyKerala', url: 'https://www.planmykerala.com', logo: 'https://www.planmykerala.com/icon.svg', description: 'A Kerala travel planning company creating personalised, locally informed journeys.', telephone: '+917025803160', email: 'info@planmykerala.com', priceRange: '$$', areaServed: { '@type': 'AdministrativeArea', name: 'Kerala, India' }, openingHours: 'Mo-Sa 09:00-20:00', sameAs: ['https://instagram.com/planmykerala', 'https://facebook.com/planmykerala'] };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} /></body></html>;
}
