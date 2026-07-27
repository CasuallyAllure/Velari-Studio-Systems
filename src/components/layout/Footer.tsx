import { Container } from './Section';
import { brand } from '@/config/brand';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="velari-footer">
      <Container size="xl">
        <div className="velari-footer__top">
          <div>
            <a href="/" className="velari-footer__mark">
              VELARI <span>Systems</span>
            </a>
            <p>Identity, imagery, websites, and intelligent business experiences.</p>
          </div>
          <div className="velari-footer__links">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
          </div>
        </div>

        <div className="velari-footer__bottom">
          <div>© {currentYear} {brand.company_name}. San Francisco.</div>
          <div>
              San Francisco geometry ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
              >
                OpenStreetMap contributors
              </a>
              ; elevation reference from{' '}
              <a
                href="https://www.usgs.gov/3d-elevation-program"
                target="_blank"
                rel="noreferrer"
              >
                USGS 3DEP
              </a>
              .
          </div>
        </div>
      </Container>
    </footer>
  );
}
