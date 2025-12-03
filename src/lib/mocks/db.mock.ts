import type { DBClient } from '@/lib/clients/db';
import type { IntakeData } from '@/lib/types/intake';

const STORAGE_KEY = 'velari-intake-submissions';

export const mockDBClient: DBClient = {
  async saveIntakeSubmission(data: IntakeData): Promise<{ id: string }> {
    console.log('💾 [MOCK] Saving to localStorage:', data.business_name);
    
    // Generate ID
    const id = `intake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Add metadata
    const submission = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };
    
    // Get existing submissions
    const existing = localStorage.getItem(STORAGE_KEY);
    const submissions = existing ? JSON.parse(existing) : [];
    
    // Add new submission
    submissions.push(submission);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    
    console.log('💾 [MOCK] Saved with ID:', id);
    console.log('💾 [MOCK] Total submissions:', submissions.length);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return { id };
  },
  
  async getIntakeSubmissions(): Promise<IntakeData[]> {
    console.log('💾 [MOCK] Fetching from localStorage');
    
    const existing = localStorage.getItem(STORAGE_KEY);
    const submissions = existing ? JSON.parse(existing) : [];
    
    console.log('💾 [MOCK] Found submissions:', submissions.length);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return submissions;
  },
};
