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
  swedish_minimal: "Let’s shape a starting scope. What kind of business is this, and are you thinking about a website, branding, photography, or a digital system?",
  industrial_services: "Let’s shape a starting scope. What service do you provide, and do you mainly need a stronger website, better intake, or help connecting the tools you already use?",
  modern_tech: "Let’s shape a starting scope. Tell me what you are building and whether the priority is the public website, the product experience, or the systems behind it.",
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
          ? "Signature Landing projects start at $999, Business Platforms start at $2,999, and AI-Integrated Platforms start at $4,999. Your exact estimate depends on the features you choose."
          : context.theme === 'industrial_services'
          ? "A Signature Landing starts at $999. If you need customer accounts, payments, bookings, or a dashboard, a Business Platform starts at $2,999."
          : "Signature Landing projects start at $999, Business Platforms at $2,999, and AI-Integrated Platforms at $4,999. Integrations and specialized workflows are scoped separately.",
      };
    }

    if (message.includes('brand') || message.includes('logo') || message.includes('identity')) {
      return {
        content: "We can handle the full identity—logo direction, color, typography, voice, and a practical brand guide—then carry it directly into the website and launch materials. Are you starting fresh or refining something that already exists?",
      };
    }

    if (message.includes('photo') || message.includes('content') || message.includes('campaign')) {
      return {
        content: "We can plan and direct original photography for the site, social launch, products, spaces, or team portraits. What needs to be photographed, and where will the imagery be used first?",
      };
    }
    
    // Timeline responses
    if (message.includes('how long') || message.includes('timeline') || message.includes('when')) {
      return {
        content: context.theme === 'swedish_minimal'
          ? "A Signature Landing typically takes 2-3 weeks, a Business Platform 4-6 weeks, and an AI-Integrated Platform 5-8 weeks after we receive the required materials."
          : context.theme === 'industrial_services'
          ? "A website usually takes 2-3 weeks. A system with accounts, booking, payments, or dispatch usually takes 4-6 weeks after we have your content and access."
          : "Standard delivery is 2-3 weeks for a Signature Landing, 4-6 weeks for a Business Platform, and 5-8 weeks for an AI-Integrated Platform.",
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
