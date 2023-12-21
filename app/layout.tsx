import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
// import './globals.css'
import ThemeRegistry from '@/shared/ui/layouts/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })

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
                <link rel="stylesheet" href={inter.url} /> */}

        {/* MUI */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
