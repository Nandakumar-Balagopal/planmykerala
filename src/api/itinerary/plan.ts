import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  const forwardHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    forwardHeaders['Authorization'] = `Bearer ${token}`;
  } else if (req.headers.authorization) {
    forwardHeaders['Authorization'] = req.headers.authorization as string;
  }

  const url = `${backendUrl}/api/itineraries/plan`;
  const response = await fetch(url, {
    method: 'POST',
    headers: forwardHeaders,
    body: JSON.stringify(req.body),
  });
  const data = await response.json().catch(() => ({ message: 'Failed to parse backend response' }));
  res.status(response.status).json(data);
}
