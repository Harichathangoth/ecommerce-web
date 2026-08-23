import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'BRANCH_ADMIN' | 'BRANCH_STAFF' | 'CUSTOMER' | any;
  branchId?: string | null;
  branchName?: string;
  createdAt: string;
}

export function useUsersQuery(roleId?: string, branchId?: string) {
  const params: Record<string, string> = {};
  if (roleId) params.roleId = roleId;
  if (branchId) params.branchId = branchId;

  return useQuery({
    queryKey: QUERY_KEYS.USERS.list({ roleId, branchId }),
    queryFn: () => apiClient.get<UserRecord[]>(API_ENDPOINTS.USERS.LIST, { params }),
  });
}
