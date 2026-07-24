import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { packages } from '@/config/packages';

export function PackagesSection() {
  const [activePackage, setActivePackage] = useState(0);

  const scrollToEstimator = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectedPackage = packages[activePackage];

  return (
    <section id="packages" className="velari-lower velari-packages">
      <div className="velari-shell">
        <header className="velari-section-heading">
          <div>
            <p className="velari-kicker">Choose your starting point</p>
            <h2 className="velari-title">
              Start with the right foundation.
              <em>Build only what helps.</em>
            </h2>
          </div>
          <p className="velari-section-heading__copy">
            These are starting scopes—not boxes. Brand identity, photography, content,
            commerce, and custom integrations can be layered in where they make sense.
          </p>
        </header>

        <div className="package-stage velari-glass">
          <div className="package-stage__tabs" role="tablist" aria-label="Choose a starting package">
            {packages.map((pkg, index) => (
              <button
                key={pkg.id}
                id={`package-tab-${pkg.id}`}
                type="button"
                role="tab"
                aria-selected={activePackage === index}
                aria-controls={`package-panel-${pkg.id}`}
                className={activePackage === index ? 'is-active' : ''}
                onClick={() => setActivePackage(index)}
              >
                <span>0{index + 1}</span>
                {pkg.name}
                {pkg.popular && <small>Popular</small>}
              </button>
            ))}
          </div>

          <div
            id={`package-panel-${selectedPackage.id}`}
            className="package-stage__panel"
            role="tabpanel"
            aria-labelledby={`package-tab-${selectedPackage.id}`}
          >
            <div className="package-stage__summary">
              <p className="package-stage__index">Selected direction · 0{activePackage + 1}</p>
              <h3>{selectedPackage.name}</h3>
              <div className="package-stage__price">{selectedPackage.price}</div>
              <p>{selectedPackage.description}</p>
              <button type="button" onClick={scrollToEstimator}>
                Shape this scope <ArrowRight aria-hidden="true" />
              </button>
            </div>

            <div className="package-stage__included">
              <p>Foundation includes</p>
              <ul>
                {selectedPackage.features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="package-stage__note">
                Need branding, photography, copy, or launch content too?
                <strong> We can scope it as one cohesive engagement.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
