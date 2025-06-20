import ProvidersContent from './ProvidersContent'
import { Locale } from '../i18n/settings'

export const dynamic = 'force-dynamic'

export default function ProvidersPage() {
  return <ProvidersContent locale={'en' as Locale} />
} 