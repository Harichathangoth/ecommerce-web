export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  BRANCHES: {
    LIST: '/branches',
    DETAIL: (id: string) => `/branches/${id}`,
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (slug: string) => `/products/${slug}`,
    SPECIFICATIONS: '/products/specifications',
  },
  INVENTORY: {
    BRANCH_STOCK: (branchId: string) => `/inventory/branch/${branchId}`,
    TRANSFERS: '/inventory/transfers',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    TRACK: (orderNumber: string) => `/orders/track/${orderNumber}`,
    DETAIL: (id: string) => `/orders/${id}`,
  },
} as const;
