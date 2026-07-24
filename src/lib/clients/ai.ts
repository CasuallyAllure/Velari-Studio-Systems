// ============================================================
// TODO: INTEGRATION POINT — OpenAI
// ============================================================
// Description: Powers AI demo chat and future intake routing
// Production credentials are server-only and must never be VITE_ prefixed.
// Documentation: https://platform.openai.com/docs/api-reference
// Cost: ~$0.0002 per conversation with gpt-4o-mini
// ============================================================

import type { ConversationContext, AIResponse } from '@/lib/types/conversation';
import { mockAIClient } from '@/lib/mocks/ai.mock';

export interface AIClient {
  getChatResponse(context: ConversationContext): Promise<AIResponse>;
}

// Browser code always uses the mock until the server-side assistant endpoint is wired.
export const aiClient: AIClient = mockAIClient;

// FUTURE: Real OpenAI implementation (uncomment when ready)
export function createServerAIClient(): AIClient {
  // const { OpenAI } = await import('openai');
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  
  return {
    async getChatResponse(context: ConversationContext): Promise<AIResponse> {
      // const systemPrompt = getSystemPrompt(context.theme);
      // 
      // const response = await openai.chat.completions.create({
      //   model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      //   messages: [
      //     { role: 'system', content: systemPrompt },
      //     ...context.conversationHistory.map(msg => ({
      //       role: msg.role,
      //       content: msg.content,
      //     })),
      //     { role: 'user', content: context.userMessage }
      //   ],
      //   temperature: 0.7,
      //   max_tokens: 500,
      // });
      // 
      // return {
      //   content: response.choices[0].message.content || '',
      // };
      
      console.log('🤖 [REAL] Would call OpenAI with theme:', context.theme);
      return mockAIClient.getChatResponse(context);
    },
  };
}
