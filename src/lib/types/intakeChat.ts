// Shared contract between the intake API (server) and the chat UI (browser).
// Both the live Claude-powered endpoint and the guided fallback engine speak
// this exact shape — the UI never needs to know which one answered.

export interface IntakeChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface IntakeContext {
  /**
   * Set when the visitor arrived via a package's "Shape this scope" button.
   * Matches a TierId from src/config/quote.ts — kept as string so this file
   * stays alias-free (it is compiled by both Vite and the Vercel API builder).
   */
  packageId?: string;
  theme?: string;
}

export interface IntakeMultiSelect {
  /** Catalog-aligned option labels the visitor can toggle. */
  options: string[];
  /** Label for the confirm button, e.g. "That's everything". */
  confirmLabel: string;
}

export interface IntakeSummary {
  package?: string;
  addOns: string[];
  timeline?: string;
  budgetComfort?: string;
  notes?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

/** One assistant turn. `message` is always present; the rest is optional UI. */
export interface IntakeTurn {
  message: string;
  /** Short tap-to-send options for a closed question (max ~4). */
  quickReplies?: string[];
  /** Toggle-chip group for "which of these apply" questions. */
  multiSelect?: IntakeMultiSelect;
  /** True when the intake is complete and `summary` is populated. */
  done?: boolean;
  summary?: IntakeSummary;
}

export interface IntakeRequestBody {
  messages: IntakeChatMessage[];
  context?: IntakeContext;
}

/** Server error body when the assistant is not configured (no API key). */
export interface IntakeNotConfigured {
  error: 'not_configured';
}
