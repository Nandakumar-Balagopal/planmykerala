import { ClientBlog } from './ClientBlog';

export const metadata = {
  title: 'Kerala Travel Blog | PlanMyKerala DMC Guides',
  description: 'Local DMC tips for Kerala backwaters, tea hills, beaches, and wildlife—fast reads with realistic pacing and budgets.',
};

const featuredPost = {
  slug: 'kerala-beyond-packages',
  title: 'Kerala Beyond Packages: A More Diverse Map',
  excerpt: 'Kerala tourism often sells fixed packages, but the state has far more range. Build a richer loop across coast, backwaters, and hills.',
  tags: ['Culture', 'Planning'],
  readTime: '6 min read',
  image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', // Alleppey backwaters
};

const posts = [
  featuredPost,
  {
    slug: 'backwaters-houseboat-guide',
    title: 'Backwaters & Houseboats: Alleppey vs Kumarakom',
    excerpt: 'When to sail, pick a boat, choose routes, and budget for a classic Kerala backwater day and night.',
    tags: ['Backwaters'],
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', // Alleppey backwaters houseboat
  },
  {
    slug: 'munnar-tea-hills-mini-itinerary',
    title: 'Munnar Tea Hills: 3-Day Mini Itinerary',
    excerpt: 'Tea gardens, waterfalls, park slots, sunrise points, and realistic drive times from Kochi.',
    tags: ['Hills'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80', // Munnar tea plantations
  },
  {
    slug: 'kovalam-varkala-beach-loop',
    title: 'Kovalam & Varkala: South Kerala Beach Loop',
    excerpt: 'Two beach vibes in one trip: lighthouse shores, cliff cafes, sunset viewpoints, plus a Poovar add-on.',
    tags: ['Beaches'],
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80', // Kerala beach
  },
  {
    slug: 'wayanad-wildlife-2n3d',
    title: 'Wayanad Wildlife: 2N/3D with Edakkal & Kuruva',
    excerpt: 'Safari slots, waterfalls, caves, bamboo rafting, and when to combine with Coorg.',
    tags: ['Wildlife', 'Hills'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80', // Waterfall/forest
  },
  {
    slug: 'thekkady-family-slow-trip',
    title: 'Thekkady for Families: Slow 3-Day Plan',
    excerpt: 'Lake cruise timing, spice walks, elephant interactions, and easy kid-friendly trails.',
    tags: ['Family', 'Wildlife'],
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80', // Elephant/wildlife
  },
  {
    slug: 'honeymoon-alappuzha-munnar',
    title: 'Honeymoon: Alleppey + Munnar in 5 Nights',
    excerpt: 'One night on the water, tea hill views, private transfers, and balcony-first stays.',
    tags: ['Honeymoon', 'Backwaters', 'Hills'],
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1567359781514-3b963ff6be15?auto=format&fit=crop&w=1200&q=80', // Romantic Kerala backwaters
  },
  {
    slug: 'north-kerala-bekal-kannur',
    title: 'North Kerala Loop: Bekal, Kannur, Muzhappilangad',
    excerpt: 'Fort sunsets, drive-in beach, Theyyam season pointers, and seafood stops.',
    tags: ['Beaches', 'Culture'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1596521422413-a0899a53d885?auto=format&fit=crop&w=1200&q=80', // Coastal Kerala
  },
  {
    slug: 'varkala-long-weekend',
    title: 'Varkala Long Weekend: Cliffs, Cafes, and Kayaks',
    excerpt: 'Three-day beach break with kayaks, ayurveda add-ons, and Poovar backwater detour.',
    tags: ['Beaches'],
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=80', // Beach cliffs
  },
  {
    slug: 'monsoon-in-kerala',
    title: 'Monsoon Kerala: Where to Go and What to Skip',
    excerpt: 'Hill mist, safe routes, waterfall checks, and when backwaters still shine.',
    tags: ['Hills', 'Backwaters', 'Family'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80', // Monsoon/rain in nature
  },
  {
    slug: 'kerala-with-kids',
    title: 'Kerala with Kids: 6-Night Easy-Pace Plan',
    excerpt: 'Short drives, animal interactions, soft treks, and pool-first hotels for families.',
    tags: ['Family'],
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80', // Kerala nature/wildlife
  },
  {
    slug: 'compact-kochi-weekend',
    title: 'Kochi Compact Weekend: Fort Kochi + Muziris',
    excerpt: 'Cafes, spice markets, heritage walks, and short drives to beaches and backwaters.',
    tags: ['Culture', 'Beaches'],
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80', // Fort Kochi/heritage
  },
  {
    slug: 'kuttanad-river-islands',
    title: 'Kuttanad River Islands: Village Stays + Canoe Mornings',
    excerpt: 'A slow backwater base with island life, canoe loops, and homestays beyond the classic houseboat circuit.',
    tags: ['Backwaters', 'Culture'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80', // Paddy fields/rural Kerala
  },
  {
    slug: 'western-ghats-slow-loop',
    title: 'Western Ghats Slow Loop: Munnar, Thekkady, Vagamon',
    excerpt: 'Tea hills, spice farms, and quiet meadows with realistic drives and cool-weather pacing.',
    tags: ['Hills', 'Wildlife'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', // Mountain/hills landscape
  },
];

const filters = ['All', 'Backwaters', 'Hills', 'Beaches', 'Wildlife', 'Family', 'Honeymoon', 'Culture', 'Planning'];

export default function BlogPage() {
  return <ClientBlog posts={posts} filters={filters} featuredPost={featuredPost} />;
}
