import { PageHeader } from '../../../components/shared/PageHeader'

export function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        <PageHeader title="Farmer Registration" description="Next step: connect React Hook Form + Zod schema." />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Name" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Mobile" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Location" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2" placeholder="Preferred language" />
        </div>
      </div>
    </div>
  )
}
