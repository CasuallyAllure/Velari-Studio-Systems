// Cloudflare Pages Function for POST /api/intake.
// Minimal inline types instead of @cloudflare/workers-types — avoids the
// extra dependency for a single context shape.
import { handleIntakeRequest } from '../../server/intake/handler';

interface Env {
  ANTHROPIC_API_KEY?: string;
  INTAKE_MODEL?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'bad_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const result = await handleIntakeRequest(body, context.env.ANTHROPIC_API_KEY, context.env.INTAKE_MODEL);
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { 'content-type': 'application/json' },
  });
};
