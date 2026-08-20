'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Award } from 'lucide-react';

export function Topbar() {
  return (
    <div className="bg-background border-b border-border text-xs py-2 px-4 text-muted-foreground transition-colors duration-200">
      <div className="container flex flex-wrap justify-between items-center gap-4">
        {/* Left Announcements */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-primary" />
            <span>Free Shipping for all orders above $99</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>100% Original Products</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>1 Year Warranty</span>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <Link href="/store-locator" className="hover:text-primary transition-colors">
            Store Locator
          </Link>
          <Link href="/track-order" className="hover:text-primary transition-colors">
            Track Order
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
