import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface BranchInventoryRecord {
  id: string;
  branchId: string;
  variantId: string;
  stockQuantity: number;
  reservedQuantity: number;
  reorderLevel: number;
  variant?: any;
}

export interface StockTransferRecord {
  id: string;
  transferNumber: string;
  sourceBranchId: string;
  targetBranchId: string;
  variantId: string;
  quantity: number;
  status: 'REQUESTED' | 'APPROVED' | 'IN_TRANSIT' | 'COMPLETED' | 'REJECTED';
  sourceBranch?: any;
  targetBranch?: any;
  createdAt: string;
}

export function useBranchInventoryQuery(branchId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.INVENTORY.branchStock(branchId),
    queryFn: () => apiClient.get<BranchInventoryRecord[]>(API_ENDPOINTS.INVENTORY.BRANCH_STOCK(branchId)),
    enabled: !!branchId,
  });
}

export function useTransfersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.INVENTORY.transfers,
    queryFn: () => apiClient.get<StockTransferRecord[]>(API_ENDPOINTS.INVENTORY.TRANSFERS),
  });
}
