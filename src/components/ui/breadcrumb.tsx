import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItemProps {
  href?: string;
  label: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumb({ items, className = '', showHomeIcon = true }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-muted-foreground ${className}`}>
      <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Optional Home Icon */}
        {showHomeIcon && (
          <li className="inline-flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrentPage;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {isLast || !item.href ? (
                <span className="font-bold text-foreground truncate max-w-[200px]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition-colors truncate max-w-[150px]">
                  {item.label}
                </Link>
              )}

              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
