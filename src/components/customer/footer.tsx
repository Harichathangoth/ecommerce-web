'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, CreditCard, HelpCircle } from 'lucide-react';
import { APP_CONFIG } from '@/config/app-config';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-xs text-muted-foreground pt-12 pb-8 mt-16 transition-colors duration-200">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Column 1: Opera Logo & Contact Us */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 group inline-flex">
            <div className="relative w-36 h-12">
              <Image
                src="/logo.png"
                alt="Opera Store Logo"
                fill
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {APP_CONFIG.description || 'Premium Enterprise Electronics & Next-Gen Smart Hardware.'}
          </p>

          <div className="space-y-2 pt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+1 (800) 555-OPERA</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>support@operastore.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Enterprise Park, Tower A</span>
            </div>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-foreground tracking-wider uppercase text-xs border-b border-border pb-2">
            CATEGORIES
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/category/mobiles/smartphones" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Smartphones</span>
              </Link>
            </li>
            <li>
              <Link href="/category/laptops" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Laptops & MacBooks</span>
              </Link>
            </li>
            <li>
              <Link href="/category/audio" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Headphones & Audio</span>
              </Link>
            </li>
            <li>
              <Link href="/category/watches" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Smart Watches</span>
              </Link>
            </li>
            <li>
              <Link href="/category/accessories" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Accessories & Power</span>
              </Link>
            </li>
            <li>
              <Link href="/category/tablets" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Tablets & iPads</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Policies */}
        <div className="space-y-3">
          <h4 className="font-bold text-foreground tracking-wider uppercase text-xs border-b border-border pb-2">
            POLICIES & CARE
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/track-order" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Track Order Status</span>
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Terms & Conditions</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Return & Warranty Policy</span>
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>My Wishlist</span>
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Shopping Cart</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Accepted Payments & Support */}
        <div className="space-y-3">
          <h4 className="font-bold text-foreground tracking-wider uppercase text-xs border-b border-border pb-2">
            ACCEPTED PAYMENTS
          </h4>

          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-foreground">100% Encrypted Checkout</span>
            </div>

            {/* Payment Method Badges Row */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'PAYPAL'].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-[10px] font-extrabold text-foreground tracking-wider"
                >
                  {method}
                </span>
              ))}
            </div>

            <div className="pt-2 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                <span>24/7 Priority Customer Support</span>
              </div>
              <Link href="/not-found" className="text-xs font-bold text-primary hover:underline block pt-1">
                Need Help? Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar: Copyright */}
      <div className="container border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p className="text-muted-foreground font-medium">
          © 2026 OPERA Store. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span className="text-border">•</span>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
