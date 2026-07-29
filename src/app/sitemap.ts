import type { MetadataRoute } from 'next';

const blogSlugs = [
  'backwaters-houseboat-guide', 'compact-kochi-weekend', 'honeymoon-alappuzha-munnar',
  'kerala-beyond-packages', 'kerala-with-kids', 'kovalam-varkala-beach-loop',
  'kuttanad-river-islands', 'monsoon-in-kerala', 'munnar-tea-hills-mini-itinerary',
  'north-kerala-bekal-kannur', 'thekkady-family-slow-trip', 'varkala-long-weekend',
  'wayanad-wildlife-2n3d', 'western-ghats-slow-loop',
];
const destinationSlugs = ['munnar', 'alleppey', 'kochi', 'wayanad', 'thekkady', 'varkala', 'kovalam'];
const experienceSlugs = ['houseboat', 'ayurveda', 'tea-plantations'];
const itinerarySlugs = ['5-day-kerala', '7-day-family-kerala', '5-day-kerala-honeymoon'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.planmykerala.com';
  const updated = new Date('2026-07-28');
  return [
    { url: baseUrl, lastModified: updated, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: updated, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: updated, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
    ...destinationSlugs.map((slug) => ({ url: `${baseUrl}/destinations/${slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.85 })),
    ...experienceSlugs.map((slug) => ({ url: `${baseUrl}/experiences/${slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.75 })),
    ...itinerarySlugs.map((slug) => ({ url: `${baseUrl}/itineraries/${slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.85 })),
    ...blogSlugs.map((slug) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: updated, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
