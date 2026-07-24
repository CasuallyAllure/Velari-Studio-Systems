import { Container } from './Section';
import { brand } from '@/config/brand';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted py-12">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm text-foreground/60">
              © {currentYear} {brand.company_name}. All rights reserved.
            </div>
            <div className="text-xs text-foreground/45">
              San Francisco geometry ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground/70"
              >
                OpenStreetMap contributors
              </a>
              ; elevation reference from{' '}
              <a
                href="https://www.usgs.gov/3d-elevation-program"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground/70"
              >
                USGS 3DEP
              </a>
              .
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a
              href={`mailto:${brand.email}`}
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
