import { NextResponse } from 'next/server';

/**
 * Simplified middleware - no authentication required
 * All routes are publicly accessible
 */
export async function middleware() {
  // Currently no middleware logic needed
  // Can be extended later for rate limiting, logging, etc.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*', // Only apply to API routes if needed
  ]
}
