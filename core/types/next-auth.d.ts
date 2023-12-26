import { UserType } from '@/entities/currentUser/types'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { dec } from 'ramda'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      name: string
      // image: string
      type: UserType
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      email: string
      name: string
      // image: string
      type: UserType
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
  }
}
