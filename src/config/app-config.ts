export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'OPÉRA DIGITAL HUB',
  shortName: 'OPÉRA',
  initials: 'OP',
  tagline: 'Technology Elevated',
  description: 'Enterprise multi-branch electronics shopping experience featuring top global tech brands with nationwide physical store pickups and fast delivery.',
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'support@operadigitalhub.com',
    address: '100 Technology Ave, Suite 500, NYC',
    supportHours: '24/7 Customer Support',
  },
  theme: {
    primaryHex: '#D4AF37',       // Primary Brand Accent (Gold)
    primaryHoverHex: '#C49A6C',
    darkBackground: '#111111',   // Dark Surface Baseline
    lightBackground: '#FFFFFF',  // Light Surface Baseline
  },
  policies: {
    freeShippingThreshold: 99,
    warrantyPeriod: '1 Year Warranty',
    returnPeriod: '14 days return policy',
  },
} as const;
