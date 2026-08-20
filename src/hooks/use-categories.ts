import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  itemCount?: number;
}

export function useCategories() {
  return useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response: any = await apiClient.get(API_ENDPOINTS.PRODUCTS.SPECIFICATIONS);
        return response || [];
      } catch (err) {
        return [
          { id: '1', name: 'Mobiles', slug: 'mobiles', itemCount: 120 },
          { id: '2', name: 'Laptops', slug: 'laptops', itemCount: 45 },
          { id: '3', name: 'Accessories', slug: 'accessories', itemCount: 210 },
          { id: '4', name: 'Smart Watches', slug: 'watches', itemCount: 60 },
          { id: '5', name: 'Audio', slug: 'audio', itemCount: 85 },
        ];
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}
