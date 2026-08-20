'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function HeroBannerSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const heroBannerSrc = mounted && theme === 'light' ? '/banner-light.png' : '/banner-dark.png';
  const heroBannerBg = mounted && theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-[#000000]';

  return (
    <section className={`relative rounded-2xl border border-border overflow-hidden shadow-2xl w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[460px] ${heroBannerBg}`}>
      <Link href="/products" className="block w-full h-full relative">
        <Image
          src={heroBannerSrc}
          alt="OPÉRA Technology Elevated Banner"
          fill
          className="object-contain object-center"
          priority
        />
      </Link>
    </section>
  );
}
