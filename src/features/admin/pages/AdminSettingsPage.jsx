import { PageHeader } from '../../../components/shared/PageHeader'

export function AdminSettingsPage() {
  return (
    <section>
      <PageHeader title="Admin Settings" description="Categories, AI risk thresholds, profile, and security controls." />
      <div className="rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-soft)]">
        Settings scaffold.
      </div>
    </section>
  )
}
