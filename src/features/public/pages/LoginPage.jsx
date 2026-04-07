import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { PageHeader } from '../../../components/shared/PageHeader'
import { ROLES } from '../../../constants/roles'

const loginSchema = z.object({
  role: z.enum([ROLES.FARMER, ROLES.ADMIN], { message: 'Select a valid role.' }),
})

export function LoginPage() {
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: ROLES.FARMER },
  })

  const onSubmit = async (values) => {
    if (submitState.loading || isSubmitting) return

    setSubmitState({ loading: true, error: '', success: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      localStorage.setItem('authToken', 'dev-token')
      localStorage.setItem('authRole', values.role)

      setSubmitState({ loading: false, error: '', success: 'Login successful. Redirecting...' })

      navigate(values.role === ROLES.ADMIN ? '/admin/dashboard' : '/farmer/dashboard')
    } catch {
      setSubmitState({ loading: false, error: 'Unable to login right now. Please try again.', success: '' })
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <PageHeader title="Login" description="Role-based login scaffold ready for API integration." />

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block space-y-2">
            <span className="text-sm text-[var(--color-text-soft)]">Role</span>
            <select
              className="min-h-[44px] w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
              {...register('role')}
            >
              <option value={ROLES.FARMER}>Farmer</option>
              <option value={ROLES.ADMIN}>Admin Officer</option>
            </select>
            {errors.role ? <p className="text-xs text-red-600">{errors.role.message}</p> : null}
          </label>

          {submitState.error ? <p className="text-xs text-red-600">{submitState.error}</p> : null}
          {submitState.success ? <p className="text-xs text-emerald-700">{submitState.success}</p> : null}

          <button
            type="submit"
            disabled={submitState.loading || isSubmitting}
            className="min-h-[44px] rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState.loading || isSubmitting ? 'Continuing...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
