'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag, Truck, ArrowRight, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-89201';

  return (
    <div className="container py-10 max-w-3xl space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Checkout', href: '/checkout' },
          { label: 'Order Confirmation', isCurrentPage: true },
        ]}
      />

      {/* Hero Success Card */}
      <Card className="p-8 text-center space-y-6 border-primary/30 shadow-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto ring-8 ring-primary/5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Your payment was successful and your order has been received. We have sent a receipt confirmation to your email.
          </p>
        </div>

        {/* Order Details Highlight */}
        <div className="inline-flex items-center gap-3 bg-muted/40 border border-border px-5 py-2.5 rounded-xl text-xs font-bold">
          <PackageCheck className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Order ID:</span>
          <span className="text-foreground tracking-wider font-extrabold">{orderId}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
          <Link href={`/track-order?id=${orderId}`} className="flex-1">
            <Button fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
              <Truck className="w-4 h-4" />
              <span>Track Order</span>
            </Button>
          </Link>

          <Link href="/products" className="flex-1">
            <Button variant="outline" fullWidth size="sm" className="gap-2 font-bold uppercase text-xs">
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Summary Box */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
          WHAT HAPPENS NEXT?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-foreground block">1. Order Processing</span>
            <p className="text-muted-foreground text-[11px]">Your items are being prepared at our primary fulfillment center.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-foreground block">2. Express Dispatch</span>
            <p className="text-muted-foreground text-[11px]">Once shipped, a live tracking link will be sent to your phone/email.</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-foreground block">3. Fast Delivery</span>
            <p className="text-muted-foreground text-[11px]">Delivered directly to your address within 2–3 business days.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center text-xs text-muted-foreground">Loading order details...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
