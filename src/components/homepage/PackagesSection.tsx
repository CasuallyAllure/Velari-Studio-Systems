import { Check } from 'lucide-react';
import { Section, Container } from '../layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { packages } from '@/config/packages';

export function PackagesSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="packages">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Packages</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include clean code, 
            documentation, and support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              hover
              className={pkg.popular ? 'border-primary border-2' : ''}
            >
              {pkg.popular && (
                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-b-md inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold mt-2">{pkg.price}</div>
                <p className="text-sm text-foreground/60 mt-2">{pkg.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={scrollToContact}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
