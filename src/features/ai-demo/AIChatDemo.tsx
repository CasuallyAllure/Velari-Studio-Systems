import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTheme } from '@/features/theme/ThemeContext';
import { aiClient } from '@/lib/clients/ai';
import type { Message } from '@/lib/types/intake';

interface AIChatDemoProps {
  onConversationUpdate?: (messages: Message[]) => void;
  compact?: boolean;
}

export function AIChatDemo({ onConversationUpdate, compact = false }: AIChatDemoProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasRequestedGreeting = useRef(false);

  // Scroll the chat box only — scrollIntoView here would scroll the whole page
  // down to the demo section on load.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || messages.length === 0) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleInitialGreeting = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await aiClient.getChatResponse({
        theme,
        userMessage: 'hello',
        conversationHistory: [],
      });
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
      };
      
      setMessages([assistantMessage]);
      onConversationUpdate?.([assistantMessage]);
    } catch (error) {
      console.error('Failed to get initial greeting:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onConversationUpdate, theme]);

  useEffect(() => {
    if (hasRequestedGreeting.current) return;
    hasRequestedGreeting.current = true;
    void handleInitialGreeting();
  }, [handleInitialGreeting]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiClient.getChatResponse({
        theme,
        userMessage: input.trim(),
        conversationHistory: messages,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      onConversationUpdate?.(updatedMessages);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    handleInitialGreeting();
  };

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
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
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
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="md"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-foreground/40 mt-3 text-center">
          This is a demo. Responses are theme-aware and simulated.
        </p>
      </CardContent>
    </Card>
  );
}
