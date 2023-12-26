'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export interface IAuthProviderProps {
  children: ReactNode
}

export default function AuthProvider(props: IAuthProviderProps) {
  const { children } = props
  return <SessionProvider>{children}</SessionProvider>
}
