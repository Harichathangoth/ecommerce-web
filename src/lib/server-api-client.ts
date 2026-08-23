import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/constants/api-endpoints';

export interface ServerFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function serverRequest<T>(endpoint: string, options: ServerFetchOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (queryString) url += (url.includes('?') ? '&' : '?') + queryString;
  }

  // Retrieve HTTP-Only cookie server-side via Next.js next/headers
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const serverHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    serverHeaders['Authorization'] = `Bearer ${token}`;
    serverHeaders['Cookie'] = `access_token=${token}`;
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: { ...serverHeaders, ...headers },
    cache: 'no-store', // Always fetch fresh data on server-side requests
    ...customConfig,
  };

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Perform Next.js server-side redirect to login page
    redirect('/admin/login');
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || `Server API request failed with status ${response.status}`);
  }

  return (data && typeof data === 'object' && 'data' in data ? data.data : data) as T;
}

export const serverApiClient = {
  get: <T>(endpoint: string, options?: ServerFetchOptions) =>
    serverRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: ServerFetchOptions) =>
    serverRequest<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(endpoint: string, body?: any, options?: ServerFetchOptions) =>
    serverRequest<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body ?? {}) }),
  patch: <T>(endpoint: string, body?: any, options?: ServerFetchOptions) =>
    serverRequest<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  delete: <T>(endpoint: string, options?: ServerFetchOptions) =>
    serverRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
