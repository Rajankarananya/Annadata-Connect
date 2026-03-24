import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function LandingPage() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'hi' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('language', next)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f0e8_0%,_#f8fafc_45%,_#eef2f7_100%)] px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--color-border)] bg-white/90 p-8 shadow-xl shadow-[rgba(53,40,21,0.08)]">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-text-soft)]">AI Crop Claim Platform</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{t('public.landingTitle')}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-soft)]">{t('public.landingDescription')}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/login" className="rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white">
            {t('public.login')}
          </Link>
          <Link
            to="/register"
            className="rounded-lg border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)]"
          >
            {t('public.register')}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-lg border border-[var(--color-border)] px-5 py-3 text-sm font-medium"
          >
            Switch Language ({i18n.language.toUpperCase()})
          </button>
        </div>
      </div>
    </div>
  )
}
