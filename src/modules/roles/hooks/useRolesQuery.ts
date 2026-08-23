import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface PermissionItem {
  id?: string;
  slug: string;
  name: string;
  group: string;
  description: string;
}

export interface RoleItem {
  id: string;
  name: string;
  slug: string;
  isSystemRole: boolean;
  description: string;
  permissions: PermissionItem[];
}

export function useRolesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.ROLES.list,
    queryFn: () => apiClient.get<RoleItem[]>(API_ENDPOINTS.ROLES.LIST),
  });
}

export function usePermissionsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.ROLES.permissions,
    queryFn: () => apiClient.get<PermissionItem[]>(API_ENDPOINTS.ROLES.PERMISSIONS),
  });
}
