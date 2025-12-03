import type { EmailClient } from '@/lib/clients/email';
import type { IntakeData } from '@/lib/types/intake';

export const mockEmailClient: EmailClient = {
  async sendIntakeConfirmation(data: IntakeData) {
    console.log('📧 [MOCK] Sending confirmation email to:', data.email);
    console.log('📧 [MOCK] Email content:', {
      to: data.email,
      subject: 'Your Velari Studio Systems Intake Confirmation',
      preview: `Thanks ${data.name}, we received your intake for ${data.business_name}...`,
      body: {
        greeting: `Hi ${data.name},`,
        message: `Thank you for your interest in Velari Studio Systems. We've received your intake for ${data.business_name}.`,
        details: {
          industry: data.industry,
          goals: data.goals.join(', '),
          budget: data.budget_range,
          timeline: data.timeline,
        },
        next_steps: "We'll review your submission and get back to you within 24 hours.",
      },
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  async sendInternalNotification(data: IntakeData) {
    console.log('📧 [MOCK] Sending notification to team');
    console.log('📧 [MOCK] New intake from:', data.business_name);
    console.log('📧 [MOCK] Full data:', {
      contact: { name: data.name, email: data.email, phone: data.phone },
      business: { name: data.business_name, industry: data.industry },
      project: { goals: data.goals, budget: data.budget_range, timeline: data.timeline },
      theme: data.theme,
      conversation: data.conversation_transcript?.length || 0,
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
  },
};
