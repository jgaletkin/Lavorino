import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { i18n } from './i18n/settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lavorino',
  description: 'Book your next service with ease',
  icons: {
    icon: '/favicon.ico',
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  )
} 