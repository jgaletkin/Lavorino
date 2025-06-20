import ProviderCalendarContent from './ProviderCalendarContent'

export default function ProviderCalendar() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Add Availability
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
        <ProviderCalendarContent />
      </div>
    </main>
  )
} 