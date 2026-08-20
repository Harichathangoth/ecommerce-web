export const QUERY_KEYS = {
  PRODUCTS: {
    all: ['products'] as const,
    list: (filters: Record<string, unknown>) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
  },
  BRANCHES: {
    all: ['branches'] as const,
    detail: (id: string) => ['branches', 'detail', id] as const,
  },
  INVENTORY: {
    branchStock: (branchId: string) => ['inventory', 'branch', branchId] as const,
    transfers: ['inventory', 'transfers'] as const,
  },
  ORDERS: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    track: (orderNumber: string) => ['orders', 'track', orderNumber] as const,
  },
} as const;
