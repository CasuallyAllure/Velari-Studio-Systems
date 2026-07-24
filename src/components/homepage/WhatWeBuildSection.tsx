import { Bot, Camera, Globe, Palette, PanelsTopLeft, Workflow } from 'lucide-react';

const services = [
  {
    icon: Palette,
    number: '01',
    label: 'Identity',
    title: 'Brand systems',
    description: 'Naming, logo systems, color, typography, voice, and the guidelines that make every touchpoint feel related.',
    details: ['Logo direction', 'Visual language', 'Brand guidelines'],
  },
  {
    icon: Globe,
    number: '02',
    label: 'Digital',
    title: 'Websites',
    description: 'Editorial landing pages and responsive business sites designed around your story, your customer, and your next move.',
    details: ['Web design', 'Development', 'E-commerce'],
  },
  {
    icon: Camera,
    number: '03',
    label: 'Original content',
    title: 'Photography + creative',
    description: 'Products, spaces, people, and campaign imagery—directed as one original visual library instead of borrowed stock.',
    details: ['Brand photography', 'Creative direction', 'Launch assets'],
  },
  {
    icon: PanelsTopLeft,
    number: '04',
    label: 'Experience',
    title: 'Portals + ordering',
    description: 'Client intake, memberships, booking, payments, and customer-facing tools that live naturally behind the site.',
    details: ['Client portals', 'Booking + payments', 'Direct ordering'],
  },
  {
    icon: Bot,
    number: '05',
    label: 'Intelligence',
    title: 'AI intake + reception',
    description: 'Website and phone assistants that answer approved questions, qualify interest, collect details, and hand off cleanly.',
    details: ['Web agents', 'Voice reception', 'Lead qualification'],
  },
  {
    icon: Workflow,
    number: '06',
    label: 'Operations',
    title: 'Automation + integrations',
    description: 'Thoughtful connections between forms, calendars, payments, email, and the tools your business already depends on.',
    details: ['CRM handoff', 'Follow-up flows', 'Tool integrations'],
  },
];

export function WhatWeBuildSection() {
  return (
    <section id="what-we-build" className="velari-lower studio-services">
      <div className="velari-shell">
        <div className="studio-services__intro velari-glass">
          <div>
            <p className="velari-kicker">Velari · Full-service digital studio</p>
            <h2 className="velari-title">
              The brand people see.
              <em>The experience they remember.</em>
            </h2>
          </div>
          <div className="studio-services__statement">
            <span>From first impression to daily operation</span>
            <p>
              We can shape the identity, create the imagery, build the website, and add
              the digital systems that genuinely help the business move.
            </p>
          </div>
        </div>

        <div className="studio-services__grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="studio-service-card velari-glass" key={service.title}>
                <div className="studio-service-card__top">
                  <span>{service.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <p className="studio-service-card__label">{service.label}</p>
                  <h3>{service.title}</h3>
                  <p className="studio-service-card__description">{service.description}</p>
                </div>
                <div className="studio-service-card__details">
                  {service.details.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="studio-services__footer velari-glass">
          <p>One visual language. As much or as little infrastructure as the work needs.</p>
          <div aria-label="Velari service range">
            <span>Identity</span>
            <span>Content</span>
            <span>Website</span>
            <span>Intake</span>
            <span>Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
