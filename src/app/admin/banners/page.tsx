'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, CheckCircle2, XCircle, Trash2, ExternalLink, Sparkles, X, Sun, Moon } from 'lucide-react';
import {
  useAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  BannerRecord,
} from '@/modules/banners';

const initialMockBanners: BannerRecord[] = [
  { id: 'b-1', title: 'OPÉRA Hero Dark Mode Banner', type: 'HERO_DARK', imageUrl: '/banner-dark.png', targetUrl: '/products', displayOrder: 1, isActive: true },
  { id: 'b-2', title: 'OPÉRA Hero Light Mode Banner', type: 'HERO_LIGHT', imageUrl: '/banner-light.png', targetUrl: '/products', displayOrder: 2, isActive: true },
  { id: 'b-3', title: 'Promo Card: Accessories Special', type: 'PROMO_CARD', imageUrl: '/promo-banner1.png', targetUrl: '/products?category=accessories', displayOrder: 3, isActive: true },
  { id: 'b-4', title: 'Promo Card: Premium Flagships', type: 'PROMO_CARD', imageUrl: '/promo-banner2.png', targetUrl: '/products', displayOrder: 4, isActive: true },
];

export default function AdminBannersPage() {
  const { data: apiBanners, isLoading } = useAdminBannersQuery();
  const createBannerMutation = useCreateBannerMutation();
  const updateBannerMutation = useUpdateBannerMutation();
  const deleteBannerMutation = useDeleteBannerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const banners = apiBanners && apiBanners.length > 0 ? apiBanners : initialMockBanners;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'HERO_DARK' as BannerRecord['type'],
    imageUrl: '',
    targetUrl: '/products',
    displayOrder: 1,
  });

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    createBannerMutation.mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData({ title: '', type: 'HERO_DARK', imageUrl: '', targetUrl: '/products', displayOrder: 1 });
      },
    });
  };

  const handleToggleStatus = (banner: BannerRecord) => {
    updateBannerMutation.mutate({
      id: banner.id,
      isActive: !banner.isActive,
    });
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Are you sure you want to delete this banner asset?')) {
      deleteBannerMutation.mutate(id);
    }
  };

  const getBadgeType = (type: BannerRecord['type']) => {
    switch (type) {
      case 'HERO_DARK':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1"><Moon className="w-3 h-3" /> HERO (DARK)</span>;
      case 'HERO_LIGHT':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Sun className="w-3 h-3" /> HERO (LIGHT)</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1"><ImageIcon className="w-3 h-3" /> PROMO GRID</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Banners & Storefront Promotions Control</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Configure dynamic homepage hero banners, theme mode variants, promotional campaign graphics, and landing links via TanStack React Query.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Banners Grid */}
      {isLoading ? (
        <div className="p-8 text-center text-xs text-muted-foreground font-semibold">
          Loading Banners via TanStack Query...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm hover:border-cyan-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getBadgeType(banner.type)}
                  <button
                    onClick={() => handleToggleStatus(banner)}
                    disabled={updateBannerMutation.isPending}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border flex items-center gap-1 transition-all ${
                      banner.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {banner.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{banner.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                  </button>
                </div>

                {/* Banner Preview Thumbnail */}
                <div className="relative w-full h-[140px] rounded-lg border border-border bg-black/40 overflow-hidden flex items-center justify-center p-2">
                  {banner.imageUrl ? (
                    <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-contain" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-foreground">{banner.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono mt-1">
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{banner.targetUrl || '/products'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold">Order: #{banner.displayOrder}</span>
                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  disabled={deleteBannerMutation.isPending}
                  className="p-1.5 rounded-md hover:bg-rose-500/10 text-rose-500 transition-colors"
                  title="Delete banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h2 className="text-base font-extrabold">Add New Banner Asset</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBanner} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Banner Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Summer Electronics Mega Deal"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Banner Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-background border border-input rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="HERO_DARK">Hero (Dark Mode)</option>
                    <option value="HERO_LIGHT">Hero (Light Mode)</option>
                    <option value="PROMO_CARD">Promo Card Grid</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Image Asset Path / URL</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="e.g. /banner-dark.png or https://..."
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Destination Route Target</label>
                <input
                  type="text"
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  placeholder="e.g. /products?category=accessories"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBannerMutation.isPending}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  {createBannerMutation.isPending ? 'Saving...' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
