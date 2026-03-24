import { PageHeader } from '../../../components/shared/PageHeader'

export function MyClaimsPage() {
  return (
    <section>
      <PageHeader title="My Claims" description="Filterable claims list with pagination/infinite scroll." />
      <div className="rounded-lg border border-[var(--color-border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
            <tr>
              <th className="px-3 py-2">Claim ID</th>
              <th className="px-3 py-2">Crop</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2">-</td>
              <td className="px-3 py-2">-</td>
              <td className="px-3 py-2">-</td>
              <td className="px-3 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
