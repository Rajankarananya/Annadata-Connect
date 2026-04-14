import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  mobile: z.string().trim().regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number.'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters.'),
  state: z.string().trim().min(1, 'State is required.'),
  district: z.string().trim().min(1, 'District is required.'),
  village: z.string().trim().min(1, 'Village is required.'),
  aadhaar: z.string().trim().optional(),
})

export function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      state: '',
      district: '',
      village: '',
      aadhaar: '',
    },
  })

  const onSubmit = async (values) => {
    if (submitState.loading || isSubmitting) return

    setSubmitState({ loading: true, error: '', success: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      localStorage.setItem('authToken', 'dev-token')
      localStorage.setItem('authRole', 'farmer')

      setSubmitState({ loading: false, error: '', success: 'Account created successfully. Redirecting to farmer dashboard...' })
      reset()
      navigate('/farmer/dashboard', { replace: true })
    } catch {
      setSubmitState({ loading: false, error: 'Registration failed. Please try again.', success: '' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-on-surface">
      <header className="sticky top-0 z-50 w-full bg-[rgba(247,250,247,0.8)] backdrop-blur-[20px]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold tracking-tight text-primary hover:opacity-90">Annadata Connect</Link>
          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 text-emerald-800/70 transition-colors hover:bg-[#f1f4f1]"
              type="button"
              onClick={() => window.open('mailto:support@annadataconnect.in', '_self')}
            >
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-grow flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-3 font-headline text-4xl font-extrabold tracking-tight text-on-surface">{t('auth.registerTitle')}</h1>
            <p className="text-lg text-on-surface-variant">{t('auth.registerSubtitle')}</p>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.06)] md:p-12">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="px-1 text-sm font-semibold text-on-surface-variant">{t('auth.fullName')}</label>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                      placeholder="Enter your full name"
                      type="text"
                      {...register('fullName')}
                    />
                    {errors.fullName ? <p className="px-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="px-1 text-sm font-semibold text-on-surface-variant">Email</label>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                      placeholder="you@example.com"
                      type="email"
                      {...register('email')}
                    />
                    {errors.email ? <p className="px-1 text-xs text-red-600">{errors.email.message}</p> : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="px-1 text-sm font-semibold text-on-surface-variant">{t('auth.mobileNumber')}</label>
                    <div className="relative flex-grow">
                      <input
                        className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                        placeholder="10-digit mobile number"
                        type="tel"
                        {...register('mobile')}
                      />
                    </div>
                    {errors.mobile ? <p className="px-1 text-xs text-red-600">{errors.mobile.message}</p> : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="px-1 text-sm font-semibold text-on-surface-variant">{t('auth.password')}</label>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                      placeholder="Create a password"
                      type="password"
                      {...register('password')}
                    />
                    {errors.password ? <p className="px-1 text-xs text-red-600">{errors.password.message}</p> : null}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="px-1 text-sm font-semibold text-on-surface-variant">{t('auth.state')}</label>
                      <select
                        className="w-full appearance-none rounded-xl border-none bg-surface-container-low p-4 text-on-surface focus:ring-2 focus:ring-surface-tint"
                        {...register('state')}
                      >
                        <option value="">{t('auth.state')}</option>
                        <option>Maharashtra</option>
                        <option>Uttar Pradesh</option>
                        <option>Punjab</option>
                      </select>
                      {errors.state ? <p className="px-1 text-xs text-red-600">{errors.state.message}</p> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="px-1 text-sm font-semibold text-on-surface-variant">{t('auth.district')}</label>
                      <select
                        className="w-full appearance-none rounded-xl border-none bg-surface-container-low p-4 text-on-surface focus:ring-2 focus:ring-surface-tint"
                        {...register('district')}
                      >
                        <option value="">{t('auth.district')}</option>
                        <option>Pune</option>
                        <option>Lucknow</option>
                        <option>Ludhiana</option>
                      </select>
                      {errors.district ? <p className="px-1 text-xs text-red-600">{errors.district.message}</p> : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="px-1 text-sm font-semibold text-on-surface-variant">Village</label>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                      placeholder="Enter village"
                      type="text"
                      {...register('village')}
                    />
                    {errors.village ? <p className="px-1 text-xs text-red-600">{errors.village.message}</p> : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between px-1">
                      <label className="text-sm font-semibold text-on-surface-variant">Aadhaar Number</label>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-outline">{t('auth.optional')}</span>
                    </div>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low p-4 text-on-surface placeholder:text-outline/50 transition-all focus:ring-2 focus:ring-surface-tint"
                      placeholder="XXXX-XXXX-XXXX"
                      type="text"
                      {...register('aadhaar')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {submitState.error ? <p className="text-xs text-red-600">{submitState.error}</p> : null}
                {submitState.success ? <p className="text-xs text-emerald-700">{submitState.success}</p> : null}

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#115638] to-[#2f6f4f] py-5 font-bold text-on-primary shadow-lg transition-all active:scale-[0.98]"
                  type="submit"
                  disabled={submitState.loading || isSubmitting}
                >
                  <span>{submitState.loading || isSubmitting ? t('auth.creatingAccount') : t('auth.createAccount')}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <div className="text-center">
                  <p className="text-sm text-on-surface-variant">
                    {t('auth.haveAccount')}
                    <Link className="ml-1 font-bold text-primary underline decoration-2 underline-offset-4" to="/login">
                      {t('common.login')}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>

          <div className="relative mt-12 h-48 w-full overflow-hidden rounded-2xl">
            <img
              className="h-full w-full object-cover"
              alt="Golden wheat field at sunset"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6dQ24TuqN09JispU0K9ucfst99dvCYpiE0YuCxAYa1yqj_XUOh7EekAbCldhMMkpyFevVYW-SLv0DuvCxH8yW8Bxhv7saZSBvbwmyN8RU2b_ballfr5zAhn-xDh7OYj3fArs7DrfvqteNcmdp7hzBGxCxl2vYBuVP8JrBLDY4nR5dh4_o6cOy5om3K6VBYocd1pQCDguPb8_k_rTXvMqdZhxo7lDquDkakBmjbUBf0fLG2ejJiRbEintWLNMZg5Klm7wt2yYpnF1j"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#115638]/60 to-transparent p-6">
              <p className="text-sm font-medium text-white">Supporting over 50,000 farmers across India.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto w-full py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between space-y-4 px-8 md:flex-row md:space-y-0">
          <Link to="/" className="text-lg font-bold text-primary hover:opacity-90">Annadata Connect</Link>
          <div className="text-center text-sm font-medium text-[#115638]">© 2026 Annadata Connect. Cultivating the Digital Legacy.</div>
          <div className="flex gap-6">
            <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="https://www.mygov.in/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a>
            <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="https://www.mygov.in/terms-and-conditions/" target="_blank" rel="noreferrer">Terms of Service</a>
            <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="mailto:support@annadataconnect.in">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
