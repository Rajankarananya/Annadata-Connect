import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getAppLanguage, setAppLanguage } from '../i18n/language'
import { translations, type LanguageCode } from '../i18n/translations'

export function useLanguage() {
  const { i18n } = useTranslation()
  const initial = getAppLanguage() as LanguageCode
  const [lang, setLangState] = useState<LanguageCode>(initial)

  useEffect(() => {
    const active = getAppLanguage() as LanguageCode
    if (active !== lang) {
      setLangState(active)
    }
  }, [i18n.language])

  const setLang = (next: LanguageCode) => {
    const resolved = setAppLanguage(next) as LanguageCode
    setLangState(resolved)
  }

  const t = useMemo(() => translations[lang], [lang])

  return { lang, setLang, t }
}
