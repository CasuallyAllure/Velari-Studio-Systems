// ============================================================
// TODO: INTEGRATION POINT — Resend
// ============================================================
// Description: Sends confirmation emails and internal notifications
// Required env vars: 
//   - VITE_RESEND_API_KEY (re_...)
//   - VITE_FROM_EMAIL (intake@velaristudiosystems.com)
//   - VITE_NOTIFICATION_EMAIL (you@velaristudiosystems.com)
// Setup: Verify domain in Resend dashboard (SPF, DKIM, DMARC)
// Documentation: https://resend.com/docs
// ============================================================

import type { IntakeData } from '@/lib/types/intake';
import { mockEmailClient } from '@/lib/mocks/email.mock';

export interface EmailClient {
  sendIntakeConfirmation(data: IntakeData): Promise<void>;
  sendInternalNotification(data: IntakeData): Promise<void>;
}

// Automatically use mock if no API key, real if key exists
export const emailClient: EmailClient = 
  import.meta.env.VITE_RESEND_API_KEY 
    ? createResendClient() 
    : mockEmailClient;

// FUTURE: Real Resend implementation (uncomment when ready)
function createResendClient(): EmailClient {
  // const { Resend } = await import('resend');
  // const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
  
  return {
    async sendIntakeConfirmation(data: IntakeData) {
      // await resend.emails.send({
      //   from: import.meta.env.VITE_FROM_EMAIL,
      //   to: data.email,
      //   subject: 'Your Velari Studio Systems Intake Confirmation',
      //   html: renderConfirmationEmail(data),
      // });
      console.log('📧 [REAL] Would send confirmation email to:', data.email);
    },
    
    async sendInternalNotification(_data: IntakeData) {
      // await resend.emails.send({
      //   from: import.meta.env.VITE_FROM_EMAIL,
      //   to: import.meta.env.VITE_NOTIFICATION_EMAIL,
      //   subject: `New Intake: ${data.business_name}`,
      //   html: renderNotificationEmail(data),
      // });
      console.log('📧 [REAL] Would send notification to team');
    },
  };
}
