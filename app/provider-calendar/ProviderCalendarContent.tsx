'use client'

// import { useClientTranslation } from '../i18n/client'
import { Locale } from '../i18n/settings'

interface ProviderCalendarContentProps {
  locale: Locale;
}

export default function ProviderCalendarContent({ locale }: ProviderCalendarContentProps) {
  // const { t } = useClientTranslation(locale, 'provider-calendar')

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
              {/* {t('provider-calendar.today')} */}
            </button>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                {/* {t('provider-calendar.previous')} */}
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                {/* {t('provider-calendar.next')} */}
              </button>
            </div>
          </div>
          <h2 className="text-lg font-semibold">
            {/* {t('provider-calendar.currentMonth')} */}
          </h2>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-500">
              {/* {t(`provider-calendar.days.${day.toLowerCase()}`)} */}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Calendar days would go here */}
          <div className="bg-white p-2 h-32">
            <p className="text-sm text-gray-500">{/* {t('provider-calendar.noEvents')} */}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 