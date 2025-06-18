'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClientTranslation } from '../i18n/client'
import { Locale } from '../i18n/settings'

interface ProviderMenuProps {
  locale: Locale
}

export default function ProviderMenu({ locale }: ProviderMenuProps) {
  const router = useRouter()
  const { t } = useClientTranslation(locale, ['common'])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Clear all provider-related data from localStorage
    localStorage.removeItem('providers')
    localStorage.removeItem('providerData')
    localStorage.removeItem('providerToken')
    localStorage.removeItem('providerId')
    localStorage.removeItem('providerName')
    localStorage.removeItem('providerEmail')
    localStorage.removeItem('providerPhone')
    localStorage.removeItem('providerAddress')
    localStorage.removeItem('providerServices')
    localStorage.removeItem('providerSchedule')
    localStorage.removeItem('providerTransactions')
    
    // Clear any session data
    sessionStorage.clear()
    
    // Redirect to provider login page
    router.push('/provider-login')
  }

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                router.push('/provider-profile')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                router.push('/provider-calendar')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Calendar
            </button>
            <button
              onClick={() => {
                router.push('/provider-history')
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              History
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 