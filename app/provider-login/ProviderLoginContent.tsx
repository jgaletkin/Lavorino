'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Locale } from '../i18n/settings'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface ProviderLoginContentProps {
  locale: Locale;
}

export default function ProviderLoginContent({ locale }: ProviderLoginContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [showGDPRNotice, setShowGDPRNotice] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('gdpr-consent')
    if (!hasConsented) {
      setShowGDPRNotice(true)
    }
  }, [pathname])

  const handleGDPRConsent = () => {
    localStorage.setItem('gdpr-consent', 'true')
    setShowGDPRNotice(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError('')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@demo.com',
          password: 'demo123',
        }),
      })
      const data = await response.json()
      if (!data.success) throw new Error(data.error || 'Login failed')
      const from = searchParams?.get('from')
      router.push(from || '/providers')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (e: React.FormEvent) => {
    if (process.env.NODE_ENV === 'development') {
      await handleLogin(e)
    }
  }

  const handleGoogleLogin = (e: React.FormEvent) => handleLogin(e)
  const handleFacebookLogin = (e: React.FormEvent) => handleLogin(e)
  const handleAppleLogin = (e: React.FormEvent) => handleLogin(e)

  const handleSwitchToProvider = () => {
    const lang = pathname?.split('/')[1] || 'en'
    router.push(`/${lang}/provider-login`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher locale={locale} />
      </div>

      {/* GDPR Notice Modal */}
      {showGDPRNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                GDPR Notice
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>This site uses cookies and stores your data for login and personalization purposes.</p>
                <h4 className="font-medium text-gray-900">Data Collected</h4>
                <p>We collect your name, email, profile information, and usage data.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Name</li>
                  <li>Email</li>
                  <li>Profile</li>
                  <li>Usage</li>
                </ul>
                <h4 className="font-medium text-gray-900">Your Rights</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access</li>
                  <li>Correction</li>
                  <li>Deletion</li>
                  <li>Portability</li>
                  <li>Restriction</li>
                  <li>Objection</li>
                </ul>
                <p>By continuing, you consent to our data policy.</p>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => window.location.href = 'https://google.com'}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={handleGDPRConsent}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Continue with Facebook
            </button>

            <button
              onClick={handleAppleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.58-.65 1.29-1.51 2.58-2.25 4.88zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                />
              </svg>
              Continue with Apple
            </button>

            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Demo Login
              </button>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleSwitchToProvider}
              className="w-full text-center text-sm text-emerald-600 hover:text-emerald-500"
            >
              Switch to Customer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 