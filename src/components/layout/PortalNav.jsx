import { NavLink } from 'react-router-dom'

export function PortalNav({ links }) {
  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            [
              'block rounded-lg px-3 py-2 text-sm transition',
              isActive
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-text-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]',
            ].join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
