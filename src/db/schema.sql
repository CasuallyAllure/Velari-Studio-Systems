-- ============================================================
-- Velari Studio Systems — Supabase Database Schema
-- ============================================================
-- Run this in Supabase SQL Editor to create tables
-- ============================================================

-- Intake Submissions Table
CREATE TABLE IF NOT EXISTS intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Business Details
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  current_website TEXT,
  
  -- Goals
  goals TEXT[] NOT NULL,
  specific_needs TEXT,
  
  -- Budget & Timeline
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  
  -- Metadata
  theme TEXT NOT NULL,
  conversation_transcript JSONB,
  
  -- Indexes for common queries
  INDEX idx_created_at ON intake_submissions(created_at DESC),
  INDEX idx_email ON intake_submissions(email),
  INDEX idx_business_name ON intake_submissions(business_name)
);

-- Enable Row Level Security (RLS)
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for intake form submissions)
CREATE POLICY "Allow public inserts" ON intake_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Authenticated users can read all submissions (for admin dashboard)
CREATE POLICY "Authenticated users can read" ON intake_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- FUTURE: Add more tables as needed
-- ============================================================

-- Example: Customer Portals
-- CREATE TABLE IF NOT EXISTS customers (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   email TEXT UNIQUE NOT NULL,
--   name TEXT NOT NULL,
--   company_name TEXT,
--   status TEXT DEFAULT 'active'
-- );

-- Example: Project Tracking
-- CREATE TABLE IF NOT EXISTS projects (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   customer_id UUID REFERENCES customers(id),
--   name TEXT NOT NULL,
--   status TEXT DEFAULT 'planning',
--   budget NUMERIC,
--   timeline TEXT
-- );
