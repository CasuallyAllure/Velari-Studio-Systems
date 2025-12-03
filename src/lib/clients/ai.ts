// ============================================================
// TODO: INTEGRATION POINT — OpenAI
// ============================================================
// Description: Powers AI demo chat and future intake routing
// Required env vars: 
//   - VITE_OPENAI_API_KEY (sk-proj-...)
//   - VITE_OPENAI_MODEL (gpt-4o-mini or gpt-4o)
// Documentation: https://platform.openai.com/docs/api-reference
// Cost: ~$0.0002 per conversation with gpt-4o-mini
// ============================================================

import type { ConversationContext, AIResponse } from '@/lib/types/conversation';
import { mockAIClient } from '@/lib/mocks/ai.mock';

export interface AIClient {
  getChatResponse(context: ConversationContext): Promise<AIResponse>;
}

// Automatically use mock if no API key, real if key exists
export const aiClient: AIClient = 
  import.meta.env.VITE_OPENAI_API_KEY 
    ? createOpenAIClient() 
    : mockAIClient;

// FUTURE: Real OpenAI implementation (uncomment when ready)
function createOpenAIClient(): AIClient {
  // const { OpenAI } = await import('openai');
  // const openai = new OpenAI({
  //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  //   dangerouslyAllowBrowser: true,  // OK for demo, move to edge function for production
  // });
  
  return {
    async getChatResponse(context: ConversationContext): Promise<AIResponse> {
      // const systemPrompt = getSystemPrompt(context.theme);
      // 
      // const response = await openai.chat.completions.create({
      //   model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
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
