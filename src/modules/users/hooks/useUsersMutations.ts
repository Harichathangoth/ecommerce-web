import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { UserRecord } from './useUsersQuery';

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { fullName: string; email: string; password?: string; role?: string; branchId?: string }) =>
      apiClient.post<UserRecord>(API_ENDPOINTS.USERS.CREATE, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.all });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.USERS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.all });
    },
  });
}
