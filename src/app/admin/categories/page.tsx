'use client';

import React, { useState } from 'react';
import { Layers, Plus, Search, Trash2, CheckCircle2, XCircle, Sparkles, X } from 'lucide-react';
import {
  useAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  CategoryRecord,
} from '@/modules/categories';

const initialMockCategories: CategoryRecord[] = [
  { id: 'cat-1', name: 'Smartphones', slug: 'smartphones', description: 'Flagship mobile devices & accessories', imageUrl: '/cat/mobiles.png', displayOrder: 1, isActive: true },
  { id: 'cat-2', name: 'Laptops', slug: 'laptops', description: 'Enterprise ultrabooks & workstation laptops', imageUrl: '/cat/laptops.png', displayOrder: 2, isActive: true },
  { id: 'cat-3', name: 'Accessories', slug: 'accessories', description: 'Charging docks, cases, cables & peripherals', imageUrl: '/cat/accessories.png', displayOrder: 3, isActive: true },
  { id: 'cat-4', name: 'Smart Watches', slug: 'watches', description: 'Fitness bands & cellular wearables', imageUrl: '/cat/watches.png', displayOrder: 4, isActive: true },
  { id: 'cat-5', name: 'Audio', slug: 'audio', description: 'Noise-canceling headphones & wireless earbuds', imageUrl: '/cat/audio.png', displayOrder: 5, isActive: true },
  { id: 'cat-6', name: 'Tablets', slug: 'tablets', description: 'Creative slates & pro tablets', imageUrl: '/cat/tablets.png', displayOrder: 6, isActive: true },
];

export default function AdminCategoriesPage() {
  const { data: apiCategories, isLoading } = useAdminCategoriesQuery();
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = apiCategories && apiCategories.length > 0 ? apiCategories : initialMockCategories;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    displayOrder: 1,
  });

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    createCategoryMutation.mutate(
      { ...formData, slug },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setFormData({ name: '', slug: '', description: '', imageUrl: '', displayOrder: 1 });
        },
      }
    );
  };

  const handleToggleStatus = (category: CategoryRecord) => {
    updateCategoryMutation.mutate({
      id: category.id,
      isActive: !category.isActive,
    });
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Category & Navigation Control</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage product categories, display hierarchy, slug routes, and storefront visibility using TanStack React Query.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories or slugs..."
            className="w-full bg-card border border-input rounded-lg pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border uppercase font-bold text-muted-foreground">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Slug Route</th>
                <th className="p-4 text-center">Display Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground font-semibold">
                    Loading Categories via TanStack Query...
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-1 flex items-center justify-center shrink-0">
                          {cat.imageUrl ? (
                            <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-contain" />
                          ) : (
                            <Layers className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-foreground">{cat.name}</span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">{cat.description || 'No description'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-cyan-400 font-semibold">/category/{cat.slug}</td>
                    <td className="p-4 text-center font-bold text-foreground">{cat.displayOrder}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        disabled={updateCategoryMutation.isPending}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border flex items-center gap-1 transition-all ${
                          cat.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {cat.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{cat.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        disabled={deleteCategoryMutation.isPending}
                        className="p-1.5 rounded-md hover:bg-rose-500/10 text-rose-500 transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h2 className="text-base font-extrabold">Add New Category</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Gaming Consoles"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Slug Route (Optional)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. gaming-consoles"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary for catalog description..."
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/cat/gaming.png"
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
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
                  disabled={createCategoryMutation.isPending}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  {createCategoryMutation.isPending ? 'Saving...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
