import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTheme } from '@/features/theme/ThemeProvider';
import { submitIntake } from './api';
import type { IntakeData, IntakeStep, Message } from '@/lib/types/intake';
import {
  contactSchema,
  businessSchema,
  goalsSchema,
  budgetSchema,
} from './validation';

interface IntakeFormProps {
  conversationTranscript?: Message[];
}

export function IntakeForm({ conversationTranscript = [] }: IntakeFormProps) {
  const { theme } = useTheme();
  const [step, setStep] = useState<IntakeStep>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<Partial<IntakeData>>({
    goals: [],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = formData.goals || [];
    if (currentGoals.includes(goal)) {
      updateField('goals', currentGoals.filter(g => g !== goal));
    } else {
      updateField('goals', [...currentGoals, goal]);
    }
  };

  const validateStep = (currentStep: IntakeStep): boolean => {
    try {
      if (currentStep === 'contact') {
        contactSchema.parse(formData);
      } else if (currentStep === 'business') {
        businessSchema.parse(formData);
      } else if (currentStep === 'goals') {
        goalsSchema.parse(formData);
      } else if (currentStep === 'budget') {
        budgetSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    
    const steps: IntakeStep[] = ['contact', 'business', 'goals', 'budget'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: IntakeStep[] = ['contact', 'business', 'goals', 'budget'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('budget')) return;
    
    setIsSubmitting(true);
    
    try {
      const intakeData: IntakeData = {
        ...formData as IntakeData,
        theme,
        conversation_transcript: conversationTranscript,
      };
      
      await submitIntake(intakeData);
      setIsComplete(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-foreground/80 mb-6">
            We've received your submission and will get back to you within 24 hours.
          </p>
          <p className="text-sm text-foreground/60">
            Check your email for a confirmation with next steps.
          </p>
        </CardContent>
      </Card>
    );
  }

  const goalOptions = [
    'New website',
    'Customer portal',
    'Booking system',
    'AI integration',
    'Email automation',
    'CRM integration',
  ];

  const industryOptions = [
    'Service Business',
    'E-commerce',
    'SaaS/Tech',
    'Healthcare',
    'Real Estate',
    'Professional Services',
    'Other',
  ];

  const budgetOptions = [
    'Under $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    'Just exploring',
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Let's Build Your System</CardTitle>
        <div className="flex gap-2 mt-4">
          {['contact', 'business', 'goals', 'budget'].map((s, i) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                ['contact', 'business', 'goals', 'budget'].indexOf(step) >= i
                  ? 'bg-primary'
                  : 'bg-border'
              }`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {step === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <Input
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Your full name"
                error={!!errors.name}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                error={!!errors.email}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
              <Input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        )}

        {step === 'business' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name *</label>
              <Input
                value={formData.business_name || ''}
                onChange={(e) => updateField('business_name', e.target.value)}
                placeholder="Your company name"
                error={!!errors.business_name}
              />
              {errors.business_name && <p className="text-sm text-red-500 mt-1">{errors.business_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Industry *</label>
              <Select
                value={formData.industry || ''}
                onChange={(e) => updateField('industry', e.target.value)}
                error={!!errors.industry}
              >
                <option value="">Select industry...</option>
                {industryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
              {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Website (Optional)</label>
              <Input
                type="url"
                value={formData.current_website || ''}
                onChange={(e) => updateField('current_website', e.target.value)}
                placeholder="https://yoursite.com"
                error={!!errors.current_website}
              />
              {errors.current_website && <p className="text-sm text-red-500 mt-1">{errors.current_website}</p>}
            </div>
          </div>
        )}

        {step === 'goals' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-3">What do you need? *</label>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`p-3 rounded-md border-2 text-left transition-all ${
                      formData.goals?.includes(goal)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              {errors.goals && <p className="text-sm text-red-500 mt-2">{errors.goals}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specific Needs (Optional)</label>
              <Textarea
                value={formData.specific_needs || ''}
                onChange={(e) => updateField('specific_needs', e.target.value)}
                placeholder="Tell us more about your project..."
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 'budget' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Budget Range *</label>
              <Select
                value={formData.budget_range || ''}
                onChange={(e) => updateField('budget_range', e.target.value)}
                error={!!errors.budget_range}
              >
                <option value="">Select budget...</option>
                {budgetOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
              {errors.budget_range && <p className="text-sm text-red-500 mt-1">{errors.budget_range}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timeline *</label>
              <Select
                value={formData.timeline || ''}
                onChange={(e) => updateField('timeline', e.target.value)}
                error={!!errors.timeline}
              >
                <option value="">Select timeline...</option>
                {timelineOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
              {errors.timeline && <p className="text-sm text-red-500 mt-1">{errors.timeline}</p>}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step !== 'contact' && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          
          {step !== 'budget' ? (
            <Button onClick={nextStep} className="flex-1">
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
