import { Locale } from '../../i18n/settings'
import ProviderOnboardingConfirmationContent from './ProviderOnboardingConfirmationContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingConfirmation({ params: { locale } }: PageProps) {
  return <ProviderOnboardingConfirmationContent locale={locale} />
} 