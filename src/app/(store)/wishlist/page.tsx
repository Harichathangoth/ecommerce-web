'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleWishlist, addToCart } from '@/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TrustBadges } from '@/components/customer/trust-badges';
import { toast } from '@/components/ui/use-toast';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const isAllSelected = wishlistItems.length > 0 && selectedIds.length === wishlistItems.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(wishlistItems.map((item) => item.id));
    }
  };

  const handleToggleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (item: (typeof wishlistItems)[0]) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        specs: item.specs,
        price: item.price,
        quantity: 1,
        image: item.image,
      })
    );
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your shopping cart.`,
      variant: 'success',
    });
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          specs: item.specs,
          price: item.price,
          quantity: 1,
          image: item.image,
        })
      );
    });
    toast({
      title: 'Moved All Items to Cart',
      description: `All ${wishlistItems.length} wishlist items added to shopping cart.`,
      variant: 'success',
    });
  };

  const handleRemoveItem = (item: (typeof wishlistItems)[0]) => {
    dispatch(toggleWishlist(item));
    setSelectedIds((prev) => prev.filter((i) => i !== item.id));
    toast({
      title: 'Removed from Wishlist',
      description: `${item.name} has been removed from your wishlist.`,
      variant: 'default',
    });
  };

  return (
    <div className="container py-8 space-y-6">
      {/* Top Bar: Title on Left, Breadcrumb on Right matching target screenshot */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          My Wishlist ({wishlistItems.length})
        </h1>
        <Breadcrumb items={[{ label: 'Wishlist', isCurrentPage: true }]} showHomeIcon={false} />
      </div>

      {/* Sub-Header: Select All on Left, Actions on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={handleToggleSelectAll} />
          <label htmlFor="select-all" className="cursor-pointer select-none">
            Select All
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" onClick={handleMoveAllToCart} disabled={wishlistItems.length === 0} className="gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Move All To Cart</span>
          </Button>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Your wishlist is currently empty</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Explore products and click the heart icon to save items to your wishlist.
          </p>
          <Link href="/products">
            <Button size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Products</span>
            </Button>
          </Link>
        </Card>
      ) : (
        /* Exact Horizontal Rows Grid matching target screenshot */
        <div className="space-y-3">
          {wishlistItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-sm hover:border-primary/50 transition-all duration-200"
              >
                {/* Col 1-5: Checkbox + Dark Rounded Box Image + Title + Specs + In Stock */}
                <div className="md:col-span-5 flex items-center gap-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleToggleSelectItem(item.id)}
                  />

                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#141414] dark:bg-[#141414] light:bg-muted/40 rounded-xl overflow-hidden shrink-0 border border-border/60 flex items-center justify-center">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.specs}</p>
                    <div className="flex items-center gap-1.5 pt-1 text-xs text-emerald-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>In Stock</span>
                    </div>
                  </div>
                </div>

                {/* Col 6-8: Price (Center-Right Aligned) */}
                <div className="md:col-span-3 text-left md:text-right">
                  <span className="text-base sm:text-lg font-black text-foreground">
                    ${item.price.toLocaleString()}
                  </span>
                </div>

                {/* Col 9-11: Stacked Action Buttons (Add to Cart top, Remove bottom) */}
                <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2 items-start md:items-end w-full md:w-auto">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="w-full sm:w-auto min-w-[130px] justify-center gap-1.5 text-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveItem(item)}
                    className="w-full sm:w-auto min-w-[130px] justify-center gap-1.5 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </Button>
                </div>

                {/* Col 12: Far Right Solid Gold Heart */}
                <div className="md:col-span-1 flex justify-end">
                  <Heart className="w-5 h-5 text-primary fill-primary shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust Badges Section */}
      <div className="pt-6">
        <TrustBadges />
      </div>
    </div>
  );
}
