import { PageHeader } from '../../../components/shared/PageHeader'

export function ClaimDetailsPage() {
  return (
    <section>
      <PageHeader title="Claim Details" description="Detailed claim view with AI severity, confidence, and recommendation." />
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-[var(--color-border)] p-4">
          <h3 className="font-medium">Claim Information</h3>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">Farmer submitted data and image gallery.</p>
        </article>
        <article className="rounded-lg border border-[var(--color-border)] p-4">
          <h3 className="font-medium">AI Assessment</h3>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">Severity, confidence score, and recommendation panel.</p>
        </article>
      </div>
    </section>
  )
}
