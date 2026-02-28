import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isApiForms = request.nextUrl.pathname.startsWith('/api/forms');
  if ((isDashboardPage || isApiForms) && !token) {
    if (isApiForms) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/forms/:path*'],
};