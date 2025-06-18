import ProviderOnboardingOwnerContent from './ProviderOnboardingOwnerContent'
import { Locale } from '../../i18n/settings'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingOwnerPage({ params: { locale } }: PageProps) {
  return <ProviderOnboardingOwnerContent locale={locale} />
} 