import type { MetadataRoute } from 'next';

const blogSlugs = [
  'backwaters-houseboat-guide', 'compact-kochi-weekend', 'honeymoon-alappuzha-munnar',
  'kerala-beyond-packages', 'kerala-with-kids', 'kovalam-varkala-beach-loop',
  'kuttanad-river-islands', 'monsoon-in-kerala', 'munnar-tea-hills-mini-itinerary',
  'north-kerala-bekal-kannur', 'thekkady-family-slow-trip', 'varkala-long-weekend',
  'wayanad-wildlife-2n3d', 'western-ghats-slow-loop',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://planmykerala.com';
  const updated = new Date('2026-07-28');
  return [
    { url: baseUrl, lastModified: updated, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: updated, changeFrequency: 'weekly', priority: 0.9 },
    ...blogSlugs.map((slug) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
