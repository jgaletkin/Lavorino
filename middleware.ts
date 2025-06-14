import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/api/auth']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Get the user from the request cookies
  const user = request.cookies.get('user')

  // If the route is not public and there's no user, redirect to login
  if (!isPublicRoute && !user) {
    const url = new URL('/', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and tries to access the login page, redirect to providers
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/providers', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
  ],
} 