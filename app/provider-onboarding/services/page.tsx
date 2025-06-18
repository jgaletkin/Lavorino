import ProviderOnboardingServicesContent from './ProviderOnboardingServicesContent'
import { Locale } from '../../i18n/settings'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingServicesPage({ params: { locale } }: PageProps) {
  return <ProviderOnboardingServicesContent locale={locale} />
} 