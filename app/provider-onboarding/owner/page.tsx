import { Locale } from '../../i18n/settings'
import ProviderOnboardingOwnerContent from './ProviderOnboardingOwnerContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderOnboardingOwner({ params: { locale } }: PageProps) {
  return <ProviderOnboardingOwnerContent locale={locale} />
} 