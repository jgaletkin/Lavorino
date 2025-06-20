import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lavorino - Provider Marketplace',
  description: 'Find and book local service providers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {/* <Providers lang={lang}>{children}</Providers> */}
        {children}
      </body>
    </html>
  )
} 