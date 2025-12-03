import { Button } from '../ui/Button';
import { Section, Container } from '../layout/Section';
import { brand } from '@/config/brand';

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {brand.tagline}
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            We build production-ready websites with intelligent intake systems, 
            customer portals, and automation. Swedish-minimalist design meets modern technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToContact}>
              Book a Consult
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToDemo}>
              Try Live Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-foreground/60">
            <div>
              <div className="font-bold text-2xl text-foreground">2-4 weeks</div>
              <div>Typical delivery</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="font-bold text-2xl text-foreground">$2.5k+</div>
              <div>Starting price</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="font-bold text-2xl text-foreground">100%</div>
              <div>Client-reusable</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
