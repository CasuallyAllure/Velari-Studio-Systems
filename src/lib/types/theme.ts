export type ThemeName = 'swedish_minimal' | 'industrial_services' | 'modern_tech';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  fonts: {
    sans: string;
  };
  tone: {
    formal: boolean;
    technical: boolean;
    emoji: boolean;
  };
}
