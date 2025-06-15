'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ProviderMenu from '../components/ProviderMenu'

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    customerName: 'John Smith',
    serviceType: 'Plumbing Repair',
    date: '2024-03-10',
    amount: 150,
    status: 'completed',
  },
  {
    id: 2,
    customerName: 'Maria Garcia',
    serviceType: 'Electrical Installation',
    date: '2024-03-08',
    amount: 300,
    status: 'completed',
  },
  {
    id: 3,
    customerName: 'Robert Johnson',
    serviceType: 'Garden Maintenance',
    date: '2024-03-05',
    amount: 120,
    status: 'completed',
  },
  {
    id: 4,
    customerName: 'Sarah Williams',
    serviceType: 'HVAC Service',
    date: '2024-03-01',
    amount: 250,
    status: 'completed',
  },
  {
    id: 5,
    customerName: 'Michael Brown',
    serviceType: 'Carpentry Work',
    date: '2024-02-28',
    amount: 400,
    status: 'completed',
  },
]

export default function ProviderHistory() {
  const router = useRouter()
  const { t } = useTranslation(['history', 'common'])
  const [businessData, setBusinessData] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)

  useEffect(() => {
    // Load business data from localStorage
    const providers = localStorage.getItem('providers')
    if (providers) {
      const providersList = JSON.parse(providers)
      // Get the most recent provider data
      setBusinessData(providersList[providersList.length - 1])
    }
  }, [])

  useEffect(() => {
    const filtered = mockTransactions.filter(
      (transaction) =>
        transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTransactions(filtered)
  }, [searchTerm])

  if (!businessData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Loading...
          </h2>
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
              <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <ProviderMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by customer name or service type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.serviceType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 