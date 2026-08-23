import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';
import { StockTransferRecord } from './useInventoryQuery';

export function useCreateTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { sourceBranchId: string; targetBranchId: string; variantId: string; quantity: number; notes?: string }) =>
      apiClient.post<StockTransferRecord>(API_ENDPOINTS.INVENTORY.TRANSFERS, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVENTORY.all });
    },
  });
}

export function useUpdateTransferStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: StockTransferRecord['status'] }) =>
      apiClient.patch<StockTransferRecord>(API_ENDPOINTS.INVENTORY.UPDATE_TRANSFER_STATUS(id), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVENTORY.all });
    },
  });
}
