import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export class CustomApiError extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(message: string, statusCode: number, errorCode?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  _retry?: boolean;
}

async function browserRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, _retry, ...customConfig } = options;

  let url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (queryString) url += (url.includes('?') ? '&' : '?') + queryString;
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Automatically sends HTTP-Only JWT Cookie with every request
    ...customConfig,
  };

  const response = await fetch(url, config);

  // Handle 401 Unauthorized: Attempt silent token refresh via HTTP-Only cookie & retry
  if (response.status === 401 && !_retry && !endpoint.includes('/auth/')) {
    try {
      const refreshRes = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        return await browserRequest<T>(endpoint, { ...options, _retry: true });
      }
    } catch {
      // Refresh request failed
    }

    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !window.location.pathname.startsWith('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || response.statusText || 'An unexpected error occurred';
    throw new CustomApiError(message, response.status, data?.errorCode);
  }

  return (data && typeof data === 'object' && 'data' in data ? data.data : data) as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    browserRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    browserRequest<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    browserRequest<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body ?? {}) }),
  patch: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    browserRequest<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  delete: <T>(endpoint: string, options?: FetchOptions) =>
    browserRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
