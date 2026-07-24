import React, { useEffect, useState } from 'react';
import type { ThemeName } from '@/lib/types/theme';
import { themes, defaultTheme } from './tokens';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Load theme from localStorage or use default
    const stored = localStorage.getItem('velari-theme');
    return (stored as ThemeName) || defaultTheme;
  });

  const themeConfig = themes[theme];

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('velari-theme', newTheme);
  };

  // Inject CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const colors = themeConfig.colors;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-foreground', colors.foreground);
    root.style.setProperty('--color-muted', colors.muted);
    root.style.setProperty('--color-border', colors.border);
    
    // Set font family
    root.style.setProperty('--font-sans', themeConfig.fonts.sans);
    
    // Update background color
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.foreground;
  }, [themeConfig]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
