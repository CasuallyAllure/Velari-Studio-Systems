import { Mail, Phone } from 'lucide-react';
import { Section, Container } from '../layout/Section';
import { Card, CardContent } from '../ui/Card';
import { brand } from '@/config/brand';

export function ContactSection() {
  return (
    <Section id="contact" variant="muted">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Review Your Scope</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Request an estimate, then choose a time for a short discovery call to confirm the details.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-center gap-2 text-lg mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">Email</span>
                </div>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-primary hover:underline"
                >
                  {brand.email}
                </a>
              </div>

              <div className="w-full h-px bg-border" />

              <div>
                <div className="flex items-center justify-center gap-2 text-lg mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium">Phone</span>
                </div>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, '')}`}
                  className="text-primary hover:underline"
                >
                  {brand.phone}
                </a>
              </div>

              <div className="w-full h-px bg-border" />

              <div>
                <p className="text-sm text-foreground/60 mb-4">
                  Use the questionnaire above to tell us about your project.
                  We&apos;ll get back to you within one business day.
                </p>
                <button
                  onClick={() => {
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                    // Switch to form tab after scroll
                    setTimeout(() => {
                      const formTab = document.querySelector('[data-tab="form"]') as HTMLButtonElement;
                      formTab?.click();
                    }, 500);
                  }}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Start My Estimate →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
