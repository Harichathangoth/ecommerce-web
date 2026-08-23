'use client';

import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Package, Truck, CheckCircle2, Clock, Eye } from 'lucide-react';

interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  branchName: string;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING';
  orderStatus: 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED';
  createdAt: string;
}

const mockOrders: OrderRecord[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-2026-9041',
    customerName: 'Jonathan Davis',
    customerEmail: 'j.davis@example.com',
    branchName: 'Main Headquarters (HQ-01)',
    totalAmount: 1348.00,
    paymentStatus: 'PAID',
    orderStatus: 'DISPATCHED',
    createdAt: '2026-08-20 14:30',
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-2026-9042',
    customerName: 'Emily Watson',
    customerEmail: 'emily.w@example.com',
    branchName: 'East Coast Hub (EST-02)',
    totalAmount: 249.00,
    paymentStatus: 'PAID',
    orderStatus: 'PROCESSING',
    createdAt: '2026-08-20 15:12',
  },
  {
    id: 'ord-1003',
    orderNumber: 'ORD-2026-9043',
    customerName: 'Robert Vance',
    customerEmail: 'vance.r@example.com',
    branchName: 'West Coast Hub (WST-03)',
    totalAmount: 1199.00,
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    createdAt: '2026-08-19 11:05',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: OrderRecord['orderStatus']) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, orderStatus: newStatus } : o)));
  };

  const getStatusBadge = (status: OrderRecord['orderStatus']) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> DELIVERED</span>;
      case 'DISPATCHED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1"><Truck className="w-3 h-3" /> DISPATCHED</span>;
      case 'PROCESSING':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Package className="w-3 h-3" /> PROCESSING</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-500/10 text-slate-400 border border-slate-500/30 flex items-center gap-1"><Clock className="w-3 h-3" /> PENDING</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Orders & Regional Dispatch Control</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Monitor customer orders, verify payment status, and update regional branch dispatch workflows.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order # or customer..."
            className="w-full bg-card border border-input rounded-lg pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-card border border-input rounded-lg px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border uppercase font-bold text-muted-foreground">
              <tr>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Fulfillment Branch</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-cyan-400">{order.orderNumber}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{order.customerName}</span>
                      <span className="text-[11px] text-muted-foreground">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-foreground">{order.branchName}</td>
                  <td className="p-4 font-extrabold text-foreground">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-4">{getStatusBadge(order.orderStatus)}</td>
                  <td className="p-4 text-right">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order.id, e.target.value as any)}
                      className="bg-background border border-input rounded-md px-2 py-1 text-[11px] font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="DISPATCHED">Dispatched</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
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
