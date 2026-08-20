'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Heart, ChevronDown, SlidersHorizontal, Check, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, toggleWishlist } from '@/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { toast } from '@/components/ui/use-toast';
import { ProductItem } from '@/types/store.types';

const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'var-1',
    name: 'iPhone 15 Pro Max',
    specs: '256GB, Natural Titanium',
    price: 1099,
    priceText: 'From $1,099',
    rating: 5,
    reviews: 120,
    image: '/products/iphone15.png',
  },
  {
    id: 'var-5',
    name: 'Samsung Galaxy S24 Ultra',
    specs: '12GB RAM, 256GB Storage',
    price: 1049,
    priceText: 'From $1,049',
    rating: 5,
    reviews: 98,
    image: '/cat/mobiles.png',
  },
  {
    id: 'var-2',
    name: 'MacBook Air M3',
    specs: '13-inch, 256GB SSD',
    price: 1199,
    priceText: 'From $1,199',
    rating: 5,
    reviews: 98,
    image: '/products/macbook.png',
  },
  {
    id: 'var-3',
    name: 'AirPods Pro (2nd Gen)',
    specs: 'White',
    price: 249,
    priceText: '$249',
    rating: 5,
    reviews: 64,
    image: '/products/airpods.png',
  },
  {
    id: 'var-4',
    name: 'Apple Watch Series 9',
    specs: 'Starlight, 41mm',
    price: 299,
    priceText: 'From $299',
    rating: 5,
    reviews: 73,
    image: '/products/applewatch.png',
  },
  {
    id: 'var-mbp',
    name: 'MacBook Pro 14" (M3 Pro)',
    specs: '18GB RAM, 512GB SSD',
    price: 1599,
    priceText: 'From $1,599',
    rating: 5,
    reviews: 54,
    image: '/cat/laptops.png',
  },
  {
    id: 'var-airpods3',
    name: 'AirPods (3rd Gen)',
    specs: 'White, Lightning Case',
    price: 179,
    priceText: '$179',
    rating: 5,
    reviews: 46,
    image: '/cat/audio.png',
  },
  {
    id: 'var-op12',
    name: 'OnePlus 12',
    specs: '16GB RAM, 512GB Storage',
    price: 699,
    priceText: 'From $699',
    rating: 5,
    reviews: 38,
    image: '/cat/mobiles.png',
  },
];

const CATEGORY_COUNTS = [
  { name: 'All Smartphones', count: 120, slug: 'mobiles' },
  { name: 'iPhone', count: 28, slug: 'iphone' },
  { name: 'Samsung', count: 32, slug: 'samsung' },
  { name: 'OnePlus', count: 14, slug: 'oneplus' },
  { name: 'Xiaomi', count: 18, slug: 'xiaomi' },
  { name: 'Oppo', count: 12, slug: 'oppo' },
  { name: 'Vivo', count: 16, slug: 'vivo' },
];

const BRAND_FILTERS = [
  { name: 'Apple', count: 28 },
  { name: 'Samsung', count: 32 },
  { name: 'OnePlus', count: 14 },
  { name: 'Xiaomi', count: 18 },
  { name: 'Oppo', count: 12 },
  { name: 'Vivo', count: 16 },
];

const RATING_FILTERS = [
  { stars: 5, count: 68 },
  { stars: 4, count: 34 },
  { stars: 3, count: 12 },
  { stars: 2, count: 4 },
  { stars: 1, count: 2 },
];

const COLOR_SWATCHES = [
  { name: 'Black', hex: '#1C1C1E' },
  { name: 'Gray', hex: '#8E8E93' },
  { name: 'White', hex: '#F2F2F7' },
  { name: 'Gold', hex: '#C5A059' },
  { name: 'Blue', hex: '#007AFF' },
  { name: 'Purple', hex: '#AF52DE' },
];

function CatalogContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const currentCategory = searchParams.get('category') || 'mobiles';
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState<number>(1199);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sortBy, setSortBy] = React.useState<string>('popular');

  const isWishlisted = (id: string) => wishlistItems.some((item) => item.id === id);

  const handleToggleWishlist = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist({ ...product, inStock: true }));
    const isNowAdded = !isWishlisted(product.id);
    toast({
      title: isNowAdded ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: `${product.name} has been ${isNowAdded ? 'added to' : 'removed from'} your wishlist.`,
      variant: isNowAdded ? 'success' : 'default',
    });
  };

  const handleAddToCart = (product: ProductItem) => {
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

  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedColor(null);
    setPriceRange(1199);
    router.push('/products');
  };

  return (
    <div className="container py-6">
      {/* Structural Hierarchy: Grid Layout with FILTERS on Left, Main Column on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: FILTERS Sidebar starting at top left edge matching screenshot */}
        <aside className="lg:col-span-3 bg-card border border-border rounded-xl p-5 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>FILTERS</span>
            </h3>
          </div>

          {/* Categories Accordion Section */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Categories</h4>
            <div className="space-y-1.5 text-xs">
              {CATEGORY_COUNTS.map((cat, idx) => {
                const isActive = idx === 0;
                return (
                  <div
                    key={cat.name}
                    className={`flex items-center justify-between cursor-pointer py-1 px-2 rounded-md transition-colors ${
                      isActive ? 'text-primary font-bold bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">({cat.count})</span>
                  </div>
                );
              })}
            </div>
            <button className="text-[11px] font-bold text-primary hover:underline pt-1">+ View More</button>
          </div>

          {/* Price Range Filter */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold uppercase tracking-wider text-muted-foreground">Price Range</h4>
              <span className="font-bold text-foreground">$249 — ${priceRange}</span>
            </div>
            <input
              type="range"
              min="249"
              max="1599"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Brands Filter */}
          <div className="border-t border-border pt-4 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Brands</h4>
            <div className="space-y-2 text-xs">
              {BRAND_FILTERS.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    label={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedBrands((prev) => [...prev, brand.name]);
                      else setSelectedBrands((prev) => prev.filter((b) => b !== brand.name));
                    }}
                  />
                  <span className="text-[11px] text-muted-foreground">({brand.count})</span>
                </div>
              ))}
            </div>
            <button className="text-[11px] font-bold text-primary hover:underline pt-1">+ View More</button>
          </div>

          {/* Customer Rating Filter */}
          <div className="border-t border-border pt-4 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Customer Rating</h4>
            <div className="space-y-2 text-xs">
              {RATING_FILTERS.map((rating) => (
                <div key={rating.stars} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`rating-${rating.stars}`} />
                    <div className="flex text-primary text-xs">
                      {'★'.repeat(rating.stars)}
                      <span className="text-muted-foreground/30">{'★'.repeat(5 - rating.stars)}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground">({rating.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Swatch Filter */}
          <div className="border-t border-border pt-4 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Color</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_SWATCHES.map((swatch) => {
                const isSelected = selectedColor === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedColor(isSelected ? null : swatch.name)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`w-6 h-6 rounded-full border border-border flex items-center justify-center transition-transform ${
                      isSelected ? 'scale-110 ring-2 ring-primary' : 'hover:scale-105'
                    }`}
                    title={swatch.name}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear All Button */}
          <div className="pt-2">
            <Button variant="outline" fullWidth size="sm" onClick={handleClearAll} className="uppercase font-bold text-xs">
              CLEAR ALL
            </Button>
          </div>
        </aside>

        {/* Right Main Column: Breadcrumb + Title + Sort Bar + Product Grid + Pagination matching screenshot */}
        <main className="lg:col-span-9 space-y-5">
          {/* Line 1: Breadcrumb inside right column */}
          <div className="flex justify-center sm:justify-start">
            <Breadcrumb
              items={[
                { label: 'Mobiles', href: '/products?category=mobiles' },
                { label: 'Smartphones', isCurrentPage: true },
              ]}
              showHomeIcon={true}
            />
          </div>

          {/* Line 2: Headline "All Smartphones" */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              All Smartphones
            </h1>
          </div>

          {/* Line 3: Subtitle on Left, Sort by Dropdown on Right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
            <p className="text-xs text-muted-foreground">Showing 1–12 of 120 results</p>

            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs text-muted-foreground font-semibold shrink-0">Sort by:</span>
              <div className="relative border border-border rounded-xl bg-card shadow-sm px-3 py-1.5 min-w-[130px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-foreground pr-6 focus:outline-none cursor-pointer appearance-none w-full"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Line 4: 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATALOG_PRODUCTS.map((product) => {
              const wishlisted = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-sm group cursor-pointer relative"
                >
                  {/* Top Right Heart Icon Toggle */}
                  <button
                    onClick={(e) => handleToggleWishlist(product, e)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-primary"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'text-primary fill-primary' : ''}`} />
                  </button>

                  <Link href={`/products/${product.id}`} className="block">
                    {/* Centered High-Res Transparent Cutout Image */}
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
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3 gap-1.5 text-[11px] font-bold uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Line 5: Bottom Pagination Bar */}
          <div className="pt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center text-xs text-muted-foreground">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
