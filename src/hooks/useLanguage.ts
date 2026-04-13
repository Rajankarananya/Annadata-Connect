import { useMemo, useState } from 'react'
import { translations, type LanguageCode } from '../i18n/translations'

export function useLanguage() {
  const [lang, setLang] = useState<LanguageCode>('en')

  const t = useMemo(() => translations[lang], [lang])

  return { lang, setLang, t }
}
