import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { CategoryRecord } from './useCategoriesQuery';

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { name: string; slug: string; description?: string; imageUrl?: string; displayOrder?: number }) =>
      apiClient.post<CategoryRecord>(API_ENDPOINTS.CATEGORIES.CREATE, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.all });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...dto }: { id: string } & Partial<CategoryRecord>) =>
      apiClient.patch<CategoryRecord>(API_ENDPOINTS.CATEGORIES.UPDATE(id), dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.all });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.CATEGORIES.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES.all });
    },
  });
}
