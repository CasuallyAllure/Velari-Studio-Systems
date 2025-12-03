import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'accent';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'py-16 md:py-24',
          variant === 'muted' && 'bg-muted',
          variant === 'accent' && 'bg-primary text-white',
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          size === 'sm' && 'max-w-3xl',
          size === 'md' && 'max-w-5xl',
          size === 'lg' && 'max-w-7xl',
          size === 'xl' && 'max-w-[1400px]',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
