import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// @ts-ignore
import { jwtVerify } from 'jose';

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  // Protect simulation paths? No, candidates need to access them without auth_token
  const isProtectedPath = false;
  const isAuthPath = req.nextUrl.pathname.startsWith('/auth');

  // Protect Admin routes
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login') && !req.nextUrl.pathname.startsWith('/admin/signup');
  const isAdminAuthPath = req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname === '/admin/signup';

  let verifiedToken = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_for_dev_only");
      const { payload } = await jwtVerify(token, secret);
      verifiedToken = payload;
    } catch (error) /* eslint-disable-line @typescript-eslint/no-unused-vars */ {
      // Token invalid or expired
      verifiedToken = null;
    }
  }

  if (isProtectedPath && !verifiedToken) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (isAuthPath && verifiedToken && verifiedToken.role !== "HR") {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Admin routing
  if (isAdminPath) {
    if (!verifiedToken || verifiedToken.role !== "HR") {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  if (isAdminAuthPath && verifiedToken && verifiedToken.role === "HR") {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/api/simulation/:path*',
    '/admin/:path*'
  ],
};
