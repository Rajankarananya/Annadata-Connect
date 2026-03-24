import { PageHeader } from '../../../components/shared/PageHeader'

export function ClaimsQueuePage() {
  return (
    <section>
      <PageHeader title="Claims Queue" description="Advanced filters, risk-based sorting, and optional bulk actions." />
      <div className="rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-soft)]">
        Admin claim queue table scaffold.
      </div>
    </section>
  )
}
