import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApiClient } from '@/lib/server-api-client';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Clean call using serverApiClient & API_ENDPOINTS.AUTH.LOGIN
    const data = await serverApiClient.post<any>(API_ENDPOINTS.AUTH.LOGIN, { email, password });

    const user = data.user || data.data?.user;
    const accessToken = data.access_token || data.data?.access_token;
    const refreshToken = data.refresh_token || data.data?.refresh_token || 'sample-refresh-jwt-token-2026';

    const cookieStore = await cookies();

    // Set Short-Lived Access Token (15 Minutes)
    cookieStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60, // 15 mins
    });

    // Set Long-Lived Refresh Token (7 Days)
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Authentication failed' },
      { status: 400 }
    );
  }
}
