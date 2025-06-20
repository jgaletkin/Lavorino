import { Locale } from '../../i18n/settings'
import ProviderOnboardingDetailsContent from './ProviderOnboardingDetailsContent'

export const dynamic = 'force-dynamic'

export default function ProviderOnboardingDetails({ params: { locale } }: { params: { locale: Locale } }) {
  return <ProviderOnboardingDetailsContent locale={locale} />
} 