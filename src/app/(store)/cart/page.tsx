'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateQuantity, removeFromCart, clearCart } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [promoCode, setPromoCode] = React.useState('');
  const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 0 ? 100 : 0;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      toast({
        title: 'Coupon Applied!',
        description: 'You saved $100 on your order.',
        variant: 'success',
      });
    }, 800);
  };

  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id));
    toast({
      title: 'Item Removed',
      description: `${name} has been removed from your cart.`,
      variant: 'default',
    });
  };

  return (
    <div className="container py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Shopping Cart', isCurrentPage: true }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-muted-foreground mt-1">Review your selected items and proceed to checkout</p>
        </div>
        {cartItems.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Your cart is currently empty</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">Explore top global technology electronics and add items to your cart.</p>
          <Link href="/products">
            <Button size="md" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Products</span>
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table Container */}
          <div className="lg:col-span-2 space-y-4">
            <TableContainer className="min-w-[580px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground line-clamp-1">{item.name}</h4>
                          <span className="text-[11px] text-muted-foreground">{item.specs}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-bold">${item.price.toLocaleString()}</TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:border-primary transition-colors text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-extrabold text-xs">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:border-primary transition-colors text-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-extrabold text-primary">
                      ${(item.price * item.quantity).toLocaleString()}
                    </TableCell>

                    <TableCell className="text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>

            {/* Promo Code Form */}
            <Card className="p-4">
              <form onSubmit={handleApplyPromo} className="flex gap-3">
                <Input
                  placeholder="Enter Promo Code (e.g. OPÉRA100)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="secondary" isLoading={isApplyingPromo}>
                  Apply
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>ORDER SUMMARY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-bold text-foreground">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span className="font-bold text-success">-${discount}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Shipping</span>
                <span className="font-bold text-foreground">${shipping}</span>
              </div>

              <div className="border-t border-border pt-3 flex justify-between text-sm font-extrabold text-foreground">
                <span>Estimated Total</span>
                <span className="text-base text-primary">${total.toLocaleString()}</span>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Link href="/checkout" className="w-full">
                <Button fullWidth size="lg" className="gap-2">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/products" className="w-full">
                <Button fullWidth variant="ghost" size="sm">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
