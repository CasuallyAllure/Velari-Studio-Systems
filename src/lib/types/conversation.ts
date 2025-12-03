import type { ThemeName } from './theme';
import type { Message } from './intake';

export interface ConversationContext {
  theme: ThemeName;
  userMessage: string;
  conversationHistory: Message[];
  intakeData?: Partial<{
    industry: string;
    goals: string[];
    budget_range: string;
  }>;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
}
