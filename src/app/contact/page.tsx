'use client';
import { useState } from 'react';
import { ArrowRight, MessageCircle, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timing, setTiming] = useState('');
  const [guests, setGuests] = useState('');
  const [idea, setIdea] = useState('');
  const submit = (event: React.FormEvent) => { event.preventDefault(); const message = encodeURIComponent(`Hello PlanMyKerala, I would like help planning a Kerala journey.\n\nName: ${name}\nEmail: ${email}\nWhen: ${timing || 'Not decided'}\nTravellers: ${guests || 'Not decided'}\nIdea: ${idea}`); window.open(`https://wa.me/917025803160?text=${message}`, '_blank'); setSent(true); };
  return <main className="brand-page contact-page">
    <section className="brand-hero contact-hero"><div className="brand-hero-inner"><p className="eyebrow light"><i /> BEGIN A CONVERSATION</p><h1>Tell us how you<br />want to <em>feel.</em></h1><p>A few thoughtful details are all we need to start shaping your Kerala. No obligation, no generic sales script.</p></div></section>
    <section className="brand-section contact-grid"><div className="contact-aside"><p className="eyebrow"><i /> WE’RE HERE</p><h2>Good journeys<br />begin with <em>listening.</em></h2><p>Whether you have a clear vision or only a feeling you want to follow, our local journey designers will help you find your way.</p><a href="https://wa.me/917025803160" target="_blank" rel="noreferrer" className="contact-line"><MessageCircle size={19} /><span><small>WHATSAPP US</small>+91 70258 03160</span></a><a href="tel:+917025803160" className="contact-line"><Phone size={19} /><span><small>CALL OUR KERALA TEAM</small>Mon–Sat · 9am–8pm IST</span></a></div><form className="inquiry-form" onSubmit={submit}><p className="form-kicker">YOUR FIRST IDEA</p><h3>Let’s start simply.</h3><div className="form-row"><label>Your name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="How should we address you?" /></label><label>Email address<input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Where should we reply?" /></label></div><div className="form-row"><label>When would you like to travel?<input value={timing} onChange={(e) => setTiming(e.target.value)} placeholder="e.g. October 2026" /></label><label>Who is coming along?<input value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. Two adults" /></label></div><label>Tell us what you are dreaming of<textarea required value={idea} onChange={(e) => setIdea(e.target.value)} rows={5} placeholder="A place, a mood, a celebration — anything that feels important." /></label><button className="button dark form-submit" type="submit">Send my idea on WhatsApp <Send size={15} /></button>{sent && <p className="form-success">Your WhatsApp message is ready. If a new tab did not open, please use the direct WhatsApp link above.</p>}</form></section>
    <section className="contact-reassurance"><span>LOCAL EXPERTISE</span><span>PRIVATE JOURNEYS</span><span>THOUGHTFUL PACING</span><span>HONEST ADVICE</span></section>
  </main>;
}
