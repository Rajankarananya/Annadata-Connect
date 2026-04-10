import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { FARMER_MOBILE_NAV_ITEMS, isRouteActive } from '../../constants/navigation'

export function FarmerBottomNav() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-stone-100 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_24px_rgba(18,28,27,0.04)] backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90 lg:hidden">
      {FARMER_MOBILE_NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.match)

        return (
          <Link
            key={item.to}
            className={
              active
                ? 'flex flex-col items-center justify-center rounded-2xl bg-[#f1f4f1] px-5 py-2 text-[#115638] dark:bg-stone-800 dark:text-[#4ade80]'
                : 'flex flex-col items-center justify-center px-5 py-2 text-stone-400 transition-transform hover:text-[#2f6f4f] active:scale-90 dark:text-stone-500'
            }
            to={item.to}
          >
            <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>
              {item.icon}
            </span>
            <span className="mt-1 font-inter text-[11px] font-bold">{t(item.labelKey)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
