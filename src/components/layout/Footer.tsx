import { Container } from './Section';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-foreground/60">
            © {currentYear} Velari Studio Systems. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:hello@velaristudiosystems.com"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
