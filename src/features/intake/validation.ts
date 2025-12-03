import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
});

export const businessSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  current_website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

export const goalsSchema = z.object({
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
  specific_needs: z.string().optional(),
});

export const budgetSchema = z.object({
  budget_range: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
});

export const fullIntakeSchema = contactSchema
  .merge(businessSchema)
  .merge(goalsSchema)
  .merge(budgetSchema);

export type ContactFormData = z.infer<typeof contactSchema>;
export type BusinessFormData = z.infer<typeof businessSchema>;
export type GoalsFormData = z.infer<typeof goalsSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
