import ProviderDetailClient from './ProviderDetailClient';

interface ProviderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for sample provider IDs
  const providerIds = ['1', '2', '3', '4', '5'] // Sample provider IDs from mockData
  
  return providerIds.map((id) => ({
    id,
  }))
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params
  return <ProviderDetailClient id={id} />;
} 