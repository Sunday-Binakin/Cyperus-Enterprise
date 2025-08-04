import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Temporarily disabled - let client-side handle auth routing
  return NextResponse.next();
}

// Disable matcher for now
export const config = {
  matcher: []
}
