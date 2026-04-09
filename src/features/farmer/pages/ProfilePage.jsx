import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FarmerBottomNav } from '../../../components/layout/FarmerBottomNav'
import { FarmerSidebar } from '../../../components/layout/FarmerSidebar'
import { FarmerTopNav } from '../../../components/layout/FarmerTopNav'
import { getAppLanguage, setAppLanguage } from '../../../i18n/language'
import './ProfilePage.css'

export function ProfilePage() {
  const { t } = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(getAppLanguage())

  const handleLanguageChange = (languageCode) => {
    const next = setAppLanguage(languageCode)
    setActiveLanguage(next)
  }

  return (
    <div className="profile-root min-h-screen bg-background pb-24 text-on-surface lg:pb-0">
      <FarmerTopNav />

      <main className="mx-auto max-w-3xl space-y-6 px-4 pt-24 lg:ml-64">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-on-surface">{t('settings.profileSettings')}</h1>
          <p className="font-medium text-on-surface-variant">{t('settings.manageDetails')}</p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-xl border-b-0 bg-surface-container-lowest p-6 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.03)] md:col-span-1">
            <div className="group relative mb-4 cursor-pointer">
              <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary-container/20 ring-offset-2">
                <img alt="User Profile Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2pvNGeYhMDJJ-jdIZFKlGQXxN-8g_bzTuyosB2wBy4k8J7RqC3OCrvHH6iNDRJs5KOzH3pu82JnGwj8iDCoSjpczTgonEOtUN2qZG8e1sQ0A773lohs6LzFwT2_lWi8LvshUZCGSDFd_4a7zhQ7vx0A3mxjvzDVId6X6baGbg8C4N-gQ6gPSQKQcqJY_j9Eq8lVCAY5JJysT4Iflv7ofH0Myr-VzBBd_xlqmFSzPymCFO68-ZUQ2jXLC2o39qE7ciCSIj5iwER8ym" />
              </div>
              <div className="absolute bottom-0 right-0 rounded-full border-2 border-surface-container-lowest bg-primary p-1.5 text-on-primary shadow-lg">
                <span className="material-symbols-outlined text-sm">edit</span>
              </div>
            </div>
            <h2 className="text-lg font-bold leading-tight text-on-surface">Rajesh Kumar</h2>
            <span className="mt-2 rounded-full bg-primary-fixed/30 px-3 py-1 text-sm font-medium text-primary">Premium Farmer</span>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] md:col-span-2">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-outline">Mobile Number</label>
                <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-4 py-2">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <span className="font-medium">+91 98765 43210</span>
                  <span className="material-symbols-outlined ml-auto text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-outline">Primary Location</label>
                <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-4 py-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-medium">Jalandhar, Punjab</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="px-1 text-sm font-bold uppercase tracking-[0.2em] text-outline">{t('settings.profileSettings')}</h3>
          <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{t('settings.websiteLanguage')}</p>
                  <p className="text-xs text-on-surface-variant">{t('settings.websiteLanguageDescription')}</p>
                </div>
              </div>
              <div className="flex rounded-xl bg-surface-container-low p-1">
                {[
                  { code: 'en', label: 'EN' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'mr', label: 'मराठी' },
                ].map((language) => (
                  <button
                    key={language.code}
                    className={
                      activeLanguage === language.code
                        ? 'rounded-lg bg-surface-container-lowest px-4 py-1.5 text-sm font-bold text-primary shadow-sm transition-all'
                        : 'rounded-lg px-4 py-1.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container-high'
                    }
                    type="button"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-5 h-[1px] bg-surface-container-low" />
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Weather Alerts</p>
                  <p className="text-xs text-on-surface-variant">Get notified about extreme conditions</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input className="peer sr-only" defaultChecked type="checkbox" />
                <div className="h-6 w-11 rounded-full bg-surface-container-high peer-focus:outline-none peer-checked:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']" />
              </label>
            </div>
            <div className="mx-5 h-[1px] bg-surface-container-low" />
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">AI Insights</p>
                  <p className="text-xs text-on-surface-variant">Daily crop growth analysis reports</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input className="peer sr-only" defaultChecked type="checkbox" />
                <div className="h-6 w-11 rounded-full bg-surface-container-high peer-focus:outline-none peer-checked:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']" />
              </label>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 pb-12 pt-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all active:scale-95" type="button">
            <span className="material-symbols-outlined">save</span>
            Save Preferences
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-xl bg-surface-container-high py-3 text-sm font-bold text-on-surface transition-all active:scale-95" type="button">Cancel</button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-error-container py-3 text-sm font-bold text-on-error-container transition-all active:scale-95" type="button">
              <span className="material-symbols-outlined text-sm">logout</span>
              Logout
            </button>
          </div>
        </section>
      </main>

      <FarmerBottomNav />
    </div>
  )
}
