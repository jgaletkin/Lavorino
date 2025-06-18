import ProviderOnboardingConfirmationContent from './ProviderOnboardingConfirmationContent'
import { Locale } from '../../i18n/settings'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingConfirmationPage({ params: { locale } }: PageProps) {
  return <ProviderOnboardingConfirmationContent locale={locale} />
} 