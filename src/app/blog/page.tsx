import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stories = [
  ['backwaters-houseboat-guide', 'Alleppey or Kumarakom? A local’s guide to the backwaters', 'A quiet way to choose the water-bound experience that fits your Kerala.', 'Backwaters', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85'],
  ['munnar-tea-hills-mini-itinerary', 'Three unhurried days among Munnar’s tea hills', 'Dawn viewpoints, small roads, and time for the mist to lift.', 'Mountains', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=85'],
  ['varkala-long-weekend', 'A long weekend at Varkala’s edge', 'Clifftop mornings, an open horizon, and Kerala at its most elemental.', 'Coast', 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1000&q=85'],
];

export default function BlogPage() { return <main className="brand-page journal-page">
  <section className="brand-hero journal-hero"><div className="brand-hero-inner"><p className="eyebrow light"><i /> THE PLANMYKERALA JOURNAL</p><h1>Stories that<br />lead you <em>deeper.</em></h1><p>Local notes, unhurried itineraries, and small discoveries for the curious wayfarer.</p></div></section>
  <section className="brand-section journal-feature"><div className="journal-feature-image" /><div><p className="eyebrow"><i /> FIELD NOTE 01</p><span className="story-type">SLOW TRAVEL · 6 MIN READ</span><h2>Kerala beyond<br /><em>the familiar.</em></h2><p>There is a Kerala beyond fixed itineraries: village ferries, family-run kitchens, forests after rain and roads that reward a little extra time.</p><Link href="/blog/kerala-beyond-packages" className="text-link">Read the story <ArrowRight size={16} /></Link></div></section>
  <section className="brand-section journal-list"><div className="section-head"><div><p className="eyebrow"><i /> START EXPLORING</p><h2>Read yourself<br /><em>into the place.</em></h2></div><Link className="text-link" href="/contact">Plan a journey <ArrowRight size={16} /></Link></div><div className="journal-cards">{stories.map(([slug, title, excerpt, category, image]) => <Link href={`/blog/${slug}`} className="journal-card" key={slug}><div style={{backgroundImage:`url(${image})`}} /><p>{category}</p><h3>{title}</h3><span>{excerpt}</span><b>Read journal <ArrowRight size={15} /></b></Link>)}</div></section>
  <section className="journal-closer"><p className="eyebrow light"><i /> READY WHEN YOU ARE</p><h2>Inspired by a story?<br /><em>Make it yours.</em></h2><Link href="/contact" className="button gold">Talk to our Kerala team <ArrowRight size={16} /></Link></section>
</main>; }
