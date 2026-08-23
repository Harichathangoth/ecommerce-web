import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { OrderRecord } from './useOrdersQuery';

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderRecord['status'] }) =>
      apiClient.patch<OrderRecord>(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
    },
  });
}
