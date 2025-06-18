'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClientTranslation } from '../i18n/client'
import { Locale } from '../i18n/settings'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ProviderMenu from '../components/ProviderMenu'
import type { Transaction } from '../lib/types'
import { mockTransactions } from '../lib/mockData'

interface ProviderHistoryContentProps {
  locale: Locale;
}

export default function ProviderHistoryContent({ locale }: ProviderHistoryContentProps) {
  const router = useRouter()
  const { t } = useClientTranslation(locale, 'provider-history')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    // Simulate loading business data from localStorage
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setTransactions(mockTransactions)
      } catch (error) {
        console.error('Error loading transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredTransactions = transactions.filter(transaction => {
    const searchLower = searchQuery.toLowerCase()
    return (
      transaction.customerName.toLowerCase().includes(searchLower) ||
      transaction.serviceType.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => router.push('/provider-dashboard')}
                className="focus:outline-none self-start"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  Lavorino
                </span>
              </button>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher locale={locale} />
                  <ProviderMenu locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push('/provider-dashboard')}
              className="focus:outline-none self-start"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher locale={locale} />
                <ProviderMenu locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="mt-2 text-sm text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            {transaction.customerName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.serviceType}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedTransaction && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('transactionDetails')}
                </h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t('customerName')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedTransaction.customerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t('serviceType')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedTransaction.serviceType}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t('amount')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedTransaction.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t('date')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(selectedTransaction.date).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t('status')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedTransaction.status}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 