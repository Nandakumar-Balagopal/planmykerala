import type { Metadata } from 'next';
import GuidePage from '../../../components/GuidePage';
import { destinations } from '../../../lib/guide-content';
export function generateStaticParams(){return Object.keys(destinations).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const guide=destinations[slug];return guide?{title:`${guide.title} Travel Guide`,description:guide.description,alternates:{canonical:`/destinations/${slug}`},openGraph:{title:guide.title,description:guide.description,images:[guide.image]}}:{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=destinations[slug];return guide?<GuidePage guide={guide} kind="Destination" slug={slug}/>:null;}
