import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export default async function ProviderProfile({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const { t } = await getTranslations(locale, 'provider-profile')

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">{t('provider-profile.title')}</h1>
        
        <form className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('provider-profile.personalInfo')}</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('provider-profile.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('provider-profile.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('provider-profile.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{t('provider-profile.professionalInfo')}</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                    {t('provider-profile.specialization')}
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    {t('provider-profile.bio')}
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t('provider-profile.saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 