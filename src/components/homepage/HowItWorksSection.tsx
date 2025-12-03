import { MessageSquare, Palette, Code, Rocket } from 'lucide-react';
import { Section, Container } from '../layout/Section';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery Call',
    description: 'We discuss your business, goals, and technical requirements. No sales pitch, just honest conversation.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Design & Planning',
    description: 'We create wireframes and a technical spec. You approve the plan before we write a single line of code.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Build & Iterate',
    description: 'We build in weekly sprints with regular check-ins. You see progress and provide feedback continuously.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Support',
    description: 'We deploy to production, train your team, and provide ongoing support. You own all the code.',
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A simple, transparent process from discovery to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/80">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-foreground/60">
            Typical timeline: <span className="font-bold text-foreground">2-8 weeks</span> depending on package
          </p>
        </div>
      </Container>
    </Section>
  );
}
