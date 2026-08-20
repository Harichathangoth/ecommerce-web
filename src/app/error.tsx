'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center container py-12">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border rounded-xl p-8 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-foreground">Something went wrong!</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An unexpected application error occurred. You can attempt to refresh the view or return to storefront.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={() => reset()} fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="flex-1">
            <Button variant="outline" fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
