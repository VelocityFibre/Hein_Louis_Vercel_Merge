import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Map old routes to module parameters
  const routeToModule: Record<string, string> = {
    '/projects': 'projects',
    '/tasks': 'dashboard',
    '/customers': 'dashboard',
    '/contractors': 'suppliers',
    '/issues': 'dashboard',
    '/audit': 'analytics',
    '/settings': 'theme',
  }
  
  // Check if the current path needs to be redirected
  const moduleParam = routeToModule[pathname]
  if (moduleParam) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('module', moduleParam)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}