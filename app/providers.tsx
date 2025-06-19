'use client';

// import { I18nextProvider } from 'react-i18next';
// import i18next from './i18n/client';
// import { UserProvider } from '@/lib/contexts/UserContext';

import { Locale } from './i18n/settings'
import ProvidersContent from './providers/ProvidersContent'

interface PageProps {
  params: { locale: Locale }
}

export default function Providers({ params: { locale } }: PageProps) {
  // if (typeof window !== 'undefined') {
  //   i18next.changeLanguage(lang);
  // }

  return (
    // <I18nextProvider i18n={i18next}>
    //   <UserProvider>
    //     {children}
    //   </UserProvider>
    // </I18nextProvider>
    <ProvidersContent locale={locale} />
  );
} 