import { Locale } from '../../i18n/settings'
import ProviderOnboardingDetailsContent from '@/app/provider-onboarding/details/ProviderOnboardingDetailsContent'

interface PageProps {
  params: {
    lang: string
  }
}

export default function ProviderOnboardingDetailsPage({ params }: PageProps) {
  return <ProviderOnboardingDetailsContent locale={'en' as Locale} />
} 