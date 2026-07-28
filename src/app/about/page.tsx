import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const principles = [
  ['Unhurried by design', 'We leave breathing room between the beautiful things. A journey should never feel like a transfer schedule.'],
  ['Known personally', 'From a hillside hideaway to a houseboat crew, our recommendations come from real relationships on the ground.'],
  ['Yours, not pre-packaged', 'Every route starts with a conversation about how you want to feel — then becomes a journey only you could take.'],
];

export default function AboutPage() {
  return <main className="brand-page about-page">
    <section className="brand-hero about-hero"><div className="brand-hero-inner"><p className="eyebrow light"><i /> OUR STORY</p><h1>Kerala, told<br />from the <em>inside.</em></h1><p>We are a local team with a quiet obsession: helping curious travellers experience our home as it is meant to be felt.</p></div></section>
    <section className="brand-section brand-intro"><p className="eyebrow"><i /> MORE THAN A TRIP</p><div className="split-copy"><h2>Travel with<br /><em>context.</em></h2><div><p>PlanMyKerala began with a simple belief: the finest journeys are never assembled from a brochure. They grow from local knowledge, good listening, and an instinct for the moments no map can quite explain.</p><p>Today, we pair Kerala’s warmest people and most remarkable places with the clarity of modern trip planning. You get the confidence of a trusted local, without losing the joy of discovery.</p></div></div></section>
    <section className="about-image-story"><div className="about-story-image" /><div className="about-story-copy"><p className="eyebrow light"><i /> ROOTED HERE</p><h2>One state.<br /><em>A thousand rhythms.</em></h2><p>From Fort Kochi’s dawn ferries to mist over Munnar, our network is made up of people who live the stories we share. Their knowledge turns an itinerary into an introduction.</p><div className="stat-row"><div><strong>10+</strong><span>years local<br />expertise</span></div><div><strong>2,000+</strong><span>thoughtfully planned<br />journeys</span></div></div></div></section>
    <section className="brand-section"><div className="section-head"><div><p className="eyebrow"><i /> WHAT WE BELIEVE</p><h2>Luxury is the<br /><em>space to feel.</em></h2></div></div><div className="principle-grid">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="brand-cta"><p className="eyebrow light"><i /> LET’S MAKE IT PERSONAL</p><h2>Your Kerala story<br /><em>starts with hello.</em></h2><Link href="/contact" className="button gold">Speak to a journey designer <ArrowRight size={16} /></Link><p className="cta-note"><Check size={14} /> A considered response, usually within one working day.</p></section>
  </main>;
}
