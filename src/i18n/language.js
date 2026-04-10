import i18n from './config'

export const APP_LANGUAGES = ['en', 'hi', 'mr']
export const APP_LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
]

export function getAppLanguage() {
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage && APP_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage
  }
  return i18n.language || 'en'
}

export function setAppLanguage(languageCode) {
  const nextLanguage = APP_LANGUAGES.includes(languageCode) ? languageCode : 'en'
  i18n.changeLanguage(nextLanguage)
  localStorage.setItem('language', nextLanguage)
  document.documentElement.lang = nextLanguage
  return nextLanguage
}

export function togglePrimaryLanguage(currentLanguage) {
  const currentIndex = APP_LANGUAGES.indexOf(currentLanguage)
  if (currentIndex === -1) {
    return APP_LANGUAGES[0]
  }
  return APP_LANGUAGES[(currentIndex + 1) % APP_LANGUAGES.length]
}
