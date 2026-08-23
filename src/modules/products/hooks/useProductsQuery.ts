import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface ProductRecord {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  basePrice: number;
  rating?: number;
  isFeatured?: boolean;
}

export function useProductsQuery(filters?: Record<string, any>) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.list(filters),
    queryFn: () => apiClient.get<{ items: ProductRecord[] }>(API_ENDPOINTS.PRODUCTS.LIST, { params: filters }),
  });
}

export function useProductBySlugQuery(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.detail(slug),
    queryFn: () => apiClient.get<ProductRecord>(API_ENDPOINTS.PRODUCTS.DETAIL(slug)),
    enabled: !!slug,
  });
}
