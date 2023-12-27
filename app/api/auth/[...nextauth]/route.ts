// ignore expired ssl certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { ILoginUserResponse } from '@/entities/currentUser/types'
import NextAuth, { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // default next-auth form's title
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // TODO: fix type
      // @ts-ignore
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials
        try {
          // res = await loginUserApi({ email, password })
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          if (res.status === 401) {
            console.error(res.statusText)
            return null
          }
          const data: ILoginUserResponse = await res.json()
          // console.log('authorize', data)
          if (data) {
            const { user, backendTokens } = data
            return {
              user: {
                id: user.id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                type: user.type,
              },
              backendTokens,
            }
          }
        } catch (error) {
          console.log('next-auth error', error)
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt(params) {
      // console.log('CALLBACKS JWT PARAMS:: ', params)
      const { token, user } = params
      if (user) return { ...token, ...user }
      if (new Date().getTime() < token.backendTokens.expiresIn) return token
      return await refreshToken(token)
    },
    async session(params) {
      // console.log('CALLBACKS SESSION PARAMS:: ', params)
      const { session, token } = params
      session.user = token?.user
      session.backendTokens = token?.backendTokens
      return session
    },
  },

  // custom pages
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }

// UTILS

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  })
  const backendTokens = await res.json()
  console.log('refreshed:: ', backendTokens)
  return { ...token, backendTokens }
}
