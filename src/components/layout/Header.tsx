import { Container } from './Section';
import { ThemeSwitcher } from '@/features/theme/ThemeSwitcher';
import { Button } from '../ui/Button';

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-foreground">
              Velari Studio Systems
            </a>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection('what-we-build')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                What We Build
              </button>
              <button
                onClick={() => scrollToSection('packages')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Packages
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Live Demo
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              Book a Consult
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
