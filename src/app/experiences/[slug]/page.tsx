import type { Metadata } from 'next';
import GuidePage from '../../../components/GuidePage';
import { experiences } from '../../../lib/guide-content';
export function generateStaticParams(){return Object.keys(experiences).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const guide=experiences[slug];return guide?{title:guide.title,description:guide.description,alternates:{canonical:`/experiences/${slug}`},openGraph:{title:guide.title,description:guide.description,images:[guide.image]}}:{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=experiences[slug];return guide?<GuidePage guide={guide} kind="Experience" slug={slug}/>:null;}
