import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// PathForge Protected Routes
const protectedRoutes = ['/dashboard', '/onboarding', '/advisor', '/income', '/profile']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtected) return NextResponse.next()

  // Validate real session via BetterAuth API
  const session = await auth.api.getSession({ 
    headers: request.headers 
  })

  if (!session) {
    const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
