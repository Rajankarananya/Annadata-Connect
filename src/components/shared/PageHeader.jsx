export function PageHeader({ title, description }) {
  return (
    <div className="mb-6 border-b border-[var(--color-border)] pb-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-[var(--color-text-soft)]">{description}</p>
      ) : null}
    </div>
  )
}
