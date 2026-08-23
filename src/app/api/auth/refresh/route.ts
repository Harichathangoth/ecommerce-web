import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApiClient } from '@/lib/server-api-client';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token missing' }, { status: 401 });
  }

  try {
    const data = await serverApiClient.post<any>(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken,
    });

    const newAccessToken = data.access_token || data.data?.access_token;

    // Set new Short-Lived Access Token (15 Mins)
    cookieStore.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    return NextResponse.json({ success: true, access_token: newAccessToken });
  } catch (error) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    return NextResponse.json({ message: 'Session expired or refresh failed' }, { status: 401 });
  }
}
