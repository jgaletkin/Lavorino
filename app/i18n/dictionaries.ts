import 'server-only'
import type { Locale } from './settings'

const dictionaries = {
  en: () => import('@/public/locales/en/common.json').then((module) => module.default),
  it: () => import('@/public/locales/it/common.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]() 