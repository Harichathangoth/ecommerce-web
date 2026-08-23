export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiVersion = 'v1' | 'v2' | 'v3';
export const v = (version: ApiVersion, path: string) => `/api/${version}${path}`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: v('v1', '/auth/login'),
    REGISTER: v('v1', '/auth/register'),
    REFRESH: v('v1', '/auth/refresh'),
    LOGOUT: v('v1', '/auth/logout'),
    ME: v('v1', '/auth/me'),
  },
  CATEGORIES: {
    LIST: v('v1', '/categories'),
    ALL: v('v1', '/categories/all'),
    CREATE: v('v1', '/categories'),
    UPDATE: (id: string) => v('v1', `/categories/${id}`),
    DELETE: (id: string) => v('v1', `/categories/${id}`),
  },
  BANNERS: {
    LIST: v('v1', '/banners'),
    ALL: v('v1', '/banners/all'),
    CREATE: v('v1', '/banners'),
    UPDATE: (id: string) => v('v1', `/banners/${id}`),
    DELETE: (id: string) => v('v1', `/banners/${id}`),
  },
  USERS: {
    LIST: v('v1', '/users'),
    DETAIL: (id: string) => v('v1', `/users/${id}`),
    CREATE: v('v1', '/users'),
    UPDATE: (id: string) => v('v1', `/users/${id}`),
    DELETE: (id: string) => v('v1', `/users/${id}`),
  },
  ROLES: {
    LIST: v('v1', '/roles'),
    PERMISSIONS: v('v1', '/roles/permissions'),
    DETAIL: (id: string) => v('v1', `/roles/${id}`),
    CREATE: v('v1', '/roles'),
    UPDATE: (id: string) => v('v1', `/roles/${id}`),
    DELETE: (id: string) => v('v1', `/roles/${id}`),
  },
  BRANCHES: {
    LIST: v('v1', '/branches'),
    DETAIL: (id: string) => v('v1', `/branches/${id}`),
  },
  PRODUCTS: {
    LIST: v('v1', '/products'),
    DETAIL: (slug: string) => v('v1', `/products/${slug}`),
    CREATE: v('v1', '/products'),
    UPDATE: (id: string) => v('v1', `/products/${id}`),
    DELETE: (id: string) => v('v1', `/products/${id}`),
    SPECIFICATIONS: v('v1', '/products/specifications'),
  },
  INVENTORY: {
    BRANCH_STOCK: (branchId: string) => v('v1', `/inventory/branch/${branchId}`),
    TRANSFERS: v('v1', '/inventory/transfers'),
    UPDATE_TRANSFER_STATUS: (id: string) => v('v1', `/inventory/transfers/${id}/status`),
  },
  ORDERS: {
    CREATE: v('v1', '/orders'),
    LIST: v('v1', '/orders'),
    TRACK: (orderNumber: string) => v('v1', `/orders/track/${orderNumber}`),
    DETAIL: (id: string) => v('v1', `/orders/${id}`),
    UPDATE_STATUS: (id: string) => v('v1', `/orders/${id}/status`),
  },
} as const;
