import { Locale } from '../i18n/settings'
import ProviderHistoryContent from './ProviderHistoryContent'

export const dynamic = 'force-dynamic'

export default function ProviderHistory() {
  return <ProviderHistoryContent locale={'en' as Locale} />
} 