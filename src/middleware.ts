import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock authentication check using localStorage
function isAuthenticated(): boolean {
  // Since middleware runs on the server, we can't access localStorage
  // In a real app, you'd check cookies or JWT tokens
  // For now, we'll assume all users are authenticated
  return true;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Mock session check
  const isUserAuthenticated = isAuthenticated();

  // If user is not signed in and the current path is protected
  if (!isUserAuthenticated && !req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If user is signed in and trying to access auth pages
  if (isUserAuthenticated && req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/my-account/:path*',
    '/checkout/:path*',
    '/auth/:path*',
    '/profile/:path*',
    '/api/:path*'
  ]
}
