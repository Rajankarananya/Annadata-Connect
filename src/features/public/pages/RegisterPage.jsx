import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PageHeader } from '../../../components/shared/PageHeader'

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  mobile: z.string().trim().regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number.'),
  location: z.string().trim().min(2, 'Location is required.'),
  preferredLanguage: z.string().trim().min(2, 'Preferred language is required.'),
})

export function RegisterPage() {
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      mobile: '',
      location: '',
      preferredLanguage: '',
    },
  })

  const onSubmit = async () => {
    if (submitState.loading || isSubmitting) return

    setSubmitState({ loading: true, error: '', success: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      setSubmitState({ loading: false, error: '', success: 'Registration submitted successfully.' })
      reset()
    } catch {
      setSubmitState({ loading: false, error: 'Registration failed. Please try again.', success: '' })
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <PageHeader title="Farmer Registration" description="Create your account with verified details." />

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs text-[var(--color-text-soft)]">Name</span>
              <input className="min-h-[44px] w-full rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Name" {...register('name')} />
              {errors.name ? <p className="text-xs text-red-600">{errors.name.message}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-xs text-[var(--color-text-soft)]">Mobile</span>
              <input className="min-h-[44px] w-full rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Mobile" {...register('mobile')} />
              {errors.mobile ? <p className="text-xs text-red-600">{errors.mobile.message}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-xs text-[var(--color-text-soft)]">Location</span>
              <input className="min-h-[44px] w-full rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Location" {...register('location')} />
              {errors.location ? <p className="text-xs text-red-600">{errors.location.message}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-xs text-[var(--color-text-soft)]">Preferred language</span>
              <input
                className="min-h-[44px] w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
                placeholder="Preferred language"
                {...register('preferredLanguage')}
              />
              {errors.preferredLanguage ? <p className="text-xs text-red-600">{errors.preferredLanguage.message}</p> : null}
            </label>
          </div>

          {submitState.error ? <p className="text-xs text-red-600">{submitState.error}</p> : null}
          {submitState.success ? <p className="text-xs text-emerald-700">{submitState.success}</p> : null}

          <button
            type="submit"
            disabled={submitState.loading || isSubmitting}
            className="min-h-[44px] rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState.loading || isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  )
}
