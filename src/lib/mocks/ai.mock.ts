import type { AIClient } from '@/lib/clients/ai';
import type { ConversationContext, AIResponse } from '@/lib/types/conversation';
import type { ThemeName } from '@/lib/types/theme';

// Theme-aware response templates
const responseTemplates: Record<ThemeName, string[]> = {
  swedish_minimal: [
    "We focus on clean, functional design that serves your users. Let's discuss how we can streamline your intake process.",
    "Our approach emphasizes simplicity and user experience. We'll create a system that feels effortless for your customers.",
    "We believe in design that gets out of the way. Your customers will appreciate the clarity and ease of use.",
  ],
  
  industrial_services: [
    "Got it. We'll build you a system that handles bookings and dispatches automatically.",
    "Your customers can request service 24/7, and you get notified instantly. No more missed calls.",
    "We'll set up your dispatch system so jobs flow straight to your team. Simple and reliable.",
  ],
  
  modern_tech: [
    "We'll architect a scalable system with API-first design. Let's integrate your CRM and automate your onboarding workflow.",
    "Our platform approach means you can extend and customize as you grow. We'll build the foundation right.",
    "We'll design your system to handle scale from day one. Clean APIs, proper data models, and automation built in.",
  ],
};

const greetings: Record<ThemeName, string> = {
  swedish_minimal: "Hello. I'm here to help you understand how Velari Studio Systems can support your project.",
  industrial_services: "Hey there. Let's talk about getting your business set up with a solid system.",
  modern_tech: "Welcome. I can help you explore how our platform can power your business operations.",
};

export const mockAIClient: AIClient = {
  async getChatResponse(context: ConversationContext): Promise<AIResponse> {
    console.log('🤖 [MOCK] Generating response for theme:', context.theme);
    console.log('🤖 [MOCK] User message:', context.userMessage);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const message = context.userMessage.toLowerCase();
    
    // Greeting response
    if (context.conversationHistory.length === 0 || message.includes('hello') || message.includes('hi')) {
      return {
        content: greetings[context.theme],
      };
    }
    
    // Industry-specific responses
    if (message.includes('plumb') || message.includes('hvac') || message.includes('service')) {
      if (context.theme === 'industrial_services') {
        return {
          content: "Perfect. For service businesses like yours, we'll build a booking system with automated dispatch. Customers can request service online, and you get instant notifications with all the details.",
        };
      }
    }
    
    if (message.includes('saas') || message.includes('software') || message.includes('tech')) {
      if (context.theme === 'modern_tech') {
        return {
          content: "Great. For a SaaS platform, we'll focus on user onboarding automation and API integrations. We can connect your CRM, set up automated email sequences, and build a clean dashboard for your users.",
        };
      }
    }
    
    // Budget-related responses
    if (message.includes('cost') || message.includes('price') || message.includes('budget')) {
      return {
        content: context.theme === 'swedish_minimal'
          ? "Our packages start at $2,500 for a starter site. The Studio System (site + portal + automations) is $7,500. We can discuss what fits your needs best."
          : context.theme === 'industrial_services'
          ? "We've got packages from $2,500 to $7,500 depending on what you need. Most service businesses go with the Studio System at $7,500 — includes booking, dispatch, and customer portal."
          : "Our pricing ranges from $2,500 for a basic site to $7,500 for the full platform with integrations. We can customize based on your technical requirements.",
      };
    }
    
    // Timeline responses
    if (message.includes('how long') || message.includes('timeline') || message.includes('when')) {
      return {
        content: context.theme === 'swedish_minimal'
          ? "Typically 2-4 weeks for a starter site, 4-8 weeks for the full Studio System. We'll provide a detailed timeline during our discovery call."
          : context.theme === 'industrial_services'
          ? "We can usually get you up and running in 2-4 weeks for a basic site, 4-8 weeks for the full system with booking and dispatch."
          : "Standard delivery is 2-4 weeks for basic implementation, 4-8 weeks for full platform with integrations. We can expedite if needed.",
      };
    }
    
    // Default response (pick random from theme templates)
    const templates = responseTemplates[context.theme];
    const randomIndex = Math.floor(Math.random() * templates.length);
    
    return {
      content: templates[randomIndex],
    };
  },
};
