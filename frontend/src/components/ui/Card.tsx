// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  elevated = false, 
  padding = 'md',
  onClick 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-2 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-lg border border-slate-200 transition-all duration-200',
        elevated ? 'shadow-elevated' : 'shadow-card',
        paddingClasses[padding],
        onClick && 'cursor-pointer hover:shadow-elevated hover:-translate-y-0.5',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('mb-3 md:mb-4 pb-3 md:pb-4 border-b border-slate-200', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn('text-heading-3 text-slate-900 font-semibold', className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('text-body text-slate-700', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-200', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent, CardFooter };