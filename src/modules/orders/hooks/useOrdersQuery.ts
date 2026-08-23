import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName?: string;
  customerEmail?: string;
  branchName?: string;
  totalAmount: number;
  paymentStatus?: 'PAID' | 'PENDING';
  status: 'PENDING' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED';
  createdAt: string;
}

export function useOrdersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.list,
    queryFn: () => apiClient.get<OrderRecord[]>(API_ENDPOINTS.ORDERS.LIST),
  });
}

export function useTrackOrderQuery(orderNumber: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.track(orderNumber),
    queryFn: () => apiClient.get<OrderRecord>(API_ENDPOINTS.ORDERS.TRACK(orderNumber)),
    enabled: !!orderNumber,
  });
}
