'use client';

import React from 'react';
import { HeroBannerSection } from '@/components/features/storefront/hero-banner';
import { CategoryGridSection } from '@/components/features/storefront/category-grid';
import { TrustBadges } from '@/components/customer/trust-badges';
import { TopPicksSection } from '@/components/features/storefront/top-picks-section';
import { NewArrivalsSection } from '@/components/features/storefront/new-arrivals';
import { PromoBannersSection } from '@/components/features/storefront/promo-banners';

export default function HomePage() {
  return (
    <div className="container py-6 space-y-10">
      <HeroBannerSection />
      <CategoryGridSection />
      <TrustBadges />
      <TopPicksSection />
      <NewArrivalsSection />
      <PromoBannersSection />
    </div>
  );
}
