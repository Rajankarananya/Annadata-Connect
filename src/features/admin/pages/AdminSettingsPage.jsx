import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'

import { ROUTES } from '../../../constants/navigation'
import { AdminSidebar } from '../../../components/layout/AdminSidebar'
import { getAppLanguage, setAppLanguage } from '../../../i18n/language'

import './AdminSettingsPage.css'

const adminSecuritySchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .superRefine((values, context) => {
    const currentPassword = values.currentPassword.trim()
    const newPassword = values.newPassword.trim()

    if (!currentPassword && !newPassword) {
      return
    }

    if (!currentPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentPassword'],
        message: 'Current password is required to change password.',
      })
    } else if (currentPassword.length < 6) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentPassword'],
        message: 'Current password must be at least 6 characters.',
      })
    }

    if (!newPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: 'New password is required.',
      })
    } else if (newPassword.length < 8) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: 'New password must be at least 8 characters.',
      })
    }
  })

export function AdminSettingsPage() {
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState(getAppLanguage())
  const [submitFeedback, setSubmitFeedback] = useState({ error: '', success: '' })

  const handleLanguageChange = (languageCode) => {
    const next = setAppLanguage(languageCode)
    setActiveLanguage(next)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSecuritySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const onSaveSecurity = async () => {
    if (isSaving) {
      return
    }

    setSubmitFeedback({ error: '', success: '' })
    setIsSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitFeedback({ error: '', success: 'Security settings saved successfully.' })
      reset({ currentPassword: '', newPassword: '' })
    } catch {
      setSubmitFeedback({ error: 'Unable to save settings right now. Please try again.', success: '' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="admin-settings-page bg-surface text-on-surface antialiased">
      <header className="sticky top-0 z-50 bg-[rgba(236,253,245,0.8)] text-emerald-900 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tighter text-emerald-900">Annadata Connect</span>
            <nav className="hidden gap-6 md:flex">
              <NavLink className="rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-emerald-100/50" to={ROUTES.ADMIN.DASHBOARD}>
                Dashboard
              </NavLink>
              <NavLink className="rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-emerald-100/50" to={ROUTES.ADMIN.CLAIMS_QUEUE}>
                Claims
              </NavLink>
              <NavLink className="border-b-2 border-emerald-700 px-3 py-2 font-semibold text-emerald-700" to={ROUTES.ADMIN.SETTINGS}>
                Settings
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="rounded-full p-2 transition-colors hover:bg-emerald-100/50">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange(activeLanguage === 'en' ? 'hi' : 'en')}
              className="rounded-full p-2 transition-colors hover:bg-emerald-100/50"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            <div className="mx-2 h-8 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-3 pl-2">
              <span className="font-medium text-emerald-900">Administrator</span>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ld29hvNiKnsHGO1kCZVFt7JcOxSzZ69pUiSMl-KcvgOMTo60uXd_sRNlC2tsz1USmW0Utn3wpoanD_y87U0V6jWHCk1i_A5WJfAJUPgqU2fdzoFLf6Z1bQ9EsCuwcHtDdv8-a96LWrKXwvZ3NbjYtCyw_LS5MynHb-4SpLLvcJlYB0D6guXV3mrk6JlsuZd-0-T0n8bxfwvZ1A67sOAhwRBwDfXEsTHK_qaCuA6mv4jk8DA7rnDjF2p1XtsOP5fp6-Z2Kb5318Yf"
                alt="Administrator profile"
                className="h-9 w-9 rounded-full object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <AdminSidebar className="hidden md:flex pt-20" />

        <main className="flex-1 p-8 pt-12 md:ml-64">
          <header className="mb-12">
            <h1 className="mb-2 text-[2.5rem] font-bold tracking-tight text-on-surface">Admin Settings</h1>
            <p className="font-medium text-on-surface-variant">Configure global system parameters and administrative security.</p>
          </header>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-7">
              <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-on-primary-fixed-variant">Manage Claim Categories</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">Define classification for all crop loss insurance claims.</p>
                  </div>
                  <button type="button" className="flex items-center gap-2 rounded-lg bg-surface-container px-4 py-2 font-semibold text-on-surface transition-colors hover:bg-surface-container-high">
                    <span className="material-symbols-outlined text-[20px]">add</span> Add Category
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border-l-4 border-primary bg-surface p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-primary">
                        <span className="material-symbols-outlined">grass</span>
                      </div>
                      <div>
                        <span className="block font-bold text-on-surface">Pest Infestation</span>
                        <span className="text-xs text-on-surface-variant">Used in 1,240 active claims</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="p-2 text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                      <button type="button" className="p-2 text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-surface p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-primary">
                        <span className="material-symbols-outlined">tsunami</span>
                      </div>
                      <div>
                        <span className="block font-bold text-on-surface">Flash Flooding</span>
                        <span className="text-xs text-on-surface-variant">Used in 892 active claims</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="p-2 text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                      <button type="button" className="p-2 text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-surface p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-primary">
                        <span className="material-symbols-outlined">wb_sunny</span>
                      </div>
                      <div>
                        <span className="block font-bold text-on-surface">Drought / Heatwave</span>
                        <span className="text-xs text-on-surface-variant">Used in 3,105 active claims</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="p-2 text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                      <button type="button" className="p-2 text-on-surface-variant hover:text-error"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
                <div>
                  <h3 className="mb-1 text-xl font-bold text-on-primary-fixed-variant">Manage Grievance Categories</h3>
                  <p className="mb-8 text-sm text-on-surface-variant">Classification for farmer disputes and system feedback.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-surface-container-low p-6">
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="font-bold text-on-surface">Payment Delay</span>
                    <span className="text-xs leading-relaxed text-on-surface-variant">Disputes regarding the timeline of claim settlement payouts.</span>
                  </div>

                  <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-surface-container-low p-6">
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="font-bold text-on-surface">Policy Clarity</span>
                    <span className="text-xs leading-relaxed text-on-surface-variant">Questions regarding terms and conditions of existing policies.</span>
                  </div>

                  <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-surface-container-low p-6">
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <span className="material-symbols-outlined text-primary">person_search</span>
                    <span className="font-bold text-on-surface">Surveyor Conduct</span>
                    <span className="text-xs leading-relaxed text-on-surface-variant">Feedback on physical field verification processes.</span>
                  </div>

                  <button type="button" className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container transition-colors hover:border-primary">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-outline">add_circle</span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-tighter text-on-surface-variant">New Category</span>
                    </div>
                  </button>
                </div>
              </section>
            </div>

            <div className="space-y-10 lg:col-span-5">
              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  <h3 className="text-xl font-bold text-on-surface">AI Threshold Settings</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-on-surface">Automatic Claim Approval</span>
                      <span className="text-lg font-black text-primary">85%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-surface-container-highest">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: '85%' }}></div>
                    </div>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-on-surface-variant">Confidence level required for non-human intervention.</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-on-surface">Fraud Detection Sensitivity</span>
                      <span className="text-lg font-black text-tertiary">Medium-High</span>
                    </div>
                    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-1.5 bg-secondary-fixed-dim" style={{ width: '33%' }}></div>
                      <div className="h-1.5 bg-primary" style={{ width: '33%' }}></div>
                      <div className="h-1.5 bg-outline-variant" style={{ width: '34%' }}></div>
                    </div>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-on-surface-variant">Current risk modeling engine: v4.2.1 Stable</p>
                  </div>

                  <div className="flex gap-3 rounded-lg bg-primary-container/10 p-4">
                    <span className="material-symbols-outlined text-sm text-primary">info</span>
                    <p className="text-xs leading-relaxed text-on-primary-fixed-variant">
                      These settings are managed by the System Architecture team. Contact Support to request threshold adjustments.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">language</span>
                  <h3 className="text-xl font-bold text-on-surface">{t('settings.websiteLanguage')}</h3>
                </div>
                <p className="mb-4 text-sm text-on-surface-variant">{t('settings.websiteLanguageDescription')}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'mr', label: 'मराठी' },
                  ].map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageChange(language.code)}
                      className={
                        activeLanguage === language.code
                          ? 'rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white'
                          : 'rounded-lg bg-surface-container-high px-4 py-2 text-sm font-medium text-on-surface'
                      }
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_12px_32px_-4px_rgba(9,81,52,0.08)]">
                <h3 className="mb-8 text-xl font-bold text-on-surface">Profile &amp; Security</h3>

                <form className="space-y-6" onSubmit={handleSubmit(onSaveSecurity)} noValidate>
                  <div className="relative">
                    <label className="mb-2 block text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                    <input
                      type="email"
                      value="admin@annadata.gov.in"
                      readOnly
                      className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="relative">
                    <label className="mb-2 block text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant">Change Password</label>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-primary"
                          {...register('currentPassword')}
                        />
                        {errors.currentPassword ? <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p> : null}
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm transition-all focus:ring-1 focus:ring-primary"
                          {...register('newPassword')}
                        />
                        {errors.newPassword ? <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p> : null}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/10 pt-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <span className="block text-sm font-bold text-on-surface">Two-Factor Authentication</span>
                        <span className="text-xs text-on-surface-variant">Enhance account security via mobile app.</span>
                      </div>
                      <button type="button" className="relative flex h-6 w-12 items-center rounded-full bg-primary px-1">
                        <div className="h-4 w-4 translate-x-6 rounded-full bg-white"></div>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="primary-gradient flex-1 rounded-lg py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        reset({ currentPassword: '', newPassword: '' })
                        setSubmitFeedback({ error: '', success: '' })
                      }}
                      className="rounded-lg px-6 py-3 font-semibold text-on-surface-variant transition-colors hover:bg-surface-container"
                    >
                      Reset
                    </button>
                  </div>

                  {submitFeedback.error ? <p className="text-xs text-red-600">{submitFeedback.error}</p> : null}
                  {submitFeedback.success ? <p className="text-xs text-emerald-700">{submitFeedback.success}</p> : null}
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>

    </div>
  )
}
