'use client';

import React from 'react';
import { useToast, dismissToast } from './use-toast';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] pointer-events-none">
      {toasts.map((t) => {
        const variantStyles = {
          default: 'bg-card border-primary/40 text-foreground',
          success: 'bg-card border-emerald-500/50 text-foreground',
          error: 'bg-card border-destructive/50 text-foreground',
          warning: 'bg-card border-amber-500/50 text-foreground',
        }[t.variant || 'default'];

        const Icon = {
          default: Info,
          success: CheckCircle2,
          error: XCircle,
          warning: AlertCircle,
        }[t.variant || 'default'];

        const iconColor = {
          default: 'text-primary',
          success: 'text-emerald-500',
          error: 'text-destructive',
          warning: 'text-amber-500',
        }[t.variant || 'default'];

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${variantStyles}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-xs text-foreground tracking-wide">{t.title}</h5>
              {t.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
