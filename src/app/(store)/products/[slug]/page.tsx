'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Search,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Minus,
  Plus,
  FileText,
  Sliders,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, toggleWishlist } from '@/store';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Tabs } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ProductItem } from '@/types/store.types';

const PRODUCT_DATA: ProductItem & {
  category: string;
  categorySlug: string;
  subCategory: string;
  subCategorySlug: string;
  thumbnails: string[];
  storages: string[];
  colors: Array<{ name: string; hex: string }>;
  keyFeatures: string[];
  fullDescription: string;
  specifications: Array<{ label: string; value: string }>;
} = {
  id: 'var-1',
  name: 'iPhone 15 Pro Max',
  specs: '256GB, Natural Titanium',
  price: 1099,
  priceText: 'From $1,099',
  rating: 5,
  reviews: 120,
  image: '/products/iphone15.png',
  inStock: true,
  category: 'Mobiles',
  categorySlug: 'mobiles',
  subCategory: 'Smartphones',
  subCategorySlug: 'smartphones',
  thumbnails: [
    '/products/iphone15.png',
    '/cat/mobiles.png',
    '/products/iphone15.png',
    '/cat/mobiles.png',
  ],
  storages: ['256GB', '512GB', '1TB'],
  colors: [
    { name: 'Black Titanium', hex: '#1C1C1E' },
    { name: 'Natural Titanium', hex: '#8E8E93' },
    { name: 'White Titanium', hex: '#F2F2F7' },
    { name: 'Blue Titanium', hex: '#202A36' },
    { name: 'Titanium', hex: '#4A4A4A' },
  ],
  keyFeatures: [
    '6.7-inch Super Retina XDR display with ProMotion',
    'A17 Pro chip with GPU for blazing-fast performance',
    'Pro camera system with 48MP Main camera',
    'Titanium design with Action button',
    'USB-C connector with USB 3 support',
    'All-day battery life and up to 29 hours video playback',
  ],
  fullDescription:
    'Forged in Grade 5 Titanium, the iPhone 15 Pro Max features a strong yet lightweight aerospace-grade design. Driven by the groundbreaking A17 Pro chip with 6-core GPU, it offers unprecedented graphics performance and hardware-accelerated ray tracing. Capture incredible detail with the 48MP Main camera and standard 5x optical telephoto lens. The customizable Action button lets you quick-trigger your favorite features instantly.',
  specifications: [
    { label: 'Display Size & Technology', value: '6.7-inch Super Retina XDR OLED (2796 × 1290 px at 460 ppi)' },
    { label: 'Refresh Rate', value: 'ProMotion technology with adaptive refresh rates up to 120Hz' },
    { label: 'Processor / Chipset', value: 'Apple A17 Pro (3nm) with 6-core CPU & 6-core Neural Engine' },
    { label: 'Main Rear Cameras', value: '48MP Main (f/1.78) | 12MP Ultra Wide | 12MP 5x Telephoto' },
    { label: 'Front TrueDepth Camera', value: '12MP (f/1.9) with Autofocus and Retina Flash' },
    { label: 'Chassis & Build', value: 'Aerospace-grade Grade 5 Titanium with Textured Matte Glass Back' },
    { label: 'Port & Data Standard', value: 'USB-C with USB 3 speeds (up to 10Gb/s transfer speeds)' },
    { label: 'Battery & Video Playback', value: 'Up to 29 hours continuous video playback | Fast charging up to 50% in 30 mins' },
    { label: 'Operating System', value: 'iOS 17 (Upgradable to future iOS builds)' },
  ],
};

