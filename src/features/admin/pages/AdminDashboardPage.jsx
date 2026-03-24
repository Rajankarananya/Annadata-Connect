import { PageHeader } from '../../../components/shared/PageHeader'

export function AdminDashboardPage() {
  return (
    <section>
      <PageHeader title="Admin Dashboard" description="KPI cards, trend charts, and district breakdowns." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Total Claims', 'Pending Review', 'High Risk', 'Unresolved Grievances'].map((label) => (
          <article key={label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-soft)]">{label}</p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </article>
        ))}
      </div>
    </section>
  )
}
