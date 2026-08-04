// HTTP-agnostic lead-capture handler for POST /api/lead. Fired once an intake
// conversation reaches its done turn. Always logs to the server console
// first (Cloudflare Pages logs double as a free backup), then emails Ray via
// the Resend REST API with plain fetch (no SDK dependency — mirrors
// handler.ts).
import type { IntakeLeadBody, IntakeSummary } from '../../src/lib/types/intakeChat';

const RESEND_URL = 'https://api.resend.com/emails';

const MAX_TRANSCRIPT_ENTRIES = 60;
const MAX_TEXT_CHARS = 2000;
const MAX_SUMMARY_FIELD_CHARS = 500;

function truncate(value: unknown, max: number): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value.slice(0, max).trim() : undefined;
}

function sanitizeSummary(raw: unknown): IntakeSummary {
  const candidate = (raw ?? {}) as Partial<IntakeSummary> & { contact?: unknown };
  const contactCandidate = (candidate.contact ?? {}) as {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
  };

  return {
    package: truncate(candidate.package, MAX_SUMMARY_FIELD_CHARS),
    addOns: Array.isArray(candidate.addOns)
      ? candidate.addOns
          .filter((item): item is string => typeof item === 'string')
          .map((item) => item.slice(0, MAX_SUMMARY_FIELD_CHARS))
      : [],
    timeline: truncate(candidate.timeline, MAX_SUMMARY_FIELD_CHARS),
    budgetComfort: truncate(candidate.budgetComfort, MAX_SUMMARY_FIELD_CHARS),
    notes: truncate(candidate.notes, MAX_SUMMARY_FIELD_CHARS),
    contact: {
      name: truncate(contactCandidate.name, MAX_SUMMARY_FIELD_CHARS),
      email: truncate(contactCandidate.email, MAX_SUMMARY_FIELD_CHARS),
      phone: truncate(contactCandidate.phone, MAX_SUMMARY_FIELD_CHARS),
    },
  };
}

function sanitizeTranscript(raw: unknown[]): IntakeLeadBody['transcript'] {
  return raw
    .slice(-MAX_TRANSCRIPT_ENTRIES)
    .map((entry) => {
      const candidate = entry as { role?: unknown; text?: unknown };
      const role = candidate.role === 'assistant' ? ('assistant' as const) : ('user' as const);
      const text = typeof candidate.text === 'string' ? candidate.text.slice(0, MAX_TEXT_CHARS).trim() : '';
      return { role, text };
    })
    .filter((entry) => entry.text.length > 0);
}

function buildEmailText(summary: IntakeSummary, transcript: IntakeLeadBody['transcript']): string {
  const rows: string[] = [];
  if (summary.package) rows.push(`Package: ${summary.package}`);
  if (summary.addOns.length > 0) rows.push(`Add-ons: ${summary.addOns.join(', ')}`);
  if (summary.timeline) rows.push(`Timeline: ${summary.timeline}`);
  if (summary.budgetComfort) rows.push(`Budget: ${summary.budgetComfort}`);
  if (summary.notes) rows.push(`Notes: ${summary.notes}`);
  const contact = [summary.contact?.name, summary.contact?.email, summary.contact?.phone]
    .filter(Boolean)
    .join(' · ');
  if (contact) rows.push(`Contact: ${contact}`);

  const transcriptLines = transcript.map(
    (entry) => `${entry.role === 'user' ? 'Visitor' : 'Vela'}: ${entry.text}`,
  );

  return [...rows, '', ...transcriptLines].join('\n');
}

export interface LeadEnv {
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  NOTIFICATION_EMAIL?: string;
}

export async function handleLeadRequest(
  rawBody: unknown,
  env?: LeadEnv,
): Promise<{ status: number; body: unknown }> {
  const candidate = rawBody as
    | { summary?: unknown; transcript?: unknown; mode?: unknown }
    | null
    | undefined;

  if (!candidate || typeof candidate.summary !== 'object' || !Array.isArray(candidate.transcript)) {
    return { status: 400, body: { error: 'bad_request' } };
  }

  const mode = candidate.mode === 'guided' ? ('guided' as const) : ('live' as const);
  const summary = sanitizeSummary(candidate.summary);
  const transcript = sanitizeTranscript(candidate.transcript);

  console.log('[intake-lead] new lead:', JSON.stringify({ summary, transcript, mode }));

  if (!env?.RESEND_API_KEY || !env?.NOTIFICATION_EMAIL) {
    return { status: 503, body: { error: 'not_configured' } };
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || 'onboarding@resend.dev',
        to: env.NOTIFICATION_EMAIL,
        subject: `New intake — ${summary.contact?.name || 'visitor'} · ${summary.package || 'unscoped'}`,
        text: buildEmailText(summary, transcript),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error(`[intake-lead] Resend error ${response.status}: ${detail.slice(0, 500)}`);
    }
  } catch (error) {
    console.error('[intake-lead] Resend request failed:', error);
  }

  // The lead is already in the console/Vercel logs above — never surface a
  // send failure to the client.
  return { status: 200, body: { ok: true } };
}
