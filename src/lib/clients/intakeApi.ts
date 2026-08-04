import type { IntakeRequestBody, IntakeTurn } from '@/lib/types/intakeChat';

/**
 * Thrown when the intake backend is not available (not deployed, no API key,
 * or unreachable). The UI treats this as "fall back to the guided engine".
 */
export class IntakeNotConfiguredError extends Error {
  constructor(message = 'intake_not_configured') {
    super(message);
    this.name = 'IntakeNotConfiguredError';
  }
}

export async function requestIntakeTurn(body: IntakeRequestBody): Promise<IntakeTurn> {
  let res: Response;
  try {
    res = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Network failure — treat an unreachable API as unconfigured so the UI
    // degrades gracefully into guided mode.
    throw new IntakeNotConfiguredError();
  }

  if (res.status === 503 || res.status === 404) {
    throw new IntakeNotConfiguredError();
  }
  if (!res.ok) {
    throw new Error(`intake_api_${res.status}`);
  }

  const data: unknown = await res.json();
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as { message?: unknown }).message !== 'string'
  ) {
    throw new Error('intake_api_malformed_response');
  }
  return data as IntakeTurn;
}
