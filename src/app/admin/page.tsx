'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Layers, Store, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export default function AdminOverviewPage() {
  const branchName = useAppSelector((state) => state.branch.branchName);

  const stats = [
    { title: 'Total Revenue', value: '$128,450', change: '+14.2%', icon: DollarSign },
    { title: 'Total Orders', value: '1,420', change: '+8.4%', icon: ShoppingBag },
    { title: 'Branch Inventory Stock', value: '4,850 Units', change: 'Optimal', icon: Layers },
    { title: 'Active Branches', value: '3 Locations', change: 'Online', icon: Store },
  ];

  const recentTransfers = [
    { id: 'TRF-1001', from: 'New York Main', to: 'Los Angeles Branch', item: 'iPhone 15 Pro Max (256GB)', qty: 15, status: 'IN_TRANSIT' },
    { id: 'TRF-1002', from: 'Chicago Central', to: 'New York Main', item: 'MacBook Air M3 (256GB)', qty: 8, status: 'COMPLETED' },
    { id: 'TRF-1003', from: 'New York Main', to: 'Chicago Central', item: 'AirPods Pro (2nd Gen)', qty: 25, status: 'PENDING' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Multi-Branch Executive Overview</h1>
        <p className="text-xs text-muted-foreground">Real-time performance metrics for <span className="text-primary font-bold">{branchName}</span>.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase">{stat.title}</span>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-2">
                <span className="text-2xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inter-Branch Stock Transfers Overview */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground">Inter-Branch Stock Transfer Requests</h2>
            <p className="text-xs text-muted-foreground">Monitor real-time inventory movements across physical stores</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase font-bold text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">TRANSFER ID</th>
                <th className="py-3 px-4">SOURCE BRANCH</th>
                <th className="py-3 px-4">TARGET BRANCH</th>
                <th className="py-3 px-4">PRODUCT ITEM</th>
                <th className="py-3 px-4 text-center">QUANTITY</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTransfers.map((trf) => (
                <tr key={trf.id} className="hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-primary">{trf.id}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{trf.from}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{trf.to}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{trf.item}</td>
                  <td className="py-3 px-4 text-center font-bold text-foreground">{trf.qty}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      trf.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                        : trf.status === 'IN_TRANSIT'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        : 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                    }`}>
                      {trf.status}
                    </span>
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
