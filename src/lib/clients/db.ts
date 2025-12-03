// ============================================================
// TODO: INTEGRATION POINT — Supabase
// ============================================================
// Description: Stores intake submissions and future customer data
// Required env vars: 
//   - VITE_SUPABASE_URL (https://xxxx.supabase.co)
//   - VITE_SUPABASE_ANON_KEY (public key, safe in frontend)
// Setup: Create project in Supabase, run schema.sql
// Documentation: https://supabase.com/docs/reference/javascript
// ============================================================

import type { IntakeData } from '@/lib/types/intake';
import { mockDBClient } from '@/lib/mocks/db.mock';

export interface DBClient {
  saveIntakeSubmission(data: IntakeData): Promise<{ id: string }>;
  getIntakeSubmissions(): Promise<IntakeData[]>;
}

// Automatically use mock if no Supabase config, real if configured
export const dbClient: DBClient = 
  (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
    ? createSupabaseClient() 
    : mockDBClient;

// FUTURE: Real Supabase implementation (uncomment when ready)
function createSupabaseClient(): DBClient {
  // const { createClient } = await import('@supabase/supabase-js');
  // const supabase = createClient(
  //   import.meta.env.VITE_SUPABASE_URL,
  //   import.meta.env.VITE_SUPABASE_ANON_KEY
  // );
  
  return {
    async saveIntakeSubmission(data: IntakeData): Promise<{ id: string }> {
      // const { data: result, error } = await supabase
      //   .from('intake_submissions')
      //   .insert([{
      //     ...data,
      //     created_at: new Date().toISOString(),
      //   }])
      //   .select();
      // 
      // if (error) throw error;
      // return { id: result[0].id };
      
      console.log('💾 [REAL] Would save to Supabase:', data.business_name);
      return mockDBClient.saveIntakeSubmission(data);
    },
    
    async getIntakeSubmissions(): Promise<IntakeData[]> {
      // const { data, error } = await supabase
      //   .from('intake_submissions')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      // 
      // if (error) throw error;
      // return data;
      
      console.log('💾 [REAL] Would fetch from Supabase');
      return mockDBClient.getIntakeSubmissions();
    },
  };
}
