'use client'

import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n/client'
import LoginContent from './LoginContent'

export default function LoginWrapper() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </I18nextProvider>
  )
} 