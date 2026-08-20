import * as React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles: fluid 44px min touch target on mobile, smooth scaling, gold glow focus ring
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-wider uppercase text-[11px] sm:text-xs rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] max-w-full truncate';

    const variantStyles = {
      default:
        'bg-primary hover:bg-primary/90 text-primary-foreground primary-glow shadow-sm',
      secondary:
        'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border',
      outline:
        'border border-border bg-transparent hover:bg-card hover:border-primary hover:text-primary text-foreground',
      ghost:
        'bg-transparent hover:bg-card hover:text-primary text-foreground',
      destructive:
        'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm',
      link:
        'bg-transparent text-primary hover:underline underline-offset-4 p-0 h-auto lowercase font-normal',
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] min-h-[34px] sm:min-h-[36px]',
      md: 'px-3.5 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-xs min-h-[40px] sm:min-h-[44px]',
      lg: 'px-5 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm min-h-[44px] sm:min-h-[48px]',
      icon: 'w-9 h-9 sm:w-10 sm:h-10 p-0 min-h-[36px] sm:min-h-[40px] shrink-0',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
