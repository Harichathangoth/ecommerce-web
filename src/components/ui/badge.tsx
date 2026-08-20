import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'success' | 'destructive' | 'secondary' | 'outline';
}

export function Badge({
  className = '',
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-primary/10 text-primary border border-primary/20',
    gold: 'bg-primary text-primary-foreground font-extrabold shadow-sm',
    success: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
    destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
    secondary: 'bg-secondary text-secondary-foreground border border-border',
    outline: 'border border-border text-foreground bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
