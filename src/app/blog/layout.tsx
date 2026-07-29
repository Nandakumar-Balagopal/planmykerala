import type { Metadata } from 'next';
import LuxuryChrome from '../../components/LuxuryChrome';

export const metadata: Metadata = {
  title: { default: 'Kerala Travel Journal | PlanMyKerala', template: '%s | PlanMyKerala Journal' },
  description: 'Local, considered travel guides to Kerala’s backwaters, tea hills, beaches, food and wildlife.',
  openGraph: { type: 'website', title: 'Kerala Travel Journal', description: 'Considered local guides to Kerala.' },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'Blog', name: 'PlanMyKerala Journal', description: 'Local, considered travel guides to Kerala.', url: 'https://www.planmykerala.com/blog', publisher: { '@type': 'Organization', name: 'PlanMyKerala', url: 'https://www.planmykerala.com' }, inLanguage: 'en-IN' };
  return <LuxuryChrome>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></LuxuryChrome>;
}
