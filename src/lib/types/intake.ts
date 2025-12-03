export interface IntakeData {
  // Contact Info
  name: string;
  email: string;
  phone?: string;
  
  // Business Details
  business_name: string;
  industry: string;
  current_website?: string;
  
  // Goals
  goals: string[];
  specific_needs?: string;
  
  // Budget & Timeline
  budget_range: string;
  timeline: string;
  
  // Metadata
  theme: string;
  conversation_transcript?: Message[];
  created_at?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type IntakeStep = 'contact' | 'business' | 'goals' | 'budget';
