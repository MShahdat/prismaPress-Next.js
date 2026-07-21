import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createAccessToken } from './service/refreshToken'



const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/news']




export async function proxy(request: NextRequest) {
  // console.log('proxy request', request)

  const pathname = request.nextUrl.pathname
  let accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const decodeToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null
  const decodeRefreshToken = refreshToken ? jwt.decode(refreshToken) as JwtPayload : null

  if (!decodeToken && decodeRefreshToken) {
    accessToken = await createAccessToken()

  }


  let role = null

  if (decodeToken) {
    role = decodeToken.role
  }

  //& logged in user can't access login and register page
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (role === 'USER') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    else if (role === 'AUTHOR') {
      return NextResponse.redirect(new URL('/author-dashboard', request.url))
    }
    else if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }
    else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
  const isAuth = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))

  //& authenticated page protection 
  if (!accessToken && !isPublic && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


  //& authorizaiton page protection
  if (pathname.startsWith('/dashboard') && role !== 'USER') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
  else if (pathname.startsWith('/author-dashboard') && role !== 'AUTHOR') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
  else if (pathname.startsWith('/admin-dashboard') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }



  // return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next()
}


export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*',
    // '/author-dashboard/:path*',

    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ]
}