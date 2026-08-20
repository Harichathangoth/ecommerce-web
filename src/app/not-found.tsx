'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center container py-12">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border rounded-xl p-8 shadow-lg">
        {/* Metallic Gold 404 Display */}
        <div className="space-y-2">
          <span className="text-6xl sm:text-7xl font-black tracking-tight text-primary drop-shadow-sm">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page or product you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground pr-10 focus:outline-none focus:border-primary transition-colors"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="flex-1">
            <Button fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>

          <Link href="/products" className="flex-1">
            <Button variant="outline" fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
