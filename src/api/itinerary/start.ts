import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `${backendUrl}/api/itineraries/`;
  const forwardHeaders: Record<string, string> = { 'Content-Type': 'application/json' };

  // Carry bearer token if available from Supabase session (prevents browser basic-auth dialogs)
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (token) {
    forwardHeaders['Authorization'] = `Bearer ${token}`;
  } else if (req.headers.authorization) {
    forwardHeaders['Authorization'] = req.headers.authorization as string;
  }

  if (req.method === 'POST') {
    const response = await fetch(url, {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(req.body),
    });
    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
    return;
  }

  if (req.method === 'GET') {
    const response = await fetch(url, {
      method: 'GET',
      headers: forwardHeaders,
    });
    const data = await response.json().catch(() => []);
    res.status(response.status).json(data);
    return;
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
