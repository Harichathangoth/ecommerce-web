export const QUERY_KEYS = {
  CATEGORIES: {
    all: ['categories'] as const,
    public: ['categories', 'public'] as const,
    admin: ['categories', 'admin'] as const,
  },
  BANNERS: {
    all: ['banners'] as const,
    public: ['banners', 'public'] as const,
    admin: ['banners', 'admin'] as const,
  },
  PRODUCTS: {
    all: ['products'] as const,
    list: (filters?: Record<string, unknown>) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
  },
  BRANCHES: {
    all: ['branches'] as const,
    detail: (id: string) => ['branches', 'detail', id] as const,
  },
  INVENTORY: {
    all: ['inventory'] as const,
    branchStock: (branchId: string) => ['inventory', 'branch', branchId] as const,
    transfers: ['inventory', 'transfers'] as const,
  },
  ORDERS: {
    all: ['orders'] as const,
    list: ['orders', 'list'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    track: (orderNumber: string) => ['orders', 'track', orderNumber] as const,
  },
  USERS: {
    all: ['users'] as const,
    list: (filters?: Record<string, unknown>) => ['users', 'list', filters] as const,
  },
  ROLES: {
    all: ['roles'] as const,
    list: ['roles', 'list'] as const,
    permissions: ['roles', 'permissions'] as const,
  },
} as const;
