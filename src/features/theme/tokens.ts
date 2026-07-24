import type { ThemeConfig } from '@/lib/types/theme';

export const themes: Record<string, ThemeConfig> = {
  swedish_minimal: {
    name: 'swedish_minimal',
    displayName: 'Velari Cinematic',
    colors: {
      primary: '#6FFF00',
      secondary: '#010828',
      accent: '#B2D770',
      background: '#010828',
      foreground: '#EFF4FF',
      muted: '#071238',
      border: '#24335C',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
    },
    tone: {
      formal: true,
      technical: false,
      emoji: false,
    },
  },
  
  industrial_services: {
    name: 'industrial_services',
    displayName: 'Industrial Services',
    colors: {
      primary: '#E67E22',      // Orange
      secondary: '#2C3E50',    // Dark blue-gray
      accent: '#E67E22',       // Orange
      background: '#FAFAFA',   // Off-white
      foreground: '#2C3E50',   // Dark blue-gray
      muted: '#ECF0F1',        // Light gray
      border: '#BDC3C7',       // Medium gray
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
    },
    tone: {
      formal: false,
      technical: false,
      emoji: false,
    },
  },
  
  modern_tech: {
    name: 'modern_tech',
    displayName: 'Modern Tech',
    colors: {
      primary: '#00D4FF',      // Electric blue
      secondary: '#0A0A0A',    // Almost black
      accent: '#00D4FF',       // Electric blue
      background: '#0F0F0F',   // Dark background
      foreground: '#FAFAFA',   // Off-white text
      muted: '#1A1A1A',        // Dark gray
      border: '#2A2A2A',       // Border gray
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
    },
    tone: {
      formal: true,
      technical: true,
      emoji: false,
    },
  },
};

export const defaultTheme = 'swedish_minimal';
