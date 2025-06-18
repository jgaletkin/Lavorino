import ProviderDetailClient from './ProviderDetailClient';

interface ProviderPageProps {
  params: {
    id: string;
  };
}

export default function ProviderPage({ params }: ProviderPageProps) {
  return <ProviderDetailClient id={params.id} />;
} 