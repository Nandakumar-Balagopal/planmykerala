import type { Metadata } from 'next';
import '../globals.css';
import './brand.css';
import './articles.css';
import './motion.css';
import './conversion.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://planmykerala.com'),
  title: 'PlanMyKerala | Discover Kerala Beyond the Guidebooks',
  description: 'Considered, deeply personal journeys through Kerala.',
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'PlanMyKerala', description: 'Discover Kerala Beyond the Guidebooks', type: 'website', locale: 'en_IN', siteName: 'PlanMyKerala' },
  twitter: { card: 'summary_large_image', title: 'PlanMyKerala', description: 'Discover Kerala Beyond the Guidebooks' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
