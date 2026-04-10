import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const GOOGLE_LANGUAGE_MAP = {
  en: 'en',
  hi: 'hi',
  mr: 'mr',
}

function markIconLigaturesAsNoTranslate() {
  document.querySelectorAll('.material-symbols-outlined, .material-icons').forEach((element) => {
    element.classList.add('notranslate')
    element.setAttribute('translate', 'no')
  })
}

function waitForGoogleCombo(onReady, retries = 30) {
  const combo = document.querySelector('.goog-te-combo')
  if (combo) {
    onReady(combo)
    return
  }

  if (retries <= 0) {
    return
  }

  window.setTimeout(() => waitForGoogleCombo(onReady, retries - 1), 150)
}

function setGoogleLanguage(targetLanguage) {
  const googleTarget = GOOGLE_LANGUAGE_MAP[targetLanguage] || 'en'

  waitForGoogleCombo((combo) => {
    if (combo.value !== googleTarget) {
      combo.value = googleTarget
      combo.dispatchEvent(new Event('change'))
    }
  })
}

function initializeGoogleTranslatorScript() {
  if (window.google?.translate?.TranslateElement) {
    if (!window.__annadataGoogleTranslateInitialized) {
      window.googleTranslateElementInit?.()
    }
    return
  }

  if (document.getElementById('google-translate-script')) {
    return
  }

  window.googleTranslateElementInit = () => {
    if (window.__annadataGoogleTranslateInitialized) {
      return
    }

    window.__annadataGoogleTranslateInitialized = true

    // Hidden widget used only as translation engine for full-page content.
    // Language switching is controlled by our own app buttons/settings.
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr',
        autoDisplay: false,
      },
      'google_translate_element',
    )
  }

  const script = document.createElement('script')
  script.id = 'google-translate-script'
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}

export function GlobalTranslator() {
  const { i18n } = useTranslation()

  useEffect(() => {
    initializeGoogleTranslatorScript()

    const observer = new MutationObserver(() => {
      markIconLigaturesAsNoTranslate()
    })

    markIconLigaturesAsNoTranslate()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const activeLanguage = GOOGLE_LANGUAGE_MAP[i18n.language] ? i18n.language : 'en'
    document.documentElement.lang = activeLanguage
    markIconLigaturesAsNoTranslate()
    setGoogleLanguage(activeLanguage)
  }, [i18n.language])

  return <div id="google_translate_element" className="sr-only" aria-hidden="true" />
}
