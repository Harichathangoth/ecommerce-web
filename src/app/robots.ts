import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opera.digital';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',     // Enterprise Admin Management Panel
          '/account/',   // Private User Account Settings
          '/profile/',   // Private Customer Profile Details
          '/orders/',    // Private Customer Order History
          '/checkout/',  // Checkout & Payment Pages
          '/api/',       // Backend API Endpoints
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
