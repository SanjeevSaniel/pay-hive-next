import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Public paths
  const isPublicPath = path === '/v1/login' || path === '/v1/signup';

  if (isPublicPath && token) {
    const userId = 'someUserId'; // Replace this with actual logic to extract userId from the token or request
    return NextResponse.redirect(new URL(`/v1/${userId}/`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/v1/login', request.nextUrl));
  }

  // Continue to next middleware or route handler if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/v1/:path*',
    '/v1/:userId/groups',
    '/v1/:userId/groups/:path*',
    '/v1/login',
    '/v1/signup',
  ],
};
