import ProviderHistoryContent from './ProviderHistoryContent'

export default function ProviderHistory() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Booking History</h1>
          <div className="flex space-x-4">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">All Bookings</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
        <ProviderHistoryContent />
      </div>
    </main>
  )
} 