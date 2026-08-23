import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface BannerRecord {
  id: string;
  title: string;
  type: 'HERO_DARK' | 'HERO_LIGHT' | 'PROMO_CARD';
  imageUrl: string;
  targetUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export function useActiveBannersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.BANNERS.public,
    queryFn: () => apiClient.get<BannerRecord[]>(API_ENDPOINTS.BANNERS.LIST),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminBannersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.BANNERS.admin,
    queryFn: () => apiClient.get<BannerRecord[]>(API_ENDPOINTS.BANNERS.ALL),
  });
}
