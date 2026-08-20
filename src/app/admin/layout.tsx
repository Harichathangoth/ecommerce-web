'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Store, Layers, RefreshCw, ShoppingCart, Users, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedBranch } from '@/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedBranchId = useAppSelector((state) => state.branch.selectedBranchId);

  const adminNav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Store Branches', href: '/admin/branches', icon: Store },
    { label: 'Inventory & Transfers', href: '/admin/inventory', icon: Layers },
    { label: 'Stock Transfers', href: '/admin/transfers', icon: RefreshCw },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Staff & Roles', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          {/* Admin Logo */}
          <Link href="/admin" className="flex items-center gap-2 px-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-black font-extrabold text-lg primary-glow">
              OD
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wider text-foreground">ODÉRA ADMIN</span>
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Multi-Branch Control</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-black primary-glow'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="pt-4 border-t border-border space-y-3">
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-2">
            <LogOut className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Topbar Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Store className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground font-semibold">Active Branch:</span>
              <select
                value={selectedBranchId}
                onChange={(e) =>
                  dispatch(
                    setSelectedBranch({
                      id: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    })
                  )
                }
                className="bg-background border border-input rounded-md px-2.5 py-1 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="br-nyc-01">New York Main Branch (NYC-01)</option>
                <option value="br-lax-02">Los Angeles Branch (LAX-02)</option>
                <option value="br-chi-03">Chicago Central Branch (CHI-03)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>

            <div className="flex items-center gap-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center border border-primary/40">
                SA
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-foreground">Super Admin</span>
                <span className="text-[10px] text-muted-foreground">admin@oderadigitalhub.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
