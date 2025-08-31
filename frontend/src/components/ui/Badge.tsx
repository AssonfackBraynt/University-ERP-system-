// src/components/ui/Badge.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-slate-100 text-slate-800',
    success: 'bg-success-light text-success',
    warning: 'bg-warning-light text-warning',
    error: 'bg-error-light text-error',
    info: 'bg-info-light text-info',
    outline: 'bg-transparent text-slate-600 border border-slate-300'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  const dotClasses = {
    default: 'bg-slate-400',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    outline: 'bg-slate-400'
  };
  
  return (
    <span className={cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {dot && (
        <span className={cn(
          'w-2 h-2 rounded-full',
          dotClasses[variant]
        )} />
      )}
      {children}
    </span>
  );
};

export default Badge;