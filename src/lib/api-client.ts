import { API_BASE_URL } from '@/lib/constants/api-endpoints';

export interface ApiFieldError {
  field: string;
  message: string;
}

export class CustomApiError extends Error {
  statusCode: number;
  errorCode?: string;
  fieldErrors?: ApiFieldError[];

  constructor(message: string, statusCode: number, errorCode?: string, fieldErrors?: ApiFieldError[]) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.fieldErrors = fieldErrors;
  }
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Sends & receives HTTP-Only Cookies natively
    ...customConfig,
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const statusCode = response.status;
    const message = data?.message || response.statusText || 'An unexpected server error occurred';
    const errorCode = data?.errorCode;
    const fieldErrors = data?.errors;

    // Handle 401 Unauthorized: Redirect to login if on admin route
    if (statusCode === 401 && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin';
      }
    }

    throw new CustomApiError(message, statusCode, errorCode, fieldErrors);
  }

  // Unbox standard response envelope ({ success: true, data: T })
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data as T;
  }

  return data as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),

  // HTTP QUERY Method Helper
  query: <T>(endpoint: string, body?: any, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'QUERY', body: JSON.stringify(body) }),
};
