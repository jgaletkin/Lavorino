import ProviderDashboardClient from './ProviderDashboardClient'
import { Locale } from '../i18n/settings'

export default function ProviderDashboardPage() {
  return <ProviderDashboardClient locale={'en' as Locale} />
} 