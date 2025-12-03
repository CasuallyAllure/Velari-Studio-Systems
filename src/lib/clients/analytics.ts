// ============================================================
// TODO: INTEGRATION POINT — Plausible Analytics
// ============================================================
// Description: Privacy-first analytics for conversion tracking
// Required env vars: 
//   - VITE_PLAUSIBLE_DOMAIN (velaristudiosystems.com)
// Setup: Add domain in Plausible dashboard
// Documentation: https://plausible.io/docs
// ============================================================

import { mockAnalyticsClient } from '@/lib/mocks/analytics.mock';

export interface AnalyticsClient {
  trackEvent(eventName: string, props?: Record<string, string | number>): void;
  trackPageView(url: string): void;
}

// Automatically use mock if no domain configured, real if configured
export const analyticsClient: AnalyticsClient = 
  import.meta.env.VITE_PLAUSIBLE_DOMAIN 
    ? createPlausibleClient() 
    : mockAnalyticsClient;

// FUTURE: Real Plausible implementation (uncomment when ready)
function createPlausibleClient(): AnalyticsClient {
  return {
    trackEvent(eventName: string, props?: Record<string, string | number>) {
      // if (typeof window !== 'undefined' && window.plausible) {
      //   window.plausible(eventName, { props });
      // }
      console.log('📊 [REAL] Would track event:', eventName, props);
    },
    
    trackPageView(url: string) {
      // if (typeof window !== 'undefined' && window.plausible) {
      //   window.plausible('pageview', { u: url });
      // }
      console.log('📊 [REAL] Would track pageview:', url);
    },
  };
}

// TypeScript declaration for Plausible
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number>; u?: string }) => void;
  }
}
