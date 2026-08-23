'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Layers,
  RefreshCw,
  ShoppingCart,
  Users,
  Key,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  User,
  Package,
  Image as ImageIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedBranch, logout } from '@/store';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = React.useState(false);

  const selectedBranchId = useAppSelector((state) => state.branch.selectedBranchId);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Exclude login route from admin layout wrapper
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoginPage, isAuthenticated, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Continue client logout even if server request fails
    } finally {
      dispatch(logout());
      router.refresh();
      router.push('/admin/login');
    }
  };

  const adminNav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products Catalog', href: '/admin/products', icon: Package },
    { label: 'Categories Control', href: '/admin/categories', icon: Layers },
    { label: 'Banners & Promos', href: '/admin/banners', icon: ImageIcon },
    { label: 'Store Branches', href: '/admin/branches', icon: Store },
    { label: 'Inventory & Stock', href: '/admin/inventory', icon: RefreshCw },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Staff & Accounts', href: '/admin/users', icon: Users },
    { label: 'Roles & Permissions', href: '/admin/roles', icon: Key },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          {/* Admin Logo */}
          <Link href="/admin" className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-base shadow-md shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wider text-foreground">ENTERPRISE ADMIN</span>
              <span className="text-[10px] text-cyan-500 uppercase font-bold tracking-widest">Global Commerce Control</span>
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
                      ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-rose-500 hover:text-rose-400 font-bold transition-colors px-2 py-1.5 rounded-md hover:bg-rose-500/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Topbar Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Store className="w-4 h-4 text-cyan-500" />
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
                className="bg-background border border-input rounded-md px-2.5 py-1 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="br-hq-01">Main Headquarters (HQ-01)</option>
                <option value="br-est-02">East Coast Hub (EST-02)</option>
                <option value="br-wst-03">West Coast Hub (WST-03)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md border border-border text-foreground hover:border-cyan-500 hover:text-cyan-500 transition-colors"
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="w-4 h-4 text-cyan-500" /> : <Moon className="w-4 h-4 text-cyan-500" />
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            <div className="flex items-center gap-2.5 text-xs">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold flex items-center justify-center border border-cyan-500/40">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-foreground">{user?.fullName || 'Super Admin'}</span>
                <span className="text-[10px] text-cyan-500 uppercase font-extrabold tracking-wider">
                  {user?.role?.name || user?.role?.slug || 'SUPER_ADMIN'}
                </span>
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
