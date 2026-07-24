import { useState } from 'react';
import { Section, Container } from '../layout/Section';
import { AIChatDemo } from '@/features/ai-demo/AIChatDemo';
import { IntakeForm } from '@/features/intake/IntakeForm';
import type { Message } from '@/lib/types/intake';

export function DemoSection() {
  const [conversationTranscript, setConversationTranscript] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');

  return (
    <Section id="demo">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Start Your Estimate</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Tell us what you want to build. We&apos;ll turn the answers into a clear starting scope
            and follow up to confirm the details.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 mb-6">
            <button
              data-tab="chat"
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'chat'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              Scope Assistant
            </button>
            <button
              data-tab="form"
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'form'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              Project Questionnaire
            </button>
          </div>

          {activeTab === 'chat' ? (
            <AIChatDemo onConversationUpdate={setConversationTranscript} />
          ) : (
            <IntakeForm conversationTranscript={conversationTranscript} />
          )}

          <div className="mt-8 text-center text-sm text-foreground/60">
            <p>
              Estimates are budgetary and subject to a short scope review before a final proposal is issued.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
