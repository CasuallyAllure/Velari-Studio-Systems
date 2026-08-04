import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { requestIntakeTurn, IntakeNotConfiguredError } from '@/lib/clients/intakeApi';
import { createGuidedIntake, type GuidedIntake } from '@/lib/mocks/guidedIntake';
import { onPackageSelected } from '@/features/ai-demo/intakeBus';
import type { IntakeContext, IntakeSummary, IntakeTurn } from '@/lib/types/intakeChat';
import type { Message } from '@/lib/types/intake';

interface AIChatDemoProps {
  onConversationUpdate?: (messages: Message[]) => void;
  compact?: boolean;
}

interface ChatEntry {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  /** Assistant entries keep their turn so chips/summary can render. */
  turn?: IntakeTurn;
}

type ChatMode = 'live' | 'guided' | null;

const SNAG_MESSAGE = 'Hit a snag on my end — give that another send?';

function toPlainMessages(entries: ChatEntry[]): Message[] {
  return entries.map(({ role, content, timestamp }) => ({ role, content, timestamp }));
}

function SummaryCard({ summary }: { summary: IntakeSummary }) {
  const contact = [summary.contact?.name, summary.contact?.email, summary.contact?.phone]
    .filter(Boolean)
    .join(' · ');
  const rows: Array<[string, string]> = [];
  if (summary.package) rows.push(['Package', summary.package]);
  if (summary.addOns.length > 0) rows.push(['Add-ons', summary.addOns.join(', ')]);
  if (summary.timeline) rows.push(['Timeline', summary.timeline]);
  if (summary.budgetComfort) rows.push(['Budget', summary.budgetComfort]);
  if (summary.notes) rows.push(['Context', summary.notes]);
  if (contact) rows.push(['Contact', contact]);

  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-3">
        Scope Recap
      </p>
      <div className="space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <span className="text-foreground/60 shrink-0">{label}</span>
            <span className="text-foreground text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIChatDemo({ onConversationUpdate, compact = false }: AIChatDemoProps) {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>(null);
  const [selections, setSelections] = useState<string[]>([]);
  const [chipsConsumed, setChipsConsumed] = useState(false);

  const modeRef = useRef<ChatMode>(null);
  const engineRef = useRef<GuidedIntake | null>(null);
  const contextRef = useRef<IntakeContext | undefined>(undefined);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const leadSentRef = useRef(false);

  // Fire-and-forget lead capture once a turn completes the intake. Silent on
  // any failure — the visitor's experience never depends on this succeeding,
  // and it only fires once per conversation.
  const maybeSendLead = useCallback((turn: IntakeTurn, history: ChatEntry[]) => {
    if (!turn.done || !turn.summary || leadSentRef.current) return;
    leadSentRef.current = true;
    const transcript = history.map(({ role, content }) => ({ role, text: content }));
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        summary: turn.summary,
        transcript,
        mode: modeRef.current === 'guided' ? 'guided' : 'live',
      }),
    }).catch(() => {});
  }, []);

  // Scroll the chat box only — never scroll the message element into view at
  // the window level, or the whole page jumps down to the demo section on load.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || entries.length === 0) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [entries, isLoading]);

  /**
   * Get the next assistant turn. Tries the live API first; a not-configured
   * (or unreachable) backend switches the conversation to the guided engine
   * permanently — once guided, we never retry the API for that conversation.
   */
  const getTurn = useCallback(
    async (history: ChatEntry[], userText: string | null): Promise<IntakeTurn> => {
      if (modeRef.current !== 'guided') {
        try {
          const turn = await requestIntakeTurn({
            messages: history.map(({ role, content }) => ({ role, content })),
            context: contextRef.current,
          });
          modeRef.current = 'live';
          setMode('live');
          return turn;
        } catch (error) {
          if (!(error instanceof IntakeNotConfiguredError)) throw error;
          modeRef.current = 'guided';
          setMode('guided');
          // Replay the conversation so far through the guided engine so it
          // lands on the same step the visitor is at.
          const engine = createGuidedIntake(contextRef.current);
          engineRef.current = engine;
          let turn = engine.start();
          for (const entry of history) {
            if (entry.role === 'user') turn = engine.next(entry.content);
          }
          return turn;
        }
      }
      const engine = engineRef.current ?? createGuidedIntake(contextRef.current);
      engineRef.current = engine;
      return userText === null ? engine.start() : engine.next(userText);
    },
    [],
  );

  const startConversation = useCallback(
    async (context?: IntakeContext) => {
      contextRef.current = context;
      if (modeRef.current === 'guided') {
        engineRef.current = createGuidedIntake(context);
      }
      leadSentRef.current = false;
      setEntries([]);
      setInput('');
      setSelections([]);
      setChipsConsumed(false);
      onConversationUpdate?.([]);
      setIsLoading(true);
      try {
        const turn = await getTurn([], null);
        const greeting: ChatEntry = {
          role: 'assistant',
          content: turn.message,
          timestamp: Date.now(),
          turn,
        };
        setEntries([greeting]);
        onConversationUpdate?.(toPlainMessages([greeting]));
        maybeSendLead(turn, [greeting]);
      } catch (error) {
        console.error('Failed to start intake conversation:', error);
        setEntries([{ role: 'assistant', content: SNAG_MESSAGE, timestamp: Date.now() }]);
      } finally {
        setIsLoading(false);
      }
    },
    [getTurn, onConversationUpdate, maybeSendLead],
  );

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    void startConversation();
  }, [startConversation]);

  // A package's "Shape this scope" button seeds a fresh conversation so the
  // assistant opens already knowing the package.
  useEffect(() => {
    return onPackageSelected((packageId) => {
      void startConversation({ packageId });
    });
  }, [startConversation]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const userEntry: ChatEntry = { role: 'user', content: text, timestamp: Date.now() };
    const history = [...entries, userEntry];
    setEntries(history);
    setInput('');
    setSelections([]);
    setChipsConsumed(true);
    setIsLoading(true);
    onConversationUpdate?.(toPlainMessages(history));

    try {
      const turn = await getTurn(history, text);
      const assistantEntry: ChatEntry = {
        role: 'assistant',
        content: turn.message,
        timestamp: Date.now(),
        turn,
      };
      const updated = [...history, assistantEntry];
      setEntries(updated);
      setChipsConsumed(false);
      onConversationUpdate?.(toPlainMessages(updated));
      maybeSendLead(turn, updated);
    } catch (error) {
      console.error('Failed to get intake response:', error);
      setEntries([...history, { role: 'assistant', content: SNAG_MESSAGE, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const handleReset = () => {
    void startConversation();
  };

  const toggleSelection = (option: string) => {
    setSelections((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const lastEntry = entries[entries.length - 1];
  const latestTurn = lastEntry?.role === 'assistant' ? lastEntry.turn : undefined;
  const isDone = Boolean(latestTurn?.done);
  const showChips = !isLoading && !chipsConsumed && !!latestTurn && !latestTurn.done;

  return (
    <Card className={`max-w-2xl mx-auto ${compact ? 'ai-intake-card--compact' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Intake Assistant</CardTitle>
          <button
            onClick={handleReset}
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-foreground/60 mt-2">
          Start with your business and what you want to create, improve, or simplify.
        </p>
      </CardHeader>

      <CardContent>
        <div
          ref={messagesContainerRef}
          className={`space-y-4 mb-4 overflow-y-auto ${compact ? 'max-h-[250px]' : 'max-h-[400px]'}`}
        >
          {entries.map((entry, index) => (
            <div key={index} className="space-y-3">
              {entry.turn?.done && entry.turn.summary && (
                <SummaryCard summary={entry.turn.summary} />
              )}
              <div className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    entry.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                </div>
              </div>
            </div>
          ))}

          {showChips && latestTurn?.quickReplies && (
            <div className="flex flex-wrap gap-2">
              {latestTurn.quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => void sendMessage(reply)}
                  className="rounded-full border px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {showChips && latestTurn?.multiSelect && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {latestTurn.multiSelect.options.map((option) => {
                  const selected = selections.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleSelection(option)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        selected
                          ? 'bg-primary/15 border-primary text-foreground'
                          : 'text-foreground/80 hover:border-primary hover:text-foreground'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <Button
                size="sm"
                disabled={selections.length === 0}
                onClick={() => void sendMessage(selections.join(' · '))}
              >
                {latestTurn.multiSelect.confirmLabel}
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isDone ? 'Scope sent — hit Reset to start over.' : 'Type your message...'}
            disabled={isLoading || isDone}
          />
          <Button
            onClick={() => void sendMessage(input)}
            disabled={!input.trim() || isLoading || isDone}
            size="md"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {mode === 'live' && (
          <p className="text-xs text-foreground/40 mt-3 text-center">
            Live assistant · answers in seconds
          </p>
        )}
        {mode === 'guided' && (
          <p className="text-xs text-foreground/40 mt-3 text-center">
            Guided intake · full assistant comes online with the site
          </p>
        )}
      </CardContent>
    </Card>
  );
}