function ProductDetailContent({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === PRODUCT_DATA.id);

  const [selectedThumbIndex, setSelectedThumbIndex] = React.useState<number>(0);
  const [selectedStorage, setSelectedStorage] = React.useState<string>('256GB');
  const [selectedColor, setSelectedColor] = React.useState<string>('Natural Titanium');
  const [quantity, setQuantity] = React.useState<number>(1);
  const [activeTab, setActiveTab] = React.useState<string>('description');

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: PRODUCT_DATA.id,
        name: PRODUCT_DATA.name,
        specs: `${selectedStorage}, ${selectedColor}`,
        price: PRODUCT_DATA.price,
        quantity,
        image: PRODUCT_DATA.image,
      })
    );
    toast({
      title: 'Added to Shopping Cart',
      description: `${quantity} × ${PRODUCT_DATA.name} (${selectedStorage}) added to cart.`,
      variant: 'success',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist({ ...PRODUCT_DATA, inStock: true }));
    toast({
      title: !isWishlisted ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: `${PRODUCT_DATA.name} has been ${!isWishlisted ? 'added to' : 'removed from'} your wishlist.`,
      variant: !isWishlisted ? 'success' : 'default',
    });
  };

  return (
    <div className="container py-8 space-y-10">
      {/* Top Breadcrumb Navigation matching target screenshot */}
      <Breadcrumb
        items={[
          { label: PRODUCT_DATA.category, href: `/category/${PRODUCT_DATA.categorySlug}` },
          { label: PRODUCT_DATA.subCategory, href: `/category/${PRODUCT_DATA.categorySlug}/${PRODUCT_DATA.subCategorySlug}` },
          { label: PRODUCT_DATA.name, isCurrentPage: true },
        ]}
      />

      {/* Main 2-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Thumbnails Rail + Large Image Container (Col-span-6) */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 items-start">
          {/* Vertical Thumbnail Selector Rail */}
          <div className="flex sm:flex-col items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto overflow-x-auto sm:overflow-y-auto">
            <button className="hidden sm:flex p-1 rounded-md hover:bg-muted text-muted-foreground">
              <ChevronUp className="w-4 h-4" />
            </button>

            {PRODUCT_DATA.thumbnails.map((thumb, idx) => {
              const isSelected = selectedThumbIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedThumbIndex(idx)}
                  className={`w-16 h-16 sm:w-16 sm:h-16 rounded-xl border p-1 overflow-hidden transition-all shrink-0 flex items-center justify-center ${
                    isSelected
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/40 shadow-sm'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <Image src={thumb} alt="Product Thumbnail" width={56} height={56} className="object-contain" />
                </button>
              );
            })}

            <button className="hidden sm:flex p-1 rounded-md hover:bg-muted text-muted-foreground">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Large Main Image Cutout Container with Zoom Button */}
          <div className="relative flex-1 w-full h-[400px] sm:h-[480px] bg-[#141414] dark:bg-[#141414] light:bg-muted/30 rounded-xl border border-border flex items-center justify-center p-6 shadow-sm">
            <button
              className="absolute top-4 right-4 p-2.5 rounded-full bg-card border border-border text-foreground hover:text-primary transition-colors shadow-md z-10"
              title="Zoom Image"
            >
              <Search className="w-4 h-4" />
            </button>

            <Image
              src={PRODUCT_DATA.thumbnails[selectedThumbIndex] || PRODUCT_DATA.image}
              alt={PRODUCT_DATA.name}
              fill
              className="object-contain p-6 hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>

        {/* Right Column: Title, Specs, Storage, Colors, Key Features, Buy Buttons (Col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title + Rating + Stock Status Row */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {PRODUCT_DATA.name}
            </h1>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex text-primary text-xs">
                {'★'.repeat(5)}
              </div>
              <span className="text-muted-foreground font-semibold">({PRODUCT_DATA.reviews} Reviews)</span>
              <span className="text-border">|</span>
              <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>In Stock</span>
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-0.5 border-b border-border/60 pb-4">
            <div className="text-3xl font-black text-foreground">
              ${PRODUCT_DATA.price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Inclusive of all taxes</div>
          </div>

          {/* Storage Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Storage</label>
            <div className="flex items-center gap-3">
              {PRODUCT_DATA.storages.map((storage) => {
                const isSelected = selectedStorage === storage;
                return (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-border bg-card text-foreground hover:border-primary/50'
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Color</label>
            <div className="flex items-center gap-3">
              {PRODUCT_DATA.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full border border-border/80 transition-transform ${
                      isSelected ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
                    }`}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Key Features Checkmark Bullet List */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Key Features</h4>
            <ul className="space-y-2 text-xs text-foreground">
              {PRODUCT_DATA.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Stepper & Action Buttons Row */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-foreground">Quantity</span>
              <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1.5 hover:bg-muted text-foreground transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-extrabold text-foreground min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1.5 hover:bg-muted text-foreground transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 gap-2 font-bold uppercase tracking-wider text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleBuyNow}
                className="flex-1 font-bold text-primary border-primary hover:bg-primary/10 uppercase tracking-wider text-xs"
              >
                BUY NOW
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className="p-3 border-border hover:border-primary shrink-0"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-primary fill-primary' : 'text-foreground'}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Technical Specifications Tabbed Section replacing Trust Badges */}
      <section className="pt-6 border-t border-border space-y-6">
        <Tabs
          tabs={[
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Technical Specifications' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Description Tab Content */}
        {activeTab === 'description' && (
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-foreground">Product Overview</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{PRODUCT_DATA.fullDescription}</p>
          </Card>
        )}

        {/* Technical Specifications Tab Content */}
        {activeTab === 'specifications' && (
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Detailed Technical Specifications</h3>
            <div className="divide-y divide-border border border-border rounded-xl overflow-hidden text-xs">
              {PRODUCT_DATA.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 p-3.5 bg-card hover:bg-muted/30 transition-colors gap-2">
                  <div className="sm:col-span-4 font-bold text-foreground">{spec.label}</div>
                  <div className="sm:col-span-8 text-muted-foreground font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="container py-12 text-center text-xs text-muted-foreground">Loading product details...</div>}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
