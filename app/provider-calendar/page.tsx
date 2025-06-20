import Link from 'next/link'
import { Locale } from '../i18n/settings'
import ProviderCalendarClient from './ProviderCalendarClient'
import ProviderCalendarContent from './ProviderCalendarContent'

export default function ProviderCalendarPage() {
  return <ProviderCalendarContent locale={'en' as Locale} />
} 