import React from 'react';
import { Topbar } from '@/components/customer/topbar';
import { Header } from '@/components/customer/header';
import { Footer } from '@/components/customer/footer';

export default function CustomerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Topbar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
