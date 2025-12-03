import { useTheme } from './ThemeProvider';
import type { ThemeName } from '@/lib/types/theme';
import { themes } from './tokens';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeName[] = ['swedish_minimal', 'industrial_services', 'modern_tech'];

  return (
    <div className="flex items-center gap-2 text-sm">
      {themeOptions.map((themeName) => (
        <button
          key={themeName}
          onClick={() => setTheme(themeName)}
          className={`
            px-3 py-1.5 rounded-md transition-all
            ${theme === themeName 
              ? 'bg-primary text-white' 
              : 'bg-muted text-foreground hover:bg-border'
            }
          `}
        >
          {themes[themeName].displayName}
        </button>
      ))}
    </div>
  );
}
