'use client'

export default function ProviderCalendarContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Today
              </button>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
            <h2 className="text-lg font-semibold">
              January 2024
            </h2>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {/* Calendar days would go here */}
            <div className="bg-white p-2 h-32">
              <p className="text-sm text-gray-500">No events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 