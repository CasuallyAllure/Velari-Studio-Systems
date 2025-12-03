import type { IntakeData } from '@/lib/types/intake';
import { emailClient } from '@/lib/clients/email';
import { dbClient } from '@/lib/clients/db';
import { analyticsClient } from '@/lib/clients/analytics';

export async function submitIntake(data: IntakeData): Promise<{ success: boolean; id: string }> {
  try {
    console.log('📝 Starting intake submission for:', data.business_name);
    
    // 1. Save to database
    console.log('📝 Step 1/4: Saving to database...');
    const { id } = await dbClient.saveIntakeSubmission(data);
    
    // 2. Send confirmation email to user
    console.log('📝 Step 2/4: Sending confirmation email...');
    await emailClient.sendIntakeConfirmation(data);
    
    // 3. Send internal notification
    console.log('📝 Step 3/4: Sending internal notification...');
    await emailClient.sendInternalNotification(data);
    
    // 4. Track conversion event
    console.log('📝 Step 4/4: Tracking analytics event...');
    analyticsClient.trackEvent('intake_submitted', {
      industry: data.industry,
      budget_range: data.budget_range,
      theme: data.theme,
      goals_count: data.goals.length,
    });
    
    console.log('✅ Intake submission complete! ID:', id);
    
    return { success: true, id };
  } catch (error) {
    console.error('❌ Intake submission failed:', error);
    throw error;
  }
}
