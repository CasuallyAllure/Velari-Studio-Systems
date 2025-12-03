import { Globe, Users, Bot, Zap, Phone, Database } from 'lucide-react';
import { Section, Container } from '../layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const services = [
  {
    icon: Globe,
    title: 'Websites',
    description: 'Swedish-minimalist design with mobile-first responsive layouts. Clean, functional, and fast.',
  },
  {
    icon: Users,
    title: 'Customer Portals',
    description: 'Secure login systems for your customers to track orders, book services, and manage accounts.',
  },
  {
    icon: Bot,
    title: 'AI Chat Agents',
    description: 'Theme-aware AI assistants that handle intake, answer questions, and route conversations.',
  },
  {
    icon: Phone,
    title: 'AI Phone Agents',
    description: 'Automated phone systems that take bookings, answer FAQs, and escalate to humans when needed.',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Email sequences, CRM sync, invoice generation, and workflow automation that runs 24/7.',
  },
  {
    icon: Database,
    title: 'Integrations',
    description: 'Connect your tools: Stripe, Twilio, HubSpot, Calendly, and custom APIs.',
  },
];

export function WhatWeBuildSection() {
  return (
    <Section id="what-we-build" variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Build</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Production-ready systems that combine beautiful design with intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} hover>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
