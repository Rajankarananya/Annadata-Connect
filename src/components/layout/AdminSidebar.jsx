import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/claims-queue', label: 'Claims Queue', icon: 'assignment_late' },
  { to: '/admin/claim-review', label: 'Claim Review', icon: 'fact_check' },
  { to: '/admin/grievance-queue', label: 'Grievances', icon: 'error_outline' },
  { to: '/admin/reports', label: 'Reports', icon: 'analytics' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
]

export function AdminSidebar({ className = '' }) {
  const { pathname } = useLocation()

  const isActive = (to) => pathname === to || (to !== '/admin/dashboard' && pathname.startsWith(`${to}/`))

  return (
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col gap-2 bg-emerald-50 px-4 py-6 ${className}`.trim()}>
      <div className="mb-8 px-2">
        <h2 className="text-xl font-black tracking-tighter text-emerald-900">Annadata Connect</h2>
        <p className="text-[0.75rem] font-medium text-emerald-800/60">Executive Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              isActive(item.to)
                ? 'flex items-center gap-3 rounded-lg border-l-4 border-emerald-700 bg-white px-3 py-2.5 text-[0.875rem] font-medium text-emerald-700 shadow-sm transition-all duration-300 ease-in-out'
                : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.875rem] font-medium text-zinc-500 transition-all duration-300 ease-in-out hover:bg-emerald-100/30 hover:text-emerald-600'
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        <button type="button" className="flex w-full items-center gap-3 px-3 py-2.5 text-[0.875rem] font-medium text-zinc-500 hover:bg-emerald-100/30 hover:text-emerald-600">
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
