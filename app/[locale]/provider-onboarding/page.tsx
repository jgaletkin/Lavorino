import { getTranslations } from '../../i18n/server'
import { Locale } from '../../i18n/settings'
import ProviderOnboardingDetailsContent from '../../provider-onboarding/details/ProviderOnboardingDetailsContent'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function ProviderOnboarding({ params: { locale } }: PageProps) {
  const { t } = await getTranslations(locale, 'provider-onboarding')

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('provider-onboarding.title')}</h1>
          <p className="text-gray-600">{t('provider-onboarding.description')}</p>
        </div>
        <ProviderOnboardingDetailsContent locale={locale} />
      </div>
    </main>
  )
} 