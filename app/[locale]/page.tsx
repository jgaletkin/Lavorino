import { t } from '../i18n/server'
import { Locale } from '../i18n/settings'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function Home({ params: { locale } }: PageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">{t(locale, 'home', 'title')}</h1>
        <p className="text-xl mb-4">{t(locale, 'home', 'description')}</p>
      </div>
    </main>
  )
} 