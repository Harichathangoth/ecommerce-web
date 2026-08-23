import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { RoleItem } from './useRolesQuery';

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { name: string; slug: string; description?: string; permissionSlugs?: string[] }) =>
      apiClient.post<RoleItem>(API_ENDPOINTS.ROLES.CREATE, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.all });
    },
  });
}

export function useDeleteRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.ROLES.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.all });
    },
  });
}
