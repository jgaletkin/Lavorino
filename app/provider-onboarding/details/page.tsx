import ProviderOnboardingDetailsContent from '@/app/provider-onboarding/details/ProviderOnboardingDetailsContent'

interface PageProps {
  params: {
    lang: string
  }
}

export default function ProviderOnboardingDetailsPage({ params }: PageProps) {
  return <ProviderOnboardingDetailsContent />
} 