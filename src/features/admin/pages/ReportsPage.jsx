import { PageHeader } from '../../../components/shared/PageHeader'

export function ReportsPage() {
  return (
    <section>
      <PageHeader title="Reports" description="Exportable views, time filters, and trend summaries." />
      <div className="rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-soft)]">
        Reports and print layout scaffold.
      </div>
    </section>
  )
}
