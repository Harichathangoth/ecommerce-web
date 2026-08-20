'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { toast } from '@/components/ui/use-toast';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState('ORD-89201');
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeOrder] = React.useState<{
    id: string;
    status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
    date: string;
    estimatedDelivery: string;
    carrier: string;
    trackingNumber: string;
    branch: string;
    items: Array<{ name: string; qty: number; price: number }>;
  } | null>({
    id: 'ORD-89201',
    status: 'SHIPPED',
    date: '2026-08-18',
    estimatedDelivery: '2026-08-20',
    carrier: 'FedEx Express (Tracking #9821039841)',
    trackingNumber: '9821039841',
    branch: 'NYC Flagship Store (100 Technology Ave)',
    items: [
      { name: 'iPhone 15 Pro Max - 256GB Natural Titanium', qty: 1, price: 1099 },
      { name: 'AirPods Pro (2nd Gen)', qty: 1, price: 249 },
    ],
  });

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: 'Order Status Updated',
        description: `Order ${orderId.toUpperCase()} retrieved.`,
        variant: 'success',
      });
    }, 800);
  };

  return (
    <div className="container py-8 space-y-6 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Track Order', isCurrentPage: true }]} />

      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">Track Your Order</h1>
          <p className="text-xs text-muted-foreground mt-1">Enter your Order ID to track real-time delivery progress</p>
        </div>
        <Link href="/products">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </Button>
        </Link>
      </div>

      {/* Order Lookup Form */}
      <Card className="p-6">
        <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Input
              label="Order Reference Number"
              placeholder="e.g. ORD-89201"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button type="submit" isLoading={isSearching} className="w-full sm:w-auto">
            Track Order
          </Button>
        </form>
      </Card>

      {/* Order Tracking Progress Card */}
      {activeOrder && (
        <Card className="space-y-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-black text-foreground">{activeOrder.id}</h3>
                <Badge variant={activeOrder.status === 'DELIVERED' ? 'success' : 'gold'}>
                  {activeOrder.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Placed on {activeOrder.date} • Expected Delivery {activeOrder.estimatedDelivery}</p>
            </div>
            <div className="text-xs text-muted-foreground sm:text-right">
              <span className="block font-bold text-foreground">Fulfillment Branch</span>
              <span>{activeOrder.branch}</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-3 gap-2 py-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-foreground">Order Placed</span>
              <span className="text-[10px] text-muted-foreground">Aug 18, 10:30 AM</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold primary-glow">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-primary">In Transit</span>
              <span className="text-[10px] text-muted-foreground">{activeOrder.carrier}</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-muted-foreground">Delivered</span>
              <span className="text-[10px] text-muted-foreground">Expected Aug 20</span>
            </div>
          </div>

          {/* Items Summary List */}
          <div className="border-t border-border pt-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Package Items</h4>
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1">
                <span className="font-bold text-foreground">{item.name} × {item.qty}</span>
                <span className="font-extrabold text-foreground">${item.price * item.qty}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
