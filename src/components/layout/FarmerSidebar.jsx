import { Link, useLocation } from 'react-router-dom'
import { FARMER_SIDEBAR_ITEMS, isRouteActive } from '../../constants/navigation'

export function FarmerSidebar() {
  const { pathname } = useLocation()

  const isActive = (item) => isRouteActive(pathname, item.match)

  const navClass = (item) =>
    isActive(item)
      ? 'ml-4 flex items-center gap-3 rounded-l-full bg-white py-3 pl-4 text-[#115638] shadow-sm dark:bg-stone-800 dark:text-[#4ade80]'
      : 'mx-4 flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 transition-transform duration-200 hover:translate-x-1 hover:bg-[#e8ece8] dark:text-stone-400 dark:hover:bg-stone-800/50'

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#f1f4f1] py-6 dark:bg-stone-900 lg:flex">
      <div className="mb-10 mt-14 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              eco
            </span>
          </div>
          <div>
            <h2 className="font-headline text-lg font-black leading-tight text-[#115638] dark:text-[#4ade80]">
              Annadata
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Smart Agriculture</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {FARMER_SIDEBAR_ITEMS.slice(0, 3).map((item) => (
          <Link key={item.key} className={navClass(item)} to={item.to}>
            <span className="material-symbols-outlined" style={isActive(item) ? { fontVariationSettings: "'FILL' 1" } : undefined}>
              {item.icon}
            </span>
            <span className="font-manrope text-sm font-bold tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-stone-200 px-4 py-6 dark:border-stone-800">
        {FARMER_SIDEBAR_ITEMS.slice(3).map((item) => (
          <Link key={item.key} className={navClass(item)} to={item.to}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-manrope text-sm font-bold tracking-wide">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
