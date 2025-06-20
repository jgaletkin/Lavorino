import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lavorino - Provider Marketplace',
  description: 'Find and book local service providers',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Providers lang={lang}>{children}</Providers> */}
        {children}
      </body>
    </html>
  )
} 