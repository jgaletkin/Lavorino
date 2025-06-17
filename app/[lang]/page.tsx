import LoginContent from '@/components/LoginContent'

export default function Page({ params }: { params: { lang: string } }) {
  return <LoginContent params={params} />
} 