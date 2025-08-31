// src/components/layout/Breadcrumbs.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        {/* Home Icon */}
        <button
          onClick={() => onNavigate?.('/dashboard')}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Go to dashboard"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
          </svg>
        </button>
        
        {/* Separator */}
        <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Breadcrumb Items */}
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.isActive || isLast;

          return (
            <li key={index} className="flex items-center space-x-2">
              {/* Breadcrumb Item */}
              {item.href && !isActive ? (
                <button
                  onClick={() => onNavigate?.(item.href!)}
                  className="text-slate-500 hover:text-slate-700 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <span className={cn(
                  'font-medium',
                  isActive ? 'text-slate-900' : 'text-slate-500'
                )}>
                  {item.label}
                </span>
              )}
              
              {/* Separator */}
              {!isLast && (
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
export type { BreadcrumbItem };