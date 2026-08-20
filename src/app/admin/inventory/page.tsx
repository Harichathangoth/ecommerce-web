'use client';

import React, { useState } from 'react';
import { Layers, RefreshCw, AlertTriangle, Plus, Search } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function AdminInventoryPage() {
  const branchName = useAppSelector((state) => state.branch.branchName);
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryMatrix = [
    { sku: 'APL-IP15PM-256', name: 'iPhone 15 Pro Max', variant: '256GB Natural Titanium', nycStock: 45, laxStock: 12, chiStock: 8, reorderLevel: 10 },
    { sku: 'APL-MBA-M3-256', name: 'MacBook Air M3', variant: '13-inch 256GB SSD', nycStock: 18, laxStock: 5, chiStock: 15, reorderLevel: 5 },
    { sku: 'APL-APP-2GEN', name: 'AirPods Pro (2nd Gen)', variant: 'White', nycStock: 80, laxStock: 34, chiStock: 22, reorderLevel: 15 },
    { sku: 'APL-AWS9-41ST', name: 'Apple Watch Series 9', variant: 'Starlight 41mm', nycStock: 25, laxStock: 2, chiStock: 11, reorderLevel: 5 },
    { sku: 'SAM-S24U-256', name: 'Samsung Galaxy S24 Ultra', variant: '12GB 256GB', nycStock: 30, laxStock: 14, chiStock: 19, reorderLevel: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Multi-Branch Inventory Matrix</h1>
          <p className="text-xs text-muted-foreground">Manage stock allocations and create stock transfer requests across branches.</p>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-black text-xs font-extrabold px-4 py-2.5 rounded-md flex items-center gap-2 uppercase tracking-wider transition-colors primary-glow">
          <Plus className="w-4 h-4" />
          <span>New Stock Transfer</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 border border-input rounded-md px-3 py-1.5 bg-background max-w-sm flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search SKU, Product Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-foreground focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-4 px-6">SKU</th>
                <th className="py-4 px-4">PRODUCT NAME</th>
                <th className="py-4 px-4">VARIANT</th>
                <th className="py-4 px-4 text-center">NYC-01 STOCK</th>
                <th className="py-4 px-4 text-center">LAX-02 STOCK</th>
                <th className="py-4 px-4 text-center">CHI-03 STOCK</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryMatrix.map((item) => (
                <tr key={item.sku} className="hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-primary">{item.sku}</td>
                  <td className="py-4 px-4 font-bold text-foreground">{item.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.variant}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-extrabold text-foreground">{item.nycStock}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-extrabold ${item.laxStock <= item.reorderLevel ? 'text-amber-500' : 'text-foreground'}`}>
                      {item.laxStock}
                      {item.laxStock <= item.reorderLevel && (
                        <AlertTriangle className="w-3.5 h-3.5 inline ml-1 text-amber-500" />
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-extrabold text-foreground">{item.chiStock}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="border border-border hover:border-primary text-foreground hover:text-primary text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider transition-colors">
                      Transfer Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
