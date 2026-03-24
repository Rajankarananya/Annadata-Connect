import { PageHeader } from '../../../components/shared/PageHeader'

export function ProfilePage() {
  return (
    <section>
      <PageHeader title="Profile and Settings" description="Personal details, language preference, and notifications." />
      <div className="rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-soft)]">
        Profile management scaffold.
      </div>
    </section>
  )
}
