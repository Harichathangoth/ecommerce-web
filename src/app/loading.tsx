import React from 'react';

export default function Loading() {
  return (
    <div className="container py-12 min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground animate-pulse">
        Loading Storefront...
      </span>
    </div>
  );
}
