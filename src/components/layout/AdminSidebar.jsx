import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ADMIN_NAV_ITEMS, isRouteActive } from '../../constants/navigation'

export function AdminSidebar({ className = '' }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authRole')
    navigate('/login', { replace: true })
  }

  const isActive = (to) => isRouteActive(pathname, [to])

  return (
    <>
      <aside className={`fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col gap-2 bg-emerald-50 px-4 py-6 md:flex ${className}`.trim()}>
        <div className="mb-8 px-2">
          <h2 className="text-xl font-black tracking-tighter text-emerald-900">{t('common.appName')}</h2>
          <p className="text-[0.75rem] font-medium text-emerald-800/60">{t('common.subtitle')}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => (
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
              <span>{t(item.labelKey)}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-[0.875rem] font-medium text-zinc-500 hover:bg-emerald-100/30 hover:text-emerald-600"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>{t('common.logout')}</span>
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 overflow-x-auto border-t border-emerald-200/60 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isActive(item.to)

          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                active
                  ? 'flex min-w-max items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700'
                  : 'flex min-w-max items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500'
              }
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
