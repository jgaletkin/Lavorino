import { Locale } from '../i18n/settings'
import ProviderProfileContent from './ProviderProfileContent'

export const dynamic = 'force-dynamic'

export default function ProviderProfile() {
  return <ProviderProfileContent locale={'en' as Locale} />
} 