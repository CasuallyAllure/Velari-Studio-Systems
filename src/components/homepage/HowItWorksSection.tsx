import { useState } from 'react';
import { ArrowDownRight, Code, MessageSquare, Palette, Rocket } from 'lucide-react';
import { AIChatDemo } from '@/features/ai-demo/AIChatDemo';
import { IntakeForm } from '@/features/intake/IntakeForm';
import type { Message } from '@/lib/types/intake';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery',
    description: 'We learn the business, the audience, and what needs to change.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Direction',
    description: 'We shape the visual language, content plan, and working scope.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Build',
    description: 'Design and development move together with clear review points.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch',
    description: 'We deploy, hand off, train, and stay close through the first month.',
  },
];

export function HowItWorksSection() {
  const [conversationTranscript, setConversationTranscript] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');

  return (
    <section id="how-it-works" className="velari-lower process-studio">
      <div className="velari-shell">
        <header className="velari-section-heading">
          <div>
            <p className="velari-kicker">Process + live intake</p>
            <h2 className="velari-title">
              A clear path in.
              <em>A considered build out.</em>
            </h2>
          </div>
          <p className="velari-section-heading__copy">
            Start with a conversation. We turn the answers into a practical direction,
            then design, build, and launch with you in the room.
          </p>
        </header>

        <div className="process-studio__layout">
          <div className="process-studio__steps velari-glass">
            <div className="process-studio__steps-heading">
              <span>How the work moves</span>
              <small>Typical range · 2–8 weeks</small>
            </div>

            <div className="process-studio__step-list">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="process-studio__handoff">
              <span>Nothing starts with a hard sell.</span>
              <p>We start by understanding what would actually make the business better.</p>
            </div>
          </div>

          <div className="process-intake velari-glass">
            <div className="process-intake__heading">
              <div>
                <p>Try the intake</p>
                <h3>Tell us what you&apos;re thinking.</h3>
              </div>
              <ArrowDownRight aria-hidden="true" />
            </div>

            <p className="process-intake__intro">
              Use the guided assistant for a quick conversation or move directly into
              the project questionnaire. Your answers stay attached to the inquiry.
            </p>

            <div className="process-intake__tabs" role="tablist" aria-label="Choose an intake method">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'chat'}
                className={activeTab === 'chat' ? 'is-active' : ''}
                onClick={() => setActiveTab('chat')}
              >
                Guided conversation
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'form'}
                className={activeTab === 'form' ? 'is-active' : ''}
                onClick={() => setActiveTab('form')}
              >
                Project questionnaire
              </button>
            </div>

            <div className="process-intake__surface">
              {activeTab === 'chat' ? (
                <AIChatDemo onConversationUpdate={setConversationTranscript} compact />
              ) : (
                <IntakeForm conversationTranscript={conversationTranscript} />
              )}
            </div>

            <p className="process-intake__fine-print">
              Early estimates are starting ranges. We confirm the final scope together before any agreement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
