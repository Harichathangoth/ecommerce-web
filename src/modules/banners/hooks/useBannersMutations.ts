import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { BannerRecord } from './useBannersQuery';

export function useCreateBannerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { title: string; type: BannerRecord['type']; imageUrl: string; targetUrl?: string; displayOrder?: number }) =>
      apiClient.post<BannerRecord>(API_ENDPOINTS.BANNERS.CREATE, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANNERS.all });
    },
  });
}

export function useUpdateBannerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...dto }: { id: string } & Partial<BannerRecord>) =>
      apiClient.patch<BannerRecord>(API_ENDPOINTS.BANNERS.UPDATE(id), dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANNERS.all });
    },
  });
}

export function useDeleteBannerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.BANNERS.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BANNERS.all });
    },
  });
}
