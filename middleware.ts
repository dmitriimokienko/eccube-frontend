export { default } from 'next-auth/middleware'

// protected routes by next-auth

export const config = {
  matcher: ['/onboarding/:path*'],
}
