'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, Bot, CarFront, CheckCircle2, ChevronDown, Clock3, Hotel, MapPinned, Menu, MessageCircle, Sparkles, X } from 'lucide-react';

const destinations = [
  ['Munnar', 'Where the clouds settle', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85'],
  ['Alleppey', 'Life on the water', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85'],
  ['Varkala', 'At the edge of the sea', 'https://images.unsplash.com/photo-1588416499018-d8c6216c9c88?auto=format&fit=crop&w=1200&q=85'],
  ['Thekkady', 'The wild, unhurried', 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=85'],
];

const experiences = [
  ['01', 'Stay afloat', 'A private houseboat, a quiet cove, dinner under a sky unspoiled by city lights.'],
  ['02', 'Taste slowly', 'Follow spice from garden to kitchen with the people who have grown it for generations.'],
  ['03', 'Wander deeper', 'Trade the popular path for a naturalist-led morning in the Western Ghats.'],
];

const outlineByDays: Record<string, { name: string; nights: string; reason: string }[]> = {
  '4': [
    { name: 'Kochi', nights: '1 night', reason: 'An easy arrival and a gentle introduction to Kerala.' },
    { name: 'Munnar', nights: '2 nights', reason: 'Enough time for the tea hills without rushing back to the road.' },
    { name: 'Alleppey', nights: '1 night', reason: 'A calm backwater finale before departure.' },
  ],
  '6': [
    { name: 'Kochi', nights: '1 night', reason: 'Arrive gently and settle into Kerala’s rhythm.' },
    { name: 'Munnar', nights: '2 nights', reason: 'A full day in the highlands, not just a drive-through.' },
    { name: 'Thekkady', nights: '1 night', reason: 'A natural forest-and-spice transition south.' },
    { name: 'Alleppey', nights: '2 nights', reason: 'Time for the water, a village canal and real rest.' },
  ],
  '8': [
    { name: 'Kochi', nights: '1 night', reason: 'A soft cultural start after arrival.' },
    { name: 'Munnar', nights: '2 nights', reason: 'Tea country with room for early light and an unplanned afternoon.' },
    { name: 'Thekkady', nights: '2 nights', reason: 'Forest, spice and a slower highland pace.' },
    { name: 'Alleppey', nights: '1 night', reason: 'A night on the water, timed for a quiet sunset.' },
    { name: 'Varkala', nights: '2 nights', reason: 'A coastal finish that lets the journey exhale.' },
  ],
  '10+': [
    { name: 'Kochi', nights: '2 nights', reason: 'Enough time for heritage, ferries and a softer arrival.' },
    { name: 'Munnar', nights: '3 nights', reason: 'The hills deserve a proper stay, not a checklist.' },
    { name: 'Thekkady', nights: '2 nights', reason: 'Spice country and forest at an unhurried pace.' },
    { name: 'Alleppey', nights: '1 night', reason: 'A water-led pause between highlands and coast.' },
    { name: 'Varkala', nights: '2 nights', reason: 'Finish by the sea with time entirely your own.' },
  ],
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [days, setDays] = useState('6');
  const [style, setStyle] = useState('Slow & scenic');
  const [result, setResult] = useState(false);
  const [traveller, setTraveller] = useState('');
  const [email, setEmail] = useState('');
  const [party, setParty] = useState('Two adults');
  const [budget, setBudget] = useState('Premium comfort');
  const [interest, setInterest] = useState('Nature & culture');
  const whatsappMessage = encodeURIComponent(`Hello PlanMyKerala, I would like a ${days}-day ${style.toLowerCase()} Kerala journey.\n\nTravelling as: ${party}\nComfort: ${budget}\nInterests: ${interest}\nName: ${traveller || '—'}\nEmail: ${email || '—'}\n\nPlease refine my route outline with hotel options and realistic transfer times.`);
  const outline = outlineByDays[days];

  return (
    <div className="site-shell">
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="PlanMyKerala home">PLANMY<span>KERALA</span></a>
          <div className="nav-links">
            <a href="#destinations">Destinations</a><a href="#experiences">Experiences</a><a href="/blog">Journal</a><a href="/about">About</a><a href="/contact">Contact</a>
          </div>
          <a href="#planner" className="nav-cta">Start planning <ArrowRight size={14} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </nav>
        {menuOpen && <div className="mobile-menu"><a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a><a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a><a href="/blog" onClick={() => setMenuOpen(false)}>Journal</a><a href="/about" onClick={() => setMenuOpen(false)}>About</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a><a href="#planner" onClick={() => setMenuOpen(false)}>Start planning</a></div>}
        <div className="hero-grain" />
        <div className="hero-copy">
          <p className="eyebrow light"><i /> KERALA, INDIA <i /></p>
          <h1>Discover Kerala<br /><em>beyond</em> the guidebooks.</h1>
          <p className="hero-text">Immersive, considered journeys through a place that moves at the pace of water and wind.</p>
          <div className="hero-actions"><a className="button gold" href="#planner">Plan my journey <ArrowRight size={16} /></a><a className="text-link light" href="#destinations">Explore the map <ArrowDown size={16} /></a></div>
        </div>
        <div className="hero-meta"><span>09° 56′ N &nbsp; 76° 15′ E</span><span>Scroll to wander <ArrowDown size={14} /></span></div>
      </section>

      <main>
        <section className="intro section-pad">
          <p className="eyebrow"><i /> A DIFFERENT WAY TO TRAVEL</p>
          <div className="intro-grid"><h2>Not a checklist.<br />A <em>feeling.</em></h2><p>Kerala is best discovered in the in-between moments: the first tea poured at dawn, a canoe gliding through a narrow waterway, the hush of a forest after rain. We create room for all of it.</p></div>
        </section>

        <section className="destinations section-pad" id="destinations">
          <div className="section-head"><div><p className="eyebrow"><i /> PLACES WITH A PULSE</p><h2>Find your <em>elsewhere.</em></h2></div><a href="#planner" className="text-link">View all destinations <ArrowRight size={16} /></a></div>
          <div className="destination-grid">
            {destinations.map(([name, line, image], i) => <a className={`destination-card card-${i}`} href={`/destinations/${name.toLowerCase()}`} key={name} style={{ backgroundImage: `url(${image})` }}><span className="number">0{i + 1}</span><div><h3>{name}</h3><p>{line}</p><span className="card-arrow"><ArrowRight size={17} /></span></div></a>)}
          </div>
        </section>

        <section className="signature" id="experiences">
          <div className="signature-image" />
          <div className="signature-copy"><p className="eyebrow light"><i /> THE PLANMYKERALA WAY</p><h2>Made for the<br /><em>moments between.</em></h2><p>There are no fixed departures here. Just an intimate understanding of Kerala, and a little more space for the things that matter.</p><a href="#planner" className="text-link light">Our approach <ArrowRight size={16} /></a></div>
        </section>

        <section className="experience-list section-pad"><div className="section-head"><div><p className="eyebrow"><i /> MADE REMARKABLE</p><h2>Small moments.<br /><em>Lasting stories.</em></h2></div></div><div className="experience-rows">{experiences.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={20} /></article>)}</div></section>

        <section className="proof-section section-pad"><div className="section-head"><div><p className="eyebrow"><i /> WHY TRAVELLERS TRUST US</p><h2>Less time in cars.<br /><em>More Kerala in your day.</em></h2></div></div><div className="proof-grid"><article><MapPinned size={23}/><h3>Routes with a reason</h3><p>We sequence every stop around real road conditions, opening times and the energy of the day — not a generic map pin list.</p></article><article><CarFront size={23}/><h3>Drivers who know the way</h3><p>Your driver is a calm local companion: trusted roads, useful pauses, good food and the flexibility to adjust when Kerala surprises you.</p></article><article><Hotel size={23}/><h3>Stays we would choose</h3><p>We recommend accommodation through long-standing local relationships, based on location, character and how it supports your route.</p></article></div><div className="route-proof"><div><p className="eyebrow"><i /> A SMARTER SIX DAYS</p><h3>Not every extra stop adds more to a trip.</h3><p>We design space between the highlights, so a day in Munnar or the backwaters has time to become a memory.</p></div><ol><li><span>01</span> Kochi — arrive gently, walk Fort Kochi</li><li><span>02–03</span> Munnar — tea country, stay two nights</li><li><span>04</span> Thekkady — spice trails, forest edge</li><li><span>05</span> Alleppey — one night on the water</li><li><span>06</span> Depart rested, not rushed</li></ol></div></section>

        <section className="comparison-section"><div><p className="eyebrow light"><i /> THE DIFFERENCE IS IN THE DETAIL</p><h2>A journey designed<br /><em>around you.</em></h2></div><div className="compare-list"><p><span>Most package tours</span> Fixed hotel blocks and hurried transfers</p><p><span>Your PlanMyKerala journey</span> A route shaped around your pace, priorities and the season</p><p><span>Most package tours</span> Sightseeing you could find with a search</p><p><span>Your PlanMyKerala journey</span> Local stops and well-timed experiences that make the route feel lived in</p></div></section>

        <section className="planner" id="planner">
          <div className="planner-bg" /><div className="planner-inner"><div><p className="eyebrow light"><i /> HUMAN KNOW-HOW, MODERN PLANNING</p><h2>Where would you<br /><em>like to begin?</em></h2><p>Start with a simple idea. We’ll turn it into an intelligent route, then a local journey designer will make every detail work.</p><div className="planner-benefits"><span><Clock3 size={15}/> Saves research time</span><span><Bot size={15}/> Smart route logic</span><span><CheckCircle2 size={15}/> Human refinement</span></div></div><div className="planner-card"><div className="planner-badge"><Sparkles size={15} /> PERSONAL JOURNEY STARTER</div><h3>Shape your first idea.</h3><label>How many days?</label><div className="choice-row">{['4', '6', '8', '10+'].map(day => <button className={days === day ? 'selected' : ''} onClick={() => setDays(day)} key={day}>{day}</button>)}</div><div className="planner-fields"><label>Travelling as<select value={party} onChange={(e) => setParty(e.target.value)}><option>Two adults</option><option>Family with children</option><option>Honeymoon couple</option><option>Solo traveller</option><option>Friends or group</option></select></label><label>Comfort level<select value={budget} onChange={(e) => setBudget(e.target.value)}><option>Value-conscious</option><option>Premium comfort</option><option>Luxury</option></select></label><label>What matters most?<select value={interest} onChange={(e) => setInterest(e.target.value)}><option>Nature & culture</option><option>Backwaters & food</option><option>Beaches & wellness</option><option>Wildlife & adventure</option></select></label></div><label>Travel pace</label><button className="select-button" onClick={() => setStyle(style === 'Slow & scenic' ? 'Wild & active' : 'Slow & scenic')}>{style}<ChevronDown size={16} /></button><div className="planner-actions"><button className="button dark full" onClick={() => setResult(true)}>Create my route outline <ArrowRight size={16} /></button></div><p className="planner-result">Your first outline takes less than a minute. A local expert reviews every route.</p></div></div>
        </section>

        <section className="journal section-pad"><div><p className="eyebrow"><i /> FROM THE FIELD NOTES</p><h2>Follow the<br /><em>slow current.</em></h2></div><div className="journal-image"><p>“The most beautiful things in Kerala are often found when you don’t rush to find them.”</p><span>— FIELD NOTE 07</span></div></section>
      </main>

      <footer><a className="brand" href="#top">PLANMY<span>KERALA</span></a><p>Discover Kerala beyond the guidebooks.</p><div><a href="/blog">Journal</a><a href="/about">About</a><a href="/contact">Contact</a><a href="#destinations">Instagram</a><span>© 2026</span></div></footer>
      <a className="whatsapp-float" href="https://wa.me/917025803160?text=Hello%20PlanMyKerala%2C%20I%20would%20like%20help%20planning%20my%20Kerala%20trip." target="_blank" rel="noreferrer"><MessageCircle size={19}/><span>Plan on WhatsApp</span></a>
      {result && <div className="planner-modal" role="dialog" aria-modal="true" aria-labelledby="route-outline-title"><button className="planner-modal-backdrop" onClick={() => setResult(false)} aria-label="Close route outline"/><div className="planner-modal-card"><button className="planner-modal-close" onClick={() => setResult(false)} aria-label="Close"><X size={20}/></button><p className="outline-eyebrow">YOUR SMART ROUTE OUTLINE</p><h2 id="route-outline-title">{days}-day Kerala,<br/><em>made for {party.toLowerCase()}.</em></h2><p className="outline-summary">We’ve prioritised {interest.toLowerCase()} at a {style.toLowerCase()} pace, with {budget.toLowerCase()} stays in mind.</p><div className="planner-modal-stops">{outline.map((stop, index) => <div className="outline-stop" key={stop.name}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{stop.name} · {stop.nights}</b><p>{stop.reason}</p></div></div>)}</div><div className="planner-capture"><p><b>Want the complete day-by-day plan?</b> Send this outline to a Kerala expert for hotel options, realistic transfer times and a tailored quote.</p><input value={traveller} onChange={(e) => setTraveller(e.target.value)} placeholder="Your name"/><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email for your route"/><a className="button gold full" target="_blank" rel="noreferrer" href={`https://wa.me/917025803160?text=${whatsappMessage}`}>Refine on WhatsApp <MessageCircle size={15}/></a></div></div></div>}
    </div>
  );
}
