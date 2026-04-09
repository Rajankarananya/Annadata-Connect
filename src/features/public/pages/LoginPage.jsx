import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ROLES } from '../../../constants/roles'

const loginSchema = z.object({
  username: z.string().trim().min(6, 'Enter mobile number or username.'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters.'),
  role: z.enum([ROLES.FARMER, ROLES.ADMIN], { message: 'Select a valid role.' }),
})

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' })
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '9876543210',
      password: '',
      role: ROLES.FARMER,
    },
  })

  const selectedRole = watch('role')
  const username = watch('username')
  const isFarmerSelected = selectedRole === ROLES.FARMER
  const redirectPath = isFarmerSelected ? '/farmer/dashboard' : '/admin/dashboard'

  const onSubmit = async (values) => {
    if (submitState.loading || isSubmitting) return

    setSubmitState({ loading: true, error: '', success: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      localStorage.setItem('authToken', 'dev-token')
      localStorage.setItem('authRole', values.role)

      setSubmitState({ loading: false, error: '', success: `Login successful. Redirecting to ${values.role === ROLES.ADMIN ? '/admin/dashboard' : '/farmer/dashboard'}...` })

      navigate(values.role === ROLES.ADMIN ? '/admin/dashboard' : '/farmer/dashboard', { replace: true })
    } catch {
      setSubmitState({ loading: false, error: 'Unable to login right now. Please try again.', success: '' })
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-surface font-body text-on-surface">
      <div className="fixed inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-40"
          alt="Green crop fields under morning light"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeFuhfkopDo669SFzbl7e1v-QX0XYarWAUEoLdnLdJHtp_ODTEGWvb0EDktxq1d5H4yRPXCK0TDTokvA5kWNoitkTZ1oMnkkHrqJGT0F23elMhIFw-zDGANZTxq907sNGBWKhikl1KpIjnCigJpo37xuXsurw0G6WtHEINJ4O4Y8atJscs7RdaRvxbOXxiHbhgWgeuygGKi25lJmn702Jo99Dso3DUXyHFCrtlvDxFsY1_ZZvk_pDHMuxrCLP8njm_OP2YVndeLMxS"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/60 to-surface" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-6 py-8 md:justify-start">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            eco
          </span>
          <h1 className="font-headline text-2xl font-extrabold tracking-tight text-primary">Annadata Connect</h1>
        </div>
      </header>

      <main className="relative z-10 flex flex-grow items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] bg-white/85 shadow-[0px_24px_48px_-12px_rgba(18,28,27,0.08)] backdrop-blur-xl">
            <div className="mx-6 mt-8 flex rounded-xl bg-surface-container-low p-2">
              <button
                type="button"
                onClick={() => {
                  setValue('role', ROLES.FARMER, { shouldValidate: true })
                  setSubmitState((previous) => ({ ...previous, error: '' }))
                }}
                className={`flex-1 rounded-lg py-2 text-sm ${selectedRole === ROLES.FARMER ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm' : 'font-medium text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => {
                  setValue('role', ROLES.ADMIN, { shouldValidate: true })
                  setSubmitState((previous) => ({ ...previous, error: '' }))
                }}
                className={`flex-1 rounded-lg py-2 text-sm ${selectedRole === ROLES.ADMIN ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm' : 'font-medium text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                Admin
              </button>
            </div>

            <div className="mx-6 mt-4 rounded-xl border border-[#d8e5d8] bg-[#f7fbf7] px-4 py-3">
              <p className="text-sm font-semibold text-[#115638]">
                {isFarmerSelected ? 'Farmer Login' : 'Admin Login'}
              </p>
              <p className="mt-1 text-xs text-stone-600">
                {isFarmerSelected
                  ? 'Are you an Admin Officer? Switch to Admin login below.'
                  : 'Are you a Farmer? Switch to Farmer login below.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setValue('role', isFarmerSelected ? ROLES.ADMIN : ROLES.FARMER, { shouldValidate: true })
                  setSubmitState((previous) => ({ ...previous, error: '' }))
                }}
                className="mt-2 text-xs font-bold text-primary underline-offset-2 hover:underline"
              >
                {isFarmerSelected ? 'Login as Admin instead' : 'Login as Farmer instead'}
              </button>
            </div>

            <div className="px-8 pb-10 pt-8">
              <div className="mb-8">
                <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">Welcome Back</h2>
                <p className="text-on-surface-variant">
                  {isFarmerSelected
                    ? t('auth.farmerDescription')
                    : t('auth.adminDescription')}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <input type="hidden" value={selectedRole} {...register('role')} />

                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    placeholder=" "
                    className="peer w-full rounded-xl border-none bg-surface-container-lowest px-4 pb-2 pt-6 text-on-surface transition-all focus:ring-2 focus:ring-surface-tint/20"
                    {...register('username')}
                  />
                  <label
                    htmlFor="username"
                    className="pointer-events-none absolute left-4 top-4 text-on-surface-variant transition-opacity duration-150 peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                  >
                    {t('auth.mobileOrUsername')}
                  </label>
                  {username?.trim() ? (
                    <div className="absolute right-4 top-5 text-secondary">
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                    </div>
                  ) : null}
                  {errors.username ? <p className="mt-1 text-xs text-red-600">{errors.username.message}</p> : null}
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" "
                    className="peer w-full rounded-xl border-none bg-surface-container-lowest px-4 pb-2 pt-6 text-on-surface transition-all focus:ring-2 focus:ring-surface-tint/20"
                    {...register('password')}
                  />
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute left-4 top-4 text-on-surface-variant transition-opacity duration-150 peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                  >
                    {t('auth.password')}
                  </label>
                  <button type="button" onClick={() => setShowPassword((previous) => !previous)} className="absolute right-4 top-5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                  {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
                </div>

                <div className="flex justify-end">
                  <a className="text-sm font-semibold text-primary transition-colors hover:text-primary-container" href="#">
                    {t('auth.forgotPassword')}
                  </a>
                </div>

                {errors.role ? <p className="text-xs text-red-600">{errors.role.message}</p> : null}
                {submitState.error ? <p className="text-xs text-red-600">{submitState.error}</p> : null}
                {submitState.success ? <p className="text-xs text-emerald-700">{submitState.success}</p> : null}
                <p className="text-xs font-medium text-on-surface-variant">
                  {t('auth.connectedRoute', { path: redirectPath })}
                </p>

                <button
                  type="submit"
                  disabled={submitState.loading || isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#115638] to-[#2f6f4f] py-4 text-lg font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>
                    {submitState.loading || isSubmitting
                      ? t('auth.signingIn')
                      : isFarmerSelected
                        ? t('auth.signInAsFarmer')
                        : t('auth.signInAsAdmin')}
                  </span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-on-surface-variant">
                  {t('auth.dontHaveAccount')}
                  <Link className="ml-1 font-bold text-primary hover:underline" to="/register">
                    {t('common.register')}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-surface-container-highest/50 px-8 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container">
                <span className="material-symbols-outlined text-sm text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">{t('auth.secureGateway')}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-on-surface-variant/60">
            <a className="transition-colors hover:text-primary" href="#">Support</a>
            <a className="transition-colors hover:text-primary" href="#">Privacy</a>
            <a className="transition-colors hover:text-primary" href="#">Terms</a>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mx-auto mt-auto flex w-full max-w-7xl flex-col items-center justify-between space-y-4 px-8 py-8 md:flex-row md:space-y-0">
        <div className="font-body text-sm font-medium text-emerald-900/60">© 2024 Annadata Connect. Cultivating the Digital Legacy.</div>
        <div className="flex items-center gap-6">
          <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="#">Privacy Policy</a>
          <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="#">Terms of Service</a>
          <a className="text-sm font-medium text-emerald-900/60 transition-colors hover:text-[#2f6f4f]" href="#">Support</a>
        </div>
      </footer>
    </div>
  )
}
