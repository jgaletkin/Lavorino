import { Locale } from '../../i18n/settings'
import ProviderOnboardingServicesContent from './ProviderOnboardingServicesContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingServices({ params: { locale } }: PageProps) {
  return <ProviderOnboardingServicesContent locale={locale} />
} 