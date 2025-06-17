import LoginContent from '../components/LoginContent'

interface PageProps {
  params: {
    lang: string
  }
}

export default function Page({ params }: PageProps) {
  return <LoginContent />
}
