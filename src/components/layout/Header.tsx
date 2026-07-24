import { Container } from './Section';
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher';

const NAV_ITEMS = [
  { id: 'what-we-build', label: 'What We Build' },
  { id: 'packages', label: 'Packages' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'demo', label: 'Live Demo' },
] as const;

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#2a1a14]/60 bg-[#0a0710]/70 text-[#fcf4de] backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="inline-flex items-baseline gap-1.5 text-base font-extralight tracking-[0.24em] text-[#fcf4de]"
              style={{ fontFamily: "'Archivo', 'Helvetica Neue', Helvetica, sans-serif" }}
            >
              VELARI
              <span
                className="text-[11px] uppercase tracking-[0.35em] text-[#8f7d6e]"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                Systems
              </span>
            </a>

            <nav
              className="hidden items-center gap-7 lg:flex"
              style={{ fontFamily: "'Archivo', 'Helvetica Neue', Helvetica, sans-serif" }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[11px] font-light uppercase tracking-[0.3em] text-[#b3a08e] transition-colors hover:text-[#fcf4de]"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:block">
              <ThemeSwitcher />
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="shrink-0 rounded-full bg-gradient-to-b from-[#eec367] to-[#d9a13e] px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#241503] shadow-[0_8px_28px_-10px_rgba(233,185,92,0.55)] transition-[filter] hover:brightness-105"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              <span className="sm:hidden">Let&apos;s Talk</span>
              <span className="hidden sm:inline">Book a Consult</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
