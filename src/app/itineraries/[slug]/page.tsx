import type { Metadata } from 'next';
import GuidePage from '../../../components/GuidePage';
import { itineraries } from '../../../lib/guide-content';
export function generateStaticParams(){return Object.keys(itineraries).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const guide=itineraries[slug];return guide?{title:guide.title,description:guide.description,alternates:{canonical:`/itineraries/${slug}`},openGraph:{title:guide.title,description:guide.description,images:[guide.image]}}:{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=itineraries[slug];return guide?<GuidePage guide={guide} kind="Itinerary" slug={slug}/>:null;}
