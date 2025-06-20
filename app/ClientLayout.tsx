'use client'

import { ReactNode } from 'react'
import { UserProvider } from '../lib/contexts/UserContext'
import TopNav from './components/TopNav'

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps): JSX.Element {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <TopNav />
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </UserProvider>
  )
} 