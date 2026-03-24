import { PageHeader } from '../../../components/shared/PageHeader'

export function ClaimReviewPage() {
  return (
    <section>
      <PageHeader title="Claim Review" description="Side-by-side farmer data, AI assessment, and officer decision controls." />
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-[var(--color-border)] p-4">
          <h3 className="font-medium">Farmer Submission</h3>
        </article>
        <article className="rounded-lg border border-[var(--color-border)] p-4">
          <h3 className="font-medium">Officer Decision Panel</h3>
        </article>
      </div>
    </section>
  )
}
