'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import { APP_CONFIG } from '@/config/app-config';
import { Sheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'MOBILES', href: '/category/mobiles/smartphones' },
    { label: 'LAPTOPS', href: '/category/laptops' },
    { label: 'ACCESSORIES', href: '/category/accessories' },
    { label: 'SMART WATCHES', href: '/category/watches' },
    { label: 'AUDIO', href: '/category/audio' },
    { label: 'DEALS', href: '/products?filter=deals' },
    { label: 'NEW ARRIVALS', href: '/products?filter=new' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-colors duration-200">
      {/* Main Header Row */}
      <div className="container py-3 flex items-center justify-between gap-4 sm:gap-6">
        {/* Mobile Menu Drawer Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="sm:hidden p-2 rounded-md border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo Only */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="relative w-32 h-10 sm:w-44 sm:h-14">
            <Image
              src="/logo.png"
              alt={APP_CONFIG.name}
              fill
              className="object-contain hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Search Bar with Category Dropdown (Boxy Styling) */}
        <div className="hidden md:flex flex-1 max-w-2xl items-center border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 px-4 py-2.5 text-xs text-foreground bg-transparent focus:outline-none placeholder:text-muted-foreground"
          />
          <div className="relative border-l border-border px-3">
            <select className="bg-transparent text-xs text-muted-foreground pr-6 py-2 focus:outline-none cursor-pointer appearance-none font-semibold">
              <option value="all">All Categories</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="audio">Audio</option>
              <option value="accessories">Accessories</option>
            </select>
            <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 px-5 transition-colors font-bold">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right User Actions */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Account */}
          <Link href="/admin" className="flex items-center gap-2 text-xs hover:text-primary transition-colors">
            <User className="w-5 h-5 text-primary" />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] text-muted-foreground leading-none">Login / Register</span>
              <div className="flex items-center gap-1 font-bold text-foreground text-xs leading-tight">
                <span>My Account</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative flex items-center gap-1.5 p-1.5 hover:text-primary transition-colors text-xs font-semibold">
            <div className="relative">
              <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center gap-1.5 p-1.5 hover:text-primary transition-colors text-xs font-semibold">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-card border-t border-border hidden sm:block">
        <div className="container flex items-center gap-2 text-xs font-bold">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 flex items-center gap-2 transition-colors uppercase tracking-wider font-extrabold rounded-t-sm">
            <Menu className="w-4 h-4" />
            <span>ALL CATEGORIES</span>
          </button>

          <div className="flex items-center gap-6 px-4 overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`py-3 transition-colors tracking-wider whitespace-nowrap ${
                  pathname === item.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Navigation Sheet Drawer */}
      <Sheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Navigation Menu"
        side="left"
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">
              Browse Categories
            </span>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground font-black'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xs font-bold text-foreground py-2"
            >
              <User className="w-4 h-4 text-primary" />
              <span>Login / My Account</span>
            </Link>
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xs font-bold text-foreground py-2"
            >
              <Search className="w-4 h-4 text-primary" />
              <span>Track Your Order</span>
            </Link>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
