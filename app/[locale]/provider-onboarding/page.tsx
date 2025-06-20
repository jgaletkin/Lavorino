import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'
import ProviderOnboardingDetailsContent from '../../provider-onboarding/details/ProviderOnboardingDetailsContent'

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export default async function ProviderOnboarding({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'provider-onboarding')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {t('provider-onboarding.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('provider-onboarding.subtitle')}
          </p>
        </div>
      </div>
    </main>
  )
} 