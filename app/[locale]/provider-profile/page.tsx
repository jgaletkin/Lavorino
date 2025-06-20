import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'
import ProviderProfileContent from '../../provider-profile/ProviderProfileContent'

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

export default async function ProviderProfile({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'provider-profile')

  return <ProviderProfileContent locale={locale} />
} 