'use client';

import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, Star, Edit2, Trash2, CheckCircle2, Sparkles, X } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface ProductRecord {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  basePrice: number;
  rating?: number;
  isFeatured?: boolean;
}

const initialMockProducts: ProductRecord[] = [
  { id: 'p-1', name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'Smartphones', description: '256GB Natural Titanium flagship smartphone', basePrice: 1099, rating: 5, isFeatured: true },
  { id: 'p-2', name: 'MacBook Air M3', brand: 'Apple', category: 'Laptops', description: '13-inch 256GB SSD ultrabook notebook', basePrice: 1199, rating: 5, isFeatured: true },
  { id: 'p-3', name: 'AirPods Pro (2nd Gen)', brand: 'Apple', category: 'Audio', description: 'Active Noise Cancelling wireless earbuds', basePrice: 249, rating: 5, isFeatured: false },
  { id: 'p-4', name: 'Apple Watch Series 9', brand: 'Apple', category: 'Smart Watches', description: 'Starlight 41mm cellular smartwatch', basePrice: 299, rating: 5, isFeatured: false },
  { id: 'p-5', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'Smartphones', description: '12GB 256GB AI flagship mobile phone', basePrice: 1049, rating: 5, isFeatured: true },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>(initialMockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    category: 'Smartphones',
    description: '',
    basePrice: 999,
    isFeatured: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<{ items: ProductRecord[] }>('/products');
      if (res && res.items && res.items.length > 0) {
        setProducts(res.items);
      }
    } catch {
      // Keep mock initial products
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const created = await apiClient.post<ProductRecord>('/products', { ...formData, slug });
      if (created) {
        setProducts([created, ...products]);
      }
    } catch {
      const newProd: ProductRecord = {
        id: `p-${Date.now()}`,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        description: formData.description,
        basePrice: Number(formData.basePrice) || 0,
        rating: 5,
        isFeatured: formData.isFeatured,
      };
      setProducts([newProd, ...products]);
    } finally {
      setIsSaving(false);
      setIsModalOpen(false);
      setFormData({ name: '', brand: 'Apple', category: 'Smartphones', description: '', basePrice: 999, isFeatured: false });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      try {
        await apiClient.delete(`/products/${id}`);
      } catch {
        // Ignored for local state UI feedback
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'ALL' || p.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Product Catalog & Base Pricing</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage product titles, category assignments, base prices, specifications, and featured storefront placements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or brand..."
            className="w-full bg-card border border-input rounded-lg pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold">Category:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-card border border-input rounded-lg px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">All Categories</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="Audio">Audio</option>
            <option value="Smart Watches">Smart Watches</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border uppercase font-bold text-muted-foreground">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Placement</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-foreground">{product.name}</span>
                      <span className="text-[11px] text-muted-foreground">Brand: {product.brand}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-muted text-foreground border border-border">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-black text-cyan-400 text-sm">${Number(product.basePrice).toFixed(2)}</td>
                  <td className="p-4">
                    {product.isFeatured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-max">
                        <Star className="w-3 h-3 fill-amber-400" /> FEATURED
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-semibold text-[11px]">Regular</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1.5 rounded-md hover:bg-rose-500/10 text-rose-500 transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h2 className="text-base font-extrabold">Add New Catalog Product</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. iPad Pro 13-Inch M4"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Apple"
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-background border border-input rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Smart Watches">Smart Watches</option>
                    <option value="Tablets">Tablets</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Base Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key features and specification summary..."
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-input text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-foreground cursor-pointer">
                  Highlight as Featured Product on Home Page
                </label>
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
                  disabled={isSaving}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  {isSaving ? 'Saving...' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
