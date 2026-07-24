import { useEffect, useRef, useState } from 'react';

const TUNNEL_VIDEO = '/assets/showcase/animos/animo-totem-wall-nine-web.mp4';
const TUNNEL_MOBILE_VIDEO = '/assets/showcase/animos/animo-totem-wall-nine-mobile.mp4';
const TUNNEL_POSTER = '/assets/showcase/animos/animo-totem-wall-nine-poster.jpg';

const concepts = [
  {
    id: 'property',
    label: 'Property',
    title: 'Show the property beautifully. Make every inquiry easy.',
    body: 'A polished property website with listings, availability, contact forms, and tour requests—designed to work alongside the tools you already use.',
    proofs: ['Listings', 'Tour requests', 'Lead forms', 'Tool integrations'],
    desktop: '/assets/showcase/animos-final-v2/01-property.png',
    mobile: '/assets/showcase/mobile-previews-v2/01-property-mobile.png',
    href: '/concepts/property/index.html',
  },
  {
    id: 'dental',
    label: 'Dental',
    title: 'Make the first patient interaction feel as considered as the office.',
    body: 'A premium dental website with clear service pages, appointment requests, and simple patient intake—connected to your existing scheduling workflow.',
    proofs: ['Service pages', 'Appointment requests', 'Patient intake', 'Schedule integrations'],
    desktop: '/assets/showcase/animos-final-v2/02-dental.png',
    mobile: '/assets/showcase/mobile-previews-v2/02-dental-mobile.png',
    href: '/concepts/studio/index.html?scene=dental',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    title: 'Turn the menu into an experience—and the visit into a reservation.',
    body: 'A distinctive restaurant website with menus, reservations, catering inquiries, and direct ordering when it makes sense for the business.',
    proofs: ['Digital menu', 'Reservations', 'Direct ordering', 'Catering inquiries'],
    desktop: '/assets/showcase/animos-final-v2/03-restaurant.png',
    mobile: '/assets/showcase/mobile-previews-v2/03-restaurant-mobile.png',
    href: '/concepts/studio/index.html?scene=restaurant',
  },
  {
    id: 'trades',
    label: 'Trades',
    title: 'Look established. Turn every visit into a qualified service request.',
    body: 'A conversion-focused website for plumbing, electrical, HVAC, and field-service companies, with service pages, quote requests, and lead intake that hands off to the tools you already use.',
    proofs: ['Service pages', 'Quote requests', 'Lead intake', 'CRM handoff'],
    desktop: '/assets/showcase/animos-final-v2/04-trades.png',
    mobile: '/assets/showcase/mobile-previews-v2/04-trades-mobile.png',
    href: '/concepts/studio/index.html?scene=trades',
  },
  {
    id: 'industrial',
    label: 'Industrial',
    title: 'Make complex capabilities easy for buyers to understand.',
    body: 'A credible industrial website built around capabilities, certifications, project proof, and RFQ intake—without replacing your production software.',
    proofs: ['Capabilities', 'Case studies', 'Certifications', 'RFQ forms'],
    desktop: '/assets/showcase/animos-final-v2/05-industrial.png',
    mobile: '/assets/showcase/mobile-previews-v2/05-industrial-mobile.png',
    href: '/concepts/studio/index.html?scene=industrial',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    title: 'Present the operation clearly. Capture the right freight inquiries.',
    body: 'A professional freight website with service lanes, capabilities, quote requests, and shipper intake that connects with your existing logistics tools.',
    proofs: ['Service lanes', 'Capabilities', 'Quote requests', 'TMS handoff'],
    desktop: '/assets/showcase/animos-final-v2/06-logistics.png',
    mobile: '/assets/showcase/mobile-previews-v2/06-logistics-mobile.png',
    href: '/concepts/studio/index.html?scene=logistics',
  },
  {
    id: 'retail',
    label: 'Retail',
    title: 'Build a storefront people remember—and make buying simple.',
    body: 'A branded ecommerce experience with product storytelling, checkout, email capture, and connections to the commerce platform that fits your business.',
    proofs: ['Product pages', 'Checkout', 'Email capture', 'Store integrations'],
    desktop: '/assets/showcase/animos-final-v2/07-retail.png',
    mobile: '/assets/showcase/mobile-previews-v2/07-retail-mobile.png',
    href: '/concepts/studio/index.html?scene=retail',
  },
  {
    id: 'research',
    label: 'Research Labs',
    title: 'Give specialized products the clarity and credibility they deserve.',
    body: 'A high-trust website for research products, member inquiries, educational content, and clear product presentation—connected to the tools your team already uses.',
    proofs: ['Product pages', 'Member inquiries', 'Educational content', 'Store integrations'],
    desktop: '/assets/showcase/animos-final-v2/08-research-labs.png',
    mobile: '/assets/showcase/mobile-previews-v2/08-research-labs-mobile.png',
    href: '/concepts/studio/index.html?scene=research',
  },
  {
    id: 'construction',
    label: 'Construction',
    title: 'Show the work beautifully. Win the next project.',
    body: 'A premium construction website with project galleries, service pages, qualification forms, and estimate requests that flow into your current process.',
    proofs: ['Project galleries', 'Service pages', 'Qualification forms', 'Estimate requests'],
    desktop: '/assets/showcase/animos-final-v2/09-construction.png',
    mobile: '/assets/showcase/mobile-previews-v2/09-construction-mobile.png',
    href: '/concepts/studio/index.html?scene=construction',
  },
] as const;

