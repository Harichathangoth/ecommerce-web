'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { NEW_ARRIVALS } from '@/data/mock-store-data';
import { ProductItem } from '@/types/store.types';

export function NewArrivalsSection() {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        specs: product.specs,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    );
    toast({
      title: 'Added to Shopping Cart',
      description: `${product.name} has been added to your cart.`,
      variant: 'success',
    });
  };

  return (
    <section className="relative space-y-5">
      {/* Section Header with Bold Gold Underline Accent */}
      <div className="flex items-end justify-between border-b border-border/40 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-wider uppercase text-foreground dark:text-primary">
            NEW ARRIVALS
          </h2>
          <div className="flex items-center gap-10 mt-1.5">
            <span className="w-8 h-1 bg-primary rounded-full shadow-sm" />
            <span className="w-8 h-1 bg-primary rounded-full shadow-sm" />
          </div>
        </div>
        <Link href="/products?filter=new" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
          View All
        </Link>
      </div>

      {/* 4-Card New Arrivals Grid with Side Arrow Navigation */}
      <div className="relative group/new-carousel">
        {/* Floating Left Arrow */}
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all shadow-lg opacity-90 hover:opacity-100">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEW_ARRIVALS.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-sm group cursor-pointer relative"
            >
              {/* NEW Badge Pill */}
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="gold">NEW</Badge>
              </div>

              <Link href={`/products/${product.id}`} className="block">
                {/* Centered High-Res Transparent Image */}
                <div className="relative w-full h-44 sm:h-48 mb-3 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Left-Aligned Typography */}
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs font-extrabold text-foreground">{product.priceText}</p>

                  <div className="flex items-center gap-1 text-xs pt-1">
                    <div className="flex text-primary text-xs">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-muted-foreground text-[10px] font-semibold">({product.reviews})</span>
                  </div>
                </div>
              </Link>

              {/* Neat & Clean Add to Cart Button */}
              <Button
                size="sm"
                onClick={(e) => handleAddToCart(product, e)}
                className="w-full mt-3 gap-1.5 text-[11px] font-bold uppercase tracking-wider"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </Button>
            </div>
          ))}
        </div>

        {/* Floating Right Arrow */}
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all shadow-lg opacity-90 hover:opacity-100">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
