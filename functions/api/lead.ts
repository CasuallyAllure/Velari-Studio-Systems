// Cloudflare Pages Function for POST /api/lead.
// Minimal inline types instead of @cloudflare/workers-types — avoids the
// extra dependency for a single context shape.
import { handleLeadRequest, type LeadEnv } from '../../server/intake/lead';

export const onRequestPost = async (context: { request: Request; env: LeadEnv }) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'bad_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const result = await handleLeadRequest(body, context.env);
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { 'content-type': 'application/json' },
  });
};