export function ShowcaseTunnelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [useMobileVideo, setUseMobileVideo] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const [activeConcept, setActiveConcept] = useState(0);
  const concept = concepts[activeConcept];
  const stepConcept = (direction: -1 | 1) => {
    setActiveConcept((current) => (current + direction + concepts.length) % concepts.length);
  };

  useEffect(() => {
    const viewportQuery = window.matchMedia('(max-width: 767px)');
    const syncVideoSource = () => setUseMobileVideo(viewportQuery.matches);

    syncVideoSource();
    viewportQuery.addEventListener('change', syncVideoSource);
    return () => viewportQuery.removeEventListener('change', syncVideoSource);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldPlay = entry.isIntersecting && entry.intersectionRatio > 0.12;
        setVisible(shouldPlay);

        if (shouldPlay) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.12, 0.5] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="selected-systems"
        className={`showcase-tunnel ${visible ? 'is-visible' : ''}`}
        aria-label="Selected Velari industry website concepts"
      >
        <div className="showcase-tunnel__sticky">
          <div
            className="showcase-tunnel__poster"
            style={{ backgroundImage: `url(${TUNNEL_POSTER})` }}
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            className="showcase-tunnel__video"
            src={useMobileVideo ? TUNNEL_MOBILE_VIDEO : TUNNEL_VIDEO}
            poster={TUNNEL_POSTER}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="showcase-tunnel__shade" aria-hidden="true" />

          <div className="showcase-tunnel__intro">
            <p>Website concepts · Nine industries</p>
            <h2>Designed to bring business in.</h2>
          </div>

          <div className="showcase-tunnel__rail" aria-hidden="true">
            {concepts.map((item) => <span key={item.id}>{item.label}</span>)}
          </div>
        </div>
      </section>

      <section id="industry-concepts" className="industry-proof" aria-labelledby="industry-proof-title">
        <div className="industry-proof__heading">
          <div>
            <p>Nine industry-ready website directions</p>
            <h2 id="industry-proof-title">Beautiful websites. <em>Built around your business.</em></h2>
          </div>
          <p>Start with a custom website and a simple inquiry or client-intake flow. Add ordering, payments, AI, automation, or integrations only where they genuinely help.</p>
        </div>

        <div className="industry-proof__tabs-shell">
          <button
            type="button"
            className="industry-proof__step industry-proof__step--previous"
            aria-label="Show previous industry concept"
            aria-controls="industry-concept-panel"
            onClick={() => stepConcept(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <div className="industry-proof__tabs" role="tablist" aria-label="Choose an industry concept">
            {concepts.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeConcept === index}
                aria-controls="industry-concept-panel"
                id={`industry-tab-${item.id}`}
                className={activeConcept === index ? 'is-active' : ''}
                onClick={() => setActiveConcept(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="industry-proof__step industry-proof__step--next"
            aria-label="Show next industry concept"
            aria-controls="industry-concept-panel"
            onClick={() => stepConcept(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          id="industry-concept-panel"
          className="industry-proof__stage"
          role="tabpanel"
          aria-labelledby={`industry-tab-${concept.id}`}
        >
          <div className="industry-proof__copy">
            <div className="industry-proof__copy-heading">
              <p>{concept.label}</p>
              <h3>{concept.title}</h3>
              <a
                className="industry-proof__concept-link"
                href={concept.href}
                aria-label={`View the ${concept.label} website concept`}
              >
                View concept <span>↗</span>
              </a>
            </div>
            <div className="industry-proof__details">
              <p>{concept.body}</p>
              <div className="industry-proof__chips">
                {concept.proofs.map((proof) => <span key={proof}>{proof}</span>)}
              </div>
            </div>
          </div>

          <div className="industry-proof__devices" key={concept.id}>
            <figure className="industry-proof__desktop">
              <span className="industry-proof__browserbar"><i></i><i></i><i></i><b>{concept.label} · Desktop</b></span>
              <img src={concept.desktop} alt={`${concept.label} desktop website and operations concept`} />
            </figure>
            <figure className="industry-proof__phone">
              <span></span>
              <img src={concept.mobile} alt={`${concept.label} mobile website concept`} />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
