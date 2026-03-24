import { Outlet } from 'react-router-dom'

import { PortalNav } from './PortalNav'

export function AppShell({ title, links }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-[var(--color-text-soft)]">Annadata Connect</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-6">
        <aside className="rounded-xl border border-[var(--color-border)] bg-white p-3">
          <PortalNav links={links} />
        </aside>

        <main className="rounded-xl border border-[var(--color-border)] bg-white p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
