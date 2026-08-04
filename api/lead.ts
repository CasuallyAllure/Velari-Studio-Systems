// Vercel serverless function for POST /api/lead.
// Deliberately untyped req/res (no @vercel/node dependency) — Vercel's node
// runtime provides Express-like helpers on both objects.
import { handleLeadRequest } from '../server/intake/lead';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  // Vercel parses JSON bodies automatically; guard for a raw string body.
  let body: unknown = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'bad_request' });
      return;
    }
  }

  const result = await handleLeadRequest(body);
  res.status(result.status).json(result.body);
}
