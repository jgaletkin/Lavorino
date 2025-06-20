import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export default async function ProviderLogin({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'provider-login')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {t('provider-login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('provider-login.subtitle')}
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('provider-login.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={t('provider-login.email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('provider-login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={t('provider-login.password')}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t('provider-login.signIn')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 