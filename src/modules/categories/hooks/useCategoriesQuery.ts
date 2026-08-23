import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export function useActiveCategoriesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.public,
    queryFn: () => apiClient.get<CategoryRecord[]>(API_ENDPOINTS.CATEGORIES.LIST),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminCategoriesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.admin,
    queryFn: () => apiClient.get<CategoryRecord[]>(API_ENDPOINTS.CATEGORIES.ALL),
  });
}
