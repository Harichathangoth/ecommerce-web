'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function PromoBannersSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {/* Banner Card 1: Premium Devices */}
      <Link
        href="/products"
        className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] rounded-xl border border-border overflow-hidden shadow-xl bg-black"
      >
        <Image
          src="/promo-banner2.png"
          alt="Premium Devices Exclusive Prices"
          fill
          className="object-cover object-center"
          priority
        />
      </Link>

      {/* Banner Card 2: Accessories */}
      <Link
        href="/products?category=accessories"
        className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] rounded-xl border border-border overflow-hidden shadow-xl bg-black"
      >
        <Image
          src="/promo-banner1.png"
          alt="Accessories That Complete You"
          fill
          className="object-cover object-center"
          priority
        />
      </Link>
    </section>
  );
}
