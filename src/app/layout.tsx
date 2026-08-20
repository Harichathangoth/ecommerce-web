import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { QueryProvider } from '@/lib/providers/query-provider';
import { ReduxProvider } from '@/lib/providers/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://opera.digital'),
  title: {
    default: 'OPÉRA DIGITAL HUB - Technology Elevated',
    template: '%s | OPÉRA DIGITAL HUB',
  },
  description:
    'Enterprise multi-branch electronics store. Discover flagship laptops, smartphones, workstation accessories, and audio systems with nationwide branch fulfillment.',
  keywords: [
    'electronics',
    'laptops',
    'smartphones',
    'audio',
    'workstation',
    'enterprise e-commerce',
  ],
  authors: [{ name: 'OPÉRA Digital Hub' }],
  creator: 'OPÉRA Digital Hub',
  publisher: 'OPÉRA Digital Hub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opera.digital',
    siteName: 'OPÉRA DIGITAL HUB',
    title: 'OPÉRA DIGITAL HUB - Technology Elevated',
    description:
      'Enterprise multi-branch electronics store. Discover flagship laptops, smartphones, workstation accessories, and audio systems.',
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'OPÉRA Digital Hub Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPÉRA DIGITAL HUB - Technology Elevated',
    description: 'Enterprise multi-branch electronics store.',
    images: ['/og-banner.png'],
  },
};

import { Toaster } from '@/components/ui/toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
