'use client'

import Link from 'next/link'

export default function ProviderMenu() {
  return (
    <div className="flex space-x-4">
      <Link
        href="/provider-dashboard"
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        Dashboard
      </Link>
      <Link
        href="/provider-calendar"
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Calendar
      </Link>
      <Link
        href="/provider-history"
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        History
      </Link>
      <Link
        href="/provider-profile"
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Profile
      </Link>
    </div>
  )
} 