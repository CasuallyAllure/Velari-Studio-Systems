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
          <h2 className="text-4xl font-bold mb-4">Live Demo</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Try our AI-powered intake system. Switch themes to see how the assistant's tone adapts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'chat'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              AI Chat Demo
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'form'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              Intake Form
            </button>
          </div>

          {activeTab === 'chat' ? (
            <AIChatDemo onConversationUpdate={setConversationTranscript} />
          ) : (
            <IntakeForm conversationTranscript={conversationTranscript} />
          )}

          <div className="mt-8 text-center text-sm text-foreground/60">
            <p>
              This demo uses mocked backends. In production, it connects to OpenAI, Resend, and Supabase.
            </p>
            <p className="mt-2">
              All responses are theme-aware and adjust based on your selected industry theme.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
