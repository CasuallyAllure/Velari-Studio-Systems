// HTTP-agnostic intake turn handler. Speaks the contract in
// src/lib/types/intakeChat.ts and talks to the Anthropic API via plain fetch
// (no SDK dependency — this module runs under both Vite dev middleware and
// Cloudflare Pages Functions).
import type {
  IntakeRequestBody,
  IntakeChatMessage,
  IntakeTurn,
} from '../../src/lib/types/intakeChat';
import { buildSystemPrompt } from './knowledge';

const DEFAULT_MODEL = 'claude-sonnet-5';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

const MAX_MESSAGES = 40;
const MAX_CONTENT_CHARS = 2000;

/** JSON schema mirroring the IntakeTurn contract, used to force structured replies. */
const RESPOND_TOOL = {
  name: 'respond',
  description: 'Reply to the visitor for this intake turn',
  input_schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Your reply to the visitor.',
      },
      quickReplies: {
        type: 'array',
        items: { type: 'string' },
        description: 'Up to 4 short tap-able options for a closed question.',
      },
      multiSelect: {
        type: 'object',
        properties: {
          options: { type: 'array', items: { type: 'string' } },
          confirmLabel: { type: 'string' },
        },
        required: ['options', 'confirmLabel'],
        description: 'Toggle-chip group for "which of these apply" questions.',
      },
      done: {
        type: 'boolean',
        description: 'True when the intake is complete and summary is populated.',
      },
      summary: {
        type: 'object',
        properties: {
          package: { type: 'string' },
          addOns: { type: 'array', items: { type: 'string' } },
          timeline: { type: 'string' },
          budgetComfort: { type: 'string' },
          notes: { type: 'string' },
          contact: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
            },
          },
        },
      },
    },
    required: ['message'],
  },
} as const;

interface AnthropicContentBlock {
  type: string;
  name?: string;
  input?: unknown;
  text?: string;
}

export async function runIntakeTurn(
  body: IntakeRequestBody,
  apiKey: string,
  model: string = DEFAULT_MODEL,
): Promise<IntakeTurn> {

  const messages =
    body.messages.length > 0
      ? body.messages.map((message) => ({ role: message.role, content: message.content }))
      : [{ role: 'user' as const, content: 'Hi' }];

  const response = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      system: buildSystemPrompt(body.context),
      messages,
      tools: [RESPOND_TOOL],
      tool_choice: { type: 'tool', name: 'respond' },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Anthropic API error ${response.status}: ${detail.slice(0, 500)}`);
  }

  const payload = (await response.json()) as { content?: AnthropicContentBlock[] };
  const blocks = Array.isArray(payload.content) ? payload.content : [];

  const toolBlock = blocks.find(
    (block) => block.type === 'tool_use' && block.name === 'respond',
  );

  if (toolBlock && toolBlock.input && typeof toolBlock.input === 'object') {
    const turn = toolBlock.input as IntakeTurn;
    if (typeof turn.message === 'string' && turn.message.length > 0) {
      if (Array.isArray(turn.quickReplies) && turn.quickReplies.length === 0) {
        delete turn.quickReplies;
      }
      return turn;
    }
  }

  // Fallback: no usable tool_use block — concatenate any text blocks.
  const text = blocks
    .filter((block) => block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text)
    .join('\n')
    .trim();

  return { message: text || 'Sorry — could you say that again?' };
}

function sanitizeMessages(raw: unknown[]): IntakeChatMessage[] {
  return raw
    .slice(-MAX_MESSAGES)
    .map((entry) => {
      const candidate = entry as { role?: unknown; content?: unknown };
      const role = candidate.role === 'assistant' ? ('assistant' as const) : ('user' as const);
      const content =
        typeof candidate.content === 'string'
          ? candidate.content.slice(0, MAX_CONTENT_CHARS).trim()
          : '';
      return { role, content };
    })
    // The Anthropic API rejects empty text content — drop malformed entries.
    .filter((message) => message.content.length > 0);
}

export async function handleIntakeRequest(
  rawBody: unknown,
  apiKey: string | undefined,
  model?: string,
): Promise<{ status: number; body: unknown }> {
  if (!apiKey) {
    return { status: 503, body: { error: 'not_configured' } };
  }

  const candidate = rawBody as { messages?: unknown; context?: unknown } | null | undefined;
  if (!candidate || !Array.isArray(candidate.messages)) {
    return { status: 400, body: { error: 'bad_request' } };
  }

  const body: IntakeRequestBody = {
    messages: sanitizeMessages(candidate.messages),
    context:
      candidate.context && typeof candidate.context === 'object'
        ? (candidate.context as IntakeRequestBody['context'])
        : undefined,
  };

  try {
    const turn = await runIntakeTurn(body, apiKey, model || DEFAULT_MODEL);
    return { status: 200, body: turn };
  } catch (error) {
    console.error('[intake] upstream error:', error);
    return { status: 502, body: { error: 'upstream' } };
  }
}
