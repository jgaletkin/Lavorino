import dynamic from 'next/dynamic';

const ProviderCalendarClient = dynamic(() => import('./ProviderCalendarClient'), { ssr: false });

const mockAppointments = [
  {
    id: 1,
    title: 'Plumbing Repair - John Smith',
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 12, 0),
    type: 'confirmed',
  },
  {
    id: 2,
    title: 'Electrical Installation - Maria Garcia',
    start: new Date(2024, 2, 16, 14, 0),
    end: new Date(2024, 2, 16, 16, 0),
    type: 'confirmed',
  },
  {
    id: 3,
    title: 'Garden Maintenance - Robert Johnson',
    start: new Date(2024, 2, 17, 9, 0),
    end: new Date(2024, 2, 17, 11, 0),
    type: 'suggested',
  },
  {
    id: 4,
    title: 'HVAC Service - Sarah Williams',
    start: new Date(2024, 2, 18, 13, 0),
    end: new Date(2024, 2, 18, 15, 0),
    type: 'suggested',
  },
];

export default function ProviderCalendar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <a href="/provider-dashboard" className="focus:outline-none self-start">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </a>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Provider Calendar</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Confirmed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Suggested</span>
            </div>
          </div>
          <ProviderCalendarClient events={mockAppointments} />
        </div>
      </div>
    </div>
  );
} 