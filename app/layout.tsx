import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Providers from './providers'
import { locales } from './i18n/settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lavorino - Provider Marketplace',
  description: 'Find and book local service providers',
  icons: {
    icon: '/favicon.ico',
  },
}

export async function generateStaticParams() {
  return locales.map((locale: string) => ({ lang: locale }))
}

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Providers lang={lang}>{children}</Providers> */}
        <div>Layout test placeholder</div>
      </body>
    </html>
  )
} 