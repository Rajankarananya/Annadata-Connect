import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHeader } from '../../../components/shared/PageHeader'
import { ROLES } from '../../../constants/roles'

export function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState(ROLES.FARMER)

  const onSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('authToken', 'dev-token')
    localStorage.setItem('authRole', role)

    navigate(role === ROLES.ADMIN ? '/admin/dashboard' : '/farmer/dashboard')
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <PageHeader title="Login" description="Role-based login scaffold ready for API integration." />

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="text-sm text-[var(--color-text-soft)]">Role</span>
            <select
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value={ROLES.FARMER}>Farmer</option>
              <option value={ROLES.ADMIN}>Admin Officer</option>
            </select>
          </label>

          <button type="submit" className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
