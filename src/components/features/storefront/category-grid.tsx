'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mock-store-data';
import { useActiveCategoriesQuery } from '@/modules/categories';

export function CategoryGridSection() {
  const { data: apiCategories } = useActiveCategoriesQuery();

  const categoriesList =
    apiCategories && apiCategories.length > 0
      ? apiCategories.map((c) => ({
          name: c.name,
          href: `/category/${c.slug}`,
          image: c.imageUrl || '/cat/mobiles.png',
        }))
      : CATEGORIES;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
      {categoriesList.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className="bg-card border border-border hover:border-primary/80 rounded-xl p-4 flex flex-col items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-1 shadow-sm group min-h-[140px] text-center"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 my-auto">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
          </div>
          <span className="text-xs font-extrabold text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
            {cat.name}
          </span>
        </Link>
      ))}
    </section>
  );
}
