import type { Metadata } from 'next'
// import { Quicksand } from 'next/font/google'
import { ReactNode } from 'react'
// import './globals.css'
import ThemeRegistry from '@/shared/ui/providers/ThemeRegistry'
import { Roboto_Condensed } from 'next/font/google'
import AuthProvider from '@/shared/ui/providers/AuthProvider'

// const font = Quicksand({
//   weight: ['400', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
// })
const font = Roboto_Condensed({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Eccube App',
  description: 'B2B payments',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description!} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{metadata.title as ReactNode}</title>
        {/* <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href={font.url} /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className={font.className}>
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
