'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show TopNav on the login page
  if (pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    // Clear any auth tokens or user data
    localStorage.removeItem('auth-token')
    // Redirect to login page
    router.push('/')
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/providers" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/providers"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/providers' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Providers
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 