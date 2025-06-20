import { Locale } from '../i18n/settings'
import ProviderLoginContent from './ProviderLoginContent'

export const dynamic = 'force-dynamic'

export default function ProviderLogin() {
  return <ProviderLoginContent locale={'en' as Locale} />
} 