import { useTheme } from './ThemeContext';
import type { ThemeName } from '@/lib/types/theme';
import { themes } from './tokens';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeName[] = ['swedish_minimal', 'industrial_services', 'modern_tech'];

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[#2a1a14] bg-[#0a0710]/60 p-1"
      style={{ fontFamily: "'Geist Mono', monospace" }}
    >
      {themeOptions.map((themeName) => (
        <button
          key={themeName}
          onClick={() => setTheme(themeName)}
          className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] transition-all ${
            theme === themeName
              ? 'bg-[#f4d68c]/15 text-[#f4d68c]'
              : 'text-[#8f7d6e] hover:text-[#fcf4de]'
          }`}
        >
          {themes[themeName].displayName}
        </button>
      ))}
    </div>
  );
}
