// ============================================================
// TODO: INTEGRATION POINT — Resend
// ============================================================
// Description: Sends confirmation emails and internal notifications
// Required env vars: 
//   - Server-only RESEND_API_KEY (never VITE_ prefixed)
//   - Server-only FROM_EMAIL (for example, estimates@velariss.co)
//   - Server-only NOTIFICATION_EMAIL (for example, info@velariss.co)
// Setup: Verify domain in Resend dashboard (SPF, DKIM, DMARC)
// Documentation: https://resend.com/docs
// ============================================================

import type { IntakeData } from '@/lib/types/intake';
import { mockEmailClient } from '@/lib/mocks/email.mock';

export interface EmailClient {
  sendIntakeConfirmation(data: IntakeData): Promise<void>;
  sendInternalNotification(data: IntakeData): Promise<void>;
}

// Browser code always uses the mock until the server-side estimate endpoint is wired.
// Resend credentials must never be read by this client bundle.
export const emailClient: EmailClient = mockEmailClient;

// FUTURE: Real Resend implementation (uncomment when ready)
export function createServerEmailClient(): EmailClient {
  // const { Resend } = await import('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  
  return {
    async sendIntakeConfirmation(data: IntakeData) {
      // await resend.emails.send({
      //   from: process.env.FROM_EMAIL,
      //   to: data.email,
      //   subject: 'Your Velari Systems Project Request',
      //   html: renderConfirmationEmail(data),
      // });
      console.log('📧 [REAL] Would send confirmation email to:', data.email);
    },
    
    async sendInternalNotification(data: IntakeData) {
      // await resend.emails.send({
      //   from: process.env.FROM_EMAIL,
      //   to: process.env.NOTIFICATION_EMAIL,
      //   subject: `New Intake: ${data.business_name}`,
      //   html: renderNotificationEmail(data),
      // });
      console.log('📧 [REAL] Would send notification for:', data.business_name);
    },
  };
}
