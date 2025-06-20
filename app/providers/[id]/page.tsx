import ProviderDetailClient from './ProviderDetailClient';

interface ProviderPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  // Generate static params for sample provider IDs
  const providerIds = ['1', '2', '3', '4', '5'] // Sample provider IDs from mockData
  
  return providerIds.map((id) => ({
    id,
  }))
}

export default function ProviderPage({ params }: ProviderPageProps) {
  return <ProviderDetailClient id={params.id} />;
} 