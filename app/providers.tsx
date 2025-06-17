'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from './i18n/client';

interface ProvidersProps {
  children: React.ReactNode;
  lang: string;
}

export default function Providers({ children, lang }: ProvidersProps) {
  // Change language when the lang prop changes
  if (typeof window !== 'undefined') {
    i18next.changeLanguage(lang);
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
} 