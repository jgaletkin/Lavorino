import ProviderOnboardingServicesContent from '@/app/provider-onboarding/services/ProviderOnboardingServicesContent'

interface PageProps {
  params: {
    lang: string
  }
}

export default function ProviderOnboardingServicesPage({ params }: PageProps) {
  return <ProviderOnboardingServicesContent />
} 