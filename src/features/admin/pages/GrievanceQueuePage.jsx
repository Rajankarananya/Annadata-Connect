import { PageHeader } from '../../../components/shared/PageHeader'

export function GrievanceQueuePage() {
  return (
    <section>
      <PageHeader title="Grievance Queue" description="Category, urgency, assignee, SLA timer, and resolution actions." />
      <div className="rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-soft)]">
        Grievance queue scaffold.
      </div>
    </section>
  )
}
