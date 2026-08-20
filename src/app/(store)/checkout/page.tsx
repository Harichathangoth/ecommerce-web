'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { toast } from '@/components/ui/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [deliveryMethod, setDeliveryMethod] = React.useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranch, setSelectedBranch] = React.useState('nyc-main');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 0 ? 100 : 0;
  const shipping = deliveryMethod === 'delivery' ? 15 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const branches = [
    { value: 'nyc-main', label: 'NYC Flagship Branch - 100 Technology Ave' },
    { value: 'la-branch', label: 'LA Digital Branch - 404 Wilshire Blvd' },
    { value: 'chicago-branch', label: 'Chicago Central Branch - 200 Michigan Ave' },
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(clearCart());
      toast({
        title: 'Order Placed Successfully!',
        description: 'Your order #ORD-89201 has been confirmed.',
        variant: 'success',
      });
      router.push('/track-order');
    }, 1500);
  };

  return (
    <div className="container py-8 space-y-6 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout', isCurrentPage: true },
        ]}
      />

      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">Checkout</h1>
          <p className="text-xs text-muted-foreground mt-1">Complete your shipping and payment information</p>
        </div>
        <Link href="/cart">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Button>
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Shipping Form Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Method Choice */}
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">Fulfillment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'delivery'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-xs font-bold uppercase">Standard Delivery</div>
                <div className="text-[11px] text-muted-foreground mt-1">$15 - Nationwide Shipping</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-xs font-bold uppercase">Store Branch Pickup</div>
                <div className="text-[11px] text-muted-foreground mt-1">Free - Instant Store Pickup</div>
              </button>
            </div>
          </Card>

          {/* Customer & Address Info */}
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">Customer & Shipping Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="John Doe" required />
              <Input label="Email Address" type="email" placeholder="john@example.com" required />
            </div>

            {deliveryMethod === 'pickup' ? (
              <Select
                label="Select Branch for Store Pickup"
                options={branches}
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              />
            ) : (
              <div className="space-y-4 pt-2">
                <Input label="Street Address" placeholder="100 Technology Ave" required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" placeholder="New York" required />
                  <Input label="Zip Code" placeholder="10001" required />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary Right Card */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>YOUR ORDER</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground line-clamp-1">{item.name}</h5>
                      <span className="text-[10px] text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-foreground">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-bold text-foreground">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-bold text-foreground">${shipping}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm font-extrabold text-foreground">
                <span>Total</span>
                <span className="text-base text-primary">${total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
              CONFIRM & PLACE ORDER
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
