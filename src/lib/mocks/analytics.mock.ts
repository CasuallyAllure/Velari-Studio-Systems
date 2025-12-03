import type { AnalyticsClient } from '@/lib/clients/analytics';

export const mockAnalyticsClient: AnalyticsClient = {
  trackEvent(eventName: string, props?: Record<string, string | number>) {
    console.log('📊 [MOCK] Event tracked:', eventName);
    if (props) {
      console.log('📊 [MOCK] Event props:', props);
    }
  },
  
  trackPageView(url: string) {
    console.log('📊 [MOCK] Pageview tracked:', url);
  },
};
