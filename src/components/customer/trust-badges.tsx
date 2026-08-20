'use client';

import React from 'react';
import Image from 'next/image';

export function TrustBadges() {
  const badges = [
    {
      icon: '/icons/delivery.svg',
      title: 'FREE DELIVERY',
      subtitle: 'For all orders above $99',
    },
    {
      icon: '/icons/original.svg',
      title: '100% ORIGINAL',
      subtitle: 'Genuine Products Only',
    },
    {
      icon: '/icons/secure.svg',
      title: 'SECURE PAYMENTS',
      subtitle: 'Safe & trusted checkout',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="bg-card border border-border rounded-xl p-4 sm:p-5 flex items-center gap-4 hover:border-primary/50 transition-all shadow-sm group"
        >
          <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
            <Image
              src={badge.icon}
              alt={badge.title}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-foreground">
              {badge.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{badge.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
