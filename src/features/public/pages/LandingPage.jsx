import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function LandingPage() {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en')

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode)
    i18n.changeLanguage(languageCode)
    localStorage.setItem('language', languageCode)
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] text-slate-900 antialiased" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border border-white/40 bg-white/30 px-4 shadow-[0_20px_50px_-20px_rgba(18,62,44,0.35)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center text-white" style={{ backgroundColor: '#2F6F4F', borderRadius: '10px' }}>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21,12C21,12 19,15 12,15C5,15 3,12 3,12C3,12 5,9 12,9C19,9 21,12 21,12M12,11A1,1 0 1,0 13,12A1,1 0 0,0 12,11M12,17C7,17 3.31,14.05 2,12C3.31,9.95 7,7 12,7C17,7 20.69,9.95 22,12C20.69,14.05 17,17 12,17Z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold uppercase tracking-tight" style={{ color: '#1B4332' }}>
              Annadata <span style={{ color: '#2F6F4F' }}>Connect</span>
            </span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-white/60 hover:text-[#2F6F4F]" href="#">About</a>
            <a className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-white/60 hover:text-[#2F6F4F]" href="#">Contact</a>
            <a className="rounded-lg border border-[#2F6F4F]/30 bg-[#2F6F4F]/10 px-4 py-2 text-sm font-bold text-[#2F6F4F] transition-all hover:border-[#2F6F4F] hover:bg-[#2F6F4F]/15" href="#">
              Support Portal
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-2">
        <section className="px-4 sm:px-6 lg:px-8">
          <div
            className="relative mx-auto h-[62vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-[#255741]/20 shadow-[0_40px_90px_-35px_rgba(12,35,28,0.6)] md:h-[74vh]"
            style={{
              backgroundImage: 'url(/annadata.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2f24]/75 via-[#0f2f24]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />

            <div className="relative z-10 h-full" />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-extrabold md:text-4xl" style={{ color: '#1B4332' }}>
                Welcome to Annadata Connect
              </h2>
              <p className="text-lg font-medium text-slate-500">Please select your preferred language to continue</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { code: 'en', glyph: 'A', title: 'English', subtitle: 'Default language' },
                { code: 'mr', glyph: 'म', title: 'मराठी', subtitle: 'Marathi' },
                { code: 'hi', glyph: 'अ', title: 'हिंदी', subtitle: 'Hindi' },
              ].map((language) => {
                const isSelected = selectedLanguage === language.code

                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border-2 bg-white p-8 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#2F6F4F] shadow-[0_22px_40px_-20px_rgba(47,111,79,0.45)]'
                        : 'border-slate-100 hover:-translate-y-1 hover:border-[#2F6F4F]/40 hover:shadow-[0_22px_40px_-20px_rgba(47,111,79,0.35)]'
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2F6F4F] via-[#86c39d] to-[#2F6F4F] opacity-80" />
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                        isSelected ? 'bg-[#2F6F4F] text-white' : 'bg-[#F0F9F4] text-[#2F6F4F] group-hover:bg-[#2F6F4F] group-hover:text-white'
                      }`}
                    >
                      <span className="text-xl font-bold">{language.glyph}</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800">{language.title}</span>
                    <span className="mt-2 text-sm text-slate-400">{language.subtitle}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-slate-200 pt-12 sm:flex-row">
              <p className="text-center font-semibold text-slate-600 sm:text-left">Already have an account?</p>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="rounded-lg px-8 py-3 font-bold text-white shadow-lg shadow-[#2F6F4F]/20 transition-all hover:-translate-y-0.5 hover:bg-[#1B4332]"
                  style={{ backgroundColor: '#2F6F4F' }}
                >
                  Farmer Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg border-2 border-[#2F6F4F] px-8 py-3 font-bold text-[#2F6F4F] transition-all hover:bg-[#F0F9F4]"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-16 pb-10 text-white" style={{ backgroundColor: '#1B4332' }}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-12 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded text-white" style={{ backgroundColor: '#2F6F4F' }}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21,12C21,12 19,15 12,15C5,15 3,12 3,12C3,12 5,9 12,9C19,9 21,12 21,12M12,11A1,1 0 1,0 13,12A1,1 0 0,0 12,11M12,17C7,17 3.31,14.05 2,12C3.31,9.95 7,7 12,7C17,7 20.69,9.95 22,12C20.69,14.05 17,17 12,17Z" />
                </svg>
              </div>
              <span className="text-lg font-extrabold uppercase tracking-tight">
                Annadata <span className="text-emerald-400">Connect</span>
              </span>
            </div>

            <div className="flex gap-6">
              <a className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white" href="#">Privacy Policy</a>
              <a className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white" href="#">Terms of Use</a>
              <a className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white" href="#">Help</a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 pt-10 md:flex-row">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30 md:text-left">
              Ministry of Agriculture &amp; Farmers Welfare Initiative
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">© 2024 Annadata Connect. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
