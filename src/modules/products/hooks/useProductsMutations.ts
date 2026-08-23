import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { ProductRecord } from './useProductsQuery';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { name: string; brand: string; category: string; description: string; basePrice: number; slug?: string; isFeatured?: boolean }) =>
      apiClient.post<ProductRecord>(API_ENDPOINTS.PRODUCTS.CREATE, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.all });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.all });
    },
  });
}
