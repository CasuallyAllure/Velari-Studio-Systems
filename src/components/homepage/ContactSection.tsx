import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { brand } from '@/config/brand';

const inquiryTypes = [
  'New website or redesign',
  'Brand identity or logo system',
  'Photography or creative direction',
  'Client intake, portal, or ordering',
  'AI assistant or phone reception',
  'Automation or integration',
  'Press, PR, or collaboration',
  'Something else',
];

export function ContactSection() {
  const [inquiryType, setInquiryType] = useState(inquiryTypes[0]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `VELARI inquiry · ${inquiryType}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Company: ${data.get('company') || 'Not provided'}`,
      `Inquiry: ${inquiryType}`,
      '',
      `${data.get('message') || ''}`,
    ].join('\n');

    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="velari-lower inquiry-studio">
      <div className="velari-shell">
        <div className="inquiry-studio__frame velari-glass">
          <div className="inquiry-studio__intro">
            <p className="velari-kicker">Inquiries · San Francisco</p>
            <h2 className="velari-title">
              Have something in mind?
              <em>Bring us in early.</em>
            </h2>
            <p className="inquiry-studio__lead">
              A new company, a tired website, a full rebrand, original photography,
              or a smarter way to handle inquiries—tell us what is taking shape.
            </p>

            <div className="inquiry-studio__contact-list">
              <a href={`mailto:${brand.email}`}>
                <Mail aria-hidden="true" />
                <span>
                  <small>Email</small>
                  {brand.email}
                </span>
              </a>
              <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>
                <Phone aria-hidden="true" />
                <span>
                  <small>Phone</small>
                  {brand.phone}
                </span>
              </a>
              <div>
                <MapPin aria-hidden="true" />
                <span>
                  <small>Based in</small>
                  San Francisco · Working everywhere
                </span>
              </div>
            </div>
          </div>

          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="inquiry-form__heading">
              <span>New inquiry</span>
              <small>Usually answered within one business day</small>
            </div>

            <label>
              <span>What are you reaching out about?</span>
              <select value={inquiryType} onChange={(event) => setInquiryType(event.target.value)}>
                {inquiryTypes.map((type) => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </label>

            <div className="inquiry-form__row">
              <label>
                <span>Your name</span>
                <input name="name" type="text" autoComplete="name" required placeholder="Name" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
              </label>
            </div>

            <div className="inquiry-form__row">
              <label>
                <span>Company</span>
                <input name="company" type="text" autoComplete="organization" placeholder="Optional" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
              </label>
            </div>

            <label>
              <span>What should we know?</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="A few sentences about the business, the opportunity, or what you want to change."
              />
            </label>

            <button type="submit">
              Prepare inquiry <ArrowUpRight aria-hidden="true" />
            </button>
            <p>Opens your email app with the inquiry prepared for {brand.email}.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
